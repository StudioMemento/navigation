// The START's VFX tests (memento-start V23, src/vfx/__tests__), ported to the navigation's modules, plus its framing.
import test from 'node:test';
import assert from 'node:assert/strict';
import { BorderLight, outline } from '../src/vfx/border.mjs';
import { ChainField } from '../src/vfx/chain.mjs';
import { VFX, NAV, gradientRange, titleRamp } from '../src/vfx/config.mjs';
import { buildNetwork, mulberry } from '../src/vfx/geometry.mjs';
import { PointerField } from '../src/vfx/input.mjs';
import { Particles } from '../src/vfx/particles.mjs';
import { encodeDistance, signedDistance } from '../src/vfx/sdf.mjs';
import { bandEnable, cellAbsence, fragmentation, h21, loadingAbsence, loadingDelay, vnoise } from '../src/vfx/structure.mjs';
import { layoutTitle } from '../src/vfx/title.mjs';
import { layout } from '../src/model.mjs';

const DT = 1 / 60;
const run = (c, seconds) => { for (let t = 0; t < seconds; t += DT) c.step(DT); };
const H = 900, BAND = H * NAV.band;

test('the reading band stays composed; the edge bands grow continuously toward the edges', () => {
  for (let y = BAND; y <= H - BAND; y += 15) assert.equal(fragmentation(y, H, BAND), 0);
  let previous = 0;
  for (let y = BAND; y >= 0; y -= 1) {
    const f = fragmentation(y, H, BAND);
    assert.ok(f >= previous && f - previous < 0.02);
    previous = f;
  }
  assert.equal(fragmentation(0, H, BAND), 1);
  assert.equal(fragmentation(H, H, BAND), 1);
});

test('structure is a function of position only: reversing the carousel replays the same states', () => {
  const seeds = [0.07, 0.41, 0.83], path = [400, 180, 90, 30, 90, 180, 400];
  const states = path.map(y => seeds.map(s => cellAbsence(fragmentation(y, H, BAND), s)));
  assert.deepEqual(states[4], states[2]); assert.deepEqual(states[5], states[1]); assert.deepEqual(states[6], states[0]);
  const a = [0.05, 0.35, 0.65, 0.95].map(s => cellAbsence(fragmentation(BAND * 0.45, H, BAND), s));
  assert.ok(a[0] > a[3] && new Set(a).size > 2);              // an irregular front
});

test('reduced motion closes the bands', () => {
  assert.deepEqual(bandEnable(true), { top: 0, bottom: 0 });
  assert.equal(fragmentation(10, H, BAND, 0, 0), 0);
});

test('the active card sits in the reading band on every verified viewport', () => {
  for (const [w, h] of [[390, 844], [360, 640], [1440, 900], [844, 390], [1920, 1080], [1280, 800]]) {
    const l = layout(w, h), band = Math.max(64, h * NAV.band);
    assert.ok(l.cy - l.height / 2 >= band - 1, `${w}×${h} top`);
    assert.ok(l.cy + l.height / 2 <= h - band + 1, `${w}×${h} bottom`);
  }
});

test('loading starts from nothing, ends fully present, joins cells in order; CPU noise mirrors the shader', () => {
  for (const d of [0, 0.25, 0.5, 0.75, 1]) { assert.equal(loadingAbsence(0, d), 1); assert.equal(loadingAbsence(1, d), 0); }
  assert.ok(loadingAbsence(0.5, 0.2) < loadingAbsence(0.5, 0.8));
  assert.equal(h21(3, 7), h21(3, 7));
  for (let i = 0; i < 50; i++) { const v = vnoise(i * 0.37, i * 0.21); assert.ok(v >= 0 && v <= 1); }
  assert.ok(Math.abs(vnoise(1.5, 2.5) - vnoise(1.501, 2.5)) < 0.01);
  const d = loadingDelay(400, 300, 0.5); assert.ok(d >= 0 && d <= 1);
});

test('a chain reaction travels beyond the ignited cell and always comes to an end', () => {
  const net = buildNetwork(640, 330, 64, 30, 200, 7);
  const c = new ChainField(net, VFX.chain.card, mulberry(1));
  for (let f = 0; f < net.faces; f++) net.cond[f] = net.weight[f] ? 1 : 0;
  c.ignite(c.nearest(320, 165), 1);
  const lit = new Set();
  for (let t = 0; t < 0.8; t += DT) { c.step(DT); c.shown.forEach((v, i) => { if (v > 0.05) lit.add(i); }); }
  assert.ok(lit.size > 4);
  run(c, 3);
  assert.equal(c.active, false); assert.equal(Math.max(...c.shown), 0);
});

