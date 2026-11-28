import { catalogue } from './content.js';
import { detail as renderDetail } from './render.js';

export function createDialogs(bundleCarousel) {
  const $ = selector => document.querySelector(selector);
  const shell = $('#catalogue-shell'), detail = $('#service-detail'), lead = $('#lead-dialog');
  const root = document.documentElement, skip = $('.skip-link'), pageTitle = document.title;
  const byId = new Map([...catalogue.services,...catalogue.bundles].map(item=>[item.id,item]));
  const aliases = {stampa:'design',grafica:'design',fotografia:'visual',rd:'design'};
  const categories = new Set(catalogue.categories.map(section=>section.id));
  let renderedHash = null, currentDetail = null, leadContext = '', draft = '';
  let leadScroll = 0;
  const state = () => history.state?.mementoServices || {};
  const hashOf = item => '#'+(item.kind==='bundle' ? 'bundle/' : 'servizio/')+item.id;
  const save = data => history.replaceState({...history.state,mementoServices:data},'');
  const goY = y => window.scrollTo({top:y,behavior:'instant'});

  // Save in the current history entry, so opening an item twice keeps two independent return positions.
  function remember() {
    if (renderedHash!==location.hash || lead.open) return;
    const el = document.activeElement, previous=state();
    const selector = el?.id ? '#'+CSS.escape(el.id) :
      ['service','item','component','medium','dot'].reduce((found,name)=>{
        if (found || el?.dataset?.[name]===undefined) return found;
        const container = name==='dot' ? el.closest('[id]') : null;
        return (container ? '#'+CSS.escape(container.id)+' ' : '')+'[data-'+name+'="'+CSS.escape(el.dataset[name])+'"]';
      },null);
    save({...previous,y:scrollY,focus:selector});
  }
  function enter(hash, meta={}) {
    if (location.hash===hash) return;
    remember();
    const back=location.hash || '#inizio';
    history.pushState({mementoServices:{...meta,back,internal:true}},'',hash);
    route();
  }
  function back() {
    if (state().internal) {history.back();return;}
    const dest=state().back || '#catalogo';
    history.replaceState(null,'',dest);
    route();
  }
  function restorePosition(fallback) {
    const entry=state();
    if (Number.isFinite(entry.y)) goY(entry.y);
    else fallback();
    if (entry.focus) {
      try { document.querySelector(entry.focus)?.focus({preventScroll:true}); } catch { /* stale restored entry */ }
    }
  }
  function showDetail(item) {
    const parent=byId.get(state().parent);
    currentDetail=item;
    shell.hidden=true;
    detail.innerHTML=renderDetail(item,parent,state().back || '#catalogo');
    detail.hidden=false;
    skip.href='#detail-title'; skip.textContent='Vai al dettaglio del servizio';
    document.title=item.title+' — Memento Design Studio';
    $('#detail-title').focus({preventScroll:true});
    restorePosition(()=>goY(0));
  }
  function showCatalogue(prefix) {
    const leaving=!!currentDetail;
    currentDetail=null;
    detail.hidden=true;
    if (detail.firstChild) detail.replaceChildren();
    shell.hidden=false;
    skip.href='#catalogo'; skip.textContent='Vai al catalogo completo';
    document.title=pageTitle;
    restorePosition(()=>{
      const bundle=catalogue.bundles.findIndex(item=>prefix==='percorso-'+item.id);
      if (bundle>=0) {
        bundleCarousel.select(bundle);bundleCarousel.finish();
        $('#bundles').scrollIntoView({behavior:'instant'});return;
      }
      const anchor=document.getElementById(aliases[prefix] || prefix);
      if (anchor) anchor.scrollIntoView({behavior:'instant'});
      else if (leaving) goY(0);
    });
  }
  function fitLead() {
    if (!lead.open) return;
    const v=window.visualViewport;
    if (v && Math.abs(v.scale-1)>.01) return;
    const use=v && window===window.top;
    lead.style.setProperty('--dialog-height',Math.round(use?v.height:innerHeight)+'px');
    lead.style.setProperty('--dialog-top',Math.round(use?v.offsetTop:0)+'px');
  }
  function showLead() {
    leadContext=state().context || '';
    $('#lead-context').hidden=!leadContext;
    $('#lead-context').textContent=leadContext?'Ti interessa: '+leadContext:'';
    $('#lead-form').hidden=false;$('#lead-result').hidden=true;
    leadScroll=scrollY;
    if (!shell.hidden) {
      shell.style.height=shell.getBoundingClientRect().height+'px';
      root.style.setProperty('--catalogue-scroll-y',-leadScroll+'px');
    }
    root.dataset.overlayOpen='true';
    lead.showModal();fitLead();lead.scrollTop=0;$('#lead-goal').focus({preventScroll:true});
    document.dispatchEvent(new Event('memento:overlay-change'));
  }
  function hideLead() {
    if (!lead.open) return;
    lead.close(); delete root.dataset.overlayOpen;
    root.style.removeProperty('--catalogue-scroll-y');shell.style.removeProperty('height');
    lead.style.removeProperty('--dialog-height');lead.style.removeProperty('--dialog-top');
    goY(leadScroll);
    document.dispatchEvent(new Event('memento:overlay-change'));
  }
  function route() {
    if (renderedHash===location.hash) return;
    const [prefix,id]=location.hash.slice(1).split('/');
    const item=byId.get(id);
    if (item && (prefix==='servizio'||prefix==='bundle'||categories.has(prefix)||aliases[prefix])) {
      const canonical=hashOf(item);
      if (location.hash!==canonical) history.replaceState(history.state,'',canonical);
      renderedHash=canonical;hideLead();showDetail(item);
    } else {
      renderedHash=location.hash;
      if(prefix==='levelup'||id==='levelup') {
        if(!lead.open) showLead();
      } else {
        hideLead();showCatalogue(prefix);
      }
    }
    document.dispatchEvent(new Event('memento:view-change'));
  }
  function open(item) { if(item) enter(hashOf(item)); }
  history.scrollRestoration='manual';
  window.addEventListener('popstate',route);
  window.addEventListener('hashchange',route);
  window.addEventListener('pagehide',remember);
  document.addEventListener('scrollend',event=>{if(event.target===document)remember();});
  window.visualViewport?.addEventListener('resize',fitLead,{passive:true});
  window.visualViewport?.addEventListener('scroll',fitLead,{passive:true});
  window.addEventListener('resize',fitLead,{passive:true});
  document.addEventListener('click',event=>{
    if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    if(!detail.hidden && event.target.closest('.skip-link')) {
      event.preventDefault();goY(0);$('#detail-title').focus({preventScroll:true});return;
    }
    const el=event.target.closest('[data-detail-back],[data-component],[data-service],[data-bundle],[data-related],[data-action]');
    if(!el) return;
    if(el.hasAttribute('data-detail-back')||el.dataset.action==='close-lead') {event.preventDefault();back();return;}
    const item=byId.get(el.dataset.component || el.dataset.service || el.dataset.bundle || el.dataset.related);
    if(item) {event.preventDefault();enter(hashOf(item),el.dataset.component ? {parent:currentDetail?.id} : {});return;}
    if(['levelup','project'].includes(el.dataset.action)) {
      event.preventDefault();enter('#levelup',{context:el.dataset.action==='project' ? currentDetail?.title : ''});
    }
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && currentDetail && !lead.open && !event.defaultPrevented) {event.preventDefault();back();}
  });
  lead.addEventListener('cancel',event=>{event.preventDefault();back();});
  lead.addEventListener('click',event=>{
    if(event.target!==lead)return;
    const b=lead.getBoundingClientRect();
    if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)back();
  });
  $('#lead-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form),
      name = String(values.get('name')).trim(),
      email = String(values.get('email')).trim();
    draft = `Ciao Memento,\n\nsono ${name}.\n\nIl mio obiettivo: ${values.get('goal')}.\n${leadContext ? `Mi interessa: ${leadContext}.\n` : ''}${String(values.get('note')).trim() ? `\n${String(values.get('note')).trim()}\n` : ''}\nPotete rispondermi a ${email}.\n\nGrazie!\n${name}`;
    $('#email-link').href =
      `mailto:${catalogue.config.email}?subject=${encodeURIComponent('LevelUp — ' + (leadContext || values.get('goal')))}&body=${encodeURIComponent(draft)}`;
    $('#request-preview').textContent = draft;
    $('#lead-form').hidden = true;
    $('#lead-result').hidden = false;
    $('#copy-request').textContent = 'Copia richiesta';
    $('#email-link').focus({ preventScroll: true });
  });
  $('#edit-request').addEventListener('click', () => {
    $('#lead-form').hidden = false;
    $('#lead-result').hidden = true;
    $('#lead-goal').focus();
  });
  $('#copy-request').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(draft);
      $('#copy-request').textContent = 'Richiesta copiata';
    } catch {
      let written=false;
      const supply=event=>{
        if (!event.clipboardData) return;
        event.clipboardData.setData('text/plain',draft);
        event.preventDefault();written=true;
      };
      document.addEventListener('copy',supply,true);
      try {document.execCommand('copy');} catch {} finally {document.removeEventListener('copy',supply,true);}
      $('#copy-request').textContent=written?'Richiesta copiata':'Apri la richiesta con il pulsante email';

    }
  });
  return {open,route};
}
