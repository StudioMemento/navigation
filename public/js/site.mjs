import { mountGlyphField } from './effects/glyph-field.mjs';
import { mountSurfaces } from './effects/surfaces.mjs';
import { playIntro } from './effects/surface-intro.mjs';
import { smoothScroll } from './smooth-scroll.mjs';

const root=document.documentElement;
const layer=document.querySelector('.mm-glyph-field');
// One field of glyphs for the margins and the surfaces: the site's visual DNA.
const field=layer ? mountGlyphField(layer) : null;
mountSurfaces(field);
if (root.getAttribute('data-mm-intro')==='') playIntro(field);
smoothScroll();
const nativeBackdrop=CSS.supports('backdrop-filter','blur(1px)') || CSS.supports('-webkit-backdrop-filter','blur(1px)');
let foreground=null,lastDialog=null;
function frostBehind(dialog) {
  if (nativeBackdrop || foreground===dialog) return;
  for (const el of document.querySelectorAll('[data-mm-modal-behind]')) el.removeAttribute('data-mm-modal-behind');
  foreground=dialog;
  // Blur sibling subtrees only. A modal may be nested inside the page content.
  for (let node=dialog; node && node!==document.body; node=node.parentElement) {
    for (const sibling of node.parentElement.children) {
      if (sibling!==node && !sibling.matches('script,style,link,template,dialog,.mm-blur'))
        sibling.setAttribute('data-mm-modal-behind','');
    }
  }
}
function syncModal() {
  const dialogs=document.querySelectorAll('dialog[open]');
  const dialog=dialogs[dialogs.length-1] || null;
  frostBehind(dialog);
  const open=!!dialog || !!document.fullscreenElement || !!document.webkitFullscreenElement || root.dataset.demoExpanded==='true' || root.dataset.overlayOpen==='true';
  if (root.hasAttribute('data-mm-modal')===open && lastDialog===dialog) return;
  lastDialog=dialog;
  root.toggleAttribute('data-mm-modal',open);
  document.dispatchEvent(new Event('memento:modal-visibility'));
}
const modalObserver=new MutationObserver(syncModal);
modalObserver.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
modalObserver.observe(root,{attributes:true,attributeFilter:['data-demo-expanded','data-overlay-open']});
for (const name of ['fullscreenchange','webkitfullscreenchange','memento:overlay-change']) document.addEventListener(name,syncModal);
syncModal();
const dock=document.querySelector('.mm-dock');
dock?.addEventListener('keydown',event=>{
  if(event.ctrlKey||event.metaKey||event.altKey)return;
  const links=[...dock.querySelectorAll('a')],index=links.indexOf(event.target.closest('a'));
  if(index<0)return;
  const next={ArrowLeft:(index+links.length-1)%links.length,ArrowRight:(index+1)%links.length,Home:0,End:links.length-1}[event.key];
  if(next!==undefined){event.preventDefault();links[next].focus();}
});

const rail=document.querySelector('.mm-scrollbar');
if(rail) bindScrollCue(rail);
function bindScrollCue(rail) {
  const thumb=rail.firstElementChild,forced=matchMedia('(forced-colors:active)');
  const main=document.querySelector('main');
  if(main?.id)rail.setAttribute('aria-controls',main.id);
  let frame=0,geometryChanged=true,range=0,height=0,travel=0,grip=null,idleTimer=0;
  let previousOffset=-1,previousPercent=-1;
  function paint() {
    frame=0;
    if(geometryChanged) {
      geometryChanged=false;
      const view=root.clientHeight;
      const total=document.scrollingElement?.scrollHeight||root.scrollHeight;
      const track=Math.max(0,innerHeight-12);
      range=Math.max(0,total-view);
      height=Math.min(track,Math.max(40,track*view/Math.max(1,total)));
      travel=Math.max(0,track-height);
      const modal=root.hasAttribute('data-mm-modal');
      rail.hidden=forced.matches||range<2||modal;
      root.toggleAttribute('data-mm-scroll-cue',!forced.matches&&range>=2);
      thumb.style.height=height+'px';
    }
    if(rail.hidden)return;
    const progress=Math.min(1,Math.max(0,scrollY/Math.max(1,range)));
    const offset=Math.round(travel*progress*10)/10,percent=Math.round(100*progress);
    if(offset!==previousOffset){thumb.style.transform='translateY('+offset+'px)';previousOffset=offset;}
    if(percent!==previousPercent){rail.setAttribute('aria-valuenow',String(percent));previousPercent=percent;}
  }
  function schedule(geometry=false) {
    geometryChanged = geometryChanged || geometry;
    if(!frame)frame=requestAnimationFrame(paint);
  }
  function measure(){schedule(true);}
  function scroll() {
    schedule();rail.classList.add('is-scrolling');
    clearTimeout(idleTimer);idleTimer=setTimeout(()=>rail.classList.remove('is-scrolling'),650);
  }
  function jump(y){window.scrollTo({top:Math.max(0,Math.min(range,y)),behavior:'instant'});}
  function atPointer(event){
    if(!grip||!travel)return;
    jump((event.clientY-grip.top-grip.offset)*range/travel);
  }
  rail.addEventListener('pointerdown',event=>{
    if(event.button!==0||event.pointerType==='touch'||rail.hidden)return;
    const top=rail.getBoundingClientRect().top,local=event.clientY-top;
    const offset=travel*Math.min(1,Math.max(0,scrollY/Math.max(1,range)));
    grip={id:event.pointerId,top,offset:local>=offset&&local<=offset+height?local-offset:height/2};
    rail.setPointerCapture(event.pointerId);rail.classList.add('is-dragging');atPointer(event);event.preventDefault();
  });
  rail.addEventListener('pointermove',event=>{if(grip?.id===event.pointerId){atPointer(event);event.preventDefault();}});
  function stop(){
    if(!grip)return;const id=grip.id;grip=null;
    if(rail.hasPointerCapture?.(id))rail.releasePointerCapture(id);
    rail.classList.remove('is-dragging');
  }
  for(const type of ['pointerup','pointercancel','lostpointercapture'])rail.addEventListener(type,stop);
  rail.addEventListener('keydown',event=>{
    const jumpTo={ArrowUp:scrollY-48,ArrowDown:scrollY+48,PageUp:scrollY-innerHeight*.85,PageDown:scrollY+innerHeight*.85,Home:0,End:range}[event.key];
    if(jumpTo!==undefined){event.preventDefault();jump(jumpTo);}
  });
  window.addEventListener('blur',stop);
  window.addEventListener('scroll',scroll,{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  window.addEventListener('pageshow',measure);
  window.visualViewport?.addEventListener('resize',measure,{passive:true});
  document.addEventListener('memento:overlay-change',measure);
  document.addEventListener('fullscreenchange',measure);
  document.addEventListener('memento:modal-visibility',measure);
  forced.addEventListener?.('change',measure);
  if('ResizeObserver' in window) {
    const observer=new ResizeObserver(measure);observer.observe(document.body);if(main)observer.observe(main);
  }
  measure();
}
