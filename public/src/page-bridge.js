/* Same-origin adapter for the four preserved page snapshots. */
(()=>{
  const session=new URLSearchParams(location.search).get('sessionId');
  if(parent===window||!session)return;
  const slug=document.currentScript?.dataset.page||(location.pathname.startsWith('/catalog')?'services':''),channel='memento:carbon-preview',origin=location.origin;
  const send=(type,payload={})=>parent.postMessage({channel,session,type,payload},origin);
  const selector={services:'.service-grid a',projects:'#project-grid .project-tile',levelup:'.showcase-card',start:'#mm-email-project'}[slug];
  let ready=false,active=false,measurement=null,metricsTimer=0;const imageErrors=new Set();
  const metrics=()=>{
    const resources=performance.getEntriesByType('resource'),loaded=[...document.images].filter(i=>i.currentSrc);
    return {title:document.title,width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,
      cards:document.querySelectorAll(selector||'h1').length,loadedImages:loaded.filter(i=>i.naturalWidth).length,brokenImages:[...imageErrors],resources:resources.length,
      transferBytes:resources.reduce((s,x)=>s+x.transferSize,0),encodedBytes:resources.reduce((s,x)=>s+x.encodedBodySize,0),externalRequests:resources.filter(x=>/^https?:/.test(x.name)&&new URL(x.name).origin!==origin).map(x=>x.name),measurement};
  };
  const viewport=()=>{document.documentElement.style.setProperty('--tide-vh',innerHeight/100+'px');document.documentElement.style.setProperty('--tide-viewport-height',innerHeight+'px');};
  function check(){if(!ready&&document.querySelector(selector||'h1')){ready=true;send('READY',metrics());observer.disconnect();}}
  const observer=new MutationObserver(check);observer.observe(document.documentElement,{childList:true,subtree:true});
  const begin=()=>{
    document.documentElement.dataset.preview='true';document.body.dataset.previewPage=slug;viewport();
    const footer=document.createElement('footer');footer.className='preview-exit';footer.innerHTML='<a id="preview-return" href="/#'+slug+'">Torna alle torri <span aria-hidden="true">↑</span></a>';
    (document.querySelector(slug==='projects'?'#catalogue':'main')||document.body).append(footer);
    document.fonts.ready.then(check);check();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',begin,{once:true});else begin();
  addEventListener('resize',()=>{viewport();if(active)send('METRICS',metrics());});
  document.addEventListener('load',e=>{if(e.target.tagName==='IMG'){imageErrors.delete(e.target.currentSrc);clearTimeout(metricsTimer);metricsTimer=setTimeout(()=>send('METRICS',metrics()),600);}},true);
  document.addEventListener('error',e=>{if(e.target.tagName==='IMG'){imageErrors.add(e.target.currentSrc||e.target.src);send('METRICS',metrics());}},true);
  addEventListener('message',e=>{
    const d=e.data;if(e.source!==parent||e.origin!==origin||d?.channel!==channel||d.session!==session)return;
    if(d.type==='VISIBILITY'){
      active=Boolean(d.payload.active);document.body.inert=!active;window.__TIDE_VISIBLE__=active;document.documentElement.dataset.previewActive=String(active);
      if(!active)document.querySelectorAll('video,audio').forEach(v=>v.pause());
      if(active&&d.payload.focus){const h=document.querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}}
      document.dispatchEvent(new Event('memento:overlay-change'));setTimeout(()=>send('METRICS',metrics()),1200);
    }
    if(d.type==='MEASURE'){
      const start=performance.now(),times=[];let previous=null;
      function frame(t){if(!active)return;if(previous!==null)times.push(t-previous);previous=t;if(t-start<12000){requestAnimationFrame(frame);return;}
        const sorted=[...times].sort((a,b)=>a-b);measurement={seconds:(t-start)/1000,frames:times.length,meanFps:1000*times.length/times.reduce((a,b)=>a+b,0),medianFrameMs:sorted[Math.floor(sorted.length*.5)],p95FrameMs:sorted[Math.floor(sorted.length*.95)]};send('METRICS',metrics());}
      requestAnimationFrame(frame);
    }
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')){e.preventDefault();send('EXIT');}});
  function destination(a){
    const u=new URL(a.href),hosts={'mementoservizi.vercel.app':'services','mementoportfolio.vercel.app':'projects','mementolevelup.vercel.app':'levelup','mementostart.vercel.app':'start'};
    if(hosts[u.hostname])return hosts[u.hostname];
    if(['mementonav.vercel.app','mementostudio.it','www.mementostudio.it','mementostudio.vercel.app'].includes(u.hostname))return ['services','projects','levelup','start'].find(s=>u.pathname.split('/')[1]===s)||'exit';
    if(u.origin===origin&&/^\/(services|projects|levelup|start)\/?$/.test(u.pathname))return u.pathname.split('/')[1];
    return null;
  }
  document.addEventListener('click',e=>{
    const a=e.target.closest('a');if(!a)return;const next=destination(a);
    if(a.id==='preview-return'||a.matches('.home-action')||next){e.preventDefault();e.stopImmediatePropagation();send(next&&next!=='exit'?'NAVIGATE':'EXIT',{station:next});return;}
    if(/^https?:/.test(a.href)&&new URL(a.href).origin!==origin){a.target='_blank';a.rel='noopener noreferrer';}
  },true);
  addEventListener('error',e=>{if(e.message)send('ERROR',{message:e.message});});
  addEventListener('unhandledrejection',e=>send('ERROR',{message:String(e.reason?.message||e.reason)}));
  setTimeout(()=>{if(!ready)send('ERROR',{message:'La pagina non ha completato il caricamento.'});},20000);
})();
