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
  function target(point, {focus=null,scope=null} = {}) {
    const next = new Set();
    for (const title of focus ? [focus] : point ? titles : []) {
      if (!acceptsLight(title) || (scope && !scope.contains(title))) continue;
      const box = title.getBoundingClientRect();
      if (!box.width || !box.height || (point && boxDistance(box,point) > MAX_REACH)) continue;
      let m = metrics.get(title);
      if (!m || m.width !== box.width || m.height !== box.height || m.text !== title.textContent) {
        m = measure(title,box); metrics.set(title,m);
      }
      const local = point ? {x:point.x-box.left,y:point.y-box.top} : {x:box.width*.45,y:box.height*.66};
      let gap = 0;
      if (!focus) {
        gap = Infinity;
        for (const word of m.words) gap = Math.min(gap,boxDistance(word,local));
      }
      if (gap >= m.reach) continue;
      const level = smooth(1-gap/m.reach);
      if (level < .004) continue;
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

