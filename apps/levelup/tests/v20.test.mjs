import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

test('V20: the START V27 engine and the Ghost Fibers background are built, with no GSAP and no probe context', async () => {
  const files = await readdir('dist/vfx');
  const entry = await readFile('dist/vfx/memento-vfx.js', 'utf8');
  const engine = await readFile('dist/vfx/' + files.find(f => f.startsWith('engine-')), 'utf8');
  const background = await readFile('dist/vfx/' + files.find(f => f.startsWith('mount-')), 'utf8');
  assert.match(entry, /export\{[^}]*mountBackground/);
  assert.match(entry, /vfx-layer/);
  assert.doesNotMatch(entry, /getContext\(`webgl2`\)/, 'no throwaway WebGL context to detect support');
  assert.doesNotMatch(engine, /gsap|ScrollTrigger/i);
  // overscanned canvas on native scroll, photographs in colour on touch devices, touch chain in titles, no grain
  assert.match(engine, /translate3d\(0, \$\{[^}]+\}px, 0\)/);
  assert.match(engine, /uniform vec2 uCanvas;/);
  assert.match(engine, /mix\(vec3\(ph\.x\),phRGB,uPhotoColor\*uPhotoSat\)/);
  assert.match(engine, /uniform float uTouch;/);
  assert.doesNotMatch(engine, /float grain=/);
  // Ghost Fibers: five layers, no grain, 30 drawings per second
  assert.match(background, /layers:5/);
  assert.match(background, /grain:0/);
  assert.match(background, /1e3\/30/);
});

test('V20: optional Framer fix for /levelup, served with CORS, inert anywhere else', async () => {
  const mod = await import('../public/navigation/framer-levelup.mjs');
  assert.equal(typeof mod.bindLevelupEmbed, 'function');
  assert.equal(typeof mod.installLevelupEmbed, 'function');
  const text = await readFile('public/navigation/framer-levelup.mjs', 'utf8');
  assert.match(text, /\/\^\\\/levelup\\\/\?\$\/\.test\(location\.pathname\)\) installLevelupEmbed\(\);/);
  assert.match(text, /'https:\/\/mementolevelup\.vercel\.app'/);
  const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
  const cors = vercel.headers.find(h => h.source === '/navigation/framer-levelup.mjs');
  assert.deepEqual(cors.headers, [{ key: 'Access-Control-Allow-Origin', value: '*' }]);
  const snippet = await readFile('FRAMER_LEVELUP_FIX.html', 'utf8');
  assert.match(snippet, /src="https:\/\/mementolevelup\.vercel\.app\/navigation\/framer-levelup\.mjs\?v=20\.0\.0"/);
});
