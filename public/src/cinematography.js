import {clamp} from './navigation.js';
export const RIG={radius:16,startAngle:-Math.PI/5,cameraHeight:.24,iconAnchorY:1.75,platformTop:.025,platformThicknessScale:.32,platformOffsetY:-.0262,fovDesktop:36,fovPortrait:46,hdriYaw:135};
export function pentagonLayout(stages){return stages.map((stage,index)=>{const angle=RIG.startAngle+index*Math.PI*2/5;return{id:stage.id,angle,position:[Math.sin(angle)*RIG.radius,0,Math.cos(angle)*RIG.radius],yaw:angle};});}
export function focusPoses(layout,aspect){
  const portrait=aspect<.8,fov=portrait?RIG.fovPortrait:RIG.fovDesktop;
  // Fit the full 4.4 m disc on portrait, while retaining a close hero on desktop.
  const distance=Math.max(portrait?9.2:8.6,4.4/(2*Math.tan(fov*Math.PI/360)*aspect*.9));
  const targetHeight=portrait?.9:.95;
  return layout.map(item=>({position:[item.position[0]+Math.sin(item.angle)*distance,RIG.cameraHeight,item.position[2]+Math.cos(item.angle)*distance],target:[item.position[0],targetHeight,item.position[2]],fov}));
}
export function titlePosition(projectedPlatform,viewport){return clamp(projectedPlatform+viewport*.075,viewport*.65,viewport*.86);}
export function applyArtDirection(THREE,root,done=new Set()){
  root.traverse(object=>{if(!object.isMesh)return;for(const material of Array.isArray(object.material)?object.material:[object.material]){
    if(done.has(material))continue;done.add(material);
    if(material.name==='MAT_Platform'){
      material.color.set('#111517');material.metalness=.58;material.roughness=.66;material.envMapIntensity=.38;
      // Existing mapped top faces were reading almost white under grazing HDR light.
      material.metalnessMap=null;material.roughnessMap=null;
    }else if(material.name==='MAT_Graphite'){
      material.color.set('#45474a');material.metalness=.78;material.roughness=.4;material.envMapIntensity=.6;
      if(material.normalScale)material.normalScale.set(.45,.45);
    }else if(material.emissive?.getHex()>0){material.emissive.set('#ff7950');material.emissiveIntensity=1.6;}
    material.needsUpdate=true;
  }});return done;
}
