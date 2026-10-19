import React,{useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

export default function ModelViewer({reset=0}) {
  const host=useRef(null),api=useRef(null),[error,setError]=useState(false),[attempt,setAttempt]=useState(0);
  useEffect(()=>{
    setError(false);
    let renderer,controls,frame=0,observer,resizeObserver,environment,room,pmrem,visible=true,destroyed=false;
    const node=host.current,scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(32,1,.1,100);
    const group=new THREE.Group();scene.add(group);
    try{
      renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
      renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x0d0d0d);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;node.appendChild(renderer.domElement);
      pmrem=new THREE.PMREMGenerator(renderer);room=new RoomEnvironment();environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;
      const glass=new THREE.MeshPhysicalMaterial({color:0xc17725,roughness:.12,metalness:.06,transmission:.28,thickness:.8,clearcoat:1,ior:1.5});
      const body=new THREE.Mesh(new RoundedBoxGeometry(1.52,1.7,.78,6,.13),glass);body.position.y=-.12;group.add(body);
      const liquid=new THREE.Mesh(new RoundedBoxGeometry(1.29,1.35,.55,4,.09),new THREE.MeshPhysicalMaterial({color:0x6b3006,roughness:.09,metalness:.22,clearcoat:1}));liquid.position.y=-.17;group.add(liquid);
      const base=new THREE.Mesh(new RoundedBoxGeometry(1.52,.12,.78,5,.05),new THREE.MeshPhysicalMaterial({color:0xd5ad6d,metalness:.65,roughness:.12}));base.position.y=-.91;group.add(base);
      const neck=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.2,48),new THREE.MeshStandardMaterial({color:0x967747,metalness:.9,roughness:.16}));neck.position.y=.8;group.add(neck);
      const cap=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.51,64),new THREE.MeshStandardMaterial({color:0x171719,metalness:.72,roughness:.26}));cap.position.y=1.12;group.add(cap);
      const canvas=document.createElement('canvas');canvas.width=768;canvas.height=256;const cx=canvas.getContext('2d');cx.fillStyle='#f3f0ea';cx.font='32px Arial';cx.textAlign='center';cx.fillText('A U R E N',384,126);cx.fillRect(355,160,58,1);const texture=new THREE.CanvasTexture(canvas);const label=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.37),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));label.position.set(0,-.06,.401);group.add(label);
      const floor=new THREE.Mesh(new THREE.CircleGeometry(7,64),new THREE.MeshStandardMaterial({color:0x141313,roughness:.42,metalness:.25}));floor.rotation.x=-Math.PI/2;floor.position.y=-1;scene.add(floor);
      scene.add(new THREE.HemisphereLight(0xffffff,0x302319,2.2));const rim=new THREE.DirectionalLight(0xffd39c,4.5);rim.position.set(3,4,-2);scene.add(rim);const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-3,3,4);scene.add(key);
      camera.position.set(2.5,1.35,5.8);controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,.2,0);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=3.2;controls.maxDistance=8;controls.minPolarAngle=.3;controls.maxPolarAngle=Math.PI*.57;controls.update();controls.saveState();group.rotation.y=-.25;
      const size=()=>{if(destroyed)return;const rect=node.getBoundingClientRect();if(rect.width&&rect.height){renderer.setSize(rect.width,rect.height);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix()}};resizeObserver=new ResizeObserver(size);resizeObserver.observe(node);size();
      const tick=()=>{if(destroyed||!visible||document.hidden){frame=0;return}controls.update();renderer.render(scene,camera);frame=requestAnimationFrame(tick)};
      const resume=()=>{if(!frame&&visible&&!document.hidden)tick()};observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;resume()},{threshold:.05});observer.observe(node);document.addEventListener('visibilitychange',resume);
      const lost=e=>{e.preventDefault();setError(true);visible=false};renderer.domElement.addEventListener('webglcontextlost',lost);
      api.current={reset:()=>{controls.reset();group.rotation.y=-.25},key:e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();group.rotation.y+=e.key==='ArrowRight'?.15:-.15}},cleanup:()=>{document.removeEventListener('visibilitychange',resume);renderer.domElement.removeEventListener('webglcontextlost',lost)}};tick();
    }catch(e){setError(true)}
    return()=>{destroyed=true;cancelAnimationFrame(frame);api.current?.cleanup?.();api.current=null;observer?.disconnect();resizeObserver?.disconnect();controls?.dispose();scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of (Array.isArray(o.material)?o.material:[o.material])){m.map?.dispose();m.dispose()}}});environment?.dispose();room?.dispose();pmrem?.dispose();renderer?.dispose();renderer?.domElement.remove()};
  },[attempt]);
  useEffect(()=>{api.current?.reset()},[reset]);
  return <div ref={host} className="model-canvas" role="region" aria-label="Modello 3D dimostrativo. Trascina per ruotare, oppure usa le frecce della tastiera." tabIndex={0} onKeyDown={e=>api.current?.key(e)}>{error&&<div className="model-fallback"><img src="/assets/modello-3d.webp" alt="Anteprima del flacone"/><p>La vista 3D non è disponibile su questo dispositivo.</p><button className="under-link" onClick={()=>setAttempt(n=>n+1)}>Riprova</button></div>}</div>;
}
