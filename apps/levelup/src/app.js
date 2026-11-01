import { benefits, experiences, visions, steps, contactUrl } from './content.js';
import { Carousel } from './carousel.js';
import { enhanceVisuals } from './visuals.js';

const $ = selector => document.querySelector(selector);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const lines = items => items.map(text => `<span>${escape(text)}</span>`).join(' ');
const image = (item, eager = false) => `<img class="card-art" src="${item.asset}" srcset="${item.asset.replace('.webp','-640.webp')} 640w, ${item.asset} 1536w" sizes="(max-width:768px) 100vw, 80vw" alt="${escape(item.alt || '')}" width="1536" height="1024" loading="${eager ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''} draggable="false">`;

$('#benefits .carousel-stage').innerHTML = benefits.map((item,i) => `
  <article class="showcase-card cut-frame" data-slide="${i}" role="group" aria-roledescription="slide" aria-label="${i+1} di ${benefits.length}: ${escape(item.title.join(' '))}">
    ${image(item,i===0)}<div class="benefit-veil" aria-hidden="true"><img src="${item.asset}" alt="" width="1536" height="1024" loading="lazy" decoding="async"></div><div class="benefit-copy"><h2 class="gradient-text">${lines(item.title)}</h2><p>${escape(item.copy)}</p></div>
  </article>`).join('');
$('#portfolio .carousel-stage').innerHTML = experiences.map((item,i) => `
  <article class="showcase-card cut-frame" data-slide="${i}" role="group" aria-roledescription="slide" aria-label="${escape(item.title)}, ${escape(item.category)}">
    ${image(item)}<div class="project-caption"><h3>${escape(item.title)}</h3><p>${escape(item.category)}</p></div>
    <div class="project-actions" data-no-swipe>
      <a class="slide-action" href="${escape(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Apri ${escape(item.title)} in una nuova scheda">Apri<img src="assets/icons/caret-right.svg" class="diagonal-arrow" alt=""></a>
      <button class="slide-action" type="button" data-expand="${i}" aria-controls="demo-panel" aria-haspopup="dialog" aria-label="Espandi ${escape(item.title)}">Espandi</button>
    </div>
  </article>`).join('');
$('#vision-grid').innerHTML = visions.map(item => `
  <article class="vision-card cut-frame" aria-labelledby="vision-${item.id}-title">
    <div class="comparison" id="comparison-${item.id}">
      <img src="${item.after}" alt="${escape(item.alt)} con materiali e finiture" width="1122" height="1402" loading="lazy" decoding="async" draggable="false">
      <div class="comparison-before"><img src="${item.before}" alt="Lo stesso soggetto come modello neutro" width="1122" height="1402" loading="lazy" decoding="async" draggable="false"></div>
      <div class="comparison-divider" aria-hidden="true"><span><img src="assets/icons/caret-left.svg" alt=""><img src="assets/icons/caret-right.svg" alt=""></span></div>
      <label class="sr-only" for="range-${item.id}">Confronta ${escape(item.title.join(' '))} Trascina per confrontare modello e materiali.</label>
      <input id="range-${item.id}" type="range" min="0" max="100" value="50" aria-valuetext="50% modello neutro, 50% materiali e finiture">
    </div>
    <div class="vision-copy"><h3 class="gradient-text" id="vision-${item.id}-title">${lines(item.title)}</h3><p>${escape(item.copy)}</p></div>
  </article>`).join('');
$('#steps-grid').innerHTML = steps.map(item => `
  <li class="step-card cut-frame"><img class="step-art" src="${item.asset}" srcset="${item.asset.replace('.webp','-768.webp')} 768w, ${item.asset} 1536w" sizes="(max-width:900px) 90vw, 33vw" alt="" width="1536" height="1024" loading="lazy" decoding="async"><p>${escape(item.copy)}</p><span class="step-number" aria-hidden="true">${item.number}</span><h3 class="gradient-text">${lines(item.title)}</h3></li>`).join('');

