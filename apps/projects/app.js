import { domains, aliases, projectName, filterProjects, wrapIndex, modulesFor, sliderItems, validateProjects } from './catalogue.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const paths = {
  arrow:'M5 19 19 5M5 5h14v14', down:'m5 8 7 7 7-7', up:'m5 16 7-7 7 7', left:'m14 5-7 7 7 7', right:'m10 5 7 7-7 7',
  expand:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5', play:'m9 5 11 7-11 7Z',
  all:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',
  web:'M3 4h18v13H3ZM8 21h8m-4-4v4', '3d':'m12 2 9 5v10l-9 5-9-5V7Zm0 10 9-5M12 12 3 7m9 5v10',
  video:'M3 5h13v14H3Zm13 5 6-3v10l-6-3', visual:'M3 6h5l2-3h4l2 3h5v14H3Zm9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  design:'m4 17 13-13 4 4L8 21H4Zm10-10 4 4', branding:'M4 4h16v16H4ZM8 16V8l4 5 4-5v8',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
const photo = (src, alt = '', eager = false) => `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" draggable="false">`;
const viewport = $('#viewport');
const view = $('#project-view');
const dialog = $('#media-dialog');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => reducedMotion.matches ? 'instant' : 'smooth';
const state = { projects:[], deck:[], active:null, domain:'all', view:'catalogo', slides:new Map(), catalogScroll:0, catalogFocus:null, media:null };
const byId = id => state.projects.find(project => project.id === (aliases[id] || id));
const current = () => byId(state.active);
const announce = message => { $('#announcement').textContent = message; };
let scrollFrame = 0, observer, modelViewerPromise;
history.scrollRestoration = 'manual';

