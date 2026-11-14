import test from 'node:test';
import assert from 'node:assert/strict';
import {relative,nearest,layout,slideStep,dragSnap,viewportHeight} from '../src/model.mjs';
import {initialSection,referrerSection,routeMessage,ROUTE_CHANNEL,ROUTE_VERSION} from '../src/route-state.mjs';

test('wrap uses the shortest adjacent move at the loop boundary',()=>{
 assert.equal(relative(0,4),1);assert.equal(nearest(0,4),5);assert.equal(nearest(4,0),-1);
});
test('spring converges after reversing a rapid navigation gesture',()=>{
 let p=0,v=0;for(let i=0;i<12;i++)({position:p,velocity:v}=slideStep(p,v,2,1/60));
 for(let i=0;i<180;i++)({position:p,velocity:v}=slideStep(p,v,-1,1/60));
 assert.equal(p,-1);assert.equal(v,0);
});
test('cancelled touch drag returns to the initial section',()=>{
 assert.equal(dragSnap(2,2.7,1,true),2);assert.equal(dragSnap(2,2.7,0,false),3);
});
test('cards and arrows fit mobile, desktop and short landscape viewports',()=>{
 for(const [w,h] of [[390,844],[360,640],[1440,900],[844,390],[1920,1080]]){
  const l=layout(w,h);assert.ok(l.width>0&&l.height>0);assert.ok(l.width<w);assert.ok(l.height<h);
  assert.ok(l.previousY-l.arrowHeight/2>=l.logoBottom);assert.ok(l.nextY+l.arrowHeight/2<=l.dockTop);
 }
 assert.equal(viewportHeight(844,700,1),700);assert.equal(viewportHeight(844,400,2),844);
});
test('return section follows explicit hash, then trusted referrer, then session',()=>{
 const storage={getItem:()=> 'projects'};
 assert.equal(initialSection({hash:'#start',storage,referrer:'https://mementostudio.it/services'}),'start');
 assert.equal(initialSection({storage,referrer:'https://mementostudio.it/services'}),'services');
 assert.equal(referrerSection('https://mementostudio.it.evil.test/start'),null);
 assert.equal(initialSection({hash:'#unknown',storage:{getItem(){throw Error();}}}),'studio');
});
test('iframe route messages require source, trusted origin and request id',()=>{
 const parent={};const options={parent,origins:['https://mementostudio.it'],requestId:'current'};
 const e={source:parent,origin:'https://mementostudio.it',data:{channel:ROUTE_CHANNEL,version:ROUTE_VERSION,type:'STATE',requestId:'current',initial:true,section:'services'}};
 assert.equal(routeMessage(e,options),true);assert.equal(routeMessage({...e,source:{}},options),false);
 assert.equal(routeMessage({...e,origin:'https://other.test'},options),false);
 assert.equal(routeMessage({...e,data:{...e.data,requestId:'stale'}},options),false);
});
