// The native title keeps its text, line breaks and accessible name. A pointer-free paint layer
// carries only the brighter facets and the small halo. The underlying black stays transparent.
const RISE=.45, FALL=1.1;
const palette=[[0,232,102,26],[9,255,125,0],[20,255,179,94],[32,255,217,173],[44,255,239,220]];
const ramps=new Map();
const fonts=['font-family','font-size','font-weight','font-style','font-stretch','font-kerning',
  'font-feature-settings','font-variation-settings','font-optical-sizing','letter-spacing','text-transform','direction'];

function ramp(step,touch) {
  const key=step+(touch?100:0);
  if (ramps.has(key)) return ramps.get(key);
  const energy=step/64, chroma=touch?1:.3+.7*energy;
  const opacity=(1-.28*energy).toFixed(3);
  const base=[],cover=[];
  for (const [stop,r,g,b] of palette) {
    const grey=.299*r+.587*g+.114*b;
    const rgb=[r,g,b].map(v=>Math.round(grey+(v-grey)*chroma)).join(',');
    base.push('rgb('+rgb+') '+stop+'%');
    cover.push('rgba('+rgb+','+opacity+') '+stop+'%');
  }
  const layer=stops=>'linear-gradient(to top,'+stops.join(',')+')';
  const gradients=layer(cover)+',var(--mm-facets),'+layer(base);
  ramps.set(key,gradients);
  return gradients;
}

function pieces(title) {
  const walker=document.createTreeWalker(title,NodeFilter.SHOW_TEXT);
  const range=document.createRange(),words=[];
  function add(node,start,end) {
    range.setStart(node,start);range.setEnd(node,end);
    const box=range.getBoundingClientRect();
    if (box.width && box.height) words.push({text:node.data.slice(start,end),box,source:node.parentElement});
  }
  while (walker.nextNode()) {
    const node=walker.currentNode;
    for (const match of node.data.matchAll(/\S+/gu)) {
      const start=match.index,end=start+match[0].length;
      range.setStart(node,start);range.setEnd(node,end);
      if (range.getClientRects().length<=1) {add(node,start,end);continue;}
      // Long unbroken labels can wrap even within a word on a narrow phone.
      let from=start,i=start,line=null;
      for (const char of match[0]) {
        range.setStart(node,i);range.setEnd(node,i+char.length);
        const y=range.getBoundingClientRect().top;
        if (line!==null && Math.abs(y-line)>1) {add(node,from,i);from=i;}
        line=y;i+=char.length;
      }
      add(node,from,end);
    }
  }
  return words;
}

function createTitle(title,touch) {
  const source=pieces(title);
  const sample=title.querySelector('.hero-line,.explore-line') || title;
  const em=parseFloat(getComputedStyle(sample).fontSize) || 16;
  if (getComputedStyle(title).position==='static') title.setAttribute('data-mm-ink-anchor','');
  const paint=document.createElement('i');
  paint.className='mm-ink-paint';
  paint.setAttribute('aria-hidden','true');
  title.append(paint);
  const box=paint.getBoundingClientRect(),width=paint.clientWidth || box.width,height=paint.clientHeight || box.height;
  const sx=width/(box.width || 1),sy=height/(box.height || 1);
  const range=document.createRange(),words=[],samples=new Map();
  title.style.setProperty('--ink-tile',Math.max(19,em*.62).toFixed(2)+'px');
  paint.style.setProperty('--ink-core',Math.max(1,Math.min(3,em*.012)).toFixed(1)+'px');
  paint.style.setProperty('--ink-halo',Math.max(2,Math.min(13,em*.055)).toFixed(1)+'px');
  paint.style.setProperty('--ink-size',width+'px '+height+'px');
  // Batch inserts and measurements. Browser text metrics align the painted copy even when the
  // two hero lines use different fitted sizes. Generated labels never enter the document text.
  for (const part of source) {
    const mark=document.createElement('i');
    mark.className='mm-ink-word';
    if (!samples.has(part.source)) {
      const style=getComputedStyle(part.source);
      samples.set(part.source,fonts.map(name=>style.getPropertyValue(name)));
    }
    const values=samples.get(part.source);
    fonts.forEach((name,i)=>mark.style.setProperty(name,values[i]));
    mark.textContent=part.text;
    paint.append(mark);
    part.mark=mark;
  }
  for (const {box:b,mark} of source) {
    range.selectNodeContents(mark);
    const probe=range.getBoundingClientRect();
    words.push({x:(b.left-probe.left)*sx,y:(b.top-probe.top)*sy,
      rect:[(b.left-box.left)*sx,(b.top-box.top)*sy,(b.right-box.left)*sx,(b.bottom-box.top)*sy]});
  }
  source.forEach(({text,mark},i)=>{
    const {x,y}=words[i];
    mark.textContent='';
    mark.setAttribute('data-ink-text',text);
    mark.style.left=x.toFixed(2)+'px';mark.style.top=y.toFixed(2)+'px';
    mark.style.setProperty('--ink-position',(-x).toFixed(2)+'px '+(-y).toFixed(2)+'px');
  });
  title.setAttribute('data-lit','');
  return {title,paint,em,touch,words:words.map(w=>w.rect),width,height,warmth:0,goal:0,last:-1,
    spots:Array.from({length:3},()=>({x:0,y:0,level:0})),current:null,mask:''};
}

