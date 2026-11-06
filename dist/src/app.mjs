import {PAGES} from './config.mjs';
import {clamp,smooth,wrap,relative,nearest,layout,pose,unproject,dragSnap} from './model.mjs';
import {Field} from './field.mjs';
import {CardFX} from './card-fx.mjs';
import {iconSVG} from '../assets/icons.mjs';
import {wordmarkMarkup} from '../assets/wordmark.mjs';
const $=id=>document.getElementById(id),scene=$('scene'),hub=$('hub'),dock=$('dock'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
$('wordmark').innerHTML=wordmarkMarkup();
const fromHash=()=>Math.max(0,PAGES.findIndex(p=>p.slug===location.hash.slice(1).toLowerCase()));
let active=fromHash(),position=active,target=active,velocity=0,drag=null,lastT=0,raf=0,l,started=false,appearing=true,startAt=0,leaving=false,leaveAt=0,exitURL='',suppressUntil=0,sceneDirty=true;
const qa=new URLSearchParams(location.search).has('qa');let qaFrames=0,qaSince=0,qaCost=0;
let pointer={x:-999,y:-999,power:0,type:'mouse',down:false},touchPulse=null,lastFx=0,lastField=0,settled=true,wheel={time:0,delta:0,used:false,sign:0,magnitude:0};
const field=new Field($('field')),cards=[],buttons=[];
const SVG='http://www.w3.org/2000/svg';
for(let i=0;i<PAGES.length;i++){
 const p=PAGES[i],card=document.createElement('a');card.className='card';card.href=p.url;card.target='_top';card.draggable=false;card.dataset.page=p.slug;card.setAttribute('aria-label',`Apri ${p.label}`);card.style.setProperty('--focal',p.focal+'%');
 card.innerHTML=`<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><clipPath id="reveal-${i}" clipPathUnits="objectBoundingBox"></clipPath></defs></svg><div class="card-reveal"><div class="card-surface"><img class="image-fallback" src="./assets/scenes/${p.slug}-96.webp" alt="" aria-hidden="true" draggable="false"><picture><source type="image/webp" srcset="./assets/scenes/${p.slug}-480.webp 480w, ./assets/scenes/${p.slug}-960.webp 960w, ./assets/scenes/${p.slug}-1254.webp 1254w" sizes="60vw"><img class="card-image" src="./assets/scenes/${p.slug}.jpg" width="1254" height="1254" alt="${p.alt}" decoding="async" loading="eager" fetchpriority="${i===active?'high':'low'}" draggable="false"></picture><img class="image-blur" alt="" aria-hidden="true" draggable="false"><div class="image-softness"></div><h2 class="title" aria-hidden="true">${[...p.title].map(char=>`<span>${char}</span>`).join('')}</h2><canvas class="card-fx" aria-hidden="true"></canvas><div class="card-shade"></div></div></div><canvas class="card-edge" aria-hidden="true"></canvas>`;
 scene.append(card);const fx=new CardFX(card,i);cards.push({el:card,fx,shade:card.querySelector('.card-shade'),image:card.querySelector('.card-image'),ready:false,pose:null});
 const button=document.createElement('button');button.className='dock-button';button.type='button';button.dataset.label=p.title;button.setAttribute('aria-label',`Mostra ${p.label}`);button.setAttribute('aria-controls','scene');button.innerHTML=iconSVG(p.id);dock.append(button);buttons.push(button);button.addEventListener('click',()=>select(nearest(i,target)));
 card.addEventListener('click',event=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 event.preventDefault();if(leaving||performance.now()<suppressUntil||drag?.claimed)return;
 if(i!==active||Math.abs(position-target)>.04){select(nearest(i,position));return;}
 leave(p.url);
 });
 card.addEventListener('focus',()=>{card.classList.add('focused');sceneDirty=true;wake()});card.addEventListener('blur',()=>{card.classList.remove('focused');sceneDirty=true;wake()});
}
function fit(){
 l=layout(hub.clientWidth,hub.clientHeight);document.documentElement.style.setProperty('--card-w',`${l.width}px`);document.documentElement.style.setProperty('--card-h',`${l.height}px`);document.documentElement.style.setProperty('--cut',`${l.cut}px`);scene.style.height=l.h+'px';scene.style.perspective=l.perspective+'px';
 for(const card of cards){const title=card.el.querySelector('.title'),available=l.width-(l.small?24:l.width*.08);const n=title.children.length;const maxSize=l.width*(l.ratio===2?.071:.122);const ctx=card.fx.ctx;ctx.font='300 100px Inter';const glyph=[...title.children].reduce((s,v)=>s+ctx.measureText(v.textContent).width,0)/100;
 const font=Math.min(maxSize,available/(glyph+(n-1)*.24));title.style.setProperty('--title-size',font+'px');card.fx.resize(l);}
 field.resize(l);sceneDirty=true;drawScene();wake();
}
function updateActive(next,history=true){
 const old=active;active=wrap(next);const movedFocus=old!==active&&document.activeElement===cards[old].el;
 for(let i=0;i<5;i++){buttons[i].setAttribute('aria-current',String(i===active));cards[i].el.tabIndex=i===active?0:-1;if(i===active)cards[i].el.setAttribute('aria-current','page');else cards[i].el.removeAttribute('aria-current');}
 if(movedFocus)cards[active].el.focus({preventScroll:true});
 $('status').textContent=`${PAGES[active].label}. Sezione ${active+1} di 5. Attiva per aprire.`;document.title=`${PAGES[active].label} — Memento`;
 if(history&&old!==active)window.history.replaceState(null,'','#'+PAGES[active].slug);
}
function select(next){if(leaving)return;document.body.classList.add('explored');target=next;settled=false;sceneDirty=true;wake();}
function drawScene(){for(let i=0;i<5;i++){const card=cards[i],d=relative(i,position),p=pose(d,l,reduced.matches);card.pose=p;card.el.hidden=!p.visible;card.el.setAttribute('aria-hidden',String(Math.abs(d)>1.3));if(!p.visible)continue;
 card.el.style.transform=`translate3d(0,${p.y}px,${p.z}px) rotateX(${p.angle*180/Math.PI}deg)`;card.shade.style.opacity=p.dark;card.el.dataset.slot=Math.abs(d)<.02?'active':d<0?'previous':'next';}
}
function localPointer(card,now){const pt=unproject(pointer.x,pointer.y,card.pose,l);let power=pointer.type==='mouse'?pointer.power:0;
 if(touchPulse){const age=(now-touchPulse.time)/1000;const pulseLocal=unproject(touchPulse.x,touchPulse.y,card.pose,l);pt.x=pulseLocal.x+Math.sin(age*3)*l.width*.08;pt.y=pulseLocal.y-age*l.height*.09;power=clamp(1-age/1.05)*.9;}
 if(card.el.classList.contains('focused')&&!power){pt.x=l.width*.75;pt.y=l.height*.87;power=.58;}
 return {...pt,power};}
