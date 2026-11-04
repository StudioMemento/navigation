// A perspective camera looking down -Z. World units equal CSS px at the focal plane.
// Physics uses projected coordinates, so the six frame walls are the camera frustum.
export function cameraFor(w,h){
 const s=Math.min(w,h),distance=s*1.8;
 return {w,h,distance,focus:distance,near:s*.10,far:s*5.8,aperture:s*.019};
}
export function projectPoint(x,y,z,c,out=[]){
 const magnification=c.distance/(c.distance-z);
 out[0]=c.w*.5+(x-c.w*.5)*magnification;
 out[1]=c.h*.5+(y-c.h*.5)*magnification;out[2]=z;return out;
}
export function unprojectPoint(x,y,z,c,out=[]){
 const inverse=(c.distance-z)/c.distance;
 out[0]=c.w*.5+(x-c.w*.5)*inverse;
 out[1]=c.h*.5+(y-c.h*.5)*inverse;out[2]=z;return out;
}
export function circleOfConfusion(z,c){return Math.abs(c.aperture*(1-c.focus/(c.distance-z)));}
