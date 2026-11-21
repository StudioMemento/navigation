// Memento navigation core — bridge 13.0.0, protocol 3.
// SINGLE SOURCE of the five sections and of the host <-> page contract. The same file is copied into the hub and into
// every application by packages/navigation-kit/sync.mjs; do not edit the copies in apps/*/.../navigation/.
// The legacy names (CHANNEL, VERSION, STATIONS, station, publicRouteURL...) stay exported for the navbar modules.

export const CHANNEL = 'memento:navigation';
export const VERSION = 3;                 // protocol spoken by this bridge
export const LEGACY_VERSION = 2;          // kit 12.x pages, still accepted by the hub during the rollout
export const BRIDGE_VERSION = '13.0.0';
export const PUBLIC_ORIGIN = 'https://mementostudio.it';
export const LEGACY_HUB = 'https://mementonav.vercel.app';
export const DEFAULT_HUB = PUBLIC_ORIGIN;
// Hubs allowed to own an embedded page. Previews of the hub project and loopback (only for a loopback page) are added
// by trustedParent(); nothing else is accepted.
export const HUB_ORIGINS = Object.freeze([PUBLIC_ORIGIN, 'https://www.mementostudio.it', LEGACY_HUB]);
export const HUB_PREVIEW_HOST = /^mementonav-[a-z0-9-]+-studio-memento-s-projects\.vercel\.app$/;

// One entry per section: stable id (kit identity, icon), public route, title, the application that owns the content and
// its address per environment. `integration`: 'bridge' = page speaks this protocol; 'legacy' = page without bridge,
// shown as is (Studio, still in development). `preview` validates per-deployment Vercel URLs passed to a hub preview.
export const STATIONS = Object.freeze([
  { id:'memento', slug:'studio', label:'Studio', title:'STUDIO', path:'/studio', integration:'legacy',
    url:'https://mementostudio.vercel.app/', local:'http://127.0.0.1:4105/',
    preview:/^mementostudio-[a-z0-9-]+-studio-memento-s-projects\.vercel\.app$/, stageId:'s01_memento' },
  { id:'services', slug:'services', label:'Services', title:'SERVICES', path:'/services', integration:'bridge',
    url:'https://mementoservizi.vercel.app/', local:'http://127.0.0.1:4101/',
    preview:/^mementoservizi-[a-z0-9-]+-studio-memento-s-projects\.vercel\.app$/, stageId:'s02_services' },
  { id:'projects', slug:'projects', label:'Projects', title:'PROJECTS', path:'/projects', integration:'bridge',
    url:'https://mementoportfolio.vercel.app/', local:'http://127.0.0.1:4102/',
    preview:/^mementoportfolio-[a-z0-9-]+-studio-memento-s-projects\.vercel\.app$/, stageId:'s03_projects' },
  { id:'levelup', slug:'levelup', label:'LevelUp', title:'LEVELUP', path:'/levelup', integration:'bridge',
    url:'https://mementolevelup.vercel.app/', local:'http://127.0.0.1:4103/',
    preview:/^mementolevelup-[a-z0-9-]+-studio-memento-s-projects\.vercel\.app$/, stageId:'s04_levelup' },
  { id:'start', slug:'start', label:'Start', title:'START', path:'/start', integration:'bridge',
    url:'https://mementostart.vercel.app/', local:'http://127.0.0.1:4104/',
    preview:/^mementostart-[a-z0-9-]+-studio-memento-s-projects\.vercel\.app$/, stageId:'s05_start' }
]);
export const station = id => STATIONS.find(s => s.id === id || s.slug === id);
export const indexOf = id => STATIONS.findIndex(s => s.id === id || s.slug === id);

// Context that may cross from one section to another (LevelUp -> Start: from, experience, idea...). Nothing else.
const CONTEXT_KEYS = new Set(['from','experience','idea','project','service','bundle','goal']);
export function safeContext(search='') {
  let input;
  try { input = new URLSearchParams(search); } catch { return ''; }
  const out = new URLSearchParams();
  for (const [key, value] of input) if (CONTEXT_KEYS.has(key) && value.length <= 2000) out.set(key, value);
  return out.toString();
}
export function safeHash(hash='') {
  return typeof hash === 'string' && hash.length < 512 && /^#[a-zA-Z0-9_\-/?.=&%]*$/.test(hash) ? hash : '';
}
const stationForSegment = segment => STATIONS.find(s => s.path.slice(1) === segment || (segment === 'memento' && s.id === 'memento'));
const worldStation = hash => station(String(hash || '').slice(1).toLowerCase())?.id || 'memento';

