import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url)), dist = path.join(root, 'dist');
const index = await readFile(path.join(dist, 'index.html'), 'utf8');
for (const match of index.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^" ]*)?"/g)) {
  const target = match[1]; if (/^(?:https?:|data:|mailto:)/.test(target)) continue;
  await access(path.join(dist, target.replace(/^\//, '')));
}
const projects = JSON.parse(await readFile(path.join(dist, 'projects.json'), 'utf8'));
let checked = 0;
async function assets(value) {
  if (typeof value === 'string' && value.startsWith('assets/')) { await access(path.join(dist, value)); checked++; }
  else if (Array.isArray(value)) for (const entry of value) await assets(entry);
  else if (value && typeof value === 'object') for (const entry of Object.values(value)) await assets(entry);
}
await assets(projects); await assets(JSON.parse(await readFile(path.join(dist, 'images.json'), 'utf8')));
for (const file of ['app.js', 'catalogue.js', 'coverflow.js', 'experience.js', 'gestures.js', 'media.js', 'project-layout.js', 'title-fit.js',
  'styles.css', 'vfx.css', 'vendor/model-viewer.min.js']) await access(path.join(dist, file));
// every relative module import of the site resolves
for (const file of ['app.js', 'catalogue.js', 'coverflow.js', 'experience.js', 'project-layout.js', 'media.js']) {
  const text = await readFile(path.join(dist, file), 'utf8');
  for (const match of text.matchAll(/(?:from\s*|import\()\s*["'](\.{1,2}\/[^"']+)["']/g)) await access(path.join(dist, path.dirname(file), match[1]));
}
assert(!(await readdir(dist)).some(file => file.startsWith('qa-')));
assert(!(await readdir(dist)).includes('structure.css'));
console.log(`PACKAGE_V43_VERIFIED: ${checked} local asset references, entry and modules present (navigation and effects: the site's).`);
