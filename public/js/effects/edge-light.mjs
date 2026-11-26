import { acceptsLight } from './surface-targets.mjs';

// Each card owns a continuous perimeter and a short-lived light history.
const BINS=96, REACH=184, PITCH=6, BRUSH=60, TILE=256;
const RECT=[['0%','0%'],['100%','0%'],['100%','100%'],['0%','100%']];
function smooth(t) { return t*t*t*(t*(t*6-15)+10); }

// CSS resolves each percentage and cut corner in the card's own coordinate system. Reading these
// zero-area points after layout gives its actual projection, even while the 3D carousel is moving.
const outlines = new WeakMap();
function outline(card) {
  const face = card.querySelector(':scope > .tile-frame,:scope > .flow-face,:scope > .home-shade') || card;
  const style=getComputedStyle(face);
  if (style.position==='static') face.setAttribute('data-mm-outline-anchor','');
  const clip=style.clipPath;
  let entry = outlines.get(card);
  if (!entry || entry.clip !== clip) {
    entry?.holder.remove();
    let vertices = RECT;
    if (clip?.startsWith('polygon(')) {
      vertices = clip.slice(8,-1).split(/,(?![^()]*\))/).map(vertex => vertex.trim().match(/(?:[^\s()]+\([^)]*\)|[^\s]+)/g));
      if (vertices.some(pair => !pair || pair.length !== 2)) vertices = RECT;
    }
    const holder = document.createElement('span');
    holder.className = 'mm-outline-points';
    holder.setAttribute('aria-hidden','true');
    const markers = vertices.map(([left,top]) => {
      const marker = document.createElement('i');
      marker.style.left=left; marker.style.top=top; holder.append(marker);
      return marker;
    });
    face.append(holder);
    entry={clip,holder,markers}; outlines.set(card,entry);
  }
  return entry.markers.map(marker => {
    const point=marker.getBoundingClientRect();
    return {x:point.left,y:point.top};
  });
}
function contour(points) {
  const edges=[];
  let length=0;
  points.forEach((a,i)=>{
    const b=points[(i+1)%points.length];
    const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);
    if (!len) return;
    edges.push({x:a.x,y:a.y,ux:dx/len,uy:dy/len,len,start:length});
    length+=len;
  });
  const shape=new Path2D();
  points.forEach((p,i)=>{if (!i) shape.moveTo(p.x,p.y);else shape.lineTo(p.x,p.y);});
  shape.closePath();
  const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
  return {edges,length,points,shape,left:Math.min(...xs),right:Math.max(...xs),top:Math.min(...ys),bottom:Math.max(...ys)};
}

function excitation(state,point,card) {
  const path=state.path;
  let gap=Infinity,at=0,px=0,py=0;
  for (const e of path.edges) {
    const t=Math.max(0,Math.min(e.len,(point.x-e.x)*e.ux+(point.y-e.y)*e.uy));
    const x=e.x+t*e.ux,y=e.y+t*e.uy,d=Math.hypot(point.x-x,point.y-y);
    if (d<gap) {gap=d;at=e.start+t;px=x;py=y;}
  }
  if (gap>=REACH || path.length<1) return;
  // A cut corner may be physically behind another surface.
  const cx=(path.left+path.right)/2,cy=(path.top+path.bottom)/2;
  const inward=Math.min(1,4/Math.max(1,Math.hypot(cx-px,cy-py)));
  const hit=document.elementFromPoint(px+(cx-px)*inward,py+(cy-py)*inward);
  if (hit && !card.contains(hit)) return;
  const gain=(1-smooth(gap/REACH))/(1+(gap/90)**2);
  const spread=Math.min(135,Math.max(29,path.length*.17));
  for (let i=0;i<BINS;i++) {
    const distance=Math.abs(i*path.length/BINS-at);
    const along=Math.min(distance,path.length-distance)/spread;
    state.target[i]=gain*Math.exp(-.9*along*along);
  }
}

