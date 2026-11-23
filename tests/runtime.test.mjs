// R15: the START's effects on the optimized navigation, without background. Pure parts of the runtime policy, plus a few
// source guards for the decisions that live inside WebGL classes (verified in the browser, see docs/R15_NOTES.md).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VFX, NAV, pixelRatio } from '../src/vfx/config.mjs';
import { vfxPolicy, startingQuality } from '../src/vfx/policy.mjs';
import { PointerField } from '../src/vfx/input.mjs';

const DT = 1 / 60;
const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('policy: effects on by default; ?vfx=off, Save-Data and very low memory keep the DOM page; a pin wins', () => {
  assert.deepEqual(vfxPolicy({ search: '', nav: {} }), { enabled: true, pinned: false });
  for (const off of ['?vfx=off', '?vfx=0', '?vfx=false']) assert.equal(vfxPolicy({ search: off, nav: {} }).enabled, false);
  assert.equal(vfxPolicy({ search: '', nav: { connection: { saveData: true } } }).enabled, false);
  assert.equal(vfxPolicy({ search: '', nav: { deviceMemory: 1 } }).enabled, false);
  assert.deepEqual(vfxPolicy({ search: '', nav: { deviceMemory: 2 } }), { enabled: true, quality: 'low', pinned: false });
  assert.deepEqual(vfxPolicy({ search: '', nav: { deviceMemory: 8 } }), { enabled: true, pinned: false });
  // a pinned profile is a deliberate preview: also with Save-Data
  assert.deepEqual(vfxPolicy({ search: '?vfx=high', nav: { connection: { saveData: true } } }), { enabled: true, quality: 'high', pinned: true });
});

test('starting profile: the policy is a floor under the device guess, a pin replaces it', () => {
  assert.equal(startingQuality('high', undefined), 'high');
  assert.equal(startingQuality('high', { quality: 'low', pinned: false }), 'low');
  assert.equal(startingQuality('low', { quality: 'medium', pinned: false }), 'low');
  assert.equal(startingQuality('medium', { quality: 'high', pinned: true }), 'high');
});

test('pixel budget: a 14" laptop keeps DPR 2, large screens stay under the budget, never below 1', () => {
  const { high, medium, low } = VFX.quality;
  const frame = (w, h) => [w, h + 256];
  assert.equal(pixelRatio(2, ...frame(1512, 982), high), 2);                    // MacBook Pro 14"
  const studio = pixelRatio(2, ...frame(2560, 1440), high);                    // 5K display
  assert.ok(studio < 2 && studio >= 1);
  assert.ok(2560 * (1440 + 256) * studio * studio <= high.pixels * 1.001);
  assert.equal(pixelRatio(3, ...frame(390, 844), medium), 1.5);                // phone: the profile's ceiling
  assert.equal(pixelRatio(1, ...frame(3840, 2160), low), 1);                    // a 4K television at DPR 1
  assert.equal(pixelRatio(2, 1440, 900, high, NAV.dprCap.large), 1.65);        // the carousel keeps its R11 cap
  assert.ok(pixelRatio(0.9, 1440, 1156, high) <= 0.9);                         // zoomed out: never above the device
});

test('rest: one second without changes, a held hover at half rate', () => {
  assert.equal(VFX.runtime.idle, 1);
  assert.equal(NAV.idle, VFX.runtime.idle);
  assert.ok(VFX.runtime.calmFps < VFX.runtime.fps && VFX.runtime.calmFps >= 30);
});

test('after a sleep the pointer travel is not read as a flick', () => {
  const f = new PointerField();
  f.move(100, 100, false); f.update(DT); f.update(DT);
  f.move(700, 400, false);          // the loop was asleep while the pointer crossed the page
  f.settle(); f.update(DT);
  assert.equal(f.speed, 0);
  f.move(710, 400, false); f.update(DT);
  assert.ok(f.speed > 50 && f.speed < 1000);
});

test('the native pages and the Home use the effects again (guards)', () => {
  const index = source('src/surfaces/index.ts');
  assert.doesNotMatch(index, /usesNativeContent/);
  assert.match(index, /vfxPolicy\(\)/);
  const engine = source('src/surfaces/engine.ts');
  // no rendering at rest: neither every other frame nor because the pointer is merely present
  assert.doesNotMatch(engine, /this\.frame % 2 === 0\)\) this\.render/);
  assert.doesNotMatch(engine, /this\.renderDirty \|\| present;/);
  assert.match(engine, /this\.restFor >= R\.idle/);
  const main = source('src/main.js');
  assert.match(main, /if\(policy\.enabled\)bootEngine\(\);/);
  assert.doesNotMatch(main, /if \(!container \|\| labMode\)/);
  // no background comes back
  assert.doesNotMatch(main + index, /startBackground|GhostFibers|mountBackground\(\)\s*\{[^}]*start/);
});
