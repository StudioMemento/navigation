/**
 * Project selector: the V42 geometry (central card, two pairs inside the content padding, the outer pair fading past
 * it) driven frame by frame in JavaScript, with the gestures and the critically damped motion of the LevelUp V20
 * carousel. Each frame writes the transform, opacity, grayscale and --slide-focus the VFX engine draws the boards with
 * (onRender → vfx.motion()), so the canvas and the DOM never disagree.
 */
const SCALES = [1, .84, .68, .54];
const smooth = t => t * t * (3 - 2 * t);

export class Coverflow {
  constructor(element, { active = 0, onSelect = () => {}, onOpen = () => {}, onRender = () => {}, hydrate = () => {} } = {}) {
    this.element = element;
    this.cards = [...element.querySelectorAll('.flow-card')];
    this.count = this.cards.length;
    this.loop = this.count > 4;
    this.onSelect = onSelect; this.onOpen = onOpen; this.onRender = onRender; this.hydrate = hydrate;
    this.current = this.target = this.active = active;
    this.velocity = 0; this.raf = 0; this.pointer = this.motion = this.wheelGesture = null; this.suppressClick = false;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.controller = new AbortController();
    const listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, { ...options, signal: this.controller.signal });
    this.observer = new ResizeObserver(() => this.measure());
    this.observer.observe(element);
    this.measure();
    listen(element, 'dragstart', e => e.preventDefault());
    listen(element, 'pointerdown', e => this.down(e));
    listen(element, 'pointermove', e => this.move(e), { passive: false });
    listen(window, 'pointerup', e => this.up(e));
    listen(window, 'pointercancel', e => this.up(e, true));
    listen(element, 'lostpointercapture', e => { if (e.target === element && this.pointer?.id === e.pointerId) this.up(e, true); });
    listen(element, 'wheel', e => this.wheel(e), { passive: false });
    listen(window, 'blur', () => { if (this.pointer) this.up({ pointerId: this.pointer.id }, true); this.wheelGesture = null; });
    listen(element, 'click', e => {
      const card = e.target.closest('.flow-card');
      if (!card || e.button !== 0) return;
      e.preventDefault(); e.stopPropagation();
      if (this.suppressClick) return;
      const index = this.cards.indexOf(card);
      if (Math.abs(this.delta(index - this.current)) > .025) this.select(index);
      else this.onOpen(index);
    });
    listen(element, 'keydown', e => {
      if (e.defaultPrevented || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'Home') this.select(0);
      else if (e.key === 'End') this.select(this.count - 1);
      else this.step(e.key === 'ArrowRight' ? 1 : -1);
      // keyboard focus lands on the destination at once, not after the boards have settled
      if (e.target.closest('.flow-card')) this.cards[this.mod(Math.round(this.target))]?.focus({ preventScroll: true });
    });
    listen(this.reduced, 'change', () => { if (this.reduced.matches && this.motion) this.finish(); });
  }

  mod(value) { return ((value % this.count) + this.count) % this.count; }
  delta(value) { return this.loop ? this.mod(value + this.count / 2) - this.count / 2 : value; }
  get edge() { return this.loop ? Math.min(3.6, this.count / 2 - .06) : Infinity; }

  /** Card width and the four reference positions of V42, from the width of the content. */
  measure() {
    const width = document.documentElement.clientWidth || innerWidth;
    const content = this.element.closest('.project-station')?.querySelector('.content-width')?.clientWidth || width * .88;
    const card = Math.min(640, content * (width < 768 ? .5 : .38));
    this.width = card;
    this.element.style.setProperty('--card-width', `${card.toFixed(2)}px`);
    const edge = content / 2 - card * SCALES[2] / 2;
    this.positions = [0, edge * .54, edge, content / 2 + card * SCALES[3] * .3];
    this.stride = Math.max(40, this.positions[1]);
    this.render();
  }

  pose(distance) {
    const a = Math.abs(distance), s = Math.sign(distance), P = this.positions;
    let x, scale;
    if (a <= 3) {
      const i = Math.min(2, Math.floor(a)), t = a - i;
      x = P[i] + (P[i + 1] - P[i]) * t;
      scale = SCALES[i] + (SCALES[i + 1] - SCALES[i]) * t;
    } else {
      x = P[3] + (P[3] - P[2]) * (a - 3);
      scale = Math.max(.3, SCALES[3] - .14 * (a - 3));
    }
    // fully readable up to the second pair, the outer pair at about half, then gone well before it recycles
    const opacity = a <= 2 ? 1 : a <= 3 ? 1 - .52 * smooth(a - 2) : Math.max(0, .48 * (1 - (a - 3) / .6));
    return { x: s * x, scale, opacity };
  }

  render() {
    const active = this.mod(Math.round(this.current)), edge = this.edge;
    this.cards.forEach((card, index) => {
      const distance = this.delta(index - this.current), a = Math.abs(distance);
      const hidden = a >= edge || a > 3.6;
      if (!hidden && a < 3.7) this.hydrate(card);
      const { x, scale, opacity } = this.pose(distance);
      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(3)}px), 0, 0) scale(${scale.toFixed(5)})`;
      const fade = Math.min(1, a);
      card.style.opacity = (hidden ? 0 : opacity * Math.min(1, Math.max(0, (edge - a) / .4))).toFixed(4);
      card.style.visibility = hidden ? 'hidden' : 'visible';
      card.style.zIndex = String(100 - Math.round(a * 20));
      // the selected board is in colour; neighbours turn grey and darker with distance (read by the engine too)
      card.style.filter = `grayscale(${smooth(fade).toFixed(4)}) brightness(${(1 - Math.min(a, 3.6) * .14).toFixed(4)})`;
      card.style.setProperty('--slide-focus', Math.max(0, 1 - a * .3).toFixed(4));
      const isActive = index === active;
      card.dataset.active = String(isActive);
      card.dataset.distance = String(Math.round(a));
      card.tabIndex = isActive ? 0 : -1;
      card.setAttribute('aria-hidden', String(hidden));
      card.setAttribute('aria-current', String(isActive));
      card.style.pointerEvents = hidden ? 'none' : 'auto';
    });
    this.active = active;
    this.onRender();
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
    if (this.motion.kind === 'drag') {
      this.current += (this.target - this.current) * (1 - Math.exp(-dt / 32));
      if (Math.abs(this.current - this.target) < .0001) { this.current = this.target; this.render(); this.element.classList.remove('is-moving'); return; }
    } else {
      // Critical damping preserves position and velocity without snapping or bouncing (LevelUp V20).
      const omega = 1 / 145, offset = this.current - this.target, mixed = this.velocity + omega * offset, decay = Math.exp(-omega * dt);
      this.current = this.target + (offset + mixed * dt) * decay;
      this.velocity = (this.velocity - omega * mixed * dt) * decay;
      if (Math.abs(this.target - this.current) < .00012 && Math.abs(this.velocity) < .000002) { this.finish(); return; }
    }
    this.render();
    this.raf = requestAnimationFrame(time => this.frame(time));
  }

  finish() {
    cancelAnimationFrame(this.raf); this.raf = 0;
    this.current = this.target = this.loop ? this.mod(Math.round(this.target)) : Math.round(this.target);
    this.velocity = 0; this.motion = null;
    this.render();
    this.element.classList.remove('is-moving');
  }

  settle(velocity = 0) {
    if (!this.loop) this.target = Math.max(0, Math.min(this.count - 1, this.target));
    // the destination is intentional: the content changes now, while the boards are still moving
    this.onSelect(this.mod(Math.round(this.target)));
    const gap = this.target - this.current;
    this.velocity = Math.sign(gap) === Math.sign(velocity) ? Math.sign(velocity) * Math.min(Math.abs(velocity), Math.abs(gap) / 145) : 0;
    this.motion = { kind: 'settle' };
    if (this.reduced.matches) this.finish(); else this.requestFrame();
  }

  /** Moves to a card; `silent` skips onSelect (the page already shows that project). */
  select(index, { silent = false } = {}) {
    this.target = this.current + this.delta(index - this.current);
    if (!this.loop) this.target = index;
    if (silent) { const notify = this.onSelect; this.onSelect = () => {}; this.settle(); this.onSelect = notify; }
    else this.settle();
  }

  step(direction) {
    if (this.count < 2) return;
    if (!this.loop) { this.select(this.mod(Math.round(this.target) + direction)); return; }
    this.target = Math.round(this.target) + direction;
    this.settle();
  }

  wheel(event) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || this.pointer || this.count < 2) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? this.width : 1;
    const dx = (event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX) * unit;
    const dy = event.shiftKey && !event.deltaX ? 0 : event.deltaY * unit;
    if (!Number.isFinite(dx) || Math.abs(dx) < .1 || Math.abs(dx) <= Math.abs(dy) * 1.1) return;
    if (event.cancelable) event.preventDefault();
    const now = performance.now(), magnitude = Math.abs(dx), direction = Math.sign(dx);
    let g = this.wheelGesture;
    if (!g || now - g.lastAt > 160 || direction !== g.direction || (g.committed && now - g.committedAt > 380 && magnitude > g.peak * .6)) {
      g = this.wheelGesture = { direction, total: 0, peak: magnitude, committed: false };
    }
    g.lastAt = now; g.peak = Math.max(g.peak, magnitude);
    if (g.committed) return;
    g.total += magnitude;
    if (g.total >= 12) { g.committed = true; g.committedAt = now; this.step(direction); }
  }

  down(event) {
    if (event.isPrimary === false && this.pointer) { this.up({ pointerId: this.pointer.id }, true); return; }
    if (this.pointer || event.isPrimary === false || event.button !== 0 || this.count < 2) return;
    const origin = Math.round(this.motion?.kind === 'settle' ? this.target : this.current);
    this.wheelGesture = null;
    cancelAnimationFrame(this.raf); this.raf = 0; this.motion = null;
    this.target = this.current; this.suppressClick = false;
    this.pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, start: this.current, origin, lastX: event.clientX, lastT: performance.now(), velocity: 0, axis: null };
  }

  move(event) {
    const p = this.pointer;
    if (!p || p.id !== event.pointerId || p.axis === 'y') return;
    const dx = event.clientX - p.x, dy = event.clientY - p.y;
    if (!p.axis) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) * 1.1) { p.axis = 'y'; return; }
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy) * 1.1) return;
      p.axis = 'x';
      try { this.element.setPointerCapture(event.pointerId); } catch { /* already released by native scrolling */ }
      this.element.classList.add('is-dragging');
    }
    if (event.cancelable) event.preventDefault();
    const now = performance.now(), speed = -(event.clientX - p.lastX) / (Math.max(8, now - p.lastT) * this.stride);
    p.velocity = p.velocity * .35 + speed * .65; p.lastX = event.clientX; p.lastT = now;
    this.target = p.start - dx / this.stride;
    if (!this.loop) this.target = Math.max(-.35, Math.min(this.count - .65, this.target));
    this.motion = { kind: 'drag' };
    if (this.reduced.matches) { this.current = this.target; this.render(); } else this.requestFrame();
  }

  up(event, cancelled = false) {
    const p = this.pointer;
    if (!p || event.pointerId !== p.id) return;
    const dx = (event.clientX ?? p.lastX) - p.x, dy = (event.clientY ?? p.y) - p.y;
    if (!cancelled && !p.axis && Math.abs(dx) >= 18 && Math.abs(dx) > Math.abs(dy) * 1.15) { p.axis = 'x'; this.target = p.start - dx / this.stride; }
    this.pointer = null;
    this.element.classList.remove('is-dragging');
    if (this.element.hasPointerCapture?.(p.id)) this.element.releasePointerCapture(p.id);
    if (p.axis !== 'x') {
      // a tap: the content does not change, the boards return to rest
      if (Math.abs(this.current - p.origin) > .0001) { this.target = p.origin; this.motion = { kind: 'settle' }; this.requestFrame(); }
      return;
    }
    this.suppressClick = true;
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => { this.suppressClick = false; }, 450);
    if (cancelled) { this.target = p.origin; this.motion = { kind: 'settle' }; this.requestFrame(); return; }
    this.target = p.start - dx / this.stride;
    const velocity = performance.now() - p.lastT > 100 ? 0 : Math.max(-.004, Math.min(.004, p.velocity));
    const progress = this.target - p.start;
    const projection = Math.abs(dx) >= 12 ? Math.max(-.7, Math.min(.7, velocity * 220)) : 0;
    let destination = Math.round(this.target + projection);
    if (Math.abs(dx) >= 18 || Math.abs(progress) > .12 || (Math.abs(dx) >= 12 && Math.abs(velocity) > .0005)) {
      const direction = Math.sign(Math.abs(dx) >= 18 ? -dx : Math.abs(progress) > .04 ? progress : velocity);
      destination = direction > 0 ? Math.max(destination, p.origin + 1) : Math.min(destination, p.origin - 1);
    }
    this.target = destination;
    if (Math.round(this.mod(destination)) === this.mod(p.origin) && destination === p.origin) { this.motion = { kind: 'settle' }; this.requestFrame(); return; }
    this.settle(velocity);
  }

  destroy() {
    this.controller.abort();
    cancelAnimationFrame(this.raf);
    clearTimeout(this.clickTimer);
    this.observer.disconnect();
    this.motion = this.pointer = this.wheelGesture = null;
  }
}
