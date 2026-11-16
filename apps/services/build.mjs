import { cp, mkdir, rm } from 'node:fs/promises';
// Explicit production allowlist: documentation, tests and the VFX sources never reach the browser.
await rm(new URL('./dist', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('./dist', import.meta.url), { recursive: true });
for (const entry of [
  'index.html',
  'styles.css',
  'bootstrap.js',
  'memento-services-host.js',
  'navigation',
  'src',
  'assets',
]) {
  await cp(new URL(entry, import.meta.url), new URL(`dist/${entry}`, import.meta.url), {
    recursive: true,
  });
}
// Memento VFX (START V27): engine and Ghost Fibers background, prebuilt from vfx/ into public/vfx/.
await cp(new URL('public/vfx', import.meta.url), new URL('dist/vfx', import.meta.url), { recursive: true });
console.log('Built dist/ — native modules and the prebuilt VFX engine, no runtime dependencies.');
