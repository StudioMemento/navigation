import * as T from 'three';
import {commonNoise} from './materials.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
export const focusShader={
 uniforms:{inverseProjection:{value:new T.Matrix4()},tDiffuse:{value:null},tDepth:{value:null},resolution:{value:new T.Vector2(1,1)},focusDistance:{value:2},focusRange:{value:.12},amount:{value:0},nearClip:{value:.025},farClip:{value:90},maxRadius:{value:14}},
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:/*glsl*/`
 #include <packing>
 varying vec2 vUv;uniform mat4 inverseProjection;uniform sampler2D tDiffuse,tDepth;uniform vec2 resolution;uniform float focusDistance,focusRange,amount,nearClip,farClip,maxRadius;
 float depthAt(vec2 uv){vec4 p=inverseProjection*vec4(uv*2.-1.,textureLod(tDepth,uv,0.).r*2.-1.,1.);return -p.z/p.w;}
 float coc(float z){return min(maxRadius,max(0.,abs(z-focusDistance)-focusRange)/max(z,.1)*maxRadius*2.8)*amount;}
 void main(){float depth=depthAt(vUv);float radius=coc(depth);vec4 center=textureLod(tDiffuse,vUv,0.);if(radius<.3){gl_FragColor=center;return;}vec3 color=center.rgb;float total=1.;
 for(int i=0;i<18;i++){float f=float(i)+.5;float a=f*2.39996323;vec2 off=vec2(cos(a),sin(a))*sqrt(f/18.)*radius/resolution;vec2 uv=clamp(vUv+off,vec2(.001),vec2(.999));float other=depthAt(uv);float weight=other<depth-.15&&coc(other)<radius*.35?.06:1.;color+=textureLod(tDiffuse,uv,0.).rgb*weight;total+=weight;}
 gl_FragColor=vec4(color/total,center.a);}`
};
export class FocusPass extends ShaderPass{constructor(){super(focusShader);this.enabled=false;}render(renderer,write,read,dt,mask){this.uniforms.tDepth.value=read.depthTexture;super.render(renderer,write,read,dt,mask);}}
export const ambientVertex=/*glsl*/`
 uniform float uTime;uniform vec3 uCursor;uniform float uContact,uRadius;varying vec3 vPosition;varying float vHeat;
 vec3 drift(vec3 p){float anchor=smoothstep(2.9,7.,length(p.xz));p.y+=sin(p.x*.24+p.z*.16+uTime*.065)*.24*anchor;p.x+=sin(p.y*.22+p.z*.07+uTime*.045)*.15;return p;}
 void main(){vec3 p=drift(position);vPosition=p;vHeat=exp(-dot(p-uCursor,p-uCursor)/(uRadius*uRadius*4.))*uContact;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);gl_PointSize=1.2;}`;
export const ambientFragment=/*glsl*/`
 uniform float uInside;varying vec3 vPosition;varying float vHeat;
 void main(){float fade=1.-smoothstep(12.,29.,length(vPosition));vec3 charcoal=vec3(.32,.35,.37);vec3 amber=vec3(1.,.31,.11);float a=(.035+vHeat*.28)*fade*(1.-uInside*.72);gl_FragColor=vec4(mix(charcoal,amber,min(1.,vHeat)),a);}`;
export function createEnvironment(scene,uniforms,mobile){const r=seeded(61105),segments=[],nodes=[];for(let layer=0;layer<2;layer++){const cols=27,rows=19,grid=[];for(let y=0;y<=rows;y++)for(let x=0;x<=cols;x++){const xx=(x/cols-.5)*38+(r()-.5)*.9,zz=(y/rows-.5)*27+(r()-.5)*.8;const p=layer===0?[xx,-.20,zz]:[xx,zz*.7+3,-12+(r()-.5)*2];grid.push(p);if(r()<.35)nodes.push(...p);}for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const a=y*(cols+1)+x,b=a+1,c=a+cols+1,d=c+1;for(const [i,j]of[[a,b],[a,c],[(x+y)%2?a:b,(x+y)%2?d:c]])segments.push(...grid[i],...grid[j]);}}
 const u={...uniforms,uInside:{value:0}},geom=new T.BufferGeometry();geom.setAttribute('position',new T.Float32BufferAttribute(segments,3));const mat=new T.ShaderMaterial({uniforms:u,vertexShader:ambientVertex,fragmentShader:ambientFragment,transparent:true,depthWrite:false,blending:T.AdditiveBlending});const lines=new T.LineSegments(geom,mat);lines.userData.environment=true;scene.add(lines);const ng=new T.BufferGeometry();ng.setAttribute('position',new T.Float32BufferAttribute(nodes,3));const points=new T.Points(ng,mat);points.userData.environment=true;scene.add(points);
 const dustCount=mobile?75:170,dust=new Float32Array(dustCount*3);for(let i=0;i<dustCount;i++){dust[i*3]=(r()-.5)*16;dust[i*3+1]=r()*7+.3;dust[i*3+2]=(r()-.5)*13;}const dg=new T.BufferGeometry();dg.setAttribute('position',new T.BufferAttribute(dust,3));const dm=new T.ShaderMaterial({uniforms:{uTime:uniforms.uTime},transparent:true,depthWrite:false,vertexShader:'uniform float uTime;varying float vA;void main(){vec3 p=position;p.x+=sin(uTime*.06+position.z)*.13;p.y+=sin(uTime*.045+position.x)*.1;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(8./max(1.,-mv.z),.6,1.6);vA=.09;}',fragmentShader:'varying float vA;void main(){float d=length(gl_PointCoord-.5);gl_FragColor=vec4(vec3(.6,.61,.63),vA*(1.-smoothstep(.1,.5,d)));}'});const mote=new T.Points(dg,dm);scene.add(mote);return{lines,points,mote,uniforms:u};}
