import { acceptsLight, acceptsHint, isSlide, slideOf, slideDepth, outlineOf } from './surface-targets.mjs';

// Light lives on the outline of a surface: a thin filament on the edge and a short, intense glow just outside it.
// The glow is strongest on the edge and falls off fast (two exponentials, gone within 40 px): a lit edge, not a halo.
// It lies only in the empty space around the surfaces: never inside the surface that emits it, never on another
// surface. A slide behind another one keeps all its light behind it. Each surface keeps 96 segments of light with a
// short memory, so the light flows along the edge and fades, and it follows its surface while a slider moves.
const BINS = 96, STEP = 8, TILE = 256, LEVELS = 48;
const GLOW = {radius:40, peak:.92, near:4, far:13, mix:.62, step:8, from:.02};
const LIGHT = {
  base: .12,            // the whole outline of the surface under the pointer: filament only
  reach: 380,           // px from the edge at which the hovered surface still lights its nearest segment
  floor: .35,           // the nearest segment never drops below this while the surface is hovered
  near: 440,            // the hint: other surfaces on screen light within this distance, on the side facing the pointer
  neighbour: .3,
  rise: .14, fall: .5   // seconds
};
const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * t * (t * (t * 6 - 15) + 10); };

function contour(points) {
  const edges = [];
  let length = 0;
  points.forEach((a, i) => {
    const b = points[(i + 1) % points.length];
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
    if (!len) return;
    edges.push({x:a.x, y:a.y, ux:dx / len, uy:dy / len, len, start:length});
    length += len;
  });
  // Outward normals (from the centre of the outline) and the corners that turn outward.
  const cx = points.reduce((sum, p) => sum + p.x, 0) / (points.length || 1), cy = points.reduce((sum, p) => sum + p.y, 0) / (points.length || 1);
  for (const e of edges) {
    let nx = -e.uy, ny = e.ux;
    if (nx * (cx - (e.x + e.ux * e.len / 2)) + ny * (cy - (e.y + e.uy * e.len / 2)) > 0) {nx = -nx; ny = -ny;}
    e.nx = nx; e.ny = ny;
  }
  edges.forEach((e, i) => {
    const before = edges[(i + edges.length - 1) % edges.length];
    e.convex = e.ux * before.nx + e.uy * before.ny < -1e-6;
    e.before = before;
  });
  // Everything but the surface itself (even-odd): the clip that keeps light off it.
  const outside = new Path2D();
  outside.rect(-1e6, -1e6, 2e6, 2e6);
  points.forEach((p, i) => { if (!i) outside.moveTo(p.x, p.y); else outside.lineTo(p.x, p.y); });
  outside.closePath();
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  return {edges, length, points, outside, left:Math.min(...xs), right:Math.max(...xs), top:Math.min(...ys), bottom:Math.max(...ys)};
}
// Keep the light off every given surface, one clip each (they may overlap one another).
function shut(ctx, paths) { for (const path of paths) ctx.clip(path.outside, 'evenodd'); }
function nearestOnPath(path, x, y) {
  let gap = Infinity, at = 0;
  for (const e of path.edges) {
    const t = Math.max(0, Math.min(e.len, (x - e.x) * e.ux + (y - e.y) * e.uy));
    const d = Math.hypot(x - e.x - t * e.ux, y - e.y - t * e.uy);
    if (d < gap) {gap = d; at = e.start + t;}
  }
  return {gap, at};
}
function inside(path, x, y) {
  let hit = false;
  const p = path.points;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    if ((p[i].y > y) !== (p[j].y > y) && x < (p[j].x - p[i].x) * (y - p[i].y) / (p[j].y - p[i].y) + p[i].x) hit = !hit;
  }
  return hit;
}
// The nearest point of each edge, nearest first, until one is not covered by a surface in front of it.
function visibleNearest(path, x, y, covers) {
  const candidates = path.edges.map(e => {
    const t = Math.max(0, Math.min(e.len, (x - e.x) * e.ux + (y - e.y) * e.uy));
    const px = e.x + t * e.ux, py = e.y + t * e.uy;
    return {gap:Math.hypot(x - px, y - py), at:e.start + t, px, py};
  }).sort((a, b) => a.gap - b.gap);
  const cx = (path.left + path.right) / 2, cy = (path.top + path.bottom) / 2;
  for (const c of candidates) {
    const inward = Math.min(1, 4 / Math.max(1, Math.hypot(cx - c.px, cy - c.py)));
    const hx = c.px + (cx - c.px) * inward, hy = c.py + (cy - c.py) * inward;
    if (!covers.some(cover => inside(cover, hx, hy))) return c;
  }
  return null;
}
function along(path, at, spread, gain, into, add = false) {
  for (let i = 0; i < BINS; i++) {
    const distance = Math.abs(i * path.length / BINS - at);
    const d = Math.min(distance, path.length - distance) / spread;
    const value = gain * Math.exp(-.9 * d * d);
    into[i] = add ? Math.min(1, into[i] + value) : Math.max(into[i], value);
  }
}

