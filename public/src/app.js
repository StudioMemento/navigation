import * as THREE from 'three';
import {loadWorldRoutes} from './world-routes.js';
import {GLTFLoader} from '../vendor/loaders/GLTFLoader.js';
import {HDRLoader} from '../vendor/loaders/HDRLoader.js';
import {MeshoptDecoder} from '../vendor/meshopt_decoder.mjs';
import {createWater} from './water.js';
import {clamp,smooth,remap,validEnvelope,journeyPhase} from './core.js';
import {assetConfiguration,assetEntryPoints,fetchDataWithFallback,poolAssetResources} from './assets.js';

// The camera controller owns scroll restoration for its focused/content states.
if('scrollRestoration' in history)history.scrollRestoration='manual';
const $=selector=>document.querySelector(selector);
const canvas=$('#tide'),targets=$('#stage-targets'),journey=$('#journey'),shell=$('#content-shell'),frame=$('#services-frame'),fog=$('#transition-fog');
const params=new URLSearchParams(location.search),assetConfig=assetConfiguration(location.search,innerWidth/innerHeight<.8),assetTier=assetConfig.tier;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),still=params.get('still')==='1';
const abort=new AbortController();
const qa={version:'v009-vercel',worldRevision:'v008',three:THREE.REVISION,assetTier,assetRevision:assetConfig.revision,textureQuality:assetConfig.quality,state:'BOOT',errors:[],warnings:[],events:[],frames:0,reflectionFrames:0,loops:0,canvasCount:1,rafLoops:1,bridge:{ready:false,resizes:0,rejected:0},assets:[],viewport:{},quality:{toneMapping:'AgX',exposure:1,environmentIntensity:.5,backgroundIntensity:.025,skyYawOffsetDegrees:135,normalScalesMeters:[3.2,.28],rippleSpeed:1.1,rippleLifetime:2.4,waterF0:.02,waterRoughnessApproximation:'five tap planar filter',bloom:false,dof:false},render:{},timings:[]};
Object.defineProperty(window,'__TIDE_QA__',{value:{snapshot:()=>JSON.parse(JSON.stringify({...qa,scroll:window.scrollY,contentHeight,entryHeight,exitLength,contentReady,frameCount:document.querySelectorAll('iframe').length,camera:camera?{position:camera.position.toArray(),target:base.target.toArray(),fov:camera.fov}:null}))},writable:false});
const qaElement=params.get('qa')==='1'?document.createElement('pre'):null;
if(qaElement){qaElement.id='qa-snapshot';qaElement.hidden=true;qaElement.textContent=JSON.stringify({state:'BOOT'});document.body.append(qaElement);}
function publishQa(){if(qaElement)qaElement.textContent=JSON.stringify(window.__TIDE_QA__.snapshot());}
const listen=(obj,event,fn,options={})=>obj.addEventListener(event,fn,{...options,signal:abort.signal});
let renderer,scene,camera,water,pmrem,environmentTexture,environmentTarget,servicesPivot,servicesModel;
let navigation,worldRoutes,atmosphere,selectedId=null,routeYaws={},pendingOverview=false,pendingContentRestore=false;
const stageModels=new Map();
const initialHash=location.hash;
let contract,cameraData,state='BOOT',clock=0,lastTime=0,lastRender=0,raf=0,ready=false;
let poses={},activeMotion=null,returnTransition=null,lastVisible=false,lastFocusSent=false,historyEntered=false;
let contentReady=false,preloaded=false,contentHeight=800,entryHeight=innerHeight*.95,exitLength=innerHeight*.75,bridgeTimer;
let sessionId=crypto.randomUUID(),resizeTimer,entryArmed=false,exitingRebased=false;
let fogCards=[],emissiveMaterials=[],hitTargets=[],lastPointerDown=null;
let targetGesture=null,fogTarget=0,fogOpacity=0;
function setFog(value){fogTarget=Number(value);}
const base={position:new THREE.Vector3(),target:new THREE.Vector3(),fov:42};
const velocity=new THREE.Vector3(),oldBase=new THREE.Vector3(),pointer=new THREE.Vector2(),raycaster=new THREE.Raycaster(),waterPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0),waterPoint=new THREE.Vector3();
const currentLook=new THREE.Vector3(),projectPoint=new THREE.Vector3(),cameraRight=new THREE.Vector3();

