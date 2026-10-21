import { LoopScroll } from './loop-scroll.js';

/** One catalogue, one renderer, two routes. All project media stays original. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const paths = {
  arrow:'M5 19 19 5M5 5h14v14', diagonal:'M6 5h13v13', down:'m6 9 6 6 6-6', left:'m14 5-7 7 7 7', right:'m10 5 7 7-7 7',
  close:'m6 6 12 12M6 18 18 6', search:'M17 17 22 22M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  expand:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5', filter:'M4 7h7m5 0h4M4 17h3m5 0h8M11 4v6M7 14v6',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
const photo = (src, alt = '', eager = false) => `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" draggable="false">`;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const behavior = () => reducedMotion.matches ? 'instant' : 'smooth';
const viewport = $('#viewport');
const projectView = $('#project-view');
const mediaDialog = $('#media-dialog');
const loop = new LoopScroll(viewport, projectView, $('#project-progress'));
const labels = { all:'Tutti', web:'Web', '3d':'3D', film:'Film', design:'Design', foto:'Fotografia' };
const state = { projects:[], active:0, view:'catalogo', category:'all', query:'', gallery:new Map(), media:null, catalogScroll:0, catalogFocus:null };
const byId = id => state.projects.find(project => project.id === id);
const currentProject = () => state.projects[state.active];
const announce = message => { $('#announcement').textContent = message; };
history.scrollRestoration = 'manual';

function projectGallery(project) {
  if (!state.gallery.has(project.id)) state.gallery.set(project.id, { variant:0, index:0 });
  const selection = state.gallery.get(project.id);
  const variants = project.variants?.length ? project.variants : [{ id:'main', images:project.gallery }];
  const variant = variants[selection.variant] || variants[0];
  const images = variant.images?.length ? variant.images : [{ src:project.hero || project.cover, label:project.title }];
  selection.index = Math.min(selection.index, images.length - 1);
  return { selection, variants, variant, images };
}

function renderCatalogue() {
  const query = state.query.toLocaleLowerCase('it');
  const projects = state.projects.filter(project => (
    (state.category === 'all' || project.categories.includes(state.category)) &&
    `${project.title} ${project.summary || ''} ${project.tags?.join(' ') || ''}`.toLocaleLowerCase('it').includes(query)
  ));
  $('#project-grid').innerHTML = projects.map((project,index) => `<a class="project-tile ${project.layout || 'square'}" href="#slideshow/${project.id}" data-action="open-project" data-id="${project.id}" aria-label="Apri progetto ${escapeHTML(project.title)}" id="tile-${project.id}">
    <span class="tile-frame"><span class="tile-visual">${photo(project.thumbnail || project.cover,'',index < 8)}</span></span><span class="tile-name">${escapeHTML(project.title)}</span><span class="tile-arrow">${icon('diagonal')}</span></a>`).join('');
  $('#empty-state').hidden = projects.length > 0;
  $$('#filters button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === state.category)));
  $('[data-action="filter-toggle"]').dataset.active = String(state.category !== 'all');
  announce(`${projects.length} progetti`);
}

function renderFilters() {
  const available = new Set(state.projects.flatMap(project => project.categories));
  $('#filters').innerHTML = Object.entries(labels).filter(([id]) => id === 'all' || available.has(id))
    .map(([id,label]) => `<button data-action="filter" data-category="${id}" aria-pressed="${id === state.category}">${label}</button>`).join('');
}

function coverflowMarkup() {
  return `<div class="selector-band"><div class="coverflow" tabindex="0" role="region" aria-roledescription="carosello" aria-label="Progetti. Usa le frecce o trascina.">
    ${state.projects.map((project,index) => `<button class="flow-card" data-action="select-project" data-id="${project.id}" data-index="${index}" aria-label="Seleziona ${escapeHTML(project.title)}"><span class="flow-face"><span class="flow-image">${photo(project.thumbnail || project.cover)}</span></span><span class="reflection" aria-hidden="true">${photo(project.thumbnail || project.cover)}</span></button>`).join('')}
    </div><div class="flow-controls"><button class="icon-button" data-action="previous-project" aria-label="Progetto precedente">${icon('left')}</button><div class="pagination" role="group" aria-label="Seleziona un progetto"></div><button class="icon-button" data-action="next-project" aria-label="Progetto successivo">${icon('right')}</button></div></div>`;
}

function disableCloneFocus() {
  $$('[data-cycle]:not([data-cycle="1"])',projectView).forEach(cycle => {
    $$('button,a,input,[tabindex]',cycle).forEach(element => { element.tabIndex = -1; });
  });
}

function updateCoverflows() {
  const length = state.projects.length;
  const offsetFor = index => {
    let offset = (index - state.active + length) % length;
    if (offset > length / 2) offset -= length;
    return offset;
  };
  $$('.coverflow',projectView).forEach(deck => {
    $$('.flow-card',deck).forEach((card,index) => {
      const offset = offsetFor(index);
      card.style.setProperty('--offset',offset);
      card.style.setProperty('--abs',Math.abs(offset));
      card.dataset.visible = String(Math.abs(offset) <= 2);
      card.dataset.active = String(offset === 0);
      card.setAttribute('aria-hidden',String(Math.abs(offset) > 2));
      card.setAttribute('aria-pressed',String(offset === 0));
      card.tabIndex = offset === 0 ? 0 : -1;
      if (Math.abs(offset) <= 2) $('img',card).loading = 'eager';
    });
  });
  $$('.pagination',projectView).forEach(rail => {
    rail.innerHTML = state.projects.map((project,index) => {
      const offset = offsetFor(index);
      return `<button class="rail-dot" data-action="select-project" data-id="${project.id}" aria-label="Seleziona ${escapeHTML(project.title)}" aria-pressed="${offset === 0}" tabindex="${offset === 0 ? 0 : -1}" style="--offset:${offset}" data-visible="${Math.abs(offset) <= 3}"><span></span></button>`;
    }).join('');
  });
  disableCloneFocus();
}

function actionCard(project,action,label,source) {
  return `<button class="action-card" data-action="${action}" data-id="${project.id}">${photo(source)}<span>${label}</span>${icon('arrow')}</button>`;
}

function stationContent(project,cycle) {
  const { images } = projectGallery(project);
  const tag = cycle === 1 ? 'h1' : 'div';
  return `<div class="project-title-band"><${tag} class="project-title" ${cycle === 1 ? 'id="selected-title"' : ''}>${escapeHTML(project.title)}</${tag}></div>
    <div class="project-opening content-width"><div class="opening-visual">${photo(project.cover,project.title,cycle === 1)}</div><div class="opening-fade"></div>
    <div class="hero-actions">${actionCard(project,'show-gallery','Esplora progetto',images[0].thumb || images[0].src)}${project.experience ? actionCard(project,'open-experience',project.experience.type === 'video' ? 'Guarda il film' : 'Apri esperienza',project.cover) : ''}</div></div>`;
}

function galleryMarkup(project) {
  const { variants,images,selection } = projectGallery(project);
  return `<section class="gallery-section content-width" aria-label="Portfolio ${escapeHTML(project.title)}">
    <div class="gallery-heading"><h2 class="section-label">Dettaglio progetto</h2>${variants.length > 1 ? `<div class="variants" aria-label="Capitoli ${escapeHTML(project.title)}">${variants.map((variant,index) => `<button data-action="variant" data-id="${project.id}" data-index="${index}" aria-pressed="${index === selection.variant}">${escapeHTML(variant.label)}</button>`).join('')}</div>` : ''}</div>
    <div class="gallery-main"><button class="gallery-image-button" data-action="expand-image" data-id="${project.id}" aria-label="Ingrandisci ${escapeHTML(images[selection.index].label || project.title)}">${photo(images[selection.index].src,images[selection.index].label || project.title)}</button><span class="icon-button gallery-expand">${icon('expand')}</span></div>
    <div class="gallery-caption"><span class="image-caption">${escapeHTML(images[selection.index].label || project.title)}</span><span class="image-count">${selection.index + 1} / ${images.length}</span></div>
    <div class="gallery-navigation"><button class="icon-button" data-action="gallery-previous" data-id="${project.id}" aria-label="Immagine precedente" ${images.length < 2 ? 'disabled' : ''}>${icon('left')}</button>
    <div class="gallery-strip" aria-label="Immagini del progetto">${images.map((image,index) => `<button class="gallery-thumb" data-action="select-image" data-id="${project.id}" data-index="${index}" aria-label="${escapeHTML(image.label || `Immagine ${index + 1}`)}" aria-pressed="${index === selection.index}">${photo(image.thumb || image.src)}</button>`).join('')}</div>
    <button class="icon-button" data-action="gallery-next" data-id="${project.id}" aria-label="Immagine successiva" ${images.length < 2 ? 'disabled' : ''}>${icon('right')}</button></div></section>`;
}

function cycleMarkup(project,index) {
  return `<article class="loop-cycle" data-cycle="${index}"${index !== 1 ? ' aria-hidden="true"' : ` aria-label="Progetto ${escapeHTML(project.title)}"`}><div class="project-station">${coverflowMarkup()}<div class="station-content">${stationContent(project,index)}</div></div><div class="project-body">${galleryMarkup(project)}</div><div class="loop-breath"><button class="next-checkpoint" data-action="loop-next"><span>Altri progetti</span>${icon('down')}</button></div></article>`;
}

function renderProject(id) {
  closeMedia();
  state.active = Math.max(0,state.projects.findIndex(project => project.id === id));
  state.view = 'slideshow';
  $('#catalogue').hidden = true;
  projectView.hidden = false;
  $('#project-nav').hidden = false;
  $('#scroll-cue').hidden = false;
  document.body.dataset.view = 'slideshow';
  projectView.innerHTML = [0,1,2].map(index => cycleMarkup(currentProject(),index)).join('');
  updateCoverflows();
  $$('.coverflow',projectView).forEach(deck => {
    installSwipe(deck,stepProject,true);
    deck.addEventListener('keydown',event => {
      if (['ArrowRight','ArrowLeft'].includes(event.key)) {
        event.preventDefault(); stepProject(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
  });
  document.title = `${currentProject().title} — Memento Portfolio`;
  loop.start();
  viewport.focus({ preventScroll:true });
  announce(currentProject().title);
}

function selectProject(id) {
  const project = byId(id);
  if (!project) return;
  closeMedia();
  state.active = state.projects.indexOf(project);
  // Keep decks mounted so the coverflow transitions between positions.
  $$('.loop-cycle',projectView).forEach((cycle,index) => {
    $('.station-content',cycle).innerHTML = stationContent(project,index);
    $('.project-body',cycle).innerHTML = galleryMarkup(project);
    if (index === 1) cycle.setAttribute('aria-label',`Progetto ${project.title}`);
  });
  updateCoverflows();
  history.replaceState(history.state,'',`#slideshow/${id}`);
  loop.measure(); loop.seek(0);
  $('.flow-card[data-active="true"]',loop.cycle)?.focus({ preventScroll:true });
  document.title = `${project.title} — Memento Portfolio`;
  announce(project.title);
}

function stepProject(direction) {
  selectProject(state.projects[(state.active + direction + state.projects.length) % state.projects.length].id);
}

function showCatalogue() {
  closeMedia(); loop.stop();
  state.view = 'catalogo';
  projectView.hidden = true;
  $('#catalogue').hidden = false;
  $('#project-nav').hidden = true;
  $('#scroll-cue').hidden = true;
  document.body.dataset.view = 'catalogo';
  document.title = 'Portfolio — Memento';
  viewport.scrollTo({ top:state.catalogScroll, behavior:'instant' });
  if (state.catalogFocus) $(`#tile-${state.catalogFocus}`)?.focus({ preventScroll:true });
}

function openProject(id) {
  state.catalogScroll = viewport.scrollTop;
  state.catalogFocus = id;
  history.pushState({ fromCatalog:true },'',`#slideshow/${id}`);
  renderProject(id);
}

function closeProject() {
  if (history.state?.fromCatalog) history.back();
  else { history.replaceState(null,'','#catalogo'); showCatalogue(); }
}

function route() {
  const [name,id] = location.hash.replace(/^#/,'').split('/');
  if (['slideshow','progetto'].includes(name)) {
    const project = byId(id) || currentProject();
    history.replaceState(history.state,'',`#slideshow/${project.id}`);
    renderProject(project.id);
  } else showCatalogue();
}

function updateGallery(project) {
  const { images,selection } = projectGallery(project);
  $$('.gallery-section',projectView).forEach(section => {
    const image = images[selection.index];
    $('.gallery-image-button',section).innerHTML = photo(image.src,image.label || project.title,true);
    $('.gallery-image-button',section).setAttribute('aria-label',`Ingrandisci ${image.label || project.title}`);
    $('.image-caption',section).textContent = image.label || project.title;
    $('.image-count',section).textContent = `${selection.index + 1} / ${images.length}`;
    $$('.gallery-thumb',section).forEach((button,index) => button.setAttribute('aria-pressed',String(index === selection.index)));
  });
}

function stepGallery(project,direction) {
  const { images,selection } = projectGallery(project);
  selection.index = (selection.index + direction + images.length) % images.length;
  updateGallery(project);
  if (state.media?.type === 'image') renderLightbox();
}

function changeVariant(project,index) {
  const selection = projectGallery(project).selection;
  selection.variant = index; selection.index = 0;
  $$('.project-body',projectView).forEach(body => { body.innerHTML = galleryMarkup(project); });
  disableCloneFocus(); loop.measure();
  loop.toElement($('.gallery-section',loop.cycle),'instant');
  $(`[data-action="variant"][data-index="${index}"]`,loop.cycle)?.focus({ preventScroll:true });
}

function openImage(project) {
  state.media = { project:project.id, type:'image' };
  mediaDialog.classList.remove('is-experience');
  $('#media-external').hidden = true;
  renderLightbox(); mediaDialog.showModal();
}

function renderLightbox() {
  const project = byId(state.media.project);
  const { images,selection } = projectGallery(project);
  $('#media-title').textContent = project.title;
  $('#media-content').innerHTML = photo(images[selection.index].src,images[selection.index].label || project.title,true);
  $('#media-navigation').innerHTML = `<button class="icon-button" data-action="previous-image" aria-label="Immagine precedente" ${images.length < 2 ? 'disabled' : ''}>${icon('left')}</button><span>${selection.index + 1} / ${images.length}</span><button class="icon-button" data-action="next-image" aria-label="Immagine successiva" ${images.length < 2 ? 'disabled' : ''}>${icon('right')}</button>`;
}
function stepImage(direction) {
  if (state.media?.type === 'image') stepGallery(byId(state.media.project),direction);
}

function openExperience(project) {
  const experience = project.experience;
  if (!experience) return;
  if (experience.mode === 'external') { window.open(experience.url,'_blank','noopener,noreferrer'); return; }
  state.media = { project:project.id, type:'experience' };
  $('#media-title').textContent = project.title;
  $('#media-external').href = experience.url;
  $('#media-external').hidden = false;
  mediaDialog.classList.add('is-experience');
  $('#media-navigation').replaceChildren();
  if (experience.localVideo) {
    $('#media-content').innerHTML = `<video controls playsinline preload="metadata" poster="${escapeHTML(project.hero || project.cover)}"><source src="${escapeHTML(experience.localVideo)}" type="video/mp4"></video>`;
  } else {
    $('#media-content').innerHTML = `<p class="media-load-note">Caricamento dell’esperienza…</p><iframe title="${escapeHTML(project.title)} — ${experience.type === 'video' ? 'film' : 'esperienza'}" src="${escapeHTML(experience.embed || experience.url)}" allow="fullscreen; autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    $('iframe',$('#media-content')).addEventListener('load',() => { $('.media-load-note',$('#media-content'))?.remove(); },{ once:true });
  }
  mediaDialog.showModal();
}

function closeMedia() {
  if (mediaDialog.open) mediaDialog.close();
  $('#media-content').replaceChildren(); $('#media-navigation').replaceChildren();
  state.media = null;
}

/** Horizontal gestures preserve native vertical scroll and pinch zoom. */
function installSwipe(element,callback,feedback = false) {
  let gesture = null, preventClick = false;
  element.addEventListener('pointerdown',event => {
    if (event.button !== 0 || event.target.closest('iframe,video,input')) return;
    gesture = { x:event.clientX, y:event.clientY, time:performance.now(), horizontal:false };
  });
  element.addEventListener('pointermove',event => {
    if (!gesture) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { gesture = null; return; }
      if (Math.abs(dx) < 9 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      gesture.horizontal = true;
      element.setPointerCapture(event.pointerId); element.classList.add('dragging');
    }
    if (feedback) element.style.setProperty('--drag',`${Math.max(-240,Math.min(240,dx * 0.6))}px`);
  });
  function finish(event,cancel = false) {
    if (!gesture) return;
    const current = gesture; gesture = null;
    element.classList.remove('dragging'); element.style.removeProperty('--drag');
    if (!current.horizontal) return;
    preventClick = true;
    const dx = event.clientX - current.x, speed = Math.abs(dx) / Math.max(1,performance.now() - current.time);
    if (!cancel && (Math.abs(dx) > 50 || (speed > 0.35 && Math.abs(dx) > 20))) callback(dx < 0 ? 1 : -1);
    setTimeout(() => { preventClick = false; },180);
  }
  element.addEventListener('pointerup',event => finish(event));
  element.addEventListener('pointercancel',event => finish(event,true));
  element.addEventListener('click',event => { if (preventClick) { event.preventDefault(); event.stopPropagation(); } },true);
}

