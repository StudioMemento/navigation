import {seeded} from './model.mjs';
// Stable Delaunay geometry. No random topology changes during animation.
export function triangulate(points){
 const n=points.length,pts=[...points,{x:-20,y:-10},{x:20,y:-10},{x:0,y:20}];let triangles=[[n,n+1,n+2]];
 function inside(t,p){const [a,b,c]=t.map(i=>pts[i]),ax=a.x-p.x,ay=a.y-p.y,bx=b.x-p.x,by=b.y-p.y,cx=c.x-p.x,cy=c.y-p.y;
 const det=(ax*ax+ay*ay)*(bx*cy-cx*by)-(bx*bx+by*by)*(ax*cy-cx*ay)+(cx*cx+cy*cy)*(ax*by-bx*ay);
 const cross=(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);return det*cross>1e-12;}
 for(let i=0;i<n;i++){const bad=triangles.filter(t=>inside(t,pts[i])),edges=new Map();
 for(const t of bad)for(let j=0;j<3;j++){let a=t[j],b=t[(j+1)%3],key=[a,b].sort((x,y)=>x-y).join('-');if(edges.has(key))edges.delete(key);else edges.set(key,[a,b]);}
 triangles=triangles.filter(t=>!bad.includes(t));for(const e of edges.values())triangles.push([...e,i]);}
 return triangles.filter(t=>t.every(i=>i<n));
}
export function mesh(seed=1,cols=7,rows=4){
 const r=seeded(seed),points=[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}];
 // Variable-radius dart sampling, not a perturbed grid. Boundary points guarantee coverage.
 for(let x=1;x<cols;x++){const px=(x+(r()-.5)*.6)/cols;points.push({x:px,y:0},{x:px,y:1});}
 for(let y=1;y<rows;y++){const py=(y+(r()-.5)*.6)/rows;points.push({x:0,y:py},{x:1,y:py});}
 const count=Math.round(cols*rows*1.35),aspect=cols/rows;
 for(let attempt=0;points.length<count&&attempt<count*100;attempt++){
  const x=r(),y=r(),density=.72+.28*Math.sin(x*7.3+y*3.1+seed)*Math.cos(y*5.8-x*2.4),min=.73/rows*density;
  if(points.every(p=>Math.hypot((x-p.x)*aspect,y-p.y)>min))points.push({x,y});
 }
 for(const p of points)p.phase=r()*Math.PI*2;
 const triangles=triangulate(points.map(p=>({x:p.x*aspect,y:p.y}))),edges=[],seen=new Set(),neighbors=points.map(()=>[]);
 for(const t of triangles)for(let i=0;i<3;i++){const a=t[i],b=t[(i+1)%3],key=[a,b].sort((a,b)=>a-b).join('-');if(!seen.has(key)){seen.add(key);edges.push([a,b]);neighbors[a].push(b);neighbors[b].push(a);}}
 return {points,triangles,edges,neighbors};
}
export function outline(w,h,c){return [[c,.5],[w-.5,.5],[w-.5,h-c],[w-c,h-.5],[.5,h-.5],[.5,c]];}
export function borderDistance(x,y,w,h,cut){
 let distance=Infinity;const p=outline(w,h,cut);
 for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));distance=Math.min(distance,Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy));}
 return distance;
}
export function cardPath(ctx,w,h,c){ctx.beginPath();ctx.moveTo(c,.5);ctx.lineTo(w-.5,.5);ctx.lineTo(w-.5,h-c);ctx.lineTo(w-c,h-.5);ctx.lineTo(.5,h-.5);ctx.lineTo(.5,c);ctx.closePath();}

