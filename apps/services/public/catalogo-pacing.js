/* Shared gesture surface: vertical chapters, horizontal services, one eased position. */
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
    window.addEventListener('resize', () => this.stop());
  }
  blocked(target) {
    return document.querySelector('dialog[open]') || (window.visualViewport?.scale || 1) > 1.01 ||
      target.closest('input, textarea, select, [contenteditable="true"], dialog') || (!this.root.contains(target) && target !== document.body && target !== document.documentElement);
  }
  maxScroll() { return Math.max(0, document.documentElement.scrollHeight - innerHeight); }
  stops() {
    const positions = [];
    for (const scene of this.root.querySelectorAll('[data-scene]')) {
      const rect = scene.getBoundingClientRect();
      const top = rect.top + scrollY;
      positions.push(top);
      // Long catalogues, small landscape screens and zoom never lose content between stops.
      const excess = rect.height - innerHeight;
      if (excess > 24) {
        const pages = Math.ceil(excess / (innerHeight * .82));
        for (let i = 1; i <= pages; i++) positions.push(top + excess * i / pages);
      }
    }
    return [...new Set(positions.map(y => Math.round(Math.max(0, Math.min(this.maxScroll(), y)))))].sort((a, b) => a - b);
  }
  scene(target) {
    const explicit = target.closest('[data-scene]');
    if (explicit) return explicit;
    return [...this.root.querySelectorAll('[data-scene]')].find(el => {
      const box = el.getBoundingClientRect();
      return box.top <= innerHeight * .5 && box.bottom > innerHeight * .5;
    });
  }
  stop() { cancelAnimationFrame(this.raf); this.raf = 0; }
  animateTo(destination) {
    this.stop();
    const target = Math.max(0, Math.min(this.maxScroll(), destination));
    const start = scrollY;
    if (this.reduced.matches || Math.abs(target - start) < 1) { window.scrollTo(0, target); return; }
    const began = performance.now();
    const duration = Math.min(1050, 650 + Math.abs(target - start) * .18);
    const frame = now => {
      const t = Math.min(1, (now - began) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      window.scrollTo(0, start + (target - start) * eased);
      this.raf = t < 1 ? requestAnimationFrame(frame) : 0;
    };
    this.raf = requestAnimationFrame(frame);
  }
  goTo(element) { this.animateTo(element.getBoundingClientRect().top + scrollY); }
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
    this.stop();
    const scene = this.scene(event.target);
    const carousel = this.carousels.get(scene);
    this.pointer = {id: event.pointerId, x: event.clientX, y: event.clientY, lastY: event.clientY, lastT: performance.now(), velocity: 0, origin: scrollY, axis: null, carousel};
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
        try { this.root.setPointerCapture(p.id); } catch { /* Native pinch may have taken ownership. */ }
      }
    }
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
    if (!p.axis) return;
    this.suppressUntil = performance.now() + 450;
    if (p.axis !== 'y') return;
    const dy = (event.clientY ?? p.lastY) - p.y;
    const flick = performance.now() - p.lastT < 110 && Math.abs(p.velocity) > .35;
    if (!cancelled && (Math.abs(dy) > 38 || flick)) this.step(dy < 0 ? 1 : -1, p.origin);
    else this.animateTo(p.origin);
  }
  onWheel(event) {
    if (event.ctrlKey || event.metaKey || this.blocked(event.target)) return;
    if (event.cancelable) event.preventDefault();
    clearTimeout(this.wheelTimer);
    this.wheelTimer = setTimeout(() => { this.wheel = {x: 0, y: 0, locked: false}; }, 220);
    if (this.wheel.locked || this.raf || this.pointer) return;
    const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? innerHeight : 1;
    this.wheel.x += event.deltaX * unit;
    this.wheel.y += event.deltaY * unit;
    if (Math.max(Math.abs(this.wheel.x), Math.abs(this.wheel.y)) < 38) return;
    const horizontal = Math.abs(this.wheel.x) > Math.abs(this.wheel.y) * 1.2;
    if (horizontal) this.carousels.get(this.scene(event.target))?.step(Math.sign(this.wheel.x));
    else this.step(Math.sign(this.wheel.y));
    this.wheel.locked = true;
  }
  onKey(event) {
    if (event.defaultPrevented || this.blocked(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;
    const carousel = this.carousels.get(this.scene(event.target));
    if (['ArrowLeft', 'ArrowRight'].includes(event.key) && carousel) {
      event.preventDefault(); carousel.step(event.key === 'ArrowRight' ? 1 : -1); return;
    }
    if (event.key === ' ' && event.target.closest('button, a')) return;
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(event.key)) return;
    event.preventDefault();
    this.step(['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey) ? -1 : 1);
  }
}
