// Particles describe world-space sheets; projected coordinates share the cursor/frame solver.
export const GROUND_SHARE=.44;
export const ORBIT_END=.80;
export const surfaceKind=seed=>seed<GROUND_SHARE?0:seed<ORBIT_END?1:2;
const TAU=Math.PI*2;
export function surfaceTarget(kind,u,v,time,w,h,out=[]){
 const S=Math.min(w,h),D=S*1.8;
 let x=w*(.018+.964*u),xs=w*.964,xvScreen=0,y,z,yu,yv,zu,zv;
 if(kind===0){
  // Rippling horizontal floor, just below the icon, from horizon toward camera.
  const level=Math.min(w*.4,h*.3)*1.12;
  const front=Math.min(S*1.05,D*(1-(level+S*.04)/(h*.475)));
  const span=front+S*2.15;z=-S*2.15+span*v;zu=0;zv=span;
  const a=u*8+v*5-time*.32,b=u*17-v*7+time*.16;
  const lift=level+S*(.023*Math.sin(a)+.009*Math.sin(b));
  const liftU=S*(.184*Math.cos(a)+.153*Math.cos(b));
  const liftV=S*(.115*Math.cos(a)-.063*Math.cos(b));
  const zoom=D/(D-z);y=h*.5+lift*zoom;
  yu=liftU*zoom;yv=liftV*zoom+lift*D*zv/((D-z)*(D-z));
 }else if(kind===1){
  // A continuous annular sheet wraps behind and in front of the hero.
  const a=TAU*u,r=.85+.15*v,sa=Math.sin(a),ca=Math.cos(a),fold=a*3+time*.17;
  x=w*.5+w*.46*r*ca;xs=-w*.46*r*sa*TAU;xvScreen=w*.46*.15*ca;
  y=h*.51+S*(.19*r*sa-.13*r*ca+.018*Math.sin(fold));
  z=S*(.82*sa-.28+(v-.5)*.12);
  yu=S*(.19*r*ca+.13*r*sa+.054*Math.cos(fold))*TAU;
  yv=S*(.19*.15*sa-.13*.15*ca);zu=S*.82*ca*TAU;zv=S*.12;
 }else{
  // A broad ascending sheet continues toward the amber source, behind the orbit.
  const p=Math.PI*u,a=TAU*u-.7+Math.sin(time*.12)*.10,b=u*18+v*5-time*.30;
  const sp=Math.sin(p),width=S*(.04+.05*sp*sp),widthU=S*.10*Math.PI*sp*Math.cos(p);
  const center=h*(.84-.74*u+.055*Math.sin(a));
  y=center+width*(v-.5)+S*.012*Math.sin(b);
  z=S*(.64-1.48*u+.22*(v-.5)+.13*Math.sin(TAU*u+time*.15));
  yu=h*(-.74+.055*TAU*Math.cos(a))+widthU*(v-.5)+S*.216*Math.cos(b);
  yv=width+S*.06*Math.cos(b);
  zu=S*(-1.48+.13*TAU*Math.cos(TAU*u+time*.15));zv=S*.22;
 }
 const k=1-z/D,xu=xs*k-(x-w*.5)*zu/D,xv=xvScreen*k-(x-w*.5)*zv/D;
 const wu=yu*k-(y-h*.5)*zu/D,wv=yv*k-(y-h*.5)*zv/D;
 let nx=wu*zv-zu*wv,ny=zu*xv-xu*zv,nz=xu*wv-wu*xv;
 if((kind===0&&ny>0)||(kind!==0&&nz<0)){nx=-nx;ny=-ny;nz=-nz;}
 const length=Math.hypot(nx,ny,nz)||1;
 out[0]=x;out[1]=y;out[2]=z;out[3]=nx/length;out[4]=ny/length;out[5]=nz/length;
 return out;
}
