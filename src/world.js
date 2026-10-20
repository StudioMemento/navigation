import * as THREE from 'three/webgpu';
import {Fn,If,uniform,float,vec2,vec3,vec4,texture,uv,positionGeometry,normalGeometry,pass,mrt,output,emissive,smoothstep,instancedBufferAttribute,mix,renderOutput} from 'three/tsl';
import {gaussianBlur} from 'three/addons/tsl/display/GaussianBlurNode.js';
import {fxaa} from 'three/addons/tsl/display/FXAANode.js';
import {MeshSurfaceSampler} from 'three/addons/math/MeshSurfaceSampler.js';
import {focusYaw,focusLife,TransitionMotion} from './motion.js';
import {createStudioVoid} from './studio.js';

export {loadStudioAtlas} from './studio.js';

export {SECTIONS} from './navigation.js';
export const wrap=(n,total=6)=>((n%total)+total)%total;
export const distance=(i,p)=>wrap(i-p+3)-3;
const seeded=(initial=15731)=>{let seed=initial;return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};};

function studioEnvironment(){
 const width=256,height=128,pixels=new Float32Array(width*height*4);
 const panels=[{u:.22,v:.25,sx:.12,sy:.19,p:6,c:[1,.92,.81]},{u:.76,v:.34,sx:.055,sy:.24,p:3.5,c:[.54,.65,.82]},{u:.48,v:.17,sx:.18,sy:.055,p:3,c:[1,.46,.12]}];
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const p=(y*width+x)*4;pixels[p]=.009;pixels[p+1]=.010;pixels[p+2]=.013;pixels[p+3]=1;
  for(const l of panels){const dx=Math.min(Math.abs(x/width-l.u),1-Math.abs(x/width-l.u))/l.sx,dy=(y/height-l.v)/l.sy,k=l.p*Math.exp(-2*(dx*dx+dy*dy));for(let c=0;c<3;c++)pixels[p+c]+=k*l.c[c];}
 }
 const tex=new THREE.DataTexture(pixels,width,height,THREE.RGBAFormat,THREE.FloatType);tex.mapping=THREE.EquirectangularReflectionMapping;tex.colorSpace=THREE.LinearSRGBColorSpace;tex.needsUpdate=true;return tex;
}

// Bake reusable smooth noise once. No procedural noise in fragment shaders.
function noiseTexture(){
 const size=128,rand=seeded(7129),data=new Uint8Array(size*size*4);
 const grids=[8,16,32].map(n=>({n,data:Float32Array.from({length:n*n},rand)}));
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  let value=0;
  grids.forEach(({n,data:g},octave)=>{const px=x/size*n,py=y/size*n,ix=Math.floor(px),iy=Math.floor(py),sx=px-ix,sy=py-iy,tx=sx*sx*(3-2*sx),ty=sy*sy*(3-2*sy),at=(a,b)=>g[(b%n)*n+(a%n)];value+=((at(ix,iy)*(1-tx)+at(ix+1,iy)*tx)*(1-ty)+(at(ix,iy+1)*(1-tx)+at(ix+1,iy+1)*tx)*ty)*[.6,.28,.12][octave];});
  const i=(y*size+x)*4;data[i]=data[i+1]=data[i+2]=Math.round(value*255);data[i+3]=255;
 }
 const map=new THREE.DataTexture(data,size,size);map.wrapS=map.wrapT=THREE.RepeatWrapping;map.magFilter=THREE.LinearFilter;map.minFilter=THREE.LinearMipmapLinearFilter;map.generateMipmaps=true;map.needsUpdate=true;return map;
}