// The glow across an edge: intense on the edge, a fast fall, nothing left at the radius.
function profile(d) {
  if (d >= GLOW.radius) return 0;
  const fall = GLOW.mix * Math.exp(-d / GLOW.near) + (1 - GLOW.mix) * Math.exp(-d / GLOW.far);
  return GLOW.peak * fall * (1 - smooth((d - GLOW.radius / 2) / (GLOW.radius / 2)));
}
// White brushes (the tile is tinted once, after), dithered so that no contour lines show in the gradient.
function brush(width, height, alphaAt) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const img = ctx.createImageData(width, height);
  for (let row = 0; row < height; row++)
    for (let col = 0; col < width; col++) {
      const alpha = alphaAt(col + .5, row + .5);
      if (alpha <= 0) continue;
      const i = 4 * (row * width + col);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
      img.data[i + 3] = Math.min(255, Math.floor(alpha * 255 + Math.random()));
    }
  ctx.putImageData(img, 0, 0);
  return canvas;
}
// strip: one step of an edge, outward only, weighted cos² along the edge (two neighbours add up to one).
// cap: the same fall around a corner.
function makeBrushes() {
  const R = GLOW.radius, S = GLOW.step;
  const strip = brush(2 * S, R, (x, y) => Math.cos(Math.PI / 2 * (x - S) / S) ** 2 * profile(y));
  const cap = brush(2 * R, 2 * R, (x, y) => profile(Math.hypot(x - R, y - R)));
  return strip && cap ? {strip, cap} : null;
}
// The filament: alpha and colour follow the light continuously.
const CORE = Array.from({length:LEVELS}, (_, i) => {
  const v = (i + .5) / LEVELS, mix = Math.min(1, Math.max(0, (v - .3) / .5));
  const g = Math.round(162 + (217 - 162) * mix), b = Math.round(61 + (173 - 61) * mix);
  return {alpha:.9 * (1 - Math.pow(1 - v, 2.2)), color:'rgb(255,' + g + ',' + b + ')'};
});
const tileKey = (col, row) => col + ',' + row;
function tilesAround(path, into) {
  const R = GLOW.radius;
  for (let row = Math.floor((path.top - R) / TILE); row <= Math.floor((path.bottom + R) / TILE); row++)
    for (let col = Math.floor((path.left - R) / TILE); col <= Math.floor((path.right + R) / TILE); col++) into.add(tileKey(col, row));
}

