// Route metadata. Section texts come from each application's own index.html (seo.generated.json, written by
// packages/navigation-kit/sync.mjs); the home keeps the hub's own. Used by scripts/routes.mjs at build time and by the
// shell when the route changes in the browser.
import generated from './seo.generated.json' with { type: 'json' };
import { STATIONS, PUBLIC_ORIGIN, routePath } from './kit/core.mjs';

// Residual Framer dependency: the sharing image is still served by framerusercontent.com (same file the Framer pages use).
// To remove it, save that JPEG as public/og/memento.jpg and set OG_IMAGE = PUBLIC_ORIGIN + '/og/memento.jpg'.
export const OG_IMAGE = 'https://framerusercontent.com/images/tlqYX1LPvQTSm1PZk8Qx0KJUneM.jpeg';
export const HOME = Object.freeze({ title: 'Memento — Studio di design & esperienze digitali', description: 'Studio di design & esperienze digitali. Esplora Memento.', heading: 'Memento — Studio di design & esperienze digitali' });

export function routeMeta(route) {
  if (!route || route.view !== 'page') return { ...HOME, path: '/', canonical: PUBLIC_ORIGIN + '/' };
  const s = STATIONS.find(x => x.id === route.id), meta = generated.sections[s.slug] || {};
  const path = s.path;
  return { title: meta.title || `${s.label} — Memento`, description: meta.description || HOME.description, heading: meta.heading || meta.title || s.label,
    path, canonical: PUBLIC_ORIGIN + path, label: s.label };
}

export function applyMeta(route, doc = document) {
  const meta = routeMeta(route);
  doc.title = meta.title;
  const set = (selector, attr, value) => { const el = doc.head.querySelector(selector); if (el) el.setAttribute(attr, value); };
  set('meta[name="description"]', 'content', meta.description);
  set('link[rel="canonical"]', 'href', meta.canonical);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  set('meta[property="og:url"]', 'content', meta.canonical);
  const heading = doc.getElementById('route-heading'); if (heading) heading.textContent = meta.heading;
  return meta;
}
export { routePath };
