import { STATIONS, DEFAULT_HUB, station, routePath } from './core.mjs';
import { iconSVG } from './icons.mjs';
const css=`:host{position:fixed;inset:auto 0 max(16px,env(safe-area-inset-bottom,0px));z-index:1000;display:flex;justify-content:center;pointer-events:none;font:12px/1.3 Inter,Arial,sans-serif;color:#e5e8ea;color-scheme:dark}:host([hidden]){display:none}:host:before{content:'';position:fixed;inset:auto 0 calc(-1 * max(16px,env(safe-area-inset-bottom,0px)));height:104px;background:linear-gradient(transparent,#07090bd9);pointer-events:none}nav{position:relative;display:flex;align-items:center;justify-content:center;gap:clamp(16px,4vw,38px);padding:8px 15px 9px;pointer-events:auto}a{--icon-accent:#8d969e;position:relative;display:grid;place-items:center;width:50px;height:50px;text-decoration:none;color:inherit;isolation:isolate;border:0;outline-offset:6px;-webkit-tap-highlight-color:transparent;transition:transform .22s ease}a:before,a:after{content:'';position:absolute;inset:0;clip-path:polygon(9px 0,calc(100% - 5px) 0,100% 5px,100% calc(100% - 9px),calc(100% - 9px) 100%,5px 100%,0 calc(100% - 5px),0 9px);z-index:-2;background:linear-gradient(135deg,#ffffff25,#ffffff09 45%,#ffffff24)}a:after{inset:1px;z-index:-1;background:linear-gradient(135deg,#12171bf5,#050708f7 60%)}svg{width:38px;height:38px;filter:brightness(.83);transition:filter .22s,transform .22s}a:hover,a:focus-visible{--icon-accent:#ff7950;transform:translateY(-3px)}a:hover svg,a:focus-visible svg{filter:brightness(1.25) drop-shadow(0 0 5px #ff795020);transform:scale(1.05)}a:focus-visible{outline:2px solid #ff7950}a[aria-current=page]{--icon-accent:#ff7950}a[aria-current=page] svg{filter:brightness(1.1)}i{position:absolute;bottom:-9px;left:calc(50% - 2px);width:4px;height:4px;border-radius:50%;background:#ff7950;opacity:0;box-shadow:0 0 8px #ff795050}a[aria-current=page] i{opacity:1}span{position:absolute;bottom:calc(100% + 13px);left:50%;transform:translate(-50%,5px);padding:6px 9px;background:#090c0fee;border:1px solid #ffffff16;color:#e8eaec;font-size:10px;letter-spacing:.07em;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .18s,transform .18s}a:hover span,a:focus-visible span{opacity:1;transform:translate(-50%,0)}@media(max-width:480px){:host{bottom:max(12px,env(safe-area-inset-bottom,0px))}nav{gap:clamp(10px,4vw,20px);padding:8px 12px 9px}a{width:46px;height:46px}svg{width:35px;height:35px}}@media(prefers-reduced-motion:reduce){a,svg,span{transition:none}a:hover,a:focus-visible{transform:none}}`;
export class MementoNav extends HTMLElement {
  static observedAttributes=['active','hub','mode'];
  constructor(){super();this.attachShadow({mode:'open'});}
  connectedCallback(){this.render();}
  attributeChangedCallback(name,oldValue,newValue){if(this.isConnected&&oldValue!==newValue)this.render();}
  render(){
    const hub=this.getAttribute('hub')||DEFAULT_HUB;
    let base;try{base=new URL(hub);if(!['http:','https:'].includes(base.protocol))throw Error();}catch{base=new URL(DEFAULT_HUB);}
    const active=this.getAttribute('active')||'memento';
    this.shadowRoot.innerHTML=`<style>${css}</style><nav aria-label="Navigazione Memento">${STATIONS.map(s=>`<a href="${new URL(s.path,base).href}" data-id="${s.id}" aria-label="${s.label}"${s.id===active?' aria-current="page"':''}>${iconSVG(s.id)}<span>${s.label}</span><i aria-hidden="true"></i></a>`).join('')}</nav>`;
    this.shadowRoot.addEventListener('click',this.onClick??=event=>{
      const a=event.target.closest?.('a');if(!a||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const intent=new CustomEvent('memento:navigate',{bubbles:true,composed:true,cancelable:true,detail:{id:a.dataset.id,view:'page'}});
      if(!this.dispatchEvent(intent))event.preventDefault();
    });
  }
}
if(!customElements.get('memento-nav'))customElements.define('memento-nav',MementoNav);
export function mountNav({active='memento',hub=DEFAULT_HUB,mode='standalone',hidden=false}={}) {
  let nav=document.querySelector('memento-nav');if(!nav){nav=document.createElement('memento-nav');document.body.append(nav);}
  nav.setAttribute('hub',hub);nav.setAttribute('active',station(active)?.id||'memento');nav.setAttribute('mode',mode);nav.hidden=hidden;return nav;
}
