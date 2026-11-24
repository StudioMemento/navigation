import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { SurfaceRegistry, type SurfaceKind, type SurfaceOptions } from './registry';

const VfxContext = createContext<SurfaceRegistry | null>(null);

/**
 * One canvas behind the content. R19: the engine is the site's (navigation, /memento-ui/effects.mjs), the same one
 * every page uses; this page only registers its surfaces. Loaded after the content; any failure leaves the DOM page.
 */
export function VfxProvider({ children }: { children: ReactNode }) {
  const [registry] = useState(() => new SurfaceRegistry());
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    const shared = '/memento-ui/effects.mjs';
    import(/* @vite-ignore */ shared).then(module => {
      if (!cancelled && canvas.current) dispose = module.bindSurfaceCanvas(canvas.current,registry).destroy;
    }).catch(() => document.documentElement.classList.remove('vfx-boot','vfx-live'));
    return () => { cancelled = true; dispose(); };
  }, [registry]);

  return (
    <VfxContext.Provider value={registry}>
      <div className="vfx-layer" aria-hidden="true"><canvas className="vfx-canvas" ref={canvas} /></div>
      {children}
    </VfxContext.Provider>
  );
}

/**
 * Registers an element as a surface with a GPU representation.
 *   title — large type: glyphs fragment and carry the full cell language
 *   card  — cut-corner panel with its image, labels, icons and dividers
 */
export function useSurface<T extends HTMLElement>(kind: SurfaceKind, options: Omit<SurfaceOptions, 'kind'> = {}) {
  const registry = useContext(VfxContext);
  const current = useRef<T | null>(null);
  const { gain, cut, solid, panel } = options;
  return useCallback((node: T | null) => {
    if (current.current && current.current !== node) registry?.remove(current.current);
    current.current = node;
    if (node) { node.dataset.vfx = kind; registry?.add(node, { kind, gain, cut, solid, panel }); }
  }, [registry, kind, gain, cut, solid, panel]);
}

/** invalidate(): content inside a surface changed. impulse(el): one short local pulse of energy at an element. */
export function useVfxSignals() {
  const registry = useContext(VfxContext);
  const invalidate = useCallback((target?: Element | null) => registry?.invalidate(target), [registry]);
  const impulse = useCallback((el: Element | null, strength?: number) => { if (el) registry?.impulse(el, strength); }, [registry]);
  return { invalidate, impulse };
}
