import { mountNav } from '/navigation/navbar.mjs';
import { navigationLink, STATIONS, station } from '/navigation/core.mjs?v=12.0.0';

const root = document.documentElement;
const section = station(root.dataset.mementoNative);
const pageUrl = (id, view = 'page') => view === 'world' ? '/#'+station(id).slug : station(id).path+'/';
const modalOpen = () => root.dataset.demoExpanded === 'true' || root.dataset.overlayOpen === 'true' ||
  document.body.classList.contains('modal-open') || !!document.querySelector('dialog[open],[aria-modal="true"]:not([hidden]):not([aria-hidden="true"])');
function syncOverlay() {
  const modal = modalOpen();
  if (root.hasAttribute('data-memento-modal') === modal) return;
  root.toggleAttribute('data-memento-modal', modal);
  document.dispatchEvent(new Event('memento:surface-visibility'));
}

if (section) {
  const nav = mountNav({active:section.id, mode:'host'});
  nav.setAttribute('current','page');
  function internalHref(value) {
    const target=navigationLink(value,location.href,location.origin);
    if(!target)return null;
    return target.view==='world'?pageUrl(target.id,'world'):pageUrl(target.id)+(target.search?'?'+target.search:'')+(target.hash||'');
  }
  // Existing content, including LevelUp's keyboard shortcuts, can request a native route directly.
  window.MementoNavigation = {navigate(value) {
    const href=internalHref(value);
    if(!href)return false;
    window.mementoGo(href);
    return true;
  }};
  // Let authored click handlers finish choosing the destination before the browser follows it.
  document.addEventListener('click', event => {
    if(event.defaultPrevented || event.button!==0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const a=event.composedPath().find(n=>n instanceof HTMLAnchorElement);
    if(!a || a.hasAttribute('download') || !['','_self','_top','_parent'].includes(a.target) || a.getAttribute('href')?.startsWith('#')) return;
    const url=new URL(a.href);
    if(url.origin===location.origin && url.pathname===location.pathname) return;
    const href=internalHref(url.href);
    if(href && url.href!==new URL(href,location.origin).href)a.href=href;
  });
  document.addEventListener('memento:overlay-change',syncOverlay);
  document.addEventListener('toggle',event=>{if(event.target instanceof HTMLDialogElement)syncOverlay();},true);
  window.addEventListener('pageshow',syncOverlay);
  syncOverlay();
  if(section.id==='start' || section.id==='memento') {
    import('/memento-ui/effects.mjs').then(fx=>fx.mountBackground()).catch(()=>{});
  }
  // Retain explicit return and intentional overscroll at the end of a new gesture.
  const home=(end=false)=>{const index=STATIONS.indexOf(section);window.mementoGo(pageUrl(end?STATIONS[(index+1)%STATIONS.length].id:section.id,'world'));};
  const blocked=e=>e.defaultPrevented||modalOpen()||e.target?.closest?.('input,select,textarea,[contenteditable="true"],[role=slider],canvas,iframe,video,[data-memento-gesture-lock]');
  function atEdge(target,sign){
    for(let n=target instanceof Element?target:null;n;n=n.parentElement){
      if(n===document.scrollingElement) break;
      if(n.scrollHeight>n.clientHeight+3 && /(auto|scroll)/.test(getComputedStyle(n).overflowY) && (sign<0?n.scrollTop>2:n.scrollTop+n.clientHeight<n.scrollHeight-3))return false;
    }
    const s=document.scrollingElement;
    return !!s && (sign<0?s.scrollTop<=2:s.scrollTop+s.clientHeight>=s.scrollHeight-3);
  }
  let since=performance.now(),previous=0,direction=0,debt=0,touch=null;
  window.addEventListener('pageshow',()=>{since=performance.now();debt=0;previous=0;touch=null;});
  window.addEventListener('keydown',e=>{if(e.defaultPrevented||modalOpen()||e.target?.closest?.('input,select,textarea,[contenteditable="true"]'))return;
    if(e.key==='Escape' && !(section.id==='memento' && document.body.matches('.inside,.focused'))){e.preventDefault();home();}
    else if(e.key==='PageUp'&&!blocked(e)&&atEdge(e.target,-1)){e.preventDefault();home();}
  });
  if(section.id!=='memento'){
    window.addEventListener('wheel',e=>{
      if(blocked(e)||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||!e.deltaY||performance.now()-since<900)return;
      const dy=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1),sign=Math.sign(dy),now=performance.now();
      const fresh=now-previous>220||sign!==direction;previous=now;direction=sign;
      if(!atEdge(e.target,sign)){debt=0;return;}
      if(fresh)debt=Math.abs(dy);else if(debt)debt+=Math.abs(dy);
      if(debt>=180){debt=0;home(sign>0);}
    },{passive:true});
    window.addEventListener('touchstart',e=>{const p=e.touches[0];touch=!blocked(e)&&e.touches.length===1&&performance.now()-since>=900?{x:p.clientX,y:p.clientY,top:atEdge(e.target,-1),bottom:atEdge(e.target,1)}:null;},{passive:true});
    window.addEventListener('touchcancel',()=>{touch=null;},{passive:true});
    window.addEventListener('touchend',e=>{const t=touch,p=e.changedTouches[0];touch=null;if(!t||!p||blocked(e))return;const dy=t.y-p.clientY;if(Math.abs(dy)>90&&Math.abs(dy)>Math.abs(t.x-p.clientX)*1.4&&((dy<0&&t.top)||(dy>0&&t.bottom)))home(dy>0);},{passive:true});
  }
}
