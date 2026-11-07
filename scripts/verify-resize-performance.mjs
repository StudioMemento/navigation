import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {cardMesh} from '../dist/src/geometry.mjs';
import {layout,relative,queuedStep} from '../dist/src/model.mjs';

const timings=[];
for(const [w,h,small]of [[1920,1080,false],[1100,550,false],[350,438,true]]){
 const begin=performance.now(),meshes=Array.from({length:5},(_,i)=>cardMesh(w,h,89+i,small)),cold=performance.now()-begin;
 const warm=performance.now();for(let i=0;i<100;i++)assert.equal(cardMesh(w*1.1,h*1.1,89+i%5,small),meshes[0]);
 timings.push({viewport:`${w}x${h}`,vertices:meshes[0].points.length,coldFiveMs:+cold.toFixed(2),warm100Ms:+(performance.now()-warm).toFixed(2)});
 for(const m of meshes){
  assert.ok(m.points.length<=(small?180:240));assert.equal(m,meshes[0],'Cards share immutable normalized topology');
  const area=m.triangles.reduce((sum,t)=>{const[a,b,c]=t.map(i=>m.points[i]);return sum+Math.abs((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x))/2;},0);
  assert.ok(Math.abs(area-1)<1e-8,'Cached mesh still covers the full panel');
  assert.ok(m.neighbors.every(n=>n.length>=2));
 }
}

// Execute the shipped resize lifecycle with a controlled event loop. A resize
// burst must paint CSS first, then rebuild only once after the last event.
const source=await readFile(new URL('../dist/src/app.mjs',import.meta.url),'utf8');
const lifecycle=source.slice(source.indexOf('function measureTitles('),source.indexOf('function updateActive('));
const frames=[],timers=new Map(),styles=new Map();let timerId=0,fieldResizes=0,typeRefreshes=0;
const cards=Array.from({length:5},(_,i)=>({fxKey:'old',typeRevision:0,pose:{visible:i<3},el:{style:{},hidden:false,
 querySelector:()=>({children:[{textContent:'A'}],textContent:'A',style:{setProperty:(k,v)=>styles.set(`title${i}:${k}`,v)}}),querySelectorAll:()=>[]},
 fx:{ctx:{measureText:()=>({width:60})},resize(){assert.equal(cards[i].el.hidden,false,'Glyph metrics require a measurable card');this.resizes=(this.resizes||0)+1;},refreshType(){typeRefreshes++;}}
}));
const state={cards,disposed:false,layoutRaf:0,resizeTimer:0,resizePending:false,fxReady:true,fxKey:'old',
 warmHandle:0,warmIdle:false,fontRevision:0,lastCommitMs:0,setupMs:0,layoutSignature:'old',resizeStartedAt:0,
 started:true,appearing:false,position:0,l:layout(390,844),sceneDirty:false,titleMetrics:new Map(),
 hub:{clientWidth:2048,clientHeight:818},overlay:{},scene:{style:{}},devicePixelRatio:1,
 document:{documentElement:{clientWidth:2048,clientHeight:818,style:{setProperty:(k,v)=>styles.set(k,v)}},body:{classList:{add(){},remove(){}}}},
 field:{resize(){fieldResizes++;}},layout,relative,performance,
 requestAnimationFrame:fn=>{frames.push(fn);return frames.length;},setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id),
 requestIdleCallback:()=>999,cancelIdleCallback(){},wake(){},drawScene(){cards.forEach((c,i)=>c.pose={visible:Math.abs(relative(i,0))<1.75});},decodeImage(){}};
vm.createContext(state);vm.runInContext(lifecycle,state);
for(let i=0;i<20;i++)vm.runInContext('requestFit()',state);
assert.equal(frames.length,1,'Twenty resize events coalesce into one layout frame');
frames.shift()();
assert.equal(fieldResizes,0,'Heavy work cannot block the first resized CSS paint');
assert.ok(parseFloat(styles.get('--card-w'))>700,'The card immediately adopts the new viewport');
assert.equal(state.l.w,2048);assert.equal(timers.size,1);
state.hub.clientWidth=1920;vm.runInContext('requestFit()',state);frames.shift()();
assert.equal(timers.size,1,'A later resize replaces the previous commit');
const commit=[...timers.values()][0];timers.clear();commit();
assert.equal(fieldResizes,1);assert.equal(cards.filter(c=>c.fx.resizes).length,3,'Only visible cards initialize synchronously');
assert.equal(typeRefreshes,0);assert.equal(state.resizePending,false);
vm.runInContext('fit()',state);assert.equal(fieldResizes,1);assert.equal(timers.size,0,'An unchanged layout is a no-op');
cards[3].el.hidden=true;cards[3].el.style.visibility='';vm.runInContext('ensureFX(cards[3])',state);assert.equal(cards[3].el.hidden,true);assert.equal(cards[3].el.style.visibility,'','Hidden preparation restores visibility');
state.disposed=true;vm.runInContext('requestFit()',state);assert.equal(frames.length,0);

let target=0;for(let i=0;i<100;i++)target=queuedStep(.1,target,1);
assert.equal(target,2,'Rapid input has a bounded two-slide queue');
assert.equal(queuedStep(.1,target,-1),1,'Reversal responds before the queue settles');
console.log('RESIZE_PERFORMANCE_VERIFIED',JSON.stringify(timings));
