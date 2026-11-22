import { nativeNav } from '../public/navigation/markup.mjs';
import { sceneHead } from './scene-head.mjs';
import { parse, parseFragment, serialize } from 'parse5';
import { STATIONS, PUBLIC_ORIGIN } from '../src/kit/core.mjs';
import { routeMeta, OG_IMAGE } from '../src/seo.mjs';

const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
function set(node, name, value) {
  node.attrs = node.attrs.filter(a => a.name !== name);
  node.attrs.push({ name, value });
}
const plain = node => (node.childNodes || []).map(n => n.value || '').join('');
const pathOf = value => (value || '').split(/[?#]/)[0].replace(/^\.\//, '');
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

function prune(node, slug) {
  let oldOverlay = false;
  node.childNodes = (node.childNodes || []).filter(child => {
    if (child.nodeName === '#comment') {
      if (child.data.trim() === 'MEMENTO_OVERLAY_START') { oldOverlay = true; return false; }
      if (child.data.trim() === 'MEMENTO_OVERLAY_END') { oldOverlay = false; return false; }
    }
    if (oldOverlay || child.tagName === 'memento-nav' || attr(child,'data-memento-static-nav') !== undefined) return false;
    const tag = child.tagName;
    if (['memento-scene-shape','memento-scene-navigation'].includes(attr(child,'id'))) return false;
    if (tag === 'div' && attr(child,'id') === 'site-atmosphere') return false;
    // In the native LevelUp CTA the existing accessible card renders its title with the common surface engine.
    if (slug === 'levelup' && tag === 'iframe' && attr(child,'id') === 'start-frame' && attr(child,'data-src') === 'ready-to-start/embed.html') return false;
    if (slug === 'levelup' && tag === 'a' && attr(child,'id') === 'contact-link') {
      set(child,'data-vfx','card');
      set(child,'data-vfx-panel','');
    }
    if (tag === 'script') {
      const src = pathOf(attr(child, 'src'));
      if (src === '/memento-ui/viewport.js' || src === '/memento-ui/site.mjs' || attr(child,'data-memento-imports') !== undefined) return false;
      if (src === 'bootstrap.js' || src === 'tide-child-bridge.js' || src.startsWith('navigation/')) return false;
      if (!src && plain(child).includes('dataset.mementoInitialMode')) return false;
    }
    if (tag === 'style' && ['memento-first-paint','memento-native-font'].includes(attr(child,'id'))) return false;
    if (tag === 'link') {
      const href = pathOf(attr(child, 'href'));
      if (href === '/memento-ui/site.css') return false;
      if (attr(child,'rel') === 'canonical' || href.startsWith('navigation/') || href === 'vfx/memento-vfx.js') return false;
      if (attr(child,'as') === 'font' && href.endsWith('InterVariable.woff2')) set(child,'href','/assets/fonts/InterVariable.woff2');
    }
    if (tag === 'meta' && (attr(child,'property')?.startsWith('og:') || attr(child,'name') === 'twitter:card')) return false;
    if (child.childNodes) prune(child,slug);
    return true;
  });
  if (oldOverlay) throw new Error('Unclosed navigation markup');
}

// Adapt the published section before it reaches the browser. The independent project keeps its original index.
export function nativePage(source, slug) {
  const section = STATIONS.find(s => s.slug === slug);
  if (!section) throw new Error('Unknown Memento section: ' + slug);
  const doc = parse(source);
  const html = doc.childNodes.find(n => n.tagName === 'html');
  const head = html.childNodes.find(n => n.tagName === 'head');
  const body = html.childNodes.find(n => n.tagName === 'body');
  if (!head || !body) throw new Error('Section index has no head or body');
  prune(html,slug);
  set(html, 'data-memento-native', slug);
  set(html, 'data-memento-page', section.id);
  set(html, 'data-embedded', 'false');
  set(html, 'data-memento-surface', 'opaque');
  set(html, 'data-memento-navigation', 'standalone');
  const meta = routeMeta({ view:'page', id:section.id });
  const canonical = PUBLIC_ORIGIN + section.path + '/';
  const pageTitle = head.childNodes.find(n => n.tagName === 'title');
  if (pageTitle) pageTitle.childNodes[0].value = meta.title;
  const desc = head.childNodes.find(n => n.tagName === 'meta' && attr(n,'name') === 'description');
  if (desc) set(desc,'content',meta.description);
  const preloads = new Set();
  function deduplicate(parent) {
    parent.childNodes = (parent.childNodes || []).filter(n => {
      if (n.tagName === 'link' && attr(n,'rel') === 'preload') {
        const key = ['href','as','media','imagesrcset','imagesizes','crossorigin'].map(k=>attr(n,k)||'').join('|');
        if (preloads.has(key)) return false;
        preloads.add(key);
      }
      if (n.childNodes) deduplicate(n);
      return true;
    });
  }
  deduplicate(html);
  // Download the Studio module alongside its model. GPU setup follows the scene handoff.
  if (slug === 'studio') {
    for (const parent of [head,body]) {
      const index = parent.childNodes.findIndex(n => n.tagName === 'script' && attr(n,'type') === 'module' && /^app\.bundle\.js(?:[?#]|$)/.test(pathOf(attr(n,'src'))));
      if (index < 0) continue;
      const src = attr(parent.childNodes[index],'src');
      head.childNodes.push(...parseFragment(`<link rel="modulepreload" href="${escape(src)}">`).childNodes);
      const entry = `<script type="module">await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));await (window.mementoSceneSettled || document.activeViewTransition?.finished)?.catch(()=>{});import(${JSON.stringify(src).replaceAll('<','\\u003c')});</script>`;
      parent.childNodes.splice(index,1,...parseFragment(entry).childNodes);
      break;
    }
  }
  const spec = {imports:{[section.path+'/vfx/memento-vfx.js']:'/memento-ui/effects.mjs'}};
  const tags = [
    sceneHead,
    '<link rel="canonical" href="'+canonical+'">',
    '<meta property="og:type" content="website"><meta property="og:site_name" content="Memento Design Studio">',
    '<meta property="og:title" content="'+escape(meta.title)+'"><meta property="og:description" content="'+escape(meta.description)+'">',
    '<meta property="og:url" content="'+canonical+'"><meta property="og:image" content="'+escape(OG_IMAGE)+'"><meta name="twitter:card" content="summary_large_image">',
    '<script type="importmap" data-memento-imports>'+JSON.stringify(spec)+'</script>',
    '<link rel="stylesheet" href="/memento-ui/site.css">',
    '<script type="module" src="/memento-ui/site.mjs"></script>'
  ];
  if (!desc) tags.push('<meta name="description" content="'+escape(meta.description)+'">');
  // Import maps must precede all modules, including modulepreload.
  const firstResource = head.childNodes.findIndex(n => ['script','link','style'].includes(n.tagName));
  head.childNodes.splice(firstResource < 0 ? head.childNodes.length : firstResource, 0, ...parseFragment(tags.join('')).childNodes);
  head.childNodes.push(...parseFragment('<style id="memento-native-font">@font-face{font-family:Inter;src:url("/assets/fonts/InterVariable.woff2") format("woff2");font-weight:100 900;font-style:normal;font-display:swap}</style>').childNodes);
  body.childNodes.unshift(...parseFragment('<div id="site-atmosphere" aria-hidden="true"></div>').childNodes);
  body.childNodes.push(...parseFragment(nativeNav(section.id,'page')).childNodes);
  const staticLinks = ['<a href="/">Home</a>', ...STATIONS.map(s=>'<a href="'+s.path+'/">'+escape(s.label)+'</a>')];
  body.childNodes.push(...parseFragment('<noscript data-memento-static-nav><nav class="memento-static-nav" aria-label="Navigazione Memento">'+staticLinks.join(' ')+'</nav></noscript>').childNodes);
  return serialize(doc);
}

