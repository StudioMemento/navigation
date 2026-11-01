import { catalogue } from './content.js';
import { media } from './media.js';

const items = new Map([...catalogue.services, ...catalogue.bundles].map((item) => [item.id, item]));
export const getItem = (id) => items.get(id);
export const escape = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );
export const icon = (name = 'caret-right') =>
  `<img class="chevron" src="assets/icons/${name}.svg" alt="" aria-hidden="true">`;
const sizes = {
  grid: '(max-width: 500px) 154px, (max-width: 927px) 200px, (min-width: 1900px) 325px, calc((100vw - 180px) / 5)',
  slide:
    '(max-width: 500px) 320px, (max-width: 1023px) calc(100vw - 180px), (min-width: 1900px) 1342px, calc((100vw - 180px) * .78)',
  detail:
    '(max-width: 500px) 320px, (max-width: 1023px) calc(100vw - 180px), (max-width: 1555px) 656px, (min-width: 2370px) 999px, 42.12vw',
  thumbnail: '(max-width: 767px) 54px, 76px',
};
function image(name, profile, { deferred = true, eager = false, className = '' } = {}) {
  const photo = media(name);
  const prefix = deferred ? 'data-' : '';
  return `<img class="${className}" ${prefix}src="${photo.src}" ${prefix}srcset="${photo.srcset}" sizes="${sizes[profile]}" width="${photo.width}" height="${photo.height}" alt="" draggable="false" decoding="async" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'}>`;
}
const veil = (picture) => `<span class="mobile-title-veil" aria-hidden="true">${picture}</span>`;
const surface = '<span class="card-surface" aria-hidden="true"></span>';
const titleLines = (lines) =>
  `<span class="item-master-gradient">${lines.map((line) => `<span class="item-master-title-line">${escape(line)} </span>`).join('')}</span>`;
const copyLines = (lines) =>
  `<p>${lines.map((line) => `<span class="item-master-copy-line">${escape(line)}</span>`).join(' ')}</p>`;
const includes = (ids) =>
  `<ul class="bundle-services">${ids.map((id) => `<li>${escape(getItem(id).title)}</li>`).join('')}</ul>`;
const steps = (list) =>
  `<dl class="item-master-steps">${list.map((step) => `<div><dt>${escape(step.title)}</dt><dd>${escape(step.copy)}</dd></div>`).join('')}</dl>`;
