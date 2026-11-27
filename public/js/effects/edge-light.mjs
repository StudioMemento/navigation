import { acceptsLight, acceptsHint, isSlide, outlineOf } from './surface-targets.mjs';

// Light lives on the outline of a surface: a thin bright filament on the edge and a soft, wide glow outside it.
// The glow lies only in the empty space around the surfaces: never inside the surface that emits it, never on
// another surface. Each surface keeps 96 segments of light with a short memory, so the light flows along the edge
// and fades. The glow is soft, so it is painted at half resolution.
//
// The glow fades from the edge smoothly and almost linearly. Each edge is painted in its own frame with short
// strips that overlap in pairs (their weights add up to one), each corner with a round cap in the wedge between
// its two edges: every pixel takes at most two brushes, so the gradient stays smooth (no stacking, no banding).
const BINS = 96, STEP = 8, TILE = 256, LEVELS = 48, GLOW_SCALE = .5;
const GLOW = {radius:110, peak:.34, power:1.7, step:12, from:.02};
const LIGHT = {
  base: .12,            // the whole outline of the surface under the pointer: filament only
  reach: 380,           // px from the edge at which the hovered surface still lights its nearest segment
  floor: .35,           // the nearest segment never drops below this while the surface is hovered
  near: 440,            // the hint: other surfaces on screen light within this distance, on the side facing the pointer
  neighbour: .3,
  rise: .14, fall: .5   // seconds
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
// The nearest point of each edge, nearest first, until one is not covered by another surface.
// blockers: client rects of the other surfaces that could stand over this one; a point outside all of them is seen.
function visibleNearest(card, path, x, y, blockers = null) {
  const cx = (path.left + path.right) / 2, cy = (path.top + path.bottom) / 2;
  const candidates = path.edges.map(e => {
    const t = Math.max(0, Math.min(e.len, (x - e.x) * e.ux + (y - e.y) * e.uy));
    const px = e.x + t * e.ux, py = e.y + t * e.uy;
    return {gap:Math.hypot(x - px, y - py), at:e.start + t, px, py};
  }).sort((a, b) => a.gap - b.gap);
  const plane = document.querySelector('.mm-edge-plane')?.getBoundingClientRect() || {left:0, top:0};
  for (const c of candidates) {
    const inward = Math.min(1, 4 / Math.max(1, Math.hypot(cx - c.px, cy - c.py)));
    const hx = c.px + plane.left + (cx - c.px) * inward, hy = c.py + plane.top + (cy - c.py) * inward;
    if (hx < 0 || hy < 0 || hx > innerWidth || hy > innerHeight) continue;
    if (blockers && !blockers.some(b => hx >= b.left && hx <= b.right && hy >= b.top && hy <= b.bottom)) return c;
    const hit = document.elementFromPoint(hx, hy);
    if (!hit || card.contains(hit)) return c;
  }
  return null;
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

// The glow across an edge: smooth, almost linear, gone at the radius.
function profile(d) {
  const t = 1 - d / GLOW.radius;
  return t <= 0 ? 0 : GLOW.peak * Math.pow(t, GLOW.power);
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
// cap: the same fade around a corner.
function makeBrushes() {
  const R = GLOW.radius, S = GLOW.step;
  const strip = brush(2 * S, R, (x, y) => Math.cos(Math.PI / 2 * (x - S) / S) ** 2 * profile(y));
  const cap = brush(2 * R, 2 * R, (x, y) => profile(Math.hypot(x - R, y - R)));
  return strip && cap ? {strip, cap} : null;
}
// The light of a surface stops at every other surface around it.
function shut(ctx, others) {
  for (const other of others) ctx.clip(other.outside, 'evenodd');
}
// The filament: alpha and colour follow the light continuously.
const CORE = Array.from({length:LEVELS}, (_, i) => {
  const v = (i + .5) / LEVELS, mix = Math.min(1, Math.max(0, (v - .3) / .5));
  const r = 255, g = Math.round(162 + (217 - 162) * mix), b = Math.round(61 + (173 - 61) * mix);
  return {alpha:.9 * (1 - Math.pow(1 - v, 2.2)), color:'rgb(' + r + ',' + g + ',' + b + ')'};
});

// Everything but the surfaces in front: the light of a slide behind them is clipped by them (even-odd).
function exclusion(covers) {
  const path = new Path2D();
  path.rect(-1e6, -1e6, 2e6, 2e6);
  for (const cover of covers) {
    cover.points.forEach((p, i) => { if (!i) path.moveTo(p.x, p.y); else path.lineTo(p.x, p.y); });
    path.closePath();
  }
  return path;
}

// Only tiles that hold light have a backing store; only tiles whose light changed are painted again.
// Each tile is two canvases: the glow at half resolution under the filament at full resolution.
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
    plane.style.opacity = '';
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
    setTimeout(() => {clear(); plane.style.transition = ''; done();}, 200);
  }
  // The extent of the plane's host, measured without the plane itself.
  function extent() {
    const host = plane.parentNode;
    if (host !== document.body) return {width:host.clientWidth, height:host.clientHeight};
    let bottom = 0;
    for (const child of host.children) {
      if (child === plane || child.matches('script,style,dialog:not([open]),.mm-glyph-field,.mm-glyph-surface')) continue;
      const style = getComputedStyle(child);
      if (style.position === 'fixed' || style.display === 'none') continue;
      bottom = Math.max(bottom, child.getBoundingClientRect().bottom - plane.getBoundingClientRect().top + parseFloat(style.marginBottom || 0));
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
  function tileOf(col, row, dpr, room) {
    const key = col + ',' + row;
    const width = Math.min(TILE, room.width - col * TILE), height = Math.min(TILE, room.height - row * TILE);
    let tile = tiles.get(key);
    if (width <= 0 || height <= 0) {if (tile) drop(key, tile); return null;}
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
    size(tile.halo, width, height, GLOW_SCALE);
    return tile;
  }
  // states: surfaces with light; view: the visible part of the plane; dirty: tile keys to paint again.
  function paint(states, view, dirty, all) {
    if (!brushes) brushes = makeBrushes();
    if (!brushes || !plane) return;
    const dpr = Math.round(TILE * Math.min(window.devicePixelRatio || 1, 1.5)) / TILE, R = GLOW.radius, g = GLOW_SCALE;
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
    // The extent of the page is measured at most once a second (or when everything is painted again).
    const now = performance.now();
    if (all || !room || now - roomAt > 1000) {room = extent(); roomAt = now;}
    for (const key of want) {
      if (!all && tiles.has(key) && !dirty.has(key)) continue;
      const [col, row] = key.split(',').map(Number);
      const tile = tileOf(col, row, dpr, room);
      if (!tile?.ctx || !tile.hctx) continue;
      const {ctx, hctx} = tile, x0 = col * TILE, y0 = row * TILE;
      for (const c of [ctx, hctx]) {c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, c.canvas.width, c.canvas.height);}
      hctx.globalCompositeOperation = 'lighter';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1.15;
      // Butt ends: the segments of the filament abut exactly, so where the level changes (or a tile ends) there is
      // neither a bright dot (two round caps added together) nor a gap.
      ctx.lineCap = 'butt';
      for (const state of states.values()) {
        const p = state.path;
        if (p.right + R < x0 || p.left - R > x0 + TILE || p.bottom + R < y0 || p.top - R > y0 + TILE) continue;
        const power = t => {
          const bin = t * BINS / p.length, i = Math.floor(bin) % BINS, f = bin - Math.floor(bin);
          return state.energy[i] * (1 - f) + state.energy[(i + 1) % BINS] * f;
        };
        // A slide behind another one keeps its light behind it too.
        const hidden = state.covers?.length ? exclusion(state.covers) : null;
        const reaches = (x, y, r) => x + r >= x0 && x - r <= x0 + TILE && y + r >= y0 && y - r <= y0 + TILE;
        hctx.save();
        hctx.setTransform(g, 0, 0, g, -x0 * g, -y0 * g);
        if (state.others?.length) shut(hctx, state.others);
        const {strip, cap} = brushes;
        for (const e of p.edges) {
          // The band of this edge: [0, len] along it, [0, R] outward.
          const mx = e.x + e.ux * e.len / 2 + e.nx * R / 2, my = e.y + e.uy * e.len / 2 + e.ny * R / 2;
          if (!reaches(mx, my, e.len / 2 + R)) continue;
          const count = Math.max(1, Math.round(e.len / GLOW.step)), step = e.len / count;
          hctx.save();
          hctx.transform(e.ux, e.uy, e.nx, e.ny, e.x, e.y);
          hctx.beginPath(); hctx.rect(0, 0, e.len, R); hctx.clip();
          // The strips that reach this tile: the band crosses it between t0 and t1 (plus one strip either side).
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
            const t = n * step, level = power(e.start + Math.min(t, e.len - .001));
            if (level <= GLOW.from) continue;
            hctx.globalAlpha = Math.min(1, (level - GLOW.from) / (1 - GLOW.from));
            hctx.drawImage(strip, t - step, 0, 2 * step, R);
          }
          hctx.restore();
          // The corner where this edge starts: the wedge between the two outward normals.
          if (!e.convex || !reaches(e.x, e.y, R)) continue;
          const level = power(e.start);
          if (level <= GLOW.from) continue;
          const b = e.before, L = R * 1.5;
          hctx.save();
          hctx.beginPath();
          hctx.moveTo(e.x, e.y);
          hctx.lineTo(e.x + b.nx * L, e.y + b.ny * L);
          hctx.lineTo(e.x + (b.nx + e.nx) * L, e.y + (b.ny + e.ny) * L);
          hctx.lineTo(e.x + e.nx * L, e.y + e.ny * L);
          hctx.closePath();
          hctx.clip();
          hctx.globalAlpha = Math.min(1, (level - GLOW.from) / (1 - GLOW.from));
          hctx.drawImage(cap, e.x - R, e.y - R, 2 * R, 2 * R);
          hctx.restore();
        }
        hctx.restore();
        const cores = Array.from({length:LEVELS}, () => null);
        for (const e of p.edges) {
          const count = Math.ceil(e.len / STEP), step = e.len / count;
          for (let n = 0; n < count; n++) {
            const t = step * (n + .5), level = Math.max(state.base, power(e.start + t));
            if (level < .004) continue;
            const x = e.x + t * e.ux, y = e.y + t * e.uy;
            const reach = step / 2 + 2;
            if (x + reach < x0 || x - reach > x0 + TILE || y + reach < y0 || y - reach > y0 + TILE) continue;
            const index = Math.min(LEVELS - 1, Math.floor(Math.min(1, level) * LEVELS));
            if (CORE[index].alpha < .01) continue;
            const path = cores[index] || (cores[index] = new Path2D());
            path.moveTo(x - e.ux * step / 2, y - e.uy * step / 2);
            path.lineTo(x + e.ux * step / 2, y + e.uy * step / 2);
          }
        }
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, -x0 * dpr, -y0 * dpr);
        if (hidden) ctx.clip(hidden, 'evenodd');
        cores.forEach((path, level) => {
          if (!path) return;
          ctx.globalAlpha = CORE[level].alpha;
          ctx.strokeStyle = CORE[level].color;
          ctx.stroke(path);
        });
        ctx.restore();
      }
      hctx.globalAlpha = 1;
      hctx.setTransform(1, 0, 0, 1, 0, 0);
      hctx.globalCompositeOperation = 'source-in';
      hctx.fillStyle = '#ff8f2a';
      hctx.fillRect(0, 0, hctx.canvas.width, hctx.canvas.height);
      hctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }
  }
  return {attach, paint, clear, fade};
}

