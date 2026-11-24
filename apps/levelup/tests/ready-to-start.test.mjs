import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, rm, readFile, writeFile, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { verifyAssets } from '../scripts/verify.mjs';

async function withCopy(run) {
  const temporary = await mkdtemp(join(tmpdir(), 'levelup-start-'));
  try {
    await cp(resolve('dist'), temporary, { recursive: true });
    await verifyAssets(temporary);
    await run(temporary);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

test('Ready to start embeds the published visualfx page through the wrapper, with no local copy of the effect', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  const embed = await readFile('dist/ready-to-start/embed.html', 'utf8');
  assert.match(html, /<iframe class="start-embed__view" id="start-frame"[^>]+data-src="ready-to-start\/embed\.html"[^>]+tabindex="-1"[^>]+aria-hidden="true"/);
  // The plain CTA stays underneath: a real link to Start in the top window.
  assert.match(html, /<a class="start-embed__card" id="contact-link" href="https:\/\/mementostudio\.it\/start\?from=levelup" target="_top"/);
  assert.match(embed, /<iframe src="https:\/\/visualfx\.vercel\.app\/"/);
  assert.match(embed, /http-equiv="Content-Security-Policy" content="frame-src https:\/\/visualfx\.vercel\.app"/);
  assert.match(embed, /securitypolicyviolation/);
  // The policy lives only in the wrapper: the demos embedded by the page are not restricted.
  assert(!html.includes('Content-Security-Policy'));
  for (const gone of ['ready-to-start/ready-to-start.js', 'ready-to-start/renderer.js', 'ready-to-start/assets/sparkle-idle.svg'])
    await assert.rejects(access(join('dist', gone)), /ENOENT/);
  assert(!html.includes('ready-to-start/ready-to-start.css'));
});

test('A wrapper that no longer embeds visualfx fails the production asset check', () => withCopy(async temporary => {
  const file = join(temporary, 'ready-to-start/embed.html');
  await writeFile(file, (await readFile(file, 'utf8')).replace('src="https://visualfx.vercel.app/"', 'src="about:blank"'));
  await assert.rejects(verifyAssets(temporary), /does not embed visualfx/);
}));

