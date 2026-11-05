import * as T from 'three';
import {commonNoise} from './materials.js';
export const cloudShader={
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,1.,1.);}',
 fragmentShader:/*glsl*/`
 varying vec2 vUv;uniform float uTime,uDay,uDayPulse,uAspect,uTanFov,uInside;uniform vec3 uEye;uniform mat4 uCamera,uInverseProjection;uniform sampler2D uNetwork;
 ${commonNoise}
 float density(vec3 p){float phase=uTime*.104719755;vec3 q=p*.33+vec3(sin(phase)*.5,cos(phase)*.12,cos(phase)*.5);float n=noise3(q)*.68+noise3(q*2.17)*.32;float lower=exp(-pow((p.y+2.4)/2.2,2.));float upper=exp(-pow((p.y-7.8)/2.1,2.))*.64;float horizon=smoothstep(1.2,4.,length(p.xz));return smoothstep(.38,.72,n)*(lower+upper)*horizon;}
 void main(){
 vec2 p=vUv*2.-1.;vec4 nearP=uInverseProjection*vec4(p,-1.,1.),farP=uInverseProjection*vec4(p,1.,1.);vec3 origin=uEye+mat3(uCamera)*(nearP.xyz/nearP.w);vec3 ray=normalize(mat3(uCamera)*(farP.xyz/farP.w-nearP.xyz/nearP.w));
 float elevation=clamp(ray.y*.5+.5,0.,1.);vec3 night=mix(vec3(.017,.024,.035),vec3(.003,.007,.015),elevation);vec3 day=mix(vec3(.42,.48,.50),vec3(.12,.26,.34),elevation);vec3 sky=mix(night,day,uDay);
 vec3 sun=normalize(vec3(-.6,.62,.35));float halo=pow(max(0.,dot(ray,sun)),12.);sky+=mix(vec3(.014,.020,.034),vec3(.44,.29,.14),uDay)*halo;
 vec2 starUv=ray.xz/max(.2,abs(ray.y)+.2)*240.;vec2 st=fract(starUv)-.5;float star=pow(max(0.,1.-length(st)*3.),12.)*step(.995,hash31(vec3(floor(starUv),1.)));sky+=star*vec3(.48,.57,.68)*(1.-uDay)*smoothstep(-.3,.6,ray.y);
 vec3 accum=vec3(0.);float trans=1.;float distance=2.5+hash31(vec3(gl_FragCoord.xy,0.))*.012;
 for(int i=0;i<CLOUD_STEPS;i++){vec3 pos=origin+ray*distance;float d=density(pos);float stepSize=.72+distance*.065;
 if(d>.015){float sunDensity=density(pos+sun*1.5);float shade=clamp(1.-sunDensity*1.8,.18,1.);vec3 moonLight=mix(vec3(.008,.013,.022),vec3(.070,.085,.11),shade);vec3 daylight=mix(vec3(.21,.27,.32),vec3(.88,.78,.61),shade);vec3 light=mix(moonLight,daylight,uDay);light+=vec3(.34,.12,.035)*uDayPulse*(.35+shade*.65);float a=1.-exp(-d*stepSize*.48);accum+=trans*a*light;trans*=1.-a;}
 distance+=stepSize;if(trans<.025)break;}
 vec3 color=sky*trans+accum;float twilight=exp(-pow(p.y+sin(uDay*3.14159)*.2,2.)*4.);color+=vec3(.25,.07,.017)*uDayPulse*twilight;
 vec4 net=texture2D(uNetwork,vUv);color=mix(color,net.rgb,net.a*(1.-uInside*.6));float vignette=1.-smoothstep(.25,1.5,length(p*.78));color*=.78+vignette*.22;
 gl_FragColor=vec4(color,1.);
 }`
};
function random(seed){let a=seed;return()=>((a=(Math.imul(a,1664525)+1013904223)>>>0)/4294967296);}
export class ScreenLattice{
 constructor(){this.canvas=document.createElement('canvas');this.ctx=this.canvas.getContext('2d',{alpha:true});this.texture=new T.CanvasTexture(this.canvas);this.pointer=new T.Vector2(-3,-3);this.smooth=new T.Vector2(-3,-3);this.active=false;this.lastTime=-1;
  this.onMove=e=>{this.pointer.set(e.clientX/innerWidth,1-e.clientY/innerHeight);this.active=true;};document.addEventListener('pointermove',this.onMove,{passive:true});document.addEventListener('pointerdown',this.onMove,{passive:true});document.addEventListener('pointerleave',()=>{this.active=false;});window.addEventListener('blur',()=>{this.active=false;});this.resize(innerWidth,innerHeight);
 }
 resize(w,h){this.canvas.width=Math.min(1400,w);this.canvas.height=Math.round(this.canvas.width*h/w);this.nodes=[];this.edges=[];const r=random(185),cols=Math.max(11,Math.round(16*w/h)),rows=16;for(let y=0;y<=rows;y++)for(let x=0;x<=cols;x++){this.nodes.push({x:(x+(r()-.5)*.8)/cols,y:(y+(r()-.5)*.8)/rows,phase:r()*Math.PI*2,seed:r()});if(x&&y){const i=y*(cols+1)+x;this.edges.push([i,i-1],[i,i-cols-1],(x+y)%2?[i-1,i-cols-1]:[i,i-cols-2]);}}this.lastTime=-1;}
 update(time,day,inside,dt){this.smooth.lerp(this.active?this.pointer:new T.Vector2(-3,-3),1-Math.exp(-dt*7));if(time===this.lastTime&&!this.active)return;if(time-this.lastTime<1/30&&time!==this.lastTime)return;this.lastTime=time;const c=this.ctx,w=this.canvas.width,h=this.canvas.height;c.clearRect(0,0,w,h);const phase=time*Math.PI/24;
 const points=this.nodes.map(n=>{let x=n.x+Math.sin(phase+n.phase)*.009,y=n.y+Math.cos(phase+n.phase)*.009;const dx=x-this.smooth.x,dy=(y-this.smooth.y)*h/w,dist=Math.hypot(dx,dy),heat=Math.exp(-dist*dist/.011);x+=dx*heat*.18;y+=(y-this.smooth.y)*heat*.18;return{x:x*w,y:(1-y)*h,heat,edge:Math.min(1,Math.hypot((x-.5)*1.45,(y-.5)*1.1)*1.5),seed:n.seed};});
 for(const[a,b]of this.edges){const p=points[a],q=points[b],heat=Math.max(p.heat,q.heat),alpha=(.05+(p.edge+q.edge)*.07)*(1-day*.35)+heat*.56;c.strokeStyle=heat>.05?`rgba(255,${Math.round(166-heat*45)},${Math.round(124-heat*54)},${alpha})`:`rgba(132,148,162,${alpha})`;c.lineWidth=.45+heat*.7;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke();}
 for(const p of points){if(p.seed<.43||p.heat>.1){c.fillStyle=`rgba(${p.heat>.1?'255,165,100':'180,192,201'},${.15+p.edge*.18+p.heat*.65})`;c.beginPath();c.arc(p.x,p.y,.65+p.heat,0,Math.PI*2);c.fill();}if(p.seed>.96&&p.heat>.02){const size=2+p.heat*3;c.fillStyle=`rgba(255,161,92,${p.heat*.7})`;c.beginPath();c.moveTo(p.x,p.y-size);c.lineTo(p.x-size*.6,p.y+size*.4);c.lineTo(p.x+size*.6,p.y+size*.4);c.closePath();c.fill();}}
 this.texture.needsUpdate=true;}
}
export function createEnvironment(scene,shared,mobile){
 const lattice=new ScreenLattice(),target=new T.WebGLRenderTarget(1,1,{depthBuffer:false,type:T.HalfFloatType});
 const u={...shared,uAspect:{value:1},uTanFov:{value:1},uEye:{value:new T.Vector3()},uCamera:{value:new T.Matrix4()},uInverseProjection:{value:new T.Matrix4()},uNetwork:{value:lattice.texture},uInside:{value:0}};
 const material=new T.ShaderMaterial({uniforms:u,vertexShader:cloudShader.vertexShader,fragmentShader:cloudShader.fragmentShader,defines:{CLOUD_STEPS:mobile?22:34},depthWrite:false,depthTest:false});
 const backdropScene=new T.Scene(),cam=new T.Camera(),geometry=new T.PlaneGeometry(2,2);backdropScene.add(new T.Mesh(geometry,material));
 const plane=new T.Mesh(geometry,new T.ShaderMaterial({uniforms:{map:{value:target.texture}},vertexShader:cloudShader.vertexShader,fragmentShader:'varying vec2 vUv;uniform sampler2D map;void main(){gl_FragColor=texture2D(map,vUv);}',depthTest:false,depthWrite:false}));plane.frustumCulled=false;plane.renderOrder=-1000;scene.add(plane);
 return {uniforms:u,resize(w,h){const scale=Math.min(mobile?.40:.36,640/w);target.setSize(Math.ceil(w*scale),Math.ceil(h*scale));lattice.resize(w,h);},update(renderer,camera,time,dt){u.uAspect.value=camera.aspect;u.uTanFov.value=Math.tan(camera.fov*Math.PI/360);u.uEye.value.copy(camera.position);u.uCamera.value.copy(camera.matrixWorld);u.uInverseProjection.value.copy(camera.projectionMatrixInverse);lattice.update(time,u.uDay.value,u.uInside.value,dt);const prev=renderer.getRenderTarget();renderer.setRenderTarget(target);renderer.render(backdropScene,cam);renderer.setRenderTarget(prev);},lattice,target};
}
