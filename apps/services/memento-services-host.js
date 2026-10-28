/* Load this small helper in Memento Nav, outside the services iframe.
   Mark its iframe with data-memento-services. No origins are wildcard-trusted. */
(() => {
  if (window.MementoServicesSurface) return;
  const frames = new Map();
  const bind = frame => {
    if (frames.has(frame)) return;
    let origin;
    try { origin = new URL(frame.src, document.baseURI).origin; } catch (_) { return; }
    if (!/^https?:/.test(origin)) return;
    frames.set(frame, origin);
    frame.style.background = 'transparent';
    frame.style.backdropFilter = 'blur(var(--memento-services-blur, 8px))';
    frame.style.webkitBackdropFilter = 'blur(var(--memento-services-blur, 8px))';
    frame.style.setProperty('--memento-services-blur', '8px');
    const request = () => frame.contentWindow?.postMessage({type: 'memento:services:request-surface', version: 1}, origin);
    frame.addEventListener('load', request);
    request();
  };
  const refresh = () => {
    for (const frame of frames.keys()) if (!frame.isConnected) frames.delete(frame);
    document.querySelectorAll('iframe[data-memento-services]').forEach(bind);
  };
  window.addEventListener('message', event => {
    const data = event.data;
    if (data?.type !== 'memento:services:surface' || data.version !== 1 || typeof data.overlayOpen !== 'boolean') return;
    for (const [frame, origin] of frames) {
      if (event.source !== frame.contentWindow || event.origin !== origin) continue;
      frame.style.setProperty('--memento-services-blur', data.overlayOpen ? '20px' : '8px');
      frame.dataset.servicesOverlay = String(data.overlayOpen);
    }
  });
  window.MementoServicesSurface = Object.freeze({refresh});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refresh, {once: true});
  else refresh();
  const observer = new MutationObserver(refresh);
  observer.observe(document.documentElement, {childList: true, subtree: true});
  window.addEventListener('pagehide', () => observer.disconnect(), {once: true});
})();
