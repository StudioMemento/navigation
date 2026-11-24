import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { catalogue } from '../src/content.js';
import { categories, cover, detail, grid } from '../src/render.js';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('Memento VFX (START V27): every page surface is declared in the markup', () => {
  const html = read('index.html');
  assert.match(html, /<h2 id="catalogue-heading" data-vfx="title">/);
  assert.match(html, /id="start-link"[\s\S]*?data-vfx="card"[\s\S]*?data-vfx-photo="\.start-sparkle"/);
  assert.match(html, /rel="modulepreload" href="vfx\/memento-vfx\.js"/);
  const board = /data-vfx="card" data-vfx-transform data-vfx-clip="\.carousel" data-vfx-focus data-vfx-photo="[^"]+" data-vfx-veil="\.mobile-title-veil"/;
  for (const item of [...catalogue.bundles, ...catalogue.services]) assert.match(cover(item, 0), board, item.id);
  assert.equal((categories().match(/class="spread-title" data-vfx="title"/g) || []).length, catalogue.categories.length);
  for (const medium of ['digital', 'physical']) {
    const tiles = grid(medium).html;
    const count = (tiles.match(/class="service-card"/g) || []).length;
    assert.equal((tiles.match(/data-vfx="card" data-vfx-photo="\.service-visual"/g) || []).length, count);
    // the arrow only shows on hover: it stays DOM, painted above the canvas
    assert.equal((tiles.match(/class="service-action" data-vfx-dom/g) || []).length, count);
  }
});

test('Dialog boards are surfaces of their own engine; interactive rows and the CTA stay DOM', () => {
  for (const item of [...catalogue.bundles, ...catalogue.services]) {
    const html = detail(item);
    assert.equal((html.match(/class="carousel-card showcase-card service-scene[^"]*" data-vfx="card"/g) || []).length, 4, item.id);
    assert.ok(!/<ul class="bundle-components">/.test(html), item.id);
    if (item.kind === 'bundle') assert.match(html, /<ul class="bundle-components" data-vfx-dom>/);
    assert.match(html, /class="item-master-cta" data-vfx-dom/, item.id);
  }
  const app = read('src/app.js');
  assert.match(app, /active: \(\) => dialog\.open, bands: false, intro: false, offset: true/);
  assert.match(app, /mountVfx\(\{ root: \$\('#memento-catalogo'\) \}\)/);
});

test('The prebuilt engine is published and every chunk it imports exists', () => {
  const dir = new URL('../public/vfx/', import.meta.url);
  const files = readdirSync(dir);
  assert.ok(files.includes('memento-vfx.js'));
  for (const file of files.filter((f) => f.endsWith('.js'))) {
    const text = readFileSync(new URL(file, dir), 'utf8');
    for (const m of text.matchAll(/(?:from\s*|import\s*\()\s*["'](\.\/[^"']+)["']/g))
      assert.ok(existsSync(new URL(m[1], dir)), `${file} → ${m[1]}`);
  }
  const engine = files.find((f) => f.startsWith('engine-'));
  const code = readFileSync(new URL(engine, dir), 'utf8');
  assert.ok(!/gsap|ScrollTrigger/.test(code), 'no GSAP in the engine');
  assert.match(read('build.mjs'), /public\/vfx/);
});

test('Surface and background: opaque unless a compatible host asks for it', () => {
  const boot = read('bootstrap.js');
  assert.match(boot, /get\('mementoEmbed'\) === '1'/);
  assert.match(boot, /dataset\.mementoSurface = hosted \? 'transparent' : 'opaque'/);
  const css = read('styles.css');
  assert.match(css, /html\[data-memento-surface='opaque'\] \{\s*background: #000;/);
  assert.match(css, /html\[data-memento-surface='transparent'\] \.memento-background/);
  // a DOM-kept subtree (CTA, included services) must not inherit the hidden surface's transparent fill
  assert.match(css, /\[data-vfx\]\[data-vfx-ready\] \[data-vfx-dom\] \{\s*-webkit-text-fill-color: currentColor;/);
  // rest state monochrome: no amber in the idle title gradient
  const idle = /--title-gradient: linear-gradient\(([^;]+)\);/.exec(css)[1];
  for (const hex of idle.match(/#[0-9a-f]{6}/gi)) assert.equal(hex.slice(1, 3), hex.slice(3, 5), hex);
});
