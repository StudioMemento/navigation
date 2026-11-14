import './style.css';
import {PAGES} from './config.mjs';
import {clamp,wrap,relative,nearest,layout,viewportHeight,pose,dragSnap,slideStep,wheelStep,queuedStep} from './model.mjs';
import {initialSection,installRouteSync} from './route-state.mjs';
import {VfxRenderer} from './renderer.js';
import {settings,DEFAULTS} from './settings.js';
import {NAV} from './vfx/config.mjs';

const $=id=>document.getElementById(id),hub=$('hub'),scene=$('scene'),canvas=$('world');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),controller=new AbortController();
const on=(el,name,fn,options={})=>el.addEventListener(name,fn,{...options,signal:controller.signal});
const params=new URLSearchParams(location.search),labMode=params.has('lab'),forceReduced=params.get('motion')==='reduce';
const motionReduced=()=>reduced.matches||forceReduced;
let storage;try{storage=sessionStorage;}catch{}
let active=Math.max(0,PAGES.findIndex(p=>p.slug===initialSection({hash:location.hash,storage,referrer:document.referrer})));
let position=active,target=active,velocity=0,settled=true,raf=0,lastTime=0,drag=null,suppressClick=0,disposed=false,layoutFrame=0;
let l,overlay,engine,route,hostHeight,tiltX=0,tiltY=0,frameCount=0,fpsSince=0,frameTime=0,idle=0,qaPaused=false;
const pointer={x:-999,y:-999,power:0,down:false,type:'mouse'};
const wheel={time:0,delta:0,used:false,sign:0,stepTime:-Infinity};
const titleMetrics=new Map(),measure=document.createElement('canvas').getContext('2d');
const cards=PAGES.map((p,i)=>{
 const card=document.createElement('a');card.className='card';card.href=p.url;card.target='_top';card.draggable=false;card.dataset.page=p.slug;card.setAttribute('aria-label',`Apri ${p.label}`);
 card.innerHTML=`<img src="${import.meta.env.BASE_URL}assets/scenes/${p.slug}-768.webp" srcset="${import.meta.env.BASE_URL}assets/scenes/${p.slug}-768.webp 768w,${import.meta.env.BASE_URL}assets/scenes/${p.slug}-1536.webp 1536w" sizes="88vw" alt="${p.alt}" width="1536" height="1024" draggable="false" decoding="async" ${Math.abs(relative(i,active))<1.5?'fetchpriority="high"':'loading="lazy"'}><h2 aria-hidden="true">${[...p.title].map(c=>`<span>${c}</span>`).join('')}</h2>`;
 scene.append(card);
 on(card,'click',event=>{
  if(event.button||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  if(performance.now()<suppressClick){event.preventDefault();return;}
  if(i!==active||!settled){event.preventDefault();select(nearest(i,position));}
  else{route?.notify(p.slug);}
 });
 return {el:card,title:card.querySelector('h2'),letters:[...card.querySelectorAll('h2 span')],pose:null};
});

// One WebGL2 context, the START's VFX engine. Any failure leaves the plain DOM navigation (images and titles).
engine=VfxRenderer.create(canvas,PAGES,{
 onImage:i=>{cards[i].el.classList.add('image-ready');wake();},
 onTitle:i=>{cards[i].el.classList.add('title-ready');wake();},
 onLive:()=>{document.body.dataset.renderer='webgl';wake();},
 wake:()=>wake()
});
if(engine)document.body.dataset.renderer='webgl-boot';
else{canvas.hidden=true;document.body.dataset.renderer='fallback';document.documentElement.classList.remove('vfx-boot');}

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
 const sizes=cards.map(c=>{let metric=titleMetrics.get(c.title.textContent);if(!metric){measure.font='280 100px Inter';metric=c.letters.reduce((sum,el)=>sum+measure.measureText(el.textContent).width,0)/100;titleMetrics.set(c.title.textContent,metric);}const available=l.width-l.padding*2,size=Math.min(l.height*.27,available/(metric+(c.letters.length-1)*.23));c.el.style.setProperty('--title-size',size+'px');return size;});
 engine?.resize(l,sizes);loadVisible();drawPoses();wake();
}
function scheduleFit(){if(!layoutFrame)layoutFrame=requestAnimationFrame(()=>{layoutFrame=0;fit();});}
function loadVisible(){if(!engine||!l)return;for(let i=0;i<5;i++)if(Math.abs(relative(i,active))<1.7)engine.loadScene(i,l.width*(engine.dpr||1));}
function updateActive(next,history=true){
 active=wrap(next);cards.forEach((c,i)=>{c.el.tabIndex=i===active?0:-1;if(i===active)c.el.setAttribute('aria-current','page');else c.el.removeAttribute('aria-current');});
 overlay?.setActive(PAGES[active].id);$('status').textContent=`${PAGES[active].label}. Sezione ${active+1} di 5. Attiva per aprire.`;
 document.title=`${PAGES[active].label} — Memento`;hub.dataset.active=PAGES[active].slug;
 if(history){window.history.replaceState(null,'','#'+PAGES[active].slug);route?.notify(PAGES[active].slug);}loadVisible();
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
 const moving=!settled||!!drag?.claimed;
 if(!drag?.claimed&&!settled)({position,velocity,settled}=slideStep(position,velocity,target,dt,motionReduced()));
 const k=1-Math.exp(-dt*6),amount=pointer.power&&!motionReduced()?1:0;
 const tx=clamp((pointer.x-l.cx)/(l.width*.65),-1,1)*amount,ty=clamp((pointer.y-l.cy)/(l.height*.85),-1,1)*amount;
 const tilting=Math.abs(tx-tiltX)+Math.abs(ty-tiltY)>.002;
 tiltX+=(tx-tiltX)*k;tiltY+=(ty-tiltY)*k;
 const poses=drawPoses();
 const busy=engine?engine.update(dt,poses,motionReduced(),moving):false;
 return busy||moving||tilting;
}
function frame(now){
 raf=0;if(disposed||document.hidden||qaPaused)return;
 const elapsed=lastTime?now-lastTime:16.67,dt=Math.min(elapsed/1000,.05);lastTime=now;
 const begin=performance.now();
 const active_=stepWorld(dt);
 engine?.render();frameTime+=performance.now()-begin;frameCount++;
 if(!fpsSince)fpsSince=now;
 if(now-fpsSince>1500){
  const fps=+(frameCount*1000/(now-fpsSince)).toFixed(1),e=engine?.stats();
  const stats={renderer:document.body.dataset.renderer,active:PAGES[active].slug,fps,cpuMs:+(frameTime/frameCount).toFixed(2),width:l.w,height:l.h,motion:motionReduced()?'reduced':'full',...e};
  hub.dataset.stats=JSON.stringify(stats);const output=document.querySelector('.lab .qa');if(output)output.textContent=`${stats.renderer} · ${fps} fps · ${e?.quality||'-'} · DPR ${e?.dpr||'-'}\n${e?.scenes||0}/5 scene · ${e?.titles||0}/5 titoli · ${l.w} × ${l.h}\nDNA Memento VFX · ${stats.motion}`;
  frameCount=0;frameTime=0;fpsSince=now;
 }
 // At rest nothing moves (DNA): the loop sleeps a moment after the last reaction, the grain freezes with it.
 idle=active_?0:idle+dt;
 if(idle<NAV.idle)wake();
}
function wake(){idle=0;if(!raf&&!document.hidden&&!disposed&&!qaPaused){if(lastTime&&performance.now()-lastTime>100)lastTime=0;raf=requestAnimationFrame(frame);}}
on($('previous'),'click',()=>select(queuedStep(position,target,-1)));
on($('next'),'click',()=>select(queuedStep(position,target,1)));
on(hub,'wheel',e=>{if(e.ctrlKey||e.metaKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();const step=wheelStep(wheel,e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?l.h:1),performance.now());if(step)select(queuedStep(position,target,step));},{passive:false});
on(hub,'pointerdown',e=>{
 if(!e.isPrimary||e.button||e.target.closest('button'))return;route?.markInteracted();pointer.x=e.clientX;pointer.y=e.clientY;pointer.down=true;pointer.power=1;pointer.type=e.pointerType;
 engine?.input.move(e.clientX,e.clientY,e.pointerType==='touch');if(e.pointerType!=='mouse')engine?.pulseAt(e.clientX,e.clientY,.9,4);
 drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:position,lastY:e.clientY,lastTime:e.timeStamp,velocity:0,claimed:false};wake();
});
on(window,'pointermove',e=>{
 if(!e.isPrimary)return;pointer.x=e.clientX;pointer.y=e.clientY;pointer.type=e.pointerType;pointer.power=e.pointerType==='mouse'||pointer.down?1:0;
 if(pointer.power)engine?.input.move(e.clientX,e.clientY,e.pointerType==='touch');
 if(drag&&e.pointerId===drag.id){const dy=e.clientY-drag.y,dx=e.clientX-drag.x;
  if(!drag.claimed&&Math.abs(dy)>8&&Math.abs(dy)>Math.abs(dx)*1.1){drag.claimed=true;hub.setPointerCapture(e.pointerId);document.body.classList.add('dragging');settled=false;velocity=0;}
  if(drag.claimed){const stride=Math.max(180,l.height+80);position=clamp(drag.start-dy/stride,drag.start-1.24,drag.start+1.24);drag.velocity=(drag.lastY-e.clientY)/stride/(Math.max(1,e.timeStamp-drag.lastTime)/1000);drag.lastY=e.clientY;drag.lastTime=e.timeStamp;suppressClick=performance.now()+350;}
 }wake();
},{passive:true});
function endPointer(e,cancel=false){
 if(!drag||e.pointerId!==drag.id)return;const old=drag;drag=null;pointer.down=false;document.body.classList.remove('dragging');
 // a lifted finger leaves one local impulse that travels and decays; a cancelled gesture or a swipe leaves none
 if(pointer.type!=='mouse'){pointer.power=0;if(!cancel&&!old.claimed)engine?.pulseAt(e.clientX,e.clientY,1,5);engine?.input.leave();}
 if(cancel){engine?.input.cancel();engine?.quench();}
 if(hub.hasPointerCapture(e.pointerId))hub.releasePointerCapture(e.pointerId);
 if(old.claimed){suppressClick=performance.now()+350;select(dragSnap(old.start,position,e.timeStamp-old.lastTime>100?0:old.velocity,cancel));}wake();
}
function cancelPointer(){pointer.power=0;pointer.down=false;engine?.input.cancel();if(drag){target=Math.round(drag.start);settled=false;drag=null;updateActive(target);}document.body.classList.remove('dragging');wake();}
on(window,'pointerup',e=>endPointer(e));on(window,'pointercancel',e=>endPointer(e,true));on(window,'blur',cancelPointer);on(window,'pointerout',e=>{if(!e.relatedTarget){pointer.power=0;engine?.input.leave();wake();}});
// keyboard: a short accent where focus lands; the focus ring stays the DOM's own
on(document,'focusin',e=>{const i=cards.findIndex(c=>c.el===e.target);if(i>=0&&e.target.matches(':focus-visible'))engine?.pulseCard(i);});on(hub,'dragstart',e=>e.preventDefault());
on(window,'keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable]')||e.composedPath().includes(overlay))return;
 if(['ArrowDown','ArrowRight','PageDown'].includes(e.key)){e.preventDefault();select(queuedStep(position,target,1));}
 else if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();select(queuedStep(position,target,-1));}
 else if(e.key==='Home'){e.preventDefault();select(nearest(0,position));}
 else if(e.key==='End'){e.preventDefault();select(nearest(4,position));}
 else if(e.key==='Escape')cancelPointer();
});
on(window,'resize',scheduleFit);if(visualViewport)on(visualViewport,'resize',scheduleFit);
on(document,'visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastTime=0;}else{lastTime=0;wake();}});
on(window,'pageshow',()=>{lastTime=0;wake();});
on(window,'pagehide',e=>{cancelAnimationFrame(raf);raf=0;if(!e.persisted){disposed=true;controller.abort();cancelAnimationFrame(layoutFrame);engine?.dispose();}});
on(reduced,'change',()=>{lastTime=0;wake();});
// Any loss of the context returns the navigation to its DOM rendering at once.
on(canvas,'webglcontextlost',e=>{e.preventDefault();if(engine)engine.lost=true;overlay?.removeAttribute('blur');document.documentElement.classList.remove('vfx-live','vfx-boot');document.body.dataset.renderer='context-lost';});
on(canvas,'webglcontextrestored',()=>{if(!engine)return;engine.restore();overlay?.setAttribute('blur','off');if(engine.live)document.documentElement.classList.add('vfx-live');document.body.dataset.renderer='webgl';fit();});
const VIEWPORT='memento:hub-viewport',HOSTS=['https://mementostudio.it','https://www.mementostudio.it'];
on(window,'message',event=>{const d=event.data;if(event.source!==window.parent||!HOSTS.includes(event.origin)||!d||d.channel!==VIEWPORT||d.version!==1||d.type!=='VIEWPORT'||!Number.isFinite(d.height)||d.height<160||d.height>10000)return;hostHeight=d.height;scheduleFit();});
if(window.parent!==window)for(const origin of HOSTS)window.parent.postMessage({channel:VIEWPORT,version:1,type:'REQUEST'},origin);
route=installRouteSync({storage,signal:controller.signal,readSection:()=>PAGES[active].slug,applySection:(slug,{initial})=>{const i=PAGES.findIndex(p=>p.slug===slug);if(i<0)return;if(initial){position=target=i;velocity=0;settled=true;updateActive(i,false);wake();}else select(nearest(i,position),false);}});

function setupLab(){
 const button=document.createElement('button');button.className='lab-toggle';button.textContent='Regia';button.setAttribute('aria-expanded','false');
 const panel=document.createElement('aside');panel.className='lab';panel.hidden=true;panel.innerHTML='<h3>MEMENTO VFX DNA</h3>';
 const options=[['reach','Raggio del puntatore',120,400,10],['bloom','Bloom selettivo',0,2,.05],['streak','Striatura anamorfica',0,2,.05],['parallax','Profondità immagini',0,2,.05],['edge','Luce del bordo',0,2,.05],['lights','Sorgenti delle scene',0,2,.05],['shards','Schegge',0,1,1],['grain','Grana',0,2,.05]];
 for(const [key,label,min,max,step] of options){const el=document.createElement('label');el.innerHTML=`${label}<output>${settings[key]}</output><input aria-label="${label}" type="range" min="${min}" max="${max}" step="${step}" value="${settings[key]}">`;on(el.querySelector('input'),'input',e=>{settings[key]=+e.target.value;el.querySelector('output').textContent=settings[key];wake();});panel.append(el);}
 const reset=document.createElement('button');reset.textContent='Ripristina';on(reset,'click',()=>{Object.assign(settings,DEFAULTS);panel.querySelectorAll('input').forEach((el,i)=>{el.value=settings[options[i][0]];el.previousElementSibling.textContent=el.value;});wake();});panel.append(reset);const qa=document.createElement('output');qa.className='qa';panel.append(qa);
 on(button,'click',()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));});document.body.append(button,panel);
}
fit();updateActive(active,false);if(labMode)setupLab();
document.fonts.ready.then(()=>{titleMetrics.clear();scheduleFit();});
const navigationURL=new URL(`${import.meta.env.BASE_URL}navigation/navbar.mjs`,document.baseURI).href;
import(/* @vite-ignore */ navigationURL).then(({mountNav})=>{
 overlay=mountNav({active:PAGES[active].id});overlay.setAttribute('target','_top');
 if(engine&&!engine.lost)overlay.setAttribute('blur','off');
 on(overlay,'click',e=>{const link=e.composedPath().find(n=>n?.tagName==='A');if(link){const p=PAGES.find(p=>p.url===link.href);if(p){route.markInteracted();route.notify(p.slug);}}},{capture:true});scheduleFit();
}).catch(error=>console.warn('Overlay unavailable',error.message));
wake();
// ?qa=1: deterministic stepping for visual checks on slow (software) renderers. Not active in normal use.
if(params.has('qa'))window.__nav={
 pause(){qaPaused=true;cancelAnimationFrame(raf);raf=0;},
 resume(){qaPaused=false;lastTime=0;wake();},
 advance(seconds,fps=60){const dt=1/fps;for(let t=0;t<seconds-1e-6;t+=dt)stepWorld(dt);engine?.render();return engine?.stats();},
 select(i){select(nearest(i,position));},
 pointer(x,y,type='mouse'){pointer.x=x;pointer.y=y;pointer.type=type;pointer.power=1;engine?.input.move(x,y,type==='touch');},
 leave(){pointer.power=0;engine?.input.leave();},
 get engine(){return engine;}
};
