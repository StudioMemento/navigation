import {random,clamp,framePlanes} from './geometry.js';
import {sweepFrame,interactionProfile} from './physics.js';
import {surfaceKind,surfaceTarget} from './ambient-surfaces.js';
const SIZED_NEAR=.32;
const ping=x=>1-Math.abs(x%2-1);
// Ground, orbital sheet and ascending wave share the same physical scene.
export class UniverseSimulation{
 constructor(count){
  this.count=count;this.seed=new Float32Array(count*8);this.state=new Float32Array(count*8);this.vertices=new Float32Array(count*14);this.previousTargets=new Float32Array(count*3);this.targetScratch=new Float64Array(6);this.normals=new Float32Array(count*3);this.time=0;this.initialized=false;this.impacts=[];this.impactCount=0;
  const rng=random(45271);
  this.foregroundVertices=new Float32Array(128*14);this.foregroundCount=0;
  for(let i=0;i<count;i++){
   const o=i*8;
   // A low-discrepancy prefix keeps every quality tier spread over the full frame.
   this.seed.set([((i+.5)*.754877666+rng()*.012)%1,((i+.5)*.569840296+rng()*.012)%1,rng(),rng(),rng(),rng(),rng(),rng()],o);
  }
 }
 setBounds(w,h,cut,titleTop){
  if(this.w){const rx=w/this.w,ry=h/this.h;for(let i=0;i<this.count;i++){const o=i*8;this.state[o]*=rx;this.state[o+1]*=ry;this.state[o+2]*=Math.min(rx,ry);this.state[o+3]*=rx;this.state[o+4]*=ry;}}
  this.resetTargets=true;this.cut=cut;this.w=w;this.h=h;this.s=Math.min(w,h);this.titleTop=titleTop;this.planes=framePlanes(w,h,cut);
 }
 target(i,time=this.time,out=[]){
  const o=i*8,r=this.seed,kind=surfaceKind(r[o+7]);
  const u=kind===1?(r[o]+time*.012)%1:ping(r[o]+time*(kind===0?.010:.016)),v=ping(r[o+1]+time*(kind===0?.009:.006));
  return surfaceTarget(kind,u,v,time,this.w,this.h,out);
 }