export function balancedTitle(title) {
  const words = title.split(' ');
  if (words.length < 2) return escape(title);
  let split = 1,
    score = Infinity;
  for (let i = 1; i < words.length; i++) {
    const balance =
      Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length) +
      (/^(di|del|degli|&|o)$/.test(words[i - 1]) ? 6 : 0);
    if (balance < score) {
      split = i;
      score = balance;
    }
  }
  return `<span>${escape(words.slice(0, split).join(' '))}</span> <span>${escape(words.slice(split).join(' '))}</span>`;
}
export function dots(labels, attribute = 'data-dot') {
  return `<div class="carousel-dots">${labels.map((label, i) => `<button class="carousel-dot" ${attribute}="${i}" aria-label="${escape(label)}" aria-pressed="${i === 0}"><span></span></button>`).join('')}</div>`;
}
export function cover(item, index) {
  const bundle = item.kind === 'bundle';
  const photo = image(item.cover, 'slide', {
    deferred: !bundle || index !== 0,
    eager: bundle && index === 0,
    className: bundle ? 'bundle-visual' : 'slide-visual',
  });
  const content = bundle
    ? `<div class="bundle-layout"><div class="bundle-summary"><span class="bundle-kicker">Bundle di servizi</span><p class="bundle-intro">${escape(item.slides[0].copy[0])}</p>${includes(item.covers)}</div><h2 class="bundle-title">${titleLines(item.slides[0].title)}</h2></div>`
    : `<span class="slide-description">${item.slides[0].copy.map((line) => `<span>${escape(line)}</span>`).join('')}</span><span class="slide-title">${balancedTitle(item.title)}</span>`;
  return `<a ${bundle ? `id="percorso-${item.id}"` : ''} href="#${bundle ? 'bundle' : 'servizio'}/${item.id}" draggable="false" class="carousel-card showcase-card${bundle ? ' bundle-board' : ''}" data-slide="${index}" data-item="${item.id}" aria-label="Scopri ${bundle ? 'il bundle ' : ''}${escape(item.title)}${bundle ? ': ' + escape(item.includes) : ''}" tabindex="${index === 0 ? 0 : -1}">${surface}${photo}${veil(image(item.cover, 'slide'))}${content}</a>`;
}
export function categories() {
  return catalogue.categories
    .map(
      (section) =>
        `<section id="${section.id}" class="category-section" style="--title-units:${section.titleUnits}" aria-labelledby="heading-${section.id}"><div class="category-heading"><h2 id="heading-${section.id}" class="spread-title" aria-label="${section.label}">${[...section.label].map((letter) => `<span aria-hidden="true">${letter === ' ' ? '&nbsp;' : escape(letter)}</span>`).join('')}</h2></div><div class="carousel service-carousel" id="carousel-${section.id}" role="region" aria-roledescription="carosello" aria-label="Servizi ${section.label}"><div class="carousel-stage">${section.featured.map((id, i) => cover(getItem(id), i)).join('')}</div></div><div class="carousel-controls" id="controls-${section.id}" role="group" aria-label="Servizi ${section.label}">${dots(section.featured.map((id) => getItem(id).title))}</div></section>`,
    )
    .join('');
}
export function grid(medium) {
  const matching = catalogue.categories
    .flatMap((s) => s.services)
    .map(getItem)
    .filter((item) => item.medium === medium);
  const label = medium === 'digital' ? 'Digitale' : 'Fisico';
  const html = `<section class="catalogue-group" aria-labelledby="group-${medium}"><h3 id="group-${medium}" class="sr-only">${label}</h3><div class="catalogue-page"><div class="service-grid">${matching.map((item) => `<a href="#servizio/${item.id}" class="service-card" data-service="${item.id}" aria-label="Scopri ${escape(item.title)}">${image(item.cover, 'grid', { deferred: false, className: 'service-visual' })}<span class="service-copy"><span class="service-title">${escape(item.title)}</span></span><span class="service-action" aria-hidden="true"></span></a>`).join('')}</div></div></section>`;
  return { html, announcement: `${label}: ${matching.length} servizi` };
}
function components(slide) {
  return `<div class="bundle-components-content"><p class="bundle-components-intro">${escape(slide.intro)}</p><div class="bundle-components">${slide.components
    .map(({ id, role }) => {
      const item = getItem(id);
      return `<a href="#servizio/${id}" class="component-row" data-component="${id}">${image(item.cover, 'thumbnail')}<span class="component-copy"><strong>${escape(item.title)}</strong><span>${escape(role)}</span></span></a>`;
    })
    .join('')}</div><p class="bundle-scope">${escape(slide.scope)}</p></div>`;
}
function board(item, slide, index) {
  const heading = index === 0 ? 'h2' : 'h3';
  const artwork = slide.image
    ? `<div class="item-master-art" aria-hidden="true">${image(slide.image, 'detail')}</div>${veil(image(slide.image, 'detail'))}`
    : '';
  const copy = slide.components
    ? components(slide)
    : `<div class="item-master-copy">${slide.includes ? '<p class="bundle-kicker">Bundle di servizi</p>' : ''}${slide.steps ? steps(slide.steps) : slide.list ? `<ul class="item-master-list">${slide.list.map((line) => `<li>${escape(line)}</li>`).join('')}</ul>` : copyLines(slide.copy)}${slide.includes ? includes(slide.includes) : ''}</div>`;
  const cta =
    slide.action === 'start'
      ? `<a class="item-master-cta" href="${catalogue.config.startUrl}" target="_top" aria-label="${escape(slide.cta)}: vai a Start"><span>${escape(slide.cta)}</span>${icon()}</a>`
      : '';
  return `<section class="carousel-card showcase-card service-scene scene-${slide.key}" data-slide="${index}" aria-label="${escape(slide.label)}" tabindex="${index === 0 ? 0 : -1}"><div class="popup-card-scroll"><div class="popup-card-body">${surface}${artwork}${copy}<${heading} class="item-master-title" style="--title-units:${slide.titleUnits}" ${index === 0 ? 'id="detail-title"' : ''} tabindex="-1">${titleLines(slide.title)}</${heading}>${cta}</div></div></section>`;
}
export function detail(item, parent = null) {
  return `<article class="service-deck item-master${item.kind === 'bundle' ? ' bundle-master' : ''}" role="region" aria-roledescription="slideshow" aria-label="${escape(item.title)}">${parent ? `<div class="service-deck-topline"><a href="#bundle/${parent.id}" class="back-link" data-back-bundle="${parent.id}" aria-label="Torna a ${escape(parent.title)}">${icon('caret-left')}</a></div>` : ''}<div class="carousel service-carousel popup-carousel" role="region" aria-roledescription="carosello" aria-label="Tavole di ${escape(item.title)}"><div class="carousel-stage">${item.slides.map((slide, index) => board(item, slide, index)).join('')}</div></div><nav class="service-deck-controls" aria-label="Tavole ${item.kind === 'bundle' ? 'del bundle' : 'del servizio'}">${dots(
    item.slides.map((slide) => slide.label),
    'data-scene-dot',
  )}</nav><span class="sr-only service-deck-status" aria-live="polite"></span></article>`;
}
