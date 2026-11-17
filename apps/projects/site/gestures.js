/**
 * One-pointer horizontal swipe for the gallery (stage and thumbnails). Native vertical scroll, browser pinch zoom and
 * the iOS momentum stay untouched: a gesture becomes horizontal only after a clear sideways travel.
 */
export function installSwipe(root, { selector, canSwipe = () => true, onSwipe }) {
  let gesture = null, suppressed = null, suppressUntil = 0;
  function reset(suppress = false) {
    if (!gesture) return null;
    const g = gesture; gesture = null;
    g.surface.classList.remove('dragging');
    if (g.surface.hasPointerCapture?.(g.pointer)) g.surface.releasePointerCapture(g.pointer);
    if (suppress) { suppressed = g.surface; suppressUntil = performance.now() + 450; }
    return g;
  }
  root.addEventListener('pointerdown', event => {
    if (!event.isPrimary) { reset(true); return; }
    if (event.button !== 0 || (window.visualViewport?.scale || 1) > 1.01) return;
    if (event.target.closest('video,iframe,model-viewer,input,audio')) return;
    const surface = event.target.closest(selector);
    if (!surface || !canSwipe(surface)) return;
    reset();
    gesture = { surface, pointer: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), horizontal: false };
  }, { passive: true });
  root.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.pointer) return;
    const g = gesture, dx = event.clientX - g.x, dy = event.clientY - g.y;
    if (g.horizontal) return;
    if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { reset(); return; }
    if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    g.horizontal = true;
    try { g.surface.setPointerCapture(event.pointerId); } catch { /* released by native scrolling */ }
    g.surface.classList.add('dragging');
  }, { passive: true });
  function finish(event, cancel = false) {
    if (!gesture || event.pointerId !== gesture.pointer) return;
    const g = reset(gesture.horizontal);
    if (cancel || !g?.horizontal) return;
    const dx = event.clientX - g.x, dy = event.clientY - g.y;
    const speed = Math.abs(dx) / Math.max(1, performance.now() - g.time);
    const threshold = Math.min(56, Math.max(32, g.surface.clientWidth * .1));
    if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
    if (Math.abs(dx) >= threshold || (Math.abs(dx) > 22 && speed > .35)) onSwipe(g.surface, dx < 0 ? 1 : -1);
  }
  window.addEventListener('pointerup', event => finish(event), { passive: true });
  window.addEventListener('pointercancel', event => finish(event, true), { passive: true });
  root.addEventListener('lostpointercapture', event => finish(event, true), { passive: true });
  window.addEventListener('blur', () => reset());
  root.addEventListener('click', event => {
    if (event.detail !== 0 && performance.now() < suppressUntil && suppressed?.contains(event.target)) {
      event.preventDefault(); event.stopPropagation();
    }
  }, true);
}
