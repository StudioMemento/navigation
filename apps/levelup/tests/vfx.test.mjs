import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Carousel } from '../src/carousel.js';

test('The START V23 VFX is wired on every surface of the page, after the content', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  const app = await readFile('dist/src/app.js', 'utf8');
  // the four section headings are title surfaces
  for (const id of ['page-title', 'experiences-title', 'vision-title', 'steps-title'])
    assert.match(html, new RegExp(`id="${id}" class="gradient-text fitted-heading" data-vfx="title"`));
  assert.match(html, /<link rel="stylesheet" href="src\/vfx\.css">/);
  assert.match(html, /<link rel="modulepreload" href="vfx\/memento-vfx\.js">/);
  assert.match(html, /<meta name="theme-color" content="#000000">/);
  // carousel boards: drawn through their own 3D transform, clipped by the carousel, dimmed with their focus
  assert.match(app, /data-vfx="card" data-vfx-transform data-vfx-clip="\.carousel" data-vfx-focus data-vfx-photo="\.card-art"/);
  assert.equal((app.match(/class="showcase-card cut-frame" \$\{board\}/g) || []).length, 2);
  // comparisons and steps are cards; the comparison handle stays DOM
  assert.match(app, /class="vision-card cut-frame vision-\$\{item\.id\}" data-vfx="card" data-vfx-photo="\.comparison > img" data-vfx-compare="\.comparison-before"/);
  assert.match(app, /class="comparison-divider" data-vfx-dom/);
  assert.match(app, /class="step-card cut-frame" data-vfx="card"/);
  // carousel frames and fitted type reach the engine; the engine is a dynamic import with a DOM fallback
  assert.equal((app.match(/onRender:\(\)=>vfx\?\.motion\(\)/g) || []).length, 2);
  assert.match(app, /heading\.style\.fontSize=[^\n]+\n\s+vfx\?\.invalidate\(\);/);
  assert.match(app, /import\('\.\.\/vfx\/memento-vfx\.js'\)[\s\S]+?mountVfx\(\)[\s\S]+?vfx-off/);
});

test('True black, boot veil with a 3 s failsafe, and no DOM paint twice', async () => {
  const css = await readFile('dist/src/vfx.css', 'utf8');
  const boot = await readFile('dist/bootstrap.js', 'utf8');
  assert.match(css, /html\[data-embedded=false\] \{ background: #000; \}/);
  assert.match(css, /html\.vfx-boot main \{ opacity: 0; \}/);
  assert.match(css, /html\.vfx-live \[data-vfx\],/);
  assert.match(boot, /root\.classList\.add\('vfx-boot'\);\s+setTimeout\(\(\) => root\.classList\.remove\('vfx-boot'\), 3000\);/);
  assert.match(boot, /prefers-reduced-motion: reduce[\s\S]+forced-colors: active/);
});

test('Every carousel frame is announced to the engine', () => {
  const calls = [];
  const card = { style: { setProperty() {} }, dataset: {}, querySelectorAll: () => [], setAttribute() {}, tabIndex: 0 };
  const carousel = Object.assign(Object.create(Carousel.prototype), {
    cards: [card], count: 1, current: 0, active: 0, fan: false, stride: 100, width: 100, height: 50, perspective: 1000,
    interactiveContents: false, onSettle() {}, onRender: () => calls.push('render'),
  });
  carousel.render();
  carousel.render();
  assert.deepEqual(calls, ['render', 'render']);
  assert.match(card.style.transform, /perspective\(1000\.0px\)/);
});
