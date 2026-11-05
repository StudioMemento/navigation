import * as T from 'three';
import {fixtureFor} from './lighting.js';
export function unpackAttribute(attribute){
 const a=new Float32Array(attribute.count*attribute.itemSize);
 for(let i=0;i<attribute.count;i++)for(let j=0;j<attribute.itemSize;j++)a[i*attribute.itemSize+j]=attribute.getComponent(i,j);
 return new T.BufferAttribute(a,attribute.itemSize);
}
export function assembleModel(source,materials,lighting){
 source.updateMatrixWorld(true);const root=new T.Group();root.name='MEMENTO_STUDIO';const meshes=[],shell=[];let dyson=null;
 source.traverse(o=>{
  if(!o.isMesh)return;
  let g=o.geometry.clone();g.setAttribute('position',unpackAttribute(g.attributes.position));g.setAttribute('normal',unpackAttribute(g.attributes.normal));
  g.applyMatrix4(o.matrixWorld);
  if(g.index)g=g.toNonIndexed();
  const positions=g.attributes.position,centers=new Float32Array(positions.count*3),bary=new Float32Array(positions.count*3);
  for(let i=0;i<positions.count;i+=3){const center=new T.Vector3();for(let j=0;j<3;j++)center.add(new T.Vector3().fromBufferAttribute(positions,i+j));center.multiplyScalar(1/3);for(let j=0;j<3;j++){centers.set(center.toArray(),(i+j)*3);bary[(i+j)*3+j]=1;}}
  g.setAttribute('aShardCenter',new T.BufferAttribute(centers,3));g.setAttribute('aBary',new T.BufferAttribute(bary,3));
  g.computeBoundingBox();g.computeBoundingSphere();const bounds=g.boundingBox.clone();
  const isShell=o.userData.zone==='BACKFACE_REVEAL';const fixture=fixtureFor(o.name),category=o.material.name.replace('MEMENTO_','');
  const material=materials.create(category,{shell:isShell,fixtureKind:fixture?.kind||0,bounds,screenBase:o.name==='TV_55'?.025:.24});
  const m=new T.Mesh(g,material);m.name=o.name;m.userData={...o.userData};m.castShadow=!isShell;m.receiveShadow=true;
  if(isShell){shell.push(m);m.renderOrder=1;}
  if(o.name==='DYSON'){
   const center=bounds.getCenter(new T.Vector3());center.y=bounds.min.y;
   g.translate(-center.x,-center.y,-center.z);const sc=g.attributes.aShardCenter;for(let i=0;i<sc.count;i++)sc.setXYZ(i,sc.getX(i)-center.x,sc.getY(i)-center.y,sc.getZ(i)-center.z);g.computeBoundingBox();g.computeBoundingSphere();m.position.copy(center);dyson=m;
  }
  lighting?.bind(m,fixture);meshes.push(m);root.add(m);
 });
 return {root,meshes,shell,dyson};
}
