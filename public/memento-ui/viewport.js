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
  let release, paintObserver;
  function clearReveal() {
    cancelAnimationFrame(paintFrame);
    paintObserver?.disconnect();
    delete root.dataset.mementoPreparing;
    delete root.dataset.mementoEnter;
    delete root.dataset.mementoLeave;
    release?.();
    release = undefined;
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
    window.mementoPageReveal = new Promise(resolve => { release = resolve; });
    let queued = false;
    function present() {
      if (queued || !release) return;
      queued = true;
      paintObserver?.disconnect();
      paintFrame = requestAnimationFrame(() => {
        // Give the edge a composited frame before its clock starts.
        root.dataset.mementoPreparing = direction;
        paintFrame = requestAnimationFrame(() => {
          delete root.dataset.mementoPreparing;
          root.dataset.mementoEnter = direction;
          if (document.getAnimations && !document.getAnimations().some(a => a.animationName === 'memento-page-reveal')) clearReveal();
        });
      });
    }
    function contentReady() {
      if (!release) return;
      if (restored || !window.PerformanceObserver?.supportedEntryTypes?.includes('paint') ||
          performance.getEntriesByName('first-contentful-paint').length) { present(); return; }
      paintObserver = new PerformanceObserver(list => {
        if (list.getEntriesByName('first-contentful-paint').length) present();
      });
      paintObserver.observe({type:'paint', buffered:true});
      window.addEventListener('pageshow', present, {once:true});
      if (document.readyState === 'complete') present();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', contentReady, {once:true});
    else contentReady();
  }
  function finishAnimation(event) {
    if (event.target !== root) return;
    if (event.animationName === 'memento-page-reveal') clearReveal();
    if (event.animationName === 'memento-page-leave') delete root.dataset.mementoLeave;
  }
  document.addEventListener('animationend', finishAnimation);
  document.addEventListener('animationcancel', finishAnimation);
  window.addEventListener('pagehide', clearReveal);
  window.addEventListener('pageshow', event => { if (event.persisted) prepareArrival(true); });
  quiet.addEventListener('change', () => { if (quiet.matches) clearReveal(); });
  prepareArrival();
  fit();
  window.addEventListener('resize', fit, {passive:true});
  window.visualViewport?.addEventListener('resize', fit, {passive:true});
})();
