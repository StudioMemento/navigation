// R16: the page change in three movements: the interface comes apart, its fragments compose a sign, the sign breaks
// and the next page composes. One 2D layer above the page, a pure function of the progress: the incoming document
// draws exactly the frame the outgoing one would have drawn (the progress travels in sessionStorage).
// R17: leaving, the real interface comes apart (the engine's own cells fly, see EXIT in the shaders; the DOM pieces
// dissolve, see scene-head); this layer adds what moves with it and, once the screen is empty, black behind the sign.
// R18: the sign is the name of the page that opens; wordmark and dock never leave. R20: the name spans the content
// between the site's margins (padding.mjs) and the background of letters stays alive through the change.
//
// R21: the language of the cards (docs/dna). One irregular net of triangular cells of mixed sizes, as on a card;
// amber is an event that runs along the edges of the cells the chain reaches and dies out, never a lattice over the
// whole screen. Leaving, the chain runs only over the content between the margins: where it passes the content breaks
// into obsidian fragments (black glass, a lit edge that cools as they fly) and they land on the name, which composes
// facet by facet where they land, in the material of a title in hover (cream to #FF7950, micro-facets, light on the
// border), drawn at the screen's full resolution. Arriving, the name breaks facet by facet, its fragments fly to the
// new interface and the cells over it open, again with the chain on their edges: the same language both ways.
import { STATIONS } from '../src/kit/core.mjs';

/** R18: the name composed for each address (the Home: HOME). Shared by every page through scene-head. */
export const names = Object.fromEntries([['/', 'HOME'], ['/memento', 'STUDIO'], ...STATIONS.map(s => [s.path, s.title])]);

/** Timing of the two movements (shares of progress 0..1) and their sizes. Shared by every page through scene-head. */
export const weave = {
  /** px between the points of the net: the cells of a card scaled to the screen, 24–44 px (mixed sizes inside) */
  cell: [24, 44, 1300],
  /** a cell takes this share of the movement to close (leaving) or open (arriving): the width of the moving front */
  close: .15, open: .17,
  /** fragments flying to the name and back out: at most this many (large and small screens) */
  shards: [320, 110],
  /** the name: share of the movement where it forms (leaving) and where it breaks (arriving), letter by letter, each
   *  over `letter` of the movement, the first at the start of the span, the last at its end */
  form: [.5, .9], fade: [.02, .3], letter: [.22, .16],
  /** leaving: the screen behind the departing interface turns to the ground only once it is empty */
  veil: [.76, .96],
  /** leaving: when a cell leaves, by its distance from the touched point (the engine's EXIT uses the same) */
  leave: [.02, .46, .16],
  /** R21: the share of the movement an edge stays lit after the chain reaches it (a fast rise, then it dies out) */
  crack: .15,
  /** R21: the front of the chain is torn by a slow noise: its share of the distance and its grain (px) */
  tear: .22, grain: 240,
  /** R21: the facets of the name, as a share of its size (never under 9 px) */
  facet: .12,
  /** the ground the page stands on (site.css --memento-ground) */
  ground: '#090909',
  /** R21: the site's orange, its light variant and the crest of the chain (site.css --memento-accent…) */
  amber: ['#ff7950', '#ffaf96', '#ffd7ca'],
};

