import {initialSection,installRouteSync} from './route-state.mjs';
import {PAGES} from './config.mjs';
import {clamp,wrap,relative,nearest,layout,viewportHeight,pose,unproject,dragSnap,slideStep,wheelStep,queuedStep} from './model.mjs';
import {Field} from './field.mjs';
import {CardFX} from './card-fx.mjs';
import {ChevronFX} from './chevron-fx.mjs';
import {VFX} from './vfx-config.mjs';
import {mountNav} from '../navigation/navbar.mjs?v=12.0.0';
const $=id=>document.getElementById(id),scene=$('scene'),hub=$('hub'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const controller=new AbortController(),on=(target,name,fn,options={})=>target.addEventListener(name,fn,{...options,signal:controller.signal});
const overlay=mountNav({active:'memento'});overlay.setAttribute('target','_top');
const VIEWPORT_CHANNEL='memento:hub-viewport',HOST_ORIGINS=['https://mementostudio.it','https://www.mementostudio.it'];let hostViewportHeight;
let routeSync,routeStorage;try{routeStorage=sessionStorage;}catch{}
const fromHash=()=>PAGES.findIndex(p=>p.slug===initialSection({hash:location.hash,storage:routeStorage,referrer:document.referrer}));
let active=fromHash(),position=active,target=active,velocity=0,drag=null,lastT=0,raf=0,l,started=false,appearing=true,startAt=0,suppressUntil=0,sceneDirty=true,disposed=false,layoutRaf=0,resizeTimer=0,resizePending=false,fxReady=false,fxKey='',warmHandle=0,warmIdle=false,fontRevision=0,lastCommitMs=0,setupMs=0;
const qa=new URLSearchParams(location.search).has('qa');const motionReduced=()=>reduced.matches||(qa&&new URLSearchParams(location.search).get('motion')==='reduce');let qaFrames=0,qaSince=0,qaCost=0,qaMax=0,debugProgress=null;
let pointer={x:-999,y:-999,power:0,type:'mouse',down:false,id:null},settled=true,wheel={time:0,delta:0,used:false,sign:0,stepTime:-Infinity};
const titleMetrics=new Map();let layoutSignature='',resizeStartedAt=0;
const field=new Field($('field')),cards=[],chevronFX=new ChevronFX(document.querySelectorAll('.chevron'));
for(let i=0;i<PAGES.length;i++){
 const p=PAGES[i],card=document.createElement('a');card.className='card';card.href=p.url;card.target='_top';card.draggable=false;card.dataset.page=p.slug;card.setAttribute('aria-label',`Apri ${p.label}`);card.style.setProperty('--focal',p.focal+'%');
 card.innerHTML=`<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><mask id="reveal-${i}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" style="mask-type:alpha"></mask></defs></svg><div class="card-reveal"><div class="card-surface"><img class="image-fallback" src="./assets/scenes/${p.slug}-96.webp?v=r10" srcset="./assets/scenes/${p.slug}-480.webp?v=r10 480w, ./assets/scenes/${p.slug}-960.webp?v=r10 960w, ./assets/scenes/${p.slug}-1254.webp?v=r10 1254w" sizes="(max-width:600px) 84vw, 88vw" decoding="async" loading="${Math.abs(relative(i,active))<=1?'eager':'lazy'}" alt="" aria-hidden="true" draggable="false"><picture><source type="image/webp" srcset="./assets/scenes/${p.slug}-480.webp?v=r10 480w, ./assets/scenes/${p.slug}-960.webp?v=r10 960w, ./assets/scenes/${p.slug}-1254.webp?v=r10 1254w" sizes="(max-width:600px) 84vw, 88vw"><img class="card-image" src="./assets/scenes/${p.slug}.jpg?v=r10" width="1254" height="1254" alt="${p.alt}" decoding="async" loading="${Math.abs(relative(i,active))<=1?'eager':'lazy'}" fetchpriority="${i===active?'high':'low'}" draggable="false"></picture><div class="image-softness"></div><h2 class="title" aria-hidden="true">${[...p.title].map(char=>`<span>${char}</span>`).join('')}</h2><div class="card-shade"></div></div></div><canvas class="card-fx" aria-hidden="true"></canvas><canvas class="card-edge" aria-hidden="true"></canvas>`;
 scene.append(card);const fx=new CardFX(card,i,field);cards.push({el:card,fx,shade:card.querySelector('.card-shade'),image:card.querySelector('.card-image'),ready:false,loading:false,pose:null,fxKey:null,typeRevision:0});
 on(card,'click',event=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();if(performance.now()<suppressUntil||drag?.claimed)return;if(i!==active||Math.abs(position-target)>.04){select(nearest(i,position));return;}navigateAway(p.url);});
 on(card,'focus',()=>{card.classList.toggle('focused',card.matches(':focus-visible'));sceneDirty=true;wake()});on(card,'blur',()=>{card.classList.remove('focused');sceneDirty=true;wake()});
}
function measureTitles(){
 for(const card of cards){
  const title=card.el.querySelector('.title'),available=l.width-2*l.padding,n=title.children.length;
  let glyph=titleMetrics.get(title.textContent);
  if(glyph===undefined){const ctx=card.fx.ctx;ctx.font='300 100px Inter';glyph=[...title.children].reduce((sum,v)=>sum+ctx.measureText(v.textContent).width,0)/100;titleMetrics.set(title.textContent,glyph);}
  title.style.setProperty('--title-size',Math.min(l.height*.27,available/(glyph+(n-1)*.23))+'px');
  const sizes=Math.ceil(l.width/64)*64+'px';for(const image of card.el.querySelectorAll('[sizes]'))if(image.sizes!==sizes)image.sizes=sizes;
 }
}
function stopWarmup(){if(!warmHandle)return;if(warmIdle)cancelIdleCallback(warmHandle);else clearTimeout(warmHandle);warmHandle=0;}
function ensureFX(card){
 if(card.fxKey===fxKey)return;
 const wasReady=card.fxKey!==null,hidden=card.el.hidden,visibility=card.el.style.visibility;
 // Idle preparation still needs real glyph metrics. Make a distant card
 // measurable for this task without allowing it into a painted frame.
 if(hidden){card.el.style.visibility='hidden';card.el.hidden=false;}
 try{card.fx.resize(l);if(wasReady&&card.typeRevision!==fontRevision)card.fx.refreshType(true);}
 finally{if(hidden){card.el.hidden=true;card.el.style.visibility=visibility;}}
 card.typeRevision=fontRevision;card.fxKey=fxKey;
}
function warmup(urgent=false){
 if(warmHandle){if(!urgent||!warmIdle)return;stopWarmup();}
 if(resizePending||!started||disposed||!cards.some(c=>c.fxKey!==fxKey))return;
 const run=()=>{warmHandle=0;if(resizePending||disposed)return;const card=cards.find(c=>c.pose?.visible&&c.fxKey!==fxKey)||cards.find(c=>c.fxKey!==fxKey);if(!card)return;ensureFX(card);decodeImage(card);sceneDirty=true;wake();warmup();};
 warmIdle=!urgent&&typeof requestIdleCallback==='function';warmHandle=warmIdle?requestIdleCallback(run,{timeout:600}):setTimeout(run,urgent?0:40);
}
function commitFit(){
 resizeTimer=0;if(disposed||!l)return;
 const begin=performance.now();field.resize(l);
 fxKey=[l.width.toFixed(2),l.height.toFixed(2),l.w,l.h,l.cut.toFixed(2),devicePixelRatio||1,fontRevision].join(':');
 // The hero and its two neighbors are sufficient for the first painted frame.
 for(const card of [...cards].sort((a,b)=>Math.abs(relative(cards.indexOf(a),position))-Math.abs(relative(cards.indexOf(b),position))))if(card.pose?.visible)ensureFX(card);
 fxReady=true;resizePending=false;document.body.classList.remove('resizing');
 if(started&&appearing&&resizeStartedAt)startAt+=performance.now()-resizeStartedAt;
 resizeStartedAt=0;lastCommitMs=performance.now()-begin;setupMs+=lastCommitMs;sceneDirty=true;wake();warmup();
}
function fit({immediate=false}={}){
 if(disposed)return;
 const width=document.documentElement.clientWidth||hub.clientWidth,vv=window.visualViewport,height=viewportHeight(document.documentElement.clientHeight||hub.clientHeight,vv?.height,vv?.scale,hostViewportHeight);
 document.documentElement.style.setProperty('--nav-viewport-height',height+'px');
 if(width<1||height<1)return;
 const next=layout(width,height,{logoBottom:overlay.shadowRoot?.querySelector('.mm-wordmark')?.getBoundingClientRect().bottom,dockTop:overlay.shadowRoot?.querySelector('.mm-dock')?.getBoundingClientRect().top});
 const signature=[width,height,next.width.toFixed(2),next.height.toFixed(2),next.logoBottom,next.dockTop,devicePixelRatio||1,fontRevision].join(':');
 if(signature===layoutSignature&&fxReady&&!resizePending)return;
 layoutSignature=signature;l=next;
 const root=document.documentElement.style;
 for(const [key,value]of Object.entries({'card-w':l.width,'card-h':l.height,cut:l.cut,padding:l.padding,'arrow-size':Math.max(34,Math.min(62,l.width*.064)),'arrow-offset':Math.max(34,Math.min(62,(l.h-l.height)*.18)),'previous-y':l.previousY,'next-y':l.nextY,'arrow-height':l.arrowHeight}))root.setProperty('--'+key,value+'px');
 scene.style.height=l.h+'px';scene.style.perspective=l.perspective+'px';measureTitles();
 if(!resizePending)resizeStartedAt=performance.now();resizePending=true;document.body.classList.add('resizing');stopWarmup();clearTimeout(resizeTimer);
 sceneDirty=true;drawScene();wake();
 if(immediate)commitFit();else if(started)resizeTimer=setTimeout(commitFit,120);
}
function requestFit(){if(!layoutRaf&&!disposed)layoutRaf=requestAnimationFrame(()=>{layoutRaf=0;fit();});}
function updateActive(next,history=true){const old=active;active=wrap(next);const movedFocus=old!==active&&document.activeElement===cards[old].el;for(let i=0;i<5;i++){cards[i].el.tabIndex=i===active?0:-1;if(i===active)cards[i].el.setAttribute('aria-current','page');else cards[i].el.removeAttribute('aria-current');}overlay.setActive(PAGES[active].id);if(movedFocus)cards[active].el.focus({preventScroll:true});$('status').textContent=`${PAGES[active].label}. Sezione ${active+1} di 5. Attiva per aprire.`;document.title=`${PAGES[active].label} — Memento`;if(history&&old!==active)window.history.replaceState(null,'','#'+PAGES[active].slug);routeSync?.notify(PAGES[active].slug);}
function select(next,user=true){if(next===target&&settled)return;if(user)routeSync?.markInteracted();document.body.classList.add('explored');target=next;updateActive(Math.round(target));settled=false;sceneDirty=true;wake();}
function drawScene(){for(let i=0;i<5;i++){const card=cards[i],d=relative(i,position),p=pose(d,l,motionReduced());card.pose=p;card.el.hidden=!p.visible;card.el.setAttribute('aria-hidden',String(Math.abs(d)>1.3));if(!p.visible)continue;if(started&&!card.ready&&!card.loading)decodeImage(card);card.el.style.transform=`translate3d(0,${p.y}px,${p.z}px) rotateX(${p.angle*180/Math.PI}deg)`;card.shade.style.opacity=p.secondary;card.el.style.setProperty('--secondary',String(p.secondary));card.el.dataset.slot=Math.abs(d)<.02?'active':d<0?'previous':'next';}}
function frame(now){const cpuStart=performance.now();raf=0;if(document.hidden||disposed)return;const dt=Math.min((now-lastT)/1000||.016,1);lastT=now;
 if(!drag?.claimed&&!settled){({position,velocity,settled}=slideStep(position,velocity,target,dt,motionReduced()));sceneDirty=true;}
 if(!fxReady||resizePending){if(sceneDirty){drawScene();sceneDirty=false;}if(started&&(!settled||resizePending))wake();return;}
 if(appearing&&started){const progress=motionReduced()?1:clamp((now-startAt)/(l.small?VFX.mobileIntro:VFX.intro));for(const card of cards)card.fx.reveal(progress);if(progress===1)appearing=false;}

 if(debugProgress!==null)for(const c of cards)c.fx.reveal(debugProgress);
 if(sceneDirty){drawScene();sceneDirty=false;}
 field.pointer={x:pointer.x,y:pointer.y,strength:pointer.power};field.begin(now,motionReduced());field.transitionBudget=settled&&!appearing?0:1;field.draw(now,motionReduced());
 for(const card of cards){if(card.el.hidden)continue;if(card.fxKey!==fxKey){warmup(true);continue;}card.fx.draw(now,unproject(pointer.x,pointer.y,card.pose,l),card.pose,motionReduced());}chevronFX.draw(now,field,l,motionReduced());field.finish();
 if(qa){const cpu=performance.now()-cpuStart;qaFrames++;qaCost+=cpu;qaMax=Math.max(qaMax,cpu);if(!qaSince)qaSince=now;if(now-qaSince>1200){hub.dataset.qa=JSON.stringify({fps:+(qaFrames*1000/(now-qaSince)).toFixed(1),frameCPU:+(qaCost/qaFrames).toFixed(2),maxCPU:+qaMax.toFixed(2),active:PAGES[active].slug,position:+position.toFixed(4),images:cards.filter(c=>c.ready).length,width:l.width,height:l.height,ratio:l.ratio,motion:motionReduced()?'reduced':'full',particles:field.pool.count,pulses:field.pulses.length,navs:document.querySelectorAll('memento-nav').length,masked:cards.filter(c=>c.fxKey===fxKey&&!c.fx.complete).map(c=>c.el.dataset.page),initialized:cards.filter(c=>c.fxKey===fxKey).length,lastCommitMs:+lastCommitMs.toFixed(2),setupMs:+setupMs.toFixed(2),resizePending});qaFrames=0;qaCost=0;qaMax=0;qaSince=now;}}
 if(!motionReduced()||!settled||appearing||field.current.strength>.003||pointer.power||drag?.claimed)wake();
}
function wake(){if(!raf&&!document.hidden&&!disposed)raf=requestAnimationFrame(frame)}
function navigateAway(url){try{window.top.location.href=url;}catch{window.location.href=url;}}
function recover(){lastT=0;sceneDirty=true;wake();}
on($('previous'),'click',()=>select(queuedStep(position,target,-1)));on($('next'),'click',()=>select(queuedStep(position,target,1)));
on(hub,'wheel',e=>{if(e.ctrlKey||e.metaKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();const now=performance.now(),delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?l.h:1),step=wheelStep(wheel,delta,now);if(step)select(queuedStep(position,target,step));},{passive:false});
on(hub,'pointerdown',e=>{routeSync?.markInteracted();if(!e.isPrimary){cancelContact();return;}if(e.button!==0||e.target.closest('button'))return;pointer={x:e.clientX,y:e.clientY,power:1,type:e.pointerType,down:true,id:e.pointerId};drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:position,lastY:e.clientY,lastTime:e.timeStamp,velocity:0,claimed:false};wake();});
on(window,'pointermove',e=>{if(!e.isPrimary)return;pointer.x=e.clientX;pointer.y=e.clientY;pointer.type=e.pointerType;pointer.power=e.pointerType==='mouse'||pointer.down?1:0;
 if(drag&&e.pointerId===drag.id){const dy=e.clientY-drag.y,dx=e.clientX-drag.x;if(!drag.claimed&&Math.abs(dy)>7&&Math.abs(dy)>Math.abs(dx)*1.1){drag.claimed=true;hub.setPointerCapture(e.pointerId);document.body.classList.add('dragging','explored');settled=false;velocity=0;}if(drag.claimed){const stride=Math.max(180,l.height+80);position=clamp(drag.start-dy/stride,drag.start-1.24,drag.start+1.24);const dt=Math.max(1,e.timeStamp-drag.lastTime);drag.velocity=(drag.lastY-e.clientY)/stride/(dt/1000);drag.lastY=e.clientY;drag.lastTime=e.timeStamp;const current=wrap(Math.round(position));if(current!==active)updateActive(current);sceneDirty=true;suppressUntil=performance.now()+350;}}
 wake();},{passive:true});
