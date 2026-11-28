import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { navigation, glyphField, glyphAtlas } from '../templates/navigation.mjs';
import { PAGES } from '../templates/home-config.mjs';
import { startPage } from '../templates/start.mjs';
import { catalogue } from '../public/services/src/content.js';
import { cover, dots, categories, grid, includes } from '../public/services/src/render.js';
import { benefitMarkup } from '../public/levelup/src/benefit-markup.js';
import { setManifest } from '../public/projects/media.js';
import { validateProjects } from '../public/projects/catalogue.js';
import { filtersMarkup, tileMarkup } from '../public/projects/catalogue-markup.js';

import { facetTexture } from '../templates/facet-texture.mjs';

const root=new URL('../',import.meta.url);
const read=file=>readFile(new URL(file,root),'utf8');
const readJSON=async file=>JSON.parse(await read(file));
async function output(file,html) {
  const target=new URL('public/'+file,root);
  await mkdir(new URL('./',target),{recursive:true});
  await writeFile(target,html.trim()+'\n');
}
const site=await readJSON('templates/site.json');
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const meta=(slug)=>site.sections.find(page=>page.slug===slug)||site.home;
const canonical=slug=>site.origin+(slug==='home'?'/':'/'+slug+'/');
const favicon='<link rel="icon" href="/favicon.svg?v=32" type="image/svg+xml">';
const documentInput='<script src="/js/document-input.js"></script>';
// Opening a page, the surfaces appear as one front of glyphs reaches them. Set to false to open them at once.
const INTRO=true;
const introOf=slug=>INTRO && ['home','services','projects','levelup','start'].includes(slug) ? ' data-mm-intro' : '';
function sharedHead(slug) {
  const url=canonical(slug),page=meta(slug);
  return `<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="Memento Design Studio">
  <meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${url}">
  <meta property="og:image" content="${escape(site.sharingImage)}"><meta name="twitter:card" content="summary_large_image">
  ${favicon}<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/fonts/InterVariable.woff2">
  ${documentInput}<link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/visuals.css"><script type="module" src="/js/site.mjs"></script>`;
}
function frame(slug,body,css,js,head='') {
  const page=meta(slug);
  return `<!doctype html><html lang="it" data-memento-native="${slug}"${introOf(slug)}><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#090909">
  <title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}">
  ${head}<link rel="stylesheet" href="${css}">${sharedHead(slug)}<script type="module" src="${js}"></script></head><body>${navigation(slug)}${body}</body></html>`;
}
function homeCard(page,i) {
  const base='/assets/scenes/'+page.slug, small=base+'-768.webp',srcset=small+' 768w, '+base+'-1536.webp 1536w';
  return `<a class="home-card mm-tab" href="/${page.slug}/" draggable="false" aria-label="Apri ${page.label}" data-page="${page.slug}" data-title-em="${page.titleEm}" style="--focal:${page.focal}%"${i?' hidden':''}>
  <img data-src="${small}" data-srcset="${srcset}" ${i?'':`src="${small}" srcset="${srcset}" sizes="(max-width:767px) 80vw, 60vw" fetchpriority="high"`} alt="${escape(page.alt)}" width="1536" height="1024" decoding="async" draggable="false">
  <span class="home-shade" aria-hidden="true"></span><h2 class="mm-type" aria-hidden="true">${[...page.title].map(c=>`<span>${c}</span>`).join('')}</h2></a>`;
}
function arrow(id,label,path) {
  return `<button type="button" class="home-arrow" id="${id}" aria-label="${label}" hidden><svg viewBox="0 0 60 32" aria-hidden="true"><path d="${path}"/></svg></button>`;
}
await output('navigation/glyph-field.svg',glyphField());
await output('navigation/glyph-atlas.svg',glyphAtlas());
await output('navigation/type-facets.svg',facetTexture());
await output('index.html',frame('home',`<main id="hub" aria-label="Esplora Memento" aria-roledescription="carosello" tabindex="-1"><h1 class="mm-sr">${escape(site.home.heading)}</h1>
<div id="home-viewport"><div id="scene">${PAGES.map(homeCard).join('\n')}</div></div>${arrow('previous','Sezione precedente','M2 30 30 2 58 30')}${arrow('next','Sezione successiva','M2 2 30 30 58 2')}
<p id="home-status" class="mm-sr" aria-live="polite" aria-atomic="true"></p></main>`,'/home.css','/js/home.mjs'));
// The Studio is built by Vite (studio-web/, npm run build:studio): its manifest names the hashed files.
const studio=await readJSON('public/studio/app/.vite/manifest.json');
const built=key=>'/studio/app/'+studio[key].file, entry=studio['src/studio.js'];
const studioHead=`<link rel="preload" as="fetch" href="${built('studio/model/studio-web.glb')}" crossorigin="anonymous" fetchpriority="high">`+
  ['src/scene/viewer.js',...studio['src/scene/viewer.js'].imports].map(key=>`<link rel="modulepreload" href="${built(key)}">`).join('');
const studioBody=(await read('templates/studio.html')).replace('<!--studio-noscript-->',
  `<noscript><img class="studio-poster" src="${built('studio/model/studio.webp')}" alt="Vista isometrica dello studio Memento."></noscript>`);
