/* Memento V8: bundle-first editorial journey and physical/digital catalogue. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
  const icon = (name = 'caret-right', className = 'chevron') => `<img class="${className}" src="assets/icons/${name}.svg" alt="" aria-hidden="true">`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const services = [...MEMENTO_SERVICES, MEMENTO_APP_SERVICE];
  const byId = new Map([...services, ...MEMENTO_BUNDLES].map(item => [item.id, item]));
  const sections = MEMENTO_SECTIONS;
  const orderedServices = sections.flatMap(section => section.ids.map(id => byId.get(id)));
  const bundles = ['b-online', 'b-lancio', 'b-identita', 'b-apertura', 'b-campagna', 'b-social'].map(id => byId.get(id));
  const titles = {'ecommerce': 'E-commerce', 'menu-digitale': 'Menù interattivo', 'foto-emozionali': 'Fotografia pubblicitaria'};
  const title = item => titles[item.id] || item.title;
  const medium = item => item.group === 'print' && item.id !== 'presentazione' ? 'physical' : 'digital';
  const sectionFor = item => sections.find(section => section.ids.includes(item.id));
  const imageFor = item => `assets/${item.image}.webp`;
  const heroImages = {'sito': 'hero-web', 'foto-prodotti': 'hero-fotografia', 'modello-3d': 'hero-3d', 'branding': 'hero-branding'};
  const heroFor = item => `assets/${heroImages[item.id] || item.image}.webp`;
  const number = value => String(value).padStart(2, '0');
  const detail = $('#detail-dialog'), lead = $('#lead-dialog');
  let currentDetail = null, parentBundle = null, currentBoard = 0;
  let returnHash = '#bundles', focusReturn = null, leadContext = '', draft = '', activeMedium = 'all';

  function stats(item, compact = false) {
    const editorial = item.kind === 'bundle' ? MEMENTO_BUNDLE_EDITORIAL[item.id] : null;
    const [time, complexity, driver] = editorial ? [editorial.time, editorial.complexity, 'Dipende dal numero di contenuti e dai servizi coinvolti.'] : MEMENTO_PLANNING[item.id];
    if (compact) return `<span class="slide-meta"><span>Stima: ${esc(time)}</span><span>Complessità ${complexity}/5</span></span>`;
    return `<div class="planning"><div><span class="eyebrow">Tempistiche indicative</span><strong>${esc(time)}</strong></div><div><span class="eyebrow">Complessità relativa</span><strong>${MEMENTO_COMPLEXITY[complexity - 1]} <span class="complexity-score">${complexity}/5</span></strong><span class="complexity-bars" aria-hidden="true">${Array.from({length: 5}, (_, index) => `<i class="${index < complexity ? 'filled' : ''}"></i>`).join('')}</span></div><p class="planning-driver">${esc(driver)}</p><p class="estimate-note">${MEMENTO_ESTIMATE_NOTE}${medium(item) === 'physical' ? ' I tempi indicati riguardano la progettazione; produzione, spedizione e posa sono da concordare con il fornitore.' : ''}</p></div>`;
  }
  function slideCard(item, index, type) {
    const bundle = type === 'bundle', editorial = bundle ? MEMENTO_BUNDLE_EDITORIAL[item.id] : null;
    const heading = bundle ? editorial.headline : title(item);
    const caption = bundle ? item.title : MEMENTO_PLANNING[item.id][3];
    return `<button class="carousel-card ${bundle ? 'bundle-card' : 'showcase-card'}" data-slide="${index}" data-item="${item.id}" aria-label="${bundle ? 'Esplora il bundle' : 'Scopri'} ${esc(title(item))}" tabindex="${index === 0 ? 0 : -1}"><img class="slide-visual" src="${bundle ? imageFor(item) : heroFor(item)}" alt="" draggable="false" ${bundle && index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} width="1120" height="1120"><span class="slide-scrim"></span><span class="slide-topline"><span>${bundle ? 'Percorso integrato' : sectionFor(item).label}</span><span>${number(index + 1)}</span></span><span class="slide-copy"><span class="slide-caption">${esc(caption)}</span><span class="slide-title">${esc(heading).replace(/\n/g, '<br>')}</span>${bundle ? `<span class="slide-summary">${esc(item.description)}</span>` : ''}${stats(item, true)}</span><span class="slide-action"><span>${bundle ? 'Esplora il bundle' : 'Scopri il servizio'}</span>${icon()}</span></button>`;
  }
  function mountCarousel(element, controls, items, type = 'service') {
    element.innerHTML = `<div class="carousel-stage">${items.map((item, index) => slideCard(item, index, type)).join('')}</div>`;
    controls.innerHTML = `<button class="slide-arrow" data-step="-1" aria-label="${type === 'bundle' ? 'Bundle' : 'Servizio'} precedente">${icon('caret-left')}</button><span class="slide-counter" aria-live="polite"><span data-current>01</span><span class="counter-divider">/</span>${number(items.length)}</span><button class="slide-arrow" data-step="1" aria-label="${type === 'bundle' ? 'Bundle' : 'Servizio'} successivo">${icon()}</button><span class="slide-progress" aria-hidden="true"><i></i></span>`;
    const progress = controls.querySelector('.slide-progress i');
    const update = index => { controls.querySelector('[data-current]').textContent = number(index + 1); progress.style.width = `${100 / items.length}%`; progress.style.transform = `translateX(${index * 100}%)`; };
    const carousel = new MementoCarousel(element, {onSettle: update, onOpen: index => openDetail(items[index])});
    controls.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => carousel.step(Number(button.dataset.step))));
    update(0);
  }
  mountCarousel($('#bundle-carousel'), $('#bundle-controls'), bundles, 'bundle');
  $('#section-nav').innerHTML = sections.map(section => `<a href="#${section.id}">${section.label}</a>`).join('') + '<a href="#catalogo" class="nav-catalogue">Tutti i servizi</a>';
  $('#category-sections').innerHTML = sections.map((section, index) => `<section id="${section.id}" class="category-section${section.id === 'rd' ? ' research-section' : ''}" aria-labelledby="heading-${section.id}"><div class="category-heading page-width"><span class="section-number">${number(index + 1)}</span><h2 id="heading-${section.id}">${section.label}</h2><p>${esc(section.subtitle)}</p></div>${section.id === 'rd' ? `<div class="research-board page-width"><span class="research-orbit" aria-hidden="true"></span><div class="research-copy"><span class="eyebrow"><span class="status-light"></span>Area in definizione</span><h3>Il prossimo<br>passo non è<br>ancora scritto.</h3><p>Lo spazio Memento dedicato alla sperimentazione. Ambiti, servizi e percorsi sono ancora da definire.</p><button class="primary-link" data-action="research">Hai un’idea? Parliamone ${icon()}</button></div><span class="research-mark" aria-hidden="true">R&D</span></div>` : `<div class="carousel service-carousel" id="carousel-${section.id}" role="region" aria-roledescription="carosello" aria-label="Servizi ${section.label}"></div><div class="carousel-controls" id="controls-${section.id}"></div>`}</section>`).join('');
  sections.filter(section => section.ids.length).forEach(section => mountCarousel($(`#carousel-${section.id}`), $(`#controls-${section.id}`), section.ids.map(id => byId.get(id))));

  function renderCatalogue() {
    const query = $('#service-search').value.trim().toLocaleLowerCase('it');
    const matching = orderedServices.filter(item => (activeMedium === 'all' || medium(item) === activeMedium) && `${title(item)} ${sectionFor(item).label} ${item.description}`.toLocaleLowerCase('it').includes(query));
    const groups = [{id: 'digital', label: 'Digitale', subtitle: 'Esperienze, contenuti e identità da condividere.'}, {id: 'physical', label: 'Fisico', subtitle: 'Identità su carta, oggetti e spazi. Progettazione ed esecutivi; produzione da concordare.'}];
    $('#catalogue-groups').innerHTML = groups.map(group => {
      const items = matching.filter(item => medium(item) === group.id);
      if (!items.length) return '';
      return `<section class="catalogue-group" data-group="${group.id}" aria-labelledby="group-${group.id}"><div class="group-heading"><h3 id="group-${group.id}">${group.label}<sup>${number(items.length)}</sup></h3><p>${group.subtitle}</p></div><div class="service-grid">${items.map(item => `<button class="service-card" data-service="${item.id}" aria-label="Scopri ${esc(title(item))}"><img class="service-visual" src="${imageFor(item)}" alt="" loading="lazy" width="1120" height="1120"><span class="grid-category">${sectionFor(item).label}</span><span class="service-copy"><span class="service-title">${esc(title(item))}</span>${icon()}</span></button>`).join('')}</div></section>`;
    }).join('');
    $('#total-count').textContent = `${matching.length} servizi`;
    $('#empty-results').hidden = matching.length > 0;
    $$('.catalogue-filters button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.medium === activeMedium)));
    $('#catalog-status').textContent = `${matching.length} servizi nel catalogo`;
  }
  renderCatalogue();
  $('#service-search').addEventListener('input', renderCatalogue);
  $$('.catalogue-filters button').forEach(button => button.addEventListener('click', () => { activeMedium = button.dataset.medium; renderCatalogue(); }));
  function lockBody() { document.body.style.overflow = detail.open || lead.open ? 'hidden' : ''; }
  function setHash(hash) { history.replaceState(null, '', hash); }
  function restoreFocus() { if (focusReturn?.isConnected) focusReturn.focus({preventScroll: true}); }
  function rememberOrigin() {
    if (!detail.open && !lead.open) {
      focusReturn = document.activeElement;
      const [prefix, id] = location.hash.slice(1).split('/');
      const legacySection = {stampa: 'branding', fotografia: 'visual'}[prefix] || prefix;
      returnHash = /^#(servizio|bundle|levelup)(\/|$)/.test(location.hash) ? '#bundles' : byId.has(id) || id === 'levelup' ? '#' + legacySection : location.hash || '#bundles';
    }
  }
  function serviceSheet(item) {
    const data = item.details, section = sectionFor(item);
    const next = byId.get(section.ids[(section.ids.indexOf(item.id) + 1) % section.ids.length]);
    const isPhysical = medium(item) === 'physical';
    return `<article class="product-sheet"><div class="detail-topline">${parentBundle ? `<button class="back-link" data-back-bundle="${parentBundle.id}">${icon('caret-left')} ${esc(parentBundle.title)}</button>` : `<span class="eyebrow">Scheda servizio / ${section.label}</span>`}</div><div class="detail-hero"><img class="detail-image" src="${heroFor(item)}" alt="${esc(item.alt || title(item) + ' — visual illustrativo Memento')}" width="1120" height="1120"><div class="detail-intro"><span class="eyebrow">${isPhysical ? 'Fisico' : 'Digitale'}</span><h2 class="detail-title" id="detail-title" tabindex="-1">${esc(title(item))}</h2><p class="detail-description">${esc(item.description)}</p><button class="primary-link" data-action="project">Parliamo del tuo progetto ${icon()}</button></div></div><div class="detail-body"><div class="outcome-heading"><span class="eyebrow">Il valore per te</span><h3>${esc(MEMENTO_PLANNING[item.id][3])}</h3></div><div class="detail-facts"><section class="detail-fact"><span class="fact-index">01</span><h3>Cosa risolve</h3><p>${esc(data.solves)}</p></section><section class="detail-fact"><span class="fact-index">02</span><h3>Cosa ottieni</h3><ul>${data.gets.map(text => `<li>${esc(text)}</li>`).join('')}</ul></section><section class="detail-fact"><span class="fact-index">03</span><h3>Come prende forma</h3><p>${esc(data.does)}</p></section><section class="detail-fact"><span class="fact-index">04</span><h3>Da dove cominciamo</h3><p>${esc(data.needs)}</p></section></div>${stats(item)}${isPhysical ? '<p class="physical-note">Il servizio riguarda il progetto grafico e i file esecutivi. Materiali, quantità, stampa e installazione vengono definiti nel preventivo.</p>' : ''}</div><nav class="detail-pager" aria-label="Esplora altri servizi"><button data-action="close-detail">${icon('caret-left')}Torna alla pagina</button><button data-related="${next.id}"><span>${esc(title(next))}</span>${icon()}</button></nav></article>`;
  }
  function bundleSheet(item) {
    const editorial = MEMENTO_BUNDLE_EDITORIAL[item.id], names = ['Il risultato', 'I servizi', 'La consegna'];
    return `<article class="bundle-sheet"><div class="bundle-detail-heading"><span class="eyebrow">Percorso integrato</span><h2 id="detail-title" class="bundle-detail-title" tabindex="-1">${esc(item.title)}</h2></div><div class="story-nav" role="tablist" aria-label="Esplora il bundle">${names.map((name, index) => `<button id="board-tab-${index}" role="tab" data-board="${index}" aria-controls="board-${index}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}"><span>${number(index + 1)}</span>${name}</button>`).join('')}</div><div class="story-viewport"><section id="board-0" class="story-board story-result" role="tabpanel" aria-labelledby="board-tab-0"><img class="story-visual" src="${imageFor(item)}" alt="${esc(item.alt)}" width="1120" height="1120"><div class="story-copy"><span class="eyebrow">Il risultato</span><h3>${esc(editorial.headline).replace(/\n/g, '<br>')}</h3><p>${esc(editorial.output)}</p><div class="problem-note"><span>Cosa risolve</span><p>${esc(item.details.solves)}</p></div></div></section><section id="board-1" class="story-board story-components" role="tabpanel" aria-labelledby="board-tab-1" hidden><div class="board-heading"><span class="eyebrow">Un sistema, più competenze</span><h3>Ogni servizio,<br>un ruolo.</h3></div><div class="bundle-components">${item.covers.map((id, index) => { const service = byId.get(id); return `<button class="component-row" data-component="${id}"><span class="component-number">${number(index + 1)}</span><img src="${imageFor(service)}" alt="" width="1120" height="1120" loading="lazy"><span class="component-copy"><strong>${esc(title(service))}</strong><span>${esc(editorial.roles[id])}</span><small>Output: ${esc(service.details.gets[0])}</small></span>${icon()}</button>`; }).join('')}</div><p class="coordination-note">${esc(editorial.coordination)}</p></section><section id="board-2" class="story-board story-delivery" role="tabpanel" aria-labelledby="board-tab-2" hidden><div class="board-heading"><span class="eyebrow">L’output complessivo</span><h3>Un insieme<br>che funziona.</h3><p>${esc(editorial.output)}</p></div><ol class="delivery-list">${item.details.gets.map(text => `<li>${esc(text)}</li>`).join('')}</ol><div class="delivery-brief"><span class="eyebrow">Per cominciare</span><p>${esc(item.details.needs)}</p></div><button class="primary-link" data-action="project">Costruiamo il tuo percorso ${icon()}</button></section></div><div class="story-controls"><button class="text-button" data-board-step="-1">${icon('caret-left')}Precedente</button><span id="story-status" aria-live="polite">01 / 03</span><button class="text-button" data-board-step="1">Successiva${icon()}</button></div><div class="bundle-planning">${stats(item)}</div></article>`;
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
    const target = event.target.closest('button');
    if (!target) return;
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
    if (action === 'research') openLead('R&D — idea da esplorare');
    if (action === 'project') openLead(currentDetail ? title(currentDetail) : '');
    if (action === 'reset-search') { activeMedium = 'all'; $('#service-search').value = ''; renderCatalogue(); $('#service-search').focus(); }
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
    const alias = {stampa: 'branding', fotografia: 'visual'}[prefix];
    if (alias) { setHash('#' + alias); $('#' + alias).scrollIntoView({behavior: 'instant'}); }
  }
  window.addEventListener('hashchange', route);
  route();
})();
