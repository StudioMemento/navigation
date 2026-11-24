import { filtersMarkup, tileMarkup } from './catalogue-markup.js';
import { domains, aliases, projectName, filterProjects, wrapIndex, validateProjects } from './catalogue.js';
import { detailMarkup, galleryFor } from './project-layout.js';
import { escapeHTML, setManifest, photo, setPhoto, hydrate, preload } from './media.js';
import { Coverflow } from './coverflow.js';
import { installSwipe } from './gestures.js';
import { fitProjectTitle } from './title-fit.js';
import { ExperiencePlayer } from './experience.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const root = document.documentElement;
const catalogue = $('#catalogue');
const view = $('#project-view');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => (reducedMotion.matches ? 'instant' : 'smooth');
const state = { projects: [], deck: [], active: null, domain: 'all', view: 'catalogo', gallery: new Map(), catalogScroll: 0, catalogFocus: null };
const byId = id => state.projects.find(project => project.id === (aliases[id] || id));
const current = () => byId(state.active);
const announce = message => { $('#announcement').textContent = message; };
/** The VFX engine (START V27) loads after the content; until then, and on any failure, the DOM page is complete. */
let vfx = null, coverflow = null, headingObserver = null;
const player = new ExperiencePlayer({ announce, onChange: element => vfx?.invalidate(element) });
history.scrollRestoration = 'manual';

/* ------------------------------------------------------------------ images */

const saveData = navigator.connection?.saveData || matchMedia('(prefers-reduced-data: reduce)').matches;
const imageObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { hydrate(entry.target); imageObserver.unobserve(entry.target); } });
}, { rootMargin: saveData ? '120px 0px' : '700px 0px' }) : null;
// selector boards are hydrated by the selector itself (they sit in a clipped, transformed strip)
const observeImages = scope => $$('img[data-src]', scope).forEach(img => {
  if (img.closest('.flow-card')) return;
  if (imageObserver) imageObserver.observe(img); else hydrate(img);
});
const unobserveImages = scope => $$('img[data-src]', scope).forEach(img => imageObserver?.unobserve(img));

/* ------------------------------------------------------------------ catalogue (home and archive) */

