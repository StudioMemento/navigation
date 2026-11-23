import { SurfaceRegistry, type SurfaceKind, type SurfaceOptions } from './registry';
import { TouchPulseField } from './touch';
import { installTouchFeedback } from './touch-feedback';
import type { EngineOptions, VfxEngine } from './engine';
import { afterFirstPaint, whenIdle } from '../paint.mjs';
import { vfxPolicy } from '../vfx/policy.mjs';

/**
 * Memento VFX for the native pages (Start, Servizi, Portfolio, LevelUp). The same engine as START V27/V28 without its
 * background: one canvas behind the content, one engine, created once the page is idle after its first paint, one touch
 * wave field started on contact even before WebGL is ready. The DOM page is shown first and stays the fallback.
 * R15: the effects are on again on the native pages (`vfxPolicy` decides; `?vfx=off` shows the DOM page). The engine
 * draws only while something changes and sleeps at rest. Surfaces are declared in the markup:
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
 *   data-vfx-veil=".selector"          Servizi: the blurred title veil over the photograph
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
    colour: flag(d.vfxColour) || undefined,
    source: d.vfxSource || undefined,
    transform: flag(d.vfxTransform) || undefined,
    clip: d.vfxClip || undefined,
    focus: flag(d.vfxFocus) || undefined,
    compare: d.vfxCompare || undefined,
    photo: d.vfxPhoto || undefined,
    veil: d.vfxVeil || undefined,
  };
}

export interface MountOptions {
  /** Where the surfaces are declared. */
  root?: ParentNode;
  /** The element the canvas layer is prepended to (the body; Servizi: the detail dialog, in the top layer). */
  parent?: HTMLElement;
  /** Engine options (Servizi): when it is on screen, scroll bands, loading sequence, offset layer. */
  engine?: EngineOptions;
}

// R15: one decision per visit (query, Save-Data, device memory). Off leaves the plain DOM page and its touch feedback.
const policy = vfxPolicy();
const effectsOff = () => !policy.enabled;

function fallback() {
  document.documentElement.classList.remove('vfx-boot','vfx-live');
  document.documentElement.classList.add('vfx-off');
}

/** Binds one renderer to a canvas. React can supply its existing registry and canvas. */
export function bindSurfaceCanvas(canvas: HTMLCanvasElement, registry: SurfaceRegistry, options: EngineOptions = {}) {
  if (effectsOff()) {
    canvas.hidden = true;
    document.documentElement.classList.add('vfx-off');
    return {setDialog(_value: boolean) {}, destroy: installTouchFeedback(new TouchPulseField())};
  }
  const media = matchMedia('(forced-colors: active), (prefers-reduced-motion: reduce)');
  let generation = 0, renderer: VfxEngine | null = null, stopTouch = () => {};
  let dialog = options.offset ?? false;
  function refresh() {
    const current = ++generation;
    stopTouch(); renderer?.destroy(); renderer = null;
    if (media.matches || typeof WebGL2RenderingContext === 'undefined') { fallback(); return; }
    document.documentElement.classList.remove('vfx-off');
    const touches = new TouchPulseField();
    stopTouch = installTouchFeedback(touches);
    // the download starts after the first paint; the engine is created in the first idle period after it
    afterFirstPaint().then(() => current === generation ? Promise.all([import('./engine'), whenIdle()]) : null).then(loaded => {
      if (!loaded) return;
      const [{ VfxEngine }] = loaded;
      if (current !== generation) return;
      // a native page is already on screen: the engine takes over without the loading sequence
      const intro = !document.documentElement.hasAttribute('data-memento-native') && options.intro !== false;
      renderer = VfxEngine.create(canvas, registry, touches, {...options,intro,offset:dialog,bands:!dialog,quality:policy.quality,pinned:policy.pinned});
      if (!renderer) fallback();
    }).catch(() => { if (current === generation) fallback(); });
  }
  refresh();
  media.addEventListener('change',refresh);
  return {
    setDialog(value: boolean) { if (dialog !== value) { dialog = value; renderer?.setDialogSurface(value); } },
    destroy() { ++generation; media.removeEventListener('change',refresh); stopTouch(); renderer?.destroy(); }
  };
}

