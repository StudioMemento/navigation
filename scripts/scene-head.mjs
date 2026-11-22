import { createMaterial } from './scene-material.mjs';

const css = `:root[data-mm-software],:root[data-mm-phase]{--memento-edge-display:none}
@media (prefers-reduced-motion:no-preference) and (forced-colors:none){
@view-transition{navigation:auto}
.mm-weave{display:block;fill:none;stroke:none;position:fixed;inset:0;width:100%;height:100%;z-index:2147483647;pointer-events:none;overflow:hidden;view-transition-name:mm-material}
.mm-weave>canvas{display:block;width:100%;height:100%;position:absolute;inset:0;pointer-events:none}
.mm-weave .mm-seal,.mm-weave .mm-glow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none}
.mm-weave .mm-glow{background:radial-gradient(ellipse at center,rgba(251,159,68,.22),rgba(226,112,42,.075) 36%,transparent 69%)}
.mm-weave .mm-seal{overflow:visible;filter:drop-shadow(0 0 3px #f49b4c)}
::view-transition{pointer-events:none}
::view-transition-group(root){animation:mm-keep 12s step-end both}
@keyframes mm-keep{from,to{opacity:1}}
::view-transition-image-pair(root),::view-transition-image-pair(mm-material){isolation:isolate}
::view-transition-old(root),::view-transition-new(root),::view-transition-new(mm-material){animation:none;mix-blend-mode:normal;width:100%;height:100%}
::view-transition-old(root){z-index:1;opacity:1}
:root[data-mm-feed="new"]::view-transition-old(root){opacity:0}
::view-transition-group(mm-material){animation:none;z-index:2;pointer-events:none}
::view-transition-new(mm-material){opacity:1}
:root[data-mm-phase="hold"] .mm-weave .mm-glow{animation:mm-ember 2.2s ease-in-out infinite alternate}
@keyframes mm-ember{from{opacity:.68}to{opacity:1}}
}
@media (prefers-reduced-motion:reduce),(forced-colors:active){.mm-weave{display:none!important}}`;

