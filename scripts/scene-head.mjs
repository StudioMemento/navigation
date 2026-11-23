import { createMaterial, seal } from './scene-material.mjs';

const css = `@media (prefers-reduced-motion:no-preference) and (forced-colors:none){
  @view-transition {navigation:auto}
  .mm-weave {position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:2147483647;view-transition-name:mm-material}
  .mm-veil {position:absolute;inset:0;background:#000;opacity:0}
  .mm-seal,.mm-weave i {position:absolute;top:50%;left:50%;opacity:0}
  .mm-seal {width:clamp(72px,12vmin,128px);height:auto;transform:translate(-50%,-50%);filter:drop-shadow(0 0 9px #ff8a3838)}
  .mm-weave i {width:8px;height:5px;background:#eda664;clip-path:polygon(0 100%,34% 0,100% 72%)}
  ::view-transition {pointer-events:none}
  ::view-transition-group(root) {animation:mm-hold 5s step-end both}
  @keyframes mm-hold {from,to {opacity:1}}
  ::view-transition-old(root),::view-transition-new(root),::view-transition-group(mm-material),::view-transition-new(mm-material) {animation:none;mix-blend-mode:normal}
  ::view-transition-old(root) {z-index:1;opacity:1}
  :root[data-mm-feed="new"]::view-transition-old(root),::view-transition-old(mm-material) {opacity:0;animation:none}
  ::view-transition-group(mm-material) {z-index:2}
}
@media (prefers-reduced-motion:reduce),(forced-colors:active){.mm-weave {display:none}}`;

function observeScene(createMaterial, seal) {
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
  const key = 'memento.route.handoff.v3';
  const gather = 260, unfold = 260;
  const fallbackBox = [.16, .22, .68, .56];
  let active = null;

  function crossing(from, to) {
    if (!from || !to) return false;
    const a = new URL(from, location.href), b = new URL(to, location.href);
    return a.origin === location.origin && b.origin === a.origin && path(a) !== path(b) && sections.has(path(a)) && sections.has(path(b));
  }
  function mark(name) {performance.mark?.('memento:' + name);}
  function bounds(el) {
    if (!el) return fallbackBox;
    const r = el.getBoundingClientRect();
    const x = Math.max(0, r.left), y = Math.max(0, r.top);
    const w = Math.min(innerWidth, r.right) - x, h = Math.min(innerHeight, r.bottom) - y;
    return w > 8 && h > 8 ? [x/innerWidth, y/innerHeight, w/innerWidth, h/innerHeight] : fallbackBox;
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
    const s = {destination, box:fallbackBox, frame:0};
    window.mementoSceneFinished = new Promise(resolve => {s.finish = resolve;});
    active = s;
    root.dataset.mmPhase = phase;
    s.timeout = setTimeout(release, 4500);
    return s;
  }
  function play(s, covering, fraction) {
    s.layer ??= createMaterial(seal);
    s.run?.cancel();
    s.run = s.layer.play(covering, fraction, covering ? gather : unfold, s.box);
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
        s.box = bounds(firstElement());
        play(s, true, 0).then(() => {if (active === s) root.dataset.mmPhase = 'hold';});
      } catch {release();}
    });
  }
  function save() {
    const s = active;
    if (!s?.destination) return;
    try {sessionStorage.setItem(key, JSON.stringify({to:s.destination, at:Date.now(), fraction:s.run?.fraction() || 0, box:s.box}));} catch {}
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
      s.nextBox = bounds(target);
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
    s.box = saved?.box || fallbackBox;
    const first = readyView(s);
    try {
      // An incoming document with no old snapshot must start fully covered, before its first paint.
      const fraction = vt ? Math.max(0, Math.min(1, saved?.fraction || 0)) : 1;
      const covered = play(s, true, fraction);
      await Promise.all([covered, first, vt?.ready.catch(() => {})]);
      if (s !== active) return;
      root.dataset.mmFeed = 'new';
      root.dataset.mmPhase = 'unfold';
      s.box = s.nextBox || fallbackBox;
      mark('open');
      await play(s, false, 0);
      if (active === s) {mark('done');release();}
    } catch {if (active === s) release();}
  }
  window.addEventListener('pagereveal', arrive);
  window.addEventListener('pageshow', event => {if (event.persisted && active?.destination) release();});
  motion.addEventListener('change', release);
}

export const sceneHead = `<style id="memento-scene-shape">${css}</style><script id="memento-scene-navigation">(${observeScene.toString()})(${createMaterial.toString()},${JSON.stringify(seal)})</script>`;
