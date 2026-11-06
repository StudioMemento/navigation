import * as T from 'three';
import {fixtureFor} from './lighting.js';
import {displaySeed} from './screens.js';
export function unpackAttribute(attribute){
 const a=new Float32Array(attribute.count*attribute.itemSize);
 for(let i=0;i<attribute.count;i++)for(let j=0;j<attribute.itemSize;j++)a[i*attribute.itemSize+j]=attribute.getComponent(i,j);
 return new T.BufferAttribute(a,attribute.itemSize);
}
export function assembleModel(source,materials,lighting){
 source.updateMatrixWorld(true);const root=new T.Group();root.name='MEMENTO_STUDIO';const meshes=[],shell=[];let dyson=null;const dysonParts=[];
 source.traverse(o=>{
  if(!o.isMesh)return;
  let g=o.geometry.clone();g.setAttribute('position',unpackAttribute(g.attributes.position));g.setAttribute('normal',unpackAttribute(g.attributes.normal));
  g.applyMatrix4(o.matrixWorld);
  if(o.material.normalMap&&g.attributes.uv){const uv=unpackAttribute(g.attributes.uv);for(let i=0;i<uv.count;i++)uv.setY(i,1-uv.getY(i));g.setAttribute('uv',uv);}
  if(g.index)g=g.toNonIndexed();
  const positions=g.attributes.position,centers=new Float32Array(positions.count*3),bary=new Float32Array(positions.count*3);
  for(let i=0;i<positions.count;i+=3){const center=new T.Vector3();for(let j=0;j<3;j++)center.add(new T.Vector3().fromBufferAttribute(positions,i+j));center.multiplyScalar(1/3);for(let j=0;j<3;j++){centers.set(center.toArray(),(i+j)*3);bary[(i+j)*3+j]=1;}}
  g.setAttribute('aShardCenter',new T.BufferAttribute(centers,3));g.setAttribute('aBary',new T.BufferAttribute(bary,3));
  g.computeBoundingBox();g.computeBoundingSphere();const bounds=g.boundingBox.clone();
  const isShell=o.userData.zone==='BACKFACE_REVEAL';const logicalName=o.userData.logicalName||o.name;const fixture=fixtureFor(logicalName),category=o.userData.category||o.material.name.replace('MEMENTO_','').split('__')[0];
  const material=materials.create(category,{shell:isShell,fixtureKind:fixture?.kind||0,bounds,screenBase:logicalName==='TV_55'?.025:logicalName.includes('ULTRAWIDE')?.24:.025,screenSeed:displaySeed(logicalName),normalMap:o.material.normalMap,graphiteAlbedo:o.material.userData.graphiteAlbedo});
  const m=new T.Mesh(g,material);m.name=o.userData.name||o.name;m.userData={...o.userData};m.castShadow=!isShell;m.receiveShadow=true;
  if(isShell){shell.push(m);m.renderOrder=1;}
  if(logicalName==='DYSON'){dysonParts.push(m);}
  lighting?.bind(m,fixture);meshes.push(m);root.add(m);
 });
 if(dysonParts.length){const box=new T.Box3();dysonParts.forEach(m=>box.expandByObject(m));const center=box.getCenter(new T.Vector3());center.y=box.min.y;dyson=new T.Group();dyson.name='DYSON_PIVOT';dyson.position.copy(center);for(const m of dysonParts){m.position.sub(center);dyson.add(m);}root.add(dyson);}
 return {root,meshes,shell,dyson};
}
