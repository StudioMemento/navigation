import { staticArtwork } from '../graphics.mjs';
import {
  BufferAttribute, BufferGeometry, CanvasTexture, DataTexture, DoubleSide, DynamicDrawUsage, GLSL3, HalfFloatType, InstancedBufferGeometry,
  InstancedInterleavedBuffer, InterleavedBufferAttribute, LinearFilter, Mesh, NoColorSpace, PerspectiveCamera,
  NoBlending, RawShaderMaterial, RedFormat, Scene, Sphere, Texture, UnsignedByteType, Vector2, Vector3, Vector4, WebGLRenderer, WebGLRenderTarget, type IUniform,
} from 'three';
import { BorderLight, outline } from './border';
import { ChainField } from './chain';
import { VFX, gradientRange, hexToRgb, pixelRatio, titleRamp, type ChainProfile, type QualityName } from './config';
import { startingQuality } from '../vfx/policy.mjs';
import { buildNetwork, hashString, type SurfaceNetwork } from './geometry';
import { PointerField } from './input';
import { TouchPulseField, TouchReaction, type SurfaceRect } from './touch';
import { GPU_STRIDE, Particles } from './particles';
import { collect, distanceField, imageFit, paint } from './raster';
import { gradientLine, inverseHomography, lineLength, parseAlphaGradient, parseAlphaGradients, parseTransform, placement, project, unproject, type AlphaGradient } from './projective';
import { RESIDENCY, blurLod, blurOf, brightnessOf, pickSource, viewportGap } from './servizi';
import type { SurfaceOptions, SurfaceRegistry } from './registry';
import { ScrollState } from './scroll';
import {
  BLUR_FRAG, FS_VERT, GRADE_FRAG, OVERLAY_CARD_FRAG, OVERLAY_TITLE_FRAG, OVERLAY_VERT,
  PART_FRAG, PART_VERT, SURFACE_FRAG, SURFACE_VERT,
} from './shaders';
import { loadingDelay, smoothstep } from './structure';

type Uniforms = Record<string, IUniform>;

interface Surface {
  el: HTMLElement;
  opt: SurfaceOptions;
  index: number;
  u: Uniforms;
  content: Mesh<BufferGeometry, RawShaderMaterial>;
  overlay: Mesh<BufferGeometry, RawShaderMaterial>;
  x: number; y: number; w: number; h: number;        // document px
  cellKey: string; netKey: string;
  net: SurfaceNetwork | null; chain: ChainField | null; touch: TouchReaction | null; energy: BufferAttribute | null;
  border: BorderLight | null; edgeCells: { cell: number; s: number; w: number }[];
  born: Uint8Array | null; delays: Float32Array | null;
  ink: CanvasTexture | null;
  sourceDebt: number;
  dist: DataTexture | null;
  img: Texture | null; imgSrc: string;
  alpha: { alpha: Uint8Array; aw: number; ah: number; ascale: number } | null;
  fontSize: number;
  /** Rest veil of a card (CSS --vfx-veil, the DOM's ::after) and how far hover or focus has lifted it (0..1). */
  veilRest: number; lift: number;
  /* LevelUp: boards with their own CSS transform (local px → document px), their opacity, stacking and focus */
  xf: Float32Array | null; inv: Float64Array | null; origin: [number, number];
  opacity: number; z: number; group: number; shown: boolean;
  /* LevelUp: the clipping container (document px) and its side fade */
  clipEl: HTMLElement | null; clipDoc: [number, number, number, number]; clipFade: number;
  /* LevelUp: photographs measured once, textures created when they arrive; the comparison's range */
  photoEl: HTMLImageElement | null; photo2El: HTMLImageElement | null; img2: Texture | null; img2Src: string;
  photoFit: { objectFit: string; objectPosition: string }; photoBox: [number, number, number, number];
  range: HTMLInputElement | null; rangeBox: [number, number]; imgDirty: boolean; photoVersion: number;
  /* Servizi: the photograph's own opacity (ancestors, brightness), the mobile title veil and the tile's frame mask */
  photoOpacity: number; veilEl: HTMLElement | null; veilImg: HTMLImageElement | null; veilBox: [number, number, number, number];
  veilFit: { objectFit: string; objectPosition: string }; veilBlur: number; frameMask: boolean;
  hover: number; near: number; inside: boolean; debt: number; budget: number; hot: boolean;
  version: number;
  ready: boolean;
  /** START V24: measured and painted again only when its size or content changed. */
  dirty: boolean;
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Servizi: one engine per layer. The page has one; the detail dialog (browser top layer) has its own. */
export interface EngineOptions {
  /** Whether the engine's surfaces are on screen (the page: no dialog over it; a dialog: open). */
  active?: () => boolean;
  /** Scroll transition bands at the viewport's edges (off inside a dialog, which never scrolls). */
  bands?: boolean;
  /** The loading sequence (cells joining) the first time the engine goes live. */
  intro?: boolean;
  /** The layer is not at the top of the document (inside a fixed dialog): the canvas is offset by its position. */
  offset?: boolean;
  /** R15: the visit's starting profile (`vfxPolicy`), a floor under the device guess unless `pinned`. */
  quality?: QualityName;
  pinned?: boolean;
}
const pageActive = () => { const d = document.documentElement.dataset; return d.demoExpanded !== 'true' && d.overlayOpen !== 'true'; };
/** Six alpha stops, flattened for a vec2[6] uniform (unused stops repeat the last). */
const flatStops = (g: AlphaGradient | null, out: Float32Array) => {
  const n = g ? Math.min(6, g.stops.length) : 0;
  for (let i = 0; i < 6; i++) { const st = g?.stops[Math.min(i, n - 1)]; out[i * 2] = st?.t ?? 0; out[i * 2 + 1] = st?.a ?? 0; }
  return n;
};
const NO_CLIP: [number, number, number, number] = [-1e6, -1e6, 1e6, 1e6];
/**
 * LevelUp: the pixels of an <img> as uploaded to the GPU. With a srcset (w descriptors) an <img> reports a
 * density-corrected naturalWidth, not the size of its bitmap; a plain image of its current source reports the real one.
 */
const bitmaps = new Map<string, Promise<HTMLImageElement | null>>();
function bitmapOf(src: string) {
  let p = bitmaps.get(src);
  if (!p) {
    p = new Promise(resolve => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => image.decode().then(() => resolve(image), () => resolve(image));
      image.onerror = () => resolve(null);
      image.src = src;
    });
    bitmaps.set(src, p);
  }
  return p;
}
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const root = () => document.documentElement;
/** Positions are resolved in the shaders: a fixed sphere keeps three from deriving bounds it cannot use. */
const unbounded = <T extends BufferGeometry>(g: T) => { g.boundingSphere = new Sphere(new Vector3(), 1e6); return g; };
const BARY = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const barycentric = (triangles: number) => {
  const a = new Float32Array(triangles * 9);
  for (let i = 0; i < a.length; i++) a[i] = BARY[i % 9];
  return a;
};

/**
 * VFX engine: one surface WebGL context, one requestAnimationFrame update loop (START V27).
 *
 * One material, one energy. The surface canvas is composited above the independently budgeted Ghost Fibers background.
 * Every surface of the page
 * (titles, cards with their photographs and labels) has a monochrome representation for structure and an overlay for
 * energy. Energy is the same thing everywhere: amber light carried by a chain reaction across a network of cells,
 * started by pointer, touch, focus and loading, ending on its own. Scroll moves the structure, never the light.
 *
 * The DOM stays the source of truth for layout, semantics and input. While the GPU representation is live
 * (`html.vfx-live`) the DOM paint of registered surfaces is switched off, so nothing is drawn twice.
 *
 * R15 (no background): a frame is drawn only when something changed — energy, hover, scroll, layout, a photograph or a
 * glyph texture arriving. One second after the last change the loop stops and the canvas keeps its last frame; `wake()`
 * restarts it from any input, scroll, resize or content change. A held hover (slow breathing, still-cursor pulses) is
 * drawn at `VFX.runtime.calmFps`.
 */
export class VfxEngine {
  static create(canvas: HTMLCanvasElement, registry: SurfaceRegistry, touches = new TouchPulseField(), options: EngineOptions = {}): VfxEngine | null {
    if (root().hasAttribute('data-mm-software')) return null;
    try {
      return new VfxEngine(canvas, registry, touches, options);
    } catch (error) {
      console.warn('Memento VFX disabled:', error);
      root().classList.remove('vfx-boot', 'vfx-live');
      root().classList.add('vfx-off');
      return null;
    }
  }

  private renderer: WebGLRenderer;
  private scene = new Scene();
  private post = new Scene();
  private camera = new PerspectiveCamera(52, 1, 0.02, 400);
  private globals: Uniforms;
  private lastScroll = 0;
  private still = 0;
  private parts = new Particles();
  private partGeo = new InstancedBufferGeometry();
  private partBuf: InstancedInterleavedBuffer;
  private partMesh: Mesh;
  /** The frame in high precision (multisampled): everything is drawn here, then graded once to the screen. */
  private rtMain: WebGLRenderTarget;
  private rtE: WebGLRenderTarget; private rtA: WebGLRenderTarget; private rtB: WebGLRenderTarget;
  /** The horizontal streak of the bloom, at a quarter of the size. */
  private rtS1: WebGLRenderTarget; private rtS2: WebGLRenderTarget;
  private blur: RawShaderMaterial; private grade: RawShaderMaterial; private fsMesh: Mesh<BufferGeometry, RawShaderMaterial>;

  private surfaces = new Map<HTMLElement, Surface>();
  private byIndex: Surface[] = [];
  private input = new PointerField();
  private scroll: ScrollState;
  private hovered: Surface | null = null;
  private viewH = 1;
  private clock = 0; private frame = 0;
  private load = { value: 0 };
  private loading = false; private loadingElapsed = 0; private loadRate = 1;
  private loaded = false; private lost = false; private destroyed = false;
  /** Servizi: a shader this GPU cannot run, or a context lost twice, leaves the DOM page for good (no flashing loop). */
  private failed = false; private losses = 0;
  private layoutDirty = true; private renderDirty = true; private motionDirty = true;
  /* START V24: the canvas is overscanned by `pad` above and below the viewport and moves with native scroll */
  private viewportDirty = true; private viewW = 0; private pixelRatio = 0;
  private pad = 96; private surfaceObserver: ResizeObserver | null = null;
  private raf = 0; private lastTick = 0;
  /* R15: rest and wake. Seconds without any change, the first frame after a sleep, a held hover, the last carousel frame */
  private restFor = 0; private resumed = false; private calm = false; private lastMotion = 0; private live = false;
  readonly metrics = { layouts: 0, rasterizations: 0, viewportResizes: 0, renders: 0, evictions: 0, sleeps: 0, wakes: 0 };
  private quality: QualityName = 'high'; private pinned = false;
  private slow = 0; private frames = 0;
  private readonly reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private readonly abort = new AbortController();
  private cleanups: (() => void)[] = [];
  private nextIndex = 0;
  private readonly touchOnly = matchMedia('(hover: none), (pointer: coarse), (max-width: 767px)');

  private readonly active: () => boolean;
  private bands: boolean;
  private readonly intro: boolean;
  private offset: boolean;

