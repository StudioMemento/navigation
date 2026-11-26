import { acceptsLight, outlineOf } from './surface-targets.mjs';

// Light lives on the outline of a surface: a thin bright filament on the edge and a short halo outside it.
// Each surface keeps 96 segments of light with a short memory, so the light flows along the edge and fades.
const BINS = 96, STEP = 8, HALO = 40, TILE = 256, LEVELS = 10;
const LIGHT = {
  base: .13,            // the whole outline of the surface under the pointer
  reach: 260,           // px from the edge at which the hovered surface still lights its nearest segment
  near: 230,            // neighbours light only within this distance, on the side facing the pointer
  neighbour: .25,
  rise: .12, fall: .42, // seconds
  halo: .16             // below this a segment shows its filament only
};
function smooth(t) { t = Math.max(0, Math.min(1, t)); return t*t*t*(t*(t*6-15)+10); }

function contour(points) {
  const edges = [];
  let length = 0;
  points.forEach((a, i) => {
    const b = points[(i + 1) % points.length];
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
    if (!len) return;
    edges.push({x:a.x, y:a.y, ux:dx/len, uy:dy/len, len, start:length});
    length += len;
  });
  const shape = new Path2D();
  points.forEach((p, i) => { if (!i) shape.moveTo(p.x, p.y); else shape.lineTo(p.x, p.y); });
  shape.closePath();
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  return {edges, length, points, shape, left:Math.min(...xs), right:Math.max(...xs), top:Math.min(...ys), bottom:Math.max(...ys)};
}
function nearestOnPath(path, x, y) {
  let gap = Infinity, at = 0, px = 0, py = 0;
  for (const e of path.edges) {
    const t = Math.max(0, Math.min(e.len, (x - e.x) * e.ux + (y - e.y) * e.uy));
    const qx = e.x + t * e.ux, qy = e.y + t * e.uy, d = Math.hypot(x - qx, y - qy);
    if (d < gap) {gap = d; at = e.start + t; px = qx; py = qy;}
  }
  return {gap, at, px, py};
}
function inside(path, x, y) {
  let hit = false;
  const p = path.points;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    if ((p[i].y > y) !== (p[j].y > y) && x < (p[j].x - p[i].x) * (y - p[i].y) / (p[j].y - p[i].y) + p[i].x) hit = !hit;
  }
  return hit;
}
function along(path, at, spread, gain, into) {
  for (let i = 0; i < BINS; i++) {
    const distance = Math.abs(i * path.length / BINS - at);
    const d = Math.min(distance, path.length - distance) / spread;
    into[i] = Math.max(into[i], gain * Math.exp(-.9 * d * d));
  }
}

