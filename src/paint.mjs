// Optional artwork can start after content and the current page transition have painted.
export function afterFirstPaint() {
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    .then(() => window.mementoSceneFinished).catch(() => {});
}

/**
 * R15: the renderer is created when the page's own work is done (hydration, first images): the first idle period after
 * the first paint and the page transition, never later than `timeout` ms. The DOM page is complete meanwhile.
 */
export function whenIdle(timeout = 900) {
  return afterFirstPaint().then(() => new Promise(resolve => {
    if (typeof requestIdleCallback === 'function') requestIdleCallback(() => resolve(), { timeout });
    else setTimeout(resolve, 120);
  }));
}
