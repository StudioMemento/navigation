import { benefits, experiences, visions, steps, contactUrl } from './content.js';
import { Carousel } from './carousel.js';
import { enhanceVisuals } from './visuals.js';
import { DemoPlayer } from './player.js';

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
    ${image(item)}<p class="project-category">${escape(item.category)}</p>
    <h3 class="project-name" data-slide-control data-no-swipe><a class="gradient-text" href="${escape(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Apri ${escape(item.title)} in una nuova scheda">${escape(item.title)}</a></h3>
    <button class="project-expand" data-slide-control data-no-swipe type="button" data-expand="${i}" aria-controls="demo-panel" aria-haspopup="dialog" aria-label="Espandi ${escape(item.title)}"><img src="assets/icons/maximize.svg" alt="" width="24" height="24"></button>
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
$('#steps-grid').innerHTML = steps.map((item,i) => `
  <li class="step-card cut-frame"><img class="step-art" src="${item.asset}" srcset="${item.asset.replace('.webp','-768.webp')} 768w, ${item.asset} 1536w" sizes="(max-width:900px) 90vw, 33vw" alt="" width="1536" height="1024" loading="lazy" decoding="async"><p>${escape(item.copy)}</p><span class="step-number" aria-hidden="true">STEP ${i+1}</span><h3 class="gradient-text">${lines(item.title)}</h3></li>`).join('');

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

let selected=experiences.findIndex(item=>item.id==='productvis'), visible=false, engaged=null, portfolio;
const panel=$('#demo-panel'), dialog=$('#demo-dialog'), slot=$('#demo-slot');
const player = new DemoPlayer({mount:$('#frame-mount'),loading:$('#demo-loading'),fallback:$('#demo-fallback'),poster:$('#demo-poster'),link:$('#fallback-link'),panel});
pagination($('#portfolio-dots'),experiences,item=>'Prova '+item.title,index=>portfolio.select(index));
const selectedExperience = () => experiences[selected];
function updateSelection(index,announce=true) {
  selected=index;
  const item=selectedExperience();
  mark($('#portfolio-dots'),index);
  if(announce) {
    engaged=item;
    $('#announcement').textContent=item.title+'. Demo selezionata sotto il portfolio.';
    $('#contact-link').href=contactUrl(item);
  }
}
function commitSelection(index) {
  updateSelection(index,false);
  if(visible)player.load(selectedExperience());
}
function reachDemo() {
  visible=true; player.load(selectedExperience());
  panel.focus({preventScroll:true});
}
portfolio=new Carousel($('#portfolio'),{onSettle:index=>updateSelection(index),onCommit:commitSelection,onOpen:reachDemo});
portfolio.current=portfolio.target=portfolio.active=selected;
portfolio.render(); updateSelection(selected,false);
$('#portfolio').addEventListener('keydown',event=>{
  if((event.key==='Enter'||event.key===' ') && event.target.matches('.showcase-card[data-active=true]')) {
    event.preventDefault(); reachDemo();
  }
});
const observer=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){
    visible=true;
    if(!portfolio.motion && !portfolio.pointer)player.load(selectedExperience());
    observer.disconnect();
  }
},{rootMargin:'200px 0px'});
observer.observe(slot);
$('#retry-demo').addEventListener('click',()=>player.load(selectedExperience(),true));

let savedScroll=0, opener=null, nativeFull=false, expanding=false;
function surface(open) {
  document.documentElement.dataset.demoExpanded=String(open);
  document.dispatchEvent(new CustomEvent('memento:overlay-change'));
}
async function expand(button) {
  if(expanding || nativeFull || dialog.open)return;
  expanding=true; opener=button; savedScroll=window.scrollY;
  // Commit only the named card before opening; never detach the live iframe.
  const index=Number(button.dataset.expand);
  portfolio.target=index; portfolio.finish(); visible=true; player.load(selectedExperience());
  engaged=selectedExperience(); $('#contact-link').href=contactUrl(engaged);
  $('#close-demo').hidden=false;
  if(panel.requestFullscreen && document.fullscreenEnabled) {
    try { await panel.requestFullscreen(); nativeFull=true; surface(true); $('#close-demo').focus(); expanding=false; return; }
    catch { /* The permanent dialog is the in-place fallback for embedded browsers. */ }
  }
  dialog.setAttribute('role','dialog');
  dialog.showModal(); surface(true); $('#close-demo').focus(); expanding=false;
}
function restore() {
  nativeFull=false; $('#close-demo').hidden=true; dialog.setAttribute('role','group'); surface(false);
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
  if(dialog.open && event.target===dialog&&backdropDown&&Math.hypot(event.clientX-backdropDown.x,event.clientY-backdropDown.y)<8)dialog.close();
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
