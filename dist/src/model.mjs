export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const smooth=(v)=>{v=clamp(v);return v*v*(3-2*v)};
export const wrap=(v,n=5)=>((v%n)+n)%n;
export function relative(index,position,n=5){return wrap(index-position+n/2,n)-n/2}
export function nearest(index,position,n=5){return position+relative(index,position,n)}
export function layout(w,h,insets={}){
 const portrait=h>w*1.08;
 const ratio=portrait?(w<600?.8:1.08):2;
 const small=w<600,short=h<520;
 const arrowHeight=short?44:small?48:52,controlGap=12;
 const logoBottom=insets.logoBottom??60;
 const dockTop=insets.dockTop??h-(44+(Math.min(320,w-40)-200)/8);
 // Reserve the actual overlay hit areas before sizing the hero, including safe areas.
 const clearance=Math.max(logoBottom,h-dockTop)+arrowHeight+controlGap*2;
 const width=Math.min(w*(portrait?.9:.88),h*.6*ratio,Math.max(40,h-2*clearance)*ratio),height=width/ratio;
 const preferredOffset=Math.max(34,Math.min(62,(h-height)*.18));
 const previousY=clamp(h/2-height/2-preferredOffset,logoBottom+controlGap+arrowHeight/2,h/2-height/2-controlGap-arrowHeight/2);
 const nextY=clamp(h/2+height/2+preferredOffset,h/2+height/2+controlGap+arrowHeight/2,dockTop-controlGap-arrowHeight/2);
 const overlap=Math.max(12,Math.min(24,height*.04)),gap=-overlap;
 const perspective=height*3.5;
 const angle=(small?44:50)*Math.PI/180;
 const depth=height*.3;
 // Inner edges tuck behind the active panel, with real perspective occlusion.
 const innerScale=perspective/(perspective+depth+Math.sin(angle)*height/2);
 const secondaryY=(height/2+gap)/innerScale+Math.cos(angle)*height/2;
 return {w,h,width,height,ratio,small,short,gap,overlap,perspective,angle,depth,secondaryY,padding:width*.06,cut:Math.max(10,Math.min(18,width*.017)),cx:w/2,cy:h/2,previousY,nextY,arrowHeight,logoBottom,dockTop};
}
export function pose(distance,l,reduced=false){
 const a=Math.abs(distance),e=smooth(Math.min(a,1)),sgn=Math.sign(distance);
 return {y:distance*l.secondaryY,z:-l.depth*e-Math.max(0,a-1)*l.height*.4,
 angle:sgn*l.angle*e,dark:.14*e,secondary:e,visible:a<1.75};
}
export function project(x,y,p,l){
 const ly=y-l.height/2, z=p.z+Math.sin(p.angle)*ly, s=l.perspective/(l.perspective-z);
 return {x:l.cx+(x-l.width/2)*s,y:l.cy+(p.y+Math.cos(p.angle)*ly)*s,z};
}
export function unproject(x,y,p,l){
 const v=y-l.cy, ly=(v*(l.perspective-p.z)-l.perspective*p.y)/(l.perspective*Math.cos(p.angle)+v*Math.sin(p.angle));
 const s=l.perspective/(l.perspective-p.z-Math.sin(p.angle)*ly);
 return {x:(x-l.cx)/s+l.width/2,y:ly+l.height/2};
}
export function dragSnap(start,position,velocity,cancel=false){
 if(cancel)return Math.round(start);
 const delta=position-start;
 if(Math.abs(delta)>.19||Math.abs(velocity)>.38)return Math.round(start)+Math.sign(Math.abs(delta)>.1?delta:velocity);
 return Math.round(start);
}
export function seeded(seed=431){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
