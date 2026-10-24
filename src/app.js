import { ASSET_ROOTS } from './config.js';
import { loadContent } from './data.js';
import { createRouter, routeUrl } from './router.js';
import { escapeHtml as e, link } from './ui.js';
import { renderServices, renderPortfolio, renderExperiences, renderStudio } from './collections.js';
import { renderService, renderProject, renderDemo, renderStudioSpace, selectedProject } from './focus.js';
import { contactDraft, captureDraft, emailBody, renderContact } from './contact.js';
import { mountWorld, renderWorld } from './world.js';

const main = document.querySelector('#main-content');
const menu = document.querySelector('.menu-toggle');
const dialog = document.querySelector('#lightbox');
let content;
let route;
let cleanup = () => {};
let router;
let gallery = [];
let imageIndex = 0;
let firstRender = true;

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  document.querySelector('#main-nav').classList.toggle('is-open', open);
  menu.textContent = open ? 'Chiudi' : 'Menu';
}

function notFound() {
  return `<section class="empty-state page-width"><p class="eyebrow">Memento</p><h1 tabindex="-1">Questa pagina<br>non c’è.</h1><p>Continua a esplorare i nostri progetti e servizi.</p>${link('Torna a Memento', '/', { primary: true })}</section>`;
}

function render(nextRoute, scrollY = 0) {
  cleanup();
  cleanup = () => {};
  if (dialog.open) dialog.close();
  route = nextRoute;
  setMenu(false);
  const [section, detail] = route.parts;
  const isWorld = !section || section === 'mondi';
  let markup;
  if (isWorld) markup = renderWorld(detail);
  else if (section === 'servizi') markup = detail ? renderService(content, route) : renderServices(content, route);
  else if (section === 'portfolio') markup = detail ? renderProject(content, route) : renderPortfolio(content, route);
  else if (section === 'level-up') markup = detail ? renderDemo(content, route) : renderExperiences(content);
  else if (section === 'studio') markup = detail === 'spazio' ? renderStudioSpace() : detail ? null : renderStudio(content);
  else if (section === 'start') markup = renderContact(route);
  main.innerHTML = markup || notFound();
  document.body.classList.toggle('world-page', isWorld);
  document.body.dataset.layout = isWorld ? 'world' : detail || section === 'start' ? 'focus' : 'collection';
  document.querySelectorAll('[data-section]').forEach(element => {
    if (element.dataset.section === (isWorld ? detail : section)) element.setAttribute('aria-current', 'page');
    else element.removeAttribute('aria-current');
  });
  const heading = main.querySelector('h1');
  const title = heading?.innerText.replace(/\s+/g, ' ').trim() || 'Memento';
  document.title = `${title} — Memento`;
  document.querySelector('#announcement').textContent = title;
  main.classList.remove('page-enter');
  void main.offsetWidth;
  main.classList.add('page-enter');
  if (isWorld) cleanup = mountWorld(detail);
  if (!firstRender) heading?.focus({ preventScroll: true });
  window.scrollTo({ top: scrollY, behavior: 'instant' });
  firstRender = false;
  main.querySelectorAll('iframe').forEach(frame => frame.addEventListener('load', () => frame.parentElement?.querySelector('.frame-loading')?.remove(), { once: true }));
  // Images preserve their layout even if an upstream asset is unavailable.
  main.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
    img.classList.add('asset-unavailable');
    if (!img.alt) img.alt = 'Immagine non disponibile';
  }, { once: true }));
}

function showImage(index) {
  if (!gallery.length) return;
  imageIndex = (index + gallery.length) % gallery.length;
  const item = gallery[imageIndex];
  const image = document.querySelector('#lightbox-image');
  image.src = `${ASSET_ROOTS.portfolio}${item.src}`;
  image.alt = item.label || 'Dettaglio del progetto';
  document.querySelector('#lightbox-caption').textContent = `${String(imageIndex + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')} — ${item.label || 'Dettaglio'}`;
  dialog.querySelectorAll('.lightbox-stage button').forEach(button => button.hidden = gallery.length < 2);
}

menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.querySelector('#main-nav').addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); }
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(imageIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showImage(imageIndex + 1); }
});

document.addEventListener('click', async event => {
  if (event.target.closest('.skip-link')) {
    event.preventDefault();
    main.focus({ preventScroll: true });
    main.scrollIntoView();
    return;
  }
  const galleryButton = event.target.closest('[data-image]');
  if (galleryButton) {
    gallery = selectedProject(content, route)?.images || [];
    showImage(Number(galleryButton.dataset.image));
    dialog.showModal();
  }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'close-gallery') dialog.close();
  if (action === 'previous-image') showImage(imageIndex - 1);
  if (action === 'next-image') showImage(imageIndex + 1);
  if (action === 'retry') location.reload();
  if (action === 'copy-message') {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(`A: info@mementostudio.it\nOggetto: ${contactDraft.subject || 'Un nuovo progetto con Memento'}\n\n${emailBody(contactDraft)}`);
      status.textContent = 'Messaggio copiato. Incollalo nella tua app email.';
    } catch { status.textContent = 'Copia non disponibile: seleziona il testo qui sopra oppure usa “Apri email”.'; }
  }
});

main.addEventListener('input', event => {
  const form = event.target.closest('#contact-form');
  if (!form) return;
  event.target.setCustomValidity('');
  captureDraft(form);
});

main.addEventListener('change', event => {
  const select = event.target.closest('[data-filter-route]');
  if (!select) return;
  router.navigate(select.dataset.filterRoute, {
    categoria: select.value === select.dataset.default ? '' : select.value,
    cerca: route.query.get('cerca'),
  });
});

main.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target.id === 'project-search') {
    const query = new FormData(event.target).get('cerca');
    router.navigate('/portfolio', { categoria: route.query.get('categoria'), cerca: query });
  }
  if (event.target.id === 'contact-form') {
    for (const input of event.target.querySelectorAll('[required]')) {
      input.setCustomValidity(input.value.trim() ? '' : 'Compila questo campo.');
    }
    if (!event.target.reportValidity()) return;
    captureDraft(event.target);
    router.navigate('/start/bozza');
  }
});

async function start() {
  main.innerHTML = '<div class="loading-state" role="status">Memento sta prendendo forma.</div>';
  try {
    content = await loadContent();
    router = createRouter(render);
  } catch (error) {
    console.error(error);
    main.innerHTML = `<section class="empty-state page-width"><h1>Non siamo riusciti a caricare i contenuti.</h1><p>Controlla la connessione e riprova.</p><button class="button button-primary" data-action="retry">Riprova</button><a class="text-link" href="mailto:info@mementostudio.it">Scrivici via email</a></section>`;
  }
}

start();
