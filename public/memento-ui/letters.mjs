// R20: the background of the site. A calm field of the Memento logotype's own glyphs (M Ξ M Ξ N T O, vector, from
// DEV_20_Typo.svg) that flicker, scramble and glitch in amber, stirred by the pointer and torn by clicks, after the
// Letter Glitch of React Bits' Background Studio (preset "pixel": #f97316, size 8, spacing 0.5, density 0.25, base
// opacity 0.1, speed 0.05, flow 0.5, cursor radius 400, click burst).
//
// It lives in the margins of the page (padding.mjs: 10 / 15 / 20 / 30% of the width on each side) and fades out
// gradually where the content starts, so the content stays exactly as legible as before. Now and then a run of seven
// cells decrypts into the logotype and a chain reaction spreads from it through the field: something happened, here.
//
// One fixed layer under the page, two 2D canvases: the field (only the cells that change are painted again) and the
// light of a decrypted word. It draws at most 30 frames a second, stops with the tab hidden, stays still with reduced
// motion or ?vfx=off, and keeps going through the page change (scene-head: it rises above the change while it runs and
// is its own view-transition group, so only the content changes).
import { paddingOf } from '/memento-ui/padding.mjs';

/** The logotype's glyphs on a unit box (height 1), from the vector file: the site's own letters, not a font. */
const SHAPES = {
  M: { w: 1, d: 'M1 0L1 1L.9 .9L.9 .2334L.5 .6333L.1 .2334L.1 .9L0 1L0 0L.5 .5L1 0Z' },
  E: { w: 1, d: 'M.9 .9L1 1L0 1L.1 .9Z M.3 .45L.7 .45L.7 .55L.3 .55Z M1 0L.9 .1L.1 .1L0 0Z' },
  N: { w: .8668, d: 'M.8668 0L.8668 1L.1 .2334L.1 .9L0 1L0 0L.7668 .7666L.7668 .1L.8668 0Z' },
  T: { w: 1, d: 'M0 0L1 0L.9 .1L.55 .1L.55 1L.45 .9L.45 .1L.1 .1Z' },
  O: { w: 1, d: 'M1 .5A.5 .5 0 1 1 0 .5A.5 .5 0 1 1 1 .5Z M.9 .5A.4 .4 0 1 0 .1 .5A.4 .4 0 1 0 .9 .5Z' },
};
/** The word, in order: random glyphs are drawn from it (M and Ξ twice as often), the decrypted word spells it. */
const WORD = ['M', 'E', 'M', 'E', 'N', 'T', 'O'];
const KINDS = ['M', 'E', 'N', 'T', 'O'];
const WORD_KIND = WORD.map(c => KINDS.indexOf(c));

