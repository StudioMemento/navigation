import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// START V27 navigation: standalone bundle and first-paint markup in site/index.html, from site/navigation (kit 12.1.0)
await import('./build-navigation.mjs');
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const excluded = new Set(['qa-overlay.html', 'LEGGIMI_VERCEL.txt', 'vercel.json']);
await cp(path.join(root, 'site'), output, {
  recursive: true,
  filter: source => !excluded.has(path.basename(source)) && !path.basename(source).startsWith('qa-'),
});
console.log('Memento Portfolio V43: dist pronta, asset inclusi.');
