// R23: the warm colours of the navbar's icons ("Incandescenza", no metal), a page change that only touches the content
// column (background, wordmark and dock never leave), a page change that runs on the compositor (smooth while the next
// page boots), and devices without hover that hold the hover's warmth at rest.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VFX } from '../src/vfx/config.mjs';
import { weave, createMaterial } from '../scripts/scene-material.mjs';
import { sceneHead } from '../scripts/scene-head.mjs';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const hsl = hex => {
  const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.replace('#', '').slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s, l };
};

test('palette "Incandescenza": the warm colours of the navbar\'s icons, never their metal', () => {
  assert.deepEqual({ ...VFX.color.amber }, { base: '#FF7D00', light: '#FFA23D', deep: '#7A340A', mid: '#FF7D00', hot: '#FFA23D', core: '#FFC890' });
  const css = source('public/memento-ui/site.css');
  for (const token of ['--memento-accent: #ff7d00;', '--memento-accent-light: #ffa23d;', '--memento-accent-core: #ffc890;', '--memento-accent-ember: #c2500a;', '--memento-accent-deep: #7a340a;'])
    assert.ok(css.includes(token), token);
  // no silver, no steel, no graphite anywhere in the palette or in the page change
  assert.doesNotMatch(css, /--memento-metal/);
  assert.equal(weave.metal, undefined);
  for (const c of [...weave.glow, ...weave.face.map(([, c]) => c), ...VFX.color.titleAmber.map(([, c]) => c), ...VFX.color.titleHot]) {
    const { h, s } = hsl(c);
    assert.ok(h >= 19 && h <= 36 && s > .5, `${c}: warm (hue ${h.toFixed(1)}, saturation ${s.toFixed(2)})`);
  }
  // the top of the title ramp is a warm white (it was a near-neutral one), at the same grey as before
  assert.equal(VFX.color.titleAmber[0][1], '#ffefdc');
  assert.equal(VFX.color.titleGradient[0][1], '#f2f2f2');
  assert.match(source('docs/dna/tokens.json'), /"ambra-riferimento", "value": "#FF7D00"/);
});

test('page change: only the column between the margins; background, wordmark and dock stay', () => {
  const material = source('scripts/scene-material.mjs');
  assert.match(material, /layer\.style\.cssText = `left:\$\{P\}px;width:\$\{CW\}px;height:\$\{H\}px`;/);
  assert.equal(createMaterial.length, 3);
  // of the outgoing frame only the column is kept; the new page shows itself once the cells open
  assert.ok(sceneHead.includes(':root[data-mm-feed="old"]::view-transition-old(root) {clip-path:inset(0 var(--mm-side,0px))}'));
  assert.ok(sceneHead.includes(':root[data-mm-feed="old"]::view-transition-new(root) {opacity:0}'));
  assert.match(sceneHead, /root\.style\.setProperty\('--mm-side', Math\.round\(paddingOf\(innerWidth, innerHeight\) \* innerWidth\) \+ 'px'\);/);
  assert.match(sceneHead, /vt\?\.skipTransition\(\);\n\s+await opening;/);
  // what of the incoming page reaches past the column composes with the cells next to it
  assert.match(sceneHead, /function assemble\(\)/);
  // the background rises over the material and the navigation over everything: neither takes part
  assert.match(sceneHead, /:root\[data-mm-phase\] \.mm-letters \{z-index:999\}/);
  assert.match(sceneHead, /\.mm-weave \{position:fixed;top:0;left:0;pointer-events:none;overflow:hidden;z-index:998;view-transition-name:mm-material\}/);
});

