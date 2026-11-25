import { createMaterial, names, weave } from './scene-material.mjs';
import { paddingOf } from '../public/memento-ui/padding.mjs';
import { readFileSync } from 'node:fs';

// R18: the layer of the page change stays under the navigation (z-index 1000): wordmark and dock never leave, only the
// content changes. R23: and it is only the column between the margins (scene-material): nothing else is touched.
// R20: the background of letters stays too: during the change it rises over the material (999 over
// 998) and across the two documents it is its own view-transition group (mm-bg), the outgoing one until the incoming
// has drawn its first frame (data-mm-bg, letters.mjs). Its field is the same in both: nothing jumps. Studio has no
// field (a page of its own): there the outgoing one stays until the room opens. Across the two documents the navigation is its own view-transition group, above the material: the
// outgoing one until the new page opens, then the incoming one (the same bar, its new station lit). The incoming
// material takes over from the outgoing frame once the page name is composed in its own face (data-mm-name).
const css = `@media (prefers-reduced-motion:no-preference) and (forced-colors:none){
  @view-transition {navigation:auto}
  .mm-weave {position:fixed;top:0;left:0;pointer-events:none;overflow:hidden;z-index:998;view-transition-name:mm-material}
  .mm-weave>div {position:absolute;inset:0}
  .mm-veil {background:#090909;opacity:0}
  .mm-weave canvas {position:absolute;left:0;top:0;display:block}
  .mm-tri {position:absolute;left:0;top:0;width:0;height:0;box-sizing:content-box;transform-origin:0 0}
  .mm-piece,.mm-letter,.mm-flash {opacity:0}
  .mm-letters {view-transition-name:mm-bg}
  :root[data-mm-phase] .mm-letters {z-index:999}
  :root[data-mm-phase="hold"] .mm-name {animation:mm-breathe 2.4s ease-in-out infinite}
  @keyframes mm-breathe {50% {filter:brightness(1.14)}}
  memento-nav {view-transition-name:mm-nav}
  ::view-transition {pointer-events:none}
  ::view-transition-group(root) {animation:mm-hold 6s step-end both}
  @keyframes mm-hold {from,to {opacity:1}}
  ::view-transition-old(root),::view-transition-new(root),::view-transition-group(mm-material),::view-transition-old(mm-material),::view-transition-new(mm-material),
  ::view-transition-group(mm-nav),::view-transition-old(mm-nav),::view-transition-new(mm-nav),
  ::view-transition-group(mm-bg),::view-transition-old(mm-bg),::view-transition-new(mm-bg) {animation:none;mix-blend-mode:normal}
  ::view-transition-old(root) {z-index:1;opacity:1}
  :root[data-mm-feed="old"]::view-transition-old(root) {clip-path:inset(0 var(--mm-side,0px))}
  :root[data-mm-feed="old"]::view-transition-new(root) {opacity:0}
  :root[data-mm-feed="new"]::view-transition-old(root),:root[data-mm-name]::view-transition-old(mm-material),:root:not([data-mm-name])::view-transition-new(mm-material) {opacity:0}
  ::view-transition-group(mm-material) {z-index:2}
  ::view-transition-group(mm-bg) {z-index:3}
  ::view-transition-group(mm-nav) {z-index:4}
  :root:not([data-mm-bg])::view-transition-new(mm-bg),:root[data-mm-bg]::view-transition-old(mm-bg),:root[data-mm-feed="new"]::view-transition-old(mm-bg) {opacity:0}
  ::view-transition-new(mm-nav),:root[data-mm-feed="new"]::view-transition-old(mm-nav) {opacity:0}
  :root[data-mm-feed="new"]::view-transition-new(mm-nav) {opacity:1}
}
@media (prefers-reduced-motion:reduce),(forced-colors:active){.mm-weave {display:none}}
@font-face {font-family:Inter;src:url("/assets/fonts/InterVariable.woff2") format("woff2");font-weight:100 900;font-style:normal;font-display:swap}
html {-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
input,textarea,select,[contenteditable]:not([contenteditable="false"]) {-webkit-user-select:text;user-select:text}
img,a,svg,canvas {-webkit-user-drag:none}`;