function endPointer(e,cancel=false){if(!drag||drag.id!==e.pointerId)return;const d=drag;drag=null;pointer.down=false;document.body.classList.remove('dragging');if(hub.hasPointerCapture(e.pointerId))hub.releasePointerCapture(e.pointerId);if(d.claimed){suppressUntil=performance.now()+350;const speed=e.timeStamp-d.lastTime>100?0:d.velocity;select(dragSnap(d.start,position,speed,cancel));}if(pointer.type!=='mouse'){pointer.power=0;if(fxReady&&!resizePending&&!cancel&&!motionReduced()){const now=performance.now();field.touch(pointer.x,pointer.y,now);for(const c of cards)if(!c.el.hidden&&c.fxKey===fxKey)c.fx.touch(unproject(pointer.x,pointer.y,c.pose,l),now);}}wake();}
function cancelContact(){for(const c of cards)c.fx.cancel();if(drag){if(hub.hasPointerCapture(drag.id))hub.releasePointerCapture(drag.id);target=Math.round(drag.start);updateActive(target);drag=null;settled=false;}pointer.down=false;pointer.power=0;document.body.classList.remove('dragging');field.cancel();wake();}
on(window,'pointerup',e=>endPointer(e));on(window,'pointercancel',e=>endPointer(e,true));on(window,'blur',cancelContact);on(window,'pointerout',e=>{if(!e.relatedTarget){pointer.power=0;wake();}});on(hub,'dragstart',e=>e.preventDefault());
on(window,'keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select,[contenteditable]')||e.composedPath().includes(overlay))return;if(e.key==='ArrowDown'||e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();select(queuedStep(position,target,1));}else if(e.key==='ArrowUp'||e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();select(queuedStep(position,target,-1));}else if(e.key==='Home'){e.preventDefault();select(nearest(0,position));}else if(e.key==='End'){e.preventDefault();select(nearest(4,position));}else if(e.key==='Escape')cancelContact();});
on(window,'resize',requestFit);if(window.visualViewport)on(window.visualViewport,'resize',requestFit);
// The cross-origin child cannot see the host browser's toolbar height. The
// optional Framer bridge publishes only its visible iframe height, with strict
// origin and source checks; the standalone visualViewport path works without it.
on(window,'message',event=>{const data=event.data;if(event.source!==window.parent||!HOST_ORIGINS.includes(event.origin)||!data||data.channel!==VIEWPORT_CHANNEL||data.version!==1||data.type!=='VIEWPORT'||!Number.isFinite(data.height)||data.height<160||data.height>10000)return;hostViewportHeight=data.height;requestFit();});
if(window.parent!==window)for(const origin of HOST_ORIGINS)window.parent.postMessage({channel:VIEWPORT_CHANNEL,version:1,type:'REQUEST'},origin);
const resizeObserver=typeof ResizeObserver==='function'?new ResizeObserver(requestFit):null;resizeObserver?.observe(hub);
on(document,'visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastT=0;cancelContact();}else recover();});on(window,'pageshow',recover);on(window,'pagehide',e=>{cancelAnimationFrame(raf);raf=0;if(!e.persisted)dispose();});on(reduced,'change',()=>{if(motionReduced()){appearing=false;for(const c of cards)c.fx.reveal(1);}sceneDirty=true;wake();});
function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(raf);cancelAnimationFrame(layoutRaf);clearTimeout(resizeTimer);stopWarmup();resizeObserver?.disconnect();controller.abort();chevronFX.dispose();field.dispose();for(const c of cards)c.fx.dispose();overlay.remove();}
async function decodeImage(card){if(card.ready||card.loading)return;card.loading=true;const img=card.image;let attempts=0;async function attempt(){try{await img.decode();card.ready=true;img.classList.add('decoded');sceneDirty=true;wake();return true;}catch{if(attempts++===0){img.parentElement.querySelector('source')?.remove();img.src=`./assets/scenes/${PAGES[cards.indexOf(card)].slug}.jpg?v=r10`;return attempt();}img.dataset.loadError='true';return false;}}return attempt();}
routeSync=installRouteSync({storage:routeStorage,signal:controller.signal,readSection:()=>PAGES[active].slug,applySection:(slug,{initial})=>{const i=PAGES.findIndex(p=>p.slug===slug);if(i<0)return;if(initial){position=target=i;velocity=0;settled=true;updateActive(i,false);sceneDirty=true;wake();}else select(nearest(i,position),false);}});
on(overlay,'click',e=>{const link=e.composedPath().find(n=>n?.tagName==='A');if(!link)return;const slug=PAGES.find(p=>p.url===link.href)?.slug;if(slug){routeSync.markInteracted();routeSync.notify(slug);}}, {capture:true});
fit();updateActive(active,false);for(const card of cards)card.fx.reveal(0);
const initial=[decodeImage(cards[active]),document.fonts.ready];
Promise.race([Promise.allSettled(initial),new Promise(r=>setTimeout(r,700))]).then(()=>{if(disposed)return;fit({immediate:true});started=true;startAt=performance.now();document.documentElement.classList.remove('fx-boot');window.__navReady=true;$('fallback').hidden=true;wake();warmup();});
document.fonts.ready.then(()=>{if(disposed)return;titleMetrics.clear();fontRevision++;if(started)requestFit();});
if(qa){const panel=document.createElement('aside');panel.className='qa-controls';panel.innerHTML='<label>Loading <input aria-label="Progresso loading" type="range" min="0" max="100" value="100"></label><button type="button">Ripristina</button><output></output>';document.body.append(panel);on(panel.querySelector('input'),'input',e=>{debugProgress=+e.target.value/100;panel.querySelector('output').textContent=debugProgress;wake();});on(panel.querySelector('button'),'click',()=>{debugProgress=null;for(const c of cards)c.fx.reveal(1);wake();});window.__MEMENTO_QA={state:()=>({...JSON.parse(hub.dataset.qa||'{}'),contact:pointer.down,power:pointer.power,pulsesNow:field.pulses.length,particlesNow:field.pool?.count||0,resizePending,initializedNow:cards.filter(c=>c.fxKey===fxKey).length,lastCommitMs,setupMs,positionNow:position,targetNow:target,velocityNow:velocity,settledNow:settled,surfacePulses:cards.map(c=>c.fx.pulses.length),activeNow:PAGES[active].slug}),mask:()=>cards.map(c=>({id:c.el.dataset.page,values:(c.fx.faces||[]).map(f=>+f.value.toFixed(4))})),dispose};}
wake();
