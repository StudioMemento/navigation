// Owns horizontal gestures and animation only. Content and routing are callbacks.
export class Carousel {
  constructor(
    element,
    { onSettle = () => {}, onOpen = () => {}, interactiveContents = false } = {},
  ) {
    this.element = element;
    this.interactiveContents = interactiveContents;
    this.controller = new AbortController();
    const listen = (target, type, handler, options = {}) =>
      target.addEventListener(type, handler, { ...options, signal: this.controller.signal });
    this.cards = [...element.querySelector('.carousel-stage').children];
    this.count = this.cards.length;
    this.fan = element.classList.contains('bundle-carousel');
    this.current = this.target = this.active = this.velocity = this.raf = 0;
    this.pointer = this.motion = this.wheelGesture = null;
    this.suspended = this.suppressClick = false;
    this.onSettle = onSettle;
    this.onOpen = onOpen;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.measure = () => {
      const width = this.cards[0].offsetWidth || 1;
      if (this.width && this.width !== width && this.pointer)
        this.up({ pointerId: this.pointer.id }, true);
      this.width = width;
      this.height = this.cards[0].offsetHeight || 1;
      this.wide = Number(getComputedStyle(element).getPropertyValue('--layout-wide')) || 0;
      this.stride = width * (this.fan ? 0.78 - 0.14 * this.wide : 0.94 - 0.25 * this.wide);
      this.perspective = 1100 + 900 * this.wide;
      this.reserveBleed();
      this.render();
    };
    this.observer = new ResizeObserver(this.measure);
    this.observer.observe(element);
    this.observer.observe(this.cards[0]);
    this.measure();
    listen(element, 'dragstart', (e) => e.preventDefault());
    listen(element, 'pointerdown', (e) => this.down(e));
    listen(element, 'pointermove', (e) => this.move(e), { passive: false });
    listen(window, 'pointerup', (e) => this.up(e));
    listen(window, 'pointercancel', (e) => this.up(e, true));
    listen(element, 'wheel', (e) => this.wheel(e), { passive: false });
    listen(window, 'blur', () => {
      if (this.pointer) this.up({ pointerId: this.pointer.id }, true);
      this.wheelGesture = null;
    });
    listen(element, 'lostpointercapture', (e) => {
      if (e.target === element && this.pointer?.id === e.pointerId) this.up(e, true);
    });
    listen(element, 'click', (e) => {
      const card = e.target.closest('[data-slide]');
      if (
        !card ||
        card.parentElement !== element.querySelector('.carousel-stage') ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      if (this.suppressClick) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      const index = Number(card.dataset.slide);
      if (interactiveContents && Math.abs(this.delta(index - this.current)) <= 0.025) return;
      e.preventDefault();
      e.stopPropagation();
      if (Math.abs(this.delta(index - this.current)) > 0.025) this.select(index);
      else this.onOpen(index);
    });
    listen(element, 'keydown', (e) => {
      if (
        e.defaultPrevented ||
        e.target.closest('.carousel') !== element ||
        e.target.closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      this.focusAfterSettle = true;
      if (e.key === 'Home') this.select(0);
      else if (e.key === 'End') this.select(this.count - 1);
      else this.step(e.key === 'ArrowRight' ? 1 : -1);
    });
    listen(document, 'memento:overlay-change', () => {
      this.suspended = !!document.querySelector('dialog[open]') && !element.closest('dialog');
      if (this.suspended) {
        cancelAnimationFrame(this.raf);
        this.raf = 0;
      } else if (this.motion) this.requestFrame();
    });
    listen(this.reduced, 'change', () => {
      if (this.reduced.matches && this.motion) this.finish();
    });
  }
  mod(value) {
    return ((value % this.count) + this.count) % this.count;
  }
  delta(value) {
    return this.mod(value + this.count / 2) - this.count / 2;
  }
  pose(distance) {
    const amount = Math.abs(distance);
    const wide = this.wide;
    // Neighbours tuck behind at rest, then open around the layer handoff.
    const bow = amount < 1 ? Math.sin(Math.PI * amount) * this.width * (0.08 + 0.12 * wide) : 0;
    return {
      x: distance * this.stride + Math.sign(distance) * bow,
      y: this.fan
        ? -this.height * (0.035 + 0.03 * wide) * Math.min(amount, 2)
        : this.height * (0.008 + 0.017 * wide) * Math.min(amount, 2.6),
      scale: Math.pow(this.fan ? 0.88 : 0.97 - 0.07 * wide, amount),
      yaw:
        -Math.sign(distance) *
        Math.min(
          this.fan ? 62 : 22 + 16 * wide,
          amount * (this.fan ? 32 + 16 * wide : 12 + 12 * wide),
        ),
    };
  }
  reserveBleed() {
    // A CSS mask clips to its box. Reserve the projected envelope for every
    // visible swipe position, using the same pose as render (not a breakpoint).
    const edge = Math.min(2.7, this.count / 2 - 0.06);
    let top = 0;
    let bottom = 0;
    for (let sample = 0; sample <= 80; sample++) {
      const { y, scale, yaw } = this.pose((sample / 80) * edge);
      const depth = (this.width * scale * Math.abs(Math.sin((yaw * Math.PI) / 180))) / 2;
      const halfHeight = (this.height * scale) / 2 / (1 - depth / this.perspective);
      top = Math.max(top, halfHeight - this.height / 2 - y);
      bottom = Math.max(bottom, halfHeight - this.height / 2 + y);
    }
    const owner = this.fan ? this.element.closest('.bundle-opening') : this.element;
    for (const [side, amount] of [
      ['top', top],
      ['bottom', bottom],
    ]) {
      const property = `--carousel-bleed-${side}`;
      const value = `${Math.ceil(amount) + 8}px`;
      if (owner.style.getPropertyValue(property) !== value)
        owner.style.setProperty(property, value);
    }
  }
  render() {
    const active = this.mod(Math.round(this.current));
    // Hide cards before they wrap, including the four-card VISUAL stack.
    const edge = Math.min(2.7, this.count / 2 - 0.06);
    this.cards.forEach((card, index) => {
      const distance = this.delta(index - this.current);
      const amount = Math.abs(distance);
      card.dataset.nearby = String(amount < 1.3);
      // Native lazy loading can miss projected 3D neighbours inside an overflow mask.
      // Warm only the visible arc (or the selected image on data-saver connections).
      if (amount < (navigator.connection?.saveData ? 0.6 : edge))
        card.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
      // Expose the current board and its neighbours to native loading="lazy".
      // A direct hash jump must not depend on a later IntersectionObserver tick.
      if (amount < (navigator.connection?.saveData ? 0.6 : 1.3)) {
        card.querySelectorAll('img[data-src]').forEach((img) => {
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            delete img.dataset.srcset;
          }
          img.src = img.dataset.src;
          delete img.dataset.src;
        });
      }
      const { x, y, scale, yaw } = this.pose(distance);
      card.style.transform =
        'translate3d(calc(-50% + ' +
        x.toFixed(3) +
        'px), ' +
        y.toFixed(3) +
        'px, 0) perspective(' +
        this.perspective.toFixed(1) +
        'px) rotateY(' +
        yaw.toFixed(3) +
        'deg) scale(' +
        scale.toFixed(5) +
        ')';
      // Light and text follow distance continuously, including both sides of a swipe.
      const fade = Math.min(1, amount);
      card.style.setProperty('--slide-focus', (1 - fade * fade * (3 - 2 * fade)).toFixed(4));
      card.style.opacity = Math.max(0, Math.min(1, (edge - amount) / 0.6)).toFixed(4);
      card.style.visibility = amount >= edge ? 'hidden' : 'visible';
      card.style.zIndex = String(100 - Math.round(amount * 20));
      const isActive = index === active;
      card.dataset.active = String(isActive);
      card.tabIndex = isActive ? 0 : -1;
      card.setAttribute('aria-hidden', String(!isActive));
      if (this.interactiveContents)
        (card.querySelector('.popup-card-scroll') || card).inert = !isActive;
      card.style.pointerEvents = amount >= edge ? 'none' : 'auto';
    });
    if (active !== this.active) {
      this.active = active;
      this.onSettle(active);
    }
  }
  requestFrame() {
    if (this.raf || this.suspended) return;
    this.element.classList.add('is-moving');
    this.previous = performance.now();
    this.raf = requestAnimationFrame((now) => this.frame(now));
  }
  frame(now) {
    this.raf = 0;
    if (!this.motion) return;
    const dt = Math.min(40, Math.max(1, now - this.previous));
    this.previous = now;
    if (this.motion.kind === 'drag') {
      this.current += (this.target - this.current) * (1 - Math.exp(-dt / 32));
      if (Math.abs(this.current - this.target) < 0.0001) {
        this.current = this.target;
        this.render();
        this.element.classList.remove('is-moving');
        return;
      }
    } else {
      // Critical damping preserves position and velocity without snapping or bouncing.
      const omega = 1 / 145;
      const offset = this.current - this.target;
      const mixed = this.velocity + omega * offset;
      const decay = Math.exp(-omega * dt);
      this.current = this.target + (offset + mixed * dt) * decay;
      this.velocity = (this.velocity - omega * mixed * dt) * decay;
      if (Math.abs(this.target - this.current) < 0.00012 && Math.abs(this.velocity) < 0.000002) {
        this.finish();
        return;
      }
    }
    this.render();
    this.raf = requestAnimationFrame((time) => this.frame(time));
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
      this.cards[this.active].focus({ preventScroll: true });
      this.focusAfterSettle = false;
    }
  }
  settle(velocity = 0) {
    const gap = this.target - this.current;
    this.velocity =
      Math.sign(gap) === Math.sign(velocity)
        ? Math.sign(velocity) * Math.min(Math.abs(velocity), Math.abs(gap) / 145)
        : 0;
    this.motion = { kind: 'settle' };
    if (this.reduced.matches) this.finish();
    else this.requestFrame();
  }
  select(index) {
    this.target = this.current + this.delta(index - this.current);
    this.settle();
  }
  step(direction) {
    this.target = Math.round(this.target) + direction;
    this.settle();
  }
  wheel(event) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || this.pointer || this.count < 2)
      return;
    if (
      event.target.closest('.carousel') !== this.element ||
      event.target.closest('input, textarea, select, [contenteditable="true"], [data-no-swipe]')
    )
      return;
    if (this.interactiveContents && !event.target.closest('[data-slide]')) return;
    // Keep vertical page/board scrolling and trackpad pinch zoom native. Shift
    // plus a mouse wheel is the conventional alternative to a horizontal wheel.
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? this.width : 1;
    const dx = (event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX) * unit;
    const dy = event.shiftKey && !event.deltaX ? 0 : event.deltaY * unit;
    if (
      !Number.isFinite(dx) ||
      !Number.isFinite(dy) ||
      Math.abs(dx) < 0.1 ||
      Math.abs(dx) <= Math.abs(dy) * 1.1
    )
      return;
    if (event.cancelable) event.preventDefault();
    const now = performance.now(),
      magnitude = Math.abs(dx),
      direction = Math.sign(dx);
    let gesture = this.wheelGesture;
    const quiet = !gesture || now - gesture.lastAt > 160;
    const reverseTotal =
      gesture && direction !== gesture.direction ? (gesture.reverseTotal || 0) + magnitude : 0;
    if (gesture) gesture.reverseTotal = reverseTotal;
    const reverse = reverseTotal >= 12;
    // A fresh finger stroke can begin while the previous inertial tail is still
    // arriving. A renewed pulse after that tail re-arms the player immediately;
    // the decaying tail itself must never advance another board.
    const freshPulse =
      gesture?.committed &&
      direction === gesture.direction &&
      now - gesture.committedAt >= 180 &&
      gesture.tail &&
      magnitude >= Math.max(8, gesture.trough * 3);
    if (quiet || reverse || freshPulse) {
      gesture = this.wheelGesture = {
        direction,
        total: reverse && !quiet ? reverseTotal - magnitude : 0,
        peak: magnitude,
        trough: Infinity,
        tail: false,
        committed: false,
      };
    }
    gesture.lastAt = now;
    if (direction !== gesture.direction) return;
    gesture.peak = Math.max(gesture.peak, magnitude);
    if (gesture.committed) {
      if (magnitude <= gesture.peak * 0.35) {
        gesture.tail = true;
        gesture.trough = Math.min(gesture.trough, magnitude);
      }
      return;
    }
    gesture.total += magnitude;
    // The threshold is in normalized pixels, never a fraction of a wide card.
    if (gesture.total >= 12) {
      gesture.committed = true;
      gesture.committedAt = now;
      this.step(direction);
    }
  }
  down(event) {
    if (event.isPrimary === false && this.pointer) {
      this.up({ pointerId: this.pointer.id }, true);
      return;
    }
    if (this.interactiveContents && !event.target.closest('[data-slide]')) return;
    if (
      this.pointer ||
      event.isPrimary === false ||
      event.button !== 0 ||
      event.target.closest('input, textarea, select, [contenteditable="true"], [data-no-swipe]')
    )
      return;
    const origin = Math.round(this.motion?.kind === 'settle' ? this.target : this.current);
    this.wheelGesture = null;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.motion = null;
    this.target = this.current;
    this.suppressClick = false;
    this.pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      start: this.current,
      origin,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      axis: null,
    };
  }
  move(event) {
    const pointer = this.pointer;
    if (!pointer || pointer.id !== event.pointerId || pointer.axis === 'y') return;
    const dx = event.clientX - pointer.x,
      dy = event.clientY - pointer.y;
    if (!pointer.axis) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) * 1.1) {
        pointer.axis = 'y';
        return;
      }
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy) * 1.1) return;
      pointer.axis = 'x';
      // Capture only a confirmed drag: normal taps must retain their original button target.
      try {
        this.element.setPointerCapture(event.pointerId);
      } catch {
        /* Native cancellation may already have released it. */
      }
      this.element.classList.add('is-dragging');
    }
    if (event.cancelable) event.preventDefault();
    const now = performance.now();
    const speed =
      -(event.clientX - pointer.lastX) / (Math.max(8, now - pointer.lastT) * this.stride);
    pointer.velocity = pointer.velocity * 0.35 + speed * 0.65;
    pointer.lastX = event.clientX;
    pointer.lastT = now;
    this.target = pointer.start - dx / this.stride;
    this.motion = { kind: 'drag' };
    if (this.reduced.matches) {
      this.current = this.target;
      this.render();
    } else this.requestFrame();
  }
  up(event, cancelled = false) {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.id) return;
    // A short flick can have no intermediate pointermove on a busy touch device.
    const dx = (event.clientX ?? pointer.lastX) - pointer.x;
    const dy = (event.clientY ?? pointer.y) - pointer.y;
    if (!cancelled && !pointer.axis && Math.abs(dx) >= 18 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      pointer.axis = 'x';
      this.target = pointer.start - dx / this.stride;
    }
    this.pointer = null;
    this.element.classList.remove('is-dragging');
    if (this.element.hasPointerCapture(pointer.id)) this.element.releasePointerCapture(pointer.id);
    if (pointer.axis !== 'x') {
      this.target = pointer.origin;
      this.settle();
      return;
    }
    this.suppressClick = true;
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => {
      this.suppressClick = false;
    }, 450);
    if (cancelled) {
      this.target = pointer.origin;
      this.settle();
      return;
    }
    // Include the final coalesced movement, even if no last move was dispatched.
    this.target = pointer.start - dx / this.stride;
    const velocity =
      cancelled || performance.now() - pointer.lastT > 100
        ? 0
        : Math.max(-0.004, Math.min(0.004, pointer.velocity));
    const progress = this.target - pointer.start;
    const projection = Math.abs(dx) >= 12 ? Math.max(-0.7, Math.min(0.7, velocity * 220)) : 0;
    let destination = Math.round(this.target + projection);
    if (
      !cancelled &&
      (Math.abs(dx) >= 18 ||
        Math.abs(progress) > 0.12 ||
        (Math.abs(dx) >= 12 && Math.abs(velocity) > 0.0005))
    ) {
      const direction = Math.sign(
        Math.abs(dx) >= 18 ? -dx : Math.abs(progress) > 0.04 ? progress : velocity,
      );
      destination =
        direction > 0
          ? Math.max(destination, pointer.origin + 1)
          : Math.min(destination, pointer.origin - 1);
    }
    this.target = destination;
    this.settle(velocity);
  }
  destroy() {
    this.controller.abort();
    cancelAnimationFrame(this.raf);
    clearTimeout(this.clickTimer);
    this.observer.disconnect();
    if (this.pointer && this.element.hasPointerCapture(this.pointer.id))
      this.element.releasePointerCapture(this.pointer.id);
    this.motion = this.pointer = this.wheelGesture = null;
    this.element.classList.remove('is-dragging', 'is-moving');
  }
}

export function bindDots(element, carousel, { attribute = 'dot', signal } = {}) {
  const buttons = [...element.querySelectorAll(`[data-${attribute}]`)];
  const update = (index) =>
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  element.addEventListener(
    'click',
    (event) => {
      const button = event.target.closest(`[data-${attribute}]`);
      if (button) carousel.select(Number(button.getAttribute(`data-${attribute}`)));
    },
    { signal },
  );
  element.addEventListener(
    'keydown',
    (event) => {
      if (
        !buttons.includes(event.target) ||
        !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
      )
        return;
      event.preventDefault();
      const current = buttons.indexOf(event.target);
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? buttons.length - 1
            : carousel.mod(current + (event.key === 'ArrowRight' ? 1 : -1));
      buttons[next].focus({ preventScroll: true });
      carousel.select(next);
    },
    { signal },
  );
  return update;
}
