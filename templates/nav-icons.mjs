import { deflateSync } from 'node:zlib';

// The dock's icons: plates of satin glass cut like the site's cards (top left and bottom right). The glass is
// semi-transparent, frosted and refracts what lies behind it, bent at its bevel; the symbol is cut out of it (the M,
// a knot of two loops, a folder, a plus, a star with a small star). Each plate is a mask (this file) over one element
// that carries the glass (visuals.css), so the symbol stays clear whatever lights the plate.
export const PLATE = 52, CUT = 11, ICON = 34;
const mementoPaths = `<path d="M109.84,109.84l-46.06,46.07-14.17,14.17v21.26l120.47-120.47v-21.26l-60.24,60.24ZM63.78,85.04l31.89,31.89,10.63-10.63-56.69-56.7v113.39l14.17-14.17v-63.78Z"/>
      <polygon points="170.08 77.95 170.08 191.34 162.16 183.42 162.16 183.42 155.91 177.16 113.39 134.64 124.02 124.01 155.91 155.91 155.91 92.12 170.08 77.95"/>`;
// Symbols on a 24 grid, drawn in black (the cut).
const line = body => `<g fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
const symbols = {
  memento: `<g fill="#000" transform="scale(${(24 / 166.741).toFixed(6)}) translate(-26.474 -41.273)">${mementoPaths}</g>`,
  // Two loops crossed and linked: each passes over the other once and under once.
  services: `<defs>
      <rect id="a" x="2.6" y="8.7" width="18.8" height="6.6" rx="3.3" transform="rotate(45 12 12)"/>
      <rect id="b" x="2.6" y="8.7" width="18.8" height="6.6" rx="3.3" transform="rotate(-45 12 12)"/>
      <clipPath id="sides"><path d="M0 0 12 12 0 24ZM24 0 12 12 24 24Z"/></clipPath>
      <clipPath id="ends"><path d="M0 0 24 0 12 12ZM0 24 24 24 12 12Z"/></clipPath>
      <mask id="under-a" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><use href="#b" fill="none" stroke="#000" stroke-width="5" clip-path="url(#ends)"/></mask>
      <mask id="under-b" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><use href="#a" fill="none" stroke="#000" stroke-width="5" clip-path="url(#sides)"/></mask>
    </defs>` + line(`<use href="#a" mask="url(#under-a)"/><use href="#b" mask="url(#under-b)"/>`),
  projects: line(`<path d="M3.5 7.2V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5V9.6a1.5 1.5 0 0 0-1.5-1.5h-7.3L9.9 5.7H5a1.5 1.5 0 0 0-1.5 1.5Z"/><path d="M3.5 10.8h17"/>`),
  levelup: line(`<path d="M9.4 3.8h5.2v5.6h5.6v5.2h-5.6v5.6H9.4v-5.6H3.8V9.4h5.6Z"/>`),
  start: line(`<path d="M10 5q.9 7.1 8 8-7.1.9-8 8-.9-7.1-8-8 7.1-.9 8-8Z"/><path d="M18.6 2.6q.4 2.5 2.9 2.9-2.5.4-2.9 2.9-.4-2.5-2.9-2.9 2.5-.4 2.9-2.9Z"/>`)
};
const PLATE_POINTS = [[CUT, 0], [PLATE, 0], [PLATE, PLATE - CUT], [PLATE - CUT, PLATE], [0, PLATE], [0, CUT]];

// The mask of a plate: the cut glass, with the symbol taken out of it.
function plateMask(id) {
  const at = (PLATE - ICON) / 2, scale = ICON / 24;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PLATE}" height="${PLATE}" viewBox="0 0 ${PLATE} ${PLATE}">
    <defs><mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="${PLATE}" height="${PLATE}"><rect width="${PLATE}" height="${PLATE}" fill="#fff"/>
    <g transform="translate(${at} ${at}) scale(${scale.toFixed(5)})">${symbols[id]}</g></mask></defs>
    <polygon points="${PLATE_POINTS.join(' ')}" fill="#fff" mask="url(#cut)"/></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg.replace(/\s+/g, ' '));
}

export function iconTile(id) {
  if (!symbols[id]) throw new TypeError('Unknown Memento icon: ' + id);
  return `<span class="mm-tile" aria-hidden="true" style="--mm-symbol:url('${plateMask(id)}')"><span class="mm-glass"><span class="mm-glass-light"></span></span><span class="mm-glass-rim"></span></span>`;
}

// The refraction of the glass, a displacement map for feDisplacementMap: red and green carry the horizontal and the
// vertical shift (0.5 is none). Near the outline the glass bends what is behind it toward its centre, as a bevel does;
// across the plate a faint dome magnifies a little. Computed here and inlined as a PNG, so it never waits for a file.
function glassMap(size = 2 * PLATE) {
  const BEVEL = 10, edges = PLATE_POINTS.map((a, i) => {
    const b = PLATE_POINTS[(i + 1) % PLATE_POINTS.length], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
    return {a, ux:dx / len, uy:dy / len, len, nx:-dy / len, ny:dx / len};   // inward normal (the points run clockwise on screen)
  });
  const rows = Buffer.alloc((size * 4 + 1) * size);
  for (let row = 0; row < size; row++) {
    rows[row * (size * 4 + 1)] = 0;
    for (let col = 0; col < size; col++) {
      const x = (col + .5) * PLATE / size, y = (row + .5) * PLATE / size;
      let gap = Infinity, nx = 0, ny = 0;
      for (const e of edges) {
        const t = Math.max(0, Math.min(e.len, (x - e.a[0]) * e.ux + (y - e.a[1]) * e.uy));
        const d = Math.hypot(x - e.a[0] - t * e.ux, y - e.a[1] - t * e.uy);
        if (d < gap) {gap = d; nx = e.nx; ny = e.ny;}
      }
      const bevel = Math.max(0, 1 - gap / BEVEL) ** 2, dome = .06;
      const r = .5 + .5 * (bevel * nx + dome * (PLATE / 2 - x) / (PLATE / 2));
      const g = .5 + .5 * (bevel * ny + dome * (PLATE / 2 - y) / (PLATE / 2));
      const i = row * (size * 4 + 1) + 1 + col * 4;
      rows[i] = Math.round(Math.max(0, Math.min(1, r)) * 255);
      rows[i + 1] = Math.round(Math.max(0, Math.min(1, g)) * 255);
      rows[i + 2] = 128; rows[i + 3] = 255;
    }
  }
  const table = Array.from({length:256}, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = buffer => { let c = 0xffffffff; for (const byte of buffer) c = table[(c ^ byte) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => {
    const body = Buffer.concat([Buffer.from(type), data]), out = Buffer.alloc(body.length + 8);
    out.writeUInt32BE(data.length, 0); body.copy(out, 4); out.writeUInt32BE(crc(body), body.length + 4);
    return out;
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0); header.writeUInt32BE(size, 4); header[8] = 8; header[9] = 6;
  const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(rows, {level:9})), chunk('IEND', Buffer.alloc(0))]);
  return 'data:image/png;base64,' + png.toString('base64');
}
const MAP = glassMap();

// One filter for every plate (backdrop-filter: url(#mm-refract)), in the plate's own box.
export function refractionDefs() {
  return `<svg class="mm-defs" width="0" height="0" aria-hidden="true" focusable="false"><filter id="mm-refract" x="0" y="0" width="1" height="1" primitiveUnits="objectBoundingBox" color-interpolation-filters="sRGB">
    <feImage href="${MAP}" x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="map"/>
    <feDisplacementMap in="SourceGraphic" in2="map" scale=".36" xChannelSelector="R" yChannelSelector="G"/></filter></svg>`;
}
