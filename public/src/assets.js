// Revision selection and resource sharing are independent of camera/navigation.
export const DEFAULT_REVISION='v009';
const shareableMaterials=new Set(['MAT_Graphite','MAT_Platform']);
const omittedMaterialKeys=new Set(['id','uuid','version','name','userData','_listeners']);
export function assetConfiguration(search,portrait=false){
  const params=new URLSearchParams(search),request=params.get('textures');
  if(request&&!['desktop','mobile'].includes(request))throw new Error('Unknown texture quality: '+request);
  const quality=request||(portrait?'mobile':'desktop');
  return{revision:DEFAULT_REVISION,tier:'optimized',quality,prefix:'/family_v007/'+(quality==='mobile'?'mobile/':'')+'optimized/'};
}
export function assetEntryPoints(){return{neighbors:'family_neighbors.glb',neighborsRequired:true,contract:['/data/scene_contract_world_v008.json'],cameras:['/data/cameras_family_v007.json']};}

export async function fetchDataWithFallback(paths,fetcher=fetch){
  const unavailable=[];
  for(const path of paths){
    const response=await fetcher(path);
    if(!response.ok){unavailable.push({path,status:response.status});continue;}
    // A present but malformed file is a real defect; do not silently mask it.
    return{value:await response.json(),path,unavailable};
  }
  throw new Error('Required scene data unavailable: '+paths.join(', '));
}

function ordered(value){
  if(Array.isArray(value))return value.map(ordered);
  if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(key=>[key,ordered(value[key])]));
  return value;
}
export const stableStringify=value=>JSON.stringify(ordered(value));

export function textureFingerprint(texture,imageSha256){
  // Image bytes alone are insufficient: UV transforms and color space affect sampling.
  const fields=['mapping','channel','wrapS','wrapT','wrapR','magFilter','minFilter','anisotropy','format','internalFormat','type','colorSpace','flipY','premultiplyAlpha','unpackAlignment','generateMipmaps','rotation','matrixAutoUpdate'];
  const data={imageSha256};
  for(const key of fields)if(texture[key]!==undefined)data[key]=texture[key];
  for(const key of ['offset','repeat','center'])if(texture[key])data[key]=texture[key].toArray();
  if(texture.matrixAutoUpdate===false&&texture.matrix)data.matrix=texture.matrix.toArray();
  return stableStringify(data);
}

function parameter(value){
  if(value===null||['string','number','boolean'].includes(typeof value))return value;
  if(Array.isArray(value))return value.map(parameter);
  if(value?.toArray)return value.toArray();
  if(value&&Object.getPrototypeOf(value)===Object.prototype){
    const result={};for(const [key,item] of Object.entries(value)){const parsed=parameter(item);if(parsed===undefined)return undefined;result[key]=parsed;}return result;
  }
  return undefined;
}

export function materialFingerprint(material,textureKeys){
  if(!shareableMaterials.has(material.name)||!['MeshStandardMaterial','MeshPhysicalMaterial'].includes(material.type))return null;
  const data={canonicalName:material.name};
  for(const key of Object.keys(material).sort()){
    if(omittedMaterialKeys.has(key))continue;
    const value=material[key];
    if(value?.isTexture){const fingerprint=textureKeys.get(value);if(!fingerprint)return null;data[key]=fingerprint;continue;}
    if(value===undefined)continue;
    // Unknown callbacks or custom render state are deliberately not canonicalized.
    const parsed=parameter(value);if(parsed===undefined)return null;data[key]=parsed;
  }
  return stableStringify(data);
}

function textureDefinition(parser,material,texture,slot){
  let index=parser.associations.get(texture)?.textures;
  if(index===undefined){
    const definition=parser.json.materials?.[parser.associations.get(material)?.materials];
    const pbr=definition?.pbrMetallicRoughness;
    const fields={map:pbr?.baseColorTexture,metalnessMap:pbr?.metallicRoughnessTexture,roughnessMap:pbr?.metallicRoughnessTexture,normalMap:definition?.normalTexture,aoMap:definition?.occlusionTexture,emissiveMap:definition?.emissiveTexture,anisotropyMap:definition?.extensions?.KHR_materials_anisotropy?.anisotropyTexture};
    index=fields[slot]?.index;
  }
  return index===undefined?null:parser.json.textures?.[index];
}

