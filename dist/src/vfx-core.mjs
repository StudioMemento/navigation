import {clamp,smooth,seeded} from './model.mjs';
export const smoothRange=(a,b,x)=>smooth((x-a)/(b-a));
export function fieldEnergy(x,y,p,radius){
 if(!p.strength)return 0;
 if(Math.abs(x-p.x)>radius*1.42||Math.abs(y-p.y)>radius*1.32)return 0;
 const wx=20*Math.sin(y*.013+x*.006)+11*Math.cos(x*.018-y*.009);
 const wy=18*Math.sin(x*.012-y*.008)+9*Math.cos(y*.02+x*.01);
 const d=Math.hypot((x-p.x)*.91+wx,(y-p.y)*1.12+wy);
 const gain=.76+.15*Math.sin(x*.016+y*.011)+.09*Math.cos(y*.019-x*.008);
 return clamp(Math.pow(1-smoothRange(radius*.10,radius*1.18,d),1.4)*gain*p.strength);
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
export class TrianglePool{
 constructor(capacity=80){this.items=Array.from({length:capacity},()=>({alive:false}));this.rng=seeded(5163);this.tokens=0;this.last=0;this.count=0;}
 emit(x,y,px,py,now,scale=1){if(now-this.last<(scale<1?166:84))return false;const p=this.items.find(p=>!p.alive);if(!p)return false;const r=this.rng;let dx=x-px,dy=y-py;const length=Math.hypot(dx,dy)||1,speed=25+r()*36;if(dx===0&&dy===0){const angle=r()*Math.PI*2;dx=Math.cos(angle);dy=Math.sin(angle);}
 Object.assign(p,{alive:true,x,y,vx:dx/length*speed,vy:dy/length*speed,birth:now,life:(.25+r()*.35)*scale,size:(1.2+r()*1.8)*scale,angle:r()*6.28,spin:(r()-.5)*4,seed:r()*9});this.last=now;return true;}
 update(now,dt){this.count=0;for(const p of this.items){if(!p.alive)continue;const age=(now-p.birth)/1000;if(age>=p.life){p.alive=false;continue;}this.count++;
 // Curl of a scalar potential: derivatives give clockwise AND anticlockwise eddies.
 const fx=Math.cos(p.y*.045+p.seed)*Math.sin(p.x*.038+p.seed),fy=-Math.cos(p.x*.038+p.seed)*Math.sin(p.y*.045+p.seed);
 p.vx=(p.vx+fx*17*dt)*Math.exp(-1.2*dt);p.vy=(p.vy+fy*17*dt)*Math.exp(-1.2*dt);p.x+=p.vx*dt;p.y+=p.vy*dt;p.angle+=p.spin*dt;p.alpha=Math.min(1,age/.045)*Math.pow(1-age/p.life,2);
 }}
 clear(){for(const p of this.items)p.alive=false;this.count=0;}
}
