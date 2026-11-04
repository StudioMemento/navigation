import {cameraFor,unprojectPoint} from './camera.js';

// Every visible solid is a small grain. The navigation guide is never rendered.
const COMMON=`
precision highp float;
attribute vec3 a_position;attribute vec3 a_look;attribute vec4 a_motion;attribute vec4 a_surface;
uniform vec2 u_resolution;uniform vec2 u_rotation;uniform vec3 u_light;
uniform vec4 u_camera;uniform float u_dpr;uniform float u_scale;uniform float u_kind;uniform float u_time;
varying vec3 v_color;varying float v_emit;varying float v_depth;
vec3 rotate(vec3 p){float cy=cos(u_rotation.x),sy=sin(u_rotation.x),cx=cos(u_rotation.y),sx=sin(u_rotation.y);vec3 q=vec3(p.x*cy+p.z*sy,p.y,-p.x*sy+p.z*cy);return vec3(q.x,q.y*cx-q.z*sx,q.y*sx+q.z*cx);}
vec3 world(vec3 p){return vec3(u_resolution*.5+(p.xy-u_resolution*.5)*(u_camera.x-p.z)/u_camera.x,p.z);}
vec4 project(vec3 p){float d=u_camera.x-p.z,n=u_camera.y,f=u_camera.z;v_depth=d;return vec4((p.x-u_resolution.x*.5)*2.*u_camera.x/u_resolution.x,-(p.y-u_resolution.y*.5)*2.*u_camera.x/u_resolution.y,((f+n)*d-2.*f*n)/(f-n),d);}
vec3 displayColor(vec3 c){return pow(1.-exp(-max(c,vec3(0.))),vec3(1./2.2));}
vec3 illuminate(vec3 pos,vec3 n,float material,float seed){
 float S=min(u_resolution.x,u_resolution.y);
 vec3 base=vec3(.045,.049,.055);if(material>.5)base=vec3(.012,.014,.017);if(material>1.5)base=vec3(.12,.13,.14);if(material>2.5)base=vec3(.20,.055,.012);
 vec3 delta=(u_light-pos)/S,L=normalize(delta),V=normalize(vec3(u_resolution*.5,u_camera.x)-pos),K=normalize(vec3(-.56,-.74,.78));
 float attenuation=2.2/(.55+dot(delta,delta)*1.5),rough=30.+seed*58.;
 float diffuse=max(dot(n,L),0.),spec=pow(max(dot(n,normalize(L+V)),0.),rough);
 float neutral=max(dot(n,K),0.),neutralSpec=pow(max(dot(n,normalize(K+V)),0.),rough*.82);
 vec3 amber=vec3(1.,.32,.065),c=base*(.035+neutral*.34)+vec3(.88,.91,.94)*neutralSpec*.80;
 c+=amber*attenuation*(base*diffuse*.52+spec*5.5+pow(diffuse,5.)*.12);
 if(material>2.5)c+=amber*attenuation*(.08+diffuse*.4);
 if(material>3.5)c=vec3(2.7,2.55,2.25)*(.72+seed*.28)+amber*diffuse*attenuation*.12;
 // Surface exposure compensates for the sparse, depth-filtered field; heat stays local.
 float field=step(.5,u_kind)*step(u_kind,2.5),fieldLight=mix(1.,.85+seed*.45,field);
 c*=fieldLight;
 if(u_kind<.5){vec3 guide=normalize(rotate(a_surface.xyz));float facing=max(dot(guide,L),0.),rim=pow(1.-abs(dot(guide,V)),2.);c*=.50+.50*facing;c+=amber*attenuation*rim*facing*.20;}
 float heat=clamp(a_look.z,0.,1.);
 c=mix(c,c*.15+vec3(4.7,.42,.025),heat*.94);
 v_emit=clamp(heat*.96+spec*attenuation*.13*fieldLight+step(2.5,material)*step(material,3.5)*attenuation*.08*fieldLight,0.,1.);
 if(material>4.5){c=amber*9.;v_emit=1.;}
 return displayColor(c);
}
`;
const SHARD_VERTEX=COMMON+`
attribute vec3 a_local;attribute vec3 a_normal;
void main(){
 vec3 n=normalize(u_kind<.5?rotate(a_surface.xyz):a_surface.xyz);
 vec3 axis=abs(n.z)>.94?vec3(0.,1.,0.):vec3(0.,0.,1.);
 vec3 t=normalize(cross(axis,n)),b=cross(n,t);
 float angle=a_motion.z*62.8+sin(u_time*.48+a_motion.z*12.)*(.24+a_motion.w),c=cos(angle),s=sin(angle);
 vec3 T=t*c+b*s,B=b*c-t*s;
 float size=a_look.y*clamp(u_scale/300.,.50,1.35)*sqrt(max(0.,a_look.x));
 vec3 shape=a_local*vec3(.8+a_motion.z*.45,.75+fract(a_motion.z*17.)*.6,.7);
 vec3 p=world(a_position)+(T*shape.x+B*shape.y+n*shape.z)*size;
 vec3 face=normalize(T*a_normal.x+B*a_normal.y+n*a_normal.z);
 v_color=illuminate(p,face,a_surface.w,a_motion.z);gl_Position=project(p);
}`;
const SHARD_FRAGMENT=`precision highp float;uniform float u_depthPass;uniform vec4 u_camera;varying vec3 v_color;varying float v_emit;varying float v_depth;void main(){gl_FragColor=u_depthPass>.5?vec4(vec3(v_depth/u_camera.z),1.):vec4(v_color,v_emit);}`;
const POINT_VERTEX=COMMON+`
varying float v_seed;
void main(){
 vec3 p=world(a_position),n=normalize(u_kind<.5?rotate(a_surface.xyz):a_surface.xyz);
 v_color=illuminate(p,n,a_surface.w,a_motion.z);gl_Position=project(p);
 if(a_look.x<.001)gl_Position=vec4(2.,2.,2.,1.);
 float size=a_look.y*(u_kind>1.5?1.:clamp(u_scale/300.,.5,1.35));
 gl_PointSize=max(.7,size*u_camera.x/(u_camera.x-p.z))*u_dpr*sqrt(max(0.,a_look.x));v_seed=a_motion.z;
}`;
const POINT_FRAGMENT=`
precision highp float;uniform float u_depthPass;uniform vec4 u_camera;
varying vec3 v_color;varying float v_emit;varying float v_depth;varying float v_seed;
void main(){
 vec2 p=gl_PointCoord-.5;float a=v_seed*62.8,c=cos(a),s=sin(a);vec2 q=mat2(c,-s,s,c)*p;
 if(max(abs(q.x)*.85+abs(q.y)*.32,abs(q.y))>.48)discard;
 float face=.78+.22*step(0.,q.x-q.y);
 gl_FragColor=u_depthPass>.5?vec4(vec3(v_depth/u_camera.z),1.):vec4(v_color*face,v_emit);
}`;
const SCREEN_VERTEX=`attribute vec2 a_quad;varying vec2 v_uv;void main(){v_uv=a_quad*.5+.5;gl_Position=vec4(a_quad,0.,1.);}`;
// Two separable camera passes. Circle of confusion comes from scene depth, not
// hand-blurred sprites. A half-resolution intermediate keeps dense surfaces affordable.
const LENS_FRAGMENT=`
precision highp float;varying vec2 v_uv;uniform sampler2D u_color;uniform sampler2D u_depth;uniform sampler2D u_original;
uniform vec2 u_pixels;uniform vec4 u_camera;uniform float u_nativeDepth;uniform float u_dpr;uniform float u_horizontal;
float distanceAt(vec2 uv){float d=texture2D(u_depth,uv).r,n=u_camera.y,f=u_camera.z;return u_nativeDepth>.5?2.*n*f/(f+n-(2.*d-1.)*(f-n)):d*f;}
float coc(float d){return clamp(abs(u_camera.w*(1.-u_camera.x/max(d,u_camera.y)))*u_dpr-.3*u_dpr,0.,17.*u_dpr);}
void main(){
 vec4 original=texture2D(u_original,v_uv);float depth=distanceAt(v_uv),radius=coc(depth);
 float span=max(radius,5.*u_dpr);vec2 direction=u_horizontal>.5?vec2(1.,0.):vec2(0.,1.);
 vec3 sum=vec3(0.);float weights=0.,emission=0.,emissionWeights=0.;
 ${Array.from({length:11},(_,i)=>{const x=(i-5)/5,w=Math.exp(-x*x*2.5);return `{
  vec2 uv=v_uv+direction*span*${x.toFixed(5)}/u_pixels;vec4 sampleColor=texture2D(u_color,uv);float d=distanceAt(uv),weight=${w.toFixed(7)};
  if(d>depth+u_camera.x*.035&&radius<1.5)weight*=.01;
  sum+=sampleColor.rgb*weight;weights+=weight;emission+=sampleColor.a*${w.toFixed(7)};emissionWeights+=${w.toFixed(7)};
 }`;}).join('\n')}
 vec3 filtered=sum/max(weights,.001);float glow=emission/emissionWeights;
 if(u_horizontal>.5){gl_FragColor=vec4(filtered,glow);return;}
 vec3 color=mix(original.rgb,filtered,smoothstep(.55,2.4,radius));
 color+=vec3(1.,.32,.055)*glow*.95;
 // Restrained atmospheric scattering aligned with the actual upper-right point source.
 vec2 lightDelta=(v_uv-vec2(.985,.988))*vec2(u_pixels.x/u_pixels.y,1.);
 float sourceHalo=exp(-dot(lightDelta,lightDelta)*28.)*.25+exp(-length(lightDelta)*2.8)*.025;
 float shaft=exp(-pow((lightDelta.y-lightDelta.x*.62)/.085,2.))*exp(-length(lightDelta)*2.1)*.028;
 color+=vec3(1.,.30,.045)*(sourceHalo+shaft);
 color+=vec3(.75,.42,.16)*exp(-dot(lightDelta,lightDelta)*300.);
 gl_FragColor=vec4(color,1.);
}`;

