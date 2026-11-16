// START V27 touch and background tests (src/vfx/__tests__/touch.test.ts), ported to the navigation's modules.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BorderLight, outline } from '../src/vfx/border.mjs';
import { VFX } from '../src/vfx/config.mjs';
import { buildNetwork, mulberry } from '../src/vfx/geometry.mjs';
import { TOUCH_POOL, TouchPulseField, TouchReaction, listenForTouch, planTouchSeeds, touchArrival } from '../src/vfx/touch.mjs';
import { FIBER_LAYERS, layerCount } from '../src/background/fiber-layers.mjs';
import { NAV_BACKGROUND, START_BACKGROUND } from '../src/background/preset.mjs';

const network = () => buildNetwork(340, 220, 22, 20, 170, 19);
/** A flat surface at (x, y) on screen: the 2D case of the START, where screen = rect + cell px. */
const flat = (net, x, y) => {
  const sx = new Float32Array(net.faces), sy = new Float32Array(net.faces);
  for (let i = 0; i < net.faces; i++) { sx[i] = x + net.cx[i]; sy[i] = y + net.cy[i]; }
  return w => ({ lx: w.x - x, ly: w.y - y, w: 340, h: 220, sx, sy });
};
const yOf = (net, y) => cell => y + net.cy[cell];

test('a contact plans connected paths with many visible cells while leaving most of the card dark', () => {
  const field = new TouchPulseField(), net = network();
  const first = field.start(40, 40, 390, 844, 0);
  const seeds = planTouchSeeds(net, flat(net, 25, 380)(first), first);
  assert.ok(seeds.length > 20 && seeds.length <= 96);
  assert.ok(seeds.length / net.faces < 0.25);
  assert.ok(new Set(seeds.map(s => Math.round(s.at / 30))).size > 1);
  const second = field.start(40, 40, 390, 844, 30);
  assert.notDeepEqual(planTouchSeeds(net, flat(net, 25, 380)(second), second).map(s => s.cell), seeds.map(s => s.cell));
  assert.equal(planTouchSeeds(net, flat(net, 25, 1000)(first), first).length, 0); // off screen: nothing
});

test('distant points are reached in time; equal distances arrive at different times', () => {
  const field = new TouchPulseField(), w = field.start(195, 422, 390, 844, 0);
  assert.ok(touchArrival(w, 195, 800) < 900);
  assert.notEqual(touchArrival(w, 195, 44), touchArrival(w, 195, 800));
  const net = network(); net.weight.fill(0); net.weight[20] = 1;
  assert.deepEqual(planTouchSeeds(net, flat(net, 20, 400)(w), w).map(s => s.cell), [20]);
});

test('the reaction branches with short decay, feeds the edge glow, and ends', () => {
  const field = new TouchPulseField(), net = network(), reaction = new TouchReaction(net, mulberry(1));
  const lit = new Set(), border = new BorderLight();
  const edges = Array.from({ length: net.faces }, (_, cell) => { const [s, d] = outline(net.cx[cell], net.cy[cell], 340, 220); return { cell, s, w: Math.max(0, 1 - d / 46) }; });
  let maxSimultaneous = 0, peak = 0, borderPeak = 0;
  field.start(20, 20, 390, 844, 0);
  for (let ms = 0; ms < 2700; ms += 1000 / 60) {
    field.beginFrame(ms); reaction.step(field, flat(net, 25, 400), yOf(net, 400), ms, 1 / 60);
    peak = Math.max(peak, reaction.level);
    border.decay(1 / 60); reaction.feedBorder(border, edges); border.settle(); borderPeak = Math.max(borderPeak, border.level);
    reaction.chain.shown.forEach((e, i) => { if (e > 0.025) lit.add(i); });
    maxSimultaneous = Math.max(maxSimultaneous, reaction.chain.shown.filter(e => e > 0.025).length);
  }
  assert.ok(lit.size > 20 && peak > 0.55 && borderPeak > 0.5);
  assert.ok(maxSimultaneous / net.faces < 0.3);
  assert.equal(reaction.active, false); assert.ok(reaction.level < 0.003);
});

