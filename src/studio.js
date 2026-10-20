import {DataTexture,TextureLoader,LinearFilter,LinearMipmapLinearFilter,Vector2} from 'three/webgpu';
import {uniform,vec2,vec3,screenUV,texture} from 'three/tsl';

// RGB contains three softened mineral depth cards, baked by generate-studio-atlas.
// One small lossless WebP; no startup baking, geometry or additional blur passes.
export async function loadStudioAtlas(){
 try{
  const atlas=await new TextureLoader().loadAsync('/textures/memento-depth.webp');
  atlas.name='Memento / three softened mineral depth cards';
  atlas.flipY=false;atlas.magFilter=LinearFilter;atlas.minFilter=LinearMipmapLinearFilter;atlas.needsUpdate=true;
  return atlas;
 }catch(error){console.warn('Memento backdrop unavailable; retaining studio light.',error);}
}
function emptyAtlas(){const atlas=new DataTexture(new Uint8Array([0,0,0,255]),1,1);atlas.needsUpdate=true;return atlas;}

export function createStudioVoid(scene,atlas=emptyAtlas()){
 const view=uniform(new Vector2(1,1));
 const offsets=[0,1,2].map(()=>uniform(new Vector2()));
 const topPulse=uniform(1),bottomPulse=uniform(1);
 const base=screenUV.sub(.5).mul(view).add(.5);
 const far=texture(atlas,base.add(offsets[0])).r;
 const middle=texture(atlas,base.add(offsets[1])).g;
 const near=texture(atlas,base.add(offsets[2])).b;
 const upper=screenUV.sub(vec2(.45,-.12)).sub(offsets[0]).mul(vec2(1.9,2.2));
 const lower=screenUV.sub(vec2(.56,1.06)).sub(offsets[1]).mul(vec2(2.1,3));
 const upperGlow=upper.dot(upper).mul(-2.2).exp().mul(topPulse);
 const lowerGlow=lower.dot(lower).mul(-2.4).exp().mul(bottomPulse);
 // Warm grazing light reveals only facets. Everything remains behind the model.
 const depth=vec3(.019,.017,.015).mul(far)
  .add(vec3(.021,.014,.008).mul(middle))
  .mul(near.mul(-.72).add(1))
  .add(vec3(.005,.0045,.004).mul(near));
 const lowerFade=screenUV.y.smoothstep(.74,1).mul(-.72).add(1);
 scene.backgroundNode=vec3(.00045,.00048,.00058)
  .add(depth.mul(lowerFade))
  .add(vec3(.030,.018,.008).mul(upperGlow).mul(near.mul(-.48).add(1)))
  .add(vec3(.040,.020,.007).mul(lowerGlow));
 return {atlas,offsets,topPulse,bottomPulse,
  resize(width,height){view.value.set(Math.min(1.23,Math.max(.82,width/height/1.6)),1);},
  update(time,px=0,py=0,position=0,moving=true){
   if(!moving)return; // Pause/reduced motion freezes the background in place.
   const x=Math.max(-1,Math.min(1,px))*.7+Math.sin(time*.105)*.19+Math.sin(position*Math.PI/3)*.28;
   const y=Math.max(-1,Math.min(1,py))*.45+(Math.cos(time*.085)-1)*.12;
   for(let i=0;i<offsets.length;i++)offsets[i].value.set(x*[.006,.014,.025][i],-y*[.004,.010,.018][i]);
   topPulse.value=1+Math.sin(time*.27)*.035;
   bottomPulse.value=1+Math.sin(time*.23+1.2)*.04;
  },
  dispose(){atlas.dispose();}
 };
}
