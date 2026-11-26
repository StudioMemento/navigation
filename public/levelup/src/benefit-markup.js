import { benefits, serviceUrl } from './content.js';
export const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
export const lines = items => items.map(text => `<span>${escape(text)}</span>`).join(' ');
// R24 (site): a phone of three device pixels per CSS pixel gets its photographs at about two: the slot is declared at two
// thirds of its width there (the heroes came at 1536 px, about 200 KB each, on every phone)
export const PHONE = '(max-width:767px) and (min-resolution:2.5dppx) ';
export const image = (item, eager = false) => `<img class="card-art" src="${item.asset}" srcset="${item.asset.replace('.webp','-640.webp')} 640w, ${item.asset} ${item.domain ? 1280 : 1536}w" sizes="${item.domain ? `${PHONE}60vw, (max-width:767px) 90vw, 60vw` : `${PHONE}47vw, (max-width:767px) 70vw, 40vw`}" alt="${escape(item.alt || '')}" width="${item.domain ? 1280 : 1536}" height="${item.domain ? 1280 : 1024}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''} draggable="false">`;

export const benefitMarkup = () => benefits.map((item,i) => `
  <article class="showcase-card cut-frame mm-tab" data-slide="${i}" role="group" aria-roledescription="slide" aria-label="${i+1} di ${benefits.length}: ${escape(item.title.join(' '))}">
    ${image(item,i===0)}<span class="card-shade" aria-hidden="true"></span><div class="benefit-copy"><h2 class="gradient-text mm-type">${lines(item.title)}</h2><p>${escape(item.copy)}</p></div>
    <a class="domain-link" data-domain-link data-slide-control href="${serviceUrl(item)}" target="_top" aria-label="Esplora i servizi ${item.domain}"><span>${item.domain}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></a>
  </article>`).join('');
