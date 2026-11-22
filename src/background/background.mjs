import { NAV_BACKGROUND } from './preset.mjs';

/** Let real content paint before optional GPU work. Navigation never waits for this promise. */
export function afterFirstPaint() {
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

// The still paints with the HTML. Swap it for the first complete WebGL frame.
export function startBackground(host) {
  if (!host) return () => {};
  const quiet = matchMedia('(forced-colors: active), (prefers-reduced-motion: reduce)');
  let renderer = null, generation = 0, idle = 0;
  function cancelIdle() {
    if (idle) window.cancelIdleCallback?.(idle);
    idle = 0;
  }
  async function refresh() {
    const request = ++generation;
    cancelIdle();
    renderer?.dispose();
    renderer = null;
    host.classList.remove('is-live');
    if (quiet.matches || typeof WebGL2RenderingContext === 'undefined') return;
    try {
      const [{ mountGhostFibers }] = await Promise.all([import('./ghost-fibers.mjs'), afterFirstPaint()]);
      if (request !== generation) return;
      const mount = () => {
        idle = 0;
        if (request !== generation) return;
        try {
          renderer = mountGhostFibers(host, NAV_BACKGROUND);
          if (renderer) host.classList.add('is-live');
        } catch (error) { console.warn('Background disabled:', error); }
      };
      if (window.requestIdleCallback) idle = window.requestIdleCallback(mount, {timeout: 650});
      else mount();
    } catch (error) { console.warn('Background unavailable:', error); }
  }
  function showStill() { host.classList.remove('is-live'); }
  host.addEventListener('webglcontextlost', showStill, true);
  host.addEventListener('memento:background-restore', refresh);
  quiet.addEventListener('change', refresh);
  refresh();
  return () => {
    ++generation;
    cancelIdle();
    host.removeEventListener('webglcontextlost', showStill, true);
    host.removeEventListener('memento:background-restore', refresh);
    quiet.removeEventListener('change', refresh);
    renderer?.dispose();
    showStill();
  };
}
