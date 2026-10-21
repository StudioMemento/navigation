import { WORLDS, icon } from './modules/data.js';
import { NavigationScene } from './modules/scene.js';
import { Atmosphere } from './modules/atmosphere.js';
const $=s=>document.querySelector(s);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const state={world:0,view:'gate',lockedUntil:0};
const frames=new Map();
const scene=new NavigationScene($('#scene'),WORLDS[0]);
const atmosphere=new Atmosphere($('#atmosphere'),WORLDS[0].color);
const current=()=>WORLDS[state.world],wrap=n=>(n+WORLDS.length)%WORLDS.length;
let wheelSum=0,wheelTime=0,gesture,ignoreClickUntil=0,socketTimer;
const announce=message=>$('#announcement').textContent=message;
$('.previous').innerHTML=icon('up');$('.next').innerHTML=icon('down');$('#socket-expand').innerHTML=icon('expand');$('#atmosphere-toggle').innerHTML=icon('tune');
$('#navbar').innerHTML=WORLDS.map(w=>`<button class="nav-button" data-nav="${w.id}" aria-label="${w.label}" title="${w.label}">${icon(w.id)}<span class="nav-label">${w.label}</span></button>`).join('');
const measure=document.createElement('canvas').getContext('2d');
function fitType(){
  measure.font='300 100px Inter';const text=current().title,unit=measure.measureText(text).width-(text.length-1)*5.5;
  const size=Math.min(innerWidth*.925/unit*100,innerHeight*(state.view==='gate'?.34:.26));
  document.body.style.setProperty('--title-size',size+'px');scene.typeKey='';
}
function post(type,extra={}){frames.get(current().id)?.contentWindow?.postMessage({type,...extra},location.origin);}
function route(replace=false,child=''){
  const hash=state.view==='gate'?(state.world?`#home/${current().id}`:'#home'):`#${current().id}${child?'/'+child.replace(/^#/,''):''}`;
  if(location.hash!==hash)history[replace?'replaceState':'pushState'](null,'',hash);
}
function sync(){
  const w=current();document.body.dataset.view=state.view;document.body.dataset.world=w.id;document.body.style.setProperty('--accent',w.color);
  $('#world-title').textContent=w.title;$('#outline-title').textContent=w.title;fitType();
  $('#socket').inert=state.view==='gate';$('#socket').setAttribute('aria-label',w.label);
  $('.world-heading').setAttribute('aria-hidden',String(state.view==='detail'));
  $('#cube-target').setAttribute('aria-label',state.view==='gate'?`Entra in ${state.world?w.label:'Studio'}`:state.view==='hub'?'Torna alla home':`Torna all’inizio di ${w.label}`);
  for(const b of document.querySelectorAll('[data-nav]')){if(b.dataset.nav===w.id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');}
  for(const[sel,d]of[['.previous',-1],['.next',1]]){$(sel).setAttribute('aria-label',`Vai a ${WORLDS[wrap(state.world+d)].label}`);$(sel).tabIndex=state.view==='detail'?-1:0;$(sel).setAttribute('aria-hidden',String(state.view==='detail'));}
  document.title=state.world?`${w.label} — Memento`:'Memento';scene.setView(state.view);atmosphere.setWorld(w);
  post('memento:socket:theme',{accent:w.color,mode:state.view});
  window.dispatchEvent(new CustomEvent('memento:navigate',{detail:{...state,world:w.id}}));
}
function ensureFrame(child=''){
  if(!state.world)return;const w=current();let frame=frames.get(w.id);
  for(const[id,f]of frames){const active=id===w.id;f.classList.toggle('is-active',active);f.inert=!active;if(!active)f.contentWindow?.postMessage({type:'memento:socket:pause'},location.origin);}
  $('#socket-error').hidden=true;$('#socket-source').href=w.source;clearTimeout(socketTimer);
  if(!frame){
    frame=document.createElement('iframe');frame.className='socket-frame is-active';frame.title=`${w.label} — Memento`;frame.dataset.world=w.id;
    frame.src=`./sockets/${w.id}/index.html${child?'#'+child:w.id==='studio'?'#studio':''}`;frame.allow='fullscreen';frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.addEventListener('load',()=>{if(current().id===w.id)post('memento:socket:theme',{accent:w.color,mode:state.view});});
    frames.set(w.id,frame);$('#socket-frames').append(frame);
    // Keep a maximum of three modules alive; revisiting restores their overview.
    for(const[id,old]of frames)if(frames.size>3&&id!==w.id){old.remove();frames.delete(id);}
  }else{frame.classList.add('is-active');frame.inert=false;if(child)post('memento:socket:route',{hash:child});}
  $('.socket-loading').hidden=frame.dataset.ready==='true';
  if(frame.dataset.ready!=='true')socketTimer=setTimeout(()=>{if(current().id===w.id&&state.view!=='gate'){ $('.socket-loading').hidden=true;$('#socket-error').hidden=false;}},15000);
  post('memento:socket:theme',{accent:w.color,mode:state.view});
}
function setView(view,{writeRoute=true,child=''}={}){
  if(!state.world)view='gate';const previous=state.view;
  if(state.view!==view)state.lockedUntil=performance.now()+(reduced?10:850);
  state.view=view;sync();
  if(view!=='gate')ensureFrame(child);else post('memento:socket:pause');
  if(view==='hub'&&previous==='gate'&&!child)post('memento:socket:reset');
  if(writeRoute)route(false,child);announce(view==='gate'?`${current().label}. Premi il diorama per entrare.`:current().label);
}
function changeWorld(index,{direct=false,writeRoute=true,child=''}={}){
  const next=wrap(index),changed=next!==state.world;
  if(changed){post('memento:socket:pause');scene.setWorld(WORLDS[next]);}
  state.world=next;setView(next===0?'gate':direct?'hub':state.view==='detail'?'hub':state.view,{writeRoute,child});
  if((changed||direct)&&state.view==='hub'&&!child)post('memento:socket:reset');
  if(changed){state.lockedUntil=performance.now()+(reduced?10:950);if(!reduced)$('#world-title').animate([{opacity:.15,filter:'blur(4px)'},{opacity:1,filter:'blur(0px)'}],{duration:650,easing:'ease-out'});}
}
function step(direction){if(performance.now()<state.lockedUntil||state.view==='detail')return;changeWorld(state.world+direction);}
function home(){changeWorld(0);setView('gate');}
function resetSocket(){post('memento:socket:reset');setView('hub');$('#cube-target').focus({preventScroll:true});}
function parseRoute(){
  const parts=location.hash.slice(1).split('/');
  if(!parts[0]||parts[0]==='home'){
    const i=Math.max(0,WORLDS.findIndex(w=>w.id===parts[1]));if(i!==state.world){state.world=i;scene.setWorld(current());}
    setView('gate',{writeRoute:false});return;
  }
  const i=WORLDS.findIndex(w=>w.id===parts[0]);if(i>=0)changeWorld(i,{direct:true,writeRoute:false,child:parts.slice(1).join('/')});else home();
}
document.addEventListener('click',e=>{
  if(performance.now()<ignoreClickUntil)return;const b=e.target.closest('button');if(!b)return;
  if(b.dataset.action==='home'||b.dataset.nav==='memento')home();
  else if(b.dataset.nav){const i=WORLDS.findIndex(w=>w.id===b.dataset.nav);if(i===state.world&&state.view!=='gate')resetSocket();else changeWorld(i,{direct:true});}
  else if(b.id==='cube-target'){if(!state.world)changeWorld(1,{direct:true});else if(state.view==='gate')setView('hub');else if(state.view==='hub')setView('gate');else resetSocket();}
  else if(b.dataset.action==='previous-world')step(-1);
  else if(b.dataset.action==='next-world')step(1);
  else if(b.id==='socket-expand'){setView('detail',{writeRoute:false});post('memento:socket:expand');}
  else if(b.dataset.action==='retry-socket'){frames.get(current().id)?.remove();frames.delete(current().id);ensureFrame();}
});
let framingRequest=0;
function notifyFramed(){
  cancelAnimationFrame(framingRequest);
  const settle=()=>{
    if($('#socket').getAnimations().some(a=>a.playState==='running')){framingRequest=requestAnimationFrame(settle);return;}
    framingRequest=requestAnimationFrame(()=>post('memento:socket:settled',{mode:state.view}));
  };
  framingRequest=requestAnimationFrame(settle);
}
window.addEventListener('message',e=>{
  const frame=frames.get(current().id);if(e.origin!==location.origin||!e.data?.type)return;const sender=[...frames.values()].find(f=>f.contentWindow===e.source);if(!sender)return;const d=e.data;if(d.type==='memento:socket:ready')sender.dataset.ready='true';if(sender!==frame)return;
  if(d.type==='memento:socket:ready'){frame.dataset.ready='true';$('.socket-loading').hidden=true;$('#socket-error').hidden=true;clearTimeout(socketTimer);post('memento:socket:theme',{accent:current().color,mode:state.view});}
  if(d.type==='memento:socket:navigate'){if(d.world==='home')home();else{const i=WORLDS.findIndex(w=>w.id===d.world);if(i>=0)changeWorld(i,{direct:true});}}
  if(state.view==='gate')return;
  if(d.type==='memento:socket:request-framing'){if(state.view==='hub')setView('detail',{writeRoute:false});notifyFramed();}
  if(d.type==='memento:socket:engage'&&state.view==='hub')setView('detail',{writeRoute:false});
  if(d.type==='memento:socket:overview'&&state.view==='detail')setView('hub',{writeRoute:false});
  if(d.type==='memento:socket:route-changed'&&typeof d.hash==='string')route(false,['catalogo','inizio'].includes(d.hash)?'':d.hash);
});
window.addEventListener('wheel',e=>{
  if(e.target.closest('#socket,#atmosphere-controls')||state.view==='detail'||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
  e.preventDefault();const now=performance.now();if(now-wheelTime>180)wheelSum=0;wheelTime=now;wheelSum+=e.deltaY;
  if(Math.abs(wheelSum)>65){step(Math.sign(wheelSum));wheelSum=0;}
},{passive:false});
$('#app').addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('#socket,#atmosphere-controls'))return;gesture={x:e.clientX,y:e.clientY,id:e.pointerId};});
window.addEventListener('pointerup',e=>{if(!gesture||gesture.id!==e.pointerId)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;gesture=null;if(Math.abs(dy)>55&&Math.abs(dy)>Math.abs(dx)*1.2){ignoreClickUntil=performance.now()+450;step(dy<0?1:-1);}});
window.addEventListener('pointercancel',()=>gesture=null);
window.addEventListener('keydown',e=>{
  if(e.target.closest('input,textarea,select')||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();step(1);}
  if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();step(-1);}
  if(e.key==='Escape'){if(!$('#atmosphere-controls').hidden){$('#atmosphere-controls').hidden=true;$('#atmosphere-toggle').setAttribute('aria-expanded','false');$('#atmosphere-toggle').focus();}else if(state.view==='detail')resetSocket();else setView('gate');}
});
window.addEventListener('pointermove',e=>{scene.pointer.x=atmosphere.pointer.x=(e.clientX/innerWidth-.5)*2;scene.pointer.y=atmosphere.pointer.y=(e.clientY/innerHeight-.5)*2;},{passive:true});
$('#atmosphere-toggle').addEventListener('click',()=>{const p=$('#atmosphere-controls');p.hidden=!p.hidden;$('#atmosphere-toggle').setAttribute('aria-expanded',String(!p.hidden));});
for(const id of ['ambient','depth','parallax'])$('#'+id).addEventListener('input',e=>{atmosphere.settings[id]=Number(e.target.value)/100;if(id!=='depth')scene[id]=Number(e.target.value)/100;});
window.addEventListener('hashchange',parseRoute);window.addEventListener('resize',fitType,{passive:true});document.fonts.ready.then(fitType);
window.addEventListener('pagehide',()=>{scene.dispose();atmosphere.dispose();},{once:true});
parseRoute();
