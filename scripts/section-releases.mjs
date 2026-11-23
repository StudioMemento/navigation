import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { nativePage } from './native-page.mjs';
import { STATIONS } from '../src/kit/core.mjs';
import releases from './sections.lock.json' with {type:'json'};

const commands = {
  studio:[['npm','ci','--include=dev','--no-audit','--no-fund'],['node','scripts/build.mjs']],
  services:[['node','build.mjs']],
  projects:[['node','release/build.mjs']],
  levelup:[['node','scripts/build.mjs']],
  start:[['npm','ci','--include=dev','--no-audit','--no-fund'],['npm','run','build']]
};

// R17: the effects entry and the chunks it loads (engine first), as built by Vite: preloaded by the native pages
async function effectsChunks(output) {
  try {
    const entry = await readFile(join(output,'memento-ui','effects.mjs'),'utf8');
    const deps = (entry.match(/m\.f=\[([^\]]*)\]/)?.[1] || '').match(/"[^"]+"/g)?.map(d => '/' + JSON.parse(d)) || [];
    return ['/memento-ui/effects.mjs', ...deps.filter(d => /\/(engine|delaunator|touch|preload-helper)-[\w-]+\.js$/.test(d))];
  } catch { return []; }
}
export async function publishSection(slug, source, output) {
  const target=join(output,slug);
  await cp(source,target,{recursive:true});
  const index=join(target,'index.html');
  await writeFile(index,nativePage(await readFile(index,'utf8'),slug,releases[slug].commit,{preload:await effectsChunks(output)}));
}

export async function buildSections(output) {
  const work=await mkdtemp(join(tmpdir(),'memento-sections-'));
  try {
    for(const {slug} of STATIONS) {
      const {repository,commit}=releases[slug];
      if(!/^[a-zA-Z0-9_-]+$/.test(repository) || !/^[0-9a-f]{40}$/.test(commit))throw Error('Invalid release for '+slug);
      const cwd=join(work,slug);
      await mkdir(cwd);
      const run=(command,args)=>execFileSync(command,args,{cwd,stdio:'inherit',env:{...process.env,GIT_TERMINAL_PROMPT:'0'}});
      console.log('Preparing '+slug+' at '+commit);
      run('git',['init','-q']);
      run('git',['fetch','-q','--depth=1','https://github.com/StudioMemento/'+repository+'.git',commit]);
      run('git',['checkout','-q','--detach','FETCH_HEAD']);
      const head=execFileSync('git',['rev-parse','HEAD'],{cwd,encoding:'utf8'}).trim();
      if(head!==commit)throw Error('Release mismatch for '+slug);
      const patch = {studio:'studio-navigation.patch',services:'services-navigation.patch',levelup:'levelup-demo.patch'}[slug];
      if(patch)run('git',['apply',new URL(patch,import.meta.url).pathname]);
      for(const [command,...args] of commands[slug])run(command,args);
      await publishSection(slug,join(cwd,'dist'),output);
    }
  } finally {await rm(work,{recursive:true,force:true});}
}
