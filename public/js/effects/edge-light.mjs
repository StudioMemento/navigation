// Probe just the cards close to the pointer, including the cards across a gutter.
const REACH = 75;
const RADIUS = 174;
const EXTENT = RADIUS * 2 + 8;
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
    card.append(holder);
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
// Crop in screen space before rasterizing. A tall panel never creates a panel-sized blur surface.
function localStroke(points, pointer, origin) {
  const path = new Path2D();
  let nearest = Infinity;
  for (let i=0; i<points.length; i++) {
    const a=points[i], b=points[(i+1)%points.length];
    const dx=b.x-a.x, dy=b.y-a.y, length=Math.hypot(dx,dy);
    if (!length) continue;
    const ux=dx/length, uy=dy/length;
    const px=pointer.x-a.x, py=pointer.y-a.y;
    const along=px*ux+py*uy, normal=Math.abs(px*uy-py*ux);
    const gap=Math.hypot(normal,Math.max(0,-along,along-length));
    nearest=Math.min(nearest,gap);
    if (gap>RADIUS) continue;
    const spread=Math.sqrt(Math.max(0,RADIUS*RADIUS-normal*normal));
    const lo=Math.max(0,along-spread), hi=Math.min(length,along+spread);
    path.moveTo(a.x+lo*ux-origin.x,a.y+lo*uy-origin.y);
    path.lineTo(a.x+hi*ux-origin.x,a.y+hi*uy-origin.y);
  }
  if (nearest>=REACH) return null;
  return {path,strength:Math.exp(-.5*(nearest/27)**2)*(1-(nearest/REACH)**3)};
}
const bands = [
  [25,12,'255,128,20',.43], [14,7,'255,151,28',.65],
  [7,3.8,'255,175,53',.76], [3,1.3,'255,199,89',.90], [1.35,0,'255,246,194',1]
];
function brush(ctx,rgb,alpha) {
  const middle=EXTENT/2;
  const ramp=ctx.createRadialGradient(middle,middle,0,middle,middle,RADIUS);
  ramp.addColorStop(0,`rgba(${rgb},${alpha})`);
  ramp.addColorStop(.24,`rgba(${rgb},${alpha*.86})`);
  ramp.addColorStop(.61,`rgba(255,155,44,${alpha*.32})`);
  ramp.addColorStop(1,'rgba(249,125,18,0)');
  return ramp;
}
export function edgeLight() {
  const canvas=document.createElement('canvas'), band=document.createElement('canvas');
  canvas.className='mm-edge-light';canvas.setAttribute('aria-hidden','true');canvas.hidden=true;
  const centre=EXTENT/2;
  let ctx, paint, passes, scale=0;
  function clear(){canvas.hidden=true;}
  function draw(point, dialog, focused) {
    if (!point || document.fullscreenElement) {clear();return;}
    const cards=focused ? new Set([focused]) : nearby(point,dialog);
    const origin={x:Math.round(point.x-centre),y:Math.round(point.y-centre)};
    const strokes=[];
    for (const card of cards) {
      if (!card.isConnected) continue;
      if (!card.matches('.home-card,.carousel-card,.showcase-card,.flow-card')) {
        const box=card.getBoundingClientRect();
        const inset=Math.min(point.x-box.left,box.right-point.x,point.y-box.top,box.bottom-point.y);
        if (inset>REACH+32) continue;
      }
      const stroke=localStroke(outline(card),point,origin);
      if (stroke) strokes.push(stroke);
    }
    if (!strokes.length) {clear();return;}
    const dpr=Math.min(devicePixelRatio||1,matchMedia('(pointer:coarse)').matches?1.5:2);
    if (dpr!==scale) {
      scale=dpr;
      canvas.width=canvas.height=band.width=band.height=Math.ceil(EXTENT*dpr);
      canvas.style.width=canvas.style.height=EXTENT+'px';
      ctx=canvas.getContext('2d');paint=band.getContext('2d');
      if (!ctx || !paint) {clear();return;}
      paint.setTransform(scale,0,0,scale,0,0);
      paint.lineCap='round';paint.globalCompositeOperation='lighter';
      ctx.globalCompositeOperation='lighter';
      passes=bands.map(([width,blur,rgb,alpha])=>({width,blur,rgb,gradient:brush(paint,rgb,alpha)}));
    }
    if (!ctx || !paint) return;
    const parent=dialog||document.body;
    if (canvas.parentNode!==parent) parent.append(canvas);
    canvas.style.transform=`translate(${origin.x}px,${origin.y}px)`;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Combine neighbouring outlines before blurring. Four cards meeting at a corner cost the same five passes.
    for (const {width,blur,rgb,gradient} of passes) {
      paint.clearRect(0,0,EXTENT,EXTENT);paint.lineWidth=width;paint.strokeStyle=gradient;
      for (const {path,strength} of strokes) {paint.globalAlpha=strength;paint.stroke(path);}
      if ('filter' in ctx) ctx.filter=blur?`blur(${blur*scale}px)`:'none';
      else {ctx.shadowBlur=blur*scale;ctx.shadowColor=`rgb(${rgb})`;}
      ctx.drawImage(band,0,0);
    }
    if ('filter' in ctx) ctx.filter='none';
    ctx.shadowBlur=0;canvas.hidden=false;
  }
  return {draw,clear};
}
