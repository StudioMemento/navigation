// R18: one scroll indicator for every native page (Servizi, Portfolio, LevelUp, Start; Studio and the Home do not
// scroll). It replaces the browser's scrollbar and the pages' own rails: a thin Memento amber thumb that fades in from
// its top end, over the page and never reserving a gutter. Drag, click on the rail and the keyboard move the page; on
// touch screens it is only a cue (the page scrolls natively, the rail takes no touch).
export function mountScrollbar() {
  const root = document.documentElement;
  if (document.querySelector('.mm-scrollbar')) return;
  const forced = matchMedia('(forced-colors: active)');
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const rail = document.createElement('div');
  rail.className = 'mm-scrollbar';
  rail.tabIndex = 0;
  rail.setAttribute('role', 'scrollbar');
  rail.setAttribute('aria-label', 'Scorri la pagina');
  rail.setAttribute('aria-orientation', 'vertical');
  rail.setAttribute('aria-valuemin', '0');
  rail.setAttribute('aria-valuemax', '100');
  rail.setAttribute('aria-valuenow', '0');
  const main = document.querySelector('main');
  if (main?.id) rail.setAttribute('aria-controls', main.id);
  const thumb = document.createElement('span');
  thumb.className = 'mm-scrollbar-thumb';
  thumb.setAttribute('aria-hidden', 'true');
  rail.append(thumb);
  document.body.append(rail);
  root.dataset.overlayScrollbar = 'true';

  let frame = 0, timer = 0, drag = null, range = 0, travel = 0, size = 40;
  const modal = () => root.hasAttribute('data-memento-modal') || !!document.querySelector('dialog[open]');
  function measure() {
    frame = 0;
    const viewport = window.innerHeight;
    const height = Math.max(root.scrollHeight, document.body.scrollHeight);
    range = Math.max(0, height - viewport);
    const track = Math.max(0, viewport - 12);
    size = clamp((track * viewport) / Math.max(viewport, height), 40, track);
    travel = Math.max(0, track - size);
    rail.hidden = range <= 1 || forced.matches || modal();
    const progress = range > 0 ? clamp(window.scrollY / range, 0, 1) : 0;
    rail.style.setProperty('--scroll-size', size.toFixed(2) + 'px');
    rail.style.setProperty('--scroll-top', (progress * travel).toFixed(2) + 'px');
    rail.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
  function scrolling() {
    schedule();
    rail.classList.add('is-scrolling');
    clearTimeout(timer);
    timer = setTimeout(() => rail.classList.remove('is-scrolling'), 900);
  }
  function jump(top) {
    window.scrollTo({ top: clamp(top, 0, range), behavior: 'instant' });
    measure();
  }
  function endDrag() {
    if (!drag) return;
    const id = drag.id;
    drag = null;
    if (rail.hasPointerCapture?.(id)) rail.releasePointerCapture(id);
    rail.classList.remove('is-dragging');
  }
  rail.addEventListener('pointerdown', event => {
    if (event.button !== 0 || rail.hidden || event.pointerType === 'touch') return;
    measure();
    const top = rail.getBoundingClientRect().top;
    const at = range ? clamp(window.scrollY / range, 0, 1) * travel : 0;
    const local = event.clientY - top;
    const inside = local >= at && local <= at + size;
    drag = { id: event.pointerId, offset: inside ? local - at : size / 2, top };
    rail.setPointerCapture?.(event.pointerId);
    rail.classList.add('is-dragging');
    if (!inside && travel) jump(((local - drag.offset) / travel) * range);
    event.preventDefault();
  });
  rail.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id || !travel) return;
    jump(((event.clientY - drag.top - drag.offset) / travel) * range);
    event.preventDefault();
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) rail.addEventListener(type, endDrag);
  window.addEventListener('blur', endDrag);
  rail.addEventListener('keydown', event => {
    measure();
    const top = window.scrollY;
    const next = { ArrowUp: top - 48, ArrowDown: top + 48, PageUp: top - innerHeight * .85, PageDown: top + innerHeight * .85, Home: 0, End: range }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    jump(next);
  });
  window.addEventListener('scroll', scrolling, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
  if ('ResizeObserver' in window) {
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    if (main) resize.observe(main);
  }
  forced.addEventListener?.('change', schedule);
  for (const type of ['memento:overlay-change', 'memento:surface-visibility']) document.addEventListener(type, () => { endDrag(); measure(); });
  document.addEventListener('toggle', event => { if (event.target instanceof HTMLDialogElement) { endDrag(); measure(); } }, true);
  // R24: the first measure waits for the browser's own layout (the observer reports it, or the next frame): read here,
  // while the page was still booting, it forced a layout of the whole page (85 ms on a phone)
  rail.hidden = true;
  schedule();
}
