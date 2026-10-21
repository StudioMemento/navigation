import { ASSET_ROOTS } from './config.js';
import { routeUrl } from './router.js';
import { detailBar, escapeHtml as e, eyebrow, footer, icon, link } from './ui.js';
import { serviceImage } from './collections.js';

export function renderService(data, route) {
  const item = [...data.catalog.services, ...data.catalog.bundles].find(item => item.id === route.parts[1]);
  if (!item) return null;
  const category = data.catalog.families.find(f => f.id === item.group);
  const backCategory = route.query.get('da') || (item.kind === 'bundle' ? 'percorsi' : item.group);
  const meta = category?.label || 'Percorso completo';
  return `<section class="focus-slide page-width">${detailBar('Torna ai servizi', routeUrl('/servizi', { categoria: backCategory === 'overview' ? '' : backCategory }), meta)}
    <div class="focus-grid"><div class="focus-visual cut-corner"><img src="${serviceImage(item)}" alt="${e(item.alt)}" width="1120" height="1120" fetchpriority="high"></div><div class="focus-copy">${eyebrow(meta)}<h1 tabindex="-1">${e(item.title)}</h1><p class="lead">${e(item.description)}</p>${link('Parliamo del tuo progetto', '/start', { primary: true, query: { oggetto: item.title } })}<a class="text-link" href="#/level-up">Guarda cosa puoi fare ${icon()}</a></div></div>
    <div class="service-information"><section>${eyebrow('01 / Il lavoro')}<h2>Cosa facciamo.</h2><p>${e(item.details.does)}</p></section><section>${eyebrow('02 / Il punto di partenza')}<h2>Quando serve.</h2><p>${e(item.details.solves)}</p></section><section>${eyebrow('03 / Insieme a te')}<h2>Da cosa partiamo.</h2><p>${e(item.details.needs)}</p></section><section>${eyebrow('04 / Il risultato')}<h2>Cosa ricevi.</h2><ul class="deliverable-list">${item.details.gets.map(text => `<li>${e(text)}</li>`).join('')}</ul></section></div>
    ${item.covers ? `<section class="bundle-includes">${eyebrow('Il percorso comprende')}<h2>Un’unica direzione.</h2>${item.covers.map(id => { const service = data.catalog.services.find(s => s.id === id); return `<a class="service-row" href="#/servizi/${id}"><img src="${serviceImage(service)}" alt="" loading="lazy"><span>${e(service.title)}</span>${icon()}</a>`; }).join('')}</section>` : ''}
    ${footer(item.title)}
  </section>`;
}

export function selectedProject(data, route) {
  const project = data.projects.find(p => p.id === route.parts[1]);
  if (!project) return null;
  const variant = project.variants?.find(v => v.id === route.query.get('variante')) || project.variants?.[0];
  return { project, variant, images: variant?.images || project.gallery || [] };
}

export function renderProject(data, route) {
  const selected = selectedProject(data, route);
  if (!selected) return null;
  const { project, variant, images } = selected;
  const backQuery = { categoria: route.query.get('categoria'), cerca: route.query.get('cerca') };
  const experience = project.experience;
  const demo = data.experiences.find(d => ({ 'ice-cream': 'icecream', mementosl: 'gamma' }[project.id] || project.id) === d.id);
  return `<article class="focus-slide project-focus page-width">${detailBar('Torna ai progetti', routeUrl('/portfolio', backQuery), project.kind)}
    <div class="project-intro"><div>${eyebrow(project.tags.join(' / '))}<h1 tabindex="-1">${e(project.title)}</h1></div><div><p class="lead">${e(project.summary)}</p>${demo ? link('Prova l’esperienza', `/level-up/${demo.id}`) : experience ? `<a class="text-link" href="${e(experience.url)}" target="_blank" rel="noopener noreferrer">${experience.type === 'video' ? 'Guarda il film' : 'Apri il progetto'} ${icon()}<span class="sr-only">, nuova scheda</span></a>` : ''}</div></div>
    ${project.variants ? `<nav class="filter-bar variant-bar" aria-label="Varianti del progetto">${project.variants.map(v => `<a class="chip" ${v.id === variant.id ? 'aria-current="true"' : ''} href="${e(routeUrl(`/portfolio/${project.id}`, { ...backQuery, variante: v.id }))}">${e(v.label)}</a>`).join('')}</nav>` : ''}
    <div class="project-hero cut-corner"><img src="${ASSET_ROOTS.portfolio}${variant?.hero || project.hero}" alt="${e(project.title)} — ${e(variant?.label || project.summary)}" width="1600" height="1000" fetchpriority="high"></div>
    <div class="gallery-heading"><h2>${e(project.galleryTitle || 'Dentro il progetto.')}</h2><span class="eyebrow">${images.length} immagini</span></div>
    <div class="project-gallery">${images.map((item, index) => `<button class="gallery-item" data-image="${index}" aria-label="Ingrandisci ${e(item.label || `immagine ${index + 1}`)}"><div class="cut-corner"><img src="${ASSET_ROOTS.portfolio}${item.thumb || item.src}" alt="${e(item.label || project.title)}" loading="lazy" decoding="async" width="1000" height="800"></div><span>${e(item.label || `Immagine ${index + 1}`)}</span><span class="gallery-number">${String(index + 1).padStart(2, '0')}</span></button>`).join('')}</div>
    ${footer(`Un progetto come ${project.title}`)}
  </article>`;
}

export function renderDemo(data, route) {
  const demo = data.experiences.find(d => d.id === route.parts[1]);
  if (!demo) return null;
  return `<section class="demo-focus page-width">${detailBar('Tutte le esperienze', '#/level-up', 'Demo interattiva')}
    <header class="demo-heading"><div><h1 tabindex="-1">${e(demo.title)}</h1><p>${e(demo.lines.join(' '))}</p></div><div class="demo-actions"><a class="text-link" href="${e(demo.url)}" target="_blank" rel="noopener noreferrer">Apri in una nuova scheda ${icon()}</a>${link('La vorrei per il mio brand', '/start', { primary: true, query: { oggetto: `Un’esperienza come ${demo.title}` } })}</div></header>
    <div class="experience-frame"><p class="frame-loading" role="status">Caricamento dell’esperienza…</p><iframe src="${e(demo.url)}" title="Demo ${e(demo.title)}" allow="fullscreen; autoplay; xr-spatial-tracking" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-downloads"></iframe></div>
    <p class="frame-note">Esplora la demo qui sopra. Se il sito non consente l’anteprima, usa “Apri in una nuova scheda”.</p>
  </section>`;
}

export function renderStudioSpace() {
  return `<section class="demo-focus page-width">${detailBar('Torna allo studio', '#/studio', 'Spazio 3D')}<header class="demo-heading"><div><h1 tabindex="-1">Entra nello studio.</h1><p>Quattro zone. Un unico spazio da esplorare.</p></div>${link('Guarda le immagini', '/portfolio/studio')}</header><div class="experience-frame studio-frame"><iframe src="./sockets/studio/index.html#studio" title="Esplora lo studio Memento in 3D"></iframe></div><p class="frame-note">Trascina per guardarti intorno. Scegli una zona dai comandi in basso.</p></section>`;
}
