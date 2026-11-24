// R22: the "Ambra" palette, colour at rest, a controlled surface, a background that never stands still in the page
// change, fragments in the colours of the interface, the same rhythm on every page, and no transition that can hang.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VFX } from '../src/vfx/config.mjs';
import { sceneHead, lettersLayer } from '../scripts/scene-head.mjs';
import { nativePage } from '../scripts/native-page.mjs';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('palette "Ambra": #FF7950, light #FFA94D, core #FFD285 everywhere', () => {
  assert.deepEqual({ ...VFX.color.amber }, { base: '#FF7950', light: '#FFA94D', deep: '#8C3510', mid: '#FF7950', hot: '#FFA94D', core: '#FFD285' });
  assert.match(source('public/memento-ui/site.css'), /--memento-accent-light: #ffa94d;/);
  assert.match(source('public/memento-ui/letters.mjs'), /color: '#ff7950', hot: '#ffa94d'/);
  // no trace of the pink light variant of R21
  for (const file of ['src/style.css', 'public/memento-ui/site.css', 'public/navigation/styles.mjs', 'public/navigation/icons.mjs', 'scripts/scene-material.mjs',
    'apps/services/styles.css', 'apps/start/src/styles/start.css', 'apps/levelup/styles.css', 'apps/projects/site/styles.css', 'src/vfx/config.mjs'])
    assert.doesNotMatch(source(file), /#ffaf96|#ffd7ca|#ff9473/i, file);
});

test('colour at rest: photographs at half their colour, type with a little of its gradient; hover brings the rest', () => {
  const pages = source('src/surfaces/shaders.ts'), home = source('src/shaders.js');
  assert.match(pages, /mix\(vec3\(ph\.x\),phRGB,min\(max\(max\(uPhotoColor,uRestColour\),\.5\),uPhotoSat\)\)/);
  assert.match(home, /mix\(vec3\(ph\.x\),phRGB,max\(uPhotoColor,\.5\)\)/);
  for (const shader of [pages, home]) assert.match(shader, /vec3 idle=mix\(vec3\(lum\),amberOf\(lum\),\.3\), amber=amberOf\(lum\);/);
  // the DOM says the same where the effects do not run
  for (const file of ['src/style.css', 'apps/services/styles.css', 'apps/projects/site/vfx.css', 'apps/start/src/vfx/vfx.css', 'apps/levelup/src/vfx.css'])
    assert.match(source(file).replace(/\s+/g, ''), /--title-gradient:linear-gradient\(0deg,#9c7a700%,#ba92859%,#d2bba020%,#e9decc32%,#f6f1eb44%,#f6f1eb100%\)/, file);
  for (const file of ['src/style.css', 'apps/services/styles.css', 'apps/projects/site/styles.css', 'apps/start/src/styles/start.css', 'public/memento-ui/ready-to-start.css'])
    // (the map's dark styling is a filter chain of its own, not a photograph at rest)
    assert.doesNotMatch(source(file).replace(/\.map-frame iframe\{[^}]*\}/, ''), /grayscale\(1\)/, file);
});

test('a controlled surface: no selection, no context menu, no middle button, no dragging out', () => {
  assert.match(sceneHead, /html \{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none\}/);
  assert.match(sceneHead, /input,textarea,select,\[contenteditable\]:not\(\[contenteditable="false"\]\) \{-webkit-user-select:text;user-select:text\}/);
  for (const event of ["'contextmenu'", "'auxclick', e => { if (e.button === 1) e.preventDefault(); }", "'mousedown', e => { if (e.button === 1) e.preventDefault(); }", "'dragstart'", "'selectstart'"])
    assert.ok(sceneHead.includes(event), event);
  // every page has it, Studio included
  const studio = nativePage('<!doctype html><html><head><title>t</title></head><body><main id="experience"></main></body></html>', 'studio', 'test');
  assert.match(studio, /<script id="memento-guard">/);
});

test('the background draws from the first frame of every page (inline), one field per page', () => {
  assert.match(lettersLayer, /<script id="memento-letters">\(\(\)=>\{function paddingOf\(width, height\)/);
  assert.doesNotMatch(lettersLayer.slice(lettersLayer.indexOf('<script')), /^import |^export /m);
  assert.match(source('public/memento-ui/letters.mjs'), /if \(window\.__mementoLetters\) return \(mounted = window\.__mementoLetters\);/);
  assert.doesNotMatch(source('public/memento-ui/site.mjs'), /letters\.mjs/);
  assert.doesNotMatch(source('vite.config.js'), /src="\/memento-ui\/letters\.mjs"/);
  const page = nativePage('<!doctype html><html><head><title>t</title></head><body><main><h1>Start</h1></main></body></html>', 'start', 'test');
  assert.match(page, /<body><div class="mm-letters" aria-hidden="true">.*?<\/div><script id="memento-letters">/s);
  // a tap that scrolls or a link never sends an impulse (the page change has its own movement)
  const js = source('public/memento-ui/letters.mjs');
  assert.match(js, /n instanceof HTMLAnchorElement/);
  assert.match(js, /Math\.hypot\(e\.clientX - tap\.x, e\.clientY - tap\.y\) > 12/);
});

test('page change: filled fragments in the colours of the interface, nothing in outline', () => {
  const material = source('scripts/scene-material.mjs');
  // nothing in outline on the cells or over the name (the hairline inside the letters is the title's own material)
  assert.doesNotMatch(material, /\b(ctx|tctx)\.stroke/);
  assert.match(material, /ctx\.fillStyle = `rgb\(\$\{c\[0\]\},\$\{c\[1\]\},\$\{c\[2\]\}\)`;/);
  assert.match(material, /const obsidian = \['#0b0b0c', '#111113', '#18181a'\];/);
  const head = source('scripts/scene-head.mjs');
  assert.match(head, /sampling\.drawImage\(img, 0, 0, 3, 3\);/);
  assert.match(head, /colours: kept\.map\(q => q\[5\] \? coloursOf\(q\[5\]\) : \[\[24,24,26\]\]\)/);
});

test('the same rhythm on every page, and no page change that can hang', () => {
  const head = source('scripts/scene-head.mjs');
  assert.match(head, /const hold = 280;/);
  assert.match(head, /await Promise\.race\(\[Promise\.all\(\[first, effectsOf\(started\)\]\), wait\(hold\)\]\);\n\s+await wait\(Math\.max\(0, hold - \(performance\.now\(\) - composed\)\)\);/);
  assert.match(head, /s\.timeout = setTimeout\(release, 4500\);/);
  assert.match(source('src/surfaces/engine.ts'), /\(phase === 'gather' \|\| phase === 'hold'\) && performance\.now\(\) - this\.bornAt < 5000/);
});
