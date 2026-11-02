import test from 'node:test';
import assert from 'node:assert/strict';
import {DemoPlayer} from '../src/player.js';

test('Player deduplicates selection, ignores stale loads, recovers after timeout, and retries explicitly',()=>{
  const prior={document:globalThis.document,requestAnimationFrame:globalThis.requestAnimationFrame,setTimeout:globalThis.setTimeout,clearTimeout:globalThis.clearTimeout};
  const paints=[],timers=new Map();let next=0,mounts=0;
  const element=()=>({hidden:false,dataset:{},setAttribute(name,value){this[name]=value;}});
  globalThis.document={createElement:()=>({...element(),events:{},addEventListener(type,callback){this.events[type]=callback;}})};
  globalThis.requestAnimationFrame=fn=>paints.push(fn);
  globalThis.setTimeout=fn=>{timers.set(++next,fn);return next;};
  globalThis.clearTimeout=id=>timers.delete(id);
  const mount={replaceChildren(frame){this.current=frame;mounts++;}},loading=element(),fallback=element(),panel=element();
  const player=new DemoPlayer({mount,loading,fallback,panel,poster:element(),link:element()});
  const a={id:'a',title:'A',asset:'a.webp',url:'https://a.example/'},b={id:'b',title:'B',asset:'b.webp',url:'https://b.example/'};
  const paint=()=>{while(paints.length)paints.shift()();};
  try {
    player.load(a);const first=mount.current;
    player.load(a);assert.equal(mount.current,first);assert.equal(mounts,1);
    first.events.load();player.load(b);const second=mount.current;paint();
    assert.equal(loading.hidden,false,'a stale first paint must not dismiss the current loader');
    assert.notEqual(second,first);assert.equal(mounts,2);
    second.events.load();paint();assert.equal(loading.hidden,true);assert.equal(second.dataset.loaded,'true');
    player.load(b);assert.equal(mounts,2,'settling an unchanged selection must preserve iframe state');
    player.load(b,true);const retry=mount.current;assert.equal(mounts,3);
    for(const fn of [...timers.values()])fn();assert.equal(fallback.hidden,false);
    retry.events.load();paint();assert.equal(fallback.hidden,true,'a late successful load recovers the panel');
    assert.equal(panel['aria-busy'],'false');
  } finally { Object.assign(globalThis,prior); }
});
