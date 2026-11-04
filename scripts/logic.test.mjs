import test from 'node:test';
import assert from 'node:assert/strict';
import {PAGES} from '../src/config.mjs';
import {wrap,distance,readLocation,pageAddress} from '../src/logic.mjs';
test('loop in both directions places every slide exactly once',()=>{
  assert.equal(wrap(-1),4);assert.equal(wrap(5),0);
  for(let i=-15;i<15;i++)assert.deepEqual(PAGES.map((_,j)=>distance(j,wrap(i))).sort(),[-1,-2,0,1,2].sort());
});
test('all canonical destinations and old selection links still select the correct slide',()=>{
  for(const p of PAGES){assert.equal(readLocation(p.publicURL).page.id,p.id);assert.equal(readLocation(`/#${p.slug}`).page.id,p.id);assert.equal(readLocation(`/#${p.id}-content`).page.id,p.id);}
  assert.equal(readLocation('/unknown').index,0);
});
test('direct navigation retains safe deep-link context and always uses the canonical origin',()=>{
  const r=readLocation('/services?service=web&secret=x#web');
  assert.equal(pageAddress(r.page,r.query,r.anchor),'https://mementostudio.it/services?service=web#web');
  for(const p of PAGES)assert.equal(pageAddress(p),p.publicURL);
  assert.equal(pageAddress(PAGES[0],'bad=x','#<script>'),PAGES[0].publicURL);
});
