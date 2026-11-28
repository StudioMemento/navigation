import { edgeLight } from './edge-light.mjs';
import { typeLight } from './type-light.mjs';
import { glyphSurfaces } from './glyph-surfaces.mjs';
import { acceptsLight, MOVING, surfaceIndex } from './surface-targets.mjs';

export function mountSurfaces(field) {
  const forced = matchMedia('(forced-colors:active)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const touch = matchMedia('(hover:none) and (pointer:coarse)');
  const {cards,titles} = surfaceIndex(changed);
  const edges = edgeLight(cards), ink = typeLight(titles);
  const glyphs = field && glyphSurfaces(field,{cards,feed:edges.feed});
  let frame = 0, pointer = null, keyboard = null, press = null, trail = null;
  let hovered = new Set();

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
    const point = {x:innerWidth/2,y:innerHeight/2};
    const half = Math.min(innerWidth,innerHeight*.62)/2, matches = [];
    for (const card of cards) {
      if (!acceptsLight(card) || (scope && !scope.contains(card))) continue;
      const box = card.getBoundingClientRect();
      if (!box.width || !box.height || box.right <= 0 || box.left >= innerWidth) continue;
      const cy = box.top+box.height/2, cx = box.left+box.width/2;
      if (Math.abs(cy-point.y) <= half || (box.top <= point.y && box.bottom >= point.y)) {
        matches.push({card,gap:Math.abs(cy-point.y)+.2*Math.abs(cx-point.x)});
      }
    }
    matches.sort((a,b) => a.gap-b.gap);
    hover(new Set(matches.slice(0,4).map(entry => entry.card)));
    const primary = matches[0]?.card;
    edges.target(primary ? point : null,{primary,hints:false,scope});
    ink.target(press && !press.drag ? press : point,{scope});
  }
  function paint() {
    frame = 0;
    if (document.hidden || forced.matches) {clear();return;}
    const modal = document.documentElement.hasAttribute('data-mm-modal');
    const scope = modal ? (document.fullscreenElement || document.webkitFullscreenElement || document.querySelector('dialog[open]')) : null;
    if (modal && !scope) {clear();return;}
    if (touch.matches && !keyboard) {phoneFocus(scope);return;}
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
    pointer = keyboard = press = trail = null;
    clear();
  }
  function move(event) {
    if (event.isPrimary === false) return;
    const x = event.clientX, y = event.clientY;
    if (press?.id === event.pointerId && Math.hypot(x-press.x,y-press.y)>7) press.drag = true;
    if (event.pointerType === 'touch' || (event.pointerType === 'pen' && touch.matches)) return;
    const distance = pointer ? Math.hypot(x-pointer.x,y-pointer.y) : 0;
    trail = {distance:Math.min(240,(trail?.distance || 0)+distance)};
    pointer = {x,y}; keyboard = null;
    schedule();
  }
  document.addEventListener('pointermove',move,{passive:true});
  document.addEventListener('pointerdown',event => {
    if (event.isPrimary === false || event.button !== 0) return;
    keyboard = null;
    press = {id:event.pointerId,x:event.clientX,y:event.clientY,target:event.target,drag:false};
    if (event.pointerType === 'touch' || event.pointerType === 'pen' && touch.matches) {
      pointer = null;
      schedule();
    } else move(event);
  },{capture:true,passive:true});
  document.addEventListener('pointerup',event => {
    if (press?.id !== event.pointerId) return;
    const {x,y,target,drag} = press;
    const tap = !drag && Math.hypot(event.clientX-x,event.clientY-y) <= 7;
    if (tap && !reduced.matches && !target.closest('.mm-header,.mm-dock,'+MOVING)) {
      if (event.pointerType === 'touch' || (event.pointerType === 'pen' && touch.matches)) glyphs?.touch(x,y);
      else if (event.pointerType === 'mouse' && !target.closest('a,button,input,textarea,select,iframe,canvas,summary,dialog,label')) {
        field?.impulse(x,y,{feed:true});
      }
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
      pointer = trail = null; keyboard = document.activeElement; schedule();
    }
  },true);
  document.addEventListener('focusin',event => {
    if (!pointer && event.target.matches(':focus-visible')) {keyboard = event.target; schedule();}
  });
  document.addEventListener('focusout',() => {keyboard = null;schedule();});
  document.addEventListener('memento:deck-motion',event => {
    if (event.detail.moving) {glyphs?.release();trail = null;}
    changed();
  });
  document.addEventListener('scroll',event => {
    if (event.target !== document && event.target !== document.scrollingElement) glyphs?.release();
    schedule();
  },{capture:true,passive:true});
  document.addEventListener('toggle',changed,true);
  document.addEventListener('memento:modal-visibility',() => {clear();changed();});
  window.addEventListener('resize',() => {glyphs?.release();changed();},{passive:true});
  window.addEventListener('blur',reset);
  window.addEventListener('pagehide',reset);
  window.addEventListener('pageshow',changed);
  document.addEventListener('visibilitychange',() => {if (document.hidden) reset(); else changed();});
  document.fonts?.addEventListener('loadingdone',changed);
  for (const query of [forced,reduced,touch]) query.addEventListener('change',() => {reset();changed();});
  schedule();
}

