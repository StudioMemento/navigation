// R16: the page change in three movements: the interface comes apart, its fragments compose a sign, the sign breaks
// and the next page composes. The incoming document starts exactly where the outgoing one stopped (the progress travels
// in sessionStorage). R17: leaving, the real interface comes apart (the engine's own cells fly, see EXIT in the shaders;
// the DOM pieces dissolve, see scene-head). R18: the sign is the name of the page that opens; wordmark and dock never
// leave. R20: the name spans the content between the site's margins. R21: the language of the cards (docs/dna): an
// irregular net of triangular cells, the name in the material of a title in hover. R22: filled fragments only.
//
// R23: only the content changes. The layer is the column between the margins (padding.mjs) and nothing of it reaches
// the margins, the background, the wordmark or the dock. And it is never late: every movement is a set of compositor
// animations (transform and opacity only) handed to the GPU once, so it runs at the screen's rate while the incoming
// page loads its scripts, its photographs and its effects on the main thread. It drew a canvas frame by frame there,
// and stalled 100–300 ms at a time exactly while the next page was booting. Every triangle is a box drawn by its
// borders and placed by a matrix: no clip path, no filter, nothing the compositor would have to mask or redraw.
// The palette is the warm colours of the navbar's icons (their glow, never their metal): warm white, core, light,
// orange, ember, brace.
import { STATIONS } from '../src/kit/core.mjs';

/** R18: the name composed for each address (the Home: HOME). Shared by every page through scene-head. */
export const names = Object.fromEntries([['/', 'HOME'], ['/memento', 'STUDIO'], ...STATIONS.map(s => [s.path, s.title])]);

/** Timing of the two movements (shares of progress 0..1) and their sizes. Shared by every page through scene-head. */
export const weave = {
  /** R23: the cells that open over the incoming content: px between the points of the net (least, most) and how many
   *  cells the column aims at (large screens, small): each cell is one small element the compositor moves */
  cell: [40, 96, 240, 120],
  /** fragments flying between the interface and the name: at most this many (large screens, small) */
  shards: [64, 36],
  /** the name: its facets as a share of its size (never under 9 px) and the pieces each letter forms and breaks in */
  facet: .12, pieces: 4,
  /** leaving: the fragments fly over `fly`; the name forms over `form`, letter by letter, each letter over `letter`;
   *  the column turns to the ground over `veil` */
  fly: [.02, .84], form: [.34, .96], letter: .3, veil: [.36, .78],
  /** R23: leaving, the interface (the engine's cells, the DOM pieces, where the fragments rise from) is gone by this
   *  share of the movement; the name is whole at its end, and only then the browser is asked for the next page: what
   *  the swap freezes for a moment is the composed name, never a half-formed one */
  depart: .62,
  /** arriving: the name breaks over `fade` (each letter over `split`); the fragments reach the page over `scatter`;
   *  the cells open from the name outward over `open`, each one over `span` */
  fade: [0, .42], split: .24, scatter: [.04, .7], open: [.08, 1], span: .26,
  /** leaving: when a piece of the interface leaves, by its distance from the touched point (the engine's EXIT and the
   *  DOM pieces in scene-head use the same) */
  leave: [.02, .46, .16],
  /** R21: the front that breaks the page (and opens the next) is torn by a slow noise: its share of the distance, its
   *  grain (px) */
  tear: .22, grain: 240,
  /** the ground the page stands on (site.css --memento-ground) */
  ground: '#090909',
  /** R23 "Incandescenza": the warm colours of the navbar's icons, from the warm white of the glow to its brace */
  glow: ['#ffefdc', '#ffc890', '#ffa23d', '#ff7d00', '#c2500a', '#7a340a'],
  /** the name's face: the title ramp in hover (VFX.color.titleAmber), warm white from above, ember at the base */
  face: [[0, '#ffefdc'], [.56, '#ffefdc'], [.68, '#ffd9ad'], [.8, '#ffb35e'], [.91, '#ff840c'], [1, '#e8661a']],
  /** the cells that open: obsidian, a shade each, barely warm */
  obsidian: ['#090909', '#0d0c0b', '#121110'],
};

