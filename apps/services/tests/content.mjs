import fs from 'node:fs';
import assert from 'node:assert/strict';
import { browser, server, origin } from './browser-fixture.mjs';
const context = await browser.newContext({
  viewport: { width: 820, height: 1180 },
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
let boards = 0;
try {
  await page.goto(origin + '/v38/');
  await page.locator('#web').waitFor();
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 390, 500, 600, 767, 768, 820, 900, 1023, 1024, 1100, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForFunction(
      (w) =>
        document.documentElement.clientWidth === w &&
        Math.abs(
          Number(getComputedStyle(document.documentElement).getPropertyValue('--board-ratio')) -
            (1 + Math.max(0, Math.min(1, (w - 768) / 256))),
        ) < 0.0001,
      width,
    );
    await page.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))),
        ),
    );
    const state = await page.evaluate(() => {
      const rect = (e) => e.getBoundingClientRect().toJSON();
      const card = (e) => ({
        class: e.className,
        rect: rect(e),
        styleWidth: getComputedStyle(e).width,
        inline: e.getAttribute('style'),
        copy: rect(e.querySelector('.slide-description') || e.querySelector('.bundle-summary')),
        title: rect(e.querySelector('.slide-title') || e.querySelector('.bundle-title')),
      });
      const cards = [
        ...document.querySelectorAll(
          '.category-section .carousel-card[data-active="true"],#bundle-boards .carousel-card[data-active="true"]',
        ),
      ].map(card);
      const grid = document.querySelector('.catalogue-page .service-grid');
      const tiles = [...grid.children].map(rect);
      const columns = tiles.filter((x) => Math.abs(x.top - tiles[0].top) < 1).length;
      return {
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        cards,
        columns,
        grid: rect(grid),
        start: rect(document.querySelector('.start-action')),
        startTitle: rect(document.querySelector('.start-action h2')),
        arrow: rect(document.querySelector('.start-action>.chevron')),
        headings: [...document.querySelectorAll('.category-heading h2')].map((e) => ({
          rect: rect(e),
          scroll: e.scrollWidth,
          client: e.clientWidth,
        })),
      };
    });
    assert.ok(state.scrollWidth <= width, JSON.stringify(state));
    for (const c of state.cards) {
      assert.ok(c.rect.left >= -1 && c.rect.right <= width + 1, JSON.stringify({ width, c }));
      assert.ok(c.copy.bottom <= c.title.top + 1, JSON.stringify({ width, c }));
    }
    for (const h of state.headings)
      assert.ok(h.scroll <= h.client + 1, JSON.stringify({ width, h }));
    assert.ok(state.startTitle.right < state.arrow.left, JSON.stringify(state));
    assert.ok(state.columns >= 2 && state.columns <= 5, JSON.stringify(state));
    assert.ok(Math.abs(state.grid.x - state.cards[0].rect.x) < 1, JSON.stringify(state));
    results.push({ width, columns: state.columns, card: state.cards[0].rect.width });
    if ([500, 820, 1440].includes(width)) {
      await page.locator('#web').scrollIntoViewIfNeeded();
      await page
        .locator('#web .carousel-card[data-active="true"] .slide-visual')
        .evaluate((img) => img.decode());
      await page.screenshot({ path: `test-results/screens/v38-page-${width}.png` });
    }
  }
  const { catalogue } = await import('../src/content.js');
  const ids = [
    ...catalogue.services.map((item) => ['servizio', item.id]),
    ...catalogue.bundles.map((item) => ['bundle', item.id]),
  ];
  for (const width of [320, 820]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [kind, id] of ids) {
      await page.evaluate((hash) => {
        location.hash = hash;
      }, `#${kind}/${id}`);
      await page.waitForFunction(
        (hash) =>
          location.hash === hash &&
          document.querySelector('#detail-dialog[open]') &&
          document.querySelector('#detail-dialog .service-scene[data-active="true"]'),
        `#${kind}/${id}`,
      );
      for (let i = 0; i < 4; i++) {
        await page.locator(`[data-scene-dot="${i}"]`).click();
        await page.waitForFunction(
          (i) =>
            document.querySelector('#detail-dialog .service-scene[data-active="true"]')?.dataset
              .slide === String(i) &&
            !document.querySelector('#detail-dialog .carousel').classList.contains('is-moving'),
          i,
        );
        await page.evaluate(
          () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
        );
        const state = await page
          .locator('#detail-dialog .service-scene[data-active="true"]')
          .evaluate((card) => {
            const r = (e) => e.getBoundingClientRect().toJSON();
            const body = card.querySelector('.popup-card-body'),
              scroll = card.querySelector('.popup-card-scroll');
            const title = card.querySelector('.item-master-title'),
              copy = card.querySelector('.item-master-copy,.bundle-components-content');
            const cta = card.querySelector('.item-master-cta');
            return {
              card: r(card),
              index: card.dataset.slide,
              transform: card.style.transform,
              pageScrollX: scrollX,
              body: r(body),
              title: r(title),
              titleInk: title.scrollWidth,
              copy: r(copy),
              cta: cta ? r(cta) : null,
              scrollWidth: scroll.scrollWidth,
              clientWidth: scroll.clientWidth,
              scrollHeight: scroll.scrollHeight,
              clientHeight: scroll.clientHeight,
            };
          });
        const detail = JSON.stringify({ width, id, i, state });
        assert.ok(state.card.left >= -1 && state.card.right <= width + 1, detail);
        assert.ok(state.scrollWidth <= state.clientWidth + 1, detail);
        assert.ok(state.title.top >= state.copy.bottom, detail);
        assert.ok(state.title.x + state.titleInk <= state.card.right - 8, detail);
        if (state.cta) assert.ok(state.cta.top >= state.title.bottom, detail);
        if (state.scrollHeight > state.clientHeight + 1) {
          await page
            .locator('#detail-dialog .service-scene[data-active="true"] .item-master-title')
            .scrollIntoViewIfNeeded();
          const visible = await page
            .locator('#detail-dialog .service-scene[data-active="true"]')
            .evaluate((card) => {
              const t = card.querySelector('.item-master-title').getBoundingClientRect(),
                c = card.getBoundingClientRect();
              return t.top >= c.top && t.bottom <= c.bottom;
            });
          assert.equal(visible, true, detail);
        }
        boards++;
      }
      await page.getByRole('button', { name: 'Chiudi dettaglio', exact: true }).click();
    }
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    'test-results/content-report.json',
    JSON.stringify({ result: 'PASS', page: results, boards, items: ids.length, errors }, null, 2),
  );
  console.log(
    JSON.stringify({
      result: 'PASS',
      pageWidths: results.length,
      boards,
      items: ids.length,
      errors,
    }),
  );
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
