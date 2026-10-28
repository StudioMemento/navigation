// Shared, DOM-independent navigation math. Positions stay unwrapped across loops.
export const clamp = (n, low=0, high=1) => Math.max(low, Math.min(high, n));
export const smooth = n => {const t=clamp(n);return t*t*t*(10+t*(-15+6*t));};
export const wrap = (n, count) => ((n % count) + count) % count;
export const mix = (a,b,t) => a+(b-a)*t;
export function nearestStop(index, current, count) {
  return current + wrap(index-current+count/2,count)-count/2;
}
export function releaseStop({start, position, velocity, moved, cancelled=false}) {
  if(cancelled || !moved) return Math.round(position);
  // At most one extra stop of inertia, never a stale pointer-up velocity.
  const projected=position+clamp(velocity*.16,-.65,.65);
  if(Math.abs(projected-start)<.5 && Math.abs(position-start)>.12 && Math.abs(velocity)>.7)
    return Math.round(start)+Math.sign(velocity);
  return Math.round(projected);
}
function orbit(a,b,t) {
  const ra=Math.hypot(a[0],a[2]),rb=Math.hypot(b[0],b[2]);
  const aa=Math.atan2(a[0],a[2]),ab=Math.atan2(b[0],b[2]);
  const delta=wrap(ab-aa+Math.PI,2*Math.PI)-Math.PI;
  const angle=aa+delta*t,radius=mix(ra,rb,t);
  return [Math.sin(angle)*radius,mix(a[1],b[1],t),Math.cos(angle)*radius];
}
export function sampleCarousel(poses, position) {
  const low=Math.floor(position),u=position-low,a=poses[wrap(low,poses.length)],b=poses[wrap(low+1,poses.length)];
  return {position:orbit(a.position,b.position,u),target:orbit(a.target,b.target,u),fov:mix(a.fov,b.fov,u)};
}
export function sampleDescent(pose, progress) {
  const t=smooth(clamp(progress/.86)),[x,y,z]=pose.position;
  const dx=pose.target[0]-x,dz=pose.target[2]-z,distance=Math.hypot(dx,dz);
  const startPitch=Math.atan2(pose.target[1]-y,distance),pitch=mix(startPitch,-Math.PI*.40,t);
  const position=[x+dx/distance*.85*t,y-.45*t,z+dz/distance*.85*t];
  const reach=mix(distance,5,t);
  return {position,target:[position[0]+dx/distance*Math.cos(pitch)*reach,position[1]+Math.sin(pitch)*reach,position[2]+dz/distance*Math.cos(pitch)*reach],fov:mix(pose.fov,pose.fov+4,t)};
}
export const panelProgress = progress => smooth(clamp((progress-.14)/.86));
export function resolveHash(hash, stages) {
  const slug=hash.replace(/^#/,'').replace(/-content$/,'');
  const index=stages.findIndex(s=>s.slug===slug || (slug==='studio' && s.slug==='memento'));
  return {index:index<0?0:index,content:index>=0 && hash.endsWith('-content')};
}
export function validBridge(event, frame, stage, sessionId) {
  const d=event.data;
  return Boolean(stage && event.origin===new URL(stage.href).origin && event.source===frame.contentWindow && d && d.channel==='memento:tide' && d.version===1 && d.stageId===stage.id && d.sessionId===sessionId && ['READY','ESCAPE','END'].includes(d.type));
}
