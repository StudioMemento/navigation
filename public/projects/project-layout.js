import { projectName, modulesFor } from './catalogue.js';
import { escapeHTML, photo, imageRatio } from './media.js';

export { escapeHTML };
const icons = {
  left:'m14 5-7 7 7 7', right:'m10 5 7 7-7 7', open:'M7 17 17 7M8 7h9v9', expand:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
  close:'M6 6l12 12M18 6 6 18', play:'m9 6 10 6-10 6Z', cube:'m12 2.5 8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4Zm0 9.6 8.5-4.7M12 12.1 3.5 7.4M12 12.1v9.4',
};
export const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}"/></svg>`;

const unique = items => {
  const seen = new Set();
  return items.filter(item => item?.type === 'image' && item.src && !seen.has(item.src) && seen.add(item.src));
};

/**
 * Gallery of a case study: `gallery` when the project declares it; otherwise the images of its modules (renders,
 * sketches, prints…), and the overview only when the modules hold fewer than two. The cover already opens the page in
 * the selector, so it is not repeated first.
 */
export function galleryFor(project) {
  if (Array.isArray(project.gallery) && project.gallery.length) return unique(project.gallery);
  const modules = unique(modulesFor(project).flatMap(module => module.items));
  return modules.length >= 2 ? modules : unique([...modules, ...(project.overview || []), { type: 'image', src: project.cover, alt: project.title }]);
}

/** The frame takes the most common proportion of the gallery (between 5:4 and 16:9); other images are contained. */
export function galleryRatio(items) {
  const counts = new Map();
  for (const item of items) {
    const ratio = Math.min(16 / 9, Math.max(1.25, imageRatio(item.src)));
    const key = ratio.toFixed(2), entry = counts.get(key) || { ratio, count: 0 };
    entry.count++; counts.set(key, entry);
  }
  let best = { ratio: 16 / 9, count: 0 };
  for (const entry of counts.values()) if (entry.count > best.count || (entry.count === best.count && entry.ratio > best.ratio)) best = entry;
  return best.ratio;
}

const KIND = { web: 'Sito web', video: 'Video', model: 'Modello 3D' };
const START = { web: 'Avvia l’esperienza', video: 'Guarda il video', model: 'Esplora il modello' };

/** The experience of a project (null: placeholder slot; false in the data: no section). */
export function experienceFor(project) {
  const x = project.experience;
  if (x === false) return false;
  if (!x) return null;
  const poster = x.poster || project.cover;
  const link = x.url || x.embed || x.src;
  const ratio = x.ratio ? Number(String(x.ratio).split('/').reduce((a, b) => a / b)) : null;
  return { ...x, poster, link, ratio: Number.isFinite(ratio) && ratio > 0 ? ratio : null, kind: KIND[x.type], start: START[x.type], name: x.title || projectName(project) };
}

/** The vision copy (placeholder until it is written in projects.json; false in the data: no section). */
export function visionFor(project) {
  const v = project.vision;
  if (v === false) return false;
  if (v?.copy?.trim()) return { copy: v.copy.trim(), placeholder: false };
  return { copy: '[Breve copy della visione: l’idea di partenza, la direzione scelta e il perché del progetto.]', placeholder: true };
}

export function distributedHeading(text, id) {
  return `<h2 class="display-heading" id="${id}" aria-label="${escapeHTML(text)}"><span class="display-letters gradient-text mm-type" aria-hidden="true">${[...text.toUpperCase()].map(letter => `<span>${escapeHTML(letter)}</span>`).join('')}</span></h2>`;
}

export function thumbMarkup(item, index, active) {
  return `<button class="gallery-thumb" type="button" data-action="select-slide" data-index="${index}" aria-label="Mostra immagine ${index + 1}" aria-pressed="${index === active}">${photo(item.thumb || item.src, { role: 'thumb' })}</button>`;
}