export function edgeLight(cards, wake) {
  const states = new Map(), paths = new WeakMap(), paint = painter();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let parent = document.body, origin = {left:0, top:0}, changed = true, all = true, fading = false, paintedAt = 0;
  const gone = new Set();
  function local(points) { return points.map(p => ({x:p.x - origin.left, y:p.y - origin.top})); }
  function geometry(card) {
    const points = local(outlineOf(card)), old = paths.get(card);
    if (old && points.length === old.points.length && points.every((p, i) => p.x === old.points[i].x && p.y === old.points[i].y)) return old;
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
  function shown(el) {
    if (!el.isConnected || el.closest('[hidden],dialog:not([open])')) return false;
    if (!isSlide(el)) return true;
    const style = getComputedStyle(el.closest('.home-card,.flow-card,.showcase-card,.carousel-card') || el);
    return style.visibility !== 'hidden' && parseFloat(style.opacity) > .12;
  }
  // The surfaces around this one that its glow must not touch.
  function othersOf(card, path) {
    const R = GLOW.radius, host = card.closest('dialog'), out = [];
    for (const other of cards) {
      if (other === card || other.contains(card) || card.contains(other) || other.closest('dialog') !== host) continue;
      const b = boxOf(other);
      if (!b.width || !b.height) continue;
      const left = b.left - origin.left, top = b.top - origin.top;
      if (left + b.width < path.left - R || left > path.right + R || top + b.height < path.top - R || top > path.bottom + R) continue;
      if (shown(other)) out.push(geometry(other));
    }
    return out;
  }
  function stateOf(card) {
    let state = states.get(card);
    if (!state) {
      state = {energy:new Float32Array(BINS), next:new Float32Array(BINS), painted:new Float32Array(BINS), target:new Float32Array(BINS), dirty:new Uint8Array(BINS), peak:0, base:0, baseAim:0};
      states.set(card, state);
    }
    const before = state.path, path = geometry(card), others = othersOf(card, path);
    // New neighbours (a carousel moved, a dialog opened): paint this light again.
    if (before !== path || (state.others?.length || 0) !== others.length || others.some((o, i) => o !== state.others[i])) {state.dirty.fill(1); changed = true;}
    state.path = path;
    state.others = others;
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
      const {gap, at} = nearestOnPath(path, x, y);
      state.covers = null;
      if (card === primary) {
        // The whole outline holds a thin filament; only the segment near the pointer glows.
        state.baseAim = LIGHT.base;
        along(path, at, Math.min(520, Math.max(90, path.length * .16)), LIGHT.floor + (1 - LIGHT.floor) * (1 - smooth(gap / LIGHT.reach)), state.target);
      } else {
        // The hint: soft from afar, clearer near the edge; a pointer over the surface touches its nearest edge.
        const touching = inside(path, x, y);
        if (!touching && gap >= LIGHT.near) continue;
        // Part of the outline may be behind another surface: the hint goes to the nearest edge that can be seen.
        const blockers = [];
        if (isSlide(card)) for (const other of cards) {
          if (other === card || !isSlide(other) || !other.isConnected) continue;
          const o = boxOf(other);
          if (o.width && o.right >= b.left && o.left <= b.right && o.bottom >= b.top && o.top <= b.bottom) blockers.push(o);
        }
        const seen = visibleNearest(card, path, x, y, isSlide(card) ? blockers : null);
        if (!seen) continue;
        const distance = touching ? 0 : seen.gap;
        if (distance >= LIGHT.near) continue;
        state.covers = coversOf(card);
        along(path, seen.at, Math.min(360, Math.max(60, path.length * .12)), LIGHT.neighbour * (1 - smooth(distance / LIGHT.near)), state.target);
      }
    }
  }
  // Light handed to an outline by the glyph field: it rises at once and fades with the outline's own memory.
  // The active slides that stand in front of a neighbouring slide.
  function coversOf(card) {
    if (!isSlide(card)) return null;
    const b = boxOf(card), covers = [];
    for (const other of cards) {
      if (other === card || !isSlide(other) || !other.isConnected) continue;
      const o = boxOf(other);
      if (o.right < b.left || o.left > b.right || o.bottom < b.top || o.top > b.bottom || !acceptsLight(other)) continue;
      covers.push(geometry(other));
    }
    return covers;
  }
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
      if (!acceptsHint(card)) {state.target.fill(0); state.baseAim = 0;}
      const base = state.baseAim >= state.base ? state.base + (state.baseAim - state.base) * rise : Math.max(state.baseAim, state.base * fall);
      const settled = reduced.matches || Math.abs(base - state.baseAim) < .002 ? state.baseAim : base;
      if (Math.abs(settled - state.base) > .0005) {state.dirty.fill(1); changed = true;}
      if (settled !== state.baseAim) moving = true;
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
        if (value !== aim) moving = true;
      }
      const old = state.energy; state.energy = state.next; state.next = old;
      state.peak = Math.max(max, state.peak * Math.exp(-dt / 1.5));
      if (max < .004 && state.base < .004 && !state.baseAim && !state.target.some(p => p > .004)) {
        // Its tiles are painted once more, without it; the rest of the plane is left as it is.
        const p = state.path, R = GLOW.radius;
        for (let r = Math.floor((p.top - R) / TILE); r <= Math.floor((p.bottom + R) / TILE); r++)
          for (let c = Math.floor((p.left - R) / TILE); c <= Math.floor((p.right + R) / TILE); c++) gone.add(c + ',' + r);
        states.delete(card); changed = true;
      }
    }
    // The light is painted at most every other frame: it moves softly, and the frames between stay free.
    const now = performance.now();
    if (changed && !all && now - paintedAt < 24) moving = true;
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
  function scrolled() { if (!fading && states.size) {origin = paint.attach(parent); changed = true; wake();} }
  function clear() { states.clear(); paint.clear(); changed = all = true; }
  function fade() {
    if (fading) return;
    fading = true;
    paint.fade(() => {fading = false; states.clear(); changed = all = true;});
  }
  return {target, feed, frame, clear, fade, scrolled};
}
