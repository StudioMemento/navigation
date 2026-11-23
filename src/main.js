import './style.css';
import {PAGES} from './config.mjs';
import {clamp,wrap,relative,nearest,layout,titleSize,viewportHeight,pose,dragSnap,slideStep,wheelStep,queuedStep} from './model.mjs';
import {initialSection,installRouteSync} from './route-state.mjs';
import {settings,DEFAULTS} from './settings.js';
import {NAV} from './vfx/config.mjs';
import {TouchPulseField,listenForTouch,touchArrival} from './vfx/touch.mjs';
import {afterFirstPaint,announceEffects,whenIdle} from './paint.mjs';
import {routePath} from './kit/core.mjs';
import {vfxPolicy} from './vfx/policy.mjs';

// The public site uses native page navigation. Legacy Framer embeds can still open links in the top window.
let embeddedLegacy=false;try{embeddedLegacy=window.top!==window;}catch{embeddedLegacy=true;}
const container=!embeddedLegacy;
document.documentElement.dataset.hubRole=container?'container':'embedded';

const $=id=>document.getElementById(id),hub=$('hub'),scene=$('scene'),canvas=$('world');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),controller=new AbortController();
const on=(el,name,fn,options={})=>el.addEventListener(name,fn,{...options,signal:controller.signal});
const params=new URLSearchParams(location.search),labMode=params.has('lab'),forceReduced=params.get('motion')==='reduce';
const motionReduced=()=>reduced.matches||forceReduced;
if(forceReduced)document.documentElement.dataset.motion='reduce';
let storage;try{storage=sessionStorage;}catch{}
const routeSlug=()=>{const segment=location.pathname.split('/').filter(Boolean)[0]?.replace(/\.html$/,'');const page=PAGES.find(p=>p.slug===segment||(segment==='memento'&&p.id==='memento'));return page?.slug||initialSection({hash:location.hash,storage,referrer:''});};
let active=Math.max(0,PAGES.findIndex(p=>p.slug===(container?routeSlug():initialSection({hash:location.hash,storage,referrer:document.referrer}))));
let position=active,target=active,velocity=0,settled=true,raf=0,lastTime=0,drag=null,suppressClick=0,disposed=false,layoutFrame=0;
let l,overlay,engine=null,route,hostHeight,tiltX=0,tiltY=0,frameCount=0,fpsSince=0,frameTime=0,idle=0,qaPaused=false,calm=false,moved=false;
// R15: one decision per visit (query, Save-Data, device memory); `?vfx=off` keeps the HTML carousel
const policy=vfxPolicy();
let engineBooted=false;
const pointer={x:-999,y:-999,power:0,down:false,type:'mouse'};
const wheel={time:0,delta:0,used:false,sign:0,stepTime:-Infinity};
const cards=PAGES.map((p,i)=>{
 const card=scene.querySelector(`[data-page="${p.slug}"]`);
 if(!container){card.href=p.url;card.target='_top';}
 on(card.querySelector('img'),'load',()=>{if(engine)engine.loadScene(i,card.querySelector('img'));});
 on(card,'click',event=>{
  if(event.button||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  if(performance.now()<suppressClick){event.preventDefault();return;}
  if(i!==active){event.preventDefault();select(nearest(i,position));}
  else if(!container){route?.notify(p.slug);}
 });
 return {el:card,title:card.querySelector('h2'),pose:null};
});

const touches = new TouchPulseField();
// R15: the Home carousel gets the START's effects again. The HTML carousel paints first and stays the fallback; the
// renderer is downloaded after the first paint and created in the first idle period, then takes over card by card.
function bootEngine(){
 if(engineBooted||disposed)return;engineBooted=true;
 // R17: the page change waits for the renderer's first frame (or its failure) before it reveals the carousel
 const announced=announceEffects();
 const fallback=()=>{announced();canvas.hidden=true;document.body.dataset.renderer='fallback';delete document.documentElement.dataset.worldRenderer;document.documentElement.classList.remove('vfx-boot');};
 afterFirstPaint().then(()=>Promise.all([import('./renderer.js'),whenIdle()])).then(([{VfxRenderer}])=>{
  if(disposed){announced();return;}
  engine=VfxRenderer.create(canvas,PAGES,{
   touches,policy,
   onImage:i=>{cards[i].el.classList.add('image-ready');wake();},
   onTitle:i=>{cards[i].el.classList.add('title-ready');wake();},
   // the navbar's CSS blur steps aside in the frame the canvas takes over (the renderer composes the same blur)
   // (the HTML carousel's own hover feedback stays until then: data-world-renderer is set here)
   onLive:()=>{document.body.dataset.renderer='webgl';document.documentElement.dataset.worldRenderer='effects';overlay?.setAttribute('blur','off');wake();},
   wake:()=>wake()
  });
  if(engine){document.body.dataset.renderer='webgl-boot';canvas.hidden=false;}else fallback();
  if(l)fit();
 }).catch(error=>{console.warn('World renderer unavailable:',error?.message||error);fallback();});
}

function fit(){
 if(disposed)return;
 const width=document.documentElement.clientWidth,vv=visualViewport;
 const height=viewportHeight(document.documentElement.clientHeight,vv?.height,vv?.scale,hostHeight);
 const navTop=overlay?.shadowRoot?.querySelector('.mm-wordmark')?.getBoundingClientRect().bottom;
 const dockTop=overlay?.shadowRoot?.querySelector('.mm-dock')?.getBoundingClientRect().top;
 l=layout(width,height,{logoBottom:navTop,dockTop});
 const root=document.documentElement.style;
 for(const [k,v] of Object.entries({'vh':height,'card-w':l.width,'card-h':l.height,'padding':l.padding,'cut':l.cut,'previous-y':l.previousY,'next-y':l.nextY}))root.setProperty('--'+k,v+'px');
 root.setProperty('--nav-viewport-height',height+'px');
 scene.style.perspective=l.perspective+'px';
 const sizes=cards.map((card, i) => {
  const size=titleSize(l, PAGES[i].titleEm);
  card.el.style.setProperty('--title-size', size+'px');
  return size;
 });
 engine?.resize(l,sizes);loadVisible();drawPoses();wake();
}
function scheduleFit(){if(!layoutFrame)layoutFrame=requestAnimationFrame(()=>{layoutFrame=0;fit();});}
function loadVisible(){
 if(!l)return;
 cards.forEach((card,i)=>{
  if(Math.abs(relative(i,active))>=1.7)return;
  const img=card.el.querySelector('img');
  img.sizes=Math.round(l.width)+'px';
  if(!img.hasAttribute('srcset')){img.srcset=img.dataset.srcset;img.src=img.dataset.src;}
  engine?.loadScene(i,img);
 });
}
function updateActive(next,history=true){
 active=wrap(next);cards.forEach((c,i)=>{c.el.tabIndex=i===active?0:-1;if(i===active)c.el.setAttribute('aria-current','page');else c.el.removeAttribute('aria-current');});
 $('status').textContent=`${PAGES[active].label}. Sezione ${active+1} di 5. Attiva per aprire.`;hub.dataset.active=PAGES[active].slug;
 overlay?.setActive(PAGES[active].id);
 if(history){
  document.title=PAGES[active].label+' — Memento';
  if(container)window.history.replaceState(window.history.state,'',routePath({id:PAGES[active].id,view:'world'}));
  else{window.history.replaceState(null,'','#'+PAGES[active].slug);route?.notify(PAGES[active].slug);}
 }
 loadVisible();
}
function select(next,user=true){if(user)route?.markInteracted();target=next;settled=false;updateActive(Math.round(next));wake();}
function drawPoses(){
 if(!l)return [];
 return cards.map((c,i)=>{
  const d=relative(i,position),p=pose(d,l,motionReduced()),strength=1-p.secondary;p.distance=d;
  p.tiltX=tiltX*strength;p.tiltY=tiltY*strength;p.angle+=tiltY*.023*strength;p.yaw=tiltX*.029*strength;
  c.pose=p;if(c.el.hidden===p.visible)c.el.hidden=!p.visible;
  const slot=Math.abs(d)<.04?'active':d<0?'previous':'next';if(c.el.dataset.slot!==slot)c.el.dataset.slot=slot;
  const hidden=String(Math.abs(d)>1.4);if(c.el.getAttribute('aria-hidden')!==hidden)c.el.setAttribute('aria-hidden',hidden);
  const transform=`translate3d(0,${p.y.toFixed(3)}px,${p.z.toFixed(3)}px) rotateX(${(p.angle*180/Math.PI).toFixed(3)}deg) rotateY(${(p.yaw*180/Math.PI).toFixed(3)}deg)`;
  if(c.transform!==transform){c.el.style.transform=transform;c.transform=transform;}
  const opacity=(strength*strength).toFixed(3);if(c.opacity!==opacity){c.title.style.opacity=opacity;c.opacity=opacity;}
  return p;
 });
}
function stepWorld(dt){
 const moving=!settled||!!drag?.claimed;moved=moving;
 if(!drag?.claimed&&!settled)({position,velocity,settled}=slideStep(position,velocity,target,dt,motionReduced()));
 const k=1-Math.exp(-dt*6),amount=pointer.power&&!motionReduced()?1:0;
 const tx=clamp((pointer.x-l.cx)/(l.width*.65),-1,1)*amount,ty=clamp((pointer.y-l.cy)/(l.height*.85),-1,1)*amount;
 const tilting=Math.abs(tx-tiltX)+Math.abs(ty-tiltY)>.002;
 tiltX+=(tx-tiltX)*k;tiltY+=(ty-tiltY)*k;moved=moving||tilting;
 const poses=(moving||tilting||engine)?drawPoses():[];
 const busy=engine?engine.update(dt,poses,motionReduced(),moving,calm):false;
 return busy||moving||tilting;
}
function frame(now){
 raf=0;if(disposed||document.hidden||qaPaused)return;
 // R17: the page change no longer pauses the carousel: the renderer draws the exit and goes live under the cover
 // high refresh screens are capped at 60 renders a second (V24), a held hover at NAV.calmFps (R15); the frame is skipped
 if(lastTime&&now-lastTime<1000/(calm?NAV.calmFps:NAV.fps)-1){raf=requestAnimationFrame(frame);return;}
 const elapsed=lastTime?now-lastTime:16.67,dt=Math.min(elapsed/1000,.05);lastTime=now;
 const begin=performance.now();
 const active_=stepWorld(dt);
 // nothing is drawn before the renderer goes live: the HTML carousel is on screen until then
 if(engine?.live)engine.render();frameTime+=performance.now()-begin;frameCount++;
 if(!fpsSince)fpsSince=now;
 if(now-fpsSince>1500){
  const fps=+(frameCount*1000/(now-fpsSince)).toFixed(1),e=engine?.stats();
  const stats={renderer:document.body.dataset.renderer,active:PAGES[active].slug,fps,cpuMs:+(frameTime/frameCount).toFixed(2),width:l.w,height:l.h,motion:motionReduced()?'reduced':'full',...e};
  hub.dataset.stats=JSON.stringify(stats);const output=document.querySelector('.lab .qa');if(output)output.textContent=`${stats.renderer} · ${fps} fps · ${e?.quality||'-'} · DPR ${e?.dpr||'-'}\n${e?.scenes||0}/5 scene · ${e?.titles||0}/5 titoli · ${l.w} × ${l.h}\nDNA Memento VFX · ${stats.motion}`;
  frameCount=0;frameTime=0;fpsSince=now;
 }
 // At rest the carousel loop sleeps until the next interaction (R15: one second, as on the pages; nothing moves at rest).
 idle=active_?0:idle+dt;
 calm=!!engine?.calm&&!moved&&!drag;
 if(active_ || (engine && idle<NAV.idle))raf=requestAnimationFrame(frame);
}
function wake(){idle=0;if(!raf&&!document.hidden&&!disposed&&!qaPaused){if(lastTime&&performance.now()-lastTime>100){lastTime=0;engine?.settle();}calm=false;raf=requestAnimationFrame(frame);}}
on($('previous'),'click',()=>select(queuedStep(position,target,-1)));
on($('next'),'click',()=>select(queuedStep(position,target,1)));
on(hub,'wheel',e=>{
 if(e.ctrlKey||e.metaKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();const step=wheelStep(wheel,e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?l.h:1),performance.now());if(step)select(queuedStep(position,target,step));},{passive:false});
on(hub,'pointerdown',e=>{
 if(!e.isPrimary||e.button||e.target.closest('button'))return;route?.markInteracted();pointer.x=e.clientX;pointer.y=e.clientY;pointer.down=true;pointer.power=1;pointer.type=e.pointerType;
 // a held finger never feeds the slow hover chain (V26): touch is one contact wave, recorded by listenForTouch
 if(e.pointerType==='mouse')engine?.input.move(e.clientX,e.clientY,false);else engine?.input.leave();
 drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:position,lastY:e.clientY,lastTime:e.timeStamp,velocity:0,claimed:false};wake();
});
on(window,'pointermove',e=>{
 if(!e.isPrimary)return;pointer.x=e.clientX;pointer.y=e.clientY;pointer.type=e.pointerType;pointer.power=e.pointerType==='mouse'||pointer.down?1:0;
 if(e.pointerType==='mouse')engine?.input.move(e.clientX,e.clientY,false);else engine?.input.leave();
 if(drag&&e.pointerId===drag.id){const dy=e.clientY-drag.y,dx=e.clientX-drag.x;
  if(!drag.claimed&&Math.abs(dy)>8&&Math.abs(dy)>Math.abs(dx)*1.1){drag.claimed=true;hub.setPointerCapture(e.pointerId);document.body.classList.add('dragging');settled=false;velocity=0;}
  if(drag.claimed){const stride=Math.max(180,l.height+80);position=clamp(drag.start-dy/stride,drag.start-1.24,drag.start+1.24);drag.velocity=(drag.lastY-e.clientY)/stride/(Math.max(1,e.timeStamp-drag.lastTime)/1000);drag.lastY=e.clientY;drag.lastTime=e.timeStamp;suppressClick=performance.now()+350;}
 }wake();
},{passive:true});
function endPointer(e,cancel=false){
 if(!drag||e.pointerId!==drag.id)return;const old=drag;drag=null;pointer.down=false;document.body.classList.remove('dragging');
 // a lifted finger leaves one local impulse that travels and decays; a cancelled gesture or a swipe leaves none
 // release and native cancellation neither duplicate nor erase the contact wave already running (V26)
 if(pointer.type!=='mouse'){pointer.power=0;engine?.input.leave();}
 if(cancel)engine?.input.cancel();
 if(hub.hasPointerCapture(e.pointerId))hub.releasePointerCapture(e.pointerId);
 if(old.claimed){suppressClick=performance.now()+350;select(dragSnap(old.start,position,e.timeStamp-old.lastTime>100?0:old.velocity,cancel));}wake();
}
function cancelPointer(){pointer.power=0;pointer.down=false;engine?.input.cancel();if(drag){target=Math.round(drag.start);settled=false;drag=null;updateActive(target);}document.body.classList.remove('dragging');wake();}
on(window,'pointerup',e=>endPointer(e));on(window,'pointercancel',e=>endPointer(e,true));on(window,'blur',cancelPointer);on(window,'pointerout',e=>{if(!e.relatedTarget){pointer.power=0;engine?.input.leave();wake();}});
// keyboard: a short accent where focus lands; the focus ring stays the DOM's own
on(document,'focusin',e=>{const i=cards.findIndex(c=>c.el===e.target);if(i>=0&&e.target.matches(':focus-visible'))engine?.pulseCard(i);});
// Touch (V27): one passive contact event starts a wave read by every card and title on the next frame. Without the
// GPU representation, the titles it reaches take their amber gradient for a moment instead (bounded, no loop).
const lit=new Set(),litTimers=new Set();let fallbackContacts=0;
function contact(x,y){
 if(document.hidden||motionReduced()||matchMedia('(forced-colors: active)').matches)return;
 const wave=engine?.touchAt(x,y);
 if(document.documentElement.classList.contains('vfx-live'))return;
 // the same timing, on the wall clock, for the DOM titles
 const now=performance.now(),w={id:wave?.id??++fallbackContacts,x,y,start:now,reach:Math.max(1,Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y)))};
 litTimers.forEach(clearTimeout);litTimers.clear();lit.forEach(el=>el.classList.remove('touch-lit'));lit.clear();
 for(const c of cards){
  if(c.el.hidden)continue;const r=c.title.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)continue;
  const later=(fn,ms)=>{const id=setTimeout(()=>{litTimers.delete(id);fn();},Math.max(0,ms));litTimers.add(id);};
  later(()=>{c.title.classList.add('touch-lit');lit.add(c.title);later(()=>{c.title.classList.remove('touch-lit');lit.delete(c.title);},340);},touchArrival(w,r.left+r.width/2,r.top+r.height/2,r.left)-performance.now());
 }
}
listenForTouch(window,contact,controller.signal);on(hub,'dragstart',e=>e.preventDefault());
on(window,'keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable]')||e.composedPath().includes(overlay))return;
 if(['ArrowDown','ArrowRight','PageDown'].includes(e.key)){e.preventDefault();select(queuedStep(position,target,1));}
 else if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();select(queuedStep(position,target,-1));}
 else if(e.key==='Home'){e.preventDefault();select(nearest(0,position));}
 else if(e.key==='End'){e.preventDefault();select(nearest(4,position));}
 else if(e.key==='Escape')cancelPointer();
});
on(window,'resize',scheduleFit);if(visualViewport)on(visualViewport,'resize',scheduleFit);
on(document,'memento:surface-visibility',wake);
// R17: the page change (scene-head): the cards come apart into the seal; the cover lifts; the page came back
on(document,'memento:scene-exit',e=>{if(e.detail)engine?.exit(e.detail.origin,e.detail.duration);wake();});
on(document,'memento:scene-unfold',()=>{lastTime=0;wake();});
on(document,'memento:scene-reset',()=>{engine?.resetExit();wake();});
on(document,'visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastTime=0;}else{lastTime=0;wake();}});
on(window,'pageshow',()=>{lastTime=0;wake();});
on(window,'pagehide',e=>{cancelAnimationFrame(raf);raf=0;if(!e.persisted){disposed=true;controller.abort();cancelAnimationFrame(layoutFrame);engine?.dispose();litTimers.forEach(clearTimeout);}});
on(reduced,'change',()=>{lastTime=0;wake();});
// Any loss of the context returns the navigation to its DOM rendering at once.
on(canvas,'webglcontextlost',e=>{e.preventDefault();if(engine)engine.lost=true;overlay?.removeAttribute('blur');document.documentElement.classList.remove('vfx-live','vfx-boot');delete document.documentElement.dataset.worldRenderer;document.body.dataset.renderer='context-lost';});
on(canvas,'webglcontextrestored',()=>{if(!engine)return;engine.restore();if(engine.live){document.documentElement.dataset.worldRenderer='effects';overlay?.setAttribute('blur','off');document.documentElement.classList.add('vfx-live');}document.body.dataset.renderer='webgl';fit();wake();});
const VIEWPORT='memento:hub-viewport',HOSTS=['https://mementostudio.it','https://www.mementostudio.it'];
if(!container)on(window,'message',event=>{const d=event.data;if(event.source!==window.parent||!HOSTS.includes(event.origin)||!d||d.channel!==VIEWPORT||d.version!==1||d.type!=='VIEWPORT'||!Number.isFinite(d.height)||d.height<160||d.height>10000)return;hostHeight=d.height;scheduleFit();});
if(window.parent!==window)for(const origin of HOSTS)window.parent.postMessage({channel:VIEWPORT,version:1,type:'REQUEST'},origin);
if(!container)route=installRouteSync({storage,signal:controller.signal,readSection:()=>PAGES[active].slug,applySection:(slug,{initial})=>{const i=PAGES.findIndex(p=>p.slug===slug);if(i<0)return;if(initial){position=target=i;velocity=0;settled=true;updateActive(i,false);wake();}else select(nearest(i,position),false);}});

function setupLab(){
 const button=document.createElement('button');button.className='lab-toggle';button.textContent='Regia';button.setAttribute('aria-expanded','false');
 const panel=document.createElement('aside');panel.className='lab';panel.hidden=true;panel.innerHTML='<h3>MEMENTO VFX DNA</h3>';
 const options=[['reach','Raggio del puntatore',120,400,10],['bloom','Bloom selettivo',0,2,.05],['streak','Striatura anamorfica',0,2,.05],['parallax','Profondità immagini',0,2,.05],['edge','Luce del bordo',0,2,.05],['lights','Sorgenti delle scene',0,2,.05],['shards','Schegge',0,1,1]];
 for(const [key,label,min,max,step] of options){const el=document.createElement('label');el.innerHTML=`${label}<output>${settings[key]}</output><input aria-label="${label}" type="range" min="${min}" max="${max}" step="${step}" value="${settings[key]}">`;on(el.querySelector('input'),'input',e=>{settings[key]=+e.target.value;el.querySelector('output').textContent=settings[key];wake();});panel.append(el);}
 const reset=document.createElement('button');reset.textContent='Ripristina';on(reset,'click',()=>{Object.assign(settings,DEFAULTS);panel.querySelectorAll('input').forEach((el,i)=>{el.value=settings[options[i][0]];el.previousElementSibling.textContent=el.value;});wake();});panel.append(reset);const qa=document.createElement('output');qa.className='qa';panel.append(qa);
 on(button,'click',()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));});document.body.append(button,panel);
}
if(container)on(window,'hashchange',()=>{
 const i=PAGES.findIndex(p=>p.slug===routeSlug());
 if(i<0||i===active)return;
 position=target=i;velocity=0;settled=true;updateActive(i,false);drawPoses();wake();
});
// The HTML carousel paints first (photos and titles of the build). R15: the renderer takes over unless the visit's
// policy keeps the HTML carousel (?vfx=off, Save-Data, very low memory); software graphics are detected by the renderer.
canvas.hidden=true;
document.body.dataset.renderer='dom';
if(policy.enabled)bootEngine();
fit();updateActive(active,false);
if(labMode)setupLab();
document.fonts.ready.then(scheduleFit);
const navigationURL=new URL(`${import.meta.env.BASE_URL}navigation/navbar.mjs`,document.baseURI).href;
import(/* @vite-ignore */ navigationURL).then(({mountNav})=>{
 overlay=mountNav({active:PAGES[active].id,mode:container?'host':'standalone'});
 if(container){overlay.setAttribute('current','location');if(engine?.live&&!engine.lost)overlay.setAttribute('blur','off');scheduleFit();return;}
 overlay.setAttribute('target','_top');
 if(engine?.live&&!engine.lost)overlay.setAttribute('blur','off');
 on(overlay,'click',e=>{const link=e.composedPath().find(n=>n?.tagName==='A');if(link){const p=PAGES.find(p=>p.url===link.href);if(p){route.markInteracted();route.notify(p.slug);}}},{capture:true});scheduleFit();
}).catch(error=>console.warn('Overlay unavailable',error.message));
wake();
// ?qa=1: deterministic stepping for visual checks on slow (software) renderers. Not active in normal use.
if(params.has('qa'))window.__nav={
 pause(){qaPaused=true;cancelAnimationFrame(raf);raf=0;},
 resume(){qaPaused=false;lastTime=0;wake();},
 advance(seconds,fps=60){const dt=1/fps;for(let t=0;t<seconds-1e-6;t+=dt)stepWorld(dt);engine?.render();return engine?.stats();},
 select(i){select(nearest(i,position));},
 pointer(x,y){pointer.x=x;pointer.y=y;pointer.type='mouse';pointer.power=1;engine?.input.move(x,y,false);},
 touch(x,y){contact(x,y);},
 leave(){pointer.power=0;engine?.input.leave();},
 get engine(){return engine;},
 get animating(){return !!raf;}
};
