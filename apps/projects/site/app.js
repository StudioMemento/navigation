import { domains, aliases, projectName, filterProjects, wrapIndex, validateProjects } from './catalogue.js';
import { detailFor, detailMarkup, galleryStage, processStage, number } from './project-layout.js';
import { installSwipe, installDragScroll } from './gestures.js';

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
let imageManifest = {images:{},aliases:{}};
const imageSizes = {
  tile:'(max-width:767px) calc(50vw - 27px), (max-width:1100px) 31vw, (min-width:2100px) 470px, 23vw',
  wide:'(max-width:767px) calc(50vw - 27px), (max-width:1100px) 62vw, (min-width:2100px) 950px, 46vw',
  flow:'(max-width:767px) min(68vw, 36svh), min(43vw, 54svh, 840px)',
  thumb:'(max-width:767px) 70px, (min-width:1667px) 150px, 9vw',
  stage:'(min-width:2500px) 2200px, (min-width:2160px) 1900px, 88vw', dialog:'80vw'
};
function photo(src,alt='',eager=false,role='stage') {
  const canonical=imageManifest.aliases[src] || src, data=imageManifest.images[canonical];
  const variants=data?.variants || [], fallback=variants.find(item=>item.width>=480)?.src || canonical;
  const sizes=imageSizes[role] || imageSizes.stage;
  const set=variants.map(item=>`${item.src} ${item.width}w`).join(', ');
  return `<img ${eager?'src':'data-src'}="${escapeHTML(fallback)}" ${set?`${eager?'srcset':'data-srcset'}="${escapeHTML(set)}" sizes="${sizes}"`:''} ${data?`width="${data.width}" height="${data.height}"`:''} alt="${escapeHTML(alt)}" loading="${eager?'eager':'lazy'}" fetchpriority="${eager&&role==='stage'?'high':'auto'}" decoding="async" draggable="false">`;
}
const viewport = $('#viewport');
const view = $('#project-view');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => reducedMotion.matches ? 'instant' : 'smooth';
const state = { projects:[], deck:[], active:null, domain:'all', view:'catalogo', slides:new Map(), catalogScroll:0, catalogFocus:null, media:null };
const byId = id => state.projects.find(project => project.id === (aliases[id] || id));
const current = () => byId(state.active);
const announce = message => { $('#announcement').textContent = message; };
let scrollFrame = 0, observer, progressStops=[];
const saveData = navigator.connection?.saveData || matchMedia('(prefers-reduced-data: reduce)').matches;
const imageObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){hydrateImage(entry.target);imageObserver.unobserve(entry.target);}});
},{root:viewport,rootMargin:saveData?'100px':'400px'}) : null;
function hydrateImage(image) {
  if(image.dataset.srcset){image.srcset=image.dataset.srcset;delete image.dataset.srcset;}
  if(image.dataset.src){image.src=image.dataset.src;delete image.dataset.src;}
}
function observeImages(root) {
  $$('img[data-src]',root).forEach(image=>imageObserver?imageObserver.observe(image):hydrateImage(image));
}
function unobserveImages(root) {$$('img[data-src]',root).forEach(image=>imageObserver?.unobserve(image));}
history.scrollRestoration = 'manual';