type Scope = { root: ParentNode; parent: HTMLElement; options?: EngineOptions };
function createPageSurfaces() {
  const domOnly = effectsOff();
  const registry = new SurfaceRegistry();
  const layer = document.createElement('div');
  layer.className = 'vfx-layer'; layer.setAttribute('aria-hidden','true');
  const canvas = document.createElement('canvas');
  canvas.className = 'vfx-canvas'; layer.append(canvas);
  const scopes = new Set<Scope>();
  const listeners = new AbortController();
  let active: Scope | undefined;
  const control = bindSurfaceCanvas(canvas,registry,{
    active: () => active?.options?.active?.() ?? !document.documentElement.hasAttribute('data-memento-modal')
  });
  function scan(scope: Scope, from: ParentNode = scope.root) {
    if (domOnly || scope !== active) return;
    const seen = new Set<HTMLElement>();
    from.querySelectorAll<HTMLElement>('[data-vfx]').forEach(el => {
      if (scope.parent.tagName !== 'DIALOG' && el.closest('dialog')) return;
      const options = optionsOf(el);
      if (!options) return;
      seen.add(el);
      const old = registry.surfaces.get(el);
      if (!old || Object.entries(options).some(([key,value]) => old[key as keyof SurfaceOptions] !== value)) registry.add(el,options);
    });
    for (const el of registry.surfaces.keys()) {
      if (!el.isConnected || (from === scope.root && !seen.has(el))) registry.remove(el);
    }
  }
  function selectScope() {
    const next = Array.from(scopes).find(s => s.parent instanceof HTMLDialogElement && s.parent.open)
      || Array.from(scopes).find(s => !(s.parent instanceof HTMLDialogElement));
    if (next === active) return;
    for (const el of registry.surfaces.keys()) registry.remove(el);
    active = next;
    if (!active) { layer.remove(); return; }
    if (!domOnly) active.parent.prepend(layer);
    control.setDialog(active.parent instanceof HTMLDialogElement);
    scan(active);
    registry.invalidate();
  }
  for(const name of ['toggle','memento:overlay-change','memento:surface-visibility']) {
    document.addEventListener(name,selectScope,{capture:true,signal:listeners.signal});
  }
  document.addEventListener('scroll',e=>{
    if (e.target instanceof Element && e.target.closest('[data-vfx]')) registry.invalidate(e.target);
  },{capture:true,passive:true,signal:listeners.signal});
  const destroy = () => {listeners.abort();control.destroy();layer.remove();scopes.clear();pageSurfaces=undefined;};
  window.addEventListener('pagehide',e=>{if(!e.persisted)destroy();},{signal:listeners.signal});
  return {
    attach(scope: Scope): VfxHandle {
      scopes.add(scope); selectScope();
      return {
        registry, scan: from=>{selectScope();scan(scope,from);},
        invalidate: target=>{if(scope===active)registry.invalidate(target);},
        motion: ()=>{if(scope===active)registry.motion();},
        impulse: (el,strength)=>{if(el && scope===active)registry.impulse(el,strength);},
        destroy: ()=>{scopes.delete(scope);selectScope();if(!scopes.size)destroy();}
      };
    }
  };
}
let pageSurfaces: ReturnType<typeof createPageSurfaces> | undefined;
export function mountVfx({root=document,parent=document.body,engine}: MountOptions = {}) {
  return (pageSurfaces ??= createPageSurfaces()).attach({root,parent,options:engine});
}

// Compatibility with the published section modules that call mountBackground()?.
export async function mountBackground(): Promise<() => void> { return () => {}; }
