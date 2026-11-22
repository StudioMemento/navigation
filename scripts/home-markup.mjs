import { PAGES } from '../src/config.mjs';
import { clamp, layout, pose, relative, wrap, smooth } from '../src/model.mjs';
import { nativeNav } from '../public/navigation/markup.mjs';

// The active hash selects the actual image before fetching. The application adopts these links.
function placeCards() {
  const cards=[...document.querySelectorAll('#scene>.card')];
  const slug=location.hash.slice(1).toLowerCase();
  let saved;try{saved=sessionStorage.getItem('memento.nav.section.v1');}catch{}
  const matches=value=>cards.findIndex(c=>c.dataset.page===(value==='memento'?'studio':value));
  const byHash=matches(slug),index=byHash>=0?byHash:Math.max(0,matches(saved));
  const frame=layout(document.documentElement.clientWidth,window.visualViewport?.height||innerHeight);
  const root=document.documentElement.style;
  for(const [key,value] of Object.entries({'vh':frame.h,'card-w':frame.width,'card-h':frame.height,'padding':frame.padding,'cut':frame.cut,'previous-y':frame.previousY,'next-y':frame.nextY}))root.setProperty('--'+key,value+'px');
  document.getElementById('scene').style.perspective=frame.perspective+'px';
  cards.forEach((card,i)=>{
    const d=relative(i,index),p=pose(d,frame);card.hidden=!p.visible;card.tabIndex=d===0?0:-1;
    card.setAttribute('aria-hidden',String(Math.abs(d)>1.4));card.dataset.slot=d===0?'active':d<0?'previous':'next';
    card.style.transform=`translate3d(0,${p.y}px,${p.z}px) rotateX(${p.angle}rad)`;
    card.querySelector('h2').style.opacity=d===0?'1':'0';
    if(!p.visible)return;const img=card.querySelector('img');img.sizes=Math.round(frame.width)+'px';img.fetchPriority=d===0?'high':'auto';img.srcset=img.dataset.srcset;img.src=img.dataset.src;
  });
  const nav=document.querySelector('memento-nav');if(nav)nav.setAttribute('active',cards[index].dataset.page==='studio'?'memento':cards[index].dataset.page);
}
export function homeMarkup() {
  const links=PAGES.map(p=>`<a class="card" href="/${p.slug}/" data-page="${p.slug}" draggable="false" aria-label="Apri ${p.label}" hidden><img data-src="/assets/scenes/${p.slug}-768.webp" data-srcset="/assets/scenes/${p.slug}-768.webp 768w,/assets/scenes/${p.slug}-1536.webp 1536w" alt="${p.alt}" width="1536" height="1024" draggable="false" decoding="async"><h2 aria-hidden="true">${[...p.title].map(c=>`<span>${c}</span>`).join('')}</h2></a>`).join('');
  const helpers={clamp,layout,pose,relative,wrap,smooth};
  const code=Object.entries(helpers).map(([name,fn])=>`const ${name}=${fn.toString()};`).join('');
  return `<div id="scene">${links}</div><script>(()=>{${code}(${placeCards.toString()})();})()</script>`;
}
export const homeNav=()=>nativeNav('memento','location');
