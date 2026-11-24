/**
 * LevelUp extensions, pure functions (tested): projective placement of transformed surfaces and the black-alpha
 * gradients the DOM uses as shades and masks. Nothing here touches the DOM or WebGL.
 */

/** Column-major 4×4, as WebGL and DOMMatrix.toFloat32Array() use it. */
export type Mat4 = Float32Array;
/** Row-major 3×3 homography of the plane z = 0. */
export type Mat3 = Float64Array;

export const identity4 = () => Float32Array.from([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

export function multiply4(a: ArrayLike<number>, b: ArrayLike<number>): Mat4 {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
}

export function translation4(x: number, y: number): Mat4 {
  const m = identity4();
  m[12] = x; m[13] = y;
  return m;
}

/**
 * Local px of an element's untransformed box → document px (homogeneous), as CSS applies `transform`:
 * T(box origin + transform-origin) · css · T(−transform-origin).
 */
export function placement(css: ArrayLike<number>, originX: number, originY: number, docX: number, docY: number): Mat4 {
  return multiply4(multiply4(translation4(docX + originX, docY + originY), css), translation4(-originX, -originY));
}

/** Projects a local point through `m` (z = 0); returns document px. */
export function project(m: ArrayLike<number>, x: number, y: number): [number, number] {
  const X = m[0] * x + m[4] * y + m[12], Y = m[1] * x + m[5] * y + m[13], W = m[3] * x + m[7] * y + m[15];
  return [X / W, Y / W];
}

/** The homography of the plane z = 0 and its inverse (document px → local px). Null when degenerate (edge-on). */
export function inverseHomography(m: ArrayLike<number>): Mat3 | null {
  const a = m[0], b = m[4], c = m[12], d = m[1], e = m[5], f = m[13], g = m[3], h = m[7], i = m[15];
  const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
  const det = a * A + b * B + c * C;
  if (!Number.isFinite(det) || Math.abs(det) < 1e-12) return null;
  const k = 1 / det;
  return Float64Array.from([
    A * k, -(b * i - c * h) * k, (b * f - c * e) * k,
    B * k, (a * i - c * g) * k, -(a * f - c * d) * k,
    C * k, -(a * h - b * g) * k, (a * e - b * d) * k,
  ]);
}

/** Document px → local px through an inverse homography. */
export function unproject(inv: Mat3, x: number, y: number): [number, number] {
  const u = inv[0] * x + inv[1] * y + inv[2], v = inv[3] * x + inv[4] * y + inv[5], w = inv[6] * x + inv[7] * y + inv[8];
  return [u / w, v / w];
}

/** Parses `matrix(...)` / `matrix3d(...)` / `none` (computed `transform`) into a column-major 4×4. */
export function parseTransform(value: string): Mat4 {
  const m = /^matrix(3d)?\(([^)]+)\)/.exec(value.trim());
  if (!m) return identity4();
  const v = m[2].split(',').map(Number);
  if (m[1]) return Float32Array.from(v);
  const [a, b, c, d, e, f] = v;
  return Float32Array.from([a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, e, f, 0, 1]);
}

/* ------------------------------------------------------------------ gradients */

export interface AlphaGradient {
  /** CSS angle, degrees (180 = to bottom). */
  angle: number;
  /** Stops along the gradient line: position 0..1 and alpha of the colour. */
  stops: { t: number; a: number }[];
}

/** Splits on commas that are not inside parentheses. */
function topLevel(s: string) {
  const out: string[] = [];
  let depth = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) { out.push(s.slice(start, i).trim()); start = i + 1; }
  }
  out.push(s.slice(start).trim());
  return out;
}

const SIDES: Record<string, number> = { top: 0, right: 90, bottom: 180, left: 270 };

function alphaOf(color: string) {
  if (color === 'transparent') return 0;
  const rgb = /rgba?\(([^)]+)\)/.exec(color);
  if (rgb) {
    const v = rgb[1].split(/[,/ ]+/).filter(Boolean);
    return v.length > 3 ? (v[3].endsWith('%') ? parseFloat(v[3]) / 100 : parseFloat(v[3])) : 1;
  }
  const hex = /^#([0-9a-f]{3,8})$/i.exec(color)?.[1];
  if (hex) {
    if (hex.length === 4) return parseInt(hex[3] + hex[3], 16) / 255;
    if (hex.length === 8) return parseInt(hex.slice(6), 16) / 255;
    return 1;
  }
  return 1;
}

/** Length of the CSS gradient line of a w × h box at `angle` degrees (px). */
export function lineLength(angle: number, w: number, h: number) {
  const r = (angle * Math.PI) / 180;
  return Math.abs(w * Math.sin(r)) + Math.abs(h * Math.cos(r));
}

/**
 * Servizi: every top-level `linear-gradient(...)` of a computed `mask-image` (the photographs carry two, intersected:
 * a horizontal fade and a vertical one). Non-gradient layers are ignored.
 */
