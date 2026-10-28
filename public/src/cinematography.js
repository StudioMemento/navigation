import {clamp} from './navigation.js';
export const RIG={radius:16,startAngle:-Math.PI/5,cameraHeight:.24,iconAnchorY:1.75,platformTop:.025,platformThicknessScale:.32,platformOffsetY:-.0262,fovDesktop:36,fovPortrait:46,hdriYaw:135};
export function pentagonLayout(stages){return stages.map((stage,index)=>{const angle=RIG.startAngle+index*Math.PI*2/5;return{id:stage.id,angle,position:[Math.sin(angle)*RIG.radius,0,Math.cos(angle)*RIG.radius],yaw:angle};});}
export function focusPoses(layout,aspect){
  const portrait=aspect<.8,fov=portrait?RIG.fovPortrait:RIG.fovDesktop;
  // Fit the full 4.4 m disc on portrait, while retaining a close hero on desktop.
  const distance=Math.max(portrait?9.2:10.0,4.4/(2*Math.tan(fov*Math.PI/360)*aspect*.9));
  const targetHeight=portrait?.9:.95;
  return layout.map(item=>({position:[item.position[0]+Math.sin(item.angle)*distance,RIG.cameraHeight,item.position[2]+Math.cos(item.angle)*distance],target:[item.position[0],targetHeight,item.position[2]],fov}));
}
export function titlePosition(projectedPlatform,viewport){return clamp(projectedPlatform+viewport*.075,viewport*.65,viewport*.86);}
const surfaceNoise=`
  varying vec3 vTideSurface;
  float tideHash(vec3 p){p=fract(p*.3183099+vec3(.17,.13,.11));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
  float tideNoise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(tideHash(i),tideHash(i+vec3(1,0,0)),f.x),mix(tideHash(i+vec3(0,1,0)),tideHash(i+vec3(1,1,0)),f.x),f.y),mix(mix(tideHash(i+vec3(0,0,1)),tideHash(i+vec3(1,0,1)),f.x),mix(tideHash(i+vec3(0,1,1)),tideHash(i+vec3(1,1,1)),f.x),f.y),f.z);}
`;
export function applyArtDirection(THREE,root,done=new Set()){
  root.traverse(object=>{if(!object.isMesh)return;for(const material of Array.isArray(object.material)?object.material:[object.material]){
    if(done.has(material))continue;done.add(material);
    if(material.name==='MAT_Platform'){
      material.color.set('#0a0e11');material.metalness=.32;material.roughness=.82;material.envMapIntensity=.22;
      material.metalnessMap=null;material.roughnessMap=null;
    }else if(material.name==='MAT_Graphite'){
      material.color.set('#929089');material.metalness=.84;material.roughness=.56;material.envMapIntensity=.68;
      material.metalnessMap=null;material.roughnessMap=null;
      if(material.normalScale)material.normalScale.set(.8,.8);
      material.onBeforeCompile=shader=>{
        shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vTideSurface;').replace('#include <begin_vertex>','#include <begin_vertex>\nvTideSurface=position;');
        shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\n'+surfaceNoise).replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
          float tideGrain=tideNoise(vTideSurface*135.);float tideMacro=tideNoise(vTideSurface*8.);
          roughnessFactor=.34+tideGrain*.22+tideMacro*.13;
          diffuseColor.rgb*=.79+tideGrain*.27+tideMacro*.12;`);
      };
      material.customProgramCacheKey=()=> 'tide-graphite-v012';
    }else if(material.name.startsWith('MAT_Mountain')){
      material.color.set('#22272b');material.roughness=1;material.metalness=0;material.envMapIntensity=.1;
    }else if(material.emissive?.getHex()>0){material.emissive.set('#ff7950');material.emissiveIntensity=2.2;}
    material.needsUpdate=true;
  }});return done;
}
