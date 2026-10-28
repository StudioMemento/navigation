import * as THREE from 'three';
import {Reflector} from '../vendor/objects/Reflector.js';
import {RipplePool} from './core.js';

function normalTexture(){
  const size=128,data=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const a=x/size*Math.PI*2,b=y/size*Math.PI*2;
    const dx=.15*Math.cos(a*3+b*2)+.08*Math.cos(a*7-b*4);
    const dz=.10*Math.cos(a*3+b*2)-.05*Math.cos(a*7-b*4);
    const length=Math.hypot(dx,dz,1),i=(y*size+x)*4;
    data[i]=Math.round((-.5*dx/length+.5)*255);data[i+1]=Math.round((-.5*dz/length+.5)*255);data[i+2]=Math.round((.5/length+.5)*255);data[i+3]=255;
  }
  const map=new THREE.DataTexture(data,size,size,THREE.RGBAFormat);map.wrapS=map.wrapT=THREE.RepeatWrapping;
  map.magFilter=THREE.LinearFilter;map.minFilter=THREE.LinearMipmapLinearFilter;map.generateMipmaps=true;map.needsUpdate=true;
  map.name='TIDE_Runtime_Periodic_Normal';return map;
}

export function createWater({mobile=false,qa}) {
  const texture=normalTexture();const pool=new RipplePool(mobile?4:8);const size=mobile?512:1024;
  const shader={name:'TIDE_Water',uniforms:{color:{value:new THREE.Color('#070a0c')},tDiffuse:{value:null},textureMatrix:{value:null},normalMap:{value:texture},time:{value:0},ripples:{value:pool.data},rippleCount:{value:pool.capacity},texel:{value:1/size},fogColor:{value:new THREE.Color('#111417')}},
    vertexShader:`uniform mat4 textureMatrix;varying vec4 vReflection;varying vec3 vWorld;void main(){vReflection=textureMatrix*vec4(position,1.0);vWorld=(modelMatrix*vec4(position,1.0)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader:`uniform vec3 color;uniform sampler2D tDiffuse;uniform sampler2D normalMap;uniform float time;uniform vec4 ripples[8];uniform int rippleCount;uniform float texel;uniform vec3 fogColor;varying vec4 vReflection;varying vec3 vWorld;
    vec2 rippleGradient(vec2 p){vec2 gradient=vec2(0.0);for(int i=0;i<8;i++){if(i>=rippleCount)break;float age=time-ripples[i].z;if(age<0.0||age>2.4)continue;vec2 delta=p-ripples[i].xy;float r=length(delta);if(r>3.0)continue;float d=r-1.1*age;float env=exp(-2.1*age)*exp(-pow(d/.22,2.0));float dh=ripples[i].w*env*(18.0*cos(18.0*d)-2.0*d/(.22*.22)*sin(18.0*d));gradient+=dh*delta/max(r,.0001)*smoothstep(0.0,.08,age)*(1.0-smoothstep(2.1,2.4,age));}return gradient;}
    void main(){vec2 p=vWorld.xz;vec2 coarse=texture2D(normalMap,p/3.2+vec2(.014,-.009)*time).xy*2.0-1.0;vec2 micro=texture2D(normalMap,p/.28+vec2(-.021,.016)*time).xy*2.0-1.0;vec2 slope=coarse*.23+micro*.045+rippleGradient(p);vec3 normal=normalize(vec3(-slope.x,1.0,-slope.y));vec3 view=normalize(cameraPosition-vWorld);float fresnel=.020+(1.0-.020)*pow(1.0-max(dot(normal,view),0.0),5.0);vec2 uv=vReflection.xy/vReflection.w+slope*vec2(.055,.16);float distanceToEye=length(cameraPosition-vWorld);float blur=texel*(2.8+min(distanceToEye,30.0)*.22);uv=clamp(uv,vec2(.002),vec2(.998));vec3 reflected=texture2D(tDiffuse,uv).rgb*.24;
      reflected+=(texture2D(tDiffuse,uv+vec2(blur,0.)).rgb+texture2D(tDiffuse,uv-vec2(blur,0.)).rgb)*.14;
      reflected+=(texture2D(tDiffuse,uv+vec2(0.,blur*.4)).rgb+texture2D(tDiffuse,uv-vec2(0.,blur*.4)).rgb)*.12;
      reflected+=(texture2D(tDiffuse,uv+vec2(blur*2.,blur*.25)).rgb+texture2D(tDiffuse,uv-vec2(blur*2.,blur*.25)).rgb)*.12;
      float weight=clamp(.11+fresnel*.56,0.,.67);vec3 result=mix(color,reflected*.82,weight);
      float fog=smoothstep(20.0,115.0,distanceToEye);result=mix(result,fogColor,fog*.88);
      gl_FragColor=vec4(result,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    }`};
  const water=new Reflector(new THREE.PlaneGeometry(960,960),{textureWidth:size,textureHeight:size,clipBias:.003,multisample:0,color:'#070a0c',shader});
  water.camera.layers.enable(1);water.rotation.x=-Math.PI/2;water.name='WATER_TIDE_RUNTIME';water.frustumCulled=false;
  const reflect=water.onBeforeRender;let lastReflection=-100,moving=true,time=0;
  const lastCameraWorld=new THREE.Matrix4(),lastProjection=new THREE.Matrix4();
  water.onBeforeRender=function(renderer,scene,camera){
    const reflectionTime=performance.now()/1000;
    const cameraChanged=!camera.matrixWorld.equals(lastCameraWorld)||!camera.projectionMatrix.equals(lastProjection);
    if(moving||cameraChanged||reflectionTime-lastReflection>=1/30){reflect.call(water,renderer,scene,camera);lastReflection=reflectionTime;lastCameraWorld.copy(camera.matrixWorld);lastProjection.copy(camera.projectionMatrix);qa.reflectionFrames++;}
  };
  qa.reflection={targets:1,width:size,height:size,clipping:'oblique plane',selfExcluded:true,fogExcluded:false,normalOnly:true,roughReflection:true};
  return {mesh:water,pool,update(t,isMoving){time=t;moving=isMoving;water.material.uniforms.time.value=t;qa.ripple={active:pool.active(t),total:pool.total,capacity:pool.capacity};},resize(isMobile){const n=isMobile?512:1024;water.getRenderTarget().setSize(n,n);water.material.uniforms.texel.value=1/n;pool.capacity=isMobile?4:8;water.material.uniforms.rippleCount.value=pool.capacity;qa.reflection.width=qa.reflection.height=n;},dispose(){water.dispose();water.geometry.dispose();texture.dispose();}};
}
