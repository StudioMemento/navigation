import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as T from 'three';
import {StudioNavigation,WalkGrid} from '../dist/studio/navigation.js';
import {updateStudioProjection,setStudioRay,exteriorFrameFactor} from '../dist/studio/projection.js';
import {VIEWS} from '../dist/studio/config.js';

const grid=new WalkGrid(JSON.parse(fs.readFileSync('dist/assets/navigation-grid.json')));
const camera=new T.PerspectiveCamera(32,16/9,.025,90),nav=new StudioNavigation(camera,grid);
const advance=(seconds=5)=>{for(let i=0;i<seconds*120;i++){nav.update(1/120);assert(camera.projectionMatrix.elements.every(Number.isFinite));assert(camera.projectionMatrixInverse.elements.every(Number.isFinite));}};
advance();
const origin=new T.Vector3(...VIEWS[0].target),axisLength=[];
for(const axis of [new T.Vector3(1,0,0),new T.Vector3(0,1,0),new T.Vector3(0,0,1)]){
 const a=origin.clone().project(camera),b=origin.clone().add(axis).project(camera);
 axisLength.push(Math.hypot((b.x-a.x)*camera.aspect,b.y-a.y));
}
const direction=nav.position.clone().sub(origin).normalize();
assert(Math.abs(Math.asin(direction.y)*180/Math.PI-20)<.1,'reference elevation');
assert(Math.abs(Math.atan2(direction.x,direction.z)*180/Math.PI-40)<.1,'reference azimuth');
const sameSizeAtDepth=[new T.Vector3(0,0,-5),new T.Vector3(0,0,-15)].map(p=>{const q=p.clone().add(new T.Vector3(1,0,0));return q.applyMatrix4(camera.projectionMatrix).distanceTo(p.applyMatrix4(camera.projectionMatrix));});
assert(Math.abs(sameSizeAtDepth[0]-sameSizeAtDepth[1])<1e-10,'orthographic scale may not depend on depth');
assert(camera.projectionMatrix.elements[11]===0,'exterior must be orthographic');

// Perspective endpoint, clip planes, focal plane and inverse depth at all blends.
const c=new T.PerspectiveCamera(61,1.6,.025,90),classic=c.projectionMatrix.clone();
for(const blend of [0,.001,.15,.5,.85,.999,1]){
 updateStudioProjection(c,blend,12);
 for(const depth of [.025,1,7,12,35,90]){
  const point=new T.Vector3(.13,.24,-depth),ndc=point.clone().applyMatrix4(c.projectionMatrix);
  assert(ndc.clone().applyMatrix4(c.projectionMatrixInverse).distanceTo(point)<1e-8,'depth reconstruction');
  if(depth===.025)assert(Math.abs(ndc.z+1)<1e-9);
  if(depth===90)assert(Math.abs(ndc.z-1)<1e-9);
 }
 const focal=new T.Vector3(1,1,-12);
 const expected=focal.clone().applyMatrix4(classic),actual=focal.clone().applyMatrix4(c.projectionMatrix);
 assert(Math.hypot(expected.x-actual.x,expected.y-actual.y)<1e-9,'focal plane scale must stay constant');
 if(blend===1)for(const z of [1,3,12,30])assert(new T.Vector3(1,1,-z).applyMatrix4(classic).distanceTo(new T.Vector3(1,1,-z).applyMatrix4(c.projectionMatrix))<1e-9);
}

const meshes=JSON.parse(fs.readFileSync('dist/assets/studio-v4-info.json')).objects.filter(m=>m.zone!=='BACKFACE_REVEAL');
const framing=[];
for(const aspect of [2048/913,16/9,1440/900,1,390/844,320/568]){
 camera.aspect=aspect;nav.frameFactor=exteriorFrameFactor(aspect);nav.go(0);advance();
 const points=[];for(const m of meshes)for(const x of [m.min[0],m.max[0]])for(const y of [m.min[1],m.max[1]])for(const z of [m.min[2],m.max[2]])points.push(new T.Vector3(x,y,z).project(camera));
 const bounds={aspect,minX:Math.min(...points.map(p=>p.x)),maxX:Math.max(...points.map(p=>p.x)),minY:Math.min(...points.map(p=>p.y)),maxY:Math.max(...points.map(p=>p.y))};framing.push(bounds);
 assert(Math.max(...points.map(p=>Math.abs(p.x)))<.96,JSON.stringify(bounds));
 assert(Math.max(...points.map(p=>Math.abs(p.y)))<.96,JSON.stringify(bounds));
 if(aspect<.75){assert(bounds.minY>-.40,'mobile model must clear the lower controls');assert(bounds.maxY<.5,'mobile model must clear the top title');}
 const world=new T.Vector3(1,.7,-1),ndc=world.clone().project(camera),ray=new T.Raycaster();setStudioRay(ray,new T.Vector2(ndc.x,ndc.y),camera);assert(ray.ray.distanceToPoint(world)<1e-8,'orthographic picking');
}
camera.aspect=16/9;nav.frameFactor=1;nav.go(0);advance();
const initial=nav.position.clone(),initialQ=nav.quaternion.clone();
nav.go(1);let prev=0;for(let i=0;i<600;i++){nav.update(1/120);assert(Math.abs(nav.perspective-prev)<.01);prev=nav.perspective;}assert.equal(nav.perspective,1);assert.equal(nav.state,'interior');
nav.exit();advance();assert.equal(nav.perspective,0);assert(nav.position.distanceTo(initial)<1e-8);assert(nav.quaternion.angleTo(initialQ)<1e-7);
const object=new T.Mesh(new T.BoxGeometry(.3,.3,.2));object.position.set(.4,1.2,-2.5);object.updateMatrixWorld();nav.focusObject(object);advance();assert.equal(nav.perspective,1);nav.clearFocus();advance();assert.equal(nav.perspective,0);assert(nav.position.distanceTo(initial)<1e-8);
nav.go(1);advance(.6);const before=nav.perspective;nav.drag(0,0);nav.update(1/120);assert.equal(nav.perspective,before,'interrupt must not snap projection');
nav.go(1);nav.update(.01,true);assert.equal(nav.perspective,1);nav.exit();nav.update(.01,true);assert.equal(nav.perspective,0);
// A slow renderer must not stretch a 3.7-second trip into minutes.
nav.go(1);for(let i=0;i<8;i++)nav.update(.05,false,.5);assert.equal(nav.state,'interior');assert.equal(nav.perspective,1);
console.log(JSON.stringify(framing));
console.log('ISOMETRIC_OK: orthographic reference framing and depth-independent scale; six aspect ratios; generalized picking/depth; smooth ultrawide entry, exit, focus restore, interruption and reduced motion.');