document.addEventListener('click',event => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  if (button.tagName === 'A' && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
  event.preventDefault();
  const project = byId(button.dataset.id), index = Number(button.dataset.index);
  const cycle = button.closest('[data-cycle]');
  if (cycle && cycle.dataset.cycle !== '1') {
    loop.seek(loop.phase());
    const match = $$('[data-action]',loop.cycle).find(item => item.dataset.action === button.dataset.action && item.dataset.id === button.dataset.id && item.dataset.index === button.dataset.index);
    match?.focus({ preventScroll:true });
  }
  switch (button.dataset.action) {
    case 'open-project': openProject(project.id); break;
    case 'close-project': closeProject(); break;
    case 'select-project':
      if (currentProject().id === project.id && button.classList.contains('flow-card')) loop.toElement($('.project-opening',loop.cycle),behavior());
      else selectProject(project.id);
      break;
    case 'previous-project': stepProject(-1); break;
    case 'next-project': stepProject(1); break;
    case 'loop-start': loop.seek(0,behavior()); break;
    case 'loop-next': loop.seek(1,behavior()); break;
    case 'loop-forward': loop.next(behavior()); break;
    case 'filter': state.category = button.dataset.category; renderCatalogue(); break;
    case 'filter-toggle': {
      const tools = $('#catalogue-tools'); tools.hidden = !tools.hidden;
      button.setAttribute('aria-expanded',String(!tools.hidden)); break;
    }
    case 'search-toggle': {
      const search = $('.search'); search.hidden = !search.hidden;
      $('#catalogue-tools').hidden = false;
      $('[data-action="filter-toggle"]').setAttribute('aria-expanded','true');
      button.setAttribute('aria-expanded',String(!search.hidden));
      if (!search.hidden) $('#search').focus(); break;
    }
    case 'clear-search': state.query = ''; $('#search').value = ''; $('.search').hidden = true; $('[data-action="search-toggle"]').setAttribute('aria-expanded','false'); renderCatalogue(); break;
    case 'reset-filters': state.category = 'all'; state.query = ''; $('#search').value = ''; renderCatalogue(); break;
    case 'show-gallery': loop.toElement($('.gallery-section',loop.cycle),behavior()); break;
    case 'open-experience': openExperience(project); break;
    case 'expand-image': openImage(project); break;
    case 'select-image': projectGallery(project).selection.index = index; updateGallery(project); break;
    case 'gallery-previous': stepGallery(project,-1); break;
    case 'gallery-next': stepGallery(project,1); break;
    case 'variant': changeVariant(project,index); break;
    case 'close-media': closeMedia(); break;
    case 'previous-image': stepImage(-1); break;
    case 'next-image': stepImage(1); break;
    case 'reload': location.reload(); break;
  }
});

