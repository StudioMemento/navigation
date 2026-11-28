import { PITCH, range, shiftCanvas, shiftArray } from './glyph-cells.mjs';
import { acceptsLight, outlineOf } from './surface-targets.mjs';

// The surfaces are windows on the same wall of glyphs as the margins: the same grid, the same letters, the same
// fronts. They stay clean at rest: only what the pointer (or a finger) wakes shows on them, never the slow glitches
// of the wall. The pointer leaves a trail of glyphs; a touch or a click sends a torn front across every surface on
// screen and into the margins. Glyphs are full along the outline and on the black, faint over a photograph, never
// over type. Everything is measured in page coordinates, so the glyphs stay on their surface while the page scrolls.
const GAIN = {rim:.7, panel:.42, photo:.1};
const RIM = PITCH * 1.6;
const TRAIL = {radius:110, every:7, burst:6, wave:150, gap:.4, reach:260, power:.35};

const smoothstep = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const page = () => ({x:window.scrollX || 0, y:window.scrollY || 0});
function position(value) {
  const named = {left:0, top:0, center:.5, right:1, bottom:1};
  return value in named ? named[value] : value.endsWith('%') ? parseFloat(value) / 100 : .5;
}
// The brightness of each photograph, sampled once off the main thread at 24 × 24: glyphs keep to its dark parts.
const LUMA = 24, lumas = new Map();
function sample(img, done) {
  const src = img.currentSrc || img.src;
  if (!src || lumas.has(src) || !img.complete || !img.naturalWidth || typeof createImageBitmap !== 'function') return;
  lumas.set(src, null);
  createImageBitmap(img, {resizeWidth:LUMA, resizeHeight:LUMA, resizeQuality:'low'}).then(bitmap => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = LUMA;
    const ctx = canvas.getContext('2d', {willReadFrequently:true});
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close?.();
    const data = ctx.getImageData(0, 0, LUMA, LUMA).data, grid = new Float32Array(LUMA * LUMA);
    for (let i = 0; i < grid.length; i++) grid[i] = (.299 * data[4*i] + .587 * data[4*i+1] + .114 * data[4*i+2]) / 255 * data[4*i+3] / 255;
    lumas.set(src, grid);
    done(src);
  }).catch(() => {});
}
function photoOf(img, at) {
  const r = img.getBoundingClientRect(), style = getComputedStyle(img), [px = '50%', py = '50%'] = style.objectPosition.split(' ');
  const box = {left:r.left + at.x, right:r.right + at.x, top:r.top + at.y, bottom:r.bottom + at.y, width:r.width, height:r.height};
  return {img, src:img.currentSrc || img.src, box, fit:style.objectFit, px:position(px), py:position(py), nw:img.naturalWidth || r.width, nh:img.naturalHeight || r.height};
}
function photoGain(photos, x, y) {
  for (const p of photos) {
    const {box} = p;
    if (x <= box.left || x >= box.right || y <= box.top || y >= box.bottom) continue;
    const grid = lumas.get(p.src);
    if (!grid) return GAIN.photo;
    let u = (x - box.left) / box.width, v = (y - box.top) / box.height;
    if (p.fit !== 'fill') {
      const scale = (p.fit === 'contain' ? Math.min : Math.max)(box.width / p.nw, box.height / p.nh), w = p.nw * scale, h = p.nh * scale;
      u = (x - box.left - (box.width - w) * p.px) / w;
      v = (y - box.top - (box.height - h) * p.py) / h;
    }
    if (u < 0 || u >= 1 || v < 0 || v >= 1) return GAIN.panel;
    const lum = grid[Math.floor(v * LUMA) * LUMA + Math.floor(u * LUMA)];
    return GAIN.photo + (GAIN.panel - GAIN.photo) * (1 - smoothstep(.06, .4, lum));
  }
  return -1;
}

function textRects(tab, at) {
  const rects = [], walker = document.createTreeWalker(tab, NodeFilter.SHOW_TEXT), range = document.createRange();
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.data.trim() || node.parentElement?.closest('[hidden],.mm-sr,.sr-only')) continue;
    range.selectNodeContents(node);
    for (const r of range.getClientRects()) if (r.width && r.height) rects.push({left:r.left + at.x, right:r.right + at.x, top:r.top + at.y, bottom:r.bottom + at.y});
  }
  return rects;
}
function within(rects, x, y, pad) {
  for (const r of rects) if (x > r.left - pad && x < r.right + pad && y > r.top - pad && y < r.bottom + pad) return true;
  return false;
}
function insidePolygon(points, x, y) {
  let hit = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if ((a.y > y) !== (b.y > y) && x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x) hit = !hit;
  }
  return hit;
}
function edgeDistance(points, x, y) {
  let best = Infinity;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length], dx = b.x - a.x, dy = b.y - a.y, len = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / len));
    best = Math.min(best, Math.hypot(x - a.x - t * dx, y - a.y - t * dy));
  }
  return best;
}
function eligible(tab) {
  if (!acceptsLight(tab) || tab.closest('dialog,.mm-header,.mm-dock')) return false;
  const b = tab.getBoundingClientRect();
  return b.width > 0 && b.height > 0 && b.bottom > 0 && b.right > 0 && b.top < innerHeight && b.left < innerWidth;
}

