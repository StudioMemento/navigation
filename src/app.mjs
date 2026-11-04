import {PAGES,SETTINGS} from './config.mjs';
import {wrap,distance,readLocation,pageAddress} from './logic.mjs';
import {createEffects,cardEdgeMarkup} from './fx.mjs';
const $=id=>document.getElementById(id);
const hub=$('hub'),stage=$('slide-stage'),carousel=$('carousel');
const title=$('page-title'),entry=$('enter-page');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(max-width:767px) and (orientation:portrait)');
let route=readLocation(location.href),active=route.index,gesture=null,suppressClickUntil=0;
let leaving=false,passthrough=false,navigationTimer=0,recoveryTimer=0,fx;
const cards=PAGES.map((page,i)=>{
  const card=document.createElement('a');card.className='slide';card.dataset.index=String(i);
  card.href=page.publicURL;card.target='_top';card.draggable=false;
  card.setAttribute('aria-roledescription','slide');
  card.innerHTML=`<span class="slide-surface"><picture><source srcset="/assets/images/${page.image}-small.webp" media="(max-width:767px)"><img src="/assets/images/${page.image}.webp" width="1672" height="941" alt="${page.alt}" draggable="false" fetchpriority="${i===active?'high':'low'}" decoding="async"></picture></span>${cardEdgeMarkup(page.id)}`;
  card.addEventListener('click',event=>{
    if(passthrough||modified(event))return;
    if(performance.now()<suppressClickUntil||leaving){event.preventDefault();return;}
    if(active!==i){event.preventDefault();select(i);}else leave(event,card);
  });
  stage.append(card);return card;
});
fx=createEffects({titleSVG:$('title-art'),titleAccessible:$('title-accessible'),cards,stage:carousel});
function modified(e){return e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;}
function layout(){
  cards.forEach((card,i)=>{
    const d=distance(i,active),abs=Math.abs(d);
    const x=d===0?0:Math.sign(d)*(abs===1?(mobile.matches?82:62):(mobile.matches?139:101));
    card.style.setProperty('--x',`${x}%`);
    card.style.setProperty('--scale',String([1,.8,.6][abs]));
    card.style.setProperty('--rotate',`${-Math.sign(d)*(abs===1?22:30)}deg`);
    card.style.setProperty('--alpha',String([1,.74,.4][abs]));
    card.style.setProperty('--z',String(10-abs));
    card.dataset.active=String(d===0);card.tabIndex=d===0?0:-1;
    card.setAttribute('aria-label',`${PAGES[i].label}, ${i+1} di 5. ${d===0?'Apri pagina':'Mostra slide'}.`);
    if(d===0)card.setAttribute('aria-current','true');else card.removeAttribute('aria-current');
  });
  fx?.invalidate();
}
function update(){
  const page=PAGES[active],href=pageAddress(page,route.query,route.anchor);
  fx.setTitle(page.title);title.href=entry.href=cards[active].href=href;
  entry.setAttribute('aria-label',`Entra in ${page.label}`);
  document.title=`${page.label} — Memento`;
  $('announcement').textContent=`${page.label}, sezione ${active+1} di 5.`;
}
function select(index,{history=true}={}){
  if(leaving)return;
  const next=wrap(index),hadCardFocus=cards.includes(document.activeElement);
  if(next!==active){cards[active].href=PAGES[active].publicURL;route={index:next,query:'',anchor:''};}
  active=next;layout();update();
  if(hadCardFocus)cards[active].focus({preventScroll:true});
  if(history)window.history.replaceState({page:PAGES[active].id},'',`/#${PAGES[active].slug}`);
}
function reset(){
  clearTimeout(navigationTimer);clearTimeout(recoveryTimer);leaving=false;passthrough=false;
  hub.classList.remove('is-leaving');hub.removeAttribute('aria-busy');
}
function leave(event,link){
  if(passthrough||modified(event))return;
  if(leaving){event.preventDefault();return;}
  if(reduced.matches)return; // Keep instant, native navigation for reduced motion.
  event.preventDefault();leaving=true;hub.classList.add('is-leaving');hub.setAttribute('aria-busy','true');
  navigationTimer=setTimeout(()=>{
    passthrough=true;link.click();passthrough=false;
    // Restore interaction if a containing platform cancels top-level navigation.
    recoveryTimer=setTimeout(reset,2200);
  },SETTINGS.leaveMs);
}
for(const link of [title,entry])link.addEventListener('click',event=>leave(event,link));
hub.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||leaving)return;
  const key=event.key;
  if(['ArrowLeft','ArrowRight','Home','End'].includes(key))event.preventDefault();
  if(key==='ArrowLeft')select(active-1);
  else if(key==='ArrowRight')select(active+1);
  else if(key==='Home')select(0);
  else if(key==='End')select(PAGES.length-1);
  else if(key==='Enter'&&event.target===carousel){event.preventDefault();cards[active].click();}
});
carousel.addEventListener('dragstart',event=>event.preventDefault());
carousel.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0||leaving)return;
  gesture={x:event.clientX,y:event.clientY,id:event.pointerId,claimed:false};
});
carousel.addEventListener('pointermove',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
  if(!gesture.claimed&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.25){gesture.claimed=true;carousel.setPointerCapture(event.pointerId);}
  if(gesture.claimed){stage.style.translate=`${Math.max(-65,Math.min(65,dx*.17))}px 0`;suppressClickUntil=performance.now()+350;}
});
function finish(event,canceled=false){
  const g=gesture;gesture=null;stage.style.translate='';if(!g)return;
  if(carousel.hasPointerCapture(g.id))carousel.releasePointerCapture(g.id);
  if(!canceled&&g.claimed&&Math.abs(event.clientX-g.x)>Math.min(55,innerWidth*.12))select(active+(event.clientX<g.x?1:-1));
  if(g.claimed)suppressClickUntil=performance.now()+350;
}
carousel.addEventListener('pointerup',event=>finish(event));
carousel.addEventListener('pointercancel',event=>finish(event,true));
window.addEventListener('pointerup',event=>{if(gesture)finish(event);});
window.addEventListener('blur',()=>{gesture=null;stage.style.translate='';});
let wheelDebt=0,wheelTime=0,wheelLock=0;
carousel.addEventListener('wheel',event=>{
  if(event.ctrlKey||leaving||Math.abs(event.deltaX)<=Math.abs(event.deltaY)||Math.abs(event.deltaX)<2)return;
  event.preventDefault();const now=performance.now();if(now<wheelLock)return;
  if(now-wheelTime>160)wheelDebt=0;wheelTime=now;wheelDebt+=event.deltaX;
  if(Math.abs(wheelDebt)>65){select(active+Math.sign(wheelDebt));wheelDebt=0;wheelLock=now+700;}
},{passive:false});
window.addEventListener('resize',layout);
for(const event of ['popstate','hashchange'])window.addEventListener(event,()=>{reset();route=readLocation(location.href);select(route.index,{history:false});});
window.addEventListener('pageshow',()=>{reset();fx.invalidate();});
window.addEventListener('pagehide',reset);
cards.forEach(card=>card.addEventListener('transitionend',()=>fx.invalidate()));
layout();update();requestAnimationFrame(()=>hub.classList.add('is-ready'));
