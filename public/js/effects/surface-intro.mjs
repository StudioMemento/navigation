// Opening a page: one front of grey glyphs leaves the logotype and every surface on screen appears as it is reached.
// The document holds the surfaces back with a CSS gate that releases on its own, so nothing stays hidden.
const FRONT = 1150, FADE = 420, WAIT = 600;

export function playIntro(field) {
  const root = document.documentElement;
  const open = () => root.setAttribute('data-mm-intro', 'done');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('animate' in Element.prototype)) {open(); return;}
  const started = performance.now();
  function run() {
    const brand = document.querySelector('.mm-brand')?.getBoundingClientRect();
    const x = brand ? brand.left + brand.width / 2 : innerWidth / 2, y = brand ? brand.bottom : 0;
    for (const tab of document.querySelectorAll('.mm-tab')) {
      if (tab.closest('dialog,[hidden],.mm-dock,.mm-header')) continue;
      const b = tab.getBoundingClientRect();
      if (!b.width || b.bottom < 0 || b.top > innerHeight || b.right < 0 || b.left > innerWidth) continue;
      const dx = Math.max(b.left - x, 0, x - b.right), dy = Math.max(b.top - y, 0, y - b.bottom);
      tab.animate([{opacity:0, offset:0}], {duration:FADE, delay:Math.hypot(dx, dy) / FRONT * 1000 + 60, easing:'cubic-bezier(.22,1,.36,1)', fill:'backwards'});
    }
    open();
    if (field?.ready) field.impulse(x, y, {warm:false, surface:true, feed:false, speed:FRONT, reach:2400});
  }
  // Wait for the field (a small atlas) at most a moment; the surfaces never wait for it.
  (function wait() {
    if (field?.ready || performance.now() - started > WAIT) requestAnimationFrame(run);
    else setTimeout(wait, 40);
  })();
}