  private constructor(private canvas: HTMLCanvasElement, private registry: SurfaceRegistry, private touches: TouchPulseField, options: EngineOptions = {}) {
    this.active = options.active ?? pageActive;
    this.bands = options.bands ?? true;
    this.intro = options.intro ?? true;
    this.offset = options.offset ?? false;
    // the frame is drawn into a multisampled target and graded to the canvas: the canvas itself needs no depth or AA
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, premultipliedAlpha: true, depth: false, stencil: false, powerPreference: 'high-performance' });
    if (!renderer.capabilities.isWebGL2) { renderer.dispose(); throw new Error('WebGL2 unavailable'); }
    this.renderer = renderer;
    renderer.debug.onShaderError = () => { console.warn('Memento VFX disabled: a shader does not link on this GPU'); this.fail(); };
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0);
    const gl = renderer.getContext();
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const gpu = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    if (staticArtwork(gpu)) { renderer.dispose(); throw new Error('Software graphics: using the rendered page surfaces'); }
    if (/swiftshader|llvmpipe|software|basic render/i.test(gpu)) this.quality = 'low';
    else if (matchMedia('(pointer: coarse)').matches) this.quality = 'medium';
    // R15: the visit's policy can start lower (2 GB devices); ?vfx=high|medium|low pins a profile (comparing devices)
    this.quality = startingQuality(this.quality, { quality: options.quality, pinned: !!options.pinned }) as QualityName;
    const pin = new URLSearchParams(location.search).get('vfx');
    if (pin && pin in VFX.quality) { this.quality = pin as QualityName; this.pinned = true; }

    const A = VFX.color.amber;
    this.globals = {
      uTime: { value: 0 }, uMotion: { value: this.reduced ? 0 : 1 },
      uPhotoColor: { value: this.touchOnly.matches ? 1 : 0 },
      uAmb: { value: [...hexToRgb(A.deep), ...hexToRgb(A.mid), ...hexToRgb(A.hot), ...hexToRgb(A.core)] },
      uEmissive: { value: 0 },
      uView: { value: new Vector2(1, 1) }, uCanvas: { value: new Vector2(0, 1) }, uScroll: { value: 0 },
      uBand: { value: 120 }, uBandK: { value: new Vector2(0, 0) }, uLoad: { value: 0 },
      uDrift: { value: new Vector3(0, VFX.scroll.drift, VFX.scroll.fade) },
      uFrag: { value: new Vector4(1, 1, 1, 0) },
    };

    // particles
    const corner = new Float32Array([0, -1, 0.9, 0.62, -0.9, 0.62]);
    this.partGeo.setAttribute('corner', new BufferAttribute(corner, 2));
    this.partGeo.setAttribute('cbary', new BufferAttribute(new Float32Array(BARY), 3));
    this.partBuf = new InstancedInterleavedBuffer(this.parts.gpu, GPU_STRIDE);
    this.partBuf.setUsage(DynamicDrawUsage);
    this.partGeo.setAttribute('aP', new InterleavedBufferAttribute(this.partBuf, 4, 0));
    this.partGeo.setAttribute('aL', new InterleavedBufferAttribute(this.partBuf, 3, 4));
    this.partGeo.instanceCount = 0; unbounded(this.partGeo);
    this.partMesh = new Mesh(this.partGeo, this.material(PART_VERT, PART_FRAG, {}));
    this.partMesh.renderOrder = 1e7; this.partMesh.frustumCulled = false;
    this.scene.add(this.partMesh);

    // high precision wherever light is accumulated or blurred: no banding in the blacks, no seams where passes meet
    const ext = renderer.extensions;
    const type = ext.has('EXT_color_buffer_float') || ext.has('EXT_color_buffer_half_float') ? HalfFloatType : UnsignedByteType;
    const rt = (depth: boolean, samples = 0) => new WebGLRenderTarget(4, 4, { depthBuffer: depth, minFilter: LinearFilter, magFilter: LinearFilter, type, samples });
    this.rtMain = rt(false, this.quality === 'high' ? 2 : 0);
    // selective bloom: only the emission pass is blurred and added back
    this.rtE = rt(false); this.rtA = rt(false); this.rtB = rt(false);
    this.rtS1 = rt(false); this.rtS2 = rt(false);
    const fs = unbounded(new BufferGeometry());
    fs.setAttribute('position', new BufferAttribute(new Float32Array([-1, -1, 3, -1, -1, 3]), 2));
    const raw = (frag: string, uniforms: Uniforms) => new RawShaderMaterial({ glslVersion: GLSL3, vertexShader: FS_VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
    this.blur = raw(BLUR_FRAG, { uTex: { value: null }, uStep: { value: new Vector2() } });
    this.grade = raw(GRADE_FRAG, {
      uScene: { value: this.rtMain.texture }, uBloom: { value: this.rtB.texture }, uStreak: { value: this.rtS1.texture },
      uRes: { value: new Vector2(1, 1) }, uMix: { value: new Vector4() }, uLens: { value: new Vector2() }, uFrame: { value: 0 },
    });
    this.grade.blending = NoBlending;
    this.fsMesh = new Mesh(fs, this.blur);
    this.fsMesh.frustumCulled = false;
    this.post.add(this.fsMesh);

    root().classList.add('vfx-ready');
    // native scroll moves the overscanned canvas with the page; the frame is drawn again where the page now is
    this.scroll = new ScrollState(() => { this.renderDirty = true; this.wake(); });
    this.listen();
    // ?vfxdebug exposes the engine for inspection (also in development builds)
    // Servizi: __vfx is the page's engine, __vfxEngines every engine (the dialog's comes second)
    if (import.meta.env.DEV || new URLSearchParams(location.search).has('vfxdebug')) {
      const w = window as unknown as { __vfx?: VfxEngine; __vfxEngines?: VfxEngine[]; __VFX?: typeof VFX };
      w.__vfx ??= this; (w.__vfxEngines ??= []).push(this); w.__VFX = VFX;
    }
    this.raf = requestAnimationFrame(this.animate);
    void this.start();
  }

  private material(vertexShader: string, fragmentShader: string, own: Uniforms) {
    return new RawShaderMaterial({
      glslVersion: GLSL3, vertexShader, fragmentShader, uniforms: { ...this.globals, ...own },
      transparent: true, premultipliedAlpha: true, depthTest: false, depthWrite: false, side: DoubleSide,
    });
  }

  setDialogSurface(dialog: boolean) {
    this.bands = !dialog;
    this.offset = dialog;
    this.layoutDirty = this.renderDirty = true;
    this.registry.invalidate();
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    this.loading = false;
    this.abort.abort();
    this.cleanups.forEach(f => f());
    this.scroll.destroy();
    this.surfaces.forEach(s => this.dropSurface(s));
    this.surfaces.clear();
    this.partGeo.dispose(); (this.partMesh.material as RawShaderMaterial).dispose();
    this.fsMesh.geometry.dispose(); this.blur.dispose(); this.grade.dispose();
    [this.rtMain, this.rtE, this.rtA, this.rtB, this.rtS1, this.rtS2].forEach(t => t.dispose());
    this.renderer.dispose();
    root().classList.remove('vfx-live', 'vfx-boot', 'vfx-ready');
  }

  /* ------------------------------------------------------------------ lifecycle */

  /** GPU representation goes live only when fonts, measures and the first textures are ready. */
  private async start() {
    const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
    await Promise.race([document.fonts.ready, wait(1500)]);
    if (this.destroyed) return;
    this.layout();
    const first = [...this.surfaces.values()].filter(s => s.y < scrollY + this.viewH * 1.2 && s.y + s.h > scrollY - 100);
    const images = first.map(s => s.el.querySelector<HTMLImageElement>('img.is-active, img')).filter((i): i is HTMLImageElement => !!i && !i.complete);
    await Promise.race([Promise.all([...images.map(i => i.decode().catch(() => {})), this.whenPainted(first)]), wait(1400)]);
    if (this.destroyed) return;
    this.layout();
    await Promise.race([this.whenPainted(first), wait(400)]);
    // R15: the shader programs are compiled before the takeover, in parallel where the GPU allows it
    // (KHR_parallel_shader_compile): the first frame does not freeze the page while it compiles
    await Promise.race([this.precompile(), wait(1500)]);
    // a page opened in the background goes live when it is shown (no frame is drawn while it is hidden)
    if (document.hidden) await new Promise(resolve => document.addEventListener('visibilitychange', resolve, { once: true, signal: this.abort.signal }));
    if (this.destroyed || this.lost || document.hidden) return;
    this.goLive();
    if (this.reduced || !this.intro) { this.load.value = 1; this.loaded = true; return; }
    // Cellule > Unione > Assestamento > Presente. Any interaction shortens it; nothing is queued behind it.
    this.loading = true;
    const hurry = () => { this.loadRate = VFX.loading.hurry; };
    for (const type of ['pointerdown', 'wheel', 'keydown', 'touchstart'] as const) addEventListener(type, hurry, { once: true, passive: true, signal: this.abort.signal });
  }

  private async precompile() {
    try {
      // without the extension the same programs are compiled at once, still before the takeover (the page is DOM)
      const r = this.renderer, parallel = r.extensions.has('KHR_parallel_shader_compile');
      const compile = async (scene: Scene) => { if (parallel) await r.compileAsync(scene, this.camera); else r.compile(scene, this.camera); };
      await compile(this.scene);
      for (const m of [this.blur, this.grade]) { this.fsMesh.material = m; await compile(this.post); }
    } catch { /* a shader this GPU cannot link is reported by the first frame (onShaderError) */ }
  }

  private whenPainted(list: Surface[]) {
    return new Promise<void>(resolve => {
      const check = () => (this.destroyed || list.every(s => s.ready) ? resolve() : setTimeout(check, 30));
      check();
    });
  }

  /** The DOM page from now on: the engine stops at its next frame and releases the GPU. */
  private fail() {
    if (this.failed) return;
    this.failed = true;
    this.goDom();
    root().classList.add('vfx-off');
  }

  /**
   * R15: restarts a sleeping loop (input, scroll, resize, content). The first frame after a sleep runs at once; it draws
   * only if something changed, and the loop goes back to sleep after `VFX.runtime.idle` seconds without changes.
   */
  wake = () => {
    if (this.destroyed || this.failed || this.raf) return;
    this.metrics.wakes++;
    this.lastTick = 0;
    this.raf = requestAnimationFrame(this.animate);
  };
  /** Something arrived outside the loop (a painted glyph texture, a photograph): draw it on the next frame. */
  private redraw() { this.renderDirty = true; this.wake(); }

  private publishFrame = false;
  private goLive() { if (!this.failed) { this.publishFrame = true; this.live = true; this.redraw(); } }
  /** Any failure returns the page to its plain DOM rendering at once (and nothing is drawn behind it meanwhile). */
  private goDom() { this.publishFrame = false; this.live = false; root().classList.remove('vfx-live', 'vfx-boot'); }

  private listen() {
    const signal = this.abort.signal, passive = { passive: true, signal } as const;
    const input = this.input;
    const trackMouse = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') input.move(e.clientX, e.clientY, false);
      else input.leave(); // A held finger must not feed the slow, continuous hover chain.
      this.wake();
    };
    addEventListener('pointermove', trackMouse, passive);
    // START V27: one viewport wave is started on contact (touch-feedback.ts, a capture listener that runs first), even
    // before WebGL is ready; this listener wakes the loop that reads it
    addEventListener('pointerdown', trackMouse, passive);
    // Native scrolling sends pointercancel: leave the pointer but let that wave finish.
    addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') input.leave(); this.wake(); }, passive);
    addEventListener('pointercancel', () => { input.cancel(); this.wake(); }, passive);
    addEventListener('blur', () => { input.leave(); this.wake(); }, passive);
    root().addEventListener('mouseleave', () => { input.leave(); this.wake(); }, passive);
    document.addEventListener('pointerover', e => { if ((e.target as Element)?.tagName === 'IFRAME') { input.leave(); this.wake(); } }, passive);
    // keyboard: a short accent where focus lands; the neutral focus ring is the DOM's own
    document.addEventListener('focusin', e => {
      const el = e.target as Element;
      if (!el.matches?.(':focus-visible')) return;
      const r = el.getBoundingClientRect();
      this.pulseAt(r.left + r.width / 2, r.top + r.height / 2 + scrollY, 0.7, 3);
      this.wake();
    }, passive);
    // START V24: a height-only change (mobile toolbars) resizes the overscanned canvas, nothing is painted again
    const resized = () => { this.viewportDirty = true; if (root().clientWidth !== this.viewW) this.layoutDirty = true; this.wake(); };
    addEventListener('resize', resized, passive);
    const shown = () => { this.lastTick = 0; this.redraw(); };
    document.addEventListener('visibilitychange', shown, passive);
    document.addEventListener('memento:overlay-change', shown, passive);
    document.addEventListener('memento:surface-visibility', shown, passive);
    addEventListener('pageshow', shown, passive);
    addEventListener('beforeprint', () => this.goDom(), passive);
    addEventListener('afterprint', () => { if (this.loaded && !this.lost) this.goLive(); }, passive);
    const forced = matchMedia('(forced-colors: active)');
    forced.addEventListener('change', () => { if (forced.matches) this.goDom(); else if (this.loaded && !this.lost) this.goLive(); }, { signal });
    this.touchOnly.addEventListener('change', () => {
      this.globals.uPhotoColor.value = this.touchOnly.matches ? 1 : 0;
      this.surfaces.forEach(s => { s.dirty = true; }); this.layoutDirty = true; this.redraw();
    }, { signal });
    document.fonts.addEventListener?.('loadingdone', () => { this.surfaces.forEach(s => { s.dirty = true; }); this.layoutDirty = true; this.wake(); }, { signal });
    this.canvas.addEventListener('webglcontextlost', e => {
      e.preventDefault(); this.lost = true; this.goDom();
      if (++this.losses >= 2) this.fail();
    }, { signal });
    this.canvas.addEventListener('webglcontextrestored', () => {
      this.lost = false;
      if (this.failed) return;
      // Servizi: painted pixels are not kept on the CPU; every surface is prepared again near the viewport
      this.surfaces.forEach(s => this.evict(s));
      this.viewportDirty = true; this.layoutDirty = true;
      if (this.loaded) this.goLive();
      this.wake();
    }, { signal });

    // positions are read again when the page moves; a surface is painted again only when its own box changes
    const observer = new ResizeObserver(() => { this.layoutDirty = true; this.wake(); });
    const main = document.querySelector('main');
    if (main) observer.observe(main);
    this.surfaceObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const surface = this.surfaces.get(entry.target as HTMLElement);
        // the border box ignores CSS transforms: a carousel board is compared with its flat measure
        const box = entry.borderBoxSize?.[0], w = box ? box.inlineSize : (entry.target as HTMLElement).offsetWidth, h = box ? box.blockSize : (entry.target as HTMLElement).offsetHeight;
        if (surface && (Math.abs(surface.w - w) > .5 || Math.abs(surface.h - h) > .5)) { surface.dirty = true; this.layoutDirty = true; this.wake(); }
      }
    });
    this.cleanups.push(() => { observer.disconnect(); this.surfaceObserver?.disconnect(); });
    const invalidate = (target?: Element) => {
      const owner = target?.closest<HTMLElement>('[data-vfx]');
      if (owner) { const s = this.surfaces.get(owner); if (s) s.dirty = true; }
      else this.surfaces.forEach(s => { s.dirty = true; });
      this.layoutDirty = true;
    };
    this.cleanups.push(this.registry.subscribe((reason, target, strength) => {
      this.wake();
      // a carousel frame moves boards: their matrices are read again, nothing is re-measured
      if (reason === 'motion') { this.motionDirty = true; this.renderDirty = true; this.lastMotion = performance.now(); return; }
      if (reason === 'surfaces') this.layoutDirty = true;
      else if (reason === 'layout') invalidate(target);
      if (reason === 'impulse' && target && strength) {
        const r = target.getBoundingClientRect();
        this.pulseAt(r.left + r.width * 0.3, r.top + r.height * 0.45 + scrollY, strength, 6, Math.min(r.width, r.height) * 0.3);
      }
    }));
    // lazy images arrive later: only the surface that owns one creates its texture (nothing is re-measured)
    document.addEventListener('load', e => {
      const img = e.target as Element;
      if (img?.tagName !== 'IMG') return;
      for (const s of this.surfaces.values()) if (s.photoEl === img || s.photo2El === img) { s.imgDirty = true; this.redraw(); }
    }, { capture: true, signal });
    // a comparison's range moves its split
    document.addEventListener('input', e => { if ((e.target as Element)?.matches?.('input[type=range]')) this.redraw(); }, passive);
  }

  /** One local impulse (touch, focus, accordion): lights cells under a document point; the chain does the rest. */
  private pulseAt(x: number, y: number, strength: number, count: number, spread = 40) {
    // the front-most surface under the point (carousel boards overlap)
    let best: Surface | null = null, bx = 0, by = 0;
    for (const s of this.surfaces.values()) {
      if (!s.chain || !s.shown) continue;
      const [lx, ly] = this.toLocal(s, x, y);
      if (lx < 0 || lx > s.w || ly < 0 || ly > s.h || !this.inClip(s, x, y)) continue;
      if (!best || s.z > best.z) { best = s; bx = lx; by = ly; }
    }
    if (best) for (let i = 0; i < count; i++) best.chain!.igniteAt(bx, by, spread, strength * rand(0.8, 1));
  }

  /* ------------------------------------------------------------------ LevelUp: placement */

  /** Document px → local px of a surface (through its transform when it has one). */
  private toLocal(s: Surface, x: number, y: number): [number, number] {
    if (s.inv) return unproject(s.inv, x, y);
    if (s.xf) return [-1e6, -1e6];
    return [x - s.x, y - s.y];
  }

  /** Local px of a surface → document px. */
  private toDoc(s: Surface, x: number, y: number): [number, number] {
    return s.xf ? project(s.xf, x, y) : [s.x + x, s.y + y];
  }

  /** Inside the surface's clipping container (document px). */
  private inClip(s: Surface, x: number, y: number) {
    const c = s.clipDoc;
    return x >= c[0] && x <= c[2] && y >= c[1] && y <= c[3];
  }

  /** Viewport placement of a surface for the touch wave: boards through their transform, inside their container. */
  private touchRect(s: Surface): SurfaceRect {
    const ox = scrollX, oy = this.scroll.y;
    const rect: SurfaceRect = { x: s.x - ox, y: s.y - oy, w: s.w, h: s.h };
    if (s.xf) rect.map = (x, y) => { const [dx, dy] = project(s.xf!, x, y); return [dx - ox, dy - oy]; };
    if (s.clipEl) rect.visible = (x, y) => this.inClip(s, x + ox, y + oy);
    return rect;
  }

  /** Reads a board's CSS transform, opacity, visibility, stacking and focus; nothing is measured. */
  private updateMotion(s: Surface) {
    const cs = getComputedStyle(s.el), u = s.u;
    const m = placement(parseTransform(cs.transform), s.origin[0], s.origin[1], s.x, s.y);
    s.xf!.set(m);
    s.inv = inverseHomography(m);
    s.opacity = cs.visibility === 'hidden' ? 0 : parseFloat(cs.opacity) || 0;
    s.z = parseInt(cs.zIndex, 10) || 0;
    s.shown = s.opacity > 0.003 && !!s.inv;
    u.uAlpha.value = s.opacity;
    const order = 100000 + s.group * 1000 + s.z * 2;
    s.content.renderOrder = order; s.overlay.renderOrder = order + 1;
    // START V25 on touch devices photographs show their colour at rest: a board keeps the DOM's own grayscale(focus)
    const gray = /grayscale\(([\d.]+)(%?)\)/.exec(cs.filter);
    u.uPhotoSat.value = gray ? 1 - clamp(parseFloat(gray[1]) / (gray[2] ? 100 : 1), 0, 1) : 1;
    if (s.opt.focus) {
      const f = clamp(parseFloat(cs.getPropertyValue('--slide-focus')) || 0, 0, 1), F = VFX.focus;
      u.uInkA.value = clamp((f - F.ink) / (1 - F.ink), 0, 1);
      u.uFrameA.value = F.frame + (1 - F.frame) * f;
      (u.uImgStyle.value as number[])[0] = s.photoOpacity * (F.photo + (1 - F.photo) * f);
    }
  }

  /**
   * Textures of a surface's photographs, created once they have arrived (box and fit were measured with the layout).
   * The bitmap is a plain image of the <img>'s current source (see bitmapOf); a newer call wins.
   */
  private setPhotos(s: Surface) {
    s.imgDirty = false;
    const u = s.u, [, , bw, bh] = s.photoBox, version = ++s.photoVersion;
    const one = s.photoEl, two = s.photo2El;
    // Servizi: the bitmap is the srcset candidate the GPU needs (the board's drawn size at the canvas' pixel ratio),
    // not necessarily the one the browser chose for a high-density screen
    const ratio = this.renderer.getPixelRatio();
    const src = (img: HTMLImageElement | null) => {
      if (!img || !img.complete || !img.naturalWidth) return '';
      const nw = img.naturalWidth, nh = img.naturalHeight || 1, fit = getComputedStyle(img).objectFit;
      const k = fit === 'cover' ? Math.max(bw / nw, bh / nh) : fit === 'contain' ? Math.min(bw / nw, bh / nh) : bw / nw;
      return pickSource(img.srcset || '', img.currentSrc || img.src, nw * k * ratio);
    };
    const a = src(one), b = src(two);
    if (!a) { u.uHasImg.value = u.uHasImg2.value = 0; return; }
    void Promise.all([bitmapOf(a), b ? bitmapOf(b) : null]).then(([ia, ib]) => {
      if (version !== s.photoVersion || this.destroyed || s.version < 0) return;
      const texture = (image: HTMLImageElement, url: string, old: Texture | null, oldSrc: string): [Texture, string] => {
        if (old && url === oldSrc) return [old, oldSrc];
        old?.dispose();
        const t = new Texture(image);
        t.colorSpace = NoColorSpace; t.flipY = false; t.generateMipmaps = true; t.needsUpdate = true;
        return [t, url];
      };
      if (!ia) { u.uHasImg.value = u.uHasImg2.value = 0; return; }
      [s.img, s.imgSrc] = texture(ia, a, s.img, s.imgSrc);
      (u.uImgFit.value as Vector4).set(...imageFit(ia, s.photoFit as CSSStyleDeclaration, bw, bh));
      u.uImg.value = s.img; u.uHasImg.value = 1;
      if (ib) { [s.img2, s.img2Src] = texture(ib, b, s.img2, s.img2Src); u.uImg2.value = s.img2; u.uHasImg2.value = 1; }
      else u.uHasImg2.value = 0;
      // Servizi: the veil samples the same texture, fitted to its own box, at the mip level of its CSS blur
      if (s.veilImg) {
        const [, , vw, vh] = s.veilBox, fit = imageFit(ia, s.veilFit as CSSStyleDeclaration, vw, vh);
        (u.uVeilFit.value as Vector4).set(...fit);
        const nw = ia.naturalWidth || 1, nh = ia.naturalHeight || 1;
        const lod = blurLod(s.veilBlur, vw / fit[2] / nw);
        const vp = u.uVeilP.value as Vector4;
        vp.x = lod;
        (u.uVeilTexel.value as Vector2).set((0.5 * 2 ** lod) / nw, (0.5 * 2 ** lod) / nh);
      }
      this.redraw();
    });
  }

  /* ------------------------------------------------------------------ Servizi: residency */

  /**
   * Measures and paints one surface outside a full layout (it came near the viewport, or its content changed): only
   * its own subtree returns to the DOM's colours while it is read, then the GPU representation takes over again.
   */
  private rasterize(s: Surface) {
    const el = s.el, st = el.style;
    const saved = s.opt.transform ? [st.transform, st.opacity, st.visibility, st.getPropertyValue('--slide-focus')] as const : null;
    if (saved) { st.transform = 'none'; st.opacity = '1'; st.visibility = 'visible'; st.setProperty('--slide-focus', '1'); }
    s.dirty = false;
    this.measureIn(s);
    if (saved) {
      st.transform = saved[0]; st.opacity = saved[1]; st.visibility = saved[2];
      if (saved[3]) st.setProperty('--slide-focus', saved[3]); else st.removeProperty('--slide-focus');
      this.motionDirty = true;
    }
  }

  /** measureSurface with this surface's DOM paint switched back on (the rest of the page stays on the GPU). */
  private measureIn(s: Surface) {
    const ready = s.el.dataset.vfxReady;
    if (ready) delete s.el.dataset.vfxReady;
    // hover and focus styles of the DOM are suspended while it is read ([data-vfx-measuring] in the stylesheet):
    // a surface measured under the pointer keeps its rest colours
    s.el.dataset.vfxMeasuring = '';
    try { this.measureSurface(s); } finally {
      delete s.el.dataset.vfxMeasuring;
      if (ready && s.el.dataset.vfxReady === undefined && s.ready) s.el.dataset.vfxReady = ready;
    }
  }

  /** Far from the viewport a surface gives its GPU memory back; the DOM paints it until it is prepared again. */
  private evict(s: Surface) {
    s.version++; s.photoVersion++;
    if (s.imgSrc) bitmaps.delete(s.imgSrc);
    s.ink?.dispose(); s.dist?.dispose(); s.img?.dispose(); s.img2?.dispose();
    s.ink = s.dist = null; s.img = s.img2 = null; s.imgSrc = s.img2Src = ''; s.alpha = null;
    const u = s.u;
    u.uInk.value = u.uDist.value = u.uImg.value = u.uImg2.value = null;
    u.uHasInk.value = u.uHasImg.value = u.uHasImg2.value = 0;
    s.chain?.quench(); s.touch?.clear();
    s.ready = false; s.dirty = true; s.content.visible = false; s.overlay.visible = false;
    delete s.el.dataset.vfxReady;
    this.metrics.evictions++;
  }

  /**
   * One pass per frame: surfaces beyond `far` viewports release their textures; the nearest surface that needs
   * painting within `near` is prepared (two more while the frame has time and they are already on screen).
   */
  private residency() {
    const vh = this.viewH, y = this.scroll.y, near = RESIDENCY.near * vh, far = RESIDENCY.far * vh;
    const t0 = performance.now();
    let worked = false;
    for (let n = 0; n < 3; n++) {
      let pick: Surface | null = null, best = Infinity;
      for (const s of this.surfaces.values()) {
        if (s.w < 2 || s.h < 2) continue;
        const gap = viewportGap(s.y, s.h, y, vh);
        if (gap > far) { if (n === 0 && (s.ready || s.ink || s.img)) this.evict(s); continue; }
        if (s.dirty && gap <= near && gap < best) { best = gap; pick = s; }
      }
      if (!pick) return worked;
      this.rasterize(pick);
      worked = true;
      if (best > 0 || performance.now() - t0 > 6) return worked;
    }
    return worked;
  }

  /* ------------------------------------------------------------------ layout and surfaces */

  private profile() { return VFX.quality[this.quality]; }

  /**
   * START V24: the canvas covers the viewport plus `pad` above and below and is moved by the compositor with the
   * document (iOS momentum included). Only a width or pixel-ratio change paints the surfaces again.
   */
  private resizeViewport() {
    this.viewportDirty = false;
    const w = root().clientWidth, h = innerHeight, q = this.profile();
    // R15: the profile's DPR, then its pixel budget over the overscanned frame (a 5K monitor no longer draws 15 MP).
    // The budget reads the screen's height, not the window's: mobile toolbars never change the ratio (V24, no repaint)
    const ratio = pixelRatio(devicePixelRatio, w, Math.max(h, screen.height || 0) + 256, q);
    // MSAA ×2 only on the high profile (V24): a profile stepped down also releases the multisampled buffer
    const samples = this.quality === 'high' ? 2 : 0;
    if (this.rtMain.samples !== samples) { this.rtMain.samples = samples; this.rtMain.dispose(); this.renderDirty = true; }
    if (w === this.viewW && h === this.viewH && ratio === this.pixelRatio) return;
    this.metrics.viewportResizes++;
    if (w !== this.viewW || ratio !== this.pixelRatio) {
      this.surfaces.forEach(s => { s.dirty = true; }); this.layoutDirty = true;
    }
    this.viewW = w; this.viewH = h; this.pixelRatio = ratio;
    this.pad = Math.min(128, Math.round(h * .15));
    const renderH = h + this.pad * 2;
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(w, renderH, false);
    this.canvas.style.height = `${renderH}px`;
    const bw = Math.max(2, Math.round(w * VFX.bloom.scale)), bh = Math.max(2, Math.round(renderH * VFX.bloom.scale));
    this.rtE.setSize(bw, bh); this.rtA.setSize(bw, bh); this.rtB.setSize(bw, bh);
    this.rtS1.setSize(Math.max(2, bw >> 1), Math.max(2, bh >> 1)); this.rtS2.setSize(Math.max(2, bw >> 1), Math.max(2, bh >> 1));
    const gl = this.renderer.getContext();
    this.rtMain.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    (this.grade.uniforms.uRes.value as Vector2).set(gl.drawingBufferWidth, gl.drawingBufferHeight);
    this.parts.limit = Math.round(VFX.particles.pool * q.particles);
    this.scroll.measure(h);
    (this.globals.uView.value as Vector2).set(w, h);
    this.globals.uBand.value = this.scroll.bandPx;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderDirty = true;
  }

  private layout() {
    this.resizeViewport();
    this.layoutDirty = false; this.renderDirty = true;
    this.metrics.layouts++;
    this.scroll.measure(this.viewH);

    // LevelUp: boards with their own transform are measured flat, whole and at full focus (their untransformed box);
    // the transform, opacity and focus are applied on the GPU afterwards, frame by frame
    const saved: [HTMLElement, string, string, string, string][] = [];
    this.registry.surfaces.forEach((opt, el) => {
      if (!opt.transform) return;
      const st = el.style;
      saved.push([el, st.transform, st.opacity, st.visibility, st.getPropertyValue('--slide-focus')]);
      st.transform = 'none'; st.opacity = '1'; st.visibility = 'visible'; st.setProperty('--slide-focus', '1');
    });
    const sx = scrollX, sy = scrollY;
    const seen = new Set<HTMLElement>();
    const groups = new Map<Element, number>();
    this.registry.surfaces.forEach((opt, el) => {
      seen.add(el);
      const r = el.getBoundingClientRect();
      let s = this.surfaces.get(el);
      if (!s) { s = this.addSurface(el, opt); this.surfaces.set(el, s); this.surfaceObserver?.observe(el); }
      if (Math.abs(s.w - r.width) > .5 || Math.abs(s.h - r.height) > .5 || JSON.stringify(s.opt) !== JSON.stringify(opt)) s.dirty = true;
      s.opt = opt;
      s.u.uRestColour.value = opt.colour ? 1 : 0;
      s.x = r.left + sx; s.y = r.top + sy; s.w = r.width; s.h = r.height;
      // the clipping container (a carousel): document box and side fade
      s.clipEl = opt.clip ? el.closest<HTMLElement>(opt.clip) : null;
      if (s.clipEl) {
        const c = s.clipEl.getBoundingClientRect();
        s.clipDoc = [c.left + sx, c.top + sy, c.right + sx, c.bottom + sy];
        s.clipFade = parseFloat(getComputedStyle(s.clipEl).getPropertyValue('--vfx-fade')) || 0;
      } else { s.clipDoc = NO_CLIP; s.clipFade = 0; }
      if (opt.transform) {
        const o = getComputedStyle(el).transformOrigin.split(' ').map(parseFloat);
        s.origin = [o[0] || 0, o[1] || 0];
        s.xf ??= new Float32Array(16);
        s.u.uXf.value = s.xf; s.u.uHasXf.value = 1;
        const key = s.clipEl ?? el.parentElement ?? el;
        if (!groups.has(key)) groups.set(key, groups.size);
        s.group = groups.get(key)!;
      } else { s.xf = null; s.inv = null; s.u.uHasXf.value = 0; s.shown = true; s.opacity = 1; s.z = 0; }
      if (r.width < 2 || r.height < 2) { s.content.visible = false; return; }
      (s.u.uOrigin.value as Vector2).set(s.x, s.y);
      (s.u.uSize.value as Vector2).set(s.w, s.h);
      // Servizi: only surfaces on screen are painted now (with their own DOM colours, read in place). One that changed
      // off screen gives its textures back and is painted again, nearest first, a few per frame (residency): a
      // rotation or a new catalogue never paints dozens of boards in one frame
      if (s.dirty) {
        if (viewportGap(s.y, s.h, sy, this.viewH) === 0) { s.dirty = false; this.measureIn(s); }
        else if (s.ready || s.ink || s.img) this.evict(s);
      }
    });
    for (const [el, transform, opacity, visibility, focus] of saved) {
      el.style.transform = transform; el.style.opacity = opacity; el.style.visibility = visibility;
      if (focus) el.style.setProperty('--slide-focus', focus); else el.style.removeProperty('--slide-focus');
    }
    this.motionDirty = true;
    this.surfaces.forEach((s, el) => { if (!seen.has(el)) { this.dropSurface(s); this.surfaces.delete(el); } });
    this.byIndex = [];
    this.surfaces.forEach(s => { this.byIndex[s.index] = s; });
  }

  private addSurface(el: HTMLElement, opt: SurfaceOptions): Surface {
    const title = opt.kind === 'title';
    const u: Uniforms = {
      uOrigin: { value: new Vector2() }, uSize: { value: new Vector2(1, 1) }, uPush: { value: 30 },
      uPanel: { value: title ? 0 : 1 }, uCut: { value: new Vector2() }, uPanelCol: { value: new Vector4(...VFX.color.panel) },
      uInk: { value: null }, uHasInk: { value: 0 }, uInkMap: { value: new Vector4(0, 0, 1, 1) }, uVeil: { value: 0 },
      uImg: { value: null }, uHasImg: { value: 0 }, uImgBox: { value: new Vector4(0, 0, 1, 1) }, uImgFit: { value: new Vector4(0, 0, 1, 1) }, uImgStyle: { value: [1, 0, 0] },
      uHover: { value: 0 }, uTouch: { value: 0 }, uGain: { value: 1 }, uBins: { value: new Float32Array(VFX.border.bins) },
      uGray: { value: new Vector2(...gradientRange()) }, uMicro: { value: 12 },
      uDist: { value: null }, uRange: { value: 24 }, uEm: { value: 16 },
      uTitle: { value: titleRamp() }, uHot: { value: VFX.color.titleHot.flatMap(hexToRgb) },
      uSolid: { value: opt.solid ? 1 : 0 }, uTopo: { value: 1 }, uPointer: { value: new Vector3(-1e4, -1e4, opt.panel ? 0 : 1) },
      uOwn: { value: opt.ownColour ? 1 : 0 }, uNear: { value: 0 }, uWake: { value: new Vector4(...VFX.chain.card.wake) }, uInkWarm: { value: new Vector3(...VFX.chain.card.inkWarm) },
      // LevelUp
      uXf: { value: new Float32Array(16) }, uHasXf: { value: 0 }, uAlpha: { value: 1 }, uInkA: { value: 1 }, uFrameA: { value: 1 }, uPhotoSat: { value: 1 }, uRestColour: { value: opt.colour ? 1 : 0 },
      uClipRect: { value: new Vector4(0, 0, -1, 0) }, uClipFade: { value: 0 },
      uImg2: { value: null }, uHasImg2: { value: 0 }, uSplit: { value: 0 }, uSplitFocus: { value: 0 },
      uImgClip: { value: new Vector4(...NO_CLIP) }, uImgMask: { value: new Vector4() }, uMaskStops: { value: new Float32Array(12) },
      uShadeBox: { value: new Vector4() }, uShadeLine: { value: new Vector4() }, uShade: { value: new Float32Array(12) },
      // Servizi
      uMaskBox: { value: new Vector4(0, 0, 1, 1) }, uImgEdge: { value: new Vector4(.05, .05, .06, .06) },
      uImgMask2: { value: new Vector4() }, uMaskStops2: { value: new Float32Array(12) },
      uVeilImg: { value: new Vector4(0, 0, 1, 1) }, uVeilFit: { value: new Vector4(0, 0, 1, 1) }, uVeilP: { value: new Vector4() },
      uVeilTexel: { value: new Vector2() }, uVeilBox: { value: new Vector4(0, 0, 1, 1) },
      uVeilLine: { value: new Vector4() }, uVeilStops: { value: new Float32Array(12) },
      uVeilShadeLine: { value: new Vector4() }, uVeilShade: { value: new Float32Array(12) },
      uFrameLine: { value: new Vector4() }, uFrameStops: { value: new Float32Array(12) }, uFrameRest: { value: new Vector2(1, 0) },
    };
    const index = this.nextIndex++;
    const content = new Mesh(unbounded(new BufferGeometry()), this.material(SURFACE_VERT, SURFACE_FRAG, u));
    content.frustumCulled = false; content.renderOrder = 10 + index * 2; content.visible = false;
    const overlay = new Mesh(unbounded(new BufferGeometry()), this.material(OVERLAY_VERT, title ? OVERLAY_TITLE_FRAG : OVERLAY_CARD_FRAG, u));
    overlay.frustumCulled = false; overlay.renderOrder = 11 + index * 2; overlay.visible = false;
    this.scene.add(content, overlay);
    return { el, opt, index, u, content, overlay, x: 0, y: 0, w: 0, h: 0, cellKey: '', netKey: '',
      net: null, chain: null, touch: null, energy: null, border: title ? null : new BorderLight(), edgeCells: [], born: null, delays: null,
      ink: null, dist: null, sourceDebt: 0, img: null, imgSrc: '', alpha: null, fontSize: 16,
      veilRest: 0, lift: 0,
      xf: null, inv: null, origin: [0, 0], opacity: 1, z: 0, group: 0, shown: true,
      clipEl: null, clipDoc: NO_CLIP, clipFade: 0,
      photoEl: null, photo2El: null, img2: null, img2Src: '', photoFit: { objectFit: 'fill', objectPosition: '50% 50%' }, photoBox: [0, 0, 1, 1],
      range: null, rangeBox: [0, 1], imgDirty: false, photoVersion: 0,
      photoOpacity: 1, veilEl: null, veilImg: null, veilBox: [0, 0, 1, 1], veilFit: { objectFit: 'fill', objectPosition: '50% 50%' }, veilBlur: 0, frameMask: false,
      hover: 0, near: 0, inside: false, debt: 0, budget: 0, hot: false, version: 0, ready: false, dirty: true };
  }

  private dropSurface(s: Surface) {
    this.surfaceObserver?.unobserve(s.el);
    delete s.el.dataset.vfxReady;
    this.scene.remove(s.content, s.overlay);
    s.content.geometry.dispose(); s.content.material.dispose();
    s.overlay.geometry.dispose(); s.overlay.material.dispose();
    s.ink?.dispose(); s.dist?.dispose(); s.img?.dispose(); s.img2?.dispose();
    s.version = -1;
  }

  private measureSurface(s: Surface) {
    this.metrics.rasterizations++;
    const { el, u } = s, q = this.profile();
    const sx = scrollX, sy = scrollY;
    const local = (r: DOMRect): [number, number, number, number] => [r.left + sx - s.x, r.top + sy - s.y, Math.max(1, r.width), Math.max(1, r.height)];
    // photographs: the element's own <img> (or the one its options name), and a comparison's before layer
    const img = (s.opt.photo ? el.querySelector<HTMLImageElement>(s.opt.photo) : null)
      ?? el.querySelector<HTMLImageElement>('img.is-active') ?? el.querySelector<HTMLImageElement>('img');
    const before = s.opt.compare ? el.querySelector<HTMLImageElement>(`${s.opt.compare} img`) : null;
    // Servizi: the mobile title veil is drawn by the engine from the photograph's texture (never as an icon)
    const veil = s.opt.veil ? el.querySelector<HTMLElement>(s.opt.veil) : null;
    const skip = ['[data-vfx-dom]', s.opt.compare, s.opt.veil].filter(Boolean).join(',');
    const found = collect(el, { photos: [img, before].filter((i): i is HTMLImageElement => !!i), skip });
    s.fontSize = found.fontSize || 16;
    const title = s.opt.kind === 'title';
    const id = hashString(el.id || el.className || el.tagName) + s.index;
    const cell = (title ? clamp(s.fontSize * VFX.cells.titleEm, 9, 26) : VFX.cells.card) * q.cellScale;
    u.uPush.value = title ? clamp(s.fontSize * 0.16, 14, 34) : 30;
    u.uTopo.value = clamp(VFX.chain.card.topoArea / Math.max(1, s.w * s.h), 0.3, 1);
    u.uEm.value = s.fontSize;
    u.uRange.value = clamp(s.fontSize * VFX.chain.title.marginEm, 10, 46) * 0.95;
    u.uMicro.value = clamp(s.fontSize * VFX.chain.title.microEm, 6, 18);

    // structural cells: stable, rebuilt only when the surface changes size
    const key = `${Math.round(s.w)}x${Math.round(s.h)}@${cell.toFixed(1)}`;
    if (key !== s.cellKey) {
      s.cellKey = key;
      // an irregular network without margin: the silhouette stays exact, the cells differ in size
      const m = buildNetwork(s.w, s.h, cell, 0, 200, id ^ 0x51ed);
      const centre = new Float32Array(m.faces * 6), seed = new Float32Array(m.faces * 3);
      for (let f = 0; f < m.faces; f++) for (let k = 0; k < 3; k++) {
        centre[(f * 3 + k) * 2] = m.cx[f]; centre[(f * 3 + k) * 2 + 1] = m.cy[f]; seed[f * 3 + k] = m.seed[f];
      }
      const g = unbounded(new BufferGeometry());
      g.setAttribute('position', new BufferAttribute(m.position, 2));
      g.setAttribute('cellCenter', new BufferAttribute(centre, 2));
      g.setAttribute('seed', new BufferAttribute(seed, 1));
      g.setAttribute('bary', new BufferAttribute(barycentric(m.faces), 3));
      s.content.geometry.dispose();
      s.content.geometry = g;
    }
    this.ensureNetwork(s, id);
    (u.uOrigin.value as Vector2).set(s.x, s.y);
    (u.uSize.value as Vector2).set(s.w, s.h);
    s.frameMask = false;
    (u.uFrameLine.value as Vector4).w = 0;
    if (!title) {
      const cs = getComputedStyle(el);
      const cut = s.opt.cut === 'none' ? 0 : parseFloat(cs.getPropertyValue('--cut')) || 16;
      (u.uCut.value as Vector2).set(cut, s.opt.cut === 'tl' ? 0 : cut);
      // the black veil the DOM draws over a card at rest (::after) is drawn here instead, so it leaves with the cells
      s.veilRest = clamp(parseFloat(cs.getPropertyValue('--vfx-veil')) || 0, 0, 1);
      // Servizi: a frame that fades toward the bottom at rest (a catalogue tile) and its opacity at rest
      const fm = parseAlphaGradient(cs.getPropertyValue('--vfx-frame-mask'), a => lineLength(a, s.w, s.h));
      if (fm) {
        const line = gradientLine(fm.angle, s.w, s.h);
        (u.uFrameLine.value as Vector4).set(line[0], line[1], line[2], flatStops(fm, u.uFrameStops.value as Float32Array));
        (u.uFrameRest.value as Vector2).x = clamp(parseFloat(getComputedStyle(el, '::before').opacity) || 1, 0, 1);
        s.frameMask = true;
      }
    }

    // photograph: its box, fit, position, opacity, the container it is clipped to and its own mask, measured now;
    // the texture is created as soon as the image has arrived (setPhotos), without measuring again
    s.photoEl = img; s.photo2El = before;
    if (img) {
      const cs = getComputedStyle(img), r = img.getBoundingClientRect();
      s.photoBox = local(r);
      s.photoFit = { objectFit: cs.objectFit, objectPosition: cs.objectPosition };
      (u.uImgBox.value as Vector4).set(...s.photoBox);
      // Servizi: the opacity of the photograph through its ancestors (not the surface's own: that is uAlpha), with
      // brightness() taken as an opacity on black
      let opacity = 1;
      for (let e: Element | null = img; e && e !== el && el.contains(e); e = e.parentElement) {
        const ec = e === img ? cs : getComputedStyle(e);
        opacity *= (parseFloat(ec.opacity) || 0) * brightnessOf(ec.filter);
      }
      s.photoOpacity = opacity || (img.classList.contains('is-active') ? 1 : 0.9);
      u.uImgStyle.value = [s.photoOpacity, img.closest('.faq-visual') ? 1 : 0, el.querySelector('.card-legibility') ? 1 : 0];
      // no fade where the box meets the surface's own edge (a photograph that bleeds to the frame)
      const [px, py, pw, ph] = s.photoBox, edge = (gap: number, k: number) => (gap <= 1 ? 0 : k);
      (u.uImgEdge.value as Vector4).set(edge(px, .05), edge(s.w - px - pw, .05), edge(py, .06), edge(s.h - py - ph, .06));
      // the nearest container inside the surface that clips the image (overflow), in local px
      let clip = NO_CLIP;
      for (let e = img.parentElement; e && e !== el && el.contains(e); e = e.parentElement) {
        const ec = getComputedStyle(e);
        if (ec.overflowX !== 'visible' || ec.overflowY !== 'visible') {
          const c = e.getBoundingClientRect();
          clip = [c.left + sx - s.x, c.top + sy - s.y, c.right + sx - s.x, c.bottom + sy - s.y];
          break;
        }
      }
      (u.uImgClip.value as Vector4).set(...clip);
      // Servizi: the mask of the photograph, its own or its nearest masked ancestor's, up to two intersected layers;
      // an image mask (a PNG) is described for the engine by an equivalent gradient in --vfx-mask
      let maskEl: Element | null = null, maskValue = '';
      for (let e: Element | null = img; e && e !== el && el.contains(e); e = e.parentElement) {
        const ec = e === img ? cs : getComputedStyle(e);
        const custom = ec.getPropertyValue('--vfx-mask').trim();
        const own = [ec.maskImage, ec.webkitMaskImage].find(v => v && v !== 'none' && v.includes('gradient(')) ?? '';
        if (custom || own) { maskEl = e; maskValue = custom || own; break; }
      }
      const mb = maskEl ? local(maskEl.getBoundingClientRect()) : s.photoBox;
      (u.uMaskBox.value as Vector4).set(...mb);
      const masks = parseAlphaGradients(maskValue, a => lineLength(a, mb[2], mb[3]));
      const setMask = (g: AlphaGradient | undefined, line: Vector4, stops: Float32Array) => {
        if (!g) { line.set(0, 0, 0, 0); return; }
        const l = gradientLine(g.angle, mb[2], mb[3]);
        line.set(l[0], l[1], l[2], flatStops(g, stops));
      };
      setMask(masks[0], u.uImgMask.value as Vector4, u.uMaskStops.value as Float32Array);
      setMask(masks[1], u.uImgMask2.value as Vector4, u.uMaskStops2.value as Float32Array);
      // Servizi: the veil (container box, mask, opacity, ::after shade) and its blurred <img>
      const vimg = veil?.querySelector<HTMLImageElement>('img') ?? null;
      s.veilEl = veil; s.veilImg = vimg;
      const vp = u.uVeilP.value as Vector4;
      vp.set(0, 0, 0, 0);
      if (veil && vimg) {
        const vc = getComputedStyle(veil), vb = local(veil.getBoundingClientRect()), ic = getComputedStyle(vimg);
        let vo = 1;
        for (let e: Element | null = veil; e && e !== el && el.contains(e); e = e.parentElement) vo *= parseFloat(getComputedStyle(e).opacity) || 0;
        (u.uVeilBox.value as Vector4).set(...vb);
        const vm = parseAlphaGradients([vc.maskImage, vc.webkitMaskImage].find(v => v && v !== 'none') ?? '', a => lineLength(a, vb[2], vb[3]))[0];
        const vl = vm ? gradientLine(vm.angle, vb[2], vb[3]) : [0, 0, 0];
        (u.uVeilLine.value as Vector4).set(vl[0], vl[1], vl[2], flatStops(vm ?? null, u.uVeilStops.value as Float32Array));
        const vs = parseAlphaGradient(getComputedStyle(veil, '::after').backgroundImage, a => lineLength(a, vb[2], vb[3]));
        const sl = vs ? gradientLine(vs.angle, vb[2], vb[3]) : [0, 0, 0];
        (u.uVeilShadeLine.value as Vector4).set(sl[0], sl[1], sl[2], flatStops(vs, u.uVeilShade.value as Float32Array));
        s.veilBox = local(vimg.getBoundingClientRect());
        s.veilFit = { objectFit: ic.objectFit, objectPosition: ic.objectPosition };
        s.veilBlur = blurOf(ic.filter);
        (u.uVeilImg.value as Vector4).set(...s.veilBox);
        vp.set(0, vo, vo > 0.004 ? 1 : 0, s.veilBlur);
      }
      this.setPhotos(s);
    } else { u.uHasImg.value = u.uHasImg2.value = 0; (u.uVeilP.value as Vector4).z = 0; }
    // a comparison's range: its track, in local px (the split is read every frame from its value)
    s.range = s.opt.compare ? el.querySelector<HTMLInputElement>('input[type=range]') : null;
    if (s.range) { const r = s.range.getBoundingClientRect(); s.rangeBox = [r.left + sx - s.x, r.width]; }
    // the black shade the DOM lays over the photograph (an ::after with a linear-gradient), in local px
    let shade: AlphaGradient | null = null;
    for (const e of [el, ...el.querySelectorAll('*')]) {
      if (e.closest('[data-vfx-dom]') || (veil && veil.contains(e))) continue;
      const ps = getComputedStyle(e, '::after');
      if (ps.content === 'none' || !ps.backgroundImage.includes('linear-gradient')) continue;
      const r = e.getBoundingClientRect();
      shade = parseAlphaGradient(ps.backgroundImage, a => lineLength(a, r.width, r.height));
      if (!shade) continue;
      const line = gradientLine(shade.angle, r.width, r.height);
      (u.uShadeBox.value as Vector4).set(r.left + sx - s.x, r.top + sy - s.y, r.width, r.height);
      (u.uShadeLine.value as Vector4).set(line[0], line[1], line[2], flatStops(shade, u.uShade.value as Float32Array));
      break;
    }
    if (!shade) (u.uShadeLine.value as Vector4).w = 0;

    // glyphs, icons and dividers: painted at the frame's own pixel ratio, from an origin on the device-pixel grid, and
    // mapped exactly (uInkMap), so every texel lands on a screen pixel and the type keeps the sharpness of the DOM.
    // Servizi: on a card only the area that holds ink is painted (a board's copy sits in its corners)
    const box = found.box, b = !title && found.bounds ? found.bounds : { left: box.left, top: box.top, right: box.right, bottom: box.bottom };
    const left = Math.max(box.left, b.left - 2), top = Math.max(box.top, b.top - 2);
    const right = Math.max(left + 2, Math.min(box.right, b.right + 2)), bottom = Math.max(top + 2, Math.min(box.bottom, b.bottom + 2));
    const area = Math.max(1, (right - left) * (bottom - top));
    const scale = Math.min(this.renderer.getPixelRatio(), Math.sqrt(4e6 / area));
    const ox = Math.floor((left + sx) * scale) / scale - sx, oy = Math.floor((top + sy) * scale) / scale - sy;
    const frame = { x: ox, y: oy, w: Math.max(2, Math.ceil((right - ox) * scale)), h: Math.max(2, Math.ceil((bottom - oy) * scale)) };
    const bx = box.left, by = box.top;
    const version = ++s.version;
    // START V24: painted into a new canvas; the previous texture stays on screen until this one is ready
    const painted = document.createElement('canvas');
    void paint(painted, found, scale, frame, title ? undefined : VFX.color.cardInk, title).then(alpha => {
      if (s.version !== version || this.destroyed) { painted.width = painted.height = 0; return; }
      s.ink?.dispose();
      const t = new CanvasTexture(painted);
      t.colorSpace = NoColorSpace; t.premultiplyAlpha = true; t.flipY = false; t.generateMipmaps = false; t.minFilter = LinearFilter; t.magFilter = LinearFilter;
      this.renderer.initTexture(t);
      s.ink = t; s.alpha = title ? alpha : null;
      u.uInk.value = t; u.uHasInk.value = 1;
      (u.uInkMap.value as Vector4).set(bx - ox, by - oy, scale / frame.w, scale / frame.h);
      if (title) {
        // the glow of large type follows each letter: a signed distance field of the painted glyphs (mapped like the ink)
        const f = distanceField(painted, frame.w / scale, frame.h / scale, u.uRange.value as number);
        s.dist?.dispose();
        const d = new DataTexture(f.data, f.w, f.h, RedFormat, UnsignedByteType);
        d.minFilter = LinearFilter; d.magFilter = LinearFilter; d.flipY = false; d.generateMipmaps = false; d.needsUpdate = true;
        s.dist = d; u.uDist.value = d;
        this.weightByInk(s);
      }
      // Servizi: the pixels live on the GPU only; a lost context or a return from far away paints them again
      painted.width = painted.height = 0;
      s.content.visible = true; s.ready = true; s.el.dataset.vfxReady = 'true';
      this.redraw();
    }).catch(() => { s.ready = true; this.wake(); });
  }

  /** Energy cells: an irregular network over the surface and a margin, with its chain reaction. */
  private ensureNetwork(s: Surface, id: number) {
    const title = s.opt.kind === 'title', C = VFX.chain;
    const spacing = title ? clamp(s.fontSize * C.title.spacingEm, 14, 52) : C.card.spacing;
    const margin = title ? clamp(s.fontSize * C.title.marginEm, 10, 46) : C.card.margin;
    const zone = title ? s.fontSize * C.title.zoneEm : C.card.zone;
    const key = `${Math.round(s.w)}x${Math.round(s.h)}@${spacing.toFixed(1)}`;
    if (key === s.netKey) return;
    s.netKey = key;
    const net = buildNetwork(s.w, s.h, spacing, margin, zone, id, title ? undefined : { spacing: C.card.edgeSpacing, reach: C.card.edgeReach });
    for (let f = 0; f < net.faces; f++) if (!net.weight[f]) net.cond[f] = 0;   // the reaction stays on the surface
    const g = unbounded(new BufferGeometry());
    g.setAttribute('position', new BufferAttribute(net.position, 2));
    g.setAttribute('bary', new BufferAttribute(barycentric(net.faces), 3));
    g.setAttribute('cell', new BufferAttribute(net.cell, 4));
    const centre = new Float32Array(net.faces * 6);
    for (let f = 0; f < net.faces; f++) for (let k = 0; k < 3; k++) { centre[(f * 3 + k) * 2] = net.cx[f]; centre[(f * 3 + k) * 2 + 1] = net.cy[f]; }
    g.setAttribute('centre', new BufferAttribute(centre, 2));
    const energy = new BufferAttribute(new Float32Array(net.faces * 6), 2);
    energy.setUsage(DynamicDrawUsage);
    g.setAttribute('energy', energy);
    s.overlay.geometry.dispose();
    s.overlay.geometry = g;
    const profile: ChainProfile = title ? C.title : C.card;
    const chain = new ChainField(net, profile);
    chain.onIgnite = (cell, strength) => this.emitFrom(s, cell, strength);
    s.net = net; s.chain = chain; s.touch = new TouchReaction(net); s.energy = energy;
    s.touch.chain.onIgnite = (cell, strength) => this.emitFrom(s, cell, strength, true);
    s.delays = new Float32Array(net.faces); s.born = new Uint8Array(net.faces);
    for (let f = 0; f < net.faces; f++) s.delays[f] = loadingDelay(s.x + net.cx[f], s.y + net.cy[f], net.seed[f]);
    // cells near the outline feed its light
    s.edgeCells = [];
    if (!title) for (let f = 0; f < net.faces; f++) {
      if (!net.weight[f]) continue;
      const [o, d] = outline(net.cx[f], net.cy[f], s.w, s.h);
      if (d < VFX.border.reach) s.edgeCells.push({ cell: f, s: o, w: 1 - d / VFX.border.reach });
    }
    if (title && s.alpha) this.weightByInk(s);
  }

  /** On type the reaction follows the letters: ink-covered cells conduct and take ignitions, gaps carry it weakly. */
  /**
   * Type: the range lights the cells it reaches along the phrase (wide across the line, short in height), each cell
   * with its own reach and eased in and out in time. The edge of the range is made of cells, so it reads as matter
   * waking up, never as a disc that follows the pointer.
   */
  private driveRange(s: Surface, inside: boolean, lx: number, ly: number, R: number, dt: number) {
    const ch = s.chain!, net = s.net!, D = ch.drive, T = VFX.type;
    if (!inside && ch.driveLevel < 0.003) { if (ch.driveLevel) { D.fill(0); ch.driveLevel = 0; } return; }
    const rx = Math.max(R * T.range[0], s.fontSize * T.range[1]), ry = Math.max(R * T.range[2], s.fontSize * T.range[3]);
    const up = 1 - Math.exp(-dt / T.rise), down = 1 - Math.exp(-dt / T.fall);
    let lvl = 0;
    for (let f = 0; f < net.faces; f++) {
      let t = 0;
      if (inside && net.weight[f] > 0.05) {
        const dx = (net.cx[f] - lx) / rx, dy = (net.cy[f] - ly) / ry;
        const d = Math.sqrt(dx * dx + dy * dy) / (0.7 + 0.6 * net.seed[f]);
        t = 1 - smoothstep(0.2, 1, d);
      }
      let v = D[f] + (t - D[f]) * (t > D[f] ? up : down);
      if (v < 0.002) v = 0;
      D[f] = v; if (v > lvl) lvl = v;
    }
    ch.driveLevel = lvl;
  }

  private weightByInk(s: Surface) {
    const net = s.net, m = s.alpha;
    if (!net || !m) return;
    const at = (x: number, y: number) => {
      const i = Math.floor(x * m.ascale), j = Math.floor(y * m.ascale);
      return i >= 0 && j >= 0 && i < m.aw && j < m.ah ? m.alpha[j * m.aw + i] / 255 : 0;
    };
    for (let f = 0; f < net.faces; f++) {
      if (net.cx[f] < 0 || net.cy[f] < 0 || net.cx[f] > s.w || net.cy[f] > s.h) continue;
      // strokes are thin: a cell counts as ink if its centre or any corner touches a glyph
      let ink = at(net.cx[f], net.cy[f]);
      for (let k = 0; k < 3; k++) {
        const o = (f * 3 + k) * 2;
        ink = Math.max(ink, at((net.position[o] + net.cx[f]) / 2, (net.position[o + 1] + net.cy[f]) / 2) * 0.85);
      }
      net.weight[f] = 0.04 + 0.96 * ink;
      net.cond[f] = (0.4 + 0.6 * net.zone[f]) * (0.35 + 0.65 * ink);
    }
  }

  /* ------------------------------------------------------------------ emissions */

  /** A few triangles leave lit cells on movement or a new touch, within the shared particle budget. */
  private emitFrom(s: Surface, cell: number, strength: number, touch = false) {
    if (this.reduced || !s.net || s.budget < 1) return;
    const moving = this.input.present && this.input.speed > 40 && (s.inside || s === this.hovered);
    const loading = !this.loaded && this.load.value > 0;
    if (!moving && !loading && !touch) return;
    const title = s.opt.kind === 'title';
    if (Math.random() > (title ? 0.24 : 0.3) * strength) return;
    const [x, y] = this.toDoc(s, s.net.cx[cell], s.net.cy[cell]);
    if (title && s.alpha) {
      const m = s.alpha, mx = Math.floor(s.net.cx[cell] * m.ascale), my = Math.floor(s.net.cy[cell] * m.ascale);
      if (mx < 0 || my < 0 || mx >= m.aw || my >= m.ah || m.alpha[my * m.aw + mx] < 90) return;
    }
    s.budget -= 1;
    const input = this.input;
    if (title) {
      // repulsion from the pointer plus a share of the gesture's direction
      const [cx, cy] = this.toDoc(s, s.w * .5, s.h * .5);
      const px = touch ? cx : input.x, py = touch ? cy : input.y + this.scroll.y;
      const dx = x - px, dy = y - py, d = Math.hypot(dx, dy) || 1, v = rand(...VFX.particles.spark.speed);
      const speed = touch ? 0 : input.speed;
      this.parts.spawn('spark', x, y, (dx / d) * v + input.dirX * speed * 0.06, (dy / d) * v + input.dirY * speed * 0.06 - 12, s.index);
    } else {
      // shards drift outward from the card's centre and leave the frame
      const [mx, my] = this.toDoc(s, s.w / 2, s.h / 2);
      const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy) || 1, v = rand(...VFX.particles.shard.speed);
      this.parts.spawn('shard', x, y, (dx / d) * v + rand(-18, 18), (dy / d) * v + rand(-18, 18), s.index);
    }
  }

  /* ------------------------------------------------------------------ loop */

  /** LevelUp: the demo player covers the page; Servizi: a dialog does (its own surfaces aside). Nothing here is visible. */
  private covered() {
    return root().hasAttribute('data-mm-phase') || (this.loaded && !this.active());
  }

  private animate = (time: number) => {
    this.raf = 0;
    if (this.destroyed) return;
    if (this.failed) { this.destroy(); root().classList.add('vfx-off'); return; }
    if (this.lost || document.hidden || (window as { __TIDE_VISIBLE__?: boolean }).__TIDE_VISIBLE__ === false || this.covered()) { this.lastTick = 0; this.resumed = true; return; }
    // Cap high refresh screens without disconnecting the canvas from native scrolling; a held hover runs at calmFps.
    const R = VFX.runtime, interval = 1000 / (this.calm ? R.calmFps : R.fps);
    const delta = this.lastTick ? time - this.lastTick : 1000 / R.fps;
    if (delta < interval - 1) { this.raf = requestAnimationFrame(this.animate); return; }
    this.lastTick = time;
    this.tick(time, delta);
    if (this.destroyed || this.raf) return;
    // R15: at rest the loop sleeps; the canvas keeps its last frame and wake() restarts the loop
    if (this.loaded && this.restFor >= R.idle) { this.lastTick = 0; this.resumed = true; this.metrics.sleeps++; return; }
    this.raf = requestAnimationFrame(this.animate);
  };

  /** R15, for verification: whether the loop is running (false at rest). */
  get running() { return this.raf !== 0; }

  private tick = (time: number, deltaMs: number) => {
    if (this.destroyed || this.lost || document.hidden) return;
    if ((window as { __TIDE_VISIBLE__?: boolean }).__TIDE_VISIBLE__ === false && this.loaded) return;
    if (this.covered()) return;
    const dt = Math.min(0.05, deltaMs / 1000);       // a long frame slows the motion instead of skipping it
    this.clock += dt; this.frame++;
    const calmFrame = this.calm;
    // the first frame after a sleep: where the pointer went meanwhile is not a gesture
    if (this.resumed) { this.resumed = false; this.input.settle(); }
    if (this.loading) {
      this.loadingElapsed += dt * this.loadRate;
      const p = Math.min(1, this.loadingElapsed / VFX.loading.duration);
      // Exact quadratic power1.inOut ramp, without a second animation ticker.
      this.load.value = p < .5 ? 2 * p * p : 1 - ((-2 * p + 2) ** 2) / 2;
      if (p === 1) { this.loading = false; this.loaded = true; }
    }
    if (this.viewportDirty) this.resizeViewport();
    if (this.layoutDirty) this.layout();
    const g = this.globals, sc = this.scroll, input = this.input, P = VFX.pointer;
    sc.update(this.reduced);
    if (!this.bands) { sc.top = 0; sc.bottom = 0; }
    const painting = this.residency();
    input.update(dt);
    this.touches.beginFrame(time);

    // LevelUp: transformed boards follow their DOM transform, opacity and focus; clipped surfaces their container;
    // photographs arrive; comparisons follow their range
    const motion = this.motionDirty;
    this.motionDirty = false;
    for (const s of this.surfaces.values()) {
      if (s.xf && motion) this.updateMotion(s);
      if (s.imgDirty) this.setPhotos(s);
      const c = s.clipDoc, clip = s.u.uClipRect.value as Vector4;
      if (s.clipEl) clip.set(c[0] - scrollX, c[1] - sc.y, c[2] - scrollX, c[3] - sc.y); else clip.set(0, 0, -1, 0);
      s.u.uClipFade.value = s.clipFade;
      if (s.range) {
        const v = (Number(s.range.value) - Number(s.range.min || 0)) / Math.max(1e-6, Number(s.range.max || 100) - Number(s.range.min || 0));
        s.u.uSplit.value = s.rangeBox[0] + s.rangeBox[1] * clamp(v, 0, 1);
        s.u.uSplitFocus.value = document.activeElement === s.range ? 1 : 0;
      }
    }

    const R = input.radius, px = input.x, py = input.y + sc.y, present = input.present;
    let hovered: Surface | null = null;
    const local = new Map<Surface, [number, number]>();
    for (const s of this.surfaces.values()) local.set(s, this.toLocal(s, px, py));
    if (present) for (const s of this.surfaces.values()) {
      const [lx, ly] = local.get(s)!;
      if (!s.content.visible || !s.shown || lx < 0 || lx > s.w || ly < 0 || ly > s.h || !this.inClip(s, px, py)) continue;
      // cards over titles; among overlapping boards, the one in front
      if (!hovered || (s.opt.kind === 'card' && (hovered.opt.kind === 'title' || s.z >= hovered.z))) hovered = s;
    }
    this.hovered = hovered;
    const loadingNow = !this.loaded && this.load.value > 0;
    let busy = false;
    const attack = 1 - Math.exp(-dt / P.attack), ease = 1 - Math.exp(-dt * 3.5);
    const still = input.still > 0.6;
    // the card veil lifts like the DOM's (opacity .5 s, expo-out) on hover and on keyboard focus
    const veilEase = 1 - Math.exp(-dt / 0.12), focused = document.activeElement;

    for (const s of this.surfaces.values()) {
      const ch = s.chain, net = s.net;
      if (!ch || !net || !s.ready) continue;
      // Sleeping surfaces do not run chain, border, pointer or upload work.
      const inView = s.y < sc.y + this.viewH + this.pad && s.y + s.h > sc.y - this.pad;
      if (!inView) {
        if (ch.active) ch.quench();
        s.touch?.clear(); s.u.uTouch.value = 0;
        if (ch.driveLevel) { ch.drive.fill(0); ch.driveLevel = 0; }
        if (s.hot) { (s.energy!.array as Float32Array).fill(0); s.energy!.needsUpdate = true; s.hot = false; }
        s.hover = s.near = s.lift = 0; s.inside = false; s.overlay.visible = false;
        continue;
      }
      s.budget = Math.min(4, s.budget + dt * VFX.particles.perSecond);
      ch.propagate = !this.reduced;
      const inside = s === hovered;
      const [lx, ly] = local.get(s)!;
      const dx = Math.max(-lx, 0, lx - s.w), dy = Math.max(-ly, 0, ly - s.h);
      const prox = present && !inside && s.shown && this.inClip(s, px, py) ? clamp(1 - Math.hypot(dx, dy) / R, 0, 1) * s.opacity : 0;
      if (inside) {
        if (!s.inside) for (let i = 0; i < P.enterBurst; i++) ch.igniteAt(lx, ly, R * 0.45, rand(0.85, 1));
        // a surface with an energy source (the studio on the map): slow pulses start from it and travel through the cells
        if (s.opt.source) {
          if (!s.inside) s.sourceDebt = 1;
          s.sourceDebt += dt / VFX.pointer.sourceEvery;
          if (s.sourceDebt >= 1) {
            s.sourceDebt -= 1;
            const src = s.el.querySelector(s.opt.source)?.getBoundingClientRect();
            if (src) for (let i = 0; i < 3; i++) ch.igniteAt(src.left + src.width / 2 + scrollX - s.x, src.top + src.height / 2 + sc.y - s.y, 18, rand(0.8, 1));
          }
        }
        const title = s.opt.kind === 'title';
        const rate = (this.reduced ? 1.5 : (still ? P.stillRate : P.hoverRate) + input.speed * P.moveRate) * (title ? VFX.chain.title.rate : VFX.chain.card.rate);
        s.debt += rate * dt;
        const spread = R * P.jitter * (title ? 1.7 : 1);
        while (s.debt >= 1) { s.debt -= 1; ch.igniteAt(lx, ly, spread, rand(0.75, 1)); }
      } else if (prox > 0) {
        // a neighbour in range: the stretch nearest the pointer answers, at a fraction of the primary
        s.debt += P.proximityRate * prox * dt;
        while (s.debt >= 1) { s.debt -= 1; ch.igniteAt(clamp(lx, 0, s.w), clamp(ly, 0, s.h), R * 0.12, (0.2 + 0.2 * prox) * (s.opt.gain ?? 1)); }
      } else s.debt = 0;
      s.inside = inside;
      // START V27: the touch wave travels through the lattice of every visible surface (boards through their transform)
      if (this.reduced || !s.shown) s.touch?.clear();
      else s.touch?.step(this.touches, this.touchRect(s), time, dt);
      s.u.uTouch.value = s.touch && s.touch.level > .003 ? 1 : 0;
      if (s.opt.kind === 'title') this.driveRange(s, inside, lx, ly, R, dt);
      // loading: cells light up as they join, sparsely
      if (loadingNow && s.delays && s.born) {
        const L = this.load.value * 1.3 - 0.15;
        for (let f = 0; f < net.faces; f++) {
          if (s.born[f] || s.delays[f] > L) continue;
          s.born[f] = 1;
          if (net.weight[f] > 0.4 && Math.random() < VFX.loading.ignite) ch.ignite(f, rand(0.45, 0.8), 3);
        }
      }
      const active = ch.active, touchActive = s.touch?.active;
      if (active || touchActive) {
        if (active) ch.step(dt);
        const out = s.energy!.array as Float32Array;
        ch.write(out);
        if (touchActive) s.touch!.merge(out);
        s.energy!.needsUpdate = true; s.hot = true;
      }
      else if (s.hot) { (s.energy!.array as Float32Array).fill(0); s.energy!.needsUpdate = true; s.hot = false; }
      // hover state of the surface: quick in, eased out (type breathes in and out more slowly)
      const slow = s.opt.kind === 'title';
      const targetHover = inside ? 1 : 0;
      s.hover += (targetHover - s.hover) * (targetHover > s.hover ? (slow ? 1 - Math.exp(-dt / .35) : attack) : (slow ? 1 - Math.exp(-dt * 1.6) : ease));
      if (s.hover < 0.002) s.hover = 0;
      // Titles take the same readable amber gradient as desktop; local cells carry the travelling facets.
      s.u.uHover.value = this.reduced ? s.hover * 0.6 : Math.max(s.hover, slow ? (s.touch?.level ?? 0) * .95 : 0);
      s.u.uGain.value = inside || touchActive ? 1 : Math.max(P.neighbour, s.hover);
      if (s.veilRest > 0 || s.frameMask) {
        const lifted = inside || (focused === s.el && s.el.matches(':focus-visible'));
        s.lift += ((lifted ? 1 : 0) - s.lift) * veilEase;
        if (Math.abs(s.lift - (lifted ? 1 : 0)) < 0.002) s.lift = lifted ? 1 : 0; else busy = true;
        s.u.uVeil.value = s.veilRest * (1 - s.lift);
        // Servizi: a tile's frame is whole on hover and focus, faded toward the bottom at rest
        (s.u.uFrameRest.value as Vector2).y = s.lift;
      } else s.u.uVeil.value = 0;
      // a neighbour in range: its cells nearest the pointer wake, eased like the hover
      s.near += (prox - s.near) * (prox > s.near ? attack : ease);
      if (s.near < 0.002) s.near = 0;
      s.u.uNear.value = s.opt.kind === 'title' ? 0 : s.near * (s.opt.gain ?? 1);
      (s.u.uPointer.value as Vector3).set(lx, ly, s.opt.kind === 'title' ? Math.max(R * 1.25, s.fontSize * 1.7) : s.opt.panel ? 0 : 1);
      // the outline
      let glow = 0;
      if (s.border) {
        const b = s.border;
        b.decay(dt);
        for (const e of s.edgeCells) { const v = ch.shown[e.cell] * e.w; if (v > 0.02) b.add(e.s, v * 1.15, 1.6); }
        // START V27: cells the touch lights near the outline feed the real edge glow
        s.touch?.feedBorder(b, s.edgeCells);
        if (present && (inside || prox > 0)) {
          const [o, d] = outline(lx, ly, s.w, s.h);
          b.add(o, Math.pow(clamp(1 - d / R, 0, 1), 1.3) * (inside ? 0.75 : 0.9) * (s.opt.gain ?? 1), 6);
        }
        b.settle();
        glow = b.level;
        (s.u.uBins.value as Float32Array).set(b.bins);
      }
      s.overlay.visible = ch.active || !!touchActive || s.hover > 0.003 || s.near > 0.003 || glow > 0.004;
      if (s.overlay.visible || s.hover > 0.003 || s.near > 0.003) busy = true;
    }

    // shards crossing an outline light it where they cross
    if (this.parts.count) this.parts.each((x, y, life, opacity, owner) => {
      const s = this.byIndex[owner];
      if (!s?.border) return;
      const [qx, qy] = this.toLocal(s, x, y);
      const [o, d] = outline(qx, qy, s.w, s.h);
      if (d < 14) s.border.add(o, opacity * Math.min(1, life * 2) * (1 - d / 14) * 0.9, 1.4);
    });

    this.parts.step(dt);
    this.partGeo.instanceCount = this.parts.count;
    this.partMesh.visible = this.parts.count > 0;
    if (this.parts.count) this.partBuf.needsUpdate = true;

    // after the page stops, cells on their way out drift away; moving again brings the structure back at once
    const drift = g.uDrift.value as Vector3, scrolled = sc.y !== this.lastScroll;
    if (scrolled || this.reduced) { drift.x *= Math.exp(-dt * 10); this.still = 0; }
    else { this.still += dt; if (this.still > 0.12) drift.x = Math.min(VFX.scroll.fade * 2.5, drift.x + dt); }
    if (drift.x > 0.001 && drift.x < VFX.scroll.fade * 2.5) busy = true;
    this.lastScroll = sc.y;

    g.uTime.value = this.clock;
    g.uScroll.value = sc.y; (g.uBandK.value as Vector2).set(sc.top, sc.bottom);
    g.uLoad.value = this.load.value;

    // adaptive quality: sustained long frames step the profile down (frames drawn on the calm cadence are not counted)
    if (!calmFrame) { this.frames++; if (deltaMs > VFX.slowFrame) this.slow++; }
    if (this.frames >= 150) {
      if (this.slow > 70 && this.quality !== 'low' && !this.pinned) { this.quality = this.quality === 'high' ? 'medium' : 'low'; this.viewportDirty = true; }
      this.frames = 0; this.slow = 0;
    }

    // R15: a frame is drawn only when something changes; at rest the loop sleeps (animate) and nothing is drawn.
    // The pointer alone (present over the page, nothing lit near it) changes nothing on screen.
    const changing = busy || scrolled || this.touches.active || this.parts.count > 0 || !this.loaded;
    const draw = changing || this.renderDirty;
    if (draw && this.live) this.render(draw);
    else if (!this.live) this.renderDirty = false;
    this.restFor = changing || painting || this.layoutDirty || this.viewportDirty ? 0 : this.restFor + dt;
    // a held hover (pointer still, page still, nothing travelling): slow breathing and pulses, drawn at calmFps
    this.calm = this.loaded && !scrolled && this.still > 0.25 && input.still > 0.6 && !this.touches.active &&
      this.parts.count === 0 && performance.now() - this.lastMotion > 250;
  };

  private render(emissive: boolean) {
    const r = this.renderer, g = this.globals, P = VFX.post;
    this.renderDirty = false;
    this.metrics.renders++;
    // Canvas and native DOM share the browser's compositor scroll, including iOS momentum.
    const origin = this.scroll.y - this.pad;
    // Servizi: a layer inside a fixed dialog starts where the dialog does, not at the top of the document
    const layerTop = this.offset ? (this.canvas.parentElement?.getBoundingClientRect().top ?? 0) + this.scroll.y : 0;
    this.canvas.style.transform = `translate3d(0, ${origin - layerTop}px, 0)`;
    (g.uCanvas.value as Vector2).set(origin, this.viewH + this.pad * 2);
    // off-screen surfaces are skipped entirely
    const top = this.scroll.y - this.pad, bottom = this.scroll.y + this.viewH + this.pad;
    let energy = this.parts.count > 0;
    this.surfaces.forEach(s => {
      const on = s.ready && s.shown && s.w > 2 && s.y < bottom && s.y + s.h > top;
      s.content.visible = on;
      s.overlay.visible = on && s.overlay.visible;
      if (s.overlay.visible) energy = true;
    });
    const bloom = this.profile().bloom;
    g.uEmissive.value = 0;
    // LevelUp: client px per pixel of the target being drawn (clipped surfaces read gl_FragCoord); the target starts
    // `pad` above the viewport (the overscanned canvas)
    const view = g.uView.value as Vector2, frag = g.uFrag.value as Vector4, renderH = this.viewH + this.pad * 2;
    const target = (t: WebGLRenderTarget) => frag.set(view.x / t.width, renderH / t.height, t.height, -this.pad);
    // the frame in high precision over true black (no background): the content and its energy
    target(this.rtMain);
    r.setRenderTarget(this.rtMain);
    r.clear();
    r.render(this.scene, this.camera);
    const glow = emissive && energy && bloom;
    if (glow) {
      g.uEmissive.value = 1;
      target(this.rtE);
      r.setRenderTarget(this.rtE); r.clear(); r.render(this.scene, this.camera);
      g.uEmissive.value = 0;
      // two separable passes, the second twice as wide: a smooth falloff with no stepped edges once scaled up
      this.blurPasses(this.rtE, [1, 2]);
      // the anamorphic streak: the emission stretched along the horizontal only, at a quarter of the size
      this.blurPass(this.rtE, this.rtS1, 2, 0); this.blurPass(this.rtS1, this.rtS2, 5, 0); this.blurPass(this.rtS2, this.rtS1, 14, 0);
    }
    // the grade, once, to the screen
    const u = this.grade.uniforms;
    (u.uMix.value as Vector4).set(glow ? VFX.bloom.strength : 0, glow ? P.streak : 0, P.vignette, P.grain);
    (u.uLens.value as Vector2).set(bloom ? P.aberration * r.getPixelRatio() : 0, P.shoulder);
    u.uFrame.value = this.reduced ? 0 : Math.floor(this.clock * 24) % 4096;
    this.fsMesh.material = this.grade;
    r.setRenderTarget(null); r.render(this.post, this.camera);
    if (this.publishFrame) {
      this.publishFrame = false;
      root().classList.add('vfx-live');
      root().classList.remove('vfx-boot');
    }
  }

  /** One separable gaussian pass. */
  private blurPass(from: WebGLRenderTarget, to: WebGLRenderTarget, x: number, y: number) {
    const r = this.renderer;
    this.fsMesh.material = this.blur;
    this.blur.uniforms.uTex.value = from.texture;
    (this.blur.uniforms.uStep.value as Vector2).set(x / from.width, y / from.height);
    r.setRenderTarget(to); r.clear(); r.render(this.post, this.camera);
  }

  /** Horizontal then vertical at each width, src → rtA → `out`, the next width starting from `out`. */
  private blurPasses(src: WebGLRenderTarget, widths: readonly number[], out = this.rtB) {
    widths.forEach((k, i) => { this.blurPass(i ? out : src, this.rtA, k, 0); this.blurPass(this.rtA, out, 0, k); });
  }
}