function renderCatalogue({ quiet = false } = {}) {
  const projects = filterProjects(state.projects, state.domain);
  const grid = $('#project-grid');
  unobserveImages(grid);
  grid.innerHTML = projects.map((project,i) => tileMarkup(project, i < 4 && state.view === 'catalogo' && !location.hash.startsWith('#slideshow/'))).join('');
  $('#empty-state').hidden = !!projects.length;
  observeImages(grid);
  $$('#filters button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.domain === state.domain)));
  markCurrent();
  vfx?.scan();
  if (!quiet) announce(`${projects.length} ${projects.length === 1 ? 'progetto' : 'progetti'}${state.domain === 'all' ? '' : ` · ${domains[state.domain]}`}`);
}

/** In a project the same catalogue becomes the archive at the end of the page: same tiles, same filters, same engine surfaces. */
function placeCatalogue(where) {
  const filters = $('#filters'), grid = $('#grid-block');
  if (where === 'archive') { $('#archive-filters')?.append(filters); $('#archive-grid')?.append(grid); }
  else { $('#filters-home').append(filters); $('#grid-home').append(grid); }
}

function markCurrent() {
  $$('#project-grid .project-tile').forEach(tile => {
    const on = state.view === 'slideshow' && tile.dataset.id === state.active;
    if (on) tile.setAttribute('aria-current', 'page'); else tile.removeAttribute('aria-current');
  });
}

/* ------------------------------------------------------------------ project */

function coverflowMarkup() {
  return `<div class="coverflow" tabindex="0" role="region" aria-roledescription="carosello" aria-label="Seleziona progetto">
    ${state.deck.map((project, index) => `<button class="flow-card" type="button" data-index="${index}" data-id="${project.id}" aria-label="${escapeHTML(projectName(project))}" data-vfx="card" data-vfx-transform data-vfx-clip=".coverflow" data-vfx-focus data-vfx-colour data-vfx-own-colour data-vfx-photo=".flow-image img"><span class="flow-face"><span class="flow-image">${photo(project.cover, { role: 'flow', lazy: true, eager: project.id === state.active })}</span></span></button>`).join('')}
  </div>`;
}

function buildSelector() {
  coverflow?.destroy();
  $('#project-selector').innerHTML = coverflowMarkup();
  const active = Math.max(0, state.deck.findIndex(project => project.id === state.active));
  coverflow = new Coverflow($('.coverflow', view), {
    active,
    onSelect: index => showProject(state.deck[index].id),
    onOpen: () => goTo('project-gallery'),
    onRender: () => vfx?.motion(),
    hydrate: card => $$('img[data-src]', card).forEach(hydrate),
  });
}

const galleryIndex = () => state.gallery.get(state.active) || 0;

function projectContent() {
  const project = current();
  $('#selected-heading').innerHTML = `<h1 class="project-title" id="selected-title" tabindex="-1" data-vfx="title" aria-label="${escapeHTML(projectName(project))}">${escapeHTML(project.title)}</h1>${project.variant ? `<p class="project-variant">${escapeHTML(project.variant)}</p>` : ''}`;
  player.detach();
  unobserveImages($('#project-content'));
  $('#project-content').innerHTML = detailMarkup(project, galleryIndex());
  player.attach($('#project-experience'), project);
  fitTitle();
  updateThumbs();
  observeImages($('#project-content'));
  preloadNeighbours();
  markCurrent();
  vfx?.scan();
  document.title = `${projectName(project)} — Memento Portfolio`;
}

function fitTitle() {
  const title = $('#selected-title');
  if (!title) return;
  fitProjectTitle(title, current()?.title);
  // START V24: only this title is painted again
  vfx?.invalidate(title);
}

function renderProject(id) {
  const project = byId(id);
  if (!project) return showCatalogue();
  state.active = project.id; state.view = 'slideshow';
  if (!state.deck.some(item => item.id === project.id)) state.deck = [...state.projects];
  catalogue.hidden = true; view.hidden = false;
  document.body.dataset.view = 'slideshow';
  view.innerHTML = `<header class="project-station" id="project-station">
      <div class="selector-band" id="project-selector"></div>
      <div class="project-title-band content-width" id="selected-heading"></div>
    </header>
    <div id="project-content"></div>
    <section class="project-archive" id="project-archive" aria-labelledby="archive-title">
      <div class="catalogue-frame">
        <header class="catalogue-heading"><h2 id="archive-title" class="gradient-text" data-vfx="title">Archivio.</h2><div class="filters-slot" id="archive-filters"></div></header>
        <div id="archive-grid"></div>
      </div>
    </section>`;
  placeCatalogue('archive');
  buildSelector();
  projectContent();
  window.scrollTo({ top: 0, behavior: 'instant' });
  $('#selected-title')?.focus({ preventScroll: true });
  headingObserver?.disconnect();
  headingObserver = new ResizeObserver(() => { fitTitle(); updateThumbs(); });
  headingObserver.observe($('#selected-heading'));
  announce(projectName(project));
}

/** The selector settled on a project: the page below follows at once. */
function showProject(id) {
  if (!byId(id) || id === state.active) return;
  state.active = id;
  projectContent();
  history.replaceState(history.state, '', `#slideshow/${id}`);
  announce(projectName(current()));
}

/** A tile of the archive: back to the top, the selector follows (with the archive's filter as its deck). */
function openFromArchive(id) {
  const deck = filterProjects(state.projects, state.domain);
  window.scrollTo({ top: 0, behavior: 'instant' });
  const same = deck.length === state.deck.length && deck.every((project, i) => project.id === state.deck[i].id);
  if (id === state.active && same) { $('#selected-title')?.focus({ preventScroll: true }); return; }
  if (!same) {
    state.deck = deck.some(project => project.id === id) ? deck : [...state.projects];
    state.active = id;
    buildSelector();
    projectContent();
    history.replaceState(history.state, '', `#slideshow/${id}`);
    announce(projectName(current()));
  } else coverflow.select(state.deck.findIndex(project => project.id === id));
  $('#selected-title')?.focus({ preventScroll: true });
}

function openProject(id) {
  if (state.view === 'slideshow') { openFromArchive(id); return; }
  state.catalogScroll = window.scrollY; state.catalogFocus = id; state.deck = filterProjects(state.projects, state.domain);
  history.pushState({ fromCatalog: true }, '', `#slideshow/${id}`);
  renderProject(id);
}

function showCatalogue() {
  headingObserver?.disconnect();
  coverflow?.destroy(); coverflow = null;
  player.detach();
  placeCatalogue('home');
  state.view = 'catalogo';
  unobserveImages(view);
  view.replaceChildren();
  view.hidden = true; catalogue.hidden = false;
  document.body.dataset.view = 'catalogo';
  document.title = 'Portfolio — Memento';
  markCurrent();
  vfx?.scan();
  window.scrollTo({ top: state.catalogScroll, behavior: 'instant' });
  if (state.catalogFocus) $(`#tile-${state.catalogFocus}`)?.focus({ preventScroll: true });
}

function closeProject() {
  if (history.state?.fromCatalog) history.back();
  else { history.replaceState(null, '', '#catalogo'); showCatalogue(); }
}

function route() {
  const [name, id] = location.hash.slice(1).split('/');
  if (['slideshow', 'progetto'].includes(name) && byId(id)) {
    const project = byId(id);
    history.replaceState(history.state, '', `#slideshow/${project.id}`);
    if (state.view === 'slideshow' && view.querySelector('.coverflow')) {
      const index = state.deck.findIndex(item => item.id === project.id);
      if (index >= 0) { coverflow.select(index); return; }
    }
    renderProject(project.id);
  } else if (state.view !== 'catalogo' || catalogue.hidden) showCatalogue();
}

function goTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }); }

