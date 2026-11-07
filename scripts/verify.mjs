import assert from 'node:assert/strict';
import {layout,pose,project,unproject,relative,nearest,dragSnap,wrap} from '../dist/src/model.mjs';
import {mesh} from '../dist/src/geometry.mjs';
const sizes=[[1997,787,2.1],[2560,1080,2.1],[1440,900,2.1],[834,1194,1.08],[390,844,.8],[844,390,2.1],[320,568,.8]];
for(const [w,h,r]of sizes){const l=layout(w,h);assert.equal(l.ratio,r);assert.ok(l.width<=w*.9+.01&&l.height<=h*.605+.01);assert.ok(l.width/w>.49);assert.ok(Math.abs(l.padding/l.width-.06)<1e-8);
 if(w/h>1.5)assert.ok(Math.abs(l.height/h-.605)<.01);
 for(const d of [-1,1]){const p=pose(d,l),top=project(0,0,p,l),bottom=project(0,l.height,p,l);assert.ok(d<0?top.z>bottom.z:bottom.z>top.z);const outer=d<0?top:bottom,inner=d<0?bottom:top;assert.ok(Math.abs(outer.x-l.cx)>Math.abs(inner.x-l.cx));assert.ok(Math.abs(Math.abs(inner.y-l.cy)-l.height/2-l.gap)<1e-6);for(const [x,y]of [[0,0],[l.width*.2,l.height*.8],[l.width,l.height]]){const proj=project(x,y,p,l),local=unproject(proj.x,proj.y,p,l);assert.ok(Math.abs(local.x-x)<1e-6&&Math.abs(local.y-y)<1e-6);}}
}
const reference=layout(1997,787);assert.ok(Math.abs(reference.width-1002)<8&&Math.abs(reference.height-476)<5);

assert.equal(nearest(0,4),5);assert.equal(nearest(4,0),-1);assert.equal(relative(0,5),0);assert.equal(wrap(-1),4);
for(let i=0;i<5;i++)for(let step=-50;step<=50;step++){const p=step/10;assert.ok(Math.abs(relative(i,p+5)-relative(i,p))<1e-10);}
assert.equal(dragSnap(0,.3,.0),1);assert.equal(dragSnap(0,.05,0),0);assert.equal(dragSnap(0,-.06,-.6),-1);assert.equal(dragSnap(4,5,.8,true),4);
const m=mesh(55,8,5);assert.ok(m.triangles.length>60);assert.deepEqual(m,mesh(55,8,5));let area=0;for(const tr of m.triangles){const[a,b,c]=tr.map(i=>m.points[i]);area+=Math.abs((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x))/2;}assert.ok(Math.abs(area-1)<1e-9);
// Positive control: reversed tilt must fail the outward-edge condition.
const l=layout(1440,900),wrong={...pose(-1,l),angle:l.angle};assert.throws(()=>assert.ok(project(0,0,wrong,l).z>project(0,l.height,wrong,l).z));
console.log('NAV_CONTRACT_VERIFIED',JSON.stringify({viewports:sizes.length,faces:m.triangles.length,area}));
