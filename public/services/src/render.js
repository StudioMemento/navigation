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
    '(max-width: 767px) 80vw, (min-width:1600px) and (min-aspect-ratio:21/10) 24vw, (max-width:1279px) 43vw, 37vw',
  thumbnail: '(max-width: 500px) 40px, 80px',
};
function image(name, profile, { deferred = true, eager = false, className = '' } = {}) {
  const photo = media(name);
  const prefix = deferred ? 'data-' : '';
  return `<img class="${className}" ${prefix}src="${photo.src}" ${prefix}srcset="${photo.srcset}" sizes="${sizes[profile]}" width="${photo.width}" height="${photo.height}" alt="" draggable="false" decoding="async" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'}>`;
}
const titleLines = (lines) =>
  `<span class="item-master-gradient mm-type">${lines.map((line) => `<span class="item-master-title-line">${escape(line)} </span>`).join('')}</span>`;
const copyLines = (lines) =>
  `<p>${lines.map((line) => `<span class="item-master-copy-line">${escape(line)}</span>`).join(' ')}</p>`;
export const includes = (ids) =>
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
    : `<span class="slide-description">${item.slides[0].copy.map((line) => `<span>${escape(line)}</span>`).join('')}</span><span class="slide-title mm-type">${balancedTitle(item.title)}</span>`;
  return `<a ${bundle ? `id="percorso-${item.id}"` : ''} href="#${bundle ? 'bundle' : 'servizio'}/${item.id}" draggable="false" class="carousel-card showcase-card mm-tab${bundle ? ' bundle-board' : ''}" data-slide="${index}" data-item="${item.id}" aria-label="Scopri ${bundle ? 'il bundle ' : ''}${escape(item.title)}${bundle ? ': ' + escape(item.includes) : ''}" tabindex="${index === 0 ? 0 : -1}"><div class="mm-slide-face">${photo}<span class="photo-caption-shade" aria-hidden="true"></span>${content}</div></a>`;
}
export function categories() {
  return catalogue.categories
    .map(
      (section) =>
        `<section id="${section.id}" class="category-section" style="--title-units:${section.titleUnits}" aria-labelledby="heading-${section.id}"><div class="category-heading"><h2 id="heading-${section.id}" class="spread-title mm-type" aria-label="${section.label}">${[...section.label].map((letter) => `<span aria-hidden="true">${letter === ' ' ? '&nbsp;' : escape(letter)}</span>`).join('')}</h2></div><div class="carousel service-carousel" id="carousel-${section.id}" role="region" aria-roledescription="carosello" aria-label="Servizi ${section.label}"><div class="carousel-stage">${section.featured.map((id, i) => cover(getItem(id), i)).join('')}</div></div><div class="carousel-controls" id="controls-${section.id}" role="group" aria-label="Servizi ${section.label}">${dots(section.featured.map((id) => getItem(id).title))}</div></section>`,
    )
    .join('');
}
export function grid(medium) {
  const matching = catalogue.categories
    .flatMap((s) => s.services)
    .map(getItem)
    .filter((item) => item.medium === medium);
  const label = medium === 'digital' ? 'Digitale' : 'Fisico';
  const html = `<section class="catalogue-group" aria-labelledby="group-${medium}"><h3 id="group-${medium}" class="sr-only">${label}</h3><div class="catalogue-page"><div class="service-grid">${matching.map((item) => `<a href="#servizio/${item.id}" class="service-card mm-tab" data-service="${item.id}" aria-label="Scopri ${escape(item.title)}">${image(item.cover, 'grid', { deferred: false, className: 'service-visual' })}<span class="service-copy"><span class="service-title mm-type">${escape(item.title)}</span></span><span class="service-action" aria-hidden="true"></span></a>`).join('')}</div></div></section>`;
  return { html, announcement: `${label}: ${matching.length} servizi` };
}
function components(slide) {
  return `<div class="bundle-components-content"><p class="sr-only">${escape(slide.intro)}</p><ul class="bundle-components">${slide.components
    .map(({ id, role }) => {
      const item = getItem(id);
      return `<li><a href="#servizio/${id}" class="component-row" data-component="${id}"><span class="component-thumbnail">${image(item.cover, 'thumbnail', {deferred:false})}</span><span class="component-copy"><strong class="mm-type">${escape(item.title)}</strong><span>${escape(role)}</span></span><span class="component-arrow" aria-hidden="true">${icon()}</span></a></li>`;
    })
    .join('')}</ul><p class="bundle-scope">${escape(slide.scope)}</p></div>`;
}
const questions = ['Che cos’è?', 'Cosa ottieni?', 'Come lavoriamo?', 'Cominciamo?'];

function answer(item, slide, index) {
  const copy = slide.components ? components(slide) : slide.steps ? steps(slide.steps) :
    slide.list ? `<ul class="answer-list">${slide.list.map(line=>`<li>${escape(line)}</li>`).join('')}</ul>` : copyLines(slide.copy);
  const subtitle = (slide.list || slide.steps) ? `<h3 class="answer-title mm-type">${escape(slide.title.join(' '))}</h3>` : '';
  const cta = slide.action === 'start' ? `<a class="answer-cta" href="${escape(catalogue.config.startUrl)}" target="_top">${escape(slide.cta)}${icon()}</a>` : '';
  const photo = image(slide.image || item.cover, 'detail', {deferred:false,eager:index===0,className:'answer-photo'});
  return `<section class="detail-section" aria-labelledby="question-${slide.key}">
    <h2 class="detail-question mm-type" id="question-${slide.key}">${questions[index]}</h2>
    <div class="answer-frame mm-tab"><div class="answer-face">
      <div class="answer-art">${photo}</div>
      <div class="answer-copy">${subtitle}${copy}${slide.includes ? includes(slide.includes) : ''}${cta}</div>
    </div></div>
  </section>`;
}

export function detail(item, parent = null, backHash = '#catalogo') {
  const back = parent ? parent.title : 'Servizi';
  return `<header class="detail-heading">
    <a class="detail-back" href="${escape(backHash)}" data-detail-back aria-label="Torna a ${escape(back)}">${icon('caret-left')}<span>${escape(back)}</span></a>
    <h1 class="mm-type" id="detail-title" tabindex="-1">${escape(item.title)}</h1>
  </header>${item.slides.map((slide,index)=>answer(item,slide,index)).join('')}`;
}
