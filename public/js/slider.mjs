import { drumPose, drumEdge, perspectiveFor, poseTransform, poseBleed } from './effects/deck-pose.mjs';
import { setDeckMoving } from './effects/surface-targets.mjs';

// The one slider engine of the site (Services, LevelUp, the Portfolio strip). It owns horizontal gestures, the
// spring and the pose of every card (deck-pose.mjs); content and routing are callbacks.
//
// options:
//   cards       selector of the slides inside the element (default: the children of .carousel-stage)
//   loop        true, false, or 'auto' (loops when there are more than four slides)
//   active      the slide shown first
//   stride      px of drag per slide, as a share of the card width
//   fit         (slider) => sets the CSS size of the cards before they are measured
//   bleed       the element that reserves room above and below for the projected cards (null: none)
//   hideNeighbours  neighbours are hidden from assistive technology (the strip of the Portfolio keeps them)
//   focus       (distance) => --slide-focus, 1 on the active slide
//   hydrate     (card) => loads the media of a slide about to be seen
//   onSelect    the destination is chosen (click, key, wheel, released swipe), while the cards still move
//   onSettle    the active slide changed, during the move
//   onCommit    the cards came to rest
//   onOpen      the active slide was clicked
const ease = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
function hydrateImages(card) {
  for (const img of card.querySelectorAll('img')) {
    if (img.dataset.srcset) {img.srcset = img.dataset.srcset; delete img.dataset.srcset;}
    if (img.dataset.src) {img.src = img.dataset.src; delete img.dataset.src;}
    // Native lazy loading can miss projected 3D neighbours inside an overflow mask.
    img.loading = 'eager';
  }
}
const OMEGA = 1 / 95;