function frame(now){const cpuStart=performance.now();raf=0;if(document.hidden)return;const dt=Math.min((now-lastT)/1000||.016,1);lastT=now;let moving=false;
 if(!drag?.claimed&&!settled){if(reduced.matches){position=target;velocity=0;}else{const omega=14,delta=position-target,step=(velocity+omega*delta)*dt,decay=Math.exp(-omega*dt);position=target+(delta+step)*decay;velocity=(velocity-omega*step)*decay;}
 if(Math.abs(target-position)<.0008&&Math.abs(velocity)<.008){position=target;velocity=0;settled=true;updateActive(Math.round(target));}sceneDirty=true;moving=true;}
 if(appearing&&started){const dur=reduced.matches?120:l.small?640:850,progress=clamp((now-startAt)/dur);for(const card of cards)card.fx.reveal(progress);if(progress===1)appearing=false;sceneDirty=true;}
 if(leaving){const progress=clamp((now-leaveAt)/(reduced.matches?100:380));for(const card of cards)card.fx.reveal(1-progress);sceneDirty=true;if(progress===1){navigateAway();return;}}
 if(sceneDirty){drawScene();sceneDirty=false;}
 if(touchPulse&&now-touchPulse.time>1100)touchPulse=null;
 if(now-lastField>(l.small?31:15)||reduced.matches){field.pointer={x:pointer.x,y:pointer.y,strength:pointer.type==='mouse'?pointer.power:0};field.draw(now,reduced.matches);lastField=now;}
 if(now-lastFx>(l.small?31:15)||reduced.matches){for(let i=0;i<5;i++){const c=cards[i];if(c.el.hidden)continue;c.fx.draw(now,localPointer(c,now),c.pose.dark,reduced.matches);}lastFx=now;}
 if(qa){qaFrames++;qaCost+=performance.now()-cpuStart;if(!qaSince)qaSince=now;if(now-qaSince>1200){hub.dataset.qa=JSON.stringify({fps:+(qaFrames*1000/(now-qaSince)).toFixed(1),frameCPU:+(qaCost/qaFrames).toFixed(2),active:PAGES[active].slug,position:+position.toFixed(4),images:cards.filter(c=>c.ready).length,width:l.width,height:l.height,ratio:l.ratio,motion:reduced.matches?'reduced':'full'});qaFrames=0;qaCost=0;qaSince=now;}}
 if(!reduced.matches||!settled||appearing||leaving||touchPulse||drag?.claimed)wake();
}
function wake(){if(!raf&&!document.hidden)raf=requestAnimationFrame(frame)}
function leave(url){leaving=true;leaveAt=performance.now();exitURL=url;document.body.classList.add('leaving');wake();}
function navigateAway(){try{window.top.location.href=exitURL;}catch{window.location.href=exitURL;}setTimeout(recover,1200);}
function recover(){if(!leaving)return;leaving=false;appearing=false;for(const c of cards)c.fx.reveal(1);document.body.classList.remove('leaving');sceneDirty=true;wake();}
$('previous').addEventListener('click',()=>select(Math.round(target)-1));$('next').addEventListener('click',()=>select(Math.round(target)+1));
hub.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();const now=performance.now(),delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?l.h:1),sign=Math.sign(delta);if(!sign)return;
 if(now-wheel.time>170||sign!==wheel.sign){wheel.delta=0;wheel.used=false;}wheel.time=now;wheel.sign=sign;wheel.delta+=delta;if(!wheel.used&&Math.abs(wheel.delta)>24){wheel.used=true;select(Math.round(target)+sign);}
},{passive:false});
hub.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0||e.target.closest('button')||leaving)return;pointer={x:e.clientX,y:e.clientY,power:e.pointerType==='mouse'?1:0,type:e.pointerType,down:true};
 drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:position,lastY:e.clientY,lastTime:e.timeStamp,velocity:0,claimed:false};
 if(e.pointerType!=='mouse'){touchPulse={x:e.clientX,y:e.clientY,time:performance.now()};field.touch(e.clientX,e.clientY,performance.now());}wake();
});
window.addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;pointer.type=e.pointerType;pointer.power=e.pointerType==='mouse'?1:0;
 if(drag&&e.pointerId===drag.id){const dy=e.clientY-drag.y,dx=e.clientX-drag.x;
 if(!drag.claimed&&Math.abs(dy)>7&&Math.abs(dy)>Math.abs(dx)*1.1){drag.claimed=true;hub.setPointerCapture(e.pointerId);document.body.classList.add('dragging');document.body.classList.add('explored');settled=false;velocity=0;}
 if(drag.claimed){const stride=Math.max(180,l.height+80),next=drag.start-dy/stride;position=clamp(next,drag.start-1.24,drag.start+1.24);const dt=Math.max(1,e.timeStamp-drag.lastTime);drag.velocity=(drag.lastY-e.clientY)/stride/(dt/1000);drag.lastY=e.clientY;drag.lastTime=e.timeStamp;sceneDirty=true;suppressUntil=performance.now()+350;}
 }wake();},{passive:true});
