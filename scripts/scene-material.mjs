// R16: the page change in three movements. The interface comes apart cell by cell from where it was touched; its
// fragments fly into the Memento seal; the seal breaks, its fragments fly out to the new page, and the new interface
// composes through the same lattice. One 2D canvas above the page, a pure function of the progress: the incoming
// document draws exactly the frame the outgoing one would have drawn (the progress travels in sessionStorage).
// R17: leaving, nothing closes over the page any more. The real interface comes apart (the engine's own cells fly
// into the seal, see EXIT in the shaders; the DOM pieces dissolve, see scene-head); this layer only adds the cracks of
// the lattice where it leaves, the sparks flying into the seal and, once the screen is empty, black behind the seal.
// R18: the seal is now the name of the page that opens, composed letter by letter in the type of the Start titles
// (Inter, spread capitals, amber gradient, glow and a fine lattice inside the letters). The ground is #090909 and the
// layer stays under the navigation: wordmark and dock never leave, only the content changes.
import { STATIONS } from '../src/kit/core.mjs';

/** R18: the name composed for each address (the Home: HOME). Shared by every page through scene-head. */
export const names = Object.fromEntries([['/', 'HOME'], ['/memento', 'STUDIO'], ...STATIONS.map(s => [s.path, s.title])]);

/** Timing of the two movements (s of progress 0..1) and their sizes. Shared by every page through scene-head. */
export const weave = {
  /** px between lattice points: about one START card cell scaled to the screen, 22–42 px */
  cell: [22, 42, 1400],
  /** a cell takes this share of the movement to close (leaving) or open (arriving): the width of the moving front */
  close: .15, open: .17,
  /** fragments flying to the name and back out: at most this many (large and small screens) */
  shards: [340, 170],
  /** the name: share of the movement where it forms (leaving) and where it breaks (arriving); R18: letter by letter,
   *  each over `letter` of the movement, the first at the start of the span, the last at its end */
  form: [.5, .9], fade: [.02, .3], letter: [.22, .16],
  /** R17 leaving: the screen behind the departing interface turns to the ground only once it is empty */
  veil: [.76, .96],
  /** R17 leaving: when a cell leaves, by its distance from the touched point (the engine's EXIT uses the same) */
  leave: [.02, .46, .16], crack: .2,
  /** R18: the ground the page stands on (site.css --memento-ground) */
  ground: '#090909',
};