export function glyphSurfaces(field, {cards, feed}) {
  const cells = field.cells, layer = document.createElement('div'), canvas = document.createElement('canvas');
  layer.className = 'mm-glyph-surface';
  layer.setAttribute('aria-hidden', 'true');
  layer.append(canvas);
  document.body.append(layer);
  const ctx = canvas.getContext('2d');
  let gain = new Float32Array(0), owner = new Int16Array(0), rim = new Uint8Array(0), shown = new Float32Array(0), letters = new Int8Array(0);
  let tabs = [], members = new Map(), hidden = false;
  let current = null, travel = 0, waveTravel = 0, lastWave = -5;

  function forget() {
    gain.fill(0); owner.fill(0); rim.fill(0);
    tabs = []; members = new Map();
  }
  function wipe() {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    shown.fill(0);
  }
  const renderer = {
    resize(f) {
      canvas.width = Math.max(1, Math.round(f.width * f.dpr));
      canvas.height = Math.max(1, Math.round(f.height * f.dpr));
      canvas.style.height = f.height + 'px';
      canvas.style.top = f.anchorTop + 'px';
      ctx?.setTransform(f.dpr, 0, 0, f.dpr, 0, 0);
      gain = new Float32Array(f.count); owner = new Int16Array(f.count); rim = new Uint8Array(f.count); shown = new Float32Array(f.count); letters = new Int8Array(f.count);
      tabs = []; members = new Map(); current = null;
    },
    // The live window moved along the wall: the glyphs and their surfaces keep their place on the page.
    shift(rows, f) {
      shiftCanvas(canvas, rows, f);
      canvas.style.top = f.anchorTop + 'px';
      for (const array of [gain, owner, rim, shown, letters]) shiftArray(array, rows, f.cols, 0);
      const offset = rows * f.cols, count = f.count;
      for (const entry of members.values()) {
        entry.ids = entry.ids.map(id => id - offset).filter(id => id >= 0 && id < count);
        entry.stale = true;
      }
    },
    paint(id, cell) {
      if (!ctx) return;
      const g = gain[id];
      let alpha = g && cell.surface && !hidden ? Math.min(1, cell.level * g) : 0;
      if (alpha < .008) alpha = 0;
      const before = shown[id];
      if (alpha === before && !alpha) return;
      if (alpha && Math.abs(alpha - before) < (alpha > before ? .006 : .015) && cell.letter === letters[id]) return;
      cells.stamp(ctx, id, cell.letter, alpha, cell.tone);
      shown[id] = alpha;
      letters[id] = cell.letter;
    },
    release(id) {
      if (!ctx || !shown[id]) return;
      cells.stamp(ctx, id, -1, 0);
      shown[id] = 0;
    }
  };
  field.addRenderer(renderer);
  // Only the glyphs woken by a pointer or a finger hand their light to the edge they touch.
  cells.onIgnite = (id, strength, cell) => {
    if (!cell.feed || !rim[id] || hidden) return;
    const tab = tabs[owner[id] - 1];
    if (tab) feed(tab, strength * (cell.life === 'wave' ? .35 : .3));
  };

  function shade(tab) {
    const entry = members.get(tab);
    if (!entry) return;
    for (const id of entry.ids) {
      if (owner[id] !== entry.index) continue;
      const photo = rim[id] ? -1 : photoGain(entry.photos, cells.x(id), cells.docY(id));
      gain[id] = rim[id] ? GAIN.rim : photo >= 0 ? photo : GAIN.panel;
    }
  }
  function sampled(src) { for (const [tab, entry] of members) if (entry.photos.some(p => p.src === src)) shade(tab); }
  function unmap(entry) { for (const id of entry.ids) if (owner[id] === entry.index) {owner[id] = 0; gain[id] = 0; rim[id] = 0;} }
  function map(tab) {
    const known = members.get(tab);
    if (known && !known.stale) return known.ids;
    if (!cells.cols) return null;
    if (known) unmap(known);
    const at = page(), index = known ? known.index : tabs.push(tab);
    const points = outlineOf(tab).map(p => ({x:p.x + at.x, y:p.y + at.y}));
    const photos = [...tab.querySelectorAll('img:not([aria-hidden=true]),video')].map(img => photoOf(img, at)).filter(p => p.box.width && p.box.height);
    const texts = textRects(tab, at);
    const xs = points.map(p => p.x), ys = points.map(p => p.y);
    const c0 = Math.max(0, Math.floor(Math.min(...xs) / PITCH)), c1 = Math.min(cells.cols - 1, Math.floor(Math.max(...xs) / PITCH));
    const r0 = Math.max(0, Math.floor((Math.min(...ys) - cells.anchorTop) / PITCH)), r1 = Math.min(cells.rows - 1, Math.floor((Math.max(...ys) - cells.anchorTop) / PITCH));
    const list = [];
    for (let row = r0; row <= r1; row++) for (let col = c0; col <= c1; col++) {
      const id = row * cells.cols + col, x = cells.x(id), y = cells.docY(id);
      if (owner[id] || !insidePolygon(points, x, y) || within(texts, x, y, 3)) continue;
      owner[id] = index;
      rim[id] = edgeDistance(points, x, y) < RIM ? 1 : 0;
      list.push(id);
    }
    const ids = Int32Array.from(list);
    members.set(tab, {ids, photos, index, stale:false});
    shade(tab);
    for (const p of photos) if (p.img instanceof HTMLImageElement) sample(p.img, sampled);
    return ids;
  }
  // Photographs near the screen are sampled while the page is idle, so the first hover finds them ready.
  function prepare() {
    const idle = window.requestIdleCallback || (fn => setTimeout(() => fn(null), 80));
    const queue = [...new Set([...cards].flatMap(tab => [...tab.querySelectorAll('img')]))];
    function next(deadline) {
      let remaining = 3;
      while (queue.length && remaining-- && (!deadline || deadline.didTimeout || deadline.timeRemaining() > 2)) sample(queue.pop(),sampled);
      if (queue.length) idle(next,{timeout:1000});
    }
    if (queue.length) idle(next,{timeout:1000});
  }
  function mapVisible() { for (const tab of cards) if ((!members.has(tab) || members.get(tab).stale) && eligible(tab)) map(tab); }
  function show() {
    if (!hidden) return;
    hidden = false;
  }
  // Page-aligned glyph cells are invalid as soon as their slide moves.
  function release() {
    if (hidden) return;
    hidden = true;
    current = null;
    if (members.size) {forget();wipe();}
  }
  function enter(tab, x, y) {
    const ids = map(tab);
    current = tab; travel = 0; waveTravel = 0;
    if (!ids?.length) return;
    const index = members.get(tab).index;
    for (let n = 0; n < TRAIL.burst; n++) {
      const a = range(0, 6.283), r = 28 * Math.sqrt(Math.random()), id = cells.cellAt(x + r * Math.cos(a), y + r * Math.sin(a));
      if (id >= 0 && owner[id] === index) cells.ignite(id, range(.6, .95), {life:'trail', warm:true, feed:true});
    }
  }
  // The trail: glyphs wake around the pointer and decode; every 150 px a small front runs through the surface.
  function move(tab, x, y, distance) {
    if (!field.ready || field.blocked) return;
    if (!tab) {current = null;return;}
    show();
    if (tab !== current) {
      current = null;
      if (!eligible(tab)) return;
      enter(tab, x, y);
      field.wake();
      return;
    }
    const ids = map(tab), index = members.get(tab)?.index;
    if (!ids?.length) return;
    travel += Math.min(distance, 200);
    waveTravel += Math.min(distance, 200);
    while (travel > TRAIL.every) {
      travel -= TRAIL.every;
      const a = range(0, 6.283), r = TRAIL.radius * Math.sqrt(Math.random());
      const id = cells.cellAt(x + r * Math.cos(a), y + r * Math.sin(a));
      if (id >= 0 && owner[id] === index && Math.random() < 1 - (r / TRAIL.radius) ** 2) cells.ignite(id, range(.45, .9), {life:'trail', warm:true, feed:true});
    }
    if (waveTravel >= TRAIL.wave && cells.time - lastWave >= TRAIL.gap) {
      waveTravel = 0; lastWave = cells.time;
      cells.impulse(x, y, {cells:ids, power:TRAIL.power, reach:TRAIL.reach, limited:false, feed:true});
    }
    field.wake();
  }
  // A touch sends one front through every surface on screen and through the margins.
  function touch(clientX, clientY) {
    if (!field.ready || field.blocked) return false;
    return field.impulse(clientX, clientY, {feed:true, power:.85});
  }
  // A front through the whole screen: surfaces on screen that were never measured are measured now.
  function realign() { show(); mapVisible(); }
  field.on('impulse', (x, y, options) => { if (!options.quiet && !options.cells) realign(); });
  field.on('ready', () => {forget(); wipe(); setTimeout(prepare, 1200);});
  return {move,release,touch};
}