await output('studio/index.html',frame('studio',studioBody,'/studio/app/'+entry.css[0],built('src/studio.js'),studioHead));
await output('start/index.html',frame('start',startPage(await readJSON('templates/start.json')),'./styles.css','./start.js'));
const cta=(id,link,href)=>`<section class="mm-ready-section" id="${id}"><a class="mm-ready mm-tab" id="${link}" href="${href}" aria-label="Ready to start? — Raccontaci la tua idea"><img src="/ready-to-start/sparkle.webp" alt="" width="512" height="512" loading="lazy"><span class="mm-type">Ready to<br>start?</span></a></section>`;
function populate(html,id,content) {
  const slot = new RegExp('(<(?:div|nav)\\b[^>]*\\bid="'+id+'"[^>]*>)(\\s*</(?:div|nav)>)');
  if(!slot.test(html))throw Error('Missing slot '+id);
  return html.replace(slot,(_,open,close)=>open+content+close);
}
setManifest(await readJSON('public/projects/images.json'));
const projects=validateProjects(await readJSON('public/projects/projects.json'));
for(const slug of ['services','projects','levelup']) {
  let html=(await read('templates/'+slug+'.html')).replace('<!--global-head-->',sharedHead(slug)).replace('<!--navigation-->',navigation(slug))
    .replace(`data-memento-native="${slug}">`,`data-memento-native="${slug}"${introOf(slug)}>`);
  if(slug==='services'){
    for(const [id,body] of Object.entries({
      'bundle-boards':'<div class="carousel-stage">'+catalogue.bundles.map(cover).join('')+'</div>',
      'bundle-controls':dots(catalogue.bundles.map(item=>item.title)),
      'bundle-includes':includes(catalogue.bundles[0].covers),
      'category-sections':categories(), 'catalogue-groups':grid('digital').html
    }))html=populate(html,id,body);
  }
  if(slug==='projects'){
    html=populate(html,'filters',filtersMarkup());
    html=populate(html,'project-grid',projects.map((p,i)=>tileMarkup(p,i<4)).join(''));
    html=html.replace('id="project-grid"','id="project-grid" data-initial-catalogue').replace('<!--projects-cta-->',cta('projects-contact','projects-start','/start/'));
  }
  if(slug==='levelup'){
    html=html.replace('<div class="carousel-stage"></div>','<div class="carousel-stage">'+benefitMarkup()+'</div>')
      .replace('<!--levelup-cta-->',cta('contatto','contact-link','/start/?from=levelup'));
  }
  await output(slug+'/index.html',html);
}
function historicDestination(path) {
  const [section,type,id]=path.split('/');
  if(section==='projects')return '/projects/#slideshow/'+id;
  if(type==='richiesta')return '/services/#levelup';
  return '/services/#'+type+'/'+id;
}
const oldPaths=[
  ...catalogue.services.map(item=>'services/servizio/'+item.id),
  ...catalogue.bundles.map(item=>'services/bundle/'+item.id),
  'services/richiesta', ...projects.map(item=>'projects/progetto/'+item.id)
];
for(const path of oldPaths) {
  const dest=historicDestination(path);
  await output(path+'/index.html',`<!doctype html><html lang="it"><head><meta charset="utf-8"><title>Memento</title>${favicon}<link rel="canonical" href="${site.origin+dest}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${dest}">${documentInput}<script src="/js/redirect.js" data-destination="${dest}"></script></head><body><a href="${dest}">Apri la pagina</a></body></html>`);
}
await output('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['home',...PAGES.map(p=>p.slug)].map(s=>'<url><loc>'+canonical(s)+'</loc></url>').join('')+'</urlset>');
await output('robots.txt','User-agent: *\nAllow: /\nSitemap: '+site.origin+'/sitemap.xml');
// The 404: the number written by the wall of glyphs, and a card with the way back to every section.
const exits=[{slug:'',label:'Home'},...PAGES].map(page=>`<a href="/${page.slug?page.slug+'/':''}">${escape(page.label)}</a>`).join('');
await output('404.html',`<!doctype html><html lang="it" data-memento-native="404"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#090909"><meta name="robots" content="noindex"><title>Pagina non trovata — Memento</title>
  ${favicon}<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/fonts/InterVariable.woff2">${documentInput}<link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/visuals.css"><script type="module" src="/js/site.mjs"></script><script type="module" src="/js/missing.mjs"></script></head><body>${navigation('404')}
  <main class="mm-missing" id="main"><h1 class="mm-sr">Pagina non trovata (errore 404)</h1><canvas class="mm-missing-code" aria-hidden="true"></canvas>
  <section class="mm-missing-card mm-tab" aria-labelledby="missing-title"><h2 class="mm-type" id="missing-title">Questa pagina non esiste.</h2>
  <p>Forse si è spostata, o il link non è più valido. Riparti da qui:</p><nav class="mm-missing-links" aria-label="Sezioni del sito">${exits}</nav></section></main></body></html>`);
console.log(`Memento R32 · Home + 5 sezioni · ${catalogue.services.length} servizi, ${catalogue.bundles.length} bundle, ${projects.length} progetti.`);
