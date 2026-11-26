const dialog = document.getElementById('preview-dialog');
const outlet = dialog.querySelector('[data-player]');
const expand = dialog.querySelector('[data-fullscreen]');
const direct = dialog.querySelector('[data-external]');
let frame;

function sizePlayer() {
  if (!frame) return;
  frame.width = Math.max(100, Math.min(960, document.documentElement.clientWidth - 80));
  frame.height = Math.max(100, Math.min(640, document.documentElement.clientHeight - 190));
}

function showPreview(button) {
  const { preview, url, title, kind } = button.dataset;
  frame = document.createElement('iframe');
  frame.title = title;
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allow = 'fullscreen; autoplay; encrypted-media; picture-in-picture; xr-spatial-tracking';
  if (kind === 'web') {
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-downloads');
  }
  sizePlayer();
  dialog.querySelector('h2').textContent = title;
  direct.href = url;
  expand.hidden = !document.fullscreenEnabled;
  frame.src = preview;
  outlet.replaceChildren(frame);
  dialog.showModal();
  window.addEventListener('resize', sizePlayer);
}

document.addEventListener('click', event => {
  const control = event.target.closest('[data-start], [data-preview]');
  if (!control) return;
  if (control.dataset.start) document.getElementById('contact-link').href = control.dataset.start;
  if (control.dataset.preview) showPreview(control);
});

if (typeof dialog.showModal === 'function') {
  for (const button of document.querySelectorAll('[data-preview]')) button.hidden = false;
}
dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
expand.addEventListener('click', async () => {
  try {
    await frame?.requestFullscreen();
  } catch {
    // The external link also works on browsers that decline fullscreen.
    direct.focus();
  }
});
dialog.addEventListener('close', () => {
  if (dialog.open) return;
  window.removeEventListener('resize', sizePlayer);
  outlet.replaceChildren();
  frame = null;
});
