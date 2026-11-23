import { createMaterial, seal, weave } from './scene-material.mjs';

const css = `@media (prefers-reduced-motion:no-preference) and (forced-colors:none){
  @view-transition {navigation:auto}
  .mm-weave {position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:2147483647;view-transition-name:mm-material}
  .mm-cells {position:absolute;inset:0;width:100%;height:100%}
  .mm-seal {position:absolute;top:50%;left:50%;opacity:0;width:clamp(72px,12vmin,128px);height:auto;transform:translate(-50%,-50%);filter:drop-shadow(0 0 9px #ff8a3838)}
  ::view-transition {pointer-events:none}
  ::view-transition-group(root) {animation:mm-hold 5s step-end both}
  @keyframes mm-hold {from,to {opacity:1}}
  ::view-transition-old(root),::view-transition-new(root),::view-transition-group(mm-material),::view-transition-new(mm-material) {animation:none;mix-blend-mode:normal}
  ::view-transition-old(root) {z-index:1;opacity:1}
  :root[data-mm-feed="new"]::view-transition-old(root),::view-transition-old(mm-material) {opacity:0;animation:none}
  ::view-transition-group(mm-material) {z-index:2}
}
@media (prefers-reduced-motion:reduce),(forced-colors:active){.mm-weave {display:none}}`;