export function createMaterial(name, weave, paddingOf) {
  const W = innerWidth, H = innerHeight, P = Math.round(paddingOf(W, H) * W), CW = Math.max(1, W - 2 * P);
  const dpr = devicePixelRatio || 1, small = W * H < 6e5;
  // R21: the composed letter at the screen's full resolution (it looked soft on sharper screens). R23: its pieces and
  // its flash only ever show moving, at no more than 2: half the pixels to paint and hold on a phone
  const ndpr = Math.min(dpr, 3), pdpr = Math.min(dpr, 2);
  const make = cls => { const d = document.createElement('div'); d.className = cls; return d; };
  const layer = make('mm-weave');
  layer.setAttribute('aria-hidden', 'true');
  // R23: the column between the margins, nothing outside it
  layer.style.cssText = `left:${P}px;width:${CW}px;height:${H}px`;
  const veil = make('mm-veil'), cellBox = make('mm-cells'), shardBox = make('mm-shards'), nameBox = make('mm-name');
  layer.append(veil, cellBox, shardBox, nameBox);
  // R17: the name breathes while the next page gets ready; both documents take the phase from the clock: no jump
  nameBox.style.animationDelay = -(Date.now() % 2400) + 'ms';
  document.body.append(layer);
  const hash = (a, b) => {
    let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul((b + 0x632be5ab) | 0, 0xc2b2ae35);
    h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15;
    return (h >>> 0) / 4294967296;
  };
  const noise = (x, y, seed) => {
    const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const a = hash(xi + seed, yi), b = hash(xi + 1 + seed, yi), c = hash(xi + seed, yi + 1), d = hash(xi + 1 + seed, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  const px = v => Math.round(v * 100) / 100, k4 = v => Math.round(v * 1e4) / 1e4;
  const [white, core, hot, orange, ember, brace] = weave.glow;

  /**
   * R23: a triangle as the compositor likes it. A box of BASE px drawn by its borders (the upper left half of it) and a
   * matrix that takes its corners (0, 0), (BASE, 0), (0, BASE) to a, b, c: one plain layer, no mask.
   */
  const BASE = 64;
  let nodes = [];
  function tri(colour, cls) {
    const el = make(cls);
    el.style.cssText = `border-top:${BASE}px solid ${colour};border-right:${BASE}px solid transparent`;
    nodes.push(el);
    return el;
  }
  const matrix = (ax, ay, bx, by, cx, cy) =>
    `matrix(${k4((bx - ax) / BASE)},${k4((by - ay) / BASE)},${k4((cx - ax) / BASE)},${k4((cy - ay) / BASE)},${px(ax)},${px(ay)})`;

  /**
   * An irregular net of triangles: a strongly jittered hexagonal lattice, every quad split on its shorter diagonal (as
   * Delaunay would), some triangles split once more into four (mixed sizes within a narrow band). Returns flat vertex
   * triples. Deterministic: both documents build the same net.
   */
  function net(x0, y0, w, h, S, salt) {
    const rowH = S * .866, cols = Math.ceil(w / S) + 2, rows = Math.ceil(h / rowH) + 2, stride = cols + 1;
    const X = new Float32Array(stride * (rows + 1)), Y = new Float32Array(stride * (rows + 1));
    for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
      X[j * stride + i] = x0 + (i - 1 + (j & 1) * .5) * S + (hash(i + salt, j) - .5) * .72 * S;
      Y[j * stride + i] = y0 + (j - 1) * rowH + (hash(j + 911 + salt, i) - .5) * .68 * rowH;
    }
    const out = [];
    const push = (ax, ay, bx, by, cx, cy, k) => {
      if (hash(k, 77 + salt) < .14) {
        const abx = (ax + bx) / 2, aby = (ay + by) / 2, bcx = (bx + cx) / 2, bcy = (by + cy) / 2, cax = (cx + ax) / 2, cay = (cy + ay) / 2;
        out.push(ax, ay, abx, aby, cax, cay, abx, aby, bx, by, bcx, bcy, cax, cay, bcx, bcy, cx, cy, abx, aby, bcx, bcy, cax, cay);
      } else out.push(ax, ay, bx, by, cx, cy);
    };
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const a = j * stride + i, b = a + 1, c = a + stride, d = c + 1, k = j * 4099 + i;
      // the shorter diagonal of the quad: the irregular cells of a Delaunay net, never long slivers
      if (Math.hypot(X[a] - X[d], Y[a] - Y[d]) < Math.hypot(X[b] - X[c], Y[b] - Y[c])) {
        push(X[a], Y[a], X[b], Y[b], X[d], Y[d], k * 2); push(X[a], Y[a], X[d], Y[d], X[c], Y[c], k * 2 + 1);
      } else {
        push(X[a], Y[a], X[b], Y[b], X[c], Y[c], k * 2); push(X[b], Y[b], X[d], Y[d], X[c], Y[c], k * 2 + 1);
      }
    }
    return Float32Array.from(out);
  }

  // the net over the column: the cover that opens on the incoming content, a cell at a time
  const [minCell, maxCell, many, few] = weave.cell;
  // (a net of S has about 2·area / (0.866·S²) triangles, 1.42 times that with the ones split in four)
  const S = Math.max(minCell, Math.min(maxCell, Math.sqrt(2.84 * CW * H / (.866 * (small ? few : many)))));

  // R18/R21: the name of the page, justified between the margins, in the look of a title in hover. Each letter is
  // painted once; its facets (a finer net) are grouped into `pieces` that form it leaving and break it arriving
  const word = String(name || 'MEMENTO').toUpperCase(), letters = [...word].filter(c => c !== ' ');
  const count = Math.max(1, letters.length);
  let glyphs = [], composed = false;

  function canvas(w, h, ratio) {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.ceil(w * ratio)); c.height = Math.max(1, Math.ceil(h * ratio));
    c.style.cssText = `width:${px(c.width / ratio)}px;height:${px(c.height / ratio)}px`;
    return c;
  }
  function compose() {
    nameBox.textContent = '';
    const font = v => `300 ${v}px Inter, "Helvetica Neue", Arial, sans-serif`;
    const m = document.createElement('canvas').getContext('2d');
    // R20: the name spans exactly the content between the site's margins, its capitals justified from one margin to the other
    m.font = font(100);
    const unit = letters.map(c => { const t = m.measureText(c); return t.actualBoundingBoxLeft + t.actualBoundingBoxRight; });
    const size = Math.max(14, Math.min(H * .17, CW * .6 / (unit.reduce((a, b) => a + b, 0) / 100)));
    m.font = font(size);
    const metrics = letters.map(c => m.measureText(c));
    const ink = metrics.map(t => t.actualBoundingBoxLeft + t.actualBoundingBoxRight);
    const cap = Math.max(...metrics.map(t => t.actualBoundingBoxAscent)), drop = Math.max(0, ...metrics.map(t => t.actualBoundingBoxDescent));
    const gap = count > 1 ? (CW - ink.reduce((a, b) => a + b, 0)) / (count - 1) : 0;
    const base = H / 2 + cap / 2, pad = Math.ceil(size * .32), step = Math.max(9, size * weave.facet);
    // one scratch canvas reads where every glyph is (its own pixels, no glow): which facets belong to a letter
    const mw = Math.ceil(Math.max(...ink) + pad * 2), mh = Math.ceil(cap + drop) + pad * 2;
    const mask = document.createElement('canvas');
    mask.width = mw; mask.height = mh;
    const mg = mask.getContext('2d', { willReadFrequently: true });
    let x = count > 1 ? 0 : (CW - ink[0]) / 2;
    glyphs = letters.map((c, i) => {
      const w = Math.ceil(ink[i]) + pad * 2, h = mh;
      const bx = pad + metrics[i].actualBoundingBoxLeft, by = pad + cap;
      const left = Math.round((x - pad) * ndpr) / ndpr, top = Math.round((base - cap - pad) * ndpr) / ndpr;
      mg.clearRect(0, 0, mw, mh);
      mg.font = font(size); mg.fillStyle = '#fff'; mg.fillText(c, bx, by);
      let alpha = null;
      try { alpha = mg.getImageData(0, 0, mw, mh).data; } catch {}
      const inGlyph = (qx, qy) => {
        if (!alpha) return true;
        const ix = Math.round(qx), iy = Math.round(qy);
        return ix >= 0 && iy >= 0 && ix < w && iy < mh && alpha[(iy * mw + ix) * 4 + 3] > 40;
      };
      const local = net(0, 0, w, h, step, 101 + i * 13), own = [];
      for (let k = 0; k < local.length; k += 6) {
        const ax = local[k], ay = local[k + 1], bbx = local[k + 2], bby = local[k + 3], ccx = local[k + 4], ccy = local[k + 5];
        const gx = (ax + bbx + ccx) / 3, gy = (ay + bby + ccy) / 3;
        if (inGlyph(gx, gy) || inGlyph(ax, ay) || inGlyph(bbx, bby) || inGlyph(ccx, ccy) ||
          inGlyph((ax + gx) / 2, (ay + gy) / 2) || inGlyph((bbx + gx) / 2, (bby + gy) / 2) || inGlyph((ccx + gx) / 2, (ccy + gy) / 2)) own.push(k);
      }
      // R23: the letter in the glow of the navbar's icons: an orange halo outside, its face in the title ramp in hover
      // (warm white from above, ember at the base), bevelled facets lighter and darker, the core along its lower edge
      const sprite = canvas(w, h, ndpr), g = sprite.getContext('2d');
      g.scale(ndpr, ndpr);
      g.font = font(size); g.textBaseline = 'alphabetic';
      g.fillStyle = orange;
      g.shadowColor = 'rgba(255,125,0,.62)'; g.shadowBlur = size * .2; g.fillText(c, bx, by);
      g.shadowColor = 'rgba(255,200,144,.55)'; g.shadowBlur = size * .045; g.fillText(c, bx, by);
      g.shadowColor = 'transparent'; g.shadowBlur = 0;
      const face = g.createLinearGradient(0, by - cap, 0, by);
      for (const [o, col] of weave.face) face.addColorStop(o, col);
      g.fillStyle = face; g.fillText(c, bx, by);
      g.globalCompositeOperation = 'source-atop';
      const tones = [['#ffffff', .18], [core, .14], [ember, .16], [brace, .22], [orange, .12]];
      const batches = tones.map(() => new Path2D());
      for (const k of own) {
        const path = batches[Math.floor(hash(k, i * 31 + 5) * tones.length)];
        path.moveTo(local[k], local[k + 1]); path.lineTo(local[k + 2], local[k + 3]); path.lineTo(local[k + 4], local[k + 5]); path.closePath();
      }
      batches.forEach((path, b) => { g.fillStyle = tones[b][0]; g.globalAlpha = tones[b][1]; g.fill(path); });
      // the incandescent edge: the core of the glow climbs the lowest fifth of the letter
      const edge = g.createLinearGradient(0, by - cap * .24, 0, by + 1);
      edge.addColorStop(0, 'rgba(255,125,0,0)'); edge.addColorStop(.6, 'rgba(255,125,0,.55)'); edge.addColorStop(1, 'rgba(255,200,144,.95)');
      g.globalAlpha = 1; g.fillStyle = edge; g.fillRect(0, by - cap * .24, w, cap * .24 + drop + 2);
      g.globalCompositeOperation = 'source-over';
      // the pieces: the facets from left to right, loosened by a little chance; each piece is the letter clipped to them
      const groups = Array.from({ length: weave.pieces }, () => ({ path: new Path2D(), n: 0, x: 0, y: 0 }));
      for (const k of own) {
        const gx = (local[k] + local[k + 2] + local[k + 4]) / 3, gy = (local[k + 1] + local[k + 3] + local[k + 5]) / 3;
        const q = groups[Math.min(weave.pieces - 1, Math.floor((.68 * (gx / w) + .32 * hash(k, i * 17 + 3)) * weave.pieces))];
        // a hair larger than the facet: the pieces of a letter meet without a seam
        const grow = 1 + .9 / Math.max(4, step);
        const v = [0, 2, 4].map(o => [gx + (local[k + o] - gx) * grow, gy + (local[k + o + 1] - gy) * grow]);
        q.path.moveTo(v[0][0], v[0][1]); q.path.lineTo(v[1][0], v[1][1]); q.path.lineTo(v[2][0], v[2][1]); q.path.closePath();
        q.n++; q.x += gx; q.y += gy;
      }
      const home = `translate(${px(left)}px,${px(top)}px)`;
      const place = el => { el.style.transform = home; nameBox.append(el); return el; };
      const pieces = groups.filter(q => q.n).map((q, j) => {
        const el = canvas(w, h, pdpr), pg = el.getContext('2d');
        pg.scale(pdpr, pdpr); pg.clip(q.path); pg.drawImage(sprite, 0, 0, w, h);
        el.className = 'mm-piece';
        return { el: place(el), j, cx: left + q.x / q.n, cy: top + q.y / q.n, h: hash(i * 7 + j, 59) };
      });
      // R23: the flash of a letter as it closes (leaving) and opens (arriving): the letter lit twice over, on its own
      // element, its opacity the only thing that moves (a filter would ask the compositor for a surface per piece)
      const flash = canvas(w, h, pdpr), fg = flash.getContext('2d');
      fg.scale(pdpr, pdpr); fg.drawImage(sprite, 0, 0, w, h);
      fg.globalCompositeOperation = 'lighter'; fg.globalAlpha = .85; fg.drawImage(sprite, 0, 0, w, h);
      flash.className = 'mm-flash';
      sprite.className = 'mm-letter';
      const out = { whole: place(sprite), flash: place(flash), pieces, left, top, w, h, i, at: home };
      x += ink[i] + gap;
      return out;
    });
    composed = true;
  }
  // the incoming document may still be loading Inter: the name is composed as soon as the face is there, and only then
  // takes over from the outgoing frame (scene-head waits for `ready`)
  const face = '300 64px Inter';
  const ready = (!document.fonts || document.fonts.check(face) ? Promise.resolve()
    : Promise.race([document.fonts.load(face), new Promise(r => setTimeout(r, 900))])).then(() => compose(), () => compose());

  // when each letter forms (leaving) or breaks (arriving), and each of its pieces within it
  const letterAt = (li, span, [a0, a1]) => a0 + (a1 - a0 - span) * (count > 1 ? li / (count - 1) : 0);
  const pieceAt = (li, j, covering) => {
    const span = covering ? weave.letter : weave.split;
    return letterAt(li, span, covering ? weave.form : weave.fade) + span * (j + .5) / weave.pieces * .8;
  };

  // R23: the interface's rects (viewport fractions, from scene-head) in the column's coordinates, and points in them;
  // R22: with the colours scene-head read from its photographs ahead of time (a 3 × 3 grid each), where it has them
  const rectsOf = scene => (scene?.rects || []).map(([x, y, w, h], i) => [Math.max(0, x * W - P), Math.max(0, y * H), Math.min(CW, (x + w) * W - P), Math.min(H, (y + h) * H), scene.colours?.[i] || null, x * W - P, y * H, w * W, h * H])
    .filter(q => q[2] - q[0] > 8 && q[3] - q[1] > 8);
  function pointIn(rects, k) {
    if (!rects.length) return [CW * (.12 + .76 * hash(k, 3)), H * (.18 + .64 * hash(k, 5)), null];
    const areas = rects.map(q => (q[2] - q[0]) * (q[3] - q[1])), total = areas.reduce((a, b) => a + b, 0);
    let pick = hash(k, 7) * total, i = 0;
    while (i < rects.length - 1 && pick > areas[i]) pick -= areas[i++];
    const q = rects[i], x = q[0] + (q[2] - q[0]) * hash(k, 11), y = q[1] + (q[3] - q[1]) * hash(k, 13);
    let colour = null;
    if (q[4]) {
      const gx = Math.min(2, Math.max(0, Math.floor((x - q[5]) / q[7] * 3))), gy = Math.min(2, Math.max(0, Math.floor((y - q[6]) / q[8] * 3)));
      colour = q[4][gy * 3 + gx] || null;
    }
    return [x, y, colour];
  }
  // a shade of a colour: a fragment turns and catches the light
  const shade = (rgb, f) => `rgb(${rgb.map(v => Math.round(Math.min(255, v * f))).join(',')})`;
  const hex = c => [1, 3, 5].map(o => parseInt(c.slice(o, o + 2), 16));
  const warm = k => { const pick = hash(k, 17); return pick < .12 ? white : pick < .3 ? core : pick < .55 ? hot : pick < .82 ? orange : pick < .95 ? ember : brace; };
  /** a fragment: one triangle (the shape of a facet, its own each time) */
  function shard(k, z, colour) {
    const tip = .2 + .6 * hash(k, 23), foot = .72 + .28 * hash(k, 29);
    const el = tri(colour, 'mm-tri mm-shard');
    el.dataset.shape = matrix(z * (tip - .5), -z / 2, z / 2, z * (foot - .5), -z / 2, z / 2);
    shardBox.append(el);
    return el;
  }
  const at = (el, x, y, turn, scale) => `translate(${px(x)}px,${px(y)}px) rotate(${px(turn)}deg) scale(${k4(scale)}) ${el.dataset.shape}`;

  // the movement on screen and the one built ahead of it (scene-head primes the opening while the name holds)
  let current = null, master = null, primed = null;
  const drop = m => { if (!m) return; for (const a of m.list) a.cancel(); for (const el of m.nodes) el.remove(); };
  function stop() {
    drop(current); drop(primed);
    current = primed = null;
    master?.cancel(); master = null;
    cellBox.style.visibility = shardBox.style.visibility = '';
  }

  /** Leaving: the fragments fly from the interface to the name, the name forms piece by piece, the column empties. */
  function leave(run, scene) {
    run(veil, [{ opacity: 0 }, { opacity: 1 }], weave.veil[0], weave.veil[1] - weave.veil[0], 'ease-in-out');
    const order = [];
    for (const q of glyphs) {
      for (const p of q.pieces) {
        const t = pieceAt(q.i, p.j, true);
        order.push([t, p]);
        // a piece comes in from a little below and aside, already lit, and settles in place
        const dx = (p.h - .5) * 14, dy = 8 + 10 * hash(p.j, q.i + 7);
        run(p.el, [
          { opacity: 0, transform: `translate(${px(q.left + dx)}px,${px(q.top + dy)}px)` },
          { opacity: 1, transform: q.at },
        ], t, .1, 'cubic-bezier(.2,.7,.3,1)');
      }
      // the letter whole once its pieces are in (its glow outside them, no seam inside), and its flash as it closes
      const end = Math.min(.97, letterAt(q.i, weave.letter, weave.form) + weave.letter);
      run(q.whole, [{ opacity: 0 }, { opacity: 1 }], end, .03);
      run(q.flash, [{ opacity: 0 }, { opacity: .9, offset: .25 }, { opacity: 0 }], Math.max(0, end - .08), .2, 'ease-out');
    }
    order.sort((a, b) => a[0] - b[0]);
    if (!order.length) return;
    const rects = rectsOf(scene), [ox, oy] = scene?.origin ? [scene.origin[0] * W - P, scene.origin[1] * H] : [CW / 2, H / 2];
    const far = Math.max(Math.hypot(ox, oy), Math.hypot(CW - ox, oy), Math.hypot(ox, H - oy), Math.hypot(CW - ox, H - oy)) || 1;
    const [l0, l1, lj] = weave.leave, n = small ? weave.shards[1] : weave.shards[0];
    for (let k = 0; k < n; k++) {
      const [x0, y0, colour] = pointIn(rects, k + 1);
      const d = Math.hypot(x0 - ox, y0 - oy) * (1 + weave.tear * (noise(x0 / weave.grain, y0 / weave.grain, 5) * 2 - 1));
      // a fragment leaves when the interface around it does, and lands on a piece of the name that forms after it
      const a = Math.max(weave.fly[0], (l0 + l1 * Math.min(1, Math.max(0, d) / far) + lj * (hash(k, 31) - .5)) * weave.depart / .98);
      let j = order.findIndex(o => o[0] >= a + .2);
      j = j < 0 ? order.length - 1 - Math.floor(hash(k, 41) * Math.min(order.length, 8)) : j + Math.floor(hash(k, 41) * (order.length - j));
      const [land, p] = order[Math.max(0, j)], b = Math.min(weave.fly[1], Math.max(a + .2, land));
      const h = hash(k, 13), z = S * (.24 + .2 * h), turn = h * 360, spin = turn + 160 + 260 * hash(k, 43);
      const x1 = p.cx + (hash(k, 47) - .5) * 10, y1 = p.cy + (hash(k, 53) - .5) * 14, bow = (h - .5) * .45;
      const mx = (x0 + x1) / 2 - (y1 - y0) * bow, my = (y0 + y1) / 2 + (x1 - x0) * bow;
      // R22: it leaves in the colour of the piece of interface it broke from, in its own light, and heats up on its way
      // into the name (a second fragment over it, in the glow, fades in: the compositor blends the two)
      const light = .7 + .6 * hash(k, 59), glow = warm(k);
      const from = colour ? shade(colour, light) : shade(hex(glow), light * .55);
      const path = [[x0, y0, turn, 1], [mx, my, (turn + spin) / 2, .7], [x1, y1, spin, .22]];
      for (const [el, hot] of [[shard(k, z, from), false], [shard(k, z, glow), true]]) {
        const frames = [
          { transform: at(el, ...path[0]), opacity: 0 },
          { opacity: hot ? 0 : 1, offset: .1 },
          { transform: at(el, ...path[1]), opacity: hot ? .5 : 1, offset: .5 },
          { transform: at(el, ...path[2]), opacity: 1, offset: .94 },
          { transform: at(el, x1, y1, spin, .18), opacity: 0 },
        ];
        run(el, frames, a, b - a, 'cubic-bezier(.4,0,.35,1)');
      }
    }
  }

  /** Arriving: the name breaks piece by piece, its fragments reach the new interface, the cells open outward. */
  function open(run, scene) {
    // the cover, as cells of obsidian that shrink into the page, from the name outward along a torn front
    const V = net(0, 0, CW, H, S, 0), cx0 = CW / 2, cy0 = H / 2;
    const far = Math.max(Math.hypot(cx0, cy0), 1), [o0, o1] = weave.open, span = weave.span, grow = 1 + 1.6 / S;
    const frag = document.createDocumentFragment();
    for (let f = 0, o = 0; o < V.length; f++, o += 6) {
      const xs = [V[o], V[o + 2], V[o + 4]], ys = [V[o + 1], V[o + 3], V[o + 5]];
      if (Math.max(...xs) < 0 || Math.min(...xs) > CW || Math.max(...ys) < 0 || Math.min(...ys) > H) continue;
      const gx = (xs[0] + xs[1] + xs[2]) / 3, gy = (ys[0] + ys[1] + ys[2]) / 3;
      // a hair larger than the cell: the cover has no seam until it opens
      const v = [0, 1, 2].map(q => [gx + (xs[q] - gx) * grow, gy + (ys[q] - gy) * grow]);
      const el = tri(weave.obsidian[Math.floor(hash(f, 7) * 2.999)], 'mm-tri mm-cell');
      const M = matrix(v[0][0], v[0][1], v[1][0], v[1][1], v[2][0], v[2][1]);
      el.style.transform = M;
      frag.append(el);
      const d = Math.hypot(gx - cx0, (gy - cy0) * 1.25) * (1 + weave.tear * (noise(gx / weave.grain, gy / weave.grain, 9) * 2 - 1));
      const when = o0 + (o1 - span - o0) * Math.min(1, Math.max(0, d) / far) + .06 * (hash(f, 3) - .5);
      const about = s => `translate(${px(gx)}px,${px(gy)}px) scale(${s}) translate(${px(-gx)}px,${px(-gy)}px) ${M}`;
      run(el, [{ transform: about(1), opacity: 1 }, { transform: about(.12), opacity: 0 }], Math.max(0, when), span, 'cubic-bezier(.55,0,.8,.45)');
    }
    cellBox.append(frag);
    const sources = [];
    for (const q of glyphs) {
      // the letter gives way to its pieces just as they break, in a flash
      const t0 = letterAt(q.i, weave.split, weave.fade);
      run(q.whole, [{ opacity: 1 }, { opacity: 0 }], t0, .03);
      run(q.flash, [{ opacity: 0 }, { opacity: .9, offset: .08 }, { opacity: 0 }], t0, .18, 'ease-out');
      for (const p of q.pieces) {
        const t = pieceAt(q.i, p.j, false);
        sources.push([t, p]);
        const dx = (p.cx - cx0) * .35 + (p.h - .5) * S * 2.4, dy = (p.cy - cy0) * .9 + (hash(p.j, q.i + 61) - .5) * S * 2.6;
        run(p.el, [
          { opacity: 1, transform: q.at },
          { opacity: 1, transform: q.at, offset: .16 },
          { opacity: 0, transform: `translate(${px(q.left + dx)}px,${px(q.top + dy)}px) rotate(${px((p.h - .5) * 70)}deg) scale(.5)` },
        ], t, .3, 'cubic-bezier(.3,0,.55,1)');
      }
    }
    if (!sources.length) return;
    const rects = rectsOf(scene), n = small ? weave.shards[1] : weave.shards[0];
    for (let k = 0; k < n; k++) {
      const [t, p] = sources[Math.floor(hash(k, 71) * sources.length)];
      const [x1, y1] = pointIn(rects, k + 501), x0 = p.cx + (hash(k, 73) - .5) * 12, y0 = p.cy + (hash(k, 79) - .5) * 16;
      const h = hash(k, 83), z = S * (.24 + .22 * h), turn = h * 360, spin = turn - 140 - 240 * hash(k, 89), bow = (h - .5) * .4;
      const a = Math.max(weave.scatter[0], t), b = Math.min(weave.scatter[1] + .2 * hash(k, 97), Math.max(a + .24, a + .32 + .18 * hash(k, 101)));
      const mx = (x0 + x1) / 2 - (y1 - y0) * bow, my = (y0 + y1) / 2 + (x1 - x0) * bow;
      // out of the name in its glow, cooling to the ember as it reaches the page
      const el = shard(k + 1000, z, shade(hex(warm(k + 1000)), .75 + .5 * hash(k, 103)));
      run(el, [
        { transform: at(el, x0, y0, turn, .25), opacity: 0 },
        { opacity: 1, offset: .08 },
        { transform: at(el, mx, my, (turn + spin) / 2, .8), offset: .5 },
        { transform: at(el, x1, y1, spin, 1), opacity: .85, offset: .84 },
        { transform: at(el, x1, y1, spin, 1.05), opacity: 0 },
      ], a, Math.max(.05, b - a), 'cubic-bezier(.3,0,.45,1)');
    }
  }

  /** every element of a movement with its whole timeline, held until `play` sets them going together */
  function build(covering, D, scene) {
    const list = [];
    nodes = [];
    const run = (el, frames, a, len, easing = 'linear') => {
      const anim = el.animate(frames, { duration: Math.max(1, len * D), delay: Math.max(0, a) * D, fill: 'both', easing });
      anim.pause();
      list.push(anim);
      return anim;
    };
    (covering ? leave : open)(run, scene || {});
    return { covering, duration: D, list, nodes };
  }

  return {
    /**
     * Plays a movement from `fraction` (0..1) over `duration` ms. `scene`: { origin: [x, y], rects: [[x, y, w, h]],
     * colours? } in viewport fractions, of the page coming apart (leaving) or composing (arriving). Every element is
     * handed to the compositor with its whole timeline at once: nothing waits on the main thread once it has started.
     */
    play(covering, fraction, duration, scene) {
      const D = Math.max(1, duration), f0 = Math.max(0, Math.min(1, fraction || 0));
      const reuse = primed && primed.covering === covering && primed.duration === D ? primed : null;
      if (reuse) { drop(current); current = null; primed = null; master?.cancel(); master = null; } else stop();
      // a movement built ahead of time shows from its first frame on, in the same frame the last one goes
      cellBox.style.visibility = shardBox.style.visibility = '';
      const now = () => document.timeline?.currentTime ?? performance.now();
      const start = now() - f0 * D;
      const clock = new Animation(new KeyframeEffect(null, null, { duration: D, fill: 'forwards' }), document.timeline);
      clock.startTime = start;
      master = clock;
      const done = clock.finished.then(() => {});
      const go = m => {
        if (master !== clock) { drop(m); return; }
        // one start for all of them: the movement is one piece, already at the point the clock has reached
        for (const anim of m.list) anim.startTime = start;
        current = m;
      };
      if (reuse) go(reuse);
      else if (composed) go(build(covering, D, scene));
      else ready.then(() => go(build(covering, D, scene)));
      return {
        done,
        fraction: () => Math.max(0, Math.min(1, (clock.currentTime ?? 0) / D)),
        cancel() { if (master === clock) stop(); else clock.cancel(); },
      };
    },
    /**
     * R23: builds a movement ahead of time (its elements and their timelines, held), so that `play` only sets it going:
     * arriving, the cells are made while the name holds, not on the frame the page opens.
     */
    prime(covering, duration, scene) {
      return ready.then(() => {
        if (primed) return;
        // the last movement is still on screen: nothing of the next one shows before it starts
        cellBox.style.visibility = shardBox.style.visibility = 'hidden';
        primed = build(covering, Math.max(1, duration), scene);
      });
    },
    remove() { stop(); layer.remove(); },
    /** R18: the name is composed in its own face (the incoming document may be loading Inter) */
    ready
  };
}