/**
 * R22: a controlled surface on every page (Studio included): no text selection, no context menu, no middle button
 * (neither autoscroll nor a link opened in a new tab), no dragging images and links out of the page. Fields stay
 * editable and selectable; the keyboard keeps every action.
 */
function guardInput() {
  const field = t => t instanceof Element && !!t.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])');
  addEventListener('contextmenu', e => { if (!field(e.target)) e.preventDefault(); }, {capture:true});
  addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); }, {capture:true});
  addEventListener('auxclick', e => { if (e.button === 1) e.preventDefault(); }, {capture:true});
  addEventListener('dragstart', e => { if (!field(e.target)) e.preventDefault(); }, {capture:true});
  addEventListener('selectstart', e => { if (!field(e.target)) e.preventDefault(); }, {capture:true});
}

/**
 * R20: the background of letters (letters.mjs) is in every body from the first byte, so the page change captures it.
 * R22: and it runs right there, inline, while the page is still parsing: it draws before the first frame of a page
 * that arrives through the page change, so the view transition hands the outgoing field over to a live one at once
 * (it waited for the page's modules: the background stood still for a moment, then jumped).
 */
const lettersSource = readFileSync(new URL('../public/memento-ui/letters.mjs', import.meta.url), 'utf8')
  .replace(/^import \{ paddingOf \} from '\/memento-ui\/padding\.mjs';\n/m, '')
  .replace(/^export /gm, '');
export const lettersLayer = '<div class="mm-letters" aria-hidden="true"><canvas class="mm-letters-field"></canvas><canvas class="mm-letters-light"></canvas></div>'
  + `<script id="memento-letters">(()=>{${paddingOf.toString()}\n${lettersSource}})()</script>`;

