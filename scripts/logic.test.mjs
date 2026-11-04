import test from 'node:test';
import assert from 'node:assert/strict';
import {PAGES} from '../src/config.mjs';
import {wrap,distance,readLocation,embedAddress,validEnvelope,validLegacyEnvelope} from '../src/logic.mjs';
test('loop is continuous in both directions and always places each slide once',()=>{
  assert.equal(wrap(-1),4);assert.equal(wrap(5),0);
  for(let i=-15;i<15;i++)assert.deepEqual(PAGES.map((_,j)=>distance(j,wrap(i))).sort(),[-1,-2,0,1,2].sort());
});
test('legacy Tide compatibility uses the same source, origin and session boundary',()=>{
  const source={},r={source,origin:'https://mementostudio.vercel.app',stageId:'s01_memento',sessionId:'unique-session'};
  const e={source,origin:r.origin,data:{channel:'memento:tide',version:1,stageId:r.stageId,sessionId:r.sessionId,type:'READY',payload:{}}};
  assert.equal(validLegacyEnvelope(e,r),true);assert.equal(validLegacyEnvelope({...e,source:{}},r),false);assert.equal(validLegacyEnvelope({...e,data:{...e.data,stageId:'s02_services'}},r),false);assert.equal(validLegacyEnvelope({...e,origin:'https://evil.example'},r),false);
});
test('all public destinations and legacy deep links resolve',()=>{
  for(const page of PAGES){assert.equal(readLocation(page.publicURL).page.id,page.id);assert.equal(readLocation(`/#${page.slug}`).page.id,page.id);assert.equal(readLocation(`/#${page.id}-content`).open,true);}
  assert.equal(readLocation('/unknown').index,0);assert.equal(readLocation('/memento').page.id,'memento');
});
test('context and anchors survive page navigation without allowing arbitrary query injection',()=>{
  const route=readLocation('/services?service=web&secret=x#web');assert.equal(route.query,'service=web');assert.equal(route.anchor,'#web');
  const u=new URL(embedAddress(route.page,route.query,route.anchor));assert.equal(u.origin,'https://mementoservizi.vercel.app');assert.equal(u.searchParams.get('mementoEmbed'),'1');assert.equal(u.hash,'#web');assert.equal(u.searchParams.has('secret'),false);
  assert.equal(new URL(embedAddress(PAGES[0],'bad=evil','#<script>')).hash,'');
});
test('bridge accepts its live frame and rejects source, origin, station, session and schema mismatches',()=>{
  const source={},record={source,origin:'https://mementostart.vercel.app',page:PAGES[4],sessionId:'a-valid-session-id'};
  const event={source,origin:record.origin,data:{channel:'memento:navigation',version:2,station:'start',sessionId:record.sessionId,type:'READY',payload:{}}};
  assert.equal(validEnvelope(event,record),true);
  assert.equal(validEnvelope({...event,source:{}},record),false);assert.equal(validEnvelope({...event,origin:'https://evil.example'},record),false);
  for(const [k,v]of Object.entries({version:3,station:'services',sessionId:'old',payload:[],channel:'other'}))assert.equal(validEnvelope({...event,data:{...event.data,[k]:v}},record),false);
});
