import {createWorld} from './world.js';

const domains = [
  {id:'memento', title:'MEMENTO', href:'https://mementostudio.it/'},
  {id:'services', title:'SERVICES', href:'https://mementostudio.it/services'},
  {id:'projects', title:'PROJECTS', href:'https://mementostudio.it/projects'},
  {id:'levelup', title:'LEVELUP', href:'https://mementostudio.it/levelup'},
  {id:'start', title:'START', href:'https://mementostudio.it/start'}
];
const wrap=index=>((index%domains.length)+domains.length)%domains.length;
const stage=document.getElementById('stage');
const space=document.getElementById('world');
const copy=document.getElementById('stage-copy');
const title=document.getElementById('stage-title');
const link=document.getElementById('section-link');
const status=document.getElementById('navigation-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let active=0,copyTimer=0,transition=0,travelling=false,wheelTotal=0,wheelLast=0,wheelLock=0;
let gesture=null,suppressClickUntil=0;
const world=createWorld(stage,{onPick:i=>{
  if(travelling||gesture?.axis||performance.now()<suppressClickUntil)return;
  if(i===active)link.click();else goStage(i);
}});

function routeIndex(){
  const path=location.hash.replace(/^#\/?/,'').split('?')[0].split('/');
  const id=path[0]==='stage'?path[1]:path[0];
  return Math.max(0,domains.findIndex(d=>d.id===id));
}
function writeRoute(index,replace=false){
  const hash='#/stage/'+domains[index].id;
  if(location.hash!==hash)history[replace?'replaceState':'pushState']({offset:true},'',hash);
}
function setLabels(index,instant=false){
  clearTimeout(copyTimer);
  const d=domains[index];
  const apply=()=>{
    title.textContent=d.title;link.href=d.href;link.setAttribute('aria-label','Apri '+d.title);
    stage.setAttribute('aria-label',d.title+'. Trascina in verticale o usa le frecce per navigare. Trascina in orizzontale per guardarti intorno. Invio apre la pagina.');
    status.textContent=d.title;copy.classList.remove('is-changing');
  };
  if(instant||reduced.matches)apply();
  else{copy.classList.add('is-changing');copyTimer=setTimeout(apply,140);}
}
async function goStage(index,{instant=false,historyMode='push',direction=0}={}){
  index=wrap(index);
  const token=++transition;active=index;travelling=!instant&&!reduced.matches;
  setLabels(index,instant);
  if(historyMode!=='none')writeRoute(index,historyMode==='replace');
  await world.travel(index,instant,{direction});
  if(token===transition)travelling=false;
}
const advance=direction=>goStage(active+direction,{direction});
space.addEventListener('click',e=>{
  if(performance.now()<suppressClickUntil||copy.classList.contains('is-changing')){e.preventDefault();e.stopPropagation();}
},true);
space.addEventListener('dragstart',e=>e.preventDefault());
window.addEventListener('popstate',()=>goStage(routeIndex(),{instant:true,historyMode:'none'}));
window.addEventListener('hashchange',()=>{
  const index=routeIndex();if(index!==active)goStage(index,{instant:true,historyMode:'none'});
});
window.addEventListener('keydown',e=>{
  if(e.altKey||e.metaKey||e.ctrlKey||e.target.closest('input,textarea,select'))return;
  if(['ArrowDown','ArrowRight','PageDown'].includes(e.key)){e.preventDefault();advance(1);}
  else if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();advance(-1);}
  else if(e.key==='Home'){e.preventDefault();goStage(0);}
  else if(e.key==='End'){e.preventDefault();goStage(4);}
  else if(e.key==='Enter'&&e.target===stage&&!travelling){e.preventDefault();link.click();}
});
space.addEventListener('wheel',e=>{
  if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||gesture?.axis)return;
  e.preventDefault();const now=performance.now();
  if(now<wheelLock)return;
  if(now-wheelLast>180||Math.sign(e.deltaY)!==Math.sign(wheelTotal))wheelTotal=0;
  wheelLast=now;wheelTotal+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
  if(Math.abs(wheelTotal)>45){advance(Math.sign(wheelTotal));wheelTotal=0;wheelLock=now+900;}
},{passive:false});

// Hover looks around. A horizontal drag looks; a vertical drag scrubs the route.
// Lock the axis once, capture the pointer, and never turn a drag into a link click.
space.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||e.button!==0)return;
  const look=world.getState().lookAngles;
  gesture={id:e.pointerId,x:e.clientX,y:e.clientY,lastY:e.clientY,lastTime:performance.now(),velocity:0,axis:null,lookX:look[0]/8,lookY:look[1]/5};
});
space.addEventListener('pointermove',e=>{
  if(!gesture){
    if(e.pointerType==='mouse'&&!e.buttons&&!travelling)world.setLook(e.clientX/innerWidth*2-1,e.clientY/innerHeight*2-1);
    return;
  }
  if(gesture.id!==e.pointerId)return;
  const g=gesture,dx=e.clientX-g.x,dy=e.clientY-g.y,now=performance.now();
  if(!g.axis&&Math.hypot(dx,dy)>=10){
    g.axis=Math.abs(dy)>Math.abs(dx)?'travel':'look';
    space.setPointerCapture(e.pointerId);space.classList.add('is-dragging');suppressClickUntil=now+500;
    if(g.axis==='travel'){
      ++transition;travelling=true;g.origin=world.beginDrag();g.scale=Math.max(180,Math.min(innerHeight*.36,360));
      active=wrap(Math.round(g.origin));setLabels(active,true);
    }
  }
  if(g.axis==='travel'){
    const index=world.scrubDrag(-dy/g.scale);
    if(index!==active){active=index;setLabels(active,true);}
    g.velocity=(g.lastY-e.clientY)/Math.max(1,now-g.lastTime);
  }else if(g.axis==='look')world.setLook(g.lookX+dx/(innerWidth*.45),g.lookY+dy/(innerHeight*.8));
  g.lastY=e.clientY;g.lastTime=now;
});
function finishGesture(e,cancel=false){
  if(!gesture||(e?.pointerId!==undefined&&gesture.id!==e.pointerId))return;
  const g=gesture;gesture=null;space.classList.remove('is-dragging');
  if(space.hasPointerCapture(g.id))space.releasePointerCapture(g.id);
  if(!g.axis)return;
  suppressClickUntil=performance.now()+500;
  if(g.axis==='travel'){
    const distance=(g.y-g.lastY)/g.scale;
    const velocity=performance.now()-g.lastTime<120?g.velocity:0;
    const commit=!cancel&&(Math.abs(distance)>.2||(Math.abs(velocity)>.45&&Math.abs(distance)>.055));
    const direction=commit?Math.sign(distance||velocity):0;
    goStage(Math.round(g.origin)+direction);
  }
}
window.addEventListener('pointerup',e=>finishGesture(e));
window.addEventListener('pointercancel',e=>finishGesture(e,true));
space.addEventListener('lostpointercapture',e=>finishGesture(e,true));
space.addEventListener('pointerleave',()=>{if(!gesture)world.setLook(0,0);});
window.addEventListener('blur',()=>{finishGesture(null,true);world.setLook(0,0);});
window.addEventListener('resize',()=>finishGesture(null,true));

goStage(routeIndex(),{instant:true,historyMode:'replace'});
window.__OFFSET__={getState:()=>({activeDomain:domains[active].id,destination:domains[active].href,world:world.getState()})};
