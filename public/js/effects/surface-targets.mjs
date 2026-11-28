// The depth and mask of a slide belong to its own DOM stacking context.
const SLIDE = '.home-card,.flow-card,.showcase-card[data-slide]';
export const MOVING = '#hub.is-moving,[data-mm-slider].is-moving';
export const slideOf = element => element?.closest(SLIDE);

export function setDeckMoving(deck, moving) {
  if (deck.classList.contains('is-moving') === moving) return;
  deck.classList.toggle('is-moving', moving);
  deck.dispatchEvent(new CustomEvent('memento:deck-motion', {bubbles:true, detail:{moving}}));
}

export function available(element) {
  return element?.isConnected && !element.closest('[hidden],[inert],dialog:not([open])');
}

export function acceptsLight(element) {
  if (!available(element) || element.closest(MOVING)) return false;
  const slide = slideOf(element);
  return !slide || (slide.tabIndex === 0 && slide.dataset.active !== 'false' && slide.getAttribute('aria-hidden') !== 'true');
}

const faceSelector = ':scope > :is(.mm-slide-face,.flow-face,.tile-frame,.home-shade)';
export const faceOf = card => card.querySelector(faceSelector) || card;

// Resolve the polygons already used by the stylesheets, in the face's own CSS pixels.
// Their coordinates are lengths, percentages or sums of the two.
function coordinate(expression, extent) {
  const terms = expression.match(/[+-]?\s*(?:\d*\.)?\d+(?:%|px)?/g) || [];
  return terms.reduce((sum, term) => sum + parseFloat(term.replace(/\s/g, '')) * (term.endsWith('%') ? extent / 100 : 1), 0);
}
export function outlinePoints(clip, width, height) {
  if (clip?.startsWith('polygon(')) {
    const points = clip.slice(8, -1).split(',').map(vertex => {
      const pair = vertex.trim().match(/calc\([^)]*\)|[^\s]+/g);
      return pair?.length === 2 ? {x:coordinate(pair[0],width), y:coordinate(pair[1],height)} : null;
    });
    if (points.length > 2 && points.every(Boolean)) return points;
  }
  return [{x:0,y:0},{x:width,y:0},{x:width,y:height},{x:0,y:height}];
}

// Surface glyphs are mapped only while their card is at rest and facing the viewer.
export function outlineOf(card) {
  const face = faceOf(card), box = face.getBoundingClientRect();
  return outlinePoints(getComputedStyle(face).clipPath, box.width, box.height)
    .map(p => ({x:box.left + p.x, y:box.top + p.y}));
}

export function boxDistance(box, point) {
  return Math.hypot(Math.max(box.left-point.x, 0, point.x-box.right), Math.max(box.top-point.y, 0, point.y-box.bottom));
}

// Cards and titles have the same visibility index, including content inserted by
// a dialog or by the portfolio. Painting an effect never registers another target.
export function surfaceIndex(onChange) {
  const cards = new Set(), titles = new Set();
  const group = el => el.matches('.mm-tab') ? cards : titles;
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    let changed = false;
    for (const {target,isIntersecting} of entries) {
      const set = group(target), show = isIntersecting && target.isConnected;
      if (set.has(target) === show) continue;
      if (show) set.add(target); else set.delete(target);
      changed = true;
    }
    if (changed) onChange();
  }, {rootMargin:'210px'}) : null;
  function visit(node, add) {
    if (node.nodeType !== 1 || node.matches('.mm-edge,.mm-static-edge')) return false;
    const targets = [...node.querySelectorAll('.mm-tab,.mm-type')];
    if (node.matches('.mm-tab,.mm-type')) targets.push(node);
    for (const el of targets) {
      if (add) {
        if (observer) observer.observe(el); else group(el).add(el);
      } else {
        observer?.unobserve(el);
        group(el).delete(el);
      }
    }
    return targets.length > 0;
  }
  visit(document.body, true);
  new MutationObserver(records => {
    let changed = false;
    for (const record of records) {
      for (const node of record.removedNodes) changed = visit(node, false) || changed;
      for (const node of record.addedNodes) changed = visit(node, true) || changed;
    }
    if (changed) onChange();
  }).observe(document.body, {childList:true, subtree:true});
  return {cards,titles};
}