export function createMaterial(name, weave) {
  const layer = document.createElement('div');
  layer.className = 'mm-weave';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = '<canvas class="mm-cells"></canvas><canvas class="mm-name"></canvas>';
  const [canvas, title] = layer.querySelectorAll('canvas');
  // R17: the name breathes while the next page gets ready; both documents take the phase from the clock: no jump
  title.style.animationDelay = -(Date.now() % 2400) + 'ms';
  document.body.append(layer);
  const W = innerWidth, H = innerHeight, dpr = Math.min(devicePixelRatio || 1, 1.5);
  canvas.width = title.width = Math.round(W * dpr); canvas.height = title.height = Math.round(H * dpr);
  const ctx = canvas.getContext('2d'), tctx = title.getContext('2d');
  const hash = (a, b) => {
    let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul((b + 0x632be5ab) | 0, 0xc2b2ae35);
    h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15;
    return (h >>> 0) / 4294967296;
  };
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  // the lattice: rows offset by half a cell, every point moved a little, two triangles per quad
  const [minCell, maxCell, per] = weave.cell;
  const S = Math.max(minCell, Math.min(maxCell, Math.sqrt(W * H / per))), rowH = S * .866;
  const cols = Math.ceil(W / S) + 2, rows = Math.ceil(H / rowH) + 2, stride = cols + 1;
  const px = new Float32Array(stride * (rows + 1)), py = new Float32Array(stride * (rows + 1));
  for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
    px[j * stride + i] = (i - 1 + (j & 1) * .5) * S + (hash(i, j) - .5) * .5 * S;
    py[j * stride + i] = (j - 1) * rowH + (hash(j + 911, i) - .5) * .44 * rowH;
  }
  const tri = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = j * stride + i, b = a + 1, c = a + stride, d = c + 1;
    if (j & 1) tri.push(a, b, d, a, d, c); else tri.push(a, b, c, b, d, c);
  }
  const n = tri.length / 3, V = new Float32Array(n * 6), cx = new Float32Array(n), cy = new Float32Array(n), r = new Float32Array(n);
  for (let f = 0; f < n; f++) {
    for (let k = 0; k < 3; k++) { V[f * 6 + k * 2] = px[tri[f * 3 + k]]; V[f * 6 + k * 2 + 1] = py[tri[f * 3 + k]]; }
    cx[f] = (V[f * 6] + V[f * 6 + 2] + V[f * 6 + 4]) / 3; cy[f] = (V[f * 6 + 1] + V[f * 6 + 3] + V[f * 6 + 5]) / 3;
    r[f] = hash(f, 7);
  }
  const grow = 1 + 1.5 / S;   // a closed cell overlaps its neighbours by about a pixel: no seam shows the page

  // R18: the name of the page, in the type of the Start titles. Each letter is painted once into its own sprite
  // (glow, amber gradient, a fine lattice inside); the fragments land on the letters' own pixels
  const word = String(name || 'MEMENTO').toUpperCase(), letters = [...word].filter(c => c !== ' ');
  const count = Math.max(1, letters.length);
  let sprites = [], targets = [], points = 1;
  function compose() {
    const font = px => `300 ${px}px Inter, "Helvetica Neue", Arial, sans-serif`;
    const m = document.createElement('canvas').getContext('2d');
    // as large as the screen allows: a capital about a sixth of the height, the word within 82% of the width,
    // spread like the titles of the Home (justified capitals, a clear gap between them)
    let size = Math.min(H * .17, W * .12), widths, gap;
    for (let k = 0; k < 6; k++) {
      m.font = font(size);
      widths = letters.map(c => m.measureText(c).width);
      const ink = widths.reduce((a, b) => a + b, 0), room = Math.min(W * .82, ink + size * .9 * (count - 1));
      gap = count > 1 ? (room - ink) / (count - 1) : 0;
      if (gap >= size * .28 || size < 18) break;
      size *= .88;
    }
    const total = widths.reduce((a, b) => a + b, 0) + gap * (count - 1);
    const cap = size * .727, base = H / 2 + cap / 2, pad = Math.ceil(size * .34);
    let x = (W - total) / 2;
    sprites = letters.map((c, i) => {
      const w = Math.ceil(widths[i]) + pad * 2, h = Math.ceil(cap) + pad * 2;
      const sprite = document.createElement('canvas');
      sprite.width = Math.ceil(w * dpr); sprite.height = Math.ceil(h * dpr);
      const g = sprite.getContext('2d');
      g.scale(dpr, dpr);
      g.font = font(size); g.textBaseline = 'alphabetic';
      const bx = pad, by = pad + cap;
      // warm light around each letter: a wide soft glow, then a tight one
      g.fillStyle = '#ff7950';
      g.shadowColor = 'rgba(255,110,60,.5)'; g.shadowBlur = size * .2; g.fillText(c, bx, by);
      g.shadowColor = 'rgba(255,170,96,.55)'; g.shadowBlur = size * .05; g.fillText(c, bx, by);
      g.shadowColor = 'transparent'; g.shadowBlur = 0;
      // the amber gradient of the titles: light from above, warm at the base
      const grad = g.createLinearGradient(0, by - cap, 0, by);
      [[0, '#fbefe8'], [.56, '#fbefe8'], [.68, '#f5d9c6'], [.8, '#ecb28c'], [.91, '#e2874f'], [1, '#d9682f']].forEach(([o, col]) => grad.addColorStop(o, col));
      g.fillStyle = grad; g.fillText(c, bx, by);
      // a fine lattice of triangles inside the letter, like the cells of the titles
      g.globalCompositeOperation = 'source-atop';
      g.strokeStyle = 'rgba(160,62,22,.32)'; g.lineWidth = Math.max(.5, size * .006);
      const t = Math.max(7, size * .085), row = t * .866;
      g.beginPath();
      for (let yy = -row, j = 0; yy < h + row; yy += row, j++) for (let xx = -t + (j & 1) * t / 2; xx < w + t; xx += t) {
        g.moveTo(xx, yy); g.lineTo(xx + t, yy); g.moveTo(xx, yy); g.lineTo(xx + t / 2, yy + row); g.lineTo(xx + t, yy);
      }
      g.stroke();
      g.globalCompositeOperation = 'source-over';
      const out = { sprite, x: x - pad, y: base - cap - pad, w, h };
      x += widths[i] + gap;
      return out;
    });
    // where the fragments land: the letters' own pixels (the core of each glyph, not its glow)
    targets = [];
    const step = Math.max(2, Math.round(size / 45));
    letters.forEach((c, i) => {
      const o = document.createElement('canvas'), q = sprites[i], ow = Math.ceil(q.w), oh = Math.ceil(q.h);
      o.width = ow; o.height = oh;
      const g = o.getContext('2d', { willReadFrequently: true });
      g.font = font(size); g.fillStyle = '#fff'; g.fillText(c, pad, pad + cap);
      try {
        const data = g.getImageData(0, 0, ow, oh).data;
        for (let y = 0; y < oh; y += step) for (let xx = 0; xx < ow; xx += step) if (data[(y * ow + xx) * 4 + 3] > 160) targets.push(q.x + xx, q.y + y, i);
      } catch {}
    });
    if (!targets.length) targets.push(W / 2, H / 2, 0);
    points = targets.length / 3;
  }
  compose();
  // the incoming document may still be loading Inter: it composes again as soon as the face is there, and only then
  // takes over from the outgoing frame (scene-head waits for `ready`)
  const face = '300 64px Inter';
  const ready = !document.fonts || document.fonts.check(face) ? Promise.resolve()
    : Promise.race([document.fonts.load(face).then(() => { compose(); }), new Promise(r => setTimeout(r, 900))]);

  function plan(covering, scene) {
    const t0 = new Float32Array(n), shards = [];
    const [ox, oy] = covering && scene.origin ? [scene.origin[0] * W, scene.origin[1] * H] : [W / 2, H / 2];
    const far = Math.max(Math.hypot(ox, oy), Math.hypot(W - ox, oy), Math.hypot(ox, H - oy), Math.hypot(W - ox, H - oy)) || 1;
    const [l0, l1, lj] = weave.leave;
    for (let f = 0; f < n; f++) {
      const d = Math.hypot(cx[f] - ox, cy[f] - oy) / far;
      t0[f] = covering ? l0 + l1 * d + lj * (r[f] - .5) : .22 + .56 * d + .08 * (r[f] - .5);
    }
    // fragments come from the interface (cards, photographs, type, the dock), a few from the black around it
    const rects = (scene.rects || []).map(([x, y, w, h]) => [x * W, y * H, (x + w) * W, (y + h) * H]);
    const inside = f => rects.some(q => cx[f] > q[0] && cx[f] < q[2] && cy[f] > q[1] && cy[f] < q[3]);
    // R17 leaving: the cells over the interface, where the lattice cracks as it comes apart
    const inner = [];
    if (covering) for (let f = 0; f < n; f++) if (r[f] < .62 && inside(f)) inner.push(f);
    const max = W * H > 6e5 ? weave.shards[0] : weave.shards[1], pick = [];
    for (let f = 0; f < n; f++) {
      if (cx[f] < -S || cx[f] > W + S || cy[f] < -S || cy[f] > H + S) continue;
      const k = hash(f, 31);
      if (inside(f) ? k < .5 : k < .06) pick.push(f);
    }
    pick.sort((a, b) => hash(a, 53) - hash(b, 53));
    pick.length = Math.min(pick.length, max);
    pick.forEach((f, i) => {
      const q = (Math.floor(hash(f, 97) * points) % points) * 3, h = hash(f, 13);
      // R18: a fragment flies to a letter and lands while that letter composes; arriving, it leaves as its letter breaks
      const li = targets[q + 2] / Math.max(1, count - 1);
      if (covering) {
        const at = weave.form[0] + (weave.form[1] - weave.form[0] - weave.letter[0]) * li;
        shards.push({ f, x0: cx[f], y0: cy[f], x1: targets[q], y1: targets[q + 1], a: Math.max(0, t0[f]), b: Math.min(.92, Math.max(t0[f] + .26, at + weave.letter[0] * (.25 + .6 * h))), h, size: S * .42 });
      } else {
        const at = weave.fade[0] + (weave.fade[1] - weave.fade[0] - weave.letter[1]) * li;
        const a = at + weave.letter[1] * .5 * h, b = Math.max(a + .26, t0[f]);
        t0[f] = b;
        shards.push({ f, x0: targets[q], y0: targets[q + 1], x1: cx[f], y1: cy[f], a, b, h, size: S * .42 });
      }
    });
    let first = 1, last = 0;
    for (let f = 0; f < n; f++) { first = Math.min(first, t0[f]); last = Math.max(last, t0[f]); }
    return { covering, t0, shards, first, last, inner };
  }

  const amber = ['255,214,150', '255,170,88', '247,121,52'];
  function draw(p, t) {
    const span = p.covering ? weave.close : weave.open;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = weave.ground;
    const fronts = [[], [], []];
    if (p.covering) {
      // R17: the interface leaves by itself; black comes in behind the seal once nothing is left to see
      const veil = smooth(weave.veil[0], weave.veil[1], t);
      if (veil > .001) { ctx.globalAlpha = veil; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
      // the lattice cracks where the interface leaves: amber seams on its cells, for a moment, as they go
      for (const f of p.inner) {
        const k = (t - p.t0[f]) / weave.crack;
        if (k > 0 && k < 1) fronts[Math.min(2, Math.floor(Math.sin(Math.PI * k) * 3))].push(f);
      }
    }
    // cells: closed means the ground. Arriving, they open from the name outward
    const shut = !p.covering && t <= p.first;
    const open = p.covering || t >= p.last + span;
    if (shut) ctx.fillRect(0, 0, W, H);
    else if (!open) {
      // one fill per cell: a single path of thousands of touching triangles rasterizes ten times slower
      for (let f = 0; f < n; f++) {
        const k = smooth(p.t0[f], p.t0[f] + span, t), a = p.covering ? k : 1 - k;
        if (a <= 0) continue;
        const s = a * grow, x = cx[f], y = cy[f], o = f * 6;
        ctx.beginPath();
        ctx.moveTo(x + (V[o] - x) * s, y + (V[o + 1] - y) * s);
        ctx.lineTo(x + (V[o + 2] - x) * s, y + (V[o + 3] - y) * s);
        ctx.lineTo(x + (V[o + 4] - x) * s, y + (V[o + 5] - y) * s);
        ctx.fill();
        // seams on about half the cells of the front, brightest halfway: a lattice that moves, not a net over the page
        if (a > .06 && a < .9 && r[f] < .55) fronts[Math.min(2, Math.floor(Math.sin(Math.PI * a) * 3))].push(f);
      }
    }
    // the lattice shows where it moves: amber seams on the cells leaving, closing or opening, nowhere else
    ctx.lineWidth = 1;
    fronts.forEach((list, b) => {
      if (!list.length) return;
      ctx.beginPath();
      for (const f of list) { const o = f * 6; ctx.moveTo(V[o], V[o + 1]); ctx.lineTo(V[o + 2], V[o + 3]); ctx.lineTo(V[o + 4], V[o + 5]); ctx.closePath(); }
      ctx.strokeStyle = `rgba(255,150,72,${((p.covering ? .08 : .06) + .1 * b).toFixed(2)})`;
      ctx.stroke();
    });
    // fragments: small amber triangles on a bent path, spinning, smaller as they reach the seal (and larger leaving it)
    ctx.globalCompositeOperation = 'lighter';
    const batches = [[], [], []];
    for (const s of p.shards) {
      // leaving, a fragment lands on the seal and glows there while the seal appears; arriving, it fades into its cell
      const hold = p.covering ? .1 : .02;
      if (t <= s.a || t >= s.b + hold) continue;
      const u = ease(Math.min(1, (t - s.a) / (s.b - s.a)));
      const dx = s.x1 - s.x0, dy = s.y1 - s.y0, bow = (s.h - .5) * .5 * Math.sin(Math.PI * u);
      const x = s.x0 + dx * u - dy * bow, y = s.y0 + dy * u + dx * bow;
      const alpha = p.covering ? smooth(0, .12, u) * (1 - smooth(s.b, s.b + hold, t)) : smooth(0, .08, u) * (1 - smooth(.86, 1, u));
      if (alpha < .02) continue;
      const size = (p.covering ? s.size * (1 - .7 * u) : s.size * (.3 + .7 * u)) * (.7 + .6 * s.h);
      batches[Math.min(2, Math.floor(s.h * 3))].push(x, y, size, s.h * 6.283 + u * (2 + 3 * s.h), alpha);
    }
    batches.forEach((list, b) => {
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        let a = 0, m = 0;
        for (let i = 0; i < list.length; i += 5) {
          const x = list[i], y = list[i + 1], z = list[i + 2] * (pass ? 1 : 2.2), ang = list[i + 3];
          for (let k = 0; k < 3; k++) {
            const q = ang + k * 2.094 + (k === 1 ? .35 : 0);
            k ? ctx.lineTo(x + Math.cos(q) * z, y + Math.sin(q) * z) : ctx.moveTo(x + Math.cos(q) * z, y + Math.sin(q) * z);
          }
          ctx.closePath(); a += list[i + 4]; m++;
        }
        if (!m) continue;
        ctx.fillStyle = `rgba(${amber[b]},${((pass ? .95 : .16) * a / m).toFixed(3)})`;
        ctx.fill();
      }
    });
    ctx.globalCompositeOperation = 'source-over';
    // R18: the name composes letter by letter as its fragments land (left to right); arriving, it breaks the same way
    tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    tctx.clearRect(0, 0, W, H);
    const [a0, a1] = p.covering ? weave.form : weave.fade, each = p.covering ? weave.letter[0] : weave.letter[1];
    sprites.forEach((q, i) => {
      const at = a0 + (a1 - a0 - each) * (count > 1 ? i / (count - 1) : 0);
      const k = smooth(at, at + each, t), shown = p.covering ? k : 1 - k;
      if (shown < .004) return;
      const scale = p.covering ? .92 + .08 * shown : 1 + .08 * (1 - shown), rise = (1 - shown) * q.h * (p.covering ? .06 : -.04);
      const cx = q.x + q.w / 2, cy = q.y + q.h / 2;
      tctx.globalAlpha = shown;
      tctx.drawImage(q.sprite, cx - q.w * scale / 2, cy - q.h * scale / 2 + rise, q.w * scale, q.h * scale);
    });
    tctx.globalAlpha = 1;
  }

  let loop = 0;
  return {
    /** `scene`: { origin: [x, y], rects: [[x, y, w, h]] } in viewport fractions, of the page coming apart or composing. */
    play(covering, fraction, duration, scene) {
      cancelAnimationFrame(loop);
      const p = plan(covering, scene || {}), start = performance.now();
      let t = Math.max(0, Math.min(1, fraction)), last = start, finish;
      const done = new Promise(resolve => { finish = resolve; });
      draw(p, t);   // before the first paint of an incoming document: it starts on exactly this frame
      // R17: a slow frame (the first one of a page change often is) does not skip the movement: it advances at most
      // 50 ms of it, and the movement never falls more than a quarter behind the clock
      const frame = now => {
        const step = Math.min(50, Math.max(0, now - last)); last = now;
        t = Math.min(1, Math.max(t + step / duration, fraction + (now - start) / duration - .25));
        draw(p, t);
        if (t < 1) loop = requestAnimationFrame(frame); else finish();
      };
      if (t < 1) loop = requestAnimationFrame(frame); else finish();
      return { done, fraction: () => t, cancel() { cancelAnimationFrame(loop); } };
    },
    remove() { cancelAnimationFrame(loop); layer.remove(); },
    /** R18: the name is composed in its own face (the incoming document may be loading Inter) */
    ready
  };
}