function move(state,point,keyboard) {
  const {paint,em,words}=state;
  const box=paint.getBoundingClientRect();
  let x=(point.x-box.left)*state.width/(box.width || 1),y=(point.y-box.top)*state.height/(box.height || 1);
  if (keyboard && words.length) {
    const [l,t,r,b]=words[Math.floor((words.length-1)/2)];
    x=(l+r)/2;y=(t+b)/2;
  }
  const gap=words.reduce((nearest,[l,t,r,b])=>Math.min(nearest,Math.hypot(Math.max(l-x,0,x-r),Math.max(t-y,0,y-b))),Infinity);
  state.goal=Math.max(0,1-gap/Math.max(3,Math.min(7,em*.025)));
  if (!state.goal) {state.current=null;return;}
  let near=null,dist=Math.max(12,em*.43);
  for (const spot of state.spots) {
    if (!spot.level && spot!==state.current) continue;
    const d=Math.hypot(x-spot.x,y-spot.y);
    if (d<dist) {near=spot;dist=d;}
  }
  if (!near) {near=state.spots.reduce((a,b)=>a.level<=b.level?a:b);near.level=0;}
  near.x=x;near.y=y;state.current=near;
}

function approach(level,target,dt,still) {
  if (still || Math.abs(target-level)<.006) return target;
  return target+(level-target)*Math.exp(-dt/(target>level?RISE:FALL));
}

function render(state,goal,dt,still) {
  state.warmth=approach(state.warmth,goal,dt,still);
  const step=Math.round(state.warmth*64);
  if (step!==state.last) {state.title.style.setProperty('--ink-paint',ramp(step,state.touch));state.last=step;}
  const radius=Math.max(36,state.em*1.43).toFixed(1)+'px '+Math.max(20,state.em*.78).toFixed(1)+'px';
  const masks=[];
  let moving=state.warmth!==goal;
  for (const spot of state.spots) {
    const aim=spot===state.current?goal:0;
    spot.level=approach(spot.level,aim,dt,still);
    if (spot.level!==aim) moving=true;
    if (spot.level<.006) continue;
    const origin=spot.x.toFixed(1)+'px '+spot.y.toFixed(1)+'px';
    const black=a=>'rgba(0,0,0,'+(spot.level*a).toFixed(2)+')';
    masks.push('radial-gradient(ellipse '+radius+' at '+origin+','+black(1)+' 0%,'+black(.96)+' 18%,'+black(.54)+' 53%,'+black(.12)+' 82%,transparent)');
  }
  const mask=masks.join(',') || 'linear-gradient(transparent,transparent)';
  if (mask!==state.mask) {state.paint.style.setProperty('--ink-mask',mask);state.mask=mask;}
  return moving;
}

function remove(state) {
  state.paint.remove();
  for (const name of ['data-lit','data-mm-ink-anchor']) state.title.removeAttribute(name);
  for (const prop of ['--ink-paint','--ink-tile']) state.title.style.removeProperty(prop);
}

export function typeLight() {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),states=new Map();
  let active=null;
  function target(title,point,keyboard,touch) {
    active=title;
    if (!title || !point) return;
    const old=states.get(title);
    if (old && !old.paint.isConnected) {remove(old);states.delete(title);}
    if (!states.has(title)) {
      if (states.size>=3) {const oldest=states.values().next().value;remove(oldest);states.delete(oldest.title);}
      states.set(title,createTitle(title,touch));
    }
    move(states.get(title),point,keyboard);
  }
  function frame(dt) {
    let moving=false;
    for (const [title,state] of states) {
      const goal=active===title && title.isConnected?state.goal:0;
      const fading=render(state,goal,dt,reduced.matches);
      if (!state.paint.isConnected || (!goal && !fading)) {remove(state);states.delete(title);}
      else if (fading) moving=true;
    }
    return moving;
  }
  function clear(){for (const state of states.values()) remove(state);states.clear();active=null;}
  return {target,frame,clear};
}
