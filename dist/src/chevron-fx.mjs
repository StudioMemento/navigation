import {VFX} from './vfx-config.mjs';

// Measure only when the layout changes. Frame rendering never reads the DOM.
export class ChevronFX {
 constructor(elements){this.items=[...elements].map(el=>{const canvas=document.createElement('canvas');canvas.className='chevron-fx';canvas.setAttribute('aria-hidden','true');el.append(canvas);return {el,svg:el.querySelector('svg'),canvas,ctx:canvas.getContext('2d'),halo:document.createElement('canvas'),painted:false};});}
 resize(l){
  this.l=l;this.dpr=Math.min(devicePixelRatio||1,l.small?VFX.mobileDpr:VFX.dpr);
  const pad=20,dpr=this.dpr;
  for(const item of this.items){
   const {el,canvas}=item,r=el.getBoundingClientRect(),svg=item.svg.getBoundingClientRect();item.rect=r;
   if(!r.width||!svg.width){item.points=null;continue;}
   canvas.width=Math.ceil((r.width+pad*2)*dpr);canvas.height=Math.ceil((r.height+pad*2)*dpr);
   const scale=Math.min(svg.width/30,svg.height/16),ox=svg.x-r.x+(svg.width-30*scale)/2,oy=svg.y-r.y+(svg.height-16*scale)/2;
   const coords=el.classList.contains('previous')?[[1,15],[15,1],[29,15]]:[[1,1],[15,15],[29,1]];
   item.points=coords.map(([x,y])=>({x:ox+x*scale,y:oy+y*scale}));item.facets=[];
   for(let arm=0;arm<2;arm++){
    const a=item.points[arm],b=item.points[arm+1],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len,half=.65*scale;
    for(let j=0;j<7;j++){const u=j/7,v=(j+1)/7,ax=a.x+dx*u,ay=a.y+dy*u,bx=a.x+dx*v,by=a.y+dy*v;
     item.facets.push({x:(ax+bx)*.5,y:(ay+by)*.5,points:[[ax+nx*half,ay+ny*half],[bx-nx*half,by-ny*half],[bx+nx*half,by+ny*half]],gain:.45+.55*(.5+.5*Math.sin(j*4.7+arm*2.3))});}
   }
   item.halo.width=canvas.width;item.halo.height=canvas.height;const c=item.halo.getContext('2d');c.setTransform(dpr,0,0,dpr,pad*dpr,pad*dpr);
   c.beginPath();c.moveTo(item.points[0].x,item.points[0].y);c.lineTo(item.points[1].x,item.points[1].y);c.lineTo(item.points[2].x,item.points[2].y);
   c.strokeStyle='rgba('+VFX.color+',.28)';c.lineWidth=.7*scale;c.lineJoin='miter';c.shadowColor='rgba('+VFX.color+',.7)';c.shadowBlur=8;c.stroke();item.painted=false;
  }
 }
 draw(t,field,l,reduced=false){
  if(this.l!==l)this.resize(l);
  const dpr=this.dpr,pad=20;
  for(const item of this.items){
   if(!item.points)continue;const {ctx:c,canvas,rect:r}=item,p=item.points[1],energy=reduced?0:field.energy(r.x+p.x,r.y+p.y);
   if(energy<.012&&!item.painted)continue;
   c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,canvas.width,canvas.height);item.painted=energy>=.012;if(!item.painted)continue;
   c.globalAlpha=energy;c.drawImage(item.halo,0,0);c.globalAlpha=1;c.setTransform(dpr,0,0,dpr,pad*dpr,pad*dpr);
   for(const f of item.facets){const e=field.energy(r.x+f.x,r.y+f.y)*f.gain;if(e<.02)continue;c.beginPath();c.moveTo(...f.points[0]);c.lineTo(...f.points[1]);c.lineTo(...f.points[2]);c.closePath();c.lineWidth=.45;c.strokeStyle='rgba('+VFX.hot+','+e*.72+')';c.stroke();c.fillStyle='rgba('+VFX.color+','+e*.18+')';c.fill();}
  }
 }
 dispose(){for(const item of this.items)item.canvas.remove();this.items=[];}
}