test('surfaces not on screen when a contact arrives never replay it later', () => {
  const field = new TouchPulseField(), net = network(), reaction = new TouchReaction(net, mulberry(3));
  field.start(20, 20, 390, 844, 0);
  field.beginFrame(0); field.beginFrame(400);
  reaction.step(field, flat(net, 20, 400), yOf(net, 400), 400, 1 / 60);
  assert.equal(reaction.active, false);
  field.start(20, 20, 390, 844, 410);
  field.beginFrame(410); reaction.step(field, flat(net, 20, 400), yOf(net, 400), 410, 1 / 60);
  assert.equal(reaction.active, true);
  reaction.clear(); assert.equal(reaction.active, false);
});

test('a slow first frame and a dropped frame keep the reaction; near boards light before far ones', () => {
  const field = new TouchPulseField(), net = network(), reaction = new TouchReaction(net, mulberry(1));
  field.start(20, 20, 390, 844, 0);
  let lit = 0, peak = 0; reaction.chain.onIgnite = () => lit++;
  for (let ms = 240; ms < 2300; ms += ms === 640 ? 180 : 40) { field.beginFrame(ms); reaction.step(field, flat(net, 25, 400), yOf(net, 400), ms, 0.04); peak = Math.max(peak, reaction.level); }
  assert.ok(lit > 20 && peak > 0.55);
  const f2 = new TouchPulseField(), a = network(), b = network(), near = new TouchReaction(a), far = new TouchReaction(b);
  f2.start(20, 20, 390, 844, 0);
  let firstNear = Infinity, firstFar = Infinity;
  for (let ms = 0; ms < 2300; ms += 20) {
    f2.beginFrame(ms);
    near.step(f2, flat(a, 25, 100), yOf(a, 100), ms, 0.02); far.step(f2, flat(b, 25, 590), yOf(b, 590), ms, 0.02);
    if (near.level > 0.3) firstNear = Math.min(firstNear, ms); if (far.level > 0.3) firstFar = Math.min(firstFar, ms);
  }
  assert.ok(firstNear < firstFar && firstFar < 1000);
});

test('rapid touches are bounded; one passive contact event, never duplicated by release or cancel', () => {
  const field = new TouchPulseField();
  for (let i = 0; i < 100; i++) field.start(i, 100, 390, 844, i);
  assert.equal(field.waves.length, TOUCH_POOL); assert.equal(field.waves.at(-1).x, 99);
  field.update(2600); assert.equal(field.active, false);
  const target = new EventTarget(), abort = new AbortController(), f = new TouchPulseField(), calls = [];
  const add = target.addEventListener.bind(target);
  target.addEventListener = (type, fn, opts) => { calls.push(opts); return add(type, fn, opts); };
  listenForTouch(target, (x, y) => f.start(x, y, 390, 844, 0), abort.signal);
  assert.equal(calls[0].passive, true); assert.equal(calls[0].capture, true);
  const fire = (type, pointerType = 'touch') => { const e = Object.assign(new Event(type, { cancelable: true }), { pointerType, clientX: 50, clientY: 80 }); target.dispatchEvent(e); assert.equal(e.defaultPrevented, false); };
  fire('pointerdown', 'mouse'); assert.equal(f.started, 0);
  fire('pointerdown'); fire('pointercancel'); fire('pointerup'); assert.equal(f.started, 1);
  abort.abort(); fire('pointerdown'); assert.equal(f.started, 1);
});

test('the START background: five distinct layers, red/amber preset, no grain anywhere', () => {
  assert.equal(layerCount(START_BACKGROUND.layers), 5);
  assert.equal(new Set(FIBER_LAYERS.map(l => l.place.join(','))).size, 5);
  assert.equal(layerCount(100), 5); assert.equal(layerCount(-1), 1);
  assert.equal(START_BACKGROUND.grain, 0); assert.equal(VFX.post.grain, 0);
  assert.equal(START_BACKGROUND.glowColor, '#ef4444'); assert.equal(START_BACKGROUND.threads, 160);
  assert.equal(NAV_BACKGROUND.dpr, 1); assert.equal(NAV_BACKGROUND.soft, 1);
  const src = readFileSync(new URL('../src/background/ghost-fibers.mjs', import.meta.url), 'utf8');
  assert.match(src, /1e3 \/ 30|1000 \/ 30/);                                  // 30 drawings a second
  assert.match(src, /uSoft/);                                                  // the navigation's band blur
});

test('lower quality profiles keep bloom, particles and the cell scale (V24)', () => {
  for (const q of Object.values(VFX.quality)) { assert.equal(q.bloom, true); assert.equal(q.particles, 1); assert.equal(q.cellScale, 1); }
});
