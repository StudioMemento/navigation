import * as T from 'three';
import { RectAreaLightUniformsLib } from '../vendor/lights/RectAreaLightUniformsLib.js';

export function createLights(scene,data){
  RectAreaLightUniformsLib.init();
  const group=new T.Group();group.name='WEB_LIGHT_TRANSLATION';scene.add(group);
  const globalNames=['ENV_KEY_OVERCAST','ENV_FILL_NEUTRAL','ENV_RIM_CLOUD','ENV_MONOLITH_FACET_KEY'];
  const make=(d)=>{
    const w=d.size||1,h=d.shape==='RECTANGLE'?d.size_y:w;
    const light=new T.RectAreaLight(new T.Color().fromArray(d.color),.58*d.energy/(w*h*Math.PI),w,h);
    light.position.fromArray(d.position);light.quaternion.fromArray(d.quaternion);light.name=d.name;group.add(light);return light;
  };
  globalNames.forEach(n=>{const d=data.lights.find(x=>x.name===n);if(d)make(d);});
  // Eight local lights follow the active lighting rig; source geometry is untouched.
  const local=[];
  const roles=['ICON_SATIN_01_KEY','ICON_SATIN_01_FILL','ICON_SATIN_01_RIM','ICON_SATIN_01_FRONT','STAGE_REFLECT_01_KEY','STAGE_REFLECT_01_EDGE','STG_01_V2_SHAFT_KEY','STG_01_V2_SHAFT_RIM'];
  for(const name of roles){const d=data.lights.find(x=>x.name===name);if(d)local.push({light:make(d),template:name});}
  const sunSource=data.lights.find(x=>x.name==='ENV_DISTANT_MONOLITH_LIGHT');
  const sun=new T.DirectionalLight(0xcbd6e6,.18);sun.position.set(-80,120,60);group.add(sun);
  const hemi=new T.HemisphereLight(0xb5bdca,0x32261d,.13);group.add(hemi);
  let previous=-1;
  return (index,transition=null)=>{
    if(index===previous&&!transition)return;previous=transition?-1:index;
    for(const {light,template} of local){const name=template.replace('_01_','_'+String(index+1).padStart(2,'0')+'_'),d=data.lights.find(x=>x.name===name);if(!d)continue;
      light.position.fromArray(d.position);light.quaternion.fromArray(d.quaternion);light.color.fromArray(d.color);
      light.width=d.size;light.height=d.shape==='RECTANGLE'?d.size_y:d.size;light.intensity=.58*d.energy/(light.width*light.height*Math.PI);
      // A continuous blend avoids a visible lighting cut during camera orbit.
      if(transition){const nextName=template.replace('_01_','_'+String(transition.to+1).padStart(2,'0')+'_'),next=data.lights.find(x=>x.name===nextName),u=T.MathUtils.smoothstep(transition.elapsed/3,0,1);if(next){light.position.lerp(new T.Vector3().fromArray(next.position),u);light.quaternion.slerp(new T.Quaternion().fromArray(next.quaternion),u);light.intensity=T.MathUtils.lerp(light.intensity,.58*next.energy/(next.size*(next.shape==='RECTANGLE'?next.size_y:next.size)*Math.PI),u);}}
    }
  };
}

