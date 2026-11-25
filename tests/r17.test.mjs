// R17: the page change comes apart from the real interface (slower, before the browser navigates), the next page is
// revealed already drawn by its effects (no DOM frame, then a jump), the hover lattice is only the live chain reaction,
// and Ready to start is back on Portfolio and LevelUp.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { weave } from '../scripts/scene-material.mjs';
import { sceneHead as sceneTags, sceneCode, guardCode } from '../scripts/scene-head.mjs';
// R24: the page change is a script of its own (scene-head sceneFiles): its code is checked as it was inline
const sceneHead = sceneTags + guardCode + sceneCode;
import { VFX } from '../src/vfx/config.mjs';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('the exit is slower and leaves before the browser navigates (the next document is prefetched)', () => {
  const head = source('scripts/scene-head.mjs');
  // R23: shorter again (exit 520, unfold 660: r23.test.mjs), within the same bounds
  const [, exit, unfold] = head.match(/const exit = (\d+), unfold = (\d+)/).map(Number);
  assert.ok(exit >= 400 && unfold >= 500 && exit + unfold <= 2400, `${exit} + ${unfold}`);
  const [, patience] = head.match(/patience = (\d+);/).map(Number);
  assert.ok(patience >= 200 && patience <= 2500);
  // a link click is held while the page comes apart; the browser navigates to the prefetched document afterwards
  assert.match(sceneHead, /event\.preventDefault\(\);\s*depart\(a\.href, false\)/);
  assert.match(sceneHead, /speculationrules/);
  assert.match(sceneHead, /location\.assign\(s\.destination\)/);
  // a navigation started by script waits too; history goes at once and the next document finishes the movement
  assert.match(sceneHead, /e\.cancelable && \(e\.navigationType === 'push' \|\| e\.navigationType === 'replace'\)/);
  // no closing lattice over the page any more: the column turns to the ground while it empties, behind the name (R23)
  assert.ok(weave.veil[0] >= weave.form[0] && weave.veil[1] < 1);
});

test('the engines take the same interface apart: same order as the DOM pieces and the lattice (guards)', () => {
  const [l0, l1, lj] = weave.leave;
  for (const file of ['src/surfaces/shaders.ts', 'src/shaders.js']) {
    const glsl = source(file);
    assert.match(glsl, /uniform vec4 uExit;/);
    const m = glsl.match(/float s=([\d.]+)\+([\d.]+)\*d\+([\d.]+)\*\(seed-\.5\);\s*return smoothstep\(s,s\+([\d.]+),uExit\.x\);/);
    assert.ok(m, file);
    assert.deepEqual(m.slice(1, 4).map(Number), [l0, l1, lj], file);
    // the DOM pieces dissolve over the same share of the movement
    assert.match(source('scripts/scene-head.mjs'), new RegExp(`duration:${m[4]} \\* away`));
    // every content and overlay vertex shader takes part
    assert.ok((glsl.match(/gl_Position=exitTo\(/g) || []).length >= 2, file);
  }
});

test('hover: no static lattice under the pointer, only the live chain reaction (guards)', () => {
  for (const file of ['src/surfaces/shaders.ts', 'src/shaders.js']) {
    const glsl = source(file);
    assert.match(glsl, /#define HOVER_LATTICE 0\./, file);
    assert.match(glsl, /uTopo\*HOVER_LATTICE/, file);
  }
  const { every, gap } = VFX.pointer.wave;
  assert.ok(every <= 160 && gap <= .35);
});

test('arriving under the page change, the effects wait for the cells to open, then take over in place (R24)', async () => {
  const flags = new Set(['data-mm-arrive', 'data-mm-arrived']);
  globalThis.document = Object.assign(new EventTarget(), { documentElement: { hasAttribute: n => flags.has(n) } });
  globalThis.window = globalThis;
  globalThis.requestAnimationFrame = cb => setTimeout(() => cb(performance.now()), 0);
  globalThis.requestIdleCallback = cb => setTimeout(cb, 0);
  let finish;
  window.mementoSceneFinished = new Promise(r => { finish = r; });   // the page change is still on
  const { afterFirstPaint, whenIdle, announceEffects, arriving, arrived } = await import('../src/paint.mjs');
  assert.equal(arriving(), true);
  assert.equal(arrived(), true);
  const late = Symbol('late'), within = (p, ms) => Promise.race([p.then(() => 'done'), new Promise(r => setTimeout(() => r(late), ms))]);
  // R24: the page's boot, the engine's and the opening no longer share the same moment
  const painted = afterFirstPaint(), idle = whenIdle();
  assert.equal(await within(painted, 120), late);
  finish();
  assert.equal(await within(painted, 200), 'done');
  assert.equal(await within(idle, 200), 'done');
  // the first published frame settles every renderer announced so far; a failure settles its own
  const a = announceEffects(), b = announceEffects();
  assert.deepEqual(window.mementoEffects.map(e => e.settled), [false, false]);
  document.dispatchEvent(new Event('memento:effects-live'));
  assert.deepEqual(window.mementoEffects.map(e => e.settled), [true, true]);
  const failed = announceEffects();
  failed();
  assert.equal(window.mementoEffects.at(-1).settled, true);
  a(); b();
  // opened directly, the page waits for the transition as before (nothing pending here: it resolves)
  flags.delete('data-mm-arrive');
  window.mementoSceneFinished = undefined;
  assert.equal(await within(afterFirstPaint(), 200), 'done');
  delete globalThis.document; delete globalThis.requestIdleCallback;
});

test('engines are not paused by the page change, hold their loading sequence under the seal, and say when live', () => {
  const engine = source('src/surfaces/engine.ts'), renderer = source('src/renderer.js'), main = source('src/main.js');
  assert.doesNotMatch(engine, /private covered\(\) \{\s*return root\(\)\.hasAttribute\('data-mm-phase'\)/);
  assert.doesNotMatch(main, /hasAttribute\('data-mm-phase'\)\)\{lastTime=0;return;\}/);
  for (const code of [engine, renderer]) {
    assert.match(code, /phase === 'gather' \|\| phase === 'hold'/);
    assert.match(code, /dispatchEvent\(new Event\('memento:effects-live'\)\)/);
    assert.match(code, /exitT \+ dt \* 1000 \/ this\.exitMs/);   // a slow frame does not skip the movement
  }
  assert.match(engine, /'memento:scene-exit'/); assert.match(main, /'memento:scene-exit'/);
  assert.match(engine, /'memento:scene-reset'/); assert.match(main, /'memento:scene-reset'/);
  assert.ok(VFX.loading.arrive > .8 && VFX.loading.arrive <= VFX.loading.duration);
  // the document says it is arriving before its first paint, and only pages with effects make the seal wait
  assert.match(sceneHead, /root\.setAttribute\('data-mm-arrive', ''\)/);
  assert.match(sceneHead, /if \(!root\.hasAttribute\('data-mm-effects'\)/);
  assert.match(source('vite.config.js'), /data-mm-effects/);
});

test('Ready to start: one stylesheet and the photograph travel with the hub', () => {
  const css = source('public/memento-ui/ready-to-start.css');
  for (const rule of ['.mm-ready {', '.mm-ready-card {', '.mm-ready-sparkle {', '@media (max-width: 767px)', '@media (forced-colors: active)']) assert.ok(css.includes(rule), rule);
  assert.match(css, /--cut: var\(--corner-cut\)/);   // the engine reads the cut corners of the card
  assert.ok(readFileSync(new URL('../public/memento-ui/ready-to-start/sparkle.webp', import.meta.url)).length > 10000);
});
