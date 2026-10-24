(() => {
  'use strict';
  const boards = window.MEMENTO_BOARDS;
  const app = document.getElementById('showcase');
  const stage = document.getElementById('stage');
  const slides = document.getElementById('slides');
  const pagination = document.getElementById('pagination');
  const announcement = document.getElementById('slide-announcement');
  const player = document.getElementById('experience-dialog');
  const contact = document.getElementById('contact-dialog');
  const mount = document.getElementById('frame-mount');
  const poster = document.getElementById('player-poster');
  const loading = document.getElementById('frame-loading');
  const fallback = document.getElementById('load-fallback');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 640px)');
  const portrait = matchMedia('(orientation: portrait) and (max-width: 1024px)');
  const curve = 'cubic-bezier(.2,.8,.2,1)';
  const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 5 7 7-7 7"/></svg>';
  let index = 0, cardWidth = 840, cardHeight = 396;
  let gesture = null, ignoreClickUntil = 0, loadTimer = 0, dragFrame = 0;
  let restoreFocus = null, closing = false;
  const images = [], connectedOrigins = new Set();

  function connectDemo(board) {
    const origin = new URL(board.url).origin;
    if (connectedOrigins.has(origin)) return;
    connectedOrigins.add(origin);
    const hint = document.createElement('link');
    hint.rel = 'preconnect'; hint.href = origin;
    document.head.append(hint);
  }

  const cards = boards.map((board, i) => {
    const card = document.createElement('button');
    card.className = 'preview-card';
    card.type = 'button';
    card.dataset.board = board.id;
    card.setAttribute('aria-label', 'Apri l’esperienza ' + board.title);
    const face = document.createElement('span');
    face.className = 'card-face';
    const art = document.createElement('span');
    art.className = 'card-art';
    art.setAttribute('aria-hidden','true');
    {
      const img = document.createElement('img');
      img.alt = ''; img.draggable = false; img.decoding = 'async';
      img.width = board.width; img.height = board.height;
      img.fetchPriority = i === 0 ? 'high' : 'low';
      images.push(img);
      art.append(img);
    }
    const copy = document.createElement('span');
    copy.className = 'card-copy';
    const title = document.createElement('span');
    title.className = 'card-title amber-type';
    for (const line of board.lines) {
      const row = document.createElement('span');
      row.textContent = line;
      title.append(row);
    }
    const explore = document.createElement('span');
    explore.className = 'explore';
    explore.innerHTML = '<span>Esplora</span>' + chevron;
    copy.append(title, explore);
    face.append(art,copy);
    card.append(face);
    card.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') connectDemo(board);
    });
    card.addEventListener('focus', () => connectDemo(board));
    card.addEventListener('click', () => {
      if (performance.now() < ignoreClickUntil || player.open || contact.open) return;
      go(i);
      openExperience(board, card);
    });
    slides.append(card);
    return card;
  });
  const dots = boards.map((board,i) => {
    const dot = document.createElement('button');
    dot.className = 'dot'; dot.type = 'button';
    dot.dataset.title = board.title;
    dot.setAttribute('aria-label','Mostra ' + board.title + ', ' + (i + 1) + ' di ' + boards.length);
    dot.addEventListener('click', () => go(i));
    pagination.append(dot);
    return dot;
  });
  function distance(i) {
    let offset = i - index;
    if (offset > boards.length / 2) offset -= boards.length;
    if (offset < -boards.length / 2) offset += boards.length;
    return offset;
  }
  function positionCards() {
    cards.forEach((card, i) => {
      const offset = distance(i), level = Math.abs(offset), side = Math.sign(offset);
      const active = level === 0;
      const near = level <= 1;
      card.classList.toggle('is-current',active);
      card.classList.toggle('is-near',level <= 1);
      card.style.setProperty('--shift', side * cardWidth * (level === 1 ? .61 : .9 + (level - 2) * .1) + 'px');
      card.style.setProperty('--depth', active ? '0px' : (level === 1 ? '-180px' : '-300px'));
      card.style.setProperty('--turn', -side * (level === 1 ? 13 : 18) + 'deg');
      card.style.setProperty('--scale', active ? '1' : level === 1 ? '.87' : '.74');
      card.style.setProperty('--opacity', near ? '1' : '0');
      card.style.setProperty('--brightness', active ? '1' : level === 1 ? '.42' : '.17');
      card.style.setProperty('--layer', String(10 - level));
      card.style.visibility = near ? 'visible' : 'hidden';
      card.tabIndex = active ? 0 : -1;
      card.setAttribute('aria-hidden', String(!active));
      dots[i].setAttribute('aria-current', String(active));
      if (near) {
        const img = images[i];
        // Layout size, not screen width, selects the right WebP for this composition.
        img.sizes = Math.ceil(img.clientWidth || cardWidth) + 'px';
        img.fetchPriority = active ? 'high' : 'low';
        if (!img.hasAttribute('src')) {
          img.srcset = boards[i].srcset;
          img.src = boards[i].image;
        }
      }
    });
  }
  function go(next) {
    if (player.open || contact.open) return;
    const moveFocus = cards.includes(document.activeElement);
    index = (next + boards.length) % boards.length;
    positionCards();
    if (moveFocus) cards[index].focus({preventScroll:true});
    announcement.textContent = boards[index].title + ', esperienza ' + (index + 1) + ' di ' + boards.length;
  }
  function resize() {
    cancelGesture();
    const tall = portrait.matches;
    const ratio = tall ? (compact.matches ? (app.clientHeight < 700 ? .96 : .84) : 1.08) : (app.clientHeight < 480 ? 2.5 : 2.12);
    cardWidth = Math.max(180,Math.floor(Math.min(stage.clientWidth * (tall ? .88 : .74),1120,stage.clientHeight * .96 * ratio)));
    cardHeight = Math.round(cardWidth / ratio);
    app.style.setProperty('--card-width',cardWidth + 'px');
    app.style.setProperty('--card-height',cardHeight + 'px');
    positionCards();
  }
  new ResizeObserver(resize).observe(stage);
  document.getElementById('previous').addEventListener('click', () => go(index - 1));
  document.getElementById('next').addEventListener('click', () => go(index + 1));
  window.addEventListener('keydown', event => {
    if (player.open || contact.open || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight') {event.preventDefault(); go(index + 1);}
    if (event.key === 'ArrowLeft') {event.preventDefault(); go(index - 1);}
    if (event.key === 'Home') {event.preventDefault(); go(0);}
    if (event.key === 'End') {event.preventDefault(); go(boards.length - 1);}
  });
  // One pointer model covers finger, pen and mouse. Two fingers remain native pinch-zoom.
  function cancelGesture() {
    const previous = gesture;
    gesture = null;
    if (previous?.dragging) ignoreClickUntil = performance.now() + 350;
    if (previous && app.hasPointerCapture(previous.id)) app.releasePointerCapture(previous.id);
    cancelAnimationFrame(dragFrame); dragFrame = 0;
    app.classList.remove('is-dragging');
    slides.style.removeProperty('--drag-x');
    slides.style.removeProperty('--drag-y');
  }
  function renderDrag() {
    dragFrame = 0;
    if (!gesture?.dragging || reducedMotion.matches) return;
    const cap = cardWidth * .3;
    const movement = Math.max(-cap,Math.min(cap,gesture.travel * .42));
    slides.style.setProperty('--drag-x', (gesture.axis === 'x' ? movement : 0) + 'px');
    slides.style.setProperty('--drag-y', (gesture.axis === 'y' ? movement * .55 : 0) + 'px');
  }
  app.addEventListener('pointerdown', event => {
    if (!event.isPrimary) {cancelGesture();return;}
    if (event.button !== 0 || player.open || contact.open || closing) return;
    if (event.target.closest('.gallery-nav,.contact-invite,a,input,textarea')) return;
    gesture = {x:event.clientX,y:event.clientY,id:event.pointerId,axis:null,travel:0,velocity:0,lastTime:performance.now(),dragging:false};
  });
  app.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.axis && Math.max(Math.abs(dx),Math.abs(dy)) > 10) {
      gesture.axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
      gesture.dragging = true;
      app.setPointerCapture(event.pointerId);
      app.classList.add('is-dragging');
    }
    if (!gesture.dragging) return;
    const now = performance.now(), travel = gesture.axis === 'x' ? dx : dy;
    const dt = now - gesture.lastTime;
    if (dt > 0) gesture.velocity = (travel - gesture.travel) / dt;
    gesture.travel = travel; gesture.lastTime = now;
    if (!dragFrame) dragFrame = requestAnimationFrame(renderDrag);
  });
  window.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const current = gesture;
    const travel = current.axis === 'x' ? event.clientX - current.x : event.clientY - current.y;
    const threshold = Math.max(32,Math.min(80,cardWidth * .13));
    const flick = Math.abs(travel) > 18 && Math.abs(current.velocity) > .45 && performance.now() - current.lastTime < 100;
    const advance = current.dragging && (Math.abs(travel) >= threshold || flick);
    cancelGesture();
    if (advance) go(index + (travel < 0 ? 1 : -1));
  });
  app.addEventListener('pointercancel',cancelGesture);
  app.addEventListener('lostpointercapture', () => {if (gesture) cancelGesture();});
  app.addEventListener('click', event => {
    if (performance.now() < ignoreClickUntil) {event.preventDefault();event.stopPropagation();}
  },true);
  window.addEventListener('blur',cancelGesture);
  document.addEventListener('visibilitychange', () => {if (document.hidden) cancelGesture();});

  function animate(element, frames, options) {
    if (reducedMotion.matches) return Promise.resolve();
    return element.animate(frames,options).finished.catch(() => {});
  }
  function enterModal(modal, trigger) {
    cancelGesture();
    restoreFocus = trigger;
    const from = trigger?.getBoundingClientRect();
    modal.showModal();
    const surface = modal === player ? document.getElementById('player-frame') : modal;
    const to = surface.getBoundingClientRect();
    const start = modal === player && from ? 'translate(' + (from.left + from.width/2 - to.left - to.width/2) + 'px,' + (from.top + from.height/2 - to.top - to.height/2) + 'px) scale(' + Math.max(.45,Math.min(from.width/to.width,.92)) + ')' : 'translateY(20px) scale(.97)';
    animate(surface,[{opacity:0,transform:start},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:600,easing:curve});
  }
  function openExperience(board, trigger) {
    connectDemo(board);
    document.getElementById('experience-title').textContent = board.title;
    fallback.href = board.url;
    fallback.hidden = true; loading.hidden = false;
    mount.classList.remove('is-loaded');
    mount.setAttribute('aria-busy','true');
    const image = document.createElement('img');
    image.src = images[boards.indexOf(board)].currentSrc || board.image;
    image.alt = '';
    poster.replaceChildren(image); poster.style.opacity = '.3';
    enterModal(player,trigger);
    const frame = document.createElement('iframe');
    frame.title = board.title + ' — esperienza interattiva';
    frame.allow = 'fullscreen; autoplay; clipboard-write; gyroscope; accelerometer';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.addEventListener('load', () => {
      if (!player.open || !frame.isConnected) return;
      clearTimeout(loadTimer);
      mount.classList.add('is-loaded');
      mount.setAttribute('aria-busy','false');
      loading.hidden = true; fallback.hidden = true; poster.style.opacity = '0';
    }, {once:true});
    frame.src = board.url;
    mount.replaceChildren(frame);
    loadTimer = setTimeout(() => {
      if (player.open && !mount.classList.contains('is-loaded')) fallback.hidden = false;
    },12000);
  }
  async function closeModal(modal, focus = true) {
    if (!modal.open || closing) return;
    closing = true;
    const surface = modal === player ? document.getElementById('player-frame') : modal;
    await animate(surface,[{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(12px) scale(.98)'}],{duration:220,easing:'ease-in',fill:'forwards'});
    modal.close();
    surface.getAnimations().forEach(animation => animation.cancel());
    if (modal === player) {
      clearTimeout(loadTimer);
      mount.replaceChildren(); poster.replaceChildren(); mount.classList.remove('is-loaded');
      mount.removeAttribute('aria-busy');
    }
    closing = false;
    if (focus && restoreFocus?.isConnected) restoreFocus.focus({preventScroll:true});
  }
  document.getElementById('close-player').addEventListener('click', () => closeModal(player));
  document.getElementById('close-contact').addEventListener('click', () => closeModal(contact));
  document.getElementById('contact-cta').addEventListener('click', event => enterModal(contact,event.currentTarget));
  [player,contact].forEach(modal => {
    modal.addEventListener('cancel', event => {event.preventDefault();closeModal(modal);});
    modal.addEventListener('click', event => {
      if (event.target !== modal) return;
      if (modal === player) {closeModal(player);return;}
      const box = modal.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeModal(modal);
    });
  });
  document.getElementById('contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const body = 'Nome: ' + fields.get('name') + '\nEmail: ' + fields.get('email') + (fields.get('phone') ? '\nTelefono: ' + fields.get('phone') : '') + '\n\n' + fields.get('message');
    location.href = 'mailto:info@mementostudio.it?subject=' + encodeURIComponent('Un nuovo progetto — ' + fields.get('name')) + '&body=' + encodeURIComponent(body);
    document.getElementById('form-status').textContent = 'Email preparata. Completa l’invio nella tua app di posta.';
  });
  resize();
  go(0);
  animate(cards[0],[{opacity:0,translate:'0 14px'},{opacity:1,translate:'0 0'}],{duration:850,easing:curve});
})();
