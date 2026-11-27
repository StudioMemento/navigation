import { wallLetter } from './glyph-tile.mjs';

// The visual DNA of the site: one grid of the logotype's glyphs, shared by the margins and by every surface.
// The grid is a wall that belongs to the document and scrolls with it. Only a window of it around the screen is
// live: when the page scrolls past the window, the window moves and the lit glyphs keep their place on the wall.
export const PITCH = 12;
export const WORD = [0, 1, 0, 1, 2, 3, 4];
export const range = (low, high) => low + Math.random() * (high - low);
export const clamp = value => Math.max(0, Math.min(1, value));
const pick = value => Array.isArray(value) ? range(value[0], value[1]) : value;

// Tones of the atlas: two warm rows, for what the pointer touches, and two greys, for the wall on its own.
export const TONE = {warm:0, hot:1, grey:2, light:3};

// How a lit glyph lives: it rises, scrambles through a few letters, resolves on its own letter of the wall with a
// short flash, and fades. The wall on its own is slow; the pointer is quicker, never a flicker.
const LIFE = {
  ambient:{rise:.35, steps:[2, 3], tempo:[.2, .28], fall:1.2},
  trail:{rise:.06, steps:[4, 6], tempo:[.11, .15], fall:.55},
  wave:{rise:.14, steps:[1, 2], tempo:[.13, .17], fall:[.6, .9]},
  word:{rise:.05, steps:[8, 10], tempo:[.07, .09], fall:.35}
};
// A front torn by slow noise: sparse cells reached at their own moment. Calm: slower, sparser, one at a time.
const WAVE = {speed:600, reach:1600, share:[.34, .08], strength:[.18, .5], far:.55, tear:.22, grain:260, gap:.6, max:1, floor:.22, hot:.02};

// Stable station-to-station hash.
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
const scrollTop = () => window.scrollY || document.documentElement.scrollTop || 0;

