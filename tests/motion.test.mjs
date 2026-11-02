import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {PerspectiveCamera} from '../hub/public/vendor/three.module.js';
import {Navigator,STATIONS} from '../hub/public/src/motion.mjs';
const data=JSON.parse(readFileSync(new URL('../hub/public/assets/scene.json',import.meta.url)));
function advance(nav,seconds){for(let t=0;t<seconds;t+=.05)nav.tick(.05);}
test('every station, including Memento, can descend and return',()=>{
  for(let i=0;i<5;i++){const nav=new Navigator(data,new PerspectiveCamera());nav.arrive(i);assert(nav.enter(),STATIONS[i]);nav.ready(i);advance(nav,3);assert.equal(nav.state,'page');assert(nav.back());advance(nav,3);assert.equal(nav.state,'idle');assert.equal(nav.active,i);}
});
test('return during descent reverses the same camera path without a reset',()=>{
  const nav=new Navigator(data,new PerspectiveCamera());nav.enter();advance(nav,.7);const p=nav.progress,pos=nav.camera.position.clone();nav.back();assert.equal(nav.progress,p);assert(nav.camera.position.equals(pos));nav.tick(.1);assert(nav.progress<p);advance(nav,3);assert.equal(nav.state,'idle');
});
test('latest station wins when several requests arrive during orbit',()=>{
  const nav=new Navigator(data,new PerspectiveCamera());nav.select(2);advance(nav,.2);nav.select(4);advance(nav,7);assert.equal(nav.active,4);assert.equal(nav.state,'idle');
});
test('reduced motion skips orbit and completes descent in one tick',()=>{
  const nav=new Navigator(data,new PerspectiveCamera(),{reduced:true});nav.select(3);assert.equal(nav.state,'idle');nav.enter();nav.ready(3);nav.tick(.01);assert.equal(nav.state,'page');
});
