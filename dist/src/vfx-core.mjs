import {clamp,smooth,seeded} from './model.mjs';
export const smoothRange=(a,b,x)=>smooth((x-a)/(b-a));
export function fieldEnergy(x,y,p,radius){
 if(!p.strength||!Number.isFinite(radius)||radius<=0)return 0;
 if(Math.abs(x-p.x)>radius*1.65||Math.abs(y-p.y)>radius*1.5)return 0;
 // Stable spatial lobes vary reach as well as energy. Only the mesh receives
 // this field: no radial mask or opaque glow disc is ever painted.
 const wx=radius*(.085*Math.sin(y*.013+x*.006)+.04*Math.cos(x*.018-y*.009));
 const wy=radius*(.075*Math.sin(x*.012-y*.008)+.035*Math.cos(y*.02+x*.01));
 const reach=.95+.17*Math.sin(x*.007+y*.011)+.08*Math.cos(y*.015-x*.009);
 const d=Math.hypot((x-p.x)*.90+wx,(y-p.y)*1.08+wy)/reach;
 const gain=.79+.14*Math.sin(x*.016+y*.011)+.07*Math.cos(y*.019-x*.008);
 return clamp(Math.pow(1-smoothRange(radius*.08,radius*1.16,d),1.25)*gain*p.strength);
}
export function visibility(y,top,bottom,band){return smoothRange(top,top+band,y)*(1-smoothRange(bottom-band,bottom,y));}
export function loadVisibility(progress,x,y,seed=0){
 if(progress>=1)return 1;if(progress<=0)return 0;
 const order=.55*x+.45*(1-y)+.055*Math.sin(x*18+y*13+seed);
 return smoothRange(.28+order*.46,.43+order*.46,progress);
}
export function graphDistances(points,neighbors,startX,startY,maxDistance=600){
 const dist=new Float64Array(points.length).fill(Infinity),visited=new Uint8Array(points.length);let first=0,near=Infinity;
 for(let i=0;i<points.length;i++){const d=Math.hypot(points[i].x-startX,points[i].y-startY);if(d<near){near=d;first=i;}}
 dist[first]=0;
 for(let step=0;step<points.length;step++){let at=-1,best=maxDistance;for(let i=0;i<points.length;i++)if(!visited[i]&&dist[i]<best){at=i;best=dist[i];}if(at<0)break;visited[at]=1;
  for(const b of neighbors[at]){const a=points[at],q=points[b],variation=.82+.3*(.5+.5*Math.sin((at+1)*7.31+(b+1)*1.73));const cost=best+Math.hypot(a.x-q.x,a.y-q.y)*variation;if(cost<dist[b]&&cost<maxDistance)dist[b]=cost;}
 }
 return dist;
}
export function pulseEnvelope(age,distance){if(!Number.isFinite(distance))return 0;const arrival=distance/660;return Math.pow(clamp(1-Math.abs(age-arrival-.07)/.13),2)*Math.exp(-distance/240)*clamp(1-age/.95);}
// A weak hover can reach a glyph before any propagation front has started.
// In that state the wave contributes exactly zero, never NaN: an invalid canvas
// colour silently retains its previous value (initially opaque black).
export function glyphLight(energy,x,origin,elapsed){
 const local=Number.isFinite(energy)?clamp(energy)*.88:0;
 if(!Number.isFinite(origin)||!Number.isFinite(x)||!Number.isFinite(elapsed)||elapsed<0||elapsed>=1.1)return local;
 const decay=Math.pow(1-elapsed/1.1,1.3),front=Math.exp(-Math.pow((Math.abs(x-origin)-elapsed*.95)/.105,2))*decay*.76;
 return clamp(Math.max(local,front));
}
export class TrianglePool{
 constructor(capacity=80){this.items=Array.from({length:capacity},()=>({alive:false}));this.rng=seeded(5163);this.last=-Infinity;this.count=0;this.emittedAt=-Infinity;this.emittedNow=0;}
 emit(x,y,px,py,now,scale=1,options={}){
 if(![x,y,px,py,now,scale].every(Number.isFinite)||scale<=0)return false;
 const burst=Boolean(options.burst),interval=scale<1?90:48;
 if(now!==this.emittedAt){if(now-this.last<interval)return false;this.emittedAt=now;this.emittedNow=0;}
 // A burst shares one time token and is capped, even with several surfaces.
 if(this.emittedNow>=(burst?(scale<1?2:3):1))return false;
 const p=this.items.find(p=>!p.alive);if(!p)return false;const r=this.rng;
 let dx=x-px,dy=y-py,length=Math.hypot(dx,dy);if(length<.01){const angle=r()*Math.PI*2;dx=Math.cos(angle);dy=Math.sin(angle);length=1;}
 const spread=(r()-.5)*.9,angle=Math.atan2(dy,dx)+spread,speed=34+r()*54;
 const large=r()>.91;
 Object.assign(p,{alive:true,x,y,previousX:x,previousY:y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,birth:now,life:(.38+r()*.36)*scale,size:(large?3.7+r()*1.5:1.25+r()*2.2)*scale,angle:r()*6.28,spin:(r()-.5)*5,seed:r()*9,alpha:0,hot:.55+r()*.45});
 this.last=now;this.emittedNow++;this.count++;return true;
 }
 update(now,dt){this.count=0;for(const p of this.items){if(!p.alive)continue;const age=(now-p.birth)/1000;if(age>=p.life){p.alive=false;continue;}this.count++;
 // Curl of a scalar potential: derivatives give clockwise AND anticlockwise eddies.
 const fx=Math.cos(p.y*.045+p.seed)*Math.sin(p.x*.038+p.seed),fy=-Math.cos(p.x*.038+p.seed)*Math.sin(p.y*.045+p.seed);
 p.previousX=p.x;p.previousY=p.y;p.vx=(p.vx+fx*35*dt)*Math.exp(-.85*dt);p.vy=(p.vy+fy*35*dt)*Math.exp(-.85*dt);p.x+=p.vx*dt;p.y+=p.vy*dt;p.angle+=p.spin*dt;p.alpha=Math.min(1,age/.035)*Math.pow(1-age/p.life,1.4);
 }}
 clear(){for(const p of this.items)p.alive=false;this.count=0;}
}