/* ------------------------------------------------------------------ gallery */

function updateThumbs() {
  const thumbs = $$('.gallery-thumb', view), active = galleryIndex(), n = thumbs.length;
  thumbs.forEach((button, index) => {
    let offset = wrapIndex(index - active, n);
    if (offset > n / 2) offset -= n;
    const previous = Number(button.dataset.offset);
    button.dataset.jump = String(Number.isFinite(previous) && Math.abs(previous - offset) > 1);
    button.dataset.offset = String(offset);
    button.style.setProperty('--offset', offset);
    button.style.setProperty('--abs', Math.abs(offset));
    button.setAttribute('aria-pressed', String(index === active));
    button.tabIndex = -1;
  });
  // the edge fade only when the strip cannot show every thumbnail
  const strip = $('.gallery-thumbs', view);
  if (strip && n) {
    const step = thumbs[0].offsetWidth + (parseFloat(getComputedStyle(strip).getPropertyValue('--thumb-gap')) || 10);
    strip.dataset.overflow = String(n * step > strip.clientWidth + 1);
  }
}

function preloadNeighbours() {
  const items = galleryFor(current()), i = galleryIndex();
  if (items.length < 2 || saveData) return;
  preload(items[wrapIndex(i + 1, items.length)].src);
  preload(items[wrapIndex(i - 1, items.length)].src);
}

function changeGallery(index) {
  const project = current(), items = galleryFor(project);
  if (items.length < 2) return;
  const selected = wrapIndex(index, items.length);
  if (selected === galleryIndex()) return;
  state.gallery.set(state.active, selected);
  const image = $('.gallery-image', view), item = items[selected];
  // one element: the engine follows its 'load' and swaps the texture when the new bitmap is ready
  setPhoto(image, item.src, { alt: item.alt || projectName(project), role: 'stage' });
  updateThumbs();
  preloadNeighbours();
  announce(`Immagine ${selected + 1} di ${items.length}`);
}
const stepGallery = direction => changeGallery(galleryIndex() + direction);