test('page change on the compositor: transform and opacity only, no frame loop, no mask, no filter', () => {
  const material = source('scripts/scene-material.mjs');
  assert.doesNotMatch(material, /requestAnimationFrame/);
  assert.doesNotMatch(material, /clip-path|clipPath/);
  // keyframes never animate a filter (a surface per element) nor a colour (main thread)
  for (const [, frames] of material.matchAll(/run\([^,]+, \[([\s\S]*?)\], /g)) assert.doesNotMatch(frames, /filter|background|color/);
  // every triangle is a box drawn by its borders, placed by a matrix
  assert.match(material, /border-top:\$\{BASE\}px solid \$\{colour\};border-right:\$\{BASE\}px solid transparent/);
  assert.match(sceneHead, /\.mm-tri \{position:absolute;left:0;top:0;width:0;height:0;box-sizing:content-box;transform-origin:0 0\}/);
  // all the elements of a movement start together, on one clock
  assert.match(material, /for \(const anim of m\.list\) anim\.startTime = start;/);
  // the pieces and the flash of the name at no more than twice the CSS pixel; the composed letter at full resolution
  assert.match(material, /const ndpr = Math\.min\(dpr, 3\), pdpr = Math\.min\(dpr, 2\);/);
  assert.ok(weave.cell[2] <= 240 && weave.cell[3] <= 120 && weave.shards[0] <= 64 && weave.shards[1] <= 36);
});

test('page change: shorter, prepared ahead, and the swap holds a composed name', () => {
  const head = source('scripts/scene-head.mjs');
  assert.match(head, /const exit = 520, unfold = 660, away = exit \* weave\.depart \/ \.98;/);
  assert.match(head, /const hold = 140, patience = 380;/);
  // the browser is asked for the next page once the name is whole
  assert.match(head, /mark\('gathered'\);\n\s+if \(deferred\) go\(\);/);
  assert.doesNotMatch(head, /s\.depart = setTimeout/);
  // the name is composed on hover and on a touch on the dock; the opening is built while the name holds
  assert.match(head, /\(window\.requestIdleCallback \|\| setTimeout\)\(\(\) => \{if \(hovered === a\.href\) prepare\(a\.href\);\}, \{timeout:240\}\);/);
  assert.match(head, /if \(e\.pointerType === 'mouse' \|\| a\.getRootNode\(\)\?\.host\?\.localName === 'memento-nav'\) prepare\(a\.href\);/);
  assert.match(head, /s\.layer\.prime\(false, unfold, s\.nextScene \|\| sceneOf\(\[\.5, \.5\]\)\)/);
  // the colours of the photographs are read while the page is idle, never on the click
  assert.match(head, /window\.addEventListener\('load', \(\) => setTimeout\(readColours, 900\), \{once:true\}\);/);
  assert.match(head, /const idle = window\.requestIdleCallback/);
  assert.doesNotMatch(head.slice(head.indexOf('function sceneOf'), head.indexOf('function firstElement')), /getImageData|drawImage/);
});

test('devices without hover hold the hover\'s warmth at rest', () => {
  const css = source('public/memento-ui/site.css');
  assert.match(css, /@media \(hover:none\),\(pointer:coarse\) \{\n\s+:root:root \{--mm-rest-gray:0;--title-gradient:linear-gradient\(0deg,#e8661a 0%,#ff840c 9%,#ffb35e 20%,#ffd9ad 32%,#ffefdc 44%,#ffefdc 100%\)\}/);
  assert.match(source('src/surfaces/raster.ts'), /matchMedia\('\(hover: none\), \(pointer: coarse\)'\)\.matches \? VFX\.color\.titleAmber : VFX\.color\.titleGradient/);
  assert.match(source('src/vfx/title.mjs'), /warm \? VFX\.color\.titleAmber : VFX\.color\.titleGradient/);
  // the type on the cards takes most of its hover warmth at rest
  assert.match(source('src/surfaces/shaders.ts'), /max\(uHover,uNear\*uInkWarm\.z\),uPhotoColor\*\.7\)\*uInkWarm\.x;/);
  // photographs at rest go through the same variable everywhere
  for (const file of ['src/style.css', 'apps/projects/site/styles.css', 'apps/start/src/styles/start.css', 'public/memento-ui/ready-to-start.css'])
    assert.match(source(file), /grayscale\(var\(--mm-rest-gray, ?\.5\)\)/, file);
  // the background is lighter to keep on a phone
  assert.match(source('public/memento-ui/letters.mjs'), /W \* H > 4e6 \|\| coarse\.matches \? 1\.5 : 2/);
});
