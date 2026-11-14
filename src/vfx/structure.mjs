/**
 * Structural composition: which cells are present. Pure functions of position and loading progress; the vertex
 * shaders evaluate the same formulas. Nothing depends on time or energy: stopping freezes the structure, reversing
 * replays it.
 */
export const clamp01 = v => Math.min(1, Math.max(0, v));
export const smoothstep = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const fract = x => x - Math.floor(x);

/**
 * Bands as on every page: 15% exit at the top, 70% reading, 15% entry at the bottom (NAV.band). The navigation has no
 * document start or end, so both bands are always open; reduced motion closes them.
 */
export function bandEnable(reduced) { return reduced ? { top: 0, bottom: 0 } : { top: 1, bottom: 1 }; }

/** Fragmentation 0..1 at a viewport y: 0 across the reading band, rising toward the top and bottom edges. */
export function fragmentation(y, viewH, bandPx, top = 1, bottom = 1) {
  const eT = clamp01(1 - y / bandPx) * top;
  const eB = clamp01(1 - (viewH - y) / bandPx) * bottom;
  return Math.pow(Math.max(eT, eB), 1.25);
}

/** Absence 0..1 of one cell (seed 0..1 is its stable local threshold) for a given fragmentation. */
export function cellAbsence(F, seed) { const th = 0.14 + 0.7 * seed; return smoothstep(th - 0.13, th + 0.13, F); }

/** Absence 0..1 of a cell during loading; delay 0..1 is its correlated place in the sequence. */
export function loadingAbsence(load, delay) { return 1 - smoothstep(delay - 0.09, delay + 0.09, load * 1.3 - 0.15); }

/** Same hash and value noise as the GLSL `h21` / `vnoise`, so CPU timing agrees with what the GPU shows. */
export function h21(x, y) {
  let a = fract(x * 0.1031), b = fract(y * 0.1031), c = fract(x * 0.1031);
  const d = a * (b + 33.33) + b * (c + 33.33) + c * (a + 33.33);
  a += d; b += d; c += d;
  return fract((a + b) * c);
}
export function vnoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  let fx = x - ix, fy = y - iy;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const a = h21(ix, iy), b = h21(ix + 1, iy), c = h21(ix, iy + 1), d = h21(ix + 1, iy + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

/** Loading delay 0..1 of a point (seed 0..1 is the cell's own share). */
export function loadingDelay(x, y, seed) {
  const n = vnoise(x / 250 + 3.7, y / 250 + 3.7);
  return clamp01((seed + (n - seed) * 0.64) * 1.16 - 0.08);
}

/** Decay rate (1/s) so that a cell falls below 2% after `seconds`. */
export const rateFor = seconds => Math.log(50) / seconds;
