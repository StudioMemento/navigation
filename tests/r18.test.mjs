// R18: card titles with the title material, gradual photograph fade, stronger hover cells, one scroll cue, the page
// name in the page change with the navigation always on screen, ground #090909.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VFX } from '../src/vfx/config.mjs';
import { names, weave } from '../scripts/scene-material.mjs';
import { sceneHead } from '../scripts/scene-head.mjs';
import { STATIONS } from '../src/kit/core.mjs';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('page change: the name of the page that opens, on the ground, under the navigation', () => {
  assert.equal(names['/'], 'HOME');
  for (const s of STATIONS) assert.equal(names[s.path], s.title);
  assert.equal(weave.ground, '#090909');
  assert.ok(weave.letter[0] < weave.form[1] - weave.form[0] && weave.letter[1] < weave.fade[1] - weave.fade[0]);
  // the material stays under the navigation (z-index 1000) and the navigation is its own transition group above it
  assert.match(sceneHead, /\.mm-weave \{[^}]*z-index:998/);   // R20: 998, the background of letters rises to 999 over it
  assert.match(sceneHead, /memento-nav \{view-transition-name:mm-nav\}/);
  assert.match(sceneHead, /::view-transition-group\(mm-nav\) \{z-index:4\}/);   // R20: over the background of letters (3)
  // no seal any more; the incoming material waits for its face before it takes over
  assert.doesNotMatch(sceneHead, /mm-seal/);
  assert.match(sceneHead, /data-mm-name/);
  // the navigation never takes part in the exit
  const head = source('scripts/scene-head.mjs');
  assert.match(head, /if \(c\.localName === 'memento-nav'\) continue;/);
  assert.doesNotMatch(head, /\.mm-wordmark, \.mm-dock/);
});

test('cells leave toward the line of the name, in both renderers', () => {
  for (const file of ['src/surfaces/shaders.ts', 'src/shaders.js']) assert.match(source(file), /to=vec2\(-\.45\*c\.x,-c\.y\)/, file);
});

test('hover cells stronger, a fixed dither in both grades (guards)', () => {
  assert.ok(VFX.pointer.wave.gain[0] > 1 && VFX.pointer.wave.every <= 150);
  for (const file of ['src/surfaces/shaders.ts', 'src/shaders.js']) {
    const glsl = source(file);
    const [, k] = glsl.match(/#define HOVER_CELLS ([\d.]+)/);
    assert.ok(Number(k) > 1 && Number(k) <= 2, file);
    assert.match(glsl, /HOVER_CELLS\*\(\.3\+\.7\*sweep\)/, file);
    // the same pattern every frame (gl_FragCoord only, no time): no grain, nothing moves
    assert.match(glsl, /\/255\.\*step\(\.5\/255\./, file);
  }
});

test('a title inside a card follows its card (guards)', () => {
  const engine = source('src/surfaces/engine.ts');
  assert.match(engine, /closest<HTMLElement>\('\[data-vfx="card"\]'\)/);
  assert.match(engine, /private followHost\(s: Surface\)/);
  assert.match(engine, /s\.opt\.kind === 'card' \? '\[data-vfx="title"\]' : ''/);
  assert.match(engine, /const inside = s === hovered \|\| \(!!s\.host && s\.host === hovered\);/);
  // the title's light fades and clips with its board
  assert.match(source('src/surfaces/shaders.ts'), /o=vec4\(col\*cov\+\(col-idle\)\*a\*k\*\(W-W0\)\+rimC\*k\+glow,cov\)\*lay;/);
});

test('one scroll cue and one ground for every page', () => {
  const css = source('public/memento-ui/site.css');
  assert.match(css, /--memento-ground: #090909/);
  assert.match(css, /html\[data-memento-native\] \.memento-scrollbar \{display:none!important\}/);
  assert.match(css, /\.mm-scrollbar \{position:fixed;z-index:997;/);   // R20: under the material (998)
  assert.match(source('public/memento-ui/site.mjs'), /mountScrollbar\(\);/);
  assert.match(source('public/memento-ui/scrollbar.mjs'), /role', 'scrollbar'/);
  assert.match(source('src/style.css'), /--ink:#090909/);
});