test('the reaction dies in non-conductive zones, rests a cell after it lights, and quench stops a cancelled gesture', () => {
  const net = buildNetwork(640, 330, 64, 30, 200, 7);
  net.cond.fill(0);
  const a = new ChainField(net, VFX.chain.card, mulberry(2));
  a.ignite(a.nearest(320, 165), 1);
  let lit = 0;
  for (let t = 0; t < 1; t += DT) { a.step(DT); lit = Math.max(lit, a.shown.filter(v => v > 0.02).length); }
  assert.ok(lit <= 1);
  net.cond.fill(1);
  const b = new ChainField(net, VFX.chain.card, mulberry(3)), cell = b.nearest(100, 100);
  b.ignite(cell, 1); b.step(DT); const first = b.raw[cell];
  run(b, 0.2); b.ignite(cell, 1); b.step(DT);
  assert.ok(b.raw[cell] < first);
  const q = new ChainField(net, VFX.chain.card, mulberry(4));
  for (let i = 0; i < 6; i++) q.igniteAt(320, 165, 60, 1);
  q.quench(); run(q, 2);
  assert.equal(q.active, false);
});

test('energy is written per rendered vertex, within 0..1; the range presence keeps a title active until it fades', () => {
  const net = buildNetwork(640, 330, 64, 30, 200, 7);
  const c = new ChainField(net, VFX.chain.card, mulberry(5));
  c.ignite(c.nearest(320, 165), 1); run(c, 0.2);
  const out = new Float32Array(net.faces * 6); c.write(out);
  assert.ok(Math.max(...out) > 0.3 && out.every(v => v >= 0 && v <= 1));
  const tnet = buildNetwork(400, 200, 30, 10, 120, 3), t = new ChainField(tnet, VFX.chain.title), f = tnet.faces >> 1;
  t.drive[f] = 0.8; t.driveLevel = 0.8;
  assert.equal(t.active, true);
  const tout = new Float32Array(tnet.faces * 6); t.write(tout);
  assert.ok(Math.abs(tout[f * 6] - 0.8) < 1e-6);
  t.drive.fill(0); t.driveLevel = 0; assert.equal(t.active, false);
});

test('networks are irregular and deterministic; structural cells keep the silhouette exact', () => {
  const a = buildNetwork(640, 330, 64, 30, 200, 9), b = buildNetwork(640, 330, 64, 30, 200, 9);
  assert.deepEqual(Array.from(a.position), Array.from(b.position));
  const areas = [];
  for (let f = 0; f < a.faces; f++) { const p = a.position, o = f * 6; areas.push(Math.abs((p[o + 2] - p[o]) * (p[o + 5] - p[o + 1]) - (p[o + 4] - p[o]) * (p[o + 3] - p[o + 1])) / 2); }
  areas.sort((x, y) => x - y);
  assert.ok(areas[Math.floor(areas.length * 0.9)] / areas[Math.floor(areas.length * 0.1)] > 3);
  const m = buildNetwork(500, 300, 21, 0, 200, 3);
  for (let i = 0; i < m.position.length; i += 2) assert.ok(m.position[i] >= 0 && m.position[i] <= 500 && m.position[i + 1] >= 0 && m.position[i + 1] <= 300);
});

test('card cells share one scale across a navigation-sized card, with mixed sizes', () => {
  const C = VFX.chain.card, W = 1080, Hc = 540;
  const m = buildNetwork(W, Hc, C.spacing, C.margin, C.zone, 5, { spacing: C.edgeSpacing, reach: C.edgeReach });
  const edge = [], mid = [], all = [];
  for (let f = 0; f < m.faces; f++) {
    const o = f * 6, x = m.cx[f], y = m.cy[f];
    if (x < 0 || y < 0 || x > W || y > Hc) continue;
    const side = (p, q) => Math.hypot(m.position[o + p] - m.position[o + q], m.position[o + p + 1] - m.position[o + q + 1]);
    const size = (side(0, 2) + side(2, 4) + side(4, 0)) / 3, d = Math.min(x, y, W - x, Hc - y);
    all.push(size); if (d < 30) edge.push(size); else if (d > 120) mid.push(size);
  }
  const qn = (a, t) => [...a].sort((x, y) => x - y)[Math.floor(t * (a.length - 1))];
  const r = qn(mid, 0.5) / qn(edge, 0.5);
  assert.ok(r > 0.75 && r < 1.35);
  const spread = qn(all, 0.9) / qn(all, 0.1);
  assert.ok(spread > 1.6 && spread < 3.2);
  // a large card has a proportionally sparser hover topology (the amber budget)
  assert.ok(Math.min(1, Math.max(0.3, C.topoArea / (W * Hc))) < 0.5);
});

