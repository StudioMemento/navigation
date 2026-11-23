import { staticArtwork } from './graphics.mjs';
import {
  BufferAttribute, BufferGeometry, CanvasTexture, DataTexture, DoubleSide, DynamicDrawUsage, GLSL3, Group, HalfFloatType,
  InstancedBufferGeometry, InstancedInterleavedBuffer, InterleavedBufferAttribute, LinearFilter, Matrix4, Mesh, NoBlending,
  NoColorSpace, PerspectiveCamera, RawShaderMaterial, RedFormat, Scene, Sphere, Texture, UnsignedByteType, Vector2,
  Vector3, Vector4, WebGLRenderTarget, WebGLRenderer,
} from 'three';
import { BorderLight, outline } from './vfx/border.mjs';
import { ChainField } from './vfx/chain.mjs';
import { NAV, VFX, gradientRange, hexToRgb, pixelRatio, titleRamp } from './vfx/config.mjs';
import { startingQuality } from './vfx/policy.mjs';
import { buildNetwork, hashString } from './vfx/geometry.mjs';
import { PointerField } from './vfx/input.mjs';
import { TouchPulseField, TouchReaction } from './vfx/touch.mjs';
import { GPU_STRIDE, Particles } from './vfx/particles.mjs';
import { bandEnable, loadingDelay, smoothstep } from './vfx/structure.mjs';
import { distanceField, layoutTitle, paintTitle } from './vfx/title.mjs';
import { DEPTH, LIGHTS, settings } from './settings.js';
import {
  BLUR_FRAG, CARD_FRAG, CARD_VERT, DOWNSAMPLE_FRAG, FS_VERT, GRADE_FRAG, OVERLAY_CARD_FRAG, OVERLAY_TITLE_FRAG,
  OVERLAY_VERT, PART_FRAG, PART_VERT,
} from './shaders.js';

const u = value => ({ value });
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rand = (a, b) => a + Math.random() * (b - a);
const root = () => document.documentElement;
const unbounded = g => { g.boundingSphere = new Sphere(new Vector3(), 1e6); return g; };
const BARY = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const barycentric = triangles => { const a = new Float32Array(triangles * 9); for (let i = 0; i < a.length; i++) a[i] = BARY[i % 9]; return a; };
const easeInOut = t => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
/** Signed distance to a cut-corner card (mirrors `sdTab`). */
function sdTab(x, y, w, h, cut) {
  const qx = Math.abs(x - w / 2) - w / 2, qy = Math.abs(y - h / 2) - h / 2;
  const box = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0);
  return Math.max(box, (cut - x - y) * 0.7071, (cut - (w - x) - (h - y)) * 0.7071);
}

/**
 * The navigation on the Memento VFX DNA: one persistent WebGL2 context, one loop, the START's single material and
 * single energy. Each section is a card on a perspective plane: a monochrome cell structure (panel, scene, frame,
 * title) and two overlays of energy (the card's cells and outline, the title's range, lattice and glow), lit only by a
 * chain reaction that a gesture starts and that ends on its own. The carousel position takes cards apart as they leave.
 * There is no background: the frame is true black. The DOM keeps layout, semantics, focus and hit areas.
 * R15: the Home carousel of the Vercel container uses this renderer again (it was kept for `?lab` only). The page loop
 * (main.js) draws only while something changes and sleeps at rest; a held hover is drawn at `NAV.calmFps`.
 */
export class VfxRenderer {
  static create(canvas, pages, hooks) {
    if (root().hasAttribute('data-mm-software')) return null;
    try { return new VfxRenderer(canvas, pages, hooks); }
    catch (error) { console.warn('Memento VFX disabled:', error?.message || error); root().classList.remove('vfx-boot', 'vfx-live'); root().classList.add('vfx-off'); return null; }
  }

