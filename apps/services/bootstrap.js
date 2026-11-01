/* Keep browser editing tools available in fields and the request preview. */
document.addEventListener('contextmenu', (event) => {
  if (
    !event.target.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"]), #request-preview',
    )
  )
    event.preventDefault();
});

/* Transparent child surface. Parent blur belongs to the hosting document. */
(() => {
  const embedded = window.parent !== window;
  document.documentElement.dataset.embedded = String(embedded);
  if (!embedded) return;

  let parentOrigin = null;
  try {
    parentOrigin = new URL(document.referrer).origin;
  } catch (_) {
    /* Handshake below. */
  }
  let overlayOpen = false;
  const announce = () => {
    if (!parentOrigin || parentOrigin === 'null') return;
    window.parent.postMessage(
      { type: 'memento:services:surface', version: 1, overlayOpen },
      parentOrigin,
    );
  };
  window.addEventListener('message', (event) => {
    if (event.source !== window.parent || event.origin === 'null') return;
    if (event.data?.type !== 'memento:services:request-surface' || event.data.version !== 1) return;
    if (parentOrigin && event.origin !== parentOrigin) return;
    parentOrigin = event.origin;
    announce();
  });
  document.addEventListener('memento:overlay-change', () => {
    overlayOpen = Boolean(document.querySelector('dialog[open]'));
    announce();
  });
  window.addEventListener('load', announce, { once: true });
})();

/* Share one continuous square-to-landscape ratio with CSS and the carousel.
   Read the iframe's layout viewport, never the screen or the zoomed viewport. */
(() => {
  const root = document.documentElement;
  let previousWidth = -1;
  const update = () => {
    const width = root.clientWidth || window.innerWidth;
    if (width === previousWidth) return;
    previousWidth = width;
    const wide = Math.max(0, Math.min(1, (width - 768) / 256));
    root.style.setProperty('--layout-wide', wide.toFixed(5));
    root.style.setProperty('--board-ratio', (1 + wide).toFixed(5));
  };
  update();
  window.addEventListener('resize', update, { passive: true });
  new ResizeObserver(update).observe(root);
})();
