import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { catalogue } from '../src/content.js';
import { media } from '../src/media.js';
import { detail, cover, grid } from '../src/render.js';

const items = [...catalogue.services, ...catalogue.bundles];
const byId = new Map(items.map((item) => [item.id, item]));
test('All category and bundle links resolve, without duplicate catalogue entries', () => {
  assert.equal(byId.size, items.length);
  const ids = catalogue.categories.flatMap((section) => section.services);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(new Set(ids), new Set(catalogue.services.map((item) => item.id)));
  for (const section of catalogue.categories)
    for (const id of section.featured) assert.ok(section.services.includes(id));
  for (const bundle of catalogue.bundles) {
    assert.deepEqual(
      bundle.covers,
      bundle.slides.find((s) => s.components).components.map((c) => c.id),
    );
    for (const id of bundle.covers) assert.equal(byId.get(id)?.kind, 'service');
  }
});
test('Every published board has valid content and all responsive artwork variants exist', () => {
  for (const item of items) {
    assert.equal(item.slides.length, 4, item.id);
    for (const slide of item.slides) {
      assert.ok(slide.title.length && slide.title.every(Boolean), item.id);
      assert.ok(slide.titleUnits > 0, item.id);
      assert.equal(
        [slide.copy, slide.steps, slide.list, slide.components].filter(Boolean).length,
        1,
        item.id,
      );
      if (slide.action) assert.equal(slide.action, 'start');
    }
    for (const name of [item.cover, ...item.slides.map((s) => s.image).filter(Boolean)]) {
      const image = media(name);
      for (const file of image.srcset.split(', ').map((s) => s.split(' ')[0]))
        assert.ok(existsSync(new URL('../' + file, import.meta.url)), file);
    }
  }
});
test('Canonical data is deeply immutable', () => {
  assert.throws(() => {
    catalogue.services[0].title = 'changed';
  }, TypeError);
  assert.throws(() => {
    catalogue.bundles[0].slides.push({});
  }, TypeError);
  assert.throws(() => {
    catalogue.categories[0].featured.pop();
  }, TypeError);
});
test('Rendering keeps one dialog title, four named controls and an explicit Start link', () => {
  for (const item of items) {
    const html = detail(item);
    assert.equal((html.match(/id="detail-title"/g) || []).length, 1, item.id);
    assert.equal((html.match(/data-scene-dot=/g) || []).length, 4, item.id);
    assert.ok(html.includes(`href="${catalogue.config.startUrl}" target="_top"`), item.id);
    assert.ok(
      cover(item, 0).includes(
        `href="#${item.kind === 'bundle' ? 'bundle' : 'servizio'}/${item.id}"`,
      ),
    );
  }
  for (const medium of ['digital', 'physical']) {
    assert.equal(
      (grid(medium).html.match(/data-service=/g) || []).length,
      catalogue.services.filter((s) => s.medium === medium).length,
    );
  }
});
test('The entry point has one stylesheet, the page and navigation bootstraps, and one app module', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.equal((html.match(/rel="stylesheet"/g) || []).length, 1);
  assert.equal((html.match(/<script\s/g) || []).length, 3);
  assert.equal((html.match(/src="navigation\/bootstrap\.js\?v=12\.0\.0"/g) || []).length, 1);
  assert.match(html, /data-memento-page="services"/);
  assert.equal((html.match(/type="module"/g) || []).length, 1);
  assert.deepEqual(
    readdirSync(new URL('../', import.meta.url)).filter((f) => f.endsWith('.css')),
    ['styles.css'],
  );
});
