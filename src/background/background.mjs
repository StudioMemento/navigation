import { NAV_BACKGROUND } from './preset.mjs';

// The still paints with the HTML. Swap it for the first complete WebGL frame.
export function startBackground(host) {
  if (!host) return () => {};
  const quiet = matchMedia('(forced-colors: active), (prefers-reduced-motion: reduce)');
  let renderer = null, generation = 0, paintFrame = 0;
  async function refresh() {
    const request = ++generation;
    cancelAnimationFrame(paintFrame);
    renderer?.dispose();
    renderer = null;
    host.classList.remove('is-live');
    if (quiet.matches || typeof WebGL2RenderingContext === 'undefined') return;
    try {
      const { mountGhostFibers } = await import('./ghost-fibers.mjs');
      if (request !== generation) return;
      // Give the browser a paint opportunity before compiling decorative shaders.
      paintFrame = requestAnimationFrame(() => {
        paintFrame = requestAnimationFrame(() => {
          if (request !== generation) return;
          try {
            renderer = mountGhostFibers(host, NAV_BACKGROUND);
            if (renderer) host.classList.add('is-live');
          } catch (error) { console.warn('Background disabled:', error); }
        });
      });
    } catch (error) { console.warn('Background unavailable:', error); }
  }
  function showStill() { host.classList.remove('is-live'); }
  host.addEventListener('webglcontextlost', showStill, true);
  host.addEventListener('memento:background-restore', refresh);
  quiet.addEventListener('change', refresh);
  refresh();
  return () => {
    ++generation;
    cancelAnimationFrame(paintFrame);
    host.removeEventListener('webglcontextlost', showStill, true);
    host.removeEventListener('memento:background-restore', refresh);
    quiet.removeEventListener('change', refresh);
    renderer?.dispose();
    showStill();
  };
}
