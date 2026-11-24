export type SurfaceKind = 'title' | 'card';

export interface SurfaceOptions {
  kind: SurfaceKind;
  /** Corners cut on a card: both (default), top-left only, or none. */
  cut?: 'both' | 'tl' | 'none';
  /** Response strength relative to a primary surface (default 1). */
  gain?: number;
  /** Never taken apart by scroll (an embedded map). */
  solid?: boolean;
  /** A large panel: on hover only the type near the pointer turns amber, not all of it. */
  panel?: boolean;
  /** Selector of an element inside the surface that is its energy source: on hover the reaction starts there too. */
  source?: string;
  /**
   * On hover the photograph shows its own colours instead of the amber grade of its luminance: for an image that is
   * already lit in the house palette (the night map). At rest it stays grey like every other photograph.
   */
  ownColour?: boolean;
  /**
   * LevelUp: the element carries its own CSS transform (a 3D carousel board). The engine draws it through the same
   * projective transform as the DOM (perspective, rotation, scale), follows its opacity, visibility and stacking, and
   * maps the pointer back into the board. `motion()` tells the engine that transforms changed.
   */
  transform?: boolean;
  /**
   * LevelUp: selector of an ancestor that clips the surface (overflow) and fades it at its sides (the carousel mask,
   * width in its registered `--vfx-fade`).
   */
  clip?: string;
  /**
   * LevelUp: the surface follows `--slide-focus` (1 on the active board, 0 on the neighbours): type, photograph and
   * frame dim with it as in the DOM. Measured at focus 1.
   */
  focus?: boolean;
  /** LevelUp: selector of the `before` layer of a before/after comparison, split by its range input. */
  compare?: string;
  /** LevelUp: selector of the photograph when the surface holds more than one image (default: the first <img>). */
  photo?: string;
  /**
   * Servizi: selector of the mobile title veil, a blurred copy of the photograph masked from below with a black
   * ::after shade. Drawn by the engine from the photograph's own texture.
   */
  veil?: string;
}

type Reason = 'surfaces' | 'layout' | 'motion' | 'impulse';
type Listener = (reason: Reason, target?: Element, strength?: number) => void;

/**
 * Surface registry: the DOM elements that own a GPU representation.
 * The page fills it (data attributes, see dom.ts); the engine reads it. No WebGL in here.
 */
export class SurfaceRegistry {
  readonly surfaces = new Map<HTMLElement, SurfaceOptions>();
  private listeners = new Set<Listener>();

  add(el: HTMLElement, options: SurfaceOptions) { this.surfaces.set(el, options); this.emit('surfaces'); }
  remove(el: HTMLElement) { if (this.surfaces.delete(el)) this.emit('surfaces'); }
  /**
   * Content or layout inside surfaces changed in a way observers cannot see (fitted type, new markup). Only the surface
   * that owns `target` is measured and painted again; without a target, all of them (START V24).
   */
  invalidate = (target?: Element | null) => this.listeners.forEach(l => l('layout', target ?? undefined));
  /** Transforms, opacity or focus of transformed surfaces changed (a carousel frame): no re-measure. */
  motion = () => this.emit('motion');
  /** One short local impulse at an element (accordion opening, for instance). */
  impulse = (target: Element, strength = 0.8) => this.listeners.forEach(l => l('impulse', target, strength));
  subscribe(listener: Listener) { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; }
  get listenerCount() { return this.listeners.size; }
  private emit(reason: Reason) { this.listeners.forEach(l => l(reason)); }
}
