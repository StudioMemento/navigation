import { edgeLight } from './edge-light.mjs';
import { typeLight } from './type-light.mjs';
import { glyphSurfaces } from './glyph-surfaces.mjs';
import { acceptsLight, acceptsHint, primaryTitle, surfaceIndex } from './surface-targets.mjs';

// One passive input stream for every surface effect, including content added by a slider or a dialog.
// On a phone there is no hover: the square at the centre of the screen is the pointer, and scrolling moves it.
const MOVING = '#hub.is-moving,#hub.is-dragging,[data-mm-slider].is-moving,[data-mm-slider].is-dragging';

export function mountSurfaces(field) {
  const cards = surfaceIndex({onMove:aim, onSwap:swap}), ink = typeLight();
  const edges = edgeLight(cards, schedule);
  const glyphs = field ? glyphSurfaces(field, {cards, feed:edges.feed}) : null;
  const forced = matchMedia('(forced-colors:active)'), reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const touchStyle = matchMedia('(hover:none) and (pointer:coarse)');
  let pointer = null, keyboard = null, pressed = null, touchTimer = 0, hovered = null;
  let request = 0, previous = 0, dirty = false, focused = new Set(), settle = 0;

  function hover(card) {
    if (hovered === card) return;
    hovered?.removeAttribute('data-mm-hover');
    hovered = card;
    card?.setAttribute('data-mm-hover', '');
  }
  // A slider moved or changed its active slide: the hover and the light follow the slide under the pointer, without
  // a gap. Only the glyphs of the surfaces let go, because their cells no longer match the slide.
  function aim() {
    glyphs?.release();
    if (touchStyle.matches) {
      clearTimeout(settle);
      settle = setTimeout(() => schedule(true), 260);
    }
    schedule(true);
  }
  // A view was swapped (a deck removed, the Portfolio's grid and project): its light leaves with a short fade.
  function swap() {
    ink.cool();
    edges.fade();
    glyphs?.release();
    hover(null);
    unfocus();
    schedule(true);
  }
  // The phone's square of focus: about as tall as the screen is wide, at its centre.
  function square() {
    const side = Math.min(innerWidth, innerHeight * .62);
    return {top:(innerHeight - side) / 2, bottom:(innerHeight + side) / 2, x:innerWidth / 2, y:innerHeight / 2};
  }
  function unfocus() {
    for (const card of focused) card.removeAttribute('data-mm-hover');
    focused = new Set();
  }
  // The surfaces whose centre is in the square take the hover state; the nearest one warms its title and edge.
  function focus() {
    const modal = document.documentElement.hasAttribute('data-mm-modal');
    const zone = square(), inside = [];
    if (!modal) for (const card of cards) {
      if (!acceptsLight(card) || card.closest('dialog,.mm-header,.mm-dock')) continue;
      const b = card.getBoundingClientRect();
      if (!b.width || !b.height || b.bottom < 0 || b.top > innerHeight) continue;
      const cy = (b.top + b.bottom) / 2, cx = (b.left + b.right) / 2;
      if ((cy >= zone.top && cy <= zone.bottom) || (b.top <= zone.y && b.bottom >= zone.y)) inside.push({card, d:Math.abs(cy - zone.y) + .2 * Math.abs(cx - zone.x)});
    }
    inside.sort((a, b) => a.d - b.d);
    const next = new Set(inside.slice(0, 4).map(entry => entry.card));
    for (const card of focused) if (!next.has(card)) card.removeAttribute('data-mm-hover');
    for (const card of next) card.setAttribute('data-mm-hover', '');
    focused = next;
    const lead = inside[0]?.card || null;
    ink.target(lead ? primaryTitle(lead) : null, null, {touch:true});
    edges.target(lead ? {x:zone.x, y:zone.y} : null, {primary:lead, neighbours:false});
  }
  function select() {
    if (touchStyle.matches && !keyboard) {focus(); return;}
    const modal = document.documentElement.hasAttribute('data-mm-modal');
    const target = keyboard || (pointer && document.elementFromPoint(pointer.x, pointer.y));
    const dialog = modal && target ? target.closest('dialog[open]') : null;
    // Over a neighbouring slide there is no hover, but its edges may still take the hint of light.
    if (!target || !acceptsHint(target) || target.closest('.mm-header,.mm-dock') || (modal && !dialog)) {
      ink.target(null); edges.target(null); hover(null);
      return;
    }
    let card = target.closest('.mm-tab');
    if (card && !acceptsLight(card)) card = null;
    const own = target.closest('.mm-type');
    const title = own || (keyboard ? target.querySelector('.mm-type') : null) || primaryTitle(card);
    let edgePoint = pointer, typePoint = pointer && own ? pointer : null;
    if (keyboard) {
      if (card) {
        const box = card.getBoundingClientRect();
        edgePoint = {x:box.left + box.width * .28, y:box.bottom - 1};
      }
      typePoint = null;
    }
    const mouse = pointer && !pointer.touch;
    hover(card && (mouse || keyboard) ? card : null);
    ink.target(title, typePoint, {keyboard:!!keyboard, touch:touchStyle.matches});
    edges.target(edgePoint, {dialog, primary:card, neighbours:!!mouse});
  }
  function frame(now) {
    request = 0;
    if (document.hidden || forced.matches) {reset(); return;}
    // The surfaces breathe at 60 frames a second at most, whatever the refresh rate of the screen.
    if (previous && now - previous < 1000 / 60 - 2) {request = requestAnimationFrame(frame); return;}
    const dt = previous ? Math.min(.1, (now - previous) / 1000) : 1 / 60;
    previous = now;
    // While a slider moves under a still pointer, the hover and the light are aimed again on every frame.
    const moving = !!document.querySelector(MOVING);
    if (dirty || (moving && (pointer || keyboard || touchStyle.matches))) {dirty = false; select();}
    const titleMoving = ink.frame(dt), edgesMoving = edges.frame(dt, moving);
    if (titleMoving || edgesMoving || moving) request = requestAnimationFrame(frame);
    else previous = 0;
  }
  function schedule(always = false) {
    dirty = dirty || always || !!(pointer || keyboard) || touchStyle.matches;
    if (!request) request = requestAnimationFrame(frame);
  }
  function reset() {
    clearTimeout(touchTimer);
    cancelAnimationFrame(request); request = previous = 0; dirty = false;
    pointer = keyboard = pressed = null;
    ink.clear(); edges.clear(); glyphs?.release(); hover(null); unfocus();
    if (touchStyle.matches) schedule(true);
  }
  function release() {
    pointer = keyboard = null;
    if (!touchStyle.matches) {ink.target(null); edges.target(null); hover(null);}
    schedule();
  }
  function track(event) {
    if (!event.isPrimary && event.isPrimary !== undefined) return;
    const touch = event.pointerType === 'touch' || event.pointerType === 'pen';
    if (pressed && Math.hypot(event.clientX - pressed.x, event.clientY - pressed.y) > 8) {
      pressed.drag = true;
      if (pointer) release();
      return;
    }
    const distance = pointer ? Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) : 0;
    keyboard = null; pointer = {x:event.clientX, y:event.clientY, touch};
    if (touch && touchStyle.matches) {pointer = null; return;}
    if (glyphs && !touch && !reduced.matches) {
      const at = document.elementFromPoint(pointer.x, pointer.y), card = at?.closest('.mm-tab');
      glyphs.move(card && !document.documentElement.hasAttribute('data-mm-modal') ? card : null, pointer.x, pointer.y, distance);
    }
    schedule();
  }
  document.addEventListener('pointermove', event => {
    if ((event.pointerType !== 'touch' && event.pointerType !== 'pen') || pressed) track(event);
  }, {passive:true});
  document.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary) return;
    clearTimeout(touchTimer);
    pressed = {x:event.clientX, y:event.clientY, drag:false};
    // A finger landing anywhere but the navigation starts a chain reaction through every surface on screen.
    if ((event.pointerType === 'touch' || event.pointerType === 'pen') && !reduced.matches && !event.target.closest?.('.mm-header,.mm-dock')) glyphs?.touch(event.clientX, event.clientY);
    track(event);
  }, {capture:true, passive:true});
  document.addEventListener('pointerup', event => {
    if (!event.isPrimary) return;
    const dragging = pressed?.drag; pressed = null;
    if (dragging) {release(); return;}
    if (event.pointerType === 'touch') touchTimer = setTimeout(release, 190);
  }, {capture:true, passive:true});
  document.addEventListener('pointercancel', () => {release(); pressed = null;}, {passive:true});
  document.addEventListener('pointerout', event => {if (!event.relatedTarget) {glyphs?.move(null); release();}}, {passive:true});
  document.addEventListener('keydown', event => {
    if (['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      pointer = null; keyboard = document.activeElement; schedule();
    }
  }, true);
  document.addEventListener('focusin', event => {if (!pointer) {keyboard = event.target; schedule();}});
  document.addEventListener('focusout', () => {if (keyboard) {keyboard = null; schedule();}});
  // The light and the glyphs of the surfaces move with the document: scrolling only re-aims them. An inner scroller
  // moves its surfaces under the light instead, so that light fades.
  document.addEventListener('scroll', event => {
    if (event.target !== document && event.target !== document.scrollingElement) {edges.fade(); glyphs?.release();}
    else {edges.scrolled(); glyphs?.scrolled();}
    schedule();
  }, {capture:true, passive:true});
  // A view swapped by hiding its parent (the Portfolio's grid and project) lets its light go at once.
  new MutationObserver(records => {
    if (records.some(r => r.oldValue !== r.target.getAttribute('hidden') && !r.target.matches('.home-card') && (r.target.matches('.mm-tab') || r.target.querySelector('.mm-tab')))) swap();
  }).observe(document.body, {subtree:true, attributes:true, attributeFilter:['hidden'], attributeOldValue:true});
  if (touchStyle.matches) {
    schedule(true);
    window.addEventListener('load', () => schedule(true), {once:true});
  }
  // A change of width moves every surface; a change of height alone is the browser's bars coming and going.
  let width = document.documentElement.clientWidth;
  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth === width) return;
    width = document.documentElement.clientWidth;
    reset();
  });
  window.addEventListener('pagehide', reset);
  window.addEventListener('blur', release);
  for (const event of ['memento:modal-visibility', 'visibilitychange']) document.addEventListener(event, reset);
  document.fonts?.addEventListener?.('loadingdone', () => {ink.clear(); schedule();});
  for (const query of [forced, reduced, touchStyle]) query.addEventListener?.('change', reset);
  return {glyphs};
}
