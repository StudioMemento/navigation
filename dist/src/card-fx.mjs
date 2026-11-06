import {clamp,smooth,project} from './model.mjs';
import {mesh,cardPath,outline,borderDistance} from './geometry.mjs';
import {VFX} from './vfx-config.mjs';
import {visibility,loadVisibility} from './vfx-core.mjs';
const SVG='http://www.w3.org/2000/svg';
export class CardFX{
 constructor(card,index,field){this.card=card;this.index=index;this.field=field;this.canvas=card.querySelector('.card-fx');this.ctx=this.canvas.getContext('2d');this.edge=card.querySelector('.card-edge');this.ec=this.edge.getContext('2d');this.title=card.querySelector('.title');this.spans=[...this.title.children];this.shell=card.querySelector('.card-reveal');this.glyphMask=document.createElement('canvas');this.typeCanvas=document.createElement('canvas');this.amount=1;this.last=0;this.waveAt=-10000;this.titleEntered=false;this.previousMask=null;}
 resize(l){this.l=l;this.dpr=Math.min(devicePixelRatio||1,l.small?VFX.mobileDpr:VFX.dpr);for(const [canvas,padding]of [[this.canvas,0],[this.edge,40],[this.glyphMask,0],[this.typeCanvas,0]]){canvas.width=Math.ceil((l.width+padding)*this.dpr);canvas.height=Math.ceil((l.height+padding)*this.dpr);canvas.getContext('2d').setTransform(this.dpr,0,0,this.dpr,0,0);}
 this.grid=mesh(89+this.index,l.small?6:12,l.small?8:6);this.xy=this.grid.points.map(p=>({x:p.x*l.width,y:p.y*l.height,energy:0,weight:0}));this.shortest=this.grid.points.map((p,i)=>Math.min(...this.grid.neighbors[i].map(j=>Math.hypot((p.x-this.grid.points[j].x)*l.width,(p.y-this.grid.points[j].y)*l.height))));
 const mask=this.card.querySelector('mask');mask.setAttribute('width',l.width);mask.setAttribute('height',l.height);
 this.faces=this.grid.triangles.map((ids,i)=>{const pts=ids.map(j=>this.grid.points[j]),cx=pts.reduce((s,p)=>s+p.x,0)/3,cy=pts.reduce((s,p)=>s+p.y,0)/3,poly=document.createElementNS(SVG,'polygon');poly.setAttribute('fill','white');poly.setAttribute('points',pts.map(p=>`${(cx+(p.x-cx)*1.009)*l.width},${(cy+(p.y-cy)*1.009)*l.height}`).join(' '));return {ids,pts,cx,cy,poly,value:1,previous:-1,offset:Math.sin(i*13.71+this.index)*8};});mask.replaceChildren(...this.faces.map(f=>f.poly));
 this.typeGrid=mesh(843+this.index,l.small?18:28,3);
 this.border=[];const vertices=outline(l.width,l.height,l.cut);for(let j=0;j<vertices.length;j++){const a=vertices[j],b=vertices[(j+1)%vertices.length],steps=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/8);for(let k=0;k<steps;k++)this.border.push({x:a[0]+(b[0]-a[0])*k/steps,y:a[1]+(b[1]-a[1])*k/steps});}
 this.refreshType();this.previousMask=null;this.restingKey=null;this.maskChangedAt=0;
 }
 refreshType(){const {width:w,height:h}=this.l,c=this.glyphMask.getContext('2d');c.clearRect(0,0,w,h);const style=getComputedStyle(this.title),size=parseFloat(style.fontSize);this.font=`300 ${size}px Inter`;this.glyphs=this.spans.map(span=>({x:this.title.offsetLeft+span.offsetLeft,y:this.title.offsetTop+size*.03,size,width:span.offsetWidth,text:span.textContent}));c.font=this.font;c.textBaseline='top';c.fillStyle='white';for(const g of this.glyphs)c.fillText(g.text,g.x,g.y);this.typeTop=this.title.offsetTop;this.typeHeight=this.title.offsetHeight;}
 reveal(amount){this.amount=clamp(amount);}
 updateMask(pose,reduced,t){let complete=true;const l=this.l,focused=this.card.classList.contains('focused'),top=l.short?24:VFX.top,bottom=l.h-(l.short?52:VFX.bottom),band=(bottom-top)*VFX.band;
 for(const f of this.faces){const pos=project(f.cx*l.width,f.cy*l.height,pose,l),scroll=reduced||focused?1:visibility(pos.y+f.offset,top,bottom,band),loading=reduced||focused?1:loadVisibility(this.amount,f.cx,f.cy,this.index);f.value=Math.min(scroll,loading);if(f.value<.9999)complete=false;
 const value=Math.round(f.value*1000)/1000;if(value!==f.previous){f.poly.setAttribute('opacity',String(value));this.maskChangedAt=t;if(f.previous>=0&&Math.abs(value-f.previous)>.015&&Math.abs(value-f.previous)<.45&&value>.03&&value<.97)this.field.transitionParticle(pos.x,pos.y,t,15,-10);f.previous=value;}}
 if(this.previousMask!==complete){const url=complete?'none':`url(#reveal-${this.index})`;this.shell.style.maskImage=url;this.shell.style.webkitMaskImage=url;this.previousMask=complete;}
 this.complete=complete;
 }
 draw(t,pointer,pose,reduced=false){const c=this.ctx,e=this.ec,l=this.l,w=l.width,h=l.height,field=this.field,dt=Math.min(.04,(t-this.last)/1000||.016);this.last=t;
 const idle=this.field.current.strength<.004&&!this.field.pulses.length&&(t-this.waveAt>1300)&&(t-(this.maskChangedAt||0)>500);
 const key=[pose.y.toFixed(3),pose.z.toFixed(3),pose.angle.toFixed(5),this.amount.toFixed(4),reduced,this.card.classList.contains('focused')].join(':');
 if(idle&&this.restingKey===key)return;
 this.restingKey=idle?key:null;this.updateMask(pose,reduced,t);const transition=clamp(1-(t-(this.maskChangedAt||0))/450);
 c.clearRect(0,0,w,h);e.clearRect(0,0,w+40,h+40);e.save();e.translate(20,20);
 const opacity=(1-pose.dark*.9)*(reduced?1:smooth((this.amount-.25)/.55));
 cardPath(e,w,h,l.cut);e.strokeStyle=`rgba(214,205,183,${.46*opacity})`;e.lineWidth=.8;e.stroke();
 // Preserve the original small lower-right rim accent.
 e.beginPath();e.moveTo(w-l.cut-28,h-.5);e.lineTo(w-l.cut,h-.5);e.lineTo(w-.5,h-l.cut);e.lineTo(w-.5,h-l.cut-23);e.strokeStyle=`rgba(255,155,87,${.72*opacity})`;e.lineWidth=1.05;e.shadowColor='#ff7950';e.shadowBlur=6;e.stroke();e.shadowBlur=0;
 const borderEnergy=this.border.map(p=>{const q=project(p.x,p.y,pose,l);return field.energy(q.x,q.y)*opacity;});
 // Each short stroke is illuminated by the common viewport field. No cursor disc.
 for(let bucket=1;bucket<=8;bucket++){e.beginPath();let count=0;for(let i=0;i<this.border.length;i++){const a=this.border[i],b=this.border[(i+1)%this.border.length],energy=(borderEnergy[i]+borderEnergy[(i+1)%this.border.length])*.5;if(energy<.015||Math.ceil(energy*8)!==bucket)continue;e.moveTo(a.x,a.y);e.lineTo(b.x,b.y);count++;}if(!count)continue;const energy=bucket/8;e.strokeStyle=`rgba(${VFX.color},${energy*.4})`;e.lineWidth=3;e.shadowColor=`rgba(${VFX.color},${energy*.7})`;e.shadowBlur=12;e.stroke();e.shadowBlur=0;e.strokeStyle=`rgba(${VFX.paper},${energy*.9})`;e.lineWidth=1.05;e.stroke();}
 for(let i=0;i<this.grid.points.length;i++){const p=this.grid.points[i],q=this.xy[i],baseX=p.x*w,baseY=p.y*h,view=project(baseX,baseY,pose,l),energy=field.energy(view.x,view.y),distance=borderDistance(baseX,baseY,w,h,l.cut);q.weight=VFX.center+(1-VFX.center)*(1-smooth(distance/(Math.min(w,h)*VFX.edgeFade)));if(baseY>this.typeTop-4)q.weight*=.18;
 const limit=reduced?0:Math.min(l.small?VFX.mobileDisplacement:VFX.displacement,this.shortest[i]*.065),dx=baseX-(pointer?.x??-2000),dy=baseY-(pointer?.y??-2000),len=Math.hypot(dx,dy)||1,idle=reduced?0:l.small?.5:.8;
 let ox=Math.sin(t*.00043+p.phase)*idle+dx/len*energy*limit,oy=Math.cos(t*.00037+p.phase)*idle+dy/len*energy*limit;const length=Math.hypot(ox,oy),cap=this.shortest[i]*.07;if(length>cap){ox*=cap/length;oy*=cap/length;}
 q.x+=(baseX+ox-q.x)*(1-Math.exp(-dt*10));q.y+=(baseY+oy-q.y)*(1-Math.exp(-dt*10));q.energy=energy*opacity;
 field.emit(view.x,view.y,t,q.energy*q.weight);
 }
 c.save();cardPath(c,w,h,l.cut);c.clip();c.lineWidth=.65;
 for(const f of this.faces){const [a,b,d]=f.ids.map(i=>this.xy[i]),energy=(a.energy*a.weight+b.energy*b.weight+d.energy*d.weight)/3;
 if(energy>.015&&f.value>.01){c.fillStyle=`rgba(${VFX.color},${energy*VFX.faceAlpha*f.value})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.lineTo(d.x,d.y);c.closePath();c.fill();}
 if(!reduced&&f.value>.015&&f.value<.985){const scaffold=Math.sin(f.value*Math.PI)*.30*(1-pose.dark*.7)*transition;c.strokeStyle=`rgba(${VFX.color},${scaffold})`;c.beginPath();for(let j=0;j<3;j++){const p=f.pts[j];j?c.lineTo(p.x*w,p.y*h):c.moveTo(p.x*w,p.y*h);}c.closePath();c.stroke();}
 }
 if(!reduced&&this.amount>.07&&this.amount<.42){for(const f of this.faces){const front=loadVisibility(Math.min(1,this.amount+.18),f.cx,f.cy,this.index);if(front>.05&&front<.95){c.strokeStyle=`rgba(${VFX.color},${Math.sin(front*Math.PI)*.35})`;c.beginPath();for(let j=0;j<3;j++){const p=f.pts[j];j?c.lineTo(p.x*w,p.y*h):c.moveTo(p.x*w,p.y*h);}c.closePath();c.stroke();}}}
 for(const [ai,bi]of this.grid.edges){const a=this.xy[ai],b=this.xy[bi],energy=(a.energy*a.weight+b.energy*b.weight)*.5;if(energy<.008||!this.complete)continue;c.strokeStyle=`rgba(${VFX.color},${energy*VFX.edgeAlpha})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}
 if(this.complete)for(const p of this.xy){const energy=p.energy*p.weight;if(energy<.04)continue;c.fillStyle=`rgba(${VFX.paper},${energy*.6})`;c.fillRect(p.x-.5,p.y-.5,1,1);}
 this.drawType(t,pose,reduced,c,e);c.restore();e.restore();
 }
 drawType(t,pose,reduced,c,e){if(!this.complete)return;const l=this.l,w=l.width,ctx=this.typeCanvas.getContext('2d');ctx.clearRect(0,0,w,l.height);let maximum=0;
 const energies=this.glyphs.map(g=>{const p=project(g.x+g.width/2,g.y+g.size*.5,pose,l);const energy=this.field.energy(p.x,p.y);maximum=Math.max(maximum,energy);return energy;});
 if(!reduced&&maximum>.20&&!this.titleEntered&&t-this.waveAt>700){this.waveAt=t;this.waveOrigin=energies.indexOf(maximum)/Math.max(1,this.glyphs.length-1);this.titleEntered=true;}
 if(maximum<.08)this.titleEntered=false;const elapsed=(t-this.waveAt)/900,travel=elapsed>=0&&elapsed<1.15?clamp(1-Math.abs(elapsed-.4)/.75):0;
 const light=x=>{const local=this.glyphs.findIndex(g=>x>=g.x-4&&x<=g.x+g.width+4);const direct=local>=0?energies[local]:maximum*.5;const front=(this.waveOrigin||0)+elapsed*1.2;const wave=reduced?0:Math.exp(-Math.pow((x/w-front)/.17,2))*travel*.8;return Math.max(direct*.5,wave);};
 ctx.lineWidth=.75;
 for(const [a,b]of this.typeGrid.edges){const A=this.typeGrid.points[a],B=this.typeGrid.points[b],ax=A.x*w,bx=B.x*w,energy=(light(ax)+light(bx))*.5;if(energy<.02)continue;ctx.strokeStyle=`rgba(${VFX.paper},${energy*.9})`;ctx.beginPath();ctx.moveTo(ax,this.typeTop+A.y*this.typeHeight);ctx.lineTo(bx,this.typeTop+B.y*this.typeHeight);ctx.stroke();}
 ctx.globalCompositeOperation='destination-in';ctx.drawImage(this.glyphMask,0,0,w,l.height);ctx.globalCompositeOperation='source-over';c.drawImage(this.typeCanvas,0,0,w,l.height);
 e.font=this.font;e.textBaseline='top';e.lineWidth=.5;for(const g of this.glyphs){const energy=light(g.x+g.width/2);if(energy<.04)continue;e.shadowColor=`rgba(${VFX.color},${energy*.4})`;e.shadowBlur=7;e.strokeStyle=`rgba(${VFX.color},${energy*.25})`;e.strokeText(g.text,g.x,g.y);}e.shadowBlur=0;
 }
 dispose(){this.shell.style.maskImage='none';this.shell.style.webkitMaskImage='none';this.canvas.remove();this.edge.remove();this.card.querySelector('svg')?.remove();}
}
