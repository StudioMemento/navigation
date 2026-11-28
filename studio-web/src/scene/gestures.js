const gap = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// Track each contact explicitly so lifting the second finger starts a fresh drag.
export function bindGestures(element, actions) {
  const abort = new AbortController();
  const contacts = new Map();
  let dragged = false,
    pinch = 0;
  const local = (event) => {
    const rect = element.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const distance = () => {
    const points = [...contacts.values()];
    return points.length === 2 ? gap(points[0].position, points[1].position) : 0;
  };
  function down(event) {
    if (event.button !== 0 || !actions.enabled()) return;
    if (!contacts.size) dragged = false;
    const position = local(event);
    contacts.set(event.pointerId, { start: { ...position }, position });
    element.setPointerCapture(event.pointerId);
    element.dataset.pointerFocus = 'true';
    element.focus({ preventScroll: true });
    element.dataset.dragging = 'true';
    if (contacts.size === 2) {
      pinch = distance();
      dragged = true;
    }
  }
  function move(event) {
    const p = local(event),
      contact = contacts.get(event.pointerId);
    if (!contact) {
      if (event.pointerType !== 'touch') actions.hover(p.x, p.y);
      return;
    }
    const dx = p.x - contact.position.x,
      dy = p.y - contact.position.y;
    contact.position = p;
    if (contacts.size === 1) {
      dragged ||= gap(contact.start, p) > 3;
      if (!dragged) return;
      const sensitivity = Math.PI / Math.max(330, Math.min(800, element.clientWidth * 0.68));
      actions.rotate(-dx * sensitivity, dy * sensitivity);
    } else if (contacts.size === 2) {
      const next = distance();
      if (pinch > 3 && next > 3) actions.zoom(next / pinch);
      pinch = next;
    }
  }
  function up(event) {
    if (!contacts.has(event.pointerId)) return;
    const p = local(event);
    const cancelled = event.type === 'pointercancel' || event.type === 'lostpointercapture';
    contacts.delete(event.pointerId);
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    if (contacts.size) {
      for (const contact of contacts.values()) contact.start = { ...contact.position };
      return;
    }
    delete element.dataset.dragging;
    if (!cancelled) actions.release(p.x, p.y, dragged);
  }
  function wheel(event) {
    if (!actions.enabled()) return;
    event.preventDefault();
    const pixels =
      event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1);
    actions.zoom(Math.exp(-Math.max(-180, Math.min(180, pixels)) * 0.0014));
  }
  function key(event) {
    delete element.dataset.pointerFocus;
    if (!actions.enabled() || event.altKey || event.ctrlKey || event.metaKey) return;
    const step = event.shiftKey ? 0.16 : 0.078;
    switch (event.key) {
      case 'ArrowLeft':
        actions.rotate(-step, 0);
        break;
      case 'ArrowRight':
        actions.rotate(step, 0);
        break;
      case 'ArrowUp':
        actions.rotate(0, step);
        break;
      case 'ArrowDown':
        actions.rotate(0, -step);
        break;
      case '+':
      case '=':
        actions.zoom(1.07);
        break;
      case '-':
        actions.zoom(1 / 1.07);
        break;
      case 'Home':
        actions.reset();
        break;
      default:
        return;
    }
    event.preventDefault();
  }
  for (const [name, fn] of Object.entries({
    pointerdown: down,
    pointermove: move,
    pointerup: up,
    pointercancel: up,
    lostpointercapture: up,
    pointerleave: () => {
      if (!contacts.size) actions.leave();
    },
    blur: () => {
      delete element.dataset.pointerFocus;
    },
    keydown: key,
    wheel,
  })) {
    element.addEventListener(name, fn, {
      signal: abort.signal,
      passive: name !== 'wheel' && name !== 'keydown',
    });
  }
  return () => abort.abort();
}
