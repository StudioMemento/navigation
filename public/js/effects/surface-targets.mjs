// Which surfaces take light, where their outline is on screen, and which slide stands in front of which.
const SLIDE = '.home-card,.flow-card,.showcase-card[data-slide],.carousel-card[data-slide]';
const RECT = [['0%', '0%'], ['100%', '0%'], ['100%', '100%'], ['0%', '100%']];

export function isSlide(el) { return !!el?.closest(SLIDE); }
export function slideOf(el) { return el?.closest(SLIDE) || null; }

// The slider engines (home.mjs, slider.mjs) record how far each slide is from the active one, every frame. Within a
// deck, a slide nearer the active one stands in front of a farther one: its outline hides the light of the other.
const depths = new WeakMap();
export function setSlideDepth(slide, distance) { depths.set(slide, distance); }
export function slideDepth(slide) { return depths.get(slide) ?? 0; }

function settled(el) {
  return el?.isConnected && !el.closest('[hidden],[inert],dialog:not([open])');
}

// The active slide (or any surface that is not a slide) takes the full light and the hover state, even while its
// deck is moving: the light follows the slide instead of leaving it.
export function acceptsLight(el) {
  if (!settled(el)) return false;
  const slide = slideOf(el);
  return !slide || (slide.tabIndex === 0 && slide.dataset.active !== 'false' && slide.getAttribute('aria-hidden') !== 'true');
}

// The hint of light reaches every surface that can be seen, the neighbouring slides included.
export function acceptsHint(el) {
  if (!settled(el)) return false;
  const slide = slideOf(el);
  if (!slide) return true;
  const style = getComputedStyle(slide);
  return style.visibility !== 'hidden' && parseFloat(style.opacity) > .12;
}

// CSS resolves each percentage and cut corner in the card's own coordinate system. Reading these zero-area points
// after layout gives its actual projection, even while a 3D slider is moving.
const outlines = new WeakMap();
export function outlineOf(card) {
  const face = card.querySelector(':scope > .tile-frame,:scope > .flow-face,:scope > .home-shade') || card;
  const style = getComputedStyle(face);
  if (style.position === 'static') face.setAttribute('data-mm-outline-anchor', '');
  const clip = style.clipPath;
  let entry = outlines.get(card);
  if (!entry || entry.clip !== clip || !entry.holder.isConnected) {
    entry?.holder.remove();
    let vertices = RECT;
    if (clip?.startsWith('polygon(')) {
      vertices = clip.slice(8, -1).split(/,(?![^()]*\))/).map(vertex => vertex.trim().match(/(?:[^\s()]+\([^)]*\)|[^\s]+)/g));
      if (vertices.some(pair => !pair || pair.length !== 2)) vertices = RECT;
    }
    const holder = document.createElement('span');
    holder.className = 'mm-outline-points';
    holder.setAttribute('aria-hidden', 'true');
    const markers = vertices.map(([left, top]) => {
      const marker = document.createElement('i');
      marker.style.left = left; marker.style.top = top; holder.append(marker);
      return marker;
    });
    face.append(holder);
    entry = {clip, holder, markers};
    outlines.set(card, entry);
  }
  return entry.markers.map(marker => {
    const point = marker.getBoundingClientRect();
    return {x:point.left, y:point.top};
  });
}

export function primaryTitle(card) {
  return card?.querySelector('.mm-type') || null;
}

// Track the actual surfaces, including decks inserted by a dialog. Proximity is continuous within the viewport
// margin, independent of how many pointer samples happen to hit a card.
// onMove: a deck moved (its active slide changed or it started or stopped moving). onSwap: a deck was removed.
export function surfaceIndex({onMove, onSwap}) {
  const visible = new Set(), slides = new Set();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.target.isConnected) visible.add(entry.target);
      else visible.delete(entry.target);
    }
  }, {rootMargin:'210px'}) : null;
  const decks = new MutationObserver(records => {
    if (records.some(r => r.target.getAttribute(r.attributeName) !== r.oldValue)) onMove();
  });
  function watchSlide(card) {
    const host = card.closest('#hub,.carousel,.coverflow') || card.parentElement?.parentElement;
    if (host) decks.observe(host, {attributes:true, attributeFilter:['class'], attributeOldValue:true});
    decks.observe(card, {attributes:true, attributeFilter:[card.matches('.home-card') ? 'aria-hidden' : 'data-active'], attributeOldValue:true});
  }
  function add(card) {
    visible.add(card); io?.observe(card);
    if (card.matches(SLIDE)) {slides.add(card); watchSlide(card);}
  }
  function visit(node, each) {
    if (node.nodeType !== 1) return;
    if (node.matches('.mm-tab')) each(node);
    node.querySelectorAll('.mm-tab').forEach(each);
  }
  function drop(card) {visible.delete(card); slides.delete(card); io?.unobserve(card);}
  const changes = new MutationObserver(records => {
    let removedDeck = false;
    for (const r of records) {
      for (const n of r.removedNodes) visit(n, card => {removedDeck = slides.has(card) || removedDeck; drop(card);});
      for (const n of r.addedNodes) visit(n, add);
    }
    if (!removedDeck) return;
    // Removed dialog decks must not be kept alive by the observer.
    decks.disconnect();
    for (const slide of slides) if (slide.isConnected) watchSlide(slide);
    onSwap();
  });
  document.querySelectorAll('.mm-tab').forEach(add);
  changes.observe(document.body, {subtree:true, childList:true});
  return visible;
}