// The soft halo, cached once. Its support ends at zero in every direction, so tiles join without seams.
function makeHalo() {
  const canvas = document.createElement('canvas'), scale = 2;
  canvas.width = canvas.height = 2 * HALO * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const img = ctx.createImageData(canvas.width, canvas.height);
  for (let row = 0; row < canvas.height; row++) {
    const y = (row + .5) / scale - HALO;
    for (let col = 0; col < canvas.width; col++) {
      const x = (col + .5) / scale - HALO, d = x*x + y*y, r = Math.sqrt(d);
      if (r >= HALO) continue;
      const alpha = (.62 * Math.exp(-d / 70) + .38 * Math.exp(-d / 420)) * (1 - smooth((r - 22) / (HALO - 22))) * STEP / 9;
      if (alpha < .5 / 255) continue;
      const i = 4 * (row * canvas.width + col);
      img.data[i] = 255; img.data[i + 1] = 138; img.data[i + 2] = 40; img.data[i + 3] = 255 * Math.min(1, alpha);
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

// Only screen tiles that hold light have a backing store; only tiles whose light changed are painted again.
function painter() {
  const tiles = new Map(), spare = [];
  let halo = null, plane = null;
  function attach(parent) {
    if (!plane) {
      plane = document.createElement('div');
      plane.className = 'mm-edge-plane';
      plane.setAttribute('aria-hidden', 'true');
    }
    if (plane.parentNode !== parent) {clear(); parent.append(plane);}
    plane.style.opacity = '';
    return plane.getBoundingClientRect();
  }
  function drop(key, tile) {
    tile.canvas.remove(); tiles.delete(key);
    if (spare.length < 6) spare.push(tile);
  }
  function clear() { for (const [key, tile] of tiles) drop(key, tile); }
  function fade(done) {
    if (!plane?.isConnected || !tiles.size) {done(); return;}
    plane.style.transition = 'opacity .18s ease-out';
    plane.style.opacity = '0';
    setTimeout(() => {clear(); plane.style.transition = ''; done();}, 200);
  }
  function tileOf(col, row, dpr) {
    const key = col + ',' + row;
    let tile = tiles.get(key);
    if (!tile) {
      tile = spare.pop();
      if (!tile) {
        const canvas = document.createElement('canvas');
        canvas.className = 'mm-edge-light';
        canvas.style.width = canvas.style.height = TILE + 'px';
        tile = {canvas, ctx:canvas.getContext('2d')};
      }
      tiles.set(key, tile);
      plane.append(tile.canvas);
      tile.canvas.style.transform = 'translate(' + col * TILE + 'px,' + row * TILE + 'px)';
    }
    const size = Math.round(TILE * dpr);
    if (tile.canvas.width !== size) tile.canvas.width = tile.canvas.height = size;
    return tile;
  }
  // states: surfaces with light; view: the visible part of the plane; dirty: tile keys to paint again.
  function paint(states, blockers, view, dirty, all) {
    if (!halo) halo = makeHalo();
    if (!halo || !plane) return;
    const dpr = Math.round(TILE * Math.min(window.devicePixelRatio || 1, 1.5)) / TILE;
    const want = new Set();
    for (const state of states.values()) {
      const p = state.path;
      for (let row = Math.floor((p.top - HALO) / TILE); row <= Math.floor((p.bottom + HALO) / TILE); row++)
        for (let col = Math.floor((p.left - HALO) / TILE); col <= Math.floor((p.right + HALO) / TILE); col++) {
          if ((col + 1) * TILE < view.left || col * TILE > view.right || (row + 1) * TILE < view.top || row * TILE > view.bottom) continue;
          want.add(col + ',' + row);
        }
    }
    for (const [key, tile] of tiles) if (!want.has(key)) drop(key, tile);
    for (const key of want) {
      if (!all && tiles.has(key) && !dirty.has(key)) continue;
      const [col, row] = key.split(',').map(Number);
      const {ctx} = tileOf(col, row, dpr);
      if (!ctx) continue;
      const x0 = col * TILE, y0 = row * TILE;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      const cores = Array.from({length:LEVELS}, () => null);
      for (const state of states.values()) {
        const p = state.path;
        if (p.right + HALO < x0 || p.left - HALO > x0 + TILE || p.bottom + HALO < y0 || p.top - HALO > y0 + TILE) continue;
        for (const e of p.edges) {
          const count = Math.ceil(e.len / STEP), step = e.len / count;
          for (let n = 0; n < count; n++) {
            const t = step * (n + .5), bin = (e.start + t) * BINS / p.length;
            const i = Math.floor(bin) % BINS, f = bin - Math.floor(bin);
            const power = state.energy[i] * (1 - f) + state.energy[(i + 1) % BINS] * f;
            if (power < .004) continue;
            const x = e.x + t * e.ux, y = e.y + t * e.uy;
            if (x + HALO < x0 || x - HALO > x0 + TILE || y + HALO < y0 || y - HALO > y0 + TILE) continue;
            if (power > LIGHT.halo) {
              ctx.globalAlpha = Math.min(1, (power - LIGHT.halo) * .85);
              ctx.setTransform(dpr * e.ux, dpr * e.uy, -dpr * e.uy, dpr * e.ux, dpr * (x - x0), dpr * (y - y0));
              ctx.drawImage(halo, -HALO, -HALO, HALO * 2, HALO * 2);
            }
            const level = Math.min(LEVELS - 1, Math.floor(Math.min(1, power) * LEVELS));
            const path = cores[level] || (cores[level] = new Path2D());
            path.moveTo(x - e.ux * step / 2 - x0, y - e.uy * step / 2 - y0);
            path.lineTo(x + e.ux * step / 2 - x0, y + e.uy * step / 2 - y0);
          }
        }
      }
      // The halo stays outside the surfaces: photographs and type are never washed by it.
      ctx.setTransform(dpr, 0, 0, dpr, -x0 * dpr, -y0 * dpr);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000';
      for (const b of blockers) {
        if (b.right > x0 && b.left < x0 + TILE && b.bottom > y0 && b.top < y0 + TILE) ctx.fill(b.shape);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1.15;
      ctx.lineCap = 'round';
      cores.forEach((path, level) => {
        if (!path) return;
        const power = (level + .5) / LEVELS;
        ctx.globalAlpha = Math.min(1, .12 + power * 1.05);
        ctx.strokeStyle = power > .55 ? '#ffd9ad' : '#ffa23d';
        ctx.stroke(path);
      });
      ctx.globalAlpha = 1;
    }
  }
  return {attach, paint, clear, fade};
}

export function edgeLight(cards, wake) {
  const states = new Map(), paths = new WeakMap(), paint = painter();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let parent = document.body, origin = {left:0, top:0}, blockers = [], changed = true, all = true, fading = false;
  function local(points) { return points.map(p => ({x:p.x - origin.left, y:p.y - origin.top})); }
  function geometry(card) {
    const points = local(outlineOf(card)), old = paths.get(card);
    if (old && points.length === old.points.length && points.every((p, i) => p.x === old.points[i].x && p.y === old.points[i].y)) return old;
    const path = contour(points); paths.set(card, path); return path;
  }
  function stateOf(card) {
    let state = states.get(card);
    if (!state) {
      state = {energy:new Float32Array(BINS), next:new Float32Array(BINS), target:new Float32Array(BINS), dirty:new Uint8Array(BINS), peak:0};
      states.set(card, state);
    }
    state.path = geometry(card);
    return state;
  }
  function anchor(dialog) {
    const host = dialog || document.body;
    if (host !== parent) all = true;
    parent = host;
    origin = paint.attach(parent);
  }
  // point: client px; primary: the surface under the pointer (or focused); neighbours only for a fine pointer.
  function target(point, {dialog = null, primary = null, neighbours = true} = {}) {
    if (fading) return;
    anchor(dialog);
    changed = true;
    for (const state of states.values()) state.target.fill(0);
    if (!point || document.fullscreenElement) return;
    const x = point.x - origin.left, y = point.y - origin.top;
    const nearby = [];
    for (const card of cards) {
      if (!card.isConnected || (dialog ? !dialog.contains(card) : card.closest('dialog'))) continue;
      const b = card.getBoundingClientRect();
      if (!b.width || !b.height) continue;
      const eligible = acceptsLight(card), reach = card === primary ? LIGHT.reach : LIGHT.near;
      nearby.push({card, box:b, eligible});
      if (!eligible || (card !== primary && !neighbours)) continue;
      if (point.x < b.left - reach || point.x > b.right + reach || point.y < b.top - reach || point.y > b.bottom + reach) continue;
      const state = stateOf(card), path = state.path;
      const {gap, at, px, py} = nearestOnPath(path, x, y);
      const spread = Math.min(135, Math.max(29, path.length * .17));
      if (card === primary) {
        state.target.fill(LIGHT.base);
        along(path, at, spread, .5 + .5 * (1 - smooth(gap / LIGHT.reach)), state.target);
      } else {
        if (inside(path, x, y) || gap >= LIGHT.near) continue;
        // A cut corner may be physically behind another surface.
        const cx = (path.left + path.right) / 2, cy = (path.top + path.bottom) / 2;
        const inward = Math.min(1, 4 / Math.max(1, Math.hypot(cx - px, cy - py)));
        const hit = document.elementFromPoint(px + origin.left + (cx - px) * inward, py + origin.top + (cy - py) * inward);
        if (hit && !card.contains(hit)) continue;
        along(path, at, spread * .7, LIGHT.neighbour * (1 - smooth(gap / LIGHT.near)), state.target);
      }
    }
    const emitters = [...states.values()].map(s => s.path);
    blockers = [];
    for (const {card, box:b, eligible} of nearby) {
      const l = b.left - origin.left, t = b.top - origin.top;
      if (!emitters.some(p => l < p.right + HALO && l + b.width > p.left - HALO && t < p.bottom + HALO && t + b.height > p.top - HALO)) continue;
      // An inactive preview still owns its photograph: protect it from a neighbouring halo.
      if (!eligible) {
        const style = getComputedStyle(card);
        if (style.visibility !== 'visible' || Number(style.opacity) < .005) continue;
      }
      blockers.push(geometry(card));
    }
  }
  // Light handed to an outline by the glyph field: it rises at once and fades with the outline's own memory.
  function feed(card, clientX, clientY, strength) {
    if (fading || !acceptsLight(card) || (card.closest('dialog') && parent === document.body)) return;
    const state = stateOf(card), path = state.path;
    const {at} = nearestOnPath(path, clientX - origin.left, clientY - origin.top);
    const spread = Math.min(60, Math.max(18, path.length * .05)), gain = Math.min(1, strength);
    for (let i = 0; i < BINS; i++) {
      const distance = Math.abs(i * path.length / BINS - at);
      const d = Math.min(distance, path.length - distance) / spread;
      const value = Math.min(1, state.energy[i] + gain * Math.exp(-.9 * d * d));
      if (value !== state.energy[i]) {state.energy[i] = value; state.dirty[i] = 1;}
    }
    if (!blockers.includes(path)) blockers.push(path);
    changed = true;
    wake();
  }
  function frame(dt) {
    let moving = false;
    const fall = Math.exp(-dt / LIGHT.fall), rise = 1 - Math.exp(-dt / LIGHT.rise), flow = Math.min(.14, dt * 2);
    for (const [card, state] of states) {
      if (!acceptsLight(card)) {
        // A surface that stops taking light (a carousel moving on) lets its light go quickly.
        state.target.fill(0);
      }
      let max = 0;
      for (let i = 0; i < BINS; i++) {
        const before = state.energy[i], aim = state.target[i];
        const adjacent = state.energy[(i + BINS - 1) % BINS] + state.energy[(i + 1) % BINS];
        let value = aim >= before ? before + (aim - before) * rise : Math.max(aim, (before + flow * (adjacent - 2 * before)) * fall);
        if (reduced.matches || Math.abs(value - aim) < Math.max(.002, state.peak * .02)) value = aim;
        state.next[i] = value;
        if (value > max) max = value;
        if (Math.abs(before - value) > .0005) {state.dirty[i] = 1; changed = true;}
        if (value !== aim) moving = true;
      }
      const old = state.energy; state.energy = state.next; state.next = old;
      state.peak = Math.max(max, state.peak * Math.exp(-dt / 1.5));
      if (max < .004 && !state.target.some(p => p > .004)) {states.delete(card); changed = all = true;}
    }
    if (changed) {
      const view = {left:-origin.left - HALO, top:-origin.top - HALO, right:-origin.left + innerWidth + HALO, bottom:-origin.top + innerHeight + HALO};
      const dirty = new Set();
      if (!all) for (const state of states.values()) {
        const p = state.path;
        for (const e of p.edges) {
          const count = Math.ceil(e.len / STEP), step = e.len / count;
          for (let n = 0; n < count; n++) {
            const t = step * (n + .5), i = Math.floor((e.start + t) * BINS / p.length) % BINS;
            if (!state.dirty[i] && !state.dirty[(i + 1) % BINS]) continue;
            const x = e.x + t * e.ux, y = e.y + t * e.uy;
            for (let r = Math.floor((y - HALO) / TILE); r <= Math.floor((y + HALO) / TILE); r++)
              for (let c = Math.floor((x - HALO) / TILE); c <= Math.floor((x + HALO) / TILE); c++) dirty.add(c + ',' + r);
          }
        }
      }
      paint.paint(states, blockers, view, dirty, all);
      for (const state of states.values()) state.dirty.fill(0);
      changed = all = false;
    }
    return moving;
  }
  // The page scrolled: the plane moves with the document, only the newly visible tiles need painting.
  function scrolled() { if (!fading && states.size) {origin = paint.attach(parent); changed = all = true; wake();} }
  function clear() { states.clear(); blockers = []; paint.clear(); changed = all = true; }
  function fade() {
    if (fading) return;
    fading = true;
    paint.fade(() => {fading = false; states.clear(); blockers = []; changed = all = true;});
  }
  return {target, feed, frame, clear, fade, scrolled};
}
