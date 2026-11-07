// Only section identities cross this bridge; never URLs or navigation commands.
export const ROUTE_CHANNEL = 'memento:hub-route';
export const ROUTE_VERSION = 1;
export const SECTION_KEY = 'memento.nav.section.v1';
export const SECTIONS = Object.freeze(['studio', 'services', 'projects', 'levelup', 'start']);
export const HOST_ORIGINS = Object.freeze(['https://mementostudio.it', 'https://www.mementostudio.it']);

export function sectionName(value) {
  if (typeof value !== 'string' || value.length > 32) return null;
  const slug = value.replace(/^#/, '').toLowerCase();
  return slug === 'memento' ? 'studio' : SECTIONS.includes(slug) ? slug : null;
}

function readStored(storage) {
  try { return sectionName(storage?.getItem(SECTION_KEY)); } catch { return null; }
}

export function referrerSection(referrer, allowedOrigins = HOST_ORIGINS) {
  try {
    const url = new URL(referrer);
    if (!allowedOrigins.includes(url.origin)) return null;
    const path = url.pathname.replace(/^\/+|\/+$/g, '');
    return path ? sectionName(path) : sectionName(url.hash);
  } catch { return null; }
}

export function initialSection({ hash = '', storage, referrer = '' } = {}) {
  // An explicit child deep link wins. The trusted host response can supersede
  // the fallback later; the child cannot read a cross-origin parent's fragment.
  return sectionName(hash) || referrerSection(referrer) || readStored(storage) || 'studio';
}

export function routeMessage(event, { parent, origins, requestId }) {
  const data = event?.data;
  return Boolean(event?.source === parent && origins.includes(event.origin) &&
    data && typeof data === 'object' && !Array.isArray(data) &&
    data.channel === ROUTE_CHANNEL && data.version === ROUTE_VERSION &&
    data.type === 'STATE' && data.requestId === requestId &&
    typeof data.initial === 'boolean' &&
    (data.section === null || sectionName(data.section)));
}

export function installRouteSync({ applySection, readSection, win = window, storage, signal } = {}) {
  if (typeof applySection !== 'function' || typeof readSection !== 'function') throw new TypeError('Route callbacks required');
  try { storage ??= win.sessionStorage; } catch { /* Storage may be blocked in an embed. */ }
  const embedded = win.parent !== win;
  const origins = [...new Set([...HOST_ORIGINS, win.location.origin])];
  const explicitAtBoot = sectionName(win.location.hash);
  const requestId = win.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  let requestOrigin = HOST_ORIGINS[0];
  try { const referrerOrigin = new URL(win.document.referrer).origin; if (origins.includes(referrerOrigin)) requestOrigin = referrerOrigin; } catch { /* Origin-only referrer is enough. */ }
  let parentOrigin = null, interacted = false, dead = false, applying = false;
  let retryTimer;
  const remember = section => { try { storage?.setItem(SECTION_KEY, section); } catch { /* Navigation must work without storage. */ } };
  const send = (type, section, targetOrigin) => win.parent.postMessage({ channel: ROUTE_CHANNEL, version: ROUTE_VERSION, type, requestId, section }, targetOrigin);
  const notify = (value = readSection()) => {
    const section = sectionName(value);
    if (!section || dead) return;
    remember(section);
    if (parentOrigin && !applying) send('CHANGE', section, parentOrigin);
  };
  const markInteracted = () => { interacted = true; };
  const receive = event => {
    if (!dead && embedded && event.source === win.parent && origins.includes(event.origin) &&
        event.data?.channel === ROUTE_CHANNEL && event.data?.version === ROUTE_VERSION && event.data?.type === 'HOST_READY') {
      requestOrigin = event.origin; request(); return;
    }
    if (dead || !embedded || !routeMessage(event, { parent: win.parent, origins, requestId })) return;
    parentOrigin = event.origin;
    clearTimeout(retryTimer);
    const section = sectionName(event.data.section) || (!event.data.initial ? 'studio' : null);
    // A delayed initial response must never rewind a user's already-started drag.
    // After handshake, an actual host hash/back navigation is authoritative.
    if (event.data.initial && (interacted || explicitAtBoot)) { notify(); return; }
    if (section) {
      applying = true;
      try { applySection(section, { initial: event.data.initial }); remember(section); }
      finally { applying = false; }
    } else notify();
  };
  const syncLocalHash = () => {
    const section = sectionName(win.location.hash);
    if (!section) return;
    interacted = true;
    applySection(section, { initial: false });
    notify(section);
  };
  win.addEventListener('message', receive);
  win.addEventListener('hashchange', syncLocalHash);
  win.addEventListener('popstate', syncLocalHash);
  const request = () => { if (!dead && embedded && !parentOrigin) send('REQUEST', null, requestOrigin); };
  // The host snippet may mount just after the iframe. Retry once without
  // blocking loading or inventing a cross-origin DOM access workaround.
  request();
  if (embedded) retryTimer = setTimeout(request, 500);
  remember(sectionName(readSection()) || 'studio');
  const destroy = () => {
    if (dead) return;
    dead = true; clearTimeout(retryTimer);
    win.removeEventListener('message', receive);
    win.removeEventListener('hashchange', syncLocalHash);
    win.removeEventListener('popstate', syncLocalHash);
    signal?.removeEventListener('abort', destroy);
  };
  if (signal?.aborted) destroy(); else signal?.addEventListener('abort', destroy, { once: true });
  return { notify, markInteracted, destroy, get connected() { return parentOrigin !== null; } };
}
