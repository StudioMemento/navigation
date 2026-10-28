/* Memento Tide v011 — include in each external page, before </body>.
   Inactive standalone. No content, cookies or form values are transmitted. */
(()=>{
  if(window.parent===window)return;
  const script=document.currentScript;
  const allowed=(script?.dataset.tideParents||'').split(',').map(s=>s.trim()).filter(Boolean);
  let referrerOrigin;try{referrerOrigin=new URL(document.referrer).origin;}catch{return;}
  if(allowed.length&&!allowed.includes(referrerOrigin))return;
  const scrollSelector=script?.dataset.tideScrollRoot;
  const root=()=>scrollSelector?document.querySelector(scrollSelector):document.scrollingElement;
  let session=null,active=false,sentEnd=false,hasScrolled=false,activeAt=0,endTimer=null,lastTop=0,touchY=null,lastReport=0;
  function send(type,payload={}){if(session)parent.postMessage({...session,type,payload},referrerOrigin);}
  function metrics(){const el=root();if(!el)return null;return{top:el.scrollTop,viewport:el.clientHeight,height:el.scrollHeight};}
  function atEnd(){const m=metrics();return m&&m.top+m.viewport>=m.height-3;}
  function scheduleEnd(intent=false){
    clearTimeout(endTimer);
    if(!active||sentEnd||(!hasScrolled&&!intent)||!atEnd()||performance.now()-activeAt<700)return;
    endTimer=setTimeout(()=>{if(active&&!sentEnd&&atEnd()){sentEnd=true;send('END',{reason:'document-end'});}},260);
  }
  function reset(){
    clearTimeout(endTimer);sentEnd=false;hasScrolled=false;lastTop=0;
    const el=root();if(el)el.scrollTo({top:0,left:0,behavior:'instant'});
  }
  function canScrollInside(target,direction){
    const outer=root();for(let el=target instanceof Element?target:null;el&&el!==outer&&el!==document.body;el=el.parentElement){
      if(el.scrollHeight>el.clientHeight+2&&/(auto|scroll)/.test(getComputedStyle(el).overflowY)){
        if(direction>0&&el.scrollTop+el.clientHeight<el.scrollHeight-2)return true;
        if(direction<0&&el.scrollTop>0)return true;
      }
    }return false;
  }
  addEventListener('message',event=>{
    const d=event.data;
    if(event.source!==parent||event.origin!==referrerOrigin||d?.channel!=='memento:tide'||d.version!==1)return;
    if(d.type==='INIT'&&typeof d.sessionId==='string'&&d.sessionId.length<160&&/^s\d{2}_[a-z]+$/.test(d.stageId)){
      session={channel:d.channel,version:1,sessionId:d.sessionId,stageId:d.stageId};active=false;reset();send('READY',{supportsEnd:true});
    }else if(session&&d.sessionId===session.sessionId&&d.stageId===session.stageId&&d.type==='VISIBILITY'){
      const next=d.payload?.active===true;
      if(next&&!active){if(sentEnd)reset();activeAt=performance.now();}
      active=next;if(!active)clearTimeout(endTimer);
    }
  });
  addEventListener('scroll',()=>{
    if(!active)return;const m=metrics();if(!m)return;
    if(Math.abs(m.top-lastTop)>1)hasScrolled=true;lastTop=m.top;
    if(performance.now()-lastReport>200){lastReport=performance.now();send('SCROLL',m);}
    scheduleEnd();
  },{passive:true,capture:true});
  addEventListener('wheel',event=>{if(event.deltaY>12&&!canScrollInside(event.target,1))scheduleEnd(true);},{passive:true});
  addEventListener('touchstart',event=>{touchY=event.touches.length===1?event.touches[0].clientY:null;},{passive:true});
  addEventListener('touchend',event=>{if(touchY!==null&&event.changedTouches[0]&&touchY-event.changedTouches[0].clientY>40&&!canScrollInside(event.target,1))scheduleEnd(true);touchY=null;},{passive:true});
  addEventListener('keydown',event=>{
    if(event.defaultPrevented||event.target.closest?.('input,textarea,select,[contenteditable=true]'))return;
    if(event.key==='Escape'&&active){send('ESCAPE');return;}
    if(['PageDown','End','ArrowDown',' '].includes(event.key)&&!canScrollInside(event.target,1))scheduleEnd(true);
  });
  addEventListener('resize',()=>{clearTimeout(endTimer);});
})();
