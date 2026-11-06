import {PAGES,SETTINGS} from './config.mjs';
import {wrap,readLocation,pageAddress} from './logic.mjs';
import {verticalIntent,dragDestination,slotAt,centerSlot,nearestSlot,isModified,shouldSuppressClick} from './gesture.mjs';
import {createField} from './field.mjs';
import {mountNav} from '../navigation/navbar.mjs';

const viewport=document.getElementById('viewport'),hub=document.getElementById('hub');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let route=readLocation(location.href),active=route.index,slot=5+active,height=1;
let scrollRAF=0,settleTimer=0,leaving=false,passthrough=false,leaveTimer=0,recoverTimer=0;
let suppressUntil=0,drag=null,touchStart=null,rebaseRAF=0,field;
const sections=[],cards=[];
const nav=mountNav({active:PAGES[active].id});
nav.setAttribute('target','_top');nav.setAttribute('blur','off');
nav.shadowRoot.querySelector('.mm-link[data-id="memento"]').setAttribute('aria-label','Studio');
// Keep the established icon dock; use its active amber tile as the sole position cue.
const navStyle=document.createElement('style');
navStyle.textContent='.mm-dock{bottom:max(12px,env(safe-area-inset-bottom));margin-bottom:0}.mm-wordmark{top:max(22px,env(safe-area-inset-top))}';
nav.shadowRoot.append(navStyle);

function picture(page,index){
 return `<img class="image-wash" src="/assets/images/${page.image}-tiny.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false"><picture><img src="/assets/images/${page.image}.webp" srcset="/assets/images/${page.image}-tiny.webp 480w, /assets/images/${page.image}-small.webp 768w, /assets/images/${page.image}.webp 1254w" sizes="60vw" width="1254" height="1254" alt="${page.alt}" draggable="false" decoding="async" loading="${Math.abs(index-slot)<=1?'eager':'lazy'}" fetchpriority="${index===slot?'high':'low'}"></picture>`;
}
for(let index=0;index<PAGES.length*3;index++){
 const page=PAGES[index%5],section=document.createElement('section');
 section.className='section';section.dataset.index=String(index);section.setAttribute('aria-label',page.label);
 section.innerHTML=`<a class="card" href="${page.publicURL}" target="_top" draggable="false" aria-label="Apri ${page.label}"><div class="card-shell"><div class="card-visual">${picture(page,index)}<div class="card-shade"></div><div class="card-amber"></div><div class="caption"><h2 class="title" aria-label="${page.title}">${[...page.title].map(char=>`<span aria-hidden="true">${char}</span>`).join('')}</h2></div></div></div><svg class="card-border" aria-hidden="true" preserveAspectRatio="none"><path/></svg></a>`;
 const card=section.firstElementChild;
 card.addEventListener('click',event=>{
  if(passthrough||isModified(event))return;
  if(shouldSuppressClick(performance.now(),suppressUntil,drag,leaving)){event.preventDefault();return;}
  if(Math.abs(viewport.scrollTop-index*height)>height*.04){event.preventDefault();select(index%5);return;}
  leave(event,card);
 });
 viewport.append(section);sections.push(section);cards.push(card);
}

