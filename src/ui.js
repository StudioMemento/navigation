import { routeUrl } from './router.js';

export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export const icon = (name = 'caret-right') => `<img class="icon" src="./sockets/servizi/assets/icons/${name}.svg" alt="" aria-hidden="true">`;
export const link = (label, path, { primary = false, query, className = '' } = {}) => `<a class="button ${primary ? 'button-primary' : 'button-secondary'} ${className}" href="${escapeHtml(routeUrl(path, query))}">${escapeHtml(label)}${icon()}</a>`;
export const eyebrow = text => `<p class="eyebrow">${escapeHtml(text)}</p>`;

export function collectionHeader({ number, title, description, world }) {
  return `<header class="collection-heading"><div>${eyebrow(`${number} / ${world}`)}<h1 tabindex="-1">${title}</h1></div><div class="collection-intro"><p>${escapeHtml(description)}</p><a class="text-link" href="#/mondi/${world === 'Level Up' ? 'level-up' : world.toLowerCase()}">Esplora il mondo ${icon()}</a></div></header>`;
}

export function detailBar(label, href, meta = '') {
  return `<div class="detail-bar"><a class="back-link" href="${escapeHtml(href)}">${icon('caret-left')}${escapeHtml(label)}</a><span class="eyebrow">${escapeHtml(meta)}</span></div>`;
}

export function filterControls({ label, path, items, active, defaultId = 'all', query = {} }) {
  const id = `filter-${path.slice(1)}`;
  return `<nav class="filter-bar collection-filters" aria-label="${escapeHtml(label)}">${items.map(item => `<a class="chip" ${active === item.id ? 'aria-current="true"' : ''} href="${escapeHtml(routeUrl(path, { ...query, categoria: item.id === defaultId ? '' : item.id }))}">${escapeHtml(item.label)}</a>`).join('')}</nav><div class="mobile-filter"><label for="${id}">Esplora per categoria</label><select id="${id}" data-filter-route="${path}" data-default="${defaultId}" aria-label="${escapeHtml(label)}">${items.map(item => `<option value="${item.id}" ${active === item.id ? 'selected' : ''}>${escapeHtml(item.label)}</option>`).join('')}</select></div>`;
}


export function card({ href, image, title, meta, description = '', className = '', priority = false }) {
  return `<a class="content-card ${className}" href="${escapeHtml(href)}"><div class="card-media cut-corner"><img src="${escapeHtml(image)}" alt="" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" width="1200" height="800"></div><div class="card-heading"><div>${eyebrow(meta)}<h2>${escapeHtml(title)}</h2></div>${icon()}</div>${description ? `<p class="card-description">${escapeHtml(description)}</p>` : ''}</a>`;
}

export function footer(context = '') {
  return `<section class="closing"><div>${eyebrow('Il prossimo progetto')}<h2>Potrebbe essere<br><em>il tuo.</em></h2></div>${link('Parliamone', '/start', { primary: true, query: context ? { oggetto: context } : undefined })}</section><footer class="site-footer"><a href="#/">Memento</a><span>Design, immagini, esperienze.</span><a href="mailto:info@mementostudio.it">info@mementostudio.it</a></footer>`;
}

export function emptyState() {
  return `<div class="empty-state"><h2>Nessun progetto trovato.</h2><p>Prova un’altra parola o rimuovi i filtri.</p><a class="text-link" href="#/portfolio">Mostra tutti i progetti ${icon()}</a></div>`;
}