test('outline light maps points to the nearest stretch and decays to nothing', () => {
  assert.ok(Math.abs(outline(320, -10, 640, 330)[0] - 320 / 1940) < 1e-3);
  assert.ok(Math.abs(outline(650, 100, 640, 330)[1] - 10) < 1e-5);
  const b = new BorderLight(); b.add(0.25, 1); b.settle();
  assert.ok(b.level > 0.9);
  for (let t = 0; t < 3; t += DT) { b.decay(DT); b.settle(); }
  assert.equal(b.level, 0);
});

test('pointer speed and stillness; particles never exceed the pool and all die', () => {
  const f = new PointerField();
  f.move(0, 0, false); f.update(DT); f.move(10, 0, false); f.update(DT);
  assert.ok(f.speed > 50);
  for (let i = 0; i < 60; i++) f.update(DT);
  assert.ok(f.still > 0.9); f.cancel(); assert.equal(f.present, false);
  const p = new Particles();
  for (let i = 0; i < VFX.particles.pool + 40; i++) p.spawn(i % 2 ? 'shard' : 'spark', 0, 0, 50, 0);
  assert.equal(p.count, VFX.particles.pool);
  for (let t = 0; t < VFX.particles.shard.life[1] + 0.05; t += DT) p.step(DT);
  assert.equal(p.count, 0);
});

test('the distance field follows the shape: negative inside, zero on the outline, positive outside', () => {
  const w = 64, h = 64, a = new Uint8Array(w * h);
  for (let y = 16; y < 48; y++) for (let x = 16; x < 48; x++) a[y * w + x] = 255;
  const d = signedDistance(a, w, h);
  assert.ok(d[32 * w + 32] < -14 && d[32 * w + 4] > 10 && Math.abs(d[32 * w + 16]) <= 1);
  const e = encodeDistance(d, 1, 12);
  assert.ok(e[32 * w + 16] > 110 && e[32 * w + 16] < 145); assert.equal(e[32 * w + 32], 0); assert.equal(e[0], 255);
});

test('titles are laid out like the DOM <h2>: one line, justified across the padding, baseline above the bottom padding', () => {
  const ctx = { font: '', measureText: ch => ({ width: ch === 'H' ? 70 : 60 + (ch.charCodeAt(0) % 7), fontBoundingBoxAscent: 96.875, fontBoundingBoxDescent: 24.21875 }) };
  const card = { width: 1080, height: 540, padding: 64.8 };
  const t = layoutTitle('SERVICES', 100, card, ctx);
  assert.equal(t.glyphs.length, 8);
  assert.ok(Math.abs(t.glyphs[0].x - card.padding) < 1e-9);
  const last = t.glyphs.at(-1);
  assert.ok(Math.abs(last.x + last.w - (card.width - card.padding)) < 1e-6);
  assert.ok(t.box.y + t.box.h <= card.height - card.padding + 1e-9);
  assert.ok(t.baseline > t.box.y && t.baseline < t.box.y + t.box.h);
});

test('palette: the title gradient keeps its luminance at rest (desaturated), the amber reference is the DNA one', () => {
  assert.equal(VFX.color.amber.base, '#FF7950');
  const [base, top] = gradientRange();
  assert.ok(top > base);
  const ramp = titleRamp();
  assert.equal(ramp.length, 24);
  for (let i = 0; i < 6; i++) assert.ok(ramp[i * 4 + 3] > 0 && ramp[i * 4 + 3] <= 1);
  for (const [, c] of VFX.color.titleGradient) assert.match(c, /^#([0-9a-f]{2})\1\1$/);
});
