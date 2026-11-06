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
