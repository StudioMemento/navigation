import { acceptsLight } from './surface-targets.mjs';

// All pigment is clipped to the original text. Native highlight ranges add a small
// contour to the hottest glyphs in browsers that support them, without another layout.
const STOPS=[[0,232,102,26],[9,255,125,0],[20,255,179,94],[32,255,217,173],[44,255,239,220]];
const ramps=new Map();
const clearLens='linear-gradient(transparent,transparent)';

function pigment(step,touch) {
  const key=step+(touch?100:0);
  if (ramps.has(key)) return ramps.get(key);
  const energy=step/64,chroma=touch?1:.3+.7*energy;
  const veil=(1-.87*energy).toFixed(3);
  const base=[],cover=[];
  for (const [stop,r,g,b] of STOPS) {
    const grey=.299*r+.587*g+.114*b;
    const rgb=[r,g,b].map(v=>Math.round(grey+(v-grey)*chroma)).join(',');
    base.push('rgb('+rgb+') '+stop+'%');
    cover.push('rgba('+rgb+','+veil+') '+stop+'%');
  }
  const gradient=stops=>'linear-gradient(to top,'+stops.join(',')+')';
  const colors={cover:gradient(cover),base:gradient(base)};
  ramps.set(key,colors);return colors;
}

function readTitle(title,touch) {
  const box=title.getBoundingClientRect(),width=title.offsetWidth || box.width,height=title.offsetHeight || box.height;
  const sx=width/(box.width || 1),sy=height/(box.height || 1);
  const walker=document.createTreeWalker(title,NodeFilter.SHOW_TEXT),range=document.createRange(),words=[];
  while (walker.nextNode()) {
    const node=walker.currentNode;
    for (const match of node.data.matchAll(/\S+/gu)) {
      const start=match.index,end=start+match[0].length;
      range.setStart(node,start);range.setEnd(node,end);
      for (const rect of range.getClientRects()) if (rect.width && rect.height) {
        words.push({node,start,end,l:(rect.left-box.left)*sx,r:(rect.right-box.left)*sx,t:(rect.top-box.top)*sy,b:(rect.bottom-box.top)*sy});
      }
    }
  }
  const sample=title.querySelector('.hero-line,.explore-line') || title;
  const em=parseFloat(getComputedStyle(sample).fontSize) || 16;
  title.style.setProperty('--ink-tile',Math.max(18,em*.60).toFixed(1)+'px');
  title.setAttribute('data-lit','');
  return {title,width,height,words,em,touch,warmth:0,goal:0,last:-1,lenses:'',current:null,
    spots:Array.from({length:3},()=>({x:0,y:0,level:0,age:1,range:null,band:-1}))};
}

function glyphRange(word,point,fraction) {
  let index=word.start+Math.floor(fraction*(word.end-word.start));
  const caret=document.caretPositionFromPoint?.(point.x,point.y);
  if (caret?.offsetNode===word.node) index=caret.offset;
  else if (!caret) {
    const pos=document.caretRangeFromPoint?.(point.x,point.y);
    if (pos?.startContainer===word.node) index=pos.startOffset;
  }
  index=Math.max(word.start,Math.min(word.end-1,index));
  const range=document.createRange();
  range.setStart(word.node,Math.max(word.start,index-1));
  range.setEnd(word.node,Math.min(word.end,index+2));
  return range;
}
function approach(now,aim,dt,still) {
  if (still || Math.abs(aim-now)<.004) return aim;
  const seconds=aim>now ? .16 : .90;
  return aim+(now-aim)*Math.exp(-dt/seconds);
}

