// Shared setup used by the browser and the offline GLB poster renderer.
export function createDioramaStage(T, object, world) {
  const scene=new T.Scene(), root=new T.Group();
  const bounds=new T.Box3().setFromObject(object), center=bounds.getCenter(new T.Vector3()), size=bounds.getSize(new T.Vector3());
  const scale=3.15/size.x;
  object.position.sub(center).multiplyScalar(scale);object.scale.multiplyScalar(scale);
  root.add(object);root.rotation.y=world.yaw;scene.add(root);
  object.traverse(o=>{if(!o.isMesh)return;o.frustumCulled=false;
    for(const m of [].concat(o.material)) {
      m.roughness=.82;m.metalness=.16;m.normalScale?.set(.7,.7);
      m.emissiveIntensity=.6;m.side=T.DoubleSide;m.needsUpdate=true;
    }
  });
  const ambient=new T.HemisphereLight('#dce5ee','#282019',2.7);scene.add(ambient);
  const key=new T.DirectionalLight('#fff0dc',4.2);key.position.set(-3,5,5);scene.add(key);
  const rim=new T.DirectionalLight(world.color,2.7);rim.position.set(3,3,-4);scene.add(rim);
  const fill=new T.DirectionalLight('#e4efff',1.1);fill.position.set(4,0,6);scene.add(fill);
  const camera=new T.OrthographicCamera(-2,2,2,-2,.1,40);
  camera.position.set(0,world.elevation,8.45);camera.lookAt(0,0,0);camera.updateMatrixWorld();
  scene.updateMatrixWorld(true);
  const b=new T.Box3().setFromObject(root), projected=new T.Box3();
  for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])projected.expandByPoint(new T.Vector3(x,y,z).applyMatrix4(camera.matrixWorldInverse));
  const span=Math.max(projected.max.x-projected.min.x,projected.max.y-projected.min.y)*1.09;
  const cx=(projected.min.x+projected.max.x)/2,cy=(projected.min.y+projected.max.y)/2;
  camera.left=cx-span/2;camera.right=cx+span/2;camera.top=cy+span/2;camera.bottom=cy-span/2;camera.updateProjectionMatrix();
  return {scene,root,camera,ambient,rim,world};
}
