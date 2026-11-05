import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {FXAAShader} from 'three/addons/shaders/FXAAShader.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {MeshoptDecoder} from 'meshoptimizer';
import {MeshBVH,acceleratedRaycast} from 'three-mesh-bvh';
import {StudioNavigation,WalkGrid} from './studio/navigation.js';
import {exteriorFrameFactor,setStudioRay} from './studio/projection.js';
import {makeUniforms,MaterialSystem} from './studio/materials.js';
import {StudioLighting} from './studio/lighting.js';
import {loadParticles,FocusPass} from './studio/effects.js';
import {createEnvironment} from './studio/atmosphere.js';
import {assembleModel} from './studio/model.js';
import {setupUI} from './studio/ui.js';
import {damp,ease,dysonAngle} from './studio/config.js';

const canvas=document.getElementById('scene');
const coarse=matchMedia('(pointer:coarse)').matches,mobile=coarse||innerWidth<700;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduce.matches,ready=false;
let nav,lighting,materials,model,particles,renderer,composer,camera,focusPass,bloom,environment,fxaa;
let time=0,lastTime=0,revealAge=0,frameAverage=16,frameCount=0,adaptiveAge=0,hoverAt=0,lastHitTime=-1,shadowState=false;
let dpr=Math.min(devicePixelRatio||1,mobile?1.25:1.65);
const uniforms=makeUniforms(),pointer=new T.Vector2(2,2),ray=new T.Raycaster(),hitPoint=new T.Vector3(99,99,99),lastPoint=new T.Vector3(),velocity=new T.Vector3();
let pointerOver=false,hoverMesh=null,lastPointSet=false,dragged=false,tapTimer=null;
const ui=setupUI({
 view:index=>{if(nav){nav.go(index);uniforms.uTravel.value=.001;}},
 light:id=>{lighting?.toggle(id);if(lighting)ui.lights(lighting.groups);},
 shader:id=>{materials?.choose(id);ui.shader(id);},
 day:()=>{if(lighting){lighting.setDay(!lighting.dayTarget);ui.day(!!lighting.dayTarget);}},
 motion:()=>{paused=!paused;ui.motion(paused);},
 unfocus:()=>nav?.clearFocus(),
 exit:()=>nav?.exit(),
 escape:()=>{if(nav?.focus)nav.clearFocus();else if(nav&&nav.state!=='exterior')nav.exit();}
});ui.motion(paused);
reduce.addEventListener('change',()=>{paused=reduce.matches;ui.motion(paused);});