// Public route of a URL: /services?from=x#bundle/y -> page; / or /#projects -> world. Unknown paths -> null.
export function parseRoute(input, base = PUBLIC_ORIGIN) {
  let u; try { u = new URL(input, base); } catch { return null; }
  const segments = u.pathname.split('/').filter(Boolean);
  if (!segments.length || (segments.length === 1 && segments[0] === 'index.html')) return { id: worldStation(u.hash), view: 'world', search: '', hash: '' };
  const s = segments.length === 1 ? stationForSegment(segments[0].replace(/\.html$/, '')) : null;
  return s ? { id: s.id, view: 'page', search: safeContext(u.search), hash: safeHash(u.hash) } : null;
}
// Kept for kit 12 callers: unknown paths fall back to the world.
export function readRoute(input) { return parseRoute(input) || { id: 'memento', view: 'world', search: '', hash: '' }; }
export function routePath(route) {
  const s = station(route?.id); if (!s) throw Error('Unknown station');
  if (route.view !== 'page') return s.id === 'memento' ? '/' : '/#' + s.slug;
  const q = safeContext(route.search); return s.path + (q ? '?' + q : '') + safeHash(route.hash);
}
// Public navigation never inherits the technical iframe/preview host.
export function publicRouteURL(route) { return new URL(routePath(route), PUBLIC_ORIGIN).href; }
// Address of the page that owns the content of a route. `source` = the environment's application URL.
export function contentURL(route, source) {
  const s = station(route?.id); if (!s) throw Error('Unknown station');
  const u = new URL(source || s.url); u.search = safeContext(route.search);
  u.searchParams.set('mementoEmbed', '1'); u.hash = safeHash(route.hash); return u.href;
}
export function sessionEnvelope(id, sessionId, type, payload = {}, version = VERSION) {
  return { channel: CHANNEL, version, station: id, sessionId, type, payload };
}
const plainObject = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
export function validMessage(event, record) {
  const d = event?.data;
  return Boolean(record && event.source === record.source && event.origin === record.origin &&
    d?.channel === CHANNEL && d.version === (record.version || VERSION) && d.station === record.id &&
    typeof d.sessionId === 'string' && d.sessionId === record.sessionId &&
    typeof d.type === 'string' && d.type.length < 24 && plainObject(d.payload));
}
export const isLoopback = origin => { try { return ['localhost','127.0.0.1','[::1]'].includes(new URL(origin).hostname); } catch { return false; } };
export function trustedParent(origin, hub = DEFAULT_HUB, self = (typeof location !== 'undefined' ? location.origin : '')) {
  try {
    const u = new URL(origin);
    if (u.origin !== origin) return false;
    if (origin === new URL(hub).origin || HUB_ORIGINS.includes(origin)) return true;
    if (u.protocol === 'https:' && HUB_PREVIEW_HOST.test(u.hostname)) return true;
    // Local development: a loopback page accepts a loopback hub, never the other way round.
    return isLoopback(origin) && isLoopback(self);
  } catch { return false; }
}
// Section owning an application origin, in any environment (production, local, validated preview).
export function stationForOrigin(origin) {
  let u; try { u = new URL(origin); } catch { return null; }
  return STATIONS.find(s => new URL(s.url).origin === u.origin || new URL(s.local).origin === u.origin ||
    (u.protocol === 'https:' && s.preview.test(u.hostname))) || null;
}
// A link that changes section. Returns a route, or null for anything the page keeps (anchors, files, other sites).
export function navigationLink(href, base, hub = DEFAULT_HUB) {
  let u, b; try { u = new URL(href, base); b = new URL(base); } catch { return null; }
  if (!['http:','https:'].includes(u.protocol)) return null;
  // Keep in-page anchors under the page's control, including on the public domain.
  if (u.origin === b.origin && u.pathname === b.pathname && u.hash && !(u.pathname === '/' && station(u.hash.slice(1)))) return null;
  const globalOrigins = new Set([...HUB_ORIGINS, new URL(hub).origin]);
  if (globalOrigins.has(u.origin)) return parseRoute(u.href);
  const target = stationForOrigin(u.origin);
  if (!target || !['/','/index.html'].includes(u.pathname)) return null;
  // A gallery, dialog or anchor in the current application belongs to that application.
  if (u.origin === b.origin && u.pathname === b.pathname && u.hash) return null;
  return { id: target.id, view: 'page', search: safeContext(u.search), hash: safeHash(u.hash) };
}
