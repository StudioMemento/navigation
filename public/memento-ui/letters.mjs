// R20: the background of the site. A calm field of the Memento logotype's own glyphs (M Ξ M Ξ N T O, vector, from
// DEV_20_Typo.svg) that flicker, scramble and glitch, stirred by the pointer, after the Letter Glitch of React Bits'
// Background Studio (preset "pixel": size 8, spacing 0.5, density 0.25, base opacity 0.1, speed 0.05, flow 0.5, cursor
// radius 400, click effect burst).
//
// At rest it lives in the margins of the page (padding.mjs: 10 / 15 / 20 / 30% of the width on each side).
// R21: the fade begins inside the margin and ends a little past the padding line, into the content: no edge shows where
// the field stops. The glyphs are #FF7950, the site's one orange, lit cells take its light variant.
// R21: a click (a tap) and a decrypted word send one impulse through the whole viewport: a chain of cells, each lit at
// a random strength as the front reaches it, fading after its crest at its own pace, back to rest. The front is torn by
// a slow noise and the cells are sparse, so it never reads as a disc or a flashing screen (DNA: "mai un disco").
// Now and then a run of seven cells decrypts into the logotype: the impulse leaves from there, so it says where.
//
// One fixed layer under the page, two 2D canvases: the field (only the cells that change are painted again) and the
// light of a decrypted word. At most 30 frames a second; it stops with the tab hidden, stays still with reduced motion
// or ?vfx=off, and keeps going through the page change (scene-head: it rises above the change while it runs and is its
// own view-transition group, so only the content changes).
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
  /** R21: the site's orange and its light variant (site.css --memento-accent, --memento-accent-light) */
  color: '#ff7950', hot: '#ffa94d',
  /** glitch runs per second for every 1000 visible cells (speed 0.05, glitch amount 0.5) */
  rate: 5,
  /** R21: the fade, in shares of the margin P: full up to `from`·P from the screen's edge, gone at `to`·P (past P) */
  fade: { from: 0.4, to: 1.3, min: 20 },
  /**
   * R21: the impulse of a click or of a decrypted word, through the whole viewport. `speed` of the front (px/s),
   * `share` of the cells it lights (glyph cells, empty cells), their `strength`, how it weakens with distance (`far`),
   * how much shows over the content (`content`), the `rise` and `fall` of each cell (s), the share of `hot` crests, the
   * `tear` of the front (share of the distance) and the `grain` of that noise (px). `gap`: clicks closer than this
   * (s) belong to the same impulse.
   */
  wave: { speed: 1150, share: [0.62, 0.2], strength: [0.28, 0.8], far: 0.55, content: 0.45, rise: 0.1, fall: [0.38, 0.7],
    hot: 0.06, tear: 0.22, grain: 260, gap: 0.25, max: 3 },
  /** seconds between two decrypted words (the first one sooner), how long the word holds lit (s) */
  egg: { first: [7, 13], every: [16, 30], hold: 1.7 },
  fps: 30,
});

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const smoother = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * t * (t * (t * 6 - 15) + 10); };
const rand = (a, b) => a + Math.random() * (b - a);
/** A stable hash of a cell: the same field on every page, so the page change never shows a different background. */
function hash(i, j) {
  let h = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul((j + 0x632be5ab) | 0, 0xc2b2ae35);
  h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}