function createMaterial(maps,index,noise,animated){
 const focus=uniform(1),clarity=uniform(1),recession=uniform(1),clock=uniform(0),hover=uniform(0),vitality=uniform(0),pointer=uniform(new THREE.Vector3(0,0,1)),impulse=uniform(new THREE.Vector3());
 const phase=uniform(index*.13);
 const material=new THREE.MeshStandardNodeMaterial({roughness:.72,metalness:.12,fog:false,alphaTest:animated?.42:0});
 material.name='Noir mineral PBR '+index;material.map=maps.map;material.normalMap=maps.normalMap;material.normalScale.set(.43,.43);material.side=THREE.FrontSide;
 const albedo=texture(maps.map),mr=texture(maps.roughnessMap),em=texture(maps.emissiveMap);
 material.colorNode=albedo.rgb.mul(vec3(.74,.77,.81)).mul(focus);
 material.roughnessNode=mr.g.mul(.53).add(.34).clamp(.53,.89);
 material.metalnessNode=mr.b.mul(.18).clamp(0,.18);
 const warm=em.r.sub(em.b.mul(1.4)).max(0).mul(5).clamp(0,1),bright=smoothstep(.19,.73,em.r),emissionMask=warm.mul(bright);
 const band=positionGeometry.y.mul(1.35).add(positionGeometry.x.mul(.65)).sub(clock.mul(.22)).add(phase).sin().mul(.5).add(.5).pow(14);
 material.emissiveNode=vec3(1,.34,.065).mul(em.r.mul(emissionMask)).mul(float(2.7).add(band.mul(1.35))).mul(focus);
 if(animated){
  const local=positionGeometry.sub(pointer),field=local.length().div(1.02).pow(2).negate().exp();
  const breathing=positionGeometry.y.mul(2.3).add(positionGeometry.x.mul(1.8)).sub(clock.mul(.62)).add(phase).sin().mul(.09).add(.39);
  const influence=breathing.add(field.mul(hover).mul(.92)).mul(vitality);
  const ripple=positionGeometry.y.mul(9).add(positionGeometry.x.mul(7)).sub(clock.mul(2.2)).sin(),radial=local.div(local.length().max(.08));
  const elastic=normalGeometry.mul(ripple.mul(.105).add(.11)).add(radial.mul(.12)).add(impulse.mul(.07));
  material.positionNode=positionGeometry.add(elastic.mul(influence));
  material.opacityNode=Fn(()=>{const alpha=float(1).toVar();If(vitality.greaterThan(.003),()=>{const breakup=texture(noise,uv().mul(11).add(vec2(clock.mul(.001),0))).r;alpha.assign(float(1).sub(smoothstep(.30,.62,breakup).mul(influence.pow(1.1)).mul(1.45)));});return alpha;})();
 }
 // Pack emissive RGB and focus A into ONE RGBA8 target, instead of two HDR targets.
 material.mrtNode=mrt({output:vec4(output.rgb.mul(recession),output.a),aux:vec4(material.emissiveNode.mul(.25).mul(recession),clarity)});
 return {material,focus,clarity,recession,clock,hover,vitality,pointer,impulse,pointerTarget:new THREE.Vector3(0,0,1)};
}

