import fs from 'node:fs';
import assert from 'node:assert/strict';
import { browser, server, origin } from './browser-fixture.mjs';
const context = await browser.newContext({
  viewport: { width: 820, height: 1180 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await context.route('**/*', (r) =>
  r.request().url().startsWith(origin) ? r.continue() : r.abort(),
);
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const stable = (frame) =>
  frame.evaluate(
    () =>
      new Promise((r) => {
        let last = scrollY,
          n = 0;
        const step = () => {
          n = Math.abs(last - scrollY) < 0.1 ? n + 1 : 0;
          last = scrollY;
          if (n > 3) r();
          else requestAnimationFrame(step);
        };
        step();
      }),
  );
try {
  await page.goto(origin + '/host?version=v38');
  const f = page.frames().find((f) => f.url().includes('/v38/'));
  const link = f.locator('[data-service="motion"]');
  await link.scrollIntoViewIfNeeded();
  await stable(f);
  const y = await f.evaluate(() => scrollY);
  await link.tap();
  await f.locator('#detail-dialog[open]').waitFor();
  for (const [width, height] of [
    [820, 1180],
    [1024, 1366],
    [768, 1024],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await f.waitForFunction(
      (w) =>
        Math.abs(
          Number(getComputedStyle(document.documentElement).getPropertyValue('--board-ratio')) -
            (1 + Math.max(0, Math.min(1, (w - 768) / 256))),
        ) < 0.0001,
      width,
    );
    const state = await f.evaluate(async () => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        await new Promise(requestAnimationFrame);
        points.push({
          y: scrollY,
          top: document.querySelector('main').getBoundingClientRect().top,
        });
      }
      const d = document.querySelector('#detail-dialog');
      return {
        points,
        blur: getComputedStyle(document.querySelector('#catalogue-viewport')).filter,
        animation: getComputedStyle(d).animationName,
        open: d.open,
      };
    });
    assert.equal(state.open, true);
    assert.equal(state.blur, 'blur(16px)');
    assert.equal(state.animation, 'none');
    assert.ok(
      state.points.every((p) => Math.abs(p.y - y) < 1 && Math.abs(p.top + y) < 1),
      JSON.stringify({ width, y, state }),
    );
  }
  await f.locator('[data-scene-dot="1"]').tap();
  await f.waitForFunction(
    () =>
      document.querySelector('#detail-dialog [data-slide="1"]').dataset.active === 'true' &&
      !document.querySelector('#detail-dialog .carousel').classList.contains('is-moving'),
  );
  // Exercise the carousel's pointer drag path, with actual animation enabled.
  const box = await f.locator('#detail-dialog [data-slide="1"]').boundingBox();
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.52);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.52, { steps: 12 });
  await page.mouse.up();
  await f.waitForFunction(
    () =>
      document.querySelector('#detail-dialog [data-slide="2"]').dataset.active === 'true' &&
      !document.querySelector('#detail-dialog .carousel').classList.contains('is-moving'),
  );
  await f.getByRole('button', { name: 'Chiudi dettaglio', exact: true }).tap();
  assert.ok(Math.abs((await f.evaluate(() => scrollY)) - y) < 1);
  const bundle = f.locator('#bundle-boards [data-slide="0"]');
  await bundle.scrollIntoViewIfNeeded();
  await stable(f);
  await f.locator('#bundle-controls [data-dot="0"]').tap();
  await f.waitForFunction(
    () => !document.querySelector('#bundle-boards').classList.contains('is-moving'),
  );
  await bundle.tap();
  await f.locator('[data-scene-dot="1"]').tap();
  await f.waitForFunction(
    () => !document.querySelector('#detail-dialog .carousel').classList.contains('is-moving'),
  );
  await f.locator('#detail-dialog [data-slide="1"] [data-component]').first().tap();
  await f.locator('[data-back-bundle]').tap();
  await page.keyboard.press('Escape');
  assert.equal(await f.locator('#detail-dialog').getAttribute('open'), null);
  await f.evaluate(() => {
    location.hash = '#levelup';
  });
  await f.locator('#lead-dialog[open]').waitFor();
  await f.locator('#lead-name').focus();
  await page.setViewportSize({ width: 390, height: 520 });
  await f.getByRole('button', { name: 'Chiudi LevelUp', exact: true }).tap();
  assert.equal(await f.evaluate(() => document.documentElement.dataset.overlayOpen), 'false');
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    'test-results/embedded-report.json',
    JSON.stringify(
      {
        result: 'PASS',
        embeddedResize: true,
        scrollRestored: true,
        tap: true,
        pointerDrag: true,
        nestedBundle: true,
        leadResize: true,
        errors,
      },
      null,
      2,
    ),
  );
  console.log(
    'PASS: embedded resize, scroll restore, tap, pointer drag, nested bundle, lead viewport resize.',
  );
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
