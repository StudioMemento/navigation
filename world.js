import * as THREE from './vendor/three.module.min.js';
import {SoftwareRenderer} from './software-renderer.js';
import {loadCinematicWorld} from './cinematic-world.js';

export const anchors = [[-18,0,0],[-9,.8,-7],[1,1.2,-11],[11,2,-6],[21,1,2]];
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
const ease = t => t*t*t*(t*(t*6-15)+10);
const count=anchors.length;
const wrap=n=>((n%count)+count)%count;
export const lookLimits={yaw:8,pitch:5};
export function createWorld(canvas,{onPick,onHover}={}) {
  let renderer,cinematic=null;
  try { const context=canvas.getContext('webgl2',{antialias:true,alpha:false,powerPreference:'high-performance'});if(!context)throw new Error('WebGL unavailable');renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:false,powerPreference:'high-performance'}); }
  catch(error) { renderer=new SoftwareRenderer(canvas); canvas.dataset.renderer='software'; }
  if(!canvas.dataset.renderer)canvas.dataset.renderer='webgl';
  const scene=new THREE.Scene();scene.background=new THREE.Color('#12191d');scene.fog=new THREE.FogExp2('#12191d',.017);
  const camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,400);
  const cameraId=camera.uuid;
  canvas.dataset.cameraId=cameraId;canvas.dataset.sceneId=scene.uuid;canvas.dataset.stationPositions=JSON.stringify(anchors);
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.4:1.7));
  renderer.setSize(innerWidth,innerHeight,false);renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  const stone=new THREE.MeshStandardMaterial({color:'#394149',roughness:.86,metalness:.15});
  const sideStone=new THREE.MeshStandardMaterial({color:'#202a31',roughness:.91,metalness:.12});
  const floorMat=new THREE.MeshStandardMaterial({color:'#172027',roughness:.83,metalness:.25});
  const amber=new THREE.MeshStandardMaterial({color:'#ff7950',emissive:'#ff642d',emissiveIntensity:2.2,roughness:.35});
  const warmFace=new THREE.MeshStandardMaterial({color:'#643a29',roughness:.7,metalness:.3});
  const boxGeometry=new THREE.BoxGeometry(1,1,1);
  const pickable=[],stations=[],lamps=[];
  function box(parent,pos,size,mat=stone,domain=null){const m=new THREE.Mesh(boxGeometry,mat);m.position.set(...pos);m.scale.set(...size);m.castShadow=mat!==amber;m.receiveShadow=true;if(domain!==null){m.userData.domain=domain;pickable.push(m);}parent.add(m);return m;}
  scene.add(new THREE.HemisphereLight('#ccdbe2','#161012',2.1));
  const sun=new THREE.DirectionalLight('#ffe6ca',4.5);sun.position.set(-12,32,18);sun.castShadow=true;
  Object.assign(sun.shadow.camera,{left:-48,right:48,top:36,bottom:-36,near:1,far:110});sun.shadow.mapSize.set(2048,2048);sun.shadow.bias=-.0005;sun.shadow.normalBias=.04;scene.add(sun);
  const rim=new THREE.DirectionalLight('#95b4cd',2.1);rim.position.set(10,14,-25);scene.add(rim);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(240,240),floorMat);floor.rotation.x=-Math.PI/2;floor.position.y=-1.3;floor.receiveShadow=true;scene.add(floor);
  anchors.forEach((a,i)=>{
    const g=new THREE.Group();g.position.set(...a);scene.add(g);stations.push(g);
    box(g,[0,-.2,0],[6.6,.55,5.4],sideStone,i);
    box(g,[-.5,.14,-.35],[4.9,.2,3.9],stone,i);
    box(g,[0,.09,2.73],[5.8,.034,.032],amber);
    box(g,[3.31,-.05,.5],[.032,.035,3.8],amber);
    if(i===0){
      // Two opposing offset brackets; each stays permanently in the world.
      box(g,[-1.7,2.75,-.5],[.9,5.05,1.2],stone,i);
      box(g,[-.65,4.83,-.5],[2.95,.9,1.2],stone,i);
      box(g,[-.8,.68,-.5],[2.7,.9,1.2],stone,i);
      box(g,[1.45,2.0,.6],[.85,3.55,1.15],stone,i);
      box(g,[.6,3.35,.6],[2.1,.85,1.15],stone,i);
      box(g,[.6,.64,.6],[2.1,.85,1.15],stone,i);
      box(g,[-1.23,2.9,.12],[.045,3.4,.025],amber);
      box(g,[.99,1.95,1.18],[.035,2.2,.025],amber);
    } else if(i===1){
      [[-1.3,1.1,.3,2.1,1.7,2.1],[1.05,1.25,-.9,2.2,2,2.15],[-1.0,3.2,-.7,2.5,1.8,2.2],[1.15,3.4,.4,1.8,1.65,1.8]].forEach(b=>box(g,b.slice(0,3),b.slice(3),stone,i));
      box(g,[-.85,2.28,.46],[2.5,.045,.035],amber);box(g,[1.15,2.55,1.32],[1.8,.045,.035],amber);
    } else if(i===2){
      box(g,[-.2,1.4,-.3],[1.15,2.4,1.3],stone,i);
      box(g,[0,3.25,0],[5.7,.65,1.7],stone,i);box(g,[-2.5,2.25,0],[.7,2.6,1.7],stone,i);box(g,[2.5,2.25,0],[.7,2.6,1.7],stone,i);box(g,[0,1.15,0],[5.7,.65,1.7],stone,i);
      box(g,[0,2.25,-.7],[4.3,1.5,.16],warmFace,i);box(g,[0,1.5,.87],[4.2,.04,.03],amber);
      box(g,[1.4,2.3,-.58],[.035,1.15,.02],amber);
    } else if(i===3){
      for(let j=0;j<4;j++){box(g,[-1.4+j*.85,.7+j*1.03,-.65+j*.24],[3.5,.64,1.9],stone,i);box(g,[-1.4+j*.85,.39+j*1.03,.33+j*.24],[3.2,.028,.024],amber);}
    } else {
      box(g,[-1.3,2.7,-.4],[1.8,4.9,1],stone,i);box(g,[1.25,2.05,.6],[1.8,3.6,1],stone,i);box(g,[0,.3,.5],[4.1,.25,2.9],stone,i);
      box(g,[-.37,2.65,.12],[.04,4.75,.035],amber);box(g,[.31,1.98,1.13],[.04,3.4,.035],amber);
    }
    const light=new THREE.PointLight('#ff6835',8,9,2);light.position.set(0,2,2.5);g.add(light);lamps.push(light);
  });
  // Continuous physical route, shared by all five stations.
  const routePoints=anchors.map(([x,y,z])=>new THREE.Vector3(x,y-.06,z+3.5));
  const route=new THREE.CatmullRomCurve3(routePoints,false,'catmullrom',.12);
  const routeMesh=new THREE.Mesh(new THREE.TubeGeometry(route,180,.024,4,false),amber);routeMesh.userData.routePoints=route.getPoints(180);scene.add(routeMesh);
  // Repeated distant solids are instanced: depth without many draw calls.
  const field=new THREE.InstancedMesh(boxGeometry,sideStone,72);const matrix=new THREE.Matrix4();const quat=new THREE.Quaternion();const pos=new THREE.Vector3(),scale=new THREE.Vector3();
  for(let j=0;j<72;j++){const col=j%18,row=Math.floor(j/18);const n=Math.sin(j*81.371)*437.3,f=n-Math.floor(n);pos.set(-48+col*6+f*2,-.6+f*2,-22-row*10);scale.set(2+f*3,2+f*9,3+f*3);matrix.compose(pos,quat,scale);field.setMatrixAt(j,matrix);}field.receiveShadow=true;scene.add(field);
  const walls=new THREE.InstancedMesh(boxGeometry,sideStone,8);
  for(let i=0;i<8;i++){pos.set(-35+i*12,5+i%3,-35-(i%2)*8);scale.set(1.7,13+(i%3)*6,5);matrix.compose(pos,quat,scale);walls.setMatrixAt(i,matrix);}scene.add(walls);
  const positions=new THREE.CatmullRomCurve3(anchors.map(([x,y,z])=>new THREE.Vector3(x+6,y+3.6,z+12)),false,'catmullrom',.15);
  const targets=new THREE.CatmullRomCurve3(anchors.map(([x,y,z])=>new THREE.Vector3(x,y+2.6,z)),false,'catmullrom',.15);
  // A frontward return arc closes the physical route without teleporting the camera.
  const returnPositions=new THREE.CubicBezierCurve3(positions.points[4].clone(),positions.points[4].clone().add(new THREE.Vector3(18,6,18)),positions.points[0].clone().add(new THREE.Vector3(-16,6,16)),positions.points[0].clone());
  const returnTargets=new THREE.CubicBezierCurve3(targets.points[4].clone(),targets.points[4].clone().add(new THREE.Vector3(9,0,7)),targets.points[0].clone().add(new THREE.Vector3(-9,0,7)),targets.points[0].clone());
  let progress=0,routeStep=0,dragOrigin=null,active=0,panel=false,travelMotion=null,panelShift=0,panelTarget=0,dirty=true,raf=0,last=0;
  let lookX=0,lookY=0,lookTargetX=0,lookTargetY=0;
  let visible=true;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const look=new THREE.Vector3(),camPos=new THREE.Vector3(),dir=new THREE.Vector3();
  function applyPose(){const phase=wrap(routeStep);progress=phase/4;if(phase<=4){positions.getPoint(progress,camPos);targets.getPoint(progress,look);}else{returnPositions.getPoint(phase-4,camPos);returnTargets.getPoint(phase-4,look);}const mobile=innerWidth<700;if(mobile){dir.copy(camPos).sub(look);camPos.copy(look).addScaledVector(dir,1.2);look.y-=.05;}
    // Framing shifts with projection only; one persistent camera and fixed world.
    camera.position.copy(camPos);camera.lookAt(look);camera.aspect=innerWidth/innerHeight;camera.fov=mobile?45:38;
    camera.rotateY(-THREE.MathUtils.degToRad(lookX*lookLimits.yaw));camera.rotateX(-THREE.MathUtils.degToRad(lookY*lookLimits.pitch));
    camera.setViewOffset(innerWidth,innerHeight,mobile?0:-innerWidth*.13,innerHeight*(mobile?.24:.035)*panelShift,innerWidth,innerHeight);
    camera.updateProjectionMatrix();camera.updateMatrixWorld();canvas.dataset.progress=String(progress);canvas.dataset.routeStep=String(routeStep);canvas.dataset.panelShift=String(panelShift);canvas.dataset.cameraPosition=JSON.stringify(camera.position.toArray());canvas.dataset.lookAngles=JSON.stringify([lookX*lookLimits.yaw,lookY*lookLimits.pitch]);
  }
  function request(){if(!raf&&visible)raf=requestAnimationFrame(frame);}
  function frame(now){raf=0;const dt=last?Math.min((now-last)/1000,.05):.016;last=now;let moving=false;
    if(travelMotion){const a=travelMotion;const t=clamp((now-a.start)/a.duration,0,1);routeStep=a.from+(a.to-a.from)*ease(t);moving=true;if(t===1){travelMotion=null;a.resolve();}}
    const lookRate=reduced.matches?1:1-Math.exp(-dt*9);
    if(Math.abs(lookTargetX-lookX)>.0001||Math.abs(lookTargetY-lookY)>.0001){lookX+=(lookTargetX-lookX)*lookRate;lookY+=(lookTargetY-lookY)*lookRate;moving=true;}else if(lookX!==lookTargetX||lookY!==lookTargetY){lookX=lookTargetX;lookY=lookTargetY;moving=true;}
    if(Math.abs(panelTarget-panelShift)>.001){panelShift+= (panelTarget-panelShift)*(reduced.matches?1:1-Math.exp(-dt*10));moving=true;}else panelShift=panelTarget;
    if(dirty||moving){applyPose();if(cinematic)cinematic.render();else renderer.render(scene,camera);dirty=false;}
    if(moving)request();
  }
  function travel(index,instant=false,{direction=0}={}){
    active=wrap(index);const reference=direction?(travelMotion?.to??routeStep):routeStep;
    let target=Math.floor(reference/count)*count+active;
    if(direction>0&&target<reference-.00001)target+=count;
    else if(direction<0&&target>reference+.00001)target-=count;
    else if(!direction)target+=Math.round((reference-target)/count)*count;
    if(travelMotion)travelMotion.resolve();travelMotion=null;dragOrigin=null;setActive(active);setLook(0,0);
    return new Promise(resolve=>{if(instant||reduced.matches||Math.abs(routeStep-target)<.0001){routeStep=instant?active:target;dirty=true;request();resolve();return;}
      const crossesReturn=Math.floor(Math.max(routeStep,target)/count)>Math.floor(Math.min(routeStep,target)/count);
      travelMotion={from:routeStep,to:target,start:performance.now(),duration:1100+Math.min(Math.abs(target-routeStep),3)*180+(crossesReturn?400:0),resolve};request();
    });
  }
  function setLook(x,y){lookTargetX=clamp(x,-1,1);lookTargetY=clamp(y,-1,1);request();}
  function beginDrag(){if(travelMotion){travelMotion.resolve();travelMotion=null;}dragOrigin=routeStep;setLook(0,0);return routeStep;}
  function scrubDrag(delta){if(dragOrigin===null)return active;routeStep=dragOrigin+clamp(delta,-1,1);const index=wrap(Math.round(routeStep));if(index!==active)setActive(index);dirty=true;request();return index;}
  function setActive(index){active=index;lamps.forEach((l,i)=>l.intensity=i===index?13:5);cinematic?.setActive(index);dirty=true;request();}
  function setPanel(open){panel=open;panelTarget=open?1:0;request();}
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
  function hit(e){pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(cinematic?.pickable||pickable,false)[0]?.object.userData.domain;}
  let start=null;canvas.addEventListener('pointerdown',e=>{if(e.button===0&&e.isPrimary)start={x:e.clientX,y:e.clientY,moved:0};});
  canvas.addEventListener('pointermove',e=>{if(start)start.moved=Math.max(start.moved,Math.hypot(e.clientX-start.x,e.clientY-start.y));if(panel||e.pointerType==='touch'||e.buttons)return;const i=hit(e);canvas.classList.toggle('is-hovered',i!==undefined);onHover?.(i);});
  canvas.addEventListener('pointerup',e=>{if(panel||!start)return;const moved=Math.max(start.moved,Math.hypot(e.clientX-start.x,e.clientY-start.y));start=null;if(moved<10&&dragOrigin===null){const i=hit(e);if(i!==undefined)onPick?.(i);}});
  canvas.addEventListener('pointercancel',()=>start=null);
  canvas.addEventListener('pointerleave',()=>canvas.classList.remove('is-hovered'));
  function resize(){renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.4:1.7));renderer.setSize(innerWidth,innerHeight,false);cinematic?.resize();dirty=true;request();}window.addEventListener('resize',resize);
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible){last=0;dirty=true;request();}else if(raf){cancelAnimationFrame(raf);raf=0;}});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();canvas.dataset.contextStatus='lost';});canvas.addEventListener('webglcontextrestored',()=>{canvas.dataset.contextStatus='ready';dirty=true;request();});
  setActive(0);request();
  if(typeof location!=='undefined'){canvas.dataset.assetStatus='loading';loadCinematicWorld({scene,renderer,camera,canvas,anchors,onReady:state=>{cinematic=state;setActive(active);},onError:error=>{console.warn('OFFSET model unavailable; retaining the navigable blocking.',error);dirty=true;request();}});}
  return {travel,setPanel,setActive,setLook,beginDrag,scrubDrag,getState:()=>({renderer:canvas.dataset.renderer,assetSource:canvas.dataset.assetSource||'blocking',cameraCount:1,cameraId,sceneId:scene.uuid,progress,routeStep,active,panel,lookAngles:[lookX*lookLimits.yaw,lookY*lookLimits.pitch],cameraPosition:camera.position.toArray(),cameraQuaternion:camera.quaternion.toArray(),stationPositions:stations.map(g=>g.position.toArray()),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,moving:!!travelMotion,panelShift,renderLoopActive:!!raf})};
}
