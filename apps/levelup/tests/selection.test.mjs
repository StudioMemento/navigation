import test from 'node:test';
import assert from 'node:assert/strict';
import { Carousel } from '../src/carousel.js';
import { DemoPlayer } from '../src/player.js';

test('A chosen destination navigates the only iframe before animation; intermediate slides never replace it', () => {
  const prior = {document:globalThis.document, requestAnimationFrame:globalThis.requestAnimationFrame, cancelAnimationFrame:globalThis.cancelAnimationFrame, setTimeout:globalThis.setTimeout, clearTimeout:globalThis.clearTimeout};
  const frames = new Map(), timers = new Map(); let serial=0, navigations=0;
  const element = () => ({hidden:false,dataset:{},setAttribute(name,value){this[name]=value;}});
  globalThis.document={createElement:()=>({...element(),events:{},addEventListener(type,fn){this.events[type]=fn;}})};
  globalThis.requestAnimationFrame=fn=>{frames.set(++serial,fn);return serial;};
  globalThis.cancelAnimationFrame=id=>frames.delete(id);
  globalThis.setTimeout=fn=>{timers.set(++serial,fn);return serial;};
  globalThis.clearTimeout=id=>timers.delete(id);
  const mount={replaceChildren(frame){this.children=[frame];navigations++;}};
  const player=new DemoPlayer({mount,loading:element(),fallback:element(),poster:element(),link:element(),panel:element()});
  const items=Array.from({length:10},(_,i)=>({id:String(i),title:'Demo '+i,asset:i+'.webp',url:'https://example.com/'+i}));
  const selected=[], traversed=[], classes=new Set();
  const carousel=Object.assign(Object.create(Carousel.prototype),{
    count:10,current:0,target:0,active:0,velocity:0,raf:0,suspended:false,
    reduced:{matches:false},element:{classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)},hasPointerCapture:()=>false},
    onSelect:index=>{selected.push(index);player.load(items[index]);},
    onCommit:index=>player.load(items[index]),
    render(){this.active=this.mod(Math.round(this.current));traversed.push(this.active);}
  });
  const settle=()=>{let now=performance.now();for(let i=0;i<500&&frames.size;i++){now+=16;const jobs=[...frames.values()];frames.clear();for(const fn of jobs)fn(now);}assert.equal(carousel.motion,null);};
  try {
    carousel.select(3);
    assert.equal(mount.children[0].src,items[3].url,'navigation must begin synchronously with the choice');
    assert.equal(carousel.current,0,'the carousel has not moved yet');
    assert(classes.has('is-moving'));
    const first=mount.children[0];
    settle();
    assert(traversed.includes(1)&&traversed.includes(2),'exercise a multi-card animation');
    assert.deepEqual(selected,[3]);
    assert.equal(navigations,1,'intermediate cards and final settling must not reload the chosen app');
    assert.equal(mount.children[0],first);
    carousel.select(5);carousel.select(8);
    assert.equal(mount.children.length,1);
    assert.equal(mount.children[0].src,items[8].url,'the latest rapid choice wins before any animation tick');
    settle();
    assert.equal(navigations,3);
    carousel.step(1);
    assert.equal(mount.children[0].src,items[9].url,'keyboard/wheel stepping also starts immediately');
    settle();
    // Release a drag towards the next card; the visual position is still between cards.
    const dragStart=carousel.current;
    carousel.pointer={id:1,x:100,y:0,start:dragStart,origin:dragStart,lastX:60,lastT:performance.now(),velocity:0,axis:'x'};
    carousel.stride=100;
    carousel.up({pointerId:1,clientX:60,clientY:0});
    assert.equal(mount.children[0].src,items[0].url,'a released swipe starts its destination before spring settling');
    assert.equal(carousel.current,dragStart);
    settle();
    assert.equal(navigations,5);
  } finally {Object.assign(globalThis,prior);}
});
