import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {backgroundMesh} from '../dist/src/bg-geometry.mjs';
import {Field} from '../dist/src/field.mjs';
import {layout} from '../dist/src/model.mjs';

for(const [w,h,small,count]of [[1920,1080,false,100],[1080,1831,false,88],[390,844,true,68]]){
 const start=performance.now(),m=backgroundMesh(w,h,small),cold=performance.now()-start;
 assert.equal(m.points.length,count);
 assert.equal(m,backgroundMesh(w+1,h,small),'proportional resize reuses normalized topology');
 const bins=Array(48).fill(0);for(const p of m.points)bins[Math.min(5,Math.floor(p.y*6))*8+Math.min(7,Math.floor(p.x*8))]++;
 assert.ok(Math.max(...bins)<=5,'no tiny dense carpet in either corner');
 const central=m.points.filter(p=>p.x>.32&&p.x<.67&&p.y>.18&&p.y<.8);
 assert.ok(central.length/m.points.length<.19,'middle remains more open than its area share');
 let area=0;for(const ids of m.triangles){const[a,b,c]=ids.map(i=>m.points[i]),part=((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x))/2;assert.ok(part>1e-10);area+=part;}
 assert.ok(Math.abs(area-1)<1e-8,'triangles cover whole viewport without holes or overlap');
 const begin=performance.now();for(let i=0;i<1000;i++)assert.equal(backgroundMesh(w,h,small),m);const warm=(performance.now()-begin)/1000;
 assert.ok(cold<20&&warm<1,'no expensive resize-time triangulation');
 console.log(`R10_BACKGROUND ${w}x${h}: ${count} vertices/${m.triangles.length} faces; max local bin ${Math.max(...bins)}; cold ${cold.toFixed(3)}ms; cached ${warm.toFixed(4)}ms`);
}
const alpha=color=>{assert.ok(!color.includes('NaN'));return Number(color.match(/,([.\d]+)\)$/)?.[1]);};
let gradients=[],fills=[],rects=[],images=[],strokes=[];
const context=new Proxy({
 createRadialGradient(...args){const g={kind:'radial',args,stops:[],addColorStop(at,color){alpha(color);this.stops.push([at,color]);}};gradients.push(g);return g;},
 createLinearGradient(...args){const g={kind:'linear',args,stops:[],addColorStop(at,color){alpha(color);this.stops.push([at,color]);}};gradients.push(g);return g;},
 fill(){fills.push(this.fillStyle);},fillRect(...args){rects.push({args,style:this.fillStyle});},drawImage(...args){images.push(args);},stroke(){strokes.push({width:this.lineWidth,style:this.strokeStyle});},
 },{get:(o,k)=>k in o?o[k]:(()=>{}),set:(o,k,v)=>{if(typeof v==='string')assert.ok(!v.includes('NaN'));assert.notEqual(k,'shadowBlur','no runtime blur');o[k]=v;return true;}});
const canvas=()=>({getContext:()=>context,setAttribute(){},remove(){}}),savedDocument=globalThis.document,savedDpr=globalThis.devicePixelRatio;
globalThis.document={createElement:canvas,body:{append(){}}};globalThis.devicePixelRatio=1;
function verifySurface(records){assert.ok(records.length>0);for(const f of records){assert.equal(f.kind,'radial','each face shades smoothly from a vertex');assert.equal(f.stops.at(-1)[0],1);assert.equal(alpha(f.stops.at(-1)[1]),0,'face light fades fully');assert.ok(f.stops.every(([,c])=>alpha(c)<=.056),'very subtle face light');}}
// Positive fixtures deliberately violate each absence/bound assertion.
assert.throws(()=>verifySurface(['rgba(150,157,167,.03)']));
assert.throws(()=>verifySurface([{kind:'radial',stops:[[0,'rgba(255,159,48,.5)'],[1,'rgba(255,159,48,0)']]}]));
try{
 const early=new Field(canvas());early.dispose();
 const field=new Field(canvas()),l=layout(1200,800);field.resize(l);
 const positions=field.positions,shadeGradients=field.faceShades.map(f=>f.gradient);field.resize(l);assert.equal(field.positions,positions,'unchanged resize preserves buffers');
 for(const f of field.faceShades){const origin=field.points[f.anchor];assert.equal(f.gradient.args[0],origin.x);assert.equal(f.gradient.args[1],origin.y);assert.ok(f.shade<=.039&&f.shade>=.018);assert.equal(f.gradient.stops[2][0],.76);assert.ok(alpha(f.gradient.stops[2][1])<.0032);}
 gradients=[];fills=[];rects=[];images=[];strokes=[];
 for(let i=0;i<20;i++){field.begin(1000+i*34);field.draw(1000+i*34);}
 verifySurface(fills);assert.equal(gradients.length,0,'idle gradients are cached, never rebuilt per frame');assert.equal(images.length,0,'background vertices use no bloom sprites');
 assert.ok(field.faceShades.every((f,i)=>f.gradient===shadeGradients[i]));
 fills=[];rects=[];images=[];strokes=[];gradients=[];field.pointer={x:140,y:250,strength:1};
 for(let frame=0;frame<100;frame++){
  const t=2000+frame*16;field.begin(t);field.draw(t);
  for(let i=0;i<field.points.length;i++){const p=field.points[i],q=field.positions[i];assert.ok(Number.isFinite(q.x)&&Number.isFinite(q.y));assert.ok(Math.hypot(q.x-p.x,q.y-p.y)<=field.shortest[i]*.091,'bounded elastic movement');}
 }
 verifySurface(fills);assert.equal(images.length,0,'hover vertices do not create broad star glows');
 assert.ok(strokes.every(s=>s.width<=.7),'no inflated hot edge strokes');
 const pins=rects.filter(r=>r.args[2]<5&&r.args[3]<5);assert.ok(pins.length>0);assert.ok(pins.every(p=>p.args[2]<=1.15&&alpha(p.style)<=.63),'nodes stay tiny, low energy pins');
 assert.ok(gradients.some(g=>g.kind==='radial'),'local amber also originates at vertices');
 assert.ok(Math.max(...field.positions.map(p=>p.light))>.6,'interaction strength is retained for downstream effects');
 const distant=field.positions.filter(p=>Math.hypot(p.x-140,p.y-250)>500);assert.ok(distant.every(p=>p.light<.005),'amber remains local');
 field.pointer.strength=0;for(let f=0;f<200;f++)field.begin(3700+f*16);assert.ok(field.positions.every(p=>p.light<.002),'return to quiet');
 field.pool.emit(140,300,130,300,7000);field.pool.update(7016,.016);strokes=[];field.finish();assert.equal(strokes.length,0,'trail consists only of triangles');
 field.begin(8000,true);assert.equal(field.pool.count,0);field.dispose();
}finally{globalThis.document=savedDocument;globalThis.devicePixelRatio=savedDpr;}
console.log('BACKGROUND_R10_VERIFIED: calibrated cached topology, vertex-origin gradient shading, restrained pins, no node bloom, local amber, bounded idle and return');
