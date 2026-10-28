import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../public/tide-child-bridge.js',import.meta.url),'utf8');
function host({height=3000,viewport=800}={}){
  const handlers=new Map(),sent=[],timers=new Map();let now=0,id=0;
  class Element{closest(){return null;}}
  const body=new Element(),root=Object.assign(new Element(),{scrollTop:0,scrollHeight:height,clientHeight:viewport,scrollTo({top}){this.scrollTop=top;}});
  const parent={postMessage(message,origin){sent.push({message,origin});}},window={parent};
  const context=vm.createContext({window,parent,Element,URL,document:{referrer:'https://hub.example/',currentScript:{dataset:{}},scrollingElement:root,body},performance:{now:()=>now},setTimeout(fn){timers.set(++id,fn);return id;},clearTimeout(id){timers.delete(id);},getComputedStyle:()=>({overflowY:'auto'}),addEventListener(type,fn){handlers.set(type,fn);}});
  vm.runInContext(source,context);
  const envelope=(type,payload={})=>({source:parent,origin:'https://hub.example',data:{channel:'memento:tide',version:1,sessionId:'test',stageId:'s01_services',type,payload}});
  return {sent,root,body,Element,handlers,envelope,init(){handlers.get('message')(envelope('INIT'));handlers.get('message')(envelope('VISIBILITY',{active:true}));now+=1000;},flush(){const f=[...timers.values()];timers.clear();for(const fn of f)fn();}};
}
test('Child bridge waits for real bottom scroll and emits END exactly once',()=>{
  const h=host();h.init();h.root.scrollTop=500;h.handlers.get('scroll')();h.flush();assert(!h.sent.some(s=>s.message.type==='END'));
  h.root.scrollTop=2200;h.handlers.get('scroll')();h.flush();h.handlers.get('scroll')();h.flush();assert.equal(h.sent.filter(s=>s.message.type==='END').length,1);
});
test('Child bridge does not auto-exit short pages on entry but accepts a deliberate downward gesture',()=>{
  const h=host({height:800});h.init();h.handlers.get('scroll')();h.flush();assert(!h.sent.some(s=>s.message.type==='END'));
  h.handlers.get('wheel')({deltaY:80,target:h.body});h.flush();assert.equal(h.sent.filter(s=>s.message.type==='END').length,1);
});
test('Nested scrolling and spoofed messages cannot start the loop',()=>{
  const h=host({height:800});h.init();const nested=Object.assign(new h.Element(),{scrollHeight:1500,clientHeight:300,scrollTop:0,parentElement:h.body});h.handlers.get('wheel')({deltaY:80,target:nested});h.flush();assert(!h.sent.some(s=>s.message.type==='END'));
  const before=h.sent.length;h.handlers.get('message')({...h.envelope('INIT'),origin:'https://wrong.example'});assert.equal(h.sent.length,before);
});
test('Visibility change cancels a pending end and returning after END resets scroll',()=>{
  const h=host();h.init();h.root.scrollTop=2200;h.handlers.get('scroll')();h.handlers.get('message')(h.envelope('VISIBILITY',{active:false}));h.flush();assert(!h.sent.some(s=>s.message.type==='END'));
  h.init();h.root.scrollTop=2200;h.handlers.get('scroll')();h.flush();assert.equal(h.sent.filter(s=>s.message.type==='END').length,1);h.handlers.get('message')(h.envelope('VISIBILITY',{active:false}));h.handlers.get('message')(h.envelope('VISIBILITY',{active:true}));assert.equal(h.root.scrollTop,0);
});