function renderFilters() {
  $('#filters').innerHTML = `<button data-action="filter" data-domain="all" aria-label="Tutti i domini" title="Tutti i domini" aria-pressed="true" class="filter-all">${icon('all')}</button>` + Object.entries(domains).map(([id,label]) => `<button data-action="filter" data-domain="${id}" aria-controls="project-grid" aria-pressed="false">${icon(id)}<span>${label}</span></button>`).join('');
}
function renderCatalogue() {
  const projects = filterProjects(state.projects,state.domain);
  unobserveImages($('#project-grid'));
  $('#project-grid').innerHTML = projects.map((project,index) => `<a class="project-tile ${project.layout || 'square'}" href="#slideshow/${project.id}" data-action="open-project" data-id="${project.id}" aria-label="Apri progetto ${escapeHTML(projectName(project))}" id="tile-${project.id}">
    <span class="tile-frame"><span class="tile-visual">${photo(project.cover,'',index < 4&&!location.hash.startsWith('#slideshow/'),project.layout==='wide'?'wide':'tile')}</span></span>
    <span class="tile-domains">${project.domains.map(domain => `<span>${domains[domain]}</span>`).join('')}</span>
    <span class="tile-name">${escapeHTML(project.title)}${project.variant ? `<span class="tile-variant">${escapeHTML(project.variant)}</span>` : ''}</span><span class="tile-arrow">${icon('arrow')}</span></a>`).join('');
  $('#empty-state').hidden = !!projects.length;
  observeImages($('#project-grid'));
  $$('#filters button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.domain === state.domain)));
  announce(`${projects.length} ${projects.length===1?'progetto':'progetti'}${state.domain === 'all' ? '' : ` · ${domains[state.domain]}`}`);
}
function coverflowMarkup(label) {
  return `<div class="selector-band"><div class="coverflow" tabindex="0" role="region" aria-roledescription="carosello" aria-label="${label}">
    ${state.deck.map(project => `<button class="flow-card" data-action="select-project" data-id="${project.id}" aria-label="Seleziona ${escapeHTML(projectName(project))}"><span class="flow-face"><span class="flow-image"></span></span></button>`).join('')}
    </div><div class="flow-controls"><div class="pagination" role="group" aria-label="${label}">${state.deck.map(project => `<button class="rail-dot" data-action="select-project" data-id="${project.id}" aria-label="Seleziona ${escapeHTML(projectName(project))}"><span></span></button>`).join('')}</div></div></div>`;
}
function updateCoverflow() {
  const length=state.deck.length, active=state.deck.findIndex(project=>project.id===state.active);
  const offsetFor=index=>{let offset=wrapIndex(index-active,length);if(offset>length/2)offset-=length;return offset;};
  $$('.selector-band',view).forEach(band=>{
    $$('.flow-card',band).forEach((card,index)=>{
      const offset=offsetFor(index),visible=Math.abs(offset)<=(document.documentElement.clientWidth<768?1:2);
      card.style.setProperty('--offset',offset);card.style.setProperty('--abs',Math.abs(offset));
      card.dataset.visible=String(visible);card.dataset.active=String(offset===0);
      card.setAttribute('aria-hidden',String(!visible));card.setAttribute('aria-pressed',String(offset===0));card.tabIndex=visible?0:-1;
      if(visible&&!$('img',card))$('.flow-image',card).innerHTML=photo(state.deck[index].cover,'',true,'flow');
    });
    $$('.rail-dot',band).forEach((dot,index)=>{
      const offset=offsetFor(index),visible=Math.abs(offset)<=3;
      dot.style.setProperty('--offset',offset);dot.dataset.visible=String(visible);
      dot.setAttribute('aria-hidden',String(!visible));dot.setAttribute('aria-pressed',String(offset===0));dot.tabIndex=visible?0:-1;
    });
  });
}
const slideIndex=id=>state.slides.get(`${state.active}/${id}`)||0;
function projectContent() {
  const project=current();
  $('#selected-heading').innerHTML=`<h1 class="project-title" id="selected-title" tabindex="-1"><span>${escapeHTML(project.title)}</span></h1>${project.variant?`<p class="project-variant">${escapeHTML(project.variant)}</p>`:''}`;
  $('#project-content').innerHTML=detailMarkup(project,slideIndex('gallery'),slideIndex('process'));
  const stops=[['project-overview','Gallery'],['project-experience','Experience'],['project-vision','Vision'],['project-process','Process'],['project-finish','Altri progetti']];
  $('#cue-stops').innerHTML=stops.map(([id,title])=>`<button class="cue-stop" data-action="jump" data-target="${id}" aria-label="Vai a ${title}"></button>`).join('');
  fitTitle();updateCoverflow();observeImages(view);measureProgress();scheduleProgress();
  document.title=`${projectName(project)} — Memento Portfolio`;
}
function fitTitle() {
  const title=$('#selected-title'),text=title?.firstElementChild;if(!text)return;
  // Measure the actual font, then fit its natural width; never distort glyphs.
  text.style.fontSize='100px';
  const width=text.getBoundingClientRect().width;
  if(width>0)text.style.fontSize=`${100*title.clientWidth/width}px`;
}
function renderProject(id) {
  const project=byId(id);if(!project)return showCatalogue();
  state.active=project.id;state.view='slideshow';
  if(!state.deck.some(item=>item.id===project.id))state.deck=[...state.projects];
  $('#catalogue').hidden=true;view.hidden=false;$('#project-nav').hidden=false;$('#scroll-cue').hidden=false;
  document.body.dataset.view='slideshow';
  unobserveImages(view);
  view.innerHTML=`<header class="project-station" id="project-station">${coverflowMarkup('Seleziona progetto')}<div class="project-title-band content-width" id="selected-heading"></div></header><div id="project-content"></div><section class="project-finish" id="project-finish" aria-label="Continua a esplorare"><div class="closing-label content-width"><span>Continua a esplorare</span><a href="#catalogo" data-action="close-project">Tutti i progetti ${icon('arrow')}</a></div>${coverflowMarkup('Altri progetti')}</section>`;
  projectContent();viewport.scrollTo({top:0,behavior:'instant'});viewport.focus({preventScroll:true});
  observer?.disconnect();observer=new ResizeObserver(()=>{fitTitle();updateCoverflow();measureProgress();scheduleProgress();});observer.observe(viewport);
  announce(projectName(project));
}
function selectProject(id) {
  if(!byId(id))return;
  if(state.active===id){goTo('project-overview');return;}
  const fromSelector=!!document.activeElement?.closest('.selector-band');
  state.active=id;projectContent();history.replaceState(history.state,'',`#slideshow/${id}`);
  viewport.scrollTo({top:0,behavior:'instant'});
  if(fromSelector)$(`#project-station .flow-card[data-id="${id}"]`)?.focus({preventScroll:true});
  announce(projectName(current()));
}
function stepProject(direction) {
  const active=state.deck.findIndex(project=>project.id===state.active);
  selectProject(state.deck[wrapIndex(active+direction,state.deck.length)].id);
}
function openProject(id) {
  state.catalogScroll=viewport.scrollTop;state.catalogFocus=id;state.deck=filterProjects(state.projects,state.domain);
  history.pushState({fromCatalog:true},'',`#slideshow/${id}`);renderProject(id);
}
function showCatalogue() {
  observer?.disconnect();state.view='catalogo';unobserveImages(view);view.replaceChildren();progressStops=[];
  view.hidden=true;$('#catalogue').hidden=false;$('#project-nav').hidden=true;$('#scroll-cue').hidden=true;
  document.body.dataset.view='catalogo';document.title='Portfolio — Memento';
  viewport.scrollTo({top:state.catalogScroll,behavior:'instant'});observeImages($('#project-grid'));
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
function positionFor(element){return Math.max(0,element.getBoundingClientRect().top-viewport.getBoundingClientRect().top+viewport.scrollTop-$('#project-nav').getBoundingClientRect().bottom-20);}
function goTo(id){const element=document.getElementById(id);if(element)viewport.scrollTo({top:positionFor(element),behavior:scrollBehavior()});}
function goStart(){viewport.scrollTo({top:0,behavior:scrollBehavior()});$('#project-station .coverflow')?.focus({preventScroll:true});}
function nextCheckpoint(){const next=progressStops.find(stop=>stop.position>viewport.scrollTop+60);if(next)goTo(next.id);else goStart();}
function scheduleProgress(){if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateProgress();});}
function measureProgress(){progressStops=$$('.cue-stop').map(button=>({button,id:button.dataset.target,element:document.getElementById(button.dataset.target)})).filter(stop=>stop.element).map(stop=>({...stop,position:positionFor(stop.element)}));}
function updateProgress(){
  if(state.view!=='slideshow')return;
  const max=Math.max(1,viewport.scrollHeight-viewport.clientHeight),progress=Math.min(1,viewport.scrollTop/max);
  const range=$('#project-progress');range.value=Math.round(progress*1000);range.setAttribute('aria-valuetext',`${Math.round(progress*100)}%`);
  $('#scroll-cue').style.setProperty('--progress',progress);$('#project-nav').classList.toggle('is-scrolled',viewport.scrollTop>120);
  let active='project-overview';progressStops.forEach(stop=>{if(stop.position<=viewport.scrollTop+8)active=stop.id;});
  progressStops.forEach(({button,id,position})=>{button.style.setProperty('--stop',Math.min(.97,position/max));button.setAttribute('aria-current',String(id===active));});
}
function changeSlide(id,index){
  if(!['gallery','process'].includes(id))return;
  const selected=wrapIndex(index,5),slider=$(`[data-slider="${id}"]`,view);if(!slider)return;
  state.slides.set(`${state.active}/${id}`,selected);
  const detail=detailFor(current());
  $('.slider-stage',slider).innerHTML=id==='gallery'?galleryStage(detail.gallery[selected]):processStage(detail.process[selected]);
  $('.slide-count',slider).innerHTML=`${number(selected+1)} <span>/ 05</span>`;
  $$('[data-action="select-slide"]',slider).forEach((button,i)=>button.setAttribute('aria-pressed',String(i===selected)));
  if(id==='gallery'){
    const active=$('.slide-thumb[aria-pressed="true"]',slider),strip=$('.slide-thumbs',slider);
    strip.scrollTo({left:active.offsetLeft-(strip.clientWidth-active.offsetWidth)/2,behavior:scrollBehavior()});
  }
  announce(`${id==='gallery'?'Contenuto':'Step'} ${selected+1} di 5`);
}
const stepSlide=(id,direction)=>changeSlide(id,slideIndex(id)+direction);

