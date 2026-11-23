// R17: the document is arriving under the page-change cover (scene-head sets the flag before the first paint).
export const arriving = () => document.documentElement.hasAttribute('data-mm-arrive');

// Optional artwork can start after content and the current page transition have painted. Under the page-change
// cover the artwork starts at once instead: it goes live behind the seal and the page is revealed already drawn.
export function afterFirstPaint() {
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    .then(() => arriving() ? undefined : window.mementoSceneFinished).catch(() => {});
}

/**
 * R15: the renderer is created when the page's own work is done (hydration, first images): the first idle period after
 * the first paint and the page transition, never later than `timeout` ms. The DOM page is complete meanwhile.
 * R17: under the page-change cover, at once.
 */
export function whenIdle(timeout = 900) {
  return afterFirstPaint().then(() => new Promise(resolve => {
    if (arriving()) setTimeout(resolve, 0);
    else if (typeof requestIdleCallback === 'function') requestIdleCallback(() => resolve(), { timeout });
    else setTimeout(resolve, 120);
  }));
}

/**
 * R17: an effects renderer is booting. The page change waits for it (html.vfx-live, or every renderer announced in
 * window.mementoEffects settled, with a cap) before it lifts the cover, so the page is never shown as DOM and then
 * taken over. Call the returned function on failure; the first `memento:effects-live` (first published frame) settles it.
 */
export function announceEffects() {
  const entry = { settled: false };
  const done = () => { entry.settled = true; document.removeEventListener('memento:effects-live', done); };
  document.addEventListener('memento:effects-live', done);
  (window.mementoEffects ||= []).push(entry);
  return done;
}
