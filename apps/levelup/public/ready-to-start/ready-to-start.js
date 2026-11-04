import {PRESET} from './preset.js';
import {clamp,computeComposition,framePolygon,makeEdgeSegments} from './geometry.js';
import {ParticleSimulation,segmentDistance} from './physics.js';
import {ParticleRenderer} from './renderer.js';
import {UniverseSimulation} from './universe.js';
import {DirectionalType} from './type-light.js';

export class ReadyToStart{
 constructor(card,options={}){
  if(!(card instanceof HTMLAnchorElement))throw new TypeError('ReadyToStart needs a semantic anchor');
  this.card=card;this.options=options;this.abort=new AbortController();this.canvas=card.querySelector('.memento-start__canvas');this.edgesCanvas=card.querySelector('.memento-start__edges');this.ctx=this.edgesCanvas.getContext('2d');this.frame=card.querySelector('.memento-start__frame');this.title=card.querySelector('.memento-start__title');this.footer=card.querySelector('.memento-start__footer');
  this.pointer={x:-1000,y:-1000,px:-1000,py:-1000,rawX:-1000,rawY:-1000,vx:0,vy:0,active:false,activity:0,movedAt:-10000};this.gesture=null;this.suppressClick=false;this.pointers=new Set();this.edges=makeEdgeSegments();this.edgeBuckets=Array.from({length:16},()=>[]);this.raf=0;this.elapsed=0;this.accumulator=0;this.yaw=.15;this.pitch=-.045;this.interactionHeat=0;this.visible=true;this.disposed=false;this.timings=[];this.intervals=[];this.qualityTime=0;this.qualityStep=0;this.statsTime=0;
  this.motion=matchMedia('(prefers-reduced-motion: reduce)');this.reduced=this.motion.matches;
  this.mobile=matchMedia('(pointer: coarse)').matches;
  const count=options.particles||(this.mobile?PRESET.mobile:((navigator.hardwareConcurrency||4)>=8?PRESET.high:PRESET.balanced));this.simulation=new ParticleSimulation(count);this.drawCount=count;this.particleCapacity=count;this.universe=new UniverseSimulation(this.mobile?PRESET.mobileBackground:PRESET.background);this.text=new DirectionalType(this.title);this.fontsReady=false;this.backgroundCapacity=this.universe.count;
  try{this.renderer=new ParticleRenderer(this.canvas);}catch(error){this.fallbackReason=String(error);this.card.dataset.renderer='static';this.card.dataset.fallbackReason=this.fallbackReason;}
  this.listen(this.canvas,'webglcontextlost',e=>{e.preventDefault();this.pause();delete this.card.dataset.typeReady;this.card.dataset.renderer='static';this.fallbackStyle();this.ctx?.clearRect(0,0,this.w,this.h);});
  this.listen(this.canvas,'webglcontextrestored',()=>{try{this.renderer?.dispose();this.renderer=new ParticleRenderer(this.canvas);this.resize();this.last=0;this.resume();}catch{this.card.dataset.renderer='static';}});
  this.listen(window,'blur',()=>{this.pointer.active=false;this.pointer.activity=0;this.gesture=null;});
  this.listen(document,'visibilitychange',()=>{if(document.hidden)this.pause();else this.resume();});
  this.listen(this.motion,'change',e=>{this.reduced=e.matches;this.pause();this.simulation.initialized=false;this.edges.forEach(e=>e.release=0);this.renderStatic();if(!this.reduced)this.resume();});
  this.listen(card,'pointerenter',e=>{if(e.pointerType==='mouse'||e.pointerType==='pen')this.setPointer(e,true);});
  this.listen(card,'pointermove',e=>this.onMove(e));
  this.listen(card,'pointerleave',e=>{if(e.pointerType!=='touch'){this.pointer.active=false;this.pointer.activity=0;}});
  this.listen(card,'pointerdown',e=>this.onDown(e));
  this.listen(card,'pointerup',e=>this.onUp(e));
  this.listen(card,'pointercancel',e=>this.cancelGesture(e));
  this.listen(card,'lostpointercapture',e=>{if(this.gesture?.id===e.pointerId){this.suppressClick=this.gesture.moved;this.gesture=null;this.pointer.active=false;}});
  this.listen(card,'click',e=>{if(e.detail!==0&&this.suppressClick){e.preventDefault();this.suppressClick=false;}});
  this.listen(card,'dragstart',e=>e.preventDefault());
  this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(card);
  this.intersection=new IntersectionObserver(entries=>{this.visible=entries[0].isIntersecting;if(this.visible)this.resume();else this.pause();},{rootMargin:'120px'});this.intersection.observe(card);
  this.resize();document.fonts?.ready.then(()=>{if(!this.disposed){this.fontsReady=true;this.resize();}});this.resume();
 }
 listen(target,event,fn,options={}){target.addEventListener(event,fn,{...options,signal:this.abort.signal});}
 setPointer(e,enter=false){
  const rect=this.card.getBoundingClientRect(),p=this.pointer,x=e.clientX-rect.left,y=e.clientY-rect.top;
  if(enter||!p.active){p.x=p.px=p.rawX=x;p.y=p.py=p.rawY=y;p.vx=p.vy=0;}
  else if(Math.hypot(x-p.rawX,y-p.rawY)>.15)p.movedAt=performance.now();
  p.rawX=x;p.rawY=y;p.active=true;p.type=e.pointerType;p.pressure=e.pressure||.5;
 }
 onDown(e){
  this.suppressClick=false;if(e.pointerType==='mouse'){this.setPointer(e);return;}
  this.pointers.add(e.pointerId);
  if(!e.isPrimary||this.pointers.size>1){this.suppressClick=true;this.gesture=null;this.pointer.active=false;return;}
  this.gesture={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false,playing:false};this.setPointer(e,true);
 }
 onMove(e){
  if(e.pointerType==='mouse'||e.pointerType==='pen'){this.setPointer(e);return;}
  const g=this.gesture;if(!g||g.id!==e.pointerId||this.pointers.size!==1)return;
  const dx=e.clientX-g.x,dy=e.clientY-g.y;
  if(Math.hypot(dx,dy)>10){g.moved=true;this.suppressClick=true;}
  if(!g.playing&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.25){g.playing=true;try{this.card.setPointerCapture(e.pointerId);}catch{}}
  if(g.playing){this.setPointer(e);if(e.cancelable)e.preventDefault();}
 }
 onUp(e){
  this.pointers.delete(e.pointerId);if(e.pointerType==='mouse')return;
  if(this.gesture?.id===e.pointerId){this.suppressClick=this.gesture.moved;this.gesture=null;}
  if(this.card.hasPointerCapture(e.pointerId))this.card.releasePointerCapture(e.pointerId);
  this.pointer.active=false;this.pointer.activity=0;
 }
 cancelGesture(e){this.pointers.delete(e.pointerId);this.suppressClick=true;this.gesture=null;this.pointer.active=false;this.pointer.activity=0;if(this.card.hasPointerCapture(e.pointerId))this.card.releasePointerCapture(e.pointerId);}
 resize(){
  const rect=this.card.getBoundingClientRect();if(!rect.width||!rect.height)return;
  const w=rect.width,h=rect.height;this.w=w;this.h=h;this.cut=clamp(w*.026,20,40);this.pad=clamp(w*.056,24,108);
  const compact=this.mobile||w<600;
  this.simulation.count=Math.min(this.particleCapacity,compact?PRESET.mobile:PRESET.high);this.universe.count=Math.min(this.backgroundCapacity,compact?PRESET.mobileBackground:PRESET.background);
  if(this.qualityStep>0)this.universe.count=Math.floor(this.universe.count*.7);if(this.qualityStep>1)this.simulation.count=Math.max(PRESET.low,Math.floor(this.simulation.count*.5));this.drawCount=this.simulation.count;
  this.titleTop=h*.74;this.composition=computeComposition(w,h,innerWidth,this.pad,0);
  const poly=framePolygon(w,h,this.cut);this.polygon=poly;
  this.frame.setAttribute('viewBox',`0 0 ${w} ${h}`);
  this.frame.querySelector('path').setAttribute('d',`M ${this.cut} .5 H ${w-.5} V ${h-this.cut} L ${w-this.cut} ${h-.5} H .5 V ${this.cut} Z`);
  this.fallbackStyle();
  const baseDpr=this.mobile?PRESET.mobileDpr:PRESET.dpr;this.dpr=Math.min(devicePixelRatio||1,this.qualityStep>0?1:baseDpr);
  this.renderer?.resize(w,h,this.dpr,this.titleTop);this.edgesCanvas.width=Math.round(w*this.dpr);this.edgesCanvas.height=Math.round(h*this.dpr);this.ctx?.setTransform(this.dpr,0,0,this.dpr,0,0);
  this.universe.setBounds(w,h,this.cut,this.titleTop);this.simulation.setBounds(w,h,this.cut,this.composition);this.simulation.setRotation(this.yaw,this.pitch);
  if(this.fontsReady){this.text.resize(w,h);this.card.dataset.typeReady='true';this.titleTop=this.text.y;}
  this.card.dataset.layout=JSON.stringify({width:w,height:h,center:[this.composition.cx,this.composition.cy],scale:this.composition.scale,inkWidths:this.text.opticalWidths,canvas:[this.canvas.width,this.canvas.height],dpr:this.dpr});
  if(!this.simulation.initialized||this.reduced)this.renderStatic();else this.draw();
 }
 fallbackStyle(){const img=this.card.querySelector('.memento-start__fallback'),c=this.composition;if(img){if(this.card.dataset.renderer==='static'&&!img.getAttribute('src'))img.src=img.dataset.src;img.style.left=(c.cx-c.scale)+'px';img.style.top=(c.cy-1.1*c.scale)+'px';img.style.width=c.scale*2.1+'px';img.style.height=c.scale*2.1+'px';}}
 renderStatic(){this.yaw=0;this.pitch=0;this.interactionHeat=0;const idle={...this.pointer,active:false};this.simulation.setRotation(0,0);this.simulation.step(0,idle,{staticFrame:true});this.universe.step(0,idle,{staticFrame:true});this.text.step(0,idle,true);this.draw();}
 updatePointer(dt,now){
  const p=this.pointer;p.px=p.x;p.py=p.y;
  const a=1-Math.exp(-dt/PRESET.pointerSmooth),x=p.x,y=p.y;p.x+=(p.rawX-p.x)*a;p.y+=(p.rawY-p.y)*a;
  const max=Math.min(this.w,this.h)*4,decay=1-Math.exp(-dt/.045);
  p.vx+=(clamp((p.x-x)/Math.max(dt,.001),-max,max)-p.vx)*decay;p.vy+=(clamp((p.y-y)/Math.max(dt,.001),-max,max)-p.vy)*decay;
  p.activity=p.active?Math.exp(-Math.max(0,now-p.movedAt-35)/105)*(p.type==='touch'?.62+.22*p.pressure:1):0;
 }
 animate=(now)=>{
  this.raf=0;if(this.disposed||!this.visible||document.hidden||this.reduced)return;
  const start=performance.now(),validInterval=!!this.last,actualInterval=this.last?now-this.last:16.67,dt=Math.min(actualInterval/1000,1/30);this.last=now;this.elapsed+=dt;
  this.updatePointer(dt,now);this.interactionHeat=Math.max(this.pointer.activity,this.interactionHeat*Math.exp(-dt*2.8));
  const tilt=1-Math.exp(-dt/PRESET.tiltSmooth),p=this.pointer;
  if(!this.renderer){this.text.step(dt,p);this.text.draw();this.raf=requestAnimationFrame(this.animate);return;}
  const targetYaw=Math.sin(this.elapsed*.30)*.11+(p.active?clamp((p.x/this.w-.5)*1.30,-.65,.65):0);
  const targetPitch=Math.sin(this.elapsed*.24)*.05+(p.active?clamp((p.y/this.h-.5)*.80,-.40,.40):0);
  this.yaw+=(targetYaw-this.yaw)*tilt;this.pitch+=(targetPitch-this.pitch)*tilt;this.simulation.setRotation(this.yaw,this.pitch);
  this.accumulator=Math.min(this.accumulator+dt,PRESET.maxSubsteps*PRESET.fixedStep);
  let steps=0;while(this.accumulator>=PRESET.fixedStep&&steps<PRESET.maxSubsteps){this.simulation.step(PRESET.fixedStep,p,{skipIdle:steps>0});this.accumulator-=PRESET.fixedStep;steps++;}
  const iconCpu=performance.now()-start;this.universe.step(dt,p);this.text.step(dt,p);const dynamicsCpu=performance.now()-start-iconCpu;const renderStart=performance.now();this.draw();this.phases={iconCpuMs:+iconCpu.toFixed(2),fieldTypeCpuMs:+dynamicsCpu.toFixed(2),renderCpuMs:+(performance.now()-renderStart).toFixed(2)};
  const cost=performance.now()-start;this.timings.push(cost);this.intervals.push(actualInterval);if(this.timings.length>180){this.timings.shift();this.intervals.shift();}
  this.options.onFrame?.({interval:actualInterval,cpu:cost,valid:validInterval,at:now,quality:this.qualityStep,icon:this.drawCount,ambient:this.universe.count,dpr:this.dpr});
  this.qualityTime+=cost>12?dt:-dt*.5;this.qualityTime=clamp(this.qualityTime,0,3);
  if(this.qualityTime>=3&&this.qualityStep<2){this.qualityStep++;this.qualityTime=0;if(this.qualityStep===1){this.renderer.setQuality(this.qualityStep);this.backgroundTarget=Math.max(2000,Math.floor(this.universe.count*.7));this.resize();}else this.targetCount=Math.max(PRESET.low,this.simulation.count/2);}
  if(this.backgroundTarget&&this.universe.count>this.backgroundTarget)this.universe.count=Math.max(this.backgroundTarget,this.universe.count-24);
  if(this.targetCount&&this.simulation.count>this.targetCount){this.simulation.count=Math.max(this.targetCount,this.simulation.count-64);this.drawCount=this.simulation.count;}
  if(now-this.statsTime>1000){this.statsTime=now;const timing=[...this.timings].sort((a,b)=>a-b),intervals=[...this.intervals].sort((a,b)=>a-b),stats=this.simulation.getStats();this.card.dataset.diagnostics=JSON.stringify({...stats,...this.universe.getStats(),...this.text.stats(),...this.phases,medianCpuMs:+(timing[Math.floor(timing.length*.5)]||0).toFixed(2),p95CpuMs:+(timing[Math.floor(timing.length*.95)]||0).toFixed(2),medianFrameMs:+(intervals[Math.floor(intervals.length*.5)]||0).toFixed(2),p95FrameMs:+(intervals[Math.floor(intervals.length*.95)]||0).toFixed(2),dpr:this.dpr,qualityStep:this.qualityStep,sourceTriangles:826,visibleMeshTriangles:0,renderPrimitive:this.renderer.instancing?'INSTANCED_GRAINS':'POINT_GRAINS',pointLight:'upper-right amber',emission:'every contact',camera:'perspective',depthOfField:'depth-buffer thin lens',nativeDepthTexture:this.renderer.nativeDepth,focusDistance:this.renderer.camera.focus,yawDegrees:+(this.yaw*180/Math.PI).toFixed(1),pitchDegrees:+(this.pitch*180/Math.PI).toFixed(1),webglError:this.renderer.gl.getError(),sceneTime:+this.elapsed.toFixed(2),reducedMotion:this.reduced,running:true});this.options.onStats?.(stats);}
  this.raf=requestAnimationFrame(this.animate);
 };
 draw(){
  if(this.renderer&&!this.renderer.gl.isContextLost()){this.renderer.render(this.simulation.renderData(),this.drawCount,{composition:this.composition,yaw:this.yaw,pitch:this.pitch,time:this.elapsed,pointer:this.pointer,backgroundData:this.universe.renderData(),backgroundCount:this.universe.count,foregroundData:this.universe.foregroundVertices,foregroundCount:this.universe.foregroundCount});this.card.dataset.renderer='webgl';}
  this.text.draw();
  const ctx=this.ctx;if(!ctx)return;ctx.clearRect(0,0,this.w,this.h);ctx.save();ctx.beginPath();this.polygon.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.clip();
  const flash=impact=>{const age=(this.simulation.time-impact.time)/PRESET.frameFlashDuration,alpha=Math.max(0,1-age)*impact.energy;ctx.lineWidth=1.1;ctx.strokeStyle=`rgba(255,161,100,${alpha*.6})`;ctx.beginPath();ctx.moveTo(impact.x-impact.tx*9,impact.y-impact.ty*9);ctx.lineTo(impact.x+impact.tx*9,impact.y+impact.ty*9);ctx.stroke();};
  for(const impact of this.simulation.impacts)flash(impact);for(const impact of this.universe.impacts)flash(impact);ctx.restore();this.options.onAfterDraw?.();
 }
 pause(){if(this.raf)cancelAnimationFrame(this.raf);this.raf=0;this.last=0;this.accumulator=0;this.card.dataset.running='false';}
 resume(){if(!this.disposed&&this.visible&&!document.hidden){if(this.reduced)this.renderStatic();else if(!this.raf){this.last=0;this.raf=requestAnimationFrame(this.animate);this.card.dataset.running='true';}}}
 destroy(){this.disposed=true;this.pause();this.abort.abort();this.resizeObserver.disconnect();this.intersection.disconnect();this.renderer?.dispose();this.text.dispose();delete this.card.dataset.typeReady;this.ctx?.clearRect(0,0,this.w,this.h);this.card.dataset.renderer='static';delete this.card.dataset.diagnostics;}
}

export function mountReadyToStart(root=document,options={}){return [...root.querySelectorAll('[data-ready-to-start]')].map(card=>new ReadyToStart(card,options));}
