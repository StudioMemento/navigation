import './style.css';
import {Navigation,SECTIONS} from './navigation.js';
import {renderProfile,pixelRatio,AdaptiveQuality,FramePacer} from './performance.js';
import {DESTINATIONS,destinationIndex,readRoute,routeHash} from './destinations.js';
import {createPages} from './pages.js';

const chevron=d=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d==='left'?'M14 5l-7 7 7 7':'M10 5l7 7-7 7'}"/></svg>`;
const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>';
const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7z"/></svg>';
document.querySelector('#app').innerHTML=`
 <div id="home-layer">
 <main id="stage" aria-label="Diorami Memento, trascina per esplorare" tabindex="0"><picture><source media="(max-width:700px)" srcset="/preview-mobile.webp"><img class="poster" src="/preview-desktop.webp" alt="Diorama Memento illuminato in ambra" loading="eager" draggable="false"></picture><canvas aria-label="Scena tridimensionale interattiva"></canvas><div class="veil"></div></main>
 <button class="brand" aria-label="Memento, torna a Home">MEMENTO</button>
 <div class="tools"><button class="index-button">Indice</button><button class="icon-button inspect" aria-label="Osserva il diorama da vicino" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg></button><button class="icon-button pause" aria-label="Pausa animazioni" aria-pressed="false">${pauseIcon}</button></div>
 <div class="bottom-fade"></div>
 <nav class="navigator" aria-label="Navigazione principale"><button class="icon-button nav-arrow prev" aria-label="Sezione precedente">${chevron('left')}</button><button class="section-name" aria-label="Esplora Home">Home</button><button class="icon-button nav-arrow next" aria-label="Sezione successiva">${chevron('right')}</button></nav>
 <nav class="slide-indicators" aria-label="Scegli un mondo">${DESTINATIONS.map((page,i)=>`<button aria-label="Mostra ${page.name}" data-index="${i}" ${i===0?'aria-current="true"':''}><span></span></button>`).join('')}</nav>
 <div class="entry"><p class="section-description">Scegli una direzione.</p><button class="enter-page"><span>Esplora</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></div>
 <span class="gesture-hint">Trascina per esplorare</span>
 <div class="loader" role="progressbar" aria-label="Caricamento modello 3D" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>
 </div><div class="sr-only" id="navigation-status" role="status" aria-live="polite"></div>
 <dialog class="index-dialog" aria-labelledby="index-title"><div class="index-heading"><span id="index-title">ESPLORA MEMENTO</span><button class="icon-button close-index" aria-label="Chiudi indice"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button></div><nav aria-label="Indice delle pagine">${DESTINATIONS.map((page,i)=>`<button data-destination="${i}"><span class="index-number">0${i+1}</span><span class="index-name">${page.name}</span><span class="index-description">${page.description}</span>${chevron('right')}</button>`).join('')}</nav></dialog>`;