function galleryMarkup(project, items, active) {
  const ratio = galleryRatio(items), item = items[active] || items[0];
  const many = items.length > 1;
  return `<section class="project-gallery content-width" id="project-gallery" aria-label="Gallery di ${escapeHTML(projectName(project))}">
    <div class="gallery" data-slider="gallery" role="region" aria-roledescription="carosello" aria-label="Immagini del progetto" tabindex="0" style="--gallery-ratio:${ratio.toFixed(4)}">
      <div class="gallery-stage board cut-frame mm-tab">
        ${photo(item.src, { alt: item.alt || projectName(project), role: 'stage', eager: true, className: 'gallery-image' })}
      </div>
      ${many ? `<div class="gallery-nav" style="--count:${items.length}">
        <button class="gallery-arrow" type="button" data-action="gallery-step" data-step="-1" aria-label="Immagine precedente">${icon('left')}</button>
        <div class="gallery-thumbs" role="group" aria-label="Anteprime della gallery">${items.map((entry, index) => thumbMarkup(entry, index, active)).join('')}</div>
        <button class="gallery-arrow" type="button" data-action="gallery-step" data-step="1" aria-label="Immagine successiva">${icon('right')}</button>
      </div>` : ''}
    </div>
  </section>`;
}

function experienceMarkup(project) {
  const x = experienceFor(project);
  if (x === false) return '';
  if (!x) return `<section class="experience-section content-width" id="project-experience" aria-labelledby="experience-heading">
    <header class="section-bar"><h2 class="section-label" id="experience-heading"><span>Experience</span><span class="section-kind">[Formato da definire]</span></h2></header>
    <div class="board experience-board cut-frame is-placeholder mm-tab">
      <div class="experience-placeholder">${icon('cube')}<p>EXP / VIDEO / 3D</p><span>[Esperienza, film o modello del progetto]</span></div>
    </div>
  </section>`;
  const ratio = x.ratio ? ` style="--exp-ratio:${x.ratio.toFixed(4)}"` : '';
  return `<section class="experience-section content-width" id="project-experience" aria-labelledby="experience-heading">
    <header class="section-bar">
      <h2 class="section-label" id="experience-heading"><span>Experience</span><span class="section-kind">${escapeHTML(x.kind)}</span></h2>
      <div class="experience-tools">
        <a class="experience-tool" href="${escapeHTML(x.link)}" target="_blank" rel="noopener noreferrer" aria-label="Apri ${escapeHTML(x.name)} in una nuova scheda">${icon('open')}<span>Apri</span></a>
        <button class="experience-tool" type="button" data-action="experience-expand" aria-label="Espandi ${escapeHTML(x.name)}">${icon('expand')}<span>Espandi</span></button>
      </div>
    </header>
    <div class="board experience-board cut-frame mm-tab" data-type="${x.type}"${ratio} aria-label="${escapeHTML(x.name)} — ${escapeHTML(x.kind)}" role="group">
      <div class="experience-poster">${photo(x.poster, { role: 'poster', lazy: true })}</div>
      <div class="experience-stage"></div>
      <button class="experience-start" type="button" data-action="experience-start"><span class="experience-play">${icon('play')}</span><span class="experience-start-label">${escapeHTML(x.start)}</span></button>
      <p class="experience-status" role="status" hidden></p>
      <button class="experience-exit" type="button" data-action="experience-collapse" hidden aria-label="Riduci">${icon('close')}</button>
    </div>
  </section>`;
}

function visionMarkup(project) {
  const v = visionFor(project);
  if (!v) return '';
  return `<section class="vision-section content-width" id="project-vision" aria-labelledby="vision-heading">
    ${distributedHeading('Vision', 'vision-heading')}
    <div class="vision-body">
      <p class="section-label"><span>Vision</span><span class="section-kind">${escapeHTML(project.title)}</span></p>
      <p class="vision-copy${v.placeholder ? ' is-placeholder' : ''}">${escapeHTML(v.copy)}</p>
    </div>
  </section>`;
}

export function detailMarkup(project, galleryIndex = 0) {
  const items = galleryFor(project);
  return galleryMarkup(project, items, Math.min(galleryIndex, items.length - 1)) + experienceMarkup(project) + visionMarkup(project);
}
