import {SETTINGS,PAGES} from './config.mjs';
import {embedAddress,validEnvelope,validLegacyEnvelope,findPage} from './logic.mjs';
export function createViewer({onNavigate,onReturn}){
  const section=document.querySelector('#experience'),slot=document.querySelector('#frame-slot'),frameBox=document.querySelector('#page-frame'),placeholder=document.querySelector('#viewer-placeholder'),loadingLabel=document.querySelector('#loading-label'),recovery=document.querySelector('#load-recovery');
  const expand=document.querySelector('#expand'),close=document.querySelector('#close-expand');
  let record=null,deadline=0,handshakeTimers=[],visible=false,expanded=false,returnFocus=null,previousOverflow='',lastRequest=null;
  const controller=new AbortController(),{signal}=controller;
  function send(type,payload={}){if(record)record.source?.postMessage({channel:SETTINGS.bridgeChannel,version:SETTINGS.bridgeVersion,station:record.page.id,sessionId:record.sessionId,type,payload},record.origin);}
  function sendLegacy(type,payload={}){if(record)record.source?.postMessage({channel:'memento:tide',version:1,stageId:record.stageId,sessionId:record.sessionId,type,payload},record.origin);}
  function visibility(){const active=!document.hidden&&(visible||expanded);send('VISIBILITY',{active});if(record?.legacyReady)sendLegacy('VISIBILITY',{active:active&&!record.ready});}
  function handshake(){send('INIT',{mode:'slider'});}
  function clearTimers(){clearTimeout(deadline);handshakeTimers.forEach(clearTimeout);handshakeTimers=[];}
  function load(page,query='',anchor='',force=false){
    const address=embedAddress(page,query,anchor);
    if(record?.address===address&&!force)return;
    lastRequest={page,query,anchor};send('VISIBILITY',{active:false});sendLegacy('VISIBILITY',{active:false});clearTimers();
    document.querySelector('#viewer-label').textContent=page.label;
    document.querySelector('#viewer-eyebrow').textContent=page.eyebrow;
    for(const id of ['direct-link','new-tab-link','recovery-link'])document.getElementById(id).href=page.publicURL+(query?'?'+query:'')+anchor;
    frameBox.setAttribute('aria-busy','true');placeholder.classList.remove('is-hidden');recovery.hidden=true;loadingLabel.textContent=`Un momento, entriamo in ${page.label}.`;
    slot.replaceChildren(); // A single iframe: no hidden running scenes or duplicated pages.
    const frame=document.createElement('iframe');frame.title=`${page.label} — pagina Memento`;frame.allow='fullscreen; autoplay';frame.setAttribute('allowfullscreen','');frame.referrerPolicy='strict-origin-when-cross-origin';frame.loading='eager';
    const sessionId=crypto.randomUUID?.()||`memento-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    frame.src=address;slot.append(frame);
    record={page,address,frame,source:frame.contentWindow,origin:new URL(page.embedURL).origin,sessionId,stageId:`s${String(PAGES.indexOf(page)+1).padStart(2,'0')}_${page.id}`,ready:false,legacyReady:false};
    const current=record;
    const reveal=()=>{if(record!==current)return;clearTimeout(deadline);frame.classList.add('is-loaded');frameBox.setAttribute('aria-busy','false');placeholder.classList.add('is-hidden');};
    current.reveal=reveal;
    frame.addEventListener('load',()=>{if(record!==current)return;reveal();handshake();handshakeTimers=[setTimeout(handshake,180),setTimeout(handshake,650),setTimeout(handshake,1400),setTimeout(()=>{if(record===current&&!current.ready&&!anchor)sendLegacy('INIT',{scrub:false});},850)];},{once:true});
    const failed=()=>{if(record!==current)return;frameBox.setAttribute('aria-busy','false');placeholder.classList.remove('is-hidden');loadingLabel.textContent='La pagina sta impiegando più tempo del previsto.';recovery.hidden=false;};
    frame.addEventListener('error',failed,{once:true});deadline=setTimeout(failed,SETTINGS.loadTimeoutMs);
  }
  window.addEventListener('message',event=>{
    if(validLegacyEnvelope(event,record)){
      if(event.data.type==='READY'){record.legacyReady=true;record.reveal();visibility();}
      else if(!record.ready&&event.data.type==='END')onReturn('end');
      else if(!record.ready&&event.data.type==='ESCAPE')onReturn('explicit');
      return;
    }
    if(!validEnvelope(event,record))return;
    const {type,payload}=event.data;
    if(type==='READY'){record.ready=true;record.reveal();visibility();}
    else if(type==='NAVIGATE'){
      const page=findPage(payload.id);if(page)onNavigate(page,payload);
    }else if(type==='RETURN')onReturn(payload.edge);
  },{signal});
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visibility();},{threshold:.01});intersection.observe(frameBox);
  document.addEventListener('visibilitychange',visibility,{signal});
  function openExpanded(){
    if(expanded)return;expanded=true;returnFocus=document.activeElement;previousOverflow=document.body.style.overflow;
    section.classList.add('is-expanded');section.setAttribute('role','dialog');section.setAttribute('aria-modal','true');section.setAttribute('aria-label','Pagina Memento — vista estesa');
    expand.hidden=true;close.hidden=false;expand.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';
    // Keep the iframe in place: moving it into a dialog would reload remote state.
    document.querySelector('#hub').inert=true;document.querySelector('footer').inert=true;const nav=document.querySelector('memento-nav');if(nav){nav.inert=true;nav.hidden=true;}
    close.focus();visibility();
  }
  function closeExpanded(){
    if(!expanded)return;expanded=false;section.classList.remove('is-expanded');section.removeAttribute('role');section.removeAttribute('aria-modal');section.setAttribute('aria-label','Pagina selezionata');expand.hidden=false;close.hidden=true;expand.setAttribute('aria-expanded','false');document.body.style.overflow=previousOverflow;
    document.querySelector('#hub').inert=false;document.querySelector('footer').inert=false;const nav=document.querySelector('memento-nav');if(nav){nav.inert=false;nav.hidden=false;}
    returnFocus?.focus({preventScroll:true});visibility();
  }
  expand.addEventListener('click',openExpanded,{signal});close.addEventListener('click',closeExpanded,{signal});
  document.querySelector('#retry').addEventListener('click',()=>{if(lastRequest)load(lastRequest.page,lastRequest.query,lastRequest.anchor,true);},{signal});
  document.addEventListener('keydown',event=>{
    if(!expanded)return;
    if(event.key==='Escape'){event.preventDefault();closeExpanded();}
    if(event.key==='Tab'){
      const stops=[...section.querySelectorAll('button:not([hidden]),a[href],iframe')].filter(el=>el.getClientRects().length);
      const first=stops[0],last=stops.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  },{signal});
  return {load,focus(){section.focus({preventScroll:true});send('FOCUS');},closeExpanded,get expanded(){return expanded;},destroy(){closeExpanded();clearTimers();controller.abort();intersection.disconnect();slot.replaceChildren();record=null;}};
}
