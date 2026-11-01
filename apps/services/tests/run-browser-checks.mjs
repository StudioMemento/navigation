import { spawnSync } from 'node:child_process';
for (const name of ['responsive', 'content', 'embedded', 'interactions']) {
  const result = spawnSync(process.execPath, [new URL(`./${name}.mjs`, import.meta.url).pathname], {
    stdio: 'inherit',
  });
  if (result.status !== 0) process.exit(result.status || 1);
}
