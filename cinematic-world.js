import * as T from './vendor/three.module.min.js';
import {GLTFLoader} from './vendor/addons/loaders/GLTFLoader.js';

// The complete world and its PBR maps are authored and baked in Blender.
// Keep stock Three materials: no onBeforeCompile injection on scene geometry.
const asset = name => `./assets/offset/${name}`;
export async function loadCinematicWorld({scene,renderer,camera,canvas,anchors,onReady,onError}) {
  let original=null;
  const software=canvas.dataset.renderer==='software';
  try {
    const gltf=await new GLTFLoader().loadAsync(asset('offset-world.glb'));
    const model=gltf.scene,remove=[],pickable=[],roots=[],materials=new Set();
    model.name='OFFSET_BLENDER_WORLD';
    model.traverse(o=>{
      if(o.isCamera||o.isLight||o.name.startsWith('FX_'))remove.push(o);
      const match=o.name.match(/^STATION_(\d)_/);if(match)roots[Number(match[1])]=o;
      if(o.isMesh){o.castShadow=!o.name.includes('mountain');o.receiveShadow=true;for(const m of [].concat(o.material))materials.add(m);}
    });
    remove.forEach(o=>o.removeFromParent());
    roots.forEach((g,i)=>g.traverse(o=>{if(o.isMesh){o.userData.domain=i;pickable.push(o);}}));
    if(roots.filter(Boolean).length!==5)throw new Error('The Blender scene must contain five station roots.');
    original={objects:scene.children.map(o=>[o,o.visible]),background:scene.background,fog:scene.fog,environment:scene.environment};
    scene.children.forEach(o=>o.visible=false);scene.add(model);
    scene.background=new T.Color('#353b40');scene.fog=new T.FogExp2('#555451',.0085);
    materials.forEach(m=>{
      for(const map of [m.map,m.normalMap,m.roughnessMap,m.metalnessMap])if(map)map.anisotropy=software?1:Math.min(8,renderer.capabilities.getMaxAnisotropy());
      if(m.normalScale)m.normalScale.setScalar(.7);
      if(m.name==='MAT_dark_floor'){m.roughness=.72;m.metalness=.42;}
      if(m.name==='MAT_amber_core')m.emissiveIntensity=6;
      // The CPU compatibility renderer cannot sample tangent-space PBR maps.
      if(software&&/basalt|graphite|floor/.test(m.name))m.color.set(/basalt/.test(m.name)?'#62605b':'#353b40');
    });
    const hemi=new T.HemisphereLight('#b9c9dc','#47321e',1.25);scene.add(hemi);
    const key=new T.DirectionalLight('#dce7ff',3.4);key.position.set(-18,26,12);key.castShadow=true;
    key.shadow.mapSize.set(innerWidth<700?1024:2048,innerWidth<700?1024:2048);
    Object.assign(key.shadow.camera,{left:-46,right:46,top:36,bottom:-36,near:1,far:140});key.shadow.normalBias=.025;key.shadow.bias=-.00015;key.shadow.radius=2;scene.add(key);
    const rim=new T.DirectionalLight('#ffb76f',2.8);rim.position.set(22,12,-38);scene.add(rim);
    const fill=new T.DirectionalLight('#9eb6d5',.8);fill.position.set(-20,12,-25);scene.add(fill);
    const lamps=anchors.map(a=>{const l=new T.PointLight('#ff9c44',95,13,2);l.position.set(a[0],a[1]+2.4,a[2]+2);scene.add(l);return l;});
    const routeMat=new T.MeshStandardMaterial({color:'#ffd7a0',emissive:'#ff9b47',emissiveIntensity:5,roughness:.3,metalness:.2});
    const curve=new T.CatmullRomCurve3(anchors.map(([x,y,z])=>new T.Vector3(x,y-.08,z+3.5)),false,'catmullrom',.12);
    const route=new T.Mesh(new T.TubeGeometry(curve,200,.028,5,false),routeMat);route.name='NAV_continuous_amber_route';route.userData.routePoints=curve.getPoints(200);scene.add(route);
    let composer=null;
    if(!software){
      renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
      const texLoader=new T.TextureLoader();
      const optional=await Promise.allSettled([texLoader.loadAsync(asset('twilight-environment.png')),texLoader.loadAsync(asset('fog-soft.png'))]);
      if(optional[0].status==='fulfilled'){
        const sky=optional[0].value;sky.colorSpace=T.SRGBColorSpace;sky.mapping=T.EquirectangularReflectionMapping;
        scene.background=sky;scene.backgroundIntensity=.9;
        const pmrem=new T.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(sky).texture;scene.environmentIntensity=.75;pmrem.dispose();
      }
      if(optional[1].status==='fulfilled'){
        const map=optional[1].value;const atmosphere=new T.Group();atmosphere.name='ATMOSPHERE_low_cloud_banks';
        const mist=new T.SpriteMaterial({map,color:'#b6b7b3',transparent:true,opacity:.21,depthWrite:false,fog:true});
        for(let j=0;j<30;j++){
          const sprite=new T.Sprite(mist);const row=Math.floor(j/10),x=-42+(j%10)*8.7;
          sprite.position.set(x,-.1+row*.38,-17+row*11+Math.sin(j*2.3)*2);sprite.scale.set(15+Math.sin(j)*3,2.4+row*.45,1);atmosphere.add(sprite);
        }
        for(let j=0;j<8;j++){const sprite=new T.Sprite(mist);sprite.position.set(-55+j*16,2,-42);sprite.scale.set(32,7,1);atmosphere.add(sprite);}
        anchors.forEach(([x,y,z])=>{
          const glow=new T.Sprite(new T.SpriteMaterial({map,color:'#ff9c47',transparent:true,opacity:.24,depthWrite:false,blending:T.AdditiveBlending}));
          glow.position.set(x,y+1.8,z+.8);glow.scale.set(3.6,6,1);atmosphere.add(glow);
          const pool=new T.Mesh(new T.PlaneGeometry(7,6),new T.MeshBasicMaterial({map,color:'#ff8e35',transparent:true,opacity:.35,depthWrite:false,blending:T.AdditiveBlending}));
          pool.rotation.x=-Math.PI/2;pool.position.set(x,y+.273,z+.1);atmosphere.add(pool);
        });
        scene.add(atmosphere);canvas.dataset.fogBanks='38';
      }
      // Compile and draw before declaring the model ready. Shader failures do
      // not normally throw in Three, so capture them explicitly and restore
      // the navigable fallback instead of reporting an invisible world ready.
      const shaderErrors=[];renderer.debug.checkShaderErrors=true;
      renderer.debug.onShaderError=(gl,program,vs,fs)=>shaderErrors.push(gl.getProgramInfoLog(program)||gl.getShaderInfoLog(fs)||'Shader compilation failed');
      await renderer.compileAsync(scene,camera);renderer.shadowMap.needsUpdate=true;renderer.render(scene,camera);
      if(shaderErrors.length)throw new Error(shaderErrors.join('\n'));
      canvas.dataset.shaderStatus='compiled';
      try{
        const [{EffectComposer},{RenderPass},{UnrealBloomPass},{OutputPass}]=await Promise.all([
          import('./vendor/addons/postprocessing/EffectComposer.js'),import('./vendor/addons/postprocessing/RenderPass.js'),
          import('./vendor/addons/postprocessing/UnrealBloomPass.js'),import('./vendor/addons/postprocessing/OutputPass.js')]);
        composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
        composer.addPass(new UnrealBloomPass(new T.Vector2(innerWidth,innerHeight),.55,.65,1.0));composer.addPass(new OutputPass());
        composer.render();if(shaderErrors.length)throw new Error('Postprocessing unavailable');
        canvas.dataset.postprocessing='bloom';
      }catch(e){composer?.dispose();composer=null;canvas.dataset.postprocessing='direct';renderer.render(scene,camera);}
    }
    let triangles=0;model.traverse(o=>{if(o.isMesh)triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;});
    Object.assign(canvas.dataset,{assetSource:'blender-mcp',assetStatus:'ready',modelTriangles:String(triangles),modelStations:String(roots.length),materialPipeline:'baked-pbr',sceneRevision:'7'});
    const state={roots,pickable,triangles,render:()=>composer?composer.render():renderer.render(scene,camera),resize:()=>{composer?.setPixelRatio(renderer.getPixelRatio());composer?.setSize(innerWidth,innerHeight);},setActive:i=>lamps.forEach((l,n)=>l.intensity=n===i?125:65)};
    onReady(state);return state;
  }catch(e){
    if(original){const keep=new Set(original.objects.map(([o])=>o));for(const o of [...scene.children])if(!keep.has(o))scene.remove(o);original.objects.forEach(([o,v])=>o.visible=v);scene.background=original.background;scene.fog=original.fog;scene.environment=original.environment;}
    canvas.dataset.assetStatus='error';onError?.(e);return null;
  }
}
