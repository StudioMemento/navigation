import { edgeLight } from './edge-light.mjs';
import { typeLight } from './type-light.mjs';
import { glyphSurfaces } from './glyph-surfaces.mjs';
import { acceptsLight, faceOf, surfaceIndex } from './surface-targets.mjs';

export function mountSurfaces(field) {
  const forced = matchMedia('(forced-colors:active)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const touch = matchMedia('(hover:none) and (pointer:coarse)');
  const {cards,titles} = surfaceIndex(changed);
  const edges = edgeLight(cards), ink = typeLight(titles);
  const glyphs = field && glyphSurfaces(field,{cards,feed:edges.feed});
  let frame = 0, pointer = null, keyboard = null, press = null, trail = null;
  let hovered = new Set(), central = new Set(), lastScroll=scrollY, pulseAt=scrollY;
  let contact=null,contactTimer=0,usingKeys=false,touchInput=touch.matches,lastScrollFlash=-Infinity;
  function forgetContact() {clearTimeout(contactTimer);contact=null;}

  function hover(next) {
    for (const el of hovered) if (!next.has(el)) el.removeAttribute('data-mm-hover');
    for (const el of next) if (!hovered.has(el)) el.setAttribute('data-mm-hover','');
    hovered = next;
  }
  function clear() {
    hover(new Set());
    edges.clear(); ink.clear(); glyphs?.release();
  }
  function phoneFocus(scope) {
    const view=window.visualViewport;
    const cx=view ? view.offsetLeft+view.width/2 : innerWidth/2, cy=view ? view.offsetTop+view.height/2 : innerHeight/2;
    const half=Math.max(66,Math.min(innerWidth*.46,(view?.height || innerHeight)*.19));
    const point={x:cx,y:cy}, matches=[], middle=new Set();
    for(const card of cards) {
      if(!acceptsLight(card) || (scope && !scope.contains(card)))continue;
      const box=faceOf(card).getBoundingClientRect();
      if(!box.width || !box.height || box.right<=0 || box.left>=innerWidth)continue;
      const gap=Math.max(box.top-cy,cy-box.bottom,0), t=Math.max(0,1-gap/half);
      if(t<.07)continue;
      const at={x:Math.max(box.left+2,Math.min(box.right-2,cx)),y:Math.max(box.top,Math.min(box.bottom,cy))};
      matches.push({card,box,point:at,strength:.68*t*t*(3-2*t)});
      if(!gap)middle.add(card);
    }
    hover(new Set(matches.map(m=>m.card)));
    edges.band(matches);
    ink.target(point,{scope,band:half,contact:press && !press.drag ? press : contact});
    const y=scrollY;
    if(!scope && !reduced.matches && y!==lastScroll && Math.abs(y-pulseAt)>=Math.max(72,half*.65) && performance.now()-lastScrollFlash>160) {
      const entering=matches.filter(m=>middle.has(m.card) && !central.has(m.card));
      if(entering.length) {
        for(const m of entering) edges.flash(m.card,m.point,.27);
        const first=entering[0].box;
        const x=first.left>12 ? first.left-10 : Math.min(innerWidth-8,first.right+10);
        field?.impulse(x,cy,{power:.34,reach:Math.min(240,innerWidth*.58),speed:475,feed:false});
        pulseAt=y;lastScrollFlash=performance.now();
      }
    }
    central=middle;lastScroll=y;
  }
  function paint() {
    frame = 0;
    if (document.hidden || forced.matches) {clear();return;}
    const modal = document.documentElement.hasAttribute('data-mm-modal');
    const scope = modal ? (document.fullscreenElement || document.webkitFullscreenElement || document.querySelector('dialog[open]')) : null;
    if (modal && !scope) {clear();return;}
    if (touchInput && !keyboard) {phoneFocus(scope);return;}
    const target = keyboard || (pointer && document.elementFromPoint(pointer.x,pointer.y));
    if (!target || press?.drag || target.closest('.mm-header,.mm-dock,.mm-scrollbar') || (scope && !scope.contains(target))) {
      hover(new Set()); edges.target(null); ink.target(null); trail = null;
      return;
    }
    const card = target.closest('.mm-tab'), primary = card && acceptsLight(card) ? card : null;
    hover(new Set(primary ? [primary] : []));
    let point = pointer;
    if (keyboard) {
      const box = target.getBoundingClientRect();
      point = {x:box.left+box.width*.4,y:box.bottom-1};
    }
    edges.target(point,{primary,hints:!keyboard,scope});
    const focus = keyboard && (target.closest('.mm-type') || target.querySelector('.mm-type') || primary?.querySelector('.mm-type'));
    ink.target(keyboard ? null : pointer,{focus,scope});
    if (glyphs && pointer && !keyboard && !scope && !reduced.matches && trail) {
      glyphs.move(primary,pointer.x,pointer.y,trail.distance);
    }
    trail = null;
  }
  function schedule() {
    if (!frame && !document.hidden && !forced.matches) frame = requestAnimationFrame(paint);
  }
  function changed() {
    ink.invalidate();
    schedule();
  }
  function reset() {
    cancelAnimationFrame(frame); frame = 0;
    pointer = keyboard = press = trail = null;usingKeys=false;forgetContact();central.clear();lastScroll=pulseAt=scrollY;
    clear();
  }
  function move(event) {
    if (event.isPrimary === false) return;
    const x = event.clientX, y = event.clientY;
    if (press?.id === event.pointerId && Math.hypot(x-press.x,y-press.y)>7) press.drag = true;
    if (event.pointerType === 'touch' || (event.pointerType === 'pen' && touch.matches)) return;
    touchInput=false;
    const distance = pointer ? Math.hypot(x-pointer.x,y-pointer.y) : 0;
    trail = {distance:Math.min(240,(trail?.distance || 0)+distance)};
    pointer = {x,y}; keyboard = null;
    schedule();
  }
  document.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('pointerdown',event => {
    if (event.isPrimary === false || event.button !== 0) return;
    keyboard = null;usingKeys=false;forgetContact();
    press = {id:event.pointerId,x:event.clientX,y:event.clientY,target:event.target,drag:false};
    touchInput=event.pointerType==='touch' || (event.pointerType==='pen' && touch.matches);
    if (touchInput) {
      pointer = null;
      schedule();
    } else move(event);
  },{capture:true,passive:true});
  document.addEventListener('pointerup',event => {
    if (press?.id !== event.pointerId) return;
    const {x,y,target,drag} = press;
    const tap = !drag && Math.hypot(event.clientX-x,event.clientY-y) <= 7;
    if(tap && !reduced.matches && !forced.matches && !target.closest('.mm-scrollbar')) {
      const finger=event.pointerType==='touch' || (event.pointerType==='pen' && touch.matches);
      const card=target.closest('.mm-tab');
      if(card && acceptsLight(card)) edges.flash(card,{x,y},finger ? .54 : .62);
      if(finger) {
        contact={x,y};
        contactTimer=setTimeout(()=>{contact=null;schedule();},270);
      }
      field?.impulse(x,y,{input:true,power:finger ? .63 : .82,reach:finger ? Math.min(440,innerWidth*.94) : Math.min(1050,innerWidth*.87),feed:true});
    }
    press = null;
    if (event.pointerType === 'mouse') move(event); else schedule();
  },{capture:true,passive:true});
  document.addEventListener('pointercancel',() => {press = pointer = trail = null;schedule();},{passive:true});
  document.addEventListener('pointerout',event => {
    if (!event.relatedTarget) {pointer = trail = null;glyphs?.move(null);schedule();}
  },{passive:true});
  document.addEventListener('keydown',event => {
    if (['Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) {
      pointer = trail = null;usingKeys=true;keyboard = document.activeElement; schedule();
    }
  },true);
  document.addEventListener('focusin',event => {
    if (!pointer && (!touchInput || usingKeys) && event.target.matches(':focus-visible')) {keyboard = event.target; schedule();}
  });
  document.addEventListener('focusout',() => {keyboard = null;schedule();});
  document.addEventListener('memento:deck-motion',event => {
    if (event.detail.moving) {edges.stopMotion(event.target);glyphs?.release();trail = null;}
    changed();
  });
  document.addEventListener('scroll',event => {
    if (event.target !== document && event.target !== document.scrollingElement) glyphs?.release();
    schedule();
  },{capture:true,passive:true});
  document.addEventListener('memento:view-change',()=>{
    clear();forgetContact();central.clear();lastScroll=pulseAt=scrollY;
    if(!usingKeys) keyboard=null;
    changed();
  });
  document.addEventListener('toggle',changed,true);
  document.addEventListener('memento:modal-visibility',() => {clear();changed();});
  window.addEventListener('resize',() => {glyphs?.release();changed();},{passive:true});
  window.addEventListener('blur',reset);
  window.addEventListener('pagehide',reset);
  window.addEventListener('pageshow',changed);
  document.addEventListener('visibilitychange',() => {if (document.hidden) reset(); else changed();});
  document.fonts?.addEventListener('loadingdone',changed);
  for (const query of [forced,reduced,touch]) query.addEventListener('change',() => {touchInput=touch.matches;reset();changed();});
  schedule();
}

