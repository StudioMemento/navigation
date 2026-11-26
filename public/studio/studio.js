import * as T from './vendor/three.module.min.js';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { MeshoptDecoder } from './vendor/meshopt_decoder.module.js';
import { StudioNavigation, WalkGrid } from './lib/navigation.js';
import { exteriorFrameFactor, setStudioRay } from './lib/projection.js';
import { VIEWS, MATERIALS } from './lib/config.js';

const byId=id=>document.getElementById(id);
const canvas=byId('studio-canvas'), stage=byId('studio-stage'), poster=byId('studio-poster');
const message=byId('studio-message'), controls=byId('view-controls'), views=byId('studio-view'), stick=byId('walk-stick');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'), coarse=matchMedia('(pointer:coarse)');
const mobile=coarse.matches||innerWidth<700;
const shells=[], meshes=[], pointers=new Map();
let renderer, scene, camera, nav, request=0, lastTime=0, settleUntil=0, previousTap=null;
function wake(settle=0) {

  settleUntil=Math.max(settleUntil,performance.now()+settle);
  if(nav && !document.hidden && !request) request=requestAnimationFrame(draw);
}
function draw(time) {
  request=0;
  if(document.hidden||!nav)return;
  const dt=lastTime ? Math.min((time-lastTime)/1000,.06) : 1/60;
  lastTime=time;
  nav.update(dt,reduced.matches,dt);
  for(const part of shells)part.visible=nav.shell>.5;
  renderer.render(scene,camera);

  if(nav.transition||nav.keys.size||nav.touchMove.lengthSq()||time<settleUntil)request=requestAnimationFrame(draw);
  else lastTime=0;
}
function resize() {
  if(!renderer||!nav)return;
  const {width,height}=stage.getBoundingClientRect();
  renderer.setSize(width,height,false);camera.aspect=width/Math.max(1,height);
  nav.frameFactor=exteriorFrameFactor(camera.aspect);wake();
}
function updateControls() {
  if(!nav)return;
  views.value=nav.view>=0 ? String(nav.view) : '';
  stick.hidden=!coarse.matches||nav.state==='exterior';
}
function selectView(index) {nav.go(index,{instant:reduced.matches});updateControls();wake(350);}
function showFailure() {
  if(request) cancelAnimationFrame(request);
  request=0;nav=null;controls.hidden=stick.hidden=canvas.hidden=true;poster.hidden=false;
  message.textContent='Tour 3D non disponibile su questo dispositivo.';message.hidden=false;byId('studio-retry').hidden=false;
}
function focusObject(event) {
  if(!nav)return;
  const rect=canvas.getBoundingClientRect(),ray=new T.Raycaster();
  setStudioRay(ray,new T.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),camera);
  const hits=ray.intersectObjects(meshes.filter(mesh=>mesh.visible),false);
  if(hits[0]){nav.focusObject(hits[0].object);wake(500);}
}
function bindInput() {
  let pinch=0;
  const distance=()=>{const [a,b]=[...pointers.values()];return Math.hypot(a.x-b.x,a.y-b.y);};
  canvas.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;
    canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false});
    if(pointers.size===2)pinch=distance();
  });
  canvas.addEventListener('pointermove',event=>{
    const point=pointers.get(event.pointerId);if(!point)return;
    const dx=event.clientX-point.x,dy=event.clientY-point.y;
    Object.assign(point,{x:event.clientX,y:event.clientY});
    if(Math.hypot(point.x-point.startX,point.y-point.startY)>5)point.moved=true;
    if(pointers.size===2){const next=distance();nav.zoom((pinch-next)*5);pinch=next;}
    else nav.drag(dx,dy);
    wake(1000);
  });
  function release(event) {
    const point=pointers.get(event.pointerId);pointers.delete(event.pointerId);
    if(!point||point.moved||event.type!=='pointerup'||event.pointerType!=='touch')return;
    if(previousTap && performance.now()-previousTap.time<320 && Math.hypot(point.x-previousTap.x,point.y-previousTap.y)<24) {
      focusObject(event);previousTap=null;
    } else previousTap={x:point.x,y:point.y,time:performance.now()};
  }
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);
  canvas.addEventListener('dblclick',focusObject);
  canvas.addEventListener('wheel',event=>{if(event.ctrlKey)return;event.preventDefault();nav.zoom(event.deltaY);wake(1200);},{passive:false});
  const movement=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft']);
  canvas.addEventListener('keydown',event=>{
    if(event.key==='Escape'){if(nav.focus)nav.clearFocus();else selectView(0);wake();return;}
    if(!movement.has(event.code))return;
    event.preventDefault();
    if(nav.state==='exterior'){selectView(1);return;}
    if(nav.focus)nav.clearFocus(false);if(nav.transition)nav.cancelTransition();
    nav.keys.add(event.code);wake();
  });
  window.addEventListener('keyup',event=>nav?.keys.delete(event.code));
  const stop=()=>{nav?.keys.clear();nav?.touchMove.set(0,0);pointers.clear();stick.firstElementChild.style.transform='';};
  canvas.addEventListener('blur',stop);window.addEventListener('blur',stop);
  function moveStick(event) {
    const r=stick.getBoundingClientRect(),x=event.clientX-r.left-r.width/2,y=event.clientY-r.top-r.height/2;
    const scale=Math.max(24,Math.hypot(x,y));
    nav.touchMove.set(x/scale,y/scale);stick.firstElementChild.style.transform='translate('+x/scale*23+'px,'+y/scale*23+'px)';wake();
  }
  stick.addEventListener('pointerdown',event=>{stick.setPointerCapture(event.pointerId);nav.clearFocus(false);nav.cancelTransition();moveStick(event);});
  stick.addEventListener('pointermove',event=>{if(stick.hasPointerCapture(event.pointerId))moveStick(event);});
  for(const type of ['pointerup','pointercancel'])stick.addEventListener(type,stop);
  document.addEventListener('visibilitychange',()=>{lastTime=0;if(document.hidden)stop();else wake();});
  window.addEventListener('pageshow',()=>wake());
}
async function initialize() {
  try {
    renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.35:1.75));
    renderer.setClearColor(0x090909,0);
    scene=new T.Scene();camera=new T.PerspectiveCamera(35,1,.025,90);
    scene.add(new T.HemisphereLight(0xfff5e6,0x67696e,1.8));
    const key=new T.DirectionalLight(0xffeed9,3.0);key.position.set(3,6,3);scene.add(key);
    const fill=new T.DirectionalLight(0xe4e8ec,1.2);fill.position.set(-4,3,-2);scene.add(fill);
    const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    const [model,grid]=await Promise.all([
      loader.loadAsync('./assets/studio-v4-'+(mobile?'mobile':'desktop')+'.glb'),
      fetch('./assets/navigation-grid.json').then(res=>{if(!res.ok)throw Error('Studio grid');return res.json();})
    ]);
    const materials=new Map();
    model.scene.traverse(mesh=>{
      if(!mesh.isMesh)return;
      meshes.push(mesh);
      if(mesh.userData.zone==='BACKFACE_REVEAL'){shells.push(mesh);mesh.visible=false;}
      const source=mesh.material;
      const category=mesh.userData.category || 'ARCHITECTURE';
      const key=source.uuid+'-'+category;
      if(!materials.has(key)) {
        const mat=source.clone();
        const finish=MATERIALS[category] || MATERIALS.ARCHITECTURE;
        mat.color.setHex(finish.color);
        mat.metalness=finish.metalness;mat.roughness=finish.roughness;
        materials.set(key,mat);
      }
      mesh.material=materials.get(key);
    });
    scene.add(model.scene);
    nav=new StudioNavigation(camera,new WalkGrid(grid),{onChange:updateControls});
    views.append(...VIEWS.map((view,i)=>new Option(view.name,String(i))));
    resize(); nav.update(.016,true); renderer.render(scene,camera);
    poster.hidden=message.hidden=true;canvas.hidden=controls.hidden=false;
    views.addEventListener('change',()=>selectView(Number(views.value)));
    byId('studio-reset').addEventListener('click',()=>selectView(0));
    canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();showFailure();},{once:true});
    new ResizeObserver(resize).observe(stage);bindInput();updateControls();wake();
  } catch(error) {console.warn('Caricamento Studio 3D',error);showFailure();}
}
byId('studio-retry').addEventListener('click',()=>location.reload());
initialize();