document.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
  if(button.tagName==='A'&&(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey))return;
  event.preventDefault();
  switch(button.dataset.action){
    case 'filter':state.domain=button.dataset.domain;renderCatalogue();viewport.scrollTo({top:0,behavior:'instant'});break;
    case 'reset-filters':state.domain='all';renderCatalogue();break;
    case 'open-project':openProject(button.dataset.id);break;
    case 'close-project':closeProject();break;
    case 'select-project':selectProject(button.dataset.id);break;
    case 'jump':goTo(button.dataset.target);break;
    case 'checkpoint-start':goStart();break;
    case 'checkpoint-next':nextCheckpoint();break;
    case 'select-slide':changeSlide(button.dataset.sliderId,Number(button.dataset.index));break;
    case 'reload':location.reload();break;
  }
});
document.addEventListener('keydown',event=>{
  if(event.defaultPrevented||event.target.closest('input,textarea,select,memento-nav')||state.view!=='slideshow')return;
  if(event.key==='Escape'){closeProject();return;}
  const slider=event.target.closest('[data-slider]'),selector=event.target.closest('.selector-band');
  if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)&&(slider||selector)){
    event.preventDefault();
    const direction=event.key==='ArrowRight'?1:-1;
    if(slider){if(event.key==='Home'||event.key==='End')changeSlide(slider.dataset.slider,event.key==='Home'?0:4);else stepSlide(slider.dataset.slider,direction);}
    else if(event.key==='Home'||event.key==='End')selectProject(state.deck[event.key==='Home'?0:state.deck.length-1].id);
    else stepProject(direction);
  }else if(event.key==='Home'){event.preventDefault();goStart();}
  else if(event.key==='End'){event.preventDefault();goTo('project-finish');}
});
$('#project-progress').addEventListener('input',event=>viewport.scrollTo({top:(viewport.scrollHeight-viewport.clientHeight)*Number(event.target.value)/1000,behavior:'instant'}));
viewport.addEventListener('scroll',scheduleProgress,{passive:true});
window.addEventListener('hashchange',route);
installSwipe(view,{
  canSwipe:surface=>surface.classList.contains('coverflow')?state.deck.length>1:!!surface.closest('[data-slider]'),
  onSwipe:(surface,direction)=>surface.classList.contains('coverflow')?stepProject(direction):stepSlide(surface.closest('[data-slider]').dataset.slider,direction)
});
installDragScroll(view);
// One deliberate horizontal trackpad gesture advances one item. Vertical
// wheel input is untouched and remains available to the existing host bridge.
let wheelTime=-Infinity,wheelSign=0;
view.addEventListener('wheel',event=>{
  const surface=event.target.closest('.coverflow,.slider-stage');
  if(!surface||event.ctrlKey||Math.abs(event.deltaX)<=Math.abs(event.deltaY)*1.3||Math.abs(event.deltaX)<4)return;
  event.preventDefault();const now=performance.now(),sign=Math.sign(event.deltaX),fresh=now-wheelTime>220||sign!==wheelSign;
  wheelTime=now;wheelSign=sign;if(!fresh)return;
  if(surface.classList.contains('coverflow'))stepProject(sign);else stepSlide(surface.closest('[data-slider]').dataset.slider,sign);
},{passive:false});
const narrowScreen=matchMedia('(max-width:767px)');
function syncProgressOrientation(){$('#project-progress').setAttribute('aria-orientation',narrowScreen.matches?'horizontal':'vertical');}
narrowScreen.addEventListener('change',syncProgressOrientation);syncProgressOrientation();

async function init(){
  try{
    const [response,images]=await Promise.all([fetch('projects.json'),fetch('images.json').then(response=>response.ok?response.json():null).catch(()=>null)]);
    if(!response.ok)throw new Error('Portfolio unavailable');if(images)imageManifest=images;
    state.projects=validateProjects(await response.json());state.deck=[...state.projects];
    renderFilters();renderCatalogue();route();
    document.fonts.ready.then(()=>{fitTitle();measureProgress();scheduleProgress();});
  }catch(error){$('#project-grid').innerHTML='<div class="empty-state">Portfolio non disponibile. <button data-action="reload">Riprova</button></div>';console.error(error);}
}
init();

