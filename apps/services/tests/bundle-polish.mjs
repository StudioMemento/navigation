import fs from 'node:fs';
import assert from 'node:assert/strict';
import { browser, server, origin } from './browser-fixture.mjs';
import { catalogue } from '../src/content.js';
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const result = [];
const fans = [];
try {
  await page.goto(origin + '/v39/');
  await page.locator('#web').waitFor();
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height] of [
    [320, 568],
    [390, 844],
    [500, 900],
    [600, 900],
    [767, 1024],
    [768, 1024],
    [820, 1180],
    [927, 557],
    [1024, 768],
    [1371, 823],
    [1440, 900],
    [2048, 900],
  ]) {
    await page.setViewportSize({ width, height });
    for (const bundle of catalogue.bundles) {
      await page.evaluate((id) => (location.hash = '#bundle/' + id), bundle.id);
      await page.locator('#detail-dialog[open] .scene-result[data-active="true"]').waitFor();
      await page.locator('[data-scene-dot="1"]').click();
      const card = page.locator('#detail-dialog .scene-components[data-active="true"]');
      await card.waitFor();
      await page.evaluate(
        () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
      );
      const metrics = await card.evaluate((c) => {
        const rect = (e) => e.getBoundingClientRect().toJSON();
        const scroll = c.querySelector('.popup-card-scroll');
        return {
          card: rect(c),
          overflow: scroll.scrollHeight - scroll.clientHeight,
          horizontal: scroll.scrollWidth - scroll.clientWidth,
          title: rect(c.querySelector('.item-master-title')),
          titleFont: getComputedStyle(c.querySelector('.item-master-title')).fontSize,
          rows: [...c.querySelectorAll('.component-row')].map((x) => ({
            rect: rect(x),
            img: rect(x.querySelector('img')),
            title: rect(x.querySelector('strong')),
            role: rect(x.querySelector('.component-copy>span')),
          })),
        };
      });
      result.push({ width, height, bundle: bundle.id, ...metrics });
      const label = JSON.stringify({ width, height, bundle: bundle.id, metrics });
      assert.ok(metrics.overflow <= 1 && metrics.horizontal <= 1, label);
      assert.equal(metrics.rows.length, bundle.covers.length);
      metrics.rows.forEach((row, i) => {
        assert.ok(Math.abs(row.img.width - row.img.height) < 1, label);
        assert.ok(row.rect.height >= 44, label);
        assert.ok(
          row.title.right <= row.rect.right + 1 && row.role.right <= row.rect.right + 1,
          label,
        );
        if (i) {
          assert.ok(row.rect.top >= metrics.rows[i - 1].rect.bottom, label);
          assert.ok(Math.abs(row.rect.left - metrics.rows[0].rect.left) < 1, label);
        }
      });
      if (['b-lancio', 'b-apertura'].includes(bundle.id) && [320, 820, 1371].includes(width)) {
        await card.locator('img').evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
        await page.screenshot({ path: `test-results/screens/v39-${bundle.id}-${width}.png` });
      }
      await page.getByRole('button', { name: 'Chiudi dettaglio', exact: true }).click();
    }
    // Inspect actual projected bounds through the entire animation, not just
    // the front card. A mask must contain both neighbours before it can fade them.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.locator('#bundle-controls [data-dot="1"]').click();
    const envelope = await page.evaluate(async () => {
      const slider = document.querySelector('#bundle-boards');
      const section = slider.closest('.bundle-opening');
      const failures = [];
      let frames = 0;
      do {
        await new Promise((r) => requestAnimationFrame(r));
        const box = slider.getBoundingClientRect();
        const parent = section.getBoundingClientRect();
        for (const card of slider.querySelectorAll('.carousel-card')) {
          if (card.style.visibility === 'hidden' || Number(card.style.opacity) < 0.001) continue;
          const rect = card.getBoundingClientRect();
          if (
            rect.top < box.top - 1 ||
            rect.bottom > box.bottom + 1 ||
            rect.top < parent.top - 1 ||
            rect.bottom > parent.bottom + 1
          )
            failures.push({
              index: card.dataset.slide,
              rect: rect.toJSON(),
              box: box.toJSON(),
              parent: parent.toJSON(),
            });
        }
        frames++;
      } while (slider.classList.contains('is-moving') && frames < 160);
      return { frames, failures };
    });
    assert.deepEqual(envelope.failures, [], JSON.stringify({ width, envelope }));
    assert.ok(envelope.frames < 160);
    fans.push({ width, frames: envelope.frames });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#bundle-controls [data-dot="0"]').click();
    if ([1440, 2048].includes(width)) {
      await page.evaluate(() => scrollTo(0, 0));
      await page
        .locator('#bundle-boards [data-nearby="true"] img')
        .evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
      await page.screenshot({ path: `test-results/screens/v39-bundle-fan-${width}.png` });
    }
  }
  // Catalogue colour belongs to the image; keyboard focus gets the same state.
  await page.setViewportSize({ width: 1440, height: 1000 });
  const tiles = page.locator('.service-card');
  await tiles.first().scrollIntoViewIfNeeded();
  await page.mouse.move(5, 5);
  await page.locator('body').click({ position: { x: 5, y: 5 } });
  const filter = (i) =>
    tiles
      .nth(i)
      .locator('img')
      .evaluate((e) => getComputedStyle(e).filter);
  assert.equal(await filter(0), 'grayscale(1)');
  await tiles.first().hover();
  assert.equal(await filter(0), 'grayscale(0)');
  assert.equal(await filter(1), 'grayscale(1)');
  await page.screenshot({ path: 'test-results/screens/v39-catalogue-hover.png' });
  await page.mouse.move(5, 5);
  await tiles.first().focus();
  await page.keyboard.press('Tab');
  assert.equal(await filter(1), 'grayscale(0)');
  assert.equal(await filter(0), 'grayscale(1)');
  await page.locator('[data-medium="physical"]').click();
  assert.equal(await filter(0), 'grayscale(1)');
  await tiles.first().hover();
  assert.equal(await filter(0), 'grayscale(0)');
  // Cover includes also stay in one column on wide screens.
  await page.evaluate(() => (location.hash = '#bundle/b-apertura'));
  await page.locator('#detail-dialog[open]').waitFor();
  const includes = await page
    .locator('.scene-result[data-active="true"] .bundle-services li')
    .evaluateAll((rows) => rows.map((e) => e.getBoundingClientRect().toJSON()));
  includes
    .slice(1)
    .forEach((rect, i) =>
      assert.ok(rect.top >= includes[i].bottom && Math.abs(rect.left - includes[i].left) < 1),
    );
  await page.locator('[data-scene-dot="1"]').click();
  await page.locator('.scene-components[data-active="true"] [data-component="insegne"]').click();
  await page.locator('[data-back-bundle="b-apertura"]').waitFor();
  await page.locator('[data-back-bundle="b-apertura"]').click();
  await page.locator('.scene-components[data-active="true"]').waitFor();
  await page.keyboard.press('Escape');
  // Real browser right-click events are cancelled for content, not editable fields.
  await page.evaluate(() =>
    document.addEventListener(
      'contextmenu',
      (e) => (window.lastMenuCancelled = e.defaultPrevented),
    ),
  );
  const heading = page.locator('#heading-web');
  await heading.click({ button: 'right' });
  assert.equal(await page.evaluate(() => window.lastMenuCancelled), true);
  await heading.dblclick();
  assert.equal(await page.evaluate(() => getSelection().toString()), '');
  await page.evaluate(() => (location.hash = '#levelup'));
  await page.locator('#lead-dialog[open]').waitFor();
  await page.locator('#lead-name').fill('Selezione consentita');
  await page.locator('#lead-name').click({ button: 'right' });
  assert.equal(await page.evaluate(() => window.lastMenuCancelled), false);
  await page.locator('#lead-name').focus();
  await page.keyboard.press('Control+a');
  assert.equal(
    await page
      .locator('#lead-name')
      .evaluate((e) => e.value.slice(e.selectionStart, e.selectionEnd)),
    'Selezione consentita',
  );
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    'test-results/bundle-polish-report.json',
    JSON.stringify(
      {
        result: 'PASS',
        cases: result,
        fanAnimations: fans,
        catalogueHover: true,
        keyboardColour: true,
        verticalIncludes: true,
        nestedNavigation: true,
        selectionPolicy: true,
        contextMenuPolicy: true,
        errors,
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({
      result: 'PASS',
      bundleCases: result.length,
      fanAnimations: fans.length,
      colour: true,
      selection: true,
      contextMenu: true,
      errors,
    }),
  );
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
