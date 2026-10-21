import { ASSET_ROOTS, CATEGORY_LABELS } from './config.js';
import { routeUrl } from './router.js';
import { card, collectionHeader, emptyState, escapeHtml as e, eyebrow, filterControls, footer, icon, link } from './ui.js';

const serviceImage = item => `${ASSET_ROOTS.services}${item.image}.webp`;
export { serviceImage };

export function renderServices({ catalog }, route) {
  const category = route.query.get('categoria') || 'overview';
  const overview = category === 'overview';
  const isBundle = category === 'percorsi';
  const family = catalog.families.find(item => item.id === category);
  const entries = isBundle ? catalog.bundles : catalog.services.filter(item => !family || item.group === family.id);
  if (family) {
    const order = family.sections.flatMap(section => section.ids);
    entries.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }
  const filters = [{ id: 'overview', label: 'Esplora' }, ...catalog.families, { id: 'percorsi', label: 'Percorsi completi' }, { id: 'all', label: 'Tutti' }];
  return `<section class="collection-slide page-width">${collectionHeader({ number: '01', title: 'Le idee<br><em>prendono forma.</em>', description: 'Un servizio mirato o un percorso completo. Trova ciò che serve al tuo progetto, dal primo segno all’esperienza finale.', world: 'Servizi' })}
    ${filterControls({ label: 'Categorie di servizi', path: '/servizi', items: filters, active: category, defaultId: 'overview' })}
    <div class="section-caption"><span>${e(family?.title || (isBundle ? 'Più servizi. Un’unica direzione.' : 'Design, produzione e possibilità.'))}</span><span>${overview ? `${catalog.families.length} ambiti / ${catalog.services.length} servizi` : `${entries.length} ${isBundle ? 'percorsi' : 'servizi'}`}</span></div>
    <div class="content-grid services-grid">${overview ? catalog.families.map((item, index) => card({ href: routeUrl('/servizi', { categoria: item.id }), image: serviceImage(item), title: item.label, meta: `${catalog.services.filter(s => s.group === item.id).length} servizi`, description: item.title, priority: index < 2 })).join('') : entries.map((item, index) => card({ href: routeUrl(`/servizi/${item.id}`, { da: category }), image: serviceImage(item), title: item.catalogTitle || item.title, meta: isBundle ? 'Percorso completo' : catalog.families.find(f => f.id === item.group)?.label, description: item.description, priority: index < 2 })).join('')}</div>
    ${footer('Vorrei capire quali servizi fanno per me')}
  </section>`;
}

export function filterProjects(projects, query) {
  const category = query.get('categoria') || 'all';
  const search = (query.get('cerca') || '').trim().toLocaleLowerCase('it');
  return projects.filter(project => (category === 'all' || project.categories.includes(category)) && `${project.title} ${project.tags.join(' ')} ${project.summary}`.toLocaleLowerCase('it').includes(search));
}

export function renderPortfolio({ projects }, route) {
  const category = route.query.get('categoria') || 'all';
  const search = route.query.get('cerca') || '';
  const categories = ['all', ...new Set(projects.flatMap(p => p.categories))];
  const filtered = filterProjects(projects, route.query);
  return `<section class="collection-slide page-width">${collectionHeader({ number: '02', title: 'Progetti<br><em>da esplorare.</em>', description: 'Identità, prodotti e mondi digitali. Una selezione di lavori e concept dello studio, da guardare da vicino.', world: 'Portfolio' })}
    <div class="filter-row">${filterControls({ label: 'Categorie di progetti', path: '/portfolio', items: categories.map(id => ({ id, label: CATEGORY_LABELS[id] || id })), active: category, query: { cerca: search } })}<form id="project-search" role="search"><label class="sr-only" for="search">Cerca un progetto</label><input id="search" name="cerca" type="search" value="${e(search)}" placeholder="Cerca un progetto" maxlength="100"><button aria-label="Cerca">${icon()}</button></form></div>
    <div class="section-caption"><span>${search ? `Risultati per “${e(search)}”` : 'Lavori selezionati'}</span><span>${filtered.length} ${filtered.length === 1 ? 'progetto' : 'progetti'}</span></div>
    <div class="content-grid portfolio-grid">${filtered.map((project, index) => card({ href: routeUrl(`/portfolio/${project.id}`, { categoria: category === 'all' ? '' : category, cerca: search }), image: `${ASSET_ROOTS.portfolio}${project.cover}`, title: project.title, meta: `${project.tags.join(' / ')} · ${project.kind}`, description: project.summary, priority: index < 2 })).join('') || emptyState()}</div>
    ${footer('Vorrei raccontarvi il mio progetto')}
  </section>`;
}

