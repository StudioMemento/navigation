// Assemble the six published routes in one deployment.
import { buildSections } from './section-releases.mjs';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { STATIONS, PUBLIC_ORIGIN } from '../src/kit/core.mjs';
import { routeMeta, OG_IMAGE } from '../src/seo.mjs';

const dist = resolve(import.meta.dirname, '../dist');
const base = readFileSync(resolve(dist, 'index.html'), 'utf8');
const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function render(meta, { robots = '', status = '' } = {}) {
  let html = base;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(meta.description)}">`);
  const tags = [
    `<link rel="canonical" href="${meta.canonical}">`,
    '<meta property="og:type" content="website">', '<meta property="og:site_name" content="Memento Design Studio">',
    `<meta property="og:title" content="${escape(meta.title)}">`, `<meta property="og:description" content="${escape(meta.description)}">`,
    `<meta property="og:url" content="${meta.canonical}">`, `<meta property="og:image" content="${OG_IMAGE}">`, '<meta name="twitter:card" content="summary_large_image">',
    robots && `<meta name="robots" content="${robots}">`
  ].filter(Boolean).join('');
  html = html.replace(/<!-- ROUTE_META_START -->[\s\S]*?<!-- ROUTE_META_END -->/, `<!-- ROUTE_META_START -->${tags}<!-- ROUTE_META_END -->`);
  html = html.replace(/<h1 class="sr-only" id="route-heading">[^<]*<\/h1>/, `<h1 class="sr-only" id="route-heading">${escape(meta.heading)}</h1>`);
  if (status) html = html.replace('<html lang="it">', `<html lang="it" data-status="${status}">`);
  return html;
}
if (!base.includes('<!-- ROUTE_META_START -->')) throw Error('index.html: ROUTE_META markers missing');
writeFileSync(resolve(dist, 'index.html'), render(routeMeta({ view: 'world' })));
const written=['index.html'];
// Unknown paths: a real 404 with the same navigation, so the visitor can go on (served by Vercel with status 404).
const notFound = { title: 'Pagina non trovata — Memento', description: 'Questa pagina non esiste. Torna al mondo Memento.', heading: 'Pagina non trovata', canonical: PUBLIC_ORIGIN + '/' };
writeFileSync(resolve(dist, '404.html'), render(notFound, { robots: 'noindex', status: '404' }));
written.push('404.html');
const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...STATIONS.map(s => s.path + '/')].map(path => `  <url><loc>${PUBLIC_ORIGIN}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod></url>`);
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
// Previews and the technical domains are excluded by the X-Robots-Tag header in vercel.json, not by this file.
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${PUBLIC_ORIGIN}/sitemap.xml\n`);
written.push('sitemap.xml', 'robots.txt');
rmSync(resolve(dist, '.vite'), { recursive: true, force: true });   // build manifest: not published
await buildSections(dist);
console.log('routes:', [...written,...STATIONS.map(s=>s.path+'/')].join(', '));