// Only tiles that hold light have a backing store; only tiles whose light changed are painted again.
// Each tile is two canvases: the glow (in CSS pixels) under the filament (in device pixels).
// Tiles never reach past the page: a glow near the edge never makes the page wider or longer.
function painter() {
  const tiles = new Map(), spare = [];
  let brushes = null, plane = null, room = null, roomAt = 0;
  function attach(parent) {
    if (!plane) {
      plane = document.createElement('div');
      plane.className = 'mm-edge-plane';
      plane.setAttribute('aria-hidden', 'true');
    }
    if (plane.parentNode !== parent) {clear(); room = null; parent.append(plane);}
    return plane.getBoundingClientRect();
  }
  function drop(key, tile) {
    tile.canvas.remove(); tile.halo.remove(); tiles.delete(key);
    if (spare.length < 6) spare.push(tile);
  }
  function clear() { for (const [key, tile] of tiles) drop(key, tile); }
  function fade(done) {
    if (!plane?.isConnected || !tiles.size) {done(); return;}
    plane.style.transition = 'opacity .18s ease-out';
    plane.style.opacity = '0';
    setTimeout(() => {clear(); plane.style.transition = plane.style.opacity = ''; done();}, 200);
  }
  // The extent of the plane's host, measured without the plane itself.
  function extent() {
    const host = plane.parentNode;
    if (host !== document.body) return {width:host.clientWidth, height:host.clientHeight};
    const top = plane.getBoundingClientRect().top;
    let bottom = 0;
    for (const child of host.children) {
      if (child === plane || child.matches('script,style,dialog:not([open]),.mm-glyph-field,.mm-glyph-surface')) continue;
      const style = getComputedStyle(child);
      if (style.position === 'fixed' || style.display === 'none') continue;
      bottom = Math.max(bottom, child.getBoundingClientRect().bottom - top + parseFloat(style.marginBottom || 0));
    }
    return {width:document.documentElement.clientWidth, height:Math.max(bottom, innerHeight)};
  }
  function size(canvas, width, height, scale) {
    const w = Math.max(1, Math.round(width * scale)), h = Math.max(1, Math.round(height * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    }
  }
  function tileOf(col, row, dpr) {
    const key = tileKey(col, row);
    const width = Math.min(TILE, room.width - col * TILE), height = Math.min(TILE, room.height - row * TILE);
    let tile = tiles.get(key);
    if (width <= 0 || height <= 0 || col < 0 || row < 0) {if (tile) drop(key, tile); return null;}
    if (!tile) {
      tile = spare.pop();
      if (!tile) {
        const canvas = document.createElement('canvas'), halo = document.createElement('canvas');
        canvas.className = halo.className = 'mm-edge-light';
        tile = {canvas, halo, ctx:canvas.getContext('2d'), hctx:halo.getContext('2d')};
      }
      tiles.set(key, tile);
      plane.append(tile.halo, tile.canvas);
      tile.canvas.style.transform = tile.halo.style.transform = 'translate(' + col * TILE + 'px,' + row * TILE + 'px)';
    }
    size(tile.canvas, width, height, dpr);
    size(tile.halo, width, height, 1);
    return tile;
  }
  function glow(hctx, state, x0, y0, level) {
    const p = state.path, R = GLOW.radius, {strip, cap} = brushes;
    const reaches = (x, y, r) => x + r >= x0 && x - r <= x0 + TILE && y + r >= y0 && y - r <= y0 + TILE;
    hctx.save();
    hctx.setTransform(1, 0, 0, 1, -x0, -y0);
    shut(hctx, state.others);
    for (const e of p.edges) {
      // The band of this edge: [0, len] along it, [0, R] outward.
      const mx = e.x + e.ux * e.len / 2 + e.nx * R / 2, my = e.y + e.uy * e.len / 2 + e.ny * R / 2;
      if (reaches(mx, my, e.len / 2 + R)) {
        const count = Math.max(1, Math.round(e.len / GLOW.step)), step = e.len / count;
        hctx.save();
        hctx.transform(e.ux, e.uy, e.nx, e.ny, e.x, e.y);
        hctx.beginPath(); hctx.rect(0, 0, e.len, R); hctx.clip();
        // Only the strips that reach this tile: the band crosses it between t0 and t1 (plus one strip either side).
        let t0 = 0, t1 = e.len;
        if (Math.abs(e.ux) > 1e-6) {
          const a = (x0 - R - e.x) / e.ux, b = (x0 + TILE + R - e.x) / e.ux;
          t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b));
        }
        if (Math.abs(e.uy) > 1e-6) {
          const a = (y0 - R - e.y) / e.uy, b = (y0 + TILE + R - e.y) / e.uy;
          t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b));
        }
        const first = Math.max(0, Math.floor(t0 / step) - 1), last = Math.min(count, Math.ceil(t1 / step) + 1);
        for (let n = first; n <= last; n++) {
          const t = n * step, light = level(e.start + Math.min(t, e.len - .001));
          if (light <= GLOW.from) continue;
          hctx.globalAlpha = Math.min(1, (light - GLOW.from) / (1 - GLOW.from));
          hctx.drawImage(strip, t - step, 0, 2 * step, R);
        }
        hctx.restore();
      }
      // The corner where this edge starts: the wedge between the two outward normals.
      if (!e.convex || !reaches(e.x, e.y, R)) continue;
      const light = level(e.start);
      if (light <= GLOW.from) continue;
      const b = e.before, L = R * 1.5;
      hctx.save();
      hctx.beginPath();
      hctx.moveTo(e.x, e.y);
      hctx.lineTo(e.x + b.nx * L, e.y + b.ny * L);
      hctx.lineTo(e.x + (b.nx + e.nx) * L, e.y + (b.ny + e.ny) * L);
      hctx.lineTo(e.x + e.nx * L, e.y + e.ny * L);
      hctx.closePath();
      hctx.clip();
      hctx.globalAlpha = Math.min(1, (light - GLOW.from) / (1 - GLOW.from));
      hctx.drawImage(cap, e.x - R, e.y - R, 2 * R, 2 * R);
      hctx.restore();
    }
    hctx.restore();
  }
  function filament(ctx, state, x0, y0, dpr, level) {
    const cores = Array.from({length:LEVELS}, () => null);
    for (const e of state.path.edges) {
      const count = Math.ceil(e.len / STEP), step = e.len / count;
      for (let n = 0; n < count; n++) {
        const t = step * (n + .5), light = Math.max(state.base, level(e.start + t));
        if (light < .004) continue;
        const x = e.x + t * e.ux, y = e.y + t * e.uy, reach = step / 2 + 2;
        if (x + reach < x0 || x - reach > x0 + TILE || y + reach < y0 || y - reach > y0 + TILE) continue;
        const index = Math.min(LEVELS - 1, Math.floor(Math.min(1, light) * LEVELS));
        if (CORE[index].alpha < .01) continue;
        const path = cores[index] || (cores[index] = new Path2D());
        path.moveTo(x - e.ux * step / 2, y - e.uy * step / 2);
        path.lineTo(x + e.ux * step / 2, y + e.uy * step / 2);
      }
    }
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, -x0 * dpr, -y0 * dpr);
    shut(ctx, state.covers);
    cores.forEach((path, index) => {
      if (!path) return;
      ctx.globalAlpha = CORE[index].alpha;
      ctx.strokeStyle = CORE[index].color;
      ctx.stroke(path);
    });
    ctx.restore();
  }
  // states: surfaces with light; view: the visible part of the plane; dirty: tile keys to paint again.
  function paint(states, view, dirty, all) {
    if (!brushes) brushes = makeBrushes();
    if (!brushes || !plane) return;
    const dpr = Math.round(TILE * Math.min(window.devicePixelRatio || 1, 1.5)) / TILE;
    const want = new Set();
    for (const state of states.values()) tilesAround(state.path, want);
    for (const key of want) {
      const [col, row] = key.split(',').map(Number);
      if ((col + 1) * TILE < view.left || col * TILE > view.right || (row + 1) * TILE < view.top || row * TILE > view.bottom) want.delete(key);
    }
    for (const [key, tile] of tiles) if (!want.has(key)) drop(key, tile);
    if (!want.size) return;
    // The extent of the page is measured at most once a second (or when everything is painted again).
    const now = performance.now();
    if (all || !room || now - roomAt > 1000) {room = extent(); roomAt = now;}
    for (const key of want) {
      if (!all && tiles.has(key) && !dirty.has(key)) continue;
      const [col, row] = key.split(',').map(Number);
      const tile = tileOf(col, row, dpr);
      if (!tile?.ctx || !tile.hctx) continue;
      const {ctx, hctx} = tile, x0 = col * TILE, y0 = row * TILE, R = GLOW.radius;
      for (const c of [ctx, hctx]) {c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, c.canvas.width, c.canvas.height); c.globalCompositeOperation = 'lighter';}
      ctx.lineWidth = 1.15;
      // Butt ends: the segments of the filament abut exactly, so where the level changes (or a tile ends) there is
      // neither a bright dot (two round caps added together) nor a gap.
      ctx.lineCap = 'butt';
      for (const state of states.values()) {
        const p = state.path;
        if (p.right + R < x0 || p.left - R > x0 + TILE || p.bottom + R < y0 || p.top - R > y0 + TILE) continue;
        const level = t => {
          const bin = t * BINS / p.length, i = Math.floor(bin) % BINS, f = bin - Math.floor(bin);
          return state.energy[i] * (1 - f) + state.energy[(i + 1) % BINS] * f;
        };
        glow(hctx, state, x0, y0, level);
        filament(ctx, state, x0, y0, dpr, level);
      }
      hctx.globalAlpha = ctx.globalAlpha = 1;
      hctx.setTransform(1, 0, 0, 1, 0, 0);
      hctx.globalCompositeOperation = 'source-in';
      hctx.fillStyle = '#ff8f2a';
      hctx.fillRect(0, 0, hctx.canvas.width, hctx.canvas.height);
      hctx.globalCompositeOperation = 'source-over';
    }
  }
  return {attach, paint, clear, fade};
}

