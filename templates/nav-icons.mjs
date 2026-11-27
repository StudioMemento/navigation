// The dock's icons, in negative: each is a plate of satin metal cut like the site's cards (top left and bottom right),
// and the symbol is cut out of it (the M, a knot of two loops, a folder, a plus, a star with a small star).
// The plate is all SVG: fill, amber light from below, grain and edge, all masked by the symbol, so the symbol stays
// dark whatever lights the plate. CSS only turns the light on (current page, pointer).
const SIZE = 42, CUT = 9, ICON = 30;
const mementoPaths = `<path d="M109.84,109.84l-46.06,46.07-14.17,14.17v21.26l120.47-120.47v-21.26l-60.24,60.24ZM63.78,85.04l31.89,31.89,10.63-10.63-56.69-56.7v113.39l14.17-14.17v-63.78Z"/>
      <polygon points="170.08 77.95 170.08 191.34 162.16 183.42 162.16 183.42 155.91 177.16 113.39 134.64 124.02 124.01 155.91 155.91 155.91 92.12 170.08 77.95"/>`;
// Symbols on a 24 grid, drawn in black (the cut); line width 1.75.
const line = body => `<g fill="none" stroke="#000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
const symbols = {
  memento: `<g fill="#000" transform="scale(${(24 / 166.741).toFixed(6)}) translate(-26.474 -41.273)">${mementoPaths}</g>`,
  // Two loops crossed and linked: each passes over the other once and under once.
  services: `<defs>
      <rect id="mm-knot-a" x="2.6" y="8.7" width="18.8" height="6.6" rx="3.3" transform="rotate(45 12 12)"/>
      <rect id="mm-knot-b" x="2.6" y="8.7" width="18.8" height="6.6" rx="3.3" transform="rotate(-45 12 12)"/>
      <clipPath id="mm-knot-sides"><path d="M0 0 12 12 0 24ZM24 0 12 12 24 24Z"/></clipPath>
      <clipPath id="mm-knot-ends"><path d="M0 0 24 0 12 12ZM0 24 24 24 12 12Z"/></clipPath>
      <mask id="mm-knot-under-a" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><use href="#mm-knot-b" fill="none" stroke="#000" stroke-width="5" clip-path="url(#mm-knot-ends)"/></mask>
      <mask id="mm-knot-under-b" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><use href="#mm-knot-a" fill="none" stroke="#000" stroke-width="5" clip-path="url(#mm-knot-sides)"/></mask>
    </defs>` + line(`<use href="#mm-knot-a" mask="url(#mm-knot-under-a)"/><use href="#mm-knot-b" mask="url(#mm-knot-under-b)"/>`),
  projects: line(`<path d="M3.5 7.2V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5V9.6a1.5 1.5 0 0 0-1.5-1.5h-7.3L9.9 5.7H5a1.5 1.5 0 0 0-1.5 1.5Z"/><path d="M3.5 10.8h17"/>`),
  levelup: line(`<path d="M9.4 3.8h5.2v5.6h5.6v5.2h-5.6v5.6H9.4v-5.6H3.8V9.4h5.6Z"/>`),
  start: line(`<path d="M10 5q.9 7.1 8 8-7.1.9-8 8-.9-7.1-8-8 7.1-.9 8-8Z"/><path d="M18.6 2.6q.4 2.5 2.9 2.9-2.5.4-2.9 2.9-.4-2.5-2.9-2.9 2.5-.4 2.9-2.9Z"/>`)
};
const plate = `${CUT},0 ${SIZE},0 ${SIZE},${SIZE - CUT} ${SIZE - CUT},${SIZE} 0,${SIZE} 0,${CUT}`;
const rim = `${CUT + .2},.5 ${SIZE - .5},.5 ${SIZE - .5},${SIZE - CUT - .2} ${SIZE - CUT - .2},${SIZE - .5} .5,${SIZE - .5} .5,${CUT + .2}`;

export function iconSVG(id) {
  if (!symbols[id]) throw new TypeError('Unknown Memento icon: ' + id);
  const k = 'mm-plate-' + id, at = (SIZE - ICON) / 2, scale = ICON / 24;
  return `<svg class="mm-plate mm-plate--${id}" viewBox="0 0 ${SIZE} ${SIZE}" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${k}-satin" x1="0" y1="0" x2=".35" y2="1"><stop stop-color="#d0ccc6"/><stop offset=".5" stop-color="#a39e97"/><stop offset="1" stop-color="#77736d"/></linearGradient>
      <radialGradient id="${k}-light" cx=".5" cy="1.12" r=".9"><stop stop-color="#ffbd73"/><stop offset=".34" stop-color="#ff8f24" stop-opacity=".88"/><stop offset=".66" stop-color="#ff7d00" stop-opacity=".22"/><stop offset="1" stop-color="#ff7d00" stop-opacity="0"/></radialGradient>
      <linearGradient id="${k}-rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".75"/><stop offset=".5" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
      <filter id="${k}-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 .9 .9 .9 0 -1"/></filter>
      <mask id="${k}-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}"><polygon points="${plate}" fill="#fff"/><g transform="translate(${at} ${at}) scale(${scale})">${symbols[id]}</g></mask>
    </defs>
    <polygon class="mm-plate-hole" points="${plate}"/>
    <g mask="url(#${k}-cut)">
      <rect width="${SIZE}" height="${SIZE}" fill="url(#${k}-satin)"/>
      <rect class="mm-plate-light" width="${SIZE}" height="${SIZE}" fill="url(#${k}-light)"/>
      <rect class="mm-plate-grain" width="${SIZE}" height="${SIZE}" filter="url(#${k}-grain)"/>
      <polygon class="mm-plate-rim" points="${rim}" fill="none" stroke="url(#${k}-rim)" stroke-width="1"/>
    </g>
  </svg>`;
}
