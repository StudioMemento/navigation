// Smooth page scrolling for a mouse wheel: each notch moves a target and the page eases to it, so the page, the wall
// of glyphs and every surface glide together instead of jumping a notch at a time (no tearing).
// Only the document scrolls this way. Anything that handles the wheel itself (carousels, the Studio canvas, the Home
// drum) keeps it; inner scrollers, dialogs, zoom (ctrl/⌘), horizontal gestures, touch and reduced motion stay native.
const EASE = 105;         // ms: time constant of the glide
const LINE = 16;          // px for a wheel that counts in lines

export function smoothScroll() {
  const root = document.documentElement;
  const fine = matchMedia('(hover: hover) and (pointer: fine)'), reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let target = scrollY, current = scrollY, written = NaN, frame = 0, previous = 0;

  const limit = () => Math.max(0, (document.scrollingElement || root).scrollHeight - innerHeight);
  const enabled = () => fine.matches && !reduced.matches && root.dataset.mementoNative !== 'home' && !root.hasAttribute('data-mm-modal');

  // Does an element between the target and the page scroll in this direction on its own?
  function inner(node, dy) {
    for (let el = node instanceof Element ? node : node?.parentElement; el && el !== document.body && el !== root; el = el.parentElement) {
      if (el.matches('dialog, iframe, [data-no-smooth-scroll]')) return true;
      if (el.scrollHeight <= el.clientHeight + 1) continue;
      const overflow = getComputedStyle(el).overflowY;
      if (overflow !== 'auto' && overflow !== 'scroll' && overflow !== 'overlay') continue;
      if (dy < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
    }
    return false;
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    target = current = scrollY;
    written = NaN;
  }
  function step(now) {
    frame = 0;
    // Someone else moved the page (scrollbar, keys, a link): let go.
    if (!Number.isNaN(written) && Math.abs(scrollY - written) > 2) {stop(); return;}
    const dt = Math.min(48, Math.max(1, now - previous));
    previous = now;
    target = Math.max(0, Math.min(limit(), target));
    current += (target - current) * (1 - Math.exp(-dt / EASE));
    if (Math.abs(target - current) < .5) current = target;
    window.scrollTo({top:current, behavior:'instant'});
    written = scrollY;
    if (current !== target) frame = requestAnimationFrame(step);
    else written = NaN;
  }
  addEventListener('wheel', event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || !enabled()) return;
    const unit = event.deltaMode === 1 ? LINE : event.deltaMode === 2 ? innerHeight : 1;
    const dy = event.deltaY * unit;
    if (!dy || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (inner(event.target, dy)) return;
    // Stay native at the ends, so the page can still hand the gesture on (overscroll, an embedding page).
    if (!frame && (dy < 0 ? scrollY <= 0 : scrollY >= limit() - 1)) return;
    event.preventDefault();
    if (!frame) {current = scrollY; target = scrollY; previous = performance.now();}
    target = Math.max(0, Math.min(limit(), target + dy));
    if (!frame) frame = requestAnimationFrame(step);
  }, {passive:false});
  // A press, a key or a modal takes the page back at once.
  for (const type of ['pointerdown', 'keydown']) addEventListener(type, () => { if (frame) stop(); }, true);
  document.addEventListener('memento:modal-visibility', () => { if (frame) stop(); });
}
