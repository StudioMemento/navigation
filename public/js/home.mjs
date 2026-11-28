import { layout, pose, relative, nearest, wrap, dragSnap, slideStep, queuedStep, wheelStep, titleSize } from './home-model.mjs';
import { setDeckMoving } from './effects/surface-targets.mjs';

const hub = document.querySelector('#hub');
const scene = document.querySelector('#scene');
const cards = [...scene.querySelectorAll('a')];
const faces = cards.map(card => ({card,image:card.querySelector('img'),title:card.querySelector('h2')}));
const dock = [...document.querySelectorAll('.mm-dock a')];
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const status = document.querySelector('#home-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const wheel = { time: -Infinity, stepTime: -Infinity, delta: 0 };
function hashIndex() {
  const slug = location.hash.slice(1).toLowerCase();
  return cards.findIndex(card => card.dataset.page === (slug === 'memento' ? 'studio' : slug));
}
let position = Math.max(0, hashIndex()), target = position, velocity = 0;
let frame, frameId = 0, last = 0, drag = null, suppressClick = false, activeIndex = -1;
function measure() {
  const height = window.visualViewport && visualViewport.scale === 1 ? Math.min(innerHeight, visualViewport.height) : innerHeight;
  const root = document.documentElement;
  const width = root.clientWidth;
  frame = layout(width, height, {
    logoBottom: document.querySelector('.mm-brand').getBoundingClientRect().bottom,
    dockTop: document.querySelector('.mm-dock').getBoundingClientRect().top
  });
  const sizes = {'--view-height':height,'--card-w':frame.width,'--card-h':frame.height,'--card-pad':frame.padding,'--cut':frame.cut,'--previous-y':frame.previousY,'--next-y':frame.nextY,'--arrow-h':frame.arrowHeight};
  for (const [name,value] of Object.entries(sizes)) hub.style.setProperty(name,value+'px');
  scene.style.perspective = frame.perspective+'px';
  for (const card of cards) {
    card.style.setProperty('--title-size',titleSize(frame,Number(card.dataset.titleEm))+'px');
    card.querySelector('img').sizes = Math.ceil(frame.width)+'px';
  }
  draw();
}
function draw() {
  const active = wrap(Math.round(position), cards.length);
  for (const [i,{card,image,title}] of faces.entries()) {
    const distance = relative(i,position,cards.length), amount = Math.abs(distance), p = pose(distance,frame);
    if (card.hidden === p.visible) card.hidden = !p.visible;
    if (activeIndex !== active) {
      card.tabIndex = i === active ? 0 : -1;
      card.setAttribute('aria-hidden',String(i !== active));
      if (i === active) dock[i].setAttribute('aria-current','location');
      else dock[i].removeAttribute('aria-current');
    }
    if (!p.visible) continue;
    if (!image.hasAttribute('srcset')) {image.srcset = image.dataset.srcset; image.src = image.dataset.src;}
    card.style.transform = 'translate(-50%,-50%) translate3d(0,'+p.y+'px,'+p.z+'px) rotateX('+p.angle+'rad)';
    const rim = Math.min(1,(1.75-amount)/.5);
    card.style.opacity = String((1-.63*Math.min(1,amount))*rim);
    title.style.opacity = String(Math.max(0,1-2*amount));
  }
  activeIndex = active;
}
function commit() {
  hub.classList.remove('is-dragging');
  setDeckMoving(hub,false);
  const active = cards[wrap(Math.round(target), cards.length)];
  status.textContent = active.getAttribute('aria-label');
  history.replaceState(history.state,'','#'+active.dataset.page);
  if (scene.contains(document.activeElement) && document.activeElement!==active) active.focus({preventScroll:true});
}
function animate(stamp) {
  frameId=0;
  const step = slideStep(position,velocity,target,last ? (stamp-last)/1000 : 1/60,reduced.matches);
  position=step.position; velocity=step.velocity; last=stamp; draw();
  if (step.settled) { last=0; commit(); }
  else frameId=requestAnimationFrame(animate);
}
function select(value) {
  setDeckMoving(hub,true);
  target=value;
  if (!frameId) frameId=requestAnimationFrame(animate);
}
function step(n) { select(queuedStep(position,target,n)); }
previous.hidden=next.hidden=false;
previous.addEventListener('click',()=>step(-1));
next.addEventListener('click',()=>step(1));
hub.addEventListener('wheel',event=>{
  if (event.ctrlKey || Math.abs(event.deltaX)>Math.abs(event.deltaY)) return;
  event.preventDefault();
  const units=event.deltaMode===1?16:event.deltaMode===2?frame.h:1;
  const n=wheelStep(wheel,event.deltaY*units,performance.now());
  if(n) step(n);
},{passive:false});
document.addEventListener('keydown',event=>{
  if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey) return;
  if(event.key==='ArrowDown'||event.key==='ArrowUp') { event.preventDefault(); step(event.key==='ArrowDown'?1:-1); }
  else if(event.key==='Home'||event.key==='End') { event.preventDefault(); select(nearest(event.key==='Home'?0:cards.length-1,position,cards.length)); }
  else if(event.key==='Enter'&&(document.activeElement===document.body||document.activeElement===hub)) { event.preventDefault(); cards[wrap(Math.round(target),cards.length)].click(); }
});
hub.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0||event.target.closest('button')) return;
  suppressClick=false;
  drag={id:event.pointerId, y:event.clientY, x:event.clientX, start:position, last:position, time:performance.now(), speed:0, moved:false};
});
hub.addEventListener('pointermove',event=>{
  if(!drag||drag.id!==event.pointerId) return;
  const dy=event.clientY-drag.y;
  if(!drag.moved) {
    if(Math.abs(dy)<8||Math.abs(dy)<Math.abs(event.clientX-drag.x)) return;
    drag.moved=true; drag.start=position; drag.last=position;
    hub.classList.add('is-dragging');setDeckMoving(hub,true);
    hub.setPointerCapture(event.pointerId);cancelAnimationFrame(frameId);frameId=0;last=0;
  }
  const time=performance.now();
  position=drag.start-Math.max(-1,Math.min(1,dy/Math.max(64,frame.height*.85)));
  drag.speed=(position-drag.last)*1000/Math.max(12,time-drag.time); drag.last=position; drag.time=time;
  if (!frameId) frameId=requestAnimationFrame(()=>{frameId=0;draw();});
});
function endDrag(event) {
  if(!drag||drag.id!==event.pointerId) return;
  const pointer=drag; drag=null;
  if(!pointer.moved) return;
  cancelAnimationFrame(frameId); frameId=0;
  suppressClick=true;
  const speed=performance.now()-pointer.time<140?pointer.speed:0;
  velocity=Math.max(-5,Math.min(5,speed));
  select(dragSnap(pointer.start,position,speed,event.type==='pointercancel'));
  setTimeout(()=>{suppressClick=false;},0);
}
window.addEventListener('pointerup',endDrag);
window.addEventListener('pointercancel',endDrag);
hub.addEventListener('click',event=>{
  const card=event.target.closest('.home-card');
  if(suppressClick) {event.preventDefault(); return;}
  if(!card||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey) return;
  const index=cards.indexOf(card);
  if(index!==wrap(Math.round(position),cards.length)) { event.preventDefault(); select(nearest(index,position,cards.length)); }
});
window.addEventListener('hashchange',()=>{const i=hashIndex();if(i>=0)select(nearest(i,position,cards.length));});
window.addEventListener('resize',measure);
window.visualViewport?.addEventListener('resize',measure);
window.addEventListener('pageshow',measure);
measure();
