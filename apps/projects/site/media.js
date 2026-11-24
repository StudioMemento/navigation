/** Responsive images from images.json (variants per source) and the shared escape helper. */
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

let manifest = { images:{}, aliases:{} };
export const setManifest = value => { if (value?.images) manifest = { images: value.images, aliases: value.aliases || {} }; };
export const imageData = src => manifest.images[manifest.aliases[src] || src] || null;
export const imageRatio = src => { const data = imageData(src); return data ? data.width / data.height : 16 / 9; };

const sizes = {
  tile:'(max-width:767px) calc(50vw - 27px), (max-width:1100px) 31vw, (min-width:2100px) 470px, 23vw',
  wide:'(max-width:767px) calc(100vw - 40px), (max-width:1100px) 62vw, (min-width:2100px) 950px, 46vw',
  flow:'(max-width:767px) 50vw, min(38vw, 640px)',
  thumb:'(max-width:767px) 72px, 120px',
  stage:'(max-width:767px) calc(100vw - 40px), min(88vw, 1720px)',
  poster:'(max-width:767px) calc(100vw - 40px), min(88vw, 1720px)',
};

/**
 * <img> markup. `lazy` keeps the source in data-src/data-srcset until an observer (or the selector) hydrates it; the
 * VFX engine reads the bitmap of the current source once it has loaded.
 */
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
