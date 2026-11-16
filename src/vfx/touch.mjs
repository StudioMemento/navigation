import { ChainField } from './chain.mjs';

/**
 * Touch, as in START V27 (src/vfx/touch.ts): a timing field only. One contact schedules connected, irregular paths
 * through each surface's existing cells, arriving with the distance from the finger; most cells stay dark, the edge
 * cells feed the edge glow, every cell dies in about half a second. No circle, no surface lit as a whole, no hover fed
 * by a held finger.
 *
 * NAV: a surface is a network in its own px (a card, or a title block) on a plane in perspective. Planning therefore
 * takes the touch point in network px and the screen position of every cell, projected once per contact.
 */
export const TOUCH_TRAVEL_MS = 780;
export const TOUCH_LIFE_MS = 2400;
export const TOUCH_POOL = 4;
export const TOUCH_MAX_CELLS = 96;
export const TOUCH_CHAIN = Object.freeze({
  maxGen: 0, spread: 0, carry: 1,
  delay: [0.022, 0.055], release: [0.45, 0.7], refractory: [0.12, 0.2], attack: 0.022,
});
const noise = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };

/** Arrival time (ms) of a contact at a screen point: distance over the viewport, slightly bent, never uniform. */
export function touchArrival(w, x, y, seed = 0) {
  const dx = x - w.x, dy = y - w.y, distance = Math.hypot(dx, dy);
  const bend = 1 + 0.14 * Math.sin(Math.atan2(dy, dx) * 3 + w.id * 1.7);
  return w.start + Math.max(0, Math.min(900, (distance / w.reach) * TOUCH_TRAVEL_MS * bend + (noise(seed + w.id) - 0.5) * 130));
}

/**
 * Connected paths through the triangulation with short side branches.
 * `place`: { lx, ly } touch point in network px, { w, h } network size, { sx, sy } screen px of every cell.
 */
export function planTouchSeeds(net, place, wave) {
  const eligible = [], allowed = new Uint8Array(net.faces), { sx, sy } = place;
  for (let cell = 0; cell < net.faces; cell++) {
    const x = sx[cell], y = sy[cell];
    if (net.weight[cell] <= 0.015 || !(x >= 0 && y >= 0 && x <= wave.width && y <= wave.height)) continue;
    allowed[cell] = 1;
    if (net.weight[cell] >= 0.2) eligible.push(cell);
  }
  if (!eligible.length) return [];
  const score = (i, x, y) => Math.hypot(net.cx[i] - x, net.cy[i] - y) / (0.6 + 0.4 * net.weight[i]);
  const nearest = (x, y, cells = eligible) => cells.reduce((best, cell) => (score(cell, x, y) < score(best, x, y) ? cell : best), cells[0]);
  const root = nearest(place.lx, place.ly);
  const parent = new Int32Array(net.faces).fill(-1), depth = new Uint16Array(net.faces);
  const queue = [root]; parent[root] = root;
  // breadth-first adjacency walk, linear in the mesh; tie order changes per contact
  for (let head = 0; head < queue.length; head++) {
    const cell = queue[head], a = net.nbStart[cell], count = net.nbStart[cell + 1] - a;
    const turn = Math.floor(noise(cell + wave.id * 19) * count);
    for (let k = 0; k < count; k++) {
      const next = net.nb[a + ((k + turn) % count)];
      if (!allowed[next] || parent[next] !== -1) continue;
      parent[next] = cell; depth[next] = depth[cell] + 1; queue.push(next);
    }
  }
  const reachable = eligible.filter(cell => parent[cell] !== -1);
  const selected = new Set([root]);
  const budget = Math.min(TOUCH_MAX_CELLS, Math.max(20, Math.ceil(eligible.length * 0.2)));
  // edge endpoints: the pulse enters and leaves a board and visibly feeds its rim light
  for (const [x, y] of [[0, 0], [place.w, 0], [place.w, place.h], [0, place.h]]) {
    let cell = nearest(x, y, reachable);
    const path = [];
    while (!selected.has(cell) && parent[cell] !== cell) { path.push(cell); cell = parent[cell]; }
    for (const next of path.reverse()) { if (selected.size >= budget) break; selected.add(next); }
  }
  // isolated glyph islands get their own timed root; the arrival still follows the viewport travel
  for (const cell of eligible) if (parent[cell] === -1 && selected.size < budget && noise(cell + wave.id) > 0.94) selected.add(cell);
  for (const cell of [...selected]) {
    if (selected.size >= budget || noise(cell * 3.7 + wave.id) < 0.58) continue;
    for (let k = net.nbStart[cell]; k < net.nbStart[cell + 1]; k++) {
      const next = net.nb[k];
      if (allowed[next] && !selected.has(next) && selected.size < budget) selected.add(next);
    }
  }
  const base = Math.max(wave.start, wave.observed) + (touchArrival(wave, sx[root], sy[root], net.seed[root]) - wave.start);
  return [...selected].map(cell => ({
    cell,
    at: parent[cell] === -1 ? touchArrival(wave, sx[cell], sy[cell], net.seed[cell]) : base + depth[cell] * 23 + noise(cell + wave.id * 7) * 28,
    strength: 0.88 + 0.12 * noise(net.seed[cell] * 73 + wave.id),
  })).sort((a, b) => a.at - b.at);
}

