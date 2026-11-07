import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {backgroundMesh} from '../dist/src/bg-geometry.mjs';
import {Field} from '../dist/src/field.mjs';
import {layout} from '../dist/src/model.mjs';

for(const [w,h,small] of [[1920,1080,false],[1080,1831,false],[390,844,true]]){
 const start=performance.now(),m=backgroundMesh(w,h,small),cold=performance.now()-start;
 assert.equal(m,backgroundMesh(w+1,h,small),'nearby resize reuses normalized topology');
 assert.ok(m.points.length<=(small?80:180)&&m.points.length>=(small?70:100),'reference node budget');
 const clusters=m.points.filter(p=>(p.x<.31&&p.y<.56)||(p.x>.67&&p.y>.51));
 const center=m.points.filter(p=>p.x>.32&&p.x<.67&&p.y>.18&&p.y<.8);
 assert.ok(clusters.length>m.points.length*.55,'most nodes belong to two corner clusters');
 assert.ok(center.length<10,'center retains large open facets');
 let area=0;for(const ids of m.triangles){const[a,b,c]=ids.map(i=>m.points[i]),part=Math.abs((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x))/2;assert.ok(part>1e-10);area+=part;}
 assert.ok(Math.abs(area-1)<1e-8,'mesh covers viewport without holes');
 const cachedStart=performance.now();for(let i=0;i<1000;i++)backgroundMesh(w,h,small);const cached=(performance.now()-cachedStart)/1000;
 assert.ok(cold<20&&cached<1,'startup and repeated resize budgets');
 console.log(`BACKGROUND ${w}x${h}: ${m.points.length} vertices/${m.triangles.length} faces; cold ${cold.toFixed(3)}ms; cached ${cached.toFixed(4)}ms`);
}
let gradients=0,drawImages=0,strokes=0;
const gradient=()=>({addColorStop(_,color){assert.ok(!color.includes('NaN'));}});
const context=new Proxy({createLinearGradient(){gradients++;return gradient();},createRadialGradient:gradient,drawImage(){drawImages++;},stroke(){strokes++;}}, {get:(o,k)=>k in o?o[k]:(()=>{}),set:(o,k,v)=>{if(typeof v==='string')assert.ok(!v.includes('NaN'));assert.notEqual(k,'shadowBlur','no per-frame shadow blur');o[k]=v;return true;}});
const canvas=()=>({getContext:()=>context,setAttribute(){},remove(){}}),savedDocument=globalThis.document,savedDpr=globalThis.devicePixelRatio;
globalThis.document={createElement:canvas,body:{append(){}}};globalThis.devicePixelRatio=1;
try{
 const field=new Field(canvas()),l=layout(1200,800);field.resize(l);const oldPositions=field.positions;field.resize(l);assert.equal(field.positions,oldPositions,'unchanged layout does not reset state');
 field.pointer={x:140,y:250,strength:1};
 for(let frame=0;frame<100;frame++){
  const t=1000+frame*16;field.begin(t);field.draw(t);
  assert.ok(field.hotNodes.length<=8,'sprite budget');
  for(let i=0;i<field.points.length;i++){const p=field.points[i],q=field.positions[i];assert.ok(Number.isFinite(q.x)&&Number.isFinite(q.y));assert.ok(Math.hypot(q.x-p.x,q.y-p.y)<=field.shortest[i]*.091,'bounded vertex displacement');}
 }
 assert.ok(gradients>0&&drawImages>0,'node glows and edge/facet gradients are rendered');
 assert.ok(Math.max(...field.positions.map(p=>p.light))>.6,'nearest vertex is a strong local hotspot');
 const distant=field.positions.filter(p=>Math.hypot(p.x-140,p.y-250)>500);assert.ok(distant.every(p=>p.light<.005),'light remains local');
 field.pointer.strength=0;for(let f=0;f<200;f++)field.begin(2700+f*16);assert.ok(field.positions.every(p=>p.light<.002),'light returns to quiet');
 field.pool.emit(140,300,130,300,6000);field.pool.update(6016,.016);strokes=0;field.finish();assert.equal(strokes,0,'triangle trail draws no line strokes');
 field.begin(7000,true);assert.equal(field.pool.count,0);field.dispose();
}finally{globalThis.document=savedDocument;globalThis.devicePixelRatio=savedDpr;}
console.log('BACKGROUND_R9_VERIFIED: clustered topology, open center, coverage, cache, local node light, bounded idle, return, triangle trail');