// The filament and its two soft tails share one cached brush. Its support ends at zero
// in every direction, so a rotated edge draws exactly the same samples across tile seams.
function makeBrush() {
  const canvas=document.createElement('canvas'),scale=2;
  canvas.width=canvas.height=2*BRUSH*scale;
  const ctx=canvas.getContext('2d');
  if (!ctx) return null;
  const img=ctx.createImageData(canvas.width,canvas.height),norm=PITCH/Math.sqrt(2*Math.PI);
  for (let row=0;row<canvas.height;row++) {
    const y=(row+.5)/scale-BRUSH;
    for (let col=0;col<canvas.width;col++) {
      const x=(col+.5)/scale-BRUSH,d=x*x+y*y,r=Math.sqrt(d);
      if (r>=BRUSH) continue;
      const taper=1-smooth(Math.max(0,(r-34)/(BRUSH-34)));
      const spill=norm*(.53/9*Math.exp(-d/162)+.31/22*Math.exp(-d/968))*taper;
      const core=norm*.95/4.2*Math.exp(-.5*((x/4.2)**2+(y/.88)**2));
      const alpha=spill+core;
      if (alpha<.5/255) continue;
      const i=4*(row*canvas.width+col);
      img.data[i]=255;img.data[i+1]=(spill*151+core*227)/alpha;
      img.data[i+2]=(spill*56+core*150)/alpha;img.data[i+3]=255*Math.min(1,alpha);
    }
  }
  ctx.putImageData(img,0,0);
  return canvas;
}

// Only the screen tiles containing visible light have a backing store; no viewport canvas or live blur.
function edgePainter() {
  const tiles=new Map(), spare=[];
  let brush=null,plane=null;
  function portal(parent) {
    if (!plane) {
      plane=document.createElement('div');plane.className='mm-edge-plane';plane.setAttribute('aria-hidden','true');
    }
    if (plane.parentNode!==parent) parent.append(plane);
    return plane.getBoundingClientRect();
  }
  function clear() {
    for (const tile of tiles.values()) {tile.canvas.remove();if (spare.length<6) spare.push(tile);}
    tiles.clear();plane?.remove();
  }
  function paint(states, parent, blockers) {
    if (!states.size) {clear();return;}
    if (!brush) brush=makeBrush();
    if (!brush) return;
    const origin=portal(parent),dpr=Math.round(TILE*Math.min(window.devicePixelRatio || 1,1.5))/TILE;
    for (const tile of tiles.values()) tile.used=false;
    function tileAt(col,row) {
      const key=col+','+row;
      let tile=tiles.get(key);
      if (!tile) {
        tile=spare.pop();
        if (!tile) {
          const canvas=document.createElement('canvas');
          canvas.className='mm-edge-light';canvas.setAttribute('aria-hidden','true');
          canvas.style.width=canvas.style.height=TILE+'px';
          tile={canvas,ctx:canvas.getContext('2d')};
        }
        tile.used=false;
        tiles.set(key,tile);
        tile.col=col;tile.row=row;
      }
      if (!tile.used) {
        tile.used=true;
        const {canvas,ctx}=tile;
        if (canvas.parentNode!==plane) plane.append(canvas);
        canvas.style.transform='translate('+(col*TILE-origin.left)+'px,'+(row*TILE-origin.top)+'px)';
        const size=Math.round(TILE*dpr);
        if (canvas.width!==size || canvas.height!==size) canvas.width=canvas.height=size;
        if (ctx) {
          ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,size,size);
          ctx.globalCompositeOperation='lighter';
        }
      }
      return tile.ctx;
    }
    const width=document.documentElement.clientWidth, height=window.innerHeight;
    for (const state of states.values()) {
      for (const e of state.path.edges) {
        const count=Math.ceil(e.len/PITCH), step=e.len/count;
        for (let n=0;n<count;n++) {
          const t=step*(n+.5), bin=(e.start+t)*BINS/state.path.length;
          const i=Math.floor(bin), f=bin-i;
          const power=state.energy[i]*(1-f)+state.energy[(i+1)%BINS]*f;
          if (power<.0015) continue;
          const x=e.x+t*e.ux,y=e.y+t*e.uy;
          if (x+BRUSH<0 || y+BRUSH<0 || x-BRUSH>=width || y-BRUSH>=height) continue;
          const left=Math.floor(Math.max(0,x-BRUSH)/TILE), right=Math.floor(Math.min(width-1,x+BRUSH)/TILE);
          const top=Math.floor(Math.max(0,y-BRUSH)/TILE), bottom=Math.floor(Math.min(height-1,y+BRUSH)/TILE);
          for (let row=top;row<=bottom;row++) for (let col=left;col<=right;col++) {
            const ctx=tileAt(col,row);
            if (!ctx) continue;
            ctx.globalAlpha=Math.min(1,power*step/PITCH);
            ctx.setTransform(dpr*e.ux,dpr*e.uy,-dpr*e.uy,dpr*e.ux,dpr*(x-col*TILE),dpr*(y-row*TILE));
            ctx.drawImage(brush,-BRUSH,-BRUSH,BRUSH*2,BRUSH*2);
          }
        }
      }
    }
    for (const [key,tile] of tiles) {
      if (tile.used) {
        const {ctx,col,row}=tile;
        if (ctx) {
          ctx.setTransform(dpr,0,0,dpr,-col*TILE*dpr,-row*TILE*dpr);
          ctx.globalAlpha=1;ctx.globalCompositeOperation='destination-out';ctx.fillStyle='#000';
          for (const p of blockers) {
            if (p.right>col*TILE && p.left<(col+1)*TILE && p.bottom>row*TILE && p.top<(row+1)*TILE) ctx.fill(p.shape);
          }
        }
        continue;
      }
      tile.canvas.remove();tiles.delete(key);
      if (spare.length<6) spare.push(tile);
    }
  }
  return {paint,clear};
}