export const LETTERS = Object.freeze({
  size: 8, spacing: 0.5, density: 0.25, base: 0.1, glitch: 0.5, speed: 0.05, flow: 0.5, radius: 400,
  color: '#f97316', hot: '#ffe2bd',
  /** glitch runs per second for every 1000 visible cells (speed 0.05, glitch amount 0.5) */
  rate: 5,
  /** a click: a ring that runs out at this speed (px/s) up to this radius (px) */
  burst: { speed: 900, radius: 360 },
  /** seconds between two decrypted words (the first one sooner), the chain reaction's reach in cells and its pace (s) */
  egg: { first: [7, 13], every: [16, 30], reach: 16, step: 0.045, hold: 1.7 },
  fps: 30,
});

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const rand = (a, b) => a + Math.random() * (b - a);
/** A stable hash of a cell: the same field on every page, so the page change never shows a different background. */
function hash(i, j) {
  let h = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul((j + 0x632be5ab) | 0, 0xc2b2ae35);
  h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

let mounted = null;
export function mountLetters() {
  if (mounted || typeof document === 'undefined') return mounted;
  const root = document.documentElement;
  const query = new URLSearchParams(location.search).get('vfx');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const forced = matchMedia('(forced-colors: active)');
  const still = () => motion.matches || query === 'off' || query === '0' || !!navigator.connection?.saveData;

  // the build writes the layer at the top of every body (scene-head lettersLayer), so it is in the document when the
  // page change captures it; a page without it gets one here
  let layer = document.querySelector('body > .mm-letters');
  if (!layer || layer.querySelectorAll('canvas').length !== 2) {
    layer?.remove();
    layer = document.createElement('div');
    layer.className = 'mm-letters';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = '<canvas class="mm-letters-field"></canvas><canvas class="mm-letters-light"></canvas>';
    document.body.prepend(layer);
  }
  const [field, light] = layer.querySelectorAll('canvas');
  const ctx = field.getContext('2d'), lctx = light.getContext('2d');
  const C = LETTERS, pitch = C.size * (1 + C.spacing), s = C.size;

  let W = 0, H = 0, dpr = 1, cols = 0, rows = 0, count = 0;
  let x, y, m, kind, occ, delay, flash, hot, until, next, lock, shown, visible = 0;
  let sprites = [], glow = [];
  const active = new Set();
  let queue = [];   // scheduled ignitions: [time, cell, strength, scramble]
  let clock = 0, last = 0, frame = 0, intro = 0, eggAt = 0, egg = null, px = -1e4, py = -1e4, travel = 0;

  function sprite(shape, color, size, blur = 0) {
    const pad = Math.ceil(blur * 2.2), c = document.createElement('canvas');
    c.width = Math.ceil(size * dpr) + pad * 2; c.height = Math.ceil(size * dpr) + pad * 2;
    const g = c.getContext('2d');
    g.translate(pad + (size * dpr) * (1 - shape.w) / 2, pad);
    g.scale(size * dpr, size * dpr);
    if (blur) { g.shadowColor = color; g.shadowBlur = blur; }
    g.fillStyle = color;
    g.fill(new Path2D(shape.d), 'evenodd');
    return { c, pad };
  }
  function build() {
    W = root.clientWidth || innerWidth; H = innerHeight;
    dpr = Math.min(devicePixelRatio || 1, W * H > 4e6 ? 1.5 : 2);
    for (const c of [field, light]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
    const P = paddingOf(W, H) * W;
    cols = Math.max(1, Math.ceil(P / pitch)); rows = Math.ceil(H / pitch) + 1; count = cols * rows * 2;
    x = new Float32Array(count); y = new Float32Array(count); m = new Float32Array(count);
    kind = new Uint8Array(count); occ = new Uint8Array(count); lock = new Int8Array(count).fill(-1); delay = new Float32Array(count);
    flash = new Float32Array(count); hot = new Float32Array(count); until = new Float32Array(count);
    next = new Float32Array(count); shown = new Float32Array(count).fill(-1);
    for (let side = 0; side < 2; side++) for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = (side * rows + r) * cols + c, edge = (c + 0.5) * pitch;
      x[i] = side ? W - edge : edge; y[i] = (r + 0.5) * pitch;
      // full in the outer part of the margin, gone where the content starts: a gradual, even fade
      m[i] = smooth(0, 0.8, 1 - edge / P);
      // the field is the same on every page: a fixed share of cells holds a glyph, the glyph itself is stable too
      const h = hash(c * 2 + side, r);
      occ[i] = h < C.density ? 1 : 0;
      kind[i] = WORD_KIND[Math.floor(hash(r, c + 911 * side) * WORD.length)];
      delay[i] = hash(r + 37, c * 3 + side) * 0.7;
    }
    visible = 0; for (let i = 0; i < count; i++) if (m[i] > 0.12) visible++;
    sprites = KINDS.map(k => [sprite(SHAPES[k], C.color, s), sprite(SHAPES[k], C.hot, s)]);
    glow = KINDS.map(k => sprite(SHAPES[k], '#ffb877', s, 6 * dpr));
    active.clear(); queue = []; egg = null;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, field.width, field.height);
    lctx.setTransform(1, 0, 0, 1, 0, 0); lctx.clearRect(0, 0, light.width, light.height);
    for (let i = 0; i < count; i++) paint(i);
  }
  // the intro: each cell of the field comes in at its own moment (the same on every page)
  const baseOf = i => occ[i] * C.base * smooth(delay[i], delay[i] + 0.3, intro);
  function paint(i) {
    const a = Math.min(1, Math.max(baseOf(i), flash[i])) * m[i];
    if (Math.abs(a - shown[i]) < 0.004) return;
    shown[i] = a;
    const X = Math.round((x[i] - pitch / 2) * dpr), Y = Math.round((y[i] - pitch / 2) * dpr), P = Math.round(pitch * dpr);
    ctx.clearRect(X, Y, P, P);
    if (a < 0.004) return;
    const sp = sprites[kind[i]][hot[i] > 0.5 ? 1 : 0];
    ctx.globalAlpha = a;
    ctx.drawImage(sp.c, Math.round((x[i] - s / 2) * dpr), Math.round((y[i] - s / 2) * dpr));
    ctx.globalAlpha = 1;
  }
  function cellAt(px, py) {
    const r = Math.floor(py / pitch);
    if (r < 0 || r >= rows) return -1;
    if (px < cols * pitch) return r * cols + Math.floor(px / pitch);
    if (px > W - cols * pitch) return (rows + r) * cols + Math.floor((W - px) / pitch);
    return -1;
  }
  function ignite(i, strength, scramble = rand(0.12, 0.32)) {
    if (i < 0 || i >= count || m[i] < 0.03 || lock[i] >= 0) return;
    flash[i] = Math.max(flash[i], strength);
    until[i] = Math.max(until[i], clock + scramble);
    active.add(i);
  }
  const at = (t, i, strength, scramble) => queue.push([t, i, strength, scramble]);

  // a glitch: a short run of cells along the row, lit one after the other while they scramble (flow)
  function glitch() {
    let i = -1;
    for (let k = 0; k < 6 && i < 0; k++) { const j = Math.floor(Math.random() * count); if (m[j] > 0.12) i = j; }
    if (i < 0) return;
    const run = 1 + Math.floor(Math.random() ** 2 * 7 * C.flow * 2), dir = Math.random() < 0.5 ? -1 : 1, strength = rand(0.45, 0.95);
    const c = i % cols;
    for (let k = 0; k < run; k++) {
      const cc = c + dir * k;
      if (cc < 0 || cc >= cols) break;
      at(clock + k * rand(0.05, 0.09), i - c + cc, strength * (1 - k * 0.06));
    }
  }
  // a click: a ring that tears the field as it runs out
  function burst(bx, by) {
    const { speed, radius } = C.burst;
    for (let i = 0; i < count; i++) {
      const d = Math.hypot(x[i] - bx, y[i] - by);
      if (d > radius || m[i] < 0.03) continue;
      if (Math.random() < 0.55 + 0.45 * (1 - d / radius)) at(clock + d / speed + rand(0, 0.04), i, 0.95 * (1 - 0.7 * d / radius), rand(0.15, 0.4));
    }
  }
  // now and then a run of seven cells decrypts into the logotype; a chain reaction spreads from it through the field
  function startEgg() {
    const vertical = cols < 9, P = C.egg;
    for (let tries = 0; tries < 40; tries++) {
      const side = Math.random() < 0.5 ? 0 : 1;
      const r0 = Math.floor(rand(0.15, 0.85) * rows), c0 = vertical ? Math.floor(rand(0, Math.max(1, cols * 0.6))) : Math.floor(rand(1, cols - 8));
      const cells = WORD.map((_, k) => (side * rows + (vertical ? r0 + k : r0)) * cols + (vertical ? c0 : c0 + (side ? 6 - k : k)));
      if (vertical && r0 + 7 >= rows) continue;
      if (cells.some(i => m[i] < 0.45)) continue;
      // right margin, horizontal: the word still reads left to right
      egg = { cells, t0: clock, locked: 0, done: false };
      for (const i of cells) { flash[i] = Math.max(flash[i], 0.75); until[i] = clock + 2; active.add(i); }
      return;
    }
    eggAt = clock + 3;
  }
  function stepEgg() {
    const e = egg, P = C.egg, scramble = 0.85, each = 0.09;
    const t = clock - e.t0;
    // lock left to right into M Ξ M Ξ N T O, warm cream at full light
    while (e.locked < 7 && t >= scramble + e.locked * each) {
      const i = e.cells[e.locked];
      kind[i] = WORD_KIND[e.locked]; lock[i] = e.locked; hot[i] = 1; flash[i] = 1; until[i] = 0; active.add(i); e.locked++;
      shown[i] = -1;
    }
    if (e.locked === 7 && !e.done) {
      e.done = true; e.t1 = clock;
      // the chain reaction: out from the word, cell to neighbour, thinning with distance, so its shape says where
      const seen = new Map(e.cells.map(i => [i, 0]));
      let front = [...e.cells];
      for (let step = 1; step <= P.reach && front.length; step++) {
        const nextFront = [];
        for (const i of front) {
          const band = Math.floor(i / (rows * cols)), r = Math.floor((i % (rows * cols)) / cols), c = i % cols;
          for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
            if (!dr && !dc) continue;
            const rr = r + dr, cc = c + dc;
            if (rr < 0 || rr >= rows || cc < 0 || cc >= cols) continue;
            const j = (band * rows + rr) * cols + cc;
            if (seen.has(j) || Math.random() > 0.58 - step * 0.018) continue;
            seen.set(j, step); nextFront.push(j);
            at(clock + step * P.step + rand(0, 0.03), j, Math.max(0.25, 0.95 * 0.93 ** step), rand(0.1, 0.25));
          }
        }
        front = nextFront;
      }
    }
    // the word holds, glowing, then lets go and scrambles back into the field
    if (e.done && clock - e.t1 > P.hold) {
      for (const i of e.cells) { lock[i] = -1; hot[i] = 0; shown[i] = -1; until[i] = clock + 0.3; flash[i] = Math.max(flash[i], 0.8); active.add(i); }
      egg = null;
      eggAt = clock + rand(...P.every);
    }
    // its light: a soft glow under the locked glyphs
    lctx.setTransform(1, 0, 0, 1, 0, 0); lctx.clearRect(0, 0, light.width, light.height);
    if (egg) for (const i of e.cells) if (lock[i] >= 0) {
      const g = glow[kind[i]], k = 0.55 + 0.25 * Math.sin((clock - e.t0) * 6);
      lctx.globalAlpha = k * m[i];
      lctx.drawImage(g.c, Math.round((x[i] - s / 2) * dpr) - g.pad, Math.round((y[i] - s / 2) * dpr) - g.pad);
    }
    lctx.globalAlpha = 1;
  }

  function tick(now) {
    frame = 0;
    if (document.hidden) return;
    const dt = Math.min(0.1, last ? (now - last) / 1000 : 0);
    if (dt && dt < 1 / C.fps - 0.004) { frame = requestAnimationFrame(tick); return; }
    last = now; clock += dt;
    if (intro < 1) { intro = Math.min(1, intro + dt / 1.2); for (let i = 0; i < count; i++) if (occ[i]) active.add(i); }
    // glitches: a few runs a second over the visible part of the field
    let n = visible / 1000 * C.rate * (C.glitch / 0.5) * (C.speed / 0.05) * dt;
    while (n > 0) { if (Math.random() < n) glitch(); n -= 1; }
    if (!egg && clock >= eggAt) startEgg();
    if (egg) stepEgg();
    if (queue.length) queue = queue.filter(q => { if (q[0] > clock) return true; ignite(q[1], q[2], q[3]); return false; });
    for (const i of active) {
      if (lock[i] >= 0) { paint(i); continue; }
      if (clock < until[i] && clock >= next[i]) { kind[i] = Math.floor(Math.random() * KINDS.length); next[i] = clock + rand(0.05, 0.1); shown[i] = -1; }
      if (clock >= until[i]) flash[i] *= Math.exp(-dt / 0.45);
      if (flash[i] < 0.01) flash[i] = 0;
      if (hot[i] > 0 && lock[i] < 0) hot[i] = 0;
      paint(i);
      if (!flash[i] && clock >= until[i] && intro >= 1) active.delete(i);
    }
    frame = requestAnimationFrame(tick);
  }
  // the Studio is a 3D room filling the screen: there the field shows only while the page changes (site.css fades it
  // out over the room); once it has faded, it stops drawing
  const covered = () => root.dataset.mementoNative === 'studio' && !root.hasAttribute('data-mm-phase');
  let asleep = covered(), rest = 0;
  new MutationObserver(() => {
    clearTimeout(rest);
    if (covered()) rest = setTimeout(() => { if (covered()) { asleep = true; cancelAnimationFrame(frame); frame = 0; } }, 900);
    else { asleep = false; start(); }
  }).observe(root, { attributes: true, attributeFilter: ['data-mm-phase'] });
  function start() { if (!frame && !asleep && !still() && !document.hidden) { last = 0; frame = requestAnimationFrame(tick); } }

  function resize() {
    const w = root.clientWidth || innerWidth, h = innerHeight;
    if (w === W && Math.abs(h - H) < 2) return;
    build();
  }
  // arriving through the page change, the field is already there (the outgoing page showed it): no intro
  intro = still() || root.hasAttribute('data-mm-arrive') ? 1 : 0;
  eggAt = rand(...C.egg.first);
  build();
  requestAnimationFrame(() => root.setAttribute('data-mm-bg', ''));
  start();

  addEventListener('resize', resize, { passive: true });
  visualViewport?.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); });
  motion.addEventListener?.('change', () => { intro = 1; build(); start(); });
  forced.addEventListener?.('change', () => { layer.hidden = forced.matches; });
  layer.hidden = forced.matches;
  // the pointer stirs the field around it; a click tears it with a ring (touch: a tap)
  addEventListener('pointermove', e => {
    if (still()) return;
    const d = Math.hypot(e.clientX - px, e.clientY - py);
    px = e.clientX; py = e.clientY;
    if (d > 200) return;
    travel += d;
    while (travel > 26) {
      travel -= 26;
      const a = Math.random() * 6.283, r = C.radius * Math.sqrt(Math.random()) * 0.9;
      const i = cellAt(px + Math.cos(a) * r, py + Math.sin(a) * r);
      if (i >= 0 && Math.random() < 1 - (r / C.radius) ** 2) ignite(i, rand(0.35, 0.8));
    }
    start();
  }, { passive: true });
  addEventListener('pointerdown', e => { if (!still()) { burst(e.clientX, e.clientY); start(); } }, { passive: true, capture: true });
  mounted = { layer, rebuild: build };
  return mounted;
}

if (typeof document !== 'undefined') {
  if (document.body) mountLetters();
  else document.addEventListener('DOMContentLoaded', () => mountLetters(), { once: true });
}
