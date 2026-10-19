/* Memento V21: one bundle fan, full-card details and edge-to-edge category titles. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
  const icon = (name = 'caret-right', className = 'chevron') => `<img class="${className}" src="assets/icons/${name}.svg" alt="" aria-hidden="true">`;
  const carouselByScene = new Map();
  let pacing, serviceDeck;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const services = [...MEMENTO_SERVICES, MEMENTO_APP_SERVICE];
  const byId = new Map([...services, ...MEMENTO_BUNDLES].map(item => [item.id, item]));
  const sections = MEMENTO_SECTIONS;
  const titleUnits = {'WEB': 2.32, '3D': 1.4, 'VIDEO': 3.10, 'VISUAL': 3.57, 'BRANDING': 5.30, 'GRAFICA': 4.42};
  const orderedServices = sections.flatMap(section => (section.catalogueIds || section.ids).map(id => byId.get(id)));
  const bundles = ['b-online', 'b-lancio', 'b-identita', 'b-apertura', 'b-campagna', 'b-social'].map(id => byId.get(id));
  const title = item => item.title;
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
  let currentDetail = null, parentBundle = null;
  let returnScroll = 0, returnHash = '#inizio', focusReturn = null, leadContext = '', draft = '', activeMedium = 'digital';

  function stats(item) {
    const editorial = item.kind === 'bundle' ? MEMENTO_BUNDLE_EDITORIAL[item.id] : null;
    const time = editorial ? editorial.time : MEMENTO_PLANNING[item.id][0];
    return `<div class="planning"><div><span class="eyebrow">Tempistiche indicative</span><strong>${esc(time)}</strong></div><p class="estimate-note">${MEMENTO_ESTIMATE_NOTE}${medium(item) === 'physical' ? ' Produzione, spedizione e posa si concordano con il fornitore.' : ''}</p></div>`;
  }
  function splitTitle(heading) {
    const words = heading.split(' ');
    if (words.length < 2) return esc(heading);
    let split = 1, score = Infinity;
    for (let i = 1; i < words.length; i++) {
      const left = words.slice(0, i).join(' '), right = words.slice(i).join(' ');
      const balance = Math.abs(left.length - right.length) + (/^(di|del|degli|&|o)$/.test(words[i - 1]) ? 6 : 0);
      if (balance < score) { split = i; score = balance; }
    }
    return `<span>${esc(words.slice(0, split).join(' '))}</span> <span>${esc(words.slice(split).join(' '))}</span>`;
  }
  const spreadTitle = label => [...label].map(letter => `<span aria-hidden="true">${esc(letter)}</span>`).join('');
  function slideCard(item, index, bundle = null) {
    const heading = MEMENTO_SHOWCASE_TITLES[item.id] || title(item);
    const lines = item.kind === 'bundle' ? [] : MEMENTO_SLIDE_COPY[item.id] || [MEMENTO_PLANNING[item.id][3], item.description];
    return `<a href="#${item.kind === 'bundle' ? 'bundle' : 'servizio'}/${item.id}" draggable="false" class="carousel-card showcase-card${bundle ? ' bundle-mini-card' : ''}" data-slide="${index}" data-item="${item.id}" aria-label="Scopri ${item.kind === 'bundle' ? 'il bundle ' : ''}${esc(heading)}" tabindex="${index === 0 ? 0 : -1}"><img class="slide-visual" src="${imageFor(item)}" alt="" draggable="false" loading="lazy" width="1120" height="1120"><span class="slide-scrim" aria-hidden="true"></span>${item.kind === 'bundle' ? '<span class="slide-kicker">L’offerta</span>' : ''}${bundle ? '' : `<span class="slide-description">${lines.map(line => `<span>${esc(line)}</span>`).join('')}</span>`}<span class="slide-title">${bundle ? esc(heading) : splitTitle(heading)}</span><span class="slide-action" aria-hidden="true">${icon()}</span></a>`;
  }
  function mountCarousel(element, controls, items, {hero = false, bundle = null} = {}) {
    // Repeated visual cycles keep both neighbours visible even in two-service bundles.
    const slides = bundle && items.length < 4 ? Array.from({length: Math.ceil(6 / items.length)}, () => items).flat() : items;
    element.innerHTML = `<div class="carousel-stage">${slides.map((item, index) => hero ? `<a href="#${item.id}" draggable="false" class="carousel-card hero-card" style="--hero-units:${titleUnits[item.label]}" data-slide="${index}" aria-label="Esplora ${item.label}" tabindex="${index === 0 ? 0 : -1}"><img class="hero-visual" src="assets/${item.hero}.webp" alt="" draggable="false" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} width="1536" height="1024"><span class="hero-shade"></span><span class="hero-copy page-width"><span class="hero-title">${item.label}</span><span class="hero-action" aria-hidden="true">${icon()}</span></span></a>` : slideCard(item, index, bundle)).join('')}</div>`;
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', hero ? 'Scegli un’area' : element.getAttribute('aria-label'));
    controls.innerHTML = `<div class="carousel-dots">${items.map((item, index) => `<button class="carousel-dot" data-dot="${index}" aria-label="${esc(hero ? item.label : item.kind === 'bundle' ? 'L’offerta' : MEMENTO_SHOWCASE_TITLES[item.id] || title(item))}" aria-pressed="${index === 0}"><span></span></button>`).join('')}</div>`;
    const update = (index, {announce = true} = {}) => {
      index %= items.length;
      controls.querySelectorAll('[data-dot]').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      if (announce) $('#catalog-status').textContent = hero ? items[index].label : title(items[index]);
    };
    const carousel = new MementoCarousel(element, {externalGestures: true, onSettle: update, onOpen: index => {
      index %= items.length;
      if (hero) { pacing.goTo(document.getElementById(items[index].id)); history.replaceState(null, '', '#' + items[index].id); }
      else openDetail(items[index], {fromBundle: items[index].kind === 'bundle' ? null : bundle});
    }});
    carouselByScene.set(element, carousel);
    if (!bundle) carouselByScene.set(element.closest('[data-scene]'), carousel);
    wireCarouselControls(element, controls, carousel, items.length);
    return carousel;
  }
  function wireCarouselControls(element, controls, carousel, count) {
    controls.dataset.carouselFor = element.id;
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
      const delta = ((index - carousel.current + count / 2) % count + count) % count - count / 2;
      carousel.select(carousel.current + delta);
    };
    controls.querySelectorAll('[data-dot]').forEach(button => button.addEventListener('click', () => selectDot(Number(button.dataset.dot))));
    controls.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      carousel.keyboardFocus = true;
      const current = Number(event.target.closest('[data-dot]')?.dataset.dot || 0);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : (current + (event.key === 'ArrowRight' ? 1 : count - 1)) % count;
      controls.querySelector(`[data-dot="${next}"]`).focus({preventScroll: true});
      selectDot(next);
    });
  }
  mountCarousel($('#hero-carousel'), $('#hero-controls'), sections, {hero: true});
  $('#category-sections').innerHTML = sections.map(section => `<section id="${section.id}" class="category-section" data-scene style="--title-units:${titleUnits[section.label]}" aria-labelledby="heading-${section.id}"><div class="category-heading"><h2 id="heading-${section.id}" class="spread-title" aria-label="${section.label}">${spreadTitle(section.label)}</h2></div><div class="carousel service-carousel" id="carousel-${section.id}" role="region" aria-roledescription="carosello" aria-label="Servizi ${section.label}"></div><div class="carousel-controls" id="controls-${section.id}"></div></section>`).join('');
  sections.forEach(section => mountCarousel($(`#carousel-${section.id}`), $(`#controls-${section.id}`), section.ids.map(id => byId.get(id))));
  const bundlePreviews = {
    'b-online': 'Identità e sito web, nella stessa direzione.',
    'b-lancio': 'Dal primo sguardo al lancio del prodotto.',
    'b-identita': 'Un’identità riconoscibile, in ogni applicazione.',
    'b-apertura': 'Il tuo spazio e la tua presenza online, insieme.',
    'b-campagna': 'Un’idea. Tutti i contenuti per raccontarla.',
    'b-social': 'Contenuti che cambiano. Uno stile che resta.'
  };
  $('#bundles-heading').innerHTML = spreadTitle('BUNDLE');
  $('#bundle-boards').innerHTML = '<div class="carousel-stage">' + bundles.map((item, index) => `<a id="percorso-${item.id}" href="#bundle/${item.id}" draggable="false" class="carousel-card showcase-card bundle-board" data-slide="${index}" data-bundle="${item.id}" aria-label="Scopri il bundle ${esc(item.title)}" tabindex="${index === 0 ? 0 : -1}"><img class="bundle-visual" src="${imageFor(item)}" alt="" draggable="false" loading="lazy" width="1120" height="1120"><span class="bundle-shade" aria-hidden="true"></span><div class="bundle-layout"><p class="bundle-intro">${esc(bundlePreviews[item.id])}</p><h3 class="bundle-title" id="title-${item.id}">${splitTitle(item.title)}</h3><span class="bundle-open" aria-hidden="true">${icon()}</span></div></a>`).join('') + '</div>';
  const bundleControls = $('#bundle-controls');
  bundleControls.setAttribute('role', 'group');
  bundleControls.setAttribute('aria-label', 'Scegli un bundle');
  bundleControls.innerHTML = `<div class="carousel-dots">${bundles.map((item, index) => `<button class="carousel-dot" data-dot="${index}" aria-label="${esc(item.title)}" aria-pressed="${index === 0}"><span></span></button>`).join('')}</div>`;
  const updateBundle = (index, {announce = true} = {}) => {
    bundleControls.querySelectorAll('[data-dot]').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    if (announce) $('#catalog-status').textContent = bundles[index].title;
  };
  const bundleCarousel = new MementoCarousel($('#bundle-boards'), {externalGestures: true, autoplay: false, onSettle: updateBundle, onOpen: index => openDetail(bundles[index])});
  wireCarouselControls($('#bundle-boards'), bundleControls, bundleCarousel, bundles.length);
  carouselByScene.set($('#bundles'), bundleCarousel);
  carouselByScene.set($('#bundle-boards'), bundleCarousel);
  updateBundle(0, {announce: false});
  pacing = new MementoPacing($('#memento-catalogo'), carouselByScene);


  const catalogueMobile = matchMedia('(max-width: 767px)');
  function renderCatalogue() {
    const matching = orderedServices.filter(item => medium(item) === activeMedium);
    const label = activeMedium === 'digital' ? 'Digitale' : 'Fisico';
    const pages = mementoCatalogueLayout(matching, catalogueMobile.matches ? 3 : 5, catalogueMobile.matches ? 5 : 3);
    $('#catalogue-groups').innerHTML = `<section class="catalogue-group" data-group="${activeMedium}" aria-labelledby="group-${activeMedium}"><h3 id="group-${activeMedium}" class="sr-only">${label}</h3>${pages.map((page, index) => `<div class="catalogue-page" id="catalogo-${activeMedium}-${index + 1}" data-catalogue-page data-medium="${activeMedium}" role="group" aria-label="${label}, tavola ${index + 1}"><div class="service-grid">${page.map(({item, col, row, width, height}) => `<a href="#servizio/${item.id}" class="service-card" data-service="${item.id}" data-shape="${width}x${height}" style="--tile-col:${col};--tile-row:${row};--tile-width:${width};--tile-height:${height}" aria-label="Scopri ${esc(title(item))}"><img class="service-visual" src="${imageFor(item)}" alt="" loading="lazy" width="1120" height="1120"><span class="service-copy"><span class="service-title">${esc(title(item))}</span></span><span class="service-action" aria-hidden="true">${icon()}</span></a>`).join('')}</div></div>`).join('')}</section>`;
    $('.catalogue-filters').dataset.selected = activeMedium;
    $$('.catalogue-filters button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.medium === activeMedium)));
    $('#catalog-status').textContent = `${matching.length} servizi nel catalogo`;
    document.dispatchEvent(new Event('memento:catalogue-change'));
  }
  renderCatalogue();
  $('#home-link').href = MEMENTO_CONFIG.homeUrl;
  $$('.catalogue-filters button').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.medium === activeMedium) return;
    const rect = $('#catalogo').getBoundingClientRect();
    const inCatalogue = rect.top < innerHeight && rect.bottom > 0;
    activeMedium = button.dataset.medium; renderCatalogue();
    if (inCatalogue) { pacing.goTo($('[data-catalogue-page]')); setHash('#catalogo'); }
  }));
  catalogueMobile.addEventListener('change', () => {
    const originId = focusReturn?.dataset.service;
    const currentPage = $$('[data-catalogue-page]').find(page => { const rect = page.getBoundingClientRect(); return rect.top <= innerHeight / 2 && rect.bottom > innerHeight / 2; });
    const visibleId = currentPage?.querySelector('[data-service]')?.dataset.service;
    renderCatalogue();
    if (originId) focusReturn = $(`[data-service="${originId}"]`) || focusReturn;
    if (detail.open && originId && focusReturn?.isConnected) returnScroll = focusReturn.closest('[data-catalogue-page]').getBoundingClientRect().top + scrollY;
    else if (visibleId && !detail.open) {
      const page = $(`[data-service="${visibleId}"]`).closest('[data-catalogue-page]');
      window.scrollTo(0, page.getBoundingClientRect().top + scrollY);
    }
  });
  function lockBody() {
    document.body.style.overflow = detail.open || lead.open ? 'hidden' : '';
    document.dispatchEvent(new Event('memento:overlay-change'));
  }
  function setHash(hash) { history.replaceState(null, '', hash); }
  function restoreFocus() { if (focusReturn?.isConnected) focusReturn.focus({preventScroll: true}); }
  function rememberOrigin() {
    if (!detail.open && !lead.open) {
      focusReturn = document.activeElement;
      returnScroll = window.scrollY;
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
    const visual = (variant = '') => `<div class="service-scene-art ${variant}" aria-hidden="true"><img src="${imageFor(item)}" alt="" draggable="false" width="1120" height="1120"></div>`;
    const labels = ['Il risultato', 'Cosa ottieni', 'Come prende forma', 'Da dove cominciamo'];
    return `<article class="product-sheet service-deck" role="region" aria-roledescription="slideshow" aria-label="${esc(title(item))}">
      <div class="service-deck-topline">${parentBundle ? `<a href="#bundle/${parentBundle.id}" class="back-link" data-back-bundle="${parentBundle.id}">${icon('caret-left')} ${esc(parentBundle.title)}</a>` : `<span class="eyebrow">${section.label} / ${isPhysical ? 'Fisico' : 'Digitale'}</span>`}</div>
      <div class="carousel service-carousel popup-carousel" role="region" aria-roledescription="carosello" aria-label="Tavole di ${esc(title(item))}"><div class="carousel-stage">
        <section class="carousel-card showcase-card service-scene scene-result" data-slide="0" aria-label="Il risultato" tabindex="0"><div class="popup-card-scroll"><div class="popup-card-body">
          ${visual('art-result')}
          <div class="service-scene-copy"><span class="eyebrow">Il risultato</span><h2 id="detail-title" tabindex="-1">${esc(title(item))}</h2><p class="scene-description">${esc(item.description)}</p><div class="scene-note"><span class="eyebrow">Cosa risolve</span><p>${esc(data.solves)}</p></div></div>
        </div></div></section>
        <section class="carousel-card showcase-card service-scene scene-outputs" data-slide="1" aria-label="Cosa ottieni" tabindex="-1"><div class="popup-card-scroll"><div class="popup-card-body">
          ${visual('art-outputs')}
          <div class="service-scene-copy"><span class="eyebrow">Cosa ottieni</span><h3 tabindex="-1">${esc(MEMENTO_PLANNING[item.id][3])}</h3><ul class="scene-outputs-list">${data.gets.map(text => `<li>${icon('caret-right')}<span>${esc(text)}</span></li>`).join('')}</ul></div>
        </div></div></section>
        <section class="carousel-card showcase-card service-scene scene-process" data-slide="2" aria-label="Come prende forma" tabindex="-1"><div class="popup-card-scroll"><div class="popup-card-body">
          ${visual('art-process')}
          <div class="service-scene-copy"><span class="eyebrow">Il percorso</span><h3 tabindex="-1">Come prende<br>forma.</h3><p class="scene-description">${esc(data.does)}</p><div class="scene-process-line" aria-hidden="true"><span>Brief</span><i></i><span>Progetto</span><i></i><span>Consegna</span></div></div>
        </div></div></section>
        <section class="carousel-card showcase-card service-scene scene-start" data-slide="3" aria-label="Da dove cominciamo" tabindex="-1"><div class="popup-card-scroll"><div class="popup-card-body">
          ${visual('art-start')}
          <div class="service-scene-copy"><span class="eyebrow">Il prossimo passo</span><h3 tabindex="-1">Da dove<br>cominciamo?</h3><p class="scene-description">${esc(data.needs)}</p>${stats(item)}${isPhysical ? '<p class="physical-note">Il servizio riguarda il progetto grafico e i file esecutivi. Materiali, quantità, stampa e installazione vengono definiti nel preventivo.</p>' : ''}<button class="primary-link" data-action="project">Parliamo del tuo progetto ${icon()}</button><nav class="detail-pager" aria-label="Esplora altri servizi"><button data-action="close-detail">${icon('caret-left')}Torna alla pagina</button><a href="#servizio/${next.id}" data-related="${next.id}"><span>${esc(title(next))}</span>${icon()}</a></nav></div>
        </div></div></section>
      </div></div>
      <nav class="service-deck-controls" aria-label="Tavole del servizio"><div class="carousel-dots">${labels.map((label, index) => `<button class="carousel-dot" data-scene-dot="${index}" aria-label="${label}" aria-pressed="${index === 0}"><span></span></button>`).join('')}</div></nav><span class="sr-only service-deck-status" aria-live="polite"></span>
    </article>`;
  }
  function bundleSheet(item) {
    const editorial = MEMENTO_BUNDLE_EDITORIAL[item.id];
    const labels = ['Il risultato', 'I servizi inclusi', 'Come prende forma', 'Da dove cominciamo'];
    const visual = (variant = '') => `<div class="service-scene-art ${variant}" aria-hidden="true"><img src="${imageFor(item)}" alt="" draggable="false" width="1120" height="1120"></div>`;
    const boards = [
      `<div class="popup-card-body">${visual('art-result')}<div class="service-scene-copy"><span class="eyebrow">Il risultato</span><h2 id="detail-title" tabindex="-1">${esc(item.title)}</h2><p class="scene-description">${esc(editorial.output)}</p><div class="scene-note"><span class="eyebrow">Cosa risolve</span><p>${esc(item.details.solves)}</p></div></div></div>`,
      `<div class="popup-card-body bundle-components-body"><div class="service-scene-copy"><span class="eyebrow">I servizi inclusi</span><h3 tabindex="-1">Un’unica<br>direzione.</h3><div class="bundle-components">${item.covers.map(id => { const service = byId.get(id); return `<a href="#servizio/${id}" class="component-row" data-component="${id}"><img src="${imageFor(service)}" alt="" width="1120" height="1120" loading="lazy"><span class="component-copy"><strong>${esc(title(service))}</strong><span>${esc(editorial.roles[id])}</span></span>${icon()}</a>`; }).join('')}</div></div></div>`,
      `<div class="popup-card-body">${visual('art-process')}<div class="service-scene-copy"><span class="eyebrow">Come prende forma</span><h3 tabindex="-1">Un insieme<br>che funziona.</h3><p class="scene-description">${esc(editorial.coordination)}</p><ul class="scene-outputs-list delivery-list">${item.details.gets.map(text => `<li>${icon()}<span>${esc(text)}</span></li>`).join('')}</ul></div></div>`,
      `<div class="popup-card-body">${visual('art-start')}<div class="service-scene-copy"><span class="eyebrow">Il prossimo passo</span><h3 tabindex="-1">Da dove<br>cominciamo?</h3><p class="scene-description">${esc(item.details.needs)}</p>${stats(item)}<button class="primary-link" data-action="project">Costruiamo il tuo percorso ${icon()}</button><nav class="detail-pager" aria-label="Torna ai bundle"><button data-action="close-detail">${icon('caret-left')}Torna ai bundle</button></nav></div></div>`
    ];
    const classes = ['scene-result', 'scene-components', 'scene-process', 'scene-start'];
    return `<article class="bundle-sheet service-deck" role="region" aria-roledescription="slideshow" aria-label="${esc(item.title)}"><div class="service-deck-topline"><span class="eyebrow">Bundle / ${esc(item.title)}</span></div><div class="carousel service-carousel popup-carousel" role="region" aria-roledescription="carosello" aria-label="Tavole di ${esc(item.title)}"><div class="carousel-stage">${boards.map((board, index) => `<section id="board-${index}" class="carousel-card showcase-card service-scene ${classes[index]}" data-slide="${index}" aria-label="${labels[index]}" tabindex="${index === 0 ? 0 : -1}"><div class="popup-card-scroll">${board}</div></section>`).join('')}</div></div><nav class="service-deck-controls" aria-label="Tavole del bundle"><div class="carousel-dots">${labels.map((label, index) => `<button class="carousel-dot" data-scene-dot="${index}" aria-label="${label}" aria-pressed="${index === 0}"><span></span></button>`).join('')}</div></nav><span class="sr-only service-deck-status" aria-live="polite"></span></article>`;
  }
  function openDetail(item, {fromBundle = null} = {}) {
    if (!item) return;
    rememberOrigin();
    if (lead.open) lead.close();
    serviceDeck?.destroy(); serviceDeck = null;
    currentDetail = item; parentBundle = fromBundle;
    detail.dataset.kind = item.kind;
    $('#detail-content').innerHTML = item.kind === 'bundle' ? bundleSheet(item) : serviceSheet(item);
    if (!detail.open) detail.showModal();
    lockBody(); detail.scrollTop = 0;
    setHash(`#${item.kind === 'bundle' ? 'bundle' : 'servizio'}/${item.id}`);
    serviceDeck = new MementoServiceDeck(detail.querySelector('.service-deck'));
    $('#detail-title').focus({preventScroll: true});
  }
  function closeDetail(restore = true, updateRoute = true) { serviceDeck?.destroy(); serviceDeck = null; detail.close(); currentDetail = null; parentBundle = null; lockBody(); if (updateRoute) setHash(returnHash); if (restore) { window.scrollTo(0, returnScroll); restoreFocus(); } }
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
    if (event.defaultPrevented) return;
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
    if (target.dataset.backBundle) { openDetail(byId.get(target.dataset.backBundle)); serviceDeck.show(1); return; }
    const action = target.dataset.action;
    if (action === 'close-detail') closeDetail();
    if (action === 'close-lead') closeLead();
    if (action === 'levelup') openLead();
    if (action === 'project') openLead(currentDetail ? title(currentDetail) : '');
  });
  detail.addEventListener('cancel', event => { event.preventDefault(); closeDetail(); });
  lead.addEventListener('cancel', event => { event.preventDefault(); closeLead(); });
  // A swipe leaving the card must never turn into a backdrop click.
  let backdropPress = null;
  const popupSurface = target => target.closest('.carousel-card, .service-deck-controls, .service-deck-topline a, .dialog-close');
  detail.addEventListener('pointerdown', event => {
    if (event.isPrimary === false || event.button !== 0) { backdropPress = null; return; }
    backdropPress = {id: event.pointerId, x: event.clientX, y: event.clientY, outside: !popupSurface(event.target), moved: false};
  }, true);
  const trackBackdropPress = event => {
    if (backdropPress?.id === event.pointerId && Math.hypot(event.clientX - backdropPress.x, event.clientY - backdropPress.y) > 8) backdropPress.moved = true;
  };
  detail.addEventListener('pointermove', trackBackdropPress, true);
  detail.addEventListener('pointerup', trackBackdropPress, true);
  detail.addEventListener('pointercancel', () => { backdropPress = null; }, true);
  detail.addEventListener('click', event => {
    const press = backdropPress; backdropPress = null;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || popupSurface(event.target)) return;
    if (press?.outside && !press.moved) closeDetail();
  });
  lead.addEventListener('click', event => {
    if (event.target !== lead) return;
    const rect = lead.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeLead();
  });
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
    const bundleIndex = bundles.findIndex(item => prefix === 'percorso-' + item.id);
    if (bundleIndex >= 0) {
      bundleCarousel.select(bundleIndex); bundleCarousel.finish();
      pacing.goTo($('#bundles'));
      return;
    }
    const alias = {stampa: 'grafica', fotografia: 'visual', rd: 'grafica'}[prefix];
    if (alias) { setHash('#' + alias); $('#' + alias).scrollIntoView({behavior: 'instant'}); }
  }
  window.addEventListener('hashchange', route);
  route();
})();
