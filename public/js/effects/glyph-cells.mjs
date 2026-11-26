// The visual DNA of the site: one grid of the logotype's glyphs, shared by the margins and by every surface.
// Cells live on a fixed screen grid. Renderers decide where a lit cell shows and how strongly.
export const PITCH = 12;
export const WORD = [0, 1, 0, 1, 2, 3, 4];
export const range = (low, high) => low + Math.random() * (high - low);
export const clamp = value => Math.max(0, Math.min(1, value));

const WAVE = {speed:1150, share:[.62, .2], strength:[.28, .8], far:.55, tear:.22, grain:260, gap:.25, max:3};

// Stable station-to-station, including on screens whose margins have different widths.
export function hash(col, row) {
  let value = Math.imul(col ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(row + 0x632be5ab, 0xc2b2ae35);
  value ^= value >>> 15;
  value = Math.imul(value, 0x2c1b3c6d);
  value ^= value >>> 12;
  value = Math.imul(value, 0x297a2d39);
  return ((value ^ (value >>> 15)) >>> 0) / 4294967296;
}
function tear(x, y, seed) {
  const col = Math.floor(x), row = Math.floor(y);
  const u = x - col, v = y - row;
  const a = u*u*(3-2*u), b = v*v*(3-2*v);
  const top = hash(col+seed,row)*(1-a) + hash(col+seed+1,row)*a;
  const bottom = hash(col+seed,row+1)*(1-a) + hash(col+seed+1,row+1)*a;
  return top*(1-b) + bottom*b;
}

export class CellField {
  constructor(atlas) {
    this.atlas = atlas;
    this.time = 0;
    this.cols = 0;
    this.rows = 0;
    this.renderers = [];
    this.active = new Map();
    this.scheduled = new Map();
    this.nextBucket = 0;
    this.lastWave = -5;
    this.waveEnds = [];
    this.onIgnite = null;
  }
  get count() { return this.cols * this.rows; }
  get busy() { return this.active.size > 0 || this.scheduled.size > 0; }
  resize(width, height, dpr) {
    this.width = width;
    this.height = height;
    this.dpr = dpr;
    this.cols = Math.ceil(width / PITCH);
    this.rows = Math.ceil(height / PITCH);
    this.origin = (width - this.cols * PITCH) / 2;
    // A quarter of the cells hold a glyph; the pattern mirrors from each side of the screen.
    this.base = new Int8Array(this.count).fill(-1);
    for (let col = 0; col < this.cols; col++) {
      const right = this.origin + (col + .5) * PITCH >= width / 2 ? 1 : 0;
      const fromEdge = right ? this.cols - 1 - col : col;
      for (let row = 0; row < this.rows; row++) {
        if (hash(fromEdge * 2 + right, row) < .25) this.base[row * this.cols + col] = WORD[Math.floor(7 * hash(row, fromEdge + 911 * right))];
      }
    }
    this.active.clear();
    this.scheduled.clear();
    this.waveEnds.length = 0;
    this.nextBucket = Math.floor(this.time * 30);
    // A device-sized sprite sheet: partial repaints never rasterize an SVG path again.
    this.slot = Math.max(1, Math.round(PITCH * dpr));
    this.sprites = document.createElement('canvas');
    this.sprites.width = this.slot * 5;
    this.sprites.height = this.slot * 2;
    this.sprites.getContext('2d').drawImage(this.atlas, 0, 0, this.sprites.width, this.sprites.height);
    for (const renderer of this.renderers) renderer.resize(this);
  }
  x(id) { return this.origin + (id % this.cols + .5) * PITCH; }
  y(id) { return (Math.floor(id / this.cols) + .5) * PITCH; }
  cellAt(x, y) {
    const col = Math.floor((x - this.origin) / PITCH), row = Math.floor(y / PITCH);
    return col < 0 || col >= this.cols || row < 0 || row >= this.rows ? -1 : row * this.cols + col;
  }
  stamp(ctx, id, letter, alpha, hot = false) {
    const x = this.origin + (id % this.cols) * PITCH, y = Math.floor(id / this.cols) * PITCH;
    ctx.clearRect(x, y, PITCH, PITCH);
    if (letter < 0 || alpha < .003) return;
    ctx.globalAlpha = clamp(alpha);
    ctx.drawImage(this.sprites, letter * this.slot, hot ? this.slot : 0, this.slot, this.slot, x, y, PITCH, PITCH);
    ctx.globalAlpha = 1;
  }
  schedule(id, delay, strength, options) {
    if (id < 0 || id >= this.count) return;
    const bucket = Math.max(this.nextBucket, Math.ceil((this.time + delay) * 30));
    if (!this.scheduled.has(bucket)) this.scheduled.set(bucket, []);
    this.scheduled.get(bucket).push({id, strength, options});
  }
  ignite(id, strength, options = {}) {
    if (id < 0 || id >= this.count) return;
    const existing = this.active.get(id);
    if (existing?.pinned && this.time < existing.until && options.letter === undefined) return;
    const pinned = options.letter !== undefined, wave = !!options.wave;
    this.active.set(id, {
      start:this.time, until:this.time + (options.hold ?? range(.12, .32)),
      strength:Math.max(strength, existing?.level || 0), level:0,
      letter:options.letter ?? Math.floor(Math.random() * 5), pinned, next:this.time + .06,
      floor:wave ? .45 : 0, rise:wave ? .1 : .045, fall:wave ? range(.38, .70) : .45,
      hot:pinned || (wave && Math.random() < .06), wave, quiet:!!options.quiet
    });
    this.onIgnite?.(id, strength, options);
  }
  // A front torn by slow noise: sparse cells reached at their own moment, each with its own crest. Never a disc.
  impulse(x, y, {power = 1, quiet = false, cells = null, reach = Infinity, limited = true} = {}) {
    if (!this.cols) return false;
    if (limited) {
      this.waveEnds = this.waveEnds.filter(end => end > this.time);
      if (this.time - this.lastWave < WAVE.gap || this.waveEnds.length >= WAVE.max) return false;
      this.lastWave = this.time;
    }
    const far = Math.min(reach, Math.hypot(Math.max(x, this.width - x), Math.max(y, this.height - y))) || 1;
    if (limited) this.waveEnds.push(this.time + far * 1.22 / WAVE.speed + .05);
    const seed = Math.floor(Math.random() * 65535);
    const visit = id => {
      if (Math.random() > (this.base[id] < 0 ? WAVE.share[1] : WAVE.share[0]) * Math.min(1, power)) return;
      const cx = this.x(id), cy = this.y(id), distance = Math.hypot(cx - x, cy - y);
      if (distance > far) return;
      const delay = Math.max(0, distance * (1 + WAVE.tear * (2 * tear(cx / WAVE.grain, cy / WAVE.grain, seed) - 1)) + range(-12, 12)) / WAVE.speed;
      this.schedule(id, delay, range(...WAVE.strength) * (1 - WAVE.far * distance / far) * Math.min(1, power), {wave:true, hold:.1, quiet});
    };
    if (cells) for (const id of cells) visit(id);
    else for (let id = 0; id < this.count; id++) visit(id);
    return true;
  }
  step(dt, before) {
    this.time += dt;
    before?.();
    for (; this.nextBucket <= Math.floor(this.time * 30); this.nextBucket++) {
      const events = this.scheduled.get(this.nextBucket);
      if (!events) continue;
      for (const event of events) this.ignite(event.id, event.strength, event.options);
      this.scheduled.delete(this.nextBucket);
    }
    for (const [id, cell] of this.active) {
      const age = this.time - cell.start;
      const level = cell.strength * clamp(age / cell.rise) * Math.exp(-Math.max(0, this.time - cell.until) / cell.fall);
      if (this.time >= cell.until && level < .012) {
        this.active.delete(id);
        for (const renderer of this.renderers) renderer.release(id);
        continue;
      }
      if (!cell.pinned && this.time < cell.until && this.time >= cell.next) {
        cell.letter = Math.floor(Math.random() * 5);
        cell.next = this.time + range(.05, .1);
      }
      cell.level = level;
      for (const renderer of this.renderers) renderer.paint(id, cell);
    }
  }
}
