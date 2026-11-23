import { ChainField, type CellNetwork } from './chain';
import type { ChainProfile } from './config';
import type { BorderLight } from './border';

// A timing field only: no visible front, circle, or blanket surface activation.
export const TOUCH_TRAVEL_MS = 780;
export const TOUCH_LIFE_MS = 2400;
export const TOUCH_POOL = 4;
export const TOUCH_MAX_CELLS = 96;
export const TOUCH_CHAIN: ChainProfile = {
  maxGen: 0, spread: 0, carry: 1,
  delay: [.022, .055], release: [.45, .7], refractory: [.12, .2], attack: .022,
};
export interface TouchWave {
  id: number; x: number; y: number; width: number; height: number; reach: number; start: number;
  frame: number; observed: number;
  /** R16: a desktop hover wave travels through one surface only (its owner); a touch reaches every visible surface */
  scope?: unknown;
  /** R16: strength of the wave's cells (a hover wave is a little softer than a touch) */
  gain?: number;
}
export interface SurfaceRect {
  /** Viewport px of the surface's top-left (flat surfaces). */
  x: number; y: number; w: number; h: number;
  /**
   * LevelUp: local px → viewport px, for surfaces drawn through their own CSS transform (3D carousel boards).
   * Default: x + local x, y + local y.
   */
  map?: (x: number, y: number) => [number, number];
  /** LevelUp: whether a viewport point is visible (inside the surface's clipping container). Default: always. */
  visible?: (x: number, y: number) => boolean;
}
const placer = (rect: SurfaceRect) => rect.map ?? ((x: number, y: number): [number, number] => [rect.x + x, rect.y + y]);
export interface TouchSeed { cell: number; at: number; strength: number }
const noise = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };

export function touchArrival(w: TouchWave, x: number, y: number, seed = 0) {
  const dx = x - w.x, dy = y - w.y, distance = Math.hypot(dx, dy);
  const bend = 1 + .14 * Math.sin(Math.atan2(dy, dx) * 3 + w.id * 1.7);
  return w.start + Math.max(0, Math.min(900, distance / w.reach * TOUCH_TRAVEL_MS * bend + (noise(seed + w.id) - .5) * 130));
}

/** Connected, irregular paths through the existing triangulation, with short side branches. */
export function planTouchSeeds(net: CellNetwork, rect: SurfaceRect, wave: TouchWave): TouchSeed[] {
  const eligible: number[] = [];
  const allowed = new Uint8Array(net.faces);
  // viewport position of every cell (through the surface's own transform, when it has one)
  const place = placer(rect), sx = new Float32Array(net.faces), sy = new Float32Array(net.faces);
  for (let cell = 0; cell < net.faces; cell++) {
    const [x, y] = place(net.cx[cell], net.cy[cell]);
    sx[cell] = x; sy[cell] = y;
    if (net.weight[cell] <= .015 || x < 0 || y < 0 || x > wave.width || y > wave.height || (rect.visible && !rect.visible(x, y))) continue;
    allowed[cell] = 1;
    if (net.weight[cell] >= .2) eligible.push(cell);
  }
  if (!eligible.length) return [];
  // local px (corners of the surface) or viewport px (the contact point)
  const nearest = (x: number, y: number, cells = eligible, screen = false) => cells.reduce((best, cell) => {
    const score = (i: number) => Math.hypot((screen ? sx[i] : net.cx[i]) - x, (screen ? sy[i] : net.cy[i]) - y) / (.6 + .4 * net.weight[i]);
    return score(cell) < score(best) ? cell : best;
  }, cells[0]);
  const root = nearest(wave.x, wave.y, eligible, true);
  const parent = new Int32Array(net.faces).fill(-1), depth = new Uint16Array(net.faces);
  const queue = [root]; parent[root] = root;
  // Breadth-first adjacency walk is linear in the mesh size. Tie order changes per contact.
  for (let head = 0; head < queue.length; head++) {
    const cell = queue[head], a = net.nbStart[cell], count = net.nbStart[cell + 1] - a;
    const turn = Math.floor(noise(cell + wave.id * 19) * count);
    for (let k = 0; k < count; k++) {
      const next = net.nb[a + (k + turn) % count];
      if (!allowed[next] || parent[next] !== -1) continue;
      parent[next] = cell; depth[next] = depth[cell] + 1; queue.push(next);
    }
  }
  const reachable = eligible.filter(cell => parent[cell] !== -1);
  const selected = new Set<number>([root]);
  const budget = Math.min(TOUCH_MAX_CELLS, Math.max(20, Math.ceil(eligible.length * .2)));
  const corners = [[0, 0], [rect.w, 0], [rect.w, rect.h], [0, rect.h]];
  // Edge endpoints make the pulse enter/leave a board and visibly feed its rim light.
  for (const [x, y] of corners) {
    let cell = nearest(x, y, reachable), path: number[] = [];
    while (!selected.has(cell) && parent[cell] !== cell) { path.push(cell); cell = parent[cell]; }
    for (const next of path.reverse()) { if (selected.size >= budget) break; selected.add(next); }
  }
  // Isolated glyph islands get their own timed root; the arrival still follows the viewport travel.
  for (const cell of eligible) if (parent[cell] === -1 && selected.size < budget && noise(cell + wave.id) > .94) selected.add(cell);
  for (const cell of [...selected]) {
    if (selected.size >= budget || noise(cell * 3.7 + wave.id) < .58) continue;
    for (let k = net.nbStart[cell]; k < net.nbStart[cell + 1]; k++) {
      const next = net.nb[k];
      if (allowed[next] && !selected.has(next) && selected.size < budget) selected.add(next);
    }
  }
  const base = Math.max(wave.start, wave.observed) + (touchArrival(wave, sx[root], sy[root], net.seed[root]) - wave.start);
  return [...selected].map(cell => ({ cell,
    at: parent[cell] === -1 ? touchArrival(wave, sx[cell], sy[cell], net.seed[cell]) : base + depth[cell] * 23 + noise(cell + wave.id * 7) * 28,
    strength: (.88 + .12 * noise(net.seed[cell] * 73 + wave.id)) * (wave.gain ?? 1),
  })).sort((a, b) => a.at - b.at);
}

