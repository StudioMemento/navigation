import { cp, mkdir, rm } from 'node:fs/promises';
// Explicit production allowlist: documentation and tests never reach the browser.
await rm(new URL('./dist', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('./dist', import.meta.url), { recursive: true });
for (const entry of [
  'index.html',
  'styles.css',
  'bootstrap.js',
  'memento-services-host.js',
  'src',
  'assets',
]) {
  await cp(new URL(entry, import.meta.url), new URL(`dist/${entry}`, import.meta.url), {
    recursive: true,
  });
}
console.log('Built dist/ — native modules, no runtime dependencies.');
