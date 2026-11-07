import {clamp,smooth,project} from './model.mjs';
import {mesh,cardMesh,cardPath,outline,borderDistance,insideCard} from './geometry.mjs';
import {VFX} from './vfx-config.mjs';
import {visibility,loadVisibility,graphDistances,pulseEnvelope,glyphLight} from './vfx-core.mjs';
const SVG='http://www.w3.org/2000/svg';
export class CardFX{
 constructor(card,index,field){
  Object.assign(this,{card,index,field,canvas:card.querySelector('.card-fx'),edge:card.querySelector('.card-edge'),title:card.querySelector('.title'),shell:card.querySelector('.card-reveal'),amount:1,last:0,waveAt:-10000,waveOrigin:null,titleEntered:false,previousMask:null,imageEnergy:0,pulses:[]});
  this.ctx=this.canvas.getContext('2d');this.ec=this.edge.getContext('2d');this.spans=[...this.title.children];this.glyphMask=document.createElement('canvas');this.typeCanvas=document.createElement('canvas');
 }
 resize(l){
  this.l=l;this.dpr=Math.min(devicePixelRatio||1,l.small?VFX.mobileDpr:VFX.dpr);
  for(const [canvas,padding]of [[this.canvas,0],[this.edge,40],[this.glyphMask,0],[this.typeCanvas,0]]){canvas.width=Math.ceil((l.width+padding)*this.dpr);canvas.height=Math.ceil((l.height+padding)*this.dpr);canvas.getContext('2d').setTransform(this.dpr,0,0,this.dpr,0,0);}
  this.grid=cardMesh(l.width,l.height,89+this.index,l.small);this.points=this.grid.points.map(p=>({x:p.x*l.width,y:p.y*l.height}));this.xy=this.points.map(p=>({...p,energy:0,pulse:0,weight:0}));
  this.shortest=this.points.map((p,i)=>Math.min(...this.grid.neighbors[i].map(j=>Math.hypot(p.x-this.points[j].x,p.y-this.points[j].y))));
  // The reversible reveal has its own stable, coarser cells, independent of hover.
  const revealGrid=mesh(171+this.index,l.small?7:13,l.small?9:7),mask=this.card.querySelector('mask');mask.setAttribute('width',l.width);mask.setAttribute('height',l.height);
  this.faces=revealGrid.triangles.map((ids,i)=>{const pts=ids.map(j=>revealGrid.points[j]),cx=pts.reduce((s,p)=>s+p.x,0)/3,cy=pts.reduce((s,p)=>s+p.y,0)/3,poly=document.createElementNS(SVG,'polygon');poly.setAttribute('fill','white');poly.setAttribute('points',pts.map(p=>`${(cx+(p.x-cx)*1.009)*l.width},${(cy+(p.y-cy)*1.009)*l.height}`).join(' '));return {pts,cx,cy,poly,value:1,previous:-1,offset:Math.sin(i*13.71+this.index)*8};});
  mask.replaceChildren(...this.faces.map(f=>f.poly));
  this.border=[];const vertices=outline(l.width,l.height,l.cut);
  for(let j=0;j<vertices.length;j++){const a=vertices[j],b=vertices[(j+1)%vertices.length],steps=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/9);for(let k=0;k<steps;k++){const x=a[0]+(b[0]-a[0])*k/steps,y=a[1]+(b[1]-a[1])*k/steps;this.border.push({x,y,near:this.nearest(x,y)});}}
  this.pulses=[];this.refreshType();this.previousMask=null;this.restingKey=null;this.maskChangedAt=0;this.maskKey=null;
 }
 nearest(x,y){let near=0,distance=Infinity;for(let i=0;i<this.points.length;i++){const p=this.points[i],d=(p.x-x)**2+(p.y-y)**2;if(d<distance){distance=d;near=i;}}return near;}
 refreshType(){
  const {width:w,height:h}=this.l,c=this.glyphMask.getContext('2d'),style=getComputedStyle(this.title),size=parseFloat(style.fontSize);
  this.typeTop=this.title.offsetTop;this.typeHeight=this.title.offsetHeight;
  for(const canvas of [this.glyphMask,this.typeCanvas]){canvas.width=Math.ceil(w*this.dpr);canvas.height=Math.ceil(this.typeHeight*this.dpr);canvas.getContext('2d').setTransform(this.dpr,0,0,this.dpr,0,-this.typeTop*this.dpr);}
  this.font=`${style.fontWeight} ${size}px Inter`;c.font=this.font;c.textBaseline='alphabetic';c.fillStyle='white';
  const metrics=c.measureText('Hg'),ascent=metrics.fontBoundingBoxAscent??size*.97,descent=metrics.fontBoundingBoxDescent??size*.24,baseline=this.title.offsetTop+(this.title.offsetHeight-ascent-descent)/2+ascent;
  this.typeTop=this.title.offsetTop;this.typeHeight=this.title.offsetHeight;
  this.glyphs=this.spans.map(span=>({x:this.title.offsetLeft+span.offsetLeft,y:baseline,size,width:span.offsetWidth,text:span.textContent}));
  this.typeFaces=[];this.typeEdges=[];
  for(let i=0;i<this.glyphs.length;i++){
   const g=this.glyphs[i];c.fillText(g.text,g.x,g.y);
   const cell=Math.max(5,size*.14),grid=mesh(843+this.index*17+i,Math.max(3,Math.ceil(g.width/cell)),Math.max(3,Math.ceil(this.typeHeight/cell)));
   const points=grid.points.map(p=>({x:g.x+p.x*g.width,y:this.typeTop+p.y*this.typeHeight}));
   for(let j=0;j<grid.triangles.length;j++)this.typeFaces.push({points:grid.triangles[j].map(k=>points[k]),glyph:i,variation:.5+.5*Math.sin(j*13+i*7)});
   for(const [a,b]of grid.edges)this.typeEdges.push({a:points[a],b:points[b],glyph:i});
  }
  // Cache sparse real contour positions only when typography/layout changes.
  // Particle origins follow the glyph silhouette, never its bounding rectangle.
  this.typeContour=[];this.waveAt=-10000;this.waveOrigin=null;this.titleEntered=false;
  try{
   const pixels=c.getImageData(0,0,this.glyphMask.width,this.glyphMask.height),data=pixels.data,pw=pixels.width,ph=pixels.height,stride=Math.max(2,Math.round(this.dpr*3));
   const alpha=(x,y)=>x<0||y<0||x>=pw||y>=ph?0:data[(y*pw+x)*4+3];
   for(let y=1;y<ph-1;y+=stride)for(let x=1;x<pw-1;x+=stride){
    if(alpha(x,y)<72||Math.min(alpha(x-stride,y),alpha(x+stride,y),alpha(x,y-stride),alpha(x,y+stride))>48)continue;
    const lx=x/this.dpr,ly=this.typeTop+y/this.dpr,glyph=this.glyphs.findIndex(g=>lx>=g.x-1&&lx<=g.x+g.width+1);
    if(glyph>=0)this.typeContour.push({x:lx,y:ly,glyph,near:this.nearest(lx,ly)});
   }
   if(this.typeContour.length>300){const step=this.typeContour.length/300;this.typeContour=Array.from({length:300},(_,i)=>this.typeContour[Math.floor(i*step)]);}
  }catch{this.typeContour=[];} // Keep the clean HTML title if a mask cannot be sampled.
  this.restingKey=null;
  for(const p of this.points){const distance=borderDistance(p.x,p.y,w,h,this.l.cut);p.weight=VFX.center+(1-VFX.center)*(1-smooth(distance/(Math.min(w,h)*VFX.edgeFade)));if(p.y>this.typeTop-4&&p.y<this.typeTop+this.typeHeight+4)p.weight*=.13;}
 }
 reveal(amount){this.amount=clamp(amount);}
 touch(pointer,t){
  const l=this.l,r=l.small?VFX.mobileRadius:VFX.radius;
  if(pointer.x< -r||pointer.x>l.width+r||pointer.y< -r||pointer.y>l.height+r)return;
  const near=this.nearest(pointer.x,pointer.y);if(Math.hypot(this.points[near].x-pointer.x,this.points[near].y-pointer.y)>r)return;
  this.pulses.push({time:t,distances:graphDistances(this.points,this.grid.neighbors,pointer.x,pointer.y,r*1.8)});if(this.pulses.length>2)this.pulses.shift();this.restingKey=null;
 }
 cancel(){this.pulses=[];this.imageEnergy=0;this.waveAt=-10000;this.waveOrigin=null;this.titleEntered=false;this.card.style.setProperty('--image-energy','0');this.restingKey=null;}
 updateMask(pose,reduced,t){
  let complete=true;const l=this.l,focused=this.card.classList.contains('focused'),top=VFX.top,bottom=l.h-VFX.bottom,band=(bottom-top)*VFX.band;
  const key=[pose.y,pose.z,pose.angle,this.amount,reduced,focused].join(':');if(this.maskKey===key)return;this.maskKey=key;
  for(const f of this.faces){const pos=project(f.cx*l.width,f.cy*l.height,pose,l),scroll=reduced||focused?1:visibility(pos.y+f.offset,top,bottom,band),loading=reduced||focused?1:loadVisibility(this.amount,f.cx,f.cy,this.index);f.value=Math.min(scroll,loading);if(f.value<.9999)complete=false;
   const value=Math.round(f.value*1000)/1000;if(value!==f.previous){f.poly.setAttribute('opacity',String(value));this.maskChangedAt=t;if(f.previous>=0&&Math.abs(value-f.previous)>.015&&Math.abs(value-f.previous)<.45&&value>.03&&value<.97)this.field.transitionParticle(pos.x,pos.y,t,15,-10);f.previous=value;}}
  if(this.previousMask!==complete){const url=complete?'none':`url(#reveal-${this.index})`;this.shell.style.maskImage=url;this.shell.style.webkitMaskImage=url;this.previousMask=complete;}
  this.complete=complete;
 }
 draw(t,pointer,pose,reduced=false){
  const c=this.ctx,e=this.ec,l=this.l,w=l.width,h=l.height,field=this.field,dt=Math.min(1,(t-this.last)/1000||.016);this.last=t;
  const focused=this.card.classList.contains('focused'),hit=field.pointer.strength>0&&insideCard(pointer.x,pointer.y,w,h,l.cut),imageTarget=pose.secondary<.02&&(hit||focused)?1:0;
  this.imageEnergy+=(imageTarget-this.imageEnergy)*(1-Math.exp(-dt/(imageTarget?.13:.2)));if(Math.abs(imageTarget-this.imageEnergy)<.001)this.imageEnergy=imageTarget;
  const imageValue=this.imageEnergy.toFixed(3);if(imageValue!==this.lastImageValue){this.card.style.setProperty('--image-energy',imageValue);this.card.dataset.imageState=this.imageEnergy>.98?'color':this.imageEnergy<.02?'neutral':'transition';this.lastImageValue=imageValue;}
  this.pulses=this.pulses.filter(p=>t-p.time<950);if(reduced)this.pulses=[];
  const idle=field.current.strength<.004&&!this.pulses.length&&(t-this.waveAt>1200)&&(t-(this.maskChangedAt||0)>500)&&this.imageEnergy===imageTarget;
  const key=[pose.y.toFixed(3),pose.z.toFixed(3),pose.angle.toFixed(5),this.amount.toFixed(4),reduced,focused].join(':');if(idle&&this.restingKey===key)return;this.restingKey=idle?key:null;
  this.updateMask(pose,reduced,t);const transition=clamp(1-(t-(this.maskChangedAt||0))/450);
  c.clearRect(0,0,w,h);e.clearRect(0,0,w+40,h+40);e.save();e.translate(20,20);
  const opacity=(1-pose.dark*.9)*(reduced?1:smooth((this.amount-.25)/.55));cardPath(e,w,h,l.cut);e.strokeStyle=`rgba(214,205,183,${.36*opacity})`;e.lineWidth=.75;e.stroke();
  // No permanent hot corner. The precise polygon perimeter owns its local light.
  for(let i=0;i<this.points.length;i++){
   const p=this.points[i],q=this.xy[i],view=project(p.x,p.y,pose,l);q.pulse=0;for(const pulse of this.pulses)q.pulse=Math.max(q.pulse,pulseEnvelope((t-pulse.time)/1000,pulse.distances[i]));
   const energy=reduced?0:Math.max(field.directEnergy(view.x,view.y),q.pulse);q.weight=p.weight;
   const limit=reduced?0:Math.min(l.small?1.2:1.8,this.shortest[i]*.06),dx=p.x-pointer.x,dy=p.y-pointer.y,len=Math.hypot(dx,dy)||1,phase=this.grid.points[i].phase;
   const idle=reduced?0:.35,ox=Math.sin(t*.00043+phase)*idle+dx/len*energy*limit,oy=Math.cos(t*.00037+phase)*idle+dy/len*energy*limit;
   q.x+=(p.x+ox-q.x)*(1-Math.exp(-dt*10));q.y+=(p.y+oy-q.y)*(1-Math.exp(-dt*10));q.energy=energy*opacity;
   if(this.complete)field.emit(view.x,view.y,t,q.energy*q.weight);
  }
  if(!reduced){
   const borderEnergy=this.border.map(p=>{const q=project(p.x,p.y,pose,l),v=visibility(q.y,VFX.top,l.h-VFX.bottom,(l.h-VFX.top-VFX.bottom)*VFX.band);return Math.max(field.directEnergy(q.x,q.y),this.xy[p.near].pulse)*opacity*v;});
   for(let bucket=1;bucket<=8;bucket++){e.beginPath();let count=0;for(let i=0;i<this.border.length;i++){const a=this.border[i],b=this.border[(i+1)%this.border.length],energy=(borderEnergy[i]+borderEnergy[(i+1)%this.border.length])*.5;if(energy<.015||Math.ceil(energy*8)!==bucket)continue;e.moveTo(a.x,a.y);e.lineTo(b.x,b.y);count++;}if(!count)continue;const energy=bucket/8;e.strokeStyle=`rgba(${VFX.color},${energy*.12})`;e.lineWidth=8;e.shadowColor=`rgba(${VFX.color},${energy*.7})`;e.shadowBlur=13;e.stroke();e.strokeStyle=`rgba(${VFX.color},${energy*.68})`;e.lineWidth=2.2;e.shadowBlur=4;e.stroke();e.shadowBlur=0;e.strokeStyle=`rgba(${VFX.hot||VFX.paper},${energy*.92})`;e.lineWidth=.85;e.stroke();}
  }
  c.save();cardPath(c,w,h,l.cut);c.clip();c.lineWidth=.55;
  if(this.complete&&!reduced){
   for(const ids of this.grid.triangles){const [a,b,d]=ids.map(i=>this.xy[i]),energy=(a.energy*a.weight+b.energy*b.weight+d.energy*d.weight)/3;if(energy<.018)continue;c.fillStyle=`rgba(${VFX.color},${energy*VFX.faceAlpha})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineTo(d.x,d.y);c.closePath();c.fill();}
   // Bucket independent strokes to keep draw calls bounded.
   for(let bucket=1;bucket<=6;bucket++){c.beginPath();let count=0;for(const [ai,bi]of this.grid.edges){const a=this.xy[ai],b=this.xy[bi],energy=(a.energy*a.weight+b.energy*b.weight)*.5;if(energy<.012||Math.ceil(energy*6)!==bucket)continue;c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);count++;}if(count){c.strokeStyle=`rgba(${VFX.color},${bucket/6*VFX.edgeAlpha})`;c.stroke();}}
   for(const p of this.xy){const energy=p.energy*p.weight;if(energy<.1)continue;c.fillStyle=`rgba(${VFX.paper},${energy*.28})`;c.fillRect(p.x-.35,p.y-.35,.7,.7);}
   this.drawType(t,pose,c,e);
  }
  if(!reduced){for(const f of this.faces){let strength=0;if(f.value>.015&&f.value<.985)strength=Math.sin(f.value*Math.PI)*.42*(1-pose.dark*.7)*transition;if(this.amount>.07&&this.amount<.42){const front=loadVisibility(Math.min(1,this.amount+.18),f.cx,f.cy,this.index);if(front>.05&&front<.95)strength=Math.max(strength,Math.sin(front*Math.PI)*.44);}if(strength<.004)continue;c.strokeStyle=`rgba(${VFX.color},${strength})`;c.beginPath();for(let j=0;j<3;j++){const p=f.pts[j];j?c.lineTo(p.x*w,p.y*h):c.moveTo(p.x*w,p.y*h);}c.closePath();c.fillStyle=`rgba(${VFX.color},${strength*.12})`;c.fill();c.shadowColor=`rgba(${VFX.color},${strength*.55})`;c.shadowBlur=4;c.stroke();c.shadowBlur=0;}}
  c.restore();e.restore();
 }
 drawType(t,pose,c,e){
  if(pose.secondary>.05)return;const l=this.l,w=l.width,ctx=this.typeCanvas.getContext('2d');ctx.globalCompositeOperation='source-over';ctx.clearRect(0,this.typeTop,w,this.typeHeight);let maximum=0;
  const energies=this.glyphs.map(g=>{const p=project(g.x+g.width/2,this.typeTop+this.typeHeight*.5,pose,l),energy=Math.max(this.field.directEnergy(p.x,p.y),this.xy[this.nearest(g.x+g.width/2,this.typeTop+this.typeHeight*.5)].pulse);maximum=Math.max(maximum,energy);return energy;});
  if(maximum>.2&&!this.titleEntered&&t-this.waveAt>750){this.waveAt=t;const g=this.glyphs[energies.indexOf(maximum)];this.waveOrigin=(g.x+g.width/2)/w;this.titleEntered=true;}if(maximum<.07)this.titleEntered=false;
  const elapsed=(t-this.waveAt)/780,travelling=Number.isFinite(this.waveOrigin)&&elapsed>=0&&elapsed<1.1;
  if(maximum<.008&&!travelling)return;
  const light=(x,i)=>glyphLight(energies[i],x/w,this.waveOrigin,elapsed);
  // Translucent microfaces enrich the original full HTML glyph; they never
  // replace its fill or its silhouette with an outline.
  for(const f of this.typeFaces){const [a,b,d]=f.points,energy=light((a.x+b.x+d.x)/3,f.glyph);if(energy<.02)continue;ctx.fillStyle=`rgba(${VFX.color},${energy*(.42+.44*f.variation)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(d.x,d.y);ctx.closePath();ctx.fill();}
  ctx.lineWidth=.7;for(const {a,b,glyph}of this.typeEdges){const energy=light((a.x+b.x)/2,glyph);if(energy<.02)continue;ctx.strokeStyle=`rgba(${VFX.paper},${energy*.82})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  ctx.save();ctx.globalCompositeOperation='destination-in';ctx.drawImage(this.glyphMask,0,this.typeTop,w,this.typeHeight);ctx.restore();c.drawImage(this.typeCanvas,0,this.typeTop,w,this.typeHeight);
  // A short local halo follows the clipped microfaces. The base HTML fill
  // remains intact; no global title opacity, outline substitution or distortion.
  e.save();e.globalCompositeOperation='screen';e.globalAlpha=.30;e.shadowColor=`rgba(${VFX.color},.85)`;e.shadowBlur=l.small?5:8;e.drawImage(this.typeCanvas,0,this.typeTop,w,this.typeHeight);e.restore();
  const candidates=[];
  for(const p of this.typeContour||[]){const view=project(p.x,p.y,pose,l),direct=Math.max(this.field.directEnergy(view.x,view.y),this.xy[p.near]?.pulse||0),energy=glyphLight(direct,p.x/w,this.waveOrigin,elapsed);if(energy<.25)continue;const rank=energy*(.82+.18*Math.sin(p.x*.17+p.y*.11));if(candidates.length===3&&rank<=candidates[2].rank)continue;candidates.push({x:view.x,y:view.y,energy,rank});candidates.sort((a,b)=>b.rank-a.rank);if(candidates.length>3)candidates.pop();}
  for(const p of candidates)this.field.emit(p.x,p.y,t,p.energy,'glyph');
 }
 dispose(){this.shell.style.maskImage='none';this.shell.style.webkitMaskImage='none';this.canvas.remove();this.edge.remove();this.card.querySelector('svg')?.remove();this.pulses=[];}
}