export function seeded(seed){let a=seed;return()=>{a=(Math.imul(1664525,a)+1013904223)>>>0;return a/4294967296;};}
export const particleVertex=/*glsl*/`
 uniform float uTime,uReveal,uHeight,uDpr,uStyleFrom,uStyleTo,uStyleMix,uPerspective,uProjectionDistance;uniform vec4 uHits[16],uForces[16];attribute vec3 aNormal;attribute vec2 aSeed;varying float vHeat,vAlpha,vMode;
 ${commonNoise}
 float weight(float id){return mix(isStyle(uStyleFrom,id),isStyle(uStyleTo,id),uStyleMix);}
 void main(){vec3 p=position+aNormal*.007;float field=clamp(length((p.xz-vec2(.25,-.8))*vec2(.75,1.))*.127+p.y*.075,0.,.88);float a=smoothstep(field-.12,field+.06,uReveal*1.1);vec3 dispersion=vec3(sin(aSeed.x*33.),aSeed.y*.6,cos(aSeed.x*31.))*(1.-a)*.62;float heat=0.;
 for(int i=0;i<16;i++){float age=uTime-uHits[i].w;vec3 delta=position-uHits[i].xyz;float influence=exp(-dot(delta,delta)/(uForces[i].w*uForces[i].w+.001));float alive=step(0.,age),life=alive*exp(-age*2.3),force=influence*age*exp(-age*3.3)*alive;dispersion+=(normalize(delta+aNormal*.1+vec3(.001))*.8+uForces[i].xyz*.12)*force;heat+=influence*life;}
 float nebula=weight(4.),ember=weight(12.),holo=weight(6.);float phase=uTime*.65+aSeed.x*6.283;float swell=pow(.5+.5*sin(phase+position.y*2.),4.);
 dispersion+=nebula*(aNormal*swell*.30+vec3(sin(phase+position.z),cos(phase*.77+position.x),cos(phase+position.y))*.075);
 float life=fract(uTime*.16+aSeed.x);dispersion+=ember*(aNormal*life*.08+vec3(sin(life*5.+aSeed.x*22.)*.06,life*life*.48,cos(life*4.)*.03));
 p+=dispersion;vHeat=min(heat,1.6);vMode=nebula+holo*2.+ember*3.;
 float ambient=.012+nebula*(.58+aSeed.y*.35)+holo*.12+ember*sin(life*3.14159)*step(.83,aSeed.y)*.8;
 vAlpha=max(heat*.9,ambient)+(1.-a)*smoothstep(0.,.18,uReveal)*.45;vAlpha*=smoothstep(0.,.12,uReveal);
 vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp((.7+aSeed.y+vHeat*.8+nebula*1.4)*uDpr*uHeight*.015/max(1.,mix(uProjectionDistance,-mv.z,uPerspective)),.65,5.5);}`;
