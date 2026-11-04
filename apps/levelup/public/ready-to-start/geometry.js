import {PRESET} from './preset.js';
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const lerp=(a,b,t)=>a+(b-a)*t;
export function random(seed=PRESET.seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296;};}

// Exact, decoded geometry from the approved navigation scene (826 triangles).
// The navigation geometry is a sampling volume only; the renderer draws individual grains.
export {navigationVertices,provenance} from './assets/navigation-start.js';
import {navigationVertices} from './assets/navigation-start.js';
export const OUTER=[[0,-1],[.35,-.33],[.94,0],[.35,.33],[0,1],[-.35,.33],[-.94,0],[-.35,-.33]];
export const INNER=[[0,-.50],[.17,-.16],[.47,0],[.17,.16],[0,.50],[-.17,.16],[-.47,0],[-.17,-.16]];
export function makeFacets(){
 const result=[];
 for(let i=0;i<navigationVertices.length;i+=24){
  const tri=[0,8,16].map(k=>Array.from(navigationVertices.slice(i+k,i+k+3)));
  const [a,b,c]=tri,u=b.map((x,k)=>x-a[k]),v=c.map((x,k)=>x-a[k]);
  const area=Math.hypot(u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0])*.5;
  result.push({tri,area,normal:Array.from(navigationVertices.slice(i+3,i+6)),material:navigationVertices[i+6],group:navigationVertices[i+7]});
 }
 return result;
}
export const facets=makeFacets();
export function pointInPolygon(x,y,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}
export function insideNavigationSilhouette(x,y,group=0){
 return facets.some(f=>{
  if(f.group!==group)return false;
  const [a,b,c]=f.tri,den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);
  // Vertical wall projections are line segments; include their boundary too.
  for(const [p,q] of [[a,b],[b,c],[c,a]]){const dx=q[0]-p[0],dy=q[1]-p[1],l=dx*dx+dy*dy,t=l?clamp(((x-p[0])*dx+(y-p[1])*dy)/l,0,1):0;if(Math.hypot(x-p[0]-t*dx,y-p[1]-t*dy)<.000002)return true;}
  if(Math.abs(den)<1e-9)return false;
  const u=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/den,v=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/den;
  return u>=-1e-5&&v>=-1e-5&&u+v<=1.00001;
 });
}
export const insideSparkle=(x,y)=>insideNavigationSilhouette(x,y,0);
export function generateParticleGeometry(count,seed=PRESET.seed){
 const rng=random(seed),weights=facets.map(f=>f.area*(f.normal[2]<0?.32:1)*(f.material===2?2.3:1)),total=weights.reduce((a,b)=>a+b,0),rest=new Float32Array(count*8),surface=new Float32Array(count*4),flow=new Float32Array(count*4);
 for(let i=0;i<count;i++){
  let pick=rng()*total,index=0;for(;index<facets.length-1;index++){pick-=weights[index];if(pick<=0)break;}
  const f=facets[index],u=Math.sqrt(rng()),v=rng(),bary=[1-u,u*(1-v),u*v];
  const p=[0,1,2].map(k=>f.tri.reduce((sum,p,j)=>sum+p[k]*bary[j],0)),o=i*8;
  rest[o]=p[0];rest[o+1]=p[1];rest[o+2]=p[2];
  // Clustering creates pockets of air rather than a uniformly filled surface.
  const stream=.5+.5*Math.sin(p[0]*28+p[1]*17+Math.sin(p[1]*21)*1.7);
  rest[o+3]=.38+.62*Math.pow(stream,.7);
  const size=rng();rest[o+4]=size<.67?1.7+size*3.5:size<.965?4+(size-.67)*8.5:6.8+(size-.965)*90;
  rest[o+5]=rng();rest[o+6]=f.group;rest[o+7]=f.material===2?1:0;
  surface.set([...f.normal,f.material],i*4);
  // Two bounded oscillators move barycentric coordinates continuously inside this
  // exact source triangle. No added opaque mesh, no particles crossing the hole.
  const phase0=Math.asin(Math.sqrt(bary[0])),phase1=Math.asin(Math.sqrt(bary[1]/Math.max(1e-8,1-bary[0])));
  flow.set([index,rest[o+5]>.5?Math.PI-phase0:phase0,rest[o+5]% .25>.125?Math.PI-phase1:phase1,.10+rest[o+5]*.13],i*4);
 }
 return {rest,surface,flow};
}
export const generateRestData=(count,seed=PRESET.seed)=>generateParticleGeometry(count,seed).rest;
export function framePolygon(w,h,c,inset=0){return [[c,inset],[w-inset,inset],[w-inset,h-c],[w-c,h-inset],[inset,h-inset],[inset,c]];}
export function framePlanes(w,h,c){const vertices=framePolygon(w,h,c);return vertices.map((a,i)=>{const b=vertices[(i+1)%6],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);return {x:a[0],y:a[1],nx:-dy/l,ny:dx/l,tx:dx/l,ty:dy/l};});}
// The original bevels are traced by particles; no opaque mesh or 2D outline.
export const makeEdgeSegments=()=>[];
export function computeComposition(w,h,viewportWidth,pad,titleHeight){
 const scale=Math.max(8,Math.min(w*.40,h*.30));
 return {cx:w*.5,cy:h*.5,scale,visualHeight:h};
}
