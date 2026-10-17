import { access, cp, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public');
const output = path.join(root, 'dist');

for (const name of [
  'index.html', 'catalogo.css', 'catalogo.js', 'catalogo-data.js',
  'catalogo-editorial.js', 'catalogo-carousel.js',
  'assets/fonts/InterVariable.woff2', 'assets/icons/caret-right.svg'
]) {
  await access(path.join(source, name));
}

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });

let count = 0;
let bytes = 0;
async function measure(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await measure(filename);
    else if (entry.isFile()) { count++; bytes += (await stat(filename)).size; }
  }
}
await measure(output);
console.log(`Build completata: ${count} file in dist (${(bytes / 1024 / 1024).toFixed(2)} MiB).`);
