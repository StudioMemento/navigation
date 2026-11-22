// Compatibility for cached documents from the previous release.
// Publish layout variables once per viewport change. Content mutations require no observer.
(() => {
  const root = document.documentElement;
  let previousWidth = -1;
  let previousHeight = -1;
  function fit() {
    const width = root.clientWidth;
    const height = Math.round(window.visualViewport?.height || window.innerHeight);
    if (width !== previousWidth) {
      previousWidth = width;
      const wide = Math.max(0, Math.min(1, (width - 768) / 256));
      root.style.setProperty('--layout-wide', String(wide));
      root.style.setProperty('--board-ratio', String(1 + wide));
    }
    if (height !== previousHeight) {
      previousHeight = height;
      root.style.setProperty('--memento-nav-height', height + 'px');
    }
  }
  fit();
  window.addEventListener('resize', fit, {passive:true});
  window.visualViewport?.addEventListener('resize', fit, {passive:true});
})();

window.mementoGo = href => location.assign(href);
