import {clamp,smooth,project} from './model.mjs';
import {mesh,cardMesh,cardPath,outline,borderDistance,insideCard} from './geometry.mjs';
import {VFX} from './vfx-config.mjs';
import {visibility,loadVisibility,graphDistances,pulseEnvelope,glyphLight} from './vfx-core.mjs';
const SVG='http://www.w3.org/2000/svg',EDGE_PAD=32,HALO_RADIUS=26,MASK_STEPS=48;
let perimeterHalo;
function haloSprite(){
 if(perimeterHalo)return perimeterHalo;const canvas=document.createElement('canvas');canvas.width=canvas.height=HALO_RADIUS*2;const c=canvas.getContext('2d'),g=c.createRadialGradient(HALO_RADIUS,HALO_RADIUS,0,HALO_RADIUS,HALO_RADIUS,HALO_RADIUS);
 for(const[stop,alpha]of [[0,.42],[.12,.28],[.4,.09],[.72,.018],[1,0]])g.addColorStop(stop,`rgba(${VFX.color},${alpha})`);
 c.fillStyle=g;c.fillRect(0,0,canvas.width,canvas.height);perimeterHalo=canvas;return canvas;
}
function clipExterior(c,w,h,cut){
 c.beginPath();c.rect(-EDGE_PAD,-EDGE_PAD,w+EDGE_PAD*2,h+EDGE_PAD*2);const path=outline(w,h,cut);c.moveTo(...path[0]);for(let i=1;i<path.length;i++)c.lineTo(...path[i]);c.closePath();c.clip('evenodd');
}
// Clear in physical pixels, then set the absolute drawing transform. A previous
// draw can never leave a translated clear or accumulate copies of the perimeter.
export function resetSurface(ctx,canvas,dpr,padding=0){
 ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.setTransform(dpr,0,0,dpr,padding*dpr,padding*dpr);
 ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.shadowBlur=0;ctx.shadowOffsetX=0;ctx.shadowOffsetY=0;ctx.beginPath();
}
const materialVariation=(i,seed)=>.18+.82*Math.pow(.5+.5*Math.sin(i*12.9898+seed*4.137),1.7);
export class CardFX{
 constructor(card,index,field){
  Object.assign(this,{card,index,field,canvas:card.querySelector('.card-fx'),edge:card.querySelector('.card-edge'),title:card.querySelector('.title'),shell:card.querySelector('.card-reveal'),amount:1,last:0,waveAt:-10000,waveOrigin:null,titleEntered:false,previousMask:null,imageEnergy:0,pulses:[]});
  this.ctx=this.canvas.getContext('2d');this.ec=this.edge.getContext('2d');this.spans=[...this.title.children];this.glyphMask=document.createElement('canvas');this.typeCanvas=document.createElement('canvas');
 }
 resize(l){
  this.l=l;const pixelBudget=1_500_000,paddedWidth=l.width+EDGE_PAD*2,paddedHeight=l.height+EDGE_PAD*2,budgetDpr=Math.sqrt(pixelBudget/(paddedWidth*paddedHeight));
  this.dpr=Math.min(devicePixelRatio||1,l.small?VFX.mobileDpr:VFX.dpr,budgetDpr);
  // Round within the budget before allocating five retained card surfaces.
  if(this.dpr===budgetDpr)this.dpr=Math.min(Math.floor(paddedWidth*this.dpr)/paddedWidth,Math.floor(paddedHeight*this.dpr)/paddedHeight)*(1-1e-12);
  const surfaceKey=[l.width,l.height,l.cut,l.small,this.dpr].join(':');
  if(this.surfaceKey===surfaceKey){this.maskKey=null;this.restingKey=null;this.refreshType();return;}this.surfaceKey=surfaceKey;
  for(const [canvas,padding]of [[this.canvas,0],[this.edge,EDGE_PAD*2]]){canvas.width=Math.ceil((l.width+padding)*this.dpr);canvas.height=Math.ceil((l.height+padding)*this.dpr);canvas.getContext('2d').setTransform(this.dpr,0,0,this.dpr,0,0);}
  this.grid=cardMesh(l.width,l.height,89+this.index,l.small);this.points=this.grid.points.map(p=>({x:p.x*l.width,y:p.y*l.height}));this.xy=this.points.map(p=>({...p,energy:0,pulse:0,weight:0}));
  this.shortest=this.points.map((p,i)=>Math.min(...this.grid.neighbors[i].map(j=>Math.hypot(p.x-this.points[j].x,p.y-this.points[j].y))));
  // One topology owns hover, load reveal and scroll disappearance. Mask cells
  // only overlap by a subpixel amount to prevent antialiasing seams.
  const mask=this.card.querySelector('mask');mask.setAttribute('width',l.width);mask.setAttribute('height',l.height);mask.replaceChildren();this.maskNode=mask;this.maskBuilt=false;
  this.faces=this.grid.triangles.map((ids,i)=>{const pts=ids.map(j=>this.grid.points[j]),cx=pts.reduce((s,p)=>s+p.x,0)/3,cy=pts.reduce((s,p)=>s+p.y,0)/3;return {ids,pts,cx,cy,poly:null,value:1,previous:-1,energy:0,variation:materialVariation(i,this.index),offset:Math.sin(i*13.71+this.index)*8};});
  this.edgeVariation=this.grid.edges.map((_,i)=>materialVariation(i,29+this.index));this.edgeBuckets=Array.from({length:7},()=>[]);this.borderBuckets=Array.from({length:7},()=>[]);
  this.border=[];const vertices=outline(l.width,l.height,l.cut);
  for(let j=0;j<vertices.length;j++){const a=vertices[j],b=vertices[(j+1)%vertices.length],steps=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/20);for(let k=0;k<steps;k++){const x=a[0]+(b[0]-a[0])*k/steps,y=a[1]+(b[1]-a[1])*k/steps;this.border.push({x,y,near:this.nearest(x,y),energy:0});}}
  this.halo=haloSprite();
  this.pulses=[];this.refreshType();this.previousMask=null;this.restingKey=null;this.maskChangedAt=0;this.maskKey=null;
 }
 nearest(x,y){let near=0,distance=Infinity;for(let i=0;i<this.points.length;i++){const p=this.points[i],d=(p.x-x)**2+(p.y-y)**2;if(d<distance){distance=d;near=i;}}return near;}
 refreshType(force=false){
  const {width:w,height:h}=this.l,c=this.glyphMask.getContext('2d'),style=getComputedStyle(this.title),size=parseFloat(style.fontSize);
  const typeKey=[this.surfaceKey,style.fontWeight,size,this.title.offsetLeft,this.title.offsetTop,this.title.offsetHeight,this.title.offsetWidth,document.fonts?.status].join(':');if(!force&&this.typeKey===typeKey)return;this.typeKey=typeKey;
  this.typeTop=this.title.offsetTop;this.typeHeight=this.title.offsetHeight;
  for(const canvas of [this.glyphMask,this.typeCanvas]){canvas.width=Math.ceil(w*this.dpr);canvas.height=Math.ceil(this.typeHeight*this.dpr);canvas.getContext('2d').setTransform(this.dpr,0,0,this.dpr,0,-this.typeTop*this.dpr);}
  this.font=`${style.fontWeight} ${size}px Inter`;c.font=this.font;c.textBaseline='alphabetic';c.fillStyle='white';
  const metrics=c.measureText('Hg'),ascent=metrics.fontBoundingBoxAscent??size*.97,descent=metrics.fontBoundingBoxDescent??size*.24,baseline=this.title.offsetTop+(this.title.offsetHeight-ascent-descent)/2+ascent;
  this.typeTop=this.title.offsetTop;this.typeHeight=this.title.offsetHeight;
  this.glyphs=this.spans.map(span=>({x:this.title.offsetLeft+span.offsetLeft,y:baseline,size,width:span.offsetWidth,text:span.textContent,near:this.nearest(this.title.offsetLeft+span.offsetLeft+span.offsetWidth/2,this.typeTop+this.typeHeight*.5)}));
  this.typeFaces=[];this.typeEdges=[];
  for(let i=0;i<this.glyphs.length;i++){
   const g=this.glyphs[i];c.fillText(g.text,g.x,g.y);
   // Rasterize the silhouette halo once; hover only changes its compositing alpha.
   const pad=14,halo=document.createElement('canvas'),hd=Math.min(1.25,this.dpr);g.haloWidth=g.width+pad*2;g.haloHeight=this.typeHeight+pad*2;halo.width=Math.ceil(g.haloWidth*hd);halo.height=Math.ceil(g.haloHeight*hd);const hc=halo.getContext('2d');hc.setTransform(hd,0,0,hd,0,0);hc.font=this.font;hc.textBaseline='alphabetic';hc.lineWidth=.6;hc.strokeStyle=`rgba(${VFX.hot||VFX.paper},.8)`;hc.shadowColor=`rgba(${VFX.color},.65)`;hc.shadowBlur=7;hc.strokeText(g.text,pad,baseline-this.typeTop+pad);hc.shadowBlur=0;g.halo=halo;g.haloPad=pad;

   const cell=Math.max(5,size*.14),grid=mesh(843+this.index*17+i,Math.max(3,Math.ceil(g.width/cell)),Math.max(3,Math.ceil(this.typeHeight/cell)));
   const points=grid.points.map(p=>({x:g.x+p.x*g.width,y:this.typeTop+p.y*this.typeHeight}));
   for(let j=0;j<grid.triangles.length;j++)this.typeFaces.push({points:grid.triangles[j].map(k=>points[k]),glyph:i,variation:.5+.5*Math.sin(j*13+i*7)});
   for(const [a,b]of grid.edges)this.typeEdges.push({a:points[a],b:points[b],glyph:i});
  }
  // Cache sparse real contour positions only when typography/layout changes.
  // Particle origins follow the glyph silhouette, never its bounding rectangle.
  this.typeContour=[];this.waveAt=-10000;this.waveOrigin=null;this.titleEntered=false;
  try{
   const pixels=c.getImageData(0,0,this.glyphMask.width,this.glyphMask.height),data=pixels.data,pw=pixels.width,ph=pixels.height,stride=Math.max(2,Math.round(this.dpr*4));
   const alpha=(x,y)=>x<0||y<0||x>=pw||y>=ph?0:data[(y*pw+x)*4+3];
   for(let y=1;y<ph-1;y+=stride)for(let x=1;x<pw-1;x+=stride){
    if(alpha(x,y)<72||Math.min(alpha(x-stride,y),alpha(x+stride,y),alpha(x,y-stride),alpha(x,y+stride))>48)continue;
    const lx=x/this.dpr,ly=this.typeTop+y/this.dpr,glyph=this.glyphs.findIndex(g=>lx>=g.x-1&&lx<=g.x+g.width+1);
    if(glyph>=0)this.typeContour.push({x:lx,y:ly,glyph,near:this.nearest(lx,ly)});
   }
   if(this.typeContour.length>140){const step=this.typeContour.length/140;this.typeContour=Array.from({length:140},(_,i)=>this.typeContour[Math.floor(i*step)]);}
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
 buildMask(){
  if(this.maskBuilt)return;
  for(const f of this.faces){const poly=document.createElementNS(SVG,'polygon');poly.setAttribute('fill','white');poly.setAttribute('points',f.pts.map(p=>`${(f.cx+(p.x-f.cx)*1.005)*this.l.width},${(f.cy+(p.y-f.cy)*1.005)*this.l.height}`).join(' '));f.poly=poly;f.previous=-1;}
  this.maskNode.replaceChildren(...this.faces.map(f=>f.poly));this.maskBuilt=true;
 }
 updateMask(pose,reduced,t){
  const l=this.l,focused=this.card.classList.contains('focused'),top=VFX.top,bottom=l.h-VFX.bottom,band=(bottom-top)*VFX.band;
  const key=[pose.y,pose.z,pose.angle,this.amount,reduced,focused].join(':');if(this.maskKey===key)return;
  const endpoint=(this.amount===0||this.amount===1)&&this.lastMaskAmount!==this.amount;
  if(!reduced&&!endpoint&&this.maskBuilt&&t-this.lastMaskPaint<32)return;
  this.maskKey=key;this.lastMaskPaint=t;this.lastMaskAmount=this.amount;
  const y0=project(0,0,pose,l).y,y1=project(0,l.height,pose,l).y;
  const full=reduced||focused||(this.amount>=1&&Math.min(y0,y1)>=top+band+8&&Math.max(y0,y1)<=bottom-band-8);
  let complete=full,changed=false;
  if(full){if(!this.complete)for(const f of this.faces){f.value=1;f.energy=0;}}
  else{
   complete=true;
   for(const f of this.faces){const pos=project(f.cx*l.width,f.cy*l.height,pose,l),scroll=visibility(pos.y+f.offset,top,bottom,band),loading=loadVisibility(this.amount,f.cx,f.cy,this.index);f.value=Math.min(scroll,loading);if(f.value<.9999)complete=false;}
  }
  if(!complete){
   this.buildMask();
   for(const f of this.faces){const value=Math.round(f.value*MASK_STEPS)/MASK_STEPS;if(value===f.previous)continue;f.poly.setAttribute('opacity',String(value));changed=true;
    if(f.previous>=0&&Math.abs(value-f.previous)>.025&&Math.abs(value-f.previous)<.45&&value>.03&&value<.97&&this.field.transitionBudget>0){const pos=project(f.cx*l.width,f.cy*l.height,pose,l);this.field.transitionParticle(pos.x,pos.y,t,15,-10);}f.previous=value;}
  }
  if(changed)this.maskChangedAt=t;
  if(this.previousMask!==complete){const url=complete?'none':`url(#reveal-${this.index})`;this.shell.style.maskImage=url;this.shell.style.webkitMaskImage=url;this.previousMask=complete;}
  this.complete=complete;
 }
 draw(t,pointer,pose,reduced=false){
  const c=this.ctx,e=this.ec,l=this.l,w=l.width,h=l.height,field=this.field,dt=Math.min(1,(t-this.last)/1000||.016);this.last=t;
  const focused=this.card.classList.contains('focused'),hit=field.pointer.strength>0&&insideCard(pointer.x,pointer.y,w,h,l.cut),imageTarget=pose.secondary<.02&&(hit||focused)?1:0;
  this.imageEnergy+=(imageTarget-this.imageEnergy)*(1-Math.exp(-dt/(imageTarget?.13:.2)));if(Math.abs(imageTarget-this.imageEnergy)<.001)this.imageEnergy=imageTarget;
  const imageValue=this.imageEnergy.toFixed(3);if(imageValue!==this.lastImageValue){this.card.style.setProperty('--image-energy',imageValue);this.card.dataset.imageState=this.imageEnergy>.98?'color':this.imageEnergy<.02?'neutral':'transition';this.lastImageValue=imageValue;}
  this.pulses=this.pulses.filter(p=>t-p.time<950);if(reduced)this.pulses=[];
  const radius=(l.small?VFX.mobileRadius:VFX.radius)*1.7,nearby=field.current.strength>.004&&pointer.x>-radius&&pointer.x<w+radius&&pointer.y>-radius&&pointer.y<h+radius;
  const idle=!nearby&&!this.pulses.length&&(t-this.waveAt>1200)&&(t-(this.maskChangedAt||0)>500)&&this.imageEnergy===imageTarget;
  const key=[pose.y.toFixed(3),pose.z.toFixed(3),pose.angle.toFixed(5),this.amount.toFixed(4),reduced,focused].join(':');if(idle&&this.restingKey===key)return;this.restingKey=idle?key:null;
  this.updateMask(pose,reduced,t);const transition=clamp(1-(t-(this.maskChangedAt||0))/450);
  resetSurface(c,this.canvas,this.dpr);resetSurface(e,this.edge,this.dpr,EDGE_PAD);
  const opacity=(1-pose.dark*.9)*(reduced?1:smooth((this.amount-.25)/.55));
  // No permanent hot corner. The precise polygon perimeter owns its local light.
  for(let i=0;i<this.points.length;i++){
   const p=this.points[i],q=this.xy[i],view=project(p.x,p.y,pose,l);q.pulse=0;for(const pulse of this.pulses)q.pulse=Math.max(q.pulse,pulseEnvelope((t-pulse.time)/1000,pulse.distances[i]));
   const energy=reduced?0:Math.max(nearby?field.directEnergy(view.x,view.y):0,q.pulse);q.weight=p.weight;
   const limit=reduced?0:Math.min(l.small?1.2:1.8,this.shortest[i]*.06),dx=p.x-pointer.x,dy=p.y-pointer.y,len=Math.hypot(dx,dy)||1,phase=this.grid.points[i].phase;
   const idle=reduced?0:.35,ox=Math.sin(t*.00043+phase)*idle+dx/len*energy*limit,oy=Math.cos(t*.00037+phase)*idle+dy/len*energy*limit;
   q.x+=(p.x+ox-q.x)*(1-Math.exp(-dt*10));q.y+=(p.y+oy-q.y)*(1-Math.exp(-dt*10));q.energy=energy*opacity;q.front=0;
   if(this.complete&&q.energy*q.weight>.12)field.emit(view.x,view.y,t,q.energy*q.weight);
  }
  // A mottled front travels across the SAME triangles used by proximity.
  // Peaks remain local: many facets stay dark while a few reach hot amber.
  if(!reduced)for(const f of this.faces){
   let front=0;
   if(f.value>.015&&f.value<.985)front=Math.pow(Math.sin(f.value*Math.PI),1.25)*transition;
   if(this.amount>.04&&this.amount<.82){const lead=loadVisibility(Math.min(1,this.amount+.10),f.cx,f.cy,this.index);if(lead>.025&&lead<.975)front=Math.max(front,Math.sin(lead*Math.PI)*.85);}
   f.energy=front*(.30+.70*f.variation)*(1-pose.dark*.7);
   for(const id of f.ids)this.xy[id].front=Math.max(this.xy[id].front,f.energy);
  }
  // A single 0.8px perimeter. Its bloom is a cached, soft falloff clipped
  // strictly outside the card; there is no inflated stroke or inner outline.
  for(const bucket of this.borderBuckets)bucket.length=0;
  for(let i=0;i<this.border.length;i++){const p=this.border[i],q=this.xy[p.near],view=project(p.x,p.y,pose,l),v=visibility(view.y,VFX.top,l.h-VFX.bottom,(l.h-VFX.top-VFX.bottom)*VFX.band);p.energy=reduced?0:clamp(Math.max(q.energy,q.pulse*opacity,q.front*.75*opacity)*v);}
  if(!reduced){e.save();clipExterior(e,w,h,l.cut);for(const p of this.border){if(p.energy<.06)continue;e.globalAlpha=p.energy*.85;e.drawImage(this.halo,p.x-HALO_RADIUS,p.y-HALO_RADIUS,HALO_RADIUS*2,HALO_RADIUS*2);}e.restore();e.globalAlpha=1;}
  for(let i=0;i<this.border.length;i++){const energy=(this.border[i].energy+this.border[(i+1)%this.border.length].energy)*.5,bucket=energy<.035?0:Math.min(6,Math.ceil(energy*6));this.borderBuckets[bucket].push(i);}
  e.lineWidth=.8;e.lineCap='butt';e.lineJoin='miter';
  for(let bucket=0;bucket<this.borderBuckets.length;bucket++){
   const segments=this.borderBuckets[bucket];if(!segments.length)continue;e.beginPath();for(const i of segments){const a=this.border[i],b=this.border[(i+1)%this.border.length];e.moveTo(a.x,a.y);e.lineTo(b.x,b.y);}
   const energy=bucket/6;e.strokeStyle=bucket?`rgba(255,${Math.round(158+energy*50)},${Math.round(48+energy*85)},${(.25+energy*.66)*opacity})`:`rgba(214,205,183,${.27*opacity})`;e.stroke();
  }
  c.save();cardPath(c,w,h,l.cut);c.clip();c.lineWidth=.6;
  if(!reduced){
   for(const f of this.faces){
    const a=this.xy[f.ids[0]],b=this.xy[f.ids[1]],d=this.xy[f.ids[2]],hover=(a.energy*a.weight+b.energy*b.weight+d.energy*d.weight)/3*(.55+.45*f.variation),energy=Math.max(hover,f.energy);
    if(energy<.012)continue;c.fillStyle=`rgba(${VFX.color},${energy*VFX.faceAlpha*(f.energy>hover?2.1:1)})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineTo(d.x,d.y);c.closePath();c.fill();
   }
   // Shared, deduplicated edges: no second reveal wireframe, no doubled lines.
   for(const bucket of this.edgeBuckets)bucket.length=0;
   for(let i=0;i<this.grid.edges.length;i++){const[ai,bi]=this.grid.edges[i],a=this.xy[ai],b=this.xy[bi],hover=(a.energy*a.weight+b.energy*b.weight)*.5,front=(a.front+b.front)*.5,energy=clamp(Math.max(hover,front)*(.38+.62*this.edgeVariation[i]));if(energy>=.012)this.edgeBuckets[Math.min(6,Math.ceil(energy*6))].push(i);}
   for(let bucket=1;bucket<=6;bucket++){
    const edges=this.edgeBuckets[bucket];if(!edges.length)continue;c.beginPath();for(const i of edges){const[ai,bi]=this.grid.edges[i],a=this.xy[ai],b=this.xy[bi];c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);}
    const energy=bucket/6;c.lineWidth=.58;c.strokeStyle=`rgba(255,${Math.round(159+energy*43)},${Math.round(48+energy*75)},${energy*.67})`;c.stroke();
   }
   for(const p of this.xy){const energy=Math.max(p.energy*p.weight,p.front);if(energy<.13)continue;c.fillStyle=`rgba(${VFX.paper},${energy*.44})`;c.fillRect(p.x-.4,p.y-.4,.8,.8);}
   if(this.complete)this.drawType(t,pose,c,e);
  }
  c.restore();

 }
 drawType(t,pose,c,e){
  if(pose.secondary>.05)return;const l=this.l,w=l.width,ctx=this.typeCanvas.getContext('2d');ctx.globalCompositeOperation='source-over';ctx.clearRect(0,this.typeTop,w,this.typeHeight);let maximum=0;
  const energies=this.glyphs.map(g=>{const p=project(g.x+g.width/2,this.typeTop+this.typeHeight*.5,pose,l),energy=g.near===undefined?Math.max(this.field.directEnergy(p.x,p.y),this.xy[this.nearest(g.x+g.width/2,this.typeTop+this.typeHeight*.5)].pulse):Math.max(this.xy[g.near].energy,this.xy[g.near].pulse);maximum=Math.max(maximum,energy);return energy;});
  if(maximum>.2&&!this.titleEntered&&t-this.waveAt>750){this.waveAt=t;const g=this.glyphs[energies.indexOf(maximum)];this.waveOrigin=(g.x+g.width/2)/w;this.titleEntered=true;}if(maximum<.07)this.titleEntered=false;
  const elapsed=(t-this.waveAt)/780,travelling=Number.isFinite(this.waveOrigin)&&elapsed>=0&&elapsed<1.1;
  if(maximum<.008&&!travelling)return;
  const light=(x,i)=>glyphLight(energies[i],x/w,this.waveOrigin,elapsed);
  // Translucent microfaces enrich the original full HTML glyph; they never
  // replace its fill or its silhouette with an outline.
  for(const f of this.typeFaces){const [a,b,d]=f.points,energy=light((a.x+b.x+d.x)/3,f.glyph);if(energy<.02)continue;ctx.fillStyle=`rgba(${VFX.color},${energy*(.42+.44*f.variation)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(d.x,d.y);ctx.closePath();ctx.fill();}
  ctx.lineWidth=.7;for(const {a,b,glyph}of this.typeEdges){const energy=light((a.x+b.x)/2,glyph);if(energy<.02)continue;ctx.strokeStyle=`rgba(${VFX.paper},${energy*.82})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  ctx.save();ctx.globalCompositeOperation='destination-in';ctx.drawImage(this.glyphMask,0,this.typeTop,w,this.typeHeight);ctx.restore();c.drawImage(this.typeCanvas,0,this.typeTop,w,this.typeHeight);
  // The glyph silhouette glow was rasterized at resize. Hover does no blur.
  e.save();e.globalCompositeOperation='screen';
  for(let i=0;i<this.glyphs.length;i++){const g=this.glyphs[i],energy=light(g.x+g.width*.5,i);if(energy<.04||!g.halo)continue;e.globalAlpha=energy*.76;e.drawImage(g.halo,g.x-g.haloPad,this.typeTop-g.haloPad,g.haloWidth,g.haloHeight);}
  e.restore();
  const candidates=[];
  for(const p of this.typeContour||[]){const direct=p.near===undefined?this.field.directEnergy(project(p.x,p.y,pose,l).x,project(p.x,p.y,pose,l).y):Math.max(this.xy[p.near]?.energy||0,this.xy[p.near]?.pulse||0),energy=glyphLight(direct,p.x/w,this.waveOrigin,elapsed);if(energy<.25)continue;const rank=energy*(.82+.18*Math.sin(p.x*.17+p.y*.11));if(candidates.length===3&&rank<=candidates[2].rank)continue;candidates.push({x:p.x,y:p.y,energy,rank});candidates.sort((a,b)=>b.rank-a.rank);if(candidates.length>3)candidates.pop();}
  for(const p of candidates){const view=project(p.x,p.y,pose,l);this.field.emit(view.x,view.y,t,p.energy,'glyph');}
 }
 dispose(){this.shell.style.maskImage='none';this.shell.style.webkitMaskImage='none';this.canvas.remove();this.edge.remove();this.card.querySelector('svg')?.remove();this.pulses=[];}
}
