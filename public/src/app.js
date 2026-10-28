import * as THREE from 'three';
import {GLTFLoader} from '../vendor/loaders/GLTFLoader.js';
import {HDRLoader} from '../vendor/loaders/HDRLoader.js';
import {MeshoptDecoder} from '../vendor/meshopt_decoder.mjs';
import {createWater} from './water.js';
import {assetConfiguration,assetEntryPoints,fetchDataWithFallback,poolAssetResources} from './assets.js';
import {clamp,smooth,wrap,mix,nearestStop,releaseStop,sampleCarousel,sampleDescent,panelProgress,resolveHash,validBridge} from './navigation.js';

const $=s=>document.querySelector(s);
const canvas=$('#tide'),sceneLayer=$('#scene-layer'),pageLayer=$('#page-layer');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const params=new URLSearchParams(location.search),still=params.get('still')==='1';
const config=assetConfiguration(location.search,innerWidth/innerHeight<.8);
const abort=new AbortController(),on=(node,type,fn,options={})=>node.addEventListener(type,fn,{...options,signal:abort.signal});
const qa={version:'v010',state:'BOOT',errors:[],warnings:[],assets:[],events:[],frames:0,reflectionFrames:0,gestureCount:0,bridge:{ready:false,rejected:0},quality:{fog:true,forcedFade:false}};
let renderer,scene,camera,water,environmentTarget,contract,cameraData,navigation,ready=false;
let state='BOOT',selectedIndex=0,position=0,goal=0,travel=null,gesture=null,suppressClickUntil=0;
let progress=0,transition=null,pendingRoute=null,frame=null,frameStage=null,frameToken=0,frameTimer,contentLoaded=false;
let clock=0,lastTime=0,raf=0,lastRender=0,resizeTimer,wheelTotal=0,wheelStamp=0,wheelLock=0;
const newSession=()=>crypto.randomUUID?.()||'tide-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
let poses=[],sessionId=newSession(),previousFocus=null;
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
function setState(next){if(state===next)return;state=next;qa.state=next;document.body.dataset.state=next;log('state',{state:next});publishQa();}
const stage=()=>navigation.stages[selectedIndex];
const inScene=()=>ready&&['SCENE','SLIDING','DRAGGING'].includes(state);
function reportError(error){qa.errors.push(String(error?.message||error));console.error(error);$('#loading').hidden=true;$('#fallback').hidden=false;setState('FALLBACK');}
function updateLabels(){
  const item=stage();$('#stage-title').textContent=item.label.toUpperCase();$('#stage-count').textContent=String(selectedIndex+1).padStart(2,'0')+' / 05';
  $('#open-section').href=item.href;$('#open-section').setAttribute('aria-label','Esplora '+item.label);
  document.querySelectorAll('#section-nav button').forEach((button,i)=>button.setAttribute('aria-current',String(i===selectedIndex)));
  $('#status').textContent=item.label;qa.selectedStage=item.id;
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
  $('#page-label').textContent=item.label;pageLayer.setAttribute('aria-label',item.label);
  $('#direct-link').href=item.href;$('#retry-direct').href=item.href;
  frameTimer=setTimeout(()=>{if(token===frameToken&&!contentLoaded){$('#page-loading').hidden=true;$('#embed-notice').hidden=false;}},15000);
}
function sendBridge(type,payload={}){
  if(!frame||!frameStage)return;
  frame.contentWindow?.postMessage({channel:'memento:tide',version:1,sessionId,stageId:frameStage.id,type,payload},new URL(frameStage.href).origin);
}
function movePage(to,{historyChange=true}={}){
  if(!ready)return;
  if(to===1){
    if(!inScene()&&state!=='EXITING')return;
    // Open the selected stop, after the camera has reached it.
    if(travel||Math.abs(position-goal)>.002){pendingRoute={index:selectedIndex,content:true,historyChange};return;}
    previousFocus=document.activeElement;preloadSection();pageLayer.hidden=false;
    if(historyChange)writeHistory(true);
    setState('ENTERING');
  }else{
    if(!['CONTENT','ENTERING','EXITING'].includes(state))return;
    if(historyChange)writeHistory(false,true);
    setState('EXITING');sendBridge('VISIBILITY',{active:false});
  }
  pageLayer.inert=true;sceneLayer.inert=true;if(frame)frame.tabIndex=-1;
  transition={from:progress,to,start:clock,duration:reduced.matches?.01:Math.max(.3,1.55*Math.abs(to-progress))};
  gesture=null;document.body.dataset.dragging='false';look.set(0,0);
}
function renderTransition(){
  const p=panelProgress(progress),offset=innerHeight*p;
  sceneLayer.style.transform=`translate3d(0,${-offset}px,0)`;
  pageLayer.style.transform=`translate3d(0,${innerHeight-offset}px,0)`;
}
function finishTransition(to){
  progress=to;transition=null;renderTransition();
  if(to===1){
    setState('CONTENT');pageLayer.inert=false;sceneLayer.inert=true;frame.tabIndex=0;$('#back-scene').focus({preventScroll:true});sendBridge('VISIBILITY',{active:true});
  }else{
    setState('SCENE');pageLayer.inert=true;pageLayer.hidden=true;sceneLayer.inert=false;
    if(previousFocus?.isConnected&&sceneLayer.contains(previousFocus))previousFocus.focus({preventScroll:true});else $('#open-section').focus({preventScroll:true});
    if(pendingRoute)applyPendingRoute();
  }
  publishQa();
}
function applyPendingRoute(){
  if(!pendingRoute||transition||travel)return;
  const next=pendingRoute;pendingRoute=null;
  if(next.index!==selectedIndex){pendingRoute=next;selectIndex(next.index,false);}
  else if(next.content)movePage(1,{historyChange:next.historyChange??false});
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
  const format=innerWidth/innerHeight<.8?'portrait':innerWidth/innerHeight>2.1?'ultrawide':'desktop';
  const suffix=format==='desktop'?'':'_'+format.toUpperCase();
  poses=navigation.stages.map(item=>{
    const row=cameraData.cameras.find(c=>c.name==='CAM_FOCUS_'+item.id+suffix);
    return{position:[...row.positionWeb],target:[...row.targetWeb],fov:row.verticalFovDegrees};
  });
  qa.viewport={width:innerWidth,height:innerHeight,format,dpr:renderer.getPixelRatio()};
}
function resize(){
  if(!renderer)return;renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth/innerHeight<.8?1.25:1.5));renderer.setSize(innerWidth,innerHeight);
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();water?.resize(innerWidth/innerHeight<.8);updatePoses();renderTransition();
}
const glyphs=[
  '<path d="M16 4C1 4 3 19 20 26c14 6 17-2 10-12C20-2 7 6 17 19c10 13 22 2 14-8C22 0 10 14 17 25"/>',
  '<path d="M20 3c-9 0-12 18 0 21s20-8 10-15C17 1 7 7 7 18s17 15 21 3C32 10 21 0 16 10s3 20 14 12"/>',
  '<path d="M10 8 29 3q8-2 8 6v13q0 8-8 6L10 23Q-1 16 10 8Z"/><path d="m14 10 16-4v18l-16-4Z"/>',
  '<path d="M29 3v8M30 4C5 7 4 13 22 16s17 11-13 12M13 6C3 11 8 18 27 21M10 27l15-10"/>',
  '<path d="M17 3C3 8 3 23 17 27ZM24 3c14 5 14 20 0 24Z"/><path d="M20.5 5v23M16 29h9"/>'
];
function buildNavigation(){
  navigation.stages.forEach((item,index)=>{
    const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',item.label);button.innerHTML=`<svg viewBox="0 0 42 32" aria-hidden="true">${glyphs[index]}</svg><span>${item.label}</span>`;
    on(button,'click',()=>selectIndex(index));$('#section-nav').append(button);
    const objectButton=document.createElement('button');objectButton.type='button';objectButton.className='stage-target';objectButton.setAttribute('aria-label','Esplora '+item.label);objectButton.tabIndex=-1;
    on(objectButton,'click',()=>{if(index===selectedIndex&&!travel)movePage(1);else selectIndex(index);});
    $('#stage-targets').append(objectButton);hitTargets.push({element:objectButton,stage:contract.stages.find(s=>s.id===item.id),index});
  });
  updateLabels();
}
function updateTargets(){
  right.setFromMatrixColumn(camera.matrixWorld,0);
  for(const {element,stage:item,index} of hitTargets){
    if(state!=='SCENE'||gesture?.moved||index!==selectedIndex){element.hidden=true;continue;}
    projectPoint.set(item.position[0],2.26,item.position[2]).project(camera);
    const x=(projectPoint.x*.5+.5)*innerWidth,y=(-projectPoint.y*.5+.5)*innerHeight;
    const edge=new THREE.Vector3(item.position[0],2.26,item.position[2]).addScaledVector(right,1.8).project(camera);
    const size=clamp(Math.abs(edge.x-projectPoint.x)*innerWidth,40,innerHeight*.55);
    element.hidden=projectPoint.z>1||projectPoint.z< -1||x<40||x>innerWidth-40||y<60||y>innerHeight-220;
    element.style.cssText=`left:${x-size/2}px;top:${y-size/2}px;width:${size}px;height:${size}px`;
    element.setAttribute('aria-label',(index===selectedIndex?'Esplora ':'Seleziona ')+navigation.stages[index].label);
  }
}
function addFog(){
  // Low, soft world-space banks. No fullscreen transition veil.
  const count=innerWidth/innerHeight<.8?12:18;
  for(let i=0;i<count;i++){
    const angle=i/count*Math.PI*2,radius=34+(i%3)*11;
    const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:true,uniforms:{time:{value:0},seed:{value:i*3.17},alpha:{value:i%3===0?.16:.11}},
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:`uniform float time;uniform float seed;uniform float alpha;varying vec2 vUv;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
        void main(){vec2 uv=vUv;float shape=smoothstep(0.,.25,uv.x)*(1.-smoothstep(.65,1.,uv.x))*smoothstep(0.,.23,uv.y)*(1.-smoothstep(.25,1.,uv.y));vec2 p=uv*vec2(7.,3.)+vec2(time*.025+seed,seed);float n=.6*noise(p)+.28*noise(p*2.1)+.12*noise(p*4.3);gl_FragColor=vec4(.25,.26,.25,shape*n*alpha);}`});
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(35+(i%3)*12,5+(i%4)),material);mesh.position.set(Math.sin(angle)*radius,1.4,Math.cos(angle)*radius);mesh.userData.baseX=mesh.position.x;mesh.layers.set(1);scene.add(mesh);fogCards.push(mesh);
  }
  qa.quality.fogCards=count;qa.quality.fogDistance=[24,175];
}
async function loadGLB(path){const loader=new GLTFLoader();loader.setMeshoptDecoder(MeshoptDecoder);const result=await loader.loadAsync(path);qa.assets.push({path,loaded:true});return result;}
async function setup(){
  const points=assetEntryPoints(config);
  const [sceneData,cameras,links]=await Promise.all([fetchDataWithFallback(points.contract),fetchDataWithFallback(points.cameras),fetch('/data/navigation.json').then(r=>{if(!r.ok)throw Error('Navigation unavailable');return r.json();})]);
  contract=sceneData.value;cameraData=cameras.value;navigation=links;
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.AgXToneMapping;renderer.toneMappingExposure=.95;renderer.info.autoReset=false;
  scene=new THREE.Scene();scene.background=new THREE.Color('#141719');scene.fog=new THREE.Fog('#141719',24,175);scene.environmentIntensity=.45;scene.backgroundIntensity=.018;
  camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,550);camera.layers.enable(1);
  const key=new THREE.DirectionalLight('#ece6de',2);key.position.set(-16,20,30);scene.add(key);
  const fill=new THREE.DirectionalLight('#aab8c1',.6);fill.position.set(22,12,-24);scene.add(fill);scene.add(new THREE.HemisphereLight('#a1aab3','#0b0e10',.22));
  water=createWater({mobile:innerWidth/innerHeight<.8,qa});scene.add(water.mesh);addFog();
  const loaded=await Promise.all([loadGLB(config.prefix+'icon_services_lod0.glb'),loadGLB(config.prefix+'platform.glb'),loadGLB('/world_v008/optimized/environment.glb'),loadGLB(config.prefix+points.neighbors)]);
  qa.resourceSharing=crypto.subtle?await poolAssetResources(loaded):{enabled:false,reason:'Texture pooling requires a secure origin; resources remain independent.'};
  const [icon,platform,world,neighbors]=loaded.map(r=>r.scene),services=contract.stages.find(s=>s.id==='s01_services');
  const pivot=new THREE.Group();pivot.position.set(services.position[0],2.26,services.position[2]);pivot.add(icon);scene.add(pivot);models.set(services.id,pivot);platform.position.fromArray(services.position);scene.add(platform,world,neighbors);
  neighbors.traverse(object=>{
    // The concept has five stops: Memento already opens the Studio URL.
    if(object.userData.stage_id==='s03_studio')object.visible=false;
    if(object.userData.role==='icon'&&object.userData.stage_id!=='s03_studio')models.set(object.userData.stage_id,object);
  });
  for(const [id,model]of models){model.rotation.y=THREE.MathUtils.degToRad(contract.stages.find(s=>s.id===id).focusIconYawDegrees);}
  const pmrem=new THREE.PMREMGenerator(renderer);let hdr;
  try{
    hdr=await new HDRLoader().loadAsync('/environment/belfast_sunset_puresky_2k.hdr');hdr.mapping=THREE.EquirectangularReflectionMapping;
    environmentTarget=pmrem.fromEquirectangular(hdr);scene.environment=environmentTarget.texture;scene.background=environmentTarget.texture;scene.backgroundBlurriness=.25;
  }catch(error){qa.warnings.push('HDR unavailable; neutral lighting retained.');}
  finally{hdr?.dispose();pmrem.dispose();}
  const initial=resolveHash(initialHash,navigation.stages);selectedIndex=initial.index;position=goal=selectedIndex;
  buildNavigation();resize();ready=true;setState('SCENE');$('#loading').hidden=true;$('#scene-ui').hidden=false;
  history.replaceState({tide:true,index:selectedIndex,content:initial.content},'',location.pathname+location.search+(initialHash||'#memento'));
  if(initial.content)movePage(1,{historyChange:false});
  log('ready');publishQa();
}
function pointerRipple(event,force=false){
  if(!water||!inScene()||event.target!==canvas||gesture?.moved)return;
  pointer.set(event.clientX/innerWidth*2-1,1-event.clientY/innerHeight*2);raycaster.setFromCamera(pointer,camera);
  if(raycaster.ray.intersectPlane(waterPlane,waterPoint)&&Math.abs(waterPoint.x)<300&&Math.abs(waterPoint.z)<300)water.pool.inject(waterPoint.x,waterPoint.z,clock,{force});
}
function pointerDown(event){
  if(!inScene()||!event.isPrimary||event.button!==0)return;
  gesture={id:event.pointerId,x:event.clientX,y:event.clientY,start:position,last:position,time:event.timeStamp,velocity:0,moved:false};look.set(0,0);
}
function pointerMove(event){
  if(gesture&&event.pointerId===gesture.id){
    const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
    if(!gesture.moved&&Math.abs(dx)>7&&Math.abs(dx)>Math.abs(dy)*.7){gesture.moved=true;gesture.start=position;gesture.last=position;travel=null;goal=position;sceneLayer.setPointerCapture(event.pointerId);document.body.dataset.dragging='true';setState('DRAGGING');}
    if(gesture.moved){
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
    const velocity=event.timeStamp-g.time>110?0:g.velocity;
    settleTo(releaseStop({start:g.start,position,velocity,moved:true,cancelled}),{duration:.65});
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
    camera.position.y+=Math.sin(clock*.4)*.018;const direction=target.clone().sub(camera.position).normalize();right.crossVectors(direction,camera.up).normalize();target.addScaledVector(right,lookSmooth.x);target.y+=lookSmooth.y;
  }
  camera.lookAt(target);camera.updateProjectionMatrix();camera.updateMatrixWorld();
  for(const model of models.values())model.position.y=2.26+(frozen?0:Math.sin(clock*.7)*.025);
  scene.backgroundRotation.y=THREE.MathUtils.degToRad(135);scene.environmentRotation.y=scene.backgroundRotation.y;
  for(const [i,card]of fogCards.entries()){card.material.uniforms.time.value=frozen?0:clock;card.position.x=card.userData.baseX+(frozen?0:Math.sin(clock*.035+i)*1.5);card.rotation.y=Math.atan2(camera.position.x-card.position.x,camera.position.z-card.position.z);}
  updateTargets();
  // The scene is offscreen while reading the native external document.
  if(state==='CONTENT'){if(qa.frames%30===0)publishQa();return;}
  if(now-lastRender<1000/60)return;lastRender=now;
  water.update(frozen?0:clock,!!travel||!!transition||!!gesture);renderer.info.reset();renderer.render(scene,camera);qa.frames++;
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
  const stamp=performance.now();if(stamp-wheelStamp>180)wheelTotal=0;wheelStamp=stamp;
  if(stamp<wheelLock||gesture)return;
  const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
  wheelTotal+=delta*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  if(Math.abs(wheelTotal)>=42){stepSection(Math.sign(wheelTotal));wheelTotal=0;wheelLock=stamp+900;}
},{passive:false});
on($('#previous'),'click',()=>stepSection(-1));on($('#next'),'click',()=>stepSection(1));
on($('#open-section'),'pointerenter',()=>{if(inScene())preloadSection();});
on($('#open-section'),'click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();movePage(1);});
on($('#back-scene'),'click',()=>movePage(0));
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
  if(!frameStage||!frame)return;
  if(!validBridge(event,frame,frameStage,sessionId)){if(event.data?.channel==='memento:tide')qa.bridge.rejected++;return;}
  if(event.data.type==='READY'){qa.bridge.ready=true;sendBridge('VISIBILITY',{active:state==='CONTENT'});}
  if(event.data.type==='ESCAPE'||event.data.type==='END')movePage(0);
});
on(reduced,'change',()=>{look.set(0,0);if(travel){position=goal;travel=null;setState('SCENE');applyPendingRoute();}if(transition)finishTransition(transition.to);});
on(document,'visibilitychange',()=>{lastTime=0;sendBridge('VISIBILITY',{active:!document.hidden&&state==='CONTENT'});});
on(canvas,'webglcontextlost',event=>{event.preventDefault();reportError(new Error('WebGL context lost'));});on(canvas,'webglcontextrestored',()=>location.reload());
on(window,'pageshow',event=>{if(event.persisted){lastTime=0;raf=requestAnimationFrame(animate);}});
on(window,'pagehide',event=>{cancelAnimationFrame(raf);if(event.persisted)return;clearTimeout(frameTimer);clearTimeout(resizeTimer);abort.abort();water?.dispose();environmentTarget?.dispose();renderer?.dispose();});
setup().catch(reportError);raf=requestAnimationFrame(animate);
