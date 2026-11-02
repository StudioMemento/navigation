import {CHANNEL,VERSION,station,contentURL,sessionEnvelope,validMessage} from '../navigation/core.mjs';

export class EmbedController {
  constructor(mount,{onLoad=()=>{},onBridge=()=>{},onError=()=>{},onIntent=()=>{}}={}) {
    Object.assign(this,{mount,onLoad,onBridge,onError,onIntent,record:null});
    this.listener=event=>this.message(event);window.addEventListener('message',this.listener);
  }
  open(route) {
    this.destroyFrame();
    const s=station(route.id),iframe=document.createElement('iframe');
    iframe.className='page-frame';iframe.title=`${s.label} — Memento`;iframe.referrerPolicy='strict-origin-when-cross-origin';
    // Existing pages remain usable before the shared adapter is installed.
    // The adapter intercepts Memento links and keeps them in the hub once connected.
    iframe.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation');
    iframe.allow='fullscreen';iframe.setAttribute('allowfullscreen','');
    const r=this.record={id:s.id,origin:new URL(s.url).origin,source:null,sessionId:crypto.randomUUID(),iframe,loaded:false,bridge:null,active:false,timers:[],stageId:s.stageId};
    iframe.addEventListener('load',()=>{
      if(this.record!==r)return;
      r.source=iframe.contentWindow;r.loaded=true;this.onLoad(r);this.init(r);
      r.timers.push(setTimeout(()=>{if(this.record===r&&!r.bridge)this.init(r,true);},800));
      r.timers.push(setTimeout(()=>{if(this.record===r&&!r.bridge)this.onBridge(r);},2400));
    });
    iframe.addEventListener('error',()=>{if(this.record===r)this.onError(r);});
    r.timers.push(setTimeout(()=>{if(this.record===r&&!r.loaded)this.onError(r);},18000));
    iframe.src=contentURL(route);this.mount.replaceChildren(iframe);r.source=iframe.contentWindow;
    return r;
  }
  init(r,legacy=false) {
    if(this.record!==r)return;
    this.send('INIT',{hostNavigation:true},r);
    if(legacy&&!r.bridge)r.source?.postMessage({channel:'memento:tide',version:1,sessionId:r.sessionId,stageId:r.stageId,type:'INIT',payload:{scrub:true}},r.origin);
  }
  send(type,payload={},r=this.record){r?.source?.postMessage(sessionEnvelope(r.id,r.sessionId,type,payload),r.origin);}
  setActive(value) {
    const r=this.record;if(!r)return;r.active=value;
    this.send('VISIBILITY',{active:value});
    if(r.bridge==='legacy')r.source?.postMessage({channel:'memento:tide',version:1,sessionId:r.sessionId,stageId:r.stageId,type:'VISIBILITY',payload:{active:value,phase:'content'}},r.origin);
  }
  message(event) {
    const r=this.record,d=event.data;if(!r)return;
    if(validMessage(event,r)) {
      if(d.type==='READY'){r.bridge='v2';this.setActive(r.active);this.onBridge(r);}
      if(r.active&&d.type==='NAVIGATE'&&station(d.payload.id))this.onIntent({id:d.payload.id,view:'page',search:d.payload.search||'',hash:d.payload.hash||''});
      if(r.active&&d.type==='RETURN')this.onIntent({id:r.id,view:'world'});
      return;
    }
    if(r.bridge==='v2'||event.source!==r.source||event.origin!==r.origin||d?.channel!=='memento:tide'||d.version!==1||d.sessionId!==r.sessionId||d.stageId!==r.stageId)return;
    if(d.type==='READY'){r.bridge='legacy';this.setActive(r.active);this.onBridge(r);}
    if(r.active&&['END','ESCAPE'].includes(d.type))this.onIntent({id:r.id,view:'world'});
    if(r.active&&d.type==='INPUT'&&Number.isFinite(d.payload?.delta)&&Math.abs(d.payload.delta)>80&&['start','end'].includes(d.payload.boundary))this.onIntent({id:r.id,view:'world'});
  }
  destroyFrame(){
    const r=this.record;if(!r)return;this.setActive(false);r.timers.forEach(clearTimeout);r.iframe.remove();this.record=null;
  }
  destroy(){this.destroyFrame();window.removeEventListener('message',this.listener);}
}