export class Atmosphere {
  constructor(renderer,scene,camera){
    Object.assign(this,{renderer,scene,camera});
    this.target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:true,stencilBuffer:false});
    this.target.depthTexture=new T.DepthTexture(1,1,T.UnsignedIntType);
    this.uniforms={tColor:{value:this.target.texture},tDepth:{value:this.target.depthTexture},uInvProj:{value:new T.Matrix4()},uCam:{value:new T.Matrix4()},uResolution:{value:new T.Vector2()},uTime:{value:0},uSteps:{value:16},uFog:{value:1},uBloom:{value:.045}};
    const material=new T.ShaderMaterial({depthWrite:false,depthTest:false,uniforms:this.uniforms,vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
      fragmentShader:`
      varying vec2 vUv;uniform sampler2D tColor,tDepth;uniform mat4 uInvProj,uCam;uniform vec2 uResolution;uniform float uTime,uSteps,uFog,uBloom;
      float hash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
      float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
      float fbm(vec3 p){return noise(p)*.57+noise(p*2.07+13.4)*.28+noise(p*4.11+32.5)*.15;}
      vec3 bright(vec2 uv){vec3 c=texture2D(tColor,uv).rgb;return max(c-vec3(1.1),vec3(0.));}
      void main(){
        vec3 base=texture2D(tColor,vUv).rgb;float depth=texture2D(tDepth,vUv).x;
        vec4 p=uInvProj*vec4(vUv*2.-1.,depth*2.-1.,1.);p/=p.w;
        vec3 origin=uCam[3].xyz,end=(uCam*vec4(p.xyz,1.)).xyz,ray=normalize(end-origin);
        float distanceToSurface=min(length(end-origin),580.);
        float trans=1.;vec3 fog=vec3(0.);
        for(int i=0;i<20;i++){
          if(float(i)>=uSteps)break;
          float a=float(i)/uSteps,b=(float(i)+1.)/uSteps;
          float stepSize=(b*b-a*a)*distanceToSurface;
          vec3 w=origin+ray*(a*a*distanceToSurface+stepSize*.5);
          float radius=length(w.xz),radial=mix(.13,1.,smoothstep(70.,125.,radius));
          float n=fbm(w*vec3(.025,.065,.025)+vec3(sin(uTime*.157)*.07,0.,cos(uTime*.157)*.05));
          float ceiling=exp(-pow((w.y-87.)*.034,4.))*.064*smoothstep(.25,.62,n);
          float sea=exp(-pow((w.y+24.)*.075,2.))*.07+exp(-pow((w.y+44.)*.043,2.))*.043;
          float veil=exp(-pow((w.y+10.)*.16,2.))*.02;
          float banks=exp(-pow((w.y-8.)*.07,2.))*.025*smoothstep(105.,175.,radius);
          float density=(sea*mix(.45,1.,radial)+veil*radial+banks)*smoothstep(.28,.7,n)+ceiling;
          density*=uFog;
          float alpha=1.-exp(-density*stepSize);
          // Brightest source HDR direction, transformed from Blender Mapping.
          float sunset=pow(max(0.,dot(ray,normalize(vec3(.949,-.035,-.314)))),5.);
          vec3 color=mix(vec3(.18,.20,.235),vec3(.34,.235,.15),sunset*.5);
          color=mix(color,vec3(.014,.019,.027),smoothstep(-4.,18.,w.y));
          color*=mix(.72,1.1,n);
          float inner=exp(-pow((length(w.xz)-35.)*.06,2.))*exp(-pow((w.y+12.)*.065,2.));
          color+=vec3(.17,.073,.02)*inner;
          fog+=trans*alpha*color;trans*=1.-alpha;
        }
        vec2 px=1./uResolution;vec3 bloom=bright(vUv+vec2(3.,0.)*px)+bright(vUv-vec2(3.,0.)*px)+bright(vUv+vec2(0.,3.)*px)+bright(vUv-vec2(0.,3.)*px);
        gl_FragColor=vec4(base*trans+fog+bloom*uBloom,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        gl_FragColor.rgb=clamp((gl_FragColor.rgb-vec3(.18))*1.16+vec3(.18),0.,1.);
      }`});
    this.quadScene=new T.Scene();this.quadScene.add(new T.Mesh(new T.PlaneGeometry(2,2),material));this.quadCamera=new T.Camera();
  }
  resize(w,h,mobile){this.target.setSize(w,h);this.uniforms.uResolution.value.set(w,h);this.uniforms.uSteps.value=mobile?12:18;}
  render(time){
    this.uniforms.uInvProj.value.copy(this.camera.projectionMatrixInverse);this.uniforms.uCam.value.copy(this.camera.matrixWorld);this.uniforms.uTime.value=time;
    this.renderer.toneMapping=T.NoToneMapping;this.renderer.setRenderTarget(this.target);this.renderer.render(this.scene,this.camera);
    this.renderer.toneMapping=T.AgXToneMapping;this.renderer.setRenderTarget(null);this.renderer.render(this.quadScene,this.quadCamera);
  }
}