function pagination(root, items, label, select) {
  root.innerHTML = items.map((item,i) => `<button type="button" aria-label="${escape(label(item))}" aria-current="${i===0}" data-index="${i}"><span></span></button>`).join('');
  root.addEventListener('click', event => { const button=event.target.closest('button'); if(button)select(Number(button.dataset.index)); });
  root.addEventListener('keydown', event => {
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    let index=Number(event.target.closest('button')?.dataset.index || 0);
    index=event.key==='Home'?0:event.key==='End'?items.length-1:(index+(event.key==='ArrowRight'?1:-1)+items.length)%items.length;
    select(index); root.children[index].focus();
  });
}
function mark(root,index) { [...root.children].forEach((button,i) => button.setAttribute('aria-current',String(i===index))); }
let benefitsCarousel;
pagination($('#benefit-dots'),benefits,item=>item.title.join(' '),index=>benefitsCarousel.select(index));
benefitsCarousel = new Carousel($('#benefits'),{onSettle:index=>{
  mark($('#benefit-dots'),index); $('#announcement').textContent=benefits[index].title.join(' ');
}});

let selected=experiences.findIndex(item=>item.id==='productvis'), visible=false, mountedId=null;
let loadTimer=0, settleTimer=0, generation=0, engaged=null, portfolio;
const panel=$('#demo-panel'), dialog=$('#demo-dialog'), slot=$('#demo-slot');
pagination($('#portfolio-dots'),experiences,item=>'Prova '+item.title,index=>portfolio.select(index));
const selectedExperience = () => experiences[selected];
function updateSelection(index,announce=true) {
  selected=index;
  const item=selectedExperience();
  mark($('#portfolio-dots'),index);
  panel.setAttribute('aria-label',item.title+' — demo interattiva');
  $('#fallback-link').href=item.url;
  $('#demo-poster').src=item.asset;
  $('#demo-loading').textContent='Caricamento '+item.title+'…';
  if (visible && mountedId!==item.id) $('#demo-loading').hidden=false;
  if(announce) {
    engaged=item;
    $('#announcement').textContent=item.title+'. Demo selezionata sotto il portfolio.';
    $('#contact-link').href=contactUrl(item);
  }
  clearTimeout(settleTimer);
  if(visible)settleTimer=setTimeout(()=>loadDemo(),320);
}
function loadDemo(force=false) {
  const item=selectedExperience();
  if(!visible || (!force && mountedId===item.id)) {
    if(mountedId===item.id && $('#frame-mount iframe')?.dataset.loaded==='true')$('#demo-loading').hidden=true;
    return;
  }
  const token=++generation;
  clearTimeout(loadTimer); mountedId=item.id;
  $('#demo-loading').hidden=false; $('#demo-fallback').hidden=true;
  const frame=document.createElement('iframe');
  frame.title=item.title+' — demo interattiva';
  frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.allow='fullscreen; autoplay; xr-spatial-tracking'; frame.allowFullscreen=true;
  frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-downloads');
  frame.addEventListener('load',()=>{
    frame.dataset.loaded='true';
    if(token!==generation || selectedExperience().id!==item.id)return;
    clearTimeout(loadTimer); $('#demo-loading').hidden=true;
  });
  frame.addEventListener('error',()=>{
    if(token!==generation || selectedExperience().id!==item.id)return;
    clearTimeout(loadTimer); $('#demo-loading').hidden=true; $('#demo-fallback').hidden=false;
  });
  frame.src=item.url; $('#frame-mount').replaceChildren(frame);
  loadTimer=setTimeout(()=>{
    if(token!==generation || selectedExperience().id!==item.id)return;
    $('#demo-loading').hidden=true; $('#demo-fallback').hidden=false;
  },16000);
}
function reachDemo() {
  visible=true; loadDemo();
  // The section is already one viewport. Focus without detaching the visual selector.
  panel.focus({preventScroll:true});
}
portfolio=new Carousel($('#portfolio'),{onSettle:index=>updateSelection(index),onOpen:reachDemo});
portfolio.current=portfolio.target=portfolio.active=selected;
portfolio.render(); updateSelection(selected,false);
$('#portfolio').addEventListener('keydown',event=>{
  if((event.key==='Enter'||event.key===' ') && event.target.matches('.showcase-card[data-active=true]')) {
    event.preventDefault(); reachDemo();
  }
});
const observer=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){ visible=true; loadDemo(); observer.disconnect(); }
},{rootMargin:'200px 0px'});
observer.observe(slot);
$('#retry-demo').addEventListener('click',()=>loadDemo(true));

