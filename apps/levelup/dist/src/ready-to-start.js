// LevelUp owns loading and page lifecycle; the cinematic renderer stays replaceable.
export function mountStart(card = document.querySelector('[data-ready-to-start]')) {
  if (!card) return;
  const events = new AbortController();
  let scene, loading, disposed = false, suspended = false, inView = false;
  const on = (target, type, listener) => target.addEventListener(type, listener, { signal: events.signal });

  function sync() {
    if (!scene) return;
    scene.visible = inView && !suspended && !document.hidden &&
      document.documentElement.dataset.demoExpanded !== 'true';
    if (scene.visible) scene.resume();
    else scene.pause();
  }

  async function load() {
    if (scene || loading || disposed) return;
    card.dataset.effectState = 'loading';
    loading = import('../ready-to-start/ready-to-start.js');
    try {
      const { ReadyToStart } = await loading;
      if (disposed) return;
      scene = new ReadyToStart(card);
      // A single host observer decides visibility, including full-screen demos.
      scene.intersection.disconnect();
      card.dataset.effectState = 'ready';
      near?.disconnect();
      sync();
    } catch {
      // The semantic link, static scene and title remain usable if loading fails.
      card.dataset.effectState = 'fallback';
      card.dataset.renderer = 'static';
      card.dataset.running = 'false';
    } finally {
      loading = null;
    }
  }

  const near = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) load();
  }, { rootMargin: '360px' }) : null;
  const visible = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    sync();
  }) : null;
  near?.observe(card);
  visible?.observe(card);
  // Without observer support the static CTA is the deliberate fallback.
  on(card, 'focus', () => { if (near) load(); });
  on(document, 'visibilitychange', sync);
  on(document, 'memento:overlay-change', sync);
  on(window, 'pagehide', event => {
    suspended = true;
    sync();
    if (!event.persisted) {
      disposed = true;
      near?.disconnect();
      visible?.disconnect();
      scene?.destroy();
      events.abort();
    }
  });
  on(window, 'pageshow', () => { suspended = false; sync(); });
}
