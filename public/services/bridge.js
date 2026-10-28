/* Local-only adapter around the unchanged published Services catalog. */
(() => {
  'use strict';
  const sessionId=new URLSearchParams(location.search).get('sessionId');
  if(parent===window||!sessionId){window.__TIDE_VISIBLE__=true;return;}
  const origin=location.origin, stageId='s01_services';
  const abort=new AbortController();let ready=false,lastHeight=0,resizeTimer=0;
  window.__TIDE_VISIBLE__=false;
  const send=(type,payload={})=>parent.postMessage({channel:'memento:tide',version:1,sessionId,stageId,type,payload},origin);
  function resize(){
    clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{
      const main=document.getElementById('memento-catalogo');
      const height=Math.ceil(main?.getBoundingClientRect().height || 0);
      if(height>200 && height<100000 && Math.abs(height-lastHeight)>2){lastHeight=height;send('RESIZE',{height});}
    },70);
  }
  function viewport(payload){
    const height=Math.max(240,Math.min(2500,Number(payload.height)||800));
    document.documentElement.style.setProperty('--tide-vh',height/100+'px');
    document.documentElement.style.setProperty('--tide-viewport-height',height+'px');
    document.documentElement.style.setProperty('--tide-visible-top',Math.max(0,-Number(payload.relativeTop||0))+'px');
    resize();
  }
  window.addEventListener('message',event=>{
    const d=event.data;
    if(event.origin!==origin||event.source!==parent||!d||d.channel!=='memento:tide'||d.version!==1||d.sessionId!==sessionId||d.stageId!==stageId||!d.payload) return;
    if(d.type==='INIT'||d.type==='VIEWPORT') viewport(d.payload);
    if(d.type==='INIT'&&ready) send('READY',{height:lastHeight,source:'published_services_local_copy',catalogueCards:document.querySelectorAll('.service-grid a').length,heroImageReady:Boolean(document.querySelector('.hero-visual')?.naturalWidth)});
    if(d.type==='VISIBILITY'){
      window.__TIDE_VISIBLE__=Boolean(d.payload.active);document.body.inert=!window.__TIDE_VISIBLE__;
      if(!window.__TIDE_VISIBLE__) document.querySelectorAll('video,audio').forEach(media=>media.pause());
      if(d.payload.focus){const title=document.querySelector('h1');title?.setAttribute('tabindex','-1');title?.focus({preventScroll:true});}
    }
  },{signal:abort.signal});
  const nativeScrollIntoView=Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView=function(options){
    if(this.closest('#memento-catalogo')&&!this.closest('dialog')) {
      send('SCROLL_REQUEST',{offset:this.getBoundingClientRect().top+window.scrollY});return;
    }
    return nativeScrollIntoView.call(this,options);
  };
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!document.querySelector('dialog[open]')) send('ESCAPE',{});
  },{signal:abort.signal});
  window.addEventListener('error',event=>send('CONTENT_ERROR',{message:String(event.message||'Content resource failed').slice(0,240)}),{signal:abort.signal});
  const initialHeight=Number(new URLSearchParams(location.search).get('viewportHeight'))||800;
  viewport({height:initialHeight,relativeTop:initialHeight});
  document.body.inert=true;
  const observer=new ResizeObserver(resize);observer.observe(document.getElementById('memento-catalogo'));
  if(typeof MementoCarousel!=='undefined') {
    const original=MementoCarousel.prototype.frame;
    MementoCarousel.prototype.frame=function(time){if(!window.__TIDE_VISIBLE__){this.raf=0;return;}return original.call(this,time);};
  }
  const fontReady=Promise.race([document.fonts?.ready || Promise.resolve(),new Promise(resolve=>setTimeout(resolve,4500))]);
  const hero=document.querySelector('.hero-visual');
  const heroReady=!hero||hero.complete?Promise.resolve():new Promise(resolve=>{
    hero.addEventListener('load',resolve,{once:true});hero.addEventListener('error',resolve,{once:true});setTimeout(resolve,4500);
  });
  Promise.all([fontReady,heroReady]).then(()=>requestAnimationFrame(()=>{
    const catalogueCards=document.querySelectorAll('.service-grid a').length;
    if(!catalogueCards||!document.querySelector('.hero-card')){send('CONTENT_ERROR',{message:'Catalog initialization did not produce the real service cards'});return;}
    ready=true;resize();send('READY',{height:Math.ceil(document.getElementById('memento-catalogo').getBoundingClientRect().height),source:'published_services_local_copy',heroImageReady:Boolean(hero?.complete&&hero?.naturalWidth),catalogueCards});
  }));
  window.addEventListener('pagehide',()=>{observer.disconnect();abort.abort();clearTimeout(resizeTimer);},{once:true});
})();
