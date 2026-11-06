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
$('#bundle-boards').innerHTML = `<div class="carousel-stage">${bundles.map(cover).join('')}</div>`;
$('#bundle-controls').innerHTML = dots(bundles.map((item) => item.title));
$('#bundle-controls').setAttribute('role', 'group');
$('#bundle-controls').setAttribute('aria-label', 'Scegli un bundle');
const bundleCarousel = new Carousel($('#bundle-boards'), {
  onOpen: (index) => dialogs.open(bundles[index]),
  onSettle: (index) => {
    updateBundle(index);
    announce(bundles[index].title);
  },
});
const updateBundle = bindDots($('#bundle-controls'), bundleCarousel);
const dialogs = createDialogs(bundleCarousel);

$('#category-sections').innerHTML = categories();
catalogue.categories.forEach((section) => {
  const items = section.featured.map(getItem);
  const carousel = new Carousel($(`#carousel-${section.id}`), {
    onOpen: (index) => dialogs.open(items[index]),
    onSettle: (index) => {
      update(index);
      announce(items[index].title);
    },
  });
  const update = bindDots($(`#controls-${section.id}`), carousel);
});

let medium = 'digital';
function renderCatalogue() {
  const { html, announcement } = grid(medium);
  $('#catalogue-groups').innerHTML = html;
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
renderCatalogue();
$('#start-link').href = catalogue.config.startUrl;
enhanceVisuals();
dialogs.route();
