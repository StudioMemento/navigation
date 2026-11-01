import { browser, server, origin } from './browser-fixture.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: 'reduce',
});
const errors = [],
  failed = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('response', (r) => {
  if (r.status() >= 400) failed.push({ url: r.url(), status: r.status() });
});
try {
  await page.goto(origin + '/v39/');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('[data-medium="physical"]').click();
  assert.equal(await page.locator('.service-card').count(), 14);
  await page.locator('[data-medium="digital"]').click();
  assert.equal(await page.locator('.service-card').count(), 30);
  const card = page.locator('[data-service="motion"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'detail-title');
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const focus = await page.evaluate(() => ({
      tag: document.activeElement.tagName,
      id: document.activeElement.id,
      inside: !!document.activeElement.closest('#detail-dialog'),
      open: document.querySelector('#detail-dialog').open,
    }));
    assert.ok(focus.inside || (focus.tag === 'BODY' && focus.open));
  }
  await page.locator('[data-scene-dot="0"]').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('[data-scene-dot="1"]').getAttribute('aria-pressed'), 'true');
  await page.keyboard.press('End');
  assert.equal(await page.locator('[data-scene-dot="3"]').getAttribute('aria-pressed'), 'true');
  assert.equal(
    await page.locator('.scene-start[data-active="true"] .item-master-cta').getAttribute('href'),
    'https://mementostudio.it/start',
  );
  await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(() => document.activeElement.dataset.service), 'motion');
  await card.click();
  await page.mouse.click(12, 12);
  assert.equal(await page.locator('#detail-dialog').getAttribute('open'), null);
  // Existing bookmark aliases and direct routes remain compatible.
  for (const hash of ['#video/motion', '#grafica/motion', '#servizio/motion']) {
    await page.evaluate((hash) => {
      location.hash = hash;
    }, hash);
    await page.locator('#detail-dialog[open]').waitFor();
    assert.equal(await page.locator('#detail-title').innerText(), 'Motion\nGraphics.');
    await page.keyboard.press('Escape');
  }
  await page.evaluate(() => {
    location.hash = '#levelup';
  });
  await page.locator('#lead-dialog[open]').waitFor();
  await page.locator('#lead-goal').selectOption({ label: 'Esplorare un’idea insieme' });
  await page.locator('#lead-name').fill('QA Test');
  await page.locator('#lead-email').fill('qa@example.test');
  await page.locator('#lead-note').fill('Verifica locale. Nessun invio.');
  await page.getByRole('button', { name: 'Prepara email' }).click();
  assert.ok((await page.locator('#request-preview').innerText()).includes('QA Test'));
  assert.ok(
    (await page.locator('#email-link').getAttribute('href')).startsWith(
      'mailto:info@mementostudio.it?',
    ),
  );
  await page.getByRole('button', { name: 'Modifica richiesta' }).click();
  assert.equal(await page.locator('#lead-name').inputValue(), 'QA Test');
  await page.keyboard.press('Escape');
  // A reduced-motion request must not leave residual CSS animation.
  await page.locator('#start-link').scrollIntoViewIfNeeded();
  const style = await page.locator('#start-link').evaluate((e) => ({
    duration: getComputedStyle(e).transitionDuration,
    outline: getComputedStyle(e).outlineStyle,
  }));
  assert.equal(style.duration, '0s');
  await page.locator('.start-sparkle').evaluate((image) => image.decode());
  await page.locator('#start-link').focus();
  await page.screenshot({ path: 'test-results/v39-start-mobile.png' });
  await page.emulateMedia({ forcedColors: 'active' });
  const forced = await page.locator('#start-link').evaluate((e) => ({
    text: getComputedStyle(e.querySelector('h2')).color,
    bg: getComputedStyle(e).backgroundColor,
  }));
  assert.notEqual(forced.text, forced.bg);
  assert.deepEqual(errors, []);
  assert.deepEqual(failed, []);
  fs.writeFileSync(
    'test-results/interactions-report.json',
    JSON.stringify(
      {
        result: 'PASS',
        keyboard: true,
        focusTrap: true,
        focusReturn: true,
        backdrop: true,
        legacyRoutes: true,
        filters: true,
        emailDraft: true,
        reducedMotion: true,
        forcedColors: true,
        errors,
        failed,
      },
      null,
      2,
    ),
  );
  console.log(
    'PASS: keyboard, focus, backdrop, legacy routes, filters, email draft, motion preferences.',
  );
} finally {
  await browser.close();
  server.close();
}