export const particleFragment=/*glsl*/`uniform float uDay;varying float vHeat,vAlpha,vMode;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 tint=mix(vec3(.75,.92,1.1),vec3(.018,.045,.07),uDay);if(vMode>2.5)tint=vec3(2.6,.53,.08);else if(vMode>1.5)tint=vec3(.12,.65,.90);gl_FragColor=vec4(mix(tint,vec3(1.8,.40,.10),min(1.,vHeat)),(1.-smoothstep(.12,.5,d))*min(vAlpha,.95));}`;
export const voxelVertex=/*glsl*/`
 uniform float uTime,uStyleFrom,uStyleTo,uStyleMix,uReveal;attribute vec3 aOffset,aSurfaceNormal;attribute float aSeed;varying vec3 vNormal,vLocal,vCenter;varying float vPulse,vAlpha;
 ${commonNoise}
 void main(){float w=mix(isStyle(uStyleFrom,2.),isStyle(uStyleTo,2.),uStyleMix);float pulse=pow(.5+.5*sin(uTime*.78+length(aOffset.xz)*1.6+aOffset.y*2.),5.);vec3 p=position*(.96+pulse*.04)+aOffset+aSurfaceNormal*pulse*.035;vPulse=pulse;vNormal=normal;vLocal=position/.066;vCenter=aOffset;vAlpha=w*smoothstep(0.,.8,uReveal);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
export const voxelFragment=/*glsl*/`
 uniform float uDay;varying vec3 vNormal,vLocal,vCenter;varying float vPulse,vAlpha;
 void main(){if(vAlpha<.01)discard;float edge=max(max(abs(vLocal.x),abs(vLocal.y)),abs(vLocal.z));vec3 a=abs(vLocal);float joint=smoothstep(.42,.5,min(max(a.x,a.y),min(max(a.x,a.z),max(a.y,a.z))));float lighting=.22+max(0.,dot(vNormal,normalize(vec3(-.4,.8,.5))))*.75;vec3 color=mix(vec3(.19,.21,.23),vec3(.44,.42,.37),uDay)*lighting;float wave=pow(.5+.5*sin(vCenter.y*8.+vCenter.x*3.-vPulse*5.),12.);color+=vec3(.85,.30,.10)*joint*(.08+vPulse*.42)+vec3(.09,.12,.14)*wave;gl_FragColor=vec4(color,vAlpha);}`;
export async function loadParticles(scene,shared,mobile){
 const res=await fetch('./assets/surface-v2.bin.gz');if(!res.ok)throw new Error('Surface field unavailable');const bytes=await res.arrayBuffer();const decoded=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();const src=new Float32Array(decoded),stride=mobile?2:1,count=src.length/8/stride;
 const p=new Float32Array(count*3),n=new Float32Array(count*3),seed=new Float32Array(count*2);for(let i=0;i<count;i++){const j=i*stride*8;p.set(src.subarray(j,j+3),i*3);n.set(src.subarray(j+3,j+6),i*3);seed.set(src.subarray(j+6,j+8),i*2);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(p,3));g.setAttribute('aNormal',new T.BufferAttribute(n,3));g.setAttribute('aSeed',new T.BufferAttribute(seed,2));
 const u={...shared,uHeight:{value:innerHeight},uDpr:{value:1},uHits:{value:Array.from({length:16},()=>new T.Vector4(99,99,99,-100))},uForces:{value:Array.from({length:16},()=>new T.Vector4(0,0,0,.4))}};
 const mat=new T.ShaderMaterial({uniforms:u,vertexShader:particleVertex,fragmentShader:particleFragment,transparent:true,depthWrite:false,blending:T.NormalBlending});const points=new T.Points(g,mat);points.frustumCulled=false;scene.add(points);
 const vr=await fetch(`./assets/voxels-v4-${mobile?'mobile':'desktop'}.bin.gz`);if(!vr.ok)throw new Error('Voxel field unavailable');const vb=await vr.arrayBuffer();const vd=new Float32Array(await new Response(new Blob([vb]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());const size=mobile?.09:.065;
 const box=new T.BoxGeometry(size,size,size),vg=new T.InstancedBufferGeometry().copy(box);vg.instanceCount=vd.length/8;const offsets=[],normals=[],seeds=[];for(let j=0;j<vd.length;j+=8){offsets.push(vd[j],vd[j+1],vd[j+2]);normals.push(vd[j+3],vd[j+4],vd[j+5]);seeds.push(vd[j+6]);}
 vg.setAttribute('aOffset',new T.InstancedBufferAttribute(new Float32Array(offsets),3));vg.setAttribute('aSurfaceNormal',new T.InstancedBufferAttribute(new Float32Array(normals),3));vg.setAttribute('aSeed',new T.InstancedBufferAttribute(new Float32Array(seeds),1));
 const voxel=new T.Mesh(vg,new T.ShaderMaterial({uniforms:shared,vertexShader:voxelVertex,fragmentShader:voxelFragment,transparent:true,depthWrite:true}));voxel.frustumCulled=false;voxel.visible=false;scene.add(voxel);let slot=0;
 return{mesh:points,voxel,u,update(){voxel.visible=shared.uStyleFrom.value===2&&shared.uStyleMix.value<1||shared.uStyleTo.value===2;},hit(point,velocity,radius,time){u.uHits.value[slot].set(point.x,point.y,point.z,time);u.uForces.value[slot].set(velocity.x,velocity.y,velocity.z,radius);slot=(slot+1)%16;}};
}
