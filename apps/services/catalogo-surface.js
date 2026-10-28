/* Transparent child surface. Parent blur belongs to the hosting document. */
(() => {
  const embedded = window.parent !== window;
  document.documentElement.dataset.embedded = String(embedded);
  if (!embedded) return;

  let parentOrigin = null;
  try { parentOrigin = new URL(document.referrer).origin; } catch (_) { /* Handshake below. */ }
  let overlayOpen = false;
  const announce = () => {
    if (!parentOrigin || parentOrigin === 'null') return;
    window.parent.postMessage({type: 'memento:services:surface', version: 1, overlayOpen}, parentOrigin);
  };
  window.addEventListener('message', event => {
    if (event.source !== window.parent || event.origin === 'null') return;
    if (event.data?.type !== 'memento:services:request-surface' || event.data.version !== 1) return;
    if (parentOrigin && event.origin !== parentOrigin) return;
    parentOrigin = event.origin;
    announce();
  });
  document.addEventListener('memento:overlay-change', () => {
    overlayOpen = Boolean(document.querySelector('dialog[open]'));
    announce();
  });
  window.addEventListener('load', announce, {once: true});
})();
