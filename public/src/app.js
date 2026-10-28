import * as THREE from 'three';
import {GLTFLoader} from '../vendor/loaders/GLTFLoader.js';
import {HDRLoader} from '../vendor/loaders/HDRLoader.js';
import {MeshoptDecoder} from '../vendor/meshopt_decoder.mjs';
import {createWater} from './water.js';
import {createCinematicPass} from './cinematic.js';
import {RIG,pentagonLayout,focusPoses,titlePosition,applyArtDirection} from './cinematography.js';
import {assetConfiguration,assetEntryPoints,fetchDataWithFallback,poolAssetResources} from './assets.js';
import {clamp,smooth,wrap,mix,nearestStop,releaseStop,sampleCarousel,sampleDescent,panelProgress,resolveHash,validBridge} from './navigation.js';

const $=s=>document.querySelector(s);
const canvas=$('#tide'),sceneLayer=$('#scene-layer'),pageLayer=$('#page-layer');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const params=new URLSearchParams(location.search),still=params.get('still')==='1';
const config=assetConfiguration(location.search,innerWidth/innerHeight<.8);
const abort=new AbortController(),on=(node,type,fn,options={})=>node.addEventListener(type,fn,{...options,signal:abort.signal});
const qa={version:'v012',state:'BOOT',errors:[],warnings:[],assets:[],events:[],frames:0,reflectionFrames:0,gestureCount:0,bridge:{ready:false,rejected:0},quality:{fog:true,forcedFade:false}};
let renderer,scene,camera,water,cinematic,heroKey,environmentTarget,contract,navigation,ready=false;
let state='BOOT',selectedIndex=0,position=0,goal=0,travel=null,gesture=null,suppressClickUntil=0;
let progress=0,transition=null,pendingRoute=null,frame=null,frameStage=null,frameToken=0,frameTimer,contentLoaded=false;
let clock=0,lastTime=0,raf=0,lastRender=0,resizeTimer,wheelTotal=0,wheelStamp=0,wheelLock=0,wheelAxis=null;
const newSession=()=>crypto.randomUUID?.()||'tide-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
let poses=[],layout=[],sessionId=newSession(),previousFocus=null,transitionMode='entry';
const hostOrigin=(()=>{try{return document.referrer?new URL(document.referrer).origin:null;}catch{return null;}})();
function notifyHost(){if(window.parent!==window&&hostOrigin)window.parent.postMessage({channel:'memento:tide:scene',version:1,type:'STATE',state,slug:navigation?.stages[selectedIndex]?.slug,index:selectedIndex},hostOrigin);}
const models=new Map(),fogCards=[],hitTargets=[];
const look=new THREE.Vector2(),lookSmooth=new THREE.Vector2(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
const waterPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0),waterPoint=new THREE.Vector3(),projectPoint=new THREE.Vector3(),right=new THREE.Vector3();
const initialHash=location.hash;
if('scrollRestoration' in history)history.scrollRestoration='manual';
const qaNode=params.has('qa')?Object.assign(document.createElement('pre'),{id:'qa-snapshot',hidden:true}):null;
if(qaNode)document.body.append(qaNode);
Object.defineProperty(window,'__TIDE_QA__',{value:{snapshot:()=>JSON.parse(JSON.stringify({...qa,state,selectedStage:navigation?.stages[selectedIndex]?.id,position,goal,progress,frameSrc:frame?.src||null,frameCount:document.querySelectorAll('iframe').length,contentLoaded,camera:camera?{position:camera.position.toArray(),direction:camera.getWorldDirection(new THREE.Vector3()).toArray(),fov:camera.fov}:null}))}});
function publishQa(){if(qaNode)qaNode.textContent=JSON.stringify(window.__TIDE_QA__.snapshot());}
function log(type,detail={}){qa.events.push({time:clock,type,...detail});if(qa.events.length>60)qa.events.shift();}
function setState(next){if(state===next)return;state=next;qa.state=next;document.body.dataset.state=next;log('state',{state:next});publishQa();notifyHost();}
const stage=()=>navigation.stages[selectedIndex];
const inScene=()=>ready&&['SCENE','SLIDING','DRAGGING'].includes(state);
function reportError(error){qa.errors.push(String(error?.message||error));console.error(error);$('#loading').hidden=true;$('#fallback').hidden=false;setState('FALLBACK');}
function updateLabels(){
  const item=stage();$('#stage-title').textContent=item.label.toUpperCase();$('#stage-title').href=item.href;
  $('#stage-title').setAttribute('aria-label','Apri '+item.label);$('#status').textContent=item.label;qa.selectedStage=item.id;notifyHost();
}
function writeHistory(content,replace=false){
  const hash='#'+stage().slug+(content?'-content':'');
  if(location.hash===hash)return;
  history[replace?'replaceState':'pushState']({tide:true,index:selectedIndex,content},'',location.pathname+location.search+hash);
}
function settleTo(target,{historyChange=true,duration=.95}={}){
  goal=target;selectedIndex=wrap(Math.round(target),navigation.stages.length);updateLabels();
  const distance=Math.abs(goal-position);
  travel={from:position,to:goal,start:clock,duration:reduced.matches?.01:Math.max(.25,duration*Math.min(1.5,Math.max(.5,distance)))};
  if(historyChange)writeHistory(false);
  setState('SLIDING');look.set(0,0);log('select',{id:stage().id});
}
function selectIndex(index,historyChange=true){
  if(!inScene())return;
  settleTo(nearestStop(index,position,navigation.stages.length),{historyChange});
}
function stepSection(direction){if(inScene())settleTo(Math.round(travel?goal:position)+direction);}
function preloadSection(){
  const item=stage();if(frameStage?.id===item.id&&frame)return;
  clearTimeout(frameTimer);const token=++frameToken;contentLoaded=false;qa.bridge.ready=false;sessionId=newSession();frameStage=item;
  // Replace the element, so a late load from a previous URL cannot mark a new page ready.
  const next=document.createElement('iframe');next.id='section-frame';next.title=item.label+' — Memento';next.src=item.href;
  next.referrerPolicy='strict-origin-when-cross-origin';next.allow='fullscreen';next.setAttribute('allowfullscreen','');next.tabIndex=-1;
  next.addEventListener('load',()=>{
    if(token!==frameToken)return;contentLoaded=true;clearTimeout(frameTimer);$('#page-loading').hidden=true;$('#embed-notice').hidden=true;
    // onload is a browser load event, not a claim that a cross-origin document was inspected.
    qa.frameLoadEvent=true;log('frame_load',{href:item.href});sendBridge('INIT',{embedded:true});publishQa();
  },{once:true});
  next.addEventListener('error',()=>{if(token===frameToken){$('#page-loading').hidden=true;$('#embed-notice').hidden=false;}},{once:true});
  frame=next;$('#frame-host').replaceChildren(next);$('#page-loading').hidden=false;$('#embed-notice').hidden=true;
  pageLayer.setAttribute('aria-label',item.label);$('#retry-direct').href=item.href;
  frameTimer=setTimeout(()=>{if(token===frameToken&&!contentLoaded){$('#page-loading').hidden=true;$('#embed-notice').hidden=false;}},15000);
}
function sendBridge(type,payload={}){
  if(!frame||!frameStage)return;
  frame.contentWindow?.postMessage({channel:'memento:tide',version:1,sessionId,stageId:frameStage.id,type,payload},new URL(frameStage.href).origin);
}
function movePage(to,{historyChange=true,loop=false}={}){
  if(!ready)return;
  if(to===1){
    if(!inScene()&&state!=='EXITING')return;
    // Open the selected stop, after the camera has reached it.
    if(travel||Math.abs(position-goal)>.002){pendingRoute={index:selectedIndex,content:true,historyChange};return;}
    previousFocus=document.activeElement;preloadSection();pageLayer.hidden=false;
    if(historyChange)writeHistory(true);
    transitionMode='entry';setState('ENTERING');
  }else{
    if(!['CONTENT','ENTERING','EXITING'].includes(state))return;
    if(historyChange)writeHistory(false,true);
    transitionMode=loop?'loop':'reverse';if(loop)qa.loops=(qa.loops||0)+1;setState('EXITING');sendBridge('VISIBILITY',{active:false});
  }
  pageLayer.inert=true;sceneLayer.inert=true;if(frame)frame.tabIndex=-1;
  transition={from:progress,to,start:clock,duration:reduced.matches?.01:Math.max(.3,1.85*Math.abs(to-progress))};
  gesture=null;document.body.dataset.dragging='false';look.set(0,0);
}
function renderTransition(){
  const p=panelProgress(progress),offset=innerHeight*p;
  sceneLayer.style.transform=`translate3d(0,${transitionMode==='loop'?offset:-offset}px,0)`;
  pageLayer.style.transform=`translate3d(0,${(transitionMode==='loop'?-1:1)*(innerHeight-offset)}px,0)`;
}
function finishTransition(to){
  progress=to;transition=null;renderTransition();
  if(to===1){
    setState('CONTENT');pageLayer.inert=false;sceneLayer.inert=true;frame.tabIndex=0;frame.focus({preventScroll:true});sendBridge('VISIBILITY',{active:true});
  }else{
    setState('SCENE');pageLayer.inert=true;pageLayer.hidden=true;sceneLayer.inert=false;wheelLock=performance.now()+900;wheelTotal=0;
    if(previousFocus?.isConnected&&sceneLayer.contains(previousFocus))previousFocus.focus({preventScroll:true});else $('#stage-title').focus({preventScroll:true});
    if(pendingRoute)applyPendingRoute();
  }
  publishQa();
}
function applyPendingRoute(){
  if(!pendingRoute||transition||travel)return;
  const next=pendingRoute;pendingRoute=null;
  if(next.index!==selectedIndex){pendingRoute=next;selectIndex(next.index,next.historyChange??false);}
  else if(next.content)movePage(1,{historyChange:next.historyChange??false});
  else if(next.historyChange)writeHistory(false);
}
function restoreLocation(){
  if(!ready)return;
  const wanted=resolveHash(location.hash,navigation.stages);pendingRoute={...wanted,historyChange:false};
  if(progress>0||transition){
    if(wanted.index===selectedIndex&&wanted.content){pendingRoute=null;if(state==='EXITING')movePage(1,{historyChange:false});}
    else movePage(0,{historyChange:false});
  }else if(travel){/* The latest history request is applied once this move settles. */}
  else applyPendingRoute();
}

