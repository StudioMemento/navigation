import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const excluded = new Set(['qa-overlay.html', 'LEGGIMI_VERCEL.txt', 'vercel.json']);
await cp(path.join(root, 'site'), output, {
  recursive: true,
  filter: source => !excluded.has(path.basename(source))
});
console.log('Memento Portfolio V41: dist pronta, asset inclusi.');
