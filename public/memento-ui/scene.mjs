// Each facet samples the current viewport once in the compositor. Canvas, type and navigation
// belong to the same image. Only the facet masks and offsets move; no page elements are cloned.
const NS = 'http://www.w3.org/2000/svg';
const XLINK = 'http://www.w3.org/1999/xlink';
const OUT = 440, HOLD = 95, IN = 480;
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => { x = clamp(x); return x*x*(3-2*x); };
const svgURL = text => 'data:image/svg+xml,' + encodeURIComponent(text);
const root = document.documentElement;
function svg(tag, attributes = {}, parent) {
  const node = document.createElementNS(NS, tag);
  for (const [name,value] of Object.entries(attributes)) node.setAttribute(name, value);
  parent?.append(node);
  return node;
}
function imageSource(node, url) {
  node.setAttribute('href',url);
  node.setAttributeNS(XLINK,'xlink:href',url);
}

// Read both the midpoint image and its landing coordinates from the supplied vector.
let symbol;
async function iconSource() {
  // Production embeds the supplied SVG in the entry script. The unbundled module also runs directly.
  if (import.meta.mementoIcon) return import.meta.mementoIcon;
  const response = await fetch('/memento-ui/memento-icon.svg');
  if (!response.ok) throw Error('Memento icon unavailable');
  return response.text();
}
export function prepareSymbol() {
  return symbol ??= iconSource().then(source => {
    const art = new DOMParser().parseFromString(source, 'image/svg+xml');
    const vectors = art.getElementById('V_E_C');
    const [left,top,width,height] = art.documentElement.getAttribute('viewBox').split(/\s+/).map(Number);
    const path = new Path2D();
    for (const node of vectors.querySelectorAll('path,polygon')) {
      if (node.localName === 'path') path.addPath(new Path2D(node.getAttribute('d')));
      else {
        const coords=node.getAttribute('points').trim().split(/[\s,]+/).map(Number);
        path.moveTo(coords[0],coords[1]);
        for (let i=2;i<coords.length;i+=2) path.lineTo(coords[i],coords[i+1]);
        path.closePath();
      }
    }
    const ctx = document.createElement('canvas').getContext('2d');
    const points = [];
    for (let y=top+1;y<top+height;y+=2) for (let x=left+1;x<left+width;x+=2) {
      if (ctx.isPointInPath(path,x,y)) points.push({x:(x-left)/width-.5,y:(y-top)/height-.5});
    }
    if (!points.length) throw Error('Empty Memento icon');
    points.sort((a,b)=>Math.atan2(a.y,a.x)-Math.atan2(b.y,b.x));
    const image=svgURL(new XMLSerializer().serializeToString(art.documentElement));
    root.style.setProperty('--memento-symbol','url("'+image+'")');
    return {image,points};
  }).catch(error => {symbol=undefined;throw error;});
}

