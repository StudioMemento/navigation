// Memory belongs to the outline. Adjacent cards can illuminate the same gutter.
const BINS = 96;
const REACH = 75;
const SPREAD = 73;
const PITCH = 6;
const BRUSH = 38;
const TILE = 256;
const RECT = [['0%','0%'],['100%','0%'],['100%','100%'],['0%','100%']];
const samples = [[0,0],[-45,0],[45,0],[0,-45],[0,45],[-38,-38],[38,-38],[-38,38],[38,38],[0,-72],[0,72],[-72,0],[72,0]];

// CSS resolves each percentage and cut corner in the card's own coordinate system. Reading these
// zero-area points after layout gives its actual projection, even while the 3D carousel is moving.
const outlines = new WeakMap();
function outline(card) {
  const face = card.querySelector(':scope > .tile-frame,:scope > .flow-face,:scope > .home-shade') || card;
  const clip = getComputedStyle(face).clipPath;
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
function nearby(point, dialog) {
  const cards = new Set();
  for (const [dx,dy] of samples) {
    const hit=document.elementFromPoint(point.x+dx,point.y+dy);
    const card=hit?.closest('.mm-tab');
    if (card && (!dialog || dialog.contains(card))) cards.add(card);
  }
  return cards;
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
  const probes=[];
  for (let i=0, side=0; i<BINS && length; i++) {
    const s=i*length/BINS;
    while (side<edges.length-1 && s>=edges[side].start+edges[side].len) side++;
    const e=edges[side], t=s-e.start;
    probes.push([e.x+t*e.ux,e.y+t*e.uy]);
  }
  return {edges, probes, length, points};
}

function excite(state, point) {
  const {edges,probes}=state.path;
  let gap=Infinity;
  for (const e of edges) {
    const x=point.x-e.x, y=point.y-e.y;
    const t=Math.max(0,Math.min(e.len,x*e.ux+y*e.uy));
    gap=Math.min(gap,Math.hypot(x-t*e.ux,y-t*e.uy));
  }
  state.target.fill(0);
  if (gap>=REACH) return;
  const near=Math.exp(-.5*(gap/31)**2)*(1-(gap/REACH)**3);
  probes.forEach(([x,y],i)=>{
    const d=Math.hypot(x-point.x,y-point.y);
    if (d<SPREAD*2.7) state.target[i]=near*Math.exp(-.5*(d/SPREAD)**2);
  });
}

// Pre-integrated warm light: a fine filament, a soft outside spill and a quieter inner rim.
// Stamping this kernel along the true polygon gives round joins and adds light across gaps.
function makeBrush() {
  const canvas=document.createElement('canvas'), scale=2, size=2*BRUSH;
  canvas.width=canvas.height=size*scale;
  const ctx=canvas.getContext('2d');
  if (!ctx) return null;
  const img=ctx.createImageData(canvas.width,canvas.height);
  const norm=PITCH/Math.sqrt(2*Math.PI);
  for (let row=0;row<canvas.height;row++) {
    const y=(row+.5)/scale-BRUSH;
    const side=.73+.40/(1+Math.exp(y/2));
    for (let col=0;col<canvas.width;col++) {
      const x=(col+.5)/scale-BRUSH, d=x*x+y*y;
      const soft=norm*side*(.72/10*Math.exp(-d/200)+.18/19*Math.exp(-d/722));
      const core=norm*.80/3.8*Math.exp(-.5*((x/3.8)**2+((y-.18)/.70)**2));
      const red=Math.min(1,soft+core);
      if (red<1/510) continue;
      const i=4*(row*canvas.width+col);
      img.data[i]=255;
      img.data[i+1]=(soft*157+core*218)/red;
      img.data[i+2]=(soft*62+core*141)/red;
      img.data[i+3]=255*red;
    }
  }
  ctx.putImageData(img,0,0);
  return canvas;
}

// Only the screen tiles containing visible light have a backing store; no viewport canvas or live blur.
function edgePainter() {
  const tiles=new Map(), spare=[];
  let brush=null;
  function clear() {
    for (const tile of tiles.values()) {tile.canvas.remove();if (spare.length<6) spare.push(tile);}
    tiles.clear();
  }
  function paint(states, parent) {
    if (!states.size) {clear();return;}
    if (!brush) brush=makeBrush();
    if (!brush) return;
    const dpr=Math.min(window.devicePixelRatio || 1,1.5);
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
        tile.canvas.style.transform='translate('+col*TILE+'px,'+row*TILE+'px)';
      }
      if (!tile.used) {
        tile.used=true;
        const {canvas,ctx}=tile;
        if (canvas.parentNode!==parent) parent.append(canvas);
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
          if (power<.012) continue;
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
      if (tile.used) continue;
      tile.canvas.remove();tiles.delete(key);
      if (spare.length<6) spare.push(tile);
    }
  }
  return {paint,clear};
}

export function edgeLight() {
  const states=new Map(), painter=edgePainter();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let parent=document.body, dirty=false;
  function target(point, dialog, focused) {
    dirty=true;
    parent=dialog || document.body;
    for (const state of states.values()) state.target.fill(0);
    if (!point || document.fullscreenElement) return;
    for (const card of focused ? [focused] : nearby(point,dialog)) {
      if (!card.isConnected) continue;
      const box=card.getBoundingClientRect();
      if (Math.min(point.x-box.left,box.right-point.x,point.y-box.top,box.bottom-point.y)>REACH+32 &&
          !card.matches('.home-card,.carousel-card,.flow-card')) continue;
      const points=outline(card);
      let state=states.get(card);
      if (!state) {
        state={energy:new Float32Array(BINS),next:new Float32Array(BINS),target:new Float32Array(BINS),path:contour(points)};
        states.set(card,state);
      } else if (points.length!==state.path.points.length || points.some((p,i)=>p.x!==state.path.points[i].x || p.y!==state.path.points[i].y)) {
        state.path=contour(points);
      }
      excite(state,point);
    }
  }
  function frame(dt) {
    let fading=false, changed=dirty;
    const decay=reduced.matches?0:Math.exp(-3.2*dt);
    const flow=Math.min(.18,dt*3.2);
    for (const [card,state] of states) {
      if (!card.isConnected) {states.delete(card);changed=true;continue;}
      let max=0;
      for (let i=0;i<BINS;i++) {
        const aim=state.target[i], before=state.energy[i];
        const adjacent=state.energy[(i+BINS-1)%BINS]+state.energy[(i+1)%BINS];
        let value=Math.max(aim,(before+flow*(adjacent-2*before))*decay);
        if (value-aim<.008) value=aim;
        state.next[i]=value;
        max=Math.max(max,value);
        if (value>aim) fading=true;
        if (Math.abs(before-value)>.0001) changed=true;
      }
      const previous=state.energy;
      state.energy=state.next;state.next=previous;
      if (max<.012) states.delete(card);
    }
    if (changed) painter.paint(states,parent);
    dirty=false;
    return fading;
  }
  function clear() {states.clear();painter.clear();dirty=false;}
  return {target,frame,clear};
}