export class CellField {
  constructor(atlas) {
    this.atlas = atlas;
    this.time = 0;
    this.cols = 0;
    this.rows = 0;
    this.anchorTop = 0;
    this.renderers = [];
    this.active = new Map();
    this.scheduled = new Map();
    this.nextBucket = 0;
    this.lastWave = -5;
    this.waveEnds = [];
    this.waveUntil = 0;
    this.onIgnite = null;
  }
  get count() { return this.cols * this.rows; }
  // A front is still on its way, or its last cells are still falling.
  get waving() { return this.time < this.waveUntil; }
  // width: the page; view: the screen's height; the window of the wall is taller than the screen.
  resize(width, view, dpr) {
    this.width = width;
    this.view = view;
    this.pad = Math.ceil(view * .15 / PITCH) * PITCH;
    this.height = Math.ceil((view + 2 * this.pad) / PITCH) * PITCH;
    this.dpr = dpr;
    this.cols = Math.ceil(width / PITCH);
    this.rows = this.height / PITCH;
    this.anchorTop = this.anchorFor(scrollTop());
    this.base = new Int8Array(this.count);
    this.fillBase(0, this.rows);
    this.active.clear();
    this.scheduled.clear();
    this.waveEnds.length = 0;
    this.nextBucket = Math.floor(this.time * 30);
    // A device-sized sprite sheet: four tones of the five letters. Partial repaints never rasterize an SVG again.
    this.slot = Math.max(1, Math.round(PITCH * dpr));
    this.sprites = document.createElement('canvas');
    this.sprites.width = this.slot * 5;
    this.sprites.height = this.slot * 4;
    this.sprites.getContext('2d').drawImage(this.atlas, 0, 0, this.sprites.width, this.sprites.height);
    for (const renderer of this.renderers) renderer.resize(this);
  }
  anchorFor(top) { return Math.max(0, Math.floor((top - this.pad) / PITCH) * PITCH); }
  fillBase(from, to) {
    const top = this.anchorTop / PITCH;
    for (let row = from; row < to; row++) for (let col = 0; col < this.cols; col++) this.base[row * this.cols + col] = wallLetter(col, top + row);
  }
  // The page scrolled: when the screen leaves the live window, the window moves along the wall.
  follow() {
    if (!this.cols) return false;
    const top = scrollTop();
    if (top >= this.anchorTop + PITCH && top + this.view <= this.anchorTop + this.height - PITCH) return false;
    const next = this.anchorFor(top);
    const shift = (next - this.anchorTop) / PITCH;
    if (!shift) return false;
    this.anchorTop = next;
    const offset = shift * this.cols, count = this.count;
    const moved = new Map();
    for (const [id, cell] of this.active) { const to = id - offset; if (to >= 0 && to < count) moved.set(to, cell); }
    this.active = moved;
    for (const [bucket, events] of this.scheduled) {
      const kept = events.filter(event => (event.id -= offset) >= 0 && event.id < count);
      if (kept.length) this.scheduled.set(bucket, kept); else this.scheduled.delete(bucket);
    }
    if (Math.abs(shift) >= this.rows) this.fillBase(0, this.rows);
    else if (shift > 0) {this.base.copyWithin(0, offset); this.fillBase(this.rows - shift, this.rows);}
    else {this.base.copyWithin(-offset, 0, count + offset); this.fillBase(0, -shift);}
    for (const renderer of this.renderers) renderer.shift?.(shift, this);
    return true;
  }
  // Cells in page coordinates; x() and y() are on screen now.
  x(id) { return (id % this.cols + .5) * PITCH; }
  docY(id) { return this.anchorTop + (Math.floor(id / this.cols) + .5) * PITCH; }
  y(id) { return this.docY(id) - scrollTop(); }
  cellAt(x, y) {
    const col = Math.floor(x / PITCH), row = Math.floor((y + scrollTop() - this.anchorTop) / PITCH);
    return col < 0 || col >= this.cols || row < 0 || row >= this.rows ? -1 : row * this.cols + col;
  }
  // Rows of the window that are on screen now.
  visibleRows() {
    const first = Math.max(0, Math.floor((scrollTop() - this.anchorTop) / PITCH));
    return [first, Math.min(this.rows, first + Math.ceil(this.view / PITCH) + 1)];
  }
  stamp(ctx, id, letter, alpha, tone = TONE.warm, ground = 0) {
    const x = (id % this.cols) * PITCH, y = Math.floor(id / this.cols) * PITCH;
    ctx.clearRect(x, y, PITCH, PITCH);
    if (letter < 0 || alpha < .003) return;
    if (ground) {
      // The lit glyph covers the letter of the wall beneath it.
      ctx.globalAlpha = Math.min(1, ground);
      ctx.fillStyle = '#090909';
      ctx.fillRect(x, y, PITCH, PITCH);
    }
    ctx.globalAlpha = clamp(alpha);
    ctx.drawImage(this.sprites, letter * this.slot, tone * this.slot, this.slot, this.slot, x, y, PITCH, PITCH);
    ctx.globalAlpha = 1;
  }
  schedule(id, delay, strength, options) {
    if (id < 0 || id >= this.count) return;
    const bucket = Math.max(this.nextBucket, Math.ceil((this.time + delay) * 30));
    if (!this.scheduled.has(bucket)) this.scheduled.set(bucket, []);
    this.scheduled.get(bucket).push({id, strength, options});
  }
  // options: life (ambient, trail, wave, word), warm (the pointer's light), surface (shows on surfaces), feed (lights
  // the edge it touches), quiet (margins only), letter + hold (a pinned letter of the decrypted word), floor, hot.
  ignite(id, strength, options = {}) {
    if (id < 0 || id >= this.count) return;
    const existing = this.active.get(id);
    if (existing?.pinned && this.time < existing.until && options.letter === undefined) return;
    const pinned = options.letter !== undefined, life = LIFE[options.life] || LIFE.ambient;
    const warm = !!options.warm, hot = pinned || !!options.hot, quiet = !!options.quiet;
    const cell = {
      start:this.time, strength:Math.max(strength, existing?.level || 0), level:0,
      letter:pinned ? options.letter : Math.floor(Math.random() * 5), target:this.base[id], pinned,
      steps:pinned ? 0 : Math.round(pick(life.steps)), tempo:life.tempo, next:this.time + pick(life.tempo),
      rise:life.rise, fall:pick(life.fall), until:pinned ? this.time + (options.hold ?? 1) : Infinity, resolved:pinned,
      flash:0, floor:options.floor || 0, life:options.life || 'ambient', tone:warm ? (hot ? TONE.hot : TONE.warm) : (hot ? TONE.light : TONE.grey),
      // By default only the pointer's glyphs reach the surfaces; the opening of a page asks for grey ones there.
      warm, surface:!quiet && (options.surface ?? warm), feed:!quiet && !!options.feed, quiet
    };
    this.active.set(id, cell);
    this.onIgnite?.(id, strength, cell);
  }
  impulse(x, y, {power = 1, quiet = false, cells = null, reach = Infinity, limited = true, warm = true, surface = true, feed = true, speed = WAVE.speed} = {}) {
    if (!this.cols) return false;
    if (limited) {
      this.waveEnds = this.waveEnds.filter(end => end > this.time);
      if (this.time - this.lastWave < WAVE.gap || this.waveEnds.length >= WAVE.max) return false;
      this.lastWave = this.time;
    }
    const corner = Math.hypot(Math.max(x, this.width - x), Math.max(y, this.view - y));
    const far = Math.min(reach, WAVE.reach, corner) || 1;
    if (limited) this.waveEnds.push(this.time + far * 1.22 / speed + .05);
    this.waveUntil = Math.max(this.waveUntil, this.time + far * 1.22 / speed + 1.1);
    const seed = Math.floor(Math.random() * 65535), strength = Math.min(1, power);
    const options = {life:'wave', quiet, warm, surface, feed, floor:WAVE.floor};
    const visit = id => {
      if (Math.random() > (this.base[id] < 0 ? WAVE.share[1] : WAVE.share[0]) * strength) return;
      const cx = this.x(id), cy = this.y(id), distance = Math.hypot(cx - x, cy - y);
      if (distance > far) return;
      const delay = Math.max(0, distance * (1 + WAVE.tear * (2 * tear(cx / WAVE.grain, cy / WAVE.grain, seed) - 1)) + range(-12, 12)) / speed;
      this.schedule(id, delay, range(...WAVE.strength) * (1 - WAVE.far * distance / far) * strength, {...options, hot:Math.random() < WAVE.hot});
    };
    if (cells) for (const id of cells) visit(id);
    else {
      const [first, last] = this.visibleRows();
      for (let id = first * this.cols; id < last * this.cols; id++) visit(id);
    }
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
      if (!cell.resolved && this.time >= cell.next) {
        if (cell.steps > 0) {
          let letter = Math.floor(Math.random() * 5);
          if (letter === cell.letter) letter = (letter + 1 + Math.floor(Math.random() * 4)) % 5;
          cell.letter = letter;
          cell.steps--;
          cell.next = this.time + pick(cell.tempo);
        } else {
          // Decoded: the glyph settles on the letter of the wall beneath it, with a short flash.
          cell.resolved = true;
          cell.until = this.time;
          if (cell.target >= 0) {cell.letter = cell.target; cell.flash = 1;}
        }
      }
      const age = this.time - cell.start, after = Math.max(0, this.time - cell.until);
      const flash = cell.flash ? 1 + .35 * Math.exp(-after / .14) : 1;
      const level = cell.strength * clamp(age / cell.rise) * Math.exp(-after / cell.fall) * flash;
      if (cell.resolved && this.time > cell.until && level < .012) {
        this.active.delete(id);
        for (const renderer of this.renderers) renderer.release(id);
        continue;
      }
      cell.level = level;
      for (const renderer of this.renderers) renderer.paint(id, cell);
    }
  }
}

// Moves the pixels of a window canvas by whole rows, so lit glyphs keep their place on the wall.
export function shiftCanvas(canvas, rows, field) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dy = -rows * PITCH * field.dpr;
  if (Math.abs(dy) >= canvas.height) {ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.setTransform(field.dpr, 0, 0, field.dpr, 0, 0); return;}
  const scratch = shiftCanvas.scratch || (shiftCanvas.scratch = document.createElement('canvas'));
  scratch.width = canvas.width; scratch.height = canvas.height;
  const s = scratch.getContext('2d');
  s.drawImage(canvas, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(scratch, 0, dy);
  ctx.setTransform(field.dpr, 0, 0, field.dpr, 0, 0);
  scratch.width = scratch.height = 1;
}
// Moves per-cell arrays of a window by whole rows.
export function shiftArray(array, rows, cols, empty = 0) {
  const offset = rows * cols, count = array.length;
  if (Math.abs(offset) >= count) {array.fill(empty); return;}
  if (offset > 0) {array.copyWithin(0, offset); array.fill(empty, count - offset);}
  else {array.copyWithin(-offset, 0, count + offset); array.fill(empty, 0, -offset);}
}
