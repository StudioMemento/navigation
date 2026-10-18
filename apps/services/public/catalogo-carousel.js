/* Pointer-driven carousel. Slow autoplay, continuous drag and damped release share one position. */
class MementoCarousel {
  constructor(element, {initial = 0, onSettle = () => {}, onOpen = () => {}, externalGestures = false} = {}) {
    this.element = element;
    this.hero = element.classList.contains('macro-carousel');
    this.flat = this.hero;
    this.cards = [...element.querySelector('.carousel-stage').children];
    this.count = this.cards.length;
    this.current = this.target = this.active = initial;
    this.velocity = 0;
    this.onSettle = onSettle;
    this.onOpen = onOpen;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.compact = matchMedia('(max-width: 767px)');
    this.raf = this.autoTimer = 0;
    this.pointer = this.motion = null;
    this.autoEnabled = true;
    this.inView = !('IntersectionObserver' in window);
    this.hovered = this.keyboardFocus = this.suppressClick = false;
    this.autoDelay = this.hero ? 8000 : 9000;
    this.resumeAt = 0;
    this.measure = () => {
      this.width = this.cards[0]?.offsetWidth || 1;
      this.height = this.cards[0]?.offsetHeight || 1;
      this.stride = this.width * (this.flat ? 1 : this.compact.matches ? .94 : .69);
      this.render();
    };
    this.observer = new ResizeObserver(this.measure);
    this.observer.observe(element);
    this.measure();
    if ('IntersectionObserver' in window) {
      this.visibilityObserver = new IntersectionObserver(entries => {
        this.inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .3;
        this.refreshAutoplay();
      }, {threshold: [0, .3, .6]});
      this.visibilityObserver.observe(element);
    }
    element.addEventListener('dragstart', event => event.preventDefault());
    if (!externalGestures) {
    element.addEventListener('pointerdown', event => this.down(event));
    element.addEventListener('pointermove', event => this.move(event), {passive: false});
    element.addEventListener('pointerup', event => this.up(event));
    element.addEventListener('pointercancel', event => this.up(event, true));
    }
    element.addEventListener('lostpointercapture', event => {
      // Implicit touch capture on a child is released when the carousel takes ownership.
      // That bubbling event is not a cancellation of the carousel's new capture.
      if (event.target === element && this.pointer?.id === event.pointerId) this.up(event, true);
    });
    element.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') { this.hovered = true; this.refreshAutoplay(); }
    });
    element.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') { this.hovered = false; this.refreshAutoplay(); }
    });
    element.addEventListener('focusin', event => {
      this.keyboardFocus = event.target.matches(':focus-visible');
      this.refreshAutoplay();
    });
    element.addEventListener('focusout', event => {
      if (!element.contains(event.relatedTarget)) { this.keyboardFocus = false; this.refreshAutoplay(); }
    });
    element.addEventListener('click', event => {
      const card = event.target.closest('[data-slide]');
      if (!card || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (this.suppressClick) { event.preventDefault(); event.stopPropagation(); return; }
      const index = Number(card.dataset.slide);
      if (Math.abs(this.delta(index - this.current)) > .025) this.select(index);
      else this.onOpen(index);
    });
    element.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      this.keyboardFocus = this.focusAfterSettle = true;
      if (event.key === 'Home') this.select(0);
      else if (event.key === 'End') this.select(this.count - 1);
      else this.step(event.key === 'ArrowRight' ? 1 : -1);
    });
    document.addEventListener('visibilitychange', () => this.refreshAutoplay());
    document.addEventListener('memento:overlay-change', () => this.refreshAutoplay());
    this.reduced.addEventListener('change', () => {
      if (this.reduced.matches && this.motion) this.finish();
      this.refreshAutoplay();
    });
    this.compact.addEventListener('change', this.measure);
    this.scheduleAutoplay();
  }
  mod(value) { return ((value % this.count) + this.count) % this.count; }
  delta(value) { return this.mod(value + this.count / 2) - this.count / 2; }
  render() {
    const active = this.mod(Math.round(this.current));
    const flat = this.flat;
    const compact = this.compact.matches;
    // Hide cards before they wrap, including the four-card VISUAL stack.
    const edge = flat ? Math.min(1.5, this.count / 2) : Math.min(2.7, this.count / 2 - .06);
    this.cards.forEach((card, index) => {
      const distance = this.delta(index - this.current);
      const amount = Math.abs(distance);
      const x = distance * this.stride;
      const y = this.height * (compact ? .008 : .025) * Math.min(amount, 2.6);
      const scale = Math.pow(compact ? .97 : .9, amount);
      const yaw = -Math.sign(distance) * Math.min(compact ? 22 : 38, amount * (compact ? 12 : 24));
      card.style.transform = flat
        ? 'translate3d(calc(-50% + ' + x.toFixed(3) + 'px), 0, 0)'
        : 'translate3d(calc(-50% + ' + x.toFixed(3) + 'px), ' + y.toFixed(3) + 'px, ' + (-amount * (compact ? 16 : 55)).toFixed(3) + 'px) rotateY(' + yaw.toFixed(3) + 'deg) scale(' + scale.toFixed(5) + ')';
      // Light and text follow distance continuously, including both sides of a swipe.
      const fade = Math.min(1, amount);
      card.style.setProperty('--slide-focus', (1 - fade * fade * (3 - 2 * fade)).toFixed(4));
      card.style.opacity = Math.max(0, Math.min(1, (edge - amount) / .6)).toFixed(4);
      card.style.zIndex = String(100 - Math.round(amount * 20));
      const isActive = index === active;
      card.dataset.active = String(isActive);
      card.tabIndex = isActive ? 0 : -1;
      card.setAttribute('aria-hidden', String(!isActive));
      card.style.pointerEvents = amount >= edge ? 'none' : 'auto';
    });
    if (active !== this.active) {
      this.active = active;
      this.onSettle(active, {announce: this.motion?.kind !== 'auto'});
    }
  }
  requestFrame() {
    if (this.raf) return;
    this.previous = performance.now();
    this.raf = requestAnimationFrame(now => this.frame(now));
  }
  frame(now) {
    this.raf = 0;
    if (!this.motion) return;
    const dt = Math.min(40, Math.max(1, now - this.previous));
    this.previous = now;
    if (this.motion.kind === 'auto') {
      if (!this.canAutoplay()) return;
      this.motion.elapsed = Math.min(this.motion.duration, this.motion.elapsed + dt);
      const t = this.motion.elapsed / this.motion.duration;
      const eased = t * t * t * (10 + t * (-15 + 6 * t));
      this.current = this.motion.from + (this.target - this.motion.from) * eased;
      if (t === 1) { this.finish(); return; }
    } else if (this.motion.kind === 'drag') {
      this.current += (this.target - this.current) * (1 - Math.exp(-dt / 32));
      if (Math.abs(this.current - this.target) < .0001) { this.current = this.target; this.render(); return; }
    } else {
      // Critical damping preserves position and velocity without snapping or bouncing.
      const omega = 1 / 145;
      const offset = this.current - this.target;
      const mixed = this.velocity + omega * offset;
      const decay = Math.exp(-omega * dt);
      this.current = this.target + (offset + mixed * dt) * decay;
      this.velocity = (this.velocity - omega * mixed * dt) * decay;
      if (Math.abs(this.target - this.current) < .00012 && Math.abs(this.velocity) < .000002) { this.finish(); return; }
    }
    this.render();
    this.raf = requestAnimationFrame(time => this.frame(time));
  }
  finish() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.current = this.target;
    this.velocity = 0;
    this.render();
    this.motion = null;
    if (this.focusAfterSettle) {
      this.cards[this.active].focus({preventScroll: true});
      this.focusAfterSettle = false;
    }
    this.scheduleAutoplay();
  }
  settle(velocity = 0) {
    const gap = this.target - this.current;
    this.velocity = Math.sign(gap) === Math.sign(velocity) ? Math.sign(velocity) * Math.min(Math.abs(velocity), Math.abs(gap) / 145) : 0;
    this.motion = {kind: 'settle'};
    if (this.reduced.matches) this.finish(); else this.requestFrame();
  }
  interact() {
    clearTimeout(this.autoTimer);
    this.autoTimer = 0;
    this.resumeAt = performance.now() + 12000;
  }
  select(index) {
    this.interact();
    this.target = this.current + this.delta(index - this.current);
    this.settle();
  }
  step(direction) {
    this.interact();
    this.target = Math.round(this.target) + direction;
    this.settle();
  }
  down(event) {
    if (this.pointer || event.isPrimary === false || (event.pointerType === 'mouse' && event.button !== 0)) return;
    this.interact();
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.motion = null;
    this.target = this.current;
    this.suppressClick = this.keyboardFocus = false;
    this.pointer = {id: event.pointerId, x: event.clientX, y: event.clientY, start: this.current, lastX: event.clientX, lastT: performance.now(), velocity: 0, axis: null};
  }
  move(event) {
    const pointer = this.pointer;
    if (!pointer || pointer.id !== event.pointerId || pointer.axis === 'y') return;
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    if (!pointer.axis) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) * 1.1) { pointer.axis = 'y'; return; }
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.1) return;
      pointer.axis = 'x';
      // Capture only a confirmed drag: normal taps must retain their original button target.
      try { this.element.setPointerCapture(event.pointerId); } catch { /* Native cancellation may already have released it. */ }
      this.element.classList.add('is-dragging');
    }
    if (event.cancelable) event.preventDefault();
    const now = performance.now();
    const speed = -(event.clientX - pointer.lastX) / (Math.max(8, now - pointer.lastT) * this.stride);
    pointer.velocity = pointer.velocity * .35 + speed * .65;
    pointer.lastX = event.clientX;
    pointer.lastT = now;
    this.target = pointer.start - dx / this.stride;
    this.motion = {kind: 'drag'};
    if (this.reduced.matches) { this.current = this.target; this.render(); }
    else this.requestFrame();
  }
  up(event, cancelled = false) {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.id) return;
    this.pointer = null;
    this.element.classList.remove('is-dragging');
    if (this.element.hasPointerCapture(pointer.id)) this.element.releasePointerCapture(pointer.id);
    if (pointer.axis !== 'x') { this.target = Math.round(this.current); this.settle(); return; }
    this.suppressClick = true;
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => { this.suppressClick = false; }, 450);
    const velocity = cancelled || performance.now() - pointer.lastT > 100 ? 0 : Math.max(-.004, Math.min(.004, pointer.velocity));
    const progress = this.target - pointer.start;
    const projection = Math.max(-.7, Math.min(.7, velocity * 220));
    let destination = Math.round(this.target + projection);
    if (!cancelled && (Math.abs(progress) > .12 || Math.abs(velocity) > .0005)) {
      const direction = Math.sign(Math.abs(progress) > .04 ? progress : velocity);
      destination = direction > 0 ? Math.max(destination, Math.round(pointer.start) + 1) : Math.min(destination, Math.round(pointer.start) - 1);
    }
    this.target = destination;
    this.settle(velocity);
  }
  canAutoplay() {
    return this.autoEnabled && this.count > 1 && this.inView && !this.pointer && !this.hovered && !this.keyboardFocus && !this.reduced.matches && !document.hidden && !document.querySelector('dialog[open]');
  }
  scheduleAutoplay() {
    clearTimeout(this.autoTimer);
    this.autoTimer = 0;
    if (this.motion || !this.canAutoplay()) return;
    const delay = Math.max(this.autoDelay, this.resumeAt - performance.now());
    this.autoTimer = setTimeout(() => {
      this.autoTimer = 0;
      if (!this.canAutoplay()) return;
      this.target = Math.round(this.current) + 1;
      this.motion = {kind: 'auto', from: this.current, elapsed: 0, duration: 2600};
      this.requestFrame();
    }, delay);
  }
  refreshAutoplay() {
    clearTimeout(this.autoTimer);
    this.autoTimer = 0;
    if (this.motion?.kind === 'auto') {
      if (this.canAutoplay()) this.requestFrame();
      else { cancelAnimationFrame(this.raf); this.raf = 0; }
    } else this.scheduleAutoplay();
  }
  setAutoplay(enabled) {
    this.autoEnabled = enabled;
    this.refreshAutoplay();
  }
}