const stage=document.querySelector('#stage'),canvas=stage.querySelector('canvas'),label=document.querySelector('.section-name'),poster=stage.querySelector('.poster'),bar=document.querySelector('.loader span'),status=document.querySelector('[role=status]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),nav=new Navigation(SECTIONS.length);
const profile=renderProfile({coarse:matchMedia('(pointer:coarse)').matches,width:innerWidth,cores:navigator.hardwareConcurrency??8,memory:navigator.deviceMemory??8,saveData:navigator.connection?.saveData,hover:matchMedia('(any-hover:hover)').matches});
const quality=new AdaptiveQuality(),pacer=new FramePacer();
let renderer,world,ready=false,disposed=false,current=0,dragId=null,time=0,last=0,raf=0,paused=reduced.matches,zoom=0,zoomTarget=0,labelTimer,mode='loading',wheelTotal=0,wheelAt=0,lockedUntil=0,dirty=true,gesture=null,worldStarted=false;
const pointer={x:0,y:0,tx:0,ty:0,active:false,dirty:false,clientX:0,clientY:0};
let THREE,ray,ndc,hitPoint,pointerDelta,localRay,inverse;
const metrics={mode:'loading',modelBytes:3775036,trianglesPerModel:19204,sharedGeometry:true,visibleModels:0,renderFrames:0,loadError:null};
Object.defineProperty(window,'mementoNoir',{get:()=>({...metrics,section:SECTIONS[current],index:current,paused,view:pageSystem.isOpen?'page':'home',focus:zoomTarget,position:nav.position,target:nav.target,dragging:!!nav.drag,profile:profile.light?'mobile/efficient':'desktop',qualityLevel:quality.level,transition:world?.transition.strength.value??0,ambientParticles:world?.effects[0]?.cloud.count??0,frameWindowMs:quality.meanMs,canvasSize:renderer?{width:canvas.width,height:canvas.height}:null})});
function progress(value){bar.style.transform=`scaleX(${value})`;document.querySelector('.loader').setAttribute('aria-valuenow',Math.round(value*100));}
const menu=document.querySelector('.index-dialog');
const entry=document.querySelector('.enter-page');
const pageSystem=createPages({
 onHome:()=>navigate('home',current),
 onNavigate:slug=>navigate('page',destinationIndex(slug)),
 onMenu:showMenu,
 onVisibility:opened=>{last=0;pacer.reset();quality.resetWindow();dirty=true;pointer.active=false;pointer.dirty=false;if(!opened)ensureWorld();}
});
function ensureWorld(){if(worldStarted)return;worldStarted=true;raf=requestAnimationFrame(frame);init();}
function writeRoute(view,index,method='replace'){
 const hash=routeHash(view,index);
 if(location.hash===hash)return;
 history[method==='push'?'pushState':'replaceState']({...history.state,memento:{view,index}},'',hash);
}
function commitSelection(next,{url=true,animate=true}={}){
 dirty=true;
 const changed=current!==next;current=next;zoomTarget=0;document.body.classList.remove('focused');document.querySelector('.inspect').setAttribute('aria-pressed','false');clearTimeout(labelTimer);
 const change=()=>{label.textContent=SECTIONS[next];label.setAttribute('aria-label',next===0?'Esplora Memento':`Apri ${SECTIONS[next]}`);label.classList.remove('changing');};
 if(changed&&animate&&!reduced.matches){label.classList.add('changing');labelTimer=setTimeout(change,120);}else change();
 document.querySelector('.section-description').textContent=DESTINATIONS[next].description;
 entry.querySelector('span').textContent=next===0?'Esplora':'Entra';entry.setAttribute('aria-label',next===0?'Esplora Memento':`Entra in ${SECTIONS[next]}`);
 document.querySelectorAll('[data-index]').forEach(button=>{if(Number(button.dataset.index)===next)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});
 document.body.dataset.section=DESTINATIONS[next].slug;
 status.textContent=SECTIONS[next];
 if(url)writeRoute('home',next);
 pointer.active=false;pointer.dirty=false;
}
function setSelection(i,options={}){commitSelection(nav.select(i,reduced.matches),options);}
function navigate(view,index,{historyMode='push',focus=true}={}){
 index=Math.max(0,Math.min(DESTINATIONS.length-1,index));
 if(index===0)view='home';
 if(menu.open)menu.close();
 nav.select(index,view==='page'||reduced.matches);commitSelection(index,{url:false,animate:false});
 if(historyMode!=='none')writeRoute(view,index,historyMode);
 document.body.dataset.view=view;document.title=view==='page'?`${SECTIONS[index]} — Memento`:'Memento — Noir';
 if(view==='page')pageSystem.open(index,{focus});else{pageSystem.close({focus});ensureWorld();}
 lockedUntil=performance.now()+750;wheelTotal=0;
}
function openCurrent(){if(current===0)showMenu();else navigate('page',current);}
function showMenu(){if(!menu.open)menu.showModal();}
function focus(){if(!ready)return;dirty=true;zoomTarget=zoomTarget?0:1;document.body.classList.toggle('focused',!!zoomTarget);document.querySelector('.inspect').setAttribute('aria-pressed',String(!!zoomTarget));}
function setPaused(value){paused=value;dirty=true;document.querySelector('.pause').innerHTML=paused?playIcon:pauseIcon;document.querySelector('.pause').setAttribute('aria-pressed',String(paused));document.querySelector('.pause').setAttribute('aria-label',paused?'Riprendi animazioni':'Pausa animazioni');}
function restoreRoute(){const route=readRoute(location.hash,location.pathname);navigate(route.view,route.index,{historyMode:'none',focus:false});}
window.addEventListener('hashchange',restoreRoute);window.addEventListener('popstate',restoreRoute);
document.querySelector('.prev').onclick=()=>setSelection(current-1);document.querySelector('.next').onclick=()=>setSelection(current+1);document.querySelector('.brand').onclick=()=>setSelection(0);label.onclick=openCurrent;entry.onclick=openCurrent;
document.querySelector('.inspect').onclick=focus;document.querySelector('.pause').onclick=()=>setPaused(!paused);
document.querySelector('.index-button').onclick=showMenu;document.querySelector('.close-index').onclick=()=>menu.close();
menu.addEventListener('click',e=>{if(e.target===menu){const rect=menu.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)menu.close();}});
menu.querySelectorAll('[data-destination]').forEach(button=>button.onclick=()=>navigate(Number(button.dataset.destination)===0?'home':'page',Number(button.dataset.destination)));
document.querySelectorAll('[data-index]').forEach(button=>button.onclick=()=>setSelection(Number(button.dataset.index)));
window.addEventListener('keydown',e=>{
 if(e.altKey||e.ctrlKey||e.metaKey||menu.open||/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)||e.target.isContentEditable)return;
 if(pageSystem.isOpen){if(e.key==='Escape'){e.preventDefault();navigate('home',current);}return;}
 if(e.key==='ArrowRight'){e.preventDefault();setSelection(current+1);}
 if(e.key==='ArrowLeft'){e.preventDefault();setSelection(current-1);}
 if(e.key==='ArrowDown'){e.preventDefault();openCurrent();}
 if(e.key==='Home'){e.preventDefault();setSelection(0);}
 if(e.key==='End'){e.preventDefault();setSelection(DESTINATIONS.length-1);}
 if(e.key==='Escape'&&zoomTarget)focus();
 if(e.key==='Enter'&&e.target===stage){e.preventDefault();openCurrent();}
});
stage.addEventListener('wheel',e=>{
 if(pageSystem.isOpen||menu.open||e.ctrlKey)return;
 e.preventDefault();const now=performance.now();if(now<lockedUntil)return;
 if(now-wheelAt>160)wheelTotal=0;wheelAt=now;
 const horizontal=Math.abs(e.deltaX)>Math.abs(e.deltaY)*1.15;
 const delta=(horizontal?e.deltaX:e.deltaY)*(e.deltaMode===1?18:e.deltaMode===2?innerHeight:1);
 wheelTotal+=delta;
 if(Math.abs(wheelTotal)>54){if(horizontal)setSelection(current+Math.sign(wheelTotal));else if(wheelTotal>0)openCurrent();wheelTotal=0;lockedUntil=now+650;}
},{passive:false});
function hitAt(x,y){if(!world)return null;const bounds=stage.getBoundingClientRect();ndc.set((x-bounds.left)/bounds.width*2-1,1-(y-bounds.top)/bounds.height*2);ray.setFromCamera(ndc,world.camera);return ray.intersectObjects(world.records.filter(r=>r.holder.visible).map(r=>r.mesh),false)[0]??null;}
stage.addEventListener('dragstart',e=>e.preventDefault());
stage.addEventListener('pointerdown',e=>{
 if(e.button!==0||!e.isPrimary||dragId!==null||pageSystem.isOpen)return;
 dirty=true;dragId=e.pointerId;gesture={x:e.clientX,y:e.clientY,lastY:e.clientY,axis:null};
 try{stage.setPointerCapture(e.pointerId);}catch{}
 nav.begin(e.clientX,e.timeStamp,innerWidth<700?innerWidth*.78:Math.min(560,innerWidth*.38));
 pointer.active=false;pointer.dirty=false;zoomTarget=0;document.body.classList.remove('focused');document.querySelector('.inspect').setAttribute('aria-pressed','false');
});
stage.addEventListener('pointermove',e=>{
 pointer.tx=(e.clientX/innerWidth-.5)*2;pointer.ty=(.5-e.clientY/innerHeight)*2;
 if(nav.drag&&e.pointerId===dragId){
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;gesture.lastY=e.clientY;
  if(!gesture.axis&&Math.hypot(dx,dy)>10)gesture.axis=Math.abs(dx)>Math.abs(dy)?'x':'y';
  if(gesture.axis==='x'){nav.move(e.clientX,e.timeStamp);stage.classList.toggle('dragging',nav.drag.moved);}
  if(gesture.axis==='y')nav.drag.moved=true;
  if(gesture.axis)e.preventDefault();return;
 }
 if(e.pointerType==='touch'||!profile.hover||paused||!ready)return;
 pointer.clientX=e.clientX;pointer.clientY=e.clientY;pointer.dirty=true;dirty=true;
},{passive:false});
function endDrag(e,cancel=false){
 if(dragId===null||e.pointerId!==undefined&&e.pointerId!==dragId)return;
 const id=dragId,g=gesture;dragId=null;gesture=null;stage.classList.remove('dragging');
 const wasCancelled=cancel||e.type==='pointercancel';
 const result=nav.release(e.timeStamp??performance.now(),wasCancelled||g?.axis==='y');
 try{if(stage.hasPointerCapture(id))stage.releasePointerCapture(id);}catch{}
 if(!result)return;
 if(g?.axis==='y'){if(!wasCancelled&&g.lastY-g.y < -55)openCurrent();return;}
 commitSelection(result.index,{animate:result.moved});
 if(!result.moved&&!result.cancel&&e.clientX!==undefined){
  if(ready){const hit=hitAt(e.clientX,e.clientY);if(hit){const i=world.records.findIndex(r=>r.mesh===hit.object);i===current?openCurrent():setSelection(i);}}
  else if(mode==='fallback')openCurrent();
 }
}
window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',e=>endDrag(e,true));stage.addEventListener('lostpointercapture',e=>{if(dragId!==null)endDrag(e,true);});window.addEventListener('blur',e=>{endDrag(e,true);pointer.active=false;pointer.dirty=false;dirty=true;});
stage.addEventListener('pointerleave',()=>{if(nav.drag)return;pointer.active=false;pointer.dirty=false;pointer.tx=0;pointer.ty=0;dirty=true;});
let resizeTimer;function resize(){if(!renderer||!world)return;const dpr=pixelRatio(profile,innerWidth,innerHeight,devicePixelRatio,quality.level);renderer.setPixelRatio(dpr);renderer.setSize(innerWidth,innerHeight,false);world.resize(innerWidth,innerHeight);world.setQuality(quality.level);dirty=true;}
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,100);});document.addEventListener('visibilitychange',()=>{last=0;pacer.reset();quality.resetWindow();dirty=true;});reduced.addEventListener('change',()=>setPaused(reduced.matches));
function fallback(error){renderer?.setAnimationLoop(null)?.catch(()=>{});if(!raf)raf=requestAnimationFrame(frame);ready=false;mode='fallback';metrics.mode=mode;metrics.loadError=String(error?.message??error);document.body.dataset.renderer=mode;console.warn('Memento 3D:',error);document.body.classList.add('loaded','fallback');progress(1);document.querySelector('.loader').setAttribute('aria-hidden','true');if(!document.querySelector('.fallback-note')){const note=document.createElement('div');note.className='fallback-note';note.textContent='Anteprima statica · 3D non disponibile';document.querySelector('#home-layer').append(note);}document.querySelector('.pause').hidden=true;document.querySelector('.inspect').hidden=true;}
async function init(){
 try{
  // Paint and bind the lightweight HTML shell before downloading/parsing the 3D runtime.
  const modules=await Promise.all([import('./runtime.js'),import('three/addons/loaders/GLTFLoader.js'),import('./world.js')]);
  THREE=modules[0];const {GLTFLoader}=modules[1],{createNoirWorld,loadStudioAtlas}=modules[2];
  ray=new THREE.Raycaster();ndc=new THREE.Vector2();hitPoint=new THREE.Vector3();pointerDelta=new THREE.Vector3();localRay=new THREE.Ray();inverse=new THREE.Matrix4();
  progress(.05);metrics.modelBytes=profile.light?1426764:3775036;const loading=Promise.all([new GLTFLoader().loadAsync(profile.light?'/models/memento-noir-mobile.glb':'/models/memento-noir.glb',e=>{if(e.total)progress(.05+e.loaded/e.total*.65);}),loadStudioAtlas()]);
  const adapter=navigator.gpu?await navigator.gpu.requestAdapter({powerPreference:'high-performance'}).catch(()=>null):null;
  if(!adapter){const probe=document.createElement('canvas'),gl=probe.getContext('webgl2');if(!gl){await loading;throw new Error('Nessun renderer 3D disponibile');}gl.getExtension('WEBGL_lose_context')?.loseContext();}
  renderer=new THREE.WebGPURenderer({canvas,antialias:false,alpha:false,forceWebGL:!adapter,powerPreference:'high-performance'});await renderer.init();const [gltf,studioAtlas]=await loading;let source;gltf.scene.traverse(o=>{if(o.isMesh&&!source)source=o;});if(!source)throw new Error('Mesh non trovata');
  const m=source.material,maps={map:m.map,normalMap:m.normalMap,roughnessMap:m.roughnessMap,emissiveMap:m.emissiveMap};for(const t of Object.values(maps)){if(t)t.anisotropy=Math.min(profile.light?2:4,renderer.getMaxAnisotropy?.()??4);}
  progress(.8);world=createNoirWorld(renderer,source.geometry,maps,{width:innerWidth,height:innerHeight,mobile:profile.light,particles:true,interactive:profile.hover,studioAtlas});resize();world.update(nav.position,0);await world.warmup();m.dispose();cancelAnimationFrame(raf);raf=0;ready=true;last=0;pacer.reset();await renderer.setAnimationLoop(frame);mode=renderer.backend.isWebGPUBackend?'webgpu':'webgl2';metrics.mode=mode;document.body.dataset.renderer=mode;progress(1);document.querySelector('.loader').setAttribute('aria-hidden','true');stage.classList.add('ready');document.body.classList.add('loaded');setPaused(paused);
 }catch(error){fallback(error);}
}
function frame(now){
 if(disposed)return;
 if(!ready)raf=requestAnimationFrame(frame);
 if(document.hidden||pageSystem.isOpen){last=0;return;}
 if(!pacer.accept(now))return;
 const raw=last?(now-last)/1000:1/60,dt=Math.min(raw,.05);last=now;
 const moving=!!nav.drag||Math.abs(nav.position-nav.target)>.0001||Math.abs(zoom-zoomTarget)>.0001;
 nav.update(dt,reduced.matches);
 if(!ready){if(mode==='fallback'){const offset=nav.drag?(nav.target-nav.drag.origin)*-52:0;poster.style.transform=`translateX(${offset}px)`;}return;}
 const residualHover=world.records.some(r=>r.hover.value>.003);
 if(paused&&!dirty&&!moving&&!residualHover)return;
 dirty=false;
 zoom=reduced.matches?zoomTarget:zoom+(zoomTarget-zoom)*(1-Math.exp(-dt*5.8));
 pointer.x+=(pointer.tx-pointer.x)*(1-Math.exp(-dt*5));pointer.y+=(pointer.ty-pointer.y)*(1-Math.exp(-dt*5));
 if(!paused)time+=dt;
 // Coalesce pointer events once per frame; use the cube envelope, never 19k triangle tests on move.
 if(pointer.dirty&&profile.hover&&!nav.drag&&!paused){
  pointer.dirty=false;ndc.set(pointer.clientX/innerWidth*2-1,1-pointer.clientY/innerHeight*2);ray.setFromCamera(ndc,world.camera);
  const r=world.records[current];localRay.copy(ray.ray).applyMatrix4(inverse.copy(r.holder.matrixWorld).invert());
  pointer.active=r.holder.visible&&!!localRay.intersectBox(r.mesh.geometry.boundingBox,hitPoint);
  if(pointer.active)r.pointerTarget.copy(hitPoint);
 }
 if(profile.hover)for(const r of world.records){
  const goal=r.index===current&&pointer.active&&!nav.drag&&!paused?1:0;
  r.hover.value+=(goal-r.hover.value)*(1-Math.exp(-dt*(goal?6:4.5)));if(r.hover.value<.002)r.hover.value=0;
  pointerDelta.copy(r.pointerTarget).sub(r.pointer.value);r.impulse.value.lerp(pointerDelta.multiplyScalar(9).clampLength(0,1.4),1-Math.exp(-dt*9));r.pointer.value.lerp(r.pointerTarget,1-Math.exp(-dt*13));
 }
 world.update(nav.position,time,paused?0:pointer.x,paused?0:pointer.y,zoom,dt,!paused);
 try{world.render();metrics.renderFrames++;metrics.visibleModels=world.records.reduce((n,r)=>n+Number(r.holder.visible),0);metrics.drawCalls=renderer.info.render.drawCalls;metrics.estimatedGpuBytes=renderer.info.memory.total;}catch(error){fallback(error);}
 if(!paused&&quality.observe(raw*1000)){resize();metrics.adaptiveResolution=true;}
}
window.addEventListener('pagehide',event=>{if(event.persisted)return;disposed=true;cancelAnimationFrame(raf);world?.dispose();renderer?.dispose();});
window.addEventListener('pageshow',event=>{if(event.persisted){last=0;pacer.reset();dirty=true;}});
const initial=readRoute(location.hash,location.pathname);nav.select(initial.index,true);setPaused(paused);navigate(initial.view,initial.index,{historyMode:'replace',focus:false});
