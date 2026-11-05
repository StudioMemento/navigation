import * as T from 'three';

// A single camera keeps render passes, ray picking and depth in agreement while
// the homogeneous projection moves continuously from orthographic to perspective.
export function updateStudioProjection(camera,perspective,distance,shiftX=0,shiftY=0){
 const p=T.MathUtils.clamp(perspective,0,1),d=Math.max(.1,distance);
 const n=camera.near,f=camera.far,h=2*d*Math.tan(camera.fov*Math.PI/360);
 const nearW=1-p+p*n/d,farW=1-p+p*f/d;
 const a=-(farW+nearW)/(f-n),b=-nearW+a*n;
 camera.projectionMatrix.set(
  2/(h*camera.aspect),0,-shiftX*p/d,shiftX*(1-p),
  0,2/h,-shiftY*p/d,shiftY*(1-p),
  0,0,a,b,
  0,0,-p/d,1-p
 );
 camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
 camera.userData.projectionDistance=d;
 camera.userData.perspective=p;
}

const farPoint=new T.Vector3();
export function setStudioRay(raycaster,pointer,camera){
 raycaster.camera=camera;
 raycaster.ray.origin.set(pointer.x,pointer.y,-1).unproject(camera);
 farPoint.set(pointer.x,pointer.y,1).unproject(camera);
 raycaster.ray.direction.copy(farPoint).sub(raycaster.ray.origin).normalize();
}

export function exteriorFrameFactor(aspect){return Math.max(1,1.40/aspect);}