/** At most four contacts in memory; each lives 2.4 s. */
export class TouchPulseField {
  constructor() { this.waves = []; this.started = 0; this.frame = 0; }
  get active() { return this.waves.length > 0; }
  start(x, y, width, height, now) {
    this.update(now);
    const wave = { id: ++this.started, x, y, width, height, start: now, frame: 0, observed: now,
      reach: Math.max(1, Math.hypot(Math.max(x, width - x), Math.max(y, height - y))) };
    if (this.waves.length >= TOUCH_POOL) this.waves.shift();
    this.waves.push(wave);
    return wave;
  }
  update(now) {
    let keep = 0;
    for (const w of this.waves) if (now - w.start < TOUCH_LIFE_MS) this.waves[keep++] = w;
    this.waves.length = keep;
  }
  clear() { this.waves.length = 0; }
  /** A contact is acquired on the first rendered frame after it (no deadline a slow phone can miss). */
  beginFrame(now) {
    this.update(now); this.frame++;
    for (const wave of this.waves) if (!wave.frame) { wave.frame = this.frame; wave.observed = now; }
  }
}

/** Independent short-lived energy over a surface's network: the slow pointer and loading chain stays untouched. */
export class TouchReaction {
  constructor(net, random) {
    this.net = net;
    this.chain = new ChainField({ ...net, cond: new Float32Array(net.faces) }, TOUCH_CHAIN, random);
    this.energy = new Float32Array(net.faces * 6);
    this.seen = 0; this.pending = [];
  }
  get active() { return this.pending.length > 0 || this.chain.active; }
  get level() { return this.chain.level; }
  /**
   * `placeOf(wave)` returns the placement used to plan (see planTouchSeeds); `yOf(cell)` the cell's current screen y.
   * Surfaces not stepped on the frame a contact is acquired (off screen) never replay it later.
   */
  step(field, placeOf, yOf, now, dt) {
    for (const w of field.waves) {
      if (w.id <= this.seen) continue;
      this.seen = w.id;
      for (let i = 0; i < this.net.faces; i++) this.chain.net.cond[i] = this.net.weight[i] > 0.015 ? 0.85 + 0.15 * this.net.cond[i] : 0;
      if (w.frame === field.frame && w.frame > 0) this.pending.push(...planTouchSeeds(this.net, placeOf(w), w));
    }
    if (this.pending.length > TOUCH_POOL * TOUCH_MAX_CELLS) this.pending.splice(0, this.pending.length - TOUCH_POOL * TOUCH_MAX_CELLS);
    const height = field.waves.at(-1)?.height ?? 0;
    let keep = 0;
    for (const seed of this.pending) {
      if (seed.at > now) { this.pending[keep++] = seed; continue; }
      const y = yOf(seed.cell);
      if (y >= 0 && y <= height) this.chain.ignite(seed.cell, seed.strength);
    }
    this.pending.length = keep;
    if (this.chain.active) this.chain.step(dt);
  }
  merge(out) {
    this.chain.write(this.energy);
    for (let i = 0; i < out.length; i++) out[i] = Math.max(out[i], this.energy[i]);
  }
  feedBorder(border, edges) {
    for (const edge of edges) {
      const energy = this.chain.shown[edge.cell] * edge.w;
      if (energy > 0.02) border.add(edge.s, energy * 1.65, 2.2);
    }
  }
  clear() {
    this.pending.length = 0; this.chain.quench();
    this.chain.raw.fill(0); this.chain.shown.fill(0); this.chain.level = 0;
  }
}

/** One passive contact event (touch or pen). Release and scroll cancellation never duplicate the reaction. */
export function listenForTouch(target, start, signal) {
  target.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch' || e.pointerType === 'pen') start(e.clientX, e.clientY);
  }, { capture: true, passive: true, signal });
}
