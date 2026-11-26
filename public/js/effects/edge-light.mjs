import { acceptsLight, outlineOf } from './surface-targets.mjs';

// Light lives on the outline of a surface: a thin bright filament on the edge and a soft glow outside it.
// The glow belongs to the surface that emits it: it is cut by that surface only, and it lies over whatever is
// around it, neighbouring slides included. Each surface keeps 96 segments of light with a short memory,
// so the light flows along the edge and fades.
const BINS = 96, STEP = 8, TILE = 256, LEVELS = 10;
const GLOW = {near:{sigma:4, peak:.45}, far:{sigma:18, peak:.34}, radius:56, from:.1};
const LIGHT = {
  base: .14,            // the whole outline of the surface under the pointer: filament only
  reach: 320,           // px from the edge at which the hovered surface still lights its nearest segment
  floor: .4,            // the nearest segment never drops below this while the surface is hovered
  near: 230,            // neighbours light only within this distance, on the side facing the pointer
  neighbour: .25,
  rise: .12, fall: .42  // seconds
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
  // Everything but the surface itself: the glow is clipped to it with the even-odd rule.
  const outside = new Path2D();
  outside.rect(-1e6, -1e6, 2e6, 2e6);
  points.forEach((p, i) => { if (!i) outside.moveTo(p.x, p.y); else outside.lineTo(p.x, p.y); });
  outside.closePath();
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  return {edges, length, points, outside, left:Math.min(...xs), right:Math.max(...xs), top:Math.min(...ys), bottom:Math.max(...ys)};
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
function along(path, at, spread, gain, into, add = false) {
  for (let i = 0; i < BINS; i++) {
    const distance = Math.abs(i * path.length / BINS - at);
    const d = Math.min(distance, path.length - distance) / spread;
    const value = gain * Math.exp(-.9 * d * d);
    into[i] = add ? Math.min(1, into[i] + value) : Math.max(into[i], value);
  }
}

// The glow brush: two gaussians whose amplitude is divided by the stamping step, so a straight edge of full
// power sums to the same soft profile however densely it is stamped: no blobs where stamps pile up.
function makeGlow() {
  const R = GLOW.radius, scale = 2, canvas = document.createElement('canvas');
  canvas.width = canvas.height = 2 * R * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const amp = g => g.peak * STEP / (g.sigma * Math.sqrt(2 * Math.PI));
  const a1 = amp(GLOW.near), a2 = amp(GLOW.far);
  for (let row = 0; row < canvas.height; row++) {
    const y = (row + .5) / scale - R;
    for (let col = 0; col < canvas.width; col++) {
      const x = (col + .5) / scale - R, d = x*x + y*y, r = Math.sqrt(d);
      if (r >= R) continue;
      const near = a1 * Math.exp(-d / (2 * GLOW.near.sigma ** 2)), far = a2 * Math.exp(-d / (2 * GLOW.far.sigma ** 2));
      const alpha = (near + far) * (1 - smooth((r - R * .7) / (R * .3)));
      if (alpha < .5 / 255) continue;
      const i = 4 * (row * canvas.width + col), hot = near / (near + far);
      img.data[i] = 255; img.data[i + 1] = Math.round(118 + 70 * hot); img.data[i + 2] = Math.round(20 + 60 * hot); img.data[i + 3] = 255 * Math.min(1, alpha);
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

// Only tiles that hold light have a backing store; only tiles whose light changed are painted again.
// Tiles never reach past the page: a glow near the edge never makes the page wider or longer.
function painter() {
  const tiles = new Map(), spare = [];
  let glow = null, plane = null;
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
  // The extent of the plane's host, measured without the plane itself.
  function extent() {
    const host = plane.parentNode;
    if (host !== document.body) return {width:host.clientWidth, height:host.clientHeight};
    let bottom = 0;
    for (const child of host.children) {
      if (child === plane || child.matches('script,style,dialog:not([open])')) continue;
      const style = getComputedStyle(child);
      if (style.position === 'fixed' || style.display === 'none') continue;
      bottom = Math.max(bottom, child.getBoundingClientRect().bottom - plane.getBoundingClientRect().top + parseFloat(style.marginBottom || 0));
    }
    return {width:document.documentElement.clientWidth, height:Math.max(bottom, innerHeight)};
  }
  function tileOf(col, row, dpr, room) {
    const key = col + ',' + row;
    const width = Math.min(TILE, room.width - col * TILE), height = Math.min(TILE, room.height - row * TILE);
    let tile = tiles.get(key);
    if (width <= 0 || height <= 0) {if (tile) drop(key, tile); return null;}
    if (!tile) {
      tile = spare.pop();
      if (!tile) {
        const canvas = document.createElement('canvas');
        canvas.className = 'mm-edge-light';
        tile = {canvas, ctx:canvas.getContext('2d')};
      }
      tiles.set(key, tile);
      plane.append(tile.canvas);
      tile.canvas.style.transform = 'translate(' + col * TILE + 'px,' + row * TILE + 'px)';
    }
    const w = Math.round(width * dpr), h = Math.round(height * dpr);
    if (tile.canvas.width !== w || tile.canvas.height !== h) {
      tile.canvas.width = w; tile.canvas.height = h;
      tile.canvas.style.width = width + 'px'; tile.canvas.style.height = height + 'px';
    }
    return tile;
  }
  // states: surfaces with light; view: the visible part of the plane; dirty: tile keys to paint again.
  function paint(states, view, dirty, all) {
    if (!glow) glow = makeGlow();
    if (!glow || !plane) return;
    const dpr = Math.round(TILE * Math.min(window.devicePixelRatio || 1, 1.5)) / TILE, R = GLOW.radius;
    const want = new Set();
    for (const state of states.values()) {
      const p = state.path;
      for (let row = Math.floor((p.top - R) / TILE); row <= Math.floor((p.bottom + R) / TILE); row++)
        for (let col = Math.floor((p.left - R) / TILE); col <= Math.floor((p.right + R) / TILE); col++) {
          if ((col + 1) * TILE < view.left || col * TILE > view.right || (row + 1) * TILE < view.top || row * TILE > view.bottom) continue;
          want.add(col + ',' + row);
        }
    }
    for (const [key, tile] of tiles) if (!want.has(key)) drop(key, tile);
    if (!want.size) return;
    const room = extent();
    for (const key of want) {
      if (!all && tiles.has(key) && !dirty.has(key)) continue;
      const [col, row] = key.split(',').map(Number);
      const tile = tileOf(col, row, dpr, room);
      if (!tile?.ctx) continue;
      const {ctx} = tile, x0 = col * TILE, y0 = row * TILE;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      const cores = Array.from({length:LEVELS}, () => null);
      for (const state of states.values()) {
        const p = state.path;
        if (p.right + R < x0 || p.left - R > x0 + TILE || p.bottom + R < y0 || p.top - R > y0 + TILE) continue;
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, -x0 * dpr, -y0 * dpr);
        ctx.clip(p.outside, 'evenodd');
        for (const e of p.edges) {
          const count = Math.ceil(e.len / STEP), step = e.len / count;
          for (let n = 0; n < count; n++) {
            const t = step * (n + .5), bin = (e.start + t) * BINS / p.length;
            const i = Math.floor(bin) % BINS, f = bin - Math.floor(bin);
            const power = state.energy[i] * (1 - f) + state.energy[(i + 1) % BINS] * f;
            if (power < .004) continue;
            const x = e.x + t * e.ux, y = e.y + t * e.uy;
            if (x + R < x0 || x - R > x0 + TILE || y + R < y0 || y - R > y0 + TILE) continue;
            if (power > GLOW.from) {
              ctx.globalAlpha = Math.min(1, (power - GLOW.from) / (1 - GLOW.from));
              ctx.setTransform(dpr * e.ux, dpr * e.uy, -dpr * e.uy, dpr * e.ux, dpr * (x - x0), dpr * (y - y0));
              ctx.drawImage(glow, -R, -R, R * 2, R * 2);
            }
            const level = Math.min(LEVELS - 1, Math.floor(Math.min(1, power) * LEVELS));
            const path = cores[level] || (cores[level] = new Path2D());
            path.moveTo(x - e.ux * step / 2 - x0, y - e.uy * step / 2 - y0);
            path.lineTo(x + e.ux * step / 2 - x0, y + e.uy * step / 2 - y0);
          }
        }
        ctx.restore();
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
  let parent = document.body, origin = {left:0, top:0}, changed = true, all = true, fading = false;
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
    for (const card of cards) {
      if (!card.isConnected || (dialog ? !dialog.contains(card) : card.closest('dialog'))) continue;
      if (!acceptsLight(card) || (card !== primary && !neighbours)) continue;
      const b = card.getBoundingClientRect(), reach = card === primary ? LIGHT.reach : LIGHT.near;
      if (!b.width || !b.height) continue;
      if (point.x < b.left - reach || point.x > b.right + reach || point.y < b.top - reach || point.y > b.bottom + reach) continue;
      const state = stateOf(card), path = state.path;
      const {gap, at, px, py} = nearestOnPath(path, x, y);
      if (card === primary) {
        state.target.fill(LIGHT.base);
        along(path, at, Math.min(240, Math.max(60, path.length * .2)), LIGHT.floor + (1 - LIGHT.floor) * (1 - smooth(gap / LIGHT.reach)), state.target);
      } else {
        if (inside(path, x, y) || gap >= LIGHT.near) continue;
        // A cut corner may be physically behind another surface.
        const cx = (path.left + path.right) / 2, cy = (path.top + path.bottom) / 2;
        const inward = Math.min(1, 4 / Math.max(1, Math.hypot(cx - px, cy - py)));
        const hit = document.elementFromPoint(px + origin.left + (cx - px) * inward, py + origin.top + (cy - py) * inward);
        if (hit && !card.contains(hit)) continue;
        along(path, at, Math.min(150, Math.max(40, path.length * .12)), LIGHT.neighbour * (1 - smooth(gap / LIGHT.near)), state.target);
      }
    }
  }
  // Light handed to an outline by the glyph field: it rises at once and fades with the outline's own memory.
  function feed(card, clientX, clientY, strength) {
    if (fading || !acceptsLight(card) || (card.closest('dialog') && parent === document.body)) return;
    const state = stateOf(card), path = state.path;
    const {at} = nearestOnPath(path, clientX - origin.left, clientY - origin.top);
    const before = state.energy.slice();
    along(path, at, Math.min(90, Math.max(30, path.length * .06)), Math.min(.8, strength), state.energy, true);
    for (let i = 0; i < BINS; i++) if (state.energy[i] !== before[i]) state.dirty[i] = 1;
    changed = true;
    wake();
  }
  function frame(dt) {
    let moving = false;
    const fall = Math.exp(-dt / LIGHT.fall), rise = 1 - Math.exp(-dt / LIGHT.rise), flow = Math.min(.14, dt * 2);
    for (const [card, state] of states) {
      // A surface that stops taking light (a carousel moving on) lets its light go.
      if (!acceptsLight(card)) state.target.fill(0);
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
      const R = GLOW.radius;
      const view = {left:-origin.left - R, top:-origin.top - R, right:-origin.left + innerWidth + R, bottom:-origin.top + innerHeight + R};
      const dirty = new Set();
      if (!all) for (const state of states.values()) {
        const p = state.path;
        for (const e of p.edges) {
          const count = Math.ceil(e.len / STEP), step = e.len / count;
          for (let n = 0; n < count; n++) {
            const t = step * (n + .5), i = Math.floor((e.start + t) * BINS / p.length) % BINS;
            if (!state.dirty[i] && !state.dirty[(i + 1) % BINS]) continue;
            const x = e.x + t * e.ux, y = e.y + t * e.uy;
            for (let r = Math.floor((y - R) / TILE); r <= Math.floor((y + R) / TILE); r++)
              for (let c = Math.floor((x - R) / TILE); c <= Math.floor((x + R) / TILE); c++) dirty.add(c + ',' + r);
          }
        }
      }
      paint.paint(states, view, dirty, all);
      for (const state of states.values()) state.dirty.fill(0);
      changed = all = false;
    }
    return moving;
  }
  // The page scrolled: the plane moves with the document, only the newly visible tiles need painting.
  function scrolled() { if (!fading && states.size) {origin = paint.attach(parent); changed = all = true; wake();} }
  function clear() { states.clear(); paint.clear(); changed = all = true; }
  function fade() {
    if (fading) return;
    fading = true;
    paint.fade(() => {fading = false; states.clear(); changed = all = true;});
  }
  return {target, feed, frame, clear, fade, scrolled};
}
