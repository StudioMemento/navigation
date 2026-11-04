import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { verifyAssets } from '../scripts/verify.mjs';

test('A missing nested cinematic dependency fails the production asset check', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'levelup-cinematic-'));
  try {
    await cp(resolve('dist'), temporary, { recursive: true });
    await verifyAssets(temporary);
    await rm(join(temporary, 'ready-to-start/camera.js'));
    await assert.rejects(verifyAssets(temporary), /ENOENT/);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});
