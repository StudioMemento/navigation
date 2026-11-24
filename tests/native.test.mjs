import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { nativePage } from '../scripts/native-page.mjs';
import { mkdtemp, writeFile, readFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { publishSection } from '../scripts/sections.mjs';
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
  assert(app);assert(!html.includes('type="importmap"'));assert(html.indexOf('/memento-ui/site.mjs')<html.lastIndexOf('src/app.js'));
  assert.equal(attr(all(doc,'iframe')[0],'src'),'https://knives.vercel.app/');
  assert(all(doc,'a').some(a=>attr(a,'href')==='#dettaglio'));
  assert(!routes.rewrites?.some(r=>r.source.startsWith(s.path+'/')));
 }
});
test('a page publishes native HTML and its own assets together, with the site release',async()=>{
 const work=await mkdtemp(join(tmpdir(),'memento-release-test-'));
 try {
   const origin=join(work,'origin'),out=join(work,'dist');await mkdir(origin);await mkdir(out);
   await writeFile(join(origin,'index.html'),source);await writeFile(join(origin,'a.webp'),'test bytes');
   await publishSection('projects',origin,out,'r19-test');
   const html=await readFile(join(out,'projects/index.html'),'utf8');
   assert.equal(attr(all(parse(html),'html')[0],'data-memento-release'),'r19-test');
   assert.equal(await readFile(join(out,'projects/a.webp'),'utf8'),'test bytes');
 } finally {await rm(work,{recursive:true,force:true});}
});

// R17: Ready to start is the Servizi card everywhere: LevelUp's frame of visualfx.vercel.app and Portfolio's footer link
// are replaced by it (LevelUp keeps id="contact-link": its app writes the destination with the chosen experience)
test('LevelUp and Portfolio close with the Ready to start card of Servizi, without frames',()=>{
 const levelup=parse(nativePage('<main><section class="contact-section page-width memento-start" id="contatto" aria-labelledby="start-title"><h2 class="sr-only" id="start-title">Ready to start?</h2><div class="start-embed" id="start-embed"><a class="start-embed__card" id="contact-link" href="https://mementostudio.it/start?from=levelup">Ready</a><iframe id="start-frame" data-src="ready-to-start/embed.html"></iframe></div></section><iframe title="Demo" src="https://knives.vercel.app/"></iframe></main>','levelup'));
 assert.equal(all(levelup,'iframe').length,1);assert.equal(attr(all(levelup,'iframe')[0],'src'),'https://knives.vercel.app/');
 const cta=all(levelup,'a').find(a=>attr(a,'id')==='contact-link');
 assert.equal(attr(cta,'class'),'mm-ready-card');assert.equal(attr(cta,'data-vfx'),'card');assert.equal(attr(cta,'data-vfx-photo'),'.mm-ready-sparkle');
 assert.equal(attr(cta,'href'),'/start/?from=levelup');
 assert.equal(all(levelup,'section').filter(n=>attr(n,'id')==='contatto').length,1);
 assert(all(levelup,'link').some(n=>attr(n,'href')==='/memento-ui/ready-to-start.css'));
 const projects=parse(nativePage('<main><div id="grid-home"></div><footer class="footer"><a href="https://mementostart.vercel.app/" data-vfx="title">Ready to start?</a></footer></main>','projects'));
 assert.equal(all(projects,'footer').length,0);
 const card=all(projects,'a').find(a=>attr(a,'class')==='mm-ready-card');
 assert.equal(attr(card,'href'),'/start/');assert.equal(attr(card,'data-vfx'),'card');
 assert(!all(projects,'a').some(a=>(attr(a,'href')||'').includes('mementostart.vercel.app')));
 // Servizi keeps its own card; the other pages get no extra stylesheet
 assert(!all(parse(nativePage(source,'services')),'link').some(n=>attr(n,'href')==='/memento-ui/ready-to-start.css'));
});
test('pages with effects are marked for the page change, with their code to preload',()=>{
 const preload=['/memento-ui/effects.mjs','/assets/compiled/engine-x.js'];
 for (const s of STATIONS) {
  const html=all(parse(nativePage(source,s.slug,'',{preload})),'html')[0];
  const effects=['services','projects','levelup','start'].includes(s.slug);
  assert.equal(attr(html,'data-mm-effects')!==undefined,effects,s.slug);
  assert.equal(attr(html,'data-mm-preload'),effects && s.slug!=='start'?preload.join(' '):undefined,s.slug);
 }
});

test('reprocessing an existing native entry leaves one shared runtime',()=>{
 const doc=parse(nativePage(nativePage(source,'start'),'start'));
 assert.equal(all(doc,'script').filter(n=>attr(n,'type')==='importmap').length,0);
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
  const flags=new Set();
  const root={clientWidth:400,dataset:{},style:{setProperty(){}},classList:{contains:()=>false},hasAttribute:n=>flags.has(n),setAttribute:n=>flags.add(n),removeAttribute:n=>flags.delete(n)};
  const document=Object.assign(new EventTarget(),{documentElement:root,referrer:'',body:{}});
  const window=Object.assign(new EventTarget(),{innerHeight:800});window.top=window;
  const followed=[];const location=new URL('https://mementostudio.it/services/');location.assign=href=>followed.push(href);
  runInNewContext(script,{window,document,location,URL,innerHeight:800,performance:{getEntriesByType:()=>[{type:'navigate'}]},matchMedia:()=>Object.assign(new EventTarget(),{matches:false})});
  window.mementoGo('/projects/');assert.deepEqual(followed,['https://mementostudio.it/projects/']);
  // The same native request must be dispatched synchronously with full motion and pagereveal support.
  const capableWindow = Object.assign(new EventTarget(),{onpagereveal:null});capableWindow.top=capableWindow;
  runInNewContext(script,{window:capableWindow,document,location,URL,innerHeight:800,performance:{},Element:class {},matchMedia:()=>Object.assign(new EventTarget(),{matches:true})});
  capableWindow.mementoGo('/levelup/');assert.equal(followed.at(-1), 'https://mementostudio.it/levelup/');
  assert.doesNotMatch(script,/startViewTransition/);
  // R17: the next document is prefetched while the page comes apart, and the browser navigates when it is over
  assert.match(script,/speculationrules/);
  assert.equal(all(doc,'link').filter(n=>attr(n,'data-mm-atlas')!==undefined).length,0);
  assert.equal(all(doc,'script').filter(n=>attr(n,'src')==='/memento-ui/viewport.js').length,0);
  const nav=all(doc,'memento-nav')[0];assert.equal(attr(nav.childNodes[0],'shadowrootmode'),'open');
});
