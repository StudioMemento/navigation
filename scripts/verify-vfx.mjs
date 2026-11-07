import assert from 'node:assert/strict';
import {mesh,borderDistance,cardMesh,backgroundMesh,insideCard} from '../dist/src/geometry.mjs';
import {fieldEnergy,visibility,loadVisibility,graphDistances,pulseEnvelope,TrianglePool} from '../dist/src/vfx-core.mjs';
import {layout,project,unproject,pose} from '../dist/src/model.mjs';
import {readFileSync} from 'node:fs';
const m=mesh(89,12,6),copy=mesh(89,12,6);assert.deepEqual(m,copy);const seen=new Set();let area=0;const areas=[];
for(const t of m.triangles){const[a,b,c]=t.map(i=>m.points[i]),a2=Math.abs((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x))/2;assert.ok(a2>0);area+=a2;areas.push(a2);}
assert.ok(Math.abs(area-1)<1e-8);areas.sort((a,b)=>a-b);assert.ok(areas[Math.floor(areas.length*.9)]/areas[Math.floor(areas.length*.1)]>2);
for(const[a,b]of m.edges){const key=[a,b].sort((a,b)=>a-b).join(':');assert.ok(!seen.has(key));seen.add(key);assert.ok(m.neighbors[a].includes(b)&&m.neighbors[b].includes(a));}
for(let x=-400;x<=600;x+=10)for(let y=-400;y<=600;y+=10){const e=fieldEnergy(x,y,{x:200,y:200,strength:1},260);assert.ok(e>=0&&e<=1);assert.equal(fieldEnergy(x,y,{x:200,y:200,strength:0},260),0);}
const circles=Array.from({length:16},(_,i)=>fieldEnergy(200+150*Math.cos(i*Math.PI/8),200+150*Math.sin(i*Math.PI/8),{x:200,y:200,strength:1},260));assert.ok(Math.max(...circles)-Math.min(...circles)>.1);
assert.equal(borderDistance(0,100,800,400,25),.5);assert.ok(borderDistance(400,200,800,400,25)>190);
const l=layout(1440,900),masks=[];for(let step=-30;step<=30;step++){const p=pose(step/30,l);const values=m.points.map(q=>{const v=project(q.x*l.width,q.y*l.height,p,l),b=unproject(v.x,v.y,p,l);assert.ok(Math.abs(b.x-q.x*l.width)<1e-6&&Math.abs(b.y-q.y*l.height)<1e-6);const a=visibility(v.y,44,834,134);assert.ok(a>=0&&a<=1);return a;});masks.push(values);}
for(let step=30;step>=-30;step--){const p=pose(step/30,l),values=m.points.map(q=>visibility(project(q.x*l.width,q.y*l.height,p,l).y,44,834,134));assert.deepEqual(values,masks[step+30]);}
for(const p of m.points){assert.equal(loadVisibility(0,p.x,p.y),0);assert.equal(loadVisibility(1,p.x,p.y),1);let prev=0;for(let t=0;t<=100;t++){const a=loadVisibility(t/100,p.x,p.y);assert.ok(a>=prev);prev=a;}}
assert.ok(loadVisibility(.5,0,1)>loadVisibility(.5,1,0));
const points=[{x:0,y:0},{x:100,y:0},{x:100,y:100},{x:0,y:100}],neighbors=[[1],[0,2],[1,3],[2]],dist=graphDistances(points,neighbors,0,0,500);assert.equal(dist[0],0);assert.ok(dist[3]>dist[2]&&dist[2]>dist[1]);assert.ok(dist[3]>Math.hypot(points[3].x,points[3].y)*2);assert.equal(pulseEnvelope(1,0),0);assert.ok(pulseEnvelope(.07,0)>0);
const pool=new TrianglePool(3);assert.equal(pool.items.length,3);for(let t=100;t<1000;t+=90)pool.emit(100,100,90,100,t);assert.equal(pool.items.filter(p=>p.alive).length,3);for(const p of pool.items)assert.ok(p.vx>0);pool.update(2500,.016);assert.equal(pool.count,0);assert.ok(pool.items.every(p=>!p.alive));
const app=readFileSync(new URL('../dist/src/app.mjs',import.meta.url),'utf8'),html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');assert.equal((app.match(/requestAnimationFrame\(/g)||[]).length,1);assert.ok(app.includes("endPointer(e,true)"));assert.ok(app.includes('if(!cancel&&!motionReduced()){const now='));assert.ok(app.includes('controller.abort()'));assert.ok(html.includes('restoreNav'));assert.ok(!app.includes('touchPulse'));
// Positive controls exercise the invariants instead of trusting absence alone.
assert.throws(()=>assert.ok(circles.every(v=>v===circles[0])));assert.throws(()=>assert.equal(dist[3],100));assert.throws(()=>assert.equal(loadVisibility(.5,0,1),loadVisibility(.5,1,0)));
console.log('VFX_CORE_VERIFIED',JSON.stringify({vertices:m.points.length,faces:m.triangles.length,edges:m.edges.length,coverage:area,projectionAndReverseStates:masks.length,poolCapacity:pool.items.length}));

const card=cardMesh(1000,476,89),bg=backgroundMesh(1997,787);assert.deepEqual(card,cardMesh(1000,476,89));assert.notDeepEqual(card.points,bg.points);assert.ok(card.points.length>bg.points.length);
const edgeLengths=card.edges.map(([a,b])=>{const A=card.points[a],B=card.points[b],x=(A.x+B.x)*500,y=(A.y+B.y)*238;return {d:Math.hypot((A.x-B.x)*1000,(A.y-B.y)*476),near:Math.min(x,1000-x,y,476-y)<24}});const mean=a=>a.reduce((s,p)=>s+p.d,0)/a.length;assert.ok(mean(edgeLengths.filter(p=>p.near))<mean(edgeLengths.filter(p=>!p.near))*.7);assert.ok(insideCard(500,238,1000,476,17));assert.ok(!insideCard(1,1,1000,476,17));assert.ok(!insideCard(999,475,1000,476,17));
console.log('R4_SURFACE_CONTRACT_VERIFIED',JSON.stringify({cardVertices:card.points.length,backgroundVertices:bg.points.length}));
console.log('VFX_CONTRACT_VERIFIED');
