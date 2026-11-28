import { acceptsLight } from './surface-targets.mjs';

// All pigment is clipped to the original text. At rest a title is grey, darker at its foot (the same stops as
// --mm-title-ink in visuals.css); its surface under the pointer warms it towards amber, rising from the foot.
// The pointer itself only adds soft lenses of light: continuous, never one letter switched on at a time.
const INK=[[0,111,107,102],[14,140,135,129],[30,185,180,173],[46,221,217,211],[62,240,237,232]];
const LIT=[[0,226,98,24],[14,255,125,0],[30,255,168,76],[46,255,210,160],[62,255,236,216]];
const ramps=new Map();
const clearLens='linear-gradient(transparent,transparent)';

function pigment(step) {
  if (ramps.has(step)) return ramps.get(step);
  const energy=step/64,veil=(1-.8*energy).toFixed(3);
  const base=[],cover=[];
  INK.forEach(([stop,...grey],i)=>{
    const rgb=grey.map((v,c)=>Math.round(v+(LIT[i][c+1]-v)*energy)).join(',');
    base.push('rgb('+rgb+') '+stop+'%');
    cover.push('rgba('+rgb+','+veil+') '+stop+'%');
  });
  const gradient=stops=>'linear-gradient(to top,'+stops.join(',')+')';
  const colors={cover:gradient(cover),base:gradient(base)};
  ramps.set(step,colors);return colors;
}

// The light of a warm title spills just outside its glyphs: one short, faint halo.
function glow(step,em) {
  if (!step) return 'none';
  const w=step/64,near=Math.min(5,Math.max(1.2,em*.03));
  return 'drop-shadow(0 0 '+near.toFixed(1)+'px rgba(255,140,40,'+(.16*w).toFixed(3)+'))';
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
  return {title,width,height,words,em,touch,warmth:0,goal:0,near:0,last:-1,lenses:'',current:null,
    spots:Array.from({length:3},()=>({x:0,y:0,level:0}))};
}

function approach(now,aim,dt,still,up=.22,down=.9) {
  if (still || Math.abs(aim-now)<.004) return aim;
  return aim+(now-aim)*Math.exp(-dt/(aim>now ? up : down));
}

export function typeLight() {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),states=new Map();
  let active=null;
  function remove(state) {
    state.title.removeAttribute('data-lit');
    for (const prop of ['--ink-tile','--ink-ramp','--ink-veil','--ink-lenses','--ink-glow']) state.title.style.removeProperty(prop);
    states.delete(state.title);
  }
  // A title takes its whole gradient while its surface is hovered; the lenses follow the pointer over the glyphs.
  function target(title,point,{keyboard=false,touch=false}={}) {
    active=title;
    if (!title || !acceptsLight(title)) return;
    if (!states.has(title)) {
      if (states.size>=3) remove(states.values().next().value);
      states.set(title,readTitle(title,touch));
    }
    const state=states.get(title),box=title.getBoundingClientRect();
    state.goal=1;
    if (!point && !keyboard) {state.near=0;state.current=null;return;}
    let x=point?(point.x-box.left)*state.width/(box.width || 1):0,y=point?(point.y-box.top)*state.height/(box.height || 1):0;
    if (keyboard && state.words.length) {
      const w=state.words[Math.floor((state.words.length-1)/2)];x=(w.l+w.r)/2;y=(w.t+w.b)/2;
    }
    let nearest=null,gap=Infinity;
    for (const w of state.words) {
      const d=Math.hypot(Math.max(w.l-x,0,x-w.r),Math.max(w.t-y,0,y-w.b));
      if (d<gap) {nearest=w;gap=d;}
    }
    // The lens gathers as the pointer comes near the letters, and is full over them.
    const t=Math.min(1,gap/Math.max(24,state.em*.6));
    state.near=1-t*t*(3-2*t);
    if (!state.near || !nearest) {state.current=null;return;}
    let spot=null,dist=Math.max(12,state.em*.50);
    for (const s of state.spots) {
      const d=Math.hypot(x-s.x,y-s.y);
      if ((s.level || s===state.current) && d<dist) {spot=s;dist=d;}
    }
    if (!spot) {spot=state.spots.reduce((a,b)=>a.level<=b.level?a:b);spot.level=0;}
    spot.x=x;spot.y=y;state.current=spot;
  }
  function frame(dt) {
    let moving=false;
    for (const [title,s] of states) {
      if (!title.isConnected) {remove(s);continue;}
      const lit=title===active && acceptsLight(title);
      const still=reduced.matches,goal=lit?s.goal:0,near=lit?s.near:0;
      s.warmth=approach(s.warmth,goal,dt,still);
      const step=Math.round(s.warmth*64);
      if (step!==s.last) {
        const color=pigment(step);s.last=step;
        title.style.setProperty('--ink-ramp',color.base);title.style.setProperty('--ink-veil',color.cover);
        title.style.setProperty('--ink-glow',glow(step,s.em));
      }
      const lenses=[];
      let changing=s.warmth!==goal;
      for (const spot of s.spots) {
        const aim=spot===s.current?near:0;
        spot.level=approach(spot.level,aim,dt,still,.3,1.1);
        if (spot.level!==aim) changing=true;
        // A wide, soft lens: the light passes over the letters without ever switching one on by itself.
        const gain=Math.min(1,spot.level*.72);
        if (gain<.004) {lenses.push(clearLens);continue;}
        const radius=Math.max(40,s.em*2.1).toFixed(1)+'px '+Math.max(26,s.em*1.25).toFixed(1)+'px';
        const origin=spot.x.toFixed(1)+'px '+spot.y.toFixed(1)+'px';
        const tint=(rgb,a)=>'rgba('+rgb+','+(a*gain).toFixed(3)+')';
        lenses.push('radial-gradient(ellipse '+radius+' at '+origin+','+tint('255,244,214',.62)+' 0%,'+tint('255,214,140',.46)+' 26%,'+tint('255,170,70',.24)+' 54%,'+tint('255,140,40',.06)+' 80%,transparent)');
      }
      const result=lenses.join(',');
      if (result!==s.lenses) {title.style.setProperty('--ink-lenses',result);s.lenses=result;}
      if (!goal && !changing) remove(s);else if (changing) moving=true;
    }
    return moving;
  }
  function clear(){for (const s of states.values()) remove(s);active=null;}
  // Let every lit title cool down on its own instead of switching it off.
  function cool(){active=null;}
  return {target,frame,clear,cool};
}
