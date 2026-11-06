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
 const r=seeded(seed),points=[];
 for(let y=0;y<=rows;y++)for(let x=0;x<=cols;x++)points.push({x:(x+(x&&x<cols?(r()-.5)*.75:0))/cols,y:(y+(y&&y<rows?(r()-.5)*.75:0))/rows,phase:r()*Math.PI*2});
 const triangles=triangulate(points);const edges=[],seen=new Set();
 for(const t of triangles)for(let i=0;i<3;i++){const a=t[i],b=t[(i+1)%3],key=[a,b].sort((a,b)=>a-b).join('-');if(!seen.has(key)){seen.add(key);edges.push([a,b]);}}
 return {points,triangles,edges};
}
export function cardPath(ctx,w,h,c){ctx.beginPath();ctx.moveTo(c,.5);ctx.lineTo(w-.5,.5);ctx.lineTo(w-.5,h-c);ctx.lineTo(w-c,h-.5);ctx.lineTo(.5,h-.5);ctx.lineTo(.5,c);ctx.closePath();}
