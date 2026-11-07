import {VFX} from './vfx-config.mjs';

// A thin faceted ribbon follows the real SVG stroke. No circular hover plate.
export class ChevronFX {
 constructor(elements){this.items=[...elements].map(el=>{const canvas=document.createElement('canvas');canvas.className='chevron-fx';canvas.setAttribute('aria-hidden','true');el.append(canvas);return {el,canvas,ctx:canvas.getContext('2d'),width:0,height:0};});}
 draw(t,field,l,reduced=false){
  const dpr=Math.min(devicePixelRatio||1,l.small?VFX.mobileDpr:VFX.dpr),pad=20;
  for(const item of this.items){
   const {el,canvas,ctx:c}=item,rect=el.getBoundingClientRect(),svg=el.querySelector('svg').getBoundingClientRect();
   if(!rect.width||!svg.width)continue;
   const width=Math.round((rect.width+pad*2)*dpr),height=Math.round((rect.height+pad*2)*dpr);
   if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
   c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,width,height);c.setTransform(dpr,0,0,dpr,pad*dpr,pad*dpr);
   const scale=Math.min(svg.width/30,svg.height/16),ox=svg.x-rect.x+(svg.width-30*scale)/2,oy=svg.y-rect.y+(svg.height-16*scale)/2;
   const up=el.classList.contains('previous'),coords=up?[[1,15],[15,1],[29,15]]:[[1,1],[15,15],[29,1]];
   const points=coords.map(([x,y])=>({x:ox+x*scale,y:oy+y*scale}));
   const center=points[1],energy=field.energy(rect.x+center.x,rect.y+center.y);
   el.style.setProperty('--chevron-energy',energy.toFixed(3));
   if(energy<.012)continue;
   // One glow pass, then deterministic triangular facets with unequal energy.
   c.beginPath();c.moveTo(points[0].x,points[0].y);c.lineTo(center.x,center.y);c.lineTo(points[2].x,points[2].y);
   c.strokeStyle=`rgba(${VFX.color},${energy*.48})`;c.lineWidth=2.4*scale;c.lineJoin='miter';c.shadowColor=`rgba(${VFX.color},${energy*.8})`;c.shadowBlur=12;c.stroke();c.shadowBlur=0;
   for(let arm=0;arm<2;arm++){
    const a=points[arm],b=points[arm+1],dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy),nx=-dy/length,ny=dx/length,half=1.1*scale;
    for(let step=0;step<7;step++){
     const u=step/7,v=(step+1)/7,ax=a.x+dx*u,ay=a.y+dy*u,bx=a.x+dx*v,by=a.y+dy*v;
     const e=field.energy(rect.x+(ax+bx)/2,rect.y+(ay+by)/2),variation=.45+.55*(.5+.5*Math.sin(step*4.7+arm*2.3));
     c.beginPath();c.moveTo(ax+nx*half,ay+ny*half);c.lineTo(bx-nx*half,by-ny*half);c.lineTo(bx+nx*half,by+ny*half);c.closePath();
     c.fillStyle=`rgba(${VFX.color},${e*variation*.26})`;c.fill();c.lineWidth=.55;c.strokeStyle=`rgba(${VFX.hot},${e*variation*.88})`;c.stroke();
     if(!reduced&&step%3===0)field.emit(rect.x+bx,rect.y+by,t,e*variation,'glyph');
    }
   }
  }
 }
 dispose(){for(const item of this.items)item.canvas.remove();this.items=[];}
}
