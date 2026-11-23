// R16: desktop hover waves (the phones' chain reaction with a mouse), photographs in their own colours, and the page
// change that comes apart into the seal and composes the next page through the lattice.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VFX } from '../src/vfx/config.mjs';
import { buildNetwork, mulberry } from '../src/vfx/geometry.mjs';
import { TouchPulseField, TouchReaction, planTouchSeeds } from '../src/vfx/touch.mjs';
import { weave } from '../scripts/scene-material.mjs';
import { sceneHead } from '../scripts/scene-head.mjs';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const network = () => buildNetwork(340, 220, 22, 20, 170, 19);
const flat = (net, x, y) => {
  const sx = new Float32Array(net.faces), sy = new Float32Array(net.faces);
  for (let i = 0; i < net.faces; i++) { sx[i] = x + net.cx[i]; sy[i] = y + net.cy[i]; }
  return w => ({ lx: w.x - x, ly: w.y - y, w: 340, h: 220, sx, sy });
};
const yOf = (net, y) => cell => y + net.cy[cell];
const run = (field, reaction, net, ms) => { field.beginFrame(ms); reaction.step(field, flat(net, 25, 300), yOf(net, 300), ms, 1 / 60); };

test('a hover wave lights only the surface it belongs to; a touch still reaches every surface', () => {
  const field = new TouchPulseField(), card = {}, other = {};
  const mine = new TouchReaction(network(), mulberry(1)), theirs = new TouchReaction(network(), mulberry(2));
  mine.owner = card; theirs.owner = other;
  field.start(60, 340, 1440, 900, 0, card, 1);
  for (let ms = 0; ms < 400; ms += 1000 / 60) { run(field, mine, mine.net, ms); run(field, theirs, theirs.net, ms); }
  assert.equal(mine.active || mine.level > 0, true);
  assert.equal(theirs.active, false);
  field.start(60, 340, 1440, 900, 500);   // a touch: no scope
  for (let ms = 500; ms < 900; ms += 1000 / 60) run(field, theirs, theirs.net, ms);
  assert.ok(theirs.level > 0);
});

test('a travel wave is softer than an entry wave, and the cadence is bounded', () => {
  const field = new TouchPulseField(), net = network();
  const strong = field.start(60, 340, 1440, 900, 0, 'card', VFX.pointer.wave.gain[0]);
  const soft = field.start(60, 340, 1440, 900, 0, 'card', VFX.pointer.wave.gain[1]);
  const mean = seeds => seeds.reduce((a, s) => a + s.strength, 0) / seeds.length;
  assert.ok(mean(planTouchSeeds(net, flat(net, 25, 300)(soft), soft)) < mean(planTouchSeeds(net, flat(net, 25, 300)(strong), strong)));
  const { every, gap } = VFX.pointer.wave;
  assert.ok(every >= 100 && gap >= 0.25);   // at most ~3 waves a second, however fast the pointer moves
});

test('photographs: their own colours on hover, a highlight under the pointer, no amber grade (guards)', () => {
  for (const file of ['src/surfaces/shaders.ts', 'src/shaders.js']) {
    const glsl = source(file);
    assert.match(glsl, /#define PHOTO_SPOT /);
    assert.match(glsl, /vec3 graded=mix\(phRGB,1\.-\(1\.-phRGB\)\*\(1\.-phRGB\),PHOTO_SPOT\*spot\)/);
    assert.doesNotMatch(glsl, /graded=ramp\(/);
  }
});

test('page change: slightly longer, through the lattice into the seal and back (guards)', () => {
  const head = source('scripts/scene-head.mjs');
  // R17 renamed the movements (exit, unfold) and made them slower: see r17.test.mjs
  const [, g, u] = head.match(/const exit = (\d+), unfold = (\d+);/).map(Number);
  assert.ok(g > 260 && u > 260);
  assert.ok(weave.close > 0 && weave.open > 0 && weave.form[1] < 1 && weave.fade[1] < .5);
  // the material travels inline with the page, with its timing and the seal
  assert.match(sceneHead, /mm-cells/);
  assert.match(sceneHead, /"form":\[/);
  assert.doesNotMatch(sceneHead, /mm-veil/);
});
