/* R1.1: monotone cubic ramps, exact anchors and static blue-noise dithering.
   Float calculations are quantized only once, into lossless PNGs at display size.
   These masks change alpha; they never paint black over the parent environment. */
(() => {
  'use strict';
  const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  function curve(xs, ys) {
    const n = xs.length, h = [], d = [], m = [];
    for (let i = 0; i < n - 1; i++) { h[i] = xs[i + 1] - xs[i]; d[i] = (ys[i + 1] - ys[i]) / h[i]; }
    if (n === 2) m[0] = m[1] = d[0];
    else {
      for (let i = 1; i < n - 1; i++) {
        if (d[i - 1] * d[i] <= 0) m[i] = 0;
        else { const a = 2 * h[i] + h[i - 1], b = h[i] + 2 * h[i - 1]; m[i] = (a + b) / (a / d[i - 1] + b / d[i]); }
      }
      const end = (a, b, u, v) => { let value = ((2 * a + b) * u - a * v) / (a + b); if (Math.sign(value) !== Math.sign(u)) value = 0; else if (Math.sign(u) !== Math.sign(v) && Math.abs(value) > Math.abs(3 * u)) value = 3 * u; return value; };
      m[0] = end(h[0], h[1], d[0], d[1]);
      m[n - 1] = end(h[n - 2], h[n - 3], d[n - 2], d[n - 3]);
    }
    return x => {
      x = clamp(x, xs[0], xs[n - 1]); let i = 0;
      while (i < n - 2 && x > xs[i + 1]) i++;
      const t = (x - xs[i]) / h[i], t2 = t * t, t3 = t2 * t;
      return clamp((2*t3-3*t2+1)*ys[i] + (t3-2*t2+t)*h[i]*m[i] + (-2*t3+3*t2)*ys[i+1] + (t3-t2)*h[i]*m[i+1]);
    };
  }
  const rgba = hex => { const s = hex.replace('#',''); return [0,2,4,6].map((k, i) => i === 3 && s.length === 6 ? 1 : parseInt(s.slice(k,k+2),16)/255); };
  const colorCurve = (xs, colors) => { const values = colors.map(rgba); return [0,1,2,3].map(k => curve(xs, values.map(c => c[k]))); };
  const title = colorCurve([0,.34,.61,.81,1],['f5f3ef','f5f3ef','eee4d6','ddbb8b','c98b42']);
  const frame = colorCurve([0,.27,.62,.83,1],['d8d1c3c7','aaa28f66','716a5e57','8c744b75','d9913de0']);
  const photo = curve([0,.1,.2,.3,.4,1],[0,24/255,118/255,221/255,1,1]);
  const edge = curve([0,.2,.5,.8,1],[0,.1,.5,.898,1]);
  const start = curve([0,.25,1],[0,1,1]);
  const noise = Uint8Array.from(atob('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'), c => c.charCodeAt(0));
  const cache = new Map();
  const forced = matchMedia('(forced-colors: active)');
  let timer = 0;
  function texture(kind, cssWidth, cssHeight, extra = 0) {
    const dpr = Math.min(devicePixelRatio || 1, 2), w = Math.max(1, Math.ceil(cssWidth * dpr)), h = Math.max(1, Math.ceil(cssHeight * dpr));
    const key = [kind,w,h,extra].join(':'); if (cache.has(key)) return cache.get(key);
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    const context = canvas.getContext('2d'); if (!context) return null;
    const pixels = context.createImageData(w,h), out = pixels.data;
    const color = kind === 'title' ? title : frame, isColor = kind === 'title' || kind === 'frame';
    const lut = isColor ? Array.from({length:4097},(_,i) => color.map(fn => fn(i/4096))) : null;
    const alphas = !isColor ? Array.from({length:w},(_,x) => {
      const t = x / Math.max(w-1,1);
      return kind === 'photo' ? photo(t) : kind === 'start' ? start(t) : edge(Math.min(x,w-1-x) / Math.max(1,extra*dpr));
    }) : null;
    for (let y=0;y<h;y++) {
      for (let x=0;x<w;x++) {
        // Only the ring is visible: do not rasterize/store a large invisible surface.
        if (kind==='frame' && x>3*dpr && y>3*dpr && x<w-3*dpr && y<h-3*dpr && x+y>(extra+4)*dpr && (w-x)+(h-y)>(extra+4)*dpr) continue;
        const k=(y*w+x)*4, jitter=(noise[(y%64)*64+x%64]/255*2-1);
        if (isColor) {
          const t=(x+y)/Math.max(w+h-2,1), pos=t*4096, lo=Math.floor(pos), hi=Math.min(4096,lo+1), f=pos-lo;
          for(let c=0;c<4;c++) {
            const v=lut[lo][c]*(1-f)+lut[hi][c]*f;
            // Exact constant stretches remain constant, including alpha=0 and alpha=1.
            const moving=Math.abs(lut[Math.min(4096,hi+1)][c]-lut[Math.max(0,lo-1)][c])>1e-10;
            out[k+c]=Math.round(clamp(v*255 + (moving?jitter:0),0,255));
          }
        } else {
          const a=alphas[x];out[k]=out[k+1]=out[k+2]=255;
          out[k+3]=a<=0?0:a>=1?255:Math.round(clamp(a*255+jitter,0,255));
        }
      }
    }
    context.putImageData(pixels,0,0);
    const value='url("'+canvas.toDataURL('image/png')+'")';
    cache.set(key,value);if(cache.size>32)cache.delete(cache.keys().next().value);
    return value;
  }
  function apply(el, property, kind, extra=0) {
    if(!el || !el.offsetWidth || !el.offsetHeight) return;
    const value=texture(kind,el.offsetWidth,el.offsetHeight,extra);if(value)el.style.setProperty(property,value);
  }
  function refresh() {
    clearTimeout(timer);
    timer=setTimeout(() => {
      if(forced.matches)return;
      document.querySelectorAll('.title-gradient').forEach(el=>apply(el,'--smooth-title','title'));
      document.querySelectorAll('.frame').forEach(el=>apply(el,'--smooth-frame','frame',parseFloat(getComputedStyle(el).clipPath.replace(/^polygon\(/,''))||20));
      const portrait=matchMedia('(max-width:1023px) and (orientation:portrait)').matches;
      if(!portrait)document.querySelectorAll('.card-art').forEach(el=>apply(el,'--photo-mask','photo'));
      const carousel=document.querySelector('.carousel'), board=document.querySelector('.preview-card');
      if(carousel&&board)apply(carousel,'--edge-mask','edge',Math.max(0,(carousel.clientWidth-board.offsetWidth)*.43));
      const art=document.querySelector('.start-art');
      if(art){const mask=texture('start',art.offsetWidth,art.offsetHeight);art.style.maskImage=mask;art.style.webkitMaskImage=mask;}
      // The CTA's small SVG rim uses densely sampled, monotone color/alpha stops.
      const rim=document.getElementById('start-rim-light');
      if(rim&&!rim.dataset.smooth){
        const curves=colorCurve([0,.28,.68,1],['ffe4b5ff','dfad6bf2','c98a4080','c98a4000']);
        rim.replaceChildren(...Array.from({length:257},(_,i)=>{const t=i/256,s=document.createElementNS('http://www.w3.org/2000/svg','stop');s.setAttribute('offset',t);s.setAttribute('stop-color','rgb('+curves.slice(0,3).map(fn=>(fn(t)*255).toFixed(4)).join(',')+')');s.setAttribute('stop-opacity',curves[3](t).toFixed(6));return s;}));rim.dataset.smooth='true';
      }
      document.documentElement.dataset.ramps='pchip-blue-noise';
    },120);
  }
  window.MementoSmooth={refresh};
  new ResizeObserver(refresh).observe(document.documentElement);
  addEventListener('resize',refresh,{passive:true});
  forced.addEventListener('change',refresh);
  document.addEventListener('memento:overlay-change',refresh);
})();
