// One short gesture, continued on the arriving document using its native navigation clock.
const duration = 280;
const svgNS = 'http://www.w3.org/2000/svg';

function makeMark(source) {
  const template = document.createElement('template');
  template.innerHTML = source;
  const strokes = template.content.querySelectorAll('#V_E_C path, #V_E_C polygon');
  if (strokes.length !== 2) return;
  const mark = document.createElementNS(svgNS, 'svg');
  mark.setAttribute('class', 'memento-route-mark');
  mark.setAttribute('viewBox', '37 40 146 160');
  mark.setAttribute('aria-hidden', 'true');
  mark.setAttribute('focusable', 'false');
  for (const stroke of strokes) {
    stroke.removeAttribute('class');
    mark.append(stroke);
  }
  return mark;
}

export async function installRouteMark(otherPage, arrived, motion) {
  if (!Element.prototype.animate) return;
  // Production embeds the artwork at build time. The unbundled development entry can use the file.
  const source = import.meta.mementoIcon || await fetch('/memento-ui/memento-icon.svg').then(r => r.ok ? r.text() : '');
  const mark = makeMark(source);
  if (!mark) return;
  let frame = 0;
  let animations = [];
  function clear() {
    cancelAnimationFrame(frame);
    for (const animation of animations) {
      animation.onfinish = null;
      animation.cancel();
    }
    animations = [];
    mark.remove();
  }
  function show(start) {
    clear();
    frame = requestAnimationFrame(() => {
      const elapsed = Math.max(0, performance.now() - start);
      if (elapsed >= duration || motion.matches || document.hidden) return;
      document.body.append(mark);
      animations = [...mark.children].map((stroke, index) => {
        const side = index ? 1 : -1;
        return stroke.animate([
          {opacity:0, transform:`translate(${side * 8}px,${-side * 3}px)`},
          {offset:.33, opacity:.94, transform:'none'},
          {offset:.52, opacity:.94, transform:'none'},
          {opacity:0, transform:`translate(${-side * 5}px,${side * 2}px)`}
        ], {duration, delay:-elapsed, easing:'ease-out', fill:'both'});
      });
      animations[0].onfinish = clear;
    });
  }
  // These listeners only schedule two tiny transforms. They never intercept a navigation.
  if (window.navigation) {
    window.navigation.addEventListener('navigate', event => {
      if (!event.defaultPrevented && event.navigationType !== 'reload' && !event.hashChange &&
          event.downloadRequest == null && !event.formData && otherPage(event.destination.url)) show(performance.now());
    });
  } else {
    window.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.composedPath().find(node => node instanceof HTMLAnchorElement);
      if (link && !link.hasAttribute('download') && ['', '_self', '_top', '_parent'].includes(link.target) &&
          otherPage(link.href)) show(performance.now());
    });
  }
  window.addEventListener('pagehide', clear);
  motion.addEventListener('change', () => { if (motion.matches) clear(); });
  if (arrived && performance.now() < duration) show(0);
}
