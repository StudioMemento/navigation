import * as T from 'three';
import {shaderById} from './config.js';
import {atlasSurface} from './atlas-adapter.js';
import {screenGLSL} from './screens.js';
export const commonNoise=`float hash31(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}float isStyle(float a,float b){return 1.-step(.2,abs(a-b));}`;
export function makeUniforms(){const p=shaderById[10].values;return {
 uMode:{value:10},uA:{value:p.a},uB:{value:p.b},uC:{value:p.c},uEmission:{value:p.emission},uExposure:{value:p.exposure},uAccent:{value:new T.Color('#e1d9c9')},
 uTime:{value:0},uReveal:{value:0},uShell:{value:0},uFade:{value:1},uCell:{value:.065},uOrigin:{value:new T.Vector3()},uPointScale:{value:450},uPerspective:{value:0},uProjectionDistance:{value:12},
 uKeyDir:{value:new T.Vector3(-3,6,4).normalize()},uRigTint:{value:new T.Color(1,1,1)},uRigEnergy:{value:1},uGobo:{value:0},uGoboMix:{value:0},uGoboTime:{value:0},uScreenPower:{value:1}
 };}
const baseColors={ARCHITECTURE:0x96928b,FURNITURE:0x656569,FOLIAGE:0x5d705c,HARDWARE:0x77808a,LIGHTING:0x8a8781,SCREEN:0x353b43,POLYMER:0x515961,TEXTILE:0x999189};
export const vertexPrelude=/*glsl*/`
 uniform float uTime,uMode,uA,uB,uC,uPointScale,uPerspective,uProjectionDistance;
 attribute vec3 aBary;
 #ifdef STUDIO_VOXEL
 attribute vec3 aOffset;
 #endif
 varying vec3 vStudio,vStudioNormal,vStudioBary;
 varying vec3 vAffine;
`;
export const shaderPrelude=/*glsl*/`
 uniform float uTime,uMode,uA,uB,uC,uEmission,uCell,uReveal,uShell,uShellObject,uFixture,uFixtureKind,uScreenBase,uScreenSeed,uRigEnergy,uGobo,uGoboMix,uGoboTime,uScreenPower;
 uniform vec3 uObjectMin,uObjectMax,uAlbedo,uOrigin,uAccent,uRigTint,uKeyDir;
 varying vec3 vStudio,vStudioNormal,vStudioBary;varying vec3 vAffine;
 ${atlasSurface}
 ${screenGLSL}
 float projectedLight(vec3 p){
  float pattern=1.;vec2 q=vec2(p.z+p.x*.34,p.y+p.x*.24);
  if(uGobo==1.){vec2 cell=abs(fract(q*vec2(.7,.85))-.5);pattern=.12+.88*smoothstep(.04,.09,min(cell.x,cell.y));}
  if(uGobo==2.){float v=sin((q.y+q.x*.3)*22.);pattern=.07+.93*smoothstep(-.12,.15,v);}
  if(uGobo==3.){float leaf=atlasNoise(vec3(q*5.,uGoboTime*.06));pattern=.12+.88*smoothstep(.40,.64,leaf);}
  return mix(1.,pattern,uGoboMix);
 }
`;
export class MaterialSystem {
 constructor(shared){this.u=shared;this.materials=[];this.selected=10;this.progress=1;this.pending=null;this.elapsed=0;}
 create(category,{shell=false,fixtureKind=0,bounds=null,screenBase=.24,normalMap=null,graphiteAlbedo=[.214,.214,.214],screenSeed=0,voxel=false}={}){
 const mat=new T.MeshStandardMaterial({color:baseColors[category]||baseColors.FURNITURE,roughness:1,metalness:0,normalMap,normalScale:new T.Vector2(.65,.65),fog:false,vertexColors:!voxel,side:category==='FOLIAGE'||shell?T.DoubleSide:T.FrontSide,envMapIntensity:0,transparent:true,forceSinglePass:true,depthWrite:!shell});
 mat.name=category;mat.defines={...(voxel?{STUDIO_VOXEL:1}:{})};
 const local={uAlbedo:{value:new T.Vector3(...graphiteAlbedo)},uShellObject:{value:shell?1:0},uFixture:{value:1},uFixtureKind:{value:fixtureKind},uScreenBase:{value:screenBase},uScreenSeed:{value:screenSeed},uObjectMin:{value:bounds?.min.clone()||new T.Vector3()},uObjectMax:{value:bounds?.max.clone()||new T.Vector3(1,1,1)}};mat.userData.local=local;mat.userData.voxel=voxel;
 mat.onBeforeCompile=shader=>{
 Object.assign(shader.uniforms,this.u,local);shader.vertexShader=vertexPrelude+'\n'+shader.vertexShader;
 shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
 #ifdef STUDIO_VOXEL
 transformed+=aOffset;
 #endif
 if(uMode==8.){float t=floor(uTime*8.)/8.;transformed+=normal*sin(transformed.y*55.+transformed.x*23.+t*2.)*.0028*uB;}
 vStudio=(modelMatrix*vec4(transformed,1.)).xyz;vStudioNormal=normalize(mat3(modelMatrix)*normal);vStudioBary=aBary;
 `).replace('#include <project_vertex>',`#include <project_vertex>
 vAffine=vec3(0.,0.,1.);
 #ifdef USE_NORMALMAP
 vAffine=vec3(uv*gl_Position.w,gl_Position.w);
 #endif
 if(uMode==7.){float res=mix(1200.,140.,uA);gl_Position.xy=floor(gl_Position.xy/gl_Position.w*res+.5)/res*gl_Position.w;}
 `);
 shader.fragmentShader=shaderPrelude+'\n'+shader.fragmentShader;
 shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',T.ShaderChunk.normal_fragment_maps.replace('texture2D( normalMap, vNormalMapUv )','texture2D( normalMap, mix(vNormalMapUv,vAffine.xy/vAffine.z,uMode==7.?uC:0.) )'));
 shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>',`#include <clipping_planes_fragment>
 if(uShellObject>.5&&uShell<.004)discard;
 `).replace('#include <color_fragment>',`#include <color_fragment>
 diffuseColor.a*=mix(1.,uShell,uShellObject)*uReveal;
 `).replace('#include <opaque_fragment>',`
 vec3 atlasNormal=normalize(inverseTransformDirection(normal,viewMatrix));
 vec3 atlasBase=diffuseColor.rgb;
 vec3 atlasLight=(reflectedLight.directDiffuse+reflectedLight.indirectDiffuse)/max(diffuseColor.rgb,vec3(.008));
 atlasLight=clamp(atlasLight,vec3(.015),vec3(5.))*projectedLight(vStudio);
 float atlasShade=dot(atlasLight,vec3(.2126,.7152,.0722));
 vec3 emission=vec3(0.);float displayCoverage=0.;
 if(uFixtureKind==2.){vec3 uvw=(vStudio-uObjectMin)/max(uObjectMax-uObjectMin,vec3(.001));displayCoverage=screenMask(vStudio,normalize(vStudioNormal));emission=displayArt(vec2(uvw.x,(uvw.y-uScreenBase)/(1.-uScreenBase)),uScreenSeed)*displayCoverage*uFixture*min(2.,uScreenPower);}
 if(uFixtureKind==1.){float h=(vStudio.y-uObjectMin.y)/max(.001,uObjectMax.y-uObjectMin.y);emission=vec3(1.8,.9,.35)*uFixture*smoothstep(.0,.65,-atlasNormal.y)*smoothstep(.64,.8,h);}
 if(uFixtureKind==3.)emission=vec3(1.8,.9,.4)*uFixture;
 if(uFixtureKind==4.){float bottom=1.-smoothstep(uObjectMin.y+.025,uObjectMin.y+.10,vStudio.y);emission=vec3(2.3,1.8,1.2)*uFixture*bottom*smoothstep(.02,.6,-atlasNormal.y);}
 vec4 styled=atlasSurface(uMode,uA,uB,uC,atlasBase,vec3(0.),atlasNormal,atlasLight,atlasShade);
 // Screens and real fixture surfaces stay emissive even in the pencil/clay modes.
 outgoingLight=styled.rgb*(1.-displayCoverage*.92)+emission*uEmission;
 diffuseColor.a*=styled.a;
 #include <opaque_fragment>`);
 };
 mat.customProgramCacheKey=()=>voxel?'studio-atlas-voxel-v1':'studio-atlas-surface-v1';this.materials.push(mat);return mat;
 }
 apply(id){const p=shaderById[id];if(!p)return;this.u.uMode.value=id;for(const key of ['a','b','c','emission','exposure'])this.u['u'+key[0].toUpperCase()+key.slice(1)].value=p.values[key];this.u.uAccent.value.set(p.accent);}
 choose(id){if(!shaderById[id])return;this.selected=id;this.pending=id;this.elapsed=0;this.progress=0;}
 update(dt,reduced=false){
 if(this.pending!==null){this.elapsed+=dt;if(this.elapsed>.13||reduced){this.apply(this.pending);this.pending=null;}}
 this.progress=reduced?1:Math.min(1,this.progress+dt/.48);this.u.uFade.value=.83+.17*Math.abs(Math.cos(this.progress*Math.PI));
 const mode=this.u.uMode.value,fxTransparent=[13,15,16].includes(mode);
 for(const m of this.materials){const local=m.userData.local,shell=local.uShellObject.value>.5;// Keep one compiled pipeline; alpha and depth vary without recompilation.
 m.depthWrite=(!shell||this.u.uShell.value>.985)&&!fxTransparent;
 m.visible=(!shell||this.u.uShell.value>.001)&&(m.userData.voxel||![3,14].includes(mode)||local.uFixtureKind.value===2);
 }
 }
}
