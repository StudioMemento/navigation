import { benefits, experiences, contactUrl } from './content.js';
import { Carousel } from './carousel.js';
import { enhanceVisuals } from './visuals.js';

const $ = (selector) => document.querySelector(selector);
const escape = (s) => String(s).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image = (item, eager = false) => `<img class="card-art" src="${item.asset}" srcset="${item.asset.replace('.webp','-640.webp')} 640w, ${item.asset} 1536w" sizes="(max-width:767px) 60vw, (max-width:1023px) 80vw, (min-width:1600px) 998px, 62.4vw" alt="${escape(item.alt || '')}" width="1536" height="1024" loading="${eager ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''} draggable="false">`;
$('#benefits .carousel-stage').innerHTML=benefits.map((item,i)=>`<article class="showcase-card cut-frame" data-slide="${i}" role="group" aria-roledescription="slide" aria-label="${i+1} di ${benefits.length}: ${escape(item.title.join(' '))}">${image(item,i===0)}<div class="benefit-copy"><p>${escape(item.copy)}</p><h2 class="gradient-text">${item.title.map(x=>`<span>${escape(x)}</span>`).join(' ')}</h2></div></article>`).join('');
$('#portfolio .carousel-stage').innerHTML=experiences.map((item,i)=>`<article class="showcase-card cut-frame" data-slide="${i}" role="button" aria-label="Prova ${escape(item.title)}, ${escape(item.category)}">${image(item)}<div class="project-caption"><h3>${escape(item.title)}</h3><p>${escape(item.category)}</p></div></article>`).join('');
function pagination(root, items, label, select){
  root.innerHTML=items.map((item,i)=>`<button type="button" aria-label="${escape(label(item))}" aria-current="${i===0}" data-index="${i}"><span></span></button>`).join('');
  root.addEventListener('click',e=>{const b=e.target.closest('button');if(b)select(Number(b.dataset.index));});
  root.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let i=Number(e.target.closest('button')?.dataset.index || 0);i=e.key==='Home'?0:e.key==='End'?items.length-1:(i+(e.key==='ArrowRight'?1:-1)+items.length)%items.length;select(i);root.children[i].focus();});
}
function mark(root,index){[...root.children].forEach((b,i)=>b.setAttribute('aria-current',String(i===index)));}
let benefitsCarousel;
pagination($('#benefit-dots'),benefits,x=>x.title.join(' '),i=>benefitsCarousel.select(i));
benefitsCarousel=new Carousel($('#benefits'),{onSettle:i=>{mark($('#benefit-dots'),i);$('#announcement').textContent=benefits[i].title.join(' ');}});