function topology(points,aspect,triangulator=triangulate){
 const triangles=triangulator(points.map(p=>({x:p.x*aspect,y:p.y}))),edges=[],neighbors=points.map(()=>[]),seen=new Set();
 for(const t of triangles)for(let i=0;i<3;i++){const a=t[i],b=t[(i+1)%3],key=[a,b].sort((x,y)=>x-y).join(':');if(!seen.has(key)){seen.add(key);edges.push([a,b]);neighbors[a].push(b);neighbors[b].push(a);}}
 return {points,triangles,edges,neighbors};
}
// Circumcircles are computed once per triangle rather than allocating point
// arrays and evaluating a determinant for every candidate point/triangle pair.
function cardTriangulate(points){
 const n=points.length,stride=n+3,pts=[...points,{x:-20,y:-10},{x:20,y:-10},{x:0,y:20}];
 const make=(a,b,c)=>{
  const p=pts[a],q=pts[b],r=pts[c],bx=q.x-p.x,by=q.y-p.y,cx=r.x-p.x,cy=r.y-p.y,d=2*(bx*cy-by*cx);
  if(Math.abs(d)<1e-12)return null;
  const bl=bx*bx+by*by,cl=cx*cx+cy*cy,x=p.x+(cy*bl-by*cl)/d,y=p.y+(bx*cl-cx*bl)/d;
  return {ids:[a,b,c],x,y,r2:(x-p.x)**2+(y-p.y)**2};
 };
 let triangles=[make(n,n+1,n+2)];
 for(let i=0;i<n;i++){
  const p=pts[i],edges=new Map(),kept=[];
  for(const t of triangles){
   if((p.x-t.x)**2+(p.y-t.y)**2>t.r2+1e-10){kept.push(t);continue;}
   for(let j=0;j<3;j++){const a=t.ids[j],b=t.ids[(j+1)%3],key=Math.min(a,b)*stride+Math.max(a,b);if(edges.has(key))edges.delete(key);else edges.set(key,[a,b]);}
  }
  for(const [a,b]of edges.values()){const t=make(a,b,i);if(t)kept.push(t);}
  triangles=kept;
 }
 return triangles.filter(t=>t.ids[0]<n&&t.ids[1]<n&&t.ids[2]<n).map(t=>t.ids);
}
// Reuse normalized topology across proportional resizes. A bounded spatial
// hash replaces the former all-pairs rejection loop (thousands of attempts).
const cardTopologyCache=new Map();
export function cardMesh(w,h,seed=89,small=false){
 const aspect=Math.max(.5,Math.min(4,Math.round(w/Math.max(1,h)*20)/20));
 const cap=small?180:240,key=`${aspect}:${cap}`;
 if(cardTopologyCache.has(key))return cardTopologyCache.get(key);
 const r=seeded(89),points=[],hash=new Map();
 const spacing=Math.sqrt(aspect/(cap*.78)),min=spacing*.48,cell=min;
 const hashKey=(x,y)=>`${x}:${y}`;
 const add=(x,y,force=false)=>{
  const gx=Math.floor(x/cell),gy=Math.floor(y/cell);
  if(!force)for(let yy=gy-1;yy<=gy+1;yy++)for(let xx=gx-1;xx<=gx+1;xx++){
   for(const i of hash.get(hashKey(xx,yy))||[]){const p=points[i];if((p.x*aspect-x)**2+(p.y-y)**2<min*min)return false;}
  }
  const index=points.length;points.push({x:x/aspect,y,phase:r()*Math.PI*2});
  const key=hashKey(gx,gy),list=hash.get(key);if(list)list.push(index);else hash.set(key,[index]);
  return true;
 };
 // The outer ring guarantees exact coverage; the second keeps the responsive
 // border visibly denser than the open interior without a large vertex count.
 const boundary=Math.round(cap*.25),nx=Math.max(4,Math.round(boundary*aspect/(2*(aspect+1)))),ny=Math.max(3,Math.round(boundary/(2*(aspect+1))));
 for(const [x,y]of [[0,0],[aspect,0],[aspect,1],[0,1]])add(x,y,true);
 for(let x=1;x<nx;x++){const px=(x+(r()-.5)*.35)*aspect/nx;add(px,0,true);add(px,1,true);}
 for(let y=1;y<ny;y++){const py=(y+(r()-.5)*.35)/ny;add(0,py,true);add(aspect,py,true);}
 const inset=.035;
 for(let x=1;x<nx;x+=2){const px=x*aspect/nx;add(px,inset,true);add(px,1-inset,true);}
 for(let y=1;y<ny;y+=2){const py=y/ny;add(inset,py,true);add(aspect-inset,py,true);}
 const remaining=cap-points.length,cols=Math.max(3,Math.ceil(Math.sqrt(remaining*aspect))),rows=Math.max(3,Math.ceil(remaining/cols));
 const cells=Array.from({length:cols*rows},(_,i)=>i);
 for(let i=cells.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[cells[i],cells[j]]=[cells[j],cells[i]];}
 for(const i of cells){if(points.length>=cap)break;const x=(i%cols+.18+r()*.64)/cols*aspect,y=(Math.floor(i/cols)+.18+r()*.64)/rows;add(x,y);}
 for(let attempt=0;points.length<cap&&attempt<cap*4;attempt++)add((.04+r()*.92)*aspect,.04+r()*.92);
 const result=topology(points,aspect,cardTriangulate);
 cardTopologyCache.set(key,result);
 if(cardTopologyCache.size>32)cardTopologyCache.delete(cardTopologyCache.keys().next().value);
 return result;
}
export function backgroundMesh(w,h,small=false){
 // Work in actual viewport pixels: density remains comparable in portrait,
 // landscape and wide embeds, and the topology is generated only on resize.
 const r=seeded(1467),points=[],spacing=small?51:64,cap=small?240:580;
 const add=(x,y)=>points.push({x:x/w,y:y/h,phase:r()*Math.PI*2});
 for(const [x,y]of [[0,0],[w,0],[w,h],[0,h]])add(x,y);
 for(let x=spacing*.6;x<w-spacing*.3;x+=spacing*(.75+r()*.45)){add(x,0);add(Math.min(w-1,x+(r()-.5)*spacing*.45),h);}
 for(let y=spacing*.6;y<h-spacing*.3;y+=spacing*(.75+r()*.45)){add(0,y);add(w,Math.min(h-1,y+(r()-.5)*spacing*.45));}
 const count=Math.min(cap,Math.max(points.length+12,Math.round(w*h/(spacing*spacing)*1.5)));
 for(let attempt=0;points.length<count&&attempt<count*70;attempt++){
  const x=r()*w,y=r()*h;
  const density=.76+.21*(.5+.5*Math.sin(x*.009+y*.006)*Math.cos(y*.011-x*.004));
  const min=spacing*density;
  if(points.every(p=>Math.hypot(p.x*w-x,p.y*h-y)>min))add(x,y);
 }
 return topology(points,w/h);
}
export function insideCard(x,y,w,h,cut){return x>=0&&y>=0&&x<=w&&y<=h&&x+y>=cut&&x+y<=w+h-cut;}
