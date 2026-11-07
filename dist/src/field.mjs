import {clamp} from './model.mjs';
import {backgroundMesh} from './geometry.mjs';
import {VFX} from './vfx-config.mjs';
import {fieldEnergy,graphDistances,pulseEnvelope,TrianglePool} from './vfx-core.mjs';
export class Field{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.pulses=[];this.pointer={x:-2000,y:-2000,strength:0};this.current={...this.pointer};this.last=0;this.travel=0;this.lastEmit={x:-2000,y:-2000};this.overlay=document.createElement('canvas');this.overlay.id='vfx-particles';this.overlay.setAttribute('aria-hidden','true');document.body.append(this.overlay);this.pc=this.overlay.getContext('2d');}
 resize(l){this.l=l;const d=Math.min(devicePixelRatio||1,l.small?VFX.mobileDpr:VFX.dpr);for(const canvas of [this.canvas,this.overlay]){canvas.width=Math.round(l.w*d);canvas.height=Math.round(l.h*d);canvas.getContext('2d').setTransform(d,0,0,d,0,0);}
 this.grid=backgroundMesh(l.w,l.h,l.small);this.points=this.grid.points.map(p=>({x:p.x*l.w,y:p.y*l.h,phase:p.phase}));this.positions=this.points.map(p=>({...p,energy:0}));this.shortest=this.points.map((p,i)=>Math.min(...this.grid.neighbors[i].map(j=>Math.hypot(p.x-this.points[j].x,p.y-this.points[j].y))));this.pool=new TrianglePool(l.small?VFX.mobilePool:VFX.pool);this.pulses=[];
 }
 touch(x,y,t){if(this.reduced)return;this.pulses.push({time:t,distances:graphDistances(this.points,this.grid.neighbors,x,y,this.l.small?420:580)});if(this.pulses.length>2)this.pulses.shift();}
 cancel(){this.pointer.strength=0;}
 directEnergy(x,y){return fieldEnergy(x,y,this.current,this.l.small?VFX.mobileRadius:VFX.radius);}
 energy(x,y){let energy=fieldEnergy(x,y,this.current,this.l.small?VFX.mobileRadius:VFX.radius);if(this.pulses.length){let near=0,distance=Infinity;for(let i=0;i<this.points.length;i++){const p=this.points[i],d=(p.x-x)**2+(p.y-y)**2;if(d<distance){distance=d;near=i;}}energy=Math.max(energy,this.positions[near]?.pulse||0);}return energy;}
 begin(t,reduced=false){this.reduced=reduced;const dt=Math.min(1,(t-this.last)/1000||.016);this.last=t;this.dt=dt;
 const dormant=this.current.strength<.02,target=this.pointer.strength||0;this.current.strength+=(target-this.current.strength)*(1-Math.exp(-dt/(target>this.current.strength?VFX.attack:VFX.release/3)));
 if(target){if(dormant){this.current.x=this.pointer.x;this.current.y=this.pointer.y;}else{const blend=1-Math.exp(-dt/.04);this.current.x+=(this.pointer.x-this.current.x)*blend;this.current.y+=(this.pointer.y-this.current.y)*blend;}}
 if(this.pointer.strength){const moved=Math.hypot(this.pointer.x-this.lastEmit.x,this.pointer.y-this.lastEmit.y);if(moved<400)this.travel+=moved;this.lastEmit={x:this.pointer.x,y:this.pointer.y};}else this.travel=0;
 this.pulses=this.pulses.filter(p=>t-p.time<950);if(reduced){this.pulses=[];this.pool.clear();}
 for(let i=0;i<this.points.length;i++){const p=this.points[i],q=this.positions[i];q.pulse=0;for(const pulse of this.pulses)q.pulse=Math.max(q.pulse,pulseEnvelope((t-pulse.time)/1000,pulse.distances[i]));
 const energy=Math.max(fieldEnergy(p.x,p.y,this.current,this.l.small?VFX.mobileRadius:VFX.radius),q.pulse);q.energy=energy;const dx=p.x-this.current.x,dy=p.y-this.current.y,len=Math.hypot(dx,dy)||1,limit=reduced?0:Math.min(this.shortest[i]*.065,this.l.small?3:5),idle=reduced?0:this.l.small?.6:1;
 let ox=Math.sin(t*.00047+p.phase)*idle+dx/len*energy*limit,oy=Math.cos(t*.00039+p.phase)*idle+dy/len*energy*limit;
 const length=Math.hypot(ox,oy),cap=this.shortest[i]*.07;if(length>cap){ox*=cap/length;oy*=cap/length;}const targetX=p.x+ox,targetY=p.y+oy;
 q.x+=(targetX-q.x)*(1-Math.exp(-dt*9));q.y+=(targetY-q.y)*(1-Math.exp(-dt*9));
 }
 this.pool.update(t,Math.min(.04,dt));
 }
 emit(x,y,t,energy=1){if(this.reduced||this.travel<28||energy<.2)return; if(this.pool.emit(x,y,this.current.x,this.current.y,t,this.l.small?.8:1))this.travel=0;}
 transitionParticle(x,y,t,dx,dy){if(this.reduced||this.transitionBudget<=0)return;if(this.pool.emit(x,y,x-dx,y-dy,t,this.l.small?.8:1))this.transitionBudget--;}
 draw(t,reduced=false){if(t-(this.lastDraw||0)<(this.current.strength>.01?16:32))return;this.lastDraw=t;const c=this.ctx,l=this.l;c.fillStyle='#0a0a0b';c.fillRect(0,0,l.w,l.h);const q=this.positions;
 for(const ids of this.grid.triangles){const [a,b,d]=ids.map(i=>q[i]),energy=(a.energy+b.energy+d.energy)/3,shade=.004+(Math.sin((a.x+b.y+d.x)*.01)*.5+.5)*.004;c.fillStyle=energy>.02?`rgba(${VFX.color},${energy*VFX.faceAlpha})`:`rgba(170,181,190,${shade})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineTo(d.x,d.y);c.closePath();c.fill();}
 c.lineWidth=.65;for(const [ai,bi]of this.grid.edges){const a=q[ai],b=q[bi],energy=(a.energy+b.energy)*.5,x=(a.x+b.x)/2,y=(a.y+b.y)/2,margin=Math.pow(Math.abs(x/l.w-.5)*2,1.6),variation=.5+.5*Math.sin(x*.007+y*.008)*Math.cos(y*.011-x*.004),neutral=(.012+.06*variation)*(.25+.75*margin);c.strokeStyle=energy>.025?`rgba(${VFX.color},${neutral+energy*.28})`:`rgba(166,166,166,${neutral})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}
 for(const p of q){c.fillStyle=p.energy>.04?`rgba(${VFX.paper},${.06+p.energy*.32})`:`rgba(192,192,192,${.07+.19*Math.pow(.5+.5*Math.sin(p.phase),5)})`;c.fillRect(p.x-.4,p.y-.4,.8,.8);this.emit(p.x,p.y,t,p.energy);}
 }
 finish(){if(!this.pool.count&&!this.hadParticles)return;this.hadParticles=this.pool.count;const c=this.pc,l=this.l;c.clearRect(0,0,l.w,l.h);for(const p of this.pool.items){if(!p.alive)continue;c.save();c.translate(p.x,p.y);c.rotate(p.angle);c.fillStyle=`rgba(${VFX.color},${p.alpha*.7})`;c.beginPath();c.moveTo(0,-p.size);c.lineTo(p.size*.8,p.size*.6);c.lineTo(-p.size*.7,p.size*.6);c.closePath();c.fill();c.restore();}}
 dispose(){this.pool.clear();this.overlay.remove();this.pulses=[];}
}
