import {PRESET} from './preset.js';
import {cameraFor,projectPoint} from './camera.js';
import {clamp,framePlanes,OUTER,INNER,generateParticleGeometry,facets} from './geometry.js';

export function interactionProfile(pointer,size){
 const speed=clamp(Math.hypot(pointer.vx||0,pointer.vy||0)/(size*2.2),0,1),power=Math.pow(speed,1.2);
 return {power,radius:clamp(size*(.035+.12*Math.sqrt(power)),18,155)};
}

export function segmentDistance(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy,t=l>1e-8?clamp(((px-ax)*dx+(py-ay)*dy)/l,0,1):0;const x=px-ax-t*dx,y=py-ay-t*dy;return {x,y,d:Math.hypot(x,y)};}

// Swept collision against the exact six planes used by the visible frame.
// Returning scalar arrays also makes the solver independently testable.
export function sweepFrame(x,y,vx,vy,dt,planes,radius=3,restitution=PRESET.restitution,friction=PRESET.friction,onImpact){
 for(const p of planes){const d=(x-p.x)*p.nx+(y-p.y)*p.ny;if(d<radius){x+=(radius-d)*p.nx;y+=(radius-d)*p.ny;}}
 let remaining=dt;
 for(let pass=0;pass<4&&remaining>1e-7;pass++){
  let hit=null,time=remaining;
  for(const p of planes){const vn=vx*p.nx+vy*p.ny;if(vn>=-1e-7)continue;const d=(x-p.x)*p.nx+(y-p.y)*p.ny;const t=Math.max(0,(radius-d)/vn);if(t<=time){time=t;hit=p;}}
  x+=vx*time;y+=vy*time;remaining-=time;
  if(!hit)break;
  const vn=vx*hit.nx+vy*hit.ny;
  if(onImpact)onImpact(x-hit.nx*radius,y-hit.ny*radius,-vn,hit);
  vx=(1-friction)*(vx-vn*hit.nx)-restitution*vn*hit.nx;
  vy=(1-friction)*(vy-vn*hit.ny)-restitution*vn*hit.ny;
  x+=hit.nx*.001;y+=hit.ny*.001;
 }
 for(const p of planes){const d=(x-p.x)*p.nx+(y-p.y)*p.ny;if(d<radius){x+=(radius-d)*p.nx;y+=(radius-d)*p.ny;}}
 return [x,y,vx,vy];
}
function clearance(x,y){let d=1;for(const poly of [OUTER,INNER])for(let i=0;i<8;i++){const a=poly[i],b=poly[(i+1)%8];d=Math.min(d,segmentDistance(x,y,...a,...b).d);}return d;}