function updatePoses(){
  poses=focusPoses(layout,innerWidth/innerHeight);
  qa.viewport={width:innerWidth,height:innerHeight,format:innerWidth/innerHeight<.8?'portrait':'desktop',dpr:renderer.getPixelRatio()};
  qa.rig={cameraHeight:RIG.cameraHeight,platformTop:RIG.platformTop,spacingDegrees:72};
}
function resize(){
  if(!renderer)return;renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth/innerHeight<.8?1.25:1.5));renderer.setSize(innerWidth,innerHeight);
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();water?.resize(innerWidth/innerHeight<.8);cinematic?.resize(innerWidth,innerHeight);updatePoses();renderTransition();
}
function buildNavigation(){
  navigation.stages.forEach((item,index)=>{
    const objectButton=document.createElement('button');objectButton.type='button';objectButton.className='stage-target';objectButton.setAttribute('aria-label','Apri '+item.label);objectButton.tabIndex=-1;
    on(objectButton,'click',()=>{if(index===selectedIndex&&!travel)movePage(1);else selectIndex(index);});
    $('#stage-targets').append(objectButton);hitTargets.push({element:objectButton,stage:contract.stages.find(s=>s.id===item.id),index});
  });updateLabels();
}
function updateTargets(){
  const selected=layout[selectedIndex];
  if(selected){projectPoint.set(selected.position[0],RIG.platformTop,selected.position[2]).project(camera);$('#caption').style.top=titlePosition((.5-projectPoint.y*.5)*innerHeight,innerHeight)+'px';}
  right.setFromMatrixColumn(camera.matrixWorld,0);
  for(const {element,stage:item,index} of hitTargets){
    if(state!=='SCENE'||gesture?.moved||index!==selectedIndex){element.hidden=true;continue;}
    projectPoint.set(item.position[0],RIG.iconAnchorY,item.position[2]).project(camera);
    const x=(projectPoint.x*.5+.5)*innerWidth,y=(-projectPoint.y*.5+.5)*innerHeight;
    const edge=new THREE.Vector3(item.position[0],RIG.iconAnchorY,item.position[2]).addScaledVector(right,1.8).project(camera);
    const size=clamp(Math.abs(edge.x-projectPoint.x)*innerWidth,40,innerHeight*.55);
    element.hidden=projectPoint.z>1||projectPoint.z< -1||x<40||x>innerWidth-40||y<60||y>innerHeight-70;
    element.style.cssText=`left:${x-size/2}px;top:${y-size/2}px;width:${size}px;height:${size}px`;
    element.setAttribute('aria-label',(index===selectedIndex?'Esplora ':'Seleziona ')+navigation.stages[index].label);
  }
}
function addFog(){
  // Low, soft world-space banks. No fullscreen transition veil.
  const count=innerWidth/innerHeight<.8?8:12;
  for(let i=0;i<count;i++){
    const angle=i/count*Math.PI*2,radius=36+(i%3)*20;
    const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:true,uniforms:{time:{value:0},seed:{value:i*3.17},alpha:{value:i%3===0?.32:.22},tint:{value:new THREE.Color('#8b7861')}},
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:`uniform float time;uniform float seed;uniform float alpha;uniform vec3 tint;varying vec2 vUv;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
        void main(){vec2 uv=vUv;float shape=smoothstep(0.,.25,uv.x)*(1.-smoothstep(.65,1.,uv.x))*smoothstep(0.,.23,uv.y)*(1.-smoothstep(.25,1.,uv.y));vec2 p=uv*vec2(7.,3.)+vec2(time*.025+seed,seed);float n=.6*noise(p)+.28*noise(p*2.1)+.12*noise(p*4.3);gl_FragColor=vec4(tint,shape*(.35+n*.65)*alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`});
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(36+(i%3)*10,5+(i%4)),material);mesh.position.set(Math.sin(angle)*radius,.8,Math.cos(angle)*radius);mesh.userData.baseX=mesh.position.x;mesh.layers.set(1);scene.add(mesh);fogCards.push(mesh);
  }
  qa.quality.fogCards=count;qa.quality.fogDistance=[20,115];qa.quality.postFX='AgX, highlight halation, vignette, fine dither';
}
async function loadGLB(path){const loader=new GLTFLoader();loader.setMeshoptDecoder(MeshoptDecoder);const result=await loader.loadAsync(path);qa.assets.push({path,loaded:true});return result;}
async function setup(){
  const points=assetEntryPoints(config);
  const [sceneData,links]=await Promise.all([fetchDataWithFallback(points.contract),fetch('/data/navigation.json').then(r=>{if(!r.ok)throw Error('Navigation unavailable');return r.json();})]);
  contract=sceneData.value;navigation=links;
  layout=pentagonLayout(navigation.stages);for(const item of layout){const target=contract.stages.find(s=>s.id===item.id);target.position=[...item.position];target.focusIconYawDegrees=THREE.MathUtils.radToDeg(item.yaw);}
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  if(qaNode){const gl=renderer.getContext(),info=gl.getExtension('WEBGL_debug_renderer_info');qa.gpu={renderer:gl.getParameter(info?info.UNMASKED_RENDERER_WEBGL:gl.RENDERER),webgl2:renderer.capabilities.isWebGL2};}
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.AgXToneMapping;renderer.toneMappingExposure=.86;renderer.info.autoReset=false;
  scene=new THREE.Scene();scene.background=new THREE.Color('#141719');scene.fog=new THREE.FogExp2('#111417',.025);scene.environmentIntensity=.28;scene.backgroundIntensity=.003;
  camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,550);camera.layers.enable(1);
  heroKey=new THREE.DirectionalLight('#fff0dc',2.1);scene.add(heroKey,heroKey.target);
  const fill=new THREE.DirectionalLight('#8c9cae',.12);fill.position.set(22,12,-24);scene.add(fill);scene.add(new THREE.HemisphereLight('#a1aab3','#0b0e10',.07));
  cinematic=createCinematicPass(renderer);
  water=createWater({mobile:innerWidth/innerHeight<.8,qa});scene.add(water.mesh);addFog();
  const loaded=await Promise.all([loadGLB(config.prefix+'icon_services_lod0.glb'),loadGLB(config.prefix+'platform.glb'),loadGLB('/world_v008/optimized/environment.glb'),loadGLB(config.prefix+points.neighbors)]);
  qa.resourceSharing=crypto.subtle?await poolAssetResources(loaded):{enabled:false,reason:'Texture pooling requires a secure origin; resources remain independent.'};
  const [icon,platform,world,neighbors]=loaded.map(r=>r.scene),services=contract.stages.find(s=>s.id==='s01_services');
  const pivot=new THREE.Group();pivot.position.set(services.position[0],RIG.iconAnchorY,services.position[2]);pivot.add(icon);scene.add(pivot);models.set(services.id,pivot);platform.position.set(services.position[0],RIG.platformOffsetY,services.position[2]);platform.scale.y=RIG.platformThicknessScale;platform.rotation.y=layout[1].yaw;world.scale.y=.42;world.position.y=-.12;scene.add(platform,world,neighbors);
  neighbors.traverse(object=>{
    if(object.userData.stage_id==='s03_studio'){object.visible=false;return;}
    const slot=layout.find(s=>s.id===object.userData.stage_id);if(!slot)return;
    if(object.userData.role==='icon'){object.position.set(slot.position[0],RIG.iconAnchorY,slot.position[2]);object.rotation.y=slot.yaw;models.set(slot.id,object);}
    if(object.userData.role?.startsWith('platform')){object.position.set(slot.position[0],RIG.platformOffsetY,slot.position[2]);object.scale.y=RIG.platformThicknessScale;object.rotation.y=slot.yaw;}
  });
  for(const [id,model]of models)model.rotation.y=layout.find(s=>s.id===id).yaw;
  applyArtDirection(THREE,scene);
  // A restrained rim rig per sculpture keeps the silhouettes readable around the full orbit.
  for(const slot of layout){const rim=new THREE.PointLight('#ff993d',32,10,2);rim.position.set(slot.position[0]-Math.sin(slot.angle)*1.8,1.4,slot.position[2]-Math.cos(slot.angle)*1.8);scene.add(rim);}
  const pmrem=new THREE.PMREMGenerator(renderer);let hdr;
  try{
    hdr=await new HDRLoader().loadAsync('/environment/belfast_sunset_puresky_2k.hdr');hdr.mapping=THREE.EquirectangularReflectionMapping;
    environmentTarget=pmrem.fromEquirectangular(hdr);scene.environment=environmentTarget.texture;scene.background=environmentTarget.texture;scene.backgroundBlurriness=.5;
  }catch(error){qa.warnings.push('HDR unavailable; neutral lighting retained.');}
  finally{hdr?.dispose();pmrem.dispose();}
  const initial=resolveHash(initialHash,navigation.stages);selectedIndex=initial.index;position=goal=selectedIndex;
  buildNavigation();resize();ready=true;setState('SCENE');$('#loading').hidden=true;$('#scene-ui').hidden=false;
  history.replaceState({tide:true,index:selectedIndex,content:initial.content},'',location.pathname+location.search+(initialHash||'#memento'));
  if(pendingRoute)applyPendingRoute();else if(initial.content)movePage(1,{historyChange:false});
  log('ready');publishQa();
}
function pointerRipple(event,force=false){
  if(!water||!inScene()||event.target!==canvas||gesture?.moved)return;
  pointer.set(event.clientX/innerWidth*2-1,1-event.clientY/innerHeight*2);raycaster.setFromCamera(pointer,camera);
  if(raycaster.ray.intersectPlane(waterPlane,waterPoint)&&Math.abs(waterPoint.x)<300&&Math.abs(waterPoint.z)<300)water.pool.inject(waterPoint.x,waterPoint.z,clock,{force});
}
function pointerDown(event){
  if(!inScene()||!event.isPrimary||event.button!==0)return;
  gesture={id:event.pointerId,x:event.clientX,y:event.clientY,start:position,last:position,time:event.timeStamp,velocity:0,moved:false,axis:null,dy:0};look.set(0,0);
}
function pointerMove(event){
  if(gesture&&event.pointerId===gesture.id){
    const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
    if(!gesture.moved&&Math.max(Math.abs(dx),Math.abs(dy))>10){
      if(Math.abs(dx)>Math.abs(dy)*1.1)gesture.axis='x';
      else if(Math.abs(dy)>Math.abs(dx)*1.1)gesture.axis='y';
      if(gesture.axis){gesture.moved=true;gesture.start=position;gesture.last=position;if(gesture.axis==='x'){travel=null;goal=position;}sceneLayer.setPointerCapture(event.pointerId);document.body.dataset.dragging='true';setState('DRAGGING');}
    }
    if(gesture.moved){
      if(gesture.axis==='y'){gesture.dy=dy;event.preventDefault();return;}
      const next=gesture.start-dx/Math.min(680,Math.max(220,innerWidth*.62));
      const elapsed=Math.max(1,event.timeStamp-gesture.time)/1000;gesture.velocity=mix(gesture.velocity,(next-gesture.last)/elapsed,.55);gesture.last=next;gesture.time=event.timeStamp;
      position=goal=next;const nearest=wrap(Math.round(next),navigation.stages.length);if(nearest!==selectedIndex){selectedIndex=nearest;updateLabels();}
      event.preventDefault();return;
    }
  }
  if(inScene()&&!gesture&&event.pointerType==='mouse'){look.set((event.clientX/innerWidth-.5)*.12,(.5-event.clientY/innerHeight)*.065);pointerRipple(event);}
}
function pointerEnd(event,cancelled=false){
  if(!gesture||event.pointerId!==gesture.id)return;
  const g=gesture;gesture=null;document.body.dataset.dragging='false';
  if(sceneLayer.hasPointerCapture(event.pointerId))sceneLayer.releasePointerCapture(event.pointerId);
  if(g.moved){
    suppressClickUntil=performance.now()+500;qa.gestureCount++;
    if(g.axis==='y'){
      if(travel)setState('SLIDING');else setState('SCENE');
      if(!cancelled&&Math.abs(g.dy)>=55)movePage(1);
    }else{
      const velocity=event.timeStamp-g.time>110?0:g.velocity;
      settleTo(releaseStop({start:g.start,position,velocity,moved:true,cancelled}),{duration:.65});
    }
  }else{
    pointerRipple(event,true);
  }
}
function animate(now){
  raf=requestAnimationFrame(animate);
  const elapsed=lastTime?Math.max(0,(now-lastTime)/1000):0,dt=Math.min(elapsed,.05);lastTime=now;
  if(document.hidden||!ready)return;clock+=elapsed;
  if(travel){
    const t=clamp((clock-travel.start)/travel.duration);position=mix(travel.from,travel.to,smooth(t));
    if(t===1){position=goal=wrap(travel.to,navigation.stages.length);travel=null;setState('SCENE');applyPendingRoute();}
  }
  if(transition){
    const t=clamp((clock-transition.start)/transition.duration);progress=mix(transition.from,transition.to,t);renderTransition();if(t===1)finishTransition(transition.to);
  }
  const pose=sampleDescent(sampleCarousel(poses,position),progress),frozen=still||reduced.matches;
  camera.position.fromArray(pose.position);camera.fov=pose.fov;const target=new THREE.Vector3(...pose.target);
  lookSmooth.lerp(look,1-Math.exp(-4*dt));
  if(!frozen&&inScene()&&!gesture&&!travel){
    camera.position.y+=Math.sin(clock*.4)*.008;const direction=target.clone().sub(camera.position).normalize();right.crossVectors(direction,camera.up).normalize();target.addScaledVector(right,lookSmooth.x);target.y+=lookSmooth.y;
  }
  camera.lookAt(target);camera.updateProjectionMatrix();camera.updateMatrixWorld();
  if(heroKey){const hero=sampleCarousel(poses,position).target;const toward=camera.position.clone().sub(new THREE.Vector3(...hero));toward.y=0;toward.normalize();const side=new THREE.Vector3(toward.z,0,-toward.x);heroKey.target.position.fromArray(hero);heroKey.position.fromArray(hero).addScaledVector(toward,3).addScaledVector(side,-6);heroKey.position.y=4.5;}
  for(const model of models.values())model.position.y=RIG.iconAnchorY+(frozen?0:Math.sin(clock*.7)*.012);
  scene.backgroundRotation.y=THREE.MathUtils.degToRad(RIG.hdriYaw);scene.environmentRotation.y=scene.backgroundRotation.y;
  for(const [i,card]of fogCards.entries()){card.material.uniforms.time.value=frozen?0:clock;card.position.x=card.userData.baseX+(frozen?0:Math.sin(clock*.035+i)*1.5);card.rotation.y=Math.atan2(camera.position.x-card.position.x,camera.position.z-card.position.z);}
  updateTargets();
  // The scene is offscreen while reading the native external document.
  if(state==='CONTENT'){if(qa.frames%30===0)publishQa();return;}
  if(now-lastRender<1000/60)return;lastRender=now;
  water.update(frozen?0:clock,!!travel||!!transition||!!gesture);renderer.info.reset();if(cinematic)cinematic.render(scene,camera);else renderer.render(scene,camera);qa.frames++;
  if(qa.frames%30===0){qa.render={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,textures:renderer.info.memory.textures};publishQa();}
}