let selected=experiences.findIndex(x=>x.id==='productvis'), visible=false, mountedId=null, loadTimer=0, settleTimer=0, generation=0;
let engaged=null;
let portfolio;
const panel=$('#demo-panel'), dialog=$('#demo-dialog'), slot=$('#demo-slot');
pagination($('#portfolio-dots'),experiences,x=>'Prova '+x.title,i=>portfolio.select(i));
function selectedExperience(){return experiences[selected];}
function updateSelection(i,announce=true){
 selected=i; const item=selectedExperience(); mark($('#portfolio-dots'),i);
 $('#demo-title').textContent=item.title;$('#demo-category').textContent='Demo · '+item.category;
 for(const id of ['#demo-external','#fallback-link'])$(id).href=item.url;
 $('#demo-external').setAttribute('aria-label','Apri '+item.title+' in una nuova scheda');
 $('#demo-poster').src=item.asset;
 if(announce){engaged=item;$('#announcement').textContent=item.title+'. Demo selezionata sotto il portfolio.';$('#contact-link').href=contactUrl(item);}
 clearTimeout(settleTimer); if(visible) settleTimer=setTimeout(()=>loadDemo(),320);
}
function loadDemo(force=false){
 const item=selectedExperience(); if(!visible||(!force&&mountedId===item.id))return;
 const token=++generation;clearTimeout(loadTimer);mountedId=item.id;
 $('#demo-loading').hidden=false;$('#demo-fallback').hidden=true;
 const frame=document.createElement('iframe');frame.title=item.title+' — demo interattiva';frame.referrerPolicy='strict-origin-when-cross-origin';
 frame.allow='fullscreen; autoplay; xr-spatial-tracking';frame.allowFullscreen=true;
 frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-downloads');
 frame.addEventListener('load',()=>{if(token!==generation)return;clearTimeout(loadTimer);$('#demo-loading').hidden=true;});
 frame.addEventListener('error',()=>{if(token!==generation)return;clearTimeout(loadTimer);$('#demo-loading').hidden=true;$('#demo-fallback').hidden=false;});
 frame.src=item.url;$('#frame-mount').replaceChildren(frame);
 loadTimer=setTimeout(()=>{if(token!==generation)return;$('#demo-loading').hidden=true;$('#demo-fallback').hidden=false;},16000);
}
portfolio=new Carousel($('#portfolio'),{onSettle:i=>updateSelection(i),onOpen:()=>{visible=true;loadDemo();panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});panel.focus({preventScroll:true});}});
// Start directly on the chosen configurator, without a synthetic carousel intro animation.
portfolio.current=portfolio.target=portfolio.active=selected;portfolio.render();updateSelection(selected,false);
$('#portfolio').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-active=true]')){e.preventDefault();visible=true;loadDemo();panel.scrollIntoView({block:'start',behavior:'smooth'});panel.focus({preventScroll:true});}});
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){visible=true;loadDemo();observer.disconnect();}},{rootMargin:'250px 0px'});observer.observe(slot);
$('#retry-demo').addEventListener('click',()=>loadDemo(true));
let savedScroll=0, opener=null, nativeFull=false;
function surface(open){document.dispatchEvent(new CustomEvent('memento:overlay-change'));document.documentElement.dataset.demoExpanded=String(open);}
async function expand(){
 opener=document.activeElement;savedScroll=window.scrollY;visible=true;loadDemo();engaged=selectedExperience();$('#contact-link').href=contactUrl(engaged);
 // Native fullscreen preserves the loaded demo and its 3D state without reparenting.
 if(panel.requestFullscreen&&document.fullscreenEnabled){try{await panel.requestFullscreen();nativeFull=true;$('#expand-demo').hidden=true;$('#close-demo').hidden=false;surface(true);$('#close-demo').focus();return;}catch{/* Inline modal remains available when the host disallows fullscreen. */}}
 dialog.append(panel);dialog.showModal();$('#expand-demo').hidden=true;$('#close-demo').hidden=false;surface(true);$('#close-demo').focus();
}
function restore(){
 if(panel.parentElement===dialog)slot.append(panel);
 nativeFull=false;$('#expand-demo').hidden=false;$('#close-demo').hidden=true;surface(false);window.scrollTo({top:savedScroll,behavior:'instant'});opener?.focus({preventScroll:true});
}
$('#expand-demo').addEventListener('click',expand);
$('#close-demo').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else if(dialog.open)dialog.close();});
document.addEventListener('fullscreenchange',()=>{if(nativeFull&&!document.fullscreenElement)restore();});
dialog.addEventListener('close',restore);
let backdropDown=null;
dialog.addEventListener('pointerdown',e=>{backdropDown=e.target===dialog?{x:e.clientX,y:e.clientY}:null;});
dialog.addEventListener('click',e=>{if(e.target===dialog&&backdropDown&&Math.hypot(e.clientX-backdropDown.x,e.clientY-backdropDown.y)<8)dialog.close();backdropDown=null;});
const range=$('#comparison-range');range.addEventListener('input',()=>{const value=Number(range.value);$('#comparison').style.setProperty('--split',value+'%');range.setAttribute('aria-valuetext',`${value}% presentazione neutra, ${100-value}% cinematografica`);});
// Fit the opening line to its own content wrapper, with the actual local font metrics.
const heading=$('#page-title'), measureCanvas=document.createElement('canvas'),ctx=measureCanvas.getContext('2d');
function fitHeading(){const width=heading.parentElement.clientWidth;const style=getComputedStyle(heading);let size=112;ctx.font=`350 ${size}px Inter`;const text=heading.textContent;const units=ctx.measureText(text).width + (text.length-1)*size*(-.055);size=Math.min(180,width/units*112);heading.style.fontSize=size+'px';}
new ResizeObserver(fitHeading).observe(heading.parentElement);document.fonts.ready.then(fitHeading);fitHeading();
$('#contact-link').addEventListener('click',()=>{if(engaged)$('#contact-link').href=contactUrl(engaged);});
enhanceVisuals();
