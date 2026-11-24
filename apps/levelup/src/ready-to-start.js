// Ready to start: the published effect (https://visualfx.vercel.app/), embedded through ready-to-start/embed.html.
// LevelUp owns loading, visibility and the destination. The effect's own CTA is routed to Start in the top window,
// with the context of the visit (the experience selected above), exactly like the plain link underneath it.
export const START_EMBED = 'https://visualfx.vercel.app/';
const MESSAGE = 'memento:ready-to-start';

export function mountStart({ destination = () => null } = {}) {
  const box = document.getElementById('start-embed');
  const frame = document.getElementById('start-frame');
  const link = document.getElementById('contact-link');
  if (!box || !frame || !link) return;
  const events = new AbortController();
  const on = (target, type, listener, options = {}) => target.addEventListener(type, listener, { ...options, signal: events.signal });
  let timer = 0;
  const state = value => { box.dataset.state = value; };

  function load() {
    if (frame.getAttribute('src') || !frame.dataset.src) return;
    state('loading');
    frame.src = frame.dataset.src;
    // A frame that never answers leaves the plain CTA in charge; a late answer still brings the effect in.
    clearTimeout(timer);
    timer = setTimeout(() => { if (box.dataset.state === 'loading') state('fallback'); }, 15000);
  }

  function start() {
    if (box.dataset.state === 'leaving') return;
    state('leaving');
    // The click happened inside the effect: its activation reaches this frame, so _top may navigate when hosted.
    // Inside the Memento hub the hub opens Start itself, with the same context (bridge 13).
    const url = destination() || link.href;
    if (!window.MementoNavigation?.navigate?.(url)) window.open(url, '_top');
  }

  on(window, 'message', event => {
    if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
    const data = event.data;
    if (!data || data.type !== MESSAGE || data.version !== 1) return;
    if (data.event === 'ready') { clearTimeout(timer); state('ready'); }
    else if (data.event === 'start') start();
    else if (data.event === 'fallback' && box.dataset.state === 'loading') state('fallback');
  });

  // Loaded near the viewport only: the effect is a WebGL page of its own.
  if ('IntersectionObserver' in window) {
    const near = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      near.disconnect();
      load();
    }, { rootMargin: '360px' });
    near.observe(box);
    events.signal.addEventListener('abort', () => near.disconnect());
  } else load();
  // Keyboard users reach the link first: the effect may follow, it is never in their way.
  on(link, 'focus', load);

  // Back from Start through the page cache: the wrapper restores the effect and says so; until then, the plain CTA.
  on(window, 'pageshow', event => { if (event.persisted && box.dataset.state === 'leaving') state('loading'); });
  on(window, 'pagehide', event => { if (!event.persisted) { clearTimeout(timer); events.abort(); } });
}
