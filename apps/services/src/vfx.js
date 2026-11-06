import { FX } from './fx-config.js';
import { clamp, smooth, inverseSmooth, hash, mesh, viewportProgress, wire, trail, cursorGate } from './fx-math.js';

const NS = 'http://www.w3.org/2000/svg';
const GROUPS = '.showcase-card, .service-card, .category-heading, .catalogue-heading, .start-action';
const TEXTS = '.item-master-gradient, .bundle-kicker, .bundle-intro, .bundle-services li, .service-title, .slide-title, .slide-description, .spread-title, #catalogue-heading, #start-heading, .catalogue-filters button span, .item-master-copy p, .item-master-list li, .item-master-steps dt, .item-master-steps dd, .component-copy strong, .component-copy > span, .bundle-scope, .item-master-cta span';
const svg = (tag, attrs = {}) => { const n = document.createElementNS(NS, tag); for (const [k,v] of Object.entries(attrs)) n.setAttribute(k, v); return n; };
const attr = (n, k, v) => { const s = String(v); if (n.getAttribute(k) !== s) n.setAttribute(k, s); };
const keySeed = (s) => [...s].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);

export function startVFX() {
  if (window.MementoVFX) return window.MementoVFX;
  const root = document.documentElement, params = new URLSearchParams(location.search);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)'), forced = matchMedia('(forced-colors: active)');
  const controller = new AbortController(), signal = controller.signal;
  const listen = (target, name, fn, options = {}) => target.addEventListener(name, fn, { ...options, signal });
  let enabled = params.get('fx') !== 'off' && !reduced.matches && !forced.matches;
  let dead = false, raf = 0, dirty = true, layoutDirty = true, width = innerWidth, height = innerHeight;
  let scroll = scrollY, maximum = 0, dpr = 1, last = performance.now(), introStart = last, intro = 1;
  let interrupted = null, modal = null, visibleHost = true, id = 0, rendered = 0;
  let rawX = -1000, rawY = -1000, px = rawX, py = rawY, presence = 0, contact = 0, touch = false;
  let frameDurations = [], previousFrame = 0, effectsCPU = [], scrollDirty = true;
  let cacheEpoch = 0, reviewProgress = params.has('fx-frame') ? clamp(Number(params.get('fx-frame'))) : null;
  const groups = new Map(), active = new Set();
  const canvas = document.createElement('canvas'); canvas.className = 'memento-fx'; canvas.setAttribute('aria-hidden', 'true');
  const mainContext=canvas.getContext('2d', {alpha:true}); let ctx=mainContext;
  const transitionLayer=new OffscreenCanvas(1,1), transitionContext=transitionLayer.getContext('2d');
  const defsRoot = svg('svg', { class: 'memento-fx-defs', 'aria-hidden': 'true', focusable: 'false' });
  const defs = svg('defs'); defsRoot.append(defs); document.body.append(defsRoot, canvas);
  // Three reusable work surfaces; targets keep immutable ImageBitmaps, never live renderers.
  const work = new OffscreenCanvas(1, 1), wc = work.getContext('2d');
  const maskWork = new OffscreenCanvas(1, 1), mc = maskWork.getContext('2d');
  const fieldWork = new OffscreenCanvas(40, 40), fc = fieldWork.getContext('2d');
  const fieldPixels = fc.createImageData(40, 40); for (let i=0;i<fieldPixels.data.length;i+=4) fieldPixels.data[i]=fieldPixels.data[i+1]=fieldPixels.data[i+2]=255;
  const metric = new OffscreenCanvas(1, 1).getContext('2d');
  const bootstrap = window.__mementoFXBoot;
  const navigation = performance.getEntriesByType('navigation')[0];
  const canIntro = enabled && bootstrap?.pending && !location.hash && scrollY < 2 && navigation?.type !== 'back_forward';
  intro = canIntro ? 0 : 1;
  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const g = groups.get(entry.target); if (!g) continue;
      if (entry.isIntersecting) { active.add(g); g.measure = true; }
      else { active.delete(g); restore(g); }
    }
    dirty = true; schedule();
  }, { rootMargin: '180px 0px' });
  const resize = new ResizeObserver(entries => {
    for (const e of entries) { const g = groups.get(e.target); if (g) { g.rebuild = true; g.measure = true; } }
    layoutDirty = true; dirty = true; schedule();
  });
  function restore(g) { g.el.classList.remove('fx-masked','fx-empty'); g.el.style.removeProperty('--fx-mask'); }
  function discover() {
    for (const [el, g] of groups) if (!el.isConnected) { release(g); io.unobserve(el); resize.unobserve(el); groups.delete(el); active.delete(g); }
    for (const el of document.querySelectorAll(GROUPS)) {
      if (groups.has(el)) continue;
      const g = { el, uid: `mfx-${++id}`, seed: keySeed(el.id || el.dataset.service || el.dataset.item || el.textContent.slice(0,60)), rebuild: true, measure: true, textures: [], stamp: 0 };
      groups.set(el, g); io.observe(el); resize.observe(el);
      const b = el.getBoundingClientRect();
      if (b.bottom > -180 && b.top < height + 180 && b.width > 1 && b.height > 1) active.add(g);
    }
    layoutDirty = true; dirty = true; schedule();
  }
  const mutation = new MutationObserver(records => {
    if (records.some(r => r.target instanceof Element && !r.target.closest('.memento-fx-defs') && [...r.addedNodes, ...r.removedNodes].some(n => n.nodeType === 1 || n.nodeType === 3))) discover();
  });
  mutation.observe(document.querySelector('main'), { subtree: true, childList: true, characterData: true });
  for (const d of document.querySelectorAll('dialog')) mutation.observe(d, { subtree: true, childList: true });

  function release(g) {
    restore(g); for (const t of g.textures) { t.ink.close(); t.fx.close(); }
    g.projectedCursor?.bitmap.close();g.projectedTransition?.bitmap.close();g.projectedCursor=null;g.projectedTransition=null;
    g.textures = []; g.cursorTexture?.close(); g.transitionTexture?.close(); g.cursorTexture=null; g.transitionTexture=null; g.definition?.remove(); g.definition = null; g.rebuild = true;
  }
  function fit(surface, c, w, h, ratio = 1) {
    const ww=Math.max(1,Math.ceil(w*ratio)), hh=Math.max(1,Math.ceil(h*ratio));
    if(surface.width!==ww)surface.width=ww;if(surface.height!==hh)surface.height=hh;
    c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,ww,hh);c.globalCompositeOperation='source-over';c.globalAlpha=1;
    c.setTransform(ratio, 0, 0, ratio, 0, 0); c.lineJoin = 'round';
  }
  function textTexture(el, owner) {
    const b = el.getBoundingClientRect(), cs = getComputedStyle(el);
    if (b.width < 1 || b.height < 1 || !el.textContent.trim()) return null;
    const sx = owner.box.width / owner.w, sy = owner.box.height / owner.h;
    const x = (b.left - owner.box.left) / sx, y = (b.top - owner.box.top) / sy;
    const w = Math.ceil(b.width / sx + 12), h = Math.ceil(b.height / sy + 12), pad = 6;
    fit(maskWork, mc, w, h, dpr); fit(work, wc, w, h, dpr);
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), range = document.createRange();
    const glyphs = [];
    while (walker.nextNode()) {
      const node = walker.currentNode, style = getComputedStyle(node.parentElement);
      if (style.display === 'none') continue;
      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      metric.font = font; const metrics = metric.measureText('Hg');
      const ascent = metrics.fontBoundingBoxAscent || Number.parseFloat(style.fontSize) * .79;
      const descent = metrics.fontBoundingBoxDescent || Number.parseFloat(style.fontSize) * .21;
      let index = 0;
      for (const char of node.textContent) {
        range.setStart(node, index); index += char.length; range.setEnd(node, index);
        if (!char.trim()) continue;
        const r = range.getBoundingClientRect(); if (!r.width || !r.height) continue;
        const gx = (r.left - b.left) / sx + pad;
        const gy = (r.top - b.top) / sy + (r.height / sy - ascent - descent) / 2 + ascent + pad;
        glyphs.push({ char, x: gx, y: gy, font });
      }
    }
    for (const c of glyphs) { mc.font = c.font; mc.fillStyle = '#fff'; mc.fillText(c.char, c.x, c.y); }
    const ink = maskWork.transferToImageBitmap();
    const fontSize = parseFloat(cs.fontSize); const small = fontSize < 27;
    const cells = mesh(w, h, small ? FX.type.smallCell : FX.type.cell, owner.seed + keySeed(el.textContent));
    // Soft warm inner matter, fine connected lines, sparse brighter facets.
    wc.fillStyle = small ? 'rgba(255,159,97,.13)' : 'rgba(255,155,88,.25)'; wc.fillRect(0, 0, w, h);
    wc.lineWidth = small ? .45 : FX.type.wire;
    for (const cell of cells) {
      if (cell.seed > .63) { wc.fillStyle = `rgba(255,${145 + Math.round(cell.seed * 65)},${70 + Math.round(cell.seed * 90)},${small ? .16 : .38})`; wc.fill(cell.path); }
      wc.strokeStyle = `rgba(255,209,158,${small ? .42 : .76})`; wc.stroke(cell.path);
    }
    wc.globalCompositeOperation = 'destination-in'; wc.drawImage(ink, 0, 0, w, h); wc.globalCompositeOperation = 'source-over';
    // Real font contour, including O/A counters, does not modify the underlying glyph.
    wc.strokeStyle = '#ffe5bd'; wc.lineWidth = small ? .5 : FX.type.edge;
    wc.shadowColor = FX.accent; wc.shadowBlur = small ? 2 : FX.type.glow;
    for (const c of glyphs) { wc.font = c.font; wc.strokeText(c.char, c.x, c.y); }
    wc.shadowBlur = 0;
    return { x: x - pad, y: y - pad, w, h, ink, fx: work.transferToImageBitmap(), small };
  }
  function symbolTexture(el, owner) {
    const b=el.getBoundingClientRect(),sx=owner.box.width/owner.w,sy=owner.box.height/owner.h;
    if(!b.width||!b.height||getComputedStyle(el).opacity==='0')return null;
    const w=b.width/sx+8,h=b.height/sy+8;
    fit(maskWork,mc,w,h,dpr);mc.strokeStyle='#fff';mc.fillStyle='#fff';
    if(el instanceof SVGElement){
      const vb=el.viewBox.baseVal;if(!vb.width||!vb.height)return null;
      mc.save();mc.translate(4,4);mc.scale((w-8)/vb.width,(h-8)/vb.height);
      for(const shape of el.querySelectorAll('path,rect')){
        const cs=getComputedStyle(shape);let path;
        if(shape.tagName==='path')path=new Path2D(shape.getAttribute('d')||'');
        else{path=new Path2D();const x=Number(shape.getAttribute('x')||0),y=Number(shape.getAttribute('y')||0),ww=Number(shape.getAttribute('width')),hh=Number(shape.getAttribute('height')),r=Number(shape.getAttribute('rx')||0);path.roundRect(x,y,ww,hh,r);}
        mc.lineWidth=parseFloat(cs.strokeWidth)||1.6;mc.lineCap=cs.strokeLinecap;mc.lineJoin=cs.strokeLinejoin;
        if(cs.fill!=='none')mc.fill(path);if(cs.stroke!=='none')mc.stroke(path);
      }mc.restore();
    }else if(el instanceof HTMLImageElement&&el.complete&&el.naturalWidth)mc.drawImage(el,4,4,w-8,h-8);else return null;
    const ink=maskWork.transferToImageBitmap();fit(work,wc,w,h,dpr);wc.drawImage(ink,0,0,w,h);wc.globalCompositeOperation='source-in';wc.fillStyle='#ffd29c';wc.fillRect(0,0,w,h);wc.globalCompositeOperation='source-over';
    return {x:(b.left-owner.box.left)/sx-4,y:(b.top-owner.box.top)/sy-4,w,h,ink,fx:work.transferToImageBitmap(),small:true};
  }
  function makeMask(g) {
    const container = svg('g'), paths = Array.from({length: FX.transition.buckets}, () => '');
    const mask = svg('mask', { id: g.uid, maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse', x: 0, y: 0, width: g.w, height: g.h, 'mask-type': 'alpha' });
    g.cells.forEach(c => { paths[Math.min(paths.length-1, Math.floor(c.seed * paths.length))] += c.d; });
    g.gradients = paths.map((d, i) => {
      const gid = `${g.uid}-v${i}`, lid = `${g.uid}-l${i}`, mid = `${g.uid}-lm${i}`;
      const gradient = svg('linearGradient', { id: gid, gradientUnits: 'userSpaceOnUse', x1: 0, y1: 0, x2: 0, y2: g.h });
      const stops = [0,0,1,1,0,0].map((alpha, n) => { const s = svg('stop', { offset: n / 5, 'stop-color': 'white', 'stop-opacity': alpha }); gradient.append(s); return s; });
      const load = svg('linearGradient', { id: lid, gradientUnits: 'userSpaceOnUse' });
      const loadStops = [1,0].map(alpha => { const s = svg('stop', { offset: alpha ? 0 : 1, 'stop-color': 'white', 'stop-opacity': alpha }); load.append(s); return s; });
      const loadMask = svg('mask', { id: mid, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: g.w, height: g.h, 'mask-type': 'alpha' });
      loadMask.append(svg('rect', { width: g.w, height: g.h, fill: `url(#${lid})` }));
      const path = svg('path', { d, fill: `url(#${gid})`, stroke: `url(#${gid})`, 'stroke-width': '.35' });
      mask.append(path); container.append(gradient, load, loadMask);
      return { gradient, stops, load, loadStops, path, mid, seed: (i + .5) / paths.length };
    });
    container.append(mask); defs.append(container); g.definition = container;
  }
  function prepare(g) {
    release(g);
    g.w = g.el.offsetWidth || g.box.width; g.h = g.el.offsetHeight || g.box.height;
    if (!g.w || !g.h || g.w * g.h > 2200000) return;
    g.card = g.el.matches('.showcase-card, .service-card, .start-action');
    const computedCut = getComputedStyle(g.el).getPropertyValue('--corner-cut').trim();
    // The original CSS defines these exact clamp expressions by component.
    g.cut = g.card ? (g.el.matches('.service-card') ? clamp(innerWidth * .012, 12, 20) : clamp(innerWidth * .015, 16, 24)) : 0;
    if (/^\d+(\.\d+)?px$/.test(computedCut)) g.cut = parseFloat(computedCut);
    const c = g.cut, w = g.w, h = g.h;
    g.outline = new Path2D(`M${c},.5L${w-.5},.5L${w-.5},${h-c}L${w-c},${h-.5}L.5,${h-.5}L.5,${c}Z`);
    g.cells = mesh(w, h, innerWidth < 600 ? FX.transition.mobileCell : FX.transition.cell, g.seed);
    g.edgeCells = g.card ? mesh(w, h, FX.edge.cell, g.seed + 190).filter(t => Math.min(t.x, w-t.x, t.y, h-t.y) < FX.edge.band + 12) : [];
    // Only one target owns visibility; nested text contributes cached material only.
    const candidates = [...g.el.querySelectorAll(TEXTS)].filter(el => !el.parentElement.closest(TEXTS) || !g.el.contains(el.parentElement.closest(TEXTS)));
    // Cache glyphs in the card's own plane, then project the entire material.
    // This synchronous measurement is restored before paint and only runs on rebuild.
    const savedTransform=g.el.style.transform,savedBox=g.box;
    if(savedTransform){g.el.style.transform='none';g.box=g.el.getBoundingClientRect();}
    try {
      for (const el of candidates) { const t = textTexture(el, g); if (t) g.textures.push(t); }
      for(const el of g.el.querySelectorAll('svg.chevron,img.chevron,.catalogue-filters svg')){const t=symbolTexture(el,g);if(t)g.textures.push(t);}
    } finally {if(savedTransform)g.el.style.transform=savedTransform;g.box=savedBox;}
    fit(work,wc,g.w,g.h,dpr);drawEdges(g,wc);
    for(const t of g.textures)wc.drawImage(t.fx,t.x,t.y,t.w,t.h);
    g.cursorTexture=work.transferToImageBitmap();
    fit(work,wc,g.w,g.h,dpr);wc.lineWidth=.65;wc.strokeStyle=g.card?'rgba(255,179,113,.3)':'rgba(255,192,135,.75)';
    for(const c of g.cells)wc.stroke(c.path);
    if(g.card){wc.globalCompositeOperation='destination-in';wc.fillStyle='#fff';wc.fill(g.outline);wc.globalCompositeOperation='source-over';}
    else{fit(maskWork,mc,g.w,g.h,dpr);for(const t of g.textures)mc.drawImage(t.ink,t.x,t.y,t.w,t.h);wc.globalCompositeOperation='destination-in';wc.drawImage(maskWork,0,0,g.w,g.h);wc.globalCompositeOperation='source-over';}
    for(const t of g.textures)wc.drawImage(t.fx,t.x,t.y,t.w,t.h);
    g.transitionTexture=work.transferToImageBitmap();
    makeMask(g); g.rebuild = false; g.stamp = ++cacheEpoch;
    const cached = [...groups.values()].filter(t => t.definition && !active.has(t)).sort((a,b) => a.stamp-b.stamp);
    let count = [...groups.values()].filter(t => t.definition).length;
    for (const old of cached) { if (count-- <= FX.cacheLimit) break; release(old); }
  }
  function currentBox(g) {
    if (g.measure || layoutDirty || !g.box) {
      const b = g.el.getBoundingClientRect();
      g.box = { left: b.left, top: b.top, width: b.width, height: b.height, bottom: b.bottom };
      g.documentY = b.top + scrollY; g.measure = false;
    } else { g.box.top = g.documentY - scrollY; g.box.bottom = g.box.top + g.box.height; }
  }
  function projection(g, style) {
    g.z=Number(style.zIndex)||0;g.plane=null;g.transformSignature=style.transform;
    if(!g.el.matches('.showcase-card')||style.transform==='none')return;
    const m=new DOMMatrix(style.transform),origin=style.transformOrigin.split(' ').map(Number.parseFloat);
    const w=g.el.offsetWidth,h=g.el.offsetHeight,ox=origin[0],oy=origin[1];
    const point=(x,y)=>{const q=new DOMPoint(x-ox,y-oy).matrixTransform(m);return {x:q.x/q.w+ox,y:q.y/q.w+oy};};
    const corners=[point(0,0),point(w,0),point(w,h),point(0,h)];
    // Affine, axis-aligned cards use the inexpensive regular path.
    if(Math.abs(corners[0].y-corners[1].y)<.05&&Math.abs(corners[0].x-corners[3].x)<.05)return;
    g.plane={point,minX:Math.min(...corners.map(p=>p.x)),minY:Math.min(...corners.map(p=>p.y))};
  }
  function screenPoint(g,x,y) {
    if(!g.plane)return {x:g.box.left+x*g.box.width/g.w,y:g.box.top+y*g.box.height/g.h};
    const p=g.plane.point(x,y);return {x:g.box.left+p.x-g.plane.minX,y:g.box.top+p.y-g.plane.minY};
  }
  function screenTexture(g,bitmap,left,top,w,h) {
    fit(work,wc,w,h,dpr);
    if(!g.plane){wc.drawImage(bitmap,g.box.left-left,g.box.top-top,g.box.width,g.box.height);return;}
    const slot=bitmap===g.cursorTexture?'projectedCursor':'projectedTransition';
    const signature=`${g.transformSignature}|${g.w}|${g.h}|${dpr}`;
    if(g[slot]?.signature===signature){wc.drawImage(g[slot].bitmap,g.box.left-left,g.box.top-top,g.box.width,g.box.height);return;}
    g[slot]?.bitmap.close();fit(work,wc,g.box.width,g.box.height,dpr);
    // A subdivided projective surface follows the existing CSS perspective.
    // Only strips intersecting the current viewport/cursor ROI are submitted.
    const strips=24,step=g.w/strips;
    const triangle=(source,target)=>{
      const [a,b,c]=source,[p,q,r]=target,den=(b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y);
      const aa=((q.x-p.x)*(c.y-a.y)-(r.x-p.x)*(b.y-a.y))/den;
      const bb=((q.y-p.y)*(c.y-a.y)-(r.y-p.y)*(b.y-a.y))/den;
      const cc=((r.x-p.x)*(b.x-a.x)-(q.x-p.x)*(c.x-a.x))/den;
      const dd=((r.y-p.y)*(b.x-a.x)-(q.y-p.y)*(c.x-a.x))/den;
      wc.save();wc.beginPath();wc.moveTo(p.x,p.y);wc.lineTo(q.x,q.y);wc.lineTo(r.x,r.y);wc.closePath();wc.clip();
      wc.transform(aa,bb,cc,dd,p.x-aa*a.x-cc*a.y,p.y-bb*a.x-dd*a.y);wc.drawImage(bitmap,0,0,g.w,g.h);wc.restore();
    };
    for(let i=0;i<strips;i++){
      const x=i*step,x2=(i+1)*step,source=[{x,y:0},{x:x2,y:0},{x:x2,y:g.h},{x,y:g.h}];
      const target=source.map(p=>{const q=screenPoint(g,p.x,p.y);return {x:q.x-g.box.left,y:q.y-g.box.top};});
      triangle([source[0],source[1],source[2]],[target[0],target[1],target[2]]);
      triangle([source[0],source[2],source[3]],[target[0],target[2],target[3]]);
    }
    g[slot]={signature,bitmap:work.transferToImageBitmap()};
    fit(work,wc,w,h,dpr);wc.drawImage(g[slot].bitmap,g.box.left-left,g.box.top-top,g.box.width,g.box.height);
  }
  function clipForeground(g){
    for(const front of g.front||[]){
      const c=front.cut||0,points=[[c,0],[front.w,0],[front.w,front.h-c],[front.w-c,front.h],[0,front.h],[0,c]].map(p=>screenPoint(front,...p));
      ctx.beginPath();ctx.rect(0,0,width,height);ctx.moveTo(points[0].x,points[0].y);for(const p of points.slice(1))ctx.lineTo(p.x,p.y);ctx.closePath();ctx.clip('evenodd');
    }
  }
  function readable(g) {
    return g.el.contains(document.activeElement) || g.el.classList.contains('fx-readable') || !!g.el.closest('dialog[open]');
  }
  function progress(x, y, g) {
    if (readable(g)) return 1;
    const pView = viewportProgress(y, height, scroll, maximum);
    if (intro >= 1) return pView;
    const order = .5 * (x / width + 1 - y / height);
    const pLoad = clamp((intro * 1.55 - order * .5) / 1.05);
    return Math.min(pLoad, pView);
  }
  function updateMask(g) {
    if (readable(g) || !enabled || !g.definition) { restore(g); return; }
    const b = g.box, topGate = smooth(0, height * .12, scroll), bottomGate = smooth(0, height * .12, maximum - scroll);
    if (intro === 1 && (b.top >= height * .16 || topGate === 0) && (b.bottom <= height * .80 || bottomGate === 0)) { restore(g); return; }
    for (const layer of g.gradients) {
      const t = .30 + .48 * layer.seed, sy = b.height / g.h;
      const atTop = v => topGate < 1e-4 || v <= 1 - topGate ? -height : height * (.02 + .14 * inverseSmooth((v - 1 + topGate) / topGate));
      const atBottom = v => bottomGate < 1e-4 || v <= 1 - bottomGate ? height*2 : height * (.80 + .20 * inverseSmooth((1-v) / bottomGate));
      const y = [0, atTop(t-.05), atTop(t+.05), atBottom(t+.05), atBottom(t-.05), height*3];
      // Opacity at target boundaries is sampled, avoiding clamped-stop discontinuities.
      const alphaAt = yy => smooth(t-.05,t+.05,viewportProgress(yy,height,scroll,maximum));
      // Discard transitions outside the target, then interpolate the two boundary stops.
      const interior = [[y[1],0],[y[2],1],[y[3],1],[y[4],0]].filter(a => a[0] > b.top && a[0] < b.bottom);
      const all = [[0,alphaAt(b.top)], ...interior.map(a => [(a[0]-b.top)/b.height,a[1]]), [1,alphaAt(b.bottom)]];
      while(all.length < 6) all.push(all[all.length-1]);
      layer.stops.forEach((s,i) => { attr(s,'offset',all[i][0].toFixed(5)); attr(s,'stop-opacity',all[i][1].toFixed(4)); });
      if (intro < 1) {
        // One diagonal world-space front for every initial target.
        const sx = b.width/g.w;
        attr(layer.load,'x1',-b.left/sx); attr(layer.load,'y1',(height-b.top)/sy);
        attr(layer.load,'x2',(width-b.left)/sx); attr(layer.load,'y2',-b.top/sy);
        const f = (intro * 1.55 - t * 1.05) / .5;
        attr(layer.loadStops[0],'offset',clamp(f-.105).toFixed(5)); attr(layer.loadStops[1],'offset',clamp(f+.105).toFixed(5));
        attr(layer.path,'mask',`url(#${layer.mid})`);
      } else layer.path.removeAttribute('mask');
    }
    g.el.style.setProperty('--fx-mask', `url(#${g.uid})`); g.el.classList.add('fx-masked');
    const mostVisible=Math.max(progress(b.left,b.top,g),progress(b.left+b.width,b.top,g),progress(b.left+b.width/2,(b.top+b.bottom)/2,g),progress(b.left,b.bottom,g),progress(b.left+b.width,b.bottom,g));
    g.el.classList.toggle('fx-empty',mostVisible<.05);
  }

  function drawEdges(g, c) {
    if (!g.card) return;
    c.save(); c.clip(g.outline); c.lineWidth = FX.edge.wire;
    // Ring clipping is applied after glow too; photographs and gutters stay clean.
    const band = FX.edge.band, w = g.w, h = g.h;
    c.beginPath(); c.rect(0,0,w,h); c.rect(band,band,Math.max(0,w-band*2),Math.max(0,h-band*2)); c.clip('evenodd');
    for (const cell of g.edgeCells) {
      c.strokeStyle = 'rgba(255,151,96,.5)'; c.stroke(cell.path);
      if(cell.seed > 1-FX.edge.faceRate) { c.fillStyle = 'rgba(255,170,104,.24)'; c.fill(cell.path); }
      if(cell.seed > .985) { c.fillStyle='#ffdbb5'; c.fillRect(cell.x-.7,cell.y-.7,1.4,1.4); }
    }
    c.strokeStyle = 'rgba(255,180,112,.8)'; c.lineWidth=.8; c.stroke(g.outline); c.restore();
  }
  function drawCursor(g) {
    const b=g.box,radius=touch?FX.cursor.touchRadius:FX.cursor.desktopRadius;
    const dx=Math.max(b.left-px,0,px-b.left-b.width),dy=Math.max(b.top-py,0,py-b.bottom);
    if(Math.hypot(dx,dy)>radius+8||presence<.005||!g.cursorTexture)return;
    const left=Math.max(b.left,px-radius-8),top=Math.max(b.top,py-radius-8),right=Math.min(b.left+b.width,px+radius+8),bottom=Math.min(b.bottom,py+radius+8);
    const w=right-left,h=bottom-top;if(w<=0||h<=0)return;
    screenTexture(g,g.cursorTexture,left,top,w,h);
    wc.globalCompositeOperation='destination-in';
    const light=wc.createRadialGradient(px-left,py-top,radius*.10,px-left,py-top,radius);
    light.addColorStop(0,`rgba(255,255,255,${presence})`);light.addColorStop(.3,`rgba(255,255,255,${presence*.92})`);light.addColorStop(.62,`rgba(255,255,255,${presence*.42})`);light.addColorStop(1,'transparent');
    wc.fillStyle=light;wc.fillRect(0,0,w,h);
    if(!readable(g)){
      const gate=wc.createLinearGradient(0,0,0,h);
      for(let i=0;i<=12;i++)gate.addColorStop(i/12,`rgba(255,255,255,${cursorGate(progress(px,top+h*i/12,g))})`);
      wc.fillStyle=gate;wc.fillRect(0,0,w,h);
    }
    wc.globalCompositeOperation='source-over';ctx.globalAlpha=g.opacity;
    ctx.drawImage(work,left,top,w,h);ctx.globalAlpha=1;
  }
  function drawTransition(g,budget){
    if(readable(g)||!g.transitionTexture)return budget;
    const b=g.box;
    if(intro===1&&(b.top>=height*.16||scroll<1)&&(b.bottom<=height*.8||maximum-scroll<1))return budget;
    const sx=b.width/g.w,sy=b.height/g.h;
    const bands=intro<1?[[Math.max(0,-b.top),Math.min(b.height,height-b.top)]]:
      [[Math.max(0,-b.top),Math.min(b.height,height*.16-b.top)],[Math.max(0,height*.80-b.top),Math.min(b.height,height-b.top)]];
    for(const [from,to] of bands){
      if(to<=from)continue;
      screenTexture(g,g.transitionTexture,b.left,b.top+from,b.width,to-from);
      for(let y=0;y<40;y++)for(let x=0;x<40;x++){
        const vx=b.left+b.width*x/39,vy=b.top+from+(to-from)*y/39;
        const strength=vy<height*.16&&scroll>1?.55:1;
        fieldPixels.data[(y*40+x)*4+3]=Math.round(wire(progress(vx,vy,g))*strength*255);
      }
      fc.putImageData(fieldPixels,0,0);wc.globalCompositeOperation='destination-in';wc.drawImage(fieldWork,0,0,b.width,to-from);wc.globalCompositeOperation='source-over';
      ctx.globalAlpha=g.opacity;ctx.drawImage(work,b.left,b.top+from,b.width,to-from);ctx.globalAlpha=1;
    }
    for(const cell of g.cells){
      if(budget<=0)break;
      if(cell.seed<.92 || (!g.card && cell.seed<.97))continue;
      const {x,y}=screenPoint(g,cell.x,cell.y),p=progress(x,y,g),a=trail(p);
      if(a<.03 || y<0 || y>height)continue;
      const size=(innerWidth<600?1:1.5)+cell.seed*2.7, direction=y<height*.5?-1:1;
      const drift=(1-clamp(p/.3))*20;ctx.globalAlpha=a*.65*g.opacity;ctx.strokeStyle=FX.accent;ctx.fillStyle=cell.seed>.975?'#ffc98b':'#ac613e';ctx.lineWidth=.6;
      ctx.beginPath();ctx.moveTo(x+drift*.4,y+direction*drift-size);ctx.lineTo(x+drift*.4-size*.7,y+direction*drift+size*.5);ctx.lineTo(x+drift*.4+size*.7,y+direction*drift+size*.5);ctx.closePath();
      cell.seed>.96?ctx.fill():ctx.stroke();budget--;
    }
    ctx.globalAlpha=1;return budget;
  }
  function schedule(){ if(!raf&&!dead&&enabled&&visibleHost&&!document.hidden) raf=requestAnimationFrame(frame); }
  function frame(now){
    raf=0;ctx=mainContext; const cpuStart=performance.now();
    try{
      if(dead||!enabled||!visibleHost||document.hidden){clear();return;}
      const dt=clamp(now-last,1,80);last=now;
      const updateTransitions=dirty||scrollDirty||layoutDirty||intro<1||reviewProgress!==null;
      if(reviewProgress !== null) intro=reviewProgress;
      else if(intro<1){
        intro=interrupted ? interrupted.value+(1-interrupted.value)*clamp((now-interrupted.time)/FX.transition.handoff) : clamp((now-introStart)/FX.transition.duration);
      }
      const follow=1-Math.exp(-dt/FX.cursor.follow), rate=contact?FX.cursor.attack:FX.cursor.release/3;
      px+=(rawX-px)*follow;py+=(rawY-py)*follow;presence+=(contact-presence)*(1-Math.exp(-dt/rate));
      if(presence<.003)presence=0;
      if(layoutDirty){
        width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,width<600?FX.dpr.mobile:FX.dpr.desktop);
        fit(canvas,ctx,width,height,dpr);
        maximum=Math.max(0,document.documentElement.scrollHeight-height);
      }
      scroll=clamp(scrollY,0,maximum);
      const candidates=[...active].filter(g=>g.el.isConnected && (!modal || modal.contains(g.el)));
      // Batch all geometric reads before any mask/style writes.
      for(const g of candidates){currentBox(g);const s=getComputedStyle(g.el);projection(g,s);g.opacity=Number(s.opacity);g.draw=s.visibility!=='hidden'&&g.opacity>.02&&g.box.width>0&&g.box.bottom>0&&g.box.top<height;}
      for(const g of candidates)if(g.draw && g.rebuild)prepare(g);
      for(const g of candidates)g.front=g.el.matches('.showcase-card')?candidates.filter(f=>f!==g&&f.draw&&f.definition&&f.el.parentElement===g.el.parentElement&&f.z>g.z):[];
      layoutDirty=false;
      if(updateTransitions){
        fit(transitionLayer,transitionContext,width,height,dpr);ctx=transitionContext;
        let budget=width<600?FX.particles.mobile:FX.particles.desktop;
        for(const g of candidates){if(!g.draw||!g.definition)continue;updateMask(g);ctx.save();clipForeground(g);budget=drawTransition(g,budget);ctx.restore();}
        ctx=mainContext;
      }
      ctx.clearRect(0,0,width,height);ctx.drawImage(transitionLayer,0,0,width,height);
      for(const g of candidates){if(g.draw&&g.definition){ctx.save();clipForeground(g);drawCursor(g);ctx.restore();}}
      if(intro===1){bootstrap?.release();root.dataset.fxState='tracking';}else root.dataset.fxState='intro';
      dirty=false;scrollDirty=false;rendered++;
      effectsCPU.push(performance.now()-cpuStart);
      if(params.has('fx-debug')){root.dataset.fxCpu=JSON.stringify(api.stats());}if(effectsCPU.length>1800)effectsCPU.shift();
      if(previousFrame && now-previousFrame<100)frameDurations.push(now-previousFrame);previousFrame=now;
      if(frameDurations.length>1800)frameDurations.shift();
      if((intro<1&&reviewProgress===null)||Math.abs(presence-contact)>.003||Math.abs(px-rawX)+Math.abs(py-rawY)>.1) schedule();
      else root.dataset.fxState='idle';
    }catch(error){console.warn('Memento VFX: readable fallback',error);fail();}
  }
  function clear(){ctx=mainContext;transitionContext.clearRect(0,0,transitionLayer.width,transitionLayer.height);ctx?.clearRect(0,0,canvas.width,canvas.height);for(const g of groups.values())restore(g);bootstrap?.release();}
  function fail(){enabled=false;root.dataset.vfx='off';root.dataset.fxState='fallback';clear();if(raf)cancelAnimationFrame(raf);raf=0;}
  function interrupt(){if(intro<1&&!interrupted)interrupted={time:performance.now(),value:intro};schedule();}
  function move(e){if(!e.isPrimary&&e.isPrimary!==undefined)return;touch=e.pointerType==='touch';if(touch && e.type==='pointermove' && !contact)return;rawX=e.clientX;rawY=e.clientY;if(!presence){px=rawX;py=rawY;}contact=1;schedule();}
  function leave(){contact=0;schedule();}
  listen(window,'pointermove',move,{passive:true});listen(window,'pointerdown',e=>{move(e);interrupt();},{passive:true});
  listen(window,'pointerup',e=>{if(e.pointerType!=='mouse')leave();},{passive:true});listen(window,'pointercancel',leave,{passive:true});
  listen(document.documentElement,'pointerleave',leave);listen(window,'blur',leave);listen(canvas,'contextlost',fail);
  listen(window,'scroll',()=>{scrollDirty=true;interrupt();schedule();},{passive:true});
  // Inner popup scrolling changes the relative position of its cached text.
  listen(document,'scroll',e=>{
    if(!(e.target instanceof Element)||!e.target.closest('dialog[open]'))return;
    for(const g of active)if(g.el.contains(e.target)){g.rebuild=true;g.measure=true;}
    dirty=true;schedule();
  },{passive:true,capture:true});
  listen(window,'resize',()=>{for(const g of groups.values()){g.rebuild=true;g.measure=true;}layoutDirty=true;schedule();},{passive:true});
  listen(window.visualViewport||window,'resize',()=>{layoutDirty=true;schedule();},{passive:true});
  listen(document,'memento:carousel-layout',e=>{for(const g of active)if(e.detail?.contains(g.el))g.measure=true;dirty=true;schedule();});
  listen(document,'memento:carousel-settled',e=>{for(const g of active)if(e.detail?.contains(g.el)){g.rebuild=true;g.measure=true;}dirty=true;schedule();});
  listen(document,'memento:overlay-change',()=>{
    modal=document.querySelector('dialog[open]');(modal||document.body).append(canvas);intro=1;presence=0;contact=0;clear();discover();
    for(const g of active)g.measure=true;layoutDirty=true;schedule();
  });
  listen(document,'focusin',()=>{interrupt();layoutDirty=true;schedule();});listen(document,'focusout',()=>{dirty=true;schedule();});
  listen(window,'hashchange',()=>{intro=1;layoutDirty=true;schedule();});
  listen(document,'selectionchange',()=>{const sel=getSelection();for(const g of groups.values())g.el.classList.toggle('fx-readable',!!sel&&!sel.isCollapsed&&g.el.contains(sel.anchorNode));dirty=true;schedule();});
  listen(document,'visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;presence=0;contact=0;}else{intro=1;layoutDirty=true;last=performance.now();schedule();}});
  listen(window,'pagehide',e=>{if(raf)cancelAnimationFrame(raf);raf=0;if(!e.persisted)destroy();else clear();});
  listen(window,'pageshow',e=>{if(e.persisted){intro=1;layoutDirty=true;schedule();}});
  listen(document.fonts,'loadingdone',()=>{for(const g of groups.values())g.rebuild=true;layoutDirty=true;schedule();});
  listen(document,'load',e=>{if(e.target instanceof HTMLImageElement){layoutDirty=true;schedule();}},{capture:true});
  // An iframe scrolling internally uses its own field. A host-scrolled frame stays
  // fully readable unless a trusted existing host explicitly supplies visibility.
  let parentOrigin=null;try{parentOrigin=new URL(document.referrer).origin;}catch{}
  listen(window,'message',e=>{
    if(e.source!==parent||!parentOrigin||e.origin!==parentOrigin)return;
    const d=e.data;if(d?.type!=='memento:vfx:visibility'||d.version!==1||typeof d.visible!=='boolean')return;
    visibleHost=d.visible;if(!visibleHost){if(raf)cancelAnimationFrame(raf);raf=0;clear();}else{layoutDirty=true;intro=1;schedule();}
  });
  function preference(){enabled=params.get('fx')!=='off'&&!reduced.matches&&!forced.matches;root.dataset.vfx=enabled?'on':'off';intro=1;presence=0;contact=0;clear();layoutDirty=true;schedule();}
  listen(reduced,'change',preference);listen(forced,'change',preference);
  function destroy(){dead=true;controller.abort();io.disconnect();resize.disconnect();mutation.disconnect();if(raf)cancelAnimationFrame(raf);for(const g of groups.values())release(g);canvas.remove();defsRoot.remove();bootstrap?.release();delete window.MementoVFX;root.dataset.vfx='off';}
  const quantiles = a => {const s=[...a].sort((a,b)=>a-b);return {median:s[Math.floor(s.length*.5)]||0,p95:s[Math.floor(s.length*.95)]||0};};
  const api={destroy, refresh:()=>{layoutDirty=true;discover();},setEnabled(value){enabled=!!value&&!reduced.matches&&!forced.matches;root.dataset.vfx=enabled?'on':'off';intro=1;clear();dirty=true;schedule();},stats:()=>({enabled,state:root.dataset.fxState,frames:rendered,active:active.size,cached:[...groups.values()].filter(g=>g.definition).length,canvasCount:document.querySelectorAll('.memento-fx').length,dpr,frameMs:quantiles(frameDurations),cpuMs:quantiles(effectsCPU)})};
  if(params.has('fx-review'))api.review=value=>{reviewProgress=value;intro=value===null?1:value;bootstrap?.release();dirty=true;schedule();};
  window.MementoVFX=api;root.dataset.vfx=enabled?'on':'off';
  bootstrap?.ready();
  // A diagnostic still must not trip the independent production watchdog.
  if(reviewProgress!==null)bootstrap?.release();
  discover();introStart=performance.now();
  // Build accurate glyph masks only after the actual local Inter font is ready.
  document.fonts.ready.then(()=>{if(dead)return;for(const g of groups.values())g.rebuild=true;layoutDirty=true;schedule();});
  if(!enabled)clear();else{frame(introStart);root.removeAttribute('data-fx-boot');}
  return api;
}
