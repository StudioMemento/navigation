import { content, site, escape, link, list, picture, filterControl, ready, previewButton, previewDialog, sections } from './html.mjs';

export const projects = content('projects');
const manifest = content('project-images');
export const projectPath = project => '/projects/progetto/' + project.id + '/';
export const projectName = project => [project.title, project.variant].filter(Boolean).join(' — ');
const mediaUrl = path => path.startsWith('assets/') ? '/projects/' + path : path;

function photo(path, alt, small = 216, large = small, eager = false) {
  const full = manifest.aliases[path] || path;
  const data = manifest.images[full];
  const variants = (data?.variants || []).map(item => [mediaUrl(item.src), item.width]);
  return picture({
    src: mediaUrl(path), alt, small, large, variants, eager,
    ratio: data && data.width / data.height
  });
}

export function projectIndex() {
  const rows = projects.map((project, index) => {
    const name = projectName(project);
    const categories = project.domains.map(domain => site.domains[domain]).join(' · ');
    return `  <li data-tags="${escape(project.domains.join(' '))}"><p><a id="slideshow/${project.id}" href="${projectPath(project)}">${photo(project.thumbnail || project.cover, '', 120, 160, index === 0)} ${escape(name)}</a><br>${escape(categories)}</p></li>`;
  });
  return `<h1 id="catalogue-title">${escape(sections.projects.heading)}</h1>
<section id="catalogo" aria-labelledby="catalogue-title">
${filterControl('Domini dei progetti', { all: 'Tutti i domini', ...site.domains }, 'project-grid')}
<ul id="project-grid">
${rows.join('\n')}
</ul>
</section>
${ready()}`;
}

// An explicit gallery takes priority. Otherwise use the module images in their
// editorial order, adding the overview only for projects with fewer than two.
function galleryFor(project) {
  const unique = entries => {
    const seen = new Set();
    return entries.filter(item => {
      if (item.type !== 'image' || !item.src || seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    });
  };
  if (project.gallery?.length) return unique(project.gallery);
  const images = unique((project.modules || []).flatMap(module => module.items || []));
  return images.length >= 2 ? images : unique([...images, ...(project.overview || []), { type: 'image', src: project.cover, alt: project.title }]);
}

function experience(project) {
  const item = project.experience;
  if (item === false) return '';
  if (!item) return '<section><h2>Experience</h2><p>[Formato da definire]</p><p>EXP / VIDEO / 3D</p><p>[Esperienza, film o modello del progetto]</p></section>';
  const typeNames = { web: 'Sito web', video: 'Video', model: 'Modello 3D' };
  const title = item.title || projectName(project);
  const url = mediaUrl(item.url || item.embed || item.src);
  const player = item.type === 'video' && !item.embed && item.src
    ? `<video controls playsinline preload="none" width="216" poster="${escape(mediaUrl(item.poster || project.cover))}" src="${escape(mediaUrl(item.src))}"></video>`
    : item.type === 'model' ? '' : previewButton({ title, kind: item.type, url, embed: mediaUrl(item.embed || url) });
  return `<section id="project-experience"><h2>Experience</h2>
<p>${escape(typeNames[item.type])}</p>
${photo(item.poster || project.cover, '', 216, 384)}
<p>${link(url, 'Apri ' + title, true)} ${player}</p></section>`;
}

export function projectDetail(project) {
  const name = projectName(project);
  const gallery = galleryFor(project);
  const vision = project.vision;
  const withPlayer = project.experience?.type === 'web' || Boolean(project.experience?.embed);
  const images = gallery.map((entry, index) => {
    const alt = entry.alt || name;
    return `  <li><a href="${escape(mediaUrl(entry.src))}">${photo(entry.thumb || entry.src, alt, 216, 448, index === 0)}</a></li>`;
  });
  const position = projects.indexOf(project);
  const previous = projects[(position + projects.length - 1) % projects.length];
  const next = projects[(position + 1) % projects.length];
  return `<p>${link('/projects/#catalogo', 'Tutti i progetti')}</p>
<h1>${escape(name)}</h1>
<p>${escape(project.domains.map(domain => site.domains[domain]).join(' · '))}</p>
<section id="project-gallery"><h2>Gallery</h2><ul>
${images.join('\n')}
</ul></section>
${experience(project)}
${vision === false ? '' : `<section id="project-vision"><h2>${escape(vision?.title || 'Vision')}</h2><p>${escape(vision?.copy || '[Breve copy della visione: l’idea di partenza, la direzione scelta e il perché del progetto.]')}</p></section>`}
<nav aria-label="Archivio progetti">
  <h2>Archivio.</h2>
  ${list([['Progetto precedente', previous], ['Progetto successivo', next]], ([label, item]) => link(projectPath(item), label + ' — ' + projectName(item)))}
  <p>${link('/projects/#catalogo', 'Tutti i progetti')}</p>
</nav>
${ready()}
${withPlayer ? previewDialog : ''}`;
}