function log(type,detail={}){qa.events.push({time:clock,type,...detail});if(qa.events.length>120)qa.events.shift();}
function setState(next){
  if(state===next)return;state=next;qa.state=next;qa.selectedStage=selectedId;
  document.body.dataset.state=next;log('state',{state:next});
  $('#loading').hidden=next!=='BOOT';
  const item=navigation?.stages.find(s=>s.id===selectedId);
  $('#stage-title').textContent=(item?.label||'Memento').toUpperCase();
  $('#focus-controls').hidden=next!=='FOCUSED';
  const link=$('#open-section');link.textContent=item?.mode==='overview'?'Esplora il lago':item?.mode==='services-embedded'?'Esplora Services':'Apri '+(item?.label||'')+' ↗';
  link.href=item?.mode==='services-embedded'?'#services-content':item?.href||'#';
  if(item?.mode==='external'){link.target='_blank';link.rel='noopener';link.setAttribute('aria-label','Apri '+item.label+' in una nuova scheda');}
  else{link.removeAttribute('target');link.removeAttribute('rel');link.removeAttribute('aria-label');}
  $('#status').textContent=next==='FOCUSED'?item?.label||'Memento':next==='OVERVIEW'?'Memento':next==='CONTENT'?'Servizi e percorsi Memento':'';publishQa();
}
function reportError(error,fatal=false){const message=String(error?.message||error);qa.errors.push(message);console.error(error);$('#fallback-message').textContent=fatal?'La scena non è disponibile. Puoi aprire le sezioni qui sotto.':'Services non è disponibile. Puoi aprire la pagina dal collegamento diretto.';$('#fallback').hidden=false;if(fatal)setState('FALLBACK');}
function poseRecord(name){const row=cameraData.cameras.find(item=>item.name===name);if(!row)throw new Error('Missing camera '+name);return{position:new THREE.Vector3(...row.positionWeb),target:new THREE.Vector3(...row.targetWeb),fov:row.verticalFovDegrees};}
function getAspect(){return innerWidth/innerHeight<.8?'portrait':innerWidth/innerHeight>2.1?'ultrawide':'desktop';}
function updatePoses(){const format=getAspect(),suffix=format==='desktop'?'':'_'+format.toUpperCase();poses={overview:poseRecord('CAM_OVERVIEW'+suffix),focus:poseRecord('CAM_FOCUS_'+(selectedId||'s01_services')+suffix),descent:poseRecord('CAM_DESCENT_'+(selectedId&&selectedId!=='s00_memento'?selectedId:'s01_services')+suffix)};qa.viewport={width:innerWidth,height:innerHeight,aspect:format,dpr:renderer.getPixelRatio(),devicePixelRatio,canvasWidth:canvas.width,canvasHeight:canvas.height,canvasRect:{width:canvas.getBoundingClientRect().width,height:canvas.getBoundingClientRect().height}};}
function copyPose(pose){base.position.copy(pose.position);base.target.copy(pose.target);base.fov=pose.fov;}
function applyRoute(kind,from,to,u){
  const sample=worldRoutes.sample(kind,from,to,getAspect(),clamp(u));
  base.position.fromArray(sample.position);base.target.fromArray(sample.target);base.fov=sample.fov;routeYaws=sample.yaws;
  qa.route={id:sample.routeId,u:clamp(u),maskFog:sample.maskFog};
  return sample;
}
function motionRoute(kind,from,to,onComplete,uStart=0,uEnd=1){
  const duration=worldRoutes.duration(kind,from,to,getAspect())*Math.abs(uEnd-uStart);
  activeMotion={start:clock,duration:reduced.matches?.22:Math.max(.05,duration),kind,from,to,uStart,uEnd,onComplete};
}
function stepMotion(){
  if(!activeMotion)return false;
  const m=activeMotion,t=clamp((clock-m.start)/m.duration),u=THREE.MathUtils.lerp(m.uStart,m.uEnd,t);
  const sample=applyRoute(m.kind,m.from,m.to,u);
  if(m.kind==='exit'||m.kind==='entry'){
    setFog(sample.maskFog);shell.style.opacity=m.kind==='exit'?String(1-smooth(remap(t,0,.32))):'0';
  }
  if(t===1){activeMotion=null;velocity.set(0,0,0);m.onComplete?.();}
  return true;
}
function bridgeSend(type,payload={}){if(!preloaded)return;frame.contentWindow?.postMessage({channel:'memento:tide',version:1,sessionId,stageId:'s01_services',type,payload},location.origin);}
function sendViewport(){const relativeTop=journey.hidden?innerHeight:entryHeight-window.scrollY;bridgeSend('VIEWPORT',{width:innerWidth,height:innerHeight,relativeTop,visible:state==='CONTENT'});}
function setContentVisible(visible){
  shell.inert=!visible;frame.tabIndex=visible?0:-1;shell.classList.toggle('active',visible);
  if(visible!==lastVisible){bridgeSend('VISIBILITY',{active:visible,focus:visible&&!lastFocusSent});lastVisible=visible;if(visible)lastFocusSent=true;}
}
function preloadServices(){
  if(preloaded)return;preloaded=true;qa.bridge.preloadTime=clock;
  frame.src='/services/?sessionId='+encodeURIComponent(sessionId)+'&viewportHeight='+innerHeight;
  frame.addEventListener('load',()=>{bridgeSend('INIT',{embedded:true,theme:'tide',height:innerHeight,width:innerWidth,relativeTop:innerHeight});bridgeSend('VISIBILITY',{active:false});},{once:true});
  bridgeTimer=setTimeout(()=>{if(!contentReady)reportError(new Error('Services READY timeout (8 seconds)'));},8000);
}
function selectServices(){selectStage('s01_services');}
function restoreServicesHistory(showContent){
  historyEntered=showContent;journey.hidden=false;journey.classList.remove('preloading');entryArmed=true;
  window.scrollTo({top:showContent?Math.ceil(entryHeight)+1:0,behavior:'instant'});scrollComposition();
}
function selectStage(id,pushHistory=true){
  if(!ready||activeMotion||!['OVERVIEW','FOCUSED'].includes(state))return;
  const item=navigation.stages.find(s=>s.id===id);if(!item)return;
  if(state==='FOCUSED'&&selectedId===id){if(item.mode==='services-embedded')enterContent();else if(item.mode==='overview')returnOverview();return;}
  const from=state==='FOCUSED'?selectedId:null;selectedId=id;updatePoses();entryArmed=false;
  journey.hidden=true;setContentVisible(false);shell.style.opacity='0';window.scrollTo({top:0,behavior:'instant'});
  if(item.mode==='services-embedded'){journey.hidden=false;journey.classList.add('preloading');preloadServices();}
  setState('FOCUSING');returnTransition=null;historyEntered=false;
  if(pushHistory)history.pushState({tide:id},'',location.pathname+location.search+'#'+item.slug);
  motionRoute('focus',from,id,()=>{
    setState('FOCUSED');
    if(item.mode==='services-embedded'){journey.classList.remove('preloading');journey.hidden=false;entryArmed=true;lastFocusSent=false;}
    if(pendingOverview){pendingOverview=false;returnOverview();}else if(pendingContentRestore&&id==='s01_services'){pendingContentRestore=false;restoreServicesHistory(true);}
  });
}
function enterContent(){if(state==='FOCUSED'&&selectedId==='s01_services'){preloadServices();journey.hidden=false;window.scrollTo({top:Math.ceil(entryHeight)+1,behavior:reduced.matches?'instant':'smooth'});}}
function resetOverview(completedLoop=false){
  const hadContent=historyEntered,previous=selectedId;
  journey.hidden=true;journey.classList.remove('preloading');entryArmed=false;setContentVisible(false);shell.style.opacity='0';
  if(previous)applyRoute('overview',previous,null,1);else copyPose(poses.overview);
  activeMotion=null;velocity.set(0,0,0);window.scrollTo({top:0,behavior:'instant'});historyEntered=false;lastFocusSent=false;exitingRebased=false;pendingOverview=false;
  qa.returns=(qa.returns||0)+1;if(completedLoop&&hadContent)qa.loops++;selectedId=null;setState('OVERVIEW');setFog(0);
  history.replaceState({tide:'overview'},'',location.pathname+location.search);$('#stage-'+(previous||'s00_memento'))?.focus({preventScroll:true});
}
function returnOverview(){
  if(!ready||state==='OVERVIEW')return;
  pendingContentRestore=false;
  if(activeMotion){pendingOverview=true;return;}
  entryArmed=false;setContentVisible(false);
  if(state==='FOCUSED'){
    journey.hidden=true;setState('EXITING');motionRoute('overview',selectedId,null,()=>resetOverview());return;
  }
  if(state==='ENTERING'){
    const u=qa.route?.u||0;setState('EXITING');motionRoute('entry',selectedId,selectedId,()=>{journey.hidden=true;setState('FOCUSED');returnOverview();},u,0);return;
  }
  const u=state==='EXITING'?qa.route?.u||0:0;
  setState('EXITING');motionRoute('exit',selectedId,selectedId,()=>resetOverview(),u,1);
}
function scrollComposition(){
  if(!entryArmed||activeMotion||journey.hidden||selectedId!=='s01_services')return;
  const phase=journeyPhase(window.scrollY,entryHeight,Math.max(1,contentHeight-innerHeight*.6),exitLength);
  if(!contentReady&&phase.state!=='FOCUSED'){
    const u=Math.min(.45,window.scrollY/entryHeight),sample=applyRoute('entry',selectedId,selectedId,u);
    setState('ENTERING');setFog(sample.maskFog);shell.style.opacity='0';setContentVisible(false);return;
  }
  setState(phase.state);
  if(phase.state==='FOCUSED'){applyRoute('entry',selectedId,selectedId,0);setFog(0);shell.style.opacity='0';setContentVisible(false);return;}
  if(phase.state==='ENTERING'){
    const u=contentReady?phase.entry:Math.min(.45,phase.entry),sample=applyRoute('entry',selectedId,selectedId,u);
    setFog(sample.maskFog);shell.style.opacity=String(contentReady?smooth(remap(u,.55,.94)):0);setContentVisible(contentReady&&u>.94);
  }else if(phase.state==='CONTENT'){
    applyRoute('entry',selectedId,selectedId,1);setFog(0);shell.style.opacity=contentReady?'1':'0';setContentVisible(contentReady);
    if(!historyEntered){historyEntered=true;history.pushState({tide:'content'},'',location.pathname+location.search+'#services-content');}
  }else{
    const u=phase.exit,sample=applyRoute('exit',selectedId,selectedId,u);setFog(sample.maskFog);shell.style.opacity=String(1-smooth(remap(u,.08,.48)));setContentVisible(false);
    if(u>=.995)resetOverview(true);
  }
}
function addFog(){
  const cards=atmosphere.fogCards.filter(c=>getAspect()!=='portrait'||c.mobile_enabled);
  for(let i=0;i<cards.length;i++){
    const spec=cards[i],geometry=new THREE.PlaneGeometry(spec.width_m,spec.height_m);
    const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{time:{value:0},seed:{value:spec.seed%97},peakAlpha:{value:spec.peak_alpha}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform float time;uniform float seed;uniform float peakAlpha;varying vec2 vUv;float n(vec2 p){return sin(p.x*2.1+sin(p.y*3.7))*sin(p.y*1.4+sin(p.x*1.3));}void main(){vec2 uv=vUv;float shape=smoothstep(0.0,.2,uv.x)*(1.0-smoothstep(.8,1.0,uv.x))*smoothstep(0.0,.35,uv.y)*(1.0-smoothstep(.45,1.0,uv.y));float cloud=.5+.5*n(uv*vec2(6.0,2.0)+vec2(time*.02+seed,seed));gl_FragColor=vec4(.14,.17,.19,shape*cloud*peakAlpha);}',toneMapped:true});
    const card=new THREE.Mesh(geometry,material);card.position.set(...spec.base_position_web);card.userData.fogSpec=spec;card.layers.set(1);card.name='FOG_RUNTIME_'+i;scene.add(card);fogCards.push(card);
  }
  qa.quality.fogCards=fogCards.length;qa.quality.fogDistance=[45,480];
}
function stageTargets(){
  for(const stage of contract.stages){
    const item=navigation.stages.find(s=>s.id===stage.id);
    const el=document.createElement('a');el.id='stage-'+stage.id;el.className='stage-target';el.setAttribute('aria-label',stage.label);el.innerHTML='<span>'+stage.label+'</span>';
    el.href=item.href||'#'+item.slug;if(item.mode==='external'){el.target='_blank';el.rel='noopener';}
    listen(el,'click',event=>{
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      if(state==='FOCUSED'&&selectedId===stage.id&&item.mode==='external')return;
      event.preventDefault();selectStage(stage.id);
    });
    listen(el,'pointerenter',()=>{if(stage.id==='s01_services')qa.hover=true;});listen(el,'pointerleave',()=>{qa.hover=false;});
    targets.append(el);hitTargets.push({el,stage});
  }
  qa.navigation=navigation.stages.map(({id,href,mode})=>({id,href,mode}));
}
function updateTargets(){
  const isOverview=state==='OVERVIEW';
  cameraRight.setFromMatrixColumn(camera.matrixWorld,0);
  for(const {el,stage} of hitTargets){
    const enabled=isOverview||(stage.id===selectedId&&state==='FOCUSED');
    if(!enabled){el.hidden=true;continue;}
    projectPoint.set(stage.position[0],2.26,stage.position[2]).project(camera);
    if(projectPoint.z>1||projectPoint.z< -1){el.hidden=true;continue;}
    const centerX=(projectPoint.x*.5+.5)*innerWidth,centerY=(-projectPoint.y*.5+.5)*innerHeight;
    const point=new THREE.Vector3(stage.position[0],2.26,stage.position[2]).addScaledVector(cameraRight,2).project(camera);
    const size=clamp(Math.abs(point.x-projectPoint.x)*innerWidth,44,state==='FOCUSED'?innerHeight*.56:135);
    el.hidden=false;el.style.left=centerX-size/2+'px';el.style.top=centerY-size/2+'px';el.style.width=size+'px';el.style.height=size+'px';
  }
}
async function loadGLB(path,required=true){
  try{const loader=new GLTFLoader();loader.setMeshoptDecoder(MeshoptDecoder);const result=await loader.loadAsync(path);qa.assets.push({path,loaded:true});return result;}
  catch(error){qa.assets.push({path,loaded:false});if(required)throw error;qa.warnings.push(path+' unavailable');return null;}
}
function captureLoadingDiagnostics(){
  const resources=performance.getEntriesByType('resource').filter(entry=>{try{return new URL(entry.name).origin===location.origin;}catch{return false;}}).map(entry=>({path:new URL(entry.name).pathname,transferBytes:entry.transferSize,encodedBodyBytes:entry.encodedBodySize,decodedBodyBytes:entry.decodedBodySize,durationMs:entry.duration,initiator:entry.initiatorType}));
  const navigation=performance.getEntriesByType('navigation')[0];
  if(navigation)resources.push({path:location.pathname,transferBytes:navigation.transferSize,encodedBodyBytes:navigation.encodedBodySize,decodedBodyBytes:navigation.decodedBodySize,durationMs:navigation.responseEnd,initiator:'navigation'});
  const category=path=>path.endsWith('.glb')?'glb':path.endsWith('.hdr')?'hdr':path.endsWith('.js')||path.endsWith('.mjs')?'modules':path.startsWith('/data/')?'data':'other';
  const totals={};for(const row of resources){const key=category(row.path);totals[key]??={requests:0,transferBytes:0,encodedBodyBytes:0};totals[key].requests++;totals[key].transferBytes+=row.transferBytes;totals[key].encodedBodyBytes+=row.encodedBodyBytes;}
  const encodedBodyBytes=resources.reduce((sum,row)=>sum+row.encodedBodyBytes,0),transferBytes=resources.reduce((sum,row)=>sum+row.transferBytes,0),budgetMiB=assetConfig.quality==='mobile'?6:10;
  qa.initialPayload={source:'Browser Resource Timing at first scene readiness, before Services preload',resources,totals,encodedBodyBytes,encodedBodyMiB:encodedBodyBytes/1048576,transferBytes,transferMiB:transferBytes/1048576,masterBudgetMiB:budgetMiB,withinEncodedBodyBudget:encodedBodyBytes<=budgetMiB*1048576,containsZeroTransferEntries:resources.some(row=>row.transferBytes===0),note:'Measured transfer includes cache behavior and response overhead. Zero transfer may mean cache; encoded bodies describe payload. Page content is excluded. No throughput/FPS claim.'};
  const gl=renderer.getContext(),target=water.mesh.getRenderTarget();
  qa.gpu={source:'Observed WebGL resource dimensions/capabilities; resident bytes are not queryable',maxTextureSize:gl.getParameter(gl.MAX_TEXTURE_SIZE),maxSamples:gl.getParameter(gl.MAX_SAMPLES),defaultFramebufferSamples:gl.getParameter(gl.SAMPLES),contextAntialias:gl.getContextAttributes().antialias,pmrem:environmentTarget?{width:environmentTarget.width,height:environmentTarget.height,format:'RGBA16F',sharedByBackgroundAndEnvironment:true}:null,reflection:{width:target.width,height:target.height,format:'RGBA16F',samples:target.samples,depthBuffer:target.depthBuffer},materialTextureMiBEstimate:qa.resourceSharing.estimatedMaterialTextureMiB,pmremMiBEstimate:qa.environment?.estimatedResidentPmremMiB||0,waterNormalMiBEstimate:128*128*4*4/3/1048576,reflectionColorMiBEstimate:target.width*target.height*8/1048576};
  qa.gpu.estimatedTextureColorMiB=qa.gpu.materialTextureMiBEstimate+qa.gpu.pmremMiBEstimate+qa.gpu.waterNormalMiBEstimate+qa.gpu.reflectionColorMiBEstimate;
  qa.gpu.estimateExcludes='Main framebuffer/MSAA/depth, reflection depth, geometry, transient decode/conversion peaks, driver overhead. renderer.info counts are observed separately; these MiB are calculated estimates.';
}
async function setup(){
  const entryPoints=assetEntryPoints(assetConfig);
  const [sceneData,cameras,links,routes,atmo]=await Promise.all([fetchDataWithFallback(entryPoints.contract),fetchDataWithFallback(entryPoints.cameras),fetch('/data/navigation.json').then(r=>{if(!r.ok)throw new Error('Navigation unavailable');return r.json();}),loadWorldRoutes(),fetch('/data/world-atmosphere.json').then(r=>{if(!r.ok)throw new Error('Atmosphere unavailable');return r.json();})]);
  navigation=links;worldRoutes=routes;atmosphere=atmo;
  contract=sceneData.value;cameraData=cameras.value;qa.dataSources={contract:sceneData.path,cameras:cameras.path};
  if(sceneData.unavailable.length)qa.warnings.push('Using scene contract fallback: '+sceneData.path);
  if(cameras.unavailable.length)qa.warnings.push('Using camera fallback: '+cameras.path);
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,getAspect()==='portrait'?1.25:1.5));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.AgXToneMapping;renderer.toneMappingExposure=1;renderer.info.autoReset=false;
  scene=new THREE.Scene();scene.background=new THREE.Color('#10161b');scene.fog=new THREE.Fog('#343B40',45,480);scene.environmentIntensity=.5;scene.backgroundIntensity=.025;
  camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,550);camera.layers.enable(1);updatePoses();copyPose(poses.overview);
  const key=new THREE.DirectionalLight('#eceff2',2.2);key.position.set(-16,20,30);scene.add(key);
  const fill=new THREE.DirectionalLight('#b6c2ce',.7);fill.position.set(22,12,-24);scene.add(fill);
  const ambient=new THREE.HemisphereLight('#a1aab3','#0b0e10',.18);scene.add(ambient);
  water=createWater({mobile:getAspect()==='portrait',qa});scene.add(water.mesh);addFog();
  const prefix=assetConfig.prefix;
  const loaded=await Promise.all([loadGLB(prefix+'icon_services_lod0.glb'),loadGLB(prefix+'platform.glb'),loadGLB('/world_v008/optimized/environment.glb'),loadGLB(prefix+entryPoints.neighbors,entryPoints.neighborsRequired)]);
  qa.resourceSharing=await poolAssetResources(loaded);
  const [icon,platform,env,neighbours]=loaded.map(result=>result?.scene||null);
  const stage=contract.stages.find(s=>s.id==='s01_services');servicesPivot=new THREE.Group();servicesPivot.name='ICON_ANCHOR_s01_services';servicesPivot.position.set(stage.position[0],2.26,stage.position[2]);servicesPivot.rotation.y=THREE.MathUtils.degToRad(stage.overviewYawDegrees);servicesPivot.add(icon);servicesModel=icon;scene.add(servicesPivot);
  platform.position.set(...stage.position);scene.add(platform);scene.add(env);if(neighbours)scene.add(neighbours);
  stageModels.set(stage.id,servicesPivot);neighbours?.traverse(obj=>{if(obj.userData.role==='icon'&&obj.userData.stage_id)stageModels.set(obj.userData.stage_id,obj);});
  routeYaws=Object.fromEntries(contract.stages.map(s=>[s.id,s.overviewYawDegrees]));
  icon.traverse(obj=>{if(obj.isMesh){const list=Array.isArray(obj.material)?obj.material:[obj.material];for(const material of list)if(material.emissive?.getHex()>0&&!emissiveMaterials.some(item=>item.material===material))emissiveMaterials.push({material,intensity:material.emissiveIntensity});}});
  pmrem=new THREE.PMREMGenerator(renderer);pmrem.compileEquirectangularShader();
  try{
    environmentTexture=await new HDRLoader().loadAsync('/environment/belfast_sunset_puresky_2k.hdr');environmentTexture.mapping=THREE.EquirectangularReflectionMapping;
    environmentTarget=pmrem.fromEquirectangular(environmentTexture);
    scene.environment=environmentTarget.texture;scene.background=environmentTarget.texture;
    environmentTexture.dispose();environmentTexture=null;pmrem.dispose();pmrem=null;
    qa.environment={path:'/environment/belfast_sunset_puresky_2k.hdr',loaded:true,pmremBuilds:1,sharedBackgroundEnvironment:true,inputHdrReleased:true,generatorScratchReleased:true,residentPmremSize:[environmentTarget.width,environmentTarget.height],estimatedResidentPmremMiB:environmentTarget.width*environmentTarget.height*8/1048576};
  }catch(error){environmentTexture?.dispose();environmentTexture=null;pmrem?.dispose();pmrem=null;qa.warnings.push('HDR environment unavailable: neutral fallback');qa.environment={loaded:false};}
  stageTargets();ready=true;setState('OVERVIEW');history.replaceState({tide:'overview'},'',location.pathname+location.search);log('ready');
  qa.geometry={servicesBounds:new THREE.Box3().setFromObject(icon).getSize(new THREE.Vector3()).toArray(),placements:'Services local once; neighbour world transforms retained'};
  resize();
  captureLoadingDiagnostics();publishQa();
  const initial=navigation.stages.find(s=>initialHash==='#'+s.slug||initialHash==='#'+s.slug+'-content');if(initial){history.replaceState({tide:initial.id},'',location.pathname+location.search+initialHash);pendingContentRestore=initialHash==='#services-content';selectStage(initial.id,false);}
}
function resize(){
  if(!renderer)return;
  const oldEntry=entryHeight,scrollProgress=oldEntry?window.scrollY/oldEntry:0;
  renderer.setPixelRatio(Math.min(devicePixelRatio,getAspect()==='portrait'?1.25:1.5));renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();water.resize(getAspect()==='portrait');updatePoses();
  entryHeight=innerHeight*(reduced.matches?.28:.95);exitLength=innerHeight*(reduced.matches?.3:.75);document.documentElement.style.setProperty('--entry-height',entryHeight+'px');document.documentElement.style.setProperty('--exit-height',innerHeight*1.4+'px');
  if(state==='OVERVIEW')copyPose(poses.overview);else if(state==='FOCUSED')copyPose(poses.focus);
  if(entryArmed&&scrollProgress>0&&scrollProgress<1)window.scrollTo({top:entryHeight*scrollProgress,behavior:'instant'});
  sendViewport();scrollComposition();
}
function pointerRipple(event,force=false){
  if(!water||!['OVERVIEW','FOCUSED'].includes(state)||document.hidden)return;
  if(event.target!==canvas)return;
  pointer.set(event.clientX/innerWidth*2-1,-event.clientY/innerHeight*2+1);raycaster.setFromCamera(pointer,camera);
  if(raycaster.ray.intersectPlane(waterPlane,waterPoint)&&Math.abs(waterPoint.x)<480&&Math.abs(waterPoint.z)<480)water.pool.inject(waterPoint.x,waterPoint.z,clock,{force});
}
function animate(now){
  raf=requestAnimationFrame(animate);if(document.hidden){lastTime=now;return;}
  const dt=lastTime?Math.min((now-lastTime)/1000,.05):0;lastTime=now;clock+=dt;
  if(!renderer||!ready)return;
  oldBase.copy(base.position);const moving=stepMotion();
  if(!moving&&entryArmed)scrollComposition();
  if(dt>0)velocity.copy(base.position).sub(oldBase).divideScalar(dt);
  fogOpacity=THREE.MathUtils.damp(fogOpacity,fogTarget,18,dt);if(Math.abs(fogOpacity-fogTarget)<.001)fogOpacity=fogTarget;fog.style.opacity=String(fogOpacity);
  camera.position.copy(base.position);currentLook.copy(base.target);camera.fov=base.fov;
  const frozen=reduced.matches||still,animationTime=frozen?0:clock;
  if(!frozen&&state==='FOCUSED'){camera.position.x+=Math.sin(clock*Math.PI*2/14)*.035;camera.position.y+=Math.sin(clock*Math.PI*2/16)*.018;}
  camera.lookAt(currentLook);camera.updateProjectionMatrix();camera.updateMatrixWorld();
  for(const [id,model]of stageModels){model.rotation.y=THREE.MathUtils.degToRad(routeYaws[id]??contract.stages.find(s=>s.id===id).overviewYawDegrees);model.position.y=2.26+(frozen?0:Math.sin(animationTime*2*Math.PI/9)*.035);}
  const active=['FOCUSED','ENTERING','CONTENT'].includes(state);for(const {material,intensity}of emissiveMaterials)material.emissiveIntensity=intensity*(active?1.35:qa.hover?1.25:1)*(1+(frozen?0:Math.sin(animationTime*.75)*.08));
  const skyYaw=THREE.MathUtils.degToRad(135)+animationTime*THREE.MathUtils.degToRad(.04);scene.backgroundRotation.y=skyYaw;scene.environmentRotation.y=skyYaw;
  for(let i=0;i<fogCards.length;i++){const card=fogCards[i];card.material.uniforms.time.value=animationTime;const spec=card.userData.fogSpec;card.position.x=spec.base_position_web[0]+spec.motion_amplitude_m*Math.sin(animationTime*spec.peak_speed_m_per_s/spec.motion_amplitude_m+spec.phase_radians);card.rotation.y=Math.atan2(camera.position.x-card.position.x,camera.position.z-card.position.z);}
  water.update(animationTime,moving||state==='ENTERING'||state==='EXITING');updateTargets();
  fog.style.setProperty('--fog-x',Math.sin(animationTime*.06)*35+'px');
  if(state==='CONTENT'&&now-lastRender<1000/15)return;
  lastRender=now;renderer.info.reset();const start=performance.now();renderer.render(scene,camera);const elapsed=performance.now()-start;
  qa.frames++;qa.render={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,programs:renderer.info.programs.length,cpuRenderMilliseconds:elapsed};
  if(qa.frames%30===0){qa.viewport.actualWebGLViewport=renderer.getCurrentViewport(new THREE.Vector4()).toArray();qa.viewport.drawingBuffer=renderer.getDrawingBufferSize(new THREE.Vector2()).toArray();publishQa();}
  if(qa.frames%60===0){qa.timings.push({time:clock,...qa.render});if(qa.timings.length>100)qa.timings.shift();}
}