function compile(gl,type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const error=gl.getShaderInfoLog(s);gl.deleteShader(s);throw new Error(error);}return s;}
function link(gl,vs,fs){const p=gl.createProgram(),v=compile(gl,gl.VERTEX_SHADER,vs),f=compile(gl,gl.FRAGMENT_SHADER,fs);gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);gl.deleteShader(v);gl.deleteShader(f);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p;}
function program(gl,vs,fs,shards=false){const p=link(gl,vs,fs);return {p,attributes:[['a_position',3,0],['a_look',3,12],['a_motion',4,24],['a_surface',4,40]].map(([n,size,offset])=>({location:gl.getAttribLocation(p,n),size,offset})),uniforms:Object.fromEntries(['resolution','rotation','light','camera','dpr','scale','kind','time','depthPass'].map(n=>[n,gl.getUniformLocation(p,'u_'+n)])),local:shards?gl.getAttribLocation(p,'a_local'):-1,normal:shards?gl.getAttribLocation(p,'a_normal'):-1};}

export class ParticleRenderer{
 constructor(canvas){
  this.canvas=canvas;const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:true,stencil:false,powerPreference:'high-performance'});if(!gl)throw new Error('WebGL unavailable');this.gl=gl;
  this.instancing=gl.getExtension('ANGLE_instanced_arrays');this.nativeDepth=!!gl.getExtension('WEBGL_depth_texture');
  this.points=program(gl,POINT_VERTEX,POINT_FRAGMENT);this.shards=this.instancing?program(gl,SHARD_VERTEX,SHARD_FRAGMENT,true):null;
  this.lens=link(gl,SCREEN_VERTEX,LENS_FRAGMENT);this.lensQuad=gl.getAttribLocation(this.lens,'a_quad');this.lensUniforms=Object.fromEntries(['color','depth','original','pixels','camera','nativeDepth','dpr','horizontal'].map(n=>[n,gl.getUniformLocation(this.lens,'u_'+n)]));
  this.buffers={icon:gl.createBuffer(),dust:gl.createBuffer(),foreground:gl.createBuffer(),light:gl.createBuffer(),grain:gl.createBuffer(),quad:gl.createBuffer()};this.allocated=new Map();this.uploadViews=new Map();
  gl.bindBuffer(gl.ARRAY_BUFFER,this.buffers.grain);gl.bufferData(gl.ARRAY_BUFFER,grainGeometry(),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER,this.buffers.quad);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  gl.clearDepth(1);gl.depthFunc(gl.LEQUAL);this.framebuffers=[];this.textures=[];this.renderbuffers=[];
 }
 texture(w,h,depth=false){const gl=this.gl,t=gl.createTexture();this.textures.push(t);gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,depth?gl.NEAREST:gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,depth?gl.NEAREST:gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,depth?gl.DEPTH_COMPONENT:gl.RGBA,w,h,0,depth?gl.DEPTH_COMPONENT:gl.RGBA,depth?gl.UNSIGNED_SHORT:gl.UNSIGNED_BYTE,null);return t;}
 framebuffer(color,depthTexture){
  const gl=this.gl,f=gl.createFramebuffer();this.framebuffers.push(f);gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,color,0);
  if(depthTexture)gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,depthTexture,0);
  else{const r=gl.createRenderbuffer();this.renderbuffers.push(r);gl.bindRenderbuffer(gl.RENDERBUFFER,r);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,this.canvas.width,this.canvas.height);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,r);}
  if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw new Error('Camera framebuffer incomplete');return f;
 }
 releaseTargets(){const gl=this.gl;this.framebuffers.forEach(f=>gl.deleteFramebuffer(f));this.textures.forEach(t=>gl.deleteTexture(t));this.renderbuffers.forEach(r=>gl.deleteRenderbuffer(r));this.framebuffers=[];this.textures=[];this.renderbuffers=[];}
 resize(w,h,dpr){
  this.w=w;this.h=h;this.dpr=dpr;this.camera=cameraFor(w,h);this.canvas.width=Math.round(w*dpr);this.canvas.height=Math.round(h*dpr);
  const gl=this.gl;this.releaseTargets();this.color=this.texture(this.canvas.width,this.canvas.height);this.depth=this.texture(this.canvas.width,this.canvas.height,this.nativeDepth);
  this.sceneFbo=this.framebuffer(this.color,this.nativeDepth?this.depth:null);if(!this.nativeDepth)this.depthFbo=this.framebuffer(this.depth,null);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,this.canvas.width,this.canvas.height);
  this.lensColor=this.texture(Math.max(1,Math.round(this.canvas.width*.5)),Math.max(1,Math.round(this.canvas.height*.5)));
  this.lensFbo=gl.createFramebuffer();this.framebuffers.push(this.lensFbo);gl.bindFramebuffer(gl.FRAMEBUFFER,this.lensFbo);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.lensColor,0);gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  this.light=unprojectPoint(w*.985,h*.012,Math.min(w,h)*.72,this.camera);
  this.lightData=new Float32Array([w*.985,h*.012,Math.min(w,h)*.72,1,6,1,0,0,.43,0,0,0,1,5]);
 }
 setQuality(step){this.quality=step;}
 use(p,scene,kind,depthPass){const gl=this.gl,u=p.uniforms,c=this.camera;gl.useProgram(p.p);gl.uniform2f(u.resolution,this.w,this.h);gl.uniform2f(u.rotation,scene.yaw||0,scene.pitch||0);gl.uniform3f(u.light,...this.light);gl.uniform4f(u.camera,c.distance,c.near,c.far,c.aperture);gl.uniform1f(u.scale,scene.composition.scale);gl.uniform1f(u.dpr,this.dpr);gl.uniform1f(u.kind,kind);gl.uniform1f(u.time,scene.time||0);gl.uniform1f(u.depthPass,depthPass);}
 upload(p,buffer,data,count,instance=0){
  const gl=this.gl;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  if((this.allocated.get(buffer)||0)<data.byteLength){gl.bufferData(gl.ARRAY_BUFFER,data.byteLength,gl.DYNAMIC_DRAW);this.allocated.set(buffer,data.byteLength);}
  let view=this.uploadViews.get(buffer);if(!view||view.source!==data||view.count!==count){view={source:data,count,active:data.subarray(0,count*14)};this.uploadViews.set(buffer,view);}
  gl.bufferSubData(gl.ARRAY_BUFFER,0,view.active);
  for(const a of p.attributes){if(a.location<0)continue;gl.enableVertexAttribArray(a.location);gl.vertexAttribPointer(a.location,a.size,gl.FLOAT,false,56,a.offset);this.instancing?.vertexAttribDivisorANGLE(a.location,instance);}
 }
 grains(buffer,data,count,scene,kind,depthPass){
  if(!data||!count)return;const gl=this.gl,instanced=this.shards&&(kind<.5||(kind>1.5&&kind<2.5)),p=instanced?this.shards:this.points;this.use(p,scene,kind,depthPass);this.upload(p,buffer,data,count,instanced?1:0);
  if(instanced){
   gl.bindBuffer(gl.ARRAY_BUFFER,this.buffers.grain);for(const [location,offset] of [[p.local,0],[p.normal,12]]){gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,3,gl.FLOAT,false,24,offset);this.instancing.vertexAttribDivisorANGLE(location,0);}
   this.instancing.drawArraysInstancedANGLE(gl.TRIANGLES,0,24,count);
   for(const a of p.attributes)if(a.location>=0)this.instancing.vertexAttribDivisorANGLE(a.location,0);gl.disableVertexAttribArray(p.local);gl.disableVertexAttribArray(p.normal);
  }else gl.drawArrays(gl.POINTS,0,count);
  for(const a of p.attributes)if(a.location>=0)gl.disableVertexAttribArray(a.location);
 }
 render(data,count,scene){
  const gl=this.gl;if(gl.isContextLost())return;gl.viewport(0,0,this.canvas.width,this.canvas.height);gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);gl.depthMask(true);
  const passes=this.nativeDepth?1:2;
  for(let pass=0;pass<passes;pass++){
   gl.bindFramebuffer(gl.FRAMEBUFFER,pass?this.depthFbo:this.sceneFbo);if(pass)gl.clearColor(1,1,1,1);else gl.clearColor(.012,.016,.020,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
   this.grains(this.buffers.icon,data,count,scene,0,pass);
   this.grains(this.buffers.dust,scene.backgroundData,scene.backgroundCount,scene,1,pass);
   this.grains(this.buffers.foreground,scene.foregroundData,scene.foregroundCount,scene,2,pass);
  }
  gl.disable(gl.DEPTH_TEST);gl.useProgram(this.lens);gl.bindBuffer(gl.ARRAY_BUFFER,this.buffers.quad);gl.enableVertexAttribArray(this.lensQuad);gl.vertexAttribPointer(this.lensQuad,2,gl.FLOAT,false,0,0);this.instancing?.vertexAttribDivisorANGLE(this.lensQuad,0);
  const u=this.lensUniforms,c=this.camera;
  gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,this.depth);gl.uniform1i(u.depth,1);
  gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,this.color);gl.uniform1i(u.original,2);
  gl.uniform2f(u.pixels,this.canvas.width,this.canvas.height);gl.uniform4f(u.camera,c.distance,c.near,c.far,c.aperture);gl.uniform1f(u.nativeDepth,this.nativeDepth?1:0);gl.uniform1f(u.dpr,this.dpr);
  for(let pass=0;pass<2;pass++){
   gl.bindFramebuffer(gl.FRAMEBUFFER,pass?null:this.lensFbo);gl.viewport(0,0,pass?this.canvas.width:Math.max(1,Math.round(this.canvas.width*.5)),pass?this.canvas.height:Math.max(1,Math.round(this.canvas.height*.5)));
   gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,pass?this.lensColor:this.color);gl.uniform1i(u.color,0);gl.uniform1f(u.horizontal,pass?0:1);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  }
  gl.disableVertexAttribArray(this.lensQuad);
 }
 dispose(){const gl=this.gl;if(gl.isContextLost())return;this.releaseTargets();Object.values(this.buffers).forEach(b=>gl.deleteBuffer(b));gl.deleteProgram(this.points.p);if(this.shards)gl.deleteProgram(this.shards.p);gl.deleteProgram(this.lens);this.allocated.clear();this.uploadViews.clear();}
}

export function grainGeometry(){
 const points=[[.04,-.03,.43],[-.11,.07,-.35],[-.57,-.18,0],[.08,-.53,.02],[.48,.08,-.05],[-.03,.51,.03]],data=[];
 for(let i=0;i<4;i++)for(let side=0;side<2;side++){
  const ids=side?[1,2+(i+1)%4,2+i]:[0,2+i,2+(i+1)%4],a=points[ids[0]],b=points[ids[1]],c=points[ids[2]],u=b.map((v,k)=>v-a[k]),v=c.map((v,k)=>v-a[k]),n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],l=Math.hypot(...n);
  for(const id of ids)data.push(...points[id],...n.map(x=>x/l));
 }return new Float32Array(data);
}
