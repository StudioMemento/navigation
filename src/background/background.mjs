import { NAV_BACKGROUND } from './preset.mjs';

/**
 * The START's atmospheric background behind the navigation: its own canvas and budget (30 drawings a second, DPR 1,
 * adaptive resolution), mounted a moment after first paint so it never competes with the cards. Decorative only: any
 * failure leaves the black page; a lost context remounts only this layer. Loaded as its own chunk (START: React.lazy).
 */
export function startBackground(host, { delay = 350 } = {}) {
  if (!host || matchMedia('(forced-colors: active)').matches) return () => {};
  let current = null, disposed = false;
  let load = null;
  const mount = async () => {
    if (disposed) return;
    let mountGhostFibers;
    try { ({ mountGhostFibers } = await (load ??= import('./ghost-fibers.mjs'))); }
    catch (error) { console.warn('Background unavailable:', error?.message || error); return; }
    if (disposed) return;
    current?.dispose(); current = null;
    try { current = mountGhostFibers(host, NAV_BACKGROUND); }
    catch (error) { console.warn('Background disabled:', error?.message || error); current = null; }
    if (current) host.classList.add('is-live');
  };
  const restore = () => { void mount(); };
  host.addEventListener('memento:background-restore', restore);
  const timer = setTimeout(() => { void mount(); }, delay);
  return () => { disposed = true; clearTimeout(timer); host.removeEventListener('memento:background-restore', restore); current?.dispose(); current = null; };
}
