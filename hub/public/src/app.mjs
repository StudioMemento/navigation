import {STATIONS,station,indexOf,readRoute,routePath} from '../navigation/core.mjs';
import {mountNav} from '../navigation/navbar.mjs';
import {EmbedController} from './embeds.mjs';
const $=id=>document.getElementById(id);
let route=readRoute(location.href),phase=route.view==='page'?'page':'world',world=null,worldPromise=null,intent=0,loaded=false,worldFailed=false;
const nav=mountNav({active:route.id,hub:location.origin});
const embeds=new EmbedController($('page-frame-wrap'),{
  onLoad:()=>{loaded=true;$('page-loader').hidden=true;},
  onError:()=>{$('page-loader').hidden=true;$('page-error').hidden=false;},
  onIntent:target=>navigate(target)
});
function announce(text){$('status').textContent=text;}
function paint(){
  const page=phase==='page';nav.setAttribute('active',route.id);
  $('page-shell').hidden=!page;$('world').inert=page;$('world').setAttribute('aria-hidden',String(page));
  $('world-hud').hidden=page||!world||worldFailed;$('world-hud').inert=phase!=='world';
  $('return').hidden=!(page||phase==='entering');$('original').hidden=!page;$('original').href=station(route.id).url;
  $('loader').hidden=page||Boolean(world)||worldFailed;$('world-error').hidden=!worldFailed||page;
  $('pause').hidden=page||!world||worldFailed;
  $('page-loader').hidden=!page||loaded;$('hint').textContent=`Esplora ${station(route.id).label}`;
  $('enter').setAttribute('aria-label',`Entra in ${station(route.id).label}`);
  $('transition').style.opacity=page?'1':'0';
  embeds.setActive(page);
}
function worldFailure(){worldFailed=true;paint();announce('Il mondo 3D non è disponibile. Puoi aprire tutte le sezioni dalla barra.');}
function ensureWorld(initial=indexOf(route.id),parked=false){
  if(world)return Promise.resolve(world);
  if(!worldPromise){
    let lastState='';
    worldPromise=import('./world.mjs').then(({World})=>new World($('canvas'),{initial,parked,onState:s=>{
      const fade=['page','waiting'].includes(s.state)?1:['descending','ascending'].includes(s.state)?Math.max(0,Math.min(1,(s.progress-.83)/.17)):0;
      if(phase!=='page')$('transition').style.opacity=String(fade);
      const key=s.state+':'+s.target;
      if(key!==lastState){lastState=key;$('world').dataset.state=s.state;}
    }}).load()).then(value=>{world=value;if(phase==='page')world.park(indexOf(route.id));paint();return value;}).catch(error=>{console.error(error);worldFailure();return null;});
  }
  return worldPromise;
}
function writeRoute(target,replace=false){const path=routePath(target);if(location.pathname+location.search+location.hash!==path)history[replace?'replaceState':'pushState']({},'',path);}
async function navigate(target,{history=true}={}){
  if(!station(target.id))return;
  const token=++intent,oldPhase=phase;route={search:'',hash:'',...target};if(history)writeRoute(route);
  $('page-error').hidden=true;
  if(route.view==='page'){
    loaded=false;embeds.open(route);
    if(oldPhase==='world'&&world&&!worldFailed){phase='entering';paint();await world.enter(indexOf(route.id));if(token!==intent)return;}
    else world?.park(indexOf(route.id));
    phase='page';paint();$('return').focus({preventScroll:true});announce(`${station(route.id).label}. Esplora per tornare al mondo.`);
  }else{
    if(['page','entering','returning'].includes(oldPhase)){
      phase='returning';paint();const current=await ensureWorld(indexOf(route.id),true);if(token!==intent)return;
      if(current&&!worldFailed)await current.leave(indexOf(route.id));if(token!==intent)return;
      embeds.destroyFrame();phase='world';paint();$('enter').focus({preventScroll:true});
    }else{phase='world';paint();if(world)world.select(indexOf(route.id));else ensureWorld(indexOf(route.id));}
    announce(`${station(route.id).label}. Premi Invio per entrare.`);
  }
}
function choose(id){
  if(phase==='page'&&route.id===id)return navigate({id,view:'world'});
  if(phase!=='world'||!world||worldFailed)return navigate({id,view:'page'});
  return navigate({id,view:route.id===id?'page':'world'});
}
nav.addEventListener('memento:navigate',e=>{e.preventDefault();choose(e.detail.id);});
$('home').onclick=()=>navigate({id:'memento',view:'world'});
$('previous').onclick=()=>navigate({id:STATIONS[(indexOf(route.id)+4)%5].id,view:'world'});
$('next').onclick=()=>navigate({id:STATIONS[(indexOf(route.id)+1)%5].id,view:'world'});
$('enter').onclick=()=>navigate({...route,view:'page'});
$('return').onclick=$('cancel-page').onclick=()=>navigate({id:route.id,view:'world'});
$('retry-page').onclick=()=>navigate({...route},{history:false});
$('pause').onclick=()=>{if(!world)return;world.paused=!world.paused;$('pause').setAttribute('aria-pressed',String(world.paused));$('pause').textContent=world.paused?'Riprendi ambiente':'Ferma ambiente';};
for(const a of document.querySelectorAll('[data-open-page]'))a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();navigate({id:a.dataset.openPage,view:'page'});});
for(const type of ['popstate','hashchange'])addEventListener(type,()=>{const target=readRoute(location.href);if(routePath(target)!==routePath(route))navigate(target,{history:false});});
addEventListener('keydown',e=>{
  if(e.defaultPrevented||e.target.closest?.('input,textarea,select,[contenteditable]'))return;
  if(e.key==='Escape'&&['page','entering'].includes(phase)){e.preventDefault();navigate({id:route.id,view:'world'});}
  if(phase!=='world')return;
  if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();navigate({id:STATIONS[(indexOf(route.id)+(e.key==='ArrowRight'?1:4))%5].id,view:'world'});}
  if((e.key==='ArrowDown'||e.key==='Enter')&&e.target===document.body){e.preventDefault();navigate({...route,view:'page'});}
});
let down=null,wheelDebt=0,lastWheel=0;
$('canvas').addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};});
$('canvas').addEventListener('pointercancel',()=>{down=null;});
$('canvas').addEventListener('pointerup',e=>{
  const start=down;down=null;if(!start||!world||phase!=='world')return;
  const dx=e.clientX-start.x,dy=e.clientY-start.y;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4){navigate({id:STATIONS[(indexOf(route.id)+(dx<0?1:4))%5].id,view:'world'});return;}
  if(dy< -80&&Math.abs(dy)>Math.abs(dx)*1.4){navigate({...route,view:'page'});return;}
  if(Math.hypot(dx,dy)>12)return;const i=world.hit(e.clientX,e.clientY);if(i>=0)choose(STATIONS[i].id);
});
$('canvas').addEventListener('wheel',e=>{
  if(phase!=='world'||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
  const now=performance.now();if(now-lastWheel>220||e.deltaY<0)wheelDebt=0;lastWheel=now;wheelDebt+=Math.max(0,e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1));
  if(wheelDebt>180){wheelDebt=0;navigate({...route,view:'page'});}e.preventDefault();
},{passive:false});
$('canvas').addEventListener('memento:world-error',worldFailure);
addEventListener('pagehide',()=>embeds.setActive(false));
addEventListener('pageshow',()=>embeds.setActive(phase==='page'));
paint();if(route.view==='page')navigate(route,{history:false});else ensureWorld(indexOf(route.id));