 step(dt,pointer,{staticFrame=false}={}){
  if(!this.planes)return;this.time+=dt;this.impacts=this.impacts.filter(e=>this.time-e.time<.25);
  const s=this.state,r=this.seed,S=this.s,profile=interactionProfile(pointer,S),R=profile.radius*1.15,active=pointer.active&&pointer.activity>.001&&!staticFrame;
  const dx=pointer.x-pointer.px,dy=pointer.y-pointer.py,segment=dx*dx+dy*dy,releaseDecay=Math.exp(-dt*.56),heatDecay=Math.exp(-dt*1.65);
  for(let i=0;i<this.count;i++){
   const o=i*8,target=this.target(i,this.time,this.targetScratch),tx=target[0],ty=target[1],tz=target[2],depth=clamp(-tz/(S*2.15),0,1);
   let x=s[o],y=s[o+1],z=s[o+2],vx=s[o+3],vy=s[o+4],vz=s[o+5],release=s[o+6]*releaseDecay,heat=s[o+7]*heatDecay;
   if(!this.initialized||staticFrame){x=tx;y=ty;z=tz;vx=vy=vz=release=heat=0;}
   const ti=i*3;this.normals[ti]=target[3];this.normals[ti+1]=target[4];this.normals[ti+2]=target[5];
   if(release>0&&this.initialized&&!staticFrame&&!this.resetTargets){const follow=1-release;x+=(tx-this.previousTargets[ti])*follow;y+=(ty-this.previousTargets[ti+1])*follow;z+=(tz-this.previousTargets[ti+2])*follow;}
   this.previousTargets[ti]=tx;this.previousTargets[ti+1]=ty;this.previousTargets[ti+2]=tz;
   if(active){
    const t=segment>1e-7?clamp(((x-pointer.px)*dx+(y-pointer.py)*dy)/segment,0,1):0,ax=x-pointer.px-t*dx,ay=y-pointer.py-t*dy,d=Math.hypot(ax,ay),radius=R*(1-.32*depth);
    if(d<radius){
     const q=1-d/radius,weight=q*q*(3-2*q)*pointer.activity*(1-.65*depth),next=Math.max(release,weight*(.35+.5*profile.power)),fresh=next-release;release=next;
     // Background drag is softer, broader and slower to settle than the icon.
     vx+=pointer.vx*(fresh*.42+weight*dt*.15);vy+=pointer.vy*(fresh*.42+weight*dt*.15);
     const swirl=S*weight*dt*(.10+.55*profile.power),inv=1/Math.max(d,3);
     vx+=(ax*.26-ay*.65)*inv*swirl;vy+=(ay*.26+ax*.65)*inv*swirl;
     vz+=(r[o+3]-.5)*S*weight*dt*.7;heat=Math.min(1,Math.max(heat,weight*.8)+weight*dt*5);
    }
   }
   if(release<.0002){x=tx;y=ty;z=tz;vx=vy=vz=0;release=0;}
   else{
    const spring=1.4+5.5*(1-release)*(1-release),drag=Math.exp(-dt*(2.3+depth));
    vx=(vx+(tx-x)*spring*dt)*drag;vy=(vy+(ty-y)*spring*dt)*drag;vz=(vz+(tz-z)*2.6*dt)*Math.exp(-dt*2.1);
    const speed=Math.hypot(vx,vy),limit=S*1.7;if(speed>limit){vx*=limit/speed;vy*=limit/speed;}
    let near=false;for(const p of this.planes)if((x+vx*dt-p.x)*p.nx+(y+vy*dt-p.y)*p.ny<3){near=true;break;}
    if(near){const hit=sweepFrame(x,y,vx,vy,dt,this.planes,2.5,.32,.14,(ix,iy,energy,plane)=>{
     if(energy>S*.06){this.impactCount++;heat=Math.max(heat,Math.min(.55,energy/S));if(this.impacts.length<10&&!this.impacts.some(p=>Math.hypot(p.x-ix,p.y-iy)<32))this.impacts.push({x:ix,y:iy,tx:plane.tx,ty:plane.ty,energy:Math.min(.45,energy/S),time:this.time});}
    });x=hit[0];y=hit[1];vx=hit[2];vy=hit[3];}else{x+=vx*dt;y+=vy*dt;}
    z=clamp(z+vz*dt,-S*2.35,S*1.18);
   }
   // The six cut-corner walls also contain the undisturbed flow.
   if(x<this.cut+3||x>this.w-this.cut-3||y<this.cut+3||y>this.h-this.cut-3)for(const p of this.planes){const d=(x-p.x)*p.nx+(y-p.y)*p.ny;if(d<2.5){x+=(2.5-d)*p.nx;y+=(2.5-d)*p.ny;}}
   s[o]=x;s[o+1]=y;s[o+2]=z;s[o+3]=vx;s[o+4]=vy;s[o+5]=vz;s[o+6]=release;s[o+7]=heat;
  }
  this.initialized=true;this.resetTargets=false;
 }
 renderData(){
  const s=this.state,r=this.seed,v=this.vertices;
  this.foregroundCount=0;
  for(let i=0;i<this.count;i++){
   const o=i*8,j=i*14,k=i*3,kind=surfaceKind(r[o+7]);
   const u=kind===1?(r[o]+this.time*.012)%1:ping(r[o]+this.time*(kind===0?.010:.016)),q=ping(r[o+1]+this.time*(kind===0?.009:.006));
   const fade=Math.min(1,kind===1?1:u*45,kind===1?1:(1-u)*45,q*45,(1-q)*45);
   v[j]=s[o];v[j+1]=s[o+1];v[j+2]=s[o+2];v[j+3]=fade*(.55+r[o+4]*.45);
   // These are physical diameters, before camera perspective and depth of field.
   const proximity=clamp((s[o+2]/this.s+2.15)/3.2,0,1);
   const nearFragment=s[o+2]>SIZED_NEAR*this.s&&r[o+6]>.97?3.5+r[o+5]*2:1;
   v[j+4]=(1.05+proximity*2.3+r[o+5]*(.6+proximity*1.2))*(kind===0?1:1.25)*nearFragment;
   v[j+5]=s[o+7];v[j+6]=s[o+3];v[j+7]=s[o+4];v[j+8]=r[o+3];v[j+9]=s[o+6];
   v[j+10]=this.normals[k];v[j+11]=this.normals[k+1];v[j+12]=this.normals[k+2];v[j+13]=r[o+3]>(kind===0?.975:kind===1?.82:.88)?3:r[o+3]>.64?2:0;
   // The sparse large foreground grains are real faceted instances, not soft sprites.
   if(nearFragment>1&&this.foregroundCount<128){const start=this.foregroundCount++*14;for(let n=0;n<14;n++)this.foregroundVertices[start+n]=v[j+n];v[j+3]=0;}
  }
  return v;
 }
 getStats(){let moving=0,warm=0,error=0,invalid=0;for(let i=0;i<this.count;i++){const o=i*8;moving+=this.state[o+6]>.015?1:0;warm+=this.state[o+7]>.04?1:0;const j=i*3;error+=Math.hypot(this.state[o]-this.previousTargets[j],this.state[o+1]-this.previousTargets[j+1]);if(!Number.isFinite(this.state[o]+this.state[o+1]+this.state[o+2]))invalid++;}return {backgroundParticles:this.count,backgroundTopology:'ground + orbital sheet + ascending wave',backgroundMoving:moving,backgroundWarm:warm,backgroundImpacts:this.impactCount,backgroundRestError:error/this.count,backgroundInvalid:invalid};}
}
