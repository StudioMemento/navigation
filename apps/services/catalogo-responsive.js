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
  window.addEventListener('resize', update, {passive: true});
  new ResizeObserver(update).observe(root);
})();