/* ------------------------------------------------------------------ input */

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  if (button.tagName === 'A' && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
  event.preventDefault();
  switch (button.dataset.action) {
    case 'filter': {
      state.domain = button.dataset.domain;
      renderCatalogue();
      if (state.view === 'catalogo') window.scrollTo({ top: 0, behavior: 'instant' });
      break;
    }
    case 'reset-filters': state.domain = 'all'; renderCatalogue(); break;
    case 'open-project': openProject(button.dataset.id); break;
    case 'select-slide': changeGallery(Number(button.dataset.index)); break;
    case 'gallery-step': stepGallery(Number(button.dataset.step)); break;
    case 'experience-start': player.start(); break;
    case 'experience-expand': player.expand(); break;
    case 'experience-collapse': player.collapse(); break;
    case 'reload': location.reload(); break;
  }
});

document.addEventListener('keydown', event => {
  if (event.defaultPrevented || event.target.closest?.('input,textarea,select,memento-nav')) return;
  if (event.key === 'Escape') {
    if (player.expanded) { event.preventDefault(); player.collapse(); return; }
    if (state.view === 'slideshow') closeProject();
    return;
  }
  if (state.view !== 'slideshow') return;
  const gallery = event.target.closest?.('[data-slider="gallery"]');
  if (gallery && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
    event.preventDefault();
    if (event.key === 'Home') changeGallery(0);
    else if (event.key === 'End') changeGallery(galleryFor(current()).length - 1);
    else stepGallery(event.key === 'ArrowRight' ? 1 : -1);
  }
});

window.addEventListener('hashchange', route);
installSwipe(view, { selector: '.gallery-stage,.gallery-thumbs', canSwipe: () => galleryFor(current()).length > 1, onSwipe: (_surface, direction) => stepGallery(direction) });

// One deliberate horizontal trackpad gesture advances one image; vertical wheel input stays native.
let wheelTime = -Infinity, wheelSign = 0;
view.addEventListener('wheel', event => {
  const surface = event.target.closest('.gallery-stage,.gallery-thumbs');
  if (!surface || event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.3 || Math.abs(event.deltaX) < 4) return;
  event.preventDefault();
  const now = performance.now(), sign = Math.sign(event.deltaX), fresh = now - wheelTime > 220 || sign !== wheelSign;
  wheelTime = now; wheelSign = sign;
  if (fresh) stepGallery(sign);
}, { passive: false });

/* ------------------------------------------------------------------ start */

async function init() {
  try {
    const [response, images] = await Promise.all([
      fetch('projects.json'),
      fetch('images.json').then(r => (r.ok ? r.json() : null)).catch(() => null),
    ]);
    if (!response.ok) throw new Error('Portfolio unavailable');
    setManifest(images);
    state.projects = validateProjects(await response.json());
    state.deck = [...state.projects];
    const grid = $('#project-grid');
    if (!$('#filters').firstElementChild) $('#filters').innerHTML = filtersMarkup();
    if (grid.hasAttribute('data-initial-catalogue')) observeImages(grid);
    else renderCatalogue({ quiet: true });
    route();
    document.fonts?.ready.then(() => fitTitle());
  } catch (error) {
    $('#project-grid').innerHTML = '<div class="empty-state">Portfolio non disponibile. <button type="button" data-action="reload">Riprova</button></div>';
    console.error(error);
  }
  import('/memento-ui/effects.mjs')
    .then(({ mountVfx, mountBackground }) => {
      vfx = mountVfx();
      // START V27 background (Ghost Fibers), unless a compatible host owns the surface
      if (root.dataset.mementoSurface !== 'transparent') mountBackground?.();
    })
    .catch(() => { root.classList.remove('vfx-boot', 'vfx-live'); root.classList.add('vfx-off'); });
}
init();
