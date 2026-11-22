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

// The browser owns navigation. The optional cue cannot delay a link, gesture or keyboard shortcut.
window.mementoGo = href => location.assign(href);

(() => {
  const routes = new Set(['/', '/studio', '/memento', '/services', '/projects', '/levelup', '/start']);
  const path = url => url.pathname.replace(/\/+$/, '') || '/';
  const here = new URL(location.href);
  function otherPage(value) {
    if (!value) return false;
    const url = new URL(value, here);
    return url.origin === here.origin && routes.has(path(url)) && path(url) !== path(here);
  }
  if (window.top !== window || !routes.has(path(here))) return;

  const activation = window.navigation?.activation;
  const type = activation?.navigationType || performance.getEntriesByType('navigation')[0]?.type;
  const traversal = type === 'traverse' || type === 'back_forward';
  const from = activation?.from?.url || (!traversal && document.referrer);
  const arrived = type !== 'reload' && (from ? otherPage(from) : traversal);
  if (arrived) document.documentElement.dataset.mementoArrival = 'page';

  if (window.HTMLScriptElement?.supports?.('speculationrules') && !navigator.connection?.saveData) {
    const paths = [...routes].filter(route => route !== path(here) && route !== '/memento');
    const rules = document.createElement('script');
    rules.type = 'speculationrules';
    rules.textContent = JSON.stringify({prefetch: [{
      where: {or: paths.map(route => ({href_matches: route === '/' ? '/' : route + '/'}))},
      eagerness: 'moderate'
    }]});
    document.head.append(rules);
  }

  const motion = matchMedia('(prefers-reduced-motion: reduce), (forced-colors: active)');
  if (!motion.matches) {
    import('./scene.mjs').then(({installRouteMark}) => installRouteMark(otherPage, arrived, motion)).catch(() => {});
  }
})();