export class ParticleSimulation{
 constructor(count){
  const generated=generateParticleGeometry(count);this.count=count;this.rest=generated.rest;this.surface=generated.surface;this.flow=generated.flow;this.state=new Float32Array(count*8);this.vertices=new Float32Array(count*14);this.targets=new Float32Array(count*3);this.margins=new Float32Array(count);this.impacts=[];this.impactCount=0;this.time=0;this.initialized=false;
  for(let i=0;i<count;i++){const o=i*8,small=this.rest[o+6],s=small?PRESET.smallRatio:1;this.margins[i]=Math.min(.009,clearance((this.rest[o]-(small?PRESET.smallX:0))/s,(this.rest[o+1]-(small?PRESET.smallY:0))/s)*.4)*s;}
 }
 setBounds(w,h,cut,composition){
  const old=this.composition;this.w=w;this.h=h;this.s=Math.min(w,h);this.camera=cameraFor(w,h);this.planes=framePlanes(w,h,cut);this.composition=composition;
  if(old){const ratio=composition.scale/old.scale;for(let i=0;i<this.count;i++){let o=i*8;this.state[o]=composition.cx+(this.state[o]-old.cx)*ratio;this.state[o+1]=composition.cy+(this.state[o+1]-old.cy)*ratio;this.state[o+2]*=ratio;this.state[o+3]*=ratio;this.state[o+4]*=ratio;this.state[o+5]*=ratio;const p=sweepFrame(this.state[o],this.state[o+1],this.state[o+3],this.state[o+4],0,this.planes,3);this.state[o]=p[0];this.state[o+1]=p[1];}}
 }
 setRotation(yaw,pitch){this.yaw=yaw;this.pitch=pitch;this.cosY=Math.cos(yaw);this.sinY=Math.sin(yaw);this.cosX=Math.cos(pitch);this.sinX=Math.sin(pitch);}
 transform(x,y,z){const xx=x*this.cosY+z*this.sinY,zz=-x*this.sinY+z*this.cosY;return projectPoint(this.composition.cx+xx*this.composition.scale,this.composition.cy+(y*this.cosX-zz*this.sinX)*this.composition.scale,(y*this.sinX+zz*this.cosX)*this.composition.scale,this.camera);}
 step(dt,pointer,{staticFrame=false,skipIdle=false}={}){
  if(!this.composition)return;
  this.time+=dt;this.contact=false;
  const rest=this.rest,state=this.state,S=this.s,scale=this.composition.scale;
  const cy=this.cosY,sy=this.sinY,cx=this.cosX,sx=this.sinX,cpx=this.composition.cx,cpy=this.composition.cy;
  const dx=pointer.x-pointer.px,dy=pointer.y-pointer.py,segmentLength=dx*dx+dy*dy;
  const profile=interactionProfile(pointer,S),speed=profile.power;
  const R=profile.radius,R2=R*R;this.colliderRadius=R;
  const active=pointer.active&&pointer.activity>.001&&!staticFrame;
  const releaseDecay=Math.exp(-PRESET.releaseDecay*dt),heatDecay=Math.exp(-PRESET.heatDecay*dt),maxSpeed=S*PRESET.speedLimit;
  const movingTime=this.time;
  this.impacts=this.impacts.filter(e=>movingTime-e.time<PRESET.frameFlashDuration);
  const impactCells=new Set(this.impacts.map(e=>(Math.floor(e.x/28)<<16)+Math.floor(e.y/28)));
  for(let i=0;i<this.count;i++){
   const o=i*8;if(skipIdle&&state[o+6]===0&&this.initialized)continue;let lx=rest[o],ly=rest[o+1],lz=rest[o+2],seed=rest[o+5];
   let tx,ty,tz;const ti=i*3;
   if(skipIdle&&this.initialized){tx=this.targets[ti];ty=this.targets[ti+1];tz=this.targets[ti+2];}
   else{
    if(!staticFrame){
     const fi=i*4,f=this.flow,tri=facets[f[fi]].tri,rate=f[fi+3];
     const u=Math.sin(f[fi+1]+movingTime*rate),v=Math.sin(f[fi+2]+movingTime*rate*.79);
     const b0=u*u,b1=(1-b0)*v*v,b2=1-b0-b1;
     lx=tri[0][0]*b0+tri[1][0]*b1+tri[2][0]*b2;
     ly=tri[0][1]*b0+tri[1][1]*b1+tri[2][1]*b2;
     lz=tri[0][2]*b0+tri[1][2]*b1+tri[2][2]*b2;
    }
    const rx=lx*cy+lz*sy,rz=-lx*sy+lz*cy;
    tz=(ly*sx+rz*cx)*scale;
    const zoom=this.camera.distance/(this.camera.distance-tz);
    tx=this.w*.5+(cpx+rx*scale-this.w*.5)*zoom;
    ty=this.h*.5+(cpy+(ly*cx-rz*sx)*scale-this.h*.5)*zoom;
    this.targets[ti]=tx;this.targets[ti+1]=ty;this.targets[ti+2]=tz;
   }
   let x=state[o],y=state[o+1],z=state[o+2],vx=state[o+3],vy=state[o+4],vz=state[o+5],release=state[o+6]*releaseDecay,heat=state[o+7]*heatDecay;
   if(!this.initialized||staticFrame){x=tx;y=ty;z=tz;vx=vy=vz=release=heat=0;}
   let weight=0,nx=0,ny=0;
   if(active){
    const t=segmentLength>1e-7?clamp(((x-pointer.px)*dx+(y-pointer.py)*dy)/segmentLength,0,1):0;
    let ax=x-pointer.px-t*dx,ay=y-pointer.py-t*dy,dist2=ax*ax+ay*ay;
    if(dist2<R2){const dist=Math.sqrt(dist2),q=clamp((dist/R-.25)/.75,0,1);weight=(1-q*q*(3-2*q))*pointer.activity;
     if(weight>.15)this.contact=true;nx=ax/Math.max(3,dist);ny=ay/Math.max(3,dist);
     const before=release;release=Math.max(release,weight*(.56+.44*speed));
     // Momentum transfer is incremental, not an unbounded force while hovering.
     const fresh=Math.max(0,release-before),scatter=.24+seed*.65+(seed>.96?.85:0),coupling=(fresh*PRESET.impulse+weight*dt*.4)*scatter;
     vx+=pointer.vx*coupling;vy+=pointer.vy*coupling;
     const angle=seed*83.4,kick=fresh*S*(.12+.28*speed);vx+=Math.cos(angle)*kick;vy+=Math.sin(angle)*kick;
     const radial=(.6+speed*1.7)*PRESET.radialForce*S*weight*dt;
     const spin=PRESET.vortex*S*weight*dt*(seed>.5?1:-1)*(.15+.55*speed);
     vx+=nx*radial-ny*spin;vy+=ny*radial+nx*spin;
     vz+=(seed-.5)*S*weight*dt*.9;
     // Every contact carries emissive energy, including later gestures.
     heat=Math.min(1,Math.max(heat,weight*.78)+weight*dt*5);
    }
   }
   if(release===0){state[o]=tx;state[o+1]=ty;state[o+2]=tz;state[o+3]=state[o+4]=state[o+5]=state[o+6]=state[o+7]=0;continue;}
   const k=PRESET.freeSpring+PRESET.returnSpring*Math.pow(1-release,3);
   const damping=PRESET.freeDrag+2*PRESET.dampingRatio*Math.sqrt(k)*(1-release);
   vx+=(tx-x)*k*dt;vy+=(ty-y)*k*dt;vz+=(tz-z)*14*dt;
   const drag=Math.exp(-damping*dt);vx*=drag;vy*=drag;vz*=Math.exp(-6*dt);
   const velocity=Math.hypot(vx,vy);if(velocity>maxSpeed){vx*=maxSpeed/velocity;vy*=maxSpeed/velocity;}
   if(release<.0015&&Math.hypot(x-tx,y-ty)<.8){x=tx;y=ty;z=tz;vx=vy=vz=0;release=0;}
   else{
    const nxp=x+vx*dt,nyp=y+vy*dt;
    let nearWall=false;for(const p of this.planes)if((nxp-p.x)*p.nx+(nyp-p.y)*p.ny<3.1){nearWall=true;break;}
    if(nearWall){const p=sweepFrame(x,y,vx,vy,dt,this.planes,3,PRESET.restitution,PRESET.friction,(ix,iy,energy,plane)=>{
     if(energy>S*.24){heat=Math.max(heat,Math.min(.9,energy/S*.5));this.impactCount++;
      const cell=(Math.floor(ix/28)<<16)+Math.floor(iy/28);if(this.impacts.length<28&&!impactCells.has(cell)){impactCells.add(cell);this.impacts.push({x:ix,y:iy,energy:Math.min(1,energy/S),tx:plane.tx,ty:plane.ty,time:movingTime});}
     }
    });x=p[0];y=p[1];vx=p[2];vy=p[3];}else{x=nxp;y=nyp;}
    z+=vz*dt;z=clamp(z,-S*.55,S*.55);
   }
   state[o]=x;state[o+1]=y;state[o+2]=z;state[o+3]=vx;state[o+4]=vy;state[o+5]=vz;state[o+6]=release;state[o+7]=heat;
  }
  this.initialized=true;
 }
 renderData(){const r=this.rest,s=this.state,v=this.vertices,n=this.surface;for(let i=0;i<this.count;i++){const o=i*8,j=i*14,k=i*4;v[j]=s[o];v[j+1]=s[o+1];v[j+2]=s[o+2];v[j+3]=r[o+3];v[j+4]=r[o+4];v[j+5]=s[o+7];v[j+6]=s[o+3];v[j+7]=s[o+4];v[j+8]=r[o+5];v[j+9]=s[o+6];v[j+10]=n[k];v[j+11]=n[k+1];v[j+12]=n[k+2];v[j+13]=n[k+3];}return v;}
 getStats(){let released=0,heat=0,error=0,invalid=0,maxV=0;for(let i=0;i<this.count;i++){const o=i*8;released+=this.state[o+6]>.06?1:0;heat+=this.state[o+7]>.05?1:0;if(!Number.isFinite(this.state[o]+this.state[o+1]))invalid++;maxV=Math.max(maxV,Math.hypot(this.state[o+3],this.state[o+4]));const j=i*3;error+=Math.hypot(this.targets[j]-this.state[o],this.targets[j+1]-this.state[o+1]);}return {particles:this.count,colliderRadius:this.colliderRadius,released,warm:heat,meanRestError:error/this.count,invalid,maxVelocity:maxV,impacts:this.impactCount};}
}
