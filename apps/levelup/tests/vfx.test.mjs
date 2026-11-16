import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Carousel } from '../src/carousel.js';

test('The START V27 VFX is wired on every surface of the page, after the content', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  const app = await readFile('dist/src/app.js', 'utf8');
  // the four section headings are title surfaces
  for (const id of ['page-title', 'experiences-title', 'vision-title', 'steps-title'])
    assert.match(html, new RegExp(`id="${id}" class="gradient-text fitted-heading" data-vfx="title"`));
  assert.match(html, /<link rel="stylesheet" href="src\/vfx\.css\?v=20\.0\.0">/);
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
  // START V24: a fitted title repaints alone, and only when its size or lines changed
  assert.match(app, /heading\.style\.fontSize=[^\n]+\n[^\n]+\n\s+if\(before!==heading\.style\.fontSize\|\|changed\)vfx\?\.invalidate\(heading\);/);
  assert.match(app, /import\('\.\.\/vfx\/memento-vfx\.js'\)[\s\S]+?mountVfx\(\)[\s\S]+?mountBackground\?\.\(\)[\s\S]+?vfx-off/);
  assert.match(app, /mementoSurface !== 'transparent'\) mountBackground/);
});

test('START V25-V27: content at once, per-surface takeover, canvas on native scroll, background, touch fallback', async () => {
  const css = await readFile('dist/src/vfx.css', 'utf8');
  const boot = await readFile('dist/bootstrap.js', 'utf8');
  const html = await readFile('dist/index.html', 'utf8');
  // surface: opaque true black unless a compatible host (?mementoEmbed=1) owns it, decided before the first paint
  assert.match(css, /html\[data-memento-surface='opaque'\] \{ background: #000; \}/);
  assert.match(css, /html\[data-memento-surface='transparent'\] \.memento-background \{ display: none; \}/);
  assert.match(boot, /get\('mementoEmbed'\) === '1'[\s\S]+?mementoSurface = hosted \? 'transparent' : 'opaque'/);
  assert.match(html, /<style id="memento-first-paint">html\{background:#000\}/);
  // no content veil: the DOM shows until each surface is drawn, then that surface stops painting
  assert.match(css, /html\.vfx-boot main \{ opacity: 1; \}/);
  assert.doesNotMatch(boot, /classList\.add\('vfx-boot'\)/);
  assert.match(css, /html\.vfx-live \[data-vfx\]\[data-vfx-ready\],/);
  assert.doesNotMatch(css, /html\.vfx-live \[data-vfx\],/);
  // the canvas layer follows the document (compositor scroll); the background is fixed behind it
  assert.match(css, /\.vfx-layer \{ position: absolute; inset: 0; overflow: clip;/);
  assert.match(css, /\.vfx-canvas \{ position: absolute; top: 0; left: 0;[^}]+will-change: transform; \}/);
  assert.match(css, /\.memento-background \{ position: fixed; inset: 0; z-index: -1; pointer-events: none; height: 100lvh; \}/);
  // DOM fallback of the touch wave on titles
  assert.match(css, /html:not\(\.vfx-live\) \.touch-lit\.gradient-text/);
  assert.match(html, /interactive-widget=resizes-content/);
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
