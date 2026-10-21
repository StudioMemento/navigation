(() => {
  'use strict';
  const boards = window.MEMENTO_BOARDS;
  const geometry = window.MEMENTO_GEOMETRY;
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
  const curve = 'cubic-bezier(.2,.8,.2,1)';
  const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 5 7 7-7 7"/></svg>';
  let index = 0, cardWidth = 840, cardHeight = 396;
  let gesture = null, ignoreClickUntil = 0, loadTimer = 0;
  let restoreFocus = null, closing = false;

  // A projective texture preserves the original campaign screen when a
  // WebGL demo has no standalone hero asset. No screenshot of the UI is needed.
  function homography(from, to) {
    const rows = [];
    for (let i = 0; i < 4; i++) {
      const [x,y] = from[i], [u,v] = to[i];
      rows.push([x,y,1,0,0,0,-u*x,-u*y,u]);
      rows.push([0,0,0,x,y,1,-v*x,-v*y,v]);
    }
    for (let col = 0; col < 8; col++) {
      let pivot = col;
      for (let r = col + 1; r < 8; r++) if (Math.abs(rows[r][col]) > Math.abs(rows[pivot][col])) pivot = r;
      [rows[col],rows[pivot]] = [rows[pivot],rows[col]];
      const value = rows[col][col];
      for (let c = col; c < 9; c++) rows[col][c] /= value;
      for (let r = 0; r < 8; r++) {
        if (r === col) continue;
        const factor = rows[r][col];
        for (let c = col; c < 9; c++) rows[r][c] -= factor * rows[col][c];
      }
    }
    return rows.map(row => row[8]).concat(1);
  }
  function projectImage(board) {
    const surface = document.createElement('span');
    surface.className = 'flat-art';
    const img = document.createElement('img');
    img.className = 'projected-image';
    img.src = 'assets/boards/' + board.id + '.webp';
    img.alt = '';
    img.draggable = false;
    img.width = 941; img.height = 1672;
    const h = homography(geometry[board.id].front,[[0,0],[800,0],[800,500],[0,500]]);
    img.style.transform = 'matrix3d(' + [h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,h[8]].join(',') + ')';
    surface.append(img);
    return surface;
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
    if (board.image) {
      const img = document.createElement('img');
      img.src = board.image; img.alt = ''; img.draggable = false; img.decoding = 'async';
      if (i === 0) img.fetchPriority = 'high';
      else img.loading = 'lazy';
      art.append(img);
    } else art.append(projectImage(board));
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
      const near = level <= 2;
      card.classList.toggle('is-current',active);
      card.classList.toggle('is-near',level <= 1);
      card.style.setProperty('--shift', side * cardWidth * (level === 1 ? .61 : .9 + (level - 2) * .1) + 'px');
      card.style.setProperty('--depth', active ? '0px' : (level === 1 ? '-180px' : '-300px'));
      card.style.setProperty('--turn', -side * (level === 1 ? 13 : 18) + 'deg');
      card.style.setProperty('--scale', active ? '1' : level === 1 ? '.87' : '.74');
      card.style.setProperty('--opacity', near ? '1' : '0');
      card.style.setProperty('--brightness', active ? '1' : level === 1 ? '.29' : '.13');
      card.style.setProperty('--layer', String(10 - level));
      card.style.visibility = near ? 'visible' : 'hidden';
      card.tabIndex = active ? 0 : -1;
      card.setAttribute('aria-hidden', String(!active));
      dots[i].setAttribute('aria-current', String(active));
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
    const ratio = compact.matches ? .96 : 2.12;
    cardWidth = Math.floor(Math.min(stage.clientWidth * (compact.matches ? .88 : .74),1120,stage.clientHeight * .94 * ratio));
    cardHeight = Math.round(cardWidth / ratio);
    app.style.setProperty('--card-width',cardWidth + 'px');
    app.style.setProperty('--card-height',cardHeight + 'px');
    const artWidth = cardWidth * (compact.matches ? 1 : .67);
    const artHeight = cardHeight * (compact.matches ? .76 : 1);
    app.style.setProperty('--flat-scale', String(Math.max(artWidth / 800,artHeight / 500) * 1.1));
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
  // Swiping is optional; arrows and direct navigation work without scrolling.
  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0 || player.open || contact.open) return;
    gesture = {x:event.clientX,y:event.clientY,id:event.pointerId,dragging:false};
  });
  stage.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      gesture.dragging = true;
      stage.setPointerCapture(event.pointerId);
    }
  });
  window.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (gesture.dragging) {
      ignoreClickUntil = performance.now() + 450;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) go(index + (dx < 0 ? 1 : -1));
    }
    gesture = null;
  });
  stage.addEventListener('pointercancel', () => {gesture = null;});

  function animate(element, frames, options) {
    if (reducedMotion.matches) return Promise.resolve();
    return element.animate(frames,options).finished.catch(() => {});
  }
  function enterModal(modal, trigger) {
    restoreFocus = trigger;
    const from = trigger?.getBoundingClientRect();
    modal.showModal();
    const to = modal.getBoundingClientRect();
    const start = modal === player && from ? 'translate(' + (from.left + from.width/2 - to.left - to.width/2) + 'px,' + (from.top + from.height/2 - to.top - to.height/2) + 'px) scale(' + Math.max(.45,Math.min(from.width/to.width,.92)) + ')' : 'translateY(20px) scale(.97)';
    animate(modal,[{opacity:0,transform:start},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:600,easing:curve});
  }
  function openExperience(board, trigger) {
    document.getElementById('experience-title').textContent = board.title;
    document.getElementById('external-experience').href = board.url;
    fallback.href = board.url;
    fallback.hidden = true; loading.hidden = false;
    mount.classList.remove('is-loaded');
    mount.setAttribute('aria-busy','true');
    const image = document.createElement('img');
    image.src = board.image || 'assets/boards/' + board.id + '.webp';
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
    await animate(modal,[{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(12px) scale(.98)'}],{duration:220,easing:'ease-in',fill:'forwards'});
    modal.close();
    modal.getAnimations().forEach(animation => animation.cancel());
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
  document.getElementById('player-contact').addEventListener('click', async () => {
    if (closing) return;
    const origin = restoreFocus;
    await closeModal(player,false);
    enterModal(contact,origin);
  });
  [player,contact].forEach(modal => {
    modal.addEventListener('cancel', event => {event.preventDefault();closeModal(modal);});
    modal.addEventListener('click', event => {
      if (event.target !== modal) return;
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
