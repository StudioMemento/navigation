// Shared CSS-pixel field. Pure functions are also exercised by the regression tests.
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
export const inverseSmooth = (v) => .5 - Math.sin(Math.asin(1 - 2 * clamp(v)) / 3);
export const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export function viewportProgress(y, height, scroll, maximum) {
  const top = smooth(0, height * .12, clamp(scroll, 0, maximum));
  const bottom = smooth(0, height * .12, Math.max(0, maximum - scroll));
  return (1 - top + top * smooth(.02, .16, y / height)) *
    (1 - bottom + bottom * (1 - smooth(.80, 1, y / height)));
}
export const cursorField = (distance, radius) => 1 - smooth(radius * .15, radius, distance);
export const material = (p, seed) => smooth(.30 + .48 * seed - .05, .30 + .48 * seed + .05, p);
export const wire = (p) => smooth(.06, .26, p) * (1 - smooth(.75, 1, p));
export const trail = (p) => smooth(0, .05, p) * (1 - smooth(.18, .30, p));
export const cursorGate = (p) => smooth(.85, 1, p);
export function mesh(width, height, size, seed = 1) {
  const nx = Math.ceil(width / size), ny = Math.ceil(height / size), points = [], cells = [];
  for (let y = 0; y <= ny; y++) for (let x = 0; x <= nx; x++) {
    const n = y * (nx + 1) + x;
    points.push([x === 0 ? 0 : x === nx ? width : (x + (hash(seed + n) - .5) * .6) * width / nx,
      y === 0 ? 0 : y === ny ? height : (y + (hash(seed + n + 710) - .5) * .6) * height / ny]);
  }
  const add = (a, b, c) => {
    const vertices = [a, b, c].map(i => points[i]);
    const d = 'M' + vertices.map(p => p.map(n => n.toFixed(2)).join(',')).join('L') + 'Z';
    cells.push({ vertices, d, path: typeof Path2D === 'undefined' ? null : new Path2D(d),
      x: (vertices[0][0] + vertices[1][0] + vertices[2][0]) / 3,
      y: (vertices[0][1] + vertices[1][1] + vertices[2][1]) / 3,
      seed: hash(seed + cells.length + 3001) });
  };
  for (let y = 0; y < ny; y++) for (let x = 0; x < nx; x++) {
    const a = y * (nx + 1) + x, b = a + 1, c = a + nx + 1, d = c + 1;
    if (hash(a + seed) > .5) { add(a, b, c); add(b, d, c); } else { add(a, b, d); add(a, d, c); }
  }
  return cells;
}
