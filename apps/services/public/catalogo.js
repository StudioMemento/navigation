/* Memento V13: balanced type, continuous image blending and shared bundle players. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
  const icon = (name = 'caret-right', className = 'chevron') => `<img class="${className}" src="assets/icons/${name}.svg" alt="" aria-hidden="true">`;
  const carouselByScene = new Map();
  let pacing;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const services = [...MEMENTO_SERVICES, MEMENTO_APP_SERVICE];
  const byId = new Map([...services, ...MEMENTO_BUNDLES].map(item => [item.id, item]));
  const sections = MEMENTO_SECTIONS;
  const titleUnits = {'WEB': 2.02, '3D': 1.2, 'VIDEO': 2.63, 'VISUAL': 3.02, 'BRANDING': 4.58, 'GRAFICA': 3.78};
  const orderedServices = sections.flatMap(section => (section.catalogueIds || section.ids).map(id => byId.get(id)));
  const bundles = ['b-online', 'b-lancio', 'b-identita', 'b-apertura', 'b-campagna', 'b-social'].map(id => byId.get(id));
  const titles = {'ecommerce': 'E-commerce', 'menu-digitale': 'Menù interattivo', 'foto-emozionali': 'Fotografia pubblicitaria'};
  const title = item => titles[item.id] || item.title;
  const medium = item => item.group === 'print' && item.id !== 'presentazione' ? 'physical' : 'digital';
  const sectionFor = item => sections.find(section => (section.catalogueIds || section.ids).includes(item.id));
  const imageFor = item => `assets/${item.image}.webp`;
  const heroImages = {'sito': 'hero-web', 'foto-prodotti': 'hero-fotografia', 'modello-3d': 'hero-3d', 'branding': 'hero-branding'};
  const heroFor = item => `assets/${heroImages[item.id] || item.image}.webp`;
  const number = value => String(value).padStart(2, '0');
  const detail = $('#detail-dialog'), lead = $('#lead-dialog');
  const editable = target => target.closest('input, textarea, select, [contenteditable="true"], #request-preview');
  document.addEventListener('contextmenu', event => { if (!editable(event.target)) event.preventDefault(); });
  document.addEventListener('selectstart', event => { if (!editable(event.target)) event.preventDefault(); });
  let currentDetail = null, parentBundle = null, currentBoard = 0;
  let returnHash = '#inizio', focusReturn = null, leadContext = '', draft = '', activeMedium = 'digital';

  function stats(item) {
    const editorial = item.kind === 'bundle' ? MEMENTO_BUNDLE_EDITORIAL[item.id] : null;
    const time = editorial ? editorial.time : MEMENTO_PLANNING[item.id][0];
    return `<div class="planning"><div><span class="eyebrow">Tempistiche indicative</span><strong>${esc(time)}</strong></div><p class="estimate-note">${MEMENTO_ESTIMATE_NOTE}${medium(item) === 'physical' ? ' Produzione, spedizione e posa si concordano con il fornitore.' : ''}</p></div>`;
  }
  function slideCard(item, index, bundle = null) {
    const heading = MEMENTO_SHOWCASE_TITLES[item.id] || title(item);
    const lines = MEMENTO_SLIDE_COPY[item.id] || [MEMENTO_PLANNING[item.id][3], item.description];
    return `<a href="#servizio/${item.id}" draggable="false" class="carousel-card showcase-card${bundle ? ' bundle-mini-card' : ''}" data-slide="${index}" data-item="${item.id}" aria-label="Scopri ${esc(heading)}" tabindex="${index === 0 ? 0 : -1}"><img class="slide-visual" src="${imageFor(item)}" alt="" draggable="false" loading="lazy" width="1120" height="1120"><span class="slide-scrim" aria-hidden="true"></span><span class="slide-description">${lines.map(line => `<span>${esc(line)}</span>`).join('')}</span><span class="slide-title">${esc(heading)}</span><span class="slide-action" aria-hidden="true">${icon()}</span></a>`;
  }
  function mountCarousel(element, controls, items, {hero = false, bundle = null} = {}) {
    // Repeated visual cycles keep both neighbours visible even in two-service bundles.
    const slides = bundle && items.length < 4 ? Array.from({length: Math.ceil(6 / items.length)}, () => items).flat() : items;
    element.innerHTML = `<div class="carousel-stage">${slides.map((item, index) => hero ? `<a href="#${item.id}" draggable="false" class="carousel-card hero-card" style="--hero-units:${titleUnits[item.label]}" data-slide="${index}" aria-label="Esplora ${item.label}" tabindex="${index === 0 ? 0 : -1}"><img class="hero-visual" src="assets/${item.hero}.webp" alt="" draggable="false" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} width="1536" height="1024"><span class="hero-shade"></span><span class="hero-copy page-width"><span class="hero-title">${item.label}</span><span class="hero-action" aria-hidden="true">${icon()}</span></span></a>` : slideCard(item, index, bundle)).join('')}</div>`;
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', hero ? 'Scegli un’area' : element.getAttribute('aria-label'));
    controls.innerHTML = `<div class="carousel-dots">${items.map((item, index) => `<button class="carousel-dot" data-dot="${index}" aria-label="${esc(hero ? item.label : MEMENTO_SHOWCASE_TITLES[item.id] || title(item))}" aria-pressed="${index === 0}"><span></span></button>`).join('')}</div>`;
    const update = (index, {announce = true} = {}) => {
      index %= items.length;
      controls.querySelectorAll('[data-dot]').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      if (announce) $('#catalog-status').textContent = hero ? items[index].label : title(items[index]);
    };
    const carousel = new MementoCarousel(element, {externalGestures: true, onSettle: update, onOpen: index => {
      index %= items.length;
      if (hero) { pacing.goTo(document.getElementById(items[index].id)); history.replaceState(null, '', '#' + items[index].id); }
      else openDetail(items[index], {fromBundle: bundle});
    }});
    carouselByScene.set(element.closest('[data-scene]'), carousel);
    controls.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') { carousel.hovered = true; carousel.refreshAutoplay(); }
    });
    controls.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') { carousel.hovered = false; carousel.refreshAutoplay(); }
    });
    controls.addEventListener('pointerdown', () => { carousel.keyboardFocus = false; carousel.interact(); });
    controls.addEventListener('focusout', event => {
      if (!controls.contains(event.relatedTarget) && !element.contains(event.relatedTarget)) { carousel.keyboardFocus = false; carousel.refreshAutoplay(); }
    });
    const selectDot = index => {
      const count = items.length;
      const delta = ((index - carousel.current + count / 2) % count + count) % count - count / 2;
      carousel.select(carousel.current + delta);
    };
    controls.querySelectorAll('[data-dot]').forEach(button => button.addEventListener('click', () => selectDot(Number(button.dataset.dot))));
    controls.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      carousel.keyboardFocus = true;
      const current = Number(event.target.closest('[data-dot]')?.dataset.dot || 0);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length;
      controls.querySelector(`[data-dot="${next}"]`).focus({preventScroll: true});
      selectDot(next);
    });
  }
  mountCarousel($('#hero-carousel'), $('#hero-controls'), sections, {hero: true});
  $('#category-sections').innerHTML = sections.map(section => `<section id="${section.id}" class="category-section" data-scene style="--title-units:${titleUnits[section.label]}" aria-labelledby="heading-${section.id}"><div class="category-heading"><h2 id="heading-${section.id}">${section.label}</h2></div><div class="carousel service-carousel" id="carousel-${section.id}" role="region" aria-roledescription="carosello" aria-label="Servizi ${section.label}"></div><div class="carousel-controls" id="controls-${section.id}"></div></section>`).join('');
  sections.forEach(section => mountCarousel($(`#carousel-${section.id}`), $(`#controls-${section.id}`), section.ids.map(id => byId.get(id))));
  $('#bundle-boards').innerHTML = bundles.map(item => `<article id="percorso-${item.id}" class="bundle-board" data-scene aria-labelledby="name-${item.id}"><img class="bundle-visual" src="${imageFor(item)}" alt="" loading="lazy" width="1120" height="1120"><div class="bundle-shade"></div><div class="bundle-layout"><div class="bundle-copy"><h3 id="title-${item.id}">${esc(MEMENTO_BUNDLE_EDITORIAL[item.id].headline).replace(/\n/g, '<br>')}</h3><p>${esc(MEMENTO_BUNDLE_EDITORIAL[item.id].output)}</p></div><a href="#bundle/${item.id}" class="bundle-open" data-bundle="${item.id}" aria-label="Esplora il bundle ${esc(item.title)}">${icon()}</a><div class="bundle-included"><h4 class="bundle-name" id="name-${item.id}">${esc(item.title)}</h4><div class="carousel bundle-mini" id="mini-${item.id}" role="region" aria-roledescription="carosello" aria-label="Servizi inclusi in ${esc(item.title)}"></div><div class="carousel-controls" id="controls-${item.id}"></div></div></div></article>`).join('');
  bundles.forEach(item => mountCarousel($(`#mini-${item.id}`), $(`#controls-${item.id}`), item.covers.map(id => byId.get(id)), {bundle: item}));
  pacing = new MementoPacing($('#memento-catalogo'), carouselByScene);


  function renderCatalogue() {
    const query = $('#service-search').value.trim().toLocaleLowerCase('it');
    const matching = orderedServices.filter(item => medium(item) === activeMedium && `${title(item)} ${sectionFor(item).label} ${item.description}`.toLocaleLowerCase('it').includes(query));
    const groups = [{id: 'digital', label: 'Digitale'}, {id: 'physical', label: 'Fisico'}];
    $('#catalogue-groups').innerHTML = groups.map(group => {
      const items = matching.filter(item => medium(item) === group.id);
      if (!items.length) return '';
      return `<section class="catalogue-group" data-group="${group.id}" aria-labelledby="group-${group.id}"><h3 id="group-${group.id}" class="sr-only">${group.label}</h3><div class="service-grid">${items.map(item => `<a href="#servizio/${item.id}" class="service-card" data-service="${item.id}" aria-label="Scopri ${esc(title(item))}"><img class="service-visual" src="${imageFor(item)}" alt="" loading="lazy" width="1120" height="1120"><span class="grid-category">${sectionFor(item).label}</span><span class="service-copy"><span class="service-title">${esc(title(item))}</span>${icon()}</span></a>`).join('')}</div></section>`;
    }).join('');

    $('.catalogue-filters').dataset.selected = activeMedium;
    $('#empty-results').hidden = matching.length > 0;
    $$('.catalogue-filters button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.medium === activeMedium)));
    $('#catalog-status').textContent = `${matching.length} servizi nel catalogo`;
  }
  renderCatalogue();
  $('#home-link').href = MEMENTO_CONFIG.homeUrl;
  $('#service-search').addEventListener('input', renderCatalogue);
  $$('.catalogue-filters button').forEach(button => button.addEventListener('click', () => { activeMedium = button.dataset.medium; renderCatalogue(); }));
  function lockBody() {
    document.body.style.overflow = detail.open || lead.open ? 'hidden' : '';
    document.dispatchEvent(new Event('memento:overlay-change'));
  }
  function setHash(hash) { history.replaceState(null, '', hash); }
  function restoreFocus() { if (focusReturn?.isConnected) focusReturn.focus({preventScroll: true}); }
  function rememberOrigin() {
    if (!detail.open && !lead.open) {
      focusReturn = document.activeElement;
      const [prefix, id] = location.hash.slice(1).split('/');
      const legacySection = {stampa: 'grafica', fotografia: 'visual', rd: 'grafica'}[prefix] || prefix;
      returnHash = /^#(servizio|bundle|levelup)(\/|$)/.test(location.hash) ? '#inizio' : byId.has(id) || id === 'levelup' ? '#' + legacySection : location.hash || '#inizio';
    }
  }
  function serviceSheet(item) {
    const data = item.details, section = sectionFor(item);
    const siblings = section.catalogueIds || section.ids;
    const next = byId.get(siblings[(siblings.indexOf(item.id) + 1) % siblings.length]);
    const isPhysical = medium(item) === 'physical';
    return `<article class="product-sheet"><div class="detail-topline">${parentBundle ? `<a href="#bundle/${parentBundle.id}" class="back-link" data-back-bundle="${parentBundle.id}">${icon('caret-left')} ${esc(parentBundle.title)}</a>` : `<span class="eyebrow">Scheda servizio / ${section.label}</span>`}</div><div class="detail-hero"><img class="detail-image" src="${heroFor(item)}" alt="${esc(item.alt || title(item) + ' — visual illustrativo Memento')}" width="1120" height="1120"><div class="detail-intro"><span class="eyebrow">${isPhysical ? 'Fisico' : 'Digitale'}</span><h2 class="detail-title" id="detail-title" tabindex="-1">${esc(title(item))}</h2><p class="detail-description">${esc(item.description)}</p><button class="primary-link" data-action="project">Parliamo del tuo progetto ${icon()}</button></div></div><div class="detail-body"><div class="outcome-heading"><span class="eyebrow">Il valore per te</span><h3>${esc(MEMENTO_PLANNING[item.id][3])}</h3></div><div class="detail-facts"><section class="detail-fact"><span class="fact-index">01</span><h3>Cosa risolve</h3><p>${esc(data.solves)}</p></section><section class="detail-fact"><span class="fact-index">02</span><h3>Cosa ottieni</h3><ul>${data.gets.map(text => `<li>${esc(text)}</li>`).join('')}</ul></section><section class="detail-fact"><span class="fact-index">03</span><h3>Come prende forma</h3><p>${esc(data.does)}</p></section><section class="detail-fact"><span class="fact-index">04</span><h3>Da dove cominciamo</h3><p>${esc(data.needs)}</p></section></div>${stats(item)}${isPhysical ? '<p class="physical-note">Il servizio riguarda il progetto grafico e i file esecutivi. Materiali, quantità, stampa e installazione vengono definiti nel preventivo.</p>' : ''}</div><nav class="detail-pager" aria-label="Esplora altri servizi"><button data-action="close-detail">${icon('caret-left')}Torna alla pagina</button><a href="#servizio/${next.id}" data-related="${next.id}"><span>${esc(title(next))}</span>${icon()}</a></nav></article>`;
  }
  function bundleSheet(item) {
    const editorial = MEMENTO_BUNDLE_EDITORIAL[item.id], names = ['Il risultato', 'I servizi', 'La consegna'];
    return `<article class="bundle-sheet"><div class="bundle-detail-heading"><span class="eyebrow">Percorso integrato</span><h2 id="detail-title" class="bundle-detail-title" tabindex="-1">${esc(item.title)}</h2></div><div class="story-nav" role="tablist" aria-label="Esplora il bundle">${names.map((name, index) => `<button id="board-tab-${index}" role="tab" data-board="${index}" aria-controls="board-${index}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}"><span>${number(index + 1)}</span>${name}</button>`).join('')}</div><div class="story-viewport"><section id="board-0" class="story-board story-result" role="tabpanel" aria-labelledby="board-tab-0"><img class="story-visual" src="${imageFor(item)}" alt="${esc(item.alt)}" width="1120" height="1120"><div class="story-copy"><span class="eyebrow">Il risultato</span><h3>${esc(editorial.headline).replace(/\n/g, '<br>')}</h3><p>${esc(editorial.output)}</p><div class="problem-note"><span>Cosa risolve</span><p>${esc(item.details.solves)}</p></div></div></section><section id="board-1" class="story-board story-components" role="tabpanel" aria-labelledby="board-tab-1" hidden><div class="board-heading"><span class="eyebrow">Un sistema, più competenze</span><h3>Ogni servizio,<br>un ruolo.</h3></div><div class="bundle-components">${item.covers.map((id, index) => { const service = byId.get(id); return `<a href="#servizio/${id}" class="component-row" data-component="${id}"><span class="component-number">${number(index + 1)}</span><img src="${imageFor(service)}" alt="" width="1120" height="1120" loading="lazy"><span class="component-copy"><strong>${esc(title(service))}</strong><span>${esc(editorial.roles[id])}</span><small>Output: ${esc(service.details.gets[0])}</small></span>${icon()}</a>`; }).join('')}</div><p class="coordination-note">${esc(editorial.coordination)}</p></section><section id="board-2" class="story-board story-delivery" role="tabpanel" aria-labelledby="board-tab-2" hidden><div class="board-heading"><span class="eyebrow">L’output complessivo</span><h3>Un insieme<br>che funziona.</h3><p>${esc(editorial.output)}</p></div><ol class="delivery-list">${item.details.gets.map(text => `<li>${esc(text)}</li>`).join('')}</ol><div class="delivery-brief"><span class="eyebrow">Per cominciare</span><p>${esc(item.details.needs)}</p></div><button class="primary-link" data-action="project">Costruiamo il tuo percorso ${icon()}</button></section></div><div class="story-controls"><button class="text-button" data-board-step="-1">${icon('caret-left')}Precedente</button><span id="story-status" aria-live="polite">01 / 03</span><button class="text-button" data-board-step="1">Successiva${icon()}</button></div><div class="bundle-planning">${stats(item)}</div></article>`;
  }
  function openDetail(item, {fromBundle = null} = {}) {
    if (!item) return;
    rememberOrigin();
    if (lead.open) lead.close();
    currentDetail = item; parentBundle = fromBundle; currentBoard = 0;
    detail.dataset.kind = item.kind;
    $('#detail-content').innerHTML = item.kind === 'bundle' ? bundleSheet(item) : serviceSheet(item);
    if (!detail.open) detail.showModal();
    lockBody(); detail.scrollTop = 0;
    setHash(`#${item.kind === 'bundle' ? 'bundle' : 'servizio'}/${item.id}`);
    $('#detail-title').focus({preventScroll: true});
    if (item.kind === 'bundle') {
      updateBoardControls();
      const viewport = detail.querySelector('.story-viewport');
      let start = null;
      viewport.addEventListener('pointerdown', event => { if (!event.target.closest('button, a')) start = {x: event.clientX, y: event.clientY}; });
      viewport.addEventListener('pointerup', event => { if (!start) return; const dx = event.clientX - start.x, dy = event.clientY - start.y; start = null; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) showBoard(currentBoard + (dx < 0 ? 1 : -1)); });
      viewport.addEventListener('pointercancel', () => { start = null; });
    }
  }
  function updateBoardControls() { detail.querySelector('[data-board-step="-1"]').disabled = currentBoard === 0; detail.querySelector('[data-board-step="1"]').disabled = currentBoard === 2; }
  function showBoard(index, focusTab = false) {
    if (currentDetail?.kind !== 'bundle' || index < 0 || index > 2) return;
    const direction = index > currentBoard ? 1 : -1; currentBoard = index;
    detail.querySelectorAll('[data-board]').forEach(button => { const active = Number(button.dataset.board) === index; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
    detail.querySelectorAll('.story-board').forEach((board, i) => { board.hidden = i !== index; });
    const board = $(`#board-${index}`);
    if (!reduced.matches) board.animate([{opacity: 0, transform: `translateX(${direction * 22}px)`}, {opacity: 1, transform: 'translateX(0)'}], {duration: 340, easing: 'cubic-bezier(.2,.7,.2,1)'});
    $('#story-status').textContent = `${number(index + 1)} / 03`;
    updateBoardControls();
    if (focusTab || document.activeElement?.disabled) $(`[data-board="${index}"]`).focus({preventScroll: true});
  }
  function closeDetail(restore = true, updateRoute = true) { detail.close(); currentDetail = null; parentBundle = null; lockBody(); if (updateRoute) setHash(returnHash); if (restore) restoreFocus(); }
  function openLead(context = '') {
    rememberOrigin();
    if (detail.open) closeDetail(false, false);
    leadContext = context;
    $('#lead-context').hidden = !context; $('#lead-context').textContent = context ? `Ti interessa: ${context}` : '';
    $('#lead-form').hidden = false; $('#lead-result').hidden = true;
    if (!lead.open) lead.showModal();
    lockBody(); lead.scrollTop = 0; setHash('#levelup'); $('#lead-goal').focus({preventScroll: true});
  }
  function closeLead(updateRoute = true) { lead.close(); lockBody(); if (updateRoute) setHash(returnHash); restoreFocus(); }
  document.addEventListener('click', event => {
    const target = event.target.closest('button, a[data-bundle], a[data-service], a[data-related], a[data-component], a[data-back-bundle], a[data-action]');
    if (!target) return;
    if (target.tagName === 'A') {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
    }
    if (target.dataset.bundle) { openDetail(byId.get(target.dataset.bundle)); return; }
    if (target.dataset.service) { openDetail(byId.get(target.dataset.service)); return; }
    if (target.dataset.related) { openDetail(byId.get(target.dataset.related)); return; }
    if (target.dataset.component) { openDetail(byId.get(target.dataset.component), {fromBundle: currentDetail}); return; }
    if (target.dataset.backBundle) { openDetail(byId.get(target.dataset.backBundle)); showBoard(1); return; }
    if (target.dataset.board !== undefined) { showBoard(Number(target.dataset.board)); return; }
    if (target.dataset.boardStep) { showBoard(currentBoard + Number(target.dataset.boardStep)); return; }
    const action = target.dataset.action;
    if (action === 'close-detail') closeDetail();
    if (action === 'close-lead') closeLead();
    if (action === 'levelup') openLead();
    if (action === 'project') openLead(currentDetail ? title(currentDetail) : '');
    if (action === 'reset-search') { $('#service-search').value = ''; renderCatalogue(); $('#service-search').focus(); }
  });
  detail.addEventListener('keydown', event => {
    if (currentDetail?.kind !== 'bundle' || !event.target.closest('.story-nav, .story-controls')) return;
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (currentBoard + (event.key === 'ArrowRight' ? 1 : 2)) % 3; showBoard(next, true); }
  });
  detail.addEventListener('cancel', event => { event.preventDefault(); closeDetail(); });
  lead.addEventListener('cancel', event => { event.preventDefault(); closeLead(); });
  [detail, lead].forEach(dialog => dialog.addEventListener('click', event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog === detail ? closeDetail() : closeLead(); }));
  $('#lead-form').addEventListener('submit', event => {
    event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return;
    const values = new FormData(form), name = String(values.get('name')).trim(), email = String(values.get('email')).trim();
    draft = `Ciao Memento,\n\nsono ${name}.\n\nIl mio obiettivo: ${values.get('goal')}.\n${leadContext ? `Mi interessa: ${leadContext}.\n` : ''}${String(values.get('note')).trim() ? `\n${String(values.get('note')).trim()}\n` : ''}\nPotete rispondermi a ${email}.\n\nGrazie!\n${name}`;
    $('#email-link').href = `mailto:${MEMENTO_CONFIG.email}?subject=${encodeURIComponent('LevelUp — ' + (leadContext || values.get('goal')))}&body=${encodeURIComponent(draft)}`;
    $('#request-preview').textContent = draft; $('#lead-form').hidden = true; $('#lead-result').hidden = false; $('#copy-request').textContent = 'Copia richiesta'; $('#email-link').focus({preventScroll: true});
  });
  $('#edit-request').addEventListener('click', () => { $('#lead-form').hidden = false; $('#lead-result').hidden = true; $('#lead-goal').focus(); });
  $('#copy-request').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(draft); $('#copy-request').textContent = 'Richiesta copiata'; }
    catch { $('#copy-request').textContent = 'Seleziona e copia il testo qui sotto'; const selection = getSelection(); selection.removeAllRanges(); const range = document.createRange(); range.selectNodeContents($('#request-preview')); selection.addRange(range); }
  });
  function route() {
    const [prefix, id] = location.hash.slice(1).split('/');
    if ((prefix === 'servizio' || prefix === 'bundle' || sections.some(section => section.id === prefix) || ['stampa', 'fotografia'].includes(prefix)) && byId.has(id)) { openDetail(byId.get(id)); return; }
    if (prefix === 'levelup' || id === 'levelup') { openLead(); return; }
    if (detail.open) closeDetail(false, false);
    if (lead.open) closeLead(false);
    const alias = {stampa: 'grafica', fotografia: 'visual', rd: 'grafica'}[prefix];
    if (alias) { setHash('#' + alias); $('#' + alias).scrollIntoView({behavior: 'instant'}); }
  }
  window.addEventListener('hashchange', route);
  route();
})();