function surfaceSamples(geometry,count){
 const random=seeded(),sampler=new MeshSurfaceSampler(new THREE.Mesh(geometry)).setRandomGenerator(random).build();
 const positions=new Float32Array(count*3),normals=new Float32Array(count*3),coords=new Float32Array(count*2),seeds=new Float32Array(count);
 const p=new THREE.Vector3(),n=new THREE.Vector3(),v=new THREE.Vector2();
 for(let i=0;i<count;i++){sampler.sample(p,n,undefined,v);p.toArray(positions,i*3);n.toArray(normals,i*3);v.toArray(coords,i*2);seeds[i]=random();}
 return {positions,normals,coords,seeds};
}
function sampleNodes(samples,count){
 const node=(data,size)=>instancedBufferAttribute(new THREE.InstancedBufferAttribute(data.subarray(0,count*size),size));
 return {base:node(samples.positions,3),norm:node(samples.normals,3),st:node(samples.coords,2),rnd:node(samples.seeds,1)};
}
function fragmentMotion(s,r){
 const local=s.base.sub(r.pointer),phase=r.clock.mul(.95).add(s.rnd.mul(23)),radial=local.div(local.length().max(.1));
 const ambient=phase.mul(.55).sin().mul(.055).add(.34);
 const field=local.length().div(1.13).pow(2).negate().exp().mul(r.hover).add(ambient).mul(r.vitality);
 const spread=s.norm.mul(.65).add(radial.mul(.55)).add(vec3(phase.sin(),phase.mul(.72).cos(),phase.mul(.83).sin()).mul(.34)).add(r.impulse.mul(.25));
 return {field,point:s.base.add(spread.mul(field).mul(s.rnd.mul(1.1).add(.3))),phase};
}
function createDust(samples,maps,r,count){
 const s=sampleNodes(samples,count),motion=fragmentMotion(s,r);
 const m=new THREE.PointsNodeMaterial({transparent:true,depthWrite:false,sizeAttenuation:false,fog:false});
 m.positionNode=motion.point;
 m.colorNode=texture(maps.map,s.st).rgb.mul(vec3(2.6,1.9,1.1)).add(vec3(.29,.095,.016).mul(smoothstep(.65,.95,s.rnd)));
 m.sizeNode=float(1.2).add(s.rnd.mul(2.9)).mul(float(1).add(r.hover.mul(.28)));
 m.opacityNode=motion.field.pow(.75).min(1).mul(.95).mul(float(1).sub(smoothstep(.15,.5,uv().sub(.5).length())));
 m.mrtNode=mrt({aux:vec4(vec3(1,.27,.035).mul(smoothstep(.93,.99,s.rnd)).mul(motion.field).mul(.07),r.clarity)});
 const cloud=new THREE.Sprite(m);cloud.count=count;cloud.frustumCulled=false;cloud.visible=false;cloud.name='Surface fragments';return cloud;
}
function createShards(samples,maps,r,count,geometry){
 const s=sampleNodes(samples,count),motion=fragmentMotion(s,r);
 const m=new THREE.MeshStandardNodeMaterial({roughness:.78,metalness:.12,fog:false});
 m.positionNode=motion.point.add(positionGeometry.mul(s.rnd.mul(.047).add(.013)).mul(motion.field));
 m.colorNode=texture(maps.map,s.st).rgb.mul(vec3(1.2,1,.8));
 m.emissiveNode=vec3(1,.24,.025).mul(smoothstep(.89,.99,s.rnd)).mul(motion.field).mul(.5);
 m.mrtNode=mrt({aux:vec4(m.emissiveNode.mul(.25),r.clarity)});
 const shards=new THREE.InstancedMesh(geometry,m,count);shards.frustumCulled=false;shards.visible=false;shards.name='Mineral shards';return shards;
}

