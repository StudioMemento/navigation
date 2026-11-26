import { CellField, PITCH, WORD, range, clamp, hash } from './glyph-cells.mjs';

function marginOpacity(distance, margin) {
  const start = margin * .4, end = Math.max(margin + 20, margin * 1.3);
  const t = clamp((distance - start) / (end - start));
  return 1 - t * t * t * (t * (t * 6 - 15) + 10);
}

// The margins: the field at rest, its glitches, the pointer's stir and the decrypted word.
class Backdrop {
  constructor(field, canvas) {
    this.field = field;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.wordAt = range(7, 13);
    this.wordLight = document.createElement('canvas');
    this.wordLight.className = 'mm-word-light';
    this.wordLight.hidden = true;
    canvas.parentElement.append(this.wordLight);
  }
  resize(field) {
    const {width, height, dpr, cols, rows, count} = field;
    const introduction = !this.mask;
    this.margin = width * (width < 768 ? .10 : width >= 1600 && width / height >= 2.1 ? .30 : width < 1280 ? .15 : .20);
    this.word = null;
    this.wordWave = null;
    this.wordLight.hidden = true;
    this.wordAt = Math.max(field.time + 2, this.wordAt);
    this.canvas.width = Math.max(1, Math.round(width * dpr));
    this.canvas.height = Math.max(1, Math.round(height * dpr));
    this.canvas.style.height = height + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.mask = new Float32Array(cols);
    this.shownLetter = new Int8Array(count).fill(-2);
    this.shownAlpha = new Float32Array(count);
    this.marginCells = [];
    this.introCells = [];
    for (let col = 0; col < cols; col++) {
      const x = field.origin + (col + .5) * PITCH;
      const mask = marginOpacity(Math.min(x, width - x), this.margin);
      this.mask[col] = mask;
      for (let row = 0; row < rows; row++) {
        const id = row * cols + col, right = x >= width / 2 ? 1 : 0, fromEdge = right ? cols - 1 - col : col;
        if (field.base[id] >= 0 && mask > .003) {
          if (introduction) this.introCells.push({id, start:field.time + .84 * hash(row + 37, fromEdge * 3 + right), alpha:0});
          else this.draw(id, field.base[id], .1 * mask);
        }
        if (mask > .12) this.marginCells.push(id);
      }
    }
  }
  idle(id) { return this.field.base[id] < 0 ? 0 : this.mask[id % this.field.cols] * .1; }
  draw(id, letter, alpha, hot = false) {
    this.field.stamp(this.ctx, id, letter, alpha, hot);
    this.shownLetter[id] = letter;
    this.shownAlpha[id] = alpha;
  }
  paint(id, cell) {
    const alpha = Math.max(this.idle(id), cell.level * Math.max(this.mask[id % this.field.cols], cell.floor));
    const shown = this.shownAlpha[id];
    if (cell.letter !== this.shownLetter[id] || Math.abs(alpha - shown) >= (alpha > shown ? .004 : .012)) this.draw(id, cell.letter, alpha, cell.hot);
  }
  release(id) { this.draw(id, this.field.base[id], this.idle(id)); }
  glitch() {
    const field = this.field, start = this.marginCells[Math.floor(Math.random() * this.marginCells.length)];
    if (start === undefined) return;
    const col = start % field.cols, direction = Math.random() < .5 ? -1 : 1;
    const length = 1 + Math.floor(Math.random() ** 2 * 7), strength = range(.45, .95);
    for (let n = 0; n < length; n++) {
      if (col + n * direction < 0 || col + n * direction >= field.cols) break;
      field.schedule(start + n * direction, n * range(.05, .09), strength * (1 - n * .06));
    }
  }
  stir(x, y) {
    const field = this.field, angle = range(0, 2 * Math.PI), radius = 360 * Math.sqrt(Math.random());
    const id = field.cellAt(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    if (id < 0 || this.mask[id % field.cols] < .03) return;
    if (Math.random() < 1 - (radius / 400) ** 2) field.ignite(id, range(.35, .8));
  }
  decrypt() {
    const field = this.field;
    let band = 0;
    while (band < field.cols / 2 && this.mask[band] > .45) band++;
    const vertical = band < 9;
    if (!band || (vertical && field.rows < 8)) return;
    const inset = Math.floor(range(0, Math.max(1, band - (vertical ? 0 : 7))));
    const col = Math.random() < .5 ? inset : field.cols - 1 - inset - (vertical ? 0 : 6);
    const row = Math.floor(range(field.rows * .15, Math.max(field.rows * .15, Math.min(field.rows * .85, field.rows - (vertical ? 7 : 1)))));
    const first = row * field.cols + col, step = vertical ? field.cols : 1;
    WORD.forEach((letter, n) => {
      field.schedule(first + n * step, n * .035, .78, {hold:.8});
      field.schedule(first + n * step, .85 + n * .09, 1, {letter, hold:1.7 + (6 - n) * .09});
    });
    const pad = 12, light = this.wordLight;
    const width = (vertical ? 1 : 7) * PITCH + 2 * pad, height = (vertical ? 7 : 1) * PITCH + 2 * pad;
    light.width = Math.ceil(width * field.dpr);
    light.height = Math.ceil(height * field.dpr);
    light.style.width = width + 'px';
    light.style.height = height + 'px';
    light.style.left = (field.origin + col * PITCH - pad) + 'px';
    light.style.top = (row * PITCH - pad) + 'px';
    this.word = {start:field.time, vertical, first, step, pad};
    light.hidden = false;
    const centre = first + step * 3;
    this.wordWave = {at:field.time + 1.4, x:field.x(centre), y:field.y(centre)};
  }
  paintWord() {
    const field = this.field;
    if (!this.word) return;
    const age = field.time - this.word.start;
    if (age > 3.1) {this.wordLight.hidden = true; this.word = null; return;}
    const ctx = this.wordLight.getContext('2d'), {vertical, first, step, pad} = this.word;
    ctx.setTransform(field.dpr, 0, 0, field.dpr, 0, 0);
    ctx.clearRect(0, 0, this.wordLight.width / field.dpr, this.wordLight.height / field.dpr);
    ctx.shadowColor = '#ffa23d';
    ctx.shadowBlur = 6 * field.dpr;
    const count = Math.max(0, Math.min(7, 1 + Math.floor((age - .85) / .09)));
    for (let i = 0; i < count; i++) {
      ctx.globalAlpha = (.55 + .25 * Math.sin(age * 6)) * this.mask[(first + i * step) % field.cols];
      ctx.drawImage(field.sprites, WORD[i] * field.slot, field.slot, field.slot, field.slot, pad + (vertical ? 0 : i * PITCH), pad + (vertical ? i * PITCH : 0), PITCH, PITCH);
    }
  }
  // Runs before the shared cells advance.
  before(dt) {
    const field = this.field;
    if (this.introCells.length) this.introCells = this.introCells.filter(cell => {
      const t = clamp((field.time - cell.start) / .36), alpha = .1 * this.mask[cell.id % field.cols] * t * t * (3 - 2 * t);
      if ((alpha > cell.alpha + .006 || t === 1) && !field.active.has(cell.id)) {
        this.draw(cell.id, field.base[cell.id], alpha);
        cell.alpha = alpha;
      }
      return t < 1;
    });
    this.paintWord();
    for (let n = this.marginCells.length * .005 * dt; n > 0; n--) if (Math.random() < n) this.glitch();
    if (field.time >= this.wordAt) {this.decrypt(); this.wordAt = field.time + range(16, 30) + 3;}
    // The word announces itself in the margins only: surfaces stay quiet until someone touches them.
    if (this.wordWave && field.time >= this.wordWave.at) {field.impulse(this.wordWave.x, this.wordWave.y, {quiet:true}); this.wordWave = null;}
  }
}

export function mountGlyphField(layer) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)'), forced = matchMedia('(forced-colors: active)');
  const coarse = matchMedia('(pointer:coarse)'), saveData = navigator.connection?.saveData;
  const atlas = new Image();
  const field = new CellField(atlas);
  let backdrop = null, timer = 0, frame = 0, scrollTimer = 0, resizing = 0, previous = 0, sizeKey = '';
  let pointer = null, travelled = 0;
  const listeners = {ready:new Set(), impulse:new Set()};
  const emit = (name, ...args) => { for (const listener of listeners[name]) listener(...args); };
  const still = () => motion.matches || forced.matches || !!saveData;
  const halted = () => still() || document.hidden || document.documentElement.hasAttribute('data-mm-modal');
  const blocked = () => halted() || !!scrollTimer;
  function stop() { clearTimeout(timer); cancelAnimationFrame(frame); timer = frame = previous = 0; }
  function rest() { stop(); layer.removeAttribute('data-live'); }
  function tick(now) {
    frame = 0;
    if (still()) {rest(); return;}
    // While the page scrolls the field rests, unless a front is running: it keeps going under the finger.
    if (halted() || !backdrop || (scrollTimer && !field.waving)) return;
    const dt = previous ? Math.min(.1, (now - previous) / 1000) : 0;
    previous = now;
    field.step(dt, () => backdrop.before(dt));
    timer = setTimeout(() => {timer = 0; frame = requestAnimationFrame(tick);}, 1000 / (coarse.matches ? 18 : 30) - 8);
  }
  function start() { if (backdrop && !halted() && (!scrollTimer || field.waving) && !frame && !timer) frame = requestAnimationFrame(tick); }
  function resize() {
    resizing = 0;
    if (still()) {rest(); return;}
    if (!atlas.complete || !atlas.naturalWidth) return;
    const width = document.documentElement.clientWidth, view = innerHeight;
    // On touch screens the browser bars come and go while scrolling: the field keeps a taller grid instead of
    // rebuilding (and dropping a running front) every time the viewport height changes.
    const height = coarse.matches ? Math.max(view + 140, field.cols && field.width === width ? field.height : 0) : view;
    const dpr = Math.min(devicePixelRatio || 1, coarse.matches || width * height > 4e6 ? 1.5 : 2);
    const key = [width, height, dpr].join('/');
    if (!backdrop) {
      const canvas = layer.querySelector('canvas');
      if (!canvas.getContext('2d')) return;
      backdrop = new Backdrop(field, canvas);
      field.renderers.unshift(backdrop);
    }
    if (sizeKey !== key || !layer.hasAttribute('data-live')) {
      field.resize(width, height, dpr);
      sizeKey = key;
      layer.setAttribute('data-live', '');
      emit('ready');
    }
    start();
  }
  function requestResize() { if (!resizing) resizing = requestAnimationFrame(resize); }
  function sync() { if (still()) rest(); else if (halted()) stop(); else start(); }
  function changePolicy() { if (still()) rest(); else resize(); }
  function impulse(x, y, options = {}) {
    if (!backdrop || blocked()) return false;
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
  document.addEventListener('scroll', () => {
    if (!backdrop || still()) return;
    if (!field.waving) stop();
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {scrollTimer = 0; start();}, 180);
  }, {capture:true, passive:true});
  document.addEventListener('pointermove', event => {
    if (!backdrop || blocked() || event.pointerType === 'touch') return;
    if (!layer.hasAttribute('data-live')) resize();
    const distance = pointer ? Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) : 0;
    pointer = {x:event.clientX, y:event.clientY};
    if (distance < 200) travelled += distance;
    while (travelled > 26) {travelled -= 26; backdrop.stir(pointer.x, pointer.y);}
    start();
  }, {passive:true});
  // A mouse click sends one impulse through the whole viewport. Touch is handled by the surfaces, which tell taps from scrolls.
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !event.isPrimary) return;
    if (!event.target.closest('a,button,input,textarea,select,iframe,canvas,summary,dialog,label')) impulse(event.clientX, event.clientY);
  }, {passive:true, capture:true});
  return {
    cells: field,
    impulse,
    wake: start,
    still,
    get ready() { return !!backdrop && field.cols > 0 && !still(); },
    get blocked() { return blocked(); },
    addRenderer(renderer) {
      field.renderers.push(renderer);
      if (field.cols) renderer.resize(field);
    },
    on(name, listener) { listeners[name].add(listener); }
  };
}
