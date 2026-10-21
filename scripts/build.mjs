import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'favicon.svg', 'src', 'content', 'assets', 'models', 'vendor', 'sockets']) {
  await cp(join(root, name), join(output, name), { recursive: true });
}
console.log('Static production build written to dist/');
