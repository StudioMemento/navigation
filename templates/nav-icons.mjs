import { readFile } from 'node:fs/promises';

const favicon = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const monogram = favicon.match(/<(?:path|polygon)\b[^>]*\/>/g).join('').replaceAll(' class="cls-1"', '');
// Two inclined loops share one alternating over/under crossing.
const knot = '<defs><rect id="mm-loop-a" x="2.4" y="8.8" width="19.2" height="6.4" rx="3.2" transform="rotate(45 12 12)"/>'+
  '<rect id="mm-loop-b" x="2.4" y="8.8" width="19.2" height="6.4" rx="3.2" transform="rotate(-45 12 12)"/>'+
  '<mask id="mm-loop-break-a" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white" stroke="none"/><path d="m8.2 7.3 3.15 3.15m1.3 3.1 3.15 3.15" stroke="black" stroke-width="3.4"/></mask>'+
  '</defs><use href="#mm-loop-b"/><use href="#mm-loop-a" mask="url(#mm-loop-break-a)"/>';
const art = {
  services:knot,
  projects:'<path d="M2.9 8.6V6.4c0-.85.65-1.5 1.5-1.5h5.3l2.2 2h7.7c.85 0 1.5.65 1.5 1.5v9.3c0 .85-.65 1.5-1.5 1.5H4.4c-.85 0-1.5-.65-1.5-1.5z"/><path d="M3.2 9.8h17.6"/>',
  levelup:'<path d="M9.6 3.2h4.8v6.4h6.4v4.8h-6.4v6.4H9.6v-6.4H3.2V9.6h6.4z"/>',
  start:'<path d="M10.2 5.4c.75 5.05 2.85 7.15 7.9 7.9-5.05.75-7.15 2.85-7.9 7.9-.75-5.05-2.85-7.15-7.9-7.9 5.05-.75 7.15-2.85 7.9-7.9Z"/><path d="M18.9 2.4c.34 2.35 1.38 3.39 3.73 3.73-2.35.34-3.39 1.38-3.73 3.73-.34-2.35-1.38-3.39-3.73-3.73 2.35-.34 3.39-1.38 3.73-3.73Z"/>'
};

export function iconTile(id) {
  const logo = id === 'memento';
  if (!logo && !art[id]) throw new TypeError('Unknown navigation icon ' + id);
  const box = logo ? '34.85 45.48 150 150' : '0 0 24 24';
  const symbol = logo ? monogram : '<g fill="none" stroke="currentColor" stroke-width="1.45" stroke-linejoin="round" stroke-linecap="round">'+art[id]+'</g>';
  return '<span class="mm-tile" aria-hidden="true"><svg class="mm-nav-icon" viewBox="'+box+'" focusable="false">'+symbol+'</svg></span>';
}
