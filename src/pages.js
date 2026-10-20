import {DESTINATIONS} from './destinations.js';

const arrowUp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg>';
const external='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';

export function createPages({onHome,onNavigate,onMenu,onVisibility}){
 const layer=document.createElement('section');
 layer.id='page-layer';layer.className='page-layer';layer.hidden=true;layer.inert=true;
 layer.setAttribute('aria-label','Pagina Memento');
 layer.innerHTML=`<header class="page-header">
  <button class="back-home" aria-label="Torna alla home 3D">${arrowUp}<span>Home</span></button>
  <span class="page-title" aria-live="polite"></span>
  <div class="page-tools"><a class="external-page" target="_blank" rel="noopener noreferrer" aria-label="Apri la pagina in una nuova scheda" hidden>${external}</a><button class="page-menu">Indice</button></div>
 </header><div class="page-content"></div>`;
 document.querySelector('#app').append(layer);
 const title=layer.querySelector('.page-title'),content=layer.querySelector('.page-content'),externalLink=layer.querySelector('.external-page'),back=layer.querySelector('.back-home');
 let opened=false,selected=-1,transitionId=0,loadingTimer;
 layer.querySelector('.back-home').addEventListener('click',onHome);
 layer.querySelector('.page-menu').addEventListener('click',onMenu);

 function clearContent(){clearTimeout(loadingTimer);content.replaceChildren();}
 function embed(page){
  const loading=document.createElement('div');loading.className='embed-loading';loading.setAttribute('role','status');
  loading.innerHTML=`<span class="loading-line"></span><p>Caricamento ${page.name}…</p>`;
  const recovery=document.createElement('div');recovery.className='embed-recovery';recovery.hidden=true;
  const message=document.createElement('p');message.textContent='Il caricamento sta richiedendo più tempo.';
  const retry=document.createElement('button');retry.className='text-action';retry.textContent='Riprova';
  const direct=document.createElement('a');direct.className='text-action';direct.href=page.url;direct.target='_blank';direct.rel='noopener noreferrer';direct.textContent='Apri in una nuova scheda';
  recovery.append(message,retry,direct);loading.append(recovery);
  const frame=document.createElement('iframe');frame.className='embedded-page';frame.title=`${page.name} — Memento`;
  frame.setAttribute('allow','fullscreen; autoplay; picture-in-picture');frame.allowFullscreen=true;
  frame.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
  frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-presentation');
  // The live pages remain independent. Only the current page is mounted.
  const load=()=>{loading.hidden=false;recovery.hidden=true;frame.classList.remove('is-loaded');clearTimeout(loadingTimer);loadingTimer=setTimeout(()=>{recovery.hidden=false;},14000);frame.src=page.url;};
  frame.addEventListener('load',()=>{if(!frame.isConnected)return;clearTimeout(loadingTimer);loading.hidden=true;frame.classList.add('is-loaded');});
  frame.addEventListener('error',()=>{clearTimeout(loadingTimer);recovery.hidden=false;});
  retry.addEventListener('click',load);content.append(loading,frame);load();
 }

 function draft(page){
  const article=document.createElement('article');article.className='draft-page';
  const top=document.createElement('div');top.className='draft-top';
  const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=page.eyebrow;
  const badge=document.createElement('span');badge.className='draft-badge';badge.textContent='In sviluppo';top.append(eyebrow,badge);
  const heading=document.createElement('h1');heading.textContent=page.headline;
  const intro=document.createElement('p');intro.className='draft-intro';intro.textContent=page.intro;
  const footer=document.createElement('div');footer.className='draft-footer';
  const notice=document.createElement('p');notice.className='draft-notice';notice.textContent=page.notice;
  const links=document.createElement('nav');links.className='draft-links';links.setAttribute('aria-label','Continua a esplorare');
  for(const [slug,text] of page.links){const button=document.createElement('button');button.className='text-action';button.textContent=text;button.addEventListener('click',()=>onNavigate(slug));links.append(button);}
  footer.append(notice,links);article.append(top,heading,intro,footer);content.append(article);
 }

 function open(index,{focus=true}={}){
  const page=DESTINATIONS[index];if(!page||page.kind==='home')return;
  const openingId=++transitionId;
  if(!opened||selected!==index){
   clearContent();title.textContent=page.name;layer.setAttribute('aria-label',`Pagina ${page.name}`);
   externalLink.hidden=page.kind!=='embed';if(page.url)externalLink.href=page.url;else externalLink.removeAttribute('href');
   page.kind==='embed'?embed(page):draft(page);content.scrollTop=0;
  }
  selected=index;opened=true;layer.hidden=false;layer.inert=true;
  document.body.dataset.page=page.slug;document.body.classList.remove('home-returning');document.body.classList.add('page-open');
  document.querySelector('#home-layer').inert=true;document.querySelector('#home-layer').setAttribute('aria-hidden','true');
  requestAnimationFrame(()=>{
   if(!opened||openingId!==transitionId)return;
   layer.classList.add('is-open');
   requestAnimationFrame(()=>{
    const animations=[...layer.getAnimations(),...document.querySelector('#home-layer').getAnimations()];
    const finish=()=>{if(opened&&openingId===transitionId){layer.inert=false;if(focus)back.focus({preventScroll:true});}};
    if(animations.length)Promise.allSettled(animations.map(animation=>animation.finished)).then(finish);else finish();
   });
  });
  onVisibility(true);
 }

 function close({focus=true}={}){
  if(!opened)return;
  const closingId=++transitionId;
  opened=false;layer.inert=true;layer.classList.remove('is-open');
  document.body.classList.remove('page-open');document.body.classList.add('home-returning');delete document.body.dataset.page;
  onVisibility(false);
  // Keep the moving layer inert so a fast second tap cannot hit a different control.
  const finish=()=>{if(!opened&&closingId===transitionId){
   layer.hidden=true;clearContent();selected=-1;document.body.classList.remove('home-returning');
   document.querySelector('#home-layer').inert=false;document.querySelector('#home-layer').removeAttribute('aria-hidden');
   if(focus)document.querySelector('.section-name').focus({preventScroll:true});
  }};
  // Wait for the actual animations, including on slow devices. A fixed timeout
  // can re-enable controls while the compositor is still moving the layer.
  requestAnimationFrame(()=>{
   const animations=[...layer.getAnimations(),...document.querySelector('#home-layer').getAnimations()];
   if(animations.length)Promise.allSettled(animations.map(animation=>animation.finished)).then(finish);
   else finish();
  });
 }

 return {open,close,get isOpen(){return opened;}};
}