// Four shared masks cover every rectangle exactly. The diagonal alternates at each join.
const triangles = [[[0,0],[1,0],[0,1]],[[1,0],[1,1],[0,1]],[[0,0],[1,0],[1,1]],[[0,0],[1,1],[0,1]]];
const masks = triangles.map(t=>svgURL('<svg xmlns="'+NS+'" viewBox="0 0 1 1" preserveAspectRatio="none"><polygon fill="white" points="'+t.map(v=>v.join(',')).join(' ')+'"/></svg>'));
function box(node,x,y,w,h) {
  node.setAttribute('x',x.toFixed(2)); node.setAttribute('y',y.toFixed(2));
  node.setAttribute('width',w.toFixed(2)); node.setAttribute('height',h.toFixed(2));
}
function makePlane(w,h,plate,points) {
  const cols=w>=h?Math.min(7,Math.max(4,Math.round(w/h*3))):3;
  const rows=w>=h?3:Math.min(6,Math.max(4,Math.round(h/w*3)));
  const cuts=(n,span,phase)=>Array.from({length:n+1},(_,i)=>(i+(i&&i<n?.16*Math.sin(i*2.7+phase):0))*span/n);
  const xs=cuts(cols,w,1.3),ys=cuts(rows,h,.4),parts=[];
  for(let row=0;row<rows;row++) for(let col=0;col<cols;col++) {
    const x=xs[col],y=ys[row],width=xs[col+1]-x,height=ys[row+1]-y;
    for(const shape of (row+col)%2?[2,3]:[0,1]) {
      const vertices=triangles[shape];
      const cx=x+width*vertices.reduce((sum,v)=>sum+v[0],0)/3,cy=y+height*vertices.reduce((sum,v)=>sum+v[1],0)/3;
      parts.push({x,y,width,height,shape,cx,cy,angle:Math.atan2(cy-h/2,cx-w/2)});
    }
  }
  parts.sort((a,b)=>a.angle-b.angle);
  return parts.map((p,i)=>{
    const at=points[Math.floor((i+.5)*points.length/parts.length)],seed=Math.sin(i*13.13+1.6);
    return {...p,tx:w/2+at.x*plate,ty:h/2+at.y*plate,
      lag:.12*(1+seed)/2,arcX:Math.cos(p.angle+.6*seed)*Math.min(w,h)*.07,
      arcY:Math.sin(p.angle+.6*seed)*Math.min(w,h)*.07,
      endScale:Math.min(.16,plate*.054/Math.max(p.width,p.height))};
  });
}
function compositor(w,h,plate,art,mode) {
  const parts=makePlane(w,h,plate,art.points),id='memento-scene-fragments';
  const defsHost=svg('svg',{width:0,height:0,'aria-hidden':'true','data-memento-scene-defs':''},root);
  const defs=svg('defs',{},defsHost);
  const filter=svg('filter',{id,x:0,y:0,width:w,height:h,filterUnits:'userSpaceOnUse',primitiveUnits:'userSpaceOnUse','color-interpolation-filters':'sRGB'},defs);
  svg('feFlood',{'flood-color':'#1d1d1b',result:'matte'},filter);
  const markImage=svg('feImage',{x:(w-plate)/2,y:(h-plate)/2,width:plate,height:plate,result:'icon'},filter);
  imageSource(markImage,art.image);
  const markAlpha=svg('feFuncA',{type:'linear',slope:0},svg('feComponentTransfer',{in:'icon',result:'mark'},filter));
  parts.forEach((p,i)=>{
    p.mask=svg('feImage',{result:'m'+i,preserveAspectRatio:'none'},filter);
    imageSource(p.mask,masks[p.shape]);
    const clip=svg('feComposite',{in:'SourceGraphic',in2:'m'+i,operator:'in',result:'c'+i},filter);
    box(clip,p.x,p.y,p.width,p.height);
    p.move=svg('feOffset',{in:'c'+i,result:'p'+i},filter);
  });
  const pieces=svg('feMerge',{result:'pieces'},filter);
  parts.forEach((_,i)=>svg('feMergeNode',{in:'p'+i},pieces));
  const tone=svg('feComponentTransfer',{in:'pieces',result:'lit'},filter);
  const rgb=['R','G','B'].map(channel=>svg('feFunc'+channel,{type:'linear'},tone));
  const alpha=svg('feFuncA',{type:'linear'},tone);
  const intact=svg('feFuncA',{type:'linear'},svg('feComponentTransfer',{in:'SourceGraphic',result:'uncut'},filter));
  const result=svg('feMerge',{},filter);
  for(const name of ['matte','mark','lit','uncut']) svg('feMergeNode',{in:name},result);
  const url='url("'+location.href.split('#')[0]+'#'+id+'")';
  root.style.setProperty('--memento-fragments',url);
  let overlay,curtain,holes,icon,flying;
  if(mode!=='native') {
    overlay=document.createElement('div');overlay.className='memento-scene-overlay';overlay.setAttribute('aria-hidden','true');
    if('showPopover' in overlay) overlay.setAttribute('popover','manual');
    root.append(overlay);overlay.showPopover?.();
    if(mode==='glass') {overlay.style.backdropFilter=url;overlay.style.webkitBackdropFilter=url;}
    else {
      // A vector mask exposes the real scene through shrinking facets on older compositors.
      const layer=svg('svg',{viewBox:'0 0 '+w+' '+h,width:'100%',height:'100%'},overlay);
      const mask=svg('mask',{id:'memento-scene-openings'},svg('defs',{},layer));
      svg('rect',{width:w,height:h,fill:'white'},mask);
      holes=parts.map(()=>svg('polygon',{fill:'black'},mask));
      curtain=svg('g',{mask:'url(#memento-scene-openings)'},layer);
      svg('rect',{width:w,height:h,fill:'#1d1d1b'},curtain);
      icon=svg('image',{x:(w-plate)/2,y:(h-plate)/2,width:plate,height:plate},curtain);imageSource(icon,art.image);
      flying=parts.map((_,i)=>svg('polygon',{fill:i%3===0?'#d8c6b8':i%3===1?'#8f8782':'#d9d7d4'},layer));
    }
  }
  return {
    draw(progress) {
      const glow=ease((progress-.52)/.36), whiten=.86*ease((progress-.45)/.42), ink=1-ease((progress-.80)/.18);
      const q=progress>=.998;
      intact.setAttribute('slope',1-ease(progress/.10));
      markAlpha.setAttribute('slope',glow);alpha.setAttribute('slope',ink);
      rgb.forEach((fn,i)=>{fn.setAttribute('slope',1-whiten);fn.setAttribute('intercept',whiten*[1,.98,.95][i]);});
      icon?.setAttribute('opacity',glow);
      parts.forEach((p,i)=>{
        const t=ease((progress-p.lag)/(1-p.lag));
        const size=1-(1-p.endScale)*t;
        const dx=(p.tx-p.cx)*t+p.arcX*Math.sin(Math.PI*t),dy=(p.ty-p.cy)*t+p.arcY*Math.sin(Math.PI*t);
        const x=p.cx+(p.x-p.cx)*size,y=p.cy+(p.y-p.cy)*size,width=p.width*size,height=p.height*size;
        if(!q){box(p.mask,x,y,width,height);box(p.move,x+dx-1,y+dy-1,width+2,height+2);p.move.setAttribute('dx',dx.toFixed(2));p.move.setAttribute('dy',dy.toFixed(2));}
        if(holes){
          const verts=triangles[p.shape].map(([a,b])=>[x+a*width,y+b*height]);
          holes[i].setAttribute('points',verts.map(v=>v.join(',')).join(' '));
          flying[i].setAttribute('points',verts.map(([a,b])=>(a+dx)+','+(b+dy)).join(' '));
          flying[i].setAttribute('opacity',String(ink*ease(t/.22)));
        }
      });
      if(holes&&q) curtain.removeAttribute('mask');else if(holes) curtain.setAttribute('mask','url(#memento-scene-openings)');
    },
    destroy(){overlay?.remove();defsHost.remove();root.style.removeProperty('--memento-fragments');}
  };
}
function runFrames(phase,paint,signal) {
  const duration=phase==='out'?OUT+HOLD:phase==='in'?IN:OUT+HOLD+IN;
  return new Promise(resolve=>{
    let handle=0,start,last;
    const end=()=>{cancelAnimationFrame(handle);signal.removeEventListener('abort',end);resolve();};
    function frame(time){
      if(signal.aborted){end();return;}
      start??=time;const elapsed=time-start;
      const incoming=phase==='in'||(phase==='pair'&&elapsed>OUT+HOLD);
      const progress=incoming?1-clamp((elapsed-(phase==='pair'?OUT+HOLD:0))/IN):clamp(elapsed/OUT);
      if(progress!==last){paint(progress,incoming);last=progress;}
      if(elapsed>=duration)end();else handle=requestAnimationFrame(frame);
    }
    signal.addEventListener('abort',end,{once:true});
    if(signal.aborted)end();else handle=requestAnimationFrame(frame);
  });
}

