// R24: the fixes of the R23 audit. The page shows once (the effects take over in place after a page change), the
// name stands no longer than the incoming page needs, a touch answers at once, the opening and the swap of documents
// no longer stall, Servizi scrolls without preparing its surfaces on the frame, the engine's exit stays in the column,
// and the smaller things: two 404s, the masks, photographs for phones, the background at rest, 60 fps, the favicon.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createMaterial } from '../scripts/scene-material.mjs';
import { sceneHead, sceneFiles, sceneCode, guardCode, lettersLayer, lettersCode } from '../scripts/scene-head.mjs';
import { nativePage } from '../scripts/native-page.mjs';
import { RESIDENCY } from '../src/surfaces/servizi.ts';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const head = source('scripts/scene-head.mjs');

test('1. the page shows once: after a page change the effects take over in place, never with their loading sequence', () => {
  // the flag stays once the change is over (data-mm-arrive goes with it)
  assert.match(head, /root\.setAttribute\('data-mm-arrived', ''\);/);
  assert.match(source('src/paint.mjs'), /export const arrived = \(\) => document\.documentElement\.hasAttribute\('data-mm-arrived'\);/);
  // the effects start once the opening is over (the page is on screen), not under the cover at once
  assert.match(source('src/paint.mjs'), /\.then\(\(\) => window\.mementoSceneFinished\)\.catch/);
  assert.doesNotMatch(source('src/paint.mjs'), /arriving\(\) \? undefined/);
  assert.doesNotMatch(source('src/surfaces/index.ts'), /arriving\(\)/);
  // both engines take over at once: no hidden DOM, no cells composing the page a second time
  assert.match(source('src/surfaces/engine.ts'), /if \(this\.reduced \|\| !this\.intro \|\| arrived\) \{ this\.load\.value = 1; this\.loaded = true; return; \}/);
  assert.match(source('src/renderer.js'), /root\(\)\.hasAttribute\('data-mm-arrived'\)\) \{ this\.load = 1; this\.loaded = true; \}/);
  // and the page change no longer waits for them
  assert.doesNotMatch(head, /effectsOf/);
});