// Runs in the head of all six routes, before pagereveal and deferred page scripts.
function observeScene(createMaterial) {
  const root=document.documentElement;
  let width=-1,height=-1;
  function fit(){
    const w=root.clientWidth||innerWidth,h=Math.round(window.visualViewport?.height||innerHeight);
    if(w!==width){width=w;const wide=Math.max(0,Math.min(1,(w-768)/256));root.style.setProperty('--layout-wide',String(wide));root.style.setProperty('--board-ratio',String(1+wide));}
    if(h!==height){height=h;root.style.setProperty('--memento-nav-height',h+'px');}
  }
  fit();window.addEventListener('resize',fit,{passive:true});window.visualViewport?.addEventListener('resize',fit,{passive:true});
  window.mementoGo=href=>location.assign(new URL(href,location.href).href);
  if(window.top!==window)return;
  const motion=matchMedia('(prefers-reduced-motion:no-preference) and (forced-colors:none)');
  try{
    if(sessionStorage.getItem('memento.artwork.software')==='1' && !['low','medium','high'].includes(new URL(location.href).searchParams.get('vfx')))root.setAttribute('data-mm-software','');
  }catch{}
  const sections=new Set(['/','/studio','/memento','/services','/projects','/levelup','/start']);
  const path=url=>url.pathname.replace(/\/+$/,'')||'/';
  const key='memento.weave.v1', gather=740, rest=230, unfold=840;
  let session=null,pending='';
  function crossing(source,dest){
    if(!source || !dest)return false;
    try{const a=new URL(source,location.href),b=new URL(dest,location.href);
      return a.origin===location.origin && b.origin===a.origin && path(a)!==path(b) && sections.has(path(a)) && sections.has(path(b));
    }catch{return false;}
  }
  const mark=name=>performance.mark?.('memento:'+name);
  const frames=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  function sampledBoxes(){
    const nav=document.querySelector('memento-nav')?.shadowRoot;
    const boxes=[];
    function take(elements,limit){
      for(const el of elements){
        const r=el.getBoundingClientRect();
        const l=Math.max(0,r.left),t=Math.max(0,r.top),w=Math.min(width,r.right)-l,h=Math.min(height,r.bottom)-t;
        if(w<12 || h<8 || getComputedStyle(el).visibility==='hidden')continue;
        boxes.push([l/width,t/height,w/width,h/height].map(n=>Math.round(n*1000)/1000));
        if(--limit===0)break;
      }
    }
    take(document.querySelectorAll('main h1,main h2,main h3,#hub .card[data-slot="active"] h2'),6);
    take(document.querySelectorAll('main [data-vfx="card"],.project-tile,.bundle-card,#hub .card:not([hidden]),#experience canvas'),6);
    if(nav)take(nav.querySelectorAll('a'),6);
    return boxes;
  }
  function stop(){
    const s=session;session=null;pending='';
    if(!s)return;
    cancelAnimationFrame(s.raf);clearTimeout(s.watch);s.abort.abort();s.cover?.();s.material.remove();
    if(s.transition){s.transition.ready.catch(()=>{});s.transition.skipTransition();}
    delete root.dataset.mmPhase;delete root.dataset.mmFeed;
    window.mementoSceneCovered=undefined;
    document.dispatchEvent(new Event('memento:surface-visibility'));
  }
  function start(boxes,p){
    const material=createMaterial();material.sources(boxes);
    const s={material,boxes,progress:p,raf:0,watch:0,heldAt:0,abort:new AbortController()};
    session=s;material.draw(p);return s;
  }
  function step(s,target,duration,done){
    cancelAnimationFrame(s.raf);
    const from=s.progress,at=performance.now(),length=Math.abs(target-from)*duration;
    const frame=now=>{
      if(session!==s)return;
      const t=length?Math.min(1,Math.max(0,(now-at)/length)):1;
      s.progress=from+(target-from)*t;s.material.draw(s.progress);
      if(t<1)s.raf=requestAnimationFrame(frame);else{ s.raf=0;done(); }
    };
    frame(at);
  }
  function hold(s){
    if(!s.heldAt)s.heldAt=Date.now();
    root.dataset.mmPhase='hold';s.cover?.();mark('emblem');
  }
  function outgoing(to){
    if(!crossing(location.href,to))return;
    if(pending===to)return;
    const p=session?.progress||0;stop();pending=new URL(to,location.href).href;
    if(!motion.matches || !document.body)return;
    const s=start(sampledBoxes(),p);
    root.dataset.mmPhase='gather';mark('depart');step(s,1,gather,()=>hold(s));
    // A canceled or broken network request must also leave the original links usable.
    s.watch=setTimeout(()=>{if(session===s)stop();},8000);
  }
  window.mementoGo=href=>{
    const target=new URL(href,location.href).href;
    if(target===pending || target===location.href)return;
    if(!window.navigation)outgoing(target);
    location.assign(target);
  };
  window.addEventListener('click',e=>{
    if(e.button || e.ctrlKey || e.shiftKey || e.metaKey || e.altKey || e.defaultPrevented)return;
    const link=e.composedPath().find(node=>node instanceof HTMLAnchorElement);
    if(!link || link.hasAttribute('download') || !['','_self','_top','_parent'].includes(link.target))return;
    const dock=link.getRootNode()?.host?.localName==='memento-nav';
    if(link.href===pending || (dock && link.href===location.href)){e.preventDefault();e.stopPropagation();}
  },true);
  if(window.navigation){
    window.navigation.addEventListener('navigate',e=>{
      if(e.defaultPrevented || e.hashChange || e.navigationType==='reload' || e.downloadRequest!=null || e.formData)return;
      if(!crossing(location.href,e.destination.url)){stop();return;}
      outgoing(e.destination.url);
      const current=session;e.signal.addEventListener('abort',()=>{if(current===session)stop();},{once:true});
    });
    window.navigation.addEventListener('navigateerror',stop);
  }else window.addEventListener('click',e=>{
    const a=e.composedPath().find(n=>n instanceof HTMLAnchorElement);
    if(a && !e.defaultPrevented && !e.button && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !a.hasAttribute('download') && ['','_self','_top','_parent'].includes(a.target))outgoing(a.href);
  });
  function remember(dest){
    if(!crossing(location.href,dest))return;
    const s=session;
    try{sessionStorage.setItem(key,JSON.stringify({to:dest,time:Date.now(),p:s?.progress||0,held:s?.heldAt||0,boxes:s?.boxes||[]}));}catch{}
  }
  window.addEventListener('pageswap',e=>{
    e.viewTransition?.ready.catch(()=>{});
    const dest=e.activation?.entry?.url||pending;
    remember(dest);
    // When the whole emblem is already visible there are no old page pixels to capture.
    if(crossing(location.href,dest) && session?.progress===1)e.viewTransition?.skipTransition();
    stop();
  });
  window.addEventListener('pagehide',()=>{if(pending)remember(pending);stop();});

  // Only media that will actually occupy the first viewport participates in the handoff.
  async function firstView(signal){
    if(document.readyState==='loading')await new Promise(r=>document.addEventListener('DOMContentLoaded',r,{once:true,signal}));
    if(signal.aborted)return;
    await frames();
    const images=[];
    for(const img of document.images){
      if(!img.currentSrc && !img.getAttribute('src'))continue;
      const r=img.getBoundingClientRect();
      if(r.width<38 || r.height<30 || r.right<=0 || r.bottom<=0 || r.left>=width || r.top>=height || getComputedStyle(img).visibility==='hidden')continue;
      if(images.some(other=>other.currentSrc && other.currentSrc===img.currentSrc))continue;
      images.push(img);if(images.length===6)break;
    }
    // Studio's first exterior camera frame is inline CSS while the interactive model streams.
    const poster=document.querySelector('#experience #loading');
    if(poster && !document.body.classList.contains('ready')){
      const url=getComputedStyle(poster,'::before').backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);
      if(url){const img=new Image();img.src=url[1];images.push(img);}
    }
    // Budget unresponsive network resources, never count a slow compositor frame as a loading failure.
    const decoded=Promise.allSettled([document.fonts?.load('400 16px Inter'),...images.map(img=>img.decode())]);
    let status=await bounded(decoded,6000,signal);
    if(status==='timeout' && images.every(img=>img.complete && img.naturalWidth))status=await bounded(decoded,450,signal);
    if(!signal.aborted)await frames();
    return status;
  }
  function bounded(promise,ms,signal){
    return new Promise(resolve=>{
      const finish=value=>{clearTimeout(timer);signal.removeEventListener('abort',abort);resolve(value);};
      const abort=()=>finish('canceled');
      const timer=setTimeout(()=>finish('timeout'),ms);
      signal.addEventListener('abort',abort,{once:true});
      promise.then(()=>finish('ready'),()=>finish('error'));
      if(signal.aborted)abort();
    });
  }
  async function warmFrame(s){
    const studio=root.dataset.mementoNative==='studio';
    const target=studio?document.body:root;
    const ready=()=>studio?target.classList.contains('ready'):
      target.classList.contains('vfx-live') || target.classList.contains('vfx-off') || document.body.dataset.renderer==='fallback';
    if(ready())return;
    let observer;
    const change=new Promise(resolve=>{
      observer=new MutationObserver(()=>{if(ready())resolve();});
      observer.observe(target,{attributes:true,attributeFilter:['class']});
    });
    try{await bounded(change,studio?980:400,s.abort.signal);}finally{observer.disconnect();}
  }
  async function reveal(transition){
    stop();
    const activation=window.navigation?.activation;
    const type=activation?.navigationType || performance.getEntriesByType('navigation')[0]?.type;
    let record;try{record=JSON.parse(sessionStorage.getItem(key));sessionStorage.removeItem(key);}catch{}
    const matched=record?.to===location.href && Date.now()-record.time<20000;
    const from=activation?activation.from?.url:window.history?.length>1?document.referrer:'';
    if(type==='reload' || !(matched||crossing(from,location.href)) || !motion.matches || !document.body){
      if(transition){transition.ready.catch(()=>{});transition.skipTransition();}return;
    }
    root.dataset.mementoArrival='page';
    const s=start(matched?record.boxes:sampledBoxes(),transition?(matched?record.p:0):1);
    s.heldAt=matched?record.held:0;s.transition=transition;
    window.mementoSceneCovered=new Promise(r=>{s.cover=r;});
    const signal=s.abort.signal;
    root.dataset.mmPhase='gather';root.dataset.mmFeed='old';
    const view=firstView(signal).then(status=>{if(!signal.aborted)mark(status==='timeout'?'view-fallback':'view-ready');});
    try{
      if(transition){
        try{await transition.ready;}catch{s.progress=1;s.material.draw(1);s.transition=null;}
      }
      if(session!==s)return;
      const covered=window.mementoSceneCovered;
      step(s,1,gather,()=>hold(s));await covered;
      if(session!==s)return;
      root.dataset.mmFeed='new';
      // Once the emblem covers every pixel the outgoing snapshot has done its job.
      // Let the incoming document paint, decode images and warm its renderer normally.
      if(s.transition){s.transition.skipTransition();s.transition=null;}
      const dwell=Math.max(0,rest-(Date.now()-s.heldAt));
      await Promise.all([view,warmFrame(s),new Promise(r=>setTimeout(r,dwell))]);
      if(session!==s)return;
      s.material.sources(sampledBoxes());s.material.draw(1);
      await frames();if(session!==s)return;
      root.dataset.mmPhase='unfold';mark('open');
      step(s,0,unfold,()=>{mark('done');stop();});
    }catch{if(session===s)stop();}
  }
  if('onpagereveal' in window)window.addEventListener('pagereveal',e=>reveal(e.viewTransition));
  else window.addEventListener('pageshow',()=>reveal(null));
  window.addEventListener('keydown',e=>{if(e.key==='Escape')stop();});
  motion.addEventListener('change',stop);
}
export const sceneHead=`<style id="memento-scene-shape">${css}</style><script id="memento-scene-navigation">(${observeScene.toString()})(${createMaterial.toString()})</script>`;
