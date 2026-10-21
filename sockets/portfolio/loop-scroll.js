/** Native, bidirectional scrolling. Rebase onto identical pixels in three cycles. */
export class LoopScroll {
  constructor(viewport, root, range) {
    Object.assign(this, { viewport, root, range, height: 0, active: false, dragging: false, frame: 0 });
    this.observer = new ResizeObserver(() => this.measure());
    viewport.addEventListener('scroll', () => this.schedule(), { passive: true });
    range.addEventListener('pointerdown', () => { this.dragging = true; });
    window.addEventListener('pointerup', () => this.endDrag());
    window.addEventListener('pointercancel', () => this.endDrag());
    range.addEventListener('input', () => this.seek(Number(range.value) / 1000));
    range.addEventListener('change', () => this.endDrag());
  }
  start() {
    this.stop();
    this.active = true;
    this.cycle = this.root.querySelector('[data-cycle="1"]');
    this.height = 0;
    this.measure(true);
    this.observer.observe(this.cycle);
    this.observer.observe(this.viewport);
  }
  stop() {
    this.active = false;
    this.observer.disconnect();
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.dragging = false;
  }
  phase() {
    if (!this.height) return 0;
    const offset = ((this.viewport.scrollTop % this.height) + this.height) % this.height;
    // scrollTop may round fractional layout pixels at either edge of the cycle.
    return offset < 0.5 || this.height - offset < 0.5 ? 0 : offset / this.height;
  }
  measure(reset = false) {
    if (!this.active) return;
    const height = this.cycle.getBoundingClientRect().height;
    if (!height || (!reset && Math.abs(height - this.height) < 0.5)) return;
    const progress = reset ? 0 : this.phase();
    this.height = height;
    this.viewport.scrollTo({ top: height * (1 + progress), behavior: 'instant' });
    this.update();
  }
  schedule() {
    if (!this.active || this.frame) return;
    this.frame = requestAnimationFrame(() => { this.frame = 0; this.update(); });
  }
  update() {
    if (!this.active || !this.height) return;
    const y = this.viewport.scrollTop;
    if (!this.dragging && (y < this.height * 0.5 || y >= this.height * 2 - 0.5)) {
      this.viewport.scrollTo({ top: this.height * (1 + this.phase()), behavior: 'instant' });
    }
    if (!this.dragging) this.range.value = Math.round(this.phase() * 1000);
    this.range.setAttribute('aria-valuetext', `${Math.round(Number(this.range.value) / 10)}% del progetto`);
  }
  seek(progress, behavior = 'instant') {
    if (this.active) this.viewport.scrollTo({ top: this.height * (1 + Math.max(0, Math.min(1, progress))), behavior });
  }
  endDrag() {
    if (this.dragging) { this.dragging = false; this.update(); }
  }
  offset(element) {
    return element.getBoundingClientRect().top - this.cycle.getBoundingClientRect().top - (parseFloat(getComputedStyle(element).scrollMarginTop) || 0);
  }
  toElement(element, behavior = 'smooth') {
    if (!this.active || !element) return;
    this.viewport.scrollTo({ top: this.height + this.offset(element), behavior });
  }
  next(behavior = 'smooth') {
    const gallery = this.cycle.querySelector('.gallery-section');
    const top = this.offset(gallery);
    if (this.phase() < top / this.height - 0.03) this.toElement(gallery, behavior);
    else this.seek(1, behavior);
  }
}
