import assert from 'node:assert/strict';
import {backgroundMesh} from '../dist/src/geometry.mjs';
import {Field} from '../dist/src/field.mjs';
import {layout} from '../dist/src/model.mjs';

for(const [w,h,small] of [[390,844,true],[1200,800,false],[1080,1831,false],[1920,1080,false],[2560,1440,false]]){
 const m=backgroundMesh(w,h,small);
 assert.deepEqual(m,backgroundMesh(w,h,small),'topology stays deterministic');
 assert.ok(m.points.length<=(small?240:580),'bounded vertex budget');
 assert.ok(m.triangles.length>(small?200:380),'denser than R7');
 let area=0;
 for(const ids of m.triangles){const [a,b,c]=ids.map(i=>m.points[i]);const part=Math.abs((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x))/2;assert.ok(part>1e-10,'no degenerate faces');area+=part;}
 assert.ok(Math.abs(area-1)<1e-8,'triangles cover viewport without gaps or overlaps');
 console.log(`BACKGROUND ${w}x${h}: ${m.points.length} vertices, ${m.triangles.length} faces`);
}
let gradients=0,strokes=0;
const context=new Proxy({createLinearGradient(){gradients++;return {addColorStop(_,color){assert.ok(!color.includes('NaN'));}};},stroke(){strokes++;}}, {get:(o,k)=>k in o?o[k]:(()=>{}),set:(o,k,v)=>{if(typeof v==='string')assert.ok(!v.includes('NaN'));o[k]=v;return true;}});
const canvas=()=>({getContext:()=>context,setAttribute(){},remove(){}}),savedDocument=globalThis.document,savedDpr=globalThis.devicePixelRatio;
globalThis.document={createElement:canvas,body:{append(){}}};globalThis.devicePixelRatio=1;
try{
 const l=layout(1200,800),idle=new Field(canvas()),hover=new Field(canvas());idle.resize(l);hover.resize(l);
 let idleMovement=0,hoverMovement=0;
 for(let frame=0;frame<120;frame++){
  const t=1000+frame*16;hover.pointer={x:150,y:300,strength:1};idle.begin(t);hover.begin(t);hover.draw(t);
  for(let i=0;i<hover.points.length;i++){
   const p=hover.points[i],q=hover.positions[i],base=idle.positions[i];
   assert.ok(Number.isFinite(q.x)&&Number.isFinite(q.y));
   assert.ok(Math.hypot(q.x-p.x,q.y-p.y)<=hover.shortest[i]*.091,'motion stays within local topology clearance');
   if(frame>60&&q.energy>.5){idleMovement+=Math.hypot(base.x-p.x,base.y-p.y);hoverMovement+=Math.hypot(q.x-p.x,q.y-p.y);}
  }
 }
 assert.ok(idleMovement>0,'idle mesh animates');assert.ok(hoverMovement>idleMovement*1.5,'hover strengthens motion');assert.ok(gradients>0,'amber interpolates over actual faces');
 hover.pool.emit(140,300,130,300,4000);hover.pool.update(4016,.016);strokes=0;hover.finish();assert.equal(strokes,0,'particle trail contains no line strokes');
 hover.begin(5000,true);assert.equal(hover.pool.count,0,'reduced motion clears particles');
 idle.dispose();hover.dispose();
}finally{globalThis.document=savedDocument;globalThis.devicePixelRatio=savedDpr;}
console.log('BACKGROUND_R8_VERIFIED: coverage, budget, stable topology, bounded idle/hover motion, amber gradients, triangle-only trail');
