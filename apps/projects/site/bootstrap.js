/* START V25 surface and navigation mode, before the first paint (as in LevelUp V20): only a compatible host
   (?mementoEmbed=1) owns the background and the navigation; a plain embed (Framer) and the page on its own are opaque,
   with the Ghost Fibers background and their own navbar. */
(() => {
  const root = document.documentElement, embedded = window.self !== window.top;
  const hosted = embedded && new URLSearchParams(location.search).get('mementoEmbed') === '1';
  root.dataset.embedded = String(embedded);
  root.dataset.mementoSurface = hosted ? 'transparent' : 'opaque';
  root.dataset.mementoInitialMode = root.dataset.mementoNavigation = hosted ? 'hosted' : 'standalone';
  // The Memento hub draws the same navbar over a full-viewport frame: keep the standalone clearances (bridge 13).
  if (hosted) root.dataset.mementoLayout = 'overlay';
})();

/* Shared Services V40 geometry, measured from this document's viewport: --layout-wide 0 (phone) → 1 (≥ 1024 px). */
(() => {
  const root = document.documentElement;
  let previous = -1;
  const update = () => {
    const width = root.clientWidth || window.innerWidth;
    if (width === previous) return;
    previous = width;
    const wide = Math.max(0, Math.min(1, (width - 768) / 256));
    root.style.setProperty('--layout-wide', wide.toFixed(5));
    root.style.setProperty('--board-ratio', (1 + wide).toFixed(5));
  };
  update();
  window.addEventListener('resize', update, { passive: true });
  new ResizeObserver(update).observe(root);
})();

/* START V25: content and navigation are visible at once. The effects take over surface by surface once they are ready
   (html.vfx-live + [data-vfx-ready]); reduced motion keeps them still, forced colours or no WebGL2 keep the DOM page. */
