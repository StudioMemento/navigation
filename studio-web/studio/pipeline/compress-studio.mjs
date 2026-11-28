/** Offline-only dependency. The viewer needs only the matching Three MeshoptDecoder. */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import { stat, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const [input, output, reportPath] = process.argv.slice(2);
if (!input || !output) throw new Error('Usage: node compress-studio.mjs raw.glb studio.glb [bake-report.json]');
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'meshopt.encoder': MeshoptEncoder,
  'meshopt.decoder': MeshoptDecoder,
});
const doc = await io.read(input);
const textureDigests = document => Object.fromEntries(document.getRoot().listTextures().map(texture => [texture.getName(), createHash('sha256').update(texture.getImage()).digest('hex')]));
const originalImages = textureDigests(doc);
await doc.transform(
  dedup({ propertyTypes: ['Texture', 'Accessor'] }),
  meshopt({ encoder: MeshoptEncoder, level: 'high', quantizePosition: 16, quantizeTexcoord: 16 }),
);
await io.write(output, doc);
const check = await io.read(output);
const textures = check.getRoot().listTextures();
const packedImages = textureDigests(check);
if (Object.keys(originalImages).length !== Object.keys(packedImages).length || Object.entries(originalImages).some(([name, hash]) => packedImages[name] !== hash)) throw new Error('Texture bytes changed during geometry packing');
if (!textures.every(tex => tex.getMimeType() === 'image/webp')) throw new Error('Final appearance requires WebP for all textures.');
const meshes = check.getRoot().listMeshes();
const counts = meshes.flatMap(mesh => mesh.listPrimitives().map(p => p.getIndices().getCount() / 3));
if (counts.some(t => !Number.isInteger(t) || t <= 0)) throw new Error('Invalid compressed topology');
const summary = { meshes: meshes.length, primitives: counts.length, triangles: counts.reduce((x, y) => x + y, 0), bytes: (await stat(output)).size, extensions: check.getRoot().listExtensionsRequired().map(e => e.extensionName) };
console.log(JSON.stringify(summary));
if (reportPath) {
  const report = JSON.parse(await readFile(reportPath, 'utf8'));
  if (summary.triangles !== report.triangles) throw new Error('Topology changed on compression');
  report.distribution = { file: output.split('/').pop(), ...summary, textureSHA256: packedImages }; 
  await writeFile(reportPath, JSON.stringify(report, null, 2));
}