export class Slider {
  constructor(element, {
    cards = ':scope > .carousel-stage > *', loop = true, active = 0, stride = .55, fit = null, bleed,
    hideNeighbours = true, focus = distance => 1 - ease(Math.min(1, Math.abs(distance))),
    hydrate = hydrateImages, onSelect = () => {}, onSettle = () => {}, onCommit = () => {}, onOpen = () => {}
  } = {}) {
    this.element = element;
    this.cards = [...element.querySelectorAll(cards)];
    this.count = this.cards.length;
    this.loop = loop === 'auto' ? this.count > 4 : loop;
    this.strideShare = stride;
    this.fit = fit;
    this.bleed = bleed === undefined ? (element.closest('.bundle-opening') && element.classList.contains('bundle-carousel') ? element.closest('.bundle-opening') : element) : bleed;
    this.hideNeighbours = hideNeighbours;
    this.focusOf = focus;
    this.hydrate = hydrate;
    this.items = this.cards.map(card => ({
      card,
      controls:[...card.querySelectorAll('[data-slide-control]')], visible:null, active:null, hydrated:false
    }));
    this.saveData = !!navigator.connection?.saveData;
    Object.assign(this, {onSelect, onSettle, onCommit, onOpen});
    this.current = this.target = this.active = active;
    this.velocity = this.raf = 0;
    this.pointer = this.motion = this.wheelGesture = null;
    this.suspended = this.suppressClick = this.focusAfterSettle = false;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.controller = new AbortController();
    element.dataset.mmSlider = '';
    const listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, {...options, signal:this.controller.signal});
    this.observer = new ResizeObserver(() => this.measure());
    this.observer.observe(element);
    if (this.cards[0]) this.observer.observe(this.cards[0]);
    this.measure();
    element.querySelector('.carousel-stage')?.setAttribute('data-positioned', '');
    listen(element, 'dragstart', e => e.preventDefault());
    listen(element, 'pointerdown', e => this.down(e));
    listen(element, 'pointermove', e => this.move(e), {passive:false});
    listen(window, 'pointerup', e => this.up(e));
    listen(window, 'pointercancel', e => this.up(e, true));
    listen(element, 'wheel', e => this.wheel(e), {passive:false});
    listen(window, 'blur', () => {
      if (this.pointer) this.up({pointerId:this.pointer.id}, true);
      this.wheelGesture = null;
    });
    listen(element, 'lostpointercapture', e => {
      if (e.target === element && this.pointer?.id === e.pointerId) this.up(e, true);
    });
    listen(element, 'click', e => this.click(e));
    listen(element, 'keydown', e => this.key(e));
    listen(document, 'memento:overlay-change', () => {
      this.suspended = !!document.querySelector('dialog[open]') && !element.closest('dialog');
      if (this.suspended) {cancelAnimationFrame(this.raf); this.raf = 0;}
      else if (this.motion) this.requestFrame();
    });
    listen(this.reduced, 'change', () => { if (this.reduced.matches && this.motion) this.finish(); });
  }
  mod(value) { return ((value % this.count) + this.count) % this.count; }
  delta(value) { return this.loop ? this.mod(value + this.count / 2) - this.count / 2 : value; }
  // Cards hide before they wrap around to the other side.
  get edge() { return this.loop ? Math.min(drumEdge('wide'), this.count / 2 - .06) : drumEdge('wide'); }
  pose(distance) { return drumPose(distance, this.width, 'wide'); }

  measure() {
    this.fit?.(this);
    const width = this.cards[0]?.offsetWidth || 1;
    const height = this.cards[0]?.offsetHeight || 1;
    if (this.width === width && this.height === height) return;
    if (this.width && this.width !== width && this.pointer) this.up({pointerId:this.pointer.id}, true);
    this.width = width;
    this.height = height;
    this.stride = Math.max(40, width * this.strideShare);
    this.perspective = perspectiveFor(width);
    this.reserveBleed();
    this.render();
  }
  // A CSS mask clips to its box: reserve the projected envelope for every visible swipe position.
  reserveBleed() {
    if (!this.bleed) return;
    const {top, bottom} = poseBleed(d => this.pose(d), this.width, this.height, this.perspective, this.edge);
    for (const [side, amount] of [['top', top], ['bottom', bottom]]) {
      const property = '--carousel-bleed-' + side, value = Math.ceil(Math.max(0, amount)) + 24 + 'px';
      if (this.bleed.style.getPropertyValue(property) !== value) this.bleed.style.setProperty(property, value);
    }
  }
  render() {
    const active = this.mod(Math.round(this.current)), edge = this.edge;
    for (const [index,item] of this.items.entries()) {
      const {card} = item, distance = this.delta(index-this.current), amount = Math.abs(distance);
      const visible = amount < edge, isActive = index === active;
      if (!item.hydrated && amount < (this.saveData ? .6 : edge+.55)) {
        this.hydrate(card);
        item.hydrated = true;
      }
      if (item.active !== isActive || item.visible !== visible) {
        card.style.visibility = visible ? 'visible' : 'hidden';
        card.setAttribute('aria-hidden',String(this.hideNeighbours ? !isActive : !visible));
        if (item.active !== isActive) {
          card.dataset.active = String(isActive);
          card.tabIndex = isActive ? 0 : -1;
          if (isActive) card.setAttribute('aria-current','true'); else card.removeAttribute('aria-current');
          for (const control of item.controls) control.inert = !isActive;
          item.active = isActive;
        }
        item.visible = visible;
      }
      if (!visible) continue;
      const pose = this.pose(distance);
      card.style.transform = poseTransform(pose,this.perspective);
      card.style.zIndex = String(isActive ? 4 : 3-Math.floor(amount));
      card.style.opacity = String(Math.min(pose.opacity, Math.min(1,(edge-amount)/.35)));
      if (this.focusOf) card.style.setProperty('--slide-focus',this.focusOf(distance).toFixed(3));

    }
    if (active !== this.active) {this.active = active; this.onSettle(active);}
  }
  requestFrame() {
    if (this.raf || this.suspended) return;
    setDeckMoving(this.element,true);
    this.previous = performance.now();
    this.raf = requestAnimationFrame(now => this.frame(now));
  }
  frame(now) {
    this.raf = 0;
    if (!this.motion) return;
    if (this.motion === 'drag') {
      // Pointer samples are coalesced into one direct pose per displayed frame.
      this.current = this.target;
      this.render();
      return;
    }
    const dt = Math.max(0,now-this.previous);
    this.previous = now;
    const offset = this.current-this.target, mixed = this.velocity+OMEGA*offset, decay = Math.exp(-OMEGA*dt);
    this.current = this.target+(offset+mixed*dt)*decay;
    this.velocity = (this.velocity-OMEGA*mixed*dt)*decay;
    if (Math.abs(this.target-this.current)*this.width < .22 && Math.abs(this.velocity)*this.width < .003) {
      this.finish();
      return;
    }
    this.render();
    this.raf = requestAnimationFrame(time => this.frame(time));
  }
  finish() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.current = this.target = this.loop ? this.mod(Math.round(this.target)) : Math.round(this.target);
    this.velocity = 0;
    this.motion = null;
    this.render();
    setDeckMoving(this.element,false);
    this.onCommit(this.active);
    if (this.focusAfterSettle) {
      this.cards[this.active].focus({preventScroll:true});
      this.focusAfterSettle = false;
    }
  }
  // Move to the target with the spring; quiet: the destination is not a new choice (a tap, a cancelled drag).
  settle(velocity = this.velocity, quiet = false) {
    if (!this.loop) this.target = Math.max(0, Math.min(this.count - 1, this.target));
    if (!quiet) this.onSelect(this.mod(Math.round(this.target)));
    const gap = this.target - this.current;
    this.velocity = Math.sign(gap) === Math.sign(velocity) ? Math.sign(velocity) * Math.min(Math.abs(velocity), Math.abs(gap) * OMEGA) : 0;
    this.motion = 'settle';
    if (this.reduced.matches || Math.abs(gap) < .00001) this.finish(); else this.requestFrame();
  }
  // silent: the page already shows that slide (no onSelect).
  select(index, {silent = false} = {}) {
    this.target = this.loop ? this.current + this.delta(index - this.current) : index;
    this.settle(this.velocity,silent);
  }
  step(direction) {
    if (this.count < 2) return;
    this.target = Math.round(this.target) + direction;
    if (!this.loop) this.target = this.mod(this.target);
    this.settle();
  }
  click(e) {
    const card = this.cards.find(c => c.contains(e.target));
    if (!card || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.target.closest('[data-no-swipe]')) return;
    if (this.suppressClick) {e.preventDefault(); e.stopImmediatePropagation(); return;}
    const index = this.cards.indexOf(card), here = Math.abs(this.delta(index - this.current)) <= .025;
    if (here && e.target.closest('[data-domain-link]')) return;
    e.preventDefault();
    e.stopPropagation();
    if (here) this.onOpen(index); else this.select(index);
  }
  key(e) {
    if (e.defaultPrevented || e.target.closest('[data-mm-slider]') !== this.element || e.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    if (this.cards.includes(e.target)) this.focusAfterSettle = true;
    if (e.key === 'Home') this.select(0);
    else if (e.key === 'End') this.select(this.count - 1);
    else this.step(e.key === 'ArrowRight' ? 1 : -1);
  }
  wheel(event) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || this.pointer || this.count < 2) return;
    if (event.target.closest('[data-mm-slider]') !== this.element || event.target.closest('input,textarea,select,[contenteditable="true"],[data-no-swipe]')) return;
    // Vertical page scrolling and trackpad pinch zoom stay native. Shift with a mouse wheel scrolls sideways.
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? this.width : 1;
    const dx = (event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX) * unit;
    const dy = event.shiftKey && !event.deltaX ? 0 : event.deltaY * unit;
    if (!Number.isFinite(dx) || !Number.isFinite(dy) || Math.abs(dx) < .1 || Math.abs(dx) <= Math.abs(dy) * 1.1) return;
    if (event.cancelable) event.preventDefault();
    const now = performance.now(), magnitude = Math.abs(dx), direction = Math.sign(dx);
    let gesture = this.wheelGesture;
    const quiet = !gesture || now - gesture.lastAt > 160;
    const reverseTotal = gesture && direction !== gesture.direction ? (gesture.reverseTotal || 0) + magnitude : 0;
    if (gesture) gesture.reverseTotal = reverseTotal;
    const reverse = reverseTotal >= 12;
    // A fresh stroke can begin while the inertial tail of the previous one still arrives: a renewed pulse after the
    // tail re-arms the slider at once, the decaying tail itself never advances another slide.
    const freshPulse = gesture?.committed && direction === gesture.direction && now - gesture.committedAt >= 180 &&
      gesture.tail && magnitude >= Math.max(8, gesture.trough * 3);
    if (quiet || reverse || freshPulse) {
      gesture = this.wheelGesture = {direction, total:reverse && !quiet ? reverseTotal - magnitude : 0, peak:magnitude, trough:Infinity, tail:false, committed:false};
    }
    gesture.lastAt = now;
    if (direction !== gesture.direction) return;
    gesture.peak = Math.max(gesture.peak, magnitude);
    if (gesture.committed) {
      if (magnitude <= gesture.peak * .35) {gesture.tail = true; gesture.trough = Math.min(gesture.trough, magnitude);}
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
    if (event.isPrimary === false && this.pointer) {this.up({pointerId:this.pointer.id}, true); return;}
    if (this.pointer || event.isPrimary === false || event.button !== 0 || this.count < 2 ||
      event.target.closest('input,textarea,select,[contenteditable="true"],[data-no-swipe]')) return;
    const origin = Math.round(this.motion === 'settle' ? this.target : this.current);
    this.wheelGesture = null;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.motion = null;
    this.target = this.current;
    this.velocity = 0;
    this.suppressClick = false;
    this.pointer = {id:event.pointerId, x:event.clientX, y:event.clientY, start:this.current, origin, lastX:event.clientX, lastT:performance.now(), velocity:0, axis:null};
  }
  move(event) {
    const pointer = this.pointer;
    if (!pointer || pointer.id !== event.pointerId || pointer.axis === 'y') return;
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    if (!pointer.axis) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) * 1.1) {pointer.axis = 'y'; return;}
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy) * 1.1) return;
      pointer.axis = 'x';
      // Capture only a confirmed drag: a tap keeps its original target.
      try { this.element.setPointerCapture(event.pointerId); } catch { /* native scrolling may have released it */ }
      this.element.classList.add('is-dragging');
    }
    if (event.cancelable) event.preventDefault();
    const now = performance.now(), speed = -(event.clientX - pointer.lastX) / (Math.max(8, now - pointer.lastT) * this.stride);
    pointer.velocity = pointer.velocity * .35 + speed * .65;
    pointer.lastX = event.clientX;
    pointer.lastT = now;
    this.target = pointer.start - dx / this.stride;
    if (!this.loop) this.target = Math.max(-.35, Math.min(this.count - .65, this.target));
    this.motion = 'drag';
    this.requestFrame();
  }
  up(event, cancelled = false) {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.id) return;
    // A short flick can have no intermediate pointermove on a busy touch device.
    const dx = (event.clientX ?? pointer.lastX) - pointer.x, dy = (event.clientY ?? pointer.y) - pointer.y;
    if (!cancelled && !pointer.axis && Math.abs(dx) >= 18 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      pointer.axis = 'x';
      this.target = pointer.start - dx / this.stride;
    }
    this.pointer = null;
    this.element.classList.remove('is-dragging');
    if (this.element.hasPointerCapture?.(pointer.id)) this.element.releasePointerCapture(pointer.id);
    // A tap or a cancelled drag: the slides return to rest, nothing new is chosen.
    if (pointer.axis !== 'x' || cancelled) {
      if (pointer.axis === 'x') this.holdClicks();
      if (this.motion || this.element.classList.contains('is-moving') || Math.abs(this.current-pointer.origin) > .0001) {
        this.target = pointer.origin;
        this.settle(0,true);
      }
      return;
    }
    this.holdClicks();
    this.target = pointer.start - dx / this.stride;
    const velocity = performance.now() - pointer.lastT > 100 ? 0 : Math.max(-.004, Math.min(.004, pointer.velocity));
    const progress = this.target - pointer.start;
    const projection = Math.abs(dx) >= 12 ? Math.max(-.7, Math.min(.7, velocity * 220)) : 0;
    let destination = Math.round(this.target + projection);
    if (Math.abs(dx) >= 18 || Math.abs(progress) > .12 || (Math.abs(dx) >= 12 && Math.abs(velocity) > .0005)) {
      const direction = Math.sign(Math.abs(dx) >= 18 ? -dx : Math.abs(progress) > .04 ? progress : velocity);
      destination = direction > 0 ? Math.max(destination, pointer.origin + 1) : Math.min(destination, pointer.origin - 1);
    }
    this.target = destination;
    this.settle(velocity, destination === pointer.origin);
  }
  // The click that ends a drag must not open the slide under the pointer.
  holdClicks() {
    this.suppressClick = true;
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => { this.suppressClick = false; }, 450);
  }
  destroy() {
    this.controller.abort();
    cancelAnimationFrame(this.raf);
    clearTimeout(this.clickTimer);
    this.observer.disconnect();
    if (this.pointer && this.element.hasPointerCapture?.(this.pointer.id)) this.element.releasePointerCapture(this.pointer.id);
    this.motion = this.pointer = this.wheelGesture = null;
    this.element.classList.remove('is-dragging');
    setDeckMoving(this.element,false);
    delete this.element.dataset.mmSlider;
  }
}

// Dots under a slider: a click selects, the arrow keys move the focus and the selection together.
export function bindDots(element, slider, {attribute = 'dot', state = 'aria-pressed', signal} = {}) {
  const buttons = [...element.querySelectorAll(`[data-${attribute}]`)];
  let current = buttons.findIndex(button => button.getAttribute(state) === 'true');
  const update = index => {
    if (index === current) return;
    buttons[current]?.setAttribute(state, 'false');
    buttons[index]?.setAttribute(state, 'true');
    current = index;
  };
  element.addEventListener('click', event => {
    const button = event.target.closest(`[data-${attribute}]`);
    if (button) slider.select(Number(button.getAttribute(`data-${attribute}`)));
  }, {signal});
  element.addEventListener('keydown', event => {
    if (!buttons.includes(event.target) || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = buttons.indexOf(event.target);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : slider.mod(current + (event.key === 'ArrowRight' ? 1 : -1));
    buttons[next].focus({preventScroll:true});
    slider.select(next);
  }, {signal});
  return update;
}
