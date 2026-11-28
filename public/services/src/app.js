import { catalogue } from './content.js';
import { getItem, cover, categories, grid, dots, includes } from './render.js';
import { Slider, bindDots } from '/js/slider.mjs';
import { createDialogs } from './dialogs.js';

const $ = (selector) => document.querySelector(selector);
const announce = (text) => {
  $('#catalog-status').textContent = text;
};
const bundles = catalogue.bundles;
if (!$('#bundle-boards').firstElementChild) $('#bundle-boards').innerHTML = `<div class="carousel-stage">${bundles.map(cover).join('')}</div>`;
if (!$('#bundle-controls').firstElementChild) $('#bundle-controls').innerHTML = dots(bundles.map((item) => item.title));
$('#bundle-controls').setAttribute('role', 'group');
$('#bundle-controls').setAttribute('aria-label', 'Scegli un bundle');
const bundleCarousel = new Slider($('#bundle-boards'), {
  onOpen: (index) => dialogs.open(bundles[index]),
  onSettle: (index) => {
    updateBundle(index);
    $('#bundle-includes').innerHTML = includes(bundles[index].covers);
    announce(bundles[index].title);
  },
});
const updateBundle = bindDots($('#bundle-controls'), bundleCarousel);
const dialogs = createDialogs(bundleCarousel);

if (!$('#category-sections').firstElementChild) $('#category-sections').innerHTML = categories();
function mountCategory(section) {
  const items = section.featured.map(getItem);
  const carousel = new Slider($(`#carousel-${section.id}`), {
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
dialogs.route();