export async function poolAssetResources(results,{digest=async bytes=>{
  const hash=await crypto.subtle.digest('SHA-256',bytes);
  return Array.from(new Uint8Array(hash),value=>value.toString(16).padStart(2,'0')).join('');
}}={}){
  const textures=new Map(),materials=new Map(),textureKeys=new Map(),oldTextures=new Set(),oldMaterials=new Set(),allTextures=new Set(),allMaterials=new Set(),allMeshes=[];
  const stats={texturesBefore:0,texturesAfter:0,texturesShared:0,materialsBefore:0,materialsAfter:0,materialsShared:0,unfingerprintedTextures:0,imageHashes:[]};
  for(const result of results.filter(Boolean)){
    const parser=result.parser,imageHashes=new Map(),assetMaterials=new Set();
    result.scene.traverse(object=>{if(!object.isMesh)return;allMeshes.push(object);for(const material of Array.isArray(object.material)?object.material:[object.material])assetMaterials.add(material);});
    for(const material of assetMaterials){
      allMaterials.add(material);
      for(const [slot,texture] of Object.entries(material)){
        if(!texture?.isTexture)continue;
        allTextures.add(texture);
        const definition=textureDefinition(parser,material,texture,slot),imageIndex=definition?.source;
        const image=parser.json.images?.[imageIndex];
        // Embedded production GLB only. Unknown/external image identities stay separate.
        if(image?.bufferView===undefined){stats.unfingerprintedTextures++;continue;}
        if(!imageHashes.has(imageIndex))imageHashes.set(imageIndex,digest(await parser.getDependency('bufferView',image.bufferView)));
        const hash=await imageHashes.get(imageIndex),key=textureFingerprint(texture,hash);
        textureKeys.set(texture,key);
        const shared=textures.get(key);
        if(shared&&shared!==texture){material[slot]=shared;oldTextures.add(texture);}
        else if(!shared)textures.set(key,texture);
      }
      const key=materialFingerprint(material,textureKeys);
      if(key&&!materials.has(key))materials.set(key,material);
    }
    for(const pending of imageHashes.values())stats.imageHashes.push(await pending);
  }
  for(const mesh of allMeshes){
    const replace=material=>{
      const key=materialFingerprint(material,textureKeys),shared=key&&materials.get(key);
      if(shared&&shared!==material){oldMaterials.add(material);return shared;}return material;
    };
    mesh.material=Array.isArray(mesh.material)?mesh.material.map(replace):replace(mesh.material);
  }
  const liveMaterials=new Set(),liveTextures=new Set();
  for(const mesh of allMeshes)for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material]){
    liveMaterials.add(material);for(const value of Object.values(material))if(value?.isTexture)liveTextures.add(value);
  }
  // This runs before the first render. Do not close image bitmaps: parser references
  // may still share a Source even when a discarded Texture is unreferenced.
  for(const texture of oldTextures)if(!liveTextures.has(texture))texture.dispose();
  for(const material of oldMaterials)if(!liveMaterials.has(material))material.dispose();
  stats.texturesBefore=allTextures.size;stats.texturesAfter=liveTextures.size;stats.texturesShared=stats.texturesBefore-stats.texturesAfter;
  stats.materialsBefore=allMaterials.size;stats.materialsAfter=liveMaterials.size;stats.materialsShared=stats.materialsBefore-stats.materialsAfter;
  stats.imageHashes=[...new Set(stats.imageHashes)];
  stats.textures=[...liveTextures].map(texture=>({name:texture.name,width:texture.image?.width||0,height:texture.image?.height||0,channel:texture.channel,colorSpace:texture.colorSpace,generateMipmaps:texture.generateMipmaps}));
  stats.estimatedMaterialTextureMiB=stats.textures.reduce((total,texture)=>total+texture.width*texture.height*4*(texture.generateMipmaps?4/3:1)/1048576,0);
  stats.memoryEstimateNote='RGBA8 plus complete mip-chain estimate for PNG material maps; excludes HDR/PMREM, water, render targets, geometry and driver overhead. Not queried GPU bytes.';
  return stats;
}
