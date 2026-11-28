import { CellField, PITCH, WORD, TONE, range, clamp, shiftCanvas, shiftArray } from './glyph-cells.mjs';

import { MOVING } from './surface-targets.mjs';

function marginOpacity(distance, margin) {
  const start = margin * .4, end = Math.max(margin + 20, margin * 1.3);
  const t = clamp((distance - start) / (end - start));
  return 1 - t * t * t * (t * (t * 6 - 15) + 10);
}
// The wall on its own keeps decoding, slowly: short runs of glyphs that scramble and settle, about one margin glyph in
// three hundred a second (8 to 26 runs a second, by the size of the margins).
const AMBIENT = {density:.0035, rate:[8, 26], length:[1, 5], gap:[.1, .18], strength:[.32, .65]};
// The pointer in the margins leaves the same trail as on the surfaces.
const TRAIL = {every:8, radius:115, strength:[.45, .9], wave:170, gap:.4, reach:240, power:.4};

// The margins: the lit glyphs of the wall (its letters at rest are drawn by CSS), the pointer's trail, the word.
class Backdrop {
  constructor(field, canvas, layer) {
    this.field = field;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.wordAt = range(7, 13);
    this.wordLight = document.createElement('canvas');
    this.wordLight.className = 'mm-word-light';
    this.wordLight.hidden = true;
    layer.append(this.wordLight);
  }
  resize(field) {
    const {width, height, view, dpr, cols, count} = field;
    this.margin = width * (width < 768 ? .10 : width >= 1600 && width / view >= 2.1 ? .30 : width < 1280 ? .15 : .20);
    this.word = null;
    this.wordWave = null;
    this.wordLight.hidden = true;
    this.wordAt = Math.max(field.time + 2, this.wordAt);
    this.canvas.width = Math.max(1, Math.round(width * dpr));
    this.canvas.height = Math.max(1, Math.round(height * dpr));
    this.canvas.style.height = height + 'px';
    this.canvas.style.top = field.anchorTop + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.mask = new Float32Array(cols);
    this.marginCols = [];
    for (let col = 0; col < cols; col++) {
      const x = (col + .5) * PITCH;
      this.mask[col] = marginOpacity(Math.min(x, width - x), this.margin);
      if (this.mask[col] > .12) this.marginCols.push(col);
    }
    this.rate = Math.max(AMBIENT.rate[0], Math.min(AMBIENT.rate[1], this.marginCols.length * (view / PITCH) * AMBIENT.density));
    this.shownLetter = new Int8Array(count).fill(-1);
    this.shownAlpha = new Float32Array(count);
  }
  shift(rows, field) {
    shiftCanvas(this.canvas, rows, field);
    shiftArray(this.shownLetter, rows, field.cols, -1);
    shiftArray(this.shownAlpha, rows, field.cols, 0);
    this.canvas.style.top = field.anchorTop + 'px';
    if (this.word) this.word.first -= rows * field.cols;
    if (this.wordWave) this.wordWave.id -= rows * field.cols;
  }
  paint(id, cell) {
    const field = this.field, alpha = cell.level * Math.max(this.mask[id % field.cols], cell.floor);
    const shown = this.shownAlpha[id];
    if (alpha < .01) {if (shown) this.release(id); return;}
    if (cell.letter === this.shownLetter[id] && Math.abs(alpha - shown) < (alpha > shown ? .006 : .015)) return;
    field.stamp(this.ctx, id, cell.letter, alpha, cell.tone, alpha * 2.5);
    this.shownLetter[id] = cell.letter;
    this.shownAlpha[id] = alpha;
  }
  release(id) {
    if (!this.shownAlpha[id] && this.shownLetter[id] < 0) return;
    this.field.stamp(this.ctx, id, -1, 0);
    this.shownLetter[id] = -1;
    this.shownAlpha[id] = 0;
  }
  // A short run of glyphs along a row of a margin, slow and grey.
  glitch() {
    const field = this.field, col = this.marginCols[Math.floor(Math.random() * this.marginCols.length)];
    if (col === undefined) return;
    const [first, last] = field.visibleRows(), row = Math.floor(range(first, last));
    const direction = Math.random() < .5 ? -1 : 1, length = Math.round(range(...AMBIENT.length)), strength = range(...AMBIENT.strength);
    for (let n = 0; n < length; n++) {
      const c = col + n * direction;
      if (c < 0 || c >= field.cols) break;
      field.schedule(row * field.cols + c, n * range(...AMBIENT.gap), strength * (1 - n * .08), {life:'ambient', surface:false});
    }
  }
  // The pointer's trail in the margins: glyphs wake around it and decode; every few steps a small front.
  trail(x, y, distance) {
    const field = this.field;
    this.travel = (this.travel || 0) + Math.min(distance, 200);
    this.waveTravel = (this.waveTravel || 0) + Math.min(distance, 200);
    while (this.travel > TRAIL.every) {
      this.travel -= TRAIL.every;
      const a = range(0, 6.283), r = TRAIL.radius * Math.sqrt(Math.random());
      const id = field.cellAt(x + r * Math.cos(a), y + r * Math.sin(a));
      if (id < 0 || this.mask[id % field.cols] < .03) continue;
      if (Math.random() < 1 - (r / TRAIL.radius) ** 2) field.ignite(id, range(...TRAIL.strength), {life:'trail', warm:true, surface:false});
    }
    if (this.waveTravel >= TRAIL.wave && field.time - (this.lastWave || -5) >= TRAIL.gap) {
      this.waveTravel = 0; this.lastWave = field.time;
      field.impulse(x, y, {power:TRAIL.power, reach:TRAIL.reach, surface:false, feed:false});
    }
  }
  decrypt() {
    const field = this.field;
    let band = 0;
    while (band < field.cols / 2 && this.mask[band] > .45) band++;
    const vertical = band < 9;
    const [first, last] = field.visibleRows();
    if (!band || (vertical && last - first < 8)) return;
    const inset = Math.floor(range(0, Math.max(1, band - (vertical ? 0 : 7))));
    const col = Math.random() < .5 ? inset : field.cols - 1 - inset - (vertical ? 0 : 6);
    const span = last - first, row = first + Math.floor(range(span * .15, Math.max(span * .15, Math.min(span * .85, span - (vertical ? 7 : 1)))));
    const start = row * field.cols + col, step = vertical ? field.cols : 1;
    WORD.forEach((letter, n) => {
      field.schedule(start + n * step, n * .035, .7, {life:'word'});
      field.schedule(start + n * step, .85 + n * .09, .95, {letter, hold:1.7 + (6 - n) * .09});
    });
    const pad = 12, light = this.wordLight;
    const width = (vertical ? 1 : 7) * PITCH + 2 * pad, height = (vertical ? 7 : 1) * PITCH + 2 * pad;
    light.width = Math.ceil(width * field.dpr);
    light.height = Math.ceil(height * field.dpr);
    light.style.width = width + 'px';
    light.style.height = height + 'px';
    light.style.left = (col * PITCH - pad) + 'px';
    light.style.top = (field.anchorTop + row * PITCH - pad) + 'px';
    this.word = {start:field.time, vertical, first:start, step, pad};
    light.hidden = false;
    const centre = start + step * 3;
    this.wordWave = {at:field.time + 1.4, id:centre};
  }
  paintWord() {
    const field = this.field;
    if (!this.word) return;
    const age = field.time - this.word.start;
    if (age > 3.1) {this.wordLight.hidden = true; this.word = null; return;}
    const ctx = this.wordLight.getContext('2d'), {vertical, first, step, pad} = this.word;
    ctx.setTransform(field.dpr, 0, 0, field.dpr, 0, 0);
    ctx.clearRect(0, 0, this.wordLight.width / field.dpr, this.wordLight.height / field.dpr);
    ctx.shadowColor = 'rgba(240,234,224,.7)';
    ctx.shadowBlur = 6 * field.dpr;
    const count = Math.max(0, Math.min(7, 1 + Math.floor((age - .85) / .09)));
    for (let i = 0; i < count; i++) {
      ctx.globalAlpha = (.45 + .2 * Math.sin(age * 6)) * this.mask[((first + i * step) % field.cols + field.cols) % field.cols];
      ctx.drawImage(field.sprites, WORD[i] * field.slot, TONE.light * field.slot, field.slot, field.slot, pad + (vertical ? 0 : i * PITCH), pad + (vertical ? i * PITCH : 0), PITCH, PITCH);
    }
  }
  // Runs before the shared cells advance.
  before(dt) {
    const field = this.field;
    this.paintWord();
    for (let n = (this.rate || AMBIENT.rate[0]) * dt; n > 0; n--) if (Math.random() < n) this.glitch();
    if (field.time >= this.wordAt) {this.decrypt(); this.wordAt = field.time + range(16, 30) + 3;}
    // The word announces itself in the margins only, in grey.
    if (this.wordWave && field.time >= this.wordWave.at) {
      const id = this.wordWave.id;
      if (id >= 0 && id < field.count) field.impulse(field.x(id), field.y(id), {quiet:true, warm:false, power:.35, reach:700});
      this.wordWave = null;
    }
  }
}