function fit(){
 height=viewport.clientHeight;
 const ctx=document.createElement('canvas').getContext('2d');
 for(const card of cards){
  const title=card.querySelector('.title'),width=title.clientWidth;
  ctx.font='350 100px Inter';
  const glyphWidth=[...title.textContent].reduce((s,c)=>s+ctx.measureText(c).width,0);
  const size=width/(glyphWidth/100+title.children.length*.11);
  title.style.setProperty('--title-size',`${size}px`);
  const w=card.clientWidth,h=card.clientHeight,c=parseFloat(getComputedStyle(card).getPropertyValue('--cut'))||12;
  const cut=Math.min(22,Math.max(10,innerWidth*.015));
  const svg=card.querySelector('svg');svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
  svg.firstElementChild.setAttribute('d',`M${cut} .5H${w-.5}V${h-cut}L${w-cut} ${h-.5}H.5V${cut}Z`);
 }
 field?.resize();
}
function announce(){document.getElementById('announcement').textContent=`${PAGES[active].label}, sezione ${active+1} di ${PAGES.length}.`}
function updateActive(next,{history=true}={}){
 const changed=next!==active;
 const cardFocused=changed&&document.activeElement?.classList.contains('card');
 if(changed){cards[slot]?.setAttribute('href',PAGES[active].publicURL);route={index:next,query:'',anchor:''};}
 active=next;nav.setActive(PAGES[active].id);
 document.title=`${PAGES[active].label} — Memento`;
 for(let i=0;i<cards.length;i++){
  const selected=i===slot;
  cards[i].tabIndex=selected?0:-1;sections[i].setAttribute('aria-hidden',String(!selected));
  cards[i].toggleAttribute('inert',!selected);
  if(selected){cards[i].setAttribute('aria-current','true');cards[i].href=pageAddress(PAGES[active],route.query,route.anchor);}
  else cards[i].removeAttribute('aria-current');
 }
 if(cardFocused)cards[slot].focus({preventScroll:true});
 if(history&&changed)window.history.replaceState({mementoPage:PAGES[active].id},'',`/#${PAGES[active].slug}`);
 if(changed)announce();
}
function drawScroll(){
 scrollRAF=0;
 const top=viewport.scrollTop,nextSlot=slotAt(top,height),previous=slot;
 slot=nextSlot;
 if(previous!==slot)updateActive(wrap(slot));
 for(let i=0;i<cards.length;i++){
  const p=(i*height-top)/height,a=Math.min(1,Math.abs(p));
  if(a>1.1&&Math.abs(i-previous)>1)continue;
  cards[i].style.setProperty('--opacity',String(1-a*.82));
  cards[i].style.setProperty('--scale',String(reduced.matches?1:1-a*.035));
  cards[i].style.setProperty('--clip-top',`${reduced.matches?0:Math.max(0,p)*22}%`);
  cards[i].style.setProperty('--clip-bottom',`${reduced.matches?0:Math.max(0,-p)*22}%`);
  cards[i].style.setProperty('--material',String(1-a*.55));
 }
 field?.scroll(top,height,slot);
}
function scrollFrame(){if(!scrollRAF)scrollRAF=requestAnimationFrame(drawScroll);}
function rebase(){
 if(drag||touchStart||leaving)return;
 const n=slotAt(viewport.scrollTop,height);
 if(Math.abs(viewport.scrollTop-n*height)>2)return;
 if(n<5||n>=10){
  const focused=cards[n].contains(document.activeElement);
  viewport.classList.add('is-rebasing');slot=centerSlot(n);viewport.scrollTop=slot*height;
  drawScroll();updateActive(wrap(slot));
  if(focused)cards[slot].focus({preventScroll:true});
  cancelAnimationFrame(rebaseRAF);rebaseRAF=requestAnimationFrame(()=>viewport.classList.remove('is-rebasing'));
 }
}
function select(index,{instant=false,history=true}={}){
 if(leaving)return;
 const next=nearestSlot(wrap(index),slot),smooth=!instant&&!reduced.matches;
 if(!history)route=readLocation(location.href);
 viewport.scrollTo({top:next*height,behavior:smooth?'smooth':'auto'});
 if(!smooth){slot=next;updateActive(wrap(next),{history});drawScroll();rebase();}
}
viewport.addEventListener('scroll',()=>{
 suppressUntil=performance.now()+130;scrollFrame();
 clearTimeout(settleTimer);settleTimer=setTimeout(rebase,180);
},{passive:true});
viewport.addEventListener('scrollend',rebase,{passive:true});
nav.shadowRoot.addEventListener('click',event=>{
 const link=event.target.closest?.('.mm-link');
 if(!link||isModified(event))return;
 event.preventDefault();select(PAGES.findIndex(p=>p.id===link.dataset.id));
},{capture:true});
viewport.addEventListener('keydown',event=>{
 if(event.altKey||event.metaKey||event.ctrlKey||event.target.closest('input,textarea'))return;
 const next={ArrowDown:active+1,PageDown:active+1,ArrowUp:active-1,PageUp:active-1,Home:0,End:4,' ':active+(event.shiftKey?-1:1)}[event.key];
 if(next!==undefined){event.preventDefault();select(next);}
 else if(event.key==='Enter'&&event.target===viewport){event.preventDefault();cards[slot].click();}
});
viewport.addEventListener('dragstart',event=>event.preventDefault());
viewport.addEventListener('pointerdown',event=>{
 if(!event.isPrimary||event.button!==0||leaving)return;
 if(event.pointerType==='touch'){touchStart={x:event.clientX,y:event.clientY};return;}
 drag={id:event.pointerId,x:event.clientX,y:event.clientY,top:viewport.scrollTop,time:event.timeStamp,start:slot,claimed:false};
},{passive:true});
viewport.addEventListener('pointermove',event=>{
 if(event.pointerType==='touch'){
  if(touchStart&&Math.hypot(event.clientX-touchStart.x,event.clientY-touchStart.y)>8)suppressUntil=performance.now()+350;
  return;
 }
 if(!drag||drag.id!==event.pointerId)return;
 const dy=event.clientY-drag.y,dx=event.clientX-drag.x;
 if(!drag.claimed&&verticalIntent(dx,dy)){drag.claimed=true;viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');}
 if(drag.claimed){viewport.scrollTop=drag.top-dy;suppressUntil=performance.now()+400;}
},{passive:true});
function endDrag(event,cancel=false){
 if(event.pointerType==='touch'){touchStart=null;return;}
 if(!drag||event.pointerId!==drag.id)return;
 const g=drag;drag=null;viewport.classList.remove('is-dragging');
 if(viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);
 if(g.claimed){
  suppressUntil=performance.now()+400;
  const dest=cancel?slotAt(viewport.scrollTop,height):dragDestination(g.start,event.clientY-g.y,event.timeStamp-g.time,height);
  viewport.scrollTo({top:Math.max(0,Math.min(14,dest))*height,behavior:reduced.matches?'auto':'smooth'});
 }
}
window.addEventListener('pointerup',event=>endDrag(event),{passive:true});
window.addEventListener('pointercancel',event=>endDrag(event,true),{passive:true});
viewport.addEventListener('lostpointercapture',event=>endDrag(event,true),{passive:true});
function reset(){
 clearTimeout(leaveTimer);clearTimeout(recoverTimer);leaving=false;passthrough=false;
 drag=null;touchStart=null;suppressUntil=0;viewport.classList.remove('is-dragging');
 hub.classList.remove('is-leaving');hub.removeAttribute('aria-busy');
 field?.wake();
}
function leave(event,link){
 if(passthrough||isModified(event))return;
 if(reduced.matches)return;
 event.preventDefault();leaving=true;hub.classList.add('is-leaving');hub.setAttribute('aria-busy','true');
 field?.exit();
 leaveTimer=setTimeout(()=>{passthrough=true;link.click();passthrough=false;recoverTimer=setTimeout(reset,2200);},SETTINGS.leaveMs);
}
fit();viewport.scrollTop=slot*height;drawScroll();updateActive(active,{history:false});announce();
field=createField({canvas:document.getElementById('field'),viewport,cards,reduced});
field.scroll(viewport.scrollTop,height,slot);field.enter();
document.fonts.ready.then(()=>{fit();drawScroll();});
let resizeTimer;
new ResizeObserver(()=>{
 clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{const n=active;fit();select(n,{instant:true,history:false});},80);
}).observe(viewport);
window.addEventListener('blur',reset);
window.addEventListener('pageshow',()=>{reset();fit();drawScroll();});
for(const name of ['popstate','hashchange'])window.addEventListener(name,()=>{reset();route=readLocation(location.href);select(route.index,{instant:true,history:false});});
window.addEventListener('pagehide',()=>{reset();field.pause();});
