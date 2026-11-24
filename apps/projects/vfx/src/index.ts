import { SurfaceRegistry, type SurfaceKind, type SurfaceOptions } from './registry';
import { TouchPulseField } from './touch';
import { installTouchFeedback } from './touch-feedback';

/**
 * Memento VFX for pages without React (LevelUp). The same engine as START V27: one canvas behind the content, one engine,
 * loaded after the content, one touch wave field started on contact even before WebGL is ready. Surfaces are declared
 * in the markup:
 *
 *   data-vfx="title" | "card"          the kind (required)
 *   data-vfx-cut="both|tl|none"        cut corners of a card
 *   data-vfx-gain="0.7"                response strength
 *   data-vfx-panel, data-vfx-solid, data-vfx-own-colour
 *   data-vfx-source=".selector"        energy source inside the surface
 *   data-vfx-transform                 the element has its own CSS transform (3D carousel board)
 *   data-vfx-clip=".carousel"          clipping container (overflow, side fade in --vfx-fade)
 *   data-vfx-focus                     follows --slide-focus
 *   data-vfx-compare=".before"         before layer of a comparison (split by its range input)
 *   data-vfx-photo=".selector"         which <img> is the photograph
 *   data-vfx-colour                    Portfolio: the photograph keeps its colours at rest on every device
 *   data-vfx-dom                       (inside a surface) stays DOM, painted above the canvas
 *
 * Any failure leaves the plain DOM page.
 */
export interface VfxHandle {
  registry: SurfaceRegistry;
  /** Registers every [data-vfx] element under `root` (already registered ones are updated). */
  scan(root?: ParentNode): void;
  /** Content or layout inside surfaces changed (fitted type, new markup): only the surface owning `target` repaints. */
  invalidate(target?: Element | null): void;
  /** Transforms, opacity or focus of transformed surfaces changed (one carousel frame). */
  motion(): void;
  /** One short local pulse of energy at an element. */
  impulse(el: Element | null, strength?: number): void;
  destroy(): void;
}

export function optionsOf(el: HTMLElement): SurfaceOptions | null {
  const d = el.dataset;
  const kind = d.vfx as SurfaceKind;
  if (kind !== 'title' && kind !== 'card') return null;
  const flag = (v?: string) => v !== undefined && v !== 'false';
  const cut = d.vfxCut as SurfaceOptions['cut'];
  return {
    kind,
    cut: cut === 'tl' || cut === 'none' ? cut : undefined,
    gain: d.vfxGain ? Number(d.vfxGain) : undefined,
    panel: flag(d.vfxPanel) || undefined,
    solid: flag(d.vfxSolid) || undefined,
    ownColour: flag(d.vfxOwnColour) || undefined,
    source: d.vfxSource || undefined,
    transform: flag(d.vfxTransform) || undefined,
    clip: d.vfxClip || undefined,
    focus: flag(d.vfxFocus) || undefined,
    compare: d.vfxCompare || undefined,
    photo: d.vfxPhoto || undefined,
    colour: flag(d.vfxColour) || undefined,
  };
}

export function mountVfx({ root = document as ParentNode } = {}): VfxHandle {
  const html = document.documentElement;
  const registry = new SurfaceRegistry();
  // START V24: the canvas lives in a layer as tall as the document and moves with native (compositor) scroll
  const layer = document.createElement('div');
  layer.className = 'vfx-layer';
  layer.setAttribute('aria-hidden', 'true');
  const canvas = document.createElement('canvas');
  canvas.className = 'vfx-canvas';
  layer.append(canvas);
  document.body.prepend(layer);
  const touches = new TouchPulseField();
  const stopTouch = installTouchFeedback(touches);

  const scan = (from: ParentNode = root) => {
    const seen = new Set<HTMLElement>();
    from.querySelectorAll<HTMLElement>('[data-vfx]').forEach(el => {
      const options = optionsOf(el);
      if (!options) return;
      seen.add(el);
      const current = registry.surfaces.get(el);
      if (!current || JSON.stringify(current) !== JSON.stringify(options)) registry.add(el, options);
    });
    // surfaces that left the document
    registry.surfaces.forEach((_o, el) => { if (!el.isConnected || (from === document && !seen.has(el))) registry.remove(el); });
  };
  scan();

  let dispose = () => {};
  let disposed = false;
  // without WebGL2 (or with forced colours, where the system palette owns every colour) the engine is never
  // downloaded: the plain DOM page, at once
  let webgl2 = false;
  // no probe context: one fewer WebGL context on phones; the engine itself falls back to the DOM if it cannot start
  try { webgl2 = !matchMedia('(forced-colors: active)').matches && typeof WebGL2RenderingContext !== 'undefined'; } catch { /* none */ }
  if (!webgl2) { html.classList.remove('vfx-boot', 'vfx-live'); html.classList.add('vfx-off'); disposed = true; }
  else import('./engine').then(({ VfxEngine }) => {
    if (disposed) return;
    const engine = VfxEngine.create(canvas, registry, touches);
    dispose = () => engine?.destroy();
  }).catch(() => { html.classList.remove('vfx-boot', 'vfx-live'); html.classList.add('vfx-off'); });

  return {
    registry,
    scan,
    invalidate: target => registry.invalidate(target),
    motion: () => registry.motion(),
    impulse: (el, strength) => { if (el) registry.impulse(el, strength); },
    destroy: () => { disposed = true; stopTouch(); dispose(); layer.remove(); },
  };
}

/**
 * The START V27 background (Ghost Fibers, see background/mount.ts), downloaded after the content. Not mounted with
 * forced colours; resolves to its cleanup (a no-op when it cannot run).
 */
export function mountBackground(): Promise<() => void> {
  if (matchMedia('(forced-colors: active)').matches || typeof WebGL2RenderingContext === 'undefined') return Promise.resolve(() => {});
  return import('./background/mount').then(({ mountGhostFibers }) => mountGhostFibers(), () => () => {});
}
