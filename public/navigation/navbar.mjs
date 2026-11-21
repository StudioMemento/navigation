import { STATIONS,DEFAULT_HUB,PUBLIC_ORIGIN,station,publicRouteURL,routePath } from './core.mjs?v=12.0.0';
import { overlayCSS,legacyHostLayoutCSS } from './styles.mjs?v=12.0.0';
import { edgeMarkup } from './blur.mjs?v=12.0.0';
import { iconSVG } from './icons.mjs?v=12.0.0';
import { wordmarkMarkup } from './wordmark.mjs?v=12.0.0';

export const KIT_VERSION = '12.0.0';
export function safeHub(input=DEFAULT_HUB) {
  try { const url=new URL(input); return ['http:','https:'].includes(url.protocol)?url.origin:DEFAULT_HUB; }
  catch { return DEFAULT_HUB; }
}

export class MementoNav extends HTMLElement {
  static kitVersion=KIT_VERSION;
  static observedAttributes=['active','target','mode','current'];
  constructor() {
    super();
    const root=this.attachShadow({mode:'open'});
    root.innerHTML=`<style>${overlayCSS}</style>${edgeMarkup('top')}${edgeMarkup('bottom')}
      <a class="mm-wordmark" data-id="memento" data-view="world" href="${PUBLIC_ORIGIN}/" aria-label="Memento — torna alla home">${wordmarkMarkup()}</a>
      <nav class="mm-dock" aria-label="Navigazione Memento">${STATIONS.map(item=>`<a class="mm-link" data-id="${item.id}" data-view="page" href="${publicRouteURL({id:item.id,view:'page'})}" aria-label="${item.label}"><span class="mm-tile" aria-hidden="true">${iconSVG(item.id)}</span></a>`).join('')}</nav>`;
    root.addEventListener('click',event=>{
      const link=event.target.closest?.('a[data-id]');
      if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||(link.target&&link.target!=='_self'))return;
      // The Vercel hub (mode host) owns every route on its own origin; elsewhere only the public site or a preview.
      if(location.origin!==PUBLIC_ORIGIN&&!['preview','host'].includes(this.getAttribute('mode')))return;
      const intent=new CustomEvent('memento:navigate',{bubbles:true,composed:true,cancelable:true,detail:{id:link.dataset.id,view:link.dataset.view}});
      if(!this.dispatchEvent(intent))event.preventDefault();
    });
    root.addEventListener('keydown',event=>{
      if(event.altKey||event.ctrlKey||event.metaKey)return;
      const links=[...root.querySelectorAll('.mm-link')],current=links.indexOf(event.target.closest?.('.mm-link'));
      if(current<0)return;
      const next={ArrowRight:(current+1)%links.length,ArrowLeft:(current+links.length-1)%links.length,Home:0,End:links.length-1}[event.key];
      if(next!==undefined){event.preventDefault();links[next].focus();}
    });
  }
  connectedCallback(){this.dataset.mementoKit=KIT_VERSION;this.update();}
  attributeChangedCallback(){this.update();}
  update(){
    const active=station(this.getAttribute('active'))?.id||'memento';
    const target=this.getAttribute('target'),host=this.getAttribute('mode')==='host';
    // current: page (a section is open), location (the world, with a station selected), world (the home itself).
    const current=['page','location','world'].includes(this.getAttribute('current'))?this.getAttribute('current'):'page';
    for(const link of this.shadowRoot.querySelectorAll('a[data-id]')){
      const route={id:link.dataset.id,view:link.dataset.view};
      // Inside the hub every link stays on the hub's own origin (local, preview, production).
      link.href=host?new URL(routePath(route),location.origin).href:publicRouteURL(route);
      if(link.classList.contains('mm-wordmark')){if(host&&current!=='page')link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');}
      else if(link.dataset.id===active&&current!=='world')link.setAttribute('aria-current',current==='location'?'location':'page');else link.removeAttribute('aria-current');
      if(['_top','_self','_blank'].includes(target))link.target=target;else link.removeAttribute('target');
      if(target==='_blank')link.rel='noopener';else link.removeAttribute('rel');
    }
  }
  setActive(id){if(station(id))this.setAttribute('active',id);}
}
const registered=customElements.get('memento-nav');
if(!registered)customElements.define('memento-nav',MementoNav);

export function mountNav({active='memento',hub=DEFAULT_HUB,mode='standalone',hidden=false,respectSystemTransparency=false}={}) {
  if(customElements.get('memento-nav')?.kitVersion!==KIT_VERSION)throw Error('Memento V12: rimuovere il vecchio bootstrap e ricaricare la pagina. Due versioni non possono essere caricate insieme.');
  let nav=document.querySelector('memento-nav');
  if(!nav)nav=document.createElement('memento-nav');
  // A direct child of body avoids page containers with opacity/filter/masks.
  if(nav.parentElement!==document.body)document.body.append(nav);
  nav.setAttribute('active',station(active)?.id||'memento');
  nav.setAttribute('hub',safeHub(hub));nav.setAttribute('mode',mode);nav.hidden=hidden;
  nav.toggleAttribute('respect-system-transparency',respectSystemTransparency);
  const world=document.getElementById('world'),shell=document.getElementById('page-shell'),wrap=document.getElementById('page-frame-wrap');
  if(world?.querySelector('#canvas')&&shell?.contains(wrap)){
    document.documentElement.dataset.mementoOverlayHost='v7';
    if(!document.getElementById('memento-v7-host-layout')){
      const style=document.createElement('style');style.id='memento-v7-host-layout';style.textContent=legacyHostLayoutCSS;document.head.append(style);
    }
  }
  return nav;
}
