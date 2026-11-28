import { acceptsLight, boxDistance } from './surface-targets.mjs';

const MAX_REACH = 180;
const smooth = t => t*t*(3-2*t);

// Store word fragments relative to the title. Scrolling moves just the origin.
// Ranges also handle the individual spans in spaced headings and mobile line wraps.
function measure(title, box) {
  const sample = title.querySelector('.hero-line,.explore-line') || title;
  const em = parseFloat(getComputedStyle(sample).fontSize) || 16;
  const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
  const range = document.createRange(), words = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    for (const match of node.data.matchAll(/\S+/gu)) {
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      for (const r of range.getClientRects()) if (r.width && r.height) {
        words.push({left:r.left-box.left,right:r.right-box.left,top:r.top-box.top,bottom:r.bottom-box.top});
      }
    }
  }
  return {words,em,reach:Math.min(MAX_REACH,64+em*.85),width:box.width,height:box.height,text:title.textContent};
}

export function typeLight(titles) {
  let metrics = new WeakMap();
  const lit = new Set(), cooling = new Map();
  function remove(title) {
    clearTimeout(cooling.get(title));
    cooling.delete(title); lit.delete(title);
    title.removeAttribute('data-lit');
    for (const prop of ['--mm-warm','--ink-x','--ink-y','--ink-tile']) title.style.removeProperty(prop);
  }
  function warm(title, level, x, y, em) {
    clearTimeout(cooling.get(title)); cooling.delete(title);
    if (!lit.has(title)) {
      lit.add(title);
      title.setAttribute('data-lit','');
    }
    title.style.setProperty('--ink-x',x.toFixed(1)+'px');
    title.style.setProperty('--ink-y',y.toFixed(1)+'px');
    title.style.setProperty('--ink-tile',Math.max(18,em*.60).toFixed(1)+'px');
    title.style.setProperty('--mm-warm',level.toFixed(3));
  }
  function target(point, {focus=null,scope=null,band=0,contact=null} = {}) {
    const next = new Set();
    for (const title of focus ? [focus] : point ? titles : []) {
      if (!acceptsLight(title) || (scope && !scope.contains(title))) continue;
      const box = title.getBoundingClientRect();
      if (!box.width || !box.height || box.right<=0 || box.left>=innerWidth) continue;
      if (band) {
        if (Math.max(box.top-point.y,point.y-box.bottom,0)>band && (!contact || boxDistance(box,contact)>MAX_REACH)) continue;
      } else if (point && boxDistance(box,point)>MAX_REACH) continue;
      let m = metrics.get(title);
      if (!m || m.width !== box.width || m.height !== box.height || m.text !== title.textContent) {
        m = measure(title,box); metrics.set(title,m);
      }
      const local = point ? {x:point.x-box.left,y:point.y-box.top} : {x:box.width*.45,y:box.height*.66};
      let level=focus ? 1 : 0, best=null;
      for(const word of m.words) {
        if(focus)break;
        const gap=band ? Math.max(word.top-local.y,local.y-word.bottom,0) : boxDistance(word,local);
        const amount=smooth(Math.max(0,1-gap/(band || m.reach)));
        if(amount>level){level=amount;best=word;}
      }
      if(band && best) {
        local.x=Math.min(best.right,Math.max(best.left,local.x));
        local.y=Math.min(best.bottom,Math.max(best.top,local.y));
      }
      if(contact) {
        const at={x:contact.x-box.left,y:contact.y-box.top};
        let nearest=Infinity;
        for(const word of m.words)nearest=Math.min(nearest,boxDistance(word,at));
        const direct=smooth(Math.max(0,1-nearest/m.reach));
        if(direct>=level){level=direct;local.x=at.x;local.y=at.y;}
      }
      if(level<.008)continue;
      next.add(title);
      warm(title,level,local.x,local.y,m.em);
    }
    for (const title of lit) {
      if (!title.isConnected) {remove(title);continue;}
      if (next.has(title) || cooling.has(title)) continue;
      title.style.setProperty('--mm-warm','0');
      cooling.set(title,setTimeout(() => remove(title),220));
    }
  }
  function clear() {for (const title of lit) remove(title);}
  function invalidate() {metrics = new WeakMap();}
  return {target,clear,invalidate};
}

