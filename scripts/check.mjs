import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = async file => JSON.parse(await readFile(join(root, file), 'utf8'));
const catalog = await read('content/catalog.json');
const projects = await read('content/projects.json');
const demos = await read('content/experiences.json');
const assets = new Set();
const add = path => assets.add(path);
for (const item of [...catalog.services, ...catalog.bundles]) add(`sockets/servizi/assets/${item.image}.webp`);
for (const project of projects) {
  for (const key of ['cover', 'hero', 'portrait', 'thumbnail']) if (project[key]) add(`sockets/portfolio/${project[key]}`);
  for (const set of [project, ...(project.variants || [])]) {
    if (set.hero) add(`sockets/portfolio/${set.hero}`);
    for (const image of set.gallery || set.images || []) {
      add(`sockets/portfolio/${image.src}`);
      if (image.thumb) add(`sockets/portfolio/${image.thumb}`);
    }
  }
}
for (const demo of demos) add(`sockets/level-up/${demo.image || `assets/boards/${demo.id}.webp`}`);
for (const id of ['memento', 'studio', 'servizi', 'portfolio', 'level-up', 'start']) {
  add(`assets/dioramas/${id}.webp`); add(`models/${id}-mobile.glb`);
}
let failures = 0;
for (const asset of assets) {
  try { if (!(await stat(join(root, asset))).size) throw new Error('Empty file'); }
  catch { failures++; console.error(`Missing or empty: ${asset}`); }
}
console.log(`${assets.size} content assets checked; ${failures} failures.`);
process.exitCode = failures ? 1 : 0;
