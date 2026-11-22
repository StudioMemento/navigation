// The three closed contours of DEV_20_Icon.svg. Collinear vertices on the slash
// let it open into a six-sided band. Together the open faces tile the viewport.
const faces = [
  {open:[[0,0],[84,0],[72,12],[42,42],[18,66],[0,84]], mark:[[49.61,49.60],[106.30,106.30],[95.67,116.93],[63.78,85.04],[63.78,148.82],[49.61,162.99]]},
  {open:[[0,84],[0,100],[16,100],[100,16],[100,0],[84,0]], mark:[[49.61,170.08],[49.61,185],[49.61,191.34],[170.08,70.87],[170.08,56],[170.08,49.61]]},
  {open:[[100,100],[16,100],[28,88],[58,58],[82,34],[100,16]], mark:[[170.08,191.34],[113.39,134.64],[124.02,124.01],[155.91,155.91],[155.91,92.12],[170.08,77.95]]}
];
const center = [109.845,120.47];
const rounded = value => +value.toFixed(3);
function pointsAt(t) {
  const contours = faces.map(face => face.open.map((point,i) => point.map((edge,axis) => {
    const percent = rounded(edge+(50-edge)*t);
    const units = rounded((face.mark[i][axis]-center[axis])*t);
    return units ? `calc(${percent}% ${units<0?'-':'+'} ${Math.abs(units)} * var(--mm-unit))` : `${percent}%`;
  }).join(' ')));
  // Walk each contour out and back on the same zero-width bridge (CSS polygon has one path).
  const anchor = contours[0][0];
  return contours.flatMap(points => [...points,points[0],anchor]).join(',');
}
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="49.61 49.60 120.47 141.74"><g fill="#fae4cd">${faces.map(face=>`<polygon points="${face.mark.map(p=>p.join(',')).join(' ')}"/>`).join('')}</g></svg>`;
const iconUrl = `url("data:image/svg+xml,${encodeURIComponent(icon)}")`;
const stages = [['open',0],['touch',.085],['icon-shape',1]];
const shapes = stages.map(([name,t])=>`--mm-${name}:${pointsAt(t)};`).join('');
const css = `@media (prefers-reduced-motion:no-preference) and (forced-colors:none){
@view-transition{navigation:auto}
:root{--mm-unit:clamp(.88px,.175vmin,1.42px);--mm-icon:${iconUrl};--mm-field:#121110;${shapes}}
::view-transition{pointer-events:none;background:var(--mm-field) var(--mm-icon) center/calc(120.47 * var(--mm-unit)) calc(141.74 * var(--mm-unit)) no-repeat}
::view-transition-group(root){animation:none}
::view-transition-image-pair(root){isolation:isolate}
::view-transition-old(root),::view-transition-new(root){width:100%;height:100%;mix-blend-mode:normal;object-position:center;animation-duration:760ms;animation-timing-function:linear;animation-delay:var(--mm-offset,0ms);animation-fill-mode:both}
::view-transition-old(root){z-index:1;animation-name:mm-gather}
::view-transition-new(root){z-index:2;animation-name:mm-unfold}
@keyframes mm-gather{0%{clip-path:polygon(evenodd,var(--mm-open));opacity:1}14%{clip-path:polygon(evenodd,var(--mm-touch));animation-timing-function:cubic-bezier(.45,.02,.22,1)}37%{clip-path:polygon(evenodd,var(--mm-icon-shape));opacity:1}43%,100%{clip-path:polygon(evenodd,var(--mm-icon-shape));opacity:0}}
@keyframes mm-unfold{0%,58%{clip-path:polygon(evenodd,var(--mm-icon-shape));opacity:0}63%{clip-path:polygon(evenodd,var(--mm-icon-shape));opacity:1;animation-timing-function:cubic-bezier(.38,.02,.22,1)}100%{clip-path:polygon(evenodd,var(--mm-open));opacity:1}}
.mm-iris-veil,.mm-iris-imprint{position:fixed;inset:0;pointer-events:none;z-index:2147483647;contain:strict}
.mm-iris-veil{background:var(--mm-field);--mm-rim:0% 0%,100% 0%,100% 100%,0% 100%,0% 0%}
.mm-iris-veil[data-phase=depart]{animation:mm-touch 104ms linear both}
@keyframes mm-touch{from{clip-path:polygon(evenodd,var(--mm-rim),var(--mm-open),0% 0%)}to{clip-path:polygon(evenodd,var(--mm-rim),var(--mm-touch),0% 0%)}}
.mm-iris-veil[data-phase=arrive]{animation:mm-in 390ms cubic-bezier(.38,.02,.22,1) both}
@keyframes mm-in{0%,12%{clip-path:polygon(evenodd,var(--mm-rim),var(--mm-icon-shape),0% 0%)}100%{clip-path:polygon(evenodd,var(--mm-rim),var(--mm-open),0% 0%)}}
.mm-iris-imprint{background:var(--mm-icon) center/calc(120.47 * var(--mm-unit)) calc(141.74 * var(--mm-unit)) no-repeat;animation:mm-ink 160ms ease-out both}
@keyframes mm-ink{0%,34%{opacity:1}100%{opacity:0}}
}`;

// Register before pagereveal (including a bfcache restore). This function is embedded in the head.
function observeScene() {
  const root=document.documentElement;
  let width=-1,height=-1;
  function fit() {
    const w=root.clientWidth || innerWidth, h=Math.round(window.visualViewport?.height || innerHeight);
    if(w!==width){width=w;const wide=Math.max(0,Math.min(1,(w-768)/256));root.style.setProperty('--layout-wide',String(wide));root.style.setProperty('--board-ratio',String(1+wide));}
    if(h!==height){height=h;root.style.setProperty('--memento-nav-height',h+'px');}
  }
  fit();window.addEventListener('resize',fit,{passive:true});window.visualViewport?.addEventListener('resize',fit,{passive:true});
  window.mementoGo=href=>location.assign(href);
  if(window.top!==window)return;
  const motion=matchMedia('(prefers-reduced-motion:no-preference) and (forced-colors:none)');
  const key='memento.scene.v3';
  const sections=new Set(['/','/studio','/memento','/services','/projects','/levelup','/start']);
  const path=url=>url.pathname.replace(/\/+$/,'')||'/';
  function crossing(source,dest) {
    if(!source || !dest)return false;
    try {const a=new URL(source,location.href), b=new URL(dest,location.href);
      return a.origin===location.origin && b.origin===a.origin && path(a)!==path(b) && sections.has(path(a)) && sections.has(path(b));
    } catch {return false;}
  }
  let veil,imprint,began=0,pending='';
  function clear(){veil?.remove();imprint?.remove();veil=imprint=null;began=0;pending='';}
  // The destination is assigned once, including a rapid second tap or a CTA that also has a native href.
  window.mementoGo=href=>{const target=new URL(href,location.href).href;if(target===pending || target===location.href)return;if(!window.navigation)outgoing(target);location.assign(target);};
  window.addEventListener('click',e=>{
    if(e.button || e.ctrlKey || e.shiftKey || e.metaKey || e.altKey || e.defaultPrevented)return;
    const link=e.composedPath().find(node=>node instanceof HTMLAnchorElement);
    if(!link || link.hasAttribute('download') || !['','_self','_top','_parent'].includes(link.target))return;
    const dock=link.getRootNode()?.host?.localName==='memento-nav';
    if(link.href===pending || (dock && link.href===location.href)){e.preventDefault();e.stopPropagation();}
  },true);
  function add(className){const el=document.createElement('div');el.className=className;el.setAttribute('aria-hidden','true');document.body.append(el);return el;}
  function outgoing(to){
    if(!crossing(location.href,to))return;
    if(veil && veil.dataset.phase!=='depart')clear();
    pending=new URL(to,location.href).href;
    if(!motion.matches || !document.body)return;
    if(!veil){began=performance.now();veil=add('mm-iris-veil');veil.dataset.phase='depart';}
  }
  function fallback(){
    if(!motion.matches || !document.body)return;
    clear();veil=add('mm-iris-veil');veil.dataset.phase='arrive';imprint=add('mm-iris-imprint');
    const shown=veil,animation=shown.getAnimations()[0];
    window.mementoSceneSettled=animation?.finished.catch(()=>{});
    if(animation)animation.finished.then(()=>{if(veil===shown)clear();},()=>{});else clear();
  }
  if(window.navigation){
    window.navigation.addEventListener('navigate',e=>{
      if(e.defaultPrevented || e.hashChange || e.navigationType==='reload' || e.downloadRequest!=null || e.formData)return;
      if(!crossing(location.href,e.destination.url)){clear();return;}
      outgoing(e.destination.url);e.signal.addEventListener('abort',clear,{once:true});
    });
    window.navigation.addEventListener('navigateerror',clear);
  }else window.addEventListener('click',e=>{
    const a=e.composedPath().find(el=>el instanceof HTMLAnchorElement);
    if(a && !e.defaultPrevented && !e.button && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !a.hasAttribute('download') && ['','_self','_top','_parent'].includes(a.target))outgoing(a.href);
  });
  window.addEventListener('pageswap',e=>{
    e.viewTransition?.ready.catch(()=>{});
    const dest=e.activation?.entry?.url;
    if(crossing(location.href,dest))try{sessionStorage.setItem(key,JSON.stringify([dest,Math.min(104,began?performance.now()-began:0),Date.now()]));}catch{}
    clear();
  });
  function reveal(transition){
    clear();const activation=window.navigation?.activation;
    const type=activation?.navigationType || performance.getEntriesByType('navigation')[0]?.type;
    let record;try{record=JSON.parse(sessionStorage.getItem(key));sessionStorage.removeItem(key);}catch{}
    const matched=Array.isArray(record) && record[0]===location.href && Date.now()-record[2]<15000;
    const from=activation ? activation.from?.url : window.history?.length>1 ? document.referrer : '';
    const internal=type!=='reload' && (matched||crossing(from,location.href));
    if(!internal || !motion.matches){if(transition){transition.ready.catch(()=>{});transition.skipTransition();}return;}
    root.dataset.mementoArrival='page';root.style.setProperty('--mm-offset',`-${matched?record[1]:0}ms`);
    if(!transition){fallback();return;}
    window.mementoSceneSettled=transition.finished.catch(()=>{});
    transition.ready.catch(()=>{if(!document.hidden && !began)fallback();});
  }
  if('onpagereveal' in window)window.addEventListener('pagereveal',e=>reveal(e.viewTransition));
  else window.addEventListener('pageshow',()=>reveal(null));
  window.addEventListener('pagehide',clear);window.addEventListener('keydown',e=>{if(e.key==='Escape')clear();});
  motion.addEventListener('change',clear);
}
export const sceneHead=`<style id="memento-scene-shape">${css}</style><script id="memento-scene-navigation">(${observeScene.toString()})()</script>`;