  constructor(canvas, pages, hooks = {}) {
    // transparent over the background canvas (V24): panels are opaque, the void lets the fibres through
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!renderer.capabilities.isWebGL2) { renderer.dispose(); throw new Error('WebGL2 unavailable'); }
    this.renderer = renderer; this.canvas = canvas; this.hooks = hooks; this.pages = pages;
    renderer.autoClear = false; renderer.setClearColor(0x000000, 0);
    const gl = renderer.getContext(), info = gl.getExtension('WEBGL_debug_renderer_info');
    this.gpu = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    if (staticArtwork(this.gpu)) { renderer.dispose(); throw new Error('Software graphics: using the rendered navigation cards'); }
    this.quality = /swiftshader|llvmpipe|software|basic render/i.test(this.gpu) ? 'low' : matchMedia('(pointer: coarse)').matches ? 'medium' : 'high';
    // R15: the visit's policy can start lower (2 GB devices); ?vfx=high|medium|low pins a profile
    this.quality = startingQuality(this.quality, hooks.policy && { quality: hooks.policy.quality, pinned: false });
    const pin = new URLSearchParams(location.search).get('vfx');
    this.pinned = !!(pin && pin in VFX.quality); if (this.pinned) this.quality = pin;
    this.reduced = false; this.lost = false; this.disposed = false; this.live = false; this.loaded = false;
    this.load = 0; this.loadSpeed = 1; this.clock = 0; this.clockMs = 0; this.frames = 0; this.slow = 0; this.idleFor = 0;
    this.input = new PointerField(); this.parts = new Particles();
    // contacts are recorded by the page (they also drive the DOM fallback) and read here on the first frame after them
    this.touches = hooks.touches || new TouchPulseField();
    this.touchOnly = matchMedia(NAV.touchOnly);
    this.scene = new Scene(); this.post = new Scene(); this.camera = new PerspectiveCamera(45, 1, 1, 20000);
    const A = VFX.color.amber;
    this.globals = {
      uTime: u(0), uMotion: u(1), uEmissive: u(0), uLoad: u(0), uPhotoColor: u(this.touchOnly.matches ? 1 : 0),
      uView: u(new Vector2(1, 1)), uBand: u(120), uBandK: u(new Vector2(1, 1)), uDrift: u(new Vector3(0, NAV.drift, NAV.fade)),
      uAmb: u([...hexToRgb(A.deep), ...hexToRgb(A.mid), ...hexToRgb(A.hot), ...hexToRgb(A.core)]),
    };
    this.setupParticles(); this.setupPost();
    this.cards = pages.map((page, i) => this.makeCard(page, i));
    this.ray = { o: new Vector3(), d: new Vector3() }; this.tmp = new Vector3(); this.tmp2 = new Vector3(); this.inv = new Matrix4(); this.pm = new Matrix4();
    this.hovered = null; this.layout = null;
    this.abort = new AbortController();
    const hurry = () => { this.loadSpeed = VFX.loading.hurry; };
    for (const type of ['pointerdown', 'wheel', 'keydown', 'touchstart']) addEventListener(type, hurry, { once: true, passive: true, signal: this.abort.signal });
    this.touchOnly.addEventListener('change', () => { this.globals.uPhotoColor.value = this.touchOnly.matches ? 1 : 0; this.wakeUp(); }, { signal: this.abort.signal });
    this.fontsReady = Promise.race([document.fonts?.load?.('280 100px Inter').then(() => document.fonts.ready) ?? Promise.resolve(), new Promise(r => setTimeout(r, 1500))]).then(() => { this.fontsOk = true; this.titlesDirty = true; });
    root().classList.add('vfx-ready');
    void this.start();
  }

  /* ------------------------------------------------------------------ resources */

  material(vertexShader, fragmentShader, own, { depthWrite = false } = {}) {
    return new RawShaderMaterial({
      glslVersion: GLSL3, vertexShader, fragmentShader, uniforms: { ...this.globals, ...own },
      transparent: true, premultipliedAlpha: true, depthTest: true, depthWrite, side: DoubleSide,
      polygonOffset: depthWrite, polygonOffsetFactor: depthWrite ? 1 : 0, polygonOffsetUnits: depthWrite ? 2 : 0,
    });
  }

  makeCard(page, i) {
    const depth = Array.from({ length: 4 }, (_, j) => new Vector4(...(DEPTH[i][j]?.slice(0, 4) || [0, 0, 0.1, 0.1])));
    const powers = new Vector4(...Array.from({ length: 4 }, (_, j) => DEPTH[i][j]?.[4] || 0));
    const lights = Array.from({ length: 6 }, (_, j) => new Vector4(...(LIGHTS[i][j] || [-9, -9, 0.001, 0.001])));
    const card = {
      uSize: u(new Vector2(1, 1)), uCut: u(new Vector2(16, 16)), uNoise: u(new Vector2(i * 731.3, i * -417.9)), uPush: u(NAV.push),
      uPanelCol: u(new Vector4(...VFX.color.panel)), uActive: u(1),
      uImage: u(null), uHasImg: u(0), uTextureSize: u(new Vector2(1536, 1024)), uTilt: u(new Vector2()), uParallax: u(1), uDepth: u(depth), uDepthPower: u(powers),
      uInk: u(null), uHasInk: u(0), uInkMap: u(new Vector4(0, 0, 1, 1)), uTitleAlpha: u(1), uTitleWarm: u(0),
      uHover: u(0), uGain: u(1), uNear: u(0), uTopo: u(1), uEdge: u(1), uLights: u(1), uBins: u(new Float32Array(VFX.border.bins)),
      uPointer: u(new Vector3(-1e4, -1e4, 1)), uWake: u(new Vector4(...VFX.chain.card.wake)), uLightRegions: u(lights),
      uDist: u(null), uRange: u(24), uEm: u(100), uGray: u(new Vector2(...gradientRange())), uTitle: u(titleRamp()),
      uHot: u(VFX.color.titleHot.flatMap(hexToRgb)), uMicro: u(10), uTouch: u(0),
    };
    const group = new Group();
    const content = new Mesh(unbounded(new BufferGeometry()), this.material(CARD_VERT, CARD_FRAG, card, { depthWrite: true }));
    const overlay = new Mesh(unbounded(new BufferGeometry()), this.material(OVERLAY_VERT, OVERLAY_CARD_FRAG, { ...card, uOffset: u(new Vector2()) }));
    const titleOffset = u(new Vector2());
    const title = new Mesh(unbounded(new BufferGeometry()), this.material(OVERLAY_VERT, OVERLAY_TITLE_FRAG, { ...card, uOffset: titleOffset }));
    for (const m of [content, overlay, title]) { m.frustumCulled = false; m.visible = false; group.add(m); }
    this.scene.add(group);
    return {
      index: i, slug: page.slug, text: page.title, group, content, overlay, titleMesh: title, u: card, titleOffset,
      net: null, chain: null, touch: null, energy: null, netKey: '', border: new BorderLight(), edgeCells: [], born: null, delays: null,
      t: null, titleKey: '', canvas: document.createElement('canvas'), ink: null, dist: null, titleSize: 0,
      tex: null, imageUrl: null, loading: false, loaded: false,
      pose: null, d: 0, strength: 0, exit: 0, dir: 1, lx: -1e4, ly: -1e4, hit: false, t0: Infinity,
      hover: 0, near: 0, warm: 0, inside: false, tinside: false, debt: 0, tdebt: 0, budget: 0, hot: false, thot: false, arrived: false,
    };
  }

  setupParticles() {
    const g = this.partGeo = new InstancedBufferGeometry();
    g.setAttribute('corner', new BufferAttribute(new Float32Array([0, -1, 0.9, 0.62, -0.9, 0.62]), 2));
    g.setAttribute('cbary', new BufferAttribute(new Float32Array(BARY), 3));
    this.partBuf = new InstancedInterleavedBuffer(this.parts.gpu, GPU_STRIDE); this.partBuf.setUsage(DynamicDrawUsage);
    g.setAttribute('aP', new InterleavedBufferAttribute(this.partBuf, 4, 0));
    g.setAttribute('aL', new InterleavedBufferAttribute(this.partBuf, 3, 4));
    g.instanceCount = 0; unbounded(g);
    this.uView = this.globals.uView;
    this.partMesh = new Mesh(g, new RawShaderMaterial({ glslVersion: GLSL3, vertexShader: PART_VERT, fragmentShader: PART_FRAG, uniforms: { ...this.globals, uView: this.uView }, transparent: true, premultipliedAlpha: true, depthTest: false, depthWrite: false }));
    this.partMesh.renderOrder = 1000; this.partMesh.frustumCulled = false; this.partMesh.visible = false;
    this.scene.add(this.partMesh);
  }

  setupPost() {
    const ext = this.renderer.extensions;
    const type = ext.has('EXT_color_buffer_float') || ext.has('EXT_color_buffer_half_float') ? HalfFloatType : UnsignedByteType;
    const rt = (depth, samples = 0) => new WebGLRenderTarget(4, 4, { depthBuffer: depth, minFilter: LinearFilter, magFilter: LinearFilter, type, samples });
    // the frame in high precision: everything is drawn here, then graded once to the screen. MSAA ×2 only on the high
    // profile (V24); edges are antialiased analytically in the shaders anyway. Depth stays: the cards occlude in 3D
    this.rtMain = rt(true, this.quality === 'high' ? 2 : 0);
    this.rtE = rt(true); this.rtA = rt(false); this.rtB = rt(false); this.rtS1 = rt(false); this.rtS2 = rt(false);
    this.rtQ1 = rt(false); this.rtQ2 = rt(false);
    const fs = unbounded(new BufferGeometry());
    fs.setAttribute('position', new BufferAttribute(new Float32Array([-1, -1, 3, -1, -1, 3]), 2));
    const raw = (frag, uniforms) => new RawShaderMaterial({ glslVersion: GLSL3, vertexShader: FS_VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false, blending: NoBlending });
    this.blur = raw(BLUR_FRAG, { uTex: u(null), uStep: u(new Vector2()) });
    this.down = raw(DOWNSAMPLE_FRAG, { uTex: u(this.rtMain.texture), uTexel: u(new Vector2()) });
    this.grade = raw(GRADE_FRAG, {
      uScene: u(this.rtMain.texture), uBloom: u(this.rtB.texture), uStreak: u(this.rtS1.texture), uSoft: u(this.rtQ1.texture),
      uRes: u(new Vector2(1, 1)), uMix: u(new Vector4()), uLens: u(new Vector3()),
    });
    this.fsMesh = new Mesh(fs, this.blur); this.fsMesh.frustumCulled = false; this.post.add(this.fsMesh);
  }

  profile() { return VFX.quality[this.quality]; }

  /* ------------------------------------------------------------------ lifecycle */

  /** The GPU representation goes live when fonts, the first scene and its title are ready (never later than ~3 s). */
  async start() {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    await this.fontsReady;
    const ready = () => this.disposed || (this.layout && this.firstCards().every(c => c.loaded && c.t));
    for (let t = 0; !ready() && t < 1400; t += 40) await wait(40);
    // R15: the shader programs are compiled before the takeover, in parallel where the GPU allows it
    await Promise.race([this.precompile(), wait(1500)]);
    if (this.disposed || this.lost) return;
    this.live = true;
    this.publishFrame = true;
    if (this.reduced || root().dataset.hubRole === 'container') { this.load = 1; this.loaded = true; }
    this.wakeUp();
  }

  async precompile() {
    try {
      // without the extension the same programs are compiled at once, still before the takeover (the page is DOM)
      const r = this.renderer, parallel = r.extensions.has('KHR_parallel_shader_compile');
      const compile = async (scene) => { if (parallel) await r.compileAsync(scene, this.camera); else r.compile(scene, this.camera); };
      await compile(this.scene);
      for (const m of [this.blur, this.down, this.grade]) { this.fsMesh.material = m; await compile(this.post); }
    } catch { /* a shader this GPU cannot link is reported by the first frame */ }
  }

  firstCards() { return this.cards.filter(c => Math.abs(c.d) < 1.5); }
  wakeUp() { this.hooks.wake?.(); }
  /** R15: the loop slept; the pointer's travel meanwhile is not a gesture. */
  settle() { this.input.settle(); }
  /** R15: a held hover only (pointer still, nothing travelling): the page loop may draw it at NAV.calmFps. */
  get calm() { return this.live && this.loaded && this.input.still > 0.6 && !this.touches.active && this.parts.count === 0; }

  async loadScene(index, image) {
    const card = this.cards[index];
    const url = image.currentSrc;
    if (!url || this.disposed || card.imageUrl === url || card.pendingUrl === url) return;
    card.pendingUrl = url;
    try {
      // A standalone image reports the bitmap dimensions, independent of responsive CSS density.
      const bitmap = new Image();
      bitmap.src = url;
      await bitmap.decode();
      if (this.disposed || card.pendingUrl !== url || image.currentSrc !== url) return;
      const tex = new Texture(bitmap);
      tex.colorSpace = NoColorSpace;
      tex.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
      tex.needsUpdate = true;
      this.renderer.initTexture(tex);
      card.tex?.dispose(); card.tex = tex; card.imageUrl = url;
      card.u.uImage.value = tex; card.u.uHasImg.value = 1;
      card.u.uTextureSize.value.set(bitmap.naturalWidth, bitmap.naturalHeight);
      card.loaded = true;
      this.hooks.onImage?.(index); this.wakeUp();
    } catch { /* The HTML or the previous texture stays visible. */ }
    finally { if (card.pendingUrl === url) card.pendingUrl = ''; }
  }

  /* ------------------------------------------------------------------ layout */

  resize(l, titleSizes) {
    this.layout = l;
    const q = this.profile();
    // the profile's DPR, the carousel's caps (R11) and the pixel budget (R15, read on the screen's height: a mobile
    // toolbar never changes the ratio)
    const dpr = pixelRatio(devicePixelRatio, l.w, Math.max(l.h, screen.height || 0), q, l.small ? NAV.dprCap.small : NAV.dprCap.large);
    this.dpr = dpr;
    // MSAA ×2 only on the high profile (V24): a profile stepped down also releases the multisampled buffer
    const samples = this.quality === 'high' ? 2 : 0;
    if (this.rtMain.samples !== samples) { this.rtMain.samples = samples; this.rtMain.dispose(); }
    const r = this.renderer;
    r.setPixelRatio(dpr); r.setSize(l.w, l.h, false);
    const gl = r.getContext(), W = gl.drawingBufferWidth, H = gl.drawingBufferHeight;
    this.rtMain.setSize(W, H);
    const bw = Math.max(2, Math.round(l.w * VFX.bloom.scale)), bh = Math.max(2, Math.round(l.h * VFX.bloom.scale));
    for (const t of [this.rtE, this.rtA, this.rtB]) t.setSize(bw, bh);
    for (const t of [this.rtS1, this.rtS2]) t.setSize(Math.max(2, bw >> 1), Math.max(2, bh >> 1));
    for (const t of [this.rtQ1, this.rtQ2]) t.setSize(Math.max(2, Math.ceil(W / 4)), Math.max(2, Math.ceil(H / 4)));
    this.down.uniforms.uTexel.value.set(1 / W, 1 / H);
    this.grade.uniforms.uRes.value.set(W, H);
    this.uView.value.set(l.w, l.h); this.globals.uBand.value = Math.max(64, l.h * NAV.band);
    this.parts.limit = Math.round(VFX.particles.pool * q.particles);
    this.camera.fov = 2 * Math.atan(l.h / (2 * l.perspective)) * 180 / Math.PI;
    this.camera.aspect = l.w / l.h; this.camera.position.set(0, 0, l.perspective); this.camera.updateProjectionMatrix();

    // structure: one irregular network of the card size (rebuilt only when it changes), shared by the five cards
    const cell = VFX.cells.card * q.cellScale, w = l.width, h = l.height;
    const key = `${Math.round(w)}x${Math.round(h)}@${cell.toFixed(1)}`;
    if (key !== this.structKey) {
      this.structKey = key;
      const m = buildNetwork(w, h, cell, 0, 200, 0x51ed);
      const centre = new Float32Array(m.faces * 6), seed = new Float32Array(m.faces * 3);
      for (let f = 0; f < m.faces; f++) for (let k = 0; k < 3; k++) { centre[(f * 3 + k) * 2] = m.cx[f]; centre[(f * 3 + k) * 2 + 1] = m.cy[f]; seed[f * 3 + k] = m.seed[f]; }
      const g = unbounded(new BufferGeometry());
      g.setAttribute('position', new BufferAttribute(m.position, 2));
      g.setAttribute('cellCenter', new BufferAttribute(centre, 2));
      g.setAttribute('seed', new BufferAttribute(seed, 1));
      g.setAttribute('bary', new BufferAttribute(barycentric(m.faces), 3));
      this.structure?.dispose(); this.structure = g;
      for (const c of this.cards) c.content.geometry = g;
    }
    for (const c of this.cards) {
      c.u.uSize.value.set(w, h); c.u.uCut.value.set(l.cut, l.cut);
      c.u.uTopo.value = clamp(VFX.chain.card.topoArea / Math.max(1, w * h), 0.3, 1);
      c.titleSize = titleSizes?.[c.index] || c.titleSize || h * 0.2;
    }
    // energy cells are built for the cards on screen, the rest when they arrive (one per frame, see update)
    for (const c of this.cards) if (Math.abs(c.d) < 1.75) this.ensureNetwork(c);
    this.titlesDirty = true;
  }

  /** Energy cells of a card: an irregular network over the card and a margin, with its chain reaction. */
  ensureNetwork(c) {
    const C = VFX.chain.card, w = this.layout.width, h = this.layout.height;
    const key = `${Math.round(w)}x${Math.round(h)}`;
    if (key === c.netKey) return;
    c.netKey = key;
    const net = buildNetwork(w, h, C.spacing, C.margin, C.zone, hashString(c.slug) + c.index, { spacing: C.edgeSpacing, reach: C.edgeReach });
    for (let f = 0; f < net.faces; f++) if (!net.weight[f]) net.cond[f] = 0;
    const { geometry, energy } = this.overlayGeometry(net);
    c.overlay.geometry.dispose(); c.overlay.geometry = geometry;
    const chain = new ChainField(net, C);
    chain.onIgnite = (cell, strength) => this.emitFrom(c, cell, strength, false);
    c.net = net; c.chain = chain; c.energy = energy;
    c.touch = new TouchReaction(net);
    c.touch.chain.onIgnite = (cell, strength) => this.emitFrom(c, cell, strength, false, true);
    c.delays = new Float32Array(net.faces); c.born = new Uint8Array(net.faces);
    for (let f = 0; f < net.faces; f++) c.delays[f] = loadingDelay(net.cx[f] + c.u.uNoise.value.x, net.cy[f] + c.u.uNoise.value.y, net.seed[f]);
    c.edgeCells = [];
    for (let f = 0; f < net.faces; f++) {
      if (!net.weight[f]) continue;
      const [o, d] = outline(net.cx[f], net.cy[f], w, h);
      if (d < VFX.border.reach) c.edgeCells.push({ cell: f, s: o, w: 1 - d / VFX.border.reach });
    }
  }

  overlayGeometry(net) {
    const g = unbounded(new BufferGeometry());
    g.setAttribute('position', new BufferAttribute(net.position, 2));
    g.setAttribute('bary', new BufferAttribute(barycentric(net.faces), 3));
    g.setAttribute('cell', new BufferAttribute(net.cell, 4));
    const centre = new Float32Array(net.faces * 6);
    for (let f = 0; f < net.faces; f++) for (let k = 0; k < 3; k++) { centre[(f * 3 + k) * 2] = net.cx[f]; centre[(f * 3 + k) * 2 + 1] = net.cy[f]; }
    g.setAttribute('centre', new BufferAttribute(centre, 2));
    const energy = new BufferAttribute(new Float32Array(net.faces * 6), 2); energy.setUsage(DynamicDrawUsage);
    g.setAttribute('energy', energy);
    return { geometry: g, energy };
  }

  /**
   * The title of a card: laid out as the DOM lays out its <h2>, painted with the idle gradient on the card plane, with a
   * distance field of its glyphs and its own network (medium cells carry the reaction along the phrase).
   */
  buildTitle(c) {
    const l = this.layout, size = c.titleSize, scale = Math.max(1, this.dpr);
    const key = `${Math.round(l.width)}x${Math.round(l.height)}@${size.toFixed(2)}/${scale}`;
    if (key === c.titleKey) return false;
    c.titleKey = key;
    const T = VFX.chain.title, t = layoutTitle(c.text, size, l);
    const margin = clamp(size * T.marginEm, 10, 46);
    const painted = paintTitle(c.canvas, t, scale, margin);
    c.ink?.dispose();
    const ink = new CanvasTexture(c.canvas);
    ink.colorSpace = NoColorSpace; ink.premultiplyAlpha = true; ink.flipY = false; ink.generateMipmaps = false; ink.minFilter = LinearFilter; ink.magFilter = LinearFilter;
    c.ink = ink;
    const U = c.u;
    U.uInk.value = ink; U.uHasInk.value = 1; U.uInkMap.value.set(...painted.map);
    U.uEm.value = size; U.uRange.value = margin * 0.95; U.uMicro.value = clamp(size * T.microEm, 6, 18);
    const f = distanceField(c.canvas, painted.cssW, painted.cssH, U.uRange.value);
    c.dist?.dispose();
    const dist = new DataTexture(f.data, f.w, f.h, RedFormat, UnsignedByteType);
    dist.minFilter = LinearFilter; dist.magFilter = LinearFilter; dist.flipY = false; dist.generateMipmaps = false; dist.needsUpdate = true;
    c.dist = dist; U.uDist.value = dist;
    // the network of the title block
    const net = buildNetwork(t.box.w, t.box.h, clamp(size * T.spacingEm, 14, 52), margin, size * T.zoneEm, hashString(c.text) ^ 0x7a11);
    const m = painted.coverage, at = (x, y) => {
      const i = Math.floor(x * m.ascale), j = Math.floor(y * m.ascale);
      return i >= 0 && j >= 0 && i < m.aw && j < m.ah ? m.alpha[j * m.aw + i] / 255 : 0;
    };
    for (let k = 0; k < net.faces; k++) {
      if (!net.weight[k]) { net.cond[k] = 0; continue; }
      let inkK = at(net.cx[k], net.cy[k]);
      for (let v = 0; v < 3; v++) { const o = (k * 3 + v) * 2; inkK = Math.max(inkK, at((net.position[o] + net.cx[k]) / 2, (net.position[o + 1] + net.cy[k]) / 2) * 0.85); }
      net.weight[k] = 0.04 + 0.96 * inkK;
      net.cond[k] = (0.4 + 0.6 * net.zone[k]) * (0.35 + 0.65 * inkK);
    }
    const { geometry, energy } = this.overlayGeometry(net);
    c.titleMesh.geometry.dispose(); c.titleMesh.geometry = geometry;
    c.titleOffset.value.set(t.box.x, t.box.y);
    const chain = new ChainField(net, T);
    chain.onIgnite = (cell, strength) => this.emitFrom(c, cell, strength, true);
    const touch = new TouchReaction(net);
    touch.chain.onIgnite = (cell, strength) => this.emitFrom(c, cell, strength, true, true);
    c.t = { layout: t, net, chain, energy, touch, coverage: m, margin, born: new Uint8Array(net.faces), delays: new Float32Array(net.faces) };
    for (let k = 0; k < net.faces; k++) c.t.delays[k] = loadingDelay(t.box.x + net.cx[k] + c.u.uNoise.value.x, t.box.y + net.cy[k] + c.u.uNoise.value.y, net.seed[k]);
    this.hooks.onTitle?.(c.index);
    return true;
  }

  /* ------------------------------------------------------------------ input */

  /** Card px under a screen point on every visible card plane; returns the front-most card that contains it. */
  pick(x, y) {
    const l = this.layout; if (!l) return null;
    const cam = this.camera, o = this.ray.o.copy(cam.position);
    const d = this.ray.d.set((x / l.w) * 2 - 1, 1 - (y / l.h) * 2, 0.5).unproject(cam).sub(o);
    let best = null;
    for (const c of this.cards) {
      c.hit = false; c.lx = -1e4; c.ly = -1e4;
      if (!c.group.visible) continue;
      this.inv.copy(c.group.matrixWorld).invert();
      const lo = this.tmp.copy(o).applyMatrix4(this.inv), ld = this.tmp2.copy(d).transformDirection(this.inv).multiplyScalar(d.length());
      if (Math.abs(ld.z) < 1e-6) continue;
      const t = -lo.z / ld.z;
      if (t <= 0) continue;
      c.lx = lo.x + ld.x * t + l.width / 2; c.ly = l.height / 2 - (lo.y + ld.y * t); c.t0 = t;
      c.hit = sdTab(c.lx, c.ly, l.width, l.height, l.cut) < 0;
      if (c.hit && (!best || t < best.t0)) best = c;
    }
    return best;
  }

  /** Card px → screen px. */
  toScreen(c, lx, ly) {
    const l = this.layout, v = this.tmp.set(lx - l.width / 2, l.height / 2 - ly, 0).applyMatrix4(c.group.matrixWorld).project(this.camera);
    return [(v.x + 1) * 0.5 * l.w, (1 - v.y) * 0.5 * l.h];
  }

  /** One local impulse (touch, release): lights the cells under a screen point; the chain does the rest. */
  pulseAt(x, y, strength, count, spread = 40) {
    const c = this.pick(x, y); if (!c?.chain) return;
    for (let i = 0; i < count; i++) c.chain.igniteAt(c.lx, c.ly, spread, strength * rand(0.8, 1));
    this.wakeUp();
  }

  /** Keyboard focus lands on a card: a short accent at its centre. */
  pulseCard(index, strength = 0.7, count = 3) {
    const c = this.cards[index], l = this.layout; if (!c?.chain || !l) return;
    for (let i = 0; i < count; i++) c.chain.igniteAt(l.width * 0.5, l.height * 0.45, Math.min(l.width, l.height) * 0.3, strength * rand(0.8, 1));
    this.wakeUp();
  }

  quench() { for (const c of this.cards) { c.chain?.quench(); c.t?.chain.quench(); } }

  /* ------------------------------------------------------------------ emissions */

  /** A few triangles leave the cells the reaction lights, only while the pointer moves (or while the page builds). */
  emitFrom(c, cell, strength, title, touch = false) {
    if (this.reduced || !settings.shards || c.budget < 1 || !this.layout) return;
    const moving = this.input.present && this.input.speed > 40 && c.inside;
    const loading = !this.loaded && this.load > 0;
    // on movement, while the page builds, or from a new touch (V27), always within the shared particle budget
    if (!moving && !loading && !touch) return;
    if (Math.random() > (title ? 0.24 : 0.3) * strength) return;
    let lx, ly;
    if (title) {
      const t = c.t, m = t.coverage, cx = t.net.cx[cell], cy = t.net.cy[cell];
      const mx = Math.floor(cx * m.ascale), my = Math.floor(cy * m.ascale);
      if (mx < 0 || my < 0 || mx >= m.aw || my >= m.ah || m.alpha[my * m.aw + mx] < 90) return;
      lx = t.layout.box.x + cx; ly = t.layout.box.y + cy;
    } else { lx = c.net.cx[cell]; ly = c.net.cy[cell]; }
    c.budget -= 1;
    const [x, y] = this.toScreen(c, lx, ly), input = this.input;
    if (title) {
      // a touch has no pointer to flee from: sparks leave the title block from its centre
      const box = c.t.layout.box, [ox, oy] = touch ? this.toScreen(c, box.x + box.w / 2, box.y + box.h / 2) : [input.x, input.y];
      const dx = x - ox, dy = y - oy, d = Math.hypot(dx, dy) || 1, v = rand(...VFX.particles.spark.speed), speed = touch ? 0 : input.speed;
      this.parts.spawn('spark', x, y, (dx / d) * v + input.dirX * speed * 0.06, (dy / d) * v + input.dirY * speed * 0.06 - 12, c.index);
    } else {
      const [ox, oy] = this.toScreen(c, this.layout.width / 2, this.layout.height / 2);
      const dx = x - ox, dy = y - oy, d = Math.hypot(dx, dy) || 1, v = rand(...VFX.particles.shard.speed);
      this.parts.spawn('shard', x, y, (dx / d) * v + rand(-18, 18), (dy / d) * v + rand(-18, 18), c.index);
    }
  }

  /* ------------------------------------------------------------------ loop */

  /** Advances one frame. Returns true while anything is still moving or lit. `calm`: drawn on the calm cadence. */
  update(dt, poses, reduced, moving = false, calm = false) {
    if (this.disposed || !this.layout) return false;
    this.reduced = reduced;
    const g = this.globals, P = VFX.pointer, l = this.layout, input = this.input;
    this.clock += dt; this.clockMs += dt * 1000;
    g.uTime.value = this.clock; g.uMotion.value = reduced ? 0 : 1;
    this.touches.beginFrame(this.clockMs);
    if (reduced) this.touches.clear();
    if (this.live && !this.loaded) {
      if (reduced) this.load = 1;
      else this.load = Math.min(1, this.load + (dt / VFX.loading.duration) * this.loadSpeed);
      if (this.load >= 1) this.loaded = true;
    }
    g.uLoad.value = this.live ? (reduced ? 1 : easeInOut(this.load)) : 0;
    const k = bandEnable(reduced); g.uBandK.value.set(k.top, k.bottom);
    // after the carousel stops, cells on their way out drift away; moving again brings the structure back at once
    const drift = g.uDrift.value;
    if (moving || reduced) { drift.x *= Math.exp(-dt * 10); this.still = 0; }
    else { this.still = (this.still || 0) + dt; if (this.still > 0.12) drift.x = Math.min(NAV.fade * 2.5, drift.x + dt); }
    input.update(dt);
    const R = input.touch ? P.touchRadius * settings.reach / P.radius : settings.reach;

    // poses: the carousel position is the structure
    for (let i = 0; i < this.cards.length; i++) {
      const c = this.cards[i], p = poses[i]; if (!p) continue;
      c.pose = p; c.d = p.distance; c.strength = 1 - p.secondary;
      if (Math.abs(p.distance) > 0.02) c.dir = Math.sign(p.distance);
      c.group.visible = p.visible;
      c.group.position.set(0, -p.y, p.z); c.group.rotation.set(-p.angle, p.yaw || 0, 0);
      const U = c.u;
      U.uActive.value = c.strength;
      U.uTilt.value.set(reduced ? 0 : p.tiltX || 0, reduced ? 0 : p.tiltY || 0);
      U.uParallax.value = reduced ? 0 : settings.parallax; U.uEdge.value = settings.edge; U.uLights.value = settings.lights;
      U.uTitleAlpha.value = c.strength * c.strength;
    }
    this.scene.updateMatrixWorld(true); this.camera.updateMatrixWorld();
    const present = input.present;
    const hovered = present ? this.pick(input.x, input.y) : (this.cards.forEach(c => { c.hit = false; }), null);
    this.hovered = hovered;

    // titles: painted after the fonts, one per frame, nearest card first. All five are painted, not only the cards on
    // screen at boot (R12 stopped there: Projects and LevelUp never received their title and its hover effects)
    if (this.fontsOk && this.titlesDirty) {
      const order = [...this.cards].sort((a, b) => Math.abs(a.d) - Math.abs(b.d));
      let built = false;
      for (const c of order) if (this.buildTitle(c)) { built = true; break; }
      if (!built) this.titlesDirty = false;
    }

    // a card arriving on screen after a resize gets its cells (one network per frame at most)
    const stale = this.cards.find(c => c.group.visible && c.netKey !== `${Math.round(l.width)}x${Math.round(l.height)}`);
    if (stale) this.ensureNetwork(stale);

    const loadingNow = this.live && !this.loaded;
    const attack = 1 - Math.exp(-dt / P.attack), ease = 1 - Math.exp(-dt * 3.5);
    const warmIn = 1 - Math.exp(-dt / 0.35), warmOut = 1 - Math.exp(-dt * 1.6);
    const still = input.still > 0.6;
    let busy = loadingNow || !this.live;

    for (const c of this.cards) {
      const ch = c.chain, net = c.net;
      if (!ch || !c.group.visible) { this.rest(c); continue; }
      c.budget = Math.min(4, c.budget + dt * VFX.particles.perSecond);
      ch.propagate = !reduced;
      const reading = c.strength > 0.5;
      const under = hovered === c;
      const inside = under && reading;
      const gain = 0.5 + 0.5 * c.strength;
      // nearness of the pointer to this card in its own plane: a neighbour in range, or a secondary under the pointer
      let prox = 0;
      if (present && !inside && c.lx > -9000) {
        const dx = Math.max(-c.lx, 0, c.lx - l.width), dy = Math.max(-c.ly, 0, c.ly - l.height);
        prox = under ? 1 : clamp(1 - Math.hypot(dx, dy) / R, 0, 1);
      }
      const lx = c.lx, ly = c.ly;
      if (inside) {
        if (!c.inside) for (let i = 0; i < P.enterBurst; i++) ch.igniteAt(lx, ly, R * 0.45, rand(0.85, 1));
        const rate = (reduced ? 1.5 : (still ? P.stillRate : P.hoverRate) + input.speed * P.moveRate) * VFX.chain.card.rate;
        c.debt += rate * dt;
        while (c.debt >= 1) { c.debt -= 1; ch.igniteAt(lx, ly, R * P.jitter, rand(0.75, 1)); }
      } else if (prox > 0) {
        c.debt += P.proximityRate * prox * dt;
        while (c.debt >= 1) { c.debt -= 1; ch.igniteAt(clamp(lx, 0, l.width), clamp(ly, 0, l.height), R * 0.12, (0.2 + 0.2 * prox) * gain); }
      } else c.debt = 0;
      c.inside = inside;

      // the passage: a card arriving in the reading position lights the edge it arrives from
      if (c.strength > 0.98 && !c.arrived) {
        c.arrived = true;
        if (this.loaded && !reduced) {
          const A = NAV.arrival, ey = c.dir < 0 ? 0 : l.height;
          c.border.add(outline(l.width / 2, ey, l.width, l.height)[0], A.light, A.width);
          for (let i = 0; i < A.cells; i++) ch.igniteAt(rand(0.2, 0.8) * l.width, ey, 30, A.strength);
        }
      } else if (c.strength < 0.5) c.arrived = false;

      // loading: cells light up as they join, sparsely. A navigation card holds ~3.5× the cells of a START card: the
      // share is scaled to the same number of sparks per card (the amber budget), lower again on the secondaries
      if (loadingNow) {
        const L = g.uLoad.value * 1.3 - 0.15, share = VFX.loading.ignite * clamp(680 / net.faces, 0.15, 1) * (0.25 + 0.75 * c.strength);
        for (let f = 0; f < net.faces; f++) {
          if (c.born[f] || c.delays[f] > L) continue;
          c.born[f] = 1;
          if (net.weight[f] > 0.4 && Math.random() < share) ch.ignite(f, rand(0.45, 0.8), 3);
        }
      }
      // touch (V27): connected paths through this card's own cells, timed by the distance from the finger
      const tr = c.touch;
      if (reduced) tr?.clear();
      else tr?.step(this.touches, w => this.placeOf(c, w), cell => this.screenY(c, net.cx[cell], net.cy[cell]), this.clockMs, dt);
      const touchActive = !!tr?.active;
      if (ch.active || touchActive) {
        if (ch.active) ch.step(dt);
        ch.write(c.energy.array);
        if (touchActive) tr.merge(c.energy.array);
        c.energy.needsUpdate = true; c.hot = true;
      }
      else if (c.hot) { c.energy.array.fill(0); c.energy.needsUpdate = true; c.hot = false; }

      // hover state of the card: quick in, eased out; the title breathes in and out more slowly
      c.hover += ((inside ? 1 : 0) - c.hover) * (inside ? attack : ease);
      if (c.hover < 0.002) c.hover = 0;
      c.near += (prox - c.near) * (prox > c.near ? attack : ease);
      if (c.near < 0.002) c.near = 0;
      c.warm += ((inside ? 1 : 0) - c.warm) * (inside ? warmIn : warmOut);
      if (c.warm < 0.002) c.warm = 0;
      const U = c.u;
      U.uHover.value = reduced ? c.hover * 0.6 : c.hover;
      U.uGain.value = inside || touchActive ? 1 : Math.max(P.neighbour, c.hover) * gain;
      U.uNear.value = c.near * gain;
      U.uTitleWarm.value = (reduced ? c.warm * 0.6 : c.warm) * c.strength;
      U.uPointer.value.set(lx, ly, 1);

      if (this.updateTitle(c, inside, dt, R, loadingNow, still)) busy = true;

      // the outline
      const b = c.border;
      b.decay(dt);
      for (const e of c.edgeCells) { const v = ch.shown[e.cell] * e.w; if (v > 0.02) b.add(e.s, v * 1.15, 1.6); }
      // the cells a touch lights near the edge feed the same edge glow as the desktop (V27)
      tr?.feedBorder(b, c.edgeCells);
      if (present && (inside || prox > 0) && lx > -9000) {
        const [o, d] = outline(lx, ly, l.width, l.height);
        b.add(o, Math.pow(clamp(1 - d / R, 0, 1), 1.3) * (inside ? 0.75 : 0.9) * gain, 6);
      }
      b.settle();
      U.uBins.value.set(b.bins);
      c.overlay.visible = ch.active || touchActive || c.hover > 0.003 || c.near > 0.003 || b.level > 0.004;
      if (c.overlay.visible || inside || prox > 0) busy = true;
    }

    // shards crossing an outline light it where they cross
    if (this.parts.count) this.parts.each((x, y, life, opacity, owner) => {
      const c = this.cards[owner]; if (!c?.group.visible || c.strength < 0.5) return;
      const hit = this.planePoint(c, x, y); if (!hit) return;
      const [o, d] = outline(hit[0], hit[1], l.width, l.height);
      if (d < 14) c.border.add(o, opacity * Math.min(1, life * 2) * (1 - d / 14) * 0.9, 1.4);
    });
    this.parts.step(dt);
    this.partGeo.instanceCount = this.parts.count; this.partMesh.visible = this.parts.count > 0; this.partBuf.needsUpdate = true;
    if (this.parts.count || this.touches.active) busy = true;
    if (drift.x > 0.001 && drift.x < NAV.fade * 2.5) busy = true;

    // adaptive quality: sustained long frames step the profile down (frames on the calm cadence are not counted)
    if (!calm) { this.frames++; if (dt * 1000 > VFX.slowFrame) this.slow++; }
    if (this.frames >= 150) {
      if (this.slow > 70 && this.quality !== 'low' && !this.pinned) { this.quality = this.quality === 'high' ? 'medium' : 'low'; this.structKey = ''; this.resize(this.layout); }
      this.frames = 0; this.slow = 0;
    }
    this.busy = busy;
    return busy;
  }

  updateTitle(c, inside, dt, R, loadingNow, still) {
    const t = c.t, U = c.u;
    if (!t) { c.titleMesh.visible = false; return false; }
    const ch = t.chain, net = t.net, box = t.layout.box, P = VFX.pointer, T = VFX.type, size = c.titleSize;
    ch.propagate = !this.reduced;
    const tx = c.lx - box.x, ty = c.ly - box.y;
    const tinside = inside && tx > -t.margin && tx < box.w + t.margin && ty > -t.margin * 2 && ty < box.h + t.margin;
    if (tinside) {
      if (!c.tinside) for (let i = 0; i < P.enterBurst; i++) ch.igniteAt(tx, ty, R * 0.45, rand(0.85, 1));
      const rate = (this.reduced ? 1.5 : (still ? P.stillRate : P.hoverRate) + this.input.speed * P.moveRate) * VFX.chain.title.rate;
      c.tdebt += rate * dt;
      while (c.tdebt >= 1) { c.tdebt -= 1; ch.igniteAt(tx, ty, R * P.jitter * 1.7, rand(0.75, 1)); }
    } else c.tdebt = 0;
    c.tinside = tinside;
    // the range lights the cells it reaches along the phrase (wide across the line, short in height), each with its own
    // reach, eased in and out: its edge is made of cells, never a disc
    const D = ch.drive;
    if (inside || ch.driveLevel > 0.003) {
      const rx = Math.max(R * T.range[0], size * T.range[1]), ry = Math.max(R * T.range[2], size * T.range[3]);
      const up = 1 - Math.exp(-dt / T.rise), down = 1 - Math.exp(-dt / T.fall);
      let lvl = 0;
      for (let f = 0; f < net.faces; f++) {
        let target = 0;
        if (inside && net.weight[f] > 0.05) {
          const dx = (net.cx[f] - tx) / rx, dy = (net.cy[f] - ty) / ry;
          target = 1 - smoothstep(0.2, 1, Math.sqrt(dx * dx + dy * dy) / (0.7 + 0.6 * net.seed[f]));
        }
        let v = D[f] + (target - D[f]) * (target > D[f] ? up : down);
        if (v < 0.002) v = 0;
        D[f] = v; if (v > lvl) lvl = v;
      }
      ch.driveLevel = lvl;
    } else if (ch.driveLevel) { D.fill(0); ch.driveLevel = 0; }
    if (loadingNow) {
      const L = this.globals.uLoad.value * 1.3 - 0.15;
      for (let f = 0; f < net.faces; f++) {
        if (t.born[f] || t.delays[f] > L) continue;
        t.born[f] = 1;
        if (net.weight[f] > 0.4 && Math.random() < VFX.loading.ignite) ch.ignite(f, rand(0.45, 0.8), 3);
      }
    }
    // touch (V27): the title's own cells light along connected paths; while they do, the block takes its amber gradient
    const tt = t.touch;
    if (this.reduced) tt.clear();
    else tt.step(this.touches, w => this.placeOf(c, w, box), cell => this.screenY(c, box.x + net.cx[cell], box.y + net.cy[cell]), this.clockMs, dt);
    const touchActive = tt.active;
    U.uTouch.value = tt.level > 0.003 ? 1 : 0;
    if (!this.reduced) U.uTitleWarm.value = Math.max(U.uTitleWarm.value, tt.level * 0.95 * c.strength);
    if (ch.active || touchActive) {
      if (ch.active) ch.step(dt);
      ch.write(t.energy.array);
      if (touchActive) tt.merge(t.energy.array);
      t.energy.needsUpdate = true; c.thot = true;
    }
    else if (c.thot) { t.energy.array.fill(0); t.energy.needsUpdate = true; c.thot = false; }
    c.titleMesh.visible = U.uTitleAlpha.value > 0.002 && (U.uTitleWarm.value > 0.004 || U.uTouch.value > 0 || (ch.active && !this.loaded) || ch.driveLevel > 0.003);
    return c.titleMesh.visible || ch.active || touchActive;
  }

  rest(c) {
    c.inside = false; c.tinside = false; c.hover = 0; c.near = 0; c.warm = 0; c.debt = 0;
    c.u.uHover.value = 0; c.u.uNear.value = 0; c.u.uTitleWarm.value = 0; c.u.uTouch.value = 0;
    if (c.touch?.active) c.touch.clear();
    if (c.t?.touch.active) c.t.touch.clear();
    c.overlay.visible = false; c.titleMesh.visible = false;
    if (c.border.level) { c.border.clear(); c.u.uBins.value.fill(0); }
  }

  /** A contact (touch or pen) at a screen point; read by every card on the next frame. */
  touchAt(x, y) {
    if (this.reduced || !this.layout) return null;
    const wave = this.touches.start(x, y, this.layout.w, this.layout.h, this.clockMs);
    this.wakeUp();
    return wave;
  }

  /**
   * Placement of a network for planning a contact: touch point in network px, network size, and the screen px of every
   * cell, projected once (card px → plane → screen). `box` offsets a title block inside its card.
   */
  placeOf(c, wave, box = null) {
    const l = this.layout, net = box ? c.t.net : c.net, n = net.faces;
    const ox = box ? box.x : 0, oy = box ? box.y : 0;
    const m = this.pm.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse).multiply(c.group.matrixWorld).elements;
    const hw = l.width / 2, hh = l.height / 2, sx = new Float32Array(n), sy = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = ox + net.cx[i] - hw, y = hh - (oy + net.cy[i]);
      const cx = m[0] * x + m[4] * y + m[12], cy = m[1] * x + m[5] * y + m[13], cw = m[3] * x + m[7] * y + m[15];
      if (cw <= 1e-6) { sx[i] = -1e5; sy[i] = -1e5; continue; }
      sx[i] = (cx / cw * 0.5 + 0.5) * l.w; sy[i] = (0.5 - cy / cw * 0.5) * l.h;
    }
    const hit = this.planePoint(c, wave.x, wave.y) || [-1e5, -1e5];
    return { lx: hit[0] - ox, ly: hit[1] - oy, w: box ? box.w : l.width, h: box ? box.h : l.height, sx, sy };
  }

  /** Current screen y of a card px (a touch only lights cells that are on screen when it arrives). */
  screenY(c, lx, ly) { return this.toScreen(c, lx, ly)[1]; }

  /** Card px of a screen point on one card's plane (no containment test). */
  planePoint(c, x, y) {
    const l = this.layout, cam = this.camera, o = this.ray.o.copy(cam.position);
    const d = this.ray.d.set((x / l.w) * 2 - 1, 1 - (y / l.h) * 2, 0.5).unproject(cam).sub(o);
    this.inv.copy(c.group.matrixWorld).invert();
    const lo = this.tmp.copy(o).applyMatrix4(this.inv), ld = this.tmp2.copy(d).transformDirection(this.inv);
    if (Math.abs(ld.z) < 1e-6) return null;
    const t = -lo.z / ld.z;
    return [lo.x + ld.x * t + l.width / 2, l.height / 2 - (lo.y + ld.y * t)];
  }

  render() {
    if (this.lost || this.disposed || !this.layout) return;
    const r = this.renderer, g = this.globals, Q = VFX.post;
    // draw order: back to front (the card in the reading position last)
    const order = this.cards.filter(c => c.group.visible).sort((a, b) => Math.abs(b.d) - Math.abs(a.d));
    order.forEach((c, k) => {
      c.content.visible = !!c.content.geometry.attributes.position;
      c.content.renderOrder = k * 4; c.overlay.renderOrder = k * 4 + 1; c.titleMesh.renderOrder = k * 4 + 2;
    });
    let energy = this.parts.count > 0;
    for (const c of order) if (c.overlay.visible || c.titleMesh.visible) energy = true;
    const bloom = this.profile().bloom && settings.bloom > 0;
    g.uEmissive.value = 0;
    r.setRenderTarget(this.rtMain); r.clear(); r.render(this.scene, this.camera);
    const glow = energy && bloom;
    if (glow) {
      g.uEmissive.value = 1;
      r.setRenderTarget(this.rtE); r.clear(); r.render(this.scene, this.camera);
      g.uEmissive.value = 0;
      this.blurPass(this.rtE, this.rtA, 1, 0); this.blurPass(this.rtA, this.rtB, 0, 1);
      this.blurPass(this.rtB, this.rtA, 2, 0); this.blurPass(this.rtA, this.rtB, 0, 2);
      this.blurPass(this.rtE, this.rtS1, 2, 0); this.blurPass(this.rtS1, this.rtS2, 5, 0); this.blurPass(this.rtS2, this.rtS1, 14, 0);
    }
    // the progressive blur of the outer 20%, composed here instead of eight filtered CSS layers
    this.fsMesh.material = this.down; r.setRenderTarget(this.rtQ1); r.render(this.post, this.camera);
    this.blurPass(this.rtQ1, this.rtQ2, 1, 0); this.blurPass(this.rtQ2, this.rtQ1, 0, 1);
    const U = this.grade.uniforms;
    U.uMix.value.set(glow ? VFX.bloom.strength * settings.bloom : 0, glow ? Q.streak * settings.streak : 0, Q.vignette, 0);
    U.uLens.value.set(this.profile().bloom ? Q.aberration * r.getPixelRatio() : 0, Q.shoulder, 1);
    this.fsMesh.material = this.grade; r.setRenderTarget(null); r.render(this.post, this.camera);
    if (this.publishFrame) {
      this.publishFrame = false;
      root().classList.add('vfx-live'); root().classList.remove('vfx-boot');
      this.hooks.onLive?.();
    }
  }

  blurPass(from, to, x, y) {
    this.fsMesh.material = this.blur;
    this.blur.uniforms.uTex.value = from.texture;
    this.blur.uniforms.uStep.value.set(x / from.width, y / from.height);
    this.renderer.setRenderTarget(to); this.renderer.render(this.post, this.camera);
  }

  /** Context restored: every texture uploads again. */
  restore() {
    this.lost = false;
    for (const c of this.cards) { if (c.tex) c.tex.needsUpdate = true; if (c.ink) c.ink.needsUpdate = true; if (c.dist) c.dist.needsUpdate = true; }
  }

  stats() {
    return { quality: this.quality, dpr: this.dpr, live: this.live, loaded: this.loaded, energy: this.busy,
      particles: this.parts.count, scenes: this.cards.filter(c => c.loaded).length, titles: this.cards.filter(c => c.t).length };
  }

  dispose() {
    this.disposed = true; this.abort.abort();
    for (const c of this.cards) {
      c.tex?.dispose(); c.ink?.dispose(); c.dist?.dispose();
      c.overlay.geometry.dispose(); c.titleMesh.geometry.dispose();
      for (const m of [c.content, c.overlay, c.titleMesh]) m.material.dispose();
    }
    this.structure?.dispose(); this.partGeo.dispose(); this.partMesh.material.dispose();
    this.fsMesh.geometry.dispose(); this.blur.dispose(); this.down.dispose(); this.grade.dispose();
    for (const t of [this.rtMain, this.rtE, this.rtA, this.rtB, this.rtS1, this.rtS2, this.rtQ1, this.rtQ2]) t.dispose();
    this.renderer.dispose();
    root().classList.remove('vfx-live', 'vfx-boot', 'vfx-ready');
  }
}