export function demoImage(demo) {
  return `${ASSET_ROOTS.demos}${demo.image || `assets/boards/${demo.id}.webp`}`;
}

export function renderExperiences({ experiences }) {
  return `<section class="collection-slide page-width">${collectionHeader({ number: '03', title: 'L’hai visto.<br><em>Ora provalo.</em>', description: 'Queste esperienze sono da usare. Esplora prodotti, scopri collezioni e prova nuove possibilità per la tua attività.', world: 'Level Up' })}
    <div class="section-caption"><span>Esperienze interattive</span><span>${experiences.length} demo da provare</span></div>
    <div class="content-grid demo-grid">${experiences.map((demo, index) => card({ href: routeUrl(`/level-up/${demo.id}`), image: demoImage(demo), title: demo.title, meta: 'Demo interattiva', description: demo.lines.join(' '), priority: index < 2 })).join('')}</div>
    <section class="closing"><div>${eyebrow('Dal concept al tuo progetto')}<h2>Pronto a fare<br><em>il level up?</em></h2></div>${link('Parliamone', '/start', { primary: true, query: { oggetto: 'Vorrei un’esperienza interattiva' } })}</section>${footerOnly()}
  </section>`;
}

function footerOnly() {
  return `<footer class="site-footer"><a href="#/">Memento</a><span>Design, immagini, esperienze.</span><a href="mailto:info@mementostudio.it">info@mementostudio.it</a></footer>`;
}

export function renderStudio({ projects }) {
  const studio = projects.find(p => p.id === 'studio');
  return `<section class="collection-slide page-width">${collectionHeader({ number: '00', title: 'Dentro<br><em>Memento.</em>', description: 'Design, produzione e possibilità. Costruiamo identità, immagini ed esperienze che parlano la stessa lingua.', world: 'Studio' })}
    <a class="studio-cover cut-corner" href="#/studio/spazio"><img src="${ASSET_ROOTS.portfolio}${studio.hero}" alt="Lo spazio Memento" width="1600" height="1000" fetchpriority="high"><span class="button button-primary">Esplora lo spazio 3D ${icon()}</span></a>
    <section class="studio-intro"><div>${eyebrow('Il nostro modo di creare')}<h2>Dal primo pensiero.<br>All’ultimo dettaglio.</h2></div><div><p>Identità, stampa, fotografia, video, 3D e web. Ogni mezzo ha il suo ruolo. La direzione resta una.</p><p>Esplora quello che facciamo, guarda i progetti o raccontaci cosa hai in mente.</p>${link('Scopri i servizi', '/servizi')}</div></section>
    <div class="content-grid">${card({ href: '#/portfolio/studio', image: `${ASSET_ROOTS.portfolio}${studio.cover}`, title: 'Lo studio, da vicino.', meta: 'Spazi e dettagli', description: 'Esplora la galleria completa dello studio.' })}${card({ href: '#/portfolio', image: './assets/hyperknife.webp', title: 'Il nostro lavoro.', meta: 'Portfolio', description: 'Progetti, immagini e concept da esplorare.' })}</div>
    ${footer()}
  </section>`;
}
