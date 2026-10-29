/* Shared Memento visual layer. Native page scrolling and link behaviour stay intact. */
(() => {
  'use strict';
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const forced = matchMedia('(forced-colors: active)');
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const start = document.querySelector('.start-action');
  let rimFrame = 0, rim = null, gradient = null, segments = [], perimeter = 0;
  let current = 0, target = 0, rimActive = false;
  const ns = 'http://www.w3.org/2000/svg';
  const svgNode = (name, attrs) => {
    const node = document.createElementNS(ns, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };
  function pointAt(distance) {
    let remaining = ((distance % perimeter) + perimeter) % perimeter;
    for (const segment of segments) {
      if (remaining <= segment.length) {
        const t = remaining / segment.length;
        return {x: segment.x + segment.dx * t, y: segment.y + segment.dy * t};
      }
      remaining -= segment.length;
    }
    return {x: 0, y: 0};
  }
  function paintRim() {
    rimFrame = 0;
    if (!gradient || !perimeter) return;
    // Follow the shortest route along the six-sided outline, never across its face.
    const delta = ((target - current + perimeter * 1.5) % perimeter) - perimeter / 2;
    current = motion.matches ? target : current + delta * .18;
    const point = pointAt(current);
    gradient.setAttribute('cx', point.x.toFixed(2));
    gradient.setAttribute('cy', point.y.toFixed(2));
    if (rimActive && !motion.matches && Math.abs(delta) > .25) rimFrame = requestAnimationFrame(paintRim);
  }
  function measureRim() {
    if (!start || !rim) return;
    const width = start.clientWidth, height = start.clientHeight;
    if (!width || !height) return;
    const cut = parseFloat(getComputedStyle(start).getPropertyValue('--corner-cut')) || 20;
    const points = [[cut,.8],[width-.8,.8],[width-.8,height-cut],[width-cut,height-.8],[.8,height-.8],[.8,cut]];
    let offset = 0;
    segments = points.map(([x,y],i) => {
      const next = points[(i + 1) % points.length], dx = next[0]-x, dy = next[1]-y;
      const length = Math.hypot(dx,dy), segment = {x,y,dx,dy,length,offset};
      offset += length; return segment;
    });
    perimeter = offset;
    rim.setAttribute('viewBox', `0 0 ${width} ${height}`);
    rim.querySelectorAll('path').forEach(path => path.setAttribute('d', `M${points.map(p=>p.join(',')).join('L')}Z`));
    gradient.setAttribute('r', clamp(width * .16,90,180));
    current = target = segments[1].offset + segments[1].length / 2;
    paintRim();
  }
  function clearLight() {
    if (rimFrame) cancelAnimationFrame(rimFrame);
    rimFrame = 0; rimActive = false;
    start?.classList.remove('is-rim-lit');
  }
  if (start) {
    rim = svgNode('svg', {class:'start-rim', 'aria-hidden':'true', focusable:'false'});
    const defs = svgNode('defs', {});
    gradient = svgNode('radialGradient', {id:'start-rim-light', gradientUnits:'userSpaceOnUse'});
    [['0','#ffe4b5','1'],['.28','#dfad6b','.95'],['.68','#c98a40','.5'],['1','#c98a40','0']].forEach(([offset,color,opacity]) => gradient.append(svgNode('stop', {offset,'stop-color':color,'stop-opacity':opacity})));
    const blur = svgNode('filter', {id:'start-rim-soft', x:'-20%',y:'-20%',width:'140%',height:'140%'});
    blur.append(svgNode('feGaussianBlur', {stdDeviation:'2'}));
    defs.append(gradient,blur); rim.append(defs);
    rim.append(svgNode('path', {fill:'none',stroke:'url(#start-rim-light)','stroke-width':'6',filter:'url(#start-rim-soft)',opacity:'.65'}));
    rim.append(svgNode('path', {fill:'none',stroke:'url(#start-rim-light)','stroke-width':'1.4'}));
    start.append(rim); measureRim();
    if ('ResizeObserver' in window) new ResizeObserver(measureRim).observe(start);
    start.addEventListener('pointermove', event => {
      if (!fine.matches || forced.matches || event.pointerType === 'touch' || document.hidden || !perimeter) return;
      const box = start.getBoundingClientRect(), x = event.clientX-box.left, y = event.clientY-box.top;
      let closest = Infinity, next = target;
      segments.forEach(segment => {
        const t = clamp(((x-segment.x)*segment.dx+(y-segment.y)*segment.dy)/(segment.length**2),0,1);
        const distance = (x-segment.x-segment.dx*t)**2+(y-segment.y-segment.dy*t)**2;
        if (distance < closest) { closest = distance; next = segment.offset+t*segment.length; }
      });
      target = next;
      if (!rimActive || motion.matches) current = target;
      rimActive = true; start.classList.add('is-rim-lit');
      if (!rimFrame) rimFrame = requestAnimationFrame(paintRim);
    }, {passive:true});
    start.addEventListener('pointerleave', clearLight);
    start.addEventListener('focus', () => { if (!rimActive) measureRim(); });
  }
  window.addEventListener('blur', clearLight);
  window.addEventListener('scroll', clearLight, {passive:true});
  motion.addEventListener?.('change', clearLight);
  fine.addEventListener?.('change', clearLight);

  if ('IntersectionObserver' in window) {
    const arrival = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        arrival.unobserve(entry.target);
      });
    }, {threshold: .2});
    document.querySelectorAll('.category-heading').forEach(heading => arrival.observe(heading));
    const visibility = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-in-view', entry.isIntersecting));
    }, {threshold: .05});
    if (start) visibility.observe(start);
  } else if (start) start.classList.add('is-in-view');
  function pageVisibility() {
    root.dataset.pageVisible = String(!document.hidden && !document.querySelector('dialog[open]'));
    if (document.hidden || root.dataset.pageVisible === 'false') clearLight();
  }
  document.addEventListener('visibilitychange', pageVisibility);
  pageVisibility();

  // A transparent overlay indicator replaces the browser's reserved gutter.
  // Touch/wheel scrolling outside the 12–16 px rail is entirely native.
  const rail = document.createElement('div');
  rail.className = 'memento-scrollbar';
  rail.tabIndex = 0;
  rail.setAttribute('role', 'scrollbar');
  rail.setAttribute('aria-label', 'Scorri la pagina');
  rail.setAttribute('aria-controls', document.querySelector('main')?.id || 'memento-catalogo');
  rail.setAttribute('aria-orientation', 'vertical');
  rail.setAttribute('aria-valuemin', '0');
  rail.setAttribute('aria-valuemax', '100');
  rail.setAttribute('aria-valuenow', '0');
  const thumb = document.createElement('span');
  thumb.className = 'memento-scrollbar-thumb';
  thumb.setAttribute('aria-hidden', 'true');
  rail.append(thumb);
  document.body.append(rail);
  root.dataset.overlayScrollbar = 'true';
  let scrollFrame = 0, scrollTimer = 0, drag = null;
  let range = 0, travel = 0, thumbSize = 32;
  function measureScroll() {
    scrollFrame = 0;
    const viewport = window.innerHeight;
    const height = Math.max(root.scrollHeight, document.body.scrollHeight);
    range = Math.max(0, height - viewport);
    const trackHeight = Math.max(0, viewport - 8);
    thumbSize = clamp(trackHeight * viewport / Math.max(viewport, height), 32, trackHeight);
    travel = Math.max(0, trackHeight - thumbSize);
    rail.hidden = range <= 1 || forced.matches || !!document.querySelector('dialog[open]');
    const progress = range > 0 ? clamp(window.scrollY / range, 0, 1) : 0;
    rail.style.setProperty('--scroll-size', `${thumbSize.toFixed(2)}px`);
    rail.style.setProperty('--scroll-top', `${(progress * travel).toFixed(2)}px`);
    rail.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
  }
  function scheduleScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(measureScroll);
  }
  function scrolling() {
    scheduleScroll();
    rail.classList.add('is-scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => rail.classList.remove('is-scrolling'), 800);
  }
  function jump(top) {
    window.scrollTo({top: clamp(top, 0, range), behavior: 'instant'});
    measureScroll();
  }
  function endDrag() {
    if (!drag) return;
    const id = drag.id;
    drag = null;
    if (rail.hasPointerCapture?.(id)) rail.releasePointerCapture(id);
    rail.classList.remove('is-dragging');
  }
  rail.addEventListener('pointerdown', event => {
    if (event.button !== 0 || rail.hidden) return;
    measureScroll();
    const trackTop = rail.getBoundingClientRect().top;
    const thumbTop = range ? clamp(window.scrollY / range, 0, 1) * travel : 0;
    const local = event.clientY - trackTop;
    const inside = local >= thumbTop && local <= thumbTop + thumbSize;
    drag = {id: event.pointerId, offset: inside ? local - thumbTop : thumbSize / 2, top: trackTop};
    rail.setPointerCapture?.(event.pointerId);
    rail.classList.add('is-dragging');
    if (!inside && travel) jump((local - drag.offset) / travel * range);
    event.preventDefault();
  });
  rail.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id || !travel) return;
    jump((event.clientY - drag.top - drag.offset) / travel * range);
    event.preventDefault();
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => rail.addEventListener(type, endDrag));
  window.addEventListener('blur', endDrag);
  rail.addEventListener('keydown', event => {
    measureScroll();
    const top = window.scrollY;
    const next = {ArrowUp: top - 48, ArrowDown: top + 48, PageUp: top - innerHeight * .85, PageDown: top + innerHeight * .85, Home: 0, End: range}[event.key];
    if (next === undefined) return;
    event.preventDefault();
    jump(next);
  });
  window.addEventListener('scroll', scrolling, {passive: true});
  window.addEventListener('resize', () => { clearLight(); scheduleScroll(); }, {passive: true});
  if ('ResizeObserver' in window) {
    const resize = new ResizeObserver(scheduleScroll);
    resize.observe(document.body);
    const main = document.querySelector('main');
    if (main) resize.observe(main);
  }
  forced.addEventListener?.('change', scheduleScroll);
  window.visualViewport?.addEventListener('resize', scheduleScroll, {passive: true});
  document.addEventListener('memento:overlay-change', () => {
    endDrag(); clearLight(); pageVisibility(); measureScroll();
  });
  measureScroll();
})();