export async function playScene(phase,signal,historyTransition) {
  const art=await prepareSymbol();if(signal.aborted)return;
  const w=root.clientWidth,h=window.innerHeight,plate=Math.min(338,Math.max(172,Math.min(w,h)*.42));
  let surface,transition=historyTransition;
  const parked=()=>root.toggleAttribute('data-memento-parked',phase==='out'&&!signal.aborted);
  const abortNative=()=>{transition?.skipTransition();};
  try {
    if(transition || document.startViewTransition) {
      root.dataset.mementoSceneNative='';root.dataset.mementoFace=phase==='in'?'new':'old';
      surface=compositor(w,h,plate,art,'native');surface.draw(phase==='in'?1:0);
      transition??=document.startViewTransition(parked);
      signal.addEventListener('abort',abortNative,{once:true});
      let captured=false;
      try{await transition.ready;captured=true;}catch{/* A browser can decline a viewport capture. */}
      if(signal.aborted)return;
      if(captured){
        await runFrames(phase,(progress,incoming)=>{
          const face=incoming?'new':'old';if(root.dataset.mementoFace!==face)root.dataset.mementoFace=face;
          surface.draw(progress);
        },signal);
        return;
      }
      delete root.dataset.mementoSceneNative;surface.destroy();surface=null;
    }
    const glass=CSS.supports('backdrop-filter','url(#a)')||CSS.supports('-webkit-backdrop-filter','url(#a)');
    surface=compositor(w,h,plate,art,glass?'glass':'mask');surface.draw(phase==='in'?1:0);
    root.removeAttribute('data-memento-parked');
    await runFrames(phase==='pair'?'in':phase,p=>surface.draw(p),signal);
  } finally {
    parked();transition?.skipTransition();signal.removeEventListener('abort',abortNative);
    surface?.destroy();delete root.dataset.mementoSceneNative;delete root.dataset.mementoFace;
  }
}
