import { VFX } from './config.mjs';
import { rateFor } from './structure.mjs';

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Energy as a chain reaction on a cell network (an excitable medium). A lit cell may light its neighbours a moment
 * later, with a probability set by their zone; every cell then rests and its light decays at its own rate.
 * Generations are capped, so every reaction has a defined end: the light travels across a surface instead of
 * following the pointer as a disc.
 */
export class ChainField {
  constructor(net, profile, rnd = Math.random) {
    const n = net.faces, c = VFX.chain;
    this.net = net; this.profile = profile; this.rnd = rnd;
    this.raw = new Float32Array(n); this.shown = new Float32Array(n);
    /** Presence of the pointer per cell (0..1), eased by the caller: lights the cells the range reaches. */
    this.drive = new Float32Array(n); this.driveLevel = 0;
    this.refract = new Float32Array(n); this.pending = new Uint8Array(n);
    this.rate = new Float32Array(n);
    const rel = profile.release ?? c.release;
    for (let i = 0; i < n; i++) this.rate[i] = rateFor(lerp(rel[0], rel[1], net.seed[i]));
    this.vsum = new Float32Array(net.points);
    this.queue = []; this.time = 0; this.level = 0; this.propagate = true; this.onIgnite = null;
  }

  get active() { return this.queue.length > 0 || this.level > 0.003 || this.driveLevel > 0.003; }

  ignite(cell, strength, gen = 0, delay = 0) {
    if (cell < 0 || this.pending[cell] || strength < 0.03) return;
    this.pending[cell] = 1;
    this.queue.push({ cell, at: this.time + delay, s: Math.min(1, strength), gen });
  }

  nearest(x, y) {
    const { cx, cy, weight, faces } = this.net;
    let best = -1, bd = Infinity;
    for (let i = 0; i < faces; i++) {
      const w = weight[i];
      if (w <= 0) continue;
      const dx = cx[i] - x, dy = cy[i] - y, d = (dx * dx + dy * dy) / (0.15 + 0.85 * w);
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  }

  /** Lights the cell under a point scattered around (x, y): ignitions never repeat the same disc. */
  igniteAt(x, y, jitter, strength, gen = 0) {
    const r = jitter * Math.sqrt(-2 * Math.log(1 - this.rnd() * 0.999)) * 0.6, a = this.rnd() * 6.283;
    this.ignite(this.nearest(x + Math.cos(a) * r, y + Math.sin(a) * r), strength, gen);
  }

  /** Cancelled gesture: no further sparks; what is lit fades on its own. */
  quench() { for (const s of this.queue) this.pending[s.cell] = 0; this.queue.length = 0; }

  step(dt) {
    this.time += dt;
    const { nbStart, nb, cond } = this.net, c = VFX.chain, p = this.profile, rnd = this.rnd, delay = p.delay ?? c.delay;
    if (this.queue.length) {
      const due = [];
      this.queue = this.queue.filter(s => (s.at <= this.time ? (due.push(s), false) : true));
      for (const s of due) {
        const i = s.cell;
        this.pending[i] = 0;
        if (this.refract[i] > 0) continue;
        const e = s.s * (0.5 + 0.5 * cond[i]);
        if (e < 0.03) continue;
        this.raw[i] = Math.max(this.raw[i], e);
        const rest = p.refractory ?? c.refractory;
        this.refract[i] = lerp(rest[0], rest[1], rnd());
        this.onIgnite?.(i, e, s.gen);
        if (!this.propagate || s.gen >= p.maxGen) continue;
        for (let k = nbStart[i]; k < nbStart[i + 1]; k++) {
          const j = nb[k];
          if (this.refract[j] > 0 || this.pending[j]) continue;
          if (rnd() < p.spread * cond[j] * (0.55 + 0.45 * e)) this.ignite(j, e * p.carry, s.gen + 1, lerp(delay[0], delay[1], rnd()));
        }
      }
    }
    const k = 1 - Math.exp(-dt / (p.attack ?? c.attack));
    let level = 0;
    for (let i = 0; i < this.raw.length; i++) {
      let r = this.raw[i];
      if (r > 0) { r *= Math.exp(-dt * this.rate[i]); if (r < 0.01) r = 0; this.raw[i] = r; }
      if (this.refract[i] > 0) this.refract[i] -= dt;
      let v = this.shown[i];
      v = r > v ? v + (r - v) * k : r;
      this.shown[i] = v;
      if (v > level) level = v;
    }
    this.level = level;
  }

  /** Writes [face energy, smoothed vertex energy] for each rendered vertex (faces*3*2). */
  write(out) {
    const { vertexOf, pfStart, pf, points, faces } = this.net, vs = this.vsum, sh = this.shown, dr = this.drive;
    const val = f => (sh[f] > dr[f] ? sh[f] : dr[f]);
    for (let p = 0; p < points; p++) {
      let s = 0, m = 0;
      for (let k = pfStart[p]; k < pfStart[p + 1]; k++) { const v = val(pf[k]); s += v; if (v > m) m = v; }
      const n = pfStart[p + 1] - pfStart[p];
      vs[p] = n ? (s / n) * 0.6 + m * 0.4 : 0;
    }
    for (let f = 0; f < faces; f++) for (let j = 0; j < 3; j++) {
      const o = (f * 3 + j) * 2;
      out[o] = val(f); out[o + 1] = vs[vertexOf[f * 3 + j]];
    }
  }
}