listen(window,'message',event=>{
  if(!validEnvelope(event,location.origin,frame.contentWindow,sessionId,['READY','RESIZE','CONTENT_ERROR','SCROLL_REQUEST','ESCAPE'])){if(event.data?.channel==='memento:tide')qa.bridge.rejected++;return;}
  const d=event.data;
  if(d.type==='READY'){contentReady=true;qa.bridge.ready=true;qa.bridge.readyTime=clock;qa.bridge.heroImageReady=d.payload.heroImageReady;qa.bridge.catalogueCards=d.payload.catalogueCards;clearTimeout(bridgeTimer);$('#fallback').hidden=true;log('content_ready');sendViewport();}
  if((d.type==='RESIZE'||d.type==='READY')&&Number.isFinite(d.payload.height)&&d.payload.height>200&&d.payload.height<100000){contentHeight=Math.ceil(d.payload.height);frame.style.height=contentHeight+'px';shell.style.minHeight=contentHeight+'px';qa.bridge.resizes++;}
  if(d.type==='CONTENT_ERROR'){qa.warnings.push('Services: '+d.payload.message);}
  if(d.type==='SCROLL_REQUEST'&&Number.isFinite(d.payload.offset))window.scrollTo({top:entryHeight+clamp(d.payload.offset,0,contentHeight),behavior:reduced.matches?'instant':'smooth'});
  if(d.type==='ESCAPE')returnOverview();
});
listen(window,'scroll',()=>{sendViewport();},{passive:true});
listen(window,'resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,100);},{passive:true});
listen(window,'wheel',event=>{if(state==='OVERVIEW'&&event.deltaY>18)selectServices();},{passive:true});
listen(canvas,'pointermove',event=>pointerRipple(event),{passive:true});
listen(canvas,'pointerdown',event=>{lastPointerDown={x:event.clientX,y:event.clientY};},{passive:true});
listen(canvas,'pointerup',event=>{if(lastPointerDown&&Math.hypot(event.clientX-lastPointerDown.x,event.clientY-lastPointerDown.y)<8)pointerRipple(event,true);lastPointerDown=null;},{passive:true});
listen(targets,'pointerdown',event=>{targetGesture={x:event.clientX,y:event.clientY,moved:false};},{capture:true,passive:true});
listen(targets,'pointermove',event=>{if(targetGesture&&Math.hypot(event.clientX-targetGesture.x,event.clientY-targetGesture.y)>8)targetGesture.moved=true;},{capture:true,passive:true});
listen(targets,'click',event=>{if(targetGesture?.moved){event.preventDefault();event.stopPropagation();}targetGesture=null;},{capture:true});
listen(window,'keydown',event=>{
  if(event.target.closest?.('input,textarea,select,[contenteditable=true]'))return;
  if(event.key==='Escape'){event.preventDefault();returnOverview();}
  if((event.key==='ArrowDown'||event.key==='Enter')&&(event.target===document.body||event.target===canvas)){if(state==='OVERVIEW'){event.preventDefault();selectServices();}else if(state==='FOCUSED'){event.preventDefault();enterContent();}}
  if(['ArrowLeft','ArrowRight'].includes(event.key)&&state==='FOCUSED'){const index=contract.stages.findIndex(s=>s.id===selectedId);selectStage(contract.stages[(index+(event.key==='ArrowRight'?1:5))%6].id);event.preventDefault();return;}
  if(['ArrowLeft','ArrowRight'].includes(event.key)&&targets.contains(event.target)){const list=hitTargets.map(t=>t.el).filter(el=>!el.hidden&&el.getAttribute('aria-disabled')!=='true');const index=list.indexOf(event.target);list[(index+(event.key==='ArrowRight'?1:list.length-1))%list.length]?.focus();event.preventDefault();}
});
listen(window,'popstate',()=>{
  const content=location.hash==='#services-content',wanted=navigation?.stages.find(s=>location.hash==='#'+s.slug||(content&&s.id==='s01_services'));
  if(wanted&&wanted.id===selectedId&&!activeMotion){if(selectedId==='s01_services')restoreServicesHistory(content);}
  else if(wanted&&['OVERVIEW','FOCUSED'].includes(state)){pendingContentRestore=content;selectStage(wanted.id,false);}
  else returnOverview();
});
listen($('#open-section'),'click',event=>{const item=navigation?.stages.find(s=>s.id===selectedId);if(item?.mode==='external')return;event.preventDefault();if(item?.mode==='services-embedded')enterContent();else returnOverview();});
listen($('#back-lake'),'click',returnOverview);
listen(reduced,'change',resize);
listen(document,'visibilitychange',()=>{lastTime=0;bridgeSend('VISIBILITY',{active:!document.hidden&&state==='CONTENT'});});
listen(canvas,'webglcontextlost',event=>{event.preventDefault();reportError(new Error('WebGL context lost'),true);});
listen(canvas,'webglcontextrestored',()=>{location.reload();});
listen($('#dismiss-error'),'click',()=>{$('#fallback').hidden=true;});
listen(window,'error',event=>{qa.errors.push(String(event.message));});
listen(window,'unhandledrejection',event=>{qa.errors.push(String(event.reason?.message||event.reason));});
listen(window,'pageshow',event=>{if(event.persisted){lastTime=0;raf=requestAnimationFrame(animate);qa.rafLoops=1;}});
listen(window,'pagehide',event=>{if(event.persisted){cancelAnimationFrame(raf);qa.rafLoops=0;return;}cancelAnimationFrame(raf);clearTimeout(bridgeTimer);clearTimeout(resizeTimer);abort.abort();water?.dispose();environmentTarget?.dispose();environmentTexture?.dispose();pmrem?.dispose();renderer?.dispose();qa.rafLoops=0;});
setup().catch(error=>reportError(error,true));raf=requestAnimationFrame(animate);
