import {domains, projectName} from './catalogue.js';
import {escapeHTML, photo} from './media.js';
const paths = {
  arrow:'M5 19 19 5M5 5h14v14',
  all:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',
  web:'M3 4h18v13H3ZM8 21h8m-4-4v4', '3d':'m12 2 9 5v10l-9 5-9-5V7Zm0 10 9-5M12 12 3 7m9 5v10',
  video:'M3 5h13v14H3Zm13 5 6-3v10l-6-3', visual:'M3 6h5l2-3h4l2 3h5v14H3Zm9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  design:'m4 17 13-13 4 4L8 21H4Zm10-10 4 4', branding:'M4 4h16v16H4ZM8 16V8l4 5 4-5v8',
};
export const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;

export function filtersMarkup() {
  return `<button type="button" data-action="filter" data-domain="all" aria-label="Tutti i domini" title="Tutti i domini" aria-pressed="true" class="filter-all">${icon('all')}</button>` +
    Object.entries(domains).map(([id, label]) => `<button type="button" data-action="filter" data-domain="${id}" aria-controls="project-grid" aria-pressed="false">${icon(id)}<span>${label}</span></button>`).join('');
}

export function tileMarkup(project, eager) {
  const role = project.layout === 'wide' ? 'wide' : 'tile';
  return `<a class="project-tile ${project.layout || 'square'}" href="#slideshow/${project.id}" data-action="open-project" data-id="${project.id}" id="tile-${project.id}" aria-label="Apri progetto ${escapeHTML(projectName(project))}">
    <span class="tile-frame"><span class="tile-visual">${photo(project.cover, { role, eager, lazy: !eager })}</span></span>
    <span class="tile-meta">
      <span class="tile-domains">${project.domains.map(domain => `<span>${domains[domain]}</span>`).join('')}</span>
      <span class="tile-name">${escapeHTML(project.title)}${project.variant ? `<span class="tile-variant">${escapeHTML(project.variant)}</span>` : ''}</span>
      <span class="tile-arrow">${icon('arrow')}</span>
      <span class="tile-current" aria-hidden="true">In visione</span>
    </span></a>`;
}

