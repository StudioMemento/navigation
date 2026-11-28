import { available, boxDistance, faceOf, MOVING, outlinePoints, slideOf } from './surface-targets.mjs';

const SVG = 'http://www.w3.org/2000/svg';
const HINT_RANGE = 220;
const HALO = [[44,.012],[32,.023],[23,.037],[16,.058],[10,.092],[6,.14],[3,.22]];
let sequence = 0;

function svg(tag, attrs = {}) {
  const node = document.createElementNS(SVG, tag);
  for (const [name,value] of Object.entries(attrs)) node.setAttribute(name, value);
  return node;
}

function nearest(points, x, y) {
  let result = {x,y,gap:Infinity};
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i+1) % points.length], dx = b.x-a.x, dy = b.y-a.y;
    const t = Math.max(0, Math.min(1, ((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy || 1)));
    const px = a.x+t*dx, py = a.y+t*dy, gap = Math.hypot(x-px,y-py);
    if (gap < result.gap) result = {x:px,y:py,gap};
  }
  return result;
}

// On a slide this SVG is a child of the moving card, beside the opaque clipped
// face. The browser projects and composites both as one surface, also in a dialog.
// On a stationary clipped panel a sibling provides room for the outside halo.
function makeEdge(card) {
  const id = 'mm-edge-' + ++sequence;
  const root = svg('svg', {class:'mm-edge', 'aria-hidden':'true', focusable:'false', preserveAspectRatio:'none'});
  const defs = svg('defs'), shape = svg('path', {id});
  const gradient = svg('radialGradient', {id:id+'-light', gradientUnits:'userSpaceOnUse'});
  for (const [offset,color,opacity] of [[0,'#ffcf91',1],[.24,'#ffac5e',.96],[.62,'#ff911f',.58],[1,'#ff8619',0]]) {
    gradient.append(svg('stop', {offset, 'stop-color':color, 'stop-opacity':opacity}));
  }
  const clip = svg('clipPath', {id:id+'-outside', clipPathUnits:'userSpaceOnUse'});
  const exterior = svg('path', {'clip-rule':'evenodd'});
  clip.append(exterior);
  defs.append(shape,gradient,clip);
  const glow = svg('g', {'clip-path':'url(#'+id+'-outside)'});
  const stroke = (width, opacity) => svg('use', {href:'#'+id, fill:'none', stroke:'url(#'+id+'-light)', 'stroke-linejoin':'round', 'stroke-width':width, opacity});
  for (const [width,opacity] of HALO) glow.append(stroke(width,opacity));
  const pulse = stroke(3,0);
  root.append(defs,glow,stroke(1.35,1),pulse);
  let holder = null;
  if (slideOf(card) === card) {
    card.append(root);
  } else {
    holder = document.createElement('span');
    holder.className = 'mm-static-edge';
    holder.setAttribute('aria-hidden','true');
    holder.append(root);
    card.parentElement.append(holder);
  }
  return {card,face:faceOf(card),root,holder,shape,exterior,gradient,pulse,lastPulse:0,key:'',timer:0};
}

function align(edge, box) {
  const {face,holder,root} = edge;
  if (holder) {
    const parent = holder.offsetParent;
    if (!parent) return false;
    const origin = parent.getBoundingClientRect();
    const x = box.left-origin.left-parent.clientLeft+parent.scrollLeft;
    const y = box.top-origin.top-parent.clientTop+parent.scrollTop;
    holder.style.transform = 'translate('+x+'px,'+y+'px)';
    holder.style.width = box.width+'px';
    holder.style.height = box.height+'px';
  }
  const width = holder ? box.width : face.offsetWidth, height = holder ? box.height : face.offsetHeight;
  if (!width || !height) return false;
  const clip = getComputedStyle(face).clipPath, key = [width,height,clip].join('/');
  if (key !== edge.key) {
    edge.key = key; edge.width = width; edge.height = height;
    edge.points = outlinePoints(clip,width,height);
    const path = 'M'+edge.points.map(p => p.x+' '+p.y).join(' L')+' Z';
    edge.shape.setAttribute('d',path);
    edge.exterior.setAttribute('d','M-30 -30 H'+(width+30)+' V'+(height+30)+' H-30 Z '+path);
    root.setAttribute('viewBox','0 0 '+width+' '+height);
    edge.gradient.setAttribute('r',Math.min(350,Math.max(110,Math.min(width,height)*.84)));
  }
  return true;
}

export function edgeLight(cards) {
  const live = new Map();
  function drop(edge) {
    clearTimeout(edge.timer);
    (edge.holder || edge.root).remove();
    live.delete(edge.card);
  }
  function fade(edge) {
    if (edge.timer) return;
    edge.root.style.opacity = '0';
    edge.timer = setTimeout(() => drop(edge), 165);
  }
  function paint(card, point, box, strength) {
    let edge = live.get(card);
    if (!edge) {edge = makeEdge(card); live.set(card,edge);}
    clearTimeout(edge.timer); edge.timer = 0;
    if (!align(edge,box)) {drop(edge);return;}
    const aim = nearest(edge.points,(point.x-box.left)*edge.width/box.width,(point.y-box.top)*edge.height/box.height);
    edge.gradient.setAttribute('cx',aim.x.toFixed(2));
    edge.gradient.setAttribute('cy',aim.y.toFixed(2));
    const gain = Math.max(.30, 1-aim.gap/390);
    edge.root.style.opacity = (strength*gain).toFixed(3);
  }
  function target(point, {primary=null,scope=null,hints=true} = {}) {
    const next = new Set();
    if (point) {
      const choices = [];
      for (const card of primary && !hints ? [primary] : cards) {
        if (card !== primary && !hints || !available(card) || card.closest(MOVING) || (scope && !scope.contains(card))) continue;
        if (card !== primary && card.style.visibility === 'hidden') continue;
        const face = faceOf(card), box = face.getBoundingClientRect();
        if (!box.width || !box.height || box.bottom <= 0 || box.right <= 0 || box.top >= innerHeight || box.left >= innerWidth) continue;
        const distance = boxDistance(box,point);
        if (card !== primary && distance >= HINT_RANGE) continue;
        if (getComputedStyle(face).visibility === 'hidden') continue;
        choices.push({card,box,distance});
      }
      choices.sort((a,b) => Number(b.card===primary)-Number(a.card===primary) || a.distance-b.distance);
      for (const {card,box,distance} of choices.slice(0,3)) {
        next.add(card);
        paint(card,point,box,card === primary ? 1 : .32*(1-distance/HINT_RANGE)**2);
      }
    }
    for (const [card,edge] of live) {
      if (!card.isConnected || !available(card)) drop(edge);
      else if (!next.has(card)) fade(edge);
    }
  }
  function feed(card, strength) {
    const edge = live.get(card);
    if (!edge || edge.timer || strength <= .05) return;
    const now = performance.now();
    if (now-edge.lastPulse < 160) return;
    edge.lastPulse = now;
    edge.pulse.animate?.([{opacity:Math.min(.55,strength)},{opacity:0}],{duration:240,easing:'ease-out'});
  }
  function clear() {for (const edge of live.values()) drop(edge);}
  return {target,feed,clear};
}

