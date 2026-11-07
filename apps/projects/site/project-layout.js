import { projectName } from './catalogue.js';

export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
export const number = value => String(value).padStart(2, '0');

// These are intentionally neutral slots. Project assets and copy remain in
// projects.json, untouched, until the content for each case is approved.
export function detailFor(project) {
  return {
    name: projectName(project),
    gallery: Array.from({length: 5}, (_, i) => ({title: `Immagine / render ${number(i + 1)}`, number: number(i + 1)})),
    vision: {title: '[Titolo della visione creativa]', copy: '[Qui il brief sintetico: l’idea di partenza, la direzione scelta e il perché del progetto.]'},
    process: Array.from({length: 5}, (_, i) => ({title: `[Titolo dello step ${number(i + 1)}]`, copy: '[Qui una scelta, una prova o un passaggio del processo. Un testo breve, legato al visual.]', number: number(i + 1)})),
  };
}

export function distributedHeading(text, id) {
  return `<h2 class="display-heading" id="${id}" aria-label="${text}"><span class="display-letters" aria-hidden="true">${[...text].map(letter => `<span>${letter}</span>`).join('')}</span></h2>`;
}

export function imageSlot(label, kind = '') {
  return `<div class="image-slot ${kind}" role="img" aria-label="Segnaposto: ${escapeHTML(label)}"><span class="slot-cross" aria-hidden="true"></span><span class="slot-label">${escapeHTML(label)}</span></div>`;
}

export function galleryStage(item) {
  return `<div class="placeholder-gallery" role="img" aria-label="Contenuto ${escapeHTML(item.number)}"><div class="image-slot" aria-hidden="true"></div></div>`;
}

export function processStage(item) {
  return `<article class="editorial-board process-board"><div class="editorial-copy"><p class="eyebrow">Process / ${item.number}</p><p class="placeholder-copy">${item.copy}</p><h3>${item.title}</h3></div>${imageSlot(`Visual processo ${item.number}`, 'editorial-visual')}</article>`;
}

export function processDeck(items, active) {
  return items.map((item, index) => {
    let offset = (index - active + items.length) % items.length;
    if (offset > items.length / 2) offset -= items.length;
    return `<div class="process-card board" data-process-index="${index}" data-active="${offset === 0}" data-visible="${Math.abs(offset) <= 1}" style="--offset:${offset};--abs:${Math.abs(offset)}"${Math.abs(offset) > 1 ? ' inert aria-hidden="true"' : ''}>
      <div class="process-content"${offset ? ' aria-hidden="true"' : ''}>${processStage(item)}</div>
      <button class="process-hit" data-action="select-slide" data-slider-id="process" data-index="${index}" aria-label="Mostra step ${index + 1}"${offset === 0 ? ' hidden' : ''}></button>
    </div>`;
  }).join('');
}

export function detailMarkup(project, galleryIndex = 0, processIndex = 0) {
  const detail = detailFor(project);
  return `<section class="project-overview content-width" id="project-overview" aria-label="Gallery del progetto">
    <div class="slider" data-slider="gallery" role="region" aria-roledescription="carosello" aria-label="Immagini e render" tabindex="0">
      <div class="slider-stage board">${galleryStage(detail.gallery[galleryIndex])}</div>
      <div class="slider-footer"><div class="slide-thumbs" role="group" aria-label="Anteprime della gallery">${detail.gallery.map((item, i) => `<button class="slide-thumb" data-action="select-slide" data-slider-id="gallery" data-index="${i}" aria-label="Mostra contenuto ${i + 1}" aria-pressed="${i === galleryIndex}"><span class="thumb-cross" aria-hidden="true"></span></button>`).join('')}</div></div>
    </div>
  </section>
  <section class="experience-section content-width" id="project-experience" aria-label="Esperienza del progetto">
    <div class="board experience-board"><div class="board-meta"><span>Experience</span><span>[Formato da definire]</span></div><div class="experience-placeholder"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 5 17 10v18L24 43 7 33V15Zm0 20L7 15m17 10 17-10M24 25v18"/></svg><p>EXP / VIDEO / 3D</p><span>[Esperienza, film o modello del progetto]</span></div></div>
  </section>
  <section class="vision-section content-width media-module" id="project-vision" aria-labelledby="vision-heading">
    ${distributedHeading('VISION', 'vision-heading')}
    <div class="board vision-frame"><article class="editorial-board vision-board"><div class="editorial-copy"><p class="eyebrow">Vision / [Nome progetto]</p><p class="placeholder-copy">${detail.vision.copy}</p><h3>${detail.vision.title}</h3></div>${imageSlot('Visual vision', 'editorial-visual')}</article></div>
  </section>
  <section class="process-section media-module" id="project-process" aria-labelledby="process-heading">
    <div class="content-width">${distributedHeading('PROCESS', 'process-heading')}</div>
    <div class="slider" data-slider="process" role="region" aria-roledescription="carosello" aria-label="Step del processo" tabindex="0">
      <div class="slider-stage process-deck">${processDeck(detail.process, processIndex)}</div>
    </div>
  </section>`;
}

