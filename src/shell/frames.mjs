// The hub side of the bridge: one iframe per open section, live from its own application (never a copy), a validated
// session per document, and a small cache so going back restores the page exactly where it was.
import { CHANNEL, VERSION, LEGACY_VERSION, STATIONS, station, contentURL, safeContext, safeHash, sessionEnvelope } from '../kit/core.mjs';

const CHILD_TYPES = new Set(['READY', 'STATE', 'LOCATION', 'NAVIGATE', 'RETURN', 'ERROR']);
const EDGES = new Set(['start', 'end', 'explicit']);
const plain = v => Boolean(v) && typeof v === 'object' && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;
const randomId = () => (crypto.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`);

export const FRAME_TIMING = Object.freeze({ initRetry: [0, 300, 1000, 2500], noBridgeAfterLoad: 6000, timeout: 15000, usableGrace: 4000 });

// Sanitise what a page may tell the hub. Anything else is dropped before the controller sees it.
export function readPayload(type, payload) {
  if (!plain(payload)) return null;
  switch (type) {
    case 'READY': return { usable: payload.usable === true, protocol: Number.isInteger(payload.protocol) ? payload.protocol : LEGACY_VERSION,
      location: plain(payload.location) ? { search: safeContext(String(payload.location.search || '')), hash: safeHash(String(payload.location.hash || '')) } : null };
    case 'STATE': {
      const out = {};
      if (typeof payload.usable === 'boolean') out.usable = payload.usable;
      if (typeof payload.modal === 'boolean') out.modal = payload.modal;
      return out;
    }
    case 'LOCATION': return { search: safeContext(String(payload.search || '')), hash: safeHash(String(payload.hash || '')) };
    case 'NAVIGATE': {
      const s = station(payload.id); if (!s) return null;
      const view = payload.view === 'world' ? 'world' : 'page';
      return { id: s.id, view, search: view === 'page' ? safeContext(String(payload.search || '')) : '', hash: view === 'page' ? safeHash(String(payload.hash || '')) : '' };
    }
    case 'RETURN': return { edge: EDGES.has(payload.edge) ? payload.edge : 'explicit' };
    case 'ERROR': return { code: String(payload.code || 'page').slice(0, 40) };
    default: return null;
  }
}

export class FrameHost {
  constructor({ container, sources, capacity = 2, onEvent = () => {}, timing = FRAME_TIMING, win = window }) {
    Object.assign(this, { container, sources, capacity, onEvent, timing, win });
    this.records = new Map();           // id -> record (one live document per section)
    this.controller = new AbortController();
    win.addEventListener('message', event => this.receive(event), { signal: this.controller.signal });
  }
  get(id) { return this.records.get(id) || null; }
  // Reuse the cached document when it shows the same context; a different context loads a fresh one.
  matches(record, route) {
    return record && record.state !== 'error' && record.route.search === safeContext(route.search) &&
      (!route.hash || route.hash === record.location.hash);
  }
  open(route, { token }) {
    const id = station(route.id).id, source = this.sources.get(id);
    let record = this.records.get(id);
    if (this.matches(record, route)) { record.token = token; record.lastUsed = performance.now(); return record; }
    if (record) this.drop(id);
    const url = contentURL(route, source.url);
    const iframe = this.win.document.createElement('iframe');
    const s = station(id);
    Object.assign(iframe, { src: url, title: `${s.label} — Memento` });
    iframe.className = 'section-frame';
    iframe.dataset.section = s.slug;
    // Each page keeps what it uses on its own: fullscreen (Projects Experience, LevelUp demos), clipboard (Services
    // draft), media autoplay, XR for model-viewer.
    iframe.setAttribute('allow', 'fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture; xr-spatial-tracking');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('loading', 'eager');
    this.hide(iframe);
    record = { id, slug: s.slug, route: { id, view: 'page', search: safeContext(route.search), hash: safeHash(route.hash) },
      url, origin: source.origin, integration: source.integration, iframe, token, sessionId: randomId(),
      version: 0, state: 'loading', usable: false, modal: false, loaded: false, visible: false, created: performance.now(), lastUsed: performance.now(),
      location: { search: safeContext(route.search), hash: safeHash(route.hash) }, timers: new Set() };
    this.records.set(id, record);
    iframe.addEventListener('load', () => this.loaded(record), { signal: this.controller.signal });
    this.container.append(iframe);
    this.later(record, () => { if (record.state === 'loading') this.fail(record, 'timeout'); }, this.timing.timeout);
    this.evict(id);
    return record;
  }
  later(record, fn, ms) { const t = setTimeout(() => { record.timers.delete(t); fn(); }, ms); record.timers.add(t); }
  loaded(record) {
    if (!this.alive(record)) return;
    record.loads = (record.loads || 0) + 1; record.loaded = true;
    if (record.integration === 'legacy') { record.version = 0; this.connected(record, { usable: true }); return; }
    if (record.expectLoad) { record.expectLoad = false; if (record.state === 'connected') return; }
    // A second document in a connected frame (reload without HELLO, kit 12 page, a navigation away): new session.
    else if (record.loads > 1 && record.state !== 'loading') this.restart(record);
    this.handshake(record);
  }
  handshake(record) {
    for (const ms of this.timing.initRetry) this.later(record, () => { if (this.alive(record) && record.state === 'loading') this.init(record); }, ms);
    this.later(record, () => { if (this.alive(record) && record.state === 'loading') this.fail(record, 'no-bridge'); }, this.timing.noBridgeAfterLoad);
  }
  restart(record) {
    record.sessionId = randomId(); record.state = 'loading'; record.usable = false; record.version = 0; record.modal = false;
    this.onEvent(record, 'RELOAD', {});
    this.later(record, () => { if (this.alive(record) && record.state === 'loading') this.fail(record, 'timeout'); }, this.timing.timeout);
  }
  // INIT in both protocols: a kit 13 page answers v3, a kit 12 page (live deployment not yet updated) answers v2.
  init(record) {
    const target = record.iframe.contentWindow; if (!target) return;
    target.postMessage(sessionEnvelope(record.id, record.sessionId, 'INIT', { hub: 'memento-hub', protocol: VERSION, layout: 'overlay', visible: record.visible }), record.origin);
    target.postMessage(sessionEnvelope(record.id, record.sessionId, 'INIT', {}, LEGACY_VERSION), record.origin);
  }
  alive(record) { return this.records.get(record.id) === record; }
  receive(event) {
    const d = event.data;
    if (!d || typeof d !== 'object' || d.channel !== CHANNEL) return;
    const record = [...this.records.values()].find(r => r.iframe.contentWindow === event.source);
    if (!record || event.origin !== record.origin || d.station !== record.id) return;
    if (d.type === 'HELLO' && d.version === VERSION && record.integration === 'bridge') {
      // A page that (re)booted: a reload after READY gets a fresh session so late messages of the old one are dropped.
      if (record.state !== 'loading') { this.restart(record); record.expectLoad = true; }
      this.init(record); return;
    }
    if (![VERSION, LEGACY_VERSION].includes(d.version) || d.sessionId !== record.sessionId || !CHILD_TYPES.has(d.type)) return;
    if (record.version && d.version !== record.version) return;
    const payload = readPayload(d.type, d.payload); if (!payload) return;
    if (d.type === 'READY') {
      record.version = d.version;
      if (payload.location) record.location = payload.location;
      // A kit 12 page has no usable signal: its READY plus the frame's load event stand for it.
      this.connected(record, { usable: payload.usable || (d.version === LEGACY_VERSION && record.loaded) });
      return;
    }
    if (record.state !== 'connected') return;
    if (d.type === 'STATE') {
      if (payload.usable && !record.usable) { record.usable = true; this.onEvent(record, 'USABLE', {}); }
      if ('modal' in payload && payload.modal !== record.modal) { record.modal = payload.modal; this.onEvent(record, 'MODAL', { modal: record.modal }); }
      return;
    }
    if (d.type === 'LOCATION') { record.location = payload; this.onEvent(record, 'LOCATION', payload); return; }
    this.onEvent(record, d.type, payload);
  }
  connected(record, { usable }) {
    const first = record.state !== 'connected';
    record.state = 'connected';
    if (first) this.onEvent(record, 'READY', {});
    if (usable && !record.usable) { record.usable = true; this.onEvent(record, 'USABLE', {}); }
    else if (!record.usable) this.later(record, () => { if (this.alive(record) && !record.usable && record.state === 'connected') { record.usable = true; this.onEvent(record, 'USABLE', { late: true }); } }, this.timing.usableGrace);
    if (record.version) this.post(record, 'VISIBILITY', { active: record.visible });
  }
  fail(record, code) {
    if (!this.alive(record) || record.state === 'error') return;
    record.state = 'error'; record.error = code;
    this.onEvent(record, 'FAILED', { code });
  }
  post(record, type, payload = {}) {
    if (!record?.version || record.state !== 'connected') return;
    record.iframe.contentWindow?.postMessage(sessionEnvelope(record.id, record.sessionId, type, payload, record.version), record.origin);
  }
  hide(iframe) {
    iframe.dataset.shown = 'false'; iframe.tabIndex = -1; iframe.setAttribute('aria-hidden', 'true'); iframe.inert = true;
  }
  show(record, shown) {
    if (!record) return;
    const iframe = record.iframe;
    if (shown) {
      // The arriving page is drawn above the previous one (z-index; moving an iframe in the DOM would reload it).
      for (const other of this.records.values()) other.iframe.dataset.front = String(other === record);
      iframe.dataset.shown = 'true'; iframe.removeAttribute('tabindex'); iframe.removeAttribute('aria-hidden'); iframe.inert = false;
    } else { this.hide(iframe); iframe.dataset.front = 'false'; }
  }
  // Visible = the page may render, animate and receive input. Hidden pages stop their loops (window.__TIDE_VISIBLE__).
  setVisible(record, visible) {
    if (!record || record.visible === visible) return;
    record.visible = visible; this.post(record, 'VISIBILITY', { active: visible });
  }
  focus(record) { if (!record) return; record.iframe.focus({ preventScroll: true }); this.post(record, 'FOCUS', {}); }
  drop(id) {
    const record = this.records.get(id); if (!record) return;
    record.timers.forEach(clearTimeout); record.timers.clear();
    this.records.delete(id); record.iframe.remove();
  }
  retry(id) { const record = this.records.get(id); const route = record?.route; this.drop(id); return route; }
  // Keep at most `capacity` documents: the open one and the most recent other; older ones are removed entirely.
  evict(keep) {
    const others = [...this.records.values()].filter(r => r.id !== keep && !r.visible).sort((a, b) => b.lastUsed - a.lastUsed);
    for (const record of others.slice(Math.max(0, this.capacity - 1))) this.drop(record.id);
  }
  stats() { return { frames: this.records.size, sections: [...this.records.keys()] }; }
  destroy() { this.controller.abort(); for (const id of [...this.records.keys()]) this.drop(id); }
}
export { STATIONS };
