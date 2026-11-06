import test from 'node:test';
import assert from 'node:assert/strict';
import {PAGES} from '../src/config.mjs';
import {wrap,readLocation,pageAddress} from '../src/logic.mjs';
import {verticalIntent,dragDestination,slotAt,centerSlot,nearestSlot,isModified,shouldSuppressClick} from '../src/gesture.mjs';
test('a complete forward and reverse loop preserves every page at both sentinel boundaries',()=>{
 for(let n=-30;n<30;n++)assert.equal(wrap(n),wrap(n+5));
 for(let n=0;n<15;n++){const centered=centerSlot(n);assert.ok(centered>=5&&centered<10);assert.equal(wrap(centered),wrap(n));}
 assert.equal(nearestSlot(0,9),10);assert.equal(nearestSlot(4,5),4);
 assert.equal(slotAt(843.75*8.99,843.75),9);assert.equal(slotAt(-30,844),0);assert.equal(slotAt(999999,844),14);
});
test('vertical mouse drags work in both directions across viewport heights; horizontal or tiny jitter does not claim the gesture',()=>{
 assert.equal(verticalIntent(100,40),false);assert.equal(verticalIntent(3,-70),true);assert.equal(verticalIntent(0,7),false);
 for(const h of [320,568,844,1080]){
  assert.equal(dragDestination(7,-h*.2,700,h),8);
  assert.equal(dragDestination(7,h*.2,700,h),6);
  assert.equal(dragDestination(7,-24,30,h),8);
  assert.equal(dragDestination(7,2,3,h),7);
  assert.equal(dragDestination(7,-20,500,h),7);
 }
});
test('scroll suppression blocks accidental click-through while normal and modified clicks retain their behavior',()=>{
 assert.equal(shouldSuppressClick(100,200,false,false),true);
 assert.equal(shouldSuppressClick(201,200,false,false),false);
 assert.equal(shouldSuppressClick(201,200,true,false),true);
 assert.equal(shouldSuppressClick(201,200,false,true),true);
 for(const key of ['metaKey','ctrlKey','shiftKey','altKey'])assert.equal(isModified({button:0,[key]:true}),true);
 assert.equal(isModified({button:1}),true);assert.equal(isModified({button:0}),false);
});
test('all established destinations, hash selections and deep-link context remain correct',()=>{
 for(const p of PAGES){assert.equal(readLocation(p.publicURL).page.id,p.id);assert.equal(readLocation(`/#${p.slug}`).page.id,p.id);assert.equal(readLocation(`/#${p.id}-content`).page.id,p.id);assert.equal(pageAddress(p),p.publicURL);}
 const r=readLocation('/services?service=web&secret=x#web');
 assert.equal(pageAddress(r.page,r.query,r.anchor),'https://mementostudio.it/services?service=web#web');
 assert.equal(pageAddress(PAGES[0],'bad=x','#<script>'),PAGES[0].publicURL);
 assert.equal(readLocation('/unknown').index,0);
});
