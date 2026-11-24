/* START V25 surface and navigation mode, before the first paint: only a compatible host (?mementoEmbed=1) owns the
   background and the navigation; a plain embed (Framer) and the page on its own are opaque with their own navbar. */
(() => {
  const root = document.documentElement, embedded = window.self !== window.top;
  const hosted = embedded && new URLSearchParams(location.search).get('mementoEmbed') === '1';
  root.dataset.embedded = String(embedded);
  root.dataset.mementoSurface = hosted ? 'transparent' : 'opaque';
  root.dataset.mementoInitialMode = root.dataset.mementoNavigation = hosted ? 'hosted' : 'standalone';
  // The Memento hub draws the same navbar over a full-viewport frame: keep the standalone clearances (bridge 13).
  if (hosted) root.dataset.mementoLayout = 'overlay';
})();

/* Shared Services V40 geometry; measured from this document's viewport. */
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

/* START V25: content and navigation are visible at once. The effects take over surface by surface once they are
   ready (html.vfx-live + [data-vfx-ready]); reduced motion, forced colours or no WebGL2 keep the DOM page. */

/* Surface handshake lets a compatible host own its background and blur. */
(() => {
  if (window.parent === window) return;
  let origin = null;
  try { origin = new URL(document.referrer).origin; } catch { /* Await host. */ }
  const announce = () => {
    if (!origin || origin === 'null') return;
    window.parent.postMessage({ type: 'memento:levelup:surface', version: 1,
      overlayOpen: Boolean(document.querySelector('dialog[open]')) }, origin);
  };
  window.addEventListener('message', event => {
    if (event.source !== window.parent || event.origin === 'null' ||
        (origin && event.origin !== origin) ||
        event.data?.type !== 'memento:levelup:request-surface' || event.data.version !== 1) return;
    origin = event.origin;
    announce();
  });
  document.addEventListener('memento:overlay-change', announce);
  window.addEventListener('load', announce, { once: true });
})();
