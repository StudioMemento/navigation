import posterUrl from '../studio/model/studio.webp?url';
import { field } from '/js/site.mjs';
import './studio.css';

// The Studio page: the isometric studio, its reveal and its view controls, inside the site's logotype, dock and
// wall of glyphs. The markup is in templates/studio.html; this module only binds it to a viewer.
// WebGL 2 draws the GLB; without it a worker draws the same GLB with WebAssembly; without both, the poster stays.
const root = document.querySelector('.studio-web');
const stage = root.querySelector('.studio-viewport');
const status = root.querySelector('.studio-status');
const poster = root.querySelector('.studio-poster');
const replay = root.querySelector('[data-action=replay]');
const fullscreen = root.querySelector('[data-action=fullscreen]');
const zoomOut = root.querySelector('[data-action=zoom-out]');
const zoomIn = root.querySelector('[data-action=zoom-in]');
const home = root.querySelector('[data-action=home]');
const retry = root.querySelector('.studio-retry');
let viewer = null, phase = 'preparing', zoom = 1, attempt = 0;

function render() {
  root.dataset.phase = phase;
  const active = phase === 'intro' || phase === 'ready', fallback = phase === 'lost' || phase === 'fallback';
  replay.hidden = fallback;
  replay.disabled = !active;
  const label = phase === 'intro' ? 'Mostra studio' : 'Ripeti reveal';
  replay.setAttribute('aria-label', label);
  replay.title = label;
  replay.querySelector('span').textContent = label;
  replay.querySelector('use').setAttribute('href', phase === 'intro' ? '#studio-skip' : '#studio-replay');
  for (const button of [zoomOut, zoomIn, home]) button.disabled = !active;
  zoomOut.disabled ||= zoom <= .881;
  zoomIn.disabled ||= zoom >= 1.159;
  root.querySelector('.studio-view-tools').hidden = fallback;
  root.querySelector('.studio-hint').hidden = fallback;
  retry.hidden = !fallback;
  stage.tabIndex = fallback ? -1 : 0;
  poster.hidden = !fallback;
  if (fallback && !poster.src) poster.src = posterUrl;
  status.textContent = fallback ? 'Vista statica dello studio.' : phase === 'ready' ? 'Studio pronto da ruotare.' : '';
}
function setPhase(value) { phase = value; render(); }
function setZoom(value) { zoom = value; render(); }

async function start() {
  const run = ++attempt;
  viewer?.dispose();
  viewer = null;
  setPhase('preparing');
  // A fresh canvas for every attempt: a lost WebGL context cannot be reused.
  const old = stage.querySelector('.studio-render'), canvas = old.cloneNode(false);
  old.replaceWith(canvas);
  const context = canvas.getContext('webgl2', {alpha:true, antialias:false, premultipliedAlpha:false, powerPreference:'high-performance'});
  try {
    const options = {phase:setPhase, view:setZoom, retry:start};
    if (context) {
      const {createViewer} = await import('./scene/viewer.js');
      if (run === attempt) viewer = createViewer(stage, canvas, field, options, context);
    } else {
      const {createSoftwareViewer} = await import('./software/viewer.js');
      if (run === attempt) viewer = createSoftwareViewer(stage, canvas, field, options);
    }
  } catch (error) {
    console.error('Studio:', error);
    if (run === attempt) setPhase('fallback');
  }
}

replay.addEventListener('click', () => viewer?.replay());
zoomOut.addEventListener('click', () => viewer?.zoom(1 / 1.065));
zoomIn.addEventListener('click', () => viewer?.zoom(1.065));
home.addEventListener('click', () => viewer?.reset());
retry.addEventListener('click', start);
// On this page the Studio icon of the dock brings the view back to its start.
document.querySelector('.mm-dock a[aria-current]')?.addEventListener('click', event => {
  if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  viewer?.reset();
});
if (document.fullscreenEnabled && document.documentElement.requestFullscreen) {
  fullscreen.hidden = false;
  const update = () => {
    const on = !!document.fullscreenElement, label = on ? 'Esci da schermo intero' : 'Schermo intero';
    fullscreen.setAttribute('aria-label', label);
    fullscreen.title = label;
    fullscreen.querySelector('use').setAttribute('href', on ? '#studio-shrink' : '#studio-expand');
  };
  document.addEventListener('fullscreenchange', update);
  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      fullscreen.hidden = true;
    }
  });
  update();
}
render();
start();