export function typeLight() {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),states=new Map();
  const bands=[];
  if (globalThis.CSS?.highlights && typeof Highlight==='function') {
    for (const suffix of ['low','high']) {
      const band=new Highlight();CSS.highlights.set('memento-ember-'+suffix,band);bands.push(band);
    }
  }
  let active=null;
  function detach(spot) {
    if (spot.band>=0) bands[spot.band].delete(spot.range);
    spot.band=-1;
  }
  function remove(state) {
    for (const spot of state.spots) detach(spot);
    state.title.removeAttribute('data-lit');
    for (const prop of ['--ink-tile','--ink-ramp','--ink-veil','--ink-lenses','--ink-corona']) state.title.style.removeProperty(prop);
    states.delete(state.title);
  }
  function target(title,point,keyboard,touch) {
    const entered=active!==title;
    active=title;
    if (!title || !point || !acceptsLight(title)) return;
    if (!states.has(title)) {
      if (states.size>=3) remove(states.values().next().value);
      states.set(title,readTitle(title,touch));
    }
    const state=states.get(title),box=title.getBoundingClientRect();
    let x=(point.x-box.left)*state.width/(box.width || 1),y=(point.y-box.top)*state.height/(box.height || 1);
    if (keyboard && state.words.length) {
      const w=state.words[Math.floor((state.words.length-1)/2)];x=(w.l+w.r)/2;y=(w.t+w.b)/2;
    }
    let nearest=null,gap=Infinity;
    for (const w of state.words) {
      const d=Math.hypot(Math.max(w.l-x,0,x-w.r),Math.max(w.t-y,0,y-w.b));
      if (d<gap) {nearest=w;gap=d;}
    }
    const cold=state.goal===0 || state.warmth<.12;
    state.goal=Math.max(0,1-gap/Math.max(3,Math.min(7,state.em*.025)));
    if (!state.goal || !nearest) {state.current=null;return;}
    let spot=null,dist=Math.max(12,state.em*.50);
    for (const s of state.spots) {
      const d=Math.hypot(x-s.x,y-s.y);
      if ((s.level || s===state.current) && d<dist) {spot=s;dist=d;}
    }
    if (!spot) {spot=state.spots.reduce((a,b)=>a.level<=b.level?a:b);detach(spot);spot.level=0;spot.range=null;}
    if (entered || (cold && spot!==state.current)) spot.age=0;
    spot.x=x;spot.y=y;state.current=spot;
    if (bands.length) {
      const range=glyphRange(nearest,{x:box.left+x*box.width/state.width,y:box.top+y*box.height/state.height},(x-nearest.l)/(nearest.r-nearest.l || 1));
      if (!spot.range || spot.range.startContainer!==range.startContainer || spot.range.startOffset!==range.startOffset || spot.range.endOffset!==range.endOffset) {
        detach(spot);spot.range=range;
      }
    }
  }
  function frame(dt) {
    let moving=false;
    for (const [title,s] of states) {
      if (!acceptsLight(title)) {remove(s);continue;}
      const still=reduced.matches,goal=(title===active?s.goal:0);
      s.warmth=approach(s.warmth,goal,dt,still);
      const step=Math.round(s.warmth*64);
      if (step!==s.last) {
        const color=pigment(step,s.touch);s.last=step;
        title.style.setProperty('--ink-ramp',color.base);title.style.setProperty('--ink-veil',color.cover);
        title.style.setProperty('--ink-corona','rgba(255,171,72,'+(.14*step/64).toFixed(3)+')');
      }
      const lenses=[];
      let changing=s.warmth!==goal;
      for (const spot of s.spots) {
        const aim=spot===s.current?goal:0;
        spot.level=approach(spot.level,aim,dt,still);spot.age=Math.min(1,spot.age+dt);
        if (spot.level!==aim || (!still && aim && spot.age<.85)) changing=true;
        const t=spot.age/.13,flash=still?0:t*Math.exp(1-t);
        const gain=Math.min(1,spot.level*(.96+.70*flash));
        if (spot.range) {
          const band=gain>.55?1:gain>.14?0:-1;
          if (band!==spot.band) {detach(spot);if (band>=0) bands[band].add(spot.range);spot.band=band;}
        }
        if (gain<.004) {lenses.push(clearLens);continue;}
        const radius=Math.max(26,s.em*1.25).toFixed(1)+'px '+Math.max(17,s.em*.73).toFixed(1)+'px';
        const origin=spot.x.toFixed(1)+'px '+spot.y.toFixed(1)+'px';
        const tint=(rgb,a)=>'rgba('+rgb+','+(a*gain).toFixed(2)+')';
        lenses.push('radial-gradient(ellipse '+radius+' at '+origin+','+tint('255,251,217',1)+' 0%,'+tint('255,220,116',.96)+' 23%,'+tint('255,164,45',.60)+' 51%,'+tint('255,142,38',.13)+' 78%,transparent)');
      }
      const result=lenses.join(',');
      if (result!==s.lenses) {title.style.setProperty('--ink-lenses',result);s.lenses=result;}
      if (!goal && !changing) remove(s);else if (changing) moving=true;
    }
    return moving;
  }
  function clear(){for (const s of states.values()) remove(s);active=null;}
  return {target,frame,clear};
}
