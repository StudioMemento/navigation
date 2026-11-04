import {PAGES,SETTINGS} from './config.mjs';
import {wrap,distance,readLocation,findPage} from './logic.mjs';
import {createEffects,cardEdgeMarkup} from './fx.mjs';
import {createViewer} from './viewer.mjs';
import {installHost} from '../navigation/host.mjs';
const $=id=>document.getElementById(id);
const stage=$('slide-stage'),carousel=$('carousel'),dots=$('dots');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let route=readLocation(location.href),active=route.index,settleTimer=0,suppressClickUntil=0,gesture=null,fx,lastURL=location.href;
const cards=PAGES.map((page,i)=>{
  const card=document.createElement('button');card.className='slide';card.dataset.index=String(i);card.setAttribute('aria-label',`${page.label} — seleziona la sezione`);card.setAttribute('aria-roledescription','slide');
  card.innerHTML=`<span class="slide-surface"><picture><source srcset="/assets/images/${page.image}-small.webp" media="(max-width:767px)"><img src="/assets/images/${page.image}.webp" width="1672" height="941" alt="${page.alt}" draggable="false" fetchpriority="${i===active?'high':'low'}" decoding="async"></picture><span class="slide-shade"></span><span class="slide-meta"><span>${String(i+1).padStart(2,'0')} / ${page.label}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></span>${cardEdgeMarkup(page.id)}`;
  card.addEventListener('click',event=>{if(performance.now()<suppressClickUntil){event.preventDefault();return;}if(active===i)enterPage();else select(i);});
  stage.append(card);
  const dot=document.createElement('button');dot.className='dot';dot.setAttribute('aria-label',`Mostra ${page.label}`);dot.addEventListener('click',()=>select(i));dots.append(dot);
  return card;
});
const dotButtons=[...dots.children];
const viewer=createViewer({
  onNavigate(page,payload){select(PAGES.indexOf(page),{open:true,query:typeof payload.search==='string'?payload.search:'',anchor:typeof payload.hash==='string'?payload.hash:''});},
  onReturn(edge){viewer.closeExpanded();if(edge==='end')select(active+1);returnToHub();}
});
const overlay=installHost({active:PAGES[active].id,onNavigate(detail){
  if(detail.view==='world'){returnToHub();return;}
  const page=findPage(detail.id);if(page){select(PAGES.indexOf(page));returnToHub();}
}});
// Host routing is handled here on both the public domain and mementonav.vercel.app.
fx=createEffects({titleSVG:$('title-art'),titleAccessible:$('title-accessible'),cards,stage:carousel,dust:$('transition-dust')});
function layout(){
  const mobile=innerWidth<768;
  cards.forEach((card,i)=>{
    const d=distance(i,active),abs=Math.abs(d);
    card.style.setProperty('--x',`${d===0?0:Math.sign(d)*(abs===1?(mobile?82:68):(mobile?139:112))}%`);
    card.style.setProperty('--scale',String([1,mobile?.83:.82,mobile?.66:.66][abs]));
    card.style.setProperty('--rotate',`${-Math.sign(d)*(abs===1?22:30)}deg`);
    card.style.setProperty('--alpha',String([1,.78,.45][abs]));card.style.setProperty('--z',String(10-abs));
    card.dataset.active=String(d===0);card.setAttribute('aria-pressed',String(d===0));card.tabIndex=d===0?0:-1;
    dotButtons[i].setAttribute('aria-pressed',String(d===0));
  });
  fx?.invalidate();
}
function updateCaption(){
  const page=PAGES[active];fx.setTitle(page.title);$('section-copy').textContent=page.copy;$('counter').innerHTML=`${String(active+1).padStart(2,'0')} <i>/</i> 05`;
  $('explore').setAttribute('aria-label',`Esplora ${page.label}`);document.title=`${page.label} — Memento`;overlay.setActive(page.id);$('announcement').textContent=`${page.label}, sezione ${active+1} di 5.`;
}
function loadCurrent(query='',anchor=''){viewer.load(PAGES[active],query,anchor);}
function select(index,{history=true,open=false,query='',anchor=''}={}){
  const previous=active;active=wrap(index);layout();updateCaption();
  if(history){const page=PAGES[active];const path=open?`/${page.slug}${query?'?'+query:''}${anchor}`:`/#${page.slug}`;window.history.pushState({page:page.id},'',path);lastURL=location.href;}
  clearTimeout(settleTimer);
  settleTimer=setTimeout(()=>loadCurrent(query,anchor),reduced.matches?0:SETTINGS.settleMs);
  if(previous!==active)fx.burst(distance(active,previous)>0?1:-1);
  if(open)enterPage(false);
}
function enterPage(push=true){
  clearTimeout(settleTimer);const current=readLocation(location.href);loadCurrent(current.query,current.anchor);
  if(push){const page=PAGES[active];history.pushState({page:page.id},'',`/${page.slug}${current.query?'?'+current.query:''}${current.anchor}`);lastURL=location.href;}
  $('experience').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});viewer.focus();
}
function returnToHub(){
  viewer.closeExpanded();$('hub').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});carousel.focus({preventScroll:true});
}
$('previous').addEventListener('click',()=>select(active-1));$('next').addEventListener('click',()=>select(active+1));$('explore').addEventListener('click',()=>enterPage());$('back-to-slides').addEventListener('click',returnToHub);$('continue').addEventListener('click',()=>{select(active+1);returnToHub();});
carousel.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey)return;
  if(['ArrowLeft','ArrowRight','Home','End','Enter'].includes(event.key))event.preventDefault();
  if(event.key==='ArrowLeft')select(active-1);else if(event.key==='ArrowRight')select(active+1);else if(event.key==='Home')select(0);else if(event.key==='End')select(4);else if(event.key==='Enter')enterPage();
});
carousel.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0)return;
  gesture={x:event.clientX,y:event.clientY,id:event.pointerId,claimed:false};
});
carousel.addEventListener('pointermove',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
  if(!gesture.claimed&&Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.35){gesture.claimed=true;carousel.setPointerCapture(event.pointerId);}
  if(gesture.claimed){stage.style.translate=`${Math.max(-65,Math.min(65,dx*.16))}px 0`;suppressClickUntil=performance.now()+300;}
});
function finishGesture(event,canceled=false){
  const g=gesture;gesture=null;stage.style.translate='';if(!g)return;
  if(carousel.hasPointerCapture(g.id))carousel.releasePointerCapture(g.id);
  if(!canceled&&g.claimed&&Math.abs(event.clientX-g.x)>Math.min(55,innerWidth*.12))select(active+(event.clientX<g.x?1:-1));
  if(g.claimed)suppressClickUntil=performance.now()+350;
}
carousel.addEventListener('pointerup',event=>finishGesture(event));carousel.addEventListener('pointercancel',event=>finishGesture(event,true));
window.addEventListener('pointerup',event=>{if(gesture)finishGesture(event);});window.addEventListener('blur',()=>{gesture=null;stage.style.translate='';});
let wheelDebt=0,wheelTime=0,wheelLock=0;
carousel.addEventListener('wheel',event=>{
  if(event.ctrlKey||Math.abs(event.deltaX)<=Math.abs(event.deltaY)||Math.abs(event.deltaX)<2)return;
  event.preventDefault();const now=performance.now();if(now<wheelLock)return;if(now-wheelTime>160)wheelDebt=0;wheelTime=now;wheelDebt+=event.deltaX;
  if(Math.abs(wheelDebt)>65){select(active+Math.sign(wheelDebt));wheelDebt=0;wheelLock=now+650;}
},{passive:false});
window.addEventListener('resize',layout);
function restore(){if(lastURL===location.href)return;lastURL=location.href;route=readLocation(location.href);select(route.index,{history:false,open:route.open,query:route.query,anchor:route.anchor});if(!route.open)returnToHub();}
window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore);
cards.forEach(card=>card.addEventListener('transitionend',()=>fx.invalidate()));
layout();updateCaption();loadCurrent(route.query,route.anchor);
requestAnimationFrame(()=>{$('hub').classList.add('is-ready');fx.burst();});
if(route.open)setTimeout(()=>enterPage(false),80);
window.addEventListener('pagehide',()=>{clearTimeout(settleTimer);fx.destroy();viewer.destroy();overlay.destroy();},{once:true});
window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
