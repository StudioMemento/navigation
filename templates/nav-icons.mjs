// The dock's icons: clean line drawings in grey that keep the shapes of the original symbols (the M, a knot of two
// loops, a folder, a plus, a star with a small star). They take the colour of the link (currentColor), so the dock
// styles rest, current page and pointer in CSS alone.
const mementoPaths = `<g>
      <path d="M109.84,109.84l-46.06,46.07-14.17,14.17v21.26l120.47-120.47v-21.26l-60.24,60.24ZM63.78,85.04l31.89,31.89,10.63-10.63-56.69-56.7v113.39l14.17-14.17v-63.78Z" />
      <polygon points="170.08 77.95 170.08 191.34 162.16 183.42 162.16 183.42 155.91 177.16 113.39 134.64 124.02 124.01 155.91 155.91 155.91 92.12 170.08 77.95" />
    </g>`;
const line = body => `<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
const icons = {
  // Two loops crossed and linked: the knot of the services. Each passes over the other once and under once.
  services: `<defs>
    <rect id="mm-knot-a" x="2.6" y="8.7" width="18.8" height="6.6" rx="3.3" transform="rotate(45 12 12)"/>
    <rect id="mm-knot-b" x="2.6" y="8.7" width="18.8" height="6.6" rx="3.3" transform="rotate(-45 12 12)"/>
    <clipPath id="mm-knot-sides"><path d="M0 0 12 12 0 24ZM24 0 12 12 24 24Z"/></clipPath>
    <clipPath id="mm-knot-ends"><path d="M0 0 24 0 12 12ZM0 24 24 24 12 12Z"/></clipPath>
    <mask id="mm-knot-under-a" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><use href="#mm-knot-b" fill="none" stroke="#000" stroke-width="4.6" clip-path="url(#mm-knot-ends)"/></mask>
    <mask id="mm-knot-under-b" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><use href="#mm-knot-a" fill="none" stroke="#000" stroke-width="4.6" clip-path="url(#mm-knot-sides)"/></mask>
  </defs>` + line(`<use href="#mm-knot-a" mask="url(#mm-knot-under-a)"/><use href="#mm-knot-b" mask="url(#mm-knot-under-b)"/>`),
  projects: line(`<path d="M3.5 7.2V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5V9.6a1.5 1.5 0 0 0-1.5-1.5h-7.3L9.9 5.7H5a1.5 1.5 0 0 0-1.5 1.5Z"/>
    <path d="M3.5 10.8h17"/>`),
  levelup: line(`<path d="M9.4 3.8h5.2v5.6h5.6v5.2h-5.6v5.6H9.4v-5.6H3.8V9.4h5.6Z"/>`),
  start: line(`<path d="M10 5q.9 7.1 8 8-7.1.9-8 8-.9-7.1-8-8 7.1-.9 8-8Z"/>
    <path d="M18.6 2.6q.4 2.5 2.9 2.9-2.5.4-2.9 2.9-.4-2.5-2.9-2.9 2.5-.4 2.9-2.9Z"/>`)
};

export function iconSVG(id) {
  if (id === 'memento')
    return `<svg class="mm-symbol mm-symbol--memento" viewBox="26.474 41.273 166.741 166.741" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" stroke="none">${mementoPaths}</g></svg>`;
  if (!icons[id]) throw new TypeError('Unknown Memento icon: ' + id);
  return `<svg class="mm-symbol mm-symbol--${id}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${icons[id]}</svg>`;
}
