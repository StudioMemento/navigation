import * as T from 'three';
import { GLTFLoader } from '../vendor/loaders/GLTFLoader.js';
import { DRACOLoader } from '../vendor/loaders/DRACOLoader.js';
import { HDRLoader } from '../vendor/loaders/HDRLoader.js';
import { Navigator, STATIONS, LABELS, sampleTRS, applyProjection, applyFacing, blenderEnvironmentRotation } from './motion.mjs';
import { createLights, Atmosphere } from './atmosphere.mjs';
import { Telemetry } from './telemetry.mjs';
const $=id=>document.getElementById(id),params=new URLSearchParams(location.search),qaMode=params.has('qa');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const pagePaths={services:'/catalog/',projects:'/pages/projects/',levelup:'/pages/levelup/',start:'/pages/start/'};
const pageRecords=new Map(),uiErrors=[],checks={};
let source,scene,camera,renderer,nav,atmosphere,telemetry,byName,ambient=0,paused=reduced.matches,frozen=params.has('still'),profile,worldReadyMs=null,initialResourceSnapshot=null,qaTimer=0,loopHandle=0,lastTime=0,lightSelect;
let historyOwned=false,openingFromHistory=false,animationLoopStarted=false,pendingPageIndex=null;
const diag={};
const logError=(message)=>{uiErrors.push(String(message));console.error(message);};
addEventListener('error',e=>logError(e.message));addEventListener('unhandledrejection',e=>logError(e.reason?.message||e.reason));
function failure(error){$('load-copy').textContent='Caricamento interrotto';$('error-copy').textContent=error?.message||'Riprova a caricare la preview.';$('error').hidden=false;logError(error?.message||error);}
$('retry').onclick=()=>location.reload();$('qa').hidden=!qaMode;
const setStatus=text=>$('status').textContent=text;
function pageMessage(record,type,payload={}){record?.iframe.contentWindow?.postMessage({channel:'memento:carbon-preview',session:record.session,type,payload},location.origin);}
function preloadPage(index){
  const slug=STATIONS[index];if(pageRecords.has(slug)){const record=pageRecords.get(slug);if(record.ready)queueMicrotask(()=>nav.ready(index));return record;}
  const iframe=document.createElement('iframe'),session=crypto.randomUUID();iframe.className='page-frame';iframe.title=`${LABELS[index]} — Memento`;iframe.dataset.station=slug;iframe.hidden=true;
  iframe.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
  iframe.src=pagePaths[slug]+'?sessionId='+encodeURIComponent(session);$('page-frame-wrap').append(iframe);
  const record={iframe,session,index,ready:false,started:performance.now(),readyMs:null,error:null};pageRecords.set(slug,record);
  record.timeout=setTimeout(()=>{if(!record.ready){record.error='Caricamento non completato';if(nav.active===index)$('page-error').hidden=false;renderDiagnostics();}},22000);return record;
}
function beginEnter(index){
  preloadPage(index);$('transition-label').textContent=LABELS[index].toUpperCase();
  if(!openingFromHistory){history.pushState({previewPage:STATIONS[index]},'',`/${STATIONS[index]}/${qaMode?'?qa=1':''}`);historyOwned=true;}
  else history.replaceState({previewPage:STATIONS[index]},'',`/${STATIONS[index]}/${qaMode?'?qa=1':''}`);
  openingFromHistory=false;
}
function beginReturn(){
  $('page-error').hidden=true;
  for(const r of pageRecords.values())pageMessage(r,'VISIBILITY',{active:false});
  $('page-shell').classList.remove('visible');$('page-shell').hidden=true;$('world').inert=false;
  if(location.pathname!=='/')history.replaceState({},'',`/${qaMode?'?qa=1':''}#${STATIONS[nav.active]}`);
  historyOwned=false;lastTime=0;
}
function back(){pendingPageIndex=null;nav?.back();}
function updateUI(state){
  $('world').dataset.state=state.state;$('world').dataset.station=STATIONS[state.active];$('world').setAttribute('aria-busy',String(!['idle','page'].includes(state.state)));
  document.querySelectorAll('[data-station]').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.station)===state.target)));
  const idle=state.state==='idle';$('home').disabled=!['idle','orbit'].includes(state.state);$('previous').disabled=$('next').disabled=!['idle','orbit'].includes(state.state);
  $('previous').setAttribute('aria-label',`Vai a ${LABELS[(state.target+4)%5]}`);$('next').setAttribute('aria-label',`Vai a ${LABELS[(state.target+1)%5]}`);
  $('enter').disabled=!idle||state.active===0;$('enter').setAttribute('aria-label',`Entra in ${LABELS[state.active]}`);
  $('hint').textContent=idle&&state.active!==0?`Esplora ${LABELS[state.active]}`:'';
  const landing=['idle','orbit'].includes(state.state);$('world-hud').style.opacity=landing?'1':'0';$('world-footer').style.opacity=landing?'1':'0';$('world-footer').inert=!landing;
  if(idle){setStatus(`${LABELS[state.active]}. ${state.active?'Premi Invio per entrare.':'Scegli una stazione.'}`);history.replaceState({},'',`/${qaMode?'?qa=1':''}#${STATIONS[state.active]}`);$('enter').focus({preventScroll:true});}
  if(state.state==='waiting'){setStatus(`Caricamento di ${LABELS[state.active]}`);}
  if(state.state==='page'){
    if(telemetry.started)telemetry.finish();
    const record=pageRecords.get(STATIONS[state.active]);if(!record?.ready)return;
    $('page-label').textContent=LABELS[state.active].toUpperCase();for(const r of pageRecords.values())r.iframe.hidden=r!==record;
    $('page-shell').hidden=false;requestAnimationFrame(()=>$('page-shell').classList.add('visible'));
    $('world').inert=true;pageMessage(record,'VISIBILITY',{active:true,focus:true});$('return').focus({preventScroll:true});setStatus(`Pagina ${LABELS[state.active]}. Torna alle torri per risalire.`);
  }
  if(idle&&pendingPageIndex!==null){const next=pendingPageIndex;queueMicrotask(()=>{if(nav.active===next){pendingPageIndex=null;nav.enter();}else nav.select(next);});}
  if(qaMode)renderDiagnostics();
}
addEventListener('message',e=>{
  if(e.origin!==location.origin||e.data?.channel!=='memento:carbon-preview')return;
  const record=[...pageRecords.values()].find(r=>r.iframe.contentWindow===e.source&&r.session===e.data.session);if(!record)return;
  if(e.data.type==='READY'){record.ready=true;clearTimeout(record.timeout);record.readyMs=performance.now()-record.started;record.details=e.data.payload;nav.ready(record.index);}
  if(e.data.type==='METRICS'){record.details=e.data.payload;if(qaMode)renderDiagnostics();}
  if(e.data.type==='NAVIGATE'){const next=STATIONS.indexOf(e.data.payload.station);if(next>0){pendingPageIndex=next;preloadPage(next);nav.back();}}
  if(e.data.type==='EXIT'&&record.index===nav.active)back();
  if(e.data.type==='ERROR'){record.error=e.data.payload;logError(`Pagina ${STATIONS[record.index]}: ${JSON.stringify(e.data.payload)}`);}
});
addEventListener('popstate',()=>{
  if(!nav)return;const slug=location.pathname.split('/')[1],index=STATIONS.indexOf(slug);
  if(index>0){openingFromHistory=true;if(nav.state==='idle'){nav.arrive(index,false);nav.enter();}else if(nav.state==='ascending'){pendingPageIndex=index;}}
  else if(['page','waiting','descending'].includes(nav.state)){historyOwned=false;nav.back();}
});
function resize(){
  if(!renderer||!source)return;const w=innerWidth,h=innerHeight,short=Math.min(w,h);
  document.documentElement.style.setProperty('--short',short+'px');document.documentElement.style.setProperty('--d',short*.87+'px');
  profile=applyProjection(camera,source,w,h);const ratio=Math.min(devicePixelRatio,profile==='mobile'?1:1.25);
  renderer.setPixelRatio(ratio);renderer.setSize(w,h,false);const size=renderer.getDrawingBufferSize(new T.Vector2());atmosphere?.resize(size.x,size.y,profile==='mobile');
  $('world').dataset.profile=profile;if(qaMode&&nav)renderDiagnostics();
}
addEventListener('resize',resize);
$('home').onclick=()=>nav?.select(0);$('previous').onclick=()=>nav?.select(nav.target-1);$('next').onclick=()=>nav?.select(nav.target+1);$('enter').onclick=()=>nav?.enter();$('return').onclick=back;
$('cancel-page').onclick=back;$('retry-page').onclick=()=>{const slug=STATIONS[nav.active],record=pageRecords.get(slug);record?.iframe.remove();clearTimeout(record?.timeout);pageRecords.delete(slug);$('page-error').hidden=true;preloadPage(nav.active);};
document.querySelectorAll('[data-station]').forEach(b=>b.onclick=()=>nav?.select(Number(b.dataset.station)));
function syncMotionUI(){$('pause').setAttribute('aria-pressed',String(paused));$('pause').setAttribute('aria-label',paused?'Riprendi animazione ambiente':'Ferma animazione ambiente');$('pause').firstElementChild.textContent=paused?'▷':'Ⅱ';}
$('pause').onclick=()=>{paused=!paused;syncMotionUI();};
reduced.addEventListener('change',e=>{paused=e.matches;if(nav)nav.reduced=e.matches;syncMotionUI();});
addEventListener('keydown',e=>{
  if(!nav||e.target.closest('input,select,textarea,#qa')||nav.state==='page')return;
  if(e.key==='ArrowRight'){e.preventDefault();nav.select(nav.target+1);}if(e.key==='ArrowLeft'){e.preventDefault();nav.select(nav.target-1);}
  if((e.key==='ArrowDown'||e.key==='Enter')&&e.target===document.body){e.preventDefault();nav.enter();}
  if(e.key==='Escape'){e.preventDefault();nav.back();}
});
function animateObjects(){
  const frame=frozen?nav.active*240:((ambient*30)%1200);
  for(const [name,samples] of Object.entries(source.tracks)){const node=byName.get(name);if(node)sampleTRS(samples,frame,node);}
  for(const [name,samples] of Object.entries(source.materialTracks)){
    const i=Math.floor(frame),t=frame-i,value=samples[i]*(1-t)+samples[Math.min(i+1,1200)]*t;
    for(const m of diag.materials.get(name)||[])m.emissiveIntensity=value;
  }
  scene.updateMatrixWorld(true);
  for(let i=1;i<=5;i++)applyFacing(byName.get(`STG_${String(i).padStart(2,'0')}_ICON_ANCHOR`),camera);
  scene.updateMatrixWorld(true);
}
function frame(now){
  loopHandle=requestAnimationFrame(frame);const dt=lastTime?Math.min(.1,(now-lastTime)/1000):0;lastTime=now;
  if(document.hidden||nav.state==='page')return;
  nav.tick(dt);if(!paused&&!frozen)ambient+=dt;
  camera.updateMatrixWorld(true);animateObjects();lightSelect(nav.state==='orbit'?nav.leg.from:nav.active,nav.state==='orbit'?nav.leg:null);
  const opacity=['waiting','page'].includes(nav.state)?1:['descending','ascending'].includes(nav.state)?T.MathUtils.smoothstep(nav.progress,.83,1):0;
  $('transition').style.opacity=opacity;
  renderer.info.reset();telemetry.begin();atmosphere.render(ambient);telemetry.end(performance.now(),nav.state);
  if(worldReadyMs===null){worldReadyMs=performance.now();$('world').setAttribute('aria-busy','false');$('loader').hidden=true;$('poster').classList.add('loaded');$('world-hud').hidden=false;$('world-footer').hidden=false;setTimeout(()=>initialResourceSnapshot=telemetry.resources(),200);}
  if(qaMode&&now-qaTimer>500){qaTimer=now;renderDiagnostics();}
}
function renderDiagnostics(){
  if(!renderer||!source||!nav)return;
  const data={sourceSha256:source.source_sha256,state:nav.state,station:STATIONS[nav.active],target:STATIONS[nav.target],descentProgress:nav.progress,profile,viewport:{width:innerWidth,height:innerHeight,devicePixelRatio,renderPixelRatio:renderer.getPixelRatio()},camera:{position:camera.position.toArray(),quaternion:camera.quaternion.toArray(),fov:camera.fov,near:camera.near,far:camera.far},firstWorldMs:worldReadyMs,hardware:telemetry.hardware,checks,render:{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures},measurement:telemetry.started?'running':telemetry.result,heapUsedMiB:performance.memory?performance.memory.usedJSHeapSize/1048576:null,initialResources:initialResourceSnapshot?{count:initialResourceSnapshot.count,transferBytes:initialResourceSnapshot.transferBytes,encodedBytes:initialResourceSnapshot.encodedBytes,decodedBytes:initialResourceSnapshot.decodedBytes}:null,pages:[...pageRecords.entries()].map(([slug,r])=>({slug,ready:r.ready,readyMs:r.readyMs,error:r.error,details:r.details})),errors:uiErrors};
  $('diagnostics').textContent=JSON.stringify(data,null,2);
}
$('measure').onclick=()=>{if(nav?.state==='page')pageMessage(pageRecords.get(STATIONS[nav.active]),'MEASURE');else telemetry?.start(12);renderDiagnostics();};
$('qa-orbit').onclick=()=>{if(nav?.state!=='idle')return;telemetry.start(15);nav.select((nav.active+2)%5);setTimeout(()=>nav.select((nav.active+2)%5),6500);renderDiagnostics();};
$('qa-services').onclick=()=>{if(nav?.state!=='idle')return;nav.arrive(1);telemetry.start(6);nav.enter();renderDiagnostics();};
$('qa-frozen').onclick=()=>{frozen=!frozen;renderDiagnostics();};
$('qa-reduced').onchange=e=>{if(nav)nav.reduced=e.target.checked||reduced.matches;paused=e.target.checked||reduced.matches;syncMotionUI();renderDiagnostics();};
async function init(){
  syncMotionUI();
  source=await fetch('/assets/scene.json').then(r=>{if(!r.ok)throw Error('Dati della scena non disponibili');return r.json();});
  renderer=new T.WebGLRenderer({canvas:$('canvas'),antialias:false,alpha:false,powerPreference:'high-performance'});renderer.info.autoReset=false;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMappingExposure=Math.pow(2,source.environment.exposure);
  renderer.debug.onShaderError=(gl,program,vertex,fragment)=>failure(Error('Shader: '+gl.getShaderInfoLog(fragment)));
  scene=new T.Scene();camera=new T.PerspectiveCamera();telemetry=new Telemetry(renderer);
  const draco=new DRACOLoader().setDecoderPath('/vendor/draco/').setWorkerLimit(2);const loader=new GLTFLoader().setDRACOLoader(draco);
  $('load-copy').textContent='Geometrie, luce e movimento';
  const [gltf,hdr]=await Promise.all([loader.loadAsync('/assets/world.glb'),new HDRLoader().loadAsync('/assets/environment.hdr')]);
  scene.add(gltf.scene);byName=new Map();diag.materials=new Map();
  gltf.scene.traverse(o=>{
    const n=o.userData.source_name||o.name;if(n)byName.set(n,o);
    if(o.isMesh){o.frustumCulled=true;for(const m of (Array.isArray(o.material)?o.material:[o.material])){
      const name=m.userData.source_name||m.name.replace('__EXPORT__','');if(!diag.materials.has(name))diag.materials.set(name,new Set());diag.materials.get(name).add(m);
    }}
  });
  const missing=source.nodes.filter(n=>!byName.has(n.name)).map(n=>n.name);checks.sourceNodes=source.nodes.length;checks.loadedSourceNodes=source.nodes.length-missing.length;checks.missingNodes=missing;
  checks.hierarchyMismatches=source.nodes.filter(n=>n.parent&&(byName.get(n.name)?.parent?.userData.source_name||byName.get(n.name)?.parent?.name)!==n.parent).map(n=>n.name);
  if(missing.length||checks.hierarchyMismatches.length)throw Error('La gerarchia caricata non corrisponde alla V2.');
  // This source uses World Texture Coordinate.NORMAL (= -ray direction).
  // Its latitude reversal and half-turn must accompany the Mapping rotation.
  hdr.flipY=!hdr.flipY;hdr.mapping=T.EquirectangularReflectionMapping;scene.background=hdr;scene.environment=hdr;
  scene.backgroundRotation.y=blenderEnvironmentRotation(source.environment.rotation_z_blender);scene.environmentRotation.y=scene.backgroundRotation.y;
  scene.backgroundIntensity=.23;scene.environmentIntensity=.18;
  lightSelect=createLights(scene,source);lightSelect(0);atmosphere=new Atmosphere(renderer,scene,camera);
  nav=new Navigator(source,camera,{onChange:updateUI,onEnter:beginEnter,onReturn:beginReturn,reduced:reduced.matches});
  resize();const hashIndex=STATIONS.indexOf(location.hash.slice(1));const pathIndex=STATIONS.indexOf(location.pathname.split('/')[1]);
  if(hashIndex>=0)nav.arrive(hashIndex);if(pathIndex>0){nav.arrive(pathIndex,false);openingFromHistory=true;nav.enter();if(params.has('flat'))nav.progress=1;}else nav.announce();
  animateObjects();camera.updateMatrixWorld(true);
  await renderer.compileAsync(scene,camera);
  const savedPosition=camera.position.clone(),savedRotation=camera.quaternion.clone();
  // Prepare geometry buffers and shader variants before exposing navigation.
  const warmPoses=STATIONS.flatMap((slug,i)=>[{index:i,pose:source.cameras.orbit.samples[i*240]},...(i?[{index:i,pose:source.descents[slug].samples[180]}]:[])]);
  for(let i=0;i<warmPoses.length;i++){
    $('load-copy').textContent=`Preparazione del mondo · ${i+1}/${warmPoses.length}`;
    sampleTRS([warmPoses[i].pose],0,camera);camera.updateMatrixWorld(true);animateObjects();lightSelect(warmPoses[i].index);atmosphere.render(0);
    await new Promise(requestAnimationFrame);
  }
  camera.position.copy(savedPosition);camera.quaternion.copy(savedRotation);camera.updateMatrixWorld(true);lightSelect(nav.active);
  animationLoopStarted=true;requestAnimationFrame(frame);
  const raycaster=new T.Raycaster(),pointer=new T.Vector2();let down=null;
  $('canvas').addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};});
  $('canvas').addEventListener('pointerup',e=>{
    if(!down||!['idle','orbit'].includes(nav.state))return;const dx=e.clientX-down.x,dy=e.clientY-down.y;down=null;
    if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4){nav.select(nav.target+(dx<0?1:-1));return;}if(Math.hypot(dx,dy)>12)return;
    pointer.set(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);raycaster.setFromCamera(pointer,camera);
    for(const hit of raycaster.intersectObjects(gltf.scene.children,true)){
      let o=hit.object,index=-1;while(o){const n=o.userData.source_name||o.name;const m=n.match(/^STG_0([1-5])_ROOT$/);if(m){index=Number(m[1])-1;break;}o=o.parent;}
      if(index>=0){if(index===nav.active&&nav.state==='idle')nav.enter();else nav.select(index);break;}
    }
  });
  $('canvas').addEventListener('webglcontextlost',e=>{e.preventDefault();failure(Error('La sessione grafica si è interrotta. Ricarica la preview.'));});
}
init().catch(failure);