function renderFilters() {
  $('#filters').innerHTML = `<button data-action="filter" data-domain="all" aria-label="Tutti i domini" title="Tutti i domini" aria-pressed="true" class="filter-all">${icon('all')}</button>` + Object.entries(domains).map(([id,label]) => `<button data-action="filter" data-domain="${id}" aria-controls="project-grid" aria-pressed="false">${icon(id)}<span>${label}</span></button>`).join('');
}
function renderCatalogue() {
  const projects = filterProjects(state.projects,state.domain);
  $('#project-grid').innerHTML = projects.map((project,index) => `<a class="project-tile ${project.layout || 'square'}" href="#slideshow/${project.id}" data-action="open-project" data-id="${project.id}" aria-label="Apri progetto ${escapeHTML(projectName(project))}" id="tile-${project.id}">
    <span class="tile-frame"><span class="tile-visual">${photo(project.thumbnail || project.cover,'',index < 6)}</span></span>
    <span class="tile-domains">${project.domains.map(domain => `<span>${domains[domain]}</span>`).join('')}</span>
    <span class="tile-name">${escapeHTML(project.title)}${project.variant ? `<span class="tile-variant">${escapeHTML(project.variant)}</span>` : ''}</span><span class="tile-arrow">${icon('arrow')}</span></a>`).join('');
  $('#empty-state').hidden = !!projects.length;
  $$('#filters button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.domain === state.domain)));
  announce(`${projects.length} ${projects.length===1?'progetto':'progetti'}${state.domain === 'all' ? '' : ` · ${domains[state.domain]}`}`);
}
function coverflowMarkup() {
  return `<div class="selector-band"><div class="coverflow" tabindex="0" role="region" aria-roledescription="carosello" aria-label="Seleziona progetto">
    ${state.deck.map(project => `<button class="flow-card" data-action="select-project" data-id="${project.id}" aria-label="Seleziona ${escapeHTML(projectName(project))}"><span class="flow-face"><span class="flow-image">${photo(project.thumbnail || project.cover)}</span></span><span class="reflection" aria-hidden="true">${photo(project.thumbnail || project.cover)}</span></button>`).join('')}
    </div><div class="flow-controls"><button class="icon-button" data-action="previous-project" aria-label="Progetto precedente">${icon('left')}</button><div class="pagination" role="group" aria-label="Progetti"></div><button class="icon-button" data-action="next-project" aria-label="Progetto successivo">${icon('right')}</button></div></div>`;
}
function updateCoverflow() {
  const length = state.deck.length, active = state.deck.findIndex(project => project.id === state.active);
  const offsetFor = index => { let offset = wrapIndex(index-active,length); if(offset>length/2) offset-=length; return offset; };
  $$('.flow-card',view).forEach((card,index) => {
    const offset = offsetFor(index), visible = Math.abs(offset)<=2;
    card.style.setProperty('--offset',offset); card.style.setProperty('--abs',Math.abs(offset));
    card.dataset.visible = String(visible); card.dataset.active = String(offset===0);
    card.setAttribute('aria-hidden',String(!visible)); card.setAttribute('aria-pressed',String(offset===0)); card.tabIndex = visible ? 0 : -1;
    if(visible) $$('img',card).forEach(image => { image.loading='eager'; });
  });
  $('.pagination',view).innerHTML = state.deck.map((project,index) => {
    const offset=offsetFor(index);
    return `<button class="rail-dot" data-action="select-project" data-id="${project.id}" aria-label="Seleziona ${escapeHTML(projectName(project))}" aria-pressed="${offset===0}" tabindex="${Math.abs(offset)<=3 ? 0 : -1}" style="--offset:${offset}" data-visible="${Math.abs(offset)<=3}"><span></span></button>`;
  }).join('');
  $$('.flow-controls>.icon-button',view).forEach(button => {button.disabled=length<2;});
}
function slideIndex(project,id) { return state.slides.get(`${project.id}/${id}`) || 0; }
function stageMarkup(project,id) {
  const items=sliderItems(project,id), item=items[slideIndex(project,id)];
  if(!item) return '';
  if(item.type==='image') return `<button class="slide-open" data-action="open-slide" data-slider-id="${id}" aria-label="Ingrandisci ${escapeHTML(item.alt || projectName(project))}">${photo(item.src,item.alt || projectName(project),id==='overview')}<span class="stage-expand">${icon('expand')}</span></button>`;
  return `<button class="slide-open media-poster" data-action="activate-media" data-slider-id="${id}" aria-label="${item.type==='video'?'Riproduci video':item.type==='model'?'Esplora modello 3D':'Apri contenuto'}">${photo(item.poster,'')}<span class="play-icon">${icon(item.type==='video'?'play':item.type==='model'?'3d':'arrow')}</span></button>`;
}
function sliderMarkup(project,id,overview=false) {
  const items=sliderItems(project,id), index=slideIndex(project,id);
  if(!items.length) return '';
  return `<div class="slider ${overview?'overview-slider':''}" data-slider="${id}" role="region" aria-roledescription="carosello" aria-label="${overview?'Anteprime':escapeHTML(modulesFor(project).find(module=>module.id===id)?.title)}" tabindex="0">
    <div class="slider-stage">${stageMarkup(project,id)}</div>
    <div class="slider-footer"><button class="icon-button" data-action="slide-previous" data-slider-id="${id}" aria-label="Media precedente" ${items.length<2?'disabled':''}>${icon('left')}</button>
    <div class="slide-thumbs" role="group" aria-label="Scegli media">${items.map((item,i)=>`<button class="slide-thumb" data-action="select-slide" data-slider-id="${id}" data-index="${i}" aria-label="${escapeHTML(item.alt || `Media ${i+1}`)}" aria-pressed="${i===index}">${photo(item.thumb || item.poster || item.src)}</button>`).join('')}</div>
    <span class="slide-count" aria-live="polite">${String(index+1).padStart(2,'0')} <span>/ ${String(items.length).padStart(2,'0')}</span></span>
    <button class="icon-button" data-action="slide-next" data-slider-id="${id}" aria-label="Media successivo" ${items.length<2?'disabled':''}>${icon('right')}</button></div></div>`;
}
function projectContent() {
  const project=current(), modules=modulesFor(project);
  $('#selected-heading').innerHTML=`<h1 class="project-title" id="selected-title" tabindex="-1">${escapeHTML(project.title)}</h1>${project.variant?`<div class="project-variant">${escapeHTML(project.variant)}</div>`:''}`;
  $('#project-overview').innerHTML=sliderMarkup(project,'overview',true);
  $('#project-chapters').innerHTML=`<nav class="chapter-bar" aria-label="Contenuti del progetto"><button class="chapter-project" data-action="checkpoint-start" aria-label="Torna all’inizio di ${escapeHTML(projectName(project))}">${escapeHTML(projectName(project))}</button><div class="chapter-links">${modules.map(module=>`<button class="chapter-link" data-action="jump" data-target="chapter-${module.id}">${escapeHTML(module.title)}</button>`).join('')}</div>${project.experience?`<button class="experience-link" data-action="open-experience">Apri esperienza ${icon('arrow')}</button>`:''}</nav>
    <div class="chapters">${modules.map((module,index)=>`<section class="media-module content-width" id="chapter-${module.id}" aria-labelledby="title-${module.id}"><h2 class="module-title" id="title-${module.id}">${escapeHTML(module.title)}</h2>${sliderMarkup(project,module.id)}</section>`).join('')}</div>
    <div class="project-finish" id="project-finish"><button class="next-checkpoint" data-action="checkpoint-start" aria-label="Torna al selettore dei progetti"><svg viewBox="0 0 200 110" aria-hidden="true"><path d="m10 10 90 85 90-85"/></svg></button></div>`;
  $('#cue-stops').innerHTML=[{id:'project-overview',title:'Anteprime'},...modules.map(module=>({id:`chapter-${module.id}`,title:module.title}))].map(stop=>`<button class="cue-stop" data-action="jump" data-target="${stop.id}" aria-label="Vai a ${escapeHTML(stop.title)}" title="${escapeHTML(stop.title)}"></button>`).join('');
  fitTitle(); updateCoverflow(); scheduleProgress();
  document.title=`${projectName(project)} — Memento Portfolio`;
}
function fitTitle() {
  const title=$('#selected-title'); if(!title)return;
  title.style.removeProperty('font-size');
  const width=Math.min(title.parentElement.clientWidth,title.clientWidth), textWidth=title.scrollWidth;
  if(textWidth>width) title.style.fontSize=`${parseFloat(getComputedStyle(title).fontSize)*width/textWidth}px`;
}
function renderProject(id) {
  closeMedia(false);
  const project=byId(id); if(!project)return showCatalogue();
  state.active=project.id; state.view='slideshow';
  if(!state.deck.some(item=>item.id===project.id))state.deck=[...state.projects];
  $('#catalogue').hidden=true; view.hidden=false; $('#project-nav').hidden=false; $('#scroll-cue').hidden=false;
  document.body.dataset.view='slideshow';
  view.innerHTML=`<header class="project-station" id="project-station">${coverflowMarkup()}<div class="project-title-band" id="selected-heading"></div><button class="peek-cue" data-action="jump" data-target="project-overview" aria-label="Scorri e scopri il progetto">${icon('down')}${icon('down')}</button></header><div class="project-overview content-width" id="project-overview"></div><div id="project-chapters"></div>`;
  projectContent(); viewport.scrollTo({top:0,behavior:'instant'}); viewport.focus({preventScroll:true});
  observer?.disconnect(); observer=new ResizeObserver(()=>{fitTitle();scheduleProgress();});observer.observe(viewport);observer.observe(view);
  announce(projectName(project));
}
function selectProject(id) {
  if(state.active===id)return goTo('project-overview');
  closeMedia(false); state.active=id;
  projectContent(); history.replaceState(history.state,'',`#slideshow/${id}`);
  viewport.scrollTo({top:0,behavior:'instant'});
  announce(projectName(current()));
}
function stepProject(direction) {
  const active=state.deck.findIndex(project=>project.id===state.active);
  selectProject(state.deck[wrapIndex(active+direction,state.deck.length)].id);
}
function openProject(id) {
  state.catalogScroll=viewport.scrollTop; state.catalogFocus=id;
  state.deck=filterProjects(state.projects,state.domain);
  history.pushState({fromCatalog:true},'',`#slideshow/${id}`); renderProject(id);
}
function showCatalogue() {
  closeMedia(false); observer?.disconnect(); state.view='catalogo';
  view.hidden=true; $('#catalogue').hidden=false; $('#project-nav').hidden=true; $('#scroll-cue').hidden=true;
  document.body.dataset.view='catalogo'; document.title='Portfolio — Memento';
  viewport.scrollTo({top:state.catalogScroll,behavior:'instant'});
  if(state.catalogFocus)$(`#tile-${state.catalogFocus}`)?.focus({preventScroll:true});
}
function closeProject() {
  if(history.state?.fromCatalog)history.back();
  else{history.replaceState(null,'','#catalogo');showCatalogue();}
}
function route() {
  const [name,id]=location.hash.slice(1).split('/');
  if(['slideshow','progetto'].includes(name)&&byId(id)){
    const project=byId(id);history.replaceState(history.state,'',`#slideshow/${project.id}`);renderProject(project.id);
  }else showCatalogue();
}
function positionFor(element) {
  const sticky=$('.chapter-bar'), offset=element.classList.contains('media-module')?(sticky?.offsetHeight || 0)+84:20;
  return Math.max(0,element.getBoundingClientRect().top-viewport.getBoundingClientRect().top+viewport.scrollTop-offset);
}
function goTo(id) {
  const element=document.getElementById(id); if(element)viewport.scrollTo({top:positionFor(element),behavior:scrollBehavior()});
}
function goStart() {
  viewport.scrollTo({top:0,behavior:scrollBehavior()}); $('#selected-title')?.focus({preventScroll:true});
}
function nextCheckpoint() {
  const targets=[$('#project-overview'),...$$('.media-module'),$('#project-finish')].filter(Boolean);
  const next=targets.find(element=>positionFor(element)>viewport.scrollTop+60);
  if(next)goTo(next.id);else goStart();
}
function scheduleProgress(){if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateProgress();});}
function updateProgress() {
  if(state.view!=='slideshow')return;
  const max=Math.max(1,viewport.scrollHeight-viewport.clientHeight), progress=Math.min(1,viewport.scrollTop/max);
  const range=$('#project-progress');range.value=Math.round(progress*1000);range.setAttribute('aria-valuetext',`${Math.round(progress*100)}%`);
  $('#scroll-cue').style.setProperty('--progress',progress);
  $('#project-nav').classList.toggle('is-scrolled',viewport.scrollTop>120);
  $('.peek-cue').classList.toggle('is-hidden',viewport.scrollTop>40);
  const threshold=viewport.scrollTop+($('.chapter-bar')?.offsetHeight || 0)+100;
  let active='project-overview';
  $$('.media-module').forEach(module=>{if(positionFor(module)<=threshold)active=module.id;});
  $$('.chapter-link').forEach(button=>{if(button.dataset.target===active)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');});
  $$('.cue-stop').forEach(button=>{
    button.style.setProperty('--stop',Math.min(.97,positionFor(document.getElementById(button.dataset.target))/max));
    button.setAttribute('aria-current',String(button.dataset.target===active));
  });
}
function changeSlide(id,index) {
  const project=current(),items=sliderItems(project,id); if(!items.length)return;
  const selected=wrapIndex(index,items.length);state.slides.set(`${project.id}/${id}`,selected);
  const slider=$(`[data-slider="${id}"]`,view);if(!slider)return;
  $('.slider-stage',slider).innerHTML=stageMarkup(project,id);
  $('.slide-count',slider).innerHTML=`${String(selected+1).padStart(2,'0')} <span>/ ${String(items.length).padStart(2,'0')}</span>`;
  $$('.slide-thumb',slider).forEach((button,i)=>button.setAttribute('aria-pressed',String(i===selected)));
  const active=$('.slide-thumb[aria-pressed="true"]',slider),strip=$('.slide-thumbs',slider);
  strip.scrollTo({left:active.offsetLeft-strip.offsetLeft-(strip.clientWidth-active.offsetWidth)/2,behavior:scrollBehavior()});
  if(state.media?.slider===id)renderDialogSlide();
}
function stepSlide(id,direction){changeSlide(id,slideIndex(current(),id)+direction);}
function prepareDialog(title) {
  state.dialogFocus=document.activeElement;state.dialogScroll=viewport.scrollTop;
  $('#media-title').textContent=title;
  $('#media-external').hidden=true;$('#media-external').removeAttribute('href');
  document.body.classList.add('modal-open');
  if(!dialog.open)dialog.showModal();
  $('[data-action="close-media"]').focus({preventScroll:true});
}
function externalLink(url) {
  const link=$('#media-external');link.hidden=!url;if(url)link.href=url;
}
function renderDialogSlide() {
  const project=current(),id=state.media.slider,items=sliderItems(project,id),index=slideIndex(project,id),item=items[index];
  dialog.classList.toggle('is-experience',item.type!=='image');
  externalLink(item.url);
  if(item.type==='image')$('#media-content').innerHTML=photo(item.src,item.alt || projectName(project),true);
  else mountMedia($('#media-content'),item);
  $('#media-navigation').innerHTML=items.length>1?`<button class="icon-button" data-action="dialog-previous" aria-label="Media precedente">${icon('left')}</button><span>${String(index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}</span><button class="icon-button" data-action="dialog-next" aria-label="Media successivo">${icon('right')}</button>`:'';
  $('#media-navigation').hidden=items.length<2;
}
function openSlide(id) {
  state.media={slider:id};prepareDialog(projectName(current()));renderDialogSlide();
}
function openExperience() {
  const project=current(),experience=project.experience;if(!experience)return;
  state.media={experience:true};prepareDialog(projectName(project));
  dialog.classList.add('is-experience');$('#media-navigation').replaceChildren();$('#media-navigation').hidden=true;
  externalLink(experience.url);
  mountMedia($('#media-content'),{type:experience.type==='video'?'video':'embed',embed:experience.embed || (!experience.localVideo?experience.url:undefined),src:experience.localVideo,poster:project.cover,alt:projectName(project)});
}
function loadModelViewer() {
  if(!modelViewerPromise)modelViewerPromise=import('./vendor/model-viewer.min.js').catch(error=>{modelViewerPromise=null;throw error;});
  return modelViewerPromise;
}
function mountMedia(container,item) {
  container.replaceChildren();
  if(item.type==='video' && item.src && !item.embed){
    const video=document.createElement('video');video.src=item.src;video.poster=item.poster || '';video.controls=true;video.playsInline=true;video.preload='metadata';
    if(item.captions){const track=document.createElement('track');Object.assign(track,{src:item.captions,kind:'captions',srclang:item.language || 'it',label:'Sottotitoli',default:true});video.append(track);}
    container.append(video);return;
  }
  if(item.type==='model' && item.src && !item.embed){
    const viewer=document.createElement('model-viewer');
    viewer.setAttribute('src',item.src);viewer.setAttribute('alt',item.alt || 'Modello 3D');viewer.setAttribute('camera-controls','');viewer.setAttribute('touch-action','pan-y');viewer.setAttribute('shadow-intensity','0.7');
    if(item.poster)viewer.setAttribute('poster',item.poster);
    container.append(viewer);loadModelViewer().catch(()=>{if(viewer.isConnected){container.innerHTML='<span class="media-error">Modello non disponibile.</span>';}});return;
  }
  const iframe=document.createElement('iframe');iframe.title=item.alt || 'Esperienza Memento';iframe.src=item.embed || item.src;
  iframe.allow='fullscreen; autoplay; encrypted-media; picture-in-picture';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';
  // Keep third-party navigation inside the frame; user-initiated external links remain possible.
  iframe.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-presentation allow-pointer-lock');
  container.append(iframe);
}
function activateMedia(id) {
  const item=sliderItems(current(),id)[slideIndex(current(),id)];
  const stage=$(`[data-slider="${id}"] .slider-stage`,view);mountMedia(stage,item);
}
function closeMedia(restore=true) {
  if(!dialog.open&&!state.media)return;
  if(dialog.open)dialog.close();
  $('#media-content').replaceChildren();$('#media-navigation').replaceChildren();state.media=null;document.body.classList.remove('modal-open');
  if(restore){viewport.scrollTo({top:state.dialogScroll || 0,behavior:'instant'});if(state.dialogFocus?.isConnected)state.dialogFocus.focus({preventScroll:true});}
}

/** Pointer gestures never intercept vertical page scrolling or interactive media. */
function installGestures(root) {
  let gesture=null,suppressUntil=0;
  root.addEventListener('pointerdown',event=>{
    if(event.button!==0 || event.target.closest('video,iframe,model-viewer,input'))return;
    const surface=event.target.closest('.coverflow,.slider-stage,#media-content');if(!surface)return;
    gesture={surface,x:event.clientX,y:event.clientY,time:performance.now(),horizontal:false};
  });
  root.addEventListener('pointermove',event=>{
    if(!gesture)return;const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
    if(!gesture.horizontal){if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){gesture=null;return;}if(Math.abs(dx)<10||Math.abs(dx)<Math.abs(dy)*1.2)return;gesture.horizontal=true;gesture.surface.setPointerCapture(event.pointerId);gesture.surface.classList.add('dragging');}
    if(gesture.surface.classList.contains('coverflow'))gesture.surface.style.setProperty('--drag',`${Math.max(-220,Math.min(220,dx*.55))}px`);
  });
  function finish(event,cancel=false){
    if(!gesture)return;const g=gesture;gesture=null;g.surface.classList.remove('dragging');g.surface.style.removeProperty('--drag');if(!g.horizontal)return;
    if(g.surface.hasPointerCapture?.(event.pointerId))g.surface.releasePointerCapture(event.pointerId);
    suppressUntil=performance.now()+300;const dx=event.clientX-g.x,speed=Math.abs(dx)/Math.max(1,performance.now()-g.time);
    if(cancel || !(Math.abs(dx)>45 || Math.abs(dx)>20&&speed>.35))return;
    const direction=dx<0?1:-1;
    if(g.surface.classList.contains('coverflow'))stepProject(direction);
    else if(g.surface.id==='media-content'){if(state.media?.slider)stepSlide(state.media.slider,direction);}
    else stepSlide(g.surface.closest('[data-slider]').dataset.slider,direction);
  }
  root.addEventListener('pointerup',event=>finish(event));root.addEventListener('pointercancel',event=>finish(event,true));
  root.addEventListener('click',event=>{if(performance.now()<suppressUntil){event.preventDefault();event.stopPropagation();}},true);
}

document.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
  if(button.tagName==='A'&&(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey))return;
  event.preventDefault();const id=button.dataset.id,slider=button.dataset.sliderId;
  switch(button.dataset.action){
    case 'filter':state.domain=button.dataset.domain;renderCatalogue();viewport.scrollTo({top:0,behavior:'instant'});break;
    case 'reset-filters':state.domain='all';renderCatalogue();break;
    case 'open-project':openProject(id);break;
    case 'close-project':closeProject();break;
    case 'select-project':selectProject(id);break;
    case 'previous-project':stepProject(-1);break;
    case 'next-project':stepProject(1);break;
    case 'jump':goTo(button.dataset.target);break;
    case 'checkpoint-start':goStart();break;
    case 'checkpoint-next':nextCheckpoint();break;
    case 'slide-previous':stepSlide(slider,-1);break;
    case 'slide-next':stepSlide(slider,1);break;
    case 'select-slide':changeSlide(slider,Number(button.dataset.index));break;
    case 'open-slide':openSlide(slider);break;
    case 'activate-media':activateMedia(slider);break;
    case 'open-experience':openExperience();break;
    case 'close-media':closeMedia();break;
    case 'dialog-previous':stepSlide(state.media.slider,-1);break;
    case 'dialog-next':stepSlide(state.media.slider,1);break;
    case 'reload':location.reload();break;
  }
});
document.addEventListener('keydown',event=>{
  if(event.target.closest('input,textarea,select,video,model-viewer'))return;
  if(dialog.open){if(state.media?.slider&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();stepSlide(state.media.slider,event.key==='ArrowRight'?1:-1);}return;}
  if(state.view!=='slideshow')return;
  if(event.key==='Escape')closeProject();
  if(event.key==='Home'){event.preventDefault();goStart();}
  if(event.key==='End'){event.preventDefault();goTo('project-finish');}
  if(['ArrowLeft','ArrowRight'].includes(event.key)){
    const direction=event.key==='ArrowRight'?1:-1,slider=event.target.closest('[data-slider]');
    if(slider){event.preventDefault();stepSlide(slider.dataset.slider,direction);}
    else if(event.target.closest('.coverflow,.flow-controls')){event.preventDefault();stepProject(direction);}
  }
});
let backdropPointer=false;
dialog.addEventListener('pointerdown',event=>{backdropPointer=event.target===dialog;});
dialog.addEventListener('click',event=>{if(backdropPointer&&event.target===dialog)closeMedia();backdropPointer=false;});
dialog.addEventListener('cancel',event=>{event.preventDefault();closeMedia();});
$('#project-progress').addEventListener('input',event=>viewport.scrollTo({top:(viewport.scrollHeight-viewport.clientHeight)*Number(event.target.value)/1000,behavior:'instant'}));
viewport.addEventListener('scroll',scheduleProgress,{passive:true});
window.addEventListener('hashchange',route);
installGestures(view);installGestures(dialog);

async function init(){
  try{
    const response=await fetch('projects.json');if(!response.ok)throw new Error('Portfolio unavailable');
    state.projects=validateProjects(await response.json());state.deck=[...state.projects];
    renderFilters();renderCatalogue();route();document.fonts.ready.then(fitTitle);
  }catch(error){$('#project-grid').innerHTML='<div class="empty-state">Portfolio non disponibile. <button data-action="reload">Riprova</button></div>';console.error(error);}
}
init();
