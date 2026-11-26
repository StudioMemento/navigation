import { edgeLight } from './edge-light.mjs';
import { typeLight } from './type-light.mjs';

// A single passive input stream for both effects, including content added by a carousel or a dialog.
export function mountSurfaces() {
  const edges=edgeLight(), ink=typeLight();
  const forced=matchMedia('(forced-colors:active)'), reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const touchStyle=matchMedia('(hover:none) and (pointer:coarse)');
  let pointer=null, keyboard=null, pressed=null, touchTimer=0;
  let request=0, previous=0, dirty=false;
  const hover=matchMedia('(hover:hover)');
  // Screen just the photograph's own pixels under the pointer. Black contributes zero light.
  let photoCard=null;
  const glint=new Image();
  glint.alt='';glint.setAttribute('aria-hidden','true');
  function photo(card, point) {
    if (!hover.matches || !card || !point || point.touch || !card.matches('.email-card,.channel,.location-card')) {
      if (photoCard) {glint.remove();photoCard=null;}
      return;
    }
    if (card!==photoCard) {
      const image=card.querySelector('img');
      if (!image) return;
      glint.className=(image.className+' mm-photo-glint').trim();
      glint.src=image.currentSrc || image.src;
      image.after(glint);photoCard=card;
    }
    const box=card.getBoundingClientRect();
    glint.style.setProperty('--photo-x',((point.x-box.left)/box.width*100).toFixed(2)+'%');
    glint.style.setProperty('--photo-y',((point.y-box.top)/box.height*100).toFixed(2)+'%');
  }

  function select() {
    const modal=document.documentElement.hasAttribute('data-mm-modal');
    const target=keyboard || (pointer && document.elementFromPoint(pointer.x,pointer.y));
    const dialog=modal && target ? target.closest('dialog[open]') : null;
    if (!target || target.closest('.mm-header,.mm-dock') || (modal && !dialog)) {
      ink.target(null); edges.target(null);photo(null);return;
    }
    const card=target.closest('.mm-tab');
    let title=target.closest('.mm-type');
    let edgePoint=pointer, typePoint=pointer;
    if (keyboard) {
      title=title || target.querySelector('.mm-type');
      if (card) {
        const box=card.getBoundingClientRect();
        edgePoint={x:box.left+box.width*.28,y:box.bottom-1};
      }
      if (title) {
        const box=title.getBoundingClientRect();
        typePoint={x:box.left+box.width*.5,y:box.top+box.height*.65};
      }
    }
    ink.target(title,typePoint,!!keyboard,touchStyle.matches);
    edges.target(edgePoint,dialog,keyboard && card);
    photo(card,keyboard ? typePoint || edgePoint : pointer);
  }
  function frame(now) {
    request=0;
    if (document.hidden || forced.matches) {reset();return;}
    const dt=previous?(now-previous)/1000:1/60;
    previous=now;
    if (dirty) {dirty=false;select();}
    const titleMoving=ink.frame(dt), edgesMoving=edges.frame(dt);
    if (titleMoving || edgesMoving) request=requestAnimationFrame(frame);
    else previous=0;
  }
  function schedule() {
    dirty=true;
    if (!request) request=requestAnimationFrame(frame);
  }
  function reset() {
    clearTimeout(touchTimer);
    cancelAnimationFrame(request);request=previous=0;dirty=false;
    pointer=keyboard=pressed=null;
    ink.clear();edges.clear();photo(null);
  }
  function release() {pointer=keyboard=null;schedule();}
  function track(event) {
    if (!event.isPrimary && event.isPrimary!==undefined) return;
    if (pressed && Math.hypot(event.clientX-pressed.x,event.clientY-pressed.y)>8) {
      pressed.drag=true;
      if (pointer) release();
      return;
    }
    keyboard=null;pointer={x:event.clientX,y:event.clientY,touch:event.pointerType==='touch'};
    schedule();
  }
  document.addEventListener('pointermove',event=>{
    if (event.pointerType!=='touch' || pressed) track(event);
  },{passive:true});
  document.addEventListener('pointerdown',event=>{
    if (event.button!==0 || !event.isPrimary) return;
    clearTimeout(touchTimer);
    pressed={x:event.clientX,y:event.clientY,drag:false};
    track(event);
  },{capture:true,passive:true});
  document.addEventListener('pointerup',event=>{
    if (!event.isPrimary) return;
    const dragging=pressed?.drag;pressed=null;
    if (dragging) {release();return;}
    if (event.pointerType==='touch') touchTimer=setTimeout(release,190);
  },{capture:true,passive:true});
  document.addEventListener('pointercancel',reset,{passive:true});
  document.addEventListener('pointerout',event=>{if (!event.relatedTarget) release();},{passive:true});
  document.addEventListener('keydown',event=>{
    if (['Tab','ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      pointer=null;keyboard=document.activeElement;schedule();
    }
  },true);
  document.addEventListener('focusin',event=>{if (!pointer) {keyboard=event.target;schedule();}});
  document.addEventListener('focusout',()=>{if (keyboard) {keyboard=null;schedule();}});
  // Never leave a screen-space highlight behind a moving card, closed dialog or restored page.
  document.addEventListener('scroll',reset,{capture:true,passive:true});
  document.addEventListener('wheel',reset,{passive:true});
  for (const event of ['resize','blur','pagehide']) window.addEventListener(event,reset);
  for (const event of ['memento:modal-visibility','visibilitychange']) document.addEventListener(event,reset);
  document.fonts?.addEventListener?.('loadingdone',reset);
  for (const query of [forced,reduced,touchStyle,hover]) query.addEventListener?.('change',reset);
}