/** Slow value noise (0..1): it tears the front of an impulse so it is never a circle. */
function noise(x, y, seed) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash(xi + seed, yi), b = hash(xi + 1 + seed, yi), c = hash(xi + seed, yi + 1), d = hash(xi + 1 + seed, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** The share of the field shown at `d` px from the nearest side of the screen, with margins of P px (R21). */
export function fieldMask(d, P, fade = LETTERS.fade) {
  return 1 - smoother(fade.from * P, Math.max(P + fade.min, fade.to * P), d);
}

let mounted = null;
export function mountLetters() {
  if (mounted || typeof document === 'undefined') return mounted;
  // R22: every page runs it inline right after its layer (scene-head lettersLayer), so it draws from the first frame:
  // one field per page, whichever copy comes first
  if (window.__mementoLetters) return (mounted = window.__mementoLetters);
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

  let W = 0, H = 0, dpr = 1, cols = 0, rows = 0, count = 0, ox = 0;
  // per cell: position, mask, glyph, glyph cell or not, intro delay; local light (glitch, pointer, word) and the light
  // of the impulse (its start, strength and fall); scramble until / next change; the word's lock; what is painted
  let x, y, m, kind, occ, delay, flash, hot, until, next, lock, shown, wt, wa, wf, wh;
  let margin = new Int32Array(0);   // the cells of the margins (where the field shows at rest)
  let sprites = [], glow = [];
  const active = new Set();
  let queue = [];   // scheduled local ignitions: [time, cell, strength, scramble]
  let waves = [];   // impulses running: { order, time, amp, at }
  let clock = 0, last = 0, frame = 0, frameAt = 0, intro = 0, eggAt = 0, egg = null, px = -1e4, py = -1e4, travel = 0, gain = C.wave.content;

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
    // R21: the field covers the whole viewport (the impulse runs through all of it); at rest only the margins show
    cols = Math.max(1, Math.ceil(W / pitch)); rows = Math.ceil(H / pitch) + 1; count = cols * rows;
    ox = (W - cols * pitch) / 2;
    x = new Float32Array(count); y = new Float32Array(count); m = new Float32Array(count);
    kind = new Uint8Array(count); occ = new Uint8Array(count); lock = new Int8Array(count).fill(-1); delay = new Float32Array(count);
    flash = new Float32Array(count); hot = new Float32Array(count); until = new Float32Array(count);
    next = new Float32Array(count); shown = new Float32Array(count).fill(-1);
    wt = new Float32Array(count).fill(-1); wa = new Float32Array(count); wf = new Float32Array(count); wh = new Uint8Array(count);
    const list = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      x[i] = ox + (c + 0.5) * pitch; y[i] = (r + 0.5) * pitch;
      m[i] = fieldMask(Math.min(x[i], W - x[i]), P);
      // the field is the same on every page: a fixed share of cells holds a glyph, the glyph itself is stable too
      // (hashed from the distance to the nearest side, so the two margins mirror the same pattern at any width)
      const side = x[i] < W / 2 ? 0 : 1, cc = side ? cols - 1 - c : c;
      const h = hash(cc * 2 + side, r);
      occ[i] = h < C.density ? 1 : 0;
      kind[i] = WORD_KIND[Math.floor(hash(r, cc + 911 * side) * WORD.length)];
      delay[i] = hash(r + 37, cc * 3 + side) * 0.7;
      if (m[i] > 0.12) list.push(i);
    }
    margin = Int32Array.from(list);
    sprites = KINDS.map(k => [sprite(SHAPES[k], C.color, s), sprite(SHAPES[k], C.hot, s)]);
    glow = KINDS.map(k => sprite(SHAPES[k], C.hot, s, 6 * dpr));
    active.clear(); queue = []; waves = []; egg = null;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, field.width, field.height);
    lctx.setTransform(1, 0, 0, 1, 0, 0); lctx.clearRect(0, 0, light.width, light.height);
    for (let i = 0; i < count; i++) if (m[i] > 0.003) paint(i);
  }
  // the intro: each cell of the field comes in at its own moment (the same on every page)
  const baseOf = i => occ[i] * C.base * smooth(delay[i], delay[i] + 0.3, intro);
  /** the light of the impulse on a cell now: a short rise to its crest, then its own exponential fall */
  function waveOf(i) {
    if (wt[i] < 0) return 0;
    const u = clock - wt[i];
    if (u < 0) return 0;
    return wa[i] * (u < C.wave.rise ? smooth(0, C.wave.rise, u) : Math.exp(-(u - C.wave.rise) / wf[i]));
  }
  function paint(i) {
    const w = waveOf(i);
    const a = Math.min(1, Math.max(Math.max(baseOf(i), flash[i]) * m[i], w * Math.max(m[i], gain)));
    // R21: a light that changes by less than a step is not painted again (the fall of an impulse is long)
    if (Math.abs(a - shown[i]) < (a > shown[i] ? 0.004 : 0.012) && a > 0.004) return;
    if (a <= 0.004 && shown[i] <= 0.004 && shown[i] >= 0) return;
    shown[i] = a;
    const X = Math.round((x[i] - pitch / 2) * dpr), Y = Math.round((y[i] - pitch / 2) * dpr), P = Math.round(pitch * dpr);
    ctx.clearRect(X, Y, P, P);
    if (a <= 0.004) return;
    const sp = sprites[kind[i]][hot[i] > 0.5 || (wh[i] && w > 0.25) ? 1 : 0];
    ctx.globalAlpha = a;
    ctx.drawImage(sp.c, Math.round((x[i] - s / 2) * dpr), Math.round((y[i] - s / 2) * dpr));
    ctx.globalAlpha = 1;
  }
  function cellAt(qx, qy) {
    const r = Math.floor(qy / pitch), c = Math.floor((qx - ox) / pitch);
    return r < 0 || r >= rows || c < 0 || c >= cols ? -1 : r * cols + c;
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
    if (!margin.length) return;
    const i = margin[Math.floor(Math.random() * margin.length)];
    const run = 1 + Math.floor(Math.random() ** 2 * 7 * C.flow * 2), dir = Math.random() < 0.5 ? -1 : 1, strength = rand(0.45, 0.95);
    const c = i % cols;
    for (let k = 0; k < run; k++) {
      const cc = c + dir * k;
      if (cc < 0 || cc >= cols) break;
      at(clock + k * rand(0.05, 0.09), i - c + cc, strength * (1 - k * 0.06));
    }
  }
  /**
   * R21: one impulse from (bx, by) through the whole viewport. Each cell it lights is reached when the front, slowed
   * and sped by a slow noise and a little jitter, gets there; it rises to a random crest and falls at its own pace.
   */
  function impulse(bx, by, power = 1) {
    const V = C.wave, now = clock;
    const recent = waves.find(w => now - w.time < V.gap);
    if (recent || waves.length >= V.max) return;
    const far = Math.max(Math.hypot(bx, by), Math.hypot(W - bx, by), Math.hypot(bx, H - by), Math.hypot(W - bx, H - by)) || 1;
    const seed = Math.floor(Math.random() * 1e6), cells = [], times = [];
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (r > V.share[occ[i] ? 0 : 1] * power) continue;
      const d = Math.hypot(x[i] - bx, y[i] - by);
      const torn = d * (1 + V.tear * (noise(x[i] / V.grain, y[i] / V.grain, seed) * 2 - 1)) + rand(-12, 12);
      cells.push(i); times.push(Math.max(0, torn) / V.speed);
    }
    const order = Int32Array.from(cells.map((_, k) => k)).sort((a, b) => times[a] - times[b]);
    const amp = new Float32Array(cells.length), when = new Float32Array(cells.length), idx = new Int32Array(cells.length);
    order.forEach((k, n) => {
      const i = cells[k], d = Math.hypot(x[i] - bx, y[i] - by) / far;
      idx[n] = i; when[n] = now + times[k];
      amp[n] = rand(...V.strength) * (1 - V.far * d) * Math.min(1, power);
    });
    waves.push({ idx, when, amp, at: 0, time: now });
  }
  function stepWaves() {
    const V = C.wave;
    waves = waves.filter(w => {
      while (w.at < w.idx.length && w.when[w.at] <= clock) {
        const i = w.idx[w.at], a = w.amp[w.at];
        // a cell already lit by another impulse keeps the brighter of the two
        if (a > waveOf(i)) {
          wt[i] = w.when[w.at]; wa[i] = a; wf[i] = V.fall[0] + (V.fall[1] - V.fall[0]) * hash(i, 71);
          wh[i] = Math.random() < V.hot ? 1 : 0;
          if (lock[i] < 0 && Math.random() < 0.5) { until[i] = Math.max(until[i], clock + rand(0.08, 0.22)); }
          active.add(i);
        }
        w.at++;
      }
      return w.at < w.idx.length;
    });
  }
  // now and then a run of seven cells decrypts into the logotype; the impulse leaves from it
  function startEgg() {
    // how many columns of the margin show the field (the same on both sides)
    let band = 0;
    while (band < cols / 2 && m[band] > 0.12) band++;
    const vertical = band < 9;
    for (let tries = 0; tries < 40; tries++) {
      const side = Math.random() < 0.5 ? 0 : 1;
      const r0 = Math.floor(rand(0.15, 0.85) * rows), inner = vertical ? Math.floor(rand(0, Math.max(1, band * 0.6))) : Math.floor(rand(1, Math.max(2, band - 8)));
      if (vertical && r0 + 7 >= rows) continue;
      // the right margin reads left to right too: columns counted from the screen's edge on each side
      const colOf = k => side ? cols - 1 - inner - (vertical ? 0 : 6 - k) : inner + (vertical ? 0 : k);
      const cells = WORD.map((_, k) => (vertical ? r0 + k : r0) * cols + colOf(k));
      if (cells.some(i => i < 0 || i >= count || m[i] < 0.45)) continue;
      egg = { cells, t0: clock, locked: 0, done: false };
      for (const i of cells) { flash[i] = Math.max(flash[i], 0.75); until[i] = clock + 2; active.add(i); }
      return;
    }
    eggAt = clock + 3;
  }
  function stepEgg() {
    const e = egg, P = C.egg, scramble = 0.85, each = 0.09;
    const t = clock - e.t0;
    // lock left to right into M Ξ M Ξ N T O, in the light variant at full light
    while (e.locked < 7 && t >= scramble + e.locked * each) {
      const i = e.cells[e.locked];
      kind[i] = WORD_KIND[e.locked]; lock[i] = e.locked; hot[i] = 1; flash[i] = 1; until[i] = 0; active.add(i); e.locked++;
      shown[i] = -1;
    }
    if (e.locked === 7 && !e.done) {
      e.done = true; e.t1 = clock;
      // R21: the impulse leaves from the word and runs through the whole viewport: something happened, here
      const mid = e.cells[3];
      impulse(x[mid], y[mid], 1.15);
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
    frame = 0; frameAt = performance.now();
    if (document.hidden) return;
    const dt = Math.min(0.1, last ? (now - last) / 1000 : 0);
    if (dt && dt < 1 / C.fps - 0.004) { frame = requestAnimationFrame(tick); return; }
    last = now; clock += dt;
    // during the page change the field rises over it (scene-head): the impulse then stays in the margins
    gain = root.hasAttribute('data-mm-phase') ? 0 : C.wave.content;
    if (intro < 1) { intro = Math.min(1, intro + dt / 1.2); for (const i of margin) if (occ[i]) active.add(i); }
    // glitches: a few runs a second over the visible part of the field
    let n = margin.length / 1000 * C.rate * (C.glitch / 0.5) * (C.speed / 0.05) * dt;
    while (n > 0) { if (Math.random() < n) glitch(); n -= 1; }
    if (!egg && clock >= eggAt) startEgg();
    if (egg) stepEgg();
    if (queue.length) queue = queue.filter(q => { if (q[0] > clock) return true; ignite(q[1], q[2], q[3]); return false; });
    if (waves.length) stepWaves();
    for (const i of active) {
      if (lock[i] >= 0) { paint(i); continue; }
      if (clock < until[i] && clock >= next[i]) { kind[i] = Math.floor(Math.random() * KINDS.length); next[i] = clock + rand(0.05, 0.1); shown[i] = -1; }
      if (clock >= until[i]) flash[i] *= Math.exp(-dt / 0.45);
      if (flash[i] < 0.01) flash[i] = 0;
      if (hot[i] > 0 && lock[i] < 0) hot[i] = 0;
      const w = waveOf(i);
      if (wt[i] >= 0 && clock > wt[i] + C.wave.rise && w < 0.006) { wt[i] = -1; wa[i] = 0; wh[i] = 0; }
      paint(i);
      if (!flash[i] && wt[i] < 0 && clock >= until[i] && intro >= 1) active.delete(i);
    }
    frame = requestAnimationFrame(tick);
  }
  function start() {
    // R21: a frame asked for before the page was frozen or cached may never come: ask again after a second without one
    if (frame && !document.hidden && performance.now() - frameAt > 1000) { cancelAnimationFrame(frame); frame = 0; }
    if (!frame && !still() && !document.hidden) { last = 0; frame = requestAnimationFrame(tick); }
  }
  const halt = () => { cancelAnimationFrame(frame); frame = 0; };

  function resize() {
    const w = root.clientWidth || innerWidth, h = innerHeight;
    if (w === W && Math.abs(h - H) < 2) return;
    build();
  }
  // arriving through the page change, the field is already there (the outgoing page showed it): no intro. Coming from
  // Studio, which has no field, it appears as on a first visit
  const from = (() => { try { return new URL(window.navigation?.activation?.from?.url || document.referrer).pathname; } catch { return ''; } })();
  intro = still() || (root.hasAttribute('data-mm-arrive') && !/^\/(studio|memento)(\/|$)/.test(from)) ? 1 : 0;
  eggAt = rand(...C.egg.first);
  build();
  requestAnimationFrame(() => root.setAttribute('data-mm-bg', ''));
  start();

  addEventListener('resize', resize, { passive: true });
  visualViewport?.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) halt(); else start(); });
  addEventListener('pagehide', halt);
  addEventListener('pageshow', start);
  document.addEventListener('freeze', halt);
  document.addEventListener('resume', start);
  motion.addEventListener?.('change', () => { intro = 1; build(); start(); });
  forced.addEventListener?.('change', () => { layer.hidden = forced.matches; });
  layer.hidden = forced.matches;
  // the pointer stirs the field around it (in the margins); a click or a tap sends one impulse through the viewport
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
  // R22: a click with the mouse at once, a tap on touch when the finger lifts without having scrolled; never on a link
  // (the page change is on its way, with its own movement)
  let tap = null;
  const onLink = e => e.composedPath().some(n => n instanceof HTMLAnchorElement || n?.localName === 'button');
  addEventListener('pointerdown', e => {
    if (still() || onLink(e)) { tap = null; return; }
    if (e.pointerType === 'mouse') { impulse(e.clientX, e.clientY); start(); tap = null; }
    else tap = { x: e.clientX, y: e.clientY, t: performance.now() };
  }, { passive: true, capture: true });
  addEventListener('pointerup', e => {
    if (!tap || Math.hypot(e.clientX - tap.x, e.clientY - tap.y) > 12 || performance.now() - tap.t > 450) { tap = null; return; }
    tap = null; impulse(e.clientX, e.clientY); start();
  }, { passive: true, capture: true });
  addEventListener('pointercancel', () => { tap = null; }, { passive: true, capture: true });
  mounted = { layer, rebuild: build, impulse: (bx, by) => { impulse(bx, by); start(); } };
  window.__mementoLetters = mounted;
  return mounted;
}

if (typeof document !== 'undefined') {
  if (document.body) mountLetters();
  else document.addEventListener('DOMContentLoaded', () => mountLetters(), { once: true });
}
