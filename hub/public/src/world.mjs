import * as T from 'three';
import {GLTFLoader} from '../vendor/loaders/GLTFLoader.js';
import {DRACOLoader} from '../vendor/loaders/DRACOLoader.js';
import {HDRLoader} from '../vendor/loaders/HDRLoader.js';
import {Navigator,STATIONS,sampleTRS,applyProjection,applyFacing,blenderEnvironmentRotation} from './motion.mjs';
import {createLights,Atmosphere} from './atmosphere.mjs';

export class World {
  constructor(canvas,{onState=()=>{},initial=0,parked=false}={}) {
    Object.assign(this,{canvas,onState,initial,parked,ambient:0,last:0,handle:0,pending:null});
    this.reduced=matchMedia('(prefers-reduced-motion: reduce)');this.paused=this.reduced.matches;
    this.resize=this.resize.bind(this);this.frame=this.frame.bind(this);
  }
  async load() {
    this.source=await fetch('/assets/scene.json').then(r=>{if(!r.ok)throw Error('Scena non disponibile');return r.json();});
    this.renderer=new T.WebGLRenderer({canvas:this.canvas,antialias:false,alpha:false,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMappingExposure=Math.pow(2,this.source.environment.exposure);
    this.scene=new T.Scene();this.camera=new T.PerspectiveCamera();
    const draco=new DRACOLoader().setDecoderPath('/vendor/draco/').setDecoderConfig({type:'wasm'}).setWorkerLimit(2);
    let gltf,hdr;
    try{[gltf,hdr]=await Promise.all([new GLTFLoader().setDRACOLoader(draco).loadAsync('/assets/world.glb'),new HDRLoader().loadAsync('/assets/environment.hdr')]);}finally{draco.dispose();}
    this.root=gltf.scene;this.scene.add(this.root);this.nodes=new Map();this.materials=new Map();
    this.root.traverse(o=>{
      const name=o.userData.source_name||o.name;if(name)this.nodes.set(name,o);
      if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material]){
        const key=m.userData.source_name||m.name.replace('__EXPORT__','');
        if(!this.materials.has(key))this.materials.set(key,new Set());this.materials.get(key).add(m);
      }
    });
    if(this.source.nodes.some(n=>!this.nodes.has(n.name)||(n.parent&&(this.nodes.get(n.name).parent?.userData.source_name||this.nodes.get(n.name).parent?.name)!==n.parent)))throw Error('Gerarchia della scena non coerente');
    hdr.flipY=!hdr.flipY;hdr.mapping=T.EquirectangularReflectionMapping;this.scene.background=hdr;this.scene.environment=hdr;
    this.scene.backgroundRotation.y=blenderEnvironmentRotation(this.source.environment.rotation_z_blender);this.scene.environmentRotation.y=this.scene.backgroundRotation.y;
    this.scene.backgroundIntensity=.23;this.scene.environmentIntensity=.18;
    this.lightSelect=createLights(this.scene,this.source);this.atmosphere=new Atmosphere(this.renderer,this.scene,this.camera);
    this.nav=new Navigator(this.source,this.camera,{reduced:this.reduced.matches,onChange:s=>this.changed(s)});
    this.nav.arrive(this.initial,false);if(this.parked)this.park(this.initial);
    this.resize();this.objects();this.lightSelect(this.initial);await this.renderer.compileAsync(this.scene,this.camera);
    addEventListener('resize',this.resize);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)this.wake();});
    this.reduced.addEventListener('change',e=>{this.nav.reduced=e.matches;this.paused=e.matches;});
    this.canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.canvas.dispatchEvent(new CustomEvent('memento:world-error'));});
    this.raycaster=new T.Raycaster();this.pointer=new T.Vector2();this.wake();this.nav.announce();return this;
  }
  resize(){
    const {width:w,height:h}=this.canvas.getBoundingClientRect(),profile=applyProjection(this.camera,this.source,w,h);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,profile==='mobile'?1:1.25));this.renderer.setSize(w,h,false);
    const size=this.renderer.getDrawingBufferSize(new T.Vector2());this.atmosphere.resize(size.x,size.y,profile==='mobile');
    this.wake();
  }
  objects(){
    const frame=(this.ambient*30)%1200;
    for(const [name,samples] of Object.entries(this.source.tracks)){const node=this.nodes.get(name);if(node)sampleTRS(samples,frame,node);}
    for(const [name,samples] of Object.entries(this.source.materialTracks)){
      const i=Math.floor(frame),t=frame-i,value=samples[i]*(1-t)+samples[Math.min(i+1,1200)]*t;
      for(const m of this.materials.get(name)||[])m.emissiveIntensity=value;
    }
    this.scene.updateMatrixWorld(true);
    for(let i=1;i<=5;i++)applyFacing(this.nodes.get(`STG_${String(i).padStart(2,'0')}_ICON_ANCHOR`),this.camera);
    this.scene.updateMatrixWorld(true);
  }
  frame(now){
    this.handle=0;if(document.hidden||this.nav.state==='page'){this.last=0;return;}
    const dt=this.last?Math.min(.1,(now-this.last)/1000):0;this.last=now;this.nav.tick(dt);
    if(!this.paused)this.ambient+=dt;
    this.camera.updateMatrixWorld(true);this.objects();this.lightSelect(this.nav.state==='orbit'?this.nav.leg.from:this.nav.active,this.nav.state==='orbit'?this.nav.leg:null);
    this.atmosphere.render(this.ambient);this.onState({state:this.nav.state,active:this.nav.active,target:this.nav.target,progress:this.nav.progress});this.wake();
  }
  wake(){if(this.nav&&!this.handle&&!document.hidden&&this.nav.state!=='page')this.handle=requestAnimationFrame(this.frame);}
  changed(s){
    this.onState(s);
    const p=this.pending;
    if(p?.kind==='enter'&&s.state==='idle'){
      if(s.active===p.index){this.nav.enter();this.nav.ready(p.index);}else this.nav.select(p.index);
    }else if(p&&((p.kind==='enter'&&s.state==='page')||(p.kind==='leave'&&s.state==='idle'))){this.pending=null;p.resolve(true);}
    this.wake();
  }
  cancelPending(){if(this.pending){const p=this.pending;this.pending=null;p.resolve(false);}}
  select(i){this.cancelPending();this.nav.select(i);this.wake();}
  enter(index){
    this.cancelPending();
    if(!['idle','orbit'].includes(this.nav.state)){this.park(index);return Promise.resolve(true);}
    return new Promise(resolve=>{this.pending={kind:'enter',index,resolve};if(this.nav.state==='idle'&&this.nav.active===index){this.nav.enter();this.nav.ready(index);}else this.nav.select(index);this.wake();});
  }
  park(index){
    this.cancelPending();this.nav.arrive(index,false);this.nav.progress=1;this.nav.state='page';this.nav.pageIsReady=true;
    sampleTRS(this.source.descents[STATIONS[index]].samples,180,this.camera);this.last=0;
  }
  leave(index){
    this.cancelPending();if(!['page','waiting','descending'].includes(this.nav.state)||this.nav.active!==index)this.park(index);
    return new Promise(resolve=>{this.pending={kind:'leave',index,resolve};this.nav.back();this.wake();});
  }
  hit(x,y){
    const rect=this.canvas.getBoundingClientRect();this.pointer.set((x-rect.left)/rect.width*2-1,1-(y-rect.top)/rect.height*2);this.raycaster.setFromCamera(this.pointer,this.camera);
    for(const hit of this.raycaster.intersectObject(this.root,true))for(let node=hit.object;node;node=node.parent){const m=(node.userData.source_name||node.name).match(/^STG_0([1-5])_ROOT$/);if(m)return Number(m[1])-1;}
    return -1;
  }
}