export class TouchPulseField {
  readonly waves: TouchWave[] = [];
  started = 0;
  frame = 0;
  get active() { return this.waves.length > 0; }
  start(x: number, y: number, width: number, height: number, now: number, scope?: unknown, gain = 1) {
    this.update(now);
    const wave: TouchWave = { id: ++this.started, x, y, width, height, start: now, frame: 0, observed: now, scope, gain,
      reach: Math.max(1, Math.hypot(Math.max(x, width - x), Math.max(y, height - y))) };
    if (this.waves.length >= TOUCH_POOL) this.waves.shift();
    this.waves.push(wave);
    return wave;
  }
  update(now: number) {
    let keep = 0;
    for (const w of this.waves) if (now - w.start < TOUCH_LIFE_MS) this.waves[keep++] = w;
    this.waves.length = keep;
  }
  clear() { this.waves.length = 0; }
  beginFrame(now: number) {
    this.update(now); this.frame++;
    for (const wave of this.waves) if (!wave.frame) { wave.frame = this.frame; wave.observed = now; }
  }
}

/** Independent short-lived energy preserves the original slow mouse/loading chain. */
export class TouchReaction {
  readonly chain: ChainField;
  readonly energy: Float32Array;
  private seen = 0;
  private pending: TouchSeed[] = [];
  /** R16: the surface this reaction belongs to: hover waves scoped to another surface pass by */
  owner?: unknown;
  constructor(readonly net: CellNetwork, random?: () => number) {
    this.chain = new ChainField({ ...net, cond: new Float32Array(net.faces) }, TOUCH_CHAIN, random);
    this.energy = new Float32Array(net.faces * 6);
  }
  get active() { return this.pending.length > 0 || this.chain.active; }
  get level() { return this.chain.level; }
  step(field: TouchPulseField, rect: SurfaceRect, now: number, dt: number) {
    for (const w of field.waves) {
      if (w.id <= this.seen) continue;
      this.seen = w.id;
      if (w.scope !== undefined && w.scope !== this.owner) continue;
      for (let i = 0; i < this.net.faces; i++) this.chain.net.cond[i] = this.net.weight[i] > .015 ? .85 + .15 * this.net.cond[i] : 0;
      // One opportunity per rendered frame, not a 100 ms deadline that slow phones can miss.
      if (w.frame === field.frame && w.frame > 0) this.pending.push(...planTouchSeeds(this.net, rect, w));
    }
    if (this.pending.length > TOUCH_POOL * TOUCH_MAX_CELLS) this.pending.splice(0, this.pending.length - TOUCH_POOL * TOUCH_MAX_CELLS);
    let keep = 0;
    const place = placer(rect);
    for (const seed of this.pending) {
      if (seed.at > now) { this.pending[keep++] = seed; continue; }
      const [x, y] = place(this.net.cx[seed.cell], this.net.cy[seed.cell]);
      if (y >= 0 && y <= (field.waves.at(-1)?.height ?? 0) && (!rect.visible || rect.visible(x, y))) this.chain.ignite(seed.cell, seed.strength);
    }
    this.pending.length = keep;
    if (this.chain.active) this.chain.step(dt);
  }
  merge(out: Float32Array) {
    this.chain.write(this.energy);
    for (let i = 0; i < out.length; i++) out[i] = Math.max(out[i], this.energy[i]);
  }
  feedBorder(border: BorderLight, edges: readonly { cell: number; s: number; w: number }[]) {
    for (const edge of edges) {
      const energy = this.chain.shown[edge.cell] * edge.w;
      if (energy > .02) border.add(edge.s, energy * 1.65, 2.2);
    }
  }
  clear() {
    this.pending.length = 0; this.chain.quench();
    this.chain.raw.fill(0); this.chain.shown.fill(0); this.chain.level = 0;
  }
}

/** One passive contact event. Release and scroll cancellation never duplicate the reaction. */
export function listenForTouch(target: EventTarget, start: (x: number, y: number) => void, signal: AbortSignal) {
  target.addEventListener('pointerdown', event => {
    const e = event as PointerEvent;
    if (e.composedPath().some(node => node instanceof Element && node.localName === 'memento-nav')) return;
    if (e.pointerType === 'touch' || e.pointerType === 'pen') start(e.clientX, e.clientY);
  }, { capture: true, passive: true, signal });
}
