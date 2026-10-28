import { access, cp, mkdir, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Package the already-built catalogue; no external dependencies are needed.
const root = fileURLToPath(new URL('.', import.meta.url));
const output = join(root, 'dist');
await access(join(root, 'index.html'));
await access(join(root, 'assets'));
const entries = await readdir(root, { withFileTypes: true });
const webEntries = entries.filter(entry =>
  (entry.name === 'assets' && entry.isDirectory()) ||
  (entry.isFile() && /\.(html|css|js)$/.test(entry.name))
);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of webEntries) {
  await cp(join(root, entry.name), join(output, entry.name), { recursive: true });
}
console.log('MEMENTO V29: build completata. Sito statico pronto in dist/.');