function observeScene(createMaterial, seal, weave) {
  const root = document.documentElement;
  if (['services','levelup'].includes(root.dataset.mementoNative)) root.dataset.overlayScrollbar = 'true';
  let width, height;
  function fit() {
    const w = root.clientWidth || innerWidth, h = Math.round(window.visualViewport?.height || innerHeight);
    if (w !== width) {
      width = w;
      const wide = Math.max(0, Math.min(1, (w - 768) / 256));
      root.style.setProperty('--layout-wide', String(wide));
      root.style.setProperty('--board-ratio', String(1 + wide));
    }
    if (h !== height) {height = h; root.style.setProperty('--memento-nav-height', h + 'px');}
  }
  fit();
  window.addEventListener('resize', fit, {passive:true});
  window.visualViewport?.addEventListener('resize', fit, {passive:true});
  const motion = matchMedia('(prefers-reduced-motion:no-preference) and (forced-colors:none)');
  const sections = new Set(['/', '/studio', '/memento', '/services', '/projects', '/levelup', '/start']);
  const path = url => url.pathname.replace(/\/+$/, '') || '/';
  const key = 'memento.route.handoff.v4';
  // R16: the interface comes apart into the seal (gather), the seal composes the next one (unfold). Was 260 + 260 ms
  const gather = 560, unfold = 700;
  const fallbackBox = [.16, .22, .68, .56];
  let active = null, lastPoint = null;
  window.addEventListener('pointerdown', e => {lastPoint = [e.clientX / innerWidth, e.clientY / innerHeight, performance.now()];}, {capture:true, passive:true});

  function crossing(from, to) {
    if (!from || !to) return false;
    const a = new URL(from, location.href), b = new URL(to, location.href);
    return a.origin === location.origin && b.origin === a.origin && path(a) !== path(b) && sections.has(path(a)) && sections.has(path(b));
  }
  function mark(name) {performance.mark?.('memento:' + name);}
  // the interface on screen, in viewport fractions: the cells over it are the ones that become fragments
  function sceneOf(origin) {
    const vw = innerWidth, vh = innerHeight, rects = [];
    for (const el of document.querySelectorAll('[data-vfx], #scene .card[data-slot], main img, main h1, main h2, main canvas, #experience, memento-nav')) {
      const r = el.getBoundingClientRect();
      if (r.width * r.height < 900 || r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) continue;
      rects.push([r.left / vw, r.top / vh, r.width / vw, r.height / vh, r.width * r.height]);
    }
    rects.sort((a, b) => b[4] - a[4]);
    if (!rects.length) rects.push([...fallbackBox, 0]);
    return {origin, rects: rects.slice(0, 28).map(q => q.slice(0, 4).map(v => Math.round(v * 1e4) / 1e4))};
  }
  function firstElement() {
    const selectors = {studio:'#experience #loading', services:'#bundle-boards [data-slide="0"] img',
      projects:'#project-view:not([hidden]) .flow-card[aria-current] img, #catalogue:not([hidden]) #project-grid img',
      levelup:'#benefits [data-slide="0"] img', start:'main h1, #root h1'};
    return document.querySelector(selectors[root.dataset.mementoNative] || '#scene .card[data-slot="active"] img') || document.querySelector('main h1,main');
  }
  // The next navigation always belongs to the browser. No synthetic click, second fetch or deferred location.assign.
  window.mementoGo = href => {
    const url = new URL(href, location.href).href;
    if (url !== location.href && url !== active?.destination) location.assign(url);
  };
  if (window.top !== window) return;
  try {if (sessionStorage.getItem('memento.artwork.software') === '1' && !new URLSearchParams(location.search).has('vfx')) root.setAttribute('data-mm-software','');} catch {}
  const enabled = () => motion.matches && 'onpagereveal' in window && typeof Element.prototype.animate === 'function' && !!document.body;
  function release() {
    const s = active;
    if (!s) return;
    active = null;
    cancelAnimationFrame(s.frame);
    clearTimeout(s.timeout);
    s.run?.cancel();
    s.layer?.remove();
    s.finish();
    s.transition?.skipTransition();
    delete root.dataset.mmPhase;
    delete root.dataset.mmFeed;
    window.mementoSceneFinished = undefined;
    document.dispatchEvent(new Event('memento:surface-visibility'));
  }
  function begin(destination, phase) {
    release();
    const s = {destination, scene:{origin:[.5,.5], rects:[]}, frame:0};
    window.mementoSceneFinished = new Promise(resolve => {s.finish = resolve;});
    active = s;
    root.dataset.mmPhase = phase;
    s.timeout = setTimeout(release, 4500);
    return s;
  }
  function play(s, covering, fraction) {
    s.layer ??= createMaterial(seal, weave);
    s.run?.cancel();
    s.run = s.layer.play(covering, fraction, covering ? gather : unfold, s.scene);
    return s.run.done.catch(() => {});
  }
  function depart(to) {
    if (!enabled() || !crossing(location.href, to) || active?.destination === to) return;
    const s = begin(to, 'gather');
    mark('depart');
    // Start the document request before measuring or constructing any visual layer.
    s.frame = requestAnimationFrame(() => {
      if (s !== active) return;
      try {
        // the decomposition starts where the page was touched (keyboard and history: the middle)
        const origin = lastPoint && performance.now() - lastPoint[2] < 2000 ? lastPoint.slice(0, 2) : [.5, .5];
        s.scene = sceneOf(origin);
        play(s, true, 0).then(() => {if (active === s) root.dataset.mmPhase = 'hold';});
      } catch {release();}
    });
  }
  function save() {
    const s = active;
    if (!s?.destination) return;
    try {sessionStorage.setItem(key, JSON.stringify({to:s.destination, at:Date.now(), fraction:s.run?.fraction() || 0, scene:s.scene}));} catch {}
  }
  function read() {
    try {
      const s = JSON.parse(sessionStorage.getItem(key)); sessionStorage.removeItem(key);
      return s?.to === location.href && Date.now() - s.at < 15000 ? s : null;
    } catch {return null;}
  }
  // Do not touch the old DOM in pageswap. Its snapshot must match the last frame the visitor saw.
  window.addEventListener('pageswap', event => {event.viewTransition?.ready.catch(() => {});save();});
  window.addEventListener('pagehide', () => {save();release();});
  window.addEventListener('click', event => {
    if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const a = event.composedPath().find(node => node instanceof HTMLAnchorElement);
    if (!a || a.hasAttribute('download') || !['','_self','_top','_parent'].includes(a.target)) return;
    const dock = a.getRootNode()?.host?.localName === 'memento-nav';
    if (a.href === active?.destination || (dock && a.href === location.href)) {event.preventDefault();return;}
    if (!window.navigation) depart(a.href);
  });
  window.navigation?.addEventListener('navigate', e => {
    if (e.defaultPrevented || e.hashChange || e.navigationType === 'reload' || e.downloadRequest != null || e.formData) return;
    if (!crossing(location.href, e.destination.url)) {release();return;}
    depart(e.destination.url);
    const s = active;
    e.signal.addEventListener('abort', () => {if (active === s) release();}, {once:true});
  });

  async function readyView(s) {
    let timer;
    async function visible() {
      if (document.readyState === 'loading') await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, {once:true}));
      if (s !== active) return;
      const target = firstElement();
      s.nextScene = sceneOf([.5, .5]);
      if (target instanceof HTMLImageElement && (target.currentSrc || target.getAttribute('src'))) await target.decode();
      else if (root.dataset.mementoNative === 'studio' && target && !document.body.classList.contains('ready')) {
        const poster = getComputedStyle(target,'::before').backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);
        if (poster) {const image = new Image(); image.src = poster[1]; await image.decode();}
      }
      if (document.fonts?.status === 'loading') await document.fonts.ready;
    }
    try {await Promise.race([visible(), new Promise(resolve => {timer = setTimeout(resolve, 900);})]);} catch {} finally {clearTimeout(timer);}
  }
  async function arrive(event) {
    const vt = event.viewTransition;
    vt?.ready.catch(() => {});
    const saved = read();
    const activation = window.navigation?.activation;
    const type = activation?.navigationType || performance.getEntriesByType('navigation')[0]?.type;
    if (type === 'reload' || !enabled() || !(saved || crossing(activation?.from?.url, location.href))) {
      vt?.skipTransition();return;
    }
    const s = begin(null, 'gather');
    s.transition = vt;
    root.dataset.mmFeed = 'old';
    s.scene = saved?.scene || {origin:[.5, .5], rects:[]};
    const first = readyView(s);
    try {
      // An incoming document with no old snapshot must start fully covered, before its first paint.
      const fraction = vt ? Math.max(0, Math.min(1, saved?.fraction || 0)) : 1;
      const covered = play(s, true, fraction);
      await Promise.all([covered, first, vt?.ready.catch(() => {})]);
      if (s !== active) return;
      root.dataset.mmFeed = 'new';
      root.dataset.mmPhase = 'unfold';
      s.scene = s.nextScene || sceneOf([.5, .5]);
      mark('open');
      await play(s, false, 0);
      if (active === s) {mark('done');release();}
    } catch {if (active === s) release();}
  }
  window.addEventListener('pagereveal', arrive);
  window.addEventListener('pageshow', event => {if (event.persisted && active?.destination) release();});
  motion.addEventListener('change', release);
}

export const sceneHead = `<style id="memento-scene-shape">${css}</style><script id="memento-scene-navigation">(${observeScene.toString()})(${createMaterial.toString()},${JSON.stringify(seal)},${JSON.stringify(weave)})</script>`;