export function edgeLight(cards, wake) {
  const states = new Map(), paths = new WeakMap(), paint = painter(), gone = new Set();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let parent = document.body, origin = {left:0, top:0}, changed = true, all = true, fading = false, paintedAt = 0;
  function geometry(card) {
    const points = outlineOf(card).map(p => ({x:p.x - origin.left, y:p.y - origin.top})), old = paths.get(card);
    if (old && points.length === old.points.length && points.every((p, i) => Math.abs(p.x - old.points[i].x) < .05 && Math.abs(p.y - old.points[i].y) < .05)) return old;
    const path = contour(points); paths.set(card, path); return path;
  }
  // Client rects, read once per frame for every surface.
  let boxes = new Map(), boxesAt = -1;
  function boxOf(card) {
    const now = performance.now();
    if (now - boxesAt > 12) {boxes = new Map(); boxesAt = now;}
    let box = boxes.get(card);
    if (!box) {box = card.getBoundingClientRect(); boxes.set(card, box);}
    return box;
  }
  const near = (b, path, r) => b.width && b.height && b.right - origin.left >= path.left - r && b.left - origin.left <= path.right + r &&
    b.bottom - origin.top >= path.top - r && b.top - origin.top <= path.bottom + r;
  // The surfaces around this one that its glow must not touch, and the slides in front of it that hide its light.
  function neighbourhood(card, path) {
    const host = card.closest('dialog'), slide = slideOf(card), depth = slide ? slideDepth(slide) : 0;
    const others = [], covers = [];
    for (const other of cards) {
      if (other === card || other.contains(card) || card.contains(other) || other.closest('dialog') !== host) continue;
      if (!near(boxOf(other), path, GLOW.radius) || !acceptsHint(other)) continue;
      const shape = geometry(other);
      others.push(shape);
      if (slide && isSlide(other) && other.parentElement === slide.parentElement && slideDepth(other) < depth - 1e-3) covers.push(shape);
    }
    return {others, covers};
  }
  // Read where a lit surface is now. A surface that moved paints its old place again, without it.
  function place(card, state) {
    const path = geometry(card), {others, covers} = neighbourhood(card, path);
    const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
    if (path === state.path && same(others, state.others) && same(covers, state.covers)) return;
    if (state.path && state.path !== path) tilesAround(state.path, gone);
    state.path = path; state.others = others; state.covers = covers;
    state.dirty.fill(1); changed = true;
  }
  function stateOf(card) {
    let state = states.get(card);
    if (!state) {
      state = {energy:new Float32Array(BINS), next:new Float32Array(BINS), painted:new Float32Array(BINS), target:new Float32Array(BINS),
        dirty:new Uint8Array(BINS), peak:0, base:0, baseAim:0, path:null, others:[], covers:[]};
      states.set(card, state);
    }
    place(card, state);
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
    for (const state of states.values()) {state.target.fill(0); state.baseAim = 0;}
    if (!point || document.fullscreenElement) return;
    const x = point.x - origin.left, y = point.y - origin.top;
    for (const card of cards) {
      if (!card.isConnected || (card !== primary && !neighbours) || (dialog ? !dialog.contains(card) : card.closest('dialog'))) continue;
      const b = boxOf(card), reach = card === primary ? LIGHT.reach : LIGHT.near;
      if (!b.width || !b.height) continue;
      if (point.x < b.left - reach || point.x > b.right + reach || point.y < b.top - reach || point.y > b.bottom + reach) continue;
      if (card === primary ? !acceptsLight(card) : !acceptsHint(card)) continue;
      const state = stateOf(card), path = state.path;
      if (card === primary) {
        // The whole outline holds a thin filament; only the segment near the pointer glows.
        const {gap, at} = nearestOnPath(path, x, y);
        state.baseAim = LIGHT.base;
        along(path, at, Math.min(520, Math.max(90, path.length * .16)), LIGHT.floor + (1 - LIGHT.floor) * (1 - smooth(gap / LIGHT.reach)), state.target);
        continue;
      }
      // The hint: soft from afar, clearer near the edge, on the nearest part of the outline that can be seen.
      const touching = inside(path, x, y);
      const seen = visibleNearest(path, x, y, state.covers);
      if (!seen) continue;
      const distance = touching ? 0 : seen.gap;
      if (distance >= LIGHT.near) continue;
      along(path, seen.at, Math.min(360, Math.max(60, path.length * .12)), LIGHT.neighbour * (1 - smooth(distance / LIGHT.near)), state.target);
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
  // moving: a slider is moving, so every lit surface is placed again.
  function frame(dt, moving = false) {
    let busy = false;
    if (moving && states.size) {
      origin = paint.attach(parent);
      for (const [card, state] of states) if (card.isConnected) place(card, state);
    }
    const fall = Math.exp(-dt / LIGHT.fall), rise = 1 - Math.exp(-dt / LIGHT.rise), flow = Math.min(.14, dt * 2);
    for (const [card, state] of states) {
      // A surface that stops taking light lets its light go.
      if (!acceptsHint(card)) {state.target.fill(0); state.baseAim = 0;}
      const base = state.baseAim >= state.base ? state.base + (state.baseAim - state.base) * rise : Math.max(state.baseAim, state.base * fall);
      const settled = reduced.matches || Math.abs(base - state.baseAim) < .002 ? state.baseAim : base;
      if (Math.abs(settled - state.base) > .0005) {state.dirty.fill(1); changed = true;}
      if (settled !== state.baseAim) busy = true;
      state.base = settled;
      let max = 0;
      for (let i = 0; i < BINS; i++) {
        const before = state.energy[i], aim = state.target[i];
        const adjacent = state.energy[(i + BINS - 1) % BINS] + state.energy[(i + 1) % BINS];
        let value = aim >= before ? before + (aim - before) * rise : Math.max(aim, (before + flow * (adjacent - 2 * before)) * fall);
        if (reduced.matches || Math.abs(value - aim) < Math.max(.002, state.peak * .02)) value = aim;
        state.next[i] = value;
        if (value > max) max = value;
        // Changes below a step of 1/255 in the light are left for the next real change.
        if (Math.abs(value - state.painted[i]) > .004 || (value !== state.painted[i] && value === aim)) {state.dirty[i] = 1; state.painted[i] = value; changed = true;}
        if (value !== aim) busy = true;
      }
      const old = state.energy; state.energy = state.next; state.next = old;
      state.peak = Math.max(max, state.peak * Math.exp(-dt / 1.5));
      if (max < .004 && state.base < .004 && !state.baseAim && !state.target.some(p => p > .004)) {
        // Its tiles are painted once more, without it; the rest of the plane is left as it is.
        tilesAround(state.path, gone);
        states.delete(card); changed = true;
      }
    }
    // The light is painted at most every other frame: it moves softly, and the frames between stay free.
    const now = performance.now();
    if (changed && !all && now - paintedAt < 24) busy = true;
    else if (changed) {
      paintedAt = now;
      const R = GLOW.radius;
      const view = {left:-origin.left - R, top:-origin.top - R, right:-origin.left + innerWidth + R, bottom:-origin.top + innerHeight + R};
      const dirty = new Set(gone);
      gone.clear();
      if (!all) for (const state of states.values()) {
        const p = state.path;
        for (const e of p.edges) {
          const count = Math.ceil(e.len / STEP), step = e.len / count;
          for (let n = 0; n < count; n++) {
            const t = step * (n + .5), i = Math.floor((e.start + t) * BINS / p.length) % BINS;
            if (!state.dirty[i] && !state.dirty[(i + 1) % BINS]) continue;
            const x = e.x + t * e.ux, y = e.y + t * e.uy;
            for (let r = Math.floor((y - R) / TILE); r <= Math.floor((y + R) / TILE); r++)
              for (let c = Math.floor((x - R) / TILE); c <= Math.floor((x + R) / TILE); c++) dirty.add(tileKey(c, r));
          }
        }
      }
      paint.paint(states, view, dirty, all);
      for (const state of states.values()) state.dirty.fill(0);
      changed = all = false;
    }
    return busy;
  }
  // The page scrolled: the plane moves with the document, only the newly visible tiles need painting.
  function scrolled() { if (!fading && states.size) {origin = paint.attach(parent); changed = true; wake();} }
  function clear() { states.clear(); paint.clear(); changed = all = true; }
  // A view was swapped: the light leaves with a short fade, then aims again at whatever is under the pointer.
  function fade() {
    if (fading) return;
    fading = true;
    paint.fade(() => {fading = false; states.clear(); changed = all = true; wake(true);});
  }
  return {target, feed, frame, clear, fade, scrolled};
}
