// The container: one authority for URL, history, navbar, open section and transitions.
//   world    the 3D hub (Mementonav) has input; a station is selected, no page is open
//   loading  a section was requested and its live page is booting (world, or the previous page, still visible)
//   entering the page fades in over the world (or over the previous page)
//   reading  the page has input and scroll; the world is suspended
//   exiting  the page fades out, the world comes back on the page's station
//   error    the page did not answer: retry, back to the world, or open the original
// Every request gets a token; anything that answers for an older token (late READY, stale timers) is ignored.
import { STATIONS, station, parseRoute, routePath } from '../kit/core.mjs';
import { FrameHost, FRAME_TIMING } from './frames.mjs';
import { resolveSources } from './sources.mjs';
import { applyMeta } from '../seo.mjs';

export const PHASES = Object.freeze(['world', 'loading', 'entering', 'reading', 'exiting', 'error']);
const TIMING = { enter: 640, exit: 520, cross: 420, reduced: 120, status: 380 };

export function createShell({ world, background, doc = document, win = window, storage, capacity, buildSources = '' }) {
  const root = doc.documentElement, pages = doc.getElementById('pages');
  const status = doc.getElementById('shell-status'), statusText = doc.getElementById('shell-status-text');
  const errorPanel = doc.getElementById('shell-error');
  const reduced = () => win.matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(win.location.search).get('motion') === 'reduce';
  const { environment, sources } = resolveSources({ origin: win.location.origin, search: win.location.search, storage, buildTime: buildSources });
  const coarse = win.matchMedia('(pointer: coarse)').matches;
  // Verification only (never on production): ?qa-timeout=ms shortens the wait before the error state.
  const qaTimeout = environment !== 'production' ? Number(new URLSearchParams(win.location.search).get('qa-timeout')) : 0;
  const timing = qaTimeout > 0 ? { ...FRAME_TIMING, timeout: qaTimeout, noBridgeAfterLoad: Math.min(FRAME_TIMING.noBridgeAfterLoad, qaTimeout) } : FRAME_TIMING;
  const frames = new FrameHost({ container: pages, sources, capacity: capacity ?? (coarse ? 1 : 2), timing, onEvent: (record, type, payload) => onFrame(record, type, payload), win });
  const state = { phase: 'world', target: null, shown: null, token: 0, selected: world.selected(), entry: 'world', modal: false, nav: null, wantsFocus: false };
  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };
  const clear = () => { timers.forEach(clearTimeout); timers.clear(); };
  const log = [];  // last transitions, for the verification page (?qa=1) and debugging
  const record = id => (id ? frames.get(id) : null);

  function setPhase(phase, detail = {}) {
    state.phase = phase;
    root.dataset.shell = phase;
    root.dataset.shellFrom = detail.from || root.dataset.shellFrom || 'world';
    log.push({ t: Math.round(performance.now()), phase, target: state.target?.id || null, shown: state.shown }); if (log.length > 60) log.shift();
    syncChrome();
    win.dispatchEvent(new CustomEvent('memento:shell', { detail: { phase, target: state.target?.id || null, shown: state.shown, selected: state.selected } }));
  }
  // Navbar, world input, background and meta follow the phase: never two owners of the same input.
  const fromPage = () => root.dataset.shellFrom === 'page';
  function worldVisible() {
    if (state.phase === 'world' || state.phase === 'exiting') return true;
    if (state.phase === 'reading') return false;
    return !fromPage() && Boolean(state.worldSeen);   // loading / entering / error over the world
  }
  function syncChrome() {
    const page = state.phase !== 'world' && state.phase !== 'exiting' && state.target;
    const id = page ? state.target.id : state.selected;
    if (state.nav) {
      state.nav.setAttribute('active', id);
      state.nav.setAttribute('current', page ? 'page' : 'location');
      // The world composes its own edge blur in WebGL; pages need the navbar's.
      if (!page && world.composesBlur()) state.nav.setAttribute('blur', 'off'); else state.nav.removeAttribute('blur');
    }
    const visible = worldVisible();
    root.dataset.world = visible ? 'visible' : 'hidden';
    world.suspend(!visible);
    world.setInteractive(state.phase === 'world');
    const shown = state.shown && ['reading', 'entering'].includes(state.phase) ? record(state.shown) : null;
    const modal = Boolean(shown?.modal);
    // A page without bridge (Studio, for now) paints its own opaque background: the shared one would only cost GPU.
    background.setActive(!modal && !(state.phase === 'reading' && shown?.integration === 'legacy'), { blur: modal });
    root.dataset.shellModal = String(modal);
    status.hidden = state.phase !== 'loading';
    errorPanel.hidden = state.phase !== 'error';
  }
  const duration = kind => (reduced() ? TIMING.reduced : TIMING[kind]);
  function writeHistory(route, mode, extra = {}) {
    if (mode === 'none') return;
    const url = routePath(route), entry = { memento: 1, view: route.view, id: route.id, ...extra };
    if (mode === 'push' && url === win.location.pathname + win.location.search + win.location.hash) mode = 'replace';
    win.history[mode === 'push' ? 'pushState' : 'replaceState'](entry, '', url);
  }

  // ---- open a section -------------------------------------------------------------------------------------------
  function toPage(route, { history = 'push', focus = true } = {}) {
    const s = station(route.id); if (!s) return;
    route = { id: s.id, view: 'page', search: route.search || '', hash: route.hash || '' };
    const current = state.target && !['world', 'exiting'].includes(state.phase) ? state.target : null;
    // Same section already open or opening with the same context: nothing new (repeated clicks, duplicate messages).
    if (current?.id === route.id && current.search === route.search && (!route.hash || current.hash === route.hash) && state.phase !== 'error') {
      if (history !== 'none') writeHistory({ ...route, hash: record(route.id)?.location.hash || route.hash }, 'replace', { from: win.history.state?.from });
      return;
    }
    clear();
    const token = ++state.token;
    const from = state.shown && record(state.shown)?.visible ? 'page' : 'world';
    writeHistory(route, history, { from });
    state.target = route; state.selected = s.id; state.wantsFocus = focus;
    // From the world the carousel turns to the station first; behind a page it jumps there for the way back.
    world.select(s.id, { jump: from === 'page' || !state.worldSeen });
    applyMeta(route, doc);
    statusText.textContent = `Caricamento di ${s.label}…`;
    status.dataset.visible = 'false';
    later(() => { if (state.token === token && state.phase === 'loading') status.dataset.visible = 'true'; }, TIMING.status);
    const frame = frames.open(route, { token });
    setPhase('loading', { from });
    if (frame.state === 'error') onFailed(frame);
    else if (frame.usable && frame.state === 'connected') reveal(frame, token);
  }
  function reveal(frame, token) {
    if (token !== state.token || state.target?.id !== frame.id || !['loading', 'error'].includes(state.phase)) return;
    const previous = state.shown && state.shown !== frame.id ? record(state.shown) : null;
    const from = root.dataset.shellFrom;
    frames.setVisible(frame, true); frames.show(frame, true);
    state.shown = frame.id;
    if (previous) frames.setVisible(previous, false);
    setPhase('entering', { from });
    later(() => {
      if (token !== state.token) return;
      if (previous) frames.show(previous, false);
      setPhase('reading', { from });
      if (state.wantsFocus) frames.focus(frame);
      frames.evict(frame.id);
      // The page may have changed hash while booting (dialogs, slideshow): the URL follows it, without a new entry.
      syncLocation(frame);
    }, duration(previous ? 'cross' : 'enter'));
  }
  function onFailed(frame) {
    if (state.target?.id !== frame.id || !['loading', 'entering'].includes(state.phase)) return;
    clear();
    const s = station(frame.id);
    errorPanel.querySelector('[data-error-title]').textContent = `${s.label} non risponde.`;
    errorPanel.querySelector('[data-error-detail]').textContent = frame.error === 'no-bridge'
      ? 'La pagina si è aperta ma non comunica con la navigazione (versione non aggiornata o pagina diversa).'
      : 'La pagina non si è caricata in tempo. Puoi riprovare, tornare al mondo o aprirla da sola.';
    const original = errorPanel.querySelector('[data-error-open]');
    original.href = sources.get(frame.id).url;
    setPhase('error', { from: root.dataset.shellFrom });
    errorPanel.querySelector('[data-error-retry]').focus({ preventScroll: true });
  }

  // ---- back to the world ----------------------------------------------------------------------------------------
  function toWorld(id = state.selected, { history = 'push', advance = 0 } = {}) {
    const s = station(id) || station(state.selected);
    clear();
    const token = ++state.token;
    const shown = record(state.shown);
    writeHistory({ id: s.id, view: 'world', search: '', hash: '' }, history, { from: 'page' });
    state.target = null; state.selected = s.id; state.worldSeen = true;
    world.boot();
    world.select(s.id, { jump: true });
    applyMeta({ view: 'world' }, doc);
    if (shown && (shown.visible || state.phase === 'reading' || state.phase === 'entering')) {
      frames.setVisible(shown, false);
      setPhase('exiting', { from: 'page' });
      later(() => {
        if (token !== state.token) return;
        frames.show(shown, false);
        finishWorld(advance);
      }, duration('exit'));
    } else {
      if (shown) frames.show(shown, false);
      finishWorld(advance);
    }
  }
  function finishWorld(advance) {
    state.shown = null;
    setPhase('world', { from: 'world' });
    if (advance) world.step(advance);
    world.focus();
  }

  // ---- messages from the pages ------------------------------------------------------------------------------------
  function syncLocation(frame) {
    if (state.shown !== frame.id || state.phase !== 'reading') return;
    const route = { id: frame.id, view: 'page', search: frame.location.search, hash: frame.location.hash };
    state.target = { ...state.target, hash: route.hash };
    writeHistory(route, 'replace', { from: win.history.state?.from || 'page' });
  }
  function onFrame(frame, type, payload) {
    const isTarget = state.target?.id === frame.id;
    const isShown = state.shown === frame.id && frame.visible;
    switch (type) {
      case 'USABLE': if (isTarget) reveal(frame, state.token); break;
      case 'READY': if (isTarget && state.phase === 'error' && frame.usable) { setPhase('loading', { from: root.dataset.shellFrom }); reveal(frame, state.token); } break;
      case 'FAILED': onFailed(frame); break;
      case 'LOCATION': syncLocation(frame); break;
      case 'MODAL': if (isShown) syncChrome(); break;
      case 'RELOAD': break;
      // Navigation requests count only from the page the user is looking at.
      case 'NAVIGATE':
        if (!isShown || state.phase !== 'reading') break;
        if (payload.view === 'world') toWorld(payload.id); else toPage(payload);
        break;
      case 'RETURN':
        if (!isShown || state.phase !== 'reading') { frames.post(frame, 'VISIBILITY', { active: frame.visible }); break; }
        toWorld(frame.id, { advance: payload.edge === 'end' ? 1 : 0 });
        break;
    }
  }

  // ---- inputs owned by the container --------------------------------------------------------------------------
  function go(route, options) {
    if (!route) return;
    if (route.view === 'world') toWorld(route.id, options); else toPage(route, options);
  }
  function attachNav(nav) {
    state.nav = nav;
    nav.setAttribute('mode', 'host');
    nav.removeAttribute('target');
    nav.addEventListener('memento:navigate', event => {
      event.preventDefault();
      const { id, view } = event.detail;
      if (view === 'world') { if (state.phase !== 'world') toWorld(state.target?.id || state.selected); else world.focus(); }
      else toPage({ id, view: 'page', search: '', hash: '' });
    });
    syncChrome();
  }
  win.addEventListener('popstate', () => {
    const route = parseRoute(win.location.href);
    go(route || { id: 'memento', view: 'world' }, { history: 'none' });
  });
  win.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || event.defaultPrevented || state.phase === 'world') return;
    if (event.target?.closest?.('input,textarea,select,[contenteditable]')) return;
    event.preventDefault();
    toWorld(state.target?.id || state.shown || state.selected);
  });
  errorPanel.querySelector('[data-error-retry]').addEventListener('click', () => {
    const route = state.target; if (!route) return;
    frames.retry(route.id); toPage(route, { history: 'none' });
  });
  errorPanel.querySelector('[data-error-back]').addEventListener('click', () => toWorld(state.target?.id || state.selected));
  win.addEventListener('pagehide', event => { if (!event.persisted) { clear(); frames.destroy(); } });

  // ---- first route: a direct link opens its page at once, without the world's introduction -------------------------
  function start() {
    const parsed = parseRoute(win.location.href);
    if (!parsed || root.dataset.status === '404') return notFound();
    const route = parsed;
    if (route.view === 'page') {
      state.entry = 'direct'; root.dataset.shellEntry = 'direct';
      toPage(route, { history: 'replace' });
    } else {
      state.entry = 'world'; root.dataset.shellEntry = 'world'; state.worldSeen = true;
      world.boot();
      state.selected = route.id; world.select(route.id, { jump: true });
      writeHistory(route, 'replace', { from: 'world' });
      applyMeta(route, doc);
      setPhase('world', { from: 'world' });
    }
  }
  // Unknown address (404.html, served with status 404): the world stays usable underneath, the address is kept.
  function notFound() {
    state.entry = 'world'; state.worldSeen = true; root.dataset.shellEntry = 'world';
    world.boot();
    errorPanel.querySelector('[data-error-title]').textContent = 'Pagina non trovata.';
    errorPanel.querySelector('[data-error-detail]').textContent = 'Questo indirizzo non corrisponde a nessuna sezione di Memento.';
    errorPanel.querySelector('[data-error-retry]').hidden = true;
    errorPanel.querySelector('[data-error-open]').hidden = true;
    setPhase('error', { from: 'world' });
    const back = errorPanel.querySelector('[data-error-back]');
    back.textContent = 'Vai alla home';
    back.focus({ preventScroll: true });
    back.addEventListener('click', () => {
      errorPanel.querySelector('[data-error-retry]').hidden = false; errorPanel.querySelector('[data-error-open]').hidden = false; back.textContent = 'Torna al mondo';
    }, { once: true });
  }
  const api = {
    start, go, attachNav, toWorld, toPage,
    get phase() { return state.phase; }, get environment() { return environment; },
    openSection(id) { toPage({ id, view: 'page', search: '', hash: '' }); },
    stationChanged(id) { if (state.phase === 'world') { state.selected = id; syncChrome(); } },
    snapshot() { return { phase: state.phase, target: state.target, shown: state.shown, selected: state.selected, token: state.token, environment, frames: frames.stats(), sources: Object.fromEntries([...sources].map(([k, v]) => [k, v.url])), log: [...log] }; },
    frames
  };
  return api;
}
export { STATIONS };
