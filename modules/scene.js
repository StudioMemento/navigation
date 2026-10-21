import * as THREE from '../vendor/three.module.js';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { createDioramaStage } from './diorama.js';
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>1-(1-t)**4;

export class NavigationScene {
  constructor(container,world) {
    this.container=container;this.world=world;this.view='gate';this.pointer={x:0,y:0};this.motion={x:0,y:0};this.hover=false;
    this.reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;this.parallax=.5;this.ambient=.55;
    this.poster=document.querySelector('#model-poster');this.fallback=document.querySelector('#fallback');this.mask=document.querySelector('#outline-mask');
    this.cache=new Map();this.pending=new Map();this.ticket=0;this.lastFrame=0;this.disposed=false;
    this.outline=document.createElement('canvas');this.outlineContext=this.outline.getContext('2d');
    try {
      this.renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power',premultipliedAlpha:true});
      this.renderer.setClearColor(0,0);this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;
      this.container.append(this.renderer.domElement);this.loader=new GLTFLoader();
      this.target=new THREE.WebGLRenderTarget(1024,1024,{type:this.renderer.extensions.has('EXT_color_buffer_float')?THREE.HalfFloatType:THREE.UnsignedByteType,samples:2});
      this.outlineTexture=new THREE.CanvasTexture(this.outline);this.outlineTexture.colorSpace=THREE.SRGBColorSpace;
      this.composite=new THREE.Scene();this.screenCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
      this.compositeMaterial=new THREE.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,toneMapped:true,
        uniforms:{uModel:{value:this.target.texture},uOutline:{value:this.outlineTexture},uRect:{value:new THREE.Vector4(.5,.5,.5,.5)},uOpacity:{value:1},uType:{value:1}},
        vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
        fragmentShader:`varying vec2 vUv;uniform sampler2D uModel,uOutline;uniform vec4 uRect;uniform float uOpacity,uType;
        void main(){vec2 p=(vUv-uRect.xy)/uRect.zw+.5;if(any(lessThan(p,vec2(0.)))||any(greaterThan(p,vec2(1.))))discard;
        vec4 m=texture2D(uModel,p);vec4 t=texture2D(uOutline,vUv);vec3 color=mix(m.rgb,t.rgb,t.a*uType*.88);
        gl_FragColor=vec4(color,m.a*uOpacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`});
      this.composite.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),this.compositeMaterial));
      this.container.dataset.renderer='webgl';
      this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();this.lost=true;document.body.classList.remove('webgl-ready');});
      this.renderer.domElement.addEventListener('webglcontextrestored',()=>{this.lost=false;this.drawKey='';this.resize();if(this.stage)document.body.classList.add('webgl-ready');});
    } catch(error) {
      this.renderer?.dispose();this.renderer?.domElement.remove();this.renderer=null;this.container.dataset.renderer='poster';
    }
    this.resize=()=>{
      this.width=container.clientWidth;this.height=container.clientHeight;
      this.renderer?.setPixelRatio(Math.min(devicePixelRatio,this.width<700?1.5:1.7));this.renderer?.setSize(this.width,this.height);
      this.outline.width=Math.round(this.width*Math.min(devicePixelRatio,2));this.outline.height=Math.round(this.height*Math.min(devicePixelRatio,2));
      this.current=this.framing();this.from={...this.current};this.destination={...this.current};this.started=performance.now();this.typeKey='';
    };
    this.resize();this.setWorld(world);
    this.resizeObserver=new ResizeObserver(this.resize);this.resizeObserver.observe(container);
    this.animate=this.animate.bind(this);this.frame=requestAnimationFrame(this.animate);
    this.visibility=()=>{if(document.hidden){cancelAnimationFrame(this.frame);this.frame=0;}else if(!this.frame){this.lastFrame=0;this.frame=requestAnimationFrame(this.animate);}};
    document.addEventListener('visibilitychange',this.visibility);
  }
  framing() {
    const w=this.width,h=this.height,m=w<701;
    return this.view==='gate'?{x:w/2,y:h*(m?.45:.46),size:Math.min(w*(m?.95:.84),h*(m?.58:.65))}:
      this.view==='hub'?{x:w/2,y:h*.21,size:Math.min(w*(m?.62:.58),h*(m?.29:.30))}:{x:w/2,y:h*.067,size:Math.min(w*.20,h*.09)};
  }
  setView(view) {
    if(this.view===view)return;this.view=view;this.from={...this.current};this.destination=this.framing();this.started=performance.now();this.typeKey='';
  }
  async load(world,tier='mobile') {
    const key=world.id+':'+tier;
    if(this.cache.has(key))return this.cache.get(key);
    if(this.pending.has(key))return this.pending.get(key);
    const promise=this.loader.loadAsync(`./models/${world.id}${tier==='mobile'?'-mobile':''}.glb`).then(gltf=>{
      const stage=createDioramaStage(THREE,gltf.scene,world);this.cache.set(key,stage);return stage;
    }).finally(()=>this.pending.delete(key));this.pending.set(key,promise);return promise;
  }
  async setWorld(world) {
    this.world=world;const ticket=++this.ticket;clearTimeout(this.promoteTimer);
    const poster=`./assets/dioramas/${world.id}.webp`;
    // A pixel-identical GLB render keeps the real model present before GPU loading.
    const image=new Image();image.src=poster;
    try{await image.decode();}catch{}
    if(ticket!==this.ticket||this.disposed)return;
    this.poster.src=poster;this.mask.style.maskImage=`url("${poster}")`;this.mask.style.webkitMaskImage=`url("${poster}")`;
    document.body.classList.remove('webgl-ready');this.stage=null;this.typeKey='';
    if(!this.reduced){for(const el of [this.fallback,this.mask])el.animate([{opacity:0,filter:'blur(3px)'},{opacity:1,filter:'blur(0px)'}],{duration:600,easing:'ease-out'});}
    if(!this.renderer)return;
    try {
      const stage=await this.load(world);
      if(ticket!==this.ticket||this.disposed){this.prune();return;}
      this.stage=stage;this.prune();document.body.classList.add('webgl-ready');
      const connection=navigator.connection;
      if(this.width>700&&!connection?.saveData&&!/2g/.test(connection?.effectiveType||'')) {
        this.promoteTimer=setTimeout(async()=>{
          try{const high=await this.load(world,'desktop');if(ticket===this.ticket&&!this.disposed){this.stage=high;this.prune();}else this.prune();}catch{}
        },1800);
      }
    }catch{this.container.dataset.renderer='poster';document.body.classList.remove('webgl-ready');}
  }
  prune() {
    for(const [key,stage]of this.cache)if((this.cache.size>3||key.endsWith(':desktop'))&&stage!==this.stage){
      this.release(stage);this.cache.delete(key);
    }
  }
  release(stage) {
    const textures=new Set();stage.root.traverse(o=>{o.geometry?.dispose();for(const m of [].concat(o.material||[])){for(const value of Object.values(m))if(value?.isTexture)textures.add(value);m.dispose();}});
    textures.forEach(t=>{t.image?.close?.();t.dispose();});
  }
  updateType() {
    if(!this.renderer)return;
    const el=document.querySelector('#world-title'),r=el.getBoundingClientRect(),s=getComputedStyle(el);
    const key=[el.textContent,s.fontSize,r.y.toFixed(1),r.width.toFixed(1),this.view].join('|');if(key===this.typeKey)return;this.typeKey=key;
    const c=this.outlineContext,d=this.outline.width/this.width;c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,this.width,this.height);
    if(this.view!=='detail'){
      c.font=`${s.fontWeight} ${s.fontSize} Inter`;c.textAlign='center';c.textBaseline='alphabetic';c.lineJoin='round';c.lineWidth=this.width<700?.7:1;
      c.letterSpacing=s.letterSpacing;c.strokeStyle='#f1eee7';
      const metrics=c.measureText(el.textContent),asc=metrics.fontBoundingBoxAscent||parseFloat(s.fontSize)*.96,desc=metrics.fontBoundingBoxDescent||parseFloat(s.fontSize)*.24;
      const y=r.y+(r.height-asc-desc)/2+asc;
      c.strokeText(el.textContent,r.x+r.width/2,y);
    }
    this.outlineTexture.needsUpdate=true;
  }
  animate(now) {
    if(this.disposed||document.hidden){this.frame=0;return;}
    this.frame=requestAnimationFrame(this.animate);
    // Cap mobile at 30 Hz; desktop transitions and pointer response can use 60 Hz.
    if(now-this.lastFrame<(this.width<700?30:15))return;
    this.lastFrame=now;
    const t=this.reduced?1:ease(Math.min((now-this.started)/1050,1));
    for(const k of ['x','y','size'])this.current[k]=lerp(this.from[k],this.destination[k],t);
    this.motion.x=lerp(this.motion.x,this.reduced?0:this.pointer.x,.07);this.motion.y=lerp(this.motion.y,this.reduced?0:this.pointer.y,.07);
    const amount=this.view==='detail'?0:this.parallax,dx=this.motion.x*9*amount,dy=this.motion.y*6*amount;
    const {x,y,size}=this.current;
    Object.assign(this.fallback.style,{left:`${x+dx}px`,top:`${y+dy}px`,width:`${size}px`,height:`${size}px`});
    if(this.lastAmbient!==this.ambient){this.lastAmbient=this.ambient;this.poster.style.filter=`brightness(${.8+this.ambient*.36}) drop-shadow(0 24px 25px #0006)`;}
    this.mask.style.maskSize=`${size}px ${size}px`;this.mask.style.maskPosition=`${x+dx-size/2}px ${y+dy-size/2}px`;
    if(this.renderer&&this.stage&&!this.lost){
      this.stage.root.rotation.y=this.stage.world.yaw+this.motion.x*.055*amount;
      this.stage.ambient.intensity=1.8+this.ambient*1.65;
      this.updateType();
      const drawKey=[this.stage.root.uuid,this.width,this.height,x.toFixed(1),y.toFixed(1),size.toFixed(1),dx.toFixed(2),dy.toFixed(2),this.motion.x.toFixed(3),this.ambient,this.typeKey].join('|');
      if(drawKey===this.drawKey)return;this.drawKey=drawKey;
      this.renderer.setRenderTarget(this.target);this.renderer.render(this.stage.scene,this.stage.camera);
      const u=this.compositeMaterial.uniforms;u.uRect.value.set((x+dx)/this.width,1-(y+dy)/this.height,size/this.width,size/this.height);u.uType.value=this.view==='detail'?0:1;
      this.renderer.setRenderTarget(null);this.renderer.render(this.composite,this.screenCamera);
    }
  }
  dispose() {
    this.disposed=true;cancelAnimationFrame(this.frame);clearTimeout(this.promoteTimer);this.resizeObserver.disconnect();document.removeEventListener('visibilitychange',this.visibility);
    for(const stage of this.cache.values())this.release(stage);this.cache.clear();this.outlineTexture?.dispose();this.target?.dispose();this.compositeMaterial?.dispose();this.renderer?.dispose();
  }
}
