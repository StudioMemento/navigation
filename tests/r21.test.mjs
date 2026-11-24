// R21: the scene never freezes on a lost frame, one orange (#FF7950 and its light variant), the margins forced on the
// content with the sliders still edge to edge, the background's fade across the padding line and its impulse through
// the whole viewport, the page change in the language of the cards with a crisp name.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { paddingOf } from '../public/memento-ui/padding.mjs';
import { VFX, desaturate, hexToRgb } from '../src/vfx/config.mjs';
import { weave } from '../scripts/scene-material.mjs';
import { sceneHead } from '../scripts/scene-head.mjs';
import { layout } from '../src/model.mjs';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const hue = hex => {
  const [r, g, b] = hexToRgb('#' + hex.slice(0, 6));
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  if (!d) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s, l };
};

test('freeze: a frame asked for before a freeze or the back/forward cache is asked again', () => {
  const engine = source('src/surfaces/engine.ts');
  assert.match(engine, /if \(document\.hidden \|\| performance\.now\(\) - this\.frameAt < 1000\) return;\n\s+cancelAnimationFrame\(this\.raf\); this\.raf = 0;/);
  assert.match(engine, /this\.raf = 0; this\.frameAt = performance\.now\(\);/);
  for (const event of ["addEventListener('pagehide', halt", "document.addEventListener('freeze', halt", "document.addEventListener('resume', shown", "addEventListener('focus', shown"])
    assert.ok(engine.includes(event), event);
  const home = source('src/main.js');
  assert.match(home, /if\(raf&&!document\.hidden&&performance\.now\(\)-frameAt>1000\)\{cancelAnimationFrame\(raf\);raf=0;\}/);
  assert.match(home, /on\(document,'resume',/);
  const letters = source('public/memento-ui/letters.mjs');
  assert.match(letters, /if \(frame && !document\.hidden && performance\.now\(\) - frameAt > 1000\) \{ cancelAnimationFrame\(frame\); frame = 0; \}/);
  assert.match(source('scripts/scene-material.mjs'), /const kick = \(\) => \{ if \(!document\.hidden && t < 1 && performance\.now\(\) - frameAt > 1000\)/);
});

test('one orange: #FF7950 and its light variant, no yellow or gold left in the site', () => {
  assert.equal(VFX.color.amber.base, '#FF7950');
  assert.equal(VFX.color.amber.light, '#FFAF96');
  const accent = hue('ff7950').h;
  const files = ['src/style.css', 'src/shell/shell.css', 'src/vfx/config.mjs', 'public/memento-ui/site.css', 'public/memento-ui/ready-to-start.css',
    'public/memento-ui/letters.mjs', 'public/navigation/styles.mjs', 'public/navigation/icons.mjs', 'scripts/scene-material.mjs',
    'apps/services/styles.css', 'apps/services/src/visuals.js', 'apps/start/src/styles/start.css', 'apps/start/src/vfx/vfx.css',
    'apps/levelup/styles.css', 'apps/levelup/src/vfx.css', 'apps/levelup/src/ready-to-start.css', 'apps/projects/site/styles.css',
    'apps/projects/site/vfx.css'];
  for (const file of files) for (const [, hex] of source(file).matchAll(/#([0-9a-fA-F]{6})(?:[0-9a-fA-F]{2})?\b/g)) {
    const { h, s, l } = hue(hex);
    // a warm colour (red to yellow) that is not grey must have the hue of #FF7950
    // (warm whites and creams, lighter than 80%, are the ink of the site, not its orange)
    if (h >= 6 && h <= 60 && s > .3 && l > .2 && l < .8) assert.ok(Math.abs(h - accent) < 5, `${file}: #${hex} (hue ${h.toFixed(1)})`);
  }
  // the energy and the title ramp are the same orange, darker and lighter; the titles at rest keep their greys
  for (const c of [...Object.values(VFX.color.amber), ...VFX.color.titleHot, ...VFX.color.titleAmber.map(([, c]) => c)])
    assert.ok(Math.abs(hue(c.slice(1)).h - accent) < 5, c);
  const before = ['#fbefe8', '#fbefe8', '#f5d9c6', '#ecb28c', '#e2874f', '#d9682f'];
  VFX.color.titleAmber.forEach(([, c], i) => {
    const grey = n => parseInt(desaturate(n).slice(1, 3), 16);
    assert.ok(Math.abs(grey(c) - grey(before[i])) <= 3, `${c} rests at the grey of ${before[i]}`);
  });
});

test('margins forced on the content of every page, the sliders still edge to edge', () => {
  const css = source('public/memento-ui/site.css');
  assert.match(css, /:root \{--mm-pad:\.2\}\n@media \(max-width:1279px\) \{:root \{--mm-pad:\.15\}\}\n@media \(max-width:767px\) \{:root \{--mm-pad:\.1\}\}\n@media \(min-width:1600px\) and \(min-aspect-ratio:21\/10\) \{:root \{--mm-pad:\.3\}\}/);
  assert.match(css, /html\[data-memento-native\] \{--content-width:calc\(100vw - 200vw \* var\(--mm-pad\)\)\}/);
  assert.match(css, /html\[data-memento-native=start\] \.content-width \{width:var\(--content-width\);max-width:none\}/);
  // the Home card stands in the same column wherever the height allows it
  for (const [w, h] of [[390, 844], [1024, 768], [1440, 900], [1920, 1080], [2560, 1080], [3440, 1440]]) {
    const l = layout(w, h), column = w * (1 - 2 * paddingOf(w, h));
    assert.ok(l.width <= column + .5 && l.width > column * .98, `${w}x${h}: ${l.width.toFixed(1)} vs ${column}`);
  }
  // the sliders fade only at the edges of the screen, not over the whole margin around a narrower board
  assert.match(source('apps/services/styles.css'), /--outer-fade: min\(max\(0px, calc\(\(100cqw - var\(--slide-width\)\) \* 0\.43\)\), clamp\(36px, 6vw, 140px\)\);/);
  const levelup = source('apps/levelup/styles.css');
  assert.match(levelup, /\.carousel\{--side-fade:min\(calc\(\(100vw - var\(--slide-width\)\)\*\.43\),clamp\(36px,6vw,140px\)\);/);
  assert.doesNotMatch(levelup, /--side-fade:var\(--safe-left\)/);
  assert.match(source('apps/levelup/src/carousel.js'), /portfolioStride\(element\.clientWidth, width, element\.clientWidth, this\.perspective\)/);
});

test('background: the fade crosses the padding line; a click or a word sends one impulse through the viewport', async () => {
  const js = source('public/memento-ui/letters.mjs');
  // the mask is pure: read it from the module without a document
  const { fieldMask, LETTERS } = await import('../public/memento-ui/letters.mjs').catch(() => ({}));
  if (fieldMask) {
    const P = 288;
    assert.equal(fieldMask(0, P), 1);
    assert.equal(fieldMask(.4 * P, P), 1);
    assert.ok(fieldMask(P, P) > .05 && fieldMask(P, P) < .5, 'still a little past the padding line');
    assert.equal(fieldMask(1.3 * P, P), 0);
    assert.ok(LETTERS.wave.content < .5 && LETTERS.wave.speed > 600);
  }
  assert.match(js, /cols = Math\.max\(1, Math\.ceil\(W \/ pitch\)\); rows = Math\.ceil\(H \/ pitch\) \+ 1; count = cols \* rows;/);
  assert.match(js, /fade: \{ from: 0\.4, to: 1\.3, min: 20 \}/);
  assert.match(js, /function impulse\(bx, by, power = 1\)/);
  assert.match(js, /impulse\(x\[mid\], y\[mid\], 1\.15\);/);
  assert.match(js, /addEventListener\('pointerdown', e => \{ if \(!still\(\)\) \{ impulse\(e\.clientX, e\.clientY\); start\(\); \} \}/);
  // no disc: the front is torn by noise, the cells are sparse and each falls at its own pace
  assert.match(js, /tear: 0\.22/);
  assert.match(js, /share: \[0\.62, 0\.2\]/);
  assert.match(js, /fall: \[0\.38, 0\.7\]/);
  // during the page change the impulse stays in the margins
  assert.match(js, /gain = root\.hasAttribute\('data-mm-phase'\) \? 0 : C\.wave\.content;/);
});

test('page change: the language of the cards, a crisp name', () => {
  assert.deepEqual(weave.amber, ['#ff7950', '#ffaf96', '#ffd7ca']);
  const material = source('scripts/scene-material.mjs');
  // an irregular net of mixed sizes (shorter diagonal, some cells split in four), not a regular lattice
  assert.match(material, /function net\(x0, y0, w, h, S, salt\)/);
  assert.match(material, /if \(Math\.hypot\(X\[a\] - X\[d\], Y\[a\] - Y\[d\]\) < Math\.hypot\(X\[b\] - X\[c\], Y\[b\] - Y\[c\]\)\)/);
  // the chain runs only over the content between the margins
  assert.match(material, /inside\[f\] = cx\[f\] > P && cx\[f\] < W - P \? 1 : 0;/);
  assert.match(material, /if \(inside\[f\] && \(over\(f\) \? r\[f\] < \.5 : r\[f\] < \.1\)\) chain\.push\(f\);/);
  // obsidian fragments with a cooling edge, landing on the facets of the name
  assert.match(material, /ctx\.fillStyle = '#141416'/);
  assert.match(material, /shards\.push\(\{ f, k, x0: cx\[f\], y0: cy\[f\], a, b: Math\.max\(a \+ \.22, time\), h, size \}\);/);
  // the name at the screen's full resolution, one sprite pixel on one device pixel
  assert.match(material, /ndpr = Math\.min\(ratio, 3\)/);
  assert.match(material, /tctx\.drawImage\(q\.sprite, q\.x, q\.y, q\.sprite\.width \/ ndpr, q\.sprite\.height \/ ndpr\)/);
  assert.match(material, /g\.lineWidth = 1 \/ ndpr;/);
  assert.doesNotMatch(material, /g\.rotate\(/);
  // the inline copy every page runs is the same function
  assert.ok(sceneHead.includes('function net(x0, y0, w, h, S, salt)'));
});
