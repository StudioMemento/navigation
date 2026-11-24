// R19: the five pages live in this repository (apps/<slug>), with their own history. Each one is built from a copy of
// its folder (as a fresh checkout would have it: no node_modules, no build output of its own), then published under
// /<slug>/ with the native HTML of the site (scripts/native-page.mjs). No pinned commits and no patches any more: a
// change to any page is a commit here, and one deploy publishes all of them together.
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { nativePage } from './native-page.mjs';
import { STATIONS } from '../src/kit/core.mjs';

export const apps = resolve(import.meta.dirname, '../apps');

/** How each page builds, from its own folder (unchanged from the standalone repositories). */
export const commands = {
  studio:[['npm','ci','--include=dev','--no-audit','--no-fund'],['node','scripts/build.mjs']],
  services:[['node','build.mjs']],
  projects:[['node','release/build.mjs']],
  levelup:[['node','scripts/build.mjs']],
  start:[['npm','ci','--include=dev','--no-audit','--no-fund'],['npm','run','build']]
};
/** Studio keeps its prepared model and assets in dist/ (tracked); the other pages generate dist/ entirely. */
const generated = slug => new Set(['node_modules', '.vite', ...(slug === 'studio' ? [] : ['dist', '.ssr'])]);

/** The commit the site is built from: Vercel's, or the local checkout's. Written on every page (data-memento-release). */
export function siteRelease() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA;
  try { return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; }
}

// R17: the effects entry and the chunks it loads (engine first), as built by Vite: preloaded by the native pages
async function effectsChunks(output) {
  try {
    const entry = await readFile(join(output,'memento-ui','effects.mjs'),'utf8');
    const deps = (entry.match(/m\.f=\[([^\]]*)\]/)?.[1] || '').match(/"[^"]+"/g)?.map(d => '/' + JSON.parse(d)) || [];
    return ['/memento-ui/effects.mjs', ...deps.filter(d => /\/(engine|delaunator|touch|preload-helper)-[\w-]+\.js$/.test(d))];
  } catch { return []; }
}
export async function publishSection(slug, source, output, release = siteRelease()) {
  const target=join(output,slug);
  await cp(source,target,{recursive:true});
  const index=join(target,'index.html');
  await writeFile(index,nativePage(await readFile(index,'utf8'),slug,release,{preload:await effectsChunks(output)}));
}

export async function buildSections(output) {
  const work=await mkdtemp(join(tmpdir(),'memento-sections-'));
  const release = siteRelease();
  try {
    for(const {slug} of STATIONS) {
      const cwd=join(work,slug), skip=generated(slug);
      console.log('Building '+slug+' from apps/'+slug);
      await cp(join(apps,slug),cwd,{recursive:true,filter:source=>!skip.has(basename(source))});
      for(const [command,...args] of commands[slug])execFileSync(command,args,{cwd,stdio:'inherit',env:{...process.env,GIT_TERMINAL_PROMPT:'0'}});
      await publishSection(slug,join(cwd,'dist'),output,release);
    }
  } finally {await rm(work,{recursive:true,force:true});}
}
