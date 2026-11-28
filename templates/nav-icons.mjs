import { readFile } from 'node:fs/promises';

// Use the same paths as the favicon. The tighter viewBox optically centres the
// asymmetrically padded original artwork in the dock.
const favicon = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const monogram = favicon.match(/<(?:path|polygon)\b[^>]*\/>/g).join('').replaceAll(' class="cls-1"', '');
const icons = {
  memento: {box:'35 45.5 150 150', art:monogram},
  services: {art:'<path d="M3 15 13 5h7l4 4-5 5-2-2 3-3-1.5-1.5h-4L6 16l2.5 2.5-2 2L3 17zM8 23l5-5 2 2-3 3 1.5 1.5h4L26 16l-2.5-2.5 2-2L29 15v2L19 27h-7zM10.5 19.5l9-9 2 2-9 9z"/>'},
  projects: {art:'<path fill-rule="evenodd" d="M2 8.5 5.5 5h8l3.5 3.5H30V23l-4 4H2zM5 12v12h19.8l2.2-2.2V12zm.6-3h7.7l-1.4-1.4H7z"/>'},
  levelup: {art:'<path d="m12 4 2-2h6v10h10v6l-2 2h-8v8l-2 2h-6V20H2v-6l2-2h8zm3 1v10H5v2h10v10h2V17h10v-2H17V5z" fill-rule="evenodd"/>'},
  start: {art:'<path fill-rule="evenodd" d="m13.2 3.7 4.1 8.8 8.9 4.2-8.9 4.1-4.1 9.1-4.1-9.1L.3 16.7l8.8-4.2zm0 6.2-2.1 4.6-4.6 2.2 4.6 2.1 2.1 4.6 2.2-4.6 4.6-2.1-4.6-2.2z"/><path d="m25.5 1.3 1.7 4 4 1.8-4 1.7-1.7 4-1.8-4-4-1.7 4-1.8z"/>'}
};

export function iconTile(id) {
  const icon = icons[id];
  if (!icon) throw new TypeError('Unknown navigation icon ' + id);
  return '<span class="mm-tile" aria-hidden="true"><svg class="mm-nav-icon" focusable="false" viewBox="' +
    (icon.box || '0 0 32 32') + '">' + icon.art + '</svg></span>';
}