export function createNoirWorld(renderer,geometry,maps,{width=1440,height=900,mobile=false,particles=true,interactive=!mobile,studioAtlas}={}){
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x020203);
 const camera=new THREE.PerspectiveCamera(32,width/height,.1,60);
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
 renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=THREE.PCFShadowMap;
 const sourceEnv=studioEnvironment(),pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromEquirectangular(sourceEnv);scene.environment=environment.texture;scene.environmentIntensity=.67;sourceEnv.dispose();pmrem.dispose();
 const key=new THREE.DirectionalLight('#f5e2cd',2.5);key.position.set(-3,5,5);key.castShadow=!mobile;
 key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-2,right:2,top:2,bottom:-2,near:.1,far:15});key.shadow.normalBias=.012;key.shadow.bias=-.00015;key.shadow.autoUpdate=false;key.shadow.needsUpdate=true;scene.add(key);
 const rim=new THREE.DirectionalLight('#ffac52',2.1);rim.position.set(1,3,-3);scene.add(rim);
 const top=new THREE.SpotLight('#eac39a',19,9,1.0,1,2);top.position.set(-.3,4.5,2);top.target.position.set(0,-.2,0);scene.add(top,top.target);
 const bottom=new THREE.SpotLight('#dd9249',8,7,1.05,1,2);bottom.position.set(.1,-3.7,2);bottom.target.position.set(0,-.3,0);scene.add(bottom,bottom.target);
 // Fixed light topology prevents new lighting pipelines during a swipe.
 const amber=new THREE.PointLight('#ffac52',.66,3.2,2);amber.position.set(.045,.16,.65);scene.add(amber);
 const noise=noiseTexture(),studio=createStudioVoid(scene,studioAtlas),records=[];
 for(let i=0;i<6;i++){
  const r=createMaterial(maps,i,noise,particles),holder=new THREE.Group(),mesh=new THREE.Mesh(geometry,r.material);mesh.castShadow=!mobile;mesh.receiveShadow=!mobile;holder.add(mesh);scene.add(holder);
  Object.assign(r,{holder,mesh,index:i});records.push(r);
 }
 // Two pooled surface effects hand over continuously during a swipe. Never six copies.
 const effects=[],dustCount=mobile?900:4200,shardCount=mobile?0:240;
 const samples=particles?surfaceSamples(geometry,dustCount):null;
 const shardGeometry=shardCount?new THREE.TetrahedronGeometry(1,0):null;
 if(particles)for(let i=0;i<2;i++){
  const state={clock:uniform(0),hover:uniform(0),vitality:uniform(0),clarity:uniform(1),pointer:uniform(new THREE.Vector3()),impulse:uniform(new THREE.Vector3())};
  const e={...state,dustCount,shardCount,cloud:createDust(samples,maps,state,dustCount),shards:shardCount?createShards(samples,maps,state,shardCount,shardGeometry):null};
  records[i].holder.add(e.cloud);if(e.shards)records[i].holder.add(e.shards);effects.push(e);
 }
 const motion=new TransitionMotion(),transition={strength:uniform(0),direction:uniform(1),phase:uniform(0)};
 const pipeline=new THREE.RenderPipeline(renderer),beauty=pass(scene,camera,{samples:0});beauty.setMRT(mrt({output,aux:vec4(emissive.mul(.25),0)}));
 const color=beauty.getTextureNode('output'),aux=beauty.getTextureNode('aux');
 aux.value.type=THREE.UnsignedByteType;
 const texel=uniform(new THREE.Vector2(1/width,1/height));
 // Two small quarter-resolution glow passes replace the bloom mip-chain.
 const glow=gaussianBlur(aux,vec2(.85),1,{resolutionScale:.25});
 // A small quarter-resolution Gaussian keeps side silhouettes soft without ghosted edges.
 const backgroundBlur=gaussianBlur(color,vec2(.45),1,{resolutionScale:.25});
 // Distort only the 3D composite. The HTML navigation is always stationary.
 const warped=Fn(()=>{const st=uv().toVar();If(transition.strength.greaterThan(.001),()=>{
  const centered=st.sub(vec2(.5,.46)),envelope=centered.dot(centered).mul(-5).exp();
  const phase=transition.phase.mul(4.5);
  const bend=vec2(st.y.mul(11).add(phase).sin().mul(.012).add(centered.x.mul(centered.y.abs()).mul(.055)),st.x.mul(9).sub(phase).sin().mul(.004));
  st.addAssign(bend.mul(transition.strength).mul(transition.direction).mul(envelope));
 });return st.clamp(.001,.999);})();
 const colorSample=color.sample(warped),soft=backgroundBlur.getTextureNode().sample(warped).rgb;
 const detail=colorSample.rgb.sub(soft).mul(.055);
 const fringe=texel.x.mul(.12).add(transition.strength.mul(.0006));
 const hero=mobile?colorSample.rgb:vec3(color.sample(warped.add(vec2(fringe,0))).r,colorSample.g,color.sample(warped.sub(vec2(fringe,0))).b).add(detail);
 const composite=vec4(mix(soft,hero,aux.sample(warped).a.clamp(0,1)).add(glow.getTextureNode().sample(warped).rgb.mul(.65)),1);
 const antialias=fxaa(renderOutput(composite));pipeline.outputNode=antialias;pipeline.outputColorTransform=false;
 geometry.computeBoundingBox();const box=geometry.boundingBox,anchorPoints=[];
 for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z])anchorPoints.push(new THREE.Vector3(x,y,z));
 const projected=new THREE.Vector3(),size=new THREE.Vector2();
 let shadowTime=-Infinity,shadowPosition=Infinity,qualityLevel=0;
 const world={scene,camera,renderer,records,pipeline,beauty,glow,backgroundBlur,environment,studio,effects,transition,mobile,width,height,position:0,focusMode:0,time:0,key,amber,
  resize(w,h){this.width=w;this.height=h;camera.aspect=w/h;camera.updateProjectionMatrix();studio.resize(w,h);renderer.getDrawingBufferSize(size);texel.value.set(1/size.x,1/size.y);},
  setQuality(level){qualityLevel=level;for(const e of effects){e.cloud.count=Math.round(e.dustCount*[1,.8,.6,.4][level]);}},
  update(position,time,px=0,py=0,focusMode=0,dt=1/60,moving=true){
   this.position=position;this.time=time;this.focusMode=focusMode;studio.update(time,interactive?px:0,interactive?py:0,position,moving);
   motion.update(position,dt);transition.strength.value=motion.strength;transition.direction.value=motion.direction;transition.phase.value=motion.phase;
   const aspect=this.width/this.height,portrait=aspect<.82,z=portrait?12.2:7.35;
   camera.position.set(px*.065,2.65+py*.035,z-focusMode*(portrait?1.2:.95));camera.lookAt(0,-.14+focusMode*.10,0);
   const spread=portrait?2.35:3.18,active=wrap(Math.round(position));
   for(const r of records){
    const d=distance(r.index,position),a=Math.abs(d),front=Math.exp(-a*a*3.2),recede=Math.min(a,1),scale=1.12-recede*.30;
    r.holder.visible=a<1.75;if(!r.holder.visible)continue;
    const breath=time*.58+r.index*.7;
    r.holder.position.set(d*spread+.045+Math.sin(breath*.61)*.012*front,.42-recede*.17+Math.sin(breath)*.020*front,-recede*1.85-focusMode*a*1.4);r.holder.scale.setScalar(scale);r.holder.rotation.set(Math.sin(breath*.73)*.008*front,-.59+focusYaw(d)+(px*.016+Math.sin(breath*.56)*.008)*front,Math.sin(breath*.47)*.004*front);
    r.focus.value=(.16+.84*front)*(1-focusMode*recede*.65);r.clarity.value=THREE.MathUtils.smoothstep(front,.68,.96);r.recession.value=(1-THREE.MathUtils.smoothstep(a,1,1.72))**2;r.clock.value=time;r.vitality.value=focusLife(d);r.mesh.castShadow=!mobile&&r.index===active;
   }
   const r=records[active];
   if(effects.length)for(const slot of [Math.floor(position),Math.floor(position)+1]){
    const record=records[wrap(slot)],e=effects[wrap(slot,2)];
    if(e.cloud.parent!==record.holder){record.holder.add(e.cloud);if(e.shards)record.holder.add(e.shards);}
    e.clock.value=time;e.hover.value=interactive?record.hover.value:0;e.vitality.value=record.vitality.value;e.clarity.value=record.clarity.value;
    e.pointer.value.copy(record.pointer.value);e.impulse.value.copy(record.impulse.value);
    e.cloud.visible=record.holder.visible&&e.vitality.value>.003;
    if(e.shards){e.shards.visible=e.cloud.visible;e.shards.count=Math.round((64+176*e.hover.value)*[1,.8,.6,.4][qualityLevel]);}
   }
   amber.intensity=.66+Math.sin(time*.8)*.025+r.hover.value*.25;
   // Slow breathing needs no 60 Hz shadow redraw. Swipe/deformation still tracks each frame.
   if(!mobile&&(Math.abs(position-shadowPosition)>.0001||r.hover.value>.003||time-shadowTime>1/(qualityLevel>1?8:15))){key.shadow.needsUpdate=true;shadowPosition=position;shadowTime=time;}
  },
  async warmup(){
   // Compile navigation and both pooled effects before exposing the canvas.
   records.forEach(r=>r.holder.visible=true);
   for(const e of effects){e.cloud.visible=true;if(e.shards)e.shards.visible=true;}
   await beauty.compileAsync(renderer);
   await new Promise(requestAnimationFrame);this.update(this.position,this.time);this.render();
   await new Promise(requestAnimationFrame);
   for(const e of effects){e.cloud.visible=true;if(e.shards)e.shards.visible=true;}
   this.render();await new Promise(requestAnimationFrame);this.update(this.position,this.time);this.render();
  },
  labelBottom(){const r=records[wrap(Math.round(this.position))];r.holder.updateMatrixWorld();camera.updateMatrixWorld();let bottom=0;for(const p of anchorPoints){projected.copy(p).applyMatrix4(r.holder.matrixWorld).project(camera);bottom=Math.max(bottom,(1-projected.y)*this.height*.5);}return bottom;},
  render(){pipeline.render();},
  dispose(){pipeline.dispose();beauty.dispose();glow.dispose();backgroundBlur.dispose();antialias.textureNode?.dispose?.();environment.dispose();noise.dispose();studio.dispose();shardGeometry?.dispose();effects.forEach(e=>{e.cloud.material.dispose();e.shards?.material.dispose();});records.forEach(r=>r.material.dispose());geometry.dispose();new Set(Object.values(maps)).forEach(t=>t?.dispose?.());}
 };
 world.resize(width,height);world.update(0,0);return world;
}
