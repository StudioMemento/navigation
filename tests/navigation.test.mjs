import test from 'node:test';
import assert from 'node:assert/strict';
import {STATIONS,readRoute,routePath,contentURL,navigationLink,trustedParent,validMessage,sessionEnvelope,safeContext} from '../hub/public/navigation/core.mjs';
const origin='https://mementoservizi.vercel.app',source={};
const record={id:'services',origin,source,sessionId:'opaque-session-123456'};
test('all five pages resolve to original live origins, including Memento',()=>{
  assert.equal(STATIONS.length,5);
  for(const s of STATIONS){const r=readRoute('https://mementonav.vercel.app'+s.path);assert.equal(r.id,s.id);assert.equal(r.view,'page');assert.equal(new URL(contentURL(r)).origin,new URL(s.url).origin);assert.equal(new URL(contentURL(r)).searchParams.get('mementoEmbed'),'1');}
});
test('deep links retain allowlisted CTA context and safe hash through reload',()=>{
  const r=readRoute('https://mementonav.vercel.app/start/?from=projects&project=Auren&token=secret#brief');
  assert.equal(routePath(r),'/start/?from=projects&project=Auren#brief');assert(!contentURL(r).includes('secret'));
  assert.equal(safeContext('goal='+ 'a'.repeat(2001)),'');
});
test('world selection is distinct from opening a content page',()=>{
  assert.equal(readRoute('https://mementonav.vercel.app/#services').view,'world');
  assert.equal(readRoute('https://mementonav.vercel.app/services/').view,'page');
});
test('cross-app CTA becomes a hub route, local gallery hash and external actions stay native',()=>{
  assert.deepEqual(navigationLink('https://mementostart.vercel.app/?from=projects&project=Auren','https://mementoportfolio.vercel.app/'),{id:'start',view:'page',search:'from=projects&project=Auren',hash:''});
  for(const href of ['#project-auren','mailto:hello@mementostudio.it','https://example.com/','javascript:alert(1)'])assert.equal(navigationLink(href,'https://mementoportfolio.vercel.app/'),null);
});
test('only trusted parent origins may initialize a child',()=>{
  assert(trustedParent('https://mementonav.vercel.app'));
  assert(trustedParent('https://mementonav-ab12-studio-memento-s-projects.vercel.app'));
  for(const value of ['https://mementonav.vercel.app.evil.com','https://attacker.vercel.app','null','http://mementonav.vercel.app'])assert(!trustedParent(value));
});
test('postMessage requires correct origin, source, station, version and session',()=>{
  const valid={origin,source,data:sessionEnvelope('services',record.sessionId,'RETURN')};assert(validMessage(valid,record));
  for(const bad of [{origin:'https://evil.example'},{source:{}},{data:{...valid.data,sessionId:'old'}},{data:{...valid.data,station:'start'}},{data:{...valid.data,version:1}},{data:{...valid.data,payload:[]}}])assert(!validMessage({...valid,...bad},record));
});
