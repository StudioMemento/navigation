/** Swipe with one pointer; native vertical scroll and browser pinch zoom stay available. */
export function installSwipe(root,{canSwipe,onSwipe}) {
  let gesture=null,frame=0,suppressed=null,suppressUntil=0;
  function reset(suppress=false) {
    if(!gesture)return;
    const g=gesture;gesture=null;cancelAnimationFrame(frame);frame=0;
    g.surface.classList.remove('dragging');g.surface.style.removeProperty('--drag');
    if(g.surface.hasPointerCapture?.(g.pointer))g.surface.releasePointerCapture(g.pointer);
    if(suppress){suppressed=g.surface;suppressUntil=performance.now()+450;}
    return g;
  }
  root.addEventListener('pointerdown',event=>{
    if(!event.isPrimary){reset(true);return;}
    if(event.button!==0 || (window.visualViewport?.scale || 1)>1.01)return;
    if(event.target.closest('video,iframe,model-viewer,input,audio'))return;
    const surface=event.target.closest('.coverflow,.slider-stage,#media-content');
    if(!surface||!canSwipe(surface))return;
    reset();
    gesture={surface,pointer:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now(),horizontal:false,dx:0};
  },{passive:true});
  root.addEventListener('pointermove',event=>{
    if(!gesture||event.pointerId!==gesture.pointer)return;
    const g=gesture,dx=event.clientX-g.x,dy=event.clientY-g.y;
    if(!g.horizontal){
      if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){reset();return;}
      if(Math.abs(dx)<10||Math.abs(dx)<Math.abs(dy)*1.25)return;
      g.horizontal=true;g.surface.setPointerCapture(event.pointerId);g.surface.classList.add('dragging');
    }
    g.dx=dx;
    if(!frame)frame=requestAnimationFrame(()=>{
      frame=0;if(gesture!==g)return;
      const limit=g.surface.classList.contains('coverflow')?200:70;
      g.surface.style.setProperty('--drag',`${Math.max(-limit,Math.min(limit,g.dx*.55))}px`);
    });
  },{passive:true});
  function finish(event,cancel=false) {
    if(!gesture||event.pointerId!==gesture.pointer)return;
    const g=reset(gesture.horizontal);if(cancel||!g.horizontal)return;
    const dx=event.clientX-g.x,dy=event.clientY-g.y;
    const speed=Math.abs(dx)/Math.max(1,performance.now()-g.time);
    const threshold=Math.min(56,Math.max(32,g.surface.clientWidth*.1));
    if(Math.abs(dx)<Math.abs(dy)*1.15)return;
    if(Math.abs(dx)>=threshold||(Math.abs(dx)>22&&speed>.35))onSwipe(g.surface,dx<0?1:-1);
  }
  window.addEventListener('pointerup',event=>finish(event),{passive:true});
  window.addEventListener('pointercancel',event=>finish(event,true),{passive:true});
  root.addEventListener('lostpointercapture',event=>finish(event,true),{passive:true});
  window.addEventListener('blur',()=>reset());
  root.addEventListener('click',event=>{
    if(event.detail!==0&&performance.now()<suppressUntil&&suppressed?.contains(event.target)){
      event.preventDefault();event.stopPropagation();
    }
  },true);
}

/** Mouse/pen drag for thumbnail and chapter strips; touch uses native scrolling. */
export function installDragScroll(root) {
  let drag=null,suppressed=null,suppressUntil=0;
  root.addEventListener('pointerdown',event=>{
    if(event.pointerType==='touch'||event.button!==0||!event.isPrimary)return;
    const strip=event.target.closest('.slide-thumbs,.chapter-links');
    if(!strip||strip.scrollWidth<=strip.clientWidth)return;
    drag={strip,pointer:event.pointerId,x:event.clientX,y:event.clientY,left:strip.scrollLeft,active:false};
  });
  root.addEventListener('pointermove',event=>{
    if(!drag||event.pointerId!==drag.pointer)return;
    const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
    if(!drag.active){
      if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){drag=null;return;}
      if(Math.abs(dx)<8)return;
      drag.active=true;drag.strip.setPointerCapture(event.pointerId);drag.strip.classList.add('dragging');
    }
    drag.strip.scrollLeft=drag.left-dx;
  });
  function end(event) {
    if(!drag||event.pointerId!==drag.pointer)return;
    const g=drag;drag=null;g.strip.classList.remove('dragging');
    if(g.active){suppressed=g.strip;suppressUntil=performance.now()+400;}
    if(g.strip.hasPointerCapture?.(g.pointer))g.strip.releasePointerCapture(g.pointer);
  }
  window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
  root.addEventListener('lostpointercapture',end);
  root.addEventListener('click',event=>{
    if(event.detail!==0&&performance.now()<suppressUntil&&suppressed?.contains(event.target)){
      event.preventDefault();event.stopPropagation();
    }
  },true);
}
