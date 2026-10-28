/* Memento Tide v012. Runs only when embedded; observes scrolling, never form data. */
(()=>{
  if(window.parent===window)return;
  const script=document.currentScript,selector=script?.dataset.tideScrollRoot;
  const endSelector=script?.dataset.tideEndSelector,resetSelector=script?.dataset.tideResetSelector,blockSelector=script?.dataset.tideBlockSelector,nextSelector=script?.dataset.tideNextSelector;
  const allowed=(script?.dataset.tideParents||'').split(',').map(s=>s.trim()).filter(Boolean);
  let origin;try{origin=new URL(document.referrer).origin;}catch{return;}
  if(allowed.length&&!allowed.includes(origin))return;
  const root=()=>selector?document.querySelector(selector):document.scrollingElement;
  const modal=()=>document.querySelector('dialog[open], [aria-modal="true"]:not([hidden])')||(blockSelector&&document.querySelector(blockSelector));
  const editing=target=>target?.closest?.('input,textarea,select,[contenteditable=true]');
  let session=null,active=false,sentEnd=false,activeAt=0,lastWheel=-Infinity,wheelEligible=false,debt=0,touch=null,pointerTouch=null,lastReport=-Infinity,virtualLock=0;
  function send(type,payload={}){if(session)parent.postMessage({...session,type,payload},origin);}
  function metrics(){const r=root();return r?{top:r.scrollTop,viewport:r.clientHeight,height:r.scrollHeight}:null;}
  function atEnd(){if(endSelector)return !!document.querySelector(endSelector);const m=metrics();return !!m&&m.viewport>0&&m.top+m.viewport>=m.height-3;}
  function ready(){return active&&!sentEnd&&performance.now()-activeAt>=700&&!modal();}
  function reset(){const r=root();if(r)r.scrollTo({top:0,left:0,behavior:'instant'});if(resetSelector)document.querySelector(resetSelector)?.click();sentEnd=false;debt=0;lastWheel=-Infinity;wheelEligible=false;touch=null;pointerTouch=null;}
  function finish(event){if(!ready()||!atEnd())return;sentEnd=true;event?.preventDefault?.();event?.stopImmediatePropagation?.();send('END',{reason:'continued-downward-input'});}
  function nestedCanScroll(target){
    for(let el=target instanceof Element?target:null;el&&el!==root()&&el!==document.body;el=el.parentElement){
      if(el.scrollHeight>el.clientHeight+2&&/(auto|scroll)/.test(getComputedStyle(el).overflowY)&&el.scrollTop+el.clientHeight<el.scrollHeight-2)return true;
    }return false;
  }
  addEventListener('message',event=>{
    const d=event.data;if(event.source!==parent||event.origin!==origin||d?.channel!=='memento:tide'||d.version!==1)return;
    if(d.type==='INIT'&&typeof d.sessionId==='string'&&d.sessionId.length<160&&/^s\d{2}_[a-z]+$/.test(d.stageId)){
      session={channel:d.channel,version:1,sessionId:d.sessionId,stageId:d.stageId};active=false;reset();send('READY',{bridgeVersion:'v012',supportsEnd:true,scrollRoot:selector||'document'});
    }else if(session&&d.sessionId===session.sessionId&&d.stageId===session.stageId&&d.type==='VISIBILITY'){
      const next=d.payload?.active===true;
      if(next&&!active){if(sentEnd)reset();activeAt=performance.now();lastWheel=-Infinity;debt=0;}
      active=next;if(!active){touch=null;wheelEligible=false;debt=0;}
    }
  });
  addEventListener('scroll',()=>{
    if(!active)return;const m=metrics();if(!m)return;
    if(performance.now()-lastReport>150){lastReport=performance.now();send('SCROLL',m);}
    // Reaching the last pixel is not an instruction to leave the page.
    if(!atEnd())wheelEligible=false;
  },{passive:true,capture:true});
  addEventListener('wheel',event=>{
    const now=performance.now(),fresh=now-lastWheel>220;
    if(fresh){wheelEligible=atEnd();debt=0;}lastWheel=now;
    if(!ready()||event.ctrlKey||editing(event.target)||Math.abs(event.deltaX||0)>Math.abs(event.deltaY)||event.deltaY<=0){debt=0;return;}
    if(nestedCanScroll(event.target)){wheelEligible=false;debt=0;return;}
    if(!atEnd()){
      wheelEligible=false;
      if(nextSelector&&fresh&&now>=virtualLock){document.querySelector(nextSelector)?.click();virtualLock=now+700;event.preventDefault();}
      debt=0;return;
    }
    if(now<virtualLock)return;
    if(!wheelEligible)return;
    debt+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?metrics().viewport:1);
    if(debt>=(endSelector?24:72))finish(event);
  },{passive:false,capture:true});
  addEventListener('touchstart',event=>{
    touch=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY,eligible:ready()&&atEnd()&&!nestedCanScroll(event.target)&&!editing(event.target)}:null;
  },{passive:true,capture:true});
  addEventListener('touchend',event=>{
    const p=event.changedTouches[0],start=touch;touch=null;if(!p||!start?.eligible)return;
    const dy=start.y-p.clientY,dx=Math.abs(start.x-p.clientX);
    if(dy>55&&dy>dx*1.2)finish(event);
  },{passive:false,capture:true});
  addEventListener('touchcancel',()=>{touch=null;},{passive:true});
  // Virtual pages such as Studio consume Pointer Events instead of native scroll.
  addEventListener('pointerdown',event=>{
    if(!endSelector||event.pointerType!=='touch')return;
    pointerTouch=event.isPrimary?{id:event.pointerId,x:event.clientX,y:event.clientY,eligible:ready()&&atEnd()&&!editing(event.target)}:null;
  },{passive:true,capture:true});
  addEventListener('pointerup',event=>{
    const start=pointerTouch;if(!start||event.pointerId!==start.id)return;pointerTouch=null;
    const dy=start.y-event.clientY,dx=Math.abs(start.x-event.clientX);
    if(start.eligible&&dy>55&&dy>dx*1.2){
      finish(event);
      if(sentEnd&&typeof PointerEvent!=='undefined')event.target?.dispatchEvent?.(new PointerEvent('pointercancel',{pointerId:event.pointerId,pointerType:'touch',bubbles:true}));
    }
  },{passive:false,capture:true});
  addEventListener('pointercancel',()=>{pointerTouch=null;},{passive:true,capture:true});
  addEventListener('keydown',event=>{
    if(!active||modal()||editing(event.target)||event.defaultPrevented)return;
    if(event.key==='Escape'){send('ESCAPE');return;}
    if(!event.repeat&&!event.shiftKey&&['PageDown','End','ArrowDown',' '].includes(event.key)&&!nestedCanScroll(event.target))finish(event);
  },{capture:true});
})();