function observeScene(createMaterial, names, weave, paddingOf) {
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
  const key = 'memento.route.handoff.v5';
  // R17: from the real interface: leaving, the page on screen comes apart into the name; arriving, the name breaks and
  // the next page composes. R23: shorter (it was 1000 and 1150 ms, 3–3.7 s in all with the wait). The interface is gone
  // by `weave.depart` of the movement (`away` ms: the engine's EXIT and the DOM pieces end at .98 of their duration);
  // the name is whole at the end of it, and the browser is asked for the next page then (it was prefetched on hover or
  // touch): the moment the browser swaps the documents holds a composed name, never a half-formed one
  const exit = 520, unfold = 660, away = exit * weave.depart / .98;
  // R22: the same rhythm on every page. R23: the name, once composed, stays at least `hold` ms and at most `patience` ms
  // more while the incoming page gets its first view and its effects' first frame; what is not ready by then composes in place
  const hold = 140, patience = 380;
  const fallbackBox = [.16, .22, .68, .56];
  let active = null, lastPoint = null, passing = null;
  window.addEventListener('pointerdown', e => {lastPoint = [e.clientX / innerWidth, e.clientY / innerHeight, performance.now()];}, {capture:true, passive:true});

  function crossing(from, to) {
    if (!from || !to) return false;
    const a = new URL(from, location.href), b = new URL(to, location.href);
    return a.origin === location.origin && b.origin === a.origin && path(a) !== path(b) && sections.has(path(a)) && sections.has(path(b));
  }
  function mark(name) {performance.mark?.('memento:' + name);}
  if (window.top !== window) return;
  if (/[?&]mmdebug\b/.test(location.search)) window.__mmScene = {createMaterial, names, weave, paddingOf};
  try {if (sessionStorage.getItem('memento.artwork.software') === '1' && !new URLSearchParams(location.search).has('vfx')) root.setAttribute('data-mm-software','');} catch {}
  const supported = () => motion.matches && 'onpagereveal' in window && typeof Element.prototype.animate === 'function';
  const enabled = () => supported() && !!document.body;

  // R17: whether this visit will draw the page's effects: the page has them (data-mm-effects, set by the build) and
  // the visit gets them (the same decision as vfxPolicy, plus WebGL2 and software graphics, decided by the renderers)
  function expected() {
    if (!root.hasAttribute('data-mm-effects') || root.hasAttribute('data-mm-software')) return false;
    const value = new URLSearchParams(location.search).get('vfx');
    if (value === 'off' || value === '0' || value === 'false') return false;
    if (value === 'low' || value === 'medium' || value === 'high') return true;
    const memory = navigator.deviceMemory;
    if (navigator.connection?.saveData || (typeof memory === 'number' && memory > 0 && memory < 2)) return false;
    return typeof WebGL2RenderingContext !== 'undefined';
  }
  // R17: the effects' code is requested with the document, not when the page's own script asks for it
  if (expected()) for (const href of (root.dataset.mmPreload || '').split(' ').filter(Boolean)) {
    const hint = document.createElement('link');
    hint.rel = 'modulepreload'; hint.href = href;
    document.head.append(hint);
  }
  // R17: a document arriving through the page change says so before its first paint: its effects boot at once under
  // the seal and their loading sequence waits for the seal to lift (paint.mjs, engine.ts, renderer.js)
  function peek() {
    try {const s = JSON.parse(sessionStorage.getItem(key)); return s?.to === location.href && Date.now() - s.at < 15000 ? s : null;} catch {return null;}
  }
  {
    const activation = window.navigation?.activation;
    const type = activation?.navigationType || performance.getEntriesByType?.('navigation')[0]?.type;
    if (supported() && type !== 'reload' && (peek() || crossing(activation?.from?.url, location.href))) {
      root.setAttribute('data-mm-arrive', '');
      root.dataset.mmPhase = 'hold';
      // R23: the name's face is asked for at once (it is preloaded; asked for here it is ready by the first frame)
      try {document.fonts?.load('300 64px Inter');} catch {}
      // never left covered: pagereveal decides within a frame; this is only the net under it
      setTimeout(() => {if (!active && root.hasAttribute('data-mm-arrive')) settle();}, 6000);
    }
  }

  // the interface on screen, in viewport fractions: where the fragments come from (leaving) and land (arriving).
  // R22: with its colours, a 3 × 3 grid of each photograph (the title's own gradient for type), so every fragment
  // carries the piece of interface it broke from. R23: read ahead of time, while the page is idle, one photograph at a
  // time (read back on the click it cost 80 ms, right when the touch wants an answer)
  const parts = '[data-vfx], #scene .card[data-slot], main img, main h1, main h2, main canvas, #experience';
  const typeColours = [[246,241,235],[233,222,204],[210,187,160]];
  const palette = new Map();
  const photoOf = el => {
    const img = el.localName === 'img' ? el : el.querySelector?.('img');
    return img?.currentSrc || img?.getAttribute('src') || el.dataset?.vfxPhoto || '';
  };
  function coloursOf(el) {
    if (/^h[1-6]$/.test(el.localName) || el.dataset?.vfx === 'title') return typeColours;
    const url = photoOf(el);
    return url && palette.get(new URL(url, location.href).href) || null;
  }
  function readColours() {
    const idle = window.requestIdleCallback || (f => setTimeout(() => f({timeRemaining: () => 8}), 120));
    const queue = [...new Set([...document.querySelectorAll(parts)].map(photoOf).filter(Boolean).map(u => new URL(u, location.href).href))]
      .filter(u => u.startsWith(location.origin) && !palette.has(u)).slice(0, 24);
    let scratch = null;
    const next = () => {
      const url = queue.shift();
      if (!url) return;
      idle(async () => {
        try {
          const image = new Image();
          image.src = url;
          await image.decode();
          scratch ??= document.createElement('canvas').getContext('2d', {willReadFrequently:true});
          scratch.canvas.width = scratch.canvas.height = 12;
          scratch.drawImage(image, 0, 0, 12, 12);
          const d = scratch.getImageData(0, 0, 12, 12).data, grid = [];
          for (let gy = 0; gy < 3; gy++) for (let gx = 0; gx < 3; gx++) {
            const sum = [0, 0, 0];
            for (let y = gy * 4; y < gy * 4 + 4; y++) for (let x = gx * 4; x < gx * 4 + 4; x++) for (let c = 0; c < 3; c++) sum[c] += d[(y * 12 + x) * 4 + c];
            grid.push(sum.map(v => Math.round(v / 16)));
          }
          palette.set(url, grid);
        } catch {}
        next();
      });
    };
    next();
  }
  window.addEventListener('load', () => setTimeout(readColours, 900), {once:true});
  function sceneOf(origin) {
    const vw = innerWidth, vh = innerHeight, rects = [];
    // R18: the navigation stays on screen: only the content comes apart
    for (const el of document.querySelectorAll(parts)) {
      const r = el.getBoundingClientRect();
      if (r.width * r.height < 900 || r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) continue;
      rects.push([r.left / vw, r.top / vh, r.width / vw, r.height / vh, r.width * r.height, el]);
    }
    rects.sort((a, b) => b[4] - a[4]);
    if (!rects.length) rects.push([...fallbackBox, 0, null]);
    const kept = rects.slice(0, 28);
    return {origin, rects: kept.map(q => q.slice(0, 4).map(v => Math.round(v * 1e4) / 1e4)), colours: kept.map(q => q[5] ? coloursOf(q[5]) : null)};
  }
  function firstElement() {
    const selectors = {studio:'#experience #loading', services:'#bundle-boards [data-slide="0"] img',
      projects:'#project-view:not([hidden]) .flow-card[aria-current] img, #catalogue:not([hidden]) #project-grid img',
      levelup:'#benefits [data-slide="0"] img', start:'main h1, #root h1'};
    return document.querySelector(selectors[root.dataset.mementoNative] || '#scene .card[data-slot="active"] img') || document.querySelector('main h1,main');
  }

  // R17: the next document is requested while the page comes apart (speculation rules: the navigation then uses the
  // prefetched response; elsewhere a prefetch hint). Desktop: on a short hover; touch: on contact.
  const fetched = new Set();
  function prefetch(url) {
    if (fetched.has(url)) return;
    fetched.add(url);
    try {
      if (HTMLScriptElement.supports?.('speculationrules')) {
        const rules = document.createElement('script');
        rules.type = 'speculationrules';
        rules.textContent = JSON.stringify({prefetch:[{source:'list', urls:[url]}]});
        document.head.append(rules);
      } else {
        const hint = document.createElement('link');
        hint.rel = 'prefetch'; hint.href = url;
        document.head.append(hint);
      }
    } catch {}
  }
  function linkOf(event) {
    const a = event.composedPath().find(node => node instanceof HTMLAnchorElement);
    if (!a || a.hasAttribute('download') || !['','_self','_top','_parent'].includes(a.target)) return null;
    return a;
  }
  // R23: the name of the page a link opens is composed ahead of the click as well (on the same short hover, on
  // contact): the click itself only sets the movement going. It cost 20–40 ms on a desktop, two or three times as much
  // on a phone, right between the touch and its first answer. Kept for a few seconds, for one link at a time.
  let prepared = null;
  function prepare(url) {
    if (!enabled() || active || prepared?.url === url) return;
    dismiss();
    try {prepared = {url, layer:createMaterial(nameOf(url), weave, paddingOf), timer:setTimeout(dismiss, 6000)};} catch {prepared = null;}
  }
  function dismiss() {
    if (!prepared) return;
    clearTimeout(prepared.timer);
    prepared.layer.remove();
    prepared = null;
  }
  function materialFor(url) {
    if (prepared?.url === url) {const layer = prepared.layer; clearTimeout(prepared.timer); prepared = null; return layer;}
    dismiss();
    return createMaterial(nameOf(url), weave, paddingOf);
  }
  let hover = 0, hovered = null;
  window.addEventListener('pointerover', e => {
    clearTimeout(hover);
    const a = e.pointerType === 'mouse' && linkOf(e);
    // the name is composed when the browser is idle: moving across the dock never waits for it
    if (a && crossing(location.href, a.href)) hover = setTimeout(() => {
      prefetch(a.href);
      (window.requestIdleCallback || setTimeout)(() => {if (hovered === a.href) prepare(a.href);}, {timeout:240});
    }, 90);
    hovered = a ? a.href : null;
  }, {passive:true});
  // on contact: a touch on the dock is a choice (a touch on a card may be the start of a scroll: only prefetched)
  window.addEventListener('pointerdown', e => {
    const a = linkOf(e);
    if (!a || !crossing(location.href, a.href)) return;
    prefetch(a.href);
    if (e.pointerType === 'mouse' || a.getRootNode()?.host?.localName === 'memento-nav') prepare(a.href);
  }, {capture:true, passive:true});

  // R17: the pieces of the interface the DOM paints (type, photographs, the dock; what a GPU surface keeps as DOM).
  // The surfaces the engine draws come apart in the engine itself.
  const leafy = 'img,picture,video,canvas,svg,h1,h2,h3,h4,h5,h6,p,li,dt,dd,button,a,label,input,select,textarea,figure,blockquote,pre,table,iframe,[data-vfx]';
  const artwork = '.vfx-layer,.mm-weave,.mm-letters,canvas#world';
  const skip = artwork + ',script,style,link,meta,template,noscript';
  function pieces() {
    const vw = innerWidth, vh = innerHeight, live = root.classList.contains('vfx-live'), out = [];
    const take = el => {
      const style = getComputedStyle(el);
      if (style.visibility !== 'hidden' && +style.opacity > .01) out.push([el, +style.opacity]);
    };
    (function walk(el, depth) {
      for (const c of el.children) {
        if (out.length >= 140) return;
        if (c.matches(skip)) continue;
        const r = c.getBoundingClientRect();
        if (!r.width || !r.height) {if (depth < 9 && c.children.length) walk(c, depth + 1); continue;}
        if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) continue;
        if (live && c.hasAttribute('data-vfx-ready')) {for (const d of c.querySelectorAll('[data-vfx-dom]')) if (out.length < 140) take(d); continue;}
        // R18: the navigation (wordmark and dock) stays: only the content leaves (the scroll cue leaves with it)
        if (c.localName === 'memento-nav') continue;
        if (c.querySelector(artwork)) {walk(c, depth + 1); continue;}   // never the canvas that takes itself apart
        if (c.matches(leafy) || depth >= 8 || !c.children.length || r.width * r.height < vw * vh * .08) take(c);
        else walk(c, depth + 1);
      }
    })(document.body, 0);
    return out;
  }
  // each piece leaves when the cells around it do (weave.leave, EXIT in the shaders): toward the seal, smaller, gone
  function dissolve(s) {
    const vw = innerWidth, vh = innerHeight, ox = s.scene.origin[0] * vw, oy = s.scene.origin[1] * vh;
    const far = Math.hypot(Math.max(ox, vw - ox), Math.max(oy, vh - oy)) || 1, [l0, l1, lj] = weave.leave;
    s.anims = [];
    for (const [el, opacity] of pieces()) {
      const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      const d = Math.min(1, Math.hypot(x - ox, y - oy) / far), jitter = ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 + 1) % 1;
      const delay = Math.max(0, l0 + l1 * d + lj * .5 * (jitter - .5)) * away;
      try {
        s.anims.push(el.animate([
          {opacity, scale:'1', translate:'0px 0px'},
          {opacity: opacity * .9, offset:.25},
          {opacity:0, scale:'.9', translate:`${((vw / 2 - x) * .18).toFixed(1)}px ${((vh / 2 - y) * .18).toFixed(1)}px`},
        ], {duration:.42 * away, delay, easing:'cubic-bezier(.5,0,.75,.4)', fill:'both'}));
      } catch {}
    }
  }

  function release() {
    const s = active;
    active = null;
    if (s) {
      cancelAnimationFrame(s.frame);
      clearTimeout(s.timeout);
      s.run?.cancel();
      s.layer?.remove();
      // a page that did not leave after all (blocked, back from the cache): its interface is put back together
      if (s.anims) {for (const a of s.anims) a.cancel(); document.dispatchEvent(new Event('memento:scene-reset'));}
      s.finish();
      s.transition?.skipTransition();
    }
    settle();
  }
  function settle() {
    delete root.dataset.mmPhase;
    delete root.dataset.mmFeed;
    root.removeAttribute('data-mm-name');
    root.removeAttribute('data-mm-arrive');
    window.mementoSceneFinished = undefined;
    document.dispatchEvent(new Event('memento:surface-visibility'));
  }
  function begin(destination, phase) {
    if (active) release();
    const s = {destination, scene:{origin:[.5,.5], rects:[]}, frame:0};
    window.mementoSceneFinished = new Promise(resolve => {s.finish = resolve;});
    active = s;
    root.dataset.mmPhase = phase;
    s.timeout = setTimeout(release, 5200);
    return s;
  }
  // R18: the name composed during the change is the page that opens (leaving: the destination; arriving: this page)
  const nameOf = url => {try {return names[path(new URL(url, location.href))] || 'MEMENTO';} catch {return 'MEMENTO';}};
  function play(s, covering, fraction, duration) {
    s.layer ??= s.destination ? materialFor(s.destination) : createMaterial(nameOf(location.href), weave, paddingOf);
    s.run?.cancel();
    s.run = s.layer.play(covering, fraction, duration, s.scene);
    return s.run.done.catch(() => {});
  }
  /**
   * The page comes apart from where it was touched: its GPU cells (memento:scene-exit), its DOM pieces and the lattice
   * over it. `deferred`: the browser navigates when it is over (the document was requested at the start); otherwise
   * (history) the browser commits whenever it is ready and the next document finishes the movement.
   */
  function leave(url, deferred, replace) {
    const s = begin(url, 'gather');
    s.deferred = deferred;
    mark('depart');
    const origin = lastPoint && performance.now() - lastPoint[2] < 2000 ? lastPoint.slice(0, 2) : [.5, .5];
    const go = () => {
      // from here the navigation is pending: its end (or its abort) closes the scene, not a timer
      clearTimeout(s.timeout);
      // R22: a next page that does not come within a few seconds (a slow network) gives this one back: the name no
      // longer stands on an empty screen. The navigation goes on; the next page simply opens without the change.
      s.timeout = setTimeout(release, 4500);
      passing = s.destination;
      replace ? location.replace(s.destination) : location.assign(s.destination);
    };
    try {
      s.scene = sceneOf(origin);
      document.dispatchEvent(new CustomEvent('memento:scene-exit', {detail:{origin, duration:away}}));
      dissolve(s);
      play(s, true, 0, exit).then(() => {
        if (active !== s) return;
        root.dataset.mmPhase = 'hold';
        mark('gathered');
        if (deferred) go();
      });
    } catch {if (deferred) go(); else release();}
  }
  function depart(url, replace) {
    if (active?.destination) {   // already leaving: the last choice wins
      if (url !== active.destination) {active.destination = url; prefetch(url);}
      return;
    }
    prefetch(url);
    leave(url, true, replace);
  }
  // R17: the navigation is the browser's, a moment later. No synthetic click, no second request (it was prefetched).
  window.mementoGo = href => {
    const url = new URL(href, location.href).href;
    if (url === location.href || url === active?.destination) return;
    if (enabled() && crossing(location.href, url)) depart(url);
    else location.assign(url);
  };
  function save(destination) {
    const s = active;
    if (!s?.destination) return;
    try {sessionStorage.setItem(key, JSON.stringify({to:destination || s.destination, at:Date.now(), fraction:s.run?.fraction() ?? 0, deferred:!!s.deferred, scene:s.scene}));} catch {}
  }
  function read() {
    const s = peek();
    try {sessionStorage.removeItem(key);} catch {}
    return s;
  }
  // Do not touch the old DOM in pageswap. Its snapshot must match the last frame the visitor saw.
  window.addEventListener('pageswap', event => {
    event.viewTransition?.ready.catch(() => {});
    save(event.activation?.entry?.url);
  });
  // R23: leaving for good, the page is left as it is: the browser may capture the outgoing frame after this event, and
  // putting the interface back together here showed it whole again, frozen, in the margins. Back from the cache, the
  // page is put back together on pageshow.
  window.addEventListener('pagehide', event => {
    save();
    dismiss();
    if (!event.persisted || !active) return;
    clearTimeout(active.timeout); active.run?.cancel();
  });
  window.addEventListener('click', event => {
    if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const a = linkOf(event);
    if (!a) return;
    const dock = a.getRootNode()?.host?.localName === 'memento-nav';
    if (a.href === active?.destination || (dock && a.href === location.href)) {event.preventDefault(); return;}
    if (!enabled() || !crossing(location.href, a.href)) return;
    event.preventDefault();
    depart(a.href, false);
  });
  window.navigation?.addEventListener('navigate', e => {
    if (e.defaultPrevented || e.hashChange || e.navigationType === 'reload' || e.downloadRequest != null || e.formData) return;
    const url = e.destination.url;
    if (!crossing(location.href, url)) {if (!e.destination.sameDocument) release(); return;}
    if (url === passing) {   // the deferred navigation itself
      const s = active;
      e.signal.addEventListener('abort', () => {passing = null; if (active === s) release();}, {once:true});
      return;
    }
    if (!enabled()) return;
    // a navigation started by script (location.assign, a form-less redirect) waits for the page to come apart too
    if (e.cancelable && (e.navigationType === 'push' || e.navigationType === 'replace')) {
      e.preventDefault();
      depart(url, e.navigationType === 'replace');
      return;
    }
    // history: the browser goes now; the movement starts here and the next document finishes it
    leave(url, false);
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
    try {await Promise.race([visible(), new Promise(resolve => {timer = setTimeout(resolve, 1200);})]);} catch {} finally {clearTimeout(timer);}
  }
  // R17: the effects of the incoming page draw their first frame under the seal (html.vfx-live; a renderer that fails
  // settles its entry in window.mementoEffects, paint.mjs): the page is revealed already drawn, never as plain DOM
  // taken over a moment later. Pages without effects, or a visit that will not get them, do not wait.
  function effectsOf(started) {
    if (!expected()) return;
    return new Promise(resolve => {
      const list = () => window.mementoEffects || [];
      const check = () => {
        if (root.classList.contains('vfx-live') || root.classList.contains('vfx-off') || (list().length && list().every(e => e.settled))
          || performance.now() - started > patience || !active) resolve();
        else setTimeout(check, 24);
      };
      check();
    });
  }
  // R23: what of the incoming page lies outside the column (a slider that runs edge to edge) composes with the cells
  // that open next to it: it would otherwise stand there, whole, beside a column still covered
  function assemble() {
    const vw = innerWidth, vh = innerHeight, P = paddingOf(vw, vh) * vw, far = Math.hypot(vw / 2, vh / 2) || 1, [o0, o1] = weave.open;
    for (const [el, opacity] of pieces()) {
      const r = el.getBoundingClientRect();
      if (r.left >= P - 1 && r.right <= vw - P + 1) continue;
      const x = Math.min(Math.max(r.left + r.width / 2, P), vw - P), y = r.top + r.height / 2;
      const delay = (o0 + (o1 - weave.span - o0) * Math.min(1, Math.hypot(x - vw / 2, (y - vh / 2) * 1.25) / far)) * unfold;
      try {el.animate([{opacity:0}, {opacity}], {duration:weave.span * unfold, delay, easing:'ease-out', fill:'backwards'});} catch {}
    }
  }
  async function arrive(event) {
    const started = performance.now();
    const vt = event.viewTransition;
    vt?.ready.catch(() => {});
    const saved = read();
    const activation = window.navigation?.activation;
    const type = activation?.navigationType || performance.getEntriesByType('navigation')[0]?.type;
    if (type === 'reload' || !enabled() || !(saved || crossing(activation?.from?.url, location.href))) {
      vt?.skipTransition();
      if (root.hasAttribute('data-mm-arrive') || active) release();
      return;
    }
    const s = begin(null, 'hold');
    s.transition = vt;
    root.setAttribute('data-mm-arrive', '');
    // R23: of the outgoing frame only the column stays (the margins hold nothing but the background, which goes on)
    root.style.setProperty('--mm-side', Math.round(paddingOf(innerWidth, innerHeight) * innerWidth) + 'px');
    root.dataset.mmFeed = 'old';
    s.scene = saved?.scene || {origin:[.5, .5], rects:[]};
    const first = readyView(s);
    try {
      // the old page asked for this one while its name formed: the movement goes on from where it was when the browser
      // swapped the documents. History swaps earlier: the rest runs here, quicker, over the old page's last frame.
      const fraction = vt ? Math.max(0, Math.min(1, saved?.fraction ?? 1)) : 1;
      const covered = play(s, true, fraction, saved?.deferred ? exit : Math.min(exit, 420 / Math.max(.01, 1 - fraction)));
      // R18: until the name is composed in its own face, the outgoing frame stays on screen (view transition)
      s.layer.ready.then(() => {if (active === s) root.setAttribute('data-mm-name', '');});
      await Promise.all([covered, vt?.ready.catch(() => {})]);
      // R22: the same rhythm on every page. R23: the composed name stays `hold` ms, and up to `patience` ms while the
      // page gets its first view and its effects' first frame; whatever is not ready then composes in place
      const composed = performance.now(), wait = ms => new Promise(resolve => setTimeout(resolve, ms));
      // R23: the opening is built now, while the name holds (its cells, their timelines), not on the frame it starts
      const primed = first.then(() => {if (active === s) return s.layer.prime(false, unfold, s.nextScene || sceneOf([.5, .5]));}).catch(() => {});
      await Promise.race([Promise.all([first, effectsOf(started), primed]), wait(patience)]);
      await wait(Math.max(0, hold - (performance.now() - composed)));
      if (s !== active) return;
      root.dataset.mmFeed = 'new';
      root.dataset.mmPhase = 'unfold';
      // the loading sequences start now: the page composes through the opening cells
      document.dispatchEvent(new Event('memento:scene-unfold'));
      s.scene = s.nextScene || sceneOf([.5, .5]);
      mark('open');
      const opening = play(s, false, 0, unfold);
      assemble();
      // R23: from here the page shows by itself exactly what the view transition shows (its own content, its material,
      // its background and its navigation): the transition ends now, and the cells open on the page itself
      vt?.skipTransition();
      await opening;
      if (active === s) {mark('done'); release();}
    } catch {if (active === s) release();}
  }
  window.addEventListener('pagereveal', arrive);
  window.addEventListener('pageshow', event => {if (event.persisted && active?.destination) release();});
  motion.addEventListener('change', release);
}

export const sceneHead = `<style id="memento-scene-shape">${css}</style><script id="memento-guard">(${guardInput.toString()})()</script><script id="memento-scene-navigation">(${observeScene.toString()})(${createMaterial.toString()},${JSON.stringify(names)},${JSON.stringify(weave)},${paddingOf.toString()})</script>`;
