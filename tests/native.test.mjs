import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { nativePage } from '../scripts/native-page.mjs';
import section from '../api/section.js';
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
  assert.equal(all(doc,'div').filter(n=>attr(n,'id')==='site-atmosphere').length, 1);
  assert.equal(all(doc,'link').filter(n=>attr(n,'rel')==='canonical').map(n=>attr(n,'href')).join(),'https://mementostudio.it/'+s.slug+'/');
  assert.equal(all(doc,'link').filter(n=>attr(n,'href')==='a.webp').length,1);
  assert(!html.includes('navigation/bootstrap.js'));assert(!html.includes('rel="modulepreload"'));
  assert(html.indexOf('type="importmap"')<html.indexOf('src="src/app.js"'));
  assert.equal(attr(all(doc,'iframe')[0],'src'),'https://knives.vercel.app/');
  assert.equal(attr(all(doc,'a')[0],'href'),'#dettaglio');
  const native=routes.rewrites.findIndex(r=>r.source===s.path+'/'),assets=routes.rewrites.findIndex(r=>r.source===s.path+'/:file+');
  assert(native>=0 && assets>native);
 }
});
test('the public endpoint only fetches the configured station and does not forward visitor context',async t=>{
 let upstream;
 t.mock.method(globalThis,'fetch',async(url)=>{upstream=url;return new Response(source,{headers:{'content-type':'text/html'}})});
 function response(){return {code:0,body:null,setHeader(){return this;},status(n){this.code=n;return this;},end(v){this.body=v;return this;}};}
 const res=response();await section({method:'GET',query:{station:'projects',idea:'private'}},res);
 assert.equal(upstream,'https://mementoportfolio.vercel.app/');assert.equal(res.code,200);assert(res.body.includes('Titolo'));
 const bad=response();await section({method:'GET',query:{station:'https://example.com/'}},bad);assert.equal(bad.code,404);
 const head=response();await section({method:'HEAD',query:{station:'start'}},head);assert.equal(head.body,undefined);
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
 assert.equal(all(doc,'div').filter(n=>attr(n,'id')==='site-atmosphere').length,1);
});

test('routes follow immediately and only internal arrivals suppress the local intro', () => {
  const script=readFileSync(new URL('../public/memento-ui/viewport.js',import.meta.url),'utf8');
  function visit(referrer,type='navigate',reduced=false) {
    const root={dataset:{},clientWidth:390,style:{setProperty(){}}};
    const document=Object.assign(new EventTarget(),{documentElement:root,referrer});
    const window=Object.assign(new EventTarget(),{innerHeight:844});
    window.top=window;
    const followed=[];
    const location=new URL('https://mementostudio.it/services/');
    location.assign=href=>followed.push(href);
    const matchMedia=()=>Object.assign(new EventTarget(),{matches:reduced});
    runInNewContext(script,{window,document,location,URL,matchMedia,performance:{getEntriesByType:()=>[{type}]}});
    return {window,root,followed};
  }
  const from='https://mementostudio.it/start/';
  for (const quiet of [true,false]) {
    const {window,root,followed}=visit(from,'navigate',quiet);
    assert.equal(root.dataset.mementoArrival,'page');
    assert.equal(window.mementoPageReveal,undefined);
    window.mementoGo('/projects/');window.mementoGo('/start/');
    assert.deepEqual(followed,['/projects/','/start/']);
    const click=new Event('click',{cancelable:true});
    assert.equal(window.dispatchEvent(click),true);
  }
  for(const [ref,type] of [['','navigate'],['https://example.com/','navigate'],[from,'reload'],['https://mementostudio.it/services/#catalogo','navigate']]) {
    assert.equal(visit(ref,type).root.dataset.mementoArrival,undefined);
  }
  assert.equal(visit('','back_forward').root.dataset.mementoArrival,'page');
  assert.match(nativePage(source,'start'), /<script defer="" src="\/memento-ui\/viewport.js">/);
});
