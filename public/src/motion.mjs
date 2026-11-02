import { Quaternion, Vector3, MathUtils } from 'three';
export const STATIONS=['memento','services','projects','levelup','start'];
export const LABELS=['Memento','Services','Projects','LevelUp','Start'];
export const blenderEnvironmentRotation=z=>Math.PI-z;
const qa=new Quaternion(),qb=new Quaternion();
export function sampleTRS(samples,index,out){
  const f=Math.max(0,Math.min(samples.length-1,index)),i=Math.floor(f),a=samples[i],b=samples[Math.min(i+1,samples.length-1)],t=f-i;
  for(let k=0;k<3;k++)out.position.setComponent(k,a[k]+(b[k]-a[k])*t);
  qa.fromArray(a,3).normalize();qb.fromArray(b,3).normalize();out.quaternion.copy(qa).slerp(qb,t);
  if(a.length===10&&out.scale)for(let k=0;k<3;k++)out.scale.setComponent(k,a[k+7]+(b[k+7]-a[k+7])*t);
  return out;
}
export function profileFor(width,height){return width/height<1.05?'mobile':width/height>=2.1?'ultrawide':'desktop';}
export function applyProjection(camera,source,width,height){
  const profile=profileFor(width,height),p=source.cameras[profile],aspect=width/height;
  const vertical=p.sensorFit==='VERTICAL'||(p.sensorFit==='AUTO'&&aspect<1);
  camera.fov=MathUtils.radToDeg(2*Math.atan((vertical?p.sensorHeight:p.sensorWidth/aspect)/(2*p.lens)));
  // Keep Blender's horizontal composition on taller phones, while retaining
  // its exact native projection at 720×1280. This keeps 3D titles above the HUD.
  if(profile==='mobile'&&aspect<720/1280)camera.fov=MathUtils.radToDeg(2*Math.atan(Math.tan(MathUtils.degToRad(camera.fov/2))*(720/1280)/aspect));
  camera.aspect=aspect;camera.near=p.near;camera.far=p.far;camera.updateProjectionMatrix();return profile;
}
export function applyFacing(anchor,camera){
  const pos=new Vector3(),parentQ=new Quaternion();anchor.getWorldPosition(pos);
  const yaw=Math.atan2(camera.position.x-pos.x,camera.position.z-pos.z);
  anchor.parent.getWorldQuaternion(parentQ);anchor.quaternion.setFromAxisAngle(new Vector3(0,1,0),yaw).premultiply(parentQ.invert());
}
export class Navigator {
  constructor(source,camera,{onChange=()=>{},onEnter=()=>{},onReturn=()=>{},reduced=false}={}){
    Object.assign(this,{source,camera,onChange,onEnter,onReturn,reduced,active:0,target:0,state:'idle',progress:0,pageIsReady:false});this.arrive(0,false);
  }
  announce(){this.onChange({state:this.state,active:this.active,target:this.target,progress:this.progress});}
  arrive(i,announce=true){this.active=this.target=i;this.state='idle';sampleTRS(this.source.cameras.orbit.samples,i*240,this.camera);if(announce)this.announce();}
  select(i){
    i=(i+5)%5;if(!['idle','orbit'].includes(this.state))return false;
    this.target=i;if(this.state==='orbit')return true;if(i===this.active)return false;
    if(this.reduced){this.arrive(i);return true;}this.nextLeg();return true;
  }
  nextLeg(){
    const diff=(this.target-this.active+5)%5,dir=diff<=2?1:-1;
    const to=(this.active+dir+5)%5,edge=dir===1?this.active:to;
    this.leg={from:this.active,to,edge,dir,elapsed:0};this.state='orbit';this.announce();
  }
  enter(){if(this.state!=='idle'||this.active===0)return false;this.state='descending';this.progress=0;this.pageIsReady=false;this.onEnter(this.active);this.announce();return true;}
  ready(i){if(i!==this.active)return;this.pageIsReady=true;if(this.state==='waiting'){this.state='page';this.announce();}}
  back(){
    if(['descending','waiting','page'].includes(this.state)){this.state='ascending';this.onReturn(this.active);this.announce();return true;}
    if(this.state==='orbit'){
      const l=this.leg;[l.from,l.to]=[l.to,l.from];l.dir*=-1;l.elapsed=3-l.elapsed;this.target=l.to;this.announce();return true;
    }return false;
  }
  tick(dt){
    if(this.state==='orbit'){
      const l=this.leg;l.elapsed=Math.min(3,l.elapsed+dt);const u=l.elapsed/3;
      const range=this.source.cameras.orbit.transitionRanges[l.edge],t=l.dir===1?u:1-u;
      sampleTRS(this.source.cameras.orbit.samples,range[0]-1+(range[1]-range[0])*t,this.camera);
      if(u>=1){this.active=l.to;if(this.active!==this.target)this.nextLeg();else{this.state='idle';this.announce();}}
    }else if(this.state==='descending'||this.state==='ascending'){
      const down=this.state==='descending';this.progress=this.reduced?(down?1:0):MathUtils.clamp(this.progress+(down?dt:-dt)/6,0,1);
      sampleTRS(this.source.descents[STATIONS[this.active]].samples,this.progress*180,this.camera);
      if(down&&this.progress===1){this.state=this.pageIsReady?'page':'waiting';this.announce();}
      if(!down&&this.progress===0){this.state='idle';this.announce();}
    }
  }
}
