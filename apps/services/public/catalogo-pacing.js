/* Eased chapters, centred bundle boards and catalogue compositions with continuous section navigation. */
class MementoPacing {
  constructor(root, carousels) {
    this.root = root;
    this.carousels = carousels;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.pointer = null;
    this.raf = 0;
    this.suppressUntil = 0;
    this.wheel = {x: 0, y: 0, locked: false};
    root.classList.add('pacing-ready');
    document.addEventListener('pointerdown', event => this.down(event));
    document.addEventListener('pointermove', event => this.move(event), {passive: false});
    document.addEventListener('pointerup', event => this.up(event));
    document.addEventListener('pointercancel', event => this.up(event, true));
    document.addEventListener('click', event => {
      if (performance.now() < this.suppressUntil && root.contains(event.target)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    document.addEventListener('wheel', event => this.onWheel(event), {passive: false});
    document.addEventListener('keydown', event => this.onKey(event));
    document.addEventListener('memento:overlay-change', () => {
      if (document.querySelector('dialog[open]')) { this.cancelPointer(); this.stop(); }
    });
    this.rail = document.createElement('nav');
    this.rail.className = 'checkpoint-rail';
    this.rail.setAttribute('aria-label', 'Navigazione sezioni');
    this.railList = document.createElement('div');
    this.railList.className = 'checkpoint-list';
    this.railCursor = document.createElement('span');
    this.railCursor.className = 'checkpoint-cursor';
    this.railCursor.setAttribute('aria-hidden', 'true');
    this.rail.append(this.railList, this.railCursor);
    document.body.append(this.rail);
    this.rail.addEventListener('click', event => {
      const link = event.target.closest('[data-checkpoint]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || document.querySelector('dialog[open]')) return;
      event.preventDefault();
      this.navigateCheckpoint(Number(link.dataset.checkpoint));
    });
    this.rail.addEventListener('keydown', event => {
      const link = event.target.closest('[data-checkpoint]');
      if (!link || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const current = Number(link.dataset.checkpoint);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? this.railPoints.length - 1 : Math.max(0, Math.min(this.railPoints.length - 1, current + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1)));
      this.railLinks[next].focus({preventScroll: true});
      this.navigateCheckpoint(next);
    });
    window.addEventListener('resize', () => { this.stop(); this.rebuildRail(); });
    document.addEventListener('memento:catalogue-change', () => { this.stop(); this.rebuildRail(); });
    window.addEventListener('scroll', () => {
      if (this.railFrame) return;
      this.railFrame = requestAnimationFrame(() => { this.railFrame = 0; this.updateRail(); });
    }, {passive: true});
    this.rebuildRail();
    this.geometryObserver = new ResizeObserver(() => this.rebuildRail());
    this.geometryObserver.observe(root);
    document.fonts?.ready.then(() => this.rebuildRail());
  }
  blocked(target) {
    return document.querySelector('dialog[open]') || (window.visualViewport?.scale || 1) > 1.01 ||
      target.closest('input, textarea, select, [contenteditable="true"], dialog') || (!this.root.contains(target) && target !== document.body && target !== document.documentElement);
  }
  maxScroll() { return Math.max(0, document.documentElement.scrollHeight - innerHeight); }
  checkpoints() {
    const points = [];
    const add = (y, label, id) => points.push({y: Math.round(Math.max(0, Math.min(this.maxScroll(), y))), label, id});
    for (const scene of this.root.querySelectorAll('[data-scene], [data-free-scroll], [data-catalogue-scroll]')) {
      if (scene.parentElement?.closest('[data-free-scroll]')) continue;
      const rect = scene.getBoundingClientRect();
      const top = rect.top + scrollY;
      const label = scene.querySelector('h2, h3')?.textContent || scene.getAttribute('aria-label') || '';
      if (scene.matches('[data-catalogue-scroll]')) {
        const pages = [...scene.querySelectorAll('[data-catalogue-page]')];
        pages.forEach((page, index) => {
          const box = page.getBoundingClientRect(), y = box.top + scrollY;
          const name = 'Catalogo · ' + (page.dataset.medium === 'physical' ? 'Fisico' : 'Digitale') + ' · ' + (index + 1);
          add(y - Math.max(0, (innerHeight - box.height) / 2), name, page.id);
          if (box.height > innerHeight + 24) add(y + box.height - innerHeight, name, page.id);
        });
        if (!pages.length) add(top, label, scene.id);
        continue;
      }
      const bundle = scene.closest('[data-bundle-scroll]');
      add(bundle && rect.height <= innerHeight ? top - (innerHeight - rect.height) / 2 : top, label, scene.id);
      const excess = rect.height - innerHeight;
      if (excess > 24 && !scene.matches('[data-free-scroll]')) {
        const pages = Math.ceil(excess / (innerHeight * .82));
        for (let i = 1; i <= pages; i++) add(top + excess * i / pages, label, scene.id);
      }
    }
    return [...new Map(points.map(point => [point.y, point])).values()].sort((a, b) => a.y - b.y);
  }
  stops() { return this.checkpoints().map(point => point.y); }
  rebuildRail() {
    const focusedId = document.activeElement?.closest('[data-checkpoint]')?.getAttribute('href');
    this.railPoints = this.checkpoints();
    this.railLinks = this.railPoints.map((point, index) => {
      const link = document.createElement('a');
      link.className = 'checkpoint-link';
      link.href = '#' + (point.id || 'inizio');
      link.dataset.checkpoint = String(index);
      link.setAttribute('aria-label', point.label || 'Inizio');
      link.title = point.label || 'Inizio';
      const label = document.createElement('span');
      label.className = 'checkpoint-label'; label.textContent = point.label || 'Inizio';
      label.setAttribute('aria-hidden', 'true'); link.append(label);
      return link;
    });
    this.railList.replaceChildren(...this.railLinks);
    this.rail.style.setProperty('--checkpoint-count', Math.max(1, this.railPoints.length));
    const step = this.railLinks[0]?.offsetWidth || 32;
    this.railCenters = this.railLinks.map((mark, i) => mark.offsetLeft + (mark.offsetWidth || step) / 2 || (i + .5) * step);
    this.updateRail(true);
    if (focusedId) this.railLinks.find(link => link.getAttribute('href') === focusedId)?.focus({preventScroll: true});
  }
  navigateCheckpoint(index) {
    const point = this.railPoints[index];
    if (!point) return;
    this.cancelPointer();
    clearTimeout(this.wheelTimer); this.wheel = {x: 0, y: 0, locked: false};
    this.animateTo(point.y, true);
    if (point.id) history.replaceState(null, '', '#' + point.id);
  }
  updateRail(immediate = false) {
    if (!this.railPoints.length) return;
    const nearest = this.railPoints.reduce((best, point, i) => Math.abs(point.y - scrollY) < Math.abs(this.railPoints[best].y - scrollY) ? i : best, 0);
    this.railLinks.forEach((mark, i) => {
      if (i === nearest) mark.setAttribute('aria-current', 'location'); else mark.removeAttribute('aria-current');
      mark.tabIndex = i === nearest ? 0 : -1;
    });
    let lower = this.railPoints.findLastIndex(point => point.y <= scrollY);
    lower = Math.max(0, lower);
    const upper = Math.min(lower + 1, this.railPoints.length - 1);
    const distance = this.railPoints[upper].y - this.railPoints[lower].y;
    const progress = distance ? Math.max(0, Math.min(1, (scrollY - this.railPoints[lower].y) / distance)) : 0;
    this.railTarget = this.railCenters[lower] + (this.railCenters[upper] - this.railCenters[lower]) * progress;
    if (immediate || this.reduced.matches || this.railPosition === undefined) {
      cancelAnimationFrame(this.railMotion); this.railMotion = 0;
      this.railPosition = this.railTarget; this.drawRail(); return;
    }
    if (this.railMotion) return;
    let previous = performance.now();
    const follow = now => {
      const dt = Math.min(64, Math.max(1, now - previous)); previous = now;
      this.railPosition += (this.railTarget - this.railPosition) * (1 - Math.exp(-dt / 65));
      if (Math.abs(this.railTarget - this.railPosition) < .03) { this.railPosition = this.railTarget; this.railMotion = 0; }
      else this.railMotion = requestAnimationFrame(follow);
      this.drawRail();
    };
    this.railMotion = requestAnimationFrame(follow);
  }
  drawRail() {
    // The marker stays centred; the chapter strip follows the page beneath it.
    this.railList.style.transform = 'translate3d(' + (-this.railPosition).toFixed(3) + 'px, 0, 0)';
  }
  scene(target) {
    if (target.closest('[data-catalogue-scroll], [data-free-scroll]')) return null;
    const explicit = target.closest('[data-scene]');
    if (explicit) return explicit;
    return [...this.root.querySelectorAll('[data-scene]')].find(el => {
      const box = el.getBoundingClientRect();
      return box.top <= innerHeight * .5 && box.bottom > innerHeight * .5;
    });
  }
  carouselFor(target) {
    const controls = target.closest('[data-carousel-for]');
    const player = controls ? document.getElementById(controls.dataset.carouselFor) : target.closest('.carousel');
    return this.carousels.get(player) || this.carousels.get(this.scene(target));
  }
  freeScroll(target) {
    if (target.closest('[data-free-scroll]')) return true;
    // Native momentum can continue across a boundary without waiting for a chapter lock.
    return [...this.root.querySelectorAll('[data-free-scroll]')].some(region => {
      const rect = region.getBoundingClientRect();
      return rect.top <= 2 && rect.bottom > 2;
    });
  }
  inBundles(target) {
    if (target.closest('[data-bundle-scroll]')) return true;
    if (target.closest('[data-free-scroll]')) return false;
    const region = this.root.querySelector('[data-bundle-scroll]')?.getBoundingClientRect();
    return !!region && region.top < innerHeight / 2 && region.bottom > innerHeight / 2;
  }
  inGuided(target) {
    if (this.inBundles(target) || target.closest('[data-catalogue-scroll]')) return true;
    if (target.closest('[data-free-scroll]')) return false;
    const rect = this.root.querySelector('[data-catalogue-scroll]')?.getBoundingClientRect();
    return !!rect && rect.top < innerHeight / 2 && rect.bottom > innerHeight / 2;
  }
  stop() { cancelAnimationFrame(this.raf); this.raf = 0; this.destination = null; }
  animateTo(destination, quick = false) {
    this.stop();
    const target = Math.max(0, Math.min(this.maxScroll(), destination));
    const start = scrollY;
    this.destination = target;
    if (this.reduced.matches || Math.abs(target - start) < 1) { window.scrollTo(0, target); this.updateRail(); this.destination = null; return; }
    const began = performance.now();
    const duration = quick ? Math.min(520, 340 + Math.abs(target - start) * .14) : Math.min(1050, 650 + Math.abs(target - start) * .18);
    const frame = now => {
      const t = Math.min(1, (now - began) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      window.scrollTo(0, start + (target - start) * eased);
      this.updateRail();
      this.raf = t < 1 ? requestAnimationFrame(frame) : 0;
      if (t === 1) this.destination = null;
    };
    this.raf = requestAnimationFrame(frame);
  }
  goTo(element) {
    const board = element.matches('[data-bundle-scroll]') ? element.querySelector('[data-scene]') : element;
    const rect = board.getBoundingClientRect();
    const bundle = !!board.closest('[data-bundle-scroll]');
    this.animateTo(rect.top + scrollY - (bundle ? Math.max(0, (innerHeight - rect.height) / 2) : 0), bundle);
  }
  stepBundle(direction, from = this.destination ?? scrollY) {
    const stops = this.stops();
    const nearest = stops.reduce((best, y, i) => Math.abs(y - from) < Math.abs(stops[best] - from) ? i : best, 0);
    this.animateTo(stops[Math.max(0, Math.min(stops.length - 1, nearest + direction))], true);
  }
  step(direction, from = scrollY) {
    const stops = this.stops();
    const next = direction > 0 ? stops.find(y => y > from + 10) : stops.findLast(y => y < from - 10);
    if (next !== undefined) this.animateTo(next);
    else this.animateTo(direction > 0 ? this.maxScroll() : 0);
  }
  cancelPointer() {
    const p = this.pointer;
    if (!p) return;
    this.pointer = null;
    if (p.carousel?.pointer) p.carousel.up({pointerId: p.id}, true);
    if (this.root.hasPointerCapture(p.id)) this.root.releasePointerCapture(p.id);
  }
  down(event) {
    if (event.isPrimary === false) { this.cancelPointer(); this.stop(); return; }
    if (this.pointer || this.blocked(event.target) || (event.pointerType === 'mouse' && event.button !== 0)) return;
    const bundle = this.inGuided(event.target);
    const stepOrigin = bundle ? this.destination ?? scrollY : scrollY;
    this.stop();
    const scene = this.scene(event.target);
    const carousel = this.carouselFor(event.target);
    const chapterCarousel = this.carousels.get(scene);
    if (chapterCarousel && chapterCarousel !== carousel) chapterCarousel.interact();
    this.pointer = {id: event.pointerId, x: event.clientX, y: event.clientY, lastY: event.clientY, lastT: performance.now(), velocity: 0, origin: scrollY, stepOrigin, bundle, axis: null, carousel, free: !bundle && this.freeScroll(event.target)};
    if (carousel) carousel.down(event);
  }
  move(event) {
    const p = this.pointer;
    if (!p || p.id !== event.pointerId) return;
    const dx = event.clientX - p.x, dy = event.clientY - p.y;
    if (!p.axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 10) return;
      if (Math.abs(dx) > Math.abs(dy) * 1.15) p.axis = 'x';
      else if (Math.abs(dy) > Math.abs(dx) * 1.15) p.axis = 'y';
      else return;
      if (p.axis === 'y') {
        if (p.carousel?.pointer) p.carousel.up(event, true);
        if (p.free) return;
        try { this.root.setPointerCapture(p.id); } catch { /* Native pinch may have taken ownership. */ }
      }
    }
    if (p.free && p.axis === 'y') return;
    if (event.cancelable) event.preventDefault();
    if (p.axis === 'x') { p.carousel?.move(event); return; }
    const now = performance.now();
    p.velocity = (event.clientY - p.lastY) / Math.max(8, now - p.lastT);
    p.lastY = event.clientY; p.lastT = now;
    window.scrollTo(0, Math.max(0, Math.min(this.maxScroll(), p.origin - dy * .78)));
  }
  up(event, cancelled = false) {
    const p = this.pointer;
    if (!p || p.id !== event.pointerId) return;
    this.pointer = null;
    if (p.carousel?.pointer) p.carousel.up(event, cancelled);
    if (this.root.hasPointerCapture(p.id)) this.root.releasePointerCapture(p.id);
    if (!p.axis && !cancelled) {
      const dx = (event.clientX ?? p.x) - p.x, dy = (event.clientY ?? p.y) - p.y;
      if (Math.abs(dy) > 38 && Math.abs(dy) > Math.abs(dx) * 1.15) p.axis = 'y';
      else if (Math.abs(dx) >= 24 && Math.abs(dx) > Math.abs(dy) * 1.15) p.axis = 'x';
    }
    if (!p.axis) return;
    this.suppressUntil = performance.now() + 450;
    if (p.axis !== 'y' || p.free) return;
    const dy = (event.clientY ?? p.lastY) - p.y;
    const flick = performance.now() - p.lastT < 110 && Math.abs(p.velocity) > .35;
    if (!cancelled && (Math.abs(dy) > 38 || flick)) {
      if (p.bundle) this.stepBundle(dy < 0 ? 1 : -1, p.stepOrigin);
      else this.step(dy < 0 ? 1 : -1, p.origin);
    } else this.animateTo(p.origin, p.bundle);
  }
  onWheel(event) {
    if (event.ctrlKey || event.metaKey || this.blocked(event.target)) return;
    const nativeVertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
    const bundle = this.inGuided(event.target);
    if (nativeVertical && !bundle && this.freeScroll(event.target)) {
      this.stop();
      clearTimeout(this.wheelTimer);
      this.wheel = {x: 0, y: 0, locked: false};
      return;
    }
    if (event.cancelable) event.preventDefault();
    clearTimeout(this.wheelTimer);
    this.wheelTimer = setTimeout(() => { this.wheel = {x: 0, y: 0, locked: false}; }, 220);
    if (this.wheel.locked || (!bundle && this.raf) || this.pointer) return;
    const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? innerHeight : 1;
    this.wheel.x += event.deltaX * unit;
    this.wheel.y += event.deltaY * unit;
    if (Math.max(Math.abs(this.wheel.x), Math.abs(this.wheel.y)) < 38) return;
    const horizontal = Math.abs(this.wheel.x) > Math.abs(this.wheel.y) * 1.2;
    if (horizontal) this.carouselFor(event.target)?.step(Math.sign(this.wheel.x));
    else if (bundle) this.stepBundle(Math.sign(this.wheel.y));
    else this.step(Math.sign(this.wheel.y));
    this.wheel.locked = true;
  }
  onKey(event) {
    if (event.defaultPrevented || this.blocked(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;
    const carousel = this.carouselFor(event.target);
    if (['ArrowLeft', 'ArrowRight'].includes(event.key) && carousel) {
      event.preventDefault(); carousel.step(event.key === 'ArrowRight' ? 1 : -1); return;
    }
    if (event.key === ' ' && event.target.closest('button, a')) return;
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(event.key)) return;
    const bundle = this.inGuided(event.target);
    if (!bundle && this.freeScroll(event.target)) { this.stop(); return; }
    event.preventDefault();
    const direction = ['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey) ? -1 : 1;
    if (bundle) this.stepBundle(direction); else this.step(direction);
  }
}
