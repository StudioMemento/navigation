/* LevelUp — Visual DNA R1.1. No runtime dependencies or build step. */
(() => {
  'use strict';
  const boards = window.MEMENTO_BOARDS;
  const stage = document.getElementById('slides');
  const pagination = document.getElementById('pagination');
  const player = document.getElementById('experience-dialog');
  const mount = document.getElementById('frame-mount');
  const poster = document.getElementById('player-poster');
  const loading = document.getElementById('frame-loading');
  const fallback = document.getElementById('load-fallback');
  const announcement = document.getElementById('slide-announcement');
  const connected = new Set();
  let restoreFocus, savedScroll = 0, loadTimer = 0, savedURL = '', currentBoard = null, returningFocus = false;
  let carousel;
  const cards = boards.map((board, i) => {
    const card = document.createElement('a');
    card.className = 'preview-card frame';
    card.dataset.slide = i;
    card.dataset.board = board.id;
    card.href = board.url; card.target = '_blank'; card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', 'Esplora ' + board.title);
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-controls', 'experience-dialog');
    const img = document.createElement('img');
    img.className = 'card-art'; img.alt = ''; img.draggable = false; img.decoding = 'async';
    img.width = board.width; img.height = board.height;
    img.sizes = '(max-width: 767px) 60vw, (max-width: 1023px) 80vw, (min-width: 1600px) 998px, 62.4vw';
    if (i === 0) { img.fetchPriority = 'high'; img.srcset = board.srcset; img.src = board.image; }
    else { img.loading = 'lazy'; img.dataset.srcset = board.srcset; img.dataset.src = board.image; }
    const title = document.createElement('h2'); title.className = 'card-title';
    const gradient = document.createElement('span'); gradient.className = 'title-gradient'; gradient.textContent = board.title; title.append(gradient);
    const explore = document.createElement('span'); explore.className = 'explore'; explore.setAttribute('aria-hidden', 'true');
    explore.innerHTML = '<span>Esplora</span><svg viewBox="0 0 24 24"><path d="m5 5 14 0 0 14"/></svg>';
    card.append(img, title, explore); stage.append(card);
    card.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') connect(board); });
    card.addEventListener('focus', () => connect(board));
    return card;
  });
  const dots = boards.map((board, i) => {
    const dot = document.createElement('button'); dot.type = 'button'; dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', 'Mostra ' + board.title + ', ' + (i + 1) + ' di ' + boards.length);
    dot.setAttribute('aria-controls', 'experience-carousel');
    dot.innerHTML = '<span aria-hidden="true"></span>';
    dot.addEventListener('click', () => carousel.select(i)); pagination.append(dot); return dot;
  });
  function selected(index) {
    dots.forEach((dot, i) => { dot.setAttribute('aria-current', String(i === index)); dot.setAttribute('aria-pressed', String(i === index)); });
    announcement.textContent = boards[index].title + ', esperienza ' + (index + 1) + ' di ' + boards.length;
    if (cards.includes(document.activeElement) && document.activeElement !== cards[index]) cards[index].focus({preventScroll:true});
  }
  carousel = new MementoCarousel(document.getElementById('experience-carousel'), {
    autoplay: false,
    onSettle: selected,
    onOpen: index => openExperience(index, cards[index])
  });
  selected(0);
  function connect(board) {
    const origin = new URL(board.url).origin;
    if (connected.has(origin)) return;
    connected.add(origin); const hint = document.createElement('link'); hint.rel = 'preconnect'; hint.href = origin; document.head.append(hint);
  }
  function overlayChanged() {
    document.documentElement.dataset.modalOpen = String(player.open);
    document.dispatchEvent(new CustomEvent('memento:overlay-change', {detail: {open: player.open}}));
    // Page-specific surface notification; the host may opt in without impersonating Services.
    if (parent !== window) {
      try { parent.postMessage({type:'memento:levelup:surface',version:1,overlayOpen:player.open}, new URL(document.referrer).origin); } catch { /* No referrer: the Tide bridge remains available to its own negotiated host. */ }
    }
  }
  function openExperience(index, trigger, fromHistory = false) {
    if (player.open) return;
    const board = boards[index];
    connect(board); currentBoard = board; restoreFocus = trigger || cards[index]; savedScroll = window.scrollY; savedURL = location.href;
    document.getElementById('experience-title').textContent = board.title;
    for (const id of ['external-experience','fallback-link']) document.getElementById(id).href = board.url;
    document.getElementById('external-experience').setAttribute('aria-label', 'Apri ' + board.title + ' in una nuova scheda');
    fallback.hidden = true; loading.hidden = false; mount.classList.remove('is-loaded'); mount.setAttribute('aria-busy', 'true');
    const image = document.createElement('img'); image.src = cards[index].querySelector('img').currentSrc || board.image; image.alt = ''; poster.replaceChildren(image); poster.style.opacity = '.2';
    player.showModal(); overlayChanged(); document.getElementById('close-player').focus({preventScroll:true});
    if (!fromHistory) history.pushState({...history.state, mementoExperience:board.id, mementoOwner:true}, '', '#esperienza/' + board.id);
    const frame = document.createElement('iframe'); frame.title = board.title + ' — esperienza interattiva';
    frame.allow = 'fullscreen; autoplay'; frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.addEventListener('load', () => {
      if (!player.open || !frame.isConnected) return;
      clearTimeout(loadTimer); mount.classList.add('is-loaded'); mount.setAttribute('aria-busy', 'false'); loading.hidden = true; fallback.hidden = true; poster.style.opacity = '0';
    }, {once:true});
    frame.src = board.url; mount.replaceChildren(frame);
    loadTimer = setTimeout(() => { if (player.open && !mount.classList.contains('is-loaded')) { loading.hidden = true; fallback.hidden = false; } }, 12000);
  }
  function closeExperience(fromHistory = false) {
    if (!player.open) return;
    clearTimeout(loadTimer); player.close(); mount.replaceChildren(); poster.replaceChildren(); mount.removeAttribute('aria-busy'); currentBoard = null;
    overlayChanged(); window.scrollTo({top:savedScroll,behavior:'instant'}); restoreFocus?.focus({preventScroll:true});
    if (!fromHistory) {
      if (history.state?.mementoOwner) { returningFocus = true; history.back(); }
      else history.replaceState(null, '', savedURL.split('#')[0]);
    }
  }
  document.getElementById('close-player').addEventListener('click', () => closeExperience());
  player.addEventListener('cancel', e => { e.preventDefault(); closeExperience(); });
  let outsideDown = null;
  player.addEventListener('pointerdown', e => { outsideDown = e.target === player ? {x:e.clientX,y:e.clientY} : null; });
  player.addEventListener('pointerup', e => {
    if (outsideDown && e.target === player && Math.hypot(e.clientX - outsideDown.x, e.clientY - outsideDown.y) <= 8) closeExperience();
    outsideDown = null;
  });
  player.addEventListener('pointercancel', () => { outsideDown = null; });
  function fromURL() {
    let id = null;
    try { if (location.hash.startsWith('#esperienza/')) id = decodeURIComponent(location.hash.slice(12)); } catch { /* An invalid incoming fragment is not an experience. */ }
    const index = boards.findIndex(board => board.id === id);
    if (player.open && currentBoard?.id !== id) closeExperience(true);
    if (index >= 0 && !player.open) { carousel.select(index); openExperience(index, cards[index], true); }
    if (returningFocus && !player.open) {
      returningFocus = false;
      requestAnimationFrame(() => { window.scrollTo({top:savedScroll,behavior:'instant'}); restoreFocus?.focus({preventScroll:true}); });
    }
  }
  addEventListener('popstate', fromURL);
  addEventListener('hashchange', fromURL);
  addEventListener('message', event => {
    if (event.source !== parent || parent === window) return;
    let origin; try { origin = new URL(document.referrer).origin; } catch { return; }
    if (event.origin === origin && event.data?.type === 'memento:levelup:request-surface') overlayChanged();
  });
  document.fonts.ready.then(() => { carousel.measure(); window.MementoSmooth?.refresh(); });
  window.MementoSmooth?.refresh();
  fromURL();
})();