async function fetchModel(){
 const lod=mobile?'mobile':'desktop',compressed=typeof DecompressionStream!=='undefined';
 const res=await fetch(`./assets/studio-v2-${lod}.glb${compressed?'.gz':''}`);if(!res.ok)throw new Error('Asset HTTP '+res.status);
 const expected=Number(res.headers.get('content-length'))||(mobile?1743485:2103473);let raw;
 if(res.body){const chunks=[];let length=0;const reader=res.body.getReader();while(true){const {done,value}=await reader.read();if(done)break;chunks.push(value);length+=value.length;ui.progress(Math.min(.72,length/expected*.72));}raw=new Uint8Array(length);let offset=0;for(const b of chunks){raw.set(b,offset);offset+=b.length;}}
 else raw=new Uint8Array(await res.arrayBuffer());
 const bytes=compressed?await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():raw.buffer;
 ui.progress(.76);await MeshoptDecoder.ready;const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);return loader.parseAsync(bytes,'');
}
function resize(){
 if(!renderer)return;const w=innerWidth,h=innerHeight;
 renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);composer.setPixelRatio(dpr);composer.setSize(w,h);
 camera.aspect=w/h;camera.updateProjectionMatrix();if(nav)nav.frameFactor=exteriorFrameFactor(camera.aspect);
 fxaa.uniforms.resolution.value.set(1/(w*dpr),1/(h*dpr));focusPass.uniforms.resolution.value.set(w*dpr,h*dpr);focusPass.uniforms.maxRadius.value=mobile?10:15;
 environment?.resize(w,h);
 if(particles){particles.u.uHeight.value=h;particles.u.uDpr.value=dpr;}
}
function setPointer(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);pointerOver=true;}
function pick(){if(!model||!nav)return null;camera.updateMatrixWorld();model.root.updateMatrixWorld(true);setStudioRay(ray,pointer,camera);ray.firstHitOnly=true;return ray.intersectObjects([...model.meshes.filter(m=>m.material.visible&&(!m.userData.zone?.includes('BACKFACE')||nav.shell>.5)),...lighting.emitters.map(e=>e.mesh)],false)[0]||null;}
function focusAt(e){if(!ready)return;clearTimeout(tapTimer);setPointer(e);const h=pick();if(h){if(h.object.name.startsWith('EMITTER_'))return;nav.focusObject(h.object,h.point);uniforms.uContact.value=0;}}
function lightAt(e){setPointer(e);const h=pick();if(h?.object.userData.lightGroup){lighting.toggle(h.object.userData.lightGroup);ui.lights(lighting.groups);}}
function bindInput(){
 const pointers=new Map();let start=null,previous=null,pinch=0,lastTap={at:0,x:0,y:0};
 canvas.addEventListener('pointerdown',e=>{if(!ready)return;canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});start={x:e.clientX,y:e.clientY};previous=start;dragged=false;setPointer(e);canvas.classList.add('dragging');if(pointers.size===2){const p=[...pointers.values()];pinch=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}});
 canvas.addEventListener('pointermove',e=>{setPointer(e);if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const p=[...pointers.values()],distance=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);nav.zoom((pinch-distance)*5);pinch=distance;dragged=true;return;}if(!previous)return;const dx=e.clientX-previous.x,dy=e.clientY-previous.y;if(Math.hypot(e.clientX-start.x,e.clientY-start.y)>4)dragged=true;if(dragged)nav.drag(dx,dy);previous={x:e.clientX,y:e.clientY};});
 const end=e=>{pointers.delete(e.pointerId);canvas.classList.remove('dragging');if(!dragged&&e.type==='pointerup'){
  if(e.pointerType==='touch'){const at=performance.now();if(at-lastTap.at<320&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<28){focusAt(e);lastTap.at=0;}else{clearTimeout(tapTimer);tapTimer=setTimeout(()=>lightAt(e),330);lastTap={at,x:e.clientX,y:e.clientY};}}
  else if(e.detail<2){clearTimeout(tapTimer);tapTimer=setTimeout(()=>lightAt(e),260);}
 }previous=pointers.size?[...pointers.values()][0]:null;start=previous;if(!pointers.size)dragged=false;if(e.pointerType==='touch')pointerOver=false;};
 canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('dblclick',focusAt);
 canvas.addEventListener('pointerleave',()=>{if(!pointers.size)pointerOver=false;});
 canvas.addEventListener('wheel',e=>{e.preventDefault();nav?.zoom(e.deltaY);},{passive:false});
 const movement=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft'];
 document.addEventListener('keydown',e=>{if(!nav||!movement.includes(e.code)||e.target.closest('input,select,textarea,[contenteditable=true]'))return;e.preventDefault();if(nav.state==='exterior'){nav.go(1);return;}if(nav.focus)nav.clearFocus(false);if(nav.transition)nav.cancelTransition();nav.keys.add(e.code);});
 document.addEventListener('keyup',e=>nav?.keys.delete(e.code));window.addEventListener('blur',()=>{nav?.keys.clear();nav?.touchMove.set(0,0);});
 const stick=document.getElementById('stick'),knob=document.getElementById('stick-knob');let stickPointer=null;
 const moveStick=e=>{const rect=stick.getBoundingClientRect();const x=e.clientX-rect.left-rect.width/2,y=e.clientY-rect.top-rect.height/2,n=Math.max(1,Math.hypot(x,y)/27);nav.touchMove.set(x/n/27,y/n/27);knob.style.transform=`translate(${x/n}px,${y/n}px)`;};
 stick.addEventListener('pointerdown',e=>{if(!nav)return;e.stopPropagation();stick.setPointerCapture(e.pointerId);stickPointer=e.pointerId;if(nav.transition)nav.cancelTransition();nav.clearFocus(false);moveStick(e);});
 stick.addEventListener('pointermove',e=>{if(e.pointerId===stickPointer)moveStick(e);});
 for(const type of ['pointerup','pointercancel'])stick.addEventListener(type,()=>{stickPointer=null;nav?.touchMove.set(0,0);knob.style.transform='';});
 document.addEventListener('visibilitychange',()=>{lastTime=0;if(document.hidden){nav?.keys.clear();nav?.touchMove.set(0,0);}});
}
function buildRaycasts(){let index=0;const chunk=deadline=>{let count=0;while(index<model.meshes.length&&(count<2||deadline.timeRemaining()>5)){const m=model.meshes[index++];m.geometry.boundsTree=new MeshBVH(m.geometry,{maxLeafTris:12});m.raycast=acceleratedRaycast;count++;}if(index<model.meshes.length)schedule(chunk);};const schedule=fn=>window.requestIdleCallback?requestIdleCallback(fn,{timeout:500}):setTimeout(()=>fn({timeRemaining:()=>0}),20);schedule(chunk);}
function tick(stamp){
 requestAnimationFrame(tick);if(document.hidden||!ready)return;
 const elapsed=lastTime?(stamp-lastTime)/1000:1/60;lastTime=stamp;const dt=Math.min(elapsed,.05);
 if(!paused)time+=elapsed;uniforms.uTime.value=time;revealAge+=elapsed;uniforms.uReveal.value=reduce.matches?1:ease(Math.min(1,revealAge/2.3));
 nav.update(dt,reduce.matches,elapsed);uniforms.uPerspective.value=nav.perspective;uniforms.uProjectionDistance.value=camera.userData.projectionDistance;uniforms.uShell.value=nav.shell;materials.update(elapsed,reduce.matches);ui.fxBusy(materials.progress<1);lighting.update(elapsed,nav.shell,reduce.matches);uniforms.uDay.value=lighting.day;uniforms.uDayPulse.value=lighting.dayPulse;
 if(uniforms.uTravel.value>0){uniforms.uTravel.value=Math.min(1,uniforms.uTravel.value+dt*.42);if(uniforms.uTravel.value===1)uniforms.uTravel.value=0;}
 environment.uniforms.uInside.value=nav.shell;environment.update(renderer,camera,time,dt);particles?.update();
 if(model.dyson&&!paused)model.dyson.rotation.y=dysonAngle(time);
 const shadowNow=nav.shell>.97;if(shadowNow!==shadowState){shadowState=shadowNow;for(const m of model.shell)m.castShadow=shadowNow&&m.name!=='LUCI_SOFFITTO';renderer.shadowMap.needsUpdate=true;}
 if(stamp-hoverAt>60){hoverAt=stamp;const h=pointerOver&&!dragged&&!nav.transition?pick():null;hoverMesh=h?.object||null;if(h)hitPoint.copy(h.point);uniforms.uContact.value=damp(uniforms.uContact.value,h?1:0,5,.06);canvas.classList.toggle('light-hover',!!hoverMesh?.userData.lightGroup);
  if(h&&particles&&!paused&&time-lastHitTime>.16){velocity.copy(h.point).sub(lastPointSet?lastPoint:h.point).multiplyScalar(1/.16).clampLength(0,2);particles.hit(h.point,velocity,uniforms.uRadius.value,time);lastPoint.copy(h.point);lastPointSet=true;lastHitTime=time;}
 }
 uniforms.uCursor.value.lerp(hitPoint,1-Math.exp(-12*dt));
 focusPass.uniforms.inverseProjection.value.copy(camera.projectionMatrixInverse);focusPass.enabled=nav.focusAmount>.005;focusPass.uniforms.amount.value=nav.focusAmount;focusPass.uniforms.focusDistance.value=nav.focusDistance;focusPass.uniforms.focusRange.value=nav.focusRange;
 composer.render(dt);
 // Reduce resolution only after a sustained slow interval; never run device benchmarks on load.
 if(revealAge>5){frameAverage=frameAverage*.90+Math.min(elapsed,.5)*1000*.10;adaptiveAge+=elapsed;frameCount++;if(adaptiveAge>3&&frameCount>5){if(frameAverage>29&&dpr>.8){dpr=Math.max(.8,dpr-.15);resize();}adaptiveAge=0;frameCount=0;}}
}
async function init(){
 try{renderer=new T.WebGLRenderer({canvas,antialias:false,powerPreference:'high-performance',alpha:false});}
 catch(error){console.error(error);ui.error('La grafica 3D non è disponibile in questo browser. Attiva l’accelerazione hardware o apri la pagina in un browser compatibile.');return;}
 try{
  renderer.setClearColor(0x010102);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  const scene=new T.Scene();scene.fog=new T.FogExp2(0x080d16,.012);camera=new T.PerspectiveCamera(35,innerWidth/innerHeight,.025,90);
  const environmentGenerator=new T.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=environmentGenerator.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.38;room.dispose();environmentGenerator.dispose();
  const rt=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:true});rt.depthTexture=new T.DepthTexture(1,1,T.UnsignedIntType);
  composer=new EffectComposer(renderer,rt);composer.renderTarget2.depthTexture=new T.DepthTexture(1,1,T.UnsignedIntType);
  composer.addPass(new RenderPass(scene,camera));focusPass=new FocusPass();composer.addPass(focusPass);bloom=new UnrealBloomPass(new T.Vector2(1,1),.30,.55,1.05);composer.addPass(bloom);composer.addPass(new OutputPass());fxaa=new ShaderPass(FXAAShader);composer.addPass(fxaa);
  materials=new MaterialSystem(uniforms);lighting=new StudioLighting(scene,renderer,mobile);environment=createEnvironment(scene,uniforms,mobile);
  const [gltf,gridData]=await Promise.all([fetchModel(),fetch('./assets/navigation-grid.json').then(r=>{if(!r.ok)throw new Error('Navigation unavailable');return r.json();})]);
  model=assembleModel(gltf.scene,materials,lighting);scene.add(model.root);lighting.createEmitters();ui.progress(.86);
  nav=new StudioNavigation(camera,new WalkGrid(gridData),{onChange:n=>ui.navigation(n),onFocus:o=>ui.focus(o)});resize();nav.update(.016);bindInput();
  // Compile once with all material families; roof opacity is zero until the interior is entered.
  await renderer.compileAsync(scene,camera);ui.progress(.97);lighting.update(.016,0);materials.update(.016);
  ready=true;ui.ready();ui.navigation(nav);requestAnimationFrame(tick);
  loadParticles(scene,uniforms,mobile).then(p=>{particles=p;resize();}).catch(e=>console.warn('Optional surface field:',e.message));
  buildRaycasts();
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;ui.error('La sessione 3D è stata interrotta. Ricarica lo studio per riprendere.');});
  console.info('Memento Studio V4 ready',{objects:model.meshes.length,lod:mobile?'mobile':'desktop'});
 }catch(error){console.error('Studio load:',error);ui.error('Lo studio non si è caricato. Controlla la connessione e riprova.');}
}
window.addEventListener('resize',resize);init();
