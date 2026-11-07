import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {slideStep,wheelStep,wrap} from '../dist/src/model.mjs';
import {PAGES} from '../dist/src/config.mjs';

// Run the shipped selection functions: the nav and route must change before
// the first animation frame, including retargeting while a slide is moving.
const app=await readFile(new URL('../dist/src/app.mjs',import.meta.url),'utf8');
const selection=app.slice(app.indexOf('function updateActive('),app.indexOf('function drawScene('));
const nav=[],routes=[],hashes=[],status={};
const cards=PAGES.map(()=>({el:{setAttribute(){},removeAttribute(){},focus(){}}}));
const state={active:0,target:0,position:.22,velocity:3.8,settled:false,sceneDirty:false,
 PAGES,wrap,cards,overlay:{setActive:id=>nav.push(id)},
 document:{activeElement:null,body:{classList:{add(){}}}},
 window:{history:{replaceState:(a,b,hash)=>hashes.push(hash)}},
 routeSync:{notify:slug=>routes.push(slug),markInteracted(){}},$:()=>status,wake(){}};
vm.createContext(state);vm.runInContext(selection,state);
vm.runInContext('select(1)',state);
assert.equal(state.active,1);assert.equal(nav.at(-1),'services');
assert.equal(routes.at(-1),'services');assert.equal(hashes.at(-1),'#services');
assert.equal(state.position,.22);assert.equal(state.velocity,3.8);
vm.runInContext('select(-1)',state);
assert.equal(state.active,4);assert.equal(nav.at(-1),'start');
assert.equal(state.position,.22);assert.equal(state.velocity,3.8);
assert.equal(cards.filter(c=>c.el.tabIndex===0).length,1);

let motion={position:0,velocity:0,settled:true},target=0,maxVelocity=0;
for(let frame=0;frame<240;frame++){
 if(frame<36&&frame%4===0)target++;
 if(frame===36)target=4; // reverse before the previous destination is reached
 const previous=motion.position;
 motion=slideStep(motion.position,motion.velocity,target,1/60);
 assert.ok(Number.isFinite(motion.position)&&Number.isFinite(motion.velocity));
 assert.ok(Math.abs(motion.position-previous)<.8,'No teleport on retarget');
 maxVelocity=Math.max(maxVelocity,Math.abs(motion.velocity));
}
assert.equal(motion.position,4);assert.equal(motion.settled,true);
assert.ok(maxVelocity>4,'Rapid input can traverse multiple slides per second');
assert.deepEqual(slideStep(2.2,9,-1,1/60,true),{position:-1,velocity:0,settled:true});
for(const start of [-101,0,104]){
 let m={position:start,velocity:0};
 for(let i=0;i<90;i++)m=slideStep(m.position,m.velocity,start+1,1/60);
 assert.equal(wrap(m.position),wrap(start+1));
}
const wheel={time:0,delta:0,used:false,sign:0,stepTime:-Infinity};
assert.equal(wheelStep(wheel,120,1000),1);
assert.equal(wheelStep(wheel,120,1090),1);
assert.equal(wheelStep(wheel,120,1180),1,'A sustained gesture must not lock after one slide');
for(const t of [1196,1212,1228,1244])assert.equal(wheelStep(wheel,8,t),0,'Small tail must not advance');
assert.equal(wheelStep(wheel,-30,1250),-1,'Direction reversal responds immediately');
assert.equal(wheelStep(wheel,0,1266),0);
console.log('SLIDER_SYNC_VERIFIED: immediate nav/route, velocity continuity, sustained wheel, reversal, loop and reduced motion');