export function mountGlyphField(layer) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)'), forced = matchMedia('(forced-colors: active)');
  const coarse = matchMedia('(pointer:coarse)'), saveData = navigator.connection?.saveData;
  const atlas = new Image();
  const field = new CellField(atlas);
  let backdrop = null, timer = 0, frame = 0, resizing = 0, previous = 0, sizeKey = '';
  let pointer = null;
  const pending=[];
  let lastInput=-Infinity;
  const listeners = {ready:new Set(), impulse:new Set()};
  const emit = (name, ...args) => { for (const listener of listeners[name]) listener(...args); };
  const still = () => motion.matches || forced.matches;
  const halted = () => still() || document.hidden || document.documentElement.hasAttribute('data-mm-modal');
  function stop() { clearTimeout(timer); cancelAnimationFrame(frame); timer = frame = previous = 0; }
  function rest() { stop(); layer.removeAttribute('data-live'); }
  function tick(now) {
    frame = 0;
    if (still()) {rest(); return;}
    if (halted() || !backdrop) return;
    const dt = previous ? Math.min(.1, (now - previous) / 1000) : 0;
    previous = now;
    field.follow();
    field.step(dt,saveData ? null : () => backdrop.before(dt));
    if(saveData && !field.active.size && !field.scheduled.size){previous=0;return;}
    timer = setTimeout(() => {timer = 0; frame = requestAnimationFrame(tick);}, 1000 / (coarse.matches ? 18 : 30) - 8);
  }
  function start() { if (backdrop && !halted() && !frame && !timer) frame = requestAnimationFrame(tick); }
  function resize() {
    resizing = 0;
    if (still()) {rest(); return;}
    if (!atlas.complete || !atlas.naturalWidth) return;
    const width = document.documentElement.clientWidth;
    // On touch screens the browser bars come and go while scrolling: keep the window unless the width changes.
    const view = coarse.matches && field.cols && field.width === width ? Math.max(innerHeight, field.view) : innerHeight;
    const area = width * view * 1.3;
    const dpr = Math.max(1, Math.min(devicePixelRatio || 1, coarse.matches ? 1.5 : 2, Math.sqrt(6e6 / area)));
    const key = [width, view, dpr.toFixed(2)].join('/');
    if (!backdrop) {
      const canvas = layer.querySelector('canvas');
      if (!canvas.getContext('2d')) return;
      backdrop = new Backdrop(field, canvas, layer);
      field.renderers.unshift(backdrop);
    }
    if (sizeKey !== key || !layer.hasAttribute('data-live')) {
      field.resize(width, view, dpr);
      sizeKey = key;
      layer.setAttribute('data-live', '');
      emit('ready');
      for(const [x,y,options] of pending.splice(0)) impulse(x,y,options);
    }
    start();
  }
  function requestResize() { if (!resizing) resizing = requestAnimationFrame(resize); }
  function sync() { if (still()) rest(); else if (halted()) stop(); else start(); }
  function changePolicy() { if (still()) rest(); else resize(); }
  function impulse(x, y, options = {}) {
    if (halted()) return false;
    if (!backdrop) {
      if(options.input) {pending.push([x,y,options]);if(pending.length>3)pending.shift();}
      return false;
    }
    const now=performance.now();
    // A tap inside the 3D Studio can also report a model-edge reflection during the same input.
    if(options.input)lastInput=now;
    else if(options.feed===undefined && now-lastInput<95)return false;
    field.follow();
    emit('impulse', x, y, options);
    const sent = field.impulse(x, y, options);
    start();
    return sent;
  }
  atlas.onload = resize;
  atlas.src = '/navigation/glyph-atlas.svg';
  for (const query of [motion, forced, coarse]) {
    if (query.addEventListener) query.addEventListener('change', changePolicy);
    else query.addListener(changePolicy);
  }
  window.addEventListener('resize', requestResize, {passive:true});
  window.visualViewport?.addEventListener('resize', requestResize, {passive:true});
  document.addEventListener('visibilitychange', sync);
  document.addEventListener('memento:modal-visibility', sync);
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', requestResize);
  // The wall scrolls with the page by itself; its live window follows, and the glyphs keep living.
  window.addEventListener('scroll', () => { if (backdrop && !still()) {field.follow(); start();} }, {passive:true});
  document.addEventListener('pointermove', event => {
    if (!backdrop || halted() || event.pointerType === 'touch') return;
    if (!layer.hasAttribute('data-live')) resize();
    const distance = pointer ? Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) : 0;
    pointer = {x:event.clientX, y:event.clientY};
    // Over a surface, the surface draws the trail.
    if (event.target?.closest?.('.mm-tab,.mm-header,.mm-dock,dialog,'+MOVING)) return;
    backdrop.trail(pointer.x, pointer.y, distance);
    start();
  }, {passive:true});
  return {
    cells: field,
    impulse,
    wake: start,
    still,
    get ready() { return !!backdrop && field.cols > 0 && !still(); },
    get blocked() { return halted(); },
    addRenderer(renderer) {
      field.renderers.push(renderer);
      if (field.cols) renderer.resize(field);
    },
    on(name, listener) { listeners[name].add(listener); }
  };
}
