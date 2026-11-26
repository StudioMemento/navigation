import { site, sections, escape, link, list, picture } from './html.mjs';

function cover(section, large, eager = false) {
  const base = '/assets/scenes/' + section.slug;
  return picture({
    src: base + '-768.webp', variants: [[base + '-768.webp', 768], [base + '-1536.webp', 1536]],
    alt: section.alt, ratio: 1.5, large, eager
  });
}

export function home() {
  const cards = site.sections.map((section, index) => `<section id="${section.slug}">
  <h2${index === 0 ? ' id="memento"' : ''}><a href="/${section.slug}/">${escape(section.name)}</a></h2>
  <a href="/${section.slug}/" aria-label="Apri ${escape(section.label)}">${cover(section, 384, index === 0)}</a>
</section>`);
  return [`<h1>${escape(site.home.heading)}</h1>`, ...cards].join('\n');
}

export function studio() {
  const section = sections.studio;
  return `<h1>${escape(section.heading)}</h1>
<p>${escape(section.description)}</p>
${cover(section, 512, true)}
<p>${link('/projects/progetto/' + site.studio.galleryProject + '/', 'Fotografie dello studio')}</p>
<p>${link(site.studio.url, 'Visita lo studio 3D', true)}</p>
<h2>Modello 3D</h2>
${list(site.studio.models, model => `<a download href="/studio/assets/${escape(model.file)}">${escape(model.label)} (GLB)</a>`)}`;
}
