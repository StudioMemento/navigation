import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { readStudio } from '../src/software/read-glb.js';
import { CENTER } from '../src/scene/pose.mjs';

const root = new URL('../', import.meta.url);
const file = await readFile(new URL('studio/model/studio-web.glb', root));
const headerLength = file.readUInt32LE(12);
const document = JSON.parse(file.toString('utf8', 20, 20 + headerLength));
const bin = file.subarray(28 + headerLength);
const report = JSON.parse(await readFile(new URL('studio/quality/bake-report.json', root), 'utf8'));

test('every texture shipped inside the GLB is an actual embedded WebP from the approved bake', async () => {
  assert.equal(document.images.length, 6);
  assert.ok(document.extensionsRequired.includes('EXT_texture_webp'));
  assert.ok(document.extensionsRequired.includes('EXT_meshopt_compression'));
  for (const image of document.images) {
    const { byteOffset = 0, byteLength } = document.bufferViews[image.bufferView];
    const payload = bin.subarray(byteOffset, byteOffset + byteLength);
    assert.equal(image.mimeType, 'image/webp');
    assert.equal(payload.toString('ascii', 0, 4), 'RIFF');
    assert.equal(payload.toString('ascii', 8, 12), 'WEBP');
    assert.equal(
      createHash('sha256').update(payload).digest('hex'),
      report.distribution.textureSHA256[image.name],
    );
    if (['vertical', 'ultrawide', 'tv'].includes(image.name)) {
      const provided = await readFile(new URL('studio/pipeline/screens/' + image.name + '.webp', root));
      assert.ok(payload.equals(provided), image.name + ' must retain its approved crop and color');
    }
  }
  for (const material of document.materials) assert.ok(material.extensions.KHR_materials_unlit);
});

test('both renderers receive the complete cutaway and the same five displays', async () => {
  const { batches, images } = await readStudio(
    file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength),
    CENTER,
  );
  assert.equal(images.length, 6);
  assert.equal(batches.length, 6);
  assert.equal(
    batches.reduce((count, batch) => count + batch.indices.length / 3, 0),
    report.triangles,
  );
  for (const batch of batches) {
    assert.equal(batch.world.length / 4, batch.uv.length / 2);
    assert.ok(images[batch.image] && batch.world.every(Number.isFinite));
    assert.ok(batch.uv.every(Number.isFinite));
    assert.ok(batch.indices.every((i) => i < batch.world.length / 4));
  }
  const roles = JSON.parse(await readFile(new URL('studio/source/surface-roles.json', root), 'utf8'));
  assert.equal(roles.screens.length, 5);
});

test('the fallback depth buffer keeps the closest surface and the reveal clips unreached surfaces', async () => {
  const binary = await readFile(new URL('studio/model/raster.wasm', root));
  const { instance } = await WebAssembly.instantiate(binary);
  const { memory, drawBatch, clearFrame } = instance.exports;
  // A 4 x 4 framebuffer, two coincident triangles, one red and one blue texel.
  const color = 1024,
    depth = 1088,
    positions = 1152,
    uv = 1200,
    indices = 1224,
    level = 1236,
    texel = 1248;
  const pixel = () => new Uint8Array(memory.buffer, color, 4);
  const points = new Float32Array(memory.buffer, positions, 12);
  points.set([0, 0, 1, 0.5, 4, 0, 1, 0.5, 0, 4, 1, 0.5]);
  new Uint32Array(memory.buffer, indices, 3).set([0, 1, 2]);
  new Uint32Array(memory.buffer, level, 3).set([texel, 1, 1]);
  const draw = (sweep) => drawBatch(color, depth, 4, 4, positions, uv, indices, 3, level, 1, sweep);
  clearFrame(color, depth, 16);
  new Uint8Array(memory.buffer, texel, 4).set([245, 10, 35, 255]);
  draw(0.2);
  assert.equal(pixel()[3], 0);
  draw(8);
  assert.deepEqual([...pixel()], [245, 10, 35, 255]);
  points[2] = points[6] = points[10] = 0.25;
  new Uint8Array(memory.buffer, texel, 4).set([12, 36, 255, 255]);
  draw(8);
  assert.deepEqual([...pixel()], [245, 10, 35, 255]);
  points[2] = points[6] = points[10] = 2;
  draw(8);
  assert.deepEqual([...pixel()], [12, 36, 255, 255]);
});
