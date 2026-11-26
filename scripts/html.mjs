import { readFileSync } from 'node:fs';

export function content(name) {
  return JSON.parse(readFileSync(new URL('../content/' + name + '.json', import.meta.url), 'utf8'));
}

export const site = content('site');
export const sections = Object.fromEntries(site.sections.map(section => [section.slug, section]));

export function escape(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

export function link(url, label, external = false) {
  return `<a href="${escape(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escape(label)}</a>`;
}

export function list(items, render, ordered = false) {
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>\n${items.map(item => '  <li>' + render(item) + '</li>').join('\n')}\n</${tag}>`;
}

// Widths reserve room for the original image, including while it is loading.
// <picture> supplies the larger preview on wide screens using HTML alone.
export function picture({ src, alt = '', ratio, variants = [], small = 216, large = small, eager = false }) {
  const candidates = variants.map(([url, width]) => `${escape(url)} ${width}w`).join(', ');
  const dimensions = width => `width="${width}"` + (ratio ? ` height="${Math.round(width / ratio)}"` : '');
  const source = large === small ? '' : `<source media="(min-width: 700px)" srcset="${candidates || escape(src)}" sizes="${large}px" ${dimensions(large)}>`;
  const img = `<img src="${escape(src)}"${candidates ? ` srcset="${candidates}" sizes="${small}px"` : ''} ${dimensions(small)} alt="${escape(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
  return source ? `<picture>${source}${img}</picture>` : img;
}

export function ready(href = '/start/') {
  return `<p><a id="contact-link" href="${escape(href)}">Ready to start?</a></p>`;
}

export function layout({ path, title, description, main, scripts = [], noindex = false }) {
  const current = path.split('/')[1];
  const canonical = site.origin + path;
  const nav = site.sections.map(({ slug, label }) => {
    const active = slug === current ? ` aria-current="${path === '/' + slug + '/' ? 'page' : 'location'}"` : '';
    return `      <li><a href="/${slug}/"${active}>${escape(label)}</a></li>`;
  }).join('\n');
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="icon" href="${current === 'start' ? '/start/assets/favicon.svg' : '/favicon.svg'}">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${escape(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Memento Design Studio">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${escape(canonical)}">
  <meta property="og:image" content="${escape(site.sharingImage)}">
  <meta name="twitter:card" content="summary_large_image">`}
  ${scripts.map(name => `<script type="module" src="/js/${name}.js"></script>`).join('\n  ')}
</head>
<body>
  <header>
    <a href="#main">Vai al contenuto</a>
    <p><a href="/"${path === '/' ? ' aria-current="page"' : ''}><img src="/assets/wordmark.svg" width="216" height="37" alt="Memento — Home"></a></p>
    <nav aria-label="Navigazione principale">
      <ul>
${nav}
      </ul>
    </nav>
  </header>
  <main id="main">
${main}
  </main>
</body>
</html>
`;
}

export function filterControl(label, items, listId, selected = 'all') {
  const options = Object.entries(items).map(([id, name]) =>
    `<option value="${escape(id)}"${id === selected ? ' selected' : ''}>${escape(name)}</option>`).join('');
  return `<p data-filter-control hidden><label>${escape(label)} <select aria-controls="${escape(listId)}">${options}</select></label> <output aria-live="polite"></output></p>`;
}

export function previewButton({ url, embed = url, title, kind = 'web', startUrl }) {
  const label = kind === 'video' ? 'Guarda il video' : 'Avvia l’esperienza';
  return `<button hidden type="button" data-preview="${escape(embed)}" data-url="${escape(url)}" data-title="${escape(title)}" data-kind="${escape(kind)}"${startUrl ? ` data-start="${escape(startUrl)}"` : ''} aria-haspopup="dialog">${label}</button>`;
}

export const previewDialog = `<dialog id="preview-dialog" aria-labelledby="preview-title">
  <h2 id="preview-title"></h2>
  <p><button type="button" data-close autofocus>Chiudi</button> <button type="button" data-fullscreen hidden>Schermo intero</button> <a data-external target="_blank" rel="noopener noreferrer">Apri in una nuova scheda</a></p>
  <div data-player></div>
</dialog>`;
