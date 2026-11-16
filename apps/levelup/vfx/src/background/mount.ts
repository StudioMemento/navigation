import { createGhostFibers } from './ghost-fibers';
import { START_BACKGROUND } from './preset';

/**
 * The START V27 background on LevelUp: Ghost Fibers with the same preset (five layers, red/amber, no grain), its own
 * budget (30 drawings a second, DPR ≤ 1, adaptive resolution) and its own context, behind the content. It waits
 * 350 ms after the content, as in START, pauses while a demo covers the page and remounts after a context loss.
 */
export function mountGhostFibers(): () => void {
  const root = document.documentElement;
  const host = document.createElement('div');
  host.className = 'memento-background';
  host.setAttribute('aria-hidden', 'true');
  document.body.prepend(host);
  const active = () => root.dataset.demoExpanded !== 'true';
  let cleanup: (() => void) | null = null;
  const mount = () => {
    cleanup?.();
    cleanup = createGhostFibers(host, { ...START_BACKGROUND, dpr: 1 }, { active });
  };
  const restore = () => mount();
  host.addEventListener('memento:background-restore', restore);
  const timer = window.setTimeout(mount, 350);
  return () => {
    clearTimeout(timer);
    host.removeEventListener('memento:background-restore', restore);
    cleanup?.(); cleanup = null;
    host.remove();
  };
}
