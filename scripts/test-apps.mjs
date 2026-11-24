// R19: the tests of the five pages, from their folders. Pages with dependencies install them first (npm ci); LevelUp
// tests its build. The site's own tests are `npm test`; together: `npm run test:all`.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { apps } from './sections.mjs';

const plan = {
  studio: [['npm', 'ci', '--no-audit', '--no-fund'], ['npm', 'test']],
  services: [['npm', 'test']],
  projects: [['npm', 'test']],
  levelup: [['npm', 'run', 'build'], ['npm', 'test']],
  start: [['npm', 'ci', '--no-audit', '--no-fund'], ['npm', 'test']],
};
const only = process.argv.slice(2);
const failed = [];
for (const [slug, steps] of Object.entries(plan)) {
  if (only.length && !only.includes(slug)) continue;
  const cwd = join(apps, slug);
  if (!existsSync(cwd)) { failed.push(slug); continue; }
  console.log(`\n=== ${slug}`);
  try { for (const [command, ...args] of steps) execFileSync(command, args, { cwd, stdio: 'inherit' }); }
  catch { failed.push(slug); }
}
if (failed.length) { console.error('\nFailed: ' + failed.join(', ')); process.exit(1); }
console.log('\nAll pages passed.');
