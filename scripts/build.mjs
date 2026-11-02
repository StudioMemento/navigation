import { cp, mkdir, readdir, readFile, rm, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'public');
const output = join(root, 'dist');
const required = [
  'index.html', 'style.css', 'src/app.mjs', 'src/motion.mjs',
  'src/atmosphere.mjs', 'src/telemetry.mjs', 'src/page-bridge.js',
  'src/page-embed.css', 'assets/world.glb', 'assets/scene.json',
  'assets/environment.hdr', 'assets/InterVariable.woff2',
  'assets/home.svg', 'assets/left.svg', 'assets/right.svg', 'assets/down.svg',
  'vendor/three.module.js', 'vendor/three.core.js', 'vendor/LICENSE-THREE.txt',
  'vendor/loaders/GLTFLoader.js', 'vendor/loaders/DRACOLoader.js',
  'vendor/loaders/HDRLoader.js', 'vendor/draco/draco_wasm_wrapper.js',
  'vendor/draco/draco_decoder.wasm', 'catalog/index.html', 'catalog/bridge.js',
  'pages/projects/index.html', 'pages/levelup/index.html', 'pages/start/index.html'
];
for (const name of required) {
  const info = await stat(join(source, name)).catch(() => null);
  if (!info?.isFile() || !info.size) throw new Error(`Risorsa necessaria assente: public/${name}`);
}
const scene = JSON.parse(await readFile(join(source, 'assets/scene.json'), 'utf8'));
if (!scene.nodes?.length || !scene.cameras?.orbit?.samples?.length) {
  throw new Error('Il pacchetto non contiene geometrie e camere della scena.');
}
const config = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
if (config.outputDirectory !== 'dist') throw new Error('Output Vercel non allineato alla build.');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
async function count(directory) {
  let files = 0, bytes = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      const child = await count(path); files += child.files; bytes += child.bytes;
    } else { files++; bytes += (await stat(path)).size; }
  }
  return { files, bytes };
}
console.log(JSON.stringify({ status: 'ready', output: 'dist', ...await count(output), sceneNodes: scene.nodes.length }));
