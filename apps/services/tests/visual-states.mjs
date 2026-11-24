import fs from 'node:fs';
import assert from 'node:assert/strict';
import { browser, server, origin } from './browser-fixture.mjs';

const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const errors = [];
const failed = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('response', (r) => {
  if (r.status() >= 400) failed.push(r.url());
});
const transparent = 'rgba(0, 0, 0, 0)';
const textStyle = (el) => {
  const css = getComputedStyle(el);
  return { color: css.color, fill: css.webkitTextFillColor, background: css.backgroundImage };
};
const checkSlides = async (slider) => {
  const cards = await slider.locator('.carousel-card').evaluateAll((cards) =>
    cards.map((card) => ({
      active: card.dataset.active === 'true',
      filter: getComputedStyle(card).filter,
    })),
  );
  assert.equal(cards.filter((c) => c.active).length, 1);
  cards.forEach((card) => assert.equal(card.filter, card.active ? 'grayscale(0)' : 'grayscale(1)'));
};
async function assertNoSelection(targetPage, targetFrame, selector) {
  const target = targetFrame.locator(selector);
  await target.click();
  await targetPage.keyboard.press('Control+a');
  assert.equal(await targetFrame.evaluate(() => getSelection().toString()), '');
  await target.dblclick();
  assert.equal((await targetFrame.evaluate(() => getSelection().toString())).trim(), '');
  const box = await target.boundingBox();
  await targetPage.mouse.move(box.x + 5, box.y + 4);
  await targetPage.mouse.down();
  await targetPage.mouse.move(box.x + 5, box.y + Math.max(40, box.height - 4), { steps: 10 });
  await targetPage.mouse.up();
  assert.equal((await targetFrame.evaluate(() => getSelection().toString())).trim(), '');
}
try {
  await page.goto(origin + '/v40/');
  await page.locator('#web').waitFor();
  await page.evaluate(() => document.fonts.ready);
  const heading = await page.locator('.catalogue-heading h2').evaluate(textStyle);
  assert.ok(heading.background.includes('linear-gradient'));
  assert.equal(heading.fill, transparent);
  const tile = page.locator('[data-service="sito"]');
  const title = tile.locator('.service-title');
  await tile.scrollIntoViewIfNeeded();
  await page.mouse.move(5, 5);
  assert.equal((await title.evaluate(textStyle)).fill, 'rgb(243, 240, 234)');
  await tile.hover();
  assert.equal((await title.evaluate(textStyle)).fill, transparent);
  assert.equal(
    await tile.locator('img').evaluate((e) => getComputedStyle(e).filter),
    'grayscale(0)',
  );
  await page.mouse.move(5, 5);
  await tile.focus();
  await page.keyboard.press('Tab');
  const focusedTitle = page.locator('.service-card:focus-visible .service-title');
  assert.equal((await focusedTitle.evaluate(textStyle)).fill, transparent);
  assert.equal((await title.evaluate(textStyle)).fill, 'rgb(243, 240, 234)');
  // Front and side cards use the same rule on the page and in every popup.
  for (const id of [
    'bundle-boards',
    'carousel-web',
    'carousel-3d',
    'carousel-video',
    'carousel-visual',
    'carousel-design',
    'carousel-branding',
  ]) {
    const slider = page.locator('#' + id);
    await checkSlides(slider);
    await slider.locator('[data-active="true"]').focus();
    await page.keyboard.press('ArrowRight');
    await checkSlides(slider);
  }
  await page.locator('#web').scrollIntoViewIfNeeded();
  await page
    .locator('#carousel-web [data-nearby="true"] img')
    .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
  await page.screenshot({ path: 'test-results/screens/v40-active-slide-colour.png' });

  // Capture every frame of an unreduced animation. Inactive cards must never
  // regain colour, including the blurred duplicate behind each title.
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#carousel-web [data-active="true"]').focus();
  await page.keyboard.press('ArrowRight');
  const animation = await page.evaluate(async () => {
    const slider = document.querySelector('#carousel-web');
    let frames = 0;
    const leaks = [];
    do {
      await new Promise((r) => requestAnimationFrame(r));
      for (const card of slider.querySelectorAll('[data-active="false"]'))
        if (getComputedStyle(card).filter !== 'grayscale(1)') leaks.push(card.dataset.slide);
      frames++;
    } while (slider.classList.contains('is-moving') && frames < 160);
    return { frames, leaks };
  });
  assert.deepEqual(animation.leaks, []);
  assert.ok(animation.frames < 160);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['#bundle/b-lancio', '#servizio/sito']) {
    await page.evaluate((route) => (location.hash = route), route);
    await page.locator('#detail-dialog[open]').waitFor();
    for (let i = 0; i < 4; i++) {
      await page.locator(`[data-scene-dot="${i}"]`).click();
      await checkSlides(page.locator('#detail-dialog .carousel'));
    }
    await page.locator('[data-scene-dot="1"]').click();
    const copy = route.includes('bundle')
      ? '.scene-components[data-active="true"] .bundle-scope'
      : '.scene-outputs[data-active="true"] .item-master-copy';
    await assertNoSelection(page, page, copy);
    assert.equal(
      await page.locator('#detail-dialog').evaluate((e) => getComputedStyle(e).userSelect),
      'none',
    );
    await page.keyboard.press('Escape');
  }
  await page.goto(origin + '/host');
  const frame = page.frames().find((f) => f !== page.mainFrame());
  await frame.locator('#web').waitFor();
  await frame.evaluate(() => (location.hash = '#bundle/b-lancio'));
  await frame.locator('#detail-dialog[open]').waitFor();
  await frame.locator('[data-scene-dot="1"]').click();
  await assertNoSelection(page, frame, '.scene-components[data-active="true"] .bundle-scope');

  // Editing and copying the draft remain native even though the dialog itself
  // is non-selectable. A regression here would break the contact form.
  await frame.evaluate(() => (location.hash = '#levelup'));
  await frame.locator('#lead-dialog[open]').waitFor();
  await frame.locator('#lead-name').fill('QA V40');
  await page.keyboard.press('Control+a');
  assert.equal(
    await frame
      .locator('#lead-name')
      .evaluate((e) => e.value.slice(e.selectionStart, e.selectionEnd)),
    'QA V40',
  );
  await frame.locator('#lead-email').fill('qa@example.test');
  await frame.locator('#lead-goal').selectOption({ label: 'Esplorare un’idea insieme' });
  await frame.locator('#lead-note').fill('Verifica locale, nessun invio.');
  await frame.getByRole('button', { name: 'Prepara email' }).click();
  await frame.locator('#request-preview').click();
  await page.keyboard.press('Control+a');
  assert.equal(
    (await frame.evaluate(() => getSelection().toString())).trim(),
    (await frame.locator('#request-preview').innerText()).trim(),
  );

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  await mobile.goto(origin + '/v40/#bundle/b-lancio');
  await mobile.locator('#detail-dialog[open]').waitFor();
  await mobile.locator('[data-scene-dot="1"]').tap();
  const touchTarget = await mobile
    .locator('.scene-components[data-active="true"] .bundle-scope')
    .boundingBox();
  const cdp = await mobile.context().newCDPSession(mobile);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: touchTarget.x + 15, y: touchTarget.y + 5 }],
  });
  await new Promise((r) => setTimeout(r, 650));
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  assert.equal((await mobile.evaluate(() => getSelection().toString())).trim(), '');
  await mobile.locator('.scene-components[data-active="true"] [data-component="landing"]').tap();
  await mobile.locator('[data-back-bundle="b-lancio"]').waitFor();
  await mobile.locator('[data-back-bundle="b-lancio"]').tap();
  await mobile.locator('.scene-components[data-active="true"]').waitFor();
  await mobile.close();
  assert.deepEqual(errors, []);
  assert.deepEqual(failed, []);
  const report = {
    result: 'PASS',
    headingGradient: true,
    catalogueTitleStates: true,
    carousels: 7,
    popupSlides: 8,
    animationFrames: animation.frames,
    inactiveColourLeaks: 0,
    modalSelectionBlocked: true,
    embeddedSelectionBlocked: true,
    touchLongPress: true,
    touchNestedNavigation: true,
    formEditing: true,
    draftSelection: true,
    errors,
    failed,
  };
  fs.writeFileSync('test-results/visual-states-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