let savedScroll=0, opener=null, nativeFull=false;
function surface(open) {
  document.documentElement.dataset.demoExpanded=String(open);
  document.dispatchEvent(new CustomEvent('memento:overlay-change'));
}
async function expand(button) {
  opener=button; savedScroll=window.scrollY; visible=true; loadDemo();
  engaged=selectedExperience(); $('#contact-link').href=contactUrl(engaged);
  $('#close-demo').hidden=false;
  // Native fullscreen retains the cross-origin demo's WebGL state.
  if(panel.requestFullscreen && document.fullscreenEnabled) {
    try { await panel.requestFullscreen(); nativeFull=true; surface(true); $('#close-demo').focus(); return; }
    catch { /* Hosts that disallow fullscreen receive an accessible dialog. */ }
  }
  dialog.append(panel); dialog.showModal(); surface(true); $('#close-demo').focus();
}
function restore() {
  if(panel.parentElement===dialog)slot.append(panel);
  nativeFull=false; $('#close-demo').hidden=true; surface(false);
  window.scrollTo({top:savedScroll,behavior:'instant'}); opener?.focus({preventScroll:true});
}
$('#portfolio').addEventListener('click',event=>{
  const button=event.target.closest('[data-expand]');
  if(button && !button.closest('[inert]'))expand(button);
});
$('#close-demo').addEventListener('click',()=>{
  if(document.fullscreenElement)document.exitFullscreen(); else if(dialog.open)dialog.close();
});
document.addEventListener('fullscreenchange',()=>{if(nativeFull&&!document.fullscreenElement)restore();});
dialog.addEventListener('close',restore);
let backdropDown=null;
dialog.addEventListener('pointerdown',event=>{backdropDown=event.target===dialog?{x:event.clientX,y:event.clientY}:null;});
dialog.addEventListener('click',event=>{
  if(event.target===dialog&&backdropDown&&Math.hypot(event.clientX-backdropDown.x,event.clientY-backdropDown.y)<8)dialog.close();
  backdropDown=null;
});

// Each range owns its corresponding comparison, including keyboard and touch input.
for(const comparison of document.querySelectorAll('.comparison')) {
  const range=comparison.querySelector('input');
  const update=()=>{
    const value=Number(range.value);
    comparison.style.setProperty('--split',value+'%');
    range.setAttribute('aria-valuetext',`${value}% modello neutro, ${100-value}% materiali e finiture`);
  };
  range.addEventListener('input',update); update();
}

// Fit real local-font metrics to the V40 wrapper. Long phone headings use two lines.
const context=document.createElement('canvas').getContext('2d');
for(const heading of document.querySelectorAll('[data-fit]')) {
  const text=heading.textContent.trim();
  let previousMode=null;
  const fit=()=>{
    const width=heading.parentElement.clientWidth;
    const mobile=window.innerWidth<=767 && Boolean(heading.dataset.mobileLines);
    const parts=mobile?heading.dataset.mobileLines.split('|'):[text];
    if(previousMode!==mobile) {
      heading.innerHTML=parts.map(part=>`<span class="fit-line">${escape(part)}</span>`).join(' ');
      previousMode=mobile;
    }
    context.font='350 100px Inter';
    const unit=Math.max(...parts.map(part=>context.measureText(part).width+(part.length-1)*100*(-.055)));
    heading.style.fontSize=(Math.max(18,(width-2)*100/unit))+'px';
  };
  new ResizeObserver(fit).observe(heading.parentElement);
  document.fonts.ready.then(fit); fit();
}
$('#contact-link').addEventListener('click',()=>{if(engaged)$('#contact-link').href=contactUrl(engaged);});
enhanceVisuals();