export function createMaterial(name, weave, paddingOf) {
  const layer = document.createElement('div');
  layer.className = 'mm-weave';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = '<canvas class="mm-cells"></canvas><canvas class="mm-name"></canvas>';
  const [canvas, title] = layer.querySelectorAll('canvas');
  // R17: the name breathes while the next page gets ready; both documents take the phase from the clock: no jump
  title.style.animationDelay = -(Date.now() % 2400) + 'ms';
  document.body.append(layer);
  const W = innerWidth, H = innerHeight, ratio = devicePixelRatio || 1;
  // R21: the name at the screen's full resolution (it was capped at 1.5 and looked soft on sharper screens)
  const dpr = Math.min(ratio, 2), ndpr = Math.min(ratio, 3);
  canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  title.width = Math.round(W * ndpr); title.height = Math.round(H * ndpr);
  const ctx = canvas.getContext('2d'), tctx = title.getContext('2d');
  const hash = (a, b) => {
    let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul((b + 0x632be5ab) | 0, 0xc2b2ae35);
    h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15;
    return (h >>> 0) / 4294967296;
  };
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const noise = (x, y, seed) => {
    const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const a = hash(xi + seed, yi), b = hash(xi + 1 + seed, yi), c = hash(xi + seed, yi + 1), d = hash(xi + 1 + seed, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  const [orange, light, crest] = weave.amber;
  const P = paddingOf(W, H) * W;

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

  // the net over the screen: the cover that opens on the incoming page, and the cells the chain runs through leaving
  const [minCell, maxCell, per] = weave.cell;
  const S = Math.max(minCell, Math.min(maxCell, Math.sqrt(W * H / per)));
  const V = net(0, 0, W, H, S, 0), n = V.length / 6;
  const cx = new Float32Array(n), cy = new Float32Array(n), r = new Float32Array(n), inside = new Uint8Array(n);
  for (let f = 0; f < n; f++) {
    cx[f] = (V[f * 6] + V[f * 6 + 2] + V[f * 6 + 4]) / 3; cy[f] = (V[f * 6 + 1] + V[f * 6 + 3] + V[f * 6 + 5]) / 3;
    r[f] = hash(f, 7);
    // the content between the margins: where the chain runs and the fragments come from
    inside[f] = cx[f] > P && cx[f] < W - P ? 1 : 0;
  }
  const grow = 1 + 1.5 / S;   // a closed cell overlaps its neighbours by about a pixel: no seam shows the page

  // R18/R21: the name of the page, in the material of a title in hover. Each letter is painted once into its own
  // sprite; its facets (the same net, finer) are where the fragments land and where it breaks
  const word = String(name || 'MEMENTO').toUpperCase(), letters = [...word].filter(c => c !== ' ');
  const count = Math.max(1, letters.length);
  let sprites = [], facets = new Float32Array(0), fcount = 0;   // facet: 6 coords (screen), letter, order key
  const FS = 8;

  function compose() {
    const font = px => `300 ${px}px Inter, "Helvetica Neue", Arial, sans-serif`;
    const m = document.createElement('canvas').getContext('2d');
    // R20: the name spans exactly the content between the site's margins, its capitals justified from one margin to
    // the other
    const room = W - 2 * P;
    m.font = font(100);
    const unit = letters.map(c => { const t = m.measureText(c); return t.actualBoundingBoxLeft + t.actualBoundingBoxRight; });
    const size = Math.max(14, Math.min(H * .17, room * .6 / (unit.reduce((a, b) => a + b, 0) / 100)));
    m.font = font(size);
    const metrics = letters.map(c => m.measureText(c));
    const ink = metrics.map(t => t.actualBoundingBoxLeft + t.actualBoundingBoxRight);
    const cap = Math.max(...metrics.map(t => t.actualBoundingBoxAscent)), drop = Math.max(0, ...metrics.map(t => t.actualBoundingBoxDescent));
    const gap = count > 1 ? (room - ink.reduce((a, b) => a + b, 0)) / (count - 1) : 0;
    const base = H / 2 + cap / 2, pad = Math.ceil(size * .32);
    const step = Math.max(9, size * weave.facet);
    // the title ramp of the engine (src/vfx/config.mjs TITLE_AMBER, R21): cream from above, #FF7950 at the base
    const ramp = [[0, '#ffece7'], [.56, '#ffece7'], [.68, '#ffd4c7'], [.8, '#ffa88e'], [.91, orange], [1, '#d66643']];
    let x = count > 1 ? P : (W - ink[0]) / 2;
    const list = [];
    sprites = letters.map((c, i) => {
      const w = Math.ceil(ink[i]) + pad * 2, h = Math.ceil(cap + drop) + pad * 2;
      const bx = pad + metrics[i].actualBoundingBoxLeft, by = pad + cap;
      const left = Math.round((x - pad) * ndpr) / ndpr, top = Math.round((base - cap - pad) * ndpr) / ndpr;
      // where the glyph is (its own pixels, no glow): which facets belong to the letter
      const mask = document.createElement('canvas'), mw = Math.ceil(w), mh = Math.ceil(h);
      mask.width = mw; mask.height = mh;
      const mg = mask.getContext('2d', { willReadFrequently: true });
      mg.font = font(size); mg.fillStyle = '#fff'; mg.fillText(c, bx, by);
      let alpha = null;
      try { alpha = mg.getImageData(0, 0, mw, mh).data; } catch {}
      const inGlyph = (px, py) => {
        if (!alpha) return true;
        const ix = Math.round(px), iy = Math.round(py);
        if (ix < 0 || iy < 0 || ix >= mw || iy >= mh) return false;
        return alpha[(iy * mw + ix) * 4 + 3] > 40;
      };
      const local = net(0, 0, w, h, step, 101 + i * 13), own = [];
      for (let k = 0; k < local.length; k += 6) {
        const ax = local[k], ay = local[k + 1], bbx = local[k + 2], bby = local[k + 3], ccx = local[k + 4], ccy = local[k + 5];
        const gx = (ax + bbx + ccx) / 3, gy = (ay + bby + ccy) / 3;
        if (inGlyph(gx, gy) || inGlyph(ax, ay) || inGlyph(bbx, bby) || inGlyph(ccx, ccy) ||
          inGlyph((ax + gx) / 2, (ay + gy) / 2) || inGlyph((bbx + gx) / 2, (bby + gy) / 2) || inGlyph((ccx + gx) / 2, (ccy + gy) / 2)) own.push(k);
      }
      // the sprite: glow outside, the ramp, the facets (tone and a hairline wire), light on the border
      const sprite = document.createElement('canvas');
      sprite.width = Math.ceil(w * ndpr); sprite.height = Math.ceil(h * ndpr);
      const g = sprite.getContext('2d');
      g.scale(ndpr, ndpr);
      g.font = font(size); g.textBaseline = 'alphabetic';
      g.fillStyle = '#ff8a66';
      g.shadowColor = 'rgba(255,121,80,.55)'; g.shadowBlur = size * .2; g.fillText(c, bx, by);
      g.shadowColor = 'rgba(255,175,150,.5)'; g.shadowBlur = size * .05; g.fillText(c, bx, by);
      g.shadowColor = 'transparent'; g.shadowBlur = 0;
      const grad = g.createLinearGradient(0, by - cap, 0, by);
      for (const [o, col] of ramp) grad.addColorStop(o, col);
      g.fillStyle = grad; g.fillText(c, bx, by);
      g.globalCompositeOperation = 'source-atop';
      const tones = [['#ffffff', .1], ['#ffffff', .055], [orange, .08], ['#d66643', .07], [light, .09]];
      const batches = tones.map(() => new Path2D()), wire = new Path2D();
      for (const k of own) {
        const t = tones[Math.floor(hash(k, i * 31 + 5) * tones.length)], path = batches[tones.indexOf(t)];
        path.moveTo(local[k], local[k + 1]); path.lineTo(local[k + 2], local[k + 3]); path.lineTo(local[k + 4], local[k + 5]); path.closePath();
        wire.moveTo(local[k], local[k + 1]); wire.lineTo(local[k + 2], local[k + 3]); wire.lineTo(local[k + 4], local[k + 5]); wire.closePath();
      }
      batches.forEach((path, b) => { g.fillStyle = tones[b][0]; g.globalAlpha = tones[b][1]; g.fill(path); });
      // a hairline of one device pixel: the lattice of a title in hover, crisp at any resolution
      g.globalAlpha = .16; g.strokeStyle = '#ffece7'; g.lineWidth = 1 / ndpr; g.stroke(wire);
      g.globalAlpha = .4; g.strokeStyle = crest; g.lineWidth = Math.max(1, size * .014); g.strokeText(c, bx, by);
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
      for (const k of own) {
        const gx = (local[k] + local[k + 2] + local[k + 4]) / 3;
        list.push(left + local[k], top + local[k + 1], left + local[k + 2], top + local[k + 3], left + local[k + 4], top + local[k + 5], i,
          // order: across the letter from the left, loosened by a little chance
          .65 * (gx / w) + .35 * hash(k, i * 17 + 3));
      }
      const out = { sprite, x: left, y: top, w, h };
      x += ink[i] + gap;
      return out;
    });
    facets = Float32Array.from(list); fcount = facets.length / FS;
  }
  compose();
  // the incoming document may still be loading Inter: it composes again as soon as the face is there, and only then
  // takes over from the outgoing frame (scene-head waits for `ready`)
  const face = '300 64px Inter';
  let replan = null;
  const ready = !document.fonts || document.fonts.check(face) ? Promise.resolve()
    : Promise.race([document.fonts.load(face).then(() => { compose(); replan?.(); }), new Promise(r => setTimeout(r, 900))]);

  /** When each facet of the name appears (leaving) or breaks (arriving), from its letter's moment and its order. */
  function facetTime(k, covering) {
    const li = facets[k * FS + 6], u = facets[k * FS + 7];
    const [a0, a1] = covering ? weave.form : weave.fade, each = covering ? weave.letter[0] : weave.letter[1];
    const at = a0 + (a1 - a0 - each) * (count > 1 ? li / (count - 1) : 0);
    return at + each * (.08 + .84 * u);
  }

  function plan(covering, scene) {
    const t0 = new Float32Array(n), shards = [];
    const [ox, oy] = covering && scene.origin ? [scene.origin[0] * W, scene.origin[1] * H] : [W / 2, H / 2];
    const far = Math.max(Math.hypot(ox, oy), Math.hypot(W - ox, oy), Math.hypot(ox, H - oy), Math.hypot(W - ox, H - oy)) || 1;
    const [l0, l1, lj] = weave.leave;
    for (let f = 0; f < n; f++) {
      // the chain's front: the distance from where it started, torn by a slow noise and a little chance per cell
      const d = Math.hypot(cx[f] - ox, cy[f] - oy) * (1 + weave.tear * (noise(cx[f] / weave.grain, cy[f] / weave.grain, 5) * 2 - 1));
      const k = Math.max(0, d) / far;
      t0[f] = covering ? l0 + l1 * k + lj * (r[f] - .5) : .22 + .56 * k + .08 * (r[f] - .5);
    }
    // the interface (cards, photographs, type): its cells are the ones that break and light; arriving, the new one
    const rects = (scene.rects || []).map(([x, y, w, h]) => [x * W, y * H, (x + w) * W, (y + h) * H]);
    const over = f => rects.some(q => cx[f] > q[0] && cx[f] < q[2] && cy[f] > q[1] && cy[f] < q[3]);
    // the chain runs over the content between the margins, densest over the interface
    const chain = [];
    for (let f = 0; f < n; f++) if (inside[f] && (over(f) ? r[f] < .5 : r[f] < .1)) chain.push(f);
    const max = W * H > 6e5 ? weave.shards[0] : weave.shards[1], pick = [];
    for (let f = 0; f < n && fcount; f++) {
      if (!inside[f] || cy[f] < -S || cy[f] > H + S) continue;
      const k = hash(f, 31);
      if (over(f) ? k < .5 : k < .05) pick.push(f);
    }
    // never more than the budget: a stable choice (both documents pick the same fragments)
    pick.sort((a, b) => hash(a, 97) - hash(b, 97)).length = Math.min(pick.length, max);
    // the facets by the time they appear (or break): a fragment lands on one that appears after it left
    const order = Array.from({ length: fcount }, (_, k) => k).map(k => [facetTime(k, covering), k]).sort((a, b) => a[0] - b[0]);
    pick.forEach((f, i) => {
      const h = hash(f, 13), size = S * (.55 + .3 * h);
      if (covering) {
        const a = Math.max(0, t0[f] + .02);
        let lo = 0, hi = order.length;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (order[mid][0] < a + .2) lo = mid + 1; else hi = mid; }
        const j = lo < order.length ? lo + Math.floor(hash(f, 41) * (order.length - lo)) : order.length - 1 - Math.floor(hash(f, 41) * Math.min(order.length, 12));
        const [time, k] = order[Math.max(0, j)];
        shards.push({ f, k, x0: cx[f], y0: cy[f], a, b: Math.max(a + .22, time), h, size });
      } else {
        const [time, k] = order[Math.floor(hash(f, 41) * order.length)];
        const a = time, b = Math.max(a + .26, t0[f] + weave.open * .5);
        t0[f] = Math.max(t0[f], b - weave.open * .4);
        shards.push({ f, k, x1: cx[f], y1: cy[f], a, b, h, size });
      }
    });
    let first = 1, last = 0;
    for (let f = 0; f < n; f++) { first = Math.min(first, t0[f]); last = Math.max(last, t0[f]); }
    return { covering, t0, shards, first, last, chain, scene };
  }

  const tri = (g, o, s, x, y) => {
    g.moveTo(x + (V[o] - x) * s, y + (V[o + 1] - y) * s);
    g.lineTo(x + (V[o + 2] - x) * s, y + (V[o + 3] - y) * s);
    g.lineTo(x + (V[o + 4] - x) * s, y + (V[o + 5] - y) * s);
    g.closePath();
  };
  // the energy of a cell the chain reached `k` (shares of `crack`) ago: a fast rise to its crest, then it dies out
  const energy = k => k <= 0 || k >= 1 ? 0 : k < .16 ? k / .16 : Math.exp(-(k - .16) * 4.2);
  const edgeStyles = [[orange, .2], [light, .34], [crest, .5]];

  function draw(p, t) {
    const span = p.covering ? weave.close : weave.open;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = weave.ground;
    const lit = [[], [], []];
    if (p.covering) {
      // R17: the interface leaves by itself; black comes in behind the name once nothing is left to see
      const veil = smooth(weave.veil[0], weave.veil[1], t);
      if (veil > .001) { ctx.globalAlpha = veil; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    } else {
      // arriving: the cover, cell by cell, opens from the name outward over the new page
      const shut = t <= p.first, open = t >= p.last + span;
      if (shut) ctx.fillRect(0, 0, W, H);
      else if (!open) for (let f = 0; f < n; f++) {
        const a = 1 - smooth(p.t0[f], p.t0[f] + span, t);
        if (a <= 0) continue;
        ctx.beginPath(); tri(ctx, f * 6, a * grow, cx[f], cy[f]); ctx.fill();
      }
    }
    // R21: the chain: amber runs along the edges of the cells it reaches, over the content, and dies out
    for (const f of p.chain) {
      const e = energy((t - (p.covering ? p.t0[f] : p.t0[f] - span * .2)) / weave.crack);
      if (e > .04) lit[Math.min(2, Math.floor(e * 2.999))].push(f);
    }
    ctx.lineWidth = 1; ctx.lineJoin = 'round';
    lit.forEach((list, b) => {
      if (!list.length) return;
      ctx.beginPath();
      for (const f of list) tri(ctx, f * 6, 1, cx[f], cy[f]);
      ctx.strokeStyle = edgeStyles[b][0]; ctx.globalAlpha = edgeStyles[b][1]; ctx.stroke();
    });
    ctx.globalAlpha = 1;
    // R21: fragments of obsidian: black glass, a graphite face, an edge lit in amber when they break that cools as they
    // fly; smaller as they reach the name (leaving), larger as they reach the page (arriving)
    const faces = new Path2D(), edges = [new Path2D(), new Path2D(), new Path2D()];
    let any = false;
    for (const s of p.shards) {
      const hold = p.covering ? .06 : .02;
      if (t <= s.a || t >= s.b + hold) continue;
      const u = ease(Math.min(1, (t - s.a) / (s.b - s.a)));
      const k = s.k * FS, fx = (facets[k] + facets[k + 2] + facets[k + 4]) / 3, fy = (facets[k + 1] + facets[k + 3] + facets[k + 5]) / 3;
      const x0 = p.covering ? s.x0 : fx, y0 = p.covering ? s.y0 : fy, x1 = p.covering ? fx : s.x1, y1 = p.covering ? fy : s.y1;
      const dx = x1 - x0, dy = y1 - y0, bow = (s.h - .5) * .45 * Math.sin(Math.PI * u);
      const x = x0 + dx * u - dy * bow, y = y0 + dy * u + dx * bow;
      const z = (p.covering ? s.size * (1 - .75 * u) : s.size * (.25 + .75 * u)) * .5;
      if (p.covering && t > s.b) continue;
      const turn = s.h * 6.283 + u * (1.2 + 1.6 * s.h);
      const path = new Path2D();
      for (let q = 0; q < 3; q++) {
        const ang = turn + q * 2.094 + (q === 1 ? .3 : 0), rr = z * (q === 2 ? .8 : 1);
        q ? path.lineTo(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr) : path.moveTo(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr);
      }
      path.closePath();
      faces.addPath(path);
      // the edge is hottest when the fragment breaks off (leaving) or leaves the name (arriving), then cools
      const heat = 1 - u;
      edges[heat > .66 ? 2 : heat > .33 ? 1 : 0].addPath(path);
      any = true;
    }
    if (any) {
      ctx.fillStyle = '#141416'; ctx.globalAlpha = .96; ctx.fill(faces);
      ctx.lineWidth = 1;
      [['rgba(255,255,255,.2)', 1], [light, .5], [orange, .85]].forEach(([col, a], b) => { ctx.strokeStyle = col; ctx.globalAlpha = a; ctx.stroke(edges[b]); });
      ctx.globalAlpha = 1;
    }
    // R21: the name, facet by facet: leaving, a facet appears where its fragment lands (a flash of the crest, then the
    // material); arriving, it flashes and breaks away. A letter whose facets are all there is drawn whole.
    tctx.setTransform(ndpr, 0, 0, ndpr, 0, 0);
    tctx.clearRect(0, 0, W, H);
    const flash = .05;
    sprites.forEach((q, i) => {
      const clip = new Path2D(), glints = new Path2D();
      let shown = 0, total = 0, glint = 0;
      for (let k = 0; k < fcount; k++) {
        if (facets[k * FS + 6] !== i) continue;
        total++;
        const tf = facetTime(k, p.covering), o = k * FS;
        const on = p.covering ? t >= tf : t < tf;
        if (on) {
          shown++;
          clip.moveTo(facets[o], facets[o + 1]); clip.lineTo(facets[o + 2], facets[o + 3]); clip.lineTo(facets[o + 4], facets[o + 5]); clip.closePath();
        }
        const since = p.covering ? t - tf : tf - t;
        if (since >= 0 && since < flash || (!p.covering && t >= tf && t - tf < flash)) {
          glints.moveTo(facets[o], facets[o + 1]); glints.lineTo(facets[o + 2], facets[o + 3]); glints.lineTo(facets[o + 4], facets[o + 5]); glints.closePath();
          glint++;
        }
      }
      if (!shown && !glint) return;
      tctx.save();
      if (shown < total) tctx.clip(clip);
      // one sprite pixel on one device pixel: never resampled, never soft
      if (shown) tctx.drawImage(q.sprite, q.x, q.y, q.sprite.width / ndpr, q.sprite.height / ndpr);
      tctx.restore();
      if (glint) {
        // the crest on the facets that just landed or just broke away
        tctx.globalAlpha = .55; tctx.fillStyle = crest; tctx.fill(glints);
        tctx.globalAlpha = .9; tctx.strokeStyle = light; tctx.lineWidth = .8; tctx.stroke(glints);
        tctx.globalAlpha = 1;
      }
    });
  }

  let loop = 0;
  return {
    /** `scene`: { origin: [x, y], rects: [[x, y, w, h]] } in viewport fractions, of the page coming apart or composing. */
    play(covering, fraction, duration, scene) {
      cancelAnimationFrame(loop);
      let p = plan(covering, scene || {});
      replan = () => { p = plan(covering, scene || {}); };
      const start = performance.now();
      let t = Math.max(0, Math.min(1, fraction)), last = start, frameAt = start, finish;
      const done = new Promise(resolve => { finish = resolve; });
      draw(p, t);   // before the first paint of an incoming document: it starts on exactly this frame
      // R17: a slow frame (the first one of a page change often is) does not skip the movement: it advances at most
      // 50 ms of it, and the movement never falls more than a quarter behind the clock
      const frame = now => {
        frameAt = performance.now();
        const step = Math.min(50, Math.max(0, now - last)); last = now;
        t = Math.min(1, Math.max(t + step / duration, fraction + (now - start) / duration - .25));
        draw(p, t);
        if (t < 1) loop = requestAnimationFrame(frame); else { document.removeEventListener('visibilitychange', kick); finish(); }
      };
      // R21: back from a hidden or frozen tab, a frame asked for long ago may never come: ask again
      const kick = () => { if (!document.hidden && t < 1 && performance.now() - frameAt > 1000) { cancelAnimationFrame(loop); loop = requestAnimationFrame(frame); } };
      document.addEventListener('visibilitychange', kick);
      if (t < 1) loop = requestAnimationFrame(frame); else finish();
      return { done, fraction: () => t, cancel() { cancelAnimationFrame(loop); document.removeEventListener('visibilitychange', kick); } };
    },
    remove() { cancelAnimationFrame(loop); layer.remove(); },
    /** R18: the name is composed in its own face (the incoming document may be loading Inter) */
    ready
  };
}
