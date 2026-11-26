import { edgeLight } from './edge-light.mjs';
import { typeLight } from './type-light.mjs';
import { glyphSurfaces } from './glyph-surfaces.mjs';
import { acceptsLight, outlineOf, primaryTitle, surfaceIndex } from './surface-targets.mjs';

// A soft light under the pointer on the hovered surface: a light, not a tint. Black stays black (soft-light).
function sheenLayer() {
  const host = document.createElement('div'), spot = document.createElement('i');
  host.className = 'mm-sheen';
  host.setAttribute('aria-hidden', 'true');
  host.append(spot);
  document.body.append(host);
  let card = null, box = '';
  return {
    show(tab, point) {
      const b = tab.getBoundingClientRect(), key = [b.left, b.top, b.width, b.height].map(Math.round).join();
      if (tab !== card || key !== box) {
        card = tab; box = key;
        const points = outlineOf(tab);
        Object.assign(host.style, {left:b.left + 'px', top:b.top + 'px', width:b.width + 'px', height:b.height + 'px',
          clipPath:'polygon(' + points.map(p => (p.x - b.left).toFixed(1) + 'px ' + (p.y - b.top).toFixed(1) + 'px').join(',') + ')'});
      }
      spot.style.transform = 'translate(' + (point.x - b.left).toFixed(1) + 'px,' + (point.y - b.top).toFixed(1) + 'px)';
      host.setAttribute('data-on', '');
    },
    hide() { card = null; box = ''; host.removeAttribute('data-on'); }
  };
}

// One passive input stream for every surface effect, including content added by a carousel or a dialog.
export function mountSurfaces(field) {
  const cards = surfaceIndex(deckChange), ink = typeLight();
  const edges = edgeLight(cards, schedule);
  const glyphs = field ? glyphSurfaces(field, {cards, feed:edges.feed}) : null;
  const sheen = sheenLayer();
  const forced = matchMedia('(forced-colors:active)'), reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const touchStyle = matchMedia('(hover:none) and (pointer:coarse)'), fine = matchMedia('(hover:hover) and (pointer:fine)');
  let pointer = null, keyboard = null, pressed = null, touchTimer = 0, hovered = null;
  let request = 0, previous = 0, dirty = false;

  function hover(card) {
    if (hovered === card) return;
    hovered?.removeAttribute('data-mm-hover');
    hovered = card;
    card?.setAttribute('data-mm-hover', '');
  }
  // A carousel moved or a deck changed: light leaves with a short fade, never in one frame.
  function deckChange() {
    ink.cool();
    edges.fade();
    glyphs?.release();
    sheen.hide();
    hover(null);
    if (pointer || keyboard) schedule();
  }
  function select() {
    const modal = document.documentElement.hasAttribute('data-mm-modal');
    const target = keyboard || (pointer && document.elementFromPoint(pointer.x, pointer.y));
    const dialog = modal && target ? target.closest('dialog[open]') : null;
    if (!target || !acceptsLight(target) || target.closest('.mm-header,.mm-dock') || (modal && !dialog)) {
      ink.target(null); edges.target(null); sheen.hide(); hover(null);
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
    if (card && mouse && fine.matches && !dialog && card.querySelector('img,video')) sheen.show(card, pointer);
    else sheen.hide();
  }
  function frame(now) {
    request = 0;
    if (document.hidden || forced.matches) {reset(); return;}
    // The surfaces breathe at 60 frames a second at most, whatever the refresh rate of the screen.
    if (previous && now - previous < 1000 / 60 - 2) {request = requestAnimationFrame(frame); return;}
    const dt = previous ? Math.min(.1, (now - previous) / 1000) : 1 / 60;
    previous = now;
    if (dirty) {dirty = false; select();}
    const titleMoving = ink.frame(dt), edgesMoving = edges.frame(dt);
    if (titleMoving || edgesMoving) request = requestAnimationFrame(frame);
    else previous = 0;
  }
  function schedule() {
    dirty = dirty || !!(pointer || keyboard);
    if (!request) request = requestAnimationFrame(frame);
  }
  function reset() {
    clearTimeout(touchTimer);
    cancelAnimationFrame(request); request = previous = 0; dirty = false;
    pointer = keyboard = pressed = null;
    ink.clear(); edges.clear(); glyphs?.release(); sheen.hide(); hover(null);
  }
  function release() { pointer = keyboard = null; ink.target(null); edges.target(null); sheen.hide(); hover(null); schedule(); }
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
    if (glyphs && !touch && !reduced.matches) {
      const at = document.elementFromPoint(pointer.x, pointer.y), card = at?.closest('.mm-tab');
      glyphs.move(card && !document.documentElement.hasAttribute('data-mm-modal') ? card : null, pointer.x, pointer.y, distance);
    }
    schedule();
  }
  document.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || event.pointerType === 'pen') glyphs?.pressMove(event);
    if ((event.pointerType !== 'touch' && event.pointerType !== 'pen') || pressed) track(event);
  }, {passive:true});
  document.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary) return;
    clearTimeout(touchTimer);
    pressed = {x:event.clientX, y:event.clientY, drag:false};
    if ((event.pointerType === 'touch' || event.pointerType === 'pen') && !reduced.matches && !event.target.closest?.('.mm-header,.mm-dock')) glyphs?.pressStart(event);
    track(event);
  }, {capture:true, passive:true});
  document.addEventListener('pointerup', event => {
    if (!event.isPrimary) return;
    const dragging = pressed?.drag; pressed = null;
    if (event.pointerType === 'touch' || event.pointerType === 'pen') glyphs?.pressEnd(dragging);
    if (dragging) {release(); return;}
    if (event.pointerType === 'touch') touchTimer = setTimeout(release, 190);
  }, {capture:true, passive:true});
  document.addEventListener('pointercancel', () => {glyphs?.pressEnd(true); release(); pressed = null;}, {passive:true});
  document.addEventListener('pointerout', event => {if (!event.relatedTarget) {glyphs?.move(null); release();}}, {passive:true});
  document.addEventListener('keydown', event => {
    if (['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      pointer = null; keyboard = document.activeElement; schedule();
    }
  }, true);
  document.addEventListener('focusin', event => {if (!pointer) {keyboard = event.target; schedule();}});
  document.addEventListener('focusout', () => {if (keyboard) {keyboard = null; schedule();}});
  // The light plane moves with the document: scrolling only re-aims it. Glyphs sit on the fixed grid and fade out.
  document.addEventListener('scroll', event => {
    if (event.target !== document && event.target !== document.scrollingElement) {edges.fade(); sheen.hide();}
    else {edges.scrolled(); sheen.hide();}
    glyphs?.release();
    schedule();
  }, {capture:true, passive:true});
  for (const event of ['resize', 'pagehide']) window.addEventListener(event, reset);
  window.addEventListener('blur', release);
  for (const event of ['memento:modal-visibility', 'visibilitychange']) document.addEventListener(event, reset);
  document.fonts?.addEventListener?.('loadingdone', () => {ink.clear(); schedule();});
  for (const query of [forced, reduced, touchStyle]) query.addEventListener?.('change', reset);
  return {glyphs};
}
