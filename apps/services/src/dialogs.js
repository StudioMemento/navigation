import { catalogue } from './content.js';
import { detail as renderDetail } from './render.js';
import { Carousel, bindDots } from './carousel.js';

class DetailDeck {
  constructor(element) {
    this.controller = new AbortController();
    const status = element.querySelector('.service-deck-status');
    this.scenes = [...element.querySelectorAll('.service-scene')];
    this.carousel = new Carousel(element.querySelector('.popup-carousel'), {
      interactiveContents: true,
      onSettle: (index) => {
        update(index);
        status.textContent = this.scenes[index].getAttribute('aria-label');
        const focused = document.activeElement?.closest('.service-scene');
        if (focused && focused !== this.scenes[index])
          this.scenes[index].focus({ preventScroll: true });
      },
    });
    const update = bindDots(element.querySelector('.service-deck-controls'), this.carousel, {
      attribute: 'scene-dot',
      signal: this.controller.signal,
    });
    status.textContent = this.scenes[0].getAttribute('aria-label');
  }
  show(index) {
    this.carousel.select(index);
  }
  destroy() {
    this.controller.abort();
    this.carousel.destroy();
  }
}

export function createDialogs(bundleCarousel) {
  const $ = (selector) => document.querySelector(selector);
  const detail = $('#detail-dialog'),
    lead = $('#lead-dialog');
  const byId = new Map(
    [...catalogue.services, ...catalogue.bundles].map((item) => [item.id, item]),
  );
  const sections = catalogue.categories,
    bundles = catalogue.bundles;
  let serviceDeck = null,
    currentDetail = null,
    parentBundle = null;
  let returnScroll = 0,
    returnHash = '#inizio',
    focusReturn = null,
    leadContext = '',
    draft = '';
  const pageRoot = document.documentElement;
  const catalogueShell = $('#catalogue-shell');
  let lockedScroll = null,
    lockedX = 0,
    shellHeight = '',
    viewportFrame = 0;
  function syncVisualViewport() {
    viewportFrame = 0;
    const view = window.visualViewport;
    if (lockedScroll === null) return;
    // Browser pinch zoom owns its viewport; only follow keyboard/toolbar resizing at 1×.
    if (view && Math.abs(view.scale - 1) > 0.01) return;
    // Embedded pages use their own layout viewport. During an iframe resize,
    // visualViewport can report the previous height until a later paint.
    const embedded = window !== window.top;
    const height = Math.round(embedded || !view ? window.innerHeight : view.height);
    const top = Math.round(embedded || !view ? 0 : view.offsetTop);
    [detail, lead].forEach((dialog) => {
      for (const [name, value] of [
        ['--dialog-height', height + 'px'],
        ['--dialog-top', top + 'px'],
      ]) {
        if (dialog.style.getPropertyValue(name) !== value) dialog.style.setProperty(name, value);
      }
    });
  }
  const scheduleViewport = () => {
    if (lockedScroll !== null && !viewportFrame)
      viewportFrame = requestAnimationFrame(syncVisualViewport);
  };
  window.addEventListener('resize', scheduleViewport, { passive: true });
  window.visualViewport?.addEventListener('resize', scheduleViewport, { passive: true });
  window.visualViewport?.addEventListener('scroll', scheduleViewport, { passive: true });
  function lockBody(open = detail.open || lead.open, announce = true) {
    if (open && lockedScroll === null) {
      lockedScroll = window.scrollY;
      lockedX = window.scrollX;
      shellHeight = catalogueShell.style.height;
      // Preserve document height and scroll position. Only the viewport-sized
      // catalogue surface is frozen; body and the native top layer never move.
      catalogueShell.style.height = catalogueShell.getBoundingClientRect().height + 'px';
      pageRoot.style.setProperty('--catalogue-scroll-y', -lockedScroll + 'px');
      pageRoot.dataset.overlayOpen = 'true';
    } else if (!open && lockedScroll !== null) {
      const y = lockedScroll;
      lockedScroll = null;
      cancelAnimationFrame(viewportFrame);
      viewportFrame = 0;
      pageRoot.dataset.overlayOpen = 'false';
      pageRoot.style.removeProperty('--catalogue-scroll-y');
      catalogueShell.style.height = shellHeight;
      window.scrollTo({ left: lockedX, top: y, behavior: 'instant' });
      [detail, lead].forEach((dialog) => {
        dialog.style.removeProperty('--dialog-height');
        dialog.style.removeProperty('--dialog-top');
      });
    }
    syncVisualViewport();
    if (announce) document.dispatchEvent(new Event('memento:overlay-change'));
  }
  function setHash(hash) {
    history.replaceState(null, '', hash);
  }
  function restoreFocus() {
    if (focusReturn?.isConnected) focusReturn.focus({ preventScroll: true });
  }
  function rememberOrigin() {
    if (!detail.open && !lead.open) {
      focusReturn = document.activeElement;
      returnScroll = window.scrollY;
      const [prefix, id] = location.hash.slice(1).split('/');
      const legacySection =
        { stampa: 'design', grafica: 'design', fotografia: 'visual', rd: 'design' }[prefix] ||
        prefix;
      returnHash = /^#(servizio|bundle|levelup)(\/|$)/.test(location.hash)
        ? '#inizio'
        : byId.has(id) || id === 'levelup'
          ? '#' + legacySection
          : location.hash || '#inizio';
    }
  }
  function openDetail(item, { fromBundle = null } = {}) {
    if (!item) return;
    rememberOrigin();
    // Lock before showModal() can focus a control or change the viewport.
    lockBody(true, false);
    if (lead.open) lead.close();
    serviceDeck?.destroy();
    serviceDeck = null;
    currentDetail = item;
    parentBundle = fromBundle;
    detail.dataset.kind = item.kind;
    detail.classList.add('has-item-master');
    $('#detail-content').innerHTML = renderDetail(item, parentBundle);
    if (!detail.open) detail.showModal();
    lockBody();
    detail.scrollTop = 0;
    setHash(`#${item.kind === 'bundle' ? 'bundle' : 'servizio'}/${item.id}`);
    serviceDeck = new DetailDeck(detail.querySelector('.service-deck'));
    $('#detail-title').focus({ preventScroll: true });
  }
  function closeDetail(restore = true, updateRoute = true) {
    serviceDeck?.destroy();
    serviceDeck = null;
    detail.close();
    currentDetail = null;
    parentBundle = null;
    lockBody();
    if (updateRoute) setHash(returnHash);
    if (restore) {
      if (Math.abs(window.scrollY - returnScroll) > 1)
        window.scrollTo({ top: returnScroll, behavior: 'instant' });
      restoreFocus();
    }
  }
  function openLead(context = '') {
    rememberOrigin();
    lockBody(true, false);
    if (detail.open) {
      serviceDeck?.destroy();
      serviceDeck = null;
      detail.close();
      currentDetail = null;
      parentBundle = null;
    }
    leadContext = context;
    $('#lead-context').hidden = !context;
    $('#lead-context').textContent = context ? `Ti interessa: ${context}` : '';
    $('#lead-form').hidden = false;
    $('#lead-result').hidden = true;
    if (!lead.open) lead.showModal();
    lockBody();
    lead.scrollTop = 0;
    setHash('#levelup');
    $('#lead-goal').focus({ preventScroll: true });
  }
  function closeLead(updateRoute = true) {
    lead.close();
    lockBody();
    if (updateRoute) setHash(returnHash);
    restoreFocus();
  }
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    const target = event.target.closest(
      'button, a[data-bundle], a[data-service], a[data-related], a[data-component], a[data-back-bundle], a[data-action]',
    );
    if (!target) return;
    if (target.tagName === 'A') {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
    }
    if (target.dataset.bundle) {
      openDetail(byId.get(target.dataset.bundle));
      return;
    }
    if (target.dataset.service) {
      openDetail(byId.get(target.dataset.service));
      return;
    }
    if (target.dataset.related) {
      openDetail(byId.get(target.dataset.related));
      return;
    }
    if (target.dataset.component) {
      openDetail(byId.get(target.dataset.component), { fromBundle: currentDetail });
      return;
    }
    if (target.dataset.backBundle) {
      openDetail(byId.get(target.dataset.backBundle));
      serviceDeck.show(1);
      return;
    }
    const action = target.dataset.action;
    if (action === 'close-detail') closeDetail();
    if (action === 'close-lead') closeLead();
    if (action === 'levelup') openLead();
    if (action === 'project') openLead(currentDetail ? currentDetail.title : '');
  });
  detail.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDetail();
  });
  lead.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeLead();
  });
  // A swipe leaving the card must never turn into a backdrop click.
  let backdropPress = null;
  const popupSurface = (target) =>
    target.closest(
      '.carousel-card, .service-deck-controls, .service-deck-topline a, .dialog-close',
    );
  detail.addEventListener(
    'pointerdown',
    (event) => {
      if (event.isPrimary === false || event.button !== 0) {
        backdropPress = null;
        return;
      }
      backdropPress = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        outside: !popupSurface(event.target),
        moved: false,
      };
    },
    true,
  );
  const trackBackdropPress = (event) => {
    if (
      backdropPress?.id === event.pointerId &&
      Math.hypot(event.clientX - backdropPress.x, event.clientY - backdropPress.y) > 8
    )
      backdropPress.moved = true;
  };
  detail.addEventListener('pointermove', trackBackdropPress, true);
  detail.addEventListener('pointerup', trackBackdropPress, true);
  detail.addEventListener(
    'pointercancel',
    () => {
      backdropPress = null;
    },
    true,
  );
  detail.addEventListener('click', (event) => {
    const press = backdropPress;
    backdropPress = null;
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      popupSurface(event.target)
    )
      return;
    if (press?.outside && !press.moved) closeDetail();
  });
  lead.addEventListener('click', (event) => {
    if (event.target !== lead) return;
    const rect = lead.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      closeLead();
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
      $('#copy-request').textContent = 'Seleziona e copia il testo qui sotto';
      const selection = getSelection();
      selection.removeAllRanges();
      const range = document.createRange();
      range.selectNodeContents($('#request-preview'));
      selection.addRange(range);
    }
  });
  function route() {
    const [prefix, id] = location.hash.slice(1).split('/');
    if (
      (prefix === 'servizio' ||
        prefix === 'bundle' ||
        sections.some((section) => section.id === prefix) ||
        ['stampa', 'grafica', 'fotografia'].includes(prefix)) &&
      byId.has(id)
    ) {
      openDetail(byId.get(id));
      return;
    }
    if (prefix === 'levelup' || id === 'levelup') {
      openLead();
      return;
    }
    if (detail.open) closeDetail(false, false);
    if (lead.open) closeLead(false);
    const bundleIndex = bundles.findIndex((item) => prefix === 'percorso-' + item.id);
    if (bundleIndex >= 0) {
      bundleCarousel.select(bundleIndex);
      bundleCarousel.finish();
      $('#bundles').scrollIntoView({ behavior: 'auto', block: 'start' });
      return;
    }
    const alias = { stampa: 'design', grafica: 'design', fotografia: 'visual', rd: 'design' }[
      prefix
    ];
    if (alias) {
      setHash('#' + alias);
      $('#' + alias).scrollIntoView({ behavior: 'instant' });
    }
  }

  window.addEventListener('hashchange', route);
  return Object.freeze({ open: openDetail, route });
}
