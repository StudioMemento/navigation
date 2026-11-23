import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { nativePage } from '../scripts/native-page.mjs';
import { mkdtemp, writeFile, readFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { publishSection } from '../scripts/section-releases.mjs';
import releases from '../scripts/sections.lock.json' with {type:'json'};
import { STATIONS } from '../src/kit/core.mjs';
const source = '<!doctype html><html lang="it"><head><title>Sezione</title><link rel="canonical" href="old"><script src="navigation/bootstrap.js"></script><link rel="modulepreload" href="vfx/memento-vfx.js"><link rel="preload" href="a.webp" as="image"><script type="module" src="src/app.js"></script></head><body><!-- MEMENTO_OVERLAY_START --><memento-nav></memento-nav><!-- MEMENTO_OVERLAY_END --><main><h1>Titolo</h1><a href="#dettaglio">Scheda</a><iframe title="Demo" src="https://knives.vercel.app/"></iframe></main><link rel="preload" as="image" href="a.webp"></body></html>';
const all = (node,name) => [...(node.tagName===name?[node]:[]),...(node.childNodes||[]).flatMap(n=>all(n,name))];
const attr = (node,name) => node.attrs.find(a=>a.name===name)?.value;
const routes=JSON.parse(readFileSync(new URL('../vercel.json',import.meta.url)));
test('each native section has a single navbar and effect module, and preserves authored demos and fragments',()=>{
 for (const s of STATIONS) {
  const html=nativePage(source,s.slug),doc=parse(html);
  assert.equal(attr(all(doc,'html')[0],'data-memento-native'),s.slug);
  assert.equal(all(doc,'memento-nav').length,1);
  assert.equal(all(doc,'div').filter(n=>attr(n,'id')==='site-atmosphere').length, 0);
  assert.equal(all(doc,'link').filter(n=>attr(n,'rel')==='canonical').map(n=>attr(n,'href')).join(),'https://mementostudio.it/'+s.slug+'/');
  assert.equal(all(doc,'link').filter(n=>attr(n,'href')==='a.webp').length,1);
  assert(!html.includes('navigation/bootstrap.js'));assert(!html.includes('href="vfx/memento-vfx.js"'));
  const app=all(doc,'script').find(n=>attr(n,'src')==='src/app.js' || (n.childNodes||[]).some(c=>c.value?.includes('new URL("src/app.js"')));
  assert(app);assert(html.indexOf('type="importmap"')<html.lastIndexOf('src/app.js'));
  assert.equal(attr(all(doc,'iframe')[0],'src'),'https://knives.vercel.app/');
  assert(all(doc,'a').some(a=>attr(a,'href')==='#dettaglio'));
  assert(!routes.rewrites?.some(r=>r.source.startsWith(s.path+'/')));
 }
});
test('a pinned release publishes native HTML and its own assets together',async()=>{
 const work=await mkdtemp(join(tmpdir(),'memento-release-test-'));
 try {
   const origin=join(work,'origin'),out=join(work,'dist');await mkdir(origin);await mkdir(out);
   await writeFile(join(origin,'index.html'),source);await writeFile(join(origin,'a.webp'),'test bytes');
   await publishSection('projects',origin,out);
   const html=await readFile(join(out,'projects/index.html'),'utf8');
   assert.equal(attr(all(parse(html),'html')[0],'data-memento-release'),releases.projects.commit);
   assert.equal(await readFile(join(out,'projects/a.webp'),'utf8'),'test bytes');
 } finally {await rm(work,{recursive:true,force:true});}
});

test('LevelUp uses its real CTA as an effect surface and keeps interactive project demos',()=>{
 const html=nativePage('<a id="contact-link" href="/start?from=levelup">Ready to start?</a><iframe id="start-frame" data-src="ready-to-start/embed.html"></iframe><iframe title="Demo" src="https://knives.vercel.app/"></iframe>','levelup');
 const doc=parse(html);
 assert.equal(all(doc,'iframe').length,1);assert.equal(attr(all(doc,'a')[0],'data-vfx'),'card');
 assert.equal(attr(all(doc,'a')[0],'href'),'/start?from=levelup');
});

test('reprocessing an existing native entry leaves one shared runtime and import map',()=>{
 const doc=parse(nativePage(nativePage(source,'start'),'start'));
 assert.equal(all(doc,'script').filter(n=>attr(n,'type')==='importmap').length,1);
 assert.equal(all(doc,'script').filter(n=>attr(n,'src')==='/memento-ui/site.mjs').length,1);
 assert.equal(all(doc,'memento-nav').length,1);
 assert.equal(all(doc,'div').filter(n=>attr(n,'id')==='site-atmosphere').length,0);
});

test('a single cross-document scene owns the transition, and requesting a link stays native', () => {
  const doc = parse(nativePage(source,'services'));
  const scene = all(doc,'script').find(n => attr(n,'id') === 'memento-scene-navigation');
  const css = all(doc,'style').find(n => attr(n,'id') === 'memento-scene-shape').childNodes[0].value;
  assert.match(css, /@view-transition\s*\{navigation:auto/);
  assert.match(css, /::view-transition-old\(root\)/);
  assert.match(css, /::view-transition-new\(root\)/);
  const script=scene.childNodes[0].value;
  const root={clientWidth:400,dataset:{},style:{setProperty(){}}};
  const document=Object.assign(new EventTarget(),{documentElement:root,referrer:'',body:{}});
  const window=Object.assign(new EventTarget(),{innerHeight:800});window.top=window;
  const followed=[];const location=new URL('https://mementostudio.it/services/');location.assign=href=>followed.push(href);
  runInNewContext(script,{window,document,location,URL,innerHeight:800,performance:{getEntriesByType:()=>[{type:'navigate'}]},matchMedia:()=>Object.assign(new EventTarget(),{matches:false})});
  window.mementoGo('/projects/');assert.deepEqual(followed,['https://mementostudio.it/projects/']);
  // The same native request must be dispatched synchronously with full motion and pagereveal support.
  const capableWindow = Object.assign(new EventTarget(),{onpagereveal:null});capableWindow.top=capableWindow;
  runInNewContext(script,{window:capableWindow,document,location,URL,innerHeight:800,performance:{},Element:class {},matchMedia:()=>Object.assign(new EventTarget(),{matches:true})});
  capableWindow.mementoGo('/levelup/');assert.equal(followed.at(-1), 'https://mementostudio.it/levelup/');
  assert.doesNotMatch(script,/startViewTransition|speculationrules/);
  assert.doesNotMatch(script, /\.rel\s*=\s*['"]prefetch/);
  assert.equal(all(doc,'link').filter(n=>attr(n,'data-mm-atlas')!==undefined).length,0);
  assert.equal(all(doc,'script').filter(n=>attr(n,'src')==='/memento-ui/viewport.js').length,0);
  const nav=all(doc,'memento-nav')[0];assert.equal(attr(nav.childNodes[0],'shadowrootmode'),'open');
});
