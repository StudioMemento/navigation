/** Responsive images from images.json (variants per source) and the shared escape helper. */
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

let manifest = { images:{}, aliases:{} };
export const setManifest = value => { if (value?.images) manifest = { images: value.images, aliases: value.aliases || {} }; };
export const imageData = src => manifest.images[manifest.aliases[src] || src] || null;
export const imageRatio = src => { const data = imageData(src); return data ? data.width / data.height : 16 / 9; };

// R24 (site): on a phone of three device pixels per CSS pixel a photograph comes at about two (the slot is declared at two
// thirds of its width there): a third of the bytes, a difference a photograph does not show. Portfolio weighed 1.9 MB
// on a phone against 0.97 MB on a desktop (the stage asked for the 1600 px source)
const phone = slot => `(max-width:767px) and (min-resolution:2.5dppx) calc((${slot}) * .67), (max-width:767px) ${slot.includes(' ') ? `calc(${slot})` : slot}`;
const sizes = {
  tile:phone('50vw - 27px') + ', (max-width:1100px) 31vw, (min-width:2100px) 470px, 23vw',
  wide:phone('100vw - 40px') + ', (max-width:1100px) 62vw, (min-width:2100px) 950px, 46vw',
  flow:phone('50vw') + ', min(38vw, 640px)',
  thumb:phone('72px') + ', 120px',
  stage:phone('100vw - 40px') + ', min(88vw, 1720px)',
  poster:phone('100vw - 40px') + ', min(88vw, 1720px)',
};

export function photo(src, { alt = '', role = 'stage', eager = false, lazy = false, className = '' } = {}) {
  const canonical = manifest.aliases[src] || src, data = manifest.images[canonical];
  const variants = data?.variants || [];
  const fallback = (role === 'thumb' ? variants.find(item => item.width >= 160) : variants.find(item => item.width >= 480))?.src || canonical;
  const set = variants.map(item => `${item.src} ${item.width}w`).join(', ');
  const prefix = lazy ? 'data-' : '';
  return `<img${className ? ` class="${className}"` : ''} ${prefix}src="${escapeHTML(fallback)}"${set ? ` ${prefix}srcset="${escapeHTML(set)}" sizes="${sizes[role] || sizes.stage}"` : ''}${data ? ` width="${data.width}" height="${data.height}"` : ''} alt="${escapeHTML(alt)}" loading="${eager ? 'eager' : 'lazy'}"${eager && (role === 'stage' || role === 'flow') ? ' fetchpriority="high"' : ''} decoding="async" draggable="false">`;
}

/** Sets the sources of an existing <img> (the gallery keeps one element, so the engine follows its 'load'). */
export function setPhoto(img, src, { alt = '', role = 'stage' } = {}) {
  const canonical = manifest.aliases[src] || src, data = manifest.images[canonical];
  const variants = data?.variants || [];
  img.alt = alt;
  if (data) { img.width = data.width; img.height = data.height; }
  if (variants.length) { img.sizes = sizes[role] || sizes.stage; img.srcset = variants.map(item => `${item.src} ${item.width}w`).join(', '); }
  else img.removeAttribute('srcset');
  img.src = variants.find(item => item.width >= 480)?.src || canonical;
}

export function hydrate(img) {
  if (img.dataset.srcset) { img.srcset = img.dataset.srcset; delete img.dataset.srcset; }
  if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
}

/** Warms the browser cache with the source the <img> would pick (neighbours of the gallery). */
export function preload(src, role = 'stage') {
  const canonical = manifest.aliases[src] || src, data = manifest.images[canonical];
  const image = new Image();
  image.decoding = 'async';
  if (data?.variants?.length) { image.sizes = sizes[role]; image.srcset = data.variants.map(item => `${item.src} ${item.width}w`).join(', '); }
  image.src = data?.variants?.find(item => item.width >= 480)?.src || canonical;
}
