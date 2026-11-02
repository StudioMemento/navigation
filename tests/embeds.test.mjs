import test from 'node:test';
import assert from 'node:assert/strict';
import {EmbedController} from '../hub/public/src/embeds.mjs';
import {sessionEnvelope} from '../hub/public/navigation/core.mjs';
function fixture(){
  const windowListeners=new Map(),frames=[];globalThis.window={addEventListener:(type,fn)=>windowListeners.set(type,fn),removeEventListener:type=>windowListeners.delete(type)};
  globalThis.document={createElement:()=>{const listeners=new Map();const frame={contentWindow:{sent:[],postMessage(data,origin){this.sent.push({data,origin});}},setAttribute(){},addEventListener:(name,fn)=>listeners.set(name,fn),remove(){this.removed=true;},emit:type=>listeners.get(type)?.()};frames.push(frame);return frame;}};
  const mount={replaceChildren(frame){this.current=frame;}},intents=[];let loads=0;
  const controller=new EmbedController(mount,{onLoad:()=>loads++,onIntent:x=>intents.push(x)});
  return {controller,frames,intents,mount,get loads(){return loads;},event(type,payload={}){const r=controller.record;return {source:r.source,origin:r.origin,data:sessionEnvelope(r.id,r.sessionId,type,payload)};}};
}
test('only one iframe is retained; remote page works without a bridge',()=>{
  const f=fixture();f.controller.open({id:'services'});f.frames[0].emit('load');assert.equal(f.loads,1);assert.equal(f.controller.record.bridge,null);
  f.controller.open({id:'start'});assert(f.frames[0].removed);assert.equal(new URL(f.mount.current.src).origin,'https://mementostart.vercel.app');
  f.frames[0].emit('load');assert.equal(f.loads,1,'late load of discarded frame ignored');f.controller.destroy();
});
test('new bridge routes authorized active CTA and ignores stale, forged or inactive messages',()=>{
  const f=fixture();f.controller.open({id:'services'});f.frames[0].emit('load');f.controller.message(f.event('READY'));assert.equal(f.controller.record.bridge,'v2');
  f.controller.message(f.event('NAVIGATE',{id:'start'}));assert.equal(f.intents.length,0);
  f.controller.setActive(true);const old=f.event('RETURN');f.controller.message({...old,origin:'https://evil.example'});assert.equal(f.intents.length,0);
  f.controller.message(f.event('NAVIGATE',{id:'start',search:'from=services'}));assert.equal(f.intents[0].id,'start');
  f.controller.open({id:'projects'});f.controller.setActive(true);f.controller.message(old);assert.equal(f.intents.length,1);f.controller.destroy();
});
test('legacy bridge supports existing pages without overriding a v2 handshake',()=>{
  const f=fixture();f.controller.open({id:'levelup'});f.frames[0].emit('load');const r=f.controller.record;
  const event={source:r.source,origin:r.origin,data:{channel:'memento:tide',version:1,sessionId:r.sessionId,stageId:r.stageId,type:'READY',payload:{}}};
  f.controller.message(event);assert.equal(r.bridge,'legacy');f.controller.setActive(true);
  f.controller.message({...event,data:{...event.data,type:'INPUT',payload:{boundary:'end',delta:200}}});assert.equal(f.intents[0].view,'world');
  f.controller.message(f.event('READY'));f.controller.message(event);assert.equal(r.bridge,'v2');f.controller.destroy();
});
