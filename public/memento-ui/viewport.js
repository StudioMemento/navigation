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
  // An ordinary document navigation keeps its native timing, focus, history and scroll.
  // Play the reveal on the destination once its content can actually be painted.
  const quiet = matchMedia('(prefers-reduced-motion: reduce), (forced-colors: active)');
  let paintFrame = 0;
  function clearReveal() {
    cancelAnimationFrame(paintFrame);
    delete root.dataset.mementoEnter;
    delete root.dataset.mementoLeave;
  }
  function acknowledge(destination) {
    if (quiet.matches || !destination) return;
    const url = new URL(destination, location.href);
    if (url.origin === location.origin && url.pathname !== location.pathname) root.dataset.mementoLeave = '';
  }
  if (window.navigation) {
    window.navigation.addEventListener('navigate', event => {
      if (event.defaultPrevented || event.hashChange || event.downloadRequest != null || event.formData) return;
      acknowledge(event.destination.url);
      event.signal.addEventListener('abort', () => { delete root.dataset.mementoLeave; }, {once:true});
    });
  } else {
    window.addEventListener('click', event => {
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = event.composedPath().find(node => node instanceof HTMLAnchorElement);
      if (link && !link.hasAttribute('download') && ['', '_self', '_top', '_parent'].includes(link.target)) acknowledge(link.href);
    });
  }
  function prepareArrival(restored = false) {
    clearReveal();
    delete root.dataset.mementoArrival;
    const activation = window.navigation?.activation;
    const type = restored ? 'traverse' : activation?.navigationType || performance.getEntriesByType('navigation')[0]?.type;
    if (type === 'reload') return;
    const previous = activation?.from?.url || document.referrer;
    const historyVisit = type === 'traverse' || type === 'back_forward';
    if (previous) {
      const from = new URL(previous);
      if (from.origin !== location.origin || (!historyVisit && from.pathname === location.pathname)) return;
    } else if (!historyVisit) return;
    const direction = historyVisit && activation?.from && activation.from.index > activation.entry?.index ? 'back' : 'forward';
    // Keep this marker for late-loading renderers, including the Home when returning from a section.
    root.dataset.mementoArrival = direction;
    if (quiet.matches) return;
    function reveal() {
      paintFrame = requestAnimationFrame(() => {
        if (!quiet.matches) root.dataset.mementoEnter = direction;
      });
    }
    if (document.readyState === 'loading') document.addEventListener('readystatechange', reveal, {once:true});
    else reveal();
  }
  document.addEventListener('animationend', event => {
    if (event.target !== root) return;
    if (event.animationName === 'memento-page-reveal') delete root.dataset.mementoEnter;
    if (event.animationName === 'memento-page-leave') delete root.dataset.mementoLeave;
  });
  window.addEventListener('pagehide', clearReveal);
  window.addEventListener('pageshow', event => { if (event.persisted) prepareArrival(true); });
  quiet.addEventListener('change', () => { if (quiet.matches) clearReveal(); });
  prepareArrival();
  fit();
  window.addEventListener('resize', fit, {passive:true});
  window.visualViewport?.addEventListener('resize', fit, {passive:true});
})();
