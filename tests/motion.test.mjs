import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {PerspectiveCamera,Object3D,Vector3,Quaternion} from 'three';
import {applyProjection,sampleTRS,applyFacing,Navigator,blenderEnvironmentRotation} from '../public/src/motion.mjs';
const data=JSON.parse(await readFile(new URL('../public/assets/scene.json',import.meta.url),'utf8'));
const close=(a,b,e=1e-5)=>assert.ok(Math.abs(a-b)<e,`${a} != ${b}`);
const tick=(n,seconds)=>{for(let t=0;t<seconds;t+=.05)n.tick(.05);};
test('HDR lookup matches Blender World Normal and Mapping, including latitude reversal',()=>{
 const a=data.environment.rotation_z_blender;
 for(const xyz of [[1,.1,0],[0,.3,1],[-1,-.5,.2],[.3,.6,-1],[-.5,-.6,-1]]){
  const w=new Vector3(...xyz).normalize(),bx=-w.x,by=w.z,bz=-w.y;
  const nx=Math.cos(a)*bx-Math.sin(a)*by,ny=Math.sin(a)*bx+Math.cos(a)*by;
  const nativeU=.5-Math.atan2(ny,nx)/(2*Math.PI),nativeV=.5+Math.asin(bz)/Math.PI;
  const lookup=w.clone().applyAxisAngle(new Vector3(0,1,0),-blenderEnvironmentRotation(a));
  const webU=.5+Math.atan2(lookup.z,lookup.x)/(2*Math.PI),webV=.5-Math.asin(lookup.y)/Math.PI;
  const du=Math.abs(nativeU-webU);assert.ok(Math.min(du,1-du)<1e-10);close(webV,nativeV,1e-10);
 }
});
test('projection and world poses match the 15 Blender references',()=>{
 const c=new PerspectiveCamera();
 for(const p of ['desktop','mobile','ultrawide']){const cfg=data.cameras[p];applyProjection(c,data,cfg.width,cfg.height);c.projectionMatrix.elements.forEach((x,i)=>close(x,cfg.projection[i]));}
 for(const r of data.reference.poses){const cfg=data.cameras[r.profile];applyProjection(c,data,cfg.width,cfg.height);sampleTRS([r.camera],0,c);c.updateMatrixWorld(true);const ndc=new Vector3().fromArray(r.point).project(c);close(ndc.x,r.ndc[0],2e-5);close(ndc.y,r.ndc[1],2e-5);}
});
test('locked-axis icon facing reproduces native anchor orientations',()=>{
 const nodes=new Map(data.nodes.map(n=>[n.name,new Object3D()]));
 for(const n of data.nodes){const o=nodes.get(n.name);sampleTRS([n.trs],0,o);if(n.parent)nodes.get(n.parent).add(o);}
 const root=nodes.get('WORLD_ROOT'),c=new PerspectiveCamera(),actual=new Quaternion();
 for(const ref of data.reference.anchors){
  for(const [n,track] of Object.entries(data.tracks))sampleTRS(track,ref.frame-1,nodes.get(n));
  sampleTRS([ref.camera],0,c);root.updateMatrixWorld(true);
  for(const [n,tr] of Object.entries(ref.anchors)){const o=nodes.get(n);applyFacing(o,c);o.updateWorldMatrix(true,false);o.getWorldQuaternion(actual);const expected=new Quaternion().fromArray(tr,3).normalize();assert.ok(actual.angleTo(expected)<.0001,`${n}, frame ${ref.frame}, error ${actual.angleTo(expected)}`);}
 }
});
test('tall phones preserve the native mobile horizontal field of view',()=>{
 const native=new PerspectiveCamera(),phone=new PerspectiveCamera();applyProjection(native,data,720,1280);
 for(const [w,h] of [[390,844],[360,800]]){applyProjection(phone,data,w,h);close(phone.projectionMatrix.elements[0],native.projectionMatrix.elements[0]);assert.ok(phone.fov>native.fov);}
});
test('Services descent and return use the same native path',()=>{
 const c=new PerspectiveCamera(),n=new Navigator(data,c);n.arrive(1);const p=c.position.clone(),q=c.quaternion.clone();
 assert.equal(n.enter(),true);n.ready(1);tick(n,6.1);assert.equal(n.state,'page');close(c.position.y,-24,1e-4);
 n.back();tick(n,6.1);assert.equal(n.state,'idle');assert.equal(n.active,1);assert.ok(c.position.distanceTo(p)<1e-5);assert.ok(c.quaternion.angleTo(q)<1e-6);
});
test('entry waits for local page readiness and supports cancellation',()=>{
 const n=new Navigator(data,new PerspectiveCamera());n.arrive(1);n.enter();tick(n,6.1);assert.equal(n.state,'waiting');n.ready(2);assert.equal(n.state,'waiting');n.ready(1);assert.equal(n.state,'page');
 n.back();tick(n,6.1);n.enter();tick(n,2);const y=n.camera.position.y;n.back();n.tick(.1);assert.ok(n.camera.position.y>=y);tick(n,3);assert.equal(n.state,'idle');
});
test('queued station navigation, reverse and wrap stay on native orbit',()=>{
 const n=new Navigator(data,new PerspectiveCamera());n.select(1);n.tick(1);n.select(3);tick(n,10);assert.equal(n.active,3);assert.equal(n.state,'idle');
 n.arrive(4);n.select(0);tick(n,3.1);assert.equal(n.active,0);close(n.camera.position.distanceTo(new Vector3().fromArray(data.cameras.orbit.samples[0])),0,1e-4);
 n.select(1);n.tick(.8);n.back();tick(n,1);assert.equal(n.active,0);assert.equal(n.state,'idle');
});
test('reduced motion retains destinations without camera travel',()=>{
 const n=new Navigator(data,new PerspectiveCamera(),{reduced:true});assert.equal(n.enter(),false);n.select(1);assert.equal(n.active,1);n.enter();n.ready(1);n.tick(.01);assert.equal(n.state,'page');n.back();n.tick(.01);assert.equal(n.state,'idle');
});
test('export preserves each named node and parent; no flattened static world',async()=>{
 const b=await readFile(new URL('../public/assets/world.glb',import.meta.url)),len=b.readUInt32LE(12);const g=JSON.parse(b.subarray(20,20+len).toString());
 assert.equal(g.nodes.length,data.nodes.length);const names=new Set(g.nodes.map(n=>n.name));assert.ok(data.nodes.every(n=>names.has(n.name)));
 const parents=new Map();for(const n of g.nodes)for(const child of n.children||[])parents.set(g.nodes[child].name,n.name);
 for(const n of data.nodes)assert.equal(parents.get(n.name)||null,n.parent);
 const triangles=g.meshes.reduce((s,m)=>s+m.primitives.reduce((s,p)=>s+g.accessors[p.indices].count/3,0),0);assert.equal(triangles,152818);
});