function endPointer(e,cancel=false){if(!drag||drag.id!==e.pointerId)return;const d=drag;drag=null;pointer.down=false;document.body.classList.remove('dragging');if(hub.hasPointerCapture(e.pointerId))hub.releasePointerCapture(e.pointerId);
 if(d.claimed){suppressUntil=performance.now()+350;const speed=e.timeStamp-d.lastTime>100?0:d.velocity;select(dragSnap(d.start,position,speed,cancel));}
 if(pointer.type!=='mouse')pointer.power=0;wake();}
window.addEventListener('pointerup',e=>endPointer(e));window.addEventListener('pointercancel',e=>endPointer(e,true));
window.addEventListener('pointerout',e=>{if(!e.relatedTarget){pointer.power=0;sceneDirty=true;wake();}});
hub.addEventListener('dragstart',e=>e.preventDefault());
window.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select,[contenteditable]'))return;const b=buttons.indexOf(e.target);
 if(b>=0&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const idx=e.key==='Home'?0:e.key==='End'?4:wrap(b+(e.key==='ArrowRight'?1:-1));buttons[idx].focus();return;}
 if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();select(Math.round(target)+1);}else if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();select(Math.round(target)-1);}else if(e.key==='Home'&&b<0){e.preventDefault();select(nearest(0,position));}else if(e.key==='End'&&b<0){e.preventDefault();select(nearest(4,position));}else if(e.key==='Escape'&&drag){target=Math.round(drag.start);drag=null;document.body.classList.remove('dragging');settled=false;wake();}
});
dock.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){field.touch(e.clientX,e.clientY,performance.now());wake();}});
window.addEventListener('hashchange',()=>select(nearest(fromHash(),position)));
window.addEventListener('resize',fit);window.visualViewport?.addEventListener('resize',fit);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastT=0;}else{recover();sceneDirty=true;wake();}});
window.addEventListener('pageshow',recover);window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);raf=0;});reduced.addEventListener('change',()=>{sceneDirty=true;wake();});
async function decodeImage(card){const img=card.image;let attempts=0;
 async function attempt(){try{await img.decode();card.ready=true;img.classList.add('decoded');const blur=card.el.querySelector('.image-blur');blur.src=img.currentSrc;blur.decode().then(()=>blur.classList.add('decoded')).catch(()=>{});sceneDirty=true;wake();return true;}catch{if(attempts++===0){img.parentElement.querySelector('source')?.remove();img.src=`./assets/scenes/${PAGES[cards.indexOf(card)].slug}.jpg`;return attempt();}img.dataset.loadError='true';return false;}}
 return attempt();
}
fit();updateActive(active,false);for(const card of cards)card.fx.reveal(0);
const loads=cards.map(decodeImage);
const initial=[loads[active],loads[wrap(active-1)],loads[wrap(active+1)],document.fonts.ready];
Promise.race([Promise.allSettled(initial),new Promise(r=>setTimeout(r,2200))]).then(()=>{fit();started=true;startAt=performance.now();wake();});
document.fonts.ready.then(()=>{for(const c of cards)c.fx.refreshType();sceneDirty=true;wake();});
wake();
