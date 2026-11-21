// Where each section's application lives for the current hub. One table (src/kit/core.mjs, STATIONS); this module only
// picks the column. Production never accepts overrides. A preview or local hub may point a section at a specific
// deployment with ?memento-src-<slug>=<url> (kept for the tab in sessionStorage) or VITE_MEMENTO_SOURCES at build time;
// every address is validated against that section's known hosts.
import { STATIONS, HUB_ORIGINS, isLoopback } from '../kit/core.mjs';

export const SOURCES_KEY = 'memento.hub.sources.v1';

export function hubEnvironment(origin) {
  if (HUB_ORIGINS.includes(origin)) return 'production';
  return isLoopback(origin) ? 'local' : 'preview';
}

// An address is acceptable for a section only if it is that section's production app, a preview of that project, or
// (for a local hub) a loopback server. Paths other than the root and any credentials are refused.
export function validSource(section, value, environment) {
  let u; try { u = new URL(value); } catch { return null; }
  if (u.username || u.password || !['/', '/index.html'].includes(u.pathname) || u.search || u.hash) return null;
  const known = new URL(section.url).origin === u.origin;
  const preview = u.protocol === 'https:' && section.preview.test(u.hostname);
  const local = environment === 'local' && (u.protocol === 'http:' || u.protocol === 'https:') && isLoopback(u.origin);
  return known || preview || local ? u.origin + '/' : null;
}

function readOverrides({ search = '', storage, buildTime = '' } = {}) {
  const out = {};
  try { Object.assign(out, JSON.parse(buildTime || '{}')); } catch { /* invalid build value: ignored */ }
  try { Object.assign(out, JSON.parse(storage?.getItem(SOURCES_KEY) || '{}')); } catch { /* storage blocked */ }
  const params = new URLSearchParams(search);
  for (const s of STATIONS) {
    const value = params.get('memento-src-' + s.slug);
    if (value === 'reset') delete out[s.slug]; else if (value) out[s.slug] = value;
  }
  return out;
}

export function resolveSources({ origin, search = '', storage, buildTime = '' }) {
  const environment = hubEnvironment(origin);
  const requested = environment === 'production' ? {} : readOverrides({ search, storage, buildTime });
  const accepted = {}, sources = new Map();
  for (const s of STATIONS) {
    const fallback = environment === 'local' ? s.local : s.url;
    const override = requested[s.slug] ? validSource(s, requested[s.slug], environment) : null;
    if (override) accepted[s.slug] = override;
    const url = override || fallback;
    sources.set(s.id, { id: s.id, url, origin: new URL(url).origin, integration: s.integration, public: s.url });
  }
  if (environment !== 'production') {
    try { if (Object.keys(accepted).length) storage?.setItem(SOURCES_KEY, JSON.stringify(accepted)); else storage?.removeItem(SOURCES_KEY); } catch { /* optional */ }
  }
  return { environment, sources, overrides: accepted };
}
