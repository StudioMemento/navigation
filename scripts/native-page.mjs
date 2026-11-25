import { nativeNav } from '../public/navigation/markup.mjs';
import { sceneHead, lettersLayer } from './scene-head.mjs';
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

/**
 * R17: Ready to start, the card that closes Servizi (#finale), also at the end of Portfolio (in place of the footer
 * link) and LevelUp (in place of the visualfx.vercel.app frame). LevelUp keeps id="contact-link": its app writes the
 * destination with the experience chosen above. Styles: /memento-ui/ready-to-start.css.
 */
export function readyCard({ id = 'ready-link', href = '/start/' } = {}) {
  return '<a class="mm-ready-card" id="' + id + '" href="' + escape(href) + '" data-vfx="card" data-vfx-photo=".mm-ready-sparkle" aria-label="Ready to start? Raccontaci la tua idea">' +
    '<span class="mm-ready-art" aria-hidden="true"><img class="mm-ready-sparkle" src="/memento-ui/ready-to-start/sparkle.webp" alt="" width="1254" height="1254" loading="lazy" decoding="async"></span>' +
    '<span class="mm-ready-title" aria-hidden="true"><span>Ready to</span> <span>start<span class="mm-ready-question">?</span></span></span>' +
    '<svg class="mm-ready-chevron" viewBox="0 0 48 80" fill="none" aria-hidden="true"><path d="m12 14 26 26-26 26" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter"/></svg></a>';
}
const READY = {
  projects: { match: n => n.tagName === 'footer' && attr(n,'class') === 'footer',
    html: () => '<section class="mm-ready" aria-label="Ready to start?">' + readyCard() + '</section>' },
  levelup: { match: n => n.tagName === 'section' && attr(n,'id') === 'contatto',
    html: () => '<section class="mm-ready" id="contatto" aria-labelledby="start-title"><h2 class="sr-only" id="start-title">Ready to start?</h2>' +
      readyCard({ id: 'contact-link', href: '/start/?from=levelup' }) + '</section>' },
};
/** Replaces the first node matching `match` with the markup; returns whether it found one. */
function replace(node, match, markup) {
  const list = node.childNodes || [];
  for (let i = 0; i < list.length; i++) {
    if (match(list[i])) {
      const next = parseFragment(markup).childNodes;
      for (const n of next) n.parentNode = node;
      list.splice(i, 1, ...next);
      return true;
    }
    if (replace(list[i], match, markup)) return true;
  }
  return false;
}

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
    if (tag === 'script') {
      const src = pathOf(attr(child, 'src'));
      if (src === '/memento-ui/viewport.js' || src === '/memento-ui/site.mjs' || attr(child,'data-memento-imports') !== undefined) return false;
      if (src === 'bootstrap.js' || src === 'tide-child-bridge.js' || src.startsWith('navigation/')) return false;
      if (!src && plain(child).includes('dataset.mementoInitialMode')) return false;
    }
    if (tag === 'style' && ['memento-first-paint','memento-native-font'].includes(attr(child,'id'))) return false;
    if (tag === 'link') {
      if (attr(child,'data-mm-atlas') !== undefined) return false;
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
// R17: the sections that draw the effects. `preload`: their code (the effects entry and its chunks), requested with the
// document by scene-head when the visit will get them; the Start app ships its own renderer.
const EFFECTS = new Set(['services', 'projects', 'levelup', 'start']);
export function nativePage(source, slug, release, { preload = [] } = {}) {
  const section = STATIONS.find(s => s.slug === slug);
  if (!section) throw new Error('Unknown Memento section: ' + slug);
  const doc = parse(source);
  const html = doc.childNodes.find(n => n.tagName === 'html');
  const head = html.childNodes.find(n => n.tagName === 'head');
  const body = html.childNodes.find(n => n.tagName === 'body');
  if (!head || !body) throw new Error('Section index has no head or body');
  prune(html,slug);
  // R17: the Ready to start card (no iframe: the frame of visualfx.vercel.app is gone)
  const ready = READY[slug];
  if (ready && !replace(body, ready.match, ready.html())) console.warn('Ready to start: no place for the card in ' + slug);
  set(html, 'data-memento-native', slug);
  if(release)set(html, 'data-memento-release', release);
  set(html, 'data-memento-page', section.id);
  set(html, 'data-embedded', 'false');
  set(html, 'data-memento-surface', 'opaque');
  set(html, 'data-memento-navigation', 'standalone');
  if (EFFECTS.has(slug)) {
    set(html, 'data-mm-effects', '');
    if (slug !== 'start' && preload.length) set(html, 'data-mm-preload', preload.join(' '));
  }
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
  // Keep the original module entry. Downloads and controls can start during the handoff.
  // R19: the pages import the shared effects directly (/memento-ui/effects.mjs): no import map any more.
  const tags = [
    sceneHead,
    '<link rel="canonical" href="'+canonical+'">',
    '<meta property="og:type" content="website"><meta property="og:site_name" content="Memento Design Studio">',
    '<meta property="og:title" content="'+escape(meta.title)+'"><meta property="og:description" content="'+escape(meta.description)+'">',
    '<meta property="og:url" content="'+canonical+'"><meta property="og:image" content="'+escape(OG_IMAGE)+'"><meta name="twitter:card" content="summary_large_image">',
    '<link rel="stylesheet" href="/memento-ui/site.css">',
    ...(ready ? ['<link rel="stylesheet" href="/memento-ui/ready-to-start.css">'] : []),
    '<script type="module" src="/memento-ui/site.mjs"></script>'
  ];
  if (!desc) tags.push('<meta name="description" content="'+escape(meta.description)+'">');
  // R24: every page names its icon (Studio did not: the browser asked for /favicon.ico, 404)
  // (Servizi and Portfolio named an empty one: the site's own icon now, as on the Home)
  const icon = n => n.tagName === 'link' && /(^|\s)icon(\s|$)/.test(attr(n,'rel') || '');
  for (const n of head.childNodes.filter(icon)) if (attr(n,'href') === 'data:,') set(n,'href','/favicon.svg');
  if (!head.childNodes.some(icon)) tags.push('<link rel="icon" href="/favicon.svg">');
  // The site's tags go before the page's own scripts and styles.
  const firstResource = head.childNodes.findIndex(n => ['script','link','style'].includes(n.tagName));
  head.childNodes.splice(firstResource < 0 ? head.childNodes.length : firstResource, 0, ...parseFragment(tags.join('')).childNodes);
  head.childNodes.push(...parseFragment('<style id="memento-native-font">@font-face{font-family:Inter;src:url("/assets/fonts/InterVariable.woff2") format("woff2");font-weight:100 900;font-style:normal;font-display:swap}</style>').childNodes);
  // R20: the background of letters, first in the body (under everything, z-index -1; letters.mjs draws it).
  // Not in Studio: it is a page of its own, to be designed on its own terms.
  if (slug !== 'studio') body.childNodes.unshift(...parseFragment(lettersLayer).childNodes);
  body.childNodes.push(...parseFragment(nativeNav(section.id,'page')).childNodes);
  const staticLinks = ['<a href="/">Home</a>', ...STATIONS.map(s=>'<a href="'+s.path+'/">'+escape(s.label)+'</a>')];
  body.childNodes.push(...parseFragment('<noscript data-memento-static-nav><nav class="memento-static-nav" aria-label="Navigazione Memento">'+staticLinks.join(' ')+'</nav></noscript>').childNodes);
  return serialize(doc);
}

