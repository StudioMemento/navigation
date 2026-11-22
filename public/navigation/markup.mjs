import { STATIONS, station } from './core.mjs';
import { overlayCSS } from './styles.mjs';
import { edgeMarkup } from './blur.mjs';
import { iconSVG } from './icons.mjs';
import { wordmarkMarkup } from './wordmark.mjs';

// A server-rendered shadow tree and the independently embedded navbar share one template.
export function navContents(active='memento',current='page',hosted=false) {
  const selected=station(active);
  const home=current==='page' && selected ? '/#'+selected.slug : '/';
  const icons=STATIONS.map(item=>{
    const icon=iconSVG(item.id,hosted);
    const chosen=item.id===active && current!=='world' ? ` aria-current="${current==='location'?'location':'page'}"` : '';
    return `<a class="mm-link" data-id="${item.id}" data-view="page" href="${item.path}/" aria-label="${item.label}"${chosen}><span class="mm-tile" aria-hidden="true">${icon}</span></a>`;
  }).join('');
  return `<style>${overlayCSS}</style>${edgeMarkup('top')}${edgeMarkup('bottom')}<a class="mm-wordmark" data-id="memento" data-view="world" href="${home}" aria-label="Memento — torna alla home">${wordmarkMarkup()}</a><nav class="mm-dock" aria-label="Navigazione Memento">${icons}</nav>`;
}
export function nativeNav(active,current) {
  return `<memento-nav active="${active}" mode="host" current="${current}"><template shadowrootmode="open">${navContents(active,current,true)}</template></memento-nav>`;
}