$('#search').addEventListener('input',event => { state.query = event.target.value.trim(); renderCatalogue(); });
mediaDialog.addEventListener('keydown',event => {
  if (state.media?.type === 'image' && ['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); stepImage(event.key === 'ArrowRight' ? 1 : -1); }
});
mediaDialog.addEventListener('cancel',event => { event.preventDefault(); closeMedia(); });
window.addEventListener('hashchange',route);
window.addEventListener('keydown',event => {
  if (state.view !== 'slideshow' || mediaDialog.open || event.target.closest('input,textarea,select')) return;
  if (event.key === 'Home') { event.preventDefault(); loop.seek(0,behavior()); }
  if (event.key === 'End') { event.preventDefault(); loop.seek(Math.max(0,1 - viewport.clientHeight / loop.height),behavior()); }
  if (event.key === 'Escape') closeProject();
});
installSwipe($('#media-content'),stepImage);

async function init() {
  $('[data-action="filter-toggle"]').innerHTML = icon('filter');
  $('[data-action="search-toggle"]').innerHTML = icon('search');
  $('[data-action="clear-search"]').innerHTML = icon('close');
  $('[data-action="close-media"]').innerHTML = icon('close');
  try {
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Catalogue unavailable');
    state.projects = await response.json();
    if (!state.projects.length) throw new Error('Empty catalogue');
    renderFilters(); renderCatalogue(); route();
  } catch (error) {
    $('#project-grid').innerHTML = '<p class="empty-state">Il portfolio non è disponibile. <button data-action="reload">Riprova</button></p>';
    console.error(error);
  }
}
init();
