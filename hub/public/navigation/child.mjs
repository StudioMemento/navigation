import {CHANNEL,VERSION,DEFAULT_HUB,STATIONS,station,trustedParent,navigationLink,sessionEnvelope,validMessage,routePath} from './core.mjs';
import {mountNav} from './navbar.mjs';

export function installChild({page,hub=DEFAULT_HUB}={}) {
  if(window.__MEMENTO_NAV_V2__)return window.__MEMENTO_NAV_V2__;
  const id=station(page)?.id||STATIONS.find(s=>new URL(s.url).origin===location.origin)?.id||'memento';
  const embedded=parent!==window;
  const nav=mountNav({active:id,hub,hidden:embedded});
  let connection=null,active=!embedded,lastWheel=0,debt=0,lastSign=0,touch=null,readyAt=0;
  const style=document.createElement('style');style.dataset.mementoNav='v2';
  style.textContent=`html[data-memento-navigation=standalone]{scroll-padding-bottom:100px}html[data-memento-navigation=standalone] body{padding-bottom:max(100px,calc(80px + env(safe-area-inset-bottom,0px)))}html[data-memento-navigation=standalone] #catalogue-viewport{padding-bottom:100px}html[data-memento-navigation=hosted] memento-nav{display:none!important}`;
  document.head.append(style);document.documentElement.dataset.mementoPage=id;
  const setMode=hosted=>{nav.hidden=hosted;document.documentElement.dataset.mementoNavigation=hosted?'hosted':'standalone';};
  const send=(type,payload={})=>{if(connection)parent.postMessage(sessionEnvelope(id,connection.sessionId,type,payload),connection.origin);};
  const modal=()=>document.querySelector('dialog[open],[aria-modal="true"]:not([hidden])');
  const editing=el=>el?.closest?.('input,select,textarea,[contenteditable=true]');
  const busyTarget=el=>el?.closest?.('iframe,video,audio,[role=slider],input[type=range],canvas,[data-memento-gesture-lock]');
  const scrollingRoot=()=>{
    const root=document.scrollingElement;
    if(root&&root.scrollHeight>root.clientHeight+4)return root;
    return [...document.querySelectorAll('#catalogue-viewport,main,[data-scroll-root]')].find(el=>el.scrollHeight>el.clientHeight+4&&/(auto|scroll)/.test(getComputedStyle(el).overflowY))||root;
  };
  function canConsume(target,delta) {
    const root=scrollingRoot();
    for(let el=target instanceof Element?target:null;el;el=el.parentElement){
      if(el===root)return delta<0?el.scrollTop>2:el.scrollTop+el.clientHeight<el.scrollHeight-3;
      if(el.scrollHeight>el.clientHeight+3&&/(auto|scroll)/.test(getComputedStyle(el).overflowY)&&
        (delta<0?el.scrollTop>2:el.scrollTop+el.clientHeight<el.scrollHeight-3))return true;
    }
    return root&&(delta<0?root.scrollTop>2:root.scrollTop+root.clientHeight<root.scrollHeight-3);
  }
  function visible(value){
    active=value;window.__TIDE_VISIBLE__=value;readyAt=performance.now();debt=0;lastWheel=0;
    document.documentElement.dataset.mementoActive=String(value);
    document.dispatchEvent(new Event('memento:overlay-change'));
    if(!value)document.querySelectorAll('video,audio').forEach(el=>el.pause());
  }
  function returnIntent(edge){if(active){active=false;send('RETURN',{edge});}}
  addEventListener('message',event=>{
    const d=event.data;
    if(event.source!==parent||!embedded||!trustedParent(event.origin,hub)||d?.channel!==CHANNEL||d.version!==VERSION||d.station!==id)return;
    if(d.type==='INIT'&&typeof d.sessionId==='string'&&d.sessionId.length>=12&&d.sessionId.length<=160){
      const fresh=connection?.sessionId!==d.sessionId;
      connection={id,origin:event.origin,source:parent,sessionId:d.sessionId};setMode(true);
      if(fresh)visible(false);
      send('READY',{bridge:'memento-nav-v2',supportsNavigation:true,supportsBoundary:true});return;
    }
    if(!validMessage(event,connection))return;
    if(d.type==='VISIBILITY')visible(d.payload.active===true);
    if(d.type==='FOCUS')document.querySelector('main,h1')?.focus?.({preventScroll:true});
  });
  nav.addEventListener('memento:navigate',event=>{
    if(!connection)return;
    event.preventDefault();send('NAVIGATE',{id:event.detail.id,view:'page'});
  });
  document.addEventListener('click',event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const a=event.target.closest?.('a[href]');if(!a||a.download)return;
    const target=navigationLink(a.href,location.href,hub);
    if(!target)return;
    // Standalone pages use the same public hub routes, including CTA context.
    if(!connection){a.href=new URL(routePath(target),hub).href;return;}
    event.preventDefault();event.stopImmediatePropagation();
    if(target.view==='world')returnIntent('explicit');else send('NAVIGATE',target);
  },true);
  addEventListener('keydown',event=>{
    if(!connection||!active||event.defaultPrevented||editing(event.target)||modal())return;
    if(event.key==='Escape'){event.preventDefault();returnIntent('explicit');}
    if(event.key==='PageUp'&&!canConsume(event.target,-1)&&!busyTarget(event.target)){event.preventDefault();returnIntent('start');}
  });
  addEventListener('wheel',event=>{
    if(!connection||!active||performance.now()-readyAt<900||event.ctrlKey||modal()||editing(event.target)||busyTarget(event.target))return;
    if(Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1),sign=Math.sign(delta),now=performance.now();
    const fresh=now-lastWheel>220||sign!==lastSign;
    if(fresh)debt=0;
    lastWheel=now;lastSign=sign;
    if(canConsume(event.target,delta)){debt=0;return;}
    // Read the last content first: require a fresh gesture at the boundary.
    if(fresh)debt=Math.abs(delta);else if(debt)debt+=Math.abs(delta);
    if(debt>=180){event.preventDefault();returnIntent(delta<0?'start':'end');}
  },{passive:false});
  addEventListener('touchstart',event=>{
    const p=event.touches[0];touch=event.touches.length===1&&connection&&active&&!modal()&&!editing(event.target)&&!busyTarget(event.target)?{x:p.clientX,y:p.clientY,target:event.target,start:!canConsume(event.target,-1),end:!canConsume(event.target,1)}:null;
  },{passive:true});
  addEventListener('touchend',event=>{
    const p=event.changedTouches[0],t=touch;touch=null;if(!t||!p)return;
    const dy=t.y-p.clientY,dx=Math.abs(t.x-p.clientX);
    if(Math.abs(dy)>90&&Math.abs(dy)>dx*1.4&&((dy<0&&t.start)||(dy>0&&t.end)))returnIntent(dy<0?'start':'end');
  },{passive:true});
  if(!embedded)setMode(false);else setTimeout(()=>{if(!connection)setMode(false);},1200);
  window.__MEMENTO_NAV_V2__={version:VERSION,page:id,get connected(){return Boolean(connection);}};
  return window.__MEMENTO_NAV_V2__;
}