on(sceneLayer,'pointerdown',pointerDown);on(window,'pointermove',pointerMove,{passive:false});
on(window,'pointerup',event=>pointerEnd(event));on(window,'pointercancel',event=>pointerEnd(event,true));
on(window,'blur',()=>{if(gesture)pointerEnd({pointerId:gesture.id,timeStamp:performance.now()},true);});
on(sceneLayer,'lostpointercapture',event=>{if(gesture?.id===event.pointerId)pointerEnd(event,true);});
on(sceneLayer,'click',event=>{if(performance.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();}},{capture:true});
on(sceneLayer,'dragstart',event=>event.preventDefault());on(sceneLayer,'pointerleave',()=>look.set(0,0));
on(sceneLayer,'wheel',event=>{
  if(!inScene()||event.ctrlKey)return;event.preventDefault();
  const stamp=performance.now(),axis=Math.abs(event.deltaX)>Math.abs(event.deltaY)*1.1||event.shiftKey?'x':'y';
  if(stamp-wheelStamp>180||axis!==wheelAxis)wheelTotal=0;wheelStamp=stamp;wheelAxis=axis;
  if(stamp<wheelLock||gesture)return;
  const delta=(axis==='x'?(event.deltaX||event.deltaY):event.deltaY)*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  wheelTotal+=delta;
  if(axis==='y'&&wheelTotal>=45){wheelTotal=0;wheelLock=stamp+1000;movePage(1);}
  else if(axis==='x'&&Math.abs(wheelTotal)>=48){stepSection(Math.sign(wheelTotal));wheelTotal=0;wheelLock=stamp+800;}
},{passive:false});
on($('#stage-title'),'pointerenter',()=>{if(inScene())preloadSection();});
on($('#stage-title'),'click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();movePage(1);});
on(window,'keydown',event=>{
  if(event.target.closest?.('input,textarea,select,[contenteditable=true]'))return;
  if(event.key==='Escape'){if(pendingRoute||progress>0||state==='ENTERING'){event.preventDefault();pendingRoute=null;if(progress>0||state==='ENTERING')movePage(0);}return;}
  if(!inScene())return;
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();stepSection(event.key==='ArrowRight'?1:-1);}
  if(event.key==='ArrowDown'||((event.key==='Enter'||event.key===' ')&&(event.target===document.body||event.target===canvas))){event.preventDefault();movePage(1);}
  if(event.key==='Home'){event.preventDefault();selectIndex(0);}
  if(event.key==='End'){event.preventDefault();selectIndex(navigation.stages.length-1);}
});
on(window,'popstate',restoreLocation);on(window,'hashchange',()=>{if(!history.state?.tide)restoreLocation();});
on(window,'resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,90);},{passive:true});
on(window,'message',event=>{
  if(event.source===window.parent&&window.parent!==window&&event.origin===hostOrigin&&event.data?.channel==='memento:tide:control'&&event.data.version===1){
    const d=event.data;if(d.type==='RETURN'){pendingRoute=null;movePage(0);}
    else if(d.type==='SELECT'||d.type==='OPEN'){
      const index=navigation?.stages.findIndex(s=>s.slug===d.slug);
      if(index>=0){
        pendingRoute={index,content:d.type==='OPEN',historyChange:true};
        if(state==='EXITING'){/* Preserve the current return direction, then apply the latest request. */}
        else if(state==='ENTERING'||state==='CONTENT')movePage(0);
        else applyPendingRoute();
      }
    }return;
  }
  if(!frameStage||!frame)return;
  if(!validBridge(event,frame,frameStage,sessionId)){if(event.data?.channel==='memento:tide')qa.bridge.rejected++;return;}
  if(event.data.type==='READY'){qa.bridge.ready=true;sendBridge('VISIBILITY',{active:state==='CONTENT'});}
  if(event.data.type==='END'&&state==='CONTENT')movePage(0,{loop:true});
  if(event.data.type==='ESCAPE')movePage(0);
  if(event.data.type==='SCROLL')qa.bridge.scroll=event.data.payload;publishQa();
});
on(reduced,'change',()=>{look.set(0,0);if(travel){position=goal;travel=null;setState('SCENE');applyPendingRoute();}if(transition)finishTransition(transition.to);});
on(document,'visibilitychange',()=>{lastTime=0;sendBridge('VISIBILITY',{active:!document.hidden&&state==='CONTENT'});});
on(canvas,'webglcontextlost',event=>{event.preventDefault();reportError(new Error('WebGL context lost'));});on(canvas,'webglcontextrestored',()=>location.reload());
on(window,'pageshow',event=>{if(event.persisted){lastTime=0;raf=requestAnimationFrame(animate);}});
on(window,'pagehide',event=>{cancelAnimationFrame(raf);if(event.persisted)return;clearTimeout(frameTimer);clearTimeout(resizeTimer);abort.abort();water?.dispose();cinematic?.dispose();environmentTarget?.dispose();renderer?.dispose();});
setup().catch(reportError);raf=requestAnimationFrame(animate);