export function parseAlphaGradients(value: string, length: number | ((angle: number) => number) = 1): AlphaGradient[] {
  const out: AlphaGradient[] = [];
  if (!value || value === 'none') return out;
  for (const part of topLevel(value)) {
    const g = parseAlphaGradient(part, length);
    if (g) out.push(g);
  }
  return out;
}

/**
 * The first `linear-gradient(...)` of a computed `background-image` or `mask-image`, as alpha stops.
 * `length` (px of the gradient line, or a function of the parsed angle) resolves px positions; percentages need nothing.
 */
export function parseAlphaGradient(value: string, lengthOf: number | ((angle: number) => number) = 1): AlphaGradient | null {
  const start = value.indexOf('linear-gradient(');
  if (start < 0) return null;
  let depth = 0, end = -1;
  for (let i = start + 15; i < value.length; i++) {
    if (value[i] === '(') depth++;
    else if (value[i] === ')') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) return null;
  const args = topLevel(value.slice(start + 16, end));
  let angle = 180;
  const head = args[0];
  if (/^-?[\d.]+(deg|turn|rad|grad)$/.test(head)) {
    const n = parseFloat(head);
    angle = head.endsWith('turn') ? n * 360 : head.endsWith('rad') ? (n * 180) / Math.PI : head.endsWith('grad') ? n * 0.9 : n;
    args.shift();
  } else if (head.startsWith('to ')) {
    const sides = head.slice(3).split(/\s+/).map(s => SIDES[s]).filter(v => v !== undefined);
    angle = sides.length === 2 ? (sides.includes(0) && sides.includes(270) ? 315 : (sides[0] + sides[1]) / 2) : (sides[0] ?? 180);
    args.shift();
  }
  const length = typeof lengthOf === 'function' ? lengthOf(angle) : lengthOf;
  const raw: { t: number | null; a: number }[] = [];
  for (const arg of args) {
    // a colour, then zero, one or two positions
    const m = /^((?:rgba?|hsla?)\([^)]*\)|#[0-9a-f]{3,8}|[a-z]+)\s*(.*)$/i.exec(arg);
    if (!m) return null;
    const a = alphaOf(m[1]);
    const positions = m[2].trim() ? m[2].trim().split(/\s+(?![^(]*\))/) : [];
    const at = (p: string) => {
      if (p.endsWith('%')) return parseFloat(p) / 100;
      if (p.endsWith('px')) return parseFloat(p) / Math.max(1, length);
      const calc = /^calc\(\s*([\d.]+)%\s*([+-])\s*([\d.]+)px\s*\)$/.exec(p);
      if (calc) return parseFloat(calc[1]) / 100 + (calc[2] === '-' ? -1 : 1) * parseFloat(calc[3]) / Math.max(1, length);
      return null;
    };
    if (!positions.length) raw.push({ t: null, a });
    for (const p of positions) raw.push({ t: at(p), a });
  }
  if (raw.length < 2) return null;
  // CSS rules for missing positions: first 0, last 1, the rest spread evenly between known neighbours
  if (raw[0].t === null) raw[0].t = 0;
  if (raw[raw.length - 1].t === null) raw[raw.length - 1].t = 1;
  let last = 0;
  for (let i = 0; i < raw.length; i++) {
    const t = raw[i].t;
    if (t !== null) { raw[i].t = Math.max(t, raw[last].t ?? 0); last = i; continue; }
    let j = i + 1;
    while (raw[j].t === null) j++;
    const a = raw[last].t!, b = raw[j].t!;
    for (let k = i; k < j; k++) raw[k].t = a + ((b - a) * (k - last)) / (j - last);
    i = j - 1;
  }
  return { angle, stops: raw.map(s => ({ t: s.t!, a: s.a })) };
}

/**
 * Gradient line of a box (CSS rules): direction and 1 / length, so that t = dot(p − centre, dir) · invLen + 0.5.
 */
export function gradientLine(angle: number, w: number, h: number): [number, number, number] {
  const r = (angle * Math.PI) / 180, sx = Math.sin(r), cy = -Math.cos(r);
  const len = Math.abs(w * sx) + Math.abs(h * cy);
  return [sx, cy, 1 / Math.max(1e-3, len)];
}

/** Alpha of the gradient at t (piecewise linear, clamped), the same evaluation as the shader's `stopsAt`. */
export function alphaAt(g: AlphaGradient, t: number) {
  const s = g.stops;
  if (t <= s[0].t) return s[0].a;
  for (let i = 1; i < s.length; i++) {
    if (t <= s[i].t) {
      const span = s[i].t - s[i - 1].t;
      return span <= 1e-6 ? s[i].a : s[i - 1].a + (s[i].a - s[i - 1].a) * ((t - s[i - 1].t) / span);
    }
  }
  return s[s.length - 1].a;
}
