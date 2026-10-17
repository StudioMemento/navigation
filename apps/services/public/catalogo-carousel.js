/* Shared, independent slide stacks. No autoplay; horizontal drag keeps page scrolling free. */
class MementoCarousel {
  constructor(element, {initial = 0, onSettle = () => {}, onOpen = () => {}} = {}) {
    this.element = element;
    this.cards = [...element.querySelector('.carousel-stage').children];
    this.count = this.cards.length;
    this.current = this.target = this.active = initial;
    this.onSettle = onSettle;
    this.onOpen = onOpen;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.raf = 0;
    this.pointer = null;
    this.suppressClick = false;
    this.measure = () => {
      this.width = this.cards[0]?.offsetWidth || 1;
      this.height = this.cards[0]?.offsetHeight || 1;
      this.render();
    };
    this.observer = new ResizeObserver(this.measure);
    this.observer.observe(element);
    this.measure();
    element.addEventListener('dragstart', event => event.preventDefault());
    element.addEventListener('pointerdown', event => this.down(event));
    element.addEventListener('pointermove', event => this.move(event));
    element.addEventListener('pointerup', event => this.up(event));
    element.addEventListener('pointercancel', event => this.up(event, true));
    element.addEventListener('lostpointercapture', event => { if (this.pointer) this.up(event, true); });
    element.addEventListener('click', event => {
      const card = event.target.closest('[data-slide]');
      if (!card || this.suppressClick) return;
      const index = Number(card.dataset.slide);
      if (index !== this.mod(Math.round(this.target)) || Math.abs(this.current - this.target) > 0.02) this.select(index);
      else this.onOpen(index);
    });
    element.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      this.focusAfterSettle = true;
      if (event.key === 'Home') this.select(0);
      else if (event.key === 'End') this.select(this.count - 1);
      else this.step(event.key === 'ArrowRight' ? 1 : -1);
    });
  }
  mod(value) { return ((value % this.count) + this.count) % this.count; }
  delta(value) { return this.mod(value + this.count / 2) - this.count / 2; }
  render() {
    this.cards.forEach((card, index) => {
      const distance = this.delta(index - this.current);
      const amount = Math.abs(distance), sign = Math.sign(distance);
      const x = distance * this.width * 0.69;
      const y = this.height * 0.035 * Math.min(amount, 2.6);
      const scale = Math.pow(0.88, amount);
      const yaw = -sign * Math.min(38, amount * 24);
      const roll = this.element.classList.contains('bundle-carousel') ? sign * Math.min(4, amount * 2) : 0;
      const visible = Math.max(0, Math.min(1, (2.7 - amount) * 2));
      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), ${y.toFixed(2)}px, ${(-amount * 55).toFixed(2)}px) rotateY(${yaw.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
      card.style.opacity = visible.toFixed(3);
      card.style.zIndex = String(100 - Math.round(amount * 20));
      const isActive = amount < 0.51;
      card.dataset.active = String(isActive);
      card.tabIndex = isActive ? 0 : -1;
      card.setAttribute('aria-hidden', String(amount > 2.65));
      card.style.pointerEvents = amount > 2.65 ? 'none' : 'auto';
    });
  }
  animate() {
    cancelAnimationFrame(this.raf);
    let previous = performance.now();
    const frame = now => {
      const dt = Math.min(40, Math.max(1, now - previous));
      previous = now;
      this.current += (this.target - this.current) * (1 - Math.exp(-dt / 105));
      if (this.reduced.matches || Math.abs(this.target - this.current) < 0.001) {
        this.current = this.target;
        this.render();
        const index = this.mod(Math.round(this.target));
        if (index !== this.active) { this.active = index; this.onSettle(index); }
        if (this.focusAfterSettle) { this.cards[index].focus({preventScroll: true}); this.focusAfterSettle = false; }
        this.raf = 0;
        return;
      }
      this.render();
      this.raf = requestAnimationFrame(frame);
    };
    this.raf = requestAnimationFrame(frame);
  }
  select(index) { this.target = Math.round(this.current) + this.delta(index - this.mod(Math.round(this.current))); this.animate(); }
  step(direction) { this.target = Math.round(this.target) + direction; this.animate(); }
  down(event) {
    if (event.button !== 0 || !event.isPrimary && event.isPrimary !== undefined) return;
    this.pointer = {id: event.pointerId, x: event.clientX, y: event.clientY, start: this.current, lastX: event.clientX, lastT: performance.now(), velocity: 0, drag: false, vertical: false};
  }
  move(event) {
    const pointer = this.pointer;
    if (!pointer || pointer.id !== event.pointerId || pointer.vertical) return;
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    if (!pointer.drag) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) { pointer.vertical = true; return; }
      if (Math.abs(dx) < 7) return;
      pointer.drag = true;
      cancelAnimationFrame(this.raf);
      pointer.start = this.current;
      this.element.setPointerCapture(event.pointerId);
      this.element.classList.add('is-dragging');
    }
    const now = performance.now();
    pointer.velocity = (event.clientX - pointer.lastX) / Math.max(8, now - pointer.lastT);
    pointer.lastX = event.clientX;
    pointer.lastT = now;
    this.current = pointer.start - dx / (this.width * 0.7);
    this.target = this.current;
    this.render();
  }
  up(event, cancel = false) {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.id) return;
    this.pointer = null;
    this.element.classList.remove('is-dragging');
    if (this.element.hasPointerCapture(pointer.id)) this.element.releasePointerCapture(pointer.id);
    if (!pointer.drag) return;
    this.suppressClick = true;
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => { this.suppressClick = false; }, 140);
    const velocity = performance.now() - pointer.lastT > 90 ? 0 : pointer.velocity;
    const projection = cancel ? 0 : Math.max(-0.95, Math.min(0.95, -velocity * 150 / (this.width * 0.7)));
    this.target = Math.round(this.current + projection);
    this.animate();
  }
}