export function edgeLight(cards) {
  const states=new Map(),painter=edgePainter(),paths=new WeakMap();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let parent=document.body,dirty=false,blockers=[];
  function geometry(card) {
    const points=outline(card),old=paths.get(card);
    if (old && points.length===old.points.length && points.every((p,i)=>p.x===old.points[i].x && p.y===old.points[i].y)) return old;
    const path=contour(points);paths.set(card,path);return path;
  }
  function target(point,dialog,focused) {
    dirty=true;parent=dialog || document.body;
    for (const state of states.values()) state.target.fill(0);
    if (!point || document.fullscreenElement) return;
    const nearby=[];
    for (const card of cards) {
      if (!card.isConnected || (dialog ? !dialog.contains(card) : card.closest('dialog'))) continue;
      const b=card.getBoundingClientRect(),x=point.x,y=point.y;
      if (!b.width || !b.height) continue;
      const eligible=acceptsLight(card);
      nearby.push({card,box:b,eligible});
      if (!eligible || (focused && focused!==card) || x<b.left-REACH || x>b.right+REACH || y<b.top-REACH || y>b.bottom+REACH ||
          Math.min(x-b.left,b.right-x,y-b.top,b.bottom-y)>REACH+48) continue;
      const path=geometry(card);
      let state=states.get(card);
      if (!state) {state={energy:new Float32Array(BINS),next:new Float32Array(BINS),target:new Float32Array(BINS)};states.set(card,state);}
      state.path=path;excitation(state,point,card);
    }
    const emitters=[...states.values()].map(s=>s.path);
    blockers=[];
    for (const {card,box:b,eligible} of nearby) {
      if (!emitters.some(p=>b.left<p.right+BRUSH && b.right>p.left-BRUSH && b.top<p.bottom+BRUSH && b.bottom>p.top-BRUSH)) continue;
      // An inactive preview still owns its photograph. Protect it from a neighbouring rim.
      if (!eligible) {
        const style=getComputedStyle(card);
        if (style.visibility!=='visible' || Number(style.opacity)<.005) continue;
      }
      blockers.push(geometry(card));
    }
  }
  function frame(dt) {
    let moving=false,changed=dirty;
    const fall=Math.exp(-dt/.42),rise=1-Math.exp(-dt/.12),flow=Math.min(.14,dt*2);
    for (const [card,state] of states) {
      if (!acceptsLight(card)) {states.delete(card);changed=true;continue;}
      let max=0;
      for (let i=0;i<BINS;i++) {
        const before=state.energy[i],aim=state.target[i];
        const adjacent=state.energy[(i+BINS-1)%BINS]+state.energy[(i+1)%BINS];
        let value=aim>=before ? before+(aim-before)*rise : Math.max(aim,(before+flow*(adjacent-2*before))*fall);
        if (reduced.matches || Math.abs(value-aim)<.0015) value=aim;
        state.next[i]=value;max=Math.max(max,value);
        if (Math.abs(value-aim)>.00001) moving=true;
        if (Math.abs(before-value)>.00001) changed=true;
      }
      const old=state.energy;state.energy=state.next;state.next=old;
      if (max<.0015 && !state.target.some(p=>p>.0015)) states.delete(card);
    }
    if (changed) {
      // Include the emitting silhouettes of any trails left behind the pointer.
      const opaque=new Set(blockers);
      for (const state of states.values()) opaque.add(state.path);
      painter.paint(states,parent,opaque);
    }
    dirty=false;return moving;
  }
  function clear(){states.clear();blockers=[];painter.clear();dirty=false;}
  return {target,frame,clear};
}
