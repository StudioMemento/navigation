// Publish layout variables once per viewport change. Content mutations require no observer.
(() => {
  const root = document.documentElement;
  let previousWidth = -1;
  let previousHeight = -1;
  function fit() {
    const width = root.clientWidth;
    const height = Math.round(window.visualViewport?.height || window.innerHeight);
    if (width !== previousWidth) {
      previousWidth = width;
      const wide = Math.max(0, Math.min(1, (width - 768) / 256));
      root.style.setProperty('--layout-wide', String(wide));
      root.style.setProperty('--board-ratio', String(1 + wide));
    }
    if (height !== previousHeight) {
      previousHeight = height;
      root.style.setProperty('--memento-nav-height', height + 'px');
    }
  }
  fit();
  window.addEventListener('resize', fit, {passive:true});
  window.visualViewport?.addEventListener('resize', fit, {passive:true});
})();

// Register before first paint, including on a document restored from the history cache.
(() => {
  const root=document.documentElement;
  const quiet=matchMedia('(prefers-reduced-motion: reduce), (forced-colors: active)');
  const routes=new Set(['/','/studio','/memento','/services','/projects','/levelup','/start']);
  const route=path=>path.replace(/\/+$/,'')||'/';
  const sameSite=url=>url.origin===location.origin && routes.has(route(url.pathname));
  let engine,current,incoming,pending,parkTimer;
  const module=()=>engine??=(import('/memento-ui/scene.mjs').catch(error=>{engine=undefined;throw error;}));
  function settle(){incoming?.resolve();incoming=undefined;}
  function stop(){
    current?.abort();current=undefined;pending=undefined;
    clearTimeout(parkTimer);root.removeAttribute('data-memento-parked');settle();
  }
  async function animate(phase,historyTransition){
    current?.abort();const task=new AbortController();current=task;
    // Native navigation must still finish if a shader, a stylesheet, a frame or the module stalls.
    const timer=setTimeout(()=>task.abort(),phase==='pair'?2100:1250);
    const cancelled=new Promise(resolve=>task.signal.addEventListener('abort',resolve,{once:true}));
    try{await Promise.race([module().then(m=>m.playScene(phase,task.signal,historyTransition)),cancelled]);}
    catch{historyTransition?.skipTransition();}
    finally{clearTimeout(timer);if(current===task)current=undefined;}
  }
  function arrival(restored=false){
    const activation=window.navigation?.activation;
    const type=restored?'traverse':activation?.navigationType||performance.getEntriesByType('navigation')[0]?.type;
    const history=type==='traverse'||type==='back_forward';
    if(type==='reload'||!sameSite(new URL(location.href)))return;
    const previous=activation?.from?.url||(!history&&document.referrer);
    if(previous){const from=new URL(previous);if(!sameSite(from)||route(from.pathname)===route(location.pathname))return;}
    else if(!history)return;
    const direction=history&&activation?.from?.index>activation?.entry?.index?'back':'forward';
    root.dataset.mementoArrival=direction;
    if(quiet.matches)return;
    let resolve;window.mementoPageReveal=new Promise(done=>{resolve=done;});
    incoming={history,resolve,started:false};
    // Native history captures the uncovered destination. Clicks carry the same icon across documents.
    if(!history||!('onpagereveal' in window))root.setAttribute('data-memento-parked','');
  }
  function enter(transition){
    const run=incoming;if(!run||run.started||document.hidden)return;
    run.started=true;
    if(!transition)root.setAttribute('data-memento-parked','');
    const launch=()=>{
      if(incoming!==run)return;
      if(quiet.matches){stop();return;}
      void animate(transition?'pair':'in',transition).finally(()=>{
        if(incoming===run){root.removeAttribute('data-memento-parked');settle();}
      });
    };
    if(document.readyState==='loading'&&!transition)document.addEventListener('DOMContentLoaded',launch,{once:true});
    else launch();
  }
  window.addEventListener('pagereveal',event=>{
    if(!incoming && window.navigation?.activation?.navigationType==='traverse')arrival(true);
    if(event.viewTransition && incoming?.history && !quiet.matches){enter(event.viewTransition);}
    else {event.viewTransition?.skipTransition();enter();}
  });
  window.addEventListener('pageshow',event=>{
    if(event.persisted && !incoming)arrival(true);
    enter();
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)enter();});
  function follow(url){
    location.assign(url.href);
    // A cancelled or failed browser navigation must release the original page.
    clearTimeout(parkTimer);parkTimer=setTimeout(stop,4000);
  }
  window.mementoGo=value=>{
    const url=new URL(value,location.href);
    if(!sameSite(url)||route(url.pathname)===route(location.pathname)||quiet.matches||document.hidden){location.assign(url.href);return;}
    if(pending){pending.url=url;return;}
    stop();const next={url};pending=next;
    const hint=document.createElement('link');hint.rel='prefetch';hint.as='document';hint.href=url.href.split('#')[0];document.head.append(hint);
    void animate('out').then(()=>{
      hint.remove();if(pending!==next)return;
      root.setAttribute('data-memento-parked','');follow(next.url);
    });
  };
  window.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||quiet.matches)return;
    const a=event.composedPath().find(node=>node instanceof HTMLAnchorElement);
    if(!a||a.hasAttribute('download')||!['','_self','_top','_parent'].includes(a.target)||window.top!==window)return;
    const url=new URL(a.href);if(!sameSite(url)||route(url.pathname)===route(location.pathname))return;
    event.preventDefault();window.mementoGo(url.href);
  });
  window.addEventListener('pageswap',event=>{if(pending||quiet.matches||event.activation?.navigationType!=='traverse')event.viewTransition?.skipTransition();});
  window.addEventListener('pagehide',stop);
  quiet.addEventListener('change',()=>{if(quiet.matches){const next=pending?.url;stop();if(next)follow(next);}});
  arrival();
  if(incoming&&!incoming.history)enter();
  if(incoming?.history&&!('onpagereveal' in window))enter();
  if(!quiet.matches){const warm=()=>module().then(m=>m.prepareSymbol()).catch(()=>{});if(incoming)warm();else window.addEventListener('pageshow',warm,{once:true});}
})();
