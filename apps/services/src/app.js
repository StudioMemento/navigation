import { catalogue } from './content.js';
import { getItem, cover, categories, grid, dots } from './render.js';
import { Carousel, bindDots } from './carousel.js';
import { createDialogs } from './dialogs.js';
import { enhanceVisuals } from './visuals.js';

const $ = (selector) => document.querySelector(selector);
const announce = (text) => {
  $('#catalog-status').textContent = text;
};
const bundles = catalogue.bundles;
// The VFX engine (START V27) loads after the content; until then, and on any failure, the DOM page is complete.
let vfx = null,
  vfxModule = null;
const motion = () => vfx?.motion();
if (!$('#bundle-boards').firstElementChild) $('#bundle-boards').innerHTML = `<div class="carousel-stage">${bundles.map(cover).join('')}</div>`;
if (!$('#bundle-controls').firstElementChild) $('#bundle-controls').innerHTML = dots(bundles.map((item) => item.title));
$('#bundle-controls').setAttribute('role', 'group');
$('#bundle-controls').setAttribute('aria-label', 'Scegli un bundle');
const bundleCarousel = new Carousel($('#bundle-boards'), {
  onRender: motion,
  onOpen: (index) => dialogs.open(bundles[index]),
  onSettle: (index) => {
    updateBundle(index);
    announce(bundles[index].title);
  },
});
const updateBundle = bindDots($('#bundle-controls'), bundleCarousel);
// The detail dialog is in the browser's top layer, above the page canvas: it has its own engine, created the first
// time a detail opens, paused while it is closed.
let dialogVfx = null;
const mountDialogVfx = (dialog, { mountVfx }) => {
  dialogVfx ??= mountVfx({
    root: dialog,
    parent: dialog,
    engine: { active: () => dialog.open, bands: false, intro: false, offset: true },
  });
};
const dialogs = createDialogs(bundleCarousel, {
  onRender: () => dialogVfx?.motion(),
  onDetail: (dialog) => {
    if (dialogVfx) dialogVfx.scan();
    else
      vfxModule
        ?.then((module) => mountDialogVfx(dialog, module))
        .catch(() => {});
  },
});

if (!$('#category-sections').firstElementChild) $('#category-sections').innerHTML = categories();
function mountCategory(section) {
  const items = section.featured.map(getItem);
  const carousel = new Carousel($(`#carousel-${section.id}`), {
    onRender: motion,
    onOpen: (index) => dialogs.open(items[index]),
    onSettle: (index) => {
      update(index);
      announce(items[index].title);
    },
  });
  const update = bindDots($(`#controls-${section.id}`), carousel);
}
const categoryList = $('#category-sections');
const pendingCategories = new Map(catalogue.categories.map(section => [section.id, section]));
function activateCategory(element) {
  const section = element && pendingCategories.get(element.id);
  if (!section) return;
  pendingCategories.delete(section.id);
  nearCategory?.unobserve(element);
  mountCategory(section);
}
const nearCategory = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) activateCategory(entry.target);
}, {rootMargin:'360px 0px'}) : null;
for (const section of categoryList.querySelectorAll('.category-section')) {
  if (nearCategory) nearCategory.observe(section);
  else activateCategory(section);
}
// Focus or a direct gesture takes precedence over the next observer delivery.
for (const type of ['focusin','pointerdown','click','keydown']) {
  categoryList.addEventListener(type, event => activateCategory(event.target.closest('.category-section')), {capture:true, passive:true});
}

let medium = 'digital';
function renderCatalogue(initial = false) {
  const { html, announcement } = grid(medium);
  if (!initial || !$('#catalogue-groups').firstElementChild) $('#catalogue-groups').innerHTML = html;
  $('.catalogue-filters').dataset.selected = medium;
  document
    .querySelectorAll('[data-medium]')
    .forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.medium === medium)),
    );
  announce(announcement);
  // New tiles become surfaces; the ones of the other medium leave the engine.
  vfx?.scan();
}
$('.catalogue-filters').addEventListener('click', (event) => {
  const value = event.target.closest('[data-medium]')?.dataset.medium;
  if (value && value !== medium) {
    medium = value;
    renderCatalogue();
  }
});
renderCatalogue(true);
$('#start-link').href = catalogue.config.startUrl;
enhanceVisuals();
// R19: the site's shared effects (navigation, /memento-ui/effects.mjs): one engine for every page
vfxModule = import('/memento-ui/effects.mjs');
dialogs.route();
vfxModule
  .then((module) => {
    const { mountVfx, mountBackground } = module;
    vfx = mountVfx({ root: $('#memento-catalogo') });
    if ($('#detail-dialog').open) mountDialogVfx($('#detail-dialog'), module);
    // START V27 background (Ghost Fibers), unless a compatible host owns the surface
    if (document.documentElement.dataset.mementoSurface !== 'transparent') mountBackground?.();
  })
  .catch(() => {
    document.documentElement.classList.remove('vfx-boot', 'vfx-live');
    document.documentElement.classList.add('vfx-off');
  });
