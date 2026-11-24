// Let the Studio's existing Escape handler finish focus/exit before the hub
// interprets Escape as a request to leave the embedded page.
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || event.defaultPrevented || !document.body.matches('.inside, .focused')) return;
  if (event.target?.closest?.('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
  event.preventDefault();
}, { capture: true });
