/* Detail boards reuse the page carousel; only the surrounding dialog is different. */
class MementoServiceDeck {
  constructor(element) {
    this.element = element;
    this.scenes = [...element.querySelectorAll('.service-scene')];
    this.dots = [...element.querySelectorAll('[data-scene-dot]')];
    this.controller = new AbortController();
    const options = {signal: this.controller.signal};
    this.carousel = new MementoCarousel(element.querySelector('.popup-carousel'), {
      interactiveContents: true,
      autoplay: false,
      onSettle: index => this.update(index)
    });
    element.addEventListener('click', event => {
      const dot = event.target.closest('[data-scene-dot]');
      if (dot) this.show(Number(dot.dataset.sceneDot));
      const step = event.target.closest('[data-scene-step]');
      if (step) this.carousel.step(Number(step.dataset.sceneStep));
    }, options);
    element.addEventListener('keydown', event => {
      if (event.defaultPrevented || event.target.closest('input, textarea, select, [contenteditable="true"]') || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? this.scenes.length - 1 : this.active + (event.key === 'ArrowRight' ? 1 : -1);
      this.show(next, true);
    }, options);
    this.update(0);
  }
  get active() { return this.carousel.active; }
  update(index) {
    this.dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    this.element.querySelector('.service-deck-status').textContent = this.dots[index].getAttribute('aria-label');
    const focusedBoard = document.activeElement?.closest('.service-scene');
    if (focusedBoard && focusedBoard !== this.scenes[index]) this.scenes[index].focus({preventScroll: true});
  }
  show(index, focus = false) {
    this.carousel.focusAfterSettle = focus;
    this.carousel.select(this.carousel.mod(index));
  }
  destroy() { this.controller.abort(); this.carousel.destroy(); }
}
