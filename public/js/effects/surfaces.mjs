import { edgeLight } from './edge-light.mjs';

// One delegated input stream also covers content inserted by carousels, filters and dialogs.
export function mountSurfaces() {
  const edge=edgeLight(), forced=matchMedia('(forced-colors:active)');
  const localFilter = new URL(location.href);
  localFilter.hash='mm-ink-emission';
  const soft=document.querySelector('.mm-emission-soft'), core=document.querySelector('.mm-emission-core');
  let pointer=null, keyboard=null, ink=null, em=0, frame=0, touchTimer=0;
  function clearInk() {
    if (ink) {
      ink.removeAttribute('data-lit');
      for (const prop of ['--light-x','--light-y','--ink-em','--ink-filter']) ink.style.removeProperty(prop);
    }
    ink=null;
  }
  function illuminate(element, point) {
    if (element!==ink) {
      clearInk();
      if (!element) return;
      ink=element;
      const sample=element.querySelector('.hero-line,.explore-line') || element;
      em=parseFloat(getComputedStyle(sample).fontSize)||16;
      ink.style.setProperty('--ink-em',em+'px');
      ink.style.setProperty('--ink-filter',`url("${localFilter.href}")`);
      soft.setAttribute('stdDeviation',Math.min(18,Math.max(1.3,em*.073)).toFixed(2));
      core.setAttribute('stdDeviation',Math.min(6,Math.max(.7,em*.024)).toFixed(2));
      ink.setAttribute('data-lit','');
    }
    if (!ink) return;
    const box=ink.getBoundingClientRect();
    const relative=(v,start,length)=>Math.max(0,Math.min(100,100*(v-start)/Math.max(1,length))).toFixed(1)+'%';
    ink.style.setProperty('--light-x',relative(point.x,box.left,box.width));
    ink.style.setProperty('--light-y',relative(point.y,box.top,box.height));
  }
  function paint() {
    frame=0;
    if ((!pointer && !keyboard) || document.hidden || forced.matches) {clearInk();edge.clear();return;}
    const dialog=document.documentElement.hasAttribute('data-mm-modal') ? document.querySelector('dialog[open]') : null;
    const target=keyboard || document.elementFromPoint(pointer.x,pointer.y);
    if (!target || target.closest('.mm-header,.mm-dock') || (dialog && !dialog.contains(target))) {clearInk();edge.clear();return;}
    let title=target.closest('.mm-type');
    const card=target.closest('.mm-tab');
    let edgePoint=pointer, typePoint=pointer;
    if (keyboard) {
      const b=(card||target).getBoundingClientRect();
      edgePoint={x:b.left+b.width*.28,y:b.bottom-1};
      title=title || target.querySelector('.mm-type');
      const t=(title||target).getBoundingClientRect();typePoint={x:t.left+t.width*.5,y:t.top+t.height*.8};
    }
    illuminate(title,typePoint);
    if (keyboard && !card) edge.clear();
    else edge.draw(edgePoint,dialog,keyboard && card);
  }
  function schedule(){if (!frame) frame=requestAnimationFrame(paint);}
  function reset(){clearTimeout(touchTimer);pointer=keyboard=null;clearInk();edge.clear();if(frame) cancelAnimationFrame(frame);frame=0;}
  function track(event) {
    if (event.isPrimary===false) return;
    if (pointer && Math.hypot(pointer.x-event.clientX,pointer.y-event.clientY)>175) edge.clear();
    keyboard=null;pointer={x:event.clientX,y:event.clientY,type:event.pointerType};schedule();
  }
  document.addEventListener('pointermove',event=>{if(event.pointerType!=='touch' || pointer?.type==='touch') track(event);},{passive:true});
  document.addEventListener('pointerdown',event=>{clearTimeout(touchTimer);track(event);},{passive:true,capture:true});
  document.addEventListener('pointerup',event=>{if(event.pointerType==='touch') touchTimer=setTimeout(reset,350);},{passive:true,capture:true});
  document.addEventListener('pointercancel',reset,{passive:true});
  document.addEventListener('pointerout',event=>{if (!event.relatedTarget) reset();},{passive:true});
  document.addEventListener('keydown',event=>{
    if (['Tab','ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Home','End'].includes(event.key)) {pointer=null; keyboard=document.activeElement; schedule();}
  },true);
  document.addEventListener('focusin',event=>{if(!pointer){keyboard=event.target;schedule();}});
  document.addEventListener('focusout',()=>{if(keyboard){keyboard=null;schedule();}});
  document.addEventListener('scroll',()=>{if(pointer?.type==='touch') reset();else if(pointer || keyboard) schedule();},{capture:true,passive:true});
  document.addEventListener('wheel',reset,{passive:true});
  window.addEventListener('resize',()=>{clearInk();if(pointer || keyboard) schedule();},{passive:true});
  document.addEventListener('memento:modal-visibility',reset);
  document.addEventListener('visibilitychange',reset);
  window.addEventListener('blur',reset);
  window.addEventListener('pagehide',reset);
  forced.addEventListener?.('change',reset);
}
