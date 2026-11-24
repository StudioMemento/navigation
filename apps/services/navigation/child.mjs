import { CHANNEL, VERSION, BRIDGE_VERSION, DEFAULT_HUB, station, stationForOrigin, trustedParent, navigationLink, sessionEnvelope, validMessage, publicRouteURL, safeContext, safeHash } from './core.mjs?v=12.0.0';
import { mountNav, safeHub, KIT_VERSION } from './navbar.mjs?v=12.0.0';

// Page side of the Memento navigation (bridge 13.0.0, protocol 3). Generated copy: edit packages/navigation-kit/.
// Standalone: the page shows its own navbar. Plain embed (Framer): own navbar, global links open in the top window.
// Compatible host (?mementoEmbed=1 + INIT): the host draws the navbar and owns URL, history and transitions; the page
// asks for navigation (NAVIGATE / RETURN) and reports what the host needs (READY, STATE, LOCATION).
export function installChild({ page, hub = DEFAULT_HUB } = {}) {
  if (window.__MEMENTO_NAV_V3__) return window.__MEMENTO_NAV_V3__;
  if (window.__MEMENTO_NAV_V2__) {
    console.warn('Memento: sostituire il bootstrap V2, senza caricare contemporaneamente due bridge.');
    return window.__MEMENTO_NAV_V2__;
  }
  hub = safeHub(hub);
  const id = station(page)?.id || stationForOrigin(location.origin)?.id || 'memento';
  const embedded = parent !== window;
  const expectedHost = embedded && new URLSearchParams(location.search).get('mementoEmbed') === '1';
  const root = document.documentElement;
  const nav = mountNav({ active: id, hub, hidden: expectedHost });
  let connection = null, active = !expectedHost, lastWheel = 0, debt = 0, lastSign = 0, touch = null, readyAt = 0;
  let usable = false, reported = {}, lastLocation = '', stateFrame = 0, helloTimer = 0, helloCount = 0;
  const controller = new AbortController(), signal = controller.signal;
  const listen = (target, name, handler, options = {}) => target.addEventListener(name, handler, { ...options, signal });
  const style = document.createElement('style');
  style.dataset.mementoNav = 'v3';
  // `overlay` layout: the host draws the same fixed navbar over a full-viewport frame, so the page keeps the spacing it
  // uses on its own (insets, scroll padding) while its navbar is hidden.
  style.textContent = `html:is([data-memento-navigation=standalone],[data-memento-layout=overlay]){--memento-safe-top:max(76px,calc(env(safe-area-inset-top,0px) + 60px));--memento-safe-bottom:max(96px,calc(env(safe-area-inset-bottom,0px) + 80px));scroll-padding-top:var(--memento-safe-top);scroll-padding-bottom:var(--memento-safe-bottom)}html:is([data-memento-navigation=standalone],[data-memento-layout=overlay]) [data-memento-content-insets]{padding-top:var(--memento-safe-top);padding-bottom:var(--memento-safe-bottom)}html[data-memento-navigation=hosted] memento-nav{display:none!important}`;
  document.head.append(style);
  root.dataset.mementoPage = id;
  if (expectedHost) root.dataset.mementoLayout = 'overlay';
  const setMode = hosted => {
    nav.hidden = hosted;
    nav.setAttribute('mode', hosted ? 'hosted' : 'standalone');
    // A direct embed without a compatible host must not open the hub inside itself.
    if (embedded && !hosted) nav.setAttribute('target', '_top'); else nav.removeAttribute('target');
    root.dataset.mementoNavigation = hosted ? 'hosted' : 'standalone';
    if (hosted) root.dataset.mementoLayout = 'overlay'; else delete root.dataset.mementoLayout;
  };
  const send = (type, payload = {}) => { if (connection) parent.postMessage(sessionEnvelope(id, connection.sessionId, type, payload), connection.origin); };
  const modalOpen = () => [...document.querySelectorAll('dialog[open],[aria-modal="true"]:not([hidden]):not([aria-hidden="true"])')].some(el => el.getClientRects().length > 0);
  const locked = () => root.dataset.demoExpanded === 'true' || Boolean(document.querySelector('[data-memento-gesture-lock="true"]'));
  const modal = () => modalOpen() || locked();
  const editing = el => el?.closest?.('input,select,textarea,[contenteditable]:not([contenteditable="false"])');
  const busyTarget = el => el?.closest?.('iframe,video,audio,[role=slider],input[type=range],canvas,[data-memento-gesture-lock]');
  const scrollingRoot = () => {
    const scroller = document.scrollingElement;
    if (scroller && scroller.scrollHeight > scroller.clientHeight + 4) return scroller;
    return [...document.querySelectorAll('#catalogue-viewport,main,[data-scroll-root]')].find(el => el.scrollHeight > el.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) || scroller;
  };
  function canConsume(target, delta) {
    const scroller = scrollingRoot();
    for (let el = target instanceof Element ? target : null; el; el = el.parentElement) {
      if (el === scroller) return delta < 0 ? el.scrollTop > 2 : el.scrollTop + el.clientHeight < el.scrollHeight - 3;
      if (el.scrollHeight > el.clientHeight + 3 && /(auto|scroll)/.test(getComputedStyle(el).overflowY) &&
        (delta < 0 ? el.scrollTop > 2 : el.scrollTop + el.clientHeight < el.scrollHeight - 3)) return true;
    }
    return scroller && (delta < 0 ? scroller.scrollTop > 2 : scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 3);
  }
  function visible(value) {
    active = value; window.__TIDE_VISIBLE__ = value; readyAt = performance.now(); debt = 0; lastWheel = 0; touch = null;
    root.dataset.mementoActive = String(value);
    document.dispatchEvent(new Event('memento:overlay-change'));
    if (!value) document.querySelectorAll('video,audio').forEach(el => el.pause());
  }
  function returnIntent(edge) { if (active && connection) { active = false; send('RETURN', { edge }); } }
  // A link to the world names its station (/#projects): the host returns there instead of the current one.
  function request(target) {
    if (target.view !== 'world') { send('NAVIGATE', target); return; }
    active = false; send('NAVIGATE', { id: target.id, view: 'world', search: '', hash: '' });
  }
  const currentLocation = () => ({ search: safeContext(location.search), hash: safeHash(location.hash) });
  // STATE: usable, modal (dialog, expanded demo, gesture lock). Only changes cross the bridge.
  function reportState() {
    stateFrame = 0;
    if (!connection) return;
    const next = { usable, modal: modal() }, delta = {};
    for (const key of Object.keys(next)) if (reported[key] !== next[key]) delta[key] = reported[key] = next[key];
    if (Object.keys(delta).length) send('STATE', delta);
  }
  const queueState = () => { if (!stateFrame) stateFrame = requestAnimationFrame(reportState); };
  function reportLocation() {
    if (!connection) return;
    const value = currentLocation(), key = value.search + value.hash;
    if (key === lastLocation) return;
    lastLocation = key; send('LOCATION', value);
  }
  // The pages update their hash with history.replaceState/pushState too (dialogs, slideshow): no event for those.
  const originalPush = history.pushState, originalReplace = history.replaceState;
  const wrapHistory = original => function (...args) { const result = original.apply(this, args); queueMicrotask(reportLocation); return result; };
  history.pushState = wrapHistory(originalPush); history.replaceState = wrapHistory(originalReplace);
  listen(window, 'hashchange', reportLocation); listen(window, 'popstate', reportLocation);
  // Usable = styles applied, the page's scripts ran (DOMContentLoaded) and one frame painted: what a visitor sees first
  // when the page stands alone. Images keep arriving progressively, as they do there. READY may arrive before that.
  const markUsable = () => requestAnimationFrame(() => requestAnimationFrame(() => { usable = true; queueState(); }));
  if (document.readyState !== 'loading') markUsable(); else listen(document, 'DOMContentLoaded', markUsable, { once: true });
  const observer = new MutationObserver(queueState);
  observer.observe(root, { subtree: true, attributes: true, attributeFilter: ['open', 'aria-modal', 'hidden', 'data-demo-expanded', 'data-memento-gesture-lock'] });
  listen(document, 'memento:overlay-change', queueState);
  // HELLO lets the host (re)initialise a page that reloaded or booted after the frame's load event.
  function parentOrigin() {
    const candidates = [location.ancestorOrigins?.[0]];
    try { candidates.push(new URL(document.referrer).origin); } catch { /* No referrer: the host's INIT still arrives. */ }
    return candidates.find(origin => origin && trustedParent(origin, hub)) || null;
  }
  function hello() {
    clearTimeout(helloTimer);
    if (connection || !expectedHost || helloCount > 4) return;
    const origin = parentOrigin();
    if (origin) parent.postMessage({ channel: CHANNEL, version: VERSION, station: id, sessionId: null, type: 'HELLO', payload: { bridge: BRIDGE_VERSION } }, origin);
    helloTimer = setTimeout(hello, [250, 1000, 2500, 5000][helloCount++] || 5000);
  }
  listen(window, 'message', event => {
    const d = event.data;
    if (event.source !== parent || !embedded || !trustedParent(event.origin, hub) || d?.channel !== CHANNEL || d.version !== VERSION || d.station !== id) return;
    if (d.type === 'INIT' && typeof d.sessionId === 'string' && d.sessionId.length >= 12 && d.sessionId.length <= 160 && d.payload && typeof d.payload === 'object' && !Array.isArray(d.payload)) {
      const fresh = connection?.sessionId !== d.sessionId;
      connection = { id, origin: event.origin, source: parent, sessionId: d.sessionId };
      clearTimeout(helloTimer); clearTimeout(fallback);
      setMode(true);
      if (fresh) { reported = {}; lastLocation = ''; visible(d.payload.visible === true); }
      const where = currentLocation(); lastLocation = where.search + where.hash;
      send('READY', { bridge: BRIDGE_VERSION, kitVersion: KIT_VERSION, protocol: VERSION, usable, location: where,
        capabilities: ['navigate', 'return', 'boundary', 'state', 'location', 'visibility', 'focus'] });
      reported.usable = usable; queueState();
      return;
    }
    if (!validMessage(event, connection)) return;
    if (d.type === 'VISIBILITY') visible(d.payload.active === true);
    if (d.type === 'FOCUS') {
      const target = document.querySelector('main,h1');
      if (target) { if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    }
  });
  // Global navigation requested by the page itself (CTA built in script, effects embedded in the page).
  function navigate(href) {
    const target = navigationLink(href, location.href, hub);
    if (!target || !connection) return false;
    request(target);
    return true;
  }
  listen(nav, 'memento:navigate', event => {
    if (!connection) return;
    event.preventDefault();
    if (event.detail.view === 'world') returnIntent('explicit');
    else send('NAVIGATE', { id: event.detail.id, view: 'page', search: '', hash: '' });
  });
  listen(document, 'click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    // _blank and other named targets keep their own window; _top means "the site": the host handles it when present.
    if (!link || link.hasAttribute('download') || (link.target && !['_self', '_top', '_parent'].includes(link.target))) return;
    const target = navigationLink(link.href, location.href, hub);
    if (!target) return;
    if (!connection) { link.href = publicRouteURL(target); if (embedded) link.target = '_top'; return; }
    event.preventDefault(); event.stopImmediatePropagation();
    request(target);
  }, { capture: true });
  listen(window, 'keydown', event => {
    if (!connection || !active || event.defaultPrevented || editing(event.target) || modal()) return;
    if (event.key === 'Escape') { event.preventDefault(); returnIntent('explicit'); }
    if (event.key === 'PageUp' && !canConsume(event.target, -1) && !busyTarget(event.target)) { event.preventDefault(); returnIntent('start'); }
  });
  // Scroll boundary: reaching the top or the end never leaves the page by itself. A new gesture that keeps pushing past
  // the edge (180 px of wheel, or a 90 px swipe started at the edge) is the intention to go back to the world.
  listen(window, 'wheel', event => {
    if (!connection || !active || event.defaultPrevented || performance.now() - readyAt < 900 || event.ctrlKey || modal() || editing(event.target) || busyTarget(event.target)) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.deltaY === 0) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1), sign = Math.sign(delta), now = performance.now();
    const fresh = now - lastWheel > 220 || sign !== lastSign;
    if (fresh) debt = 0;
    lastWheel = now; lastSign = sign;
    if (canConsume(event.target, delta)) { debt = 0; return; }
    if (fresh) debt = Math.abs(delta); else if (debt) debt += Math.abs(delta);
    if (debt >= 180) { event.preventDefault(); returnIntent(delta < 0 ? 'start' : 'end'); }
  }, { passive: !embedded });
  listen(window, 'touchstart', event => {
    const p = event.touches[0];
    touch = event.touches.length === 1 && connection && active && performance.now() - readyAt >= 900 && !modal() && !editing(event.target) && !busyTarget(event.target)
      ? { x: p.clientX, y: p.clientY, target: event.target, start: !canConsume(event.target, -1), end: !canConsume(event.target, 1) } : null;
  }, { passive: true });
  listen(window, 'touchend', event => {
    const p = event.changedTouches[0], t = touch; touch = null;
    if (!t || !p) return;
    const dy = t.y - p.clientY, dx = Math.abs(t.x - p.clientX);
    if (Math.abs(dy) > 90 && Math.abs(dy) > dx * 1.4 && ((dy < 0 && t.start) || (dy > 0 && t.end))) returnIntent(dy < 0 ? 'start' : 'end');
  }, { passive: true });
  listen(window, 'touchcancel', () => { touch = null; }, { passive: true });
  listen(window, 'pageshow', event => { if (event.persisted && !connection) { helloCount = 0; hello(); } });
  let fallback;
  if (!expectedHost) setMode(false); else { fallback = setTimeout(() => { if (!connection) setMode(false); }, 1200); hello(); }
  const api = { version: VERSION, bridge: BRIDGE_VERSION, kitVersion: KIT_VERSION, page: id, nav,
    get connected() { return Boolean(connection); },
    navigate, returnToWorld() { if (!connection) return false; active = true; returnIntent('explicit'); return true; },
    destroy() {
      controller.abort(); observer.disconnect(); clearTimeout(fallback); clearTimeout(helloTimer); cancelAnimationFrame(stateFrame);
      history.pushState = originalPush; history.replaceState = originalReplace;
      style.remove(); nav.remove();
      delete root.dataset.mementoPage; delete root.dataset.mementoNavigation; delete root.dataset.mementoActive; delete root.dataset.mementoLayout;
      delete window.__MEMENTO_NAV_V2__; delete window.__MEMENTO_NAV_V3__; delete window.MementoNavigation;
    } };
  // Retain the original public markers for existing integrations; MementoNavigation is the page-facing API.
  window.__MEMENTO_NAV_V2__ = window.__MEMENTO_NAV_V3__ = window.MementoNavigation = api;
  return api;
}
