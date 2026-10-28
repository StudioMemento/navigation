/* Horizontal intent owns the gesture; vertical scrolling and pinch zoom stay native. */
class MementoCarousel {
  constructor(element, {initial = 0, onSettle = () => {}, onOpen = () => {}, externalGestures = false, interactiveContents = false, autoplay = true} = {}) {
    this.element = element;
    this.externalGestures = externalGestures;
    this.interactiveContents = interactiveContents;
    this.abortController = new AbortController();
    this.listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, {...options, signal: this.abortController.signal});
    this.hero = element.classList.contains('macro-carousel');
    this.flat = this.hero;
    this.fan = element.classList.contains('bundle-carousel');
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
    this.autoEnabled = autoplay;
    this.inView = !('IntersectionObserver' in window);
    this.nearViewport = this.inView;
    this.hovered = this.keyboardFocus = this.suppressClick = false;
    this.autoDelay = this.hero ? 8000 : 9000;
    this.resumeAt = 0;
    this.measure = () => {
      const width = this.cards[0]?.offsetWidth || 1;
      if (this.width && this.width !== width && this.pointer) this.up({pointerId: this.pointer.id}, true);
      this.width = width;
      this.height = this.cards[0]?.offsetHeight || 1;
      this.stride = this.flat ? Math.min(360, this.width * .68) : this.width * (this.fan ? (this.compact.matches ? .78 : .64) : (this.compact.matches ? .94 : .69));
      this.render();
    };
    this.observer = new ResizeObserver(this.measure);
    this.observer.observe(element);
    this.measure();
    if ('IntersectionObserver' in window) {
      this.visibilityObserver = new IntersectionObserver(entries => {
        this.nearViewport = entries[0].isIntersecting;
        this.inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .3;
        this.render();
        this.refreshAutoplay();
      }, {rootMargin: '240px 0px', threshold: [0, .3, .6]});
      this.visibilityObserver.observe(element);
    }
    this.listen(element, 'dragstart', event => event.preventDefault());
    if (!externalGestures) {
    this.listen(element, 'pointerdown', event => this.down(event));
    this.listen(element, 'pointermove', event => this.move(event), {passive: false});
    this.listen(window, 'pointerup', event => this.up(event));
    this.listen(window, 'pointercancel', event => this.up(event, true));
    }
    this.listen(element, 'lostpointercapture', event => {
      // Implicit touch capture on a child is released when the carousel takes ownership.
      // That bubbling event is not a cancellation of the carousel's new capture.
      if (event.target === element && this.pointer?.id === event.pointerId) this.up(event, true);
    });
    this.listen(element, 'pointerenter', event => {
      if (event.pointerType === 'mouse') { this.hovered = true; this.refreshAutoplay(); }
    });
    this.listen(element, 'pointerleave', event => {
      if (event.pointerType === 'mouse') { this.hovered = false; this.refreshAutoplay(); }
    });
    this.listen(element, 'focusin', event => {
      this.keyboardFocus = event.target.matches(':focus-visible');
      this.refreshAutoplay();
    });
    this.listen(element, 'focusout', event => {
      if (!element.contains(event.relatedTarget)) { this.keyboardFocus = false; this.refreshAutoplay(); }
    });
    this.listen(element, 'click', event => {
      const card = event.target.closest('[data-slide]');
      if (!card || card.parentElement !== this.element.querySelector('.carousel-stage') || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (this.suppressClick) { event.preventDefault(); event.stopImmediatePropagation(); return; }
      const index = Number(card.dataset.slide);
      if (this.interactiveContents && Math.abs(this.delta(index - this.current)) <= .025) return;
      event.preventDefault();
      if (this.interactiveContents) event.stopPropagation();
      if (Math.abs(this.delta(index - this.current)) > .025) this.select(index);
      else this.onOpen(index);
    });
    this.listen(element, 'keydown', event => {
      if (event.defaultPrevented || event.target.closest('.carousel') !== element || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      this.keyboardFocus = this.focusAfterSettle = true;
      if (event.key === 'Home') this.select(0);
      else if (event.key === 'End') this.select(this.count - 1);
      else this.step(event.key === 'ArrowRight' ? 1 : -1);
    });
    this.listen(document, 'visibilitychange', () => this.refreshAutoplay());
    this.listen(document, 'memento:overlay-change', () => this.refreshAutoplay());
    this.listen(this.reduced, 'change', () => {
      if (this.reduced.matches && this.motion) this.finish();
      this.refreshAutoplay();
    });
    this.listen(this.compact, 'change', this.measure);
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
      card.dataset.nearby = String(amount < 1.3);
      if (this.nearViewport && amount < (navigator.connection?.saveData ? .6 : 1.3)) {
        card.querySelectorAll('img[data-src]').forEach(img => {
          if (img.dataset.srcset) { img.srcset = img.dataset.srcset; delete img.dataset.srcset; }
          img.src = img.dataset.src; delete img.dataset.src;
        });
      }
      // Neighbours tuck behind at rest, then open apart around the layer handoff.
      const bow = amount < 1 ? Math.sin(Math.PI * amount) * this.width * (compact ? .08 : .2) : 0;
      const x = distance * this.stride + Math.sign(distance) * bow;
      const y = this.fan ? -this.height * (compact ? .035 : .065) * Math.min(amount, 2) : this.height * (compact ? .008 : .025) * Math.min(amount, 2.6);
      const scale = Math.pow(this.fan ? .88 : compact ? .97 : .9, amount);
      const yaw = -Math.sign(distance) * Math.min(this.fan ? 62 : compact ? 22 : 38, amount * (this.fan ? (compact ? 32 : 48) : compact ? 12 : 24));
      card.style.transform = flat
        ? 'translate3d(-50%, 0, 0)'
        : 'translate3d(calc(-50% + ' + x.toFixed(3) + 'px), ' + y.toFixed(3) + 'px, 0) perspective(' + (compact ? 1100 : 2000) + 'px) rotateY(' + yaw.toFixed(3) + 'deg) scale(' + scale.toFixed(5) + ')';
      // Light and text follow distance continuously, including both sides of a swipe.
      const fade = Math.min(1, amount);
      card.style.setProperty('--slide-focus', (1 - fade * fade * (3 - 2 * fade)).toFixed(4));
      const smooth = value => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };
      if (flat) {
        card.style.setProperty('--hero-image-alpha', smooth(1 - amount).toFixed(4));
        card.style.setProperty('--hero-text-alpha', smooth(1 - amount * 1.85).toFixed(4));
        card.style.setProperty('--hero-text-offset', (Math.min(1, amount) * 10).toFixed(2) + 'px');
      }
      card.style.opacity = flat ? (amount < 1 ? '1' : '0') : Math.max(0, Math.min(1, (edge - amount) / .6)).toFixed(4);
      card.style.visibility = amount >= (flat ? 1 : edge) ? 'hidden' : 'visible';
      card.style.zIndex = String(flat ? index + 1 : 100 - Math.round(amount * 20));
      const isActive = index === active;
      card.dataset.active = String(isActive);
      card.tabIndex = isActive ? 0 : -1;
      card.setAttribute('aria-hidden', String(!isActive));
      if (this.interactiveContents) (card.querySelector('.popup-card-scroll') || card).inert = !isActive;
      card.style.pointerEvents = (flat ? index !== active : amount >= edge) ? 'none' : 'auto';
    });
    if (active !== this.active) {
      this.active = active;
      this.onSettle(active, {announce: this.motion?.kind !== 'auto'});
    }
  }
  requestFrame() {
    if (this.raf) return;
    this.element.classList.add('is-moving');
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
      if (Math.abs(this.current - this.target) < .0001) { this.current = this.target; this.render(); this.element.classList.remove('is-moving'); return; }
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
    this.element.classList.remove('is-moving');
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
    if (event.isPrimary === false && this.pointer) { this.up({pointerId: this.pointer.id}, true); return; }
    if (this.interactiveContents && !this.externalGestures && !event.target.closest('[data-slide]')) return;
    if (this.pointer || event.isPrimary === false || event.button !== 0 || event.target.closest('input, textarea, select, [contenteditable="true"], [data-no-swipe]')) return;
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
    // A short flick can have no intermediate pointermove on a busy touch device.
    const dx = (event.clientX ?? pointer.lastX) - pointer.x;
    const dy = (event.clientY ?? pointer.y) - pointer.y;
    if (!cancelled && !pointer.axis && Math.abs(dx) >= 24 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      pointer.axis = 'x';
      this.target = pointer.start - dx / this.stride;
    }
    this.pointer = null;
    this.element.classList.remove('is-dragging');
    if (this.element.hasPointerCapture(pointer.id)) this.element.releasePointerCapture(pointer.id);
    if (pointer.axis !== 'x') { this.target = Math.round(this.current); this.settle(); return; }
    this.suppressClick = true;
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => { this.suppressClick = false; }, 450);
    if (cancelled) { this.target = Math.round(pointer.start); this.settle(); return; }
    // Include the final coalesced movement, even if no last move was dispatched.
    this.target = pointer.start - dx / this.stride;
    const velocity = cancelled || performance.now() - pointer.lastT > 100 ? 0 : Math.max(-.004, Math.min(.004, pointer.velocity));
    const progress = this.target - pointer.start;
    const projection = Math.max(-.7, Math.min(.7, velocity * 220));
    let destination = Math.round(this.target + projection);
    if (!cancelled && (Math.abs(dx) >= 24 || Math.abs(progress) > .12 || Math.abs(velocity) > .0005)) {
      const direction = Math.sign(Math.abs(dx) >= 24 ? -dx : Math.abs(progress) > .04 ? progress : velocity);
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
  destroy() {
    this.abortController.abort();
    cancelAnimationFrame(this.raf);
    clearTimeout(this.autoTimer);
    clearTimeout(this.clickTimer);
    this.observer.disconnect();
    this.visibilityObserver?.disconnect();
    this.raf = this.autoTimer = 0;
    this.motion = this.pointer = null;
    this.element.classList.remove('is-dragging', 'is-moving');
  }
  setAutoplay(enabled) {
    this.autoEnabled = enabled;
    this.refreshAutoplay();
  }
}
