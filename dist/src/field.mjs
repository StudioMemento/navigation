import {clamp} from './model.mjs';
import {backgroundMesh} from './bg-geometry.mjs';
import {VFX} from './vfx-config.mjs';
import {fieldEnergy,graphDistances,pulseEnvelope,TrianglePool} from './vfx-core.mjs';
let glowSprite;
function nodeGlow(){
 if(glowSprite)return glowSprite;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=96;
 const c=canvas.getContext('2d'),g=c.createRadialGradient(48,48,0,48,48,48);
 for(const [at,color]of [[0,'rgba(255,246,211,1)'],[.035,'rgba(255,232,166,.98)'],[.09,'rgba(255,172,53,.70)'],[.24,'rgba(255,125,21,.22)'],[.55,'rgba(255,115,15,.055)'],[1,'rgba(255,115,15,0)']])g.addColorStop(at,color);
 c.fillStyle=g;c.fillRect(0,0,96,96);glowSprite=canvas;return canvas;
}
export class Field{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.pulses=[];this.pointer={x:-2000,y:-2000,strength:0};this.current={...this.pointer};this.last=0;this.travel=0;this.lastEmit={x:-2000,y:-2000};this.candidates=[];this.pulseCredits=0;this.pulseEmitUntil=0;this.overlay=document.createElement('canvas');this.overlay.id='vfx-particles';this.overlay.setAttribute('aria-hidden','true');document.body.append(this.overlay);this.pc=this.overlay.getContext('2d');this.glow=nodeGlow();this.hotNodes=[];}
 resize(l){
 const d=Math.min(devicePixelRatio||1,l.small?VFX.mobileDpr:VFX.dpr,Math.sqrt(2000000/(l.w*l.h))),same=this.l&&this.l.w===l.w&&this.l.h===l.h&&this.dpr===d;this.l=l;if(same)return;this.dpr=d;
 for(const canvas of [this.canvas,this.overlay]){canvas.width=Math.round(l.w*d);canvas.height=Math.round(l.h*d);canvas.getContext('2d').setTransform(d,0,0,d,0,0);}
 this.grid=backgroundMesh(l.w,l.h,l.small);this.points=this.grid.points.map(p=>({x:p.x*l.w,y:p.y*l.h,phase:p.phase}));this.positions=this.points.map(p=>({...p,energy:0,light:0}));
 // A face receives a diffuse vertex light, not a flat polygon tone. Gradients
 // are cached for this size; tiny idle motion shifts only the clipping geometry.
 this.vertexShade=this.points.map((p,i)=>.018+.021*(.5+.5*Math.sin(p.phase*1.7+i*.31)));
 this.faceShades=this.grid.triangles.map((ids,i)=>{
  const anchor=ids.reduce((best,id)=>this.vertexShade[id]>this.vertexShade[best]?id:best,ids[0]),p=this.points[anchor];
  const radius=Math.max(1,...ids.map(id=>Math.hypot(this.points[id].x-p.x,this.points[id].y-p.y)))*1.02;
  const shade=this.vertexShade[anchor],gradient=this.ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,radius);
  gradient.addColorStop(0,`rgba(150,157,167,${shade})`);
  gradient.addColorStop(.38,`rgba(150,157,167,${shade*.42})`);
  gradient.addColorStop(.76,`rgba(150,157,167,${shade*.08})`);
  gradient.addColorStop(1,'rgba(150,157,167,0)');
  return {anchor,radius,shade,gradient,variation:.5+.5*Math.sin(i*1.83)};
 });
 this.shortest=this.points.map((p,i)=>Math.min(...this.grid.neighbors[i].map(j=>Math.hypot(p.x-this.points[j].x,p.y-this.points[j].y))));
 this.pool=new TrianglePool(l.small?VFX.mobilePool:VFX.pool);this.pulses=[];this.candidates=[];this.travel=0;this.pulseCredits=0;this.lastDraw=0;
 }
 touch(x,y,t){if(this.reduced)return;this.pulses.push({time:t,distances:graphDistances(this.points,this.grid.neighbors,x,y,this.l.small?420:580)});if(this.pulses.length>2)this.pulses.shift();this.pulseCredits=this.l.small?4:8;this.pulseEmitUntil=t+320;}
 cancel(){this.pointer.strength=0;this.travel=0;this.pulseCredits=0;this.candidates=[];}
 directEnergy(x,y){return fieldEnergy(x,y,this.current,this.l.small?VFX.mobileRadius:VFX.radius);}
 energy(x,y){let energy=fieldEnergy(x,y,this.current,this.l.small?VFX.mobileRadius:VFX.radius);if(this.pulses.length){let near=0,distance=Infinity;for(let i=0;i<this.points.length;i++){const p=this.points[i],d=(p.x-x)**2+(p.y-y)**2;if(d<distance){distance=d;near=i;}}energy=Math.max(energy,this.positions[near]?.pulse||0);}return energy;}
 begin(t,reduced=false){this.reduced=reduced;const dt=Math.min(1,(t-this.last)/1000||.016);this.last=t;this.dt=dt;this.candidates=[];
 const dormant=this.current.strength<.02,target=this.pointer.strength||0;this.current.strength+=(target-this.current.strength)*(1-Math.exp(-dt/(target>this.current.strength?VFX.attack:VFX.release/3)));
 if(target){if(dormant){this.current.x=this.pointer.x;this.current.y=this.pointer.y;}else{const blend=1-Math.exp(-dt/.04);this.current.x+=(this.pointer.x-this.current.x)*blend;this.current.y+=(this.pointer.y-this.current.y)*blend;}}
 this.travel*=Math.exp(-dt*10);
 if(this.pointer.strength){const moved=Math.hypot(this.pointer.x-this.lastEmit.x,this.pointer.y-this.lastEmit.y);if(moved<400)this.travel=Math.min(64,this.travel+moved);this.lastEmit={x:this.pointer.x,y:this.pointer.y};}else this.travel=0;
 if(t>this.pulseEmitUntil)this.pulseCredits=0;
 this.pulses=this.pulses.filter(p=>t-p.time<950);if(reduced){this.pulses=[];this.pool.clear();this.travel=0;this.pulseCredits=0;}
 let nearest=-1,nearestD=Infinity;for(let i=0;i<this.points.length;i++){const p=this.points[i],distance=(p.x-this.current.x)**2+(p.y-this.current.y)**2;if(distance<nearestD){nearestD=distance;nearest=i;}}
 this.hotNodes=[];
 for(let i=0;i<this.points.length;i++){const p=this.points[i],q=this.positions[i];q.pulse=0;for(const pulse of this.pulses)q.pulse=Math.max(q.pulse,pulseEnvelope((t-pulse.time)/1000,pulse.distances[i]));
 const radius=this.l.small?VFX.mobileRadius:VFX.radius,energy=Math.max(fieldEnergy(p.x,p.y,this.current,radius),q.pulse);q.energy=energy;const dx=p.x-this.current.x,dy=p.y-this.current.y,len=Math.hypot(dx,dy)||1,limit=reduced?0:Math.min(this.shortest[i]*.065,this.l.small?VFX.mobileDisplacement:VFX.displacement),idle=reduced?0:(this.l.small?VFX.mobileIdle:VFX.idle)*(1+energy*2.2);
 let ox=Math.sin(t*.00047+p.phase)*idle+dx/len*energy*limit,oy=Math.cos(t*.00039+p.phase)*idle+dy/len*energy*limit;
 const focus=Math.exp(-(dx*dx+dy*dy)/(radius*radius*.055));
 const peak=i===nearest&&nearestD<radius*radius*.5?Math.max(energy*.97,this.current.strength*.94*Math.exp(-nearestD/(radius*radius*.16))):energy*(.13+.87*focus);
 const light=Math.max(q.pulse*.9,peak);q.light+=(light-q.light)*(1-Math.exp(-dt/(light>q.light?.065:.29)));
 if(q.light>.16)this.hotNodes.push(q);
 const length=Math.hypot(ox,oy),cap=this.shortest[i]*.09;if(length>cap){ox*=cap/length;oy*=cap/length;}const targetX=p.x+ox,targetY=p.y+oy;
 q.x+=(targetX-q.x)*(1-Math.exp(-dt*9));q.y+=(targetY-q.y)*(1-Math.exp(-dt*9));
 }
 this.hotNodes.sort((a,b)=>b.light-a.light);if(this.hotNodes.length>8)this.hotNodes.length=8;
 this.pool.update(t,Math.min(.04,dt));
 }
 emit(x,y,t,energy=1,source='surface'){
 if(this.reduced||!Number.isFinite(energy)||energy<.12||(this.travel<8&&!this.pulseCredits))return;
 const priority=source==='glyph'?.48:source==='surface'?.2:0,score=energy+priority;
 const candidate={x,y,t,energy,score,source};
 // Keep only a few strongest spatial candidates; cost never follows mesh size.
 if(this.candidates.length<12)this.candidates.push(candidate);
 else{let low=0;for(let i=1;i<12;i++)if(this.candidates[i].score<this.candidates[low].score)low=i;if(score>this.candidates[low].score)this.candidates[low]=candidate;}
 }
 transitionParticle(x,y,t,dx,dy){if(this.reduced||this.transitionBudget<=0)return;if(this.pool.emit(x,y,x-dx,y-dy,t,this.l.small?.8:1,{burst:true}))this.transitionBudget--;}
 draw(t,reduced=false){
 if(t-(this.lastDraw||0)<(this.current.strength>.01||this.pulses.length||this.hotNodes.length?16:32))return;
 this.lastDraw=t;const c=this.ctx,l=this.l,q=this.positions;c.globalAlpha=1;c.fillStyle='#0a0a0b';c.fillRect(0,0,l.w,l.h);
 for(let i=0;i<this.grid.triangles.length;i++){
  const ids=this.grid.triangles[i],a=q[ids[0]],b=q[ids[1]],d=q[ids[2]],face=this.faceShades[i];
  const breath=reduced?1:.97+.03*Math.sin(t*.00023+a.phase);
  c.globalAlpha=breath;c.fillStyle=face.gradient;
  c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineTo(d.x,d.y);c.closePath();c.fill();c.globalAlpha=1;
  const energy=(a.light+b.light+d.light)/3;
  if(energy>.012){
   let hot=a;for(const p of [b,d])if(p.light>hot.light)hot=p;
   const reach=Math.max(1,Math.hypot(hot.x-a.x,hot.y-a.y),Math.hypot(hot.x-b.x,hot.y-b.y),Math.hypot(hot.x-d.x,hot.y-d.y))*1.05;
   const tint=c.createRadialGradient(hot.x,hot.y,0,hot.x,hot.y,reach),gain=.55+.45*face.variation;
   const alpha=Math.min(.056,(energy*.01+hot.light*.048)*gain);
   tint.addColorStop(0,`rgba(${VFX.color},${alpha})`);
   tint.addColorStop(.45,`rgba(${VFX.color},${alpha*.34})`);
   tint.addColorStop(1,`rgba(${VFX.color},0)`);c.fillStyle=tint;c.fill();
  }
 }
 for(let i=0;i<this.grid.edges.length;i++){
  const [ai,bi]=this.grid.edges[i],a=q[ai],b=q[bi],energy=Math.max(a.light,b.light),variation=.5+.5*Math.sin(i*2.47);
  c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineWidth=.5;c.strokeStyle=`rgba(171,175,180,${.025+.055*variation})`;c.stroke();
  if(energy>.025){
   // Light travels along the existing edges from the hot vertex. There are no
   // screen-space rays and no per-edge blur filters.
   const tint=c.createLinearGradient(a.x,a.y,b.x,b.y);
   tint.addColorStop(0,`rgba(${VFX.color},${a.light*.52})`);tint.addColorStop(1,`rgba(${VFX.color},${b.light*.52})`);
   c.strokeStyle=tint;c.lineWidth=.7;c.stroke();
  }
 }
 // Nodes stay as tiny pins. The facet gradient carries the light, without
 // wide star glows, screen-space halos or an inflated edge stroke.
 for(let i=0;i<q.length;i++){
  const p=q[i],alpha=.22+.30*Math.pow(.5+.5*Math.sin(p.phase),2),size=p.light>.2?1.15:.9;
  c.fillStyle=p.light>.04?`rgba(${VFX.hot},${.32+p.light*.30})`:`rgba(225,225,219,${alpha})`;
  c.fillRect(p.x-size/2,p.y-size/2,size,size);this.emit(p.x,p.y,t,p.energy,'background');
 }
 }
 finish(){
  if(!this.reduced&&this.candidates.length&&(this.travel>=8||this.pulseCredits>0)){
   this.candidates.sort((a,b)=>b.score-a.score);const amount=this.l.small?2:3;
   let emitted=0;for(let i=0;i<amount;i++){const p=this.candidates[Math.min(i,this.candidates.length-1)];if(this.pool.emit(p.x,p.y,this.current.x,this.current.y,p.t,this.l.small?.8:1,{burst:true}))emitted++;}
   if(emitted){this.travel=0;this.pulseCredits=Math.max(0,this.pulseCredits-emitted);}
  }
  this.candidates=[];if(!this.pool.count&&!this.hadParticles)return;this.hadParticles=this.pool.count;const c=this.pc,l=this.l;c.clearRect(0,0,l.w,l.h);
  for(const p of this.pool.items){if(!p.alive)continue;
   // The trail consists exclusively of separated triangular fragments.
   // At rest the finite pool expires; no curve or connecting filament is drawn.
   const glowSize=p.size*6;c.globalAlpha=p.alpha*.2;c.drawImage(this.glow,p.x-glowSize/2,p.y-glowSize/2,glowSize,glowSize);c.globalAlpha=1;
   c.save();c.translate(p.x,p.y);c.rotate(p.angle);c.fillStyle=`rgba(${VFX.color},${p.alpha*.9})`;c.beginPath();c.moveTo(0,-p.size);c.lineTo(p.size*.8,p.size*.6);c.lineTo(-p.size*.7,p.size*.6);c.closePath();c.fill();
   c.fillStyle=`rgba(${VFX.hot},${p.alpha*p.hot*.8})`;c.beginPath();c.moveTo(0,-p.size);c.lineTo(p.size*.8,p.size*.6);c.lineTo(0,p.size*.1);c.closePath();c.fill();c.restore();
  }
 }
 dispose(){this.pool?.clear();this.overlay.remove();this.pulses=[];}
}
