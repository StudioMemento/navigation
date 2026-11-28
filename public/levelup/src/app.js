import { escape, lines, image, benefitMarkup, PHONE } from './benefit-markup.js';
import { benefits, experiences, visions, steps, contactUrl, serviceUrl } from './content.js';
import { Slider, bindDots } from '/js/slider.mjs';
import { drumFit } from '/js/effects/deck-pose.mjs';
import { DemoPlayer } from './player.js';

const $ = selector => document.querySelector(selector);
const initialBenefits = $('#benefits .carousel-stage');
if (!initialBenefits.firstElementChild) initialBenefits.innerHTML = benefitMarkup();
$('#portfolio .carousel-stage').innerHTML = experiences.map((item,i) => `
  <article class="showcase-card cut-frame mm-tab" data-slide="${i}" role="group" aria-roledescription="slide" aria-label="${escape(item.title)}, ${escape(item.categories.join(', '))}">
    <div class="mm-slide-face">${image(item)}<span class="card-shade" aria-hidden="true"></span><ul class="project-category" role="list">${item.categories.map(category=>`<li><span aria-hidden="true">–</span>${escape(category)}</li>`).join('')}</ul>
    <h3 class="project-name" data-slide-control><a data-no-swipe class="gradient-text mm-type" href="${escape(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Apri ${escape(item.title)} in una nuova scheda">${escape(item.title)}</a></h3>
    <button class="project-expand" data-slide-control data-no-swipe type="button" data-expand="${i}" aria-controls="demo-panel" aria-haspopup="dialog" aria-label="Espandi ${escape(item.title)}"><img src="assets/icons/maximize.svg" alt="" width="24" height="24"></button></div>
  </article>`).join('');
$('#vision-grid').innerHTML = visions.map(item => `
  <article class="vision-card cut-frame vision-${item.id} mm-tab" aria-labelledby="vision-${item.id}-title">
    <div class="vision-copy"><h3 class="gradient-text mm-type" id="vision-${item.id}-title">${lines(item.title)}</h3><p>${escape(item.copy)}</p></div>
    <div class="vision-art"><div class="comparison" id="comparison-${item.id}">
      <img src="${item.after}" srcset="${item.after.replace('.webp','-640.webp')} 640w, ${item.after} 1280w" sizes="${PHONE}50vw, (max-width:767px) 75vw, 600px" alt="${escape(item.alt)}" width="1280" height="1280" loading="lazy" decoding="async" draggable="false">
      <div class="comparison-before"><img src="${item.before}" srcset="${item.before.replace('.webp','-640.webp')} 640w, ${item.before} 1280w" sizes="${PHONE}50vw, (max-width:767px) 75vw, 600px" alt="Lo stesso soggetto come modello di base" width="1280" height="1280" loading="lazy" decoding="async" draggable="false"></div>
      <div class="comparison-divider" aria-hidden="true"><span><img src="assets/icons/caret-left.svg" alt=""><img src="assets/icons/caret-right.svg" alt=""></span></div>
      <label class="sr-only" for="range-${item.id}">Confronta ${escape(item.title.join(' '))} Trascina per cambiare materiali e finiture.</label>
      <input id="range-${item.id}" type="range" min="0" max="100" value="50" aria-valuetext="50% modello di base, 50% materiali e finiture">
    </div></div>
  </article>`).join('');
$('#steps-grid').innerHTML = steps.map((item,i) => `
  <li class="step-card cut-frame mm-tab"><img class="step-art" src="${item.asset}" srcset="${item.asset.replace('.webp','-768.webp')} 768w, ${item.asset} 1536w" sizes="${PHONE}60vw, (max-width:900px) 90vw, 33vw" alt="" width="1536" height="1024" loading="lazy" decoding="async"><p>${escape(item.copy)}</p><span class="step-number" aria-hidden="true">STEP ${i+1}</span><h3 class="gradient-text mm-type">${lines(item.title)}</h3></li>`).join('');

function pagination(root, items, label, slider) {
  root.innerHTML = items.map((item,i) => `<button type="button" aria-label="${escape(label(item))}" aria-current="${i===0}" data-index="${i}"><span></span></button>`).join('');
  return bindDots(root,slider,{attribute:'index',state:'aria-current'});
}
const openTop = url => { location.assign(url); };
const benefitsCarousel = new Slider($('#benefits'),{
  onOpen:index => openTop(serviceUrl(benefits[index])),
  onSettle:index => {
    markBenefit(index);
    $('#announcement').textContent=benefits[index].title.join(' ');
  }
});
const markBenefit = pagination($('#benefit-dots'),benefits,item=>item.title.join(' '),benefitsCarousel);
$('#benefits').addEventListener('keydown',event=>{
  if((event.key==='Enter'||event.key===' ') && event.target.matches('.showcase-card[data-active=true]')) {
    event.preventDefault(); openTop(serviceUrl(benefits[benefitsCarousel.active]));
  }
});

let selected=0, engaged=null, portfolio, demoRequested=false;
const panel=$('#demo-panel'), dialog=$('#demo-dialog');
const player = new DemoPlayer({mount:$('#frame-mount'),loading:$('#demo-loading'),fallback:$('#demo-fallback'),poster:$('#demo-poster'),link:$('#fallback-link'),play:$('#play-demo'),panel});
const selectedExperience = () => experiences[selected];
function updateSelection(index,announce=true) {
  selected=index;
  const item=selectedExperience();
  markExperience(index);
  if(announce) {
    engaged=item;
    $('#announcement').textContent=item.title+'. Demo selezionata sotto il portfolio.';
    $('#contact-link').href=contactUrl(item);
  }
}
function commitSelection(index) {
  updateSelection(index,false);
  if(demoRequested || player.frame) player.load(selectedExperience());
  demoRequested=false;
}
function selectExperience(index) {
  updateSelection(index);
  demoRequested=true;
}
function reachDemo() {
  player.load(selectedExperience());
  panel.focus({preventScroll:true});
}
// The experiences fit the padding: the card width that puts the outer edges of both neighbours on it. On a phone the
// card keeps its own width (CSS) and the neighbours run into the margins.
const compact=matchMedia('(max-width: 767px)');
function fitPadding(slider) {
  const element=slider.element;
  if(compact.matches) {element.style.removeProperty('--slide-width');return;}
  const room=element.closest('.experiences-section').querySelector('.page-width').clientWidth;
  if(!room) return;
  const value=Math.max(240,Math.min(680,drumFit(room,'wide'))).toFixed(2)+'px';
  if(element.style.getPropertyValue('--slide-width')!==value) element.style.setProperty('--slide-width',value);
}
portfolio=new Slider($('#portfolio'),{active:selected,stride:.5,fit:fitPadding,onSelect:selectExperience,onCommit:commitSelection,onOpen:reachDemo});
const markExperience = pagination($('#portfolio-dots'),experiences,item=>'Prova '+item.title,portfolio);
updateSelection(selected,false);
$('#play-demo').addEventListener('click',reachDemo);
$('#portfolio').addEventListener('keydown',event=>{
  if((event.key==='Enter'||event.key===' ') && event.target.matches('.showcase-card[data-active=true]')) {
    event.preventDefault(); reachDemo();
  }
});
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
  portfolio.target=index; portfolio.finish(); player.load(selectedExperience());
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
    comparison.style.setProperty('--reveal',value / 100);
    range.setAttribute('aria-valuetext',`${value}% modello di base, ${100-value}% materiali e finiture`);
  };
  range.addEventListener('input',update); new ResizeObserver(update).observe(comparison); update();
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
