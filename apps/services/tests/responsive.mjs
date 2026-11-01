import fs from 'node:fs';
import assert from 'node:assert/strict';
import { browser, server, origin } from './browser-fixture.mjs';
const context = await browser.newContext({
  viewport: { width: 500, height: 892 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});
await context.route('**/*', (r) =>
  r.request().url().startsWith(origin) ? r.continue() : r.abort(),
);
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const results = [];
const rect = (e) => e.getBoundingClientRect().toJSON();
try {
  await page.goto(origin + '/v38/#servizio/motion');
  await page.locator('#detail-dialog[open]').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.locator('[data-scene-dot="1"]').click();
  for (const [width, height] of [
    [320, 740],
    [500, 892],
    [600, 1000],
    [767, 1294],
    [768, 1294],
    [820, 1180],
    [900, 1200],
    [1023, 1366],
    [1024, 1366],
    [1100, 800],
    [1440, 900],
    [2048, 806],
    [667, 375],
    [768, 375],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))),
        ),
    );
    const data = await page.evaluate(() => {
      const rect = (e) => e.getBoundingClientRect().toJSON();
      const card = document.querySelector('#detail-dialog [data-active="true"]');
      const image = card.querySelector('.item-master-art img');
      const title = card.querySelector('.item-master-title'),
        copy = card.querySelector('.item-master-copy');
      return {
        width: innerWidth,
        height: innerHeight,
        ratio: getComputedStyle(document.documentElement).getPropertyValue('--board-ratio'),
        card: rect(card),
        photo: rect(image),
        fit: getComputedStyle(image).objectFit,
        mask: getComputedStyle(image).maskImage,
        title: rect(title),
        titleSize: getComputedStyle(title).fontSize,
        titleScroll: title.scrollWidth,
        titleClient: title.clientWidth,
        copy: rect(copy),
        close: rect(document.querySelector('#detail-dialog .dialog-close')),
        dots: rect(document.querySelector('.service-deck-controls')),
        scrollWidth: document.documentElement.scrollWidth,
      };
    });
    assert.ok(
      Math.abs(data.card.width / data.card.height - Number(data.ratio)) < 0.01,
      JSON.stringify(data),
    );
    assert.ok(data.close.y >= 0 && data.dots.bottom <= height, JSON.stringify(data));
    // Gradient lettering deliberately overhangs its text box by .065em.
    assert.ok(data.title.x + data.titleScroll <= data.card.right - 8, JSON.stringify(data));
    assert.ok(data.title.y >= data.copy.bottom, JSON.stringify(data));
    assert.ok(data.scrollWidth <= width, JSON.stringify(data));
    assert.equal(data.fit, 'cover');
    assert.notEqual(data.mask, 'none');
    results.push(data);
    if ([500, 767, 768, 820, 1024, 1440].includes(width) && height > 600) {
      await page
        .locator('#detail-dialog [data-active="true"] .item-master-art img')
        .evaluate((img) => img.decode());
      await page.screenshot({ path: `test-results/screens/v38-motion-${width}.png` });
    }
  }
  // Resize across the exact thresholds while the same detail stays open.
  for (const height of [375, 1000]) {
    let previous;
    for (const width of [
      499, 500, 501, 599, 600, 601, 766, 767, 768, 769, 1022, 1023, 1024, 1025, 1099, 1100, 1101,
    ]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(
        () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
      );
      const size = await page
        .locator('#detail-dialog [data-active="true"]')
        .evaluate((e) => ({ w: e.offsetWidth, h: e.offsetHeight }));
      if (previous && width - previous.width === 1) {
        assert.ok(
          Math.abs(size.w - previous.w) <= 3,
          JSON.stringify({ width, height, size, previous }),
        );
        assert.ok(
          Math.abs(size.h - previous.h) <= 3,
          JSON.stringify({ width, height, size, previous }),
        );
      }
      previous = { width, ...size };
    }
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    'test-results/responsive-report.json',
    JSON.stringify({ result: 'PASS', checks: results, errors }, null, 2),
  );
  console.log(
    JSON.stringify({ result: 'PASS', viewports: results.length, thresholdSizes: 34, errors }),
  );
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