test('2. the name stands only while the incoming page has nothing to show', () => {
  // the first view is the first element parsed (and decoded), never DOMContentLoaded (the page's own modules)
  assert.match(head, /function parsed\(s\)/);
  assert.doesNotMatch(head, /addEventListener\('DOMContentLoaded'/);
  // `patience` counts from the incoming page's first frame, not from the composed name
  assert.match(head, /wait\(Math\.max\(0, started \+ patience - performance\.now\(\)\)\)/);
  assert.match(head, /const hold = 140, patience = 380;/);
});

test('3. a touch answers at once: names composed ahead, the outgoing name at once, few pieces', () => {
  // a fourth argument: compose at once (the outgoing side); the incoming page still protects its first frame
  assert.match(source('scripts/scene-material.mjs'), /export function createMaterial\(name, weave, paddingOf, now = false\)/);
  assert.equal(createMaterial.length, 3);
  assert.match(source('scripts/scene-material.mjs'), /if \(now && loaded\) compose\(\);/);
  // a name made ahead of time joins the page only when a movement uses it
  const material = source('scripts/scene-material.mjs');
  assert.match(material, /const attach = \(\) => \{\n\s+if \(layer\.isConnected\) return;\n.*\n\s+document\.body\.append\(layer\);\n\s+\};/);
  assert.equal(material.split('document.body.append(layer)').length, 2);
  assert.match(material, /play\(covering, fraction, duration, scene\) \{\n\s+attach\(\);/);
  assert.match(material, /fits\(\) \{/);
  // screens without hover compose every page of the dock in idle moments after the load
  assert.match(head, /const touchOnly = matchMedia\('\(hover: none\)'\);/);
  assert.match(head, /function composeAhead\(\)/);
  assert.match(head, /createMaterial\(nameOf\(url\), weave, paddingOf, true\)/);
  // the page leaves in whole blocks, at most 36 of them (it was up to 140 elements, each a layer)
  assert.match(head, /const most = 36, block = \.2;/);
  assert.doesNotMatch(head, /out\.length >= 140/);
});

test('4. no stall at the opening: the page is drawn under the cover, its layout read in the hold, its effects a frame later', () => {
  // the incoming page is drawn clipped to the column under the cover once its name has composed (it was hidden until
  // the opening and rasterized whole on its first frame); before the name, its first frames stay light
  assert.ok(sceneHead.includes(':root[data-mm-feed="old"]::view-transition-new(root) {clip-path:inset(0 var(--mm-side,0px))}'));
  assert.ok(sceneHead.includes(':root[data-mm-feed="old"]:not([data-mm-name])::view-transition-new(root) {opacity:0}'));
  assert.doesNotMatch(sceneHead, /:root\[data-mm-feed="old"\]::view-transition-new\(root\) \{opacity:0\}/);
  // its layout is read after its first frame, never in the reveal
  assert.match(head, /const target = await parsed\(s\);\n.*\n\s+await new Promise\(resolve => requestAnimationFrame\(\(\) => setTimeout\(resolve, 0\)\)\);\n\s+if \(s !== active\) return;\n\s+s\.nextScene = sceneOf/);
  // what lies outside the column is read and built in the hold, held, then set going with the cells
  assert.match(head, /function assemble\(s\)/);
  assert.match(head, /a\.pause\(\);\n\s+s\.outside\.push\(a\);/);
  assert.match(head, /for \(const a of s\.outside\) a\.startTime = at;/);
  // a first view that comes late never touches an opening already under way
  assert.match(head, /if \(active !== s \|\| s\.opened\) return;/);
  assert.match(head, /s\.opened = true;\n\s+if \(!s\.outside\) assemble\(s\);/);
  // and a page change that ends early puts it back
  assert.match(head, /for \(const a of s\.outside \|\| \[\]\) a\.cancel\(\);/);
  // the page's own work starts a frame after the opening
  assert.match(head, /vt\.skipTransition\(\);\n(.*\n){1,2}\s+requestAnimationFrame\(\(\) => \{\n\s+if \(active !== s\) return;\n\s+root\.dataset\.mmPhase = 'unfold';/);
});

test('4. the swap of documents: the page change and the background are files of their own, cached for good', () => {
  const digest = text => createHash('sha256').update(text).digest('hex').slice(0, 12);
  const files = Object.keys(sceneFiles);
  assert.deepEqual(files, [`assets/compiled/scene-${digest(guardCode + ';\n' + sceneCode)}.js`, `assets/compiled/letters-${digest(lettersCode)}.js`]);
  // still classic scripts where they were (the head before the first frame, the background right after its layer)
  assert.match(sceneHead, new RegExp(`<script id="memento-scene-navigation" src="/${files[0]}"></script>$`));
  assert.match(lettersLayer, new RegExp(`<script id="memento-letters" src="/${files[1]}"></script>$`));
  assert.doesNotMatch(sceneHead + lettersLayer, /<script[^>]*>[^<]/);
  // the guard runs first, as it did inline
  assert.ok(sceneFiles[files[0]].startsWith(guardCode));
  const vercel = JSON.parse(source('vercel.json'));
  assert.equal(vercel.headers.find(h => h.source === '/assets/compiled/(.*)')?.headers[0].value, 'public, max-age=31536000, immutable');
  // the build writes them, the dev server serves them
  const vite = source('vite.config.js');
  assert.match(vite, /async generateBundle\(\) \{/);
  assert.match(vite, /configureServer\(server\)/);
  // every page gets the same tags
  const page = nativePage('<!doctype html><html><head><title>t</title></head><body><main><h1>Start</h1></main></body></html>', 'start', 'test');
  for (const file of files) assert.equal(page.split(`src="/${file}"`).length, 2, file);
});

test('5. Servizi scrolls on surfaces prepared ahead: idle preparation, uploads on arrival, distance fields in a worker', () => {
  assert.deepEqual({ ...RESIDENCY }, { near: 1.25, ahead: 2.25, far: 3 });
  const engine = source('src/surfaces/engine.ts');
  assert.match(engine, /private prepareAhead = \(deadline: IdleDeadline\) => \{/);
  assert.match(engine, /requestIdleCallback\(this\.prepareAhead, \{ timeout: 2000 \}\)/);
  assert.match(engine, /this\.renderer\.initTexture\(t\)/);
  assert.match(engine, /distanceFieldAsync\(painted,/);
  // a surface prepared away from the screen is not a reason to draw a frame
  assert.match(engine, /private shown\(s: Surface\) \{/);
  const raster = source('src/surfaces/raster.ts');
  assert.match(raster, /new Worker\(new URL\('\.\/sdf\.worker\.ts', import\.meta\.url\), \{ type: 'module' \}\)/);
  // where a worker cannot run, the field is computed here as before
  assert.match(raster, /if \(!w0\) return Promise\.resolve\(distanceField\(source, cssW, cssH, range\)\);/);
  assert.match(source('src/surfaces/sdf.worker.ts'), /new OffscreenCanvas\(w, h\)/);
  assert.doesNotMatch(source('src/surfaces/sdf.ts'), /document\.|window\./);
});

test('6. the engine\'s exit stays in the column: outside it the cells go out in place, inside two in five fly', () => {
  for (const file of ['src/shaders.js', 'src/surfaces/shaders.ts']) {
    const glsl = source(file);
    assert.match(glsl, /uniform vec2 uExitCol;/, file);
    assert.match(glsl, /return \(x<uExitCol\.x\|\|x>uExitCol\.y\|\|h11\(seed\*61\.\)>\.4\)\?1\.:0\.;/, file);
    assert.match(glsl, /vec2 m=c\+v\*\(1\.-\.45\*e\)\+\(to\+side\)\*e;/, file);
  }
  assert.match(head, /column:\[side, 1 - side\]/);
  for (const file of ['src/surfaces/engine.ts', 'src/renderer.js']) assert.match(source(file), /uExitCol/, file);
  assert.match(source('src/main.js'), /engine\?\.exit\(e\.detail\.origin,e\.detail\.duration,e\.detail\.column\)/);
});

test('7. the colours of the photographs: data-vfx-photo is a selector, never an address; only loaded photographs are read', () => {
  assert.match(head, /el\.querySelector\(el\.dataset\.vfxPhoto\)/);
  assert.doesNotMatch(head, /\|\| el\.dataset\?\.vfxPhoto \|\| ''/);
  assert.match(head, /\.filter\(img => img\?\.complete && img\.naturalWidth\)/);
});

test('8. lighter pages: the masks of Servizi, photographs sized for phones', () => {
  for (const mask of ['tile-bottom', 'frame-bottom']) {
    const bytes = statSync(new URL(`../apps/services/assets/masks/${mask}.png`, import.meta.url)).size;
    assert.ok(bytes < 2048, `${mask}: ${bytes} bytes`);
  }
  assert.match(source('apps/levelup/src/benefit-markup.js'), /export const PHONE = '\(max-width:767px\) and \(min-resolution:2\.5dppx\) ';/);
  assert.match(source('apps/levelup/index.html'), /imagesizes="\(max-width:767px\) and \(min-resolution:2\.5dppx\) 60vw,/);
  assert.match(source('apps/projects/site/media.js'), /\(max-width:767px\) and \(min-resolution:2\.5dppx\) calc\(\(\$\{slot\}\) \* \.67\)/);
});

test('10–11. at rest and on fast screens: the background slower on touch and still while scrolling, 60 fps for real', () => {
  const letters = source('public/memento-ui/letters.mjs');
  // (the module imports /memento-ui/padding.mjs, an address of the site: its constants are read as text)
  assert.match(letters, /fps: 30, touchFps: 18, pause: 0\.18,/);
  assert.match(letters, /1 \/ \(hoverless\.matches \? C\.touchFps : C\.fps\)/);
  assert.match(letters, /if \(root\.hasAttribute\('data-mm-phase'\)\) return;\n\s+clearTimeout\(resting\);\n\s+halt\(\);/);
  // a wake from within a frame no longer lets the next one skip the cap
  assert.match(source('src/surfaces/engine.ts'), /if \(!this\.lastTick \|\| performance\.now\(\) - this\.lastTick > 100\) this\.lastTick = 0;/);
  // the scroll cue measures with the browser's own layout
  assert.match(source('public/memento-ui/scrollbar.mjs'), /rail\.hidden = true;\n\s+schedule\(\);\n\}/);
});

test('11. every page names its icon; an address typed after another page opens directly', () => {
  const studio = nativePage('<!doctype html><html><head><title>t</title></head><body><main id="experience"></main></body></html>', 'studio', 'test');
  assert.match(studio, /<link rel="icon" href="\/favicon\.svg">/);
  const empty = nativePage('<!doctype html><html><head><title>t</title><link rel="icon" href="data:,"></head><body></body></html>', 'services', 'test');
  assert.match(empty, /<link rel="icon" href="\/favicon\.svg">/);
  assert.doesNotMatch(empty, /href="data:,"/);
  // only a handoff (the outgoing page saved its movement) or history between two pages of the site arrives
  assert.match(head, /const traversal = type => type === 'traverse' \|\| type === 'back_forward';/);
  assert.match(head, /peek\(\) \|\| \(traversal\(type\) && crossing\(activation\?\.from\?\.url, location\.href\)\)/);
  assert.match(head, /if \(!vt \|\| type === 'reload' \|\| !enabled\(\) \|\| !\(saved \|\| \(traversal\(type\) && crossing/);
});
