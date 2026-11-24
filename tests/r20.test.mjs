// R20: the background of letters (the vector capitals of the MEMENTO wordmark, React Bits "Letter Glitch" pixel
// preset) in the margins of every page, the padding rules, the phone column of the Start page on the whole site, the
// page name between the margins in the hover look of the titles, and the background alive through the page change.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PADDING, START_COLUMN, ULTRAWIDE, paddingOf } from '../public/memento-ui/padding.mjs';
import { createMaterial } from '../scripts/scene-material.mjs';
import { sceneHead, lettersLayer } from '../scripts/scene-head.mjs';
import { nativePage } from '../scripts/native-page.mjs';
import { layout } from '../src/model.mjs';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('padding rules: 10-80-10 phone, 15-70-15 tablet, 20-60-20 desktop, the Start column on ultrawide', () => {
  assert.deepEqual({ ...PADDING }, { mobile: .1, tablet: .15, desktop: .2 });
  assert.equal(paddingOf(390, 844), .1);
  assert.equal(paddingOf(767, 1024), .1);
  assert.equal(paddingOf(768, 1024), .15);
  assert.equal(paddingOf(1024, 768), .15);
  assert.equal(paddingOf(1440, 900), .2);
  assert.equal(paddingOf(1920, 1080), .2);
  assert.equal(paddingOf(1500, 600), .2);   // very wide but under 1600 px: desktop, not ultrawide
  // ultrawide: what the Start column (1280 px, centred) leaves on each side, never less than the desktop 20%
  const start = width => (width - START_COLUMN) / 2 / width;
  assert.equal(paddingOf(2560, 1080), start(2560));   // 25%
  assert.equal(paddingOf(3440, 1440), start(3440));   // 31%
  assert.equal(paddingOf(5120, 1440), start(5120));   // 37.5%
  assert.equal(paddingOf(1800, 800), .2);              // the column would leave 14%: desktop margins
  // Start's own column on wide screens is min(80%, 1280px), the column every page takes on ultrawide (site.css)
  assert.match(source('apps/start/src/styles/start.css'), /\.content-width\{width:min\(80%,1280px\)/);
  const css = source('public/memento-ui/site.css');
  assert.ok(css.includes(`@media (min-width:${ULTRAWIDE.width}px) and (min-aspect-ratio:21/10) {\n  html[data-memento-native] {--content-width:${START_COLUMN}px}`));
  assert.equal(ULTRAWIDE.ratio, 21 / 10);
  // the Home card too
  assert.equal(layout(2560, 1080).width, START_COLUMN);
  assert.equal(layout(3440, 1440).width, START_COLUMN);
});

test('the background: the wordmark capitals, the React Bits parameters, faded out toward the content', () => {
  const js = source('public/memento-ui/letters.mjs');
  for (const kind of ['M', 'E', 'N', 'T', 'O']) assert.match(js, new RegExp(`\\b${kind}: \\{ w: `), kind);
  assert.match(js, /WORD = \['M', 'E', 'M', 'E', 'N', 'T', 'O'\]/);
  // ?glitchColors=f97316&baseColor=f97316&fontSize=8&spacing=0.5&density=0.25&baseOpacity=0.1&speed=0.05&cursorRadius=400&clickEffect=burst
  for (const value of ['size: 8', 'spacing: 0.5', 'density: 0.25', 'base: 0.1', 'speed: 0.05', 'radius: 400', "color: '#f97316'", 'burst:'])
    assert.ok(js.includes(value), value);
  assert.match(js, /import \{ paddingOf \} from '\/memento-ui\/padding\.mjs'/);
  // the easter egg: the field decrypts MEMENTO and a chain spreads from where it happened
  assert.match(js, /function startEgg\(\)/);
  assert.match(js, /function stepEgg\(/);
  // still for reduced motion, ?vfx=off and Save-Data
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /saveData/);
  // Studio is a page of its own: no field there; coming from it, the field appears as on a first visit
  assert.match(js, /\/\^\\\/\(studio\|memento\)/);
  assert.match(source('public/memento-ui/site.mjs'), /if \(root\.dataset\.mementoNative !== 'studio'\) import\('\/memento-ui\/letters\.mjs'\);/);
  const studio = nativePage('<!doctype html><html><head><title>t</title></head><body><main id="experience"></main></body></html>', 'studio', 'test');
  assert.doesNotMatch(studio, /<div class="mm-letters"/);
});

test('the background is in every body from the first byte, under everything, never in the way', () => {
  assert.match(lettersLayer, /^<div class="mm-letters" aria-hidden="true"><canvas class="mm-letters-field"><\/canvas><canvas class="mm-letters-light"><\/canvas><\/div>$/);
  const page = nativePage('<!doctype html><html><head><title>t</title></head><body><main><h1>Start</h1></main></body></html>', 'start', 'test');
  assert.match(page, /<body><div class="mm-letters" aria-hidden="true">/);
  assert.equal(page.split('class="mm-letters"').length, 2);
  assert.match(source('vite.config.js'), /<!-- MEMENTO_LETTERS -->/);
  assert.match(source('index.html'), /<body>\n<!-- MEMENTO_LETTERS -->/);
  const css = source('public/memento-ui/site.css');
  assert.match(css, /\.mm-letters \{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden\}/);
  // contain:strict on a view-transition-named layer blanks the whole transition in Chrome: never again
  assert.doesNotMatch(css, /\.mm-letters \{[^}]*contain:strict/);
  assert.match(css, /html\[data-memento-native\] body \{background-color:transparent!important\}/);
  assert.match(source('src/style.css'), /body\{overflow:hidden;-webkit-tap-highlight-color:transparent;background:transparent\}/);
});

test('phone: wordmark, content and dock share the Start column, 80% of the screen', () => {
  const css = source('public/memento-ui/site.css');
  const block = css.slice(css.lastIndexOf('@media (max-width:767px)'));
  assert.match(block, /--memento-overlay-width:80vw;--memento-overlay-gutter:0px/);
  assert.match(block, /html\[data-memento-native\] \{--content-width:80vw\}/);
  assert.match(block, /html\[data-memento-native=start\] \.content-width \{width:80vw;max-width:none\}/);
  // the same breakpoint as the padding rules
  assert.equal(paddingOf(767, 900), .1);
  // the Home card: 80% of a phone, as wide as the wordmark
  for (const [w, h] of [[390, 844], [360, 780], [430, 932]]) {
    const l = layout(w, h);
    assert.ok(Math.abs(l.width - w * .8) < .5, `${w}x${h}: ${l.width}`);
  }
});

test('page change: the name between the margins, in the hover look of the titles; the background stays', () => {
  assert.equal(createMaterial.length, 3);
  const material = source('scripts/scene-material.mjs');
  assert.match(material, /const P = paddingOf\(W, H\) \* W, room = W - 2 \* P;/);
  assert.match(material, /actualBoundingBoxLeft \+ t\.actualBoundingBoxRight/);
  assert.match(material, /globalCompositeOperation = 'source-atop'/);
  assert.match(material, /strokeText/);
  // the background rises over the material during the change and is its own group between it and the navigation
  assert.match(sceneHead, /\.mm-letters \{view-transition-name:mm-bg\}/);
  assert.match(sceneHead, /:root\[data-mm-phase\] \.mm-letters \{z-index:999\}/);
  assert.match(sceneHead, /::view-transition-group\(mm-material\) \{z-index:2\}/);
  assert.match(sceneHead, /::view-transition-group\(mm-bg\) \{z-index:3\}/);
  assert.match(sceneHead, /::view-transition-group\(mm-nav\) \{z-index:4\}/);
  assert.ok(sceneHead.includes(':root:not([data-mm-bg])::view-transition-new(mm-bg),:root[data-mm-bg]::view-transition-old(mm-bg),:root[data-mm-feed="new"]::view-transition-old(mm-bg) {opacity:0}'));
  assert.match(sceneHead, /const artwork = '\.vfx-layer,\.mm-weave,\.mm-letters,canvas#world';/);
  assert.match(sceneHead, /createMaterial\(nameOf\(s\.destination \|\| location\.href\), weave, paddingOf\)/);
  assert.match(sceneHead, /,function paddingOf\(width, height\)/);
  assert.match(source('public/memento-ui/site.css'), /\.mm-scrollbar \{position:fixed;z-index:997;/);
});
