/**
 * Memento VFX DNA — the constants of the START reference implementation (memento-start V23, src/vfx/config.ts),
 * shared by the navigation. Behaviour rules live in the modules; only NAV-specific framing lives in `NAV`.
 */
export const hexToRgb = hex => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/** Same luminance, no hue. */
export const desaturate = hex => {
  const [r, g, b] = hexToRgb(hex);
  const v = Math.round((0.299 * r + 0.587 * g + 0.114 * b) * 255).toString(16).padStart(2, '0');
  return `#${v}${v}${v}`;
};

/** One gradient over the whole title block (0 = cap line, 1 = baseline): light from above, shade only at the base. */
const TITLE_AMBER = Object.freeze([[0, '#fbefe8'], [0.56, '#fbefe8'], [0.68, '#f5d9c6'], [0.8, '#ecb28c'], [0.91, '#e2874f'], [1, '#d9682f']]);

export const VFX = Object.freeze({
  color: {
    /** True black: page, frame and panels. A uniform non-zero black shows the stepped rounding of blurs as bands. */
    base: '#000000',
    panel: [0, 0, 0, 1],
    /** Amber scale: deep > mid > hot > core. `base` is the reference tint (navbar, chevrons, focus). */
    amber: { base: '#FF7950', deep: '#9E2208', mid: '#FF5510', hot: '#FF8A1C', core: '#FFCB72' },
    titleAmber: TITLE_AMBER,
    titleHot: ['#ffe6c4', '#ffda8c', '#ffb45c'],
    titleGradient: TITLE_AMBER.map(([t, c]) => [t, desaturate(c)]),
  },
  chain: {
    /** Cards: one scale of irregular cells (median ~25 px, mixed ~16–36 px), more often visible near the outline. */
    card: { spacing: 22, edgeSpacing: 22, edgeReach: 120, topoArea: 230000, margin: 30, zone: 170, maxGen: 6, spread: 0.74, carry: 0.86, rate: 0.5,
      wake: [150, 150, 0, 1.2],
      delay: [0.12, 0.28], release: [0.9, 1.7], refractory: [0.9, 1.5], attack: 0.2 },
    /** Large type: medium cells carry the reaction, a finer lattice of mixed sizes lights inside the glyphs. */
    title: { spacingEm: 0.2, marginEm: 0.16, zoneEm: 1.1, maxGen: 9, spread: 0.82, carry: 0.9, microEm: 0.095, rate: 0.9,
      delay: [0.14, 0.32], release: [1.2, 2.2], refractory: [0.8, 1.3], attack: 0.24 },
    delay: [0.05, 0.15], refractory: [0.5, 1.0], release: [0.35, 0.8], attack: 0.07,
  },
  /** Type: the hover range along the phrase (× pointer radius, × font size; x then y) and its easing (s). */
  type: { range: [1.6, 2.4, 0.65, 0.75], rise: 0.45, fall: 1.1 },
  pointer: {
    radius: 230, touchRadius: 110, attack: 0.12, neighbour: 0.25,
    hoverRate: 7, stillRate: 2.4, moveRate: 1 / 85, jitter: 0.32, enterBurst: 5, proximityRate: 3,
  },
  border: { bins: 96, decay: 3.2, reach: 46 },
  loading: { duration: 1.8, hurry: 3.2, ignite: 0.14 },
  particles: {
    pool: 180, curl: 110, perSecond: 16,
    spark: { size: [1.6, 4.4], life: [0.3, 0.65], speed: [40, 110] },
    shard: { size: [3, 12], life: [0.9, 1.5], speed: [45, 125] },
  },
  /** Structural cells (loading and transition tessellation). */
  cells: { card: 21 },
  bloom: { scale: 0.5, strength: 0.95 },
  /** V25: no film grain or animated dithering; the photographic and type grade stays clean. */
  post: { shoulder: 0.84, streak: 0.2, vignette: 0.26, grain: 0, aberration: 1.4 },
  quality: {
    high: { dpr: 2, bloom: true, particles: 1, cellScale: 1 },
    /** V24: lower profiles change resolution only; bloom and the cell scale stay. MSAA ×2 only on high (V24). */
    medium: { dpr: 1.5, bloom: true, particles: 1, cellScale: 1 },
    low: { dpr: 1, bloom: true, particles: 1, cellScale: 1 },
  },
  slowFrame: 30,
});

/**
 * Navigation framing of the same rules. The carousel moves cards through the same 15/70/15 bands scroll moves content
 * through on a page: the secondaries sit in the bands, the next section arrives already fragmented.
 */
export const NAV = Object.freeze({
  /** Exit and entry bands as a fraction of the viewport height; drift and fade of the leaving cells once it stops. */
  band: 0.15, drift: 42, fade: 1.6,
  push: 42,
  /** DPR ceilings measured for the iframe on mementostudio.it (R11), combined with the quality profile. */
  dprCap: { small: 1.35, large: 1.65 },
  /** The edge light of a card arriving in the reading position ("luce sugli spigoli al passaggio"). */
  arrival: { light: 0.55, width: 10, cells: 4, strength: 0.5 },
  /** Seconds of complete rest before the surface loop sleeps (the background keeps its own 30 fps loop). */
  idle: 3,
  /** Surface loop ceiling on high refresh screens (V24). */
  fps: 60,
  /** Devices without hover show the scenes in colour at rest (V25); same query as START V27. */
  touchOnly: '(hover: none), (pointer: coarse), (max-width: 767px)',
});

/** Amber gradient for the title shader: per stop, colour and the luminance of its idle (desaturated) version. */
export const titleRamp = () => VFX.color.titleAmber.flatMap(([, c]) => {
  const [r, g, b] = hexToRgb(c);
  return [r, g, b, Math.round((0.299 * r + 0.587 * g + 0.114 * b) * 255) / 255];
});

/** Luminance of the idle gradient's base and top: the overlay reads height within a line from it. */
export const gradientRange = () => {
  const lum = hex => hexToRgb(hex).reduce((a, b) => a + b, 0) / 3;
  const g = VFX.color.titleGradient;
  return [lum(g[g.length - 1][1]), lum(g[0][1])];
};
