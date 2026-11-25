import { VFX } from './config';
import { encodeDistance, signedDistance } from './sdf';

/**
 * Masks and textures from the real DOM: glyphs exactly where the browser placed them, masked icons, dividers.
 * This is a preparation step, cached per surface and redone only when content, fonts or layout change.
 */
type Op =
  | { type: 'text'; ch: string; x: number; y: number; font: string; alpha: number; grad: { id: number; top: number; bottom: number }; color?: string }
  | { type: 'icon'; url: string; cx: number; cy: number; w: number; h: number; alpha: number; m: [number, number, number, number] }
  | { type: 'line'; x: number; y: number; w: number }
  /* Servizi: a small solid rule drawn by a pseudo-element (the dash of a list item), in its own colour */
  | { type: 'rule'; x: number; y: number; w: number; h: number; color: string; alpha: number };

/** Client-px extent of everything collected (Servizi: the ink of a card is painted over this area only). */
export interface Bounds { left: number; top: number; right: number; bottom: number }
export interface Collected { ops: Op[]; box: DOMRect; fontSize: number; bounds: Bounds | null }

/** LevelUp: what collect() leaves to the engine or to the DOM. */
export interface CollectOptions {
  /** Images the engine draws as photographs (not as icons). */
  photos?: Element[];
  /** Subtrees skipped entirely (the before layer of a comparison, DOM-kept controls). */
  skip?: string;
}

/** Solid colour of a CSS colour, without its alpha (type on cards keeps its own colour, one per element). */
function solidOf(color: string) {
  const m = /rgba?\(([^)]+)\)/.exec(color);
  if (!m) return undefined;
  const v = m[1].split(/[,/ ]+/).filter(Boolean).map(Number);
  return v.length >= 3 ? `rgb(${v[0]},${v[1]},${v[2]})` : undefined;
}

/** An inline <svg> as a self-contained image: the CSS that styles it (stroke, fill) becomes attributes. */
function svgUrl(el: SVGSVGElement, s: CSSStyleDeclaration) {
  const clone = el.cloneNode(true) as SVGSVGElement;
  const r = el.getBoundingClientRect();
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(Math.max(1, Math.round(r.width))));
  clone.setAttribute('height', String(Math.max(1, Math.round(r.height))));
  // alpha is what counts (the ink colour is applied later): any opaque paint will do
  const paint = (v: string) => (v === 'none' ? 'none' : '#fff');
  clone.setAttribute('fill', paint(s.fill));
  clone.setAttribute('stroke', paint(s.stroke));
  clone.setAttribute('stroke-width', s.strokeWidth);
  clone.setAttribute('stroke-linecap', s.strokeLinecap);
  clone.setAttribute('stroke-linejoin', s.strokeLinejoin);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`;
}

const DIVIDERS = '.faq-item:not(:last-child), .legal-group button';
const icons = new Map<string, Promise<HTMLImageElement | null>>();
let measure: CanvasRenderingContext2D | null = null;
const ascents = new Map<string, number>();

/** Opacity of a CSS colour: type and icons are repainted white with a grey base, keeping only their opacity. */
function opacityOf(color: string) {
  const m = /rgba?\(([^)]+)\)/.exec(color);
  if (!m) return 1;
  const v = m[1].split(/[,/ ]+/).filter(Boolean).map(Number);
  return v.length > 3 ? v[3] : 1;
}

function loadIcon(url: string) {
  let p = icons.get(url);
  if (!p) {
    p = new Promise(resolve => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = url;
    });
    icons.set(url, p);
  }
  return p;
}

/** Reads the surface's subtree. Call with the DOM in its normal (non-hidden) styling. */
export function collect(root: HTMLElement, options: CollectOptions = {}): Collected {
  measure ??= document.createElement('canvas').getContext('2d')!;
  const ops: Op[] = [];
  const box = root.getBoundingClientRect();
  const styles = new Map<Element, CSSStyleDeclaration>();
  const style = (el: Element) => { let s = styles.get(el); if (!s) { s = getComputedStyle(el); styles.set(el, s); } return s; };
  // LevelUp: element opacity between a node and the surface (the surface's own opacity is the engine's)
  const opacityOf2 = (el: Element | null) => {
    let k = 1;
    for (let e = el; e && e !== root && root.contains(e); e = e.parentElement) k *= parseFloat(style(e).opacity) || 0;
    return k;
  };
  const photos = new Set(options.photos ?? []);
  const clipOf = (el: Element | null): Element | null => {
    for (let e = el; e && root.contains(e); e = e.parentElement) {
      const s = style(e);
      if ((s.webkitBackgroundClip || s.backgroundClip) === 'text') return e;
    }
    return null;
  };
  let fontSize = 0;
  const blocks: Element[] = [];
  let bounds: Bounds | null = null;
  const extend = (l: number, t: number, r: number, b: number) => {
    if (!bounds) bounds = { left: l, top: t, right: r, bottom: b };
    else { bounds.left = Math.min(bounds.left, l); bounds.top = Math.min(bounds.top, t); bounds.right = Math.max(bounds.right, r); bounds.bottom = Math.max(bounds.bottom, b); }
  };
  // Servizi: absolutely positioned pseudo-elements that are small solid rules (list dashes) are drawn as rules
  const rules = (el: HTMLElement) => {
    if (el === root) return;
    for (const pseudo of ['::before', '::after'] as const) {
      const ps = getComputedStyle(el, pseudo);
      if (!ps.content || ps.content === 'none' || ps.content === 'normal' || ps.position !== 'absolute' || ps.display === 'none') continue;
      if (ps.backgroundImage !== 'none' || (ps.maskImage && ps.maskImage !== 'none') || ps.transform !== 'none') continue;
      const a = opacityOf(ps.backgroundColor) * (parseFloat(ps.opacity) || 0) * opacityOf2(el);
      const w = parseFloat(ps.width), h = parseFloat(ps.height);
      if (!(a > 0.01) || !(w > 0) || !(h > 0) || w * h > 96 || Math.min(w, h) > 3) continue;
      // an absolutely positioned pseudo-element sits in the padding box of its (positioned) element
      if (style(el).position === 'static') continue;
      const r = el.getBoundingClientRect();
      const x = r.left + el.clientLeft + (parseFloat(ps.left) || 0);
      const y = r.top + el.clientTop + (parseFloat(ps.top) || 0);
      ops.push({ type: 'rule', x, y, w, h, color: solidOf(ps.backgroundColor) ?? 'rgb(255,255,255)', alpha: a });
      extend(x, y, x + w, y + h);
    }
  };
  const range = document.createRange();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node.nodeType === Node.TEXT_NODE) return NodeFilter.FILTER_ACCEPT;
      const el = node as Element, s = style(el);
      if (el.tagName === 'IFRAME' || el.classList.contains('sr-only') || s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return NodeFilter.FILTER_REJECT;
      // LevelUp: photographs are drawn by the engine, other images become icons; DOM-kept subtrees are skipped;
      // an inline <svg> is one icon, its children are not walked
      if (el.tagName === 'IMG' && photos.has(el)) return NodeFilter.FILTER_REJECT;
      if (options.skip && el.matches(options.skip)) return NodeFilter.FILTER_REJECT;
      if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) return NodeFilter.FILTER_REJECT;
      // content of a closed accordion item is not on screen, whatever rectangles the browser still reports for it
      const parent = el.parentElement;
      if (parent instanceof HTMLDetailsElement && !parent.open && el.tagName !== 'SUMMARY') return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const visit = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement, s = style(el);
      if (el.tagName === 'IMG' || el instanceof SVGSVGElement) {
        // LevelUp: small images and inline svg icons (an expand button, a chevron): their alpha, in the ink colour
        const r = el.getBoundingClientRect();
        const img = el as HTMLImageElement;
        const url = el.tagName === 'IMG' ? img.currentSrc || img.src : svgUrl(el as unknown as SVGSVGElement, s);
        const t = /matrix\(([^)]+)\)/.exec(s.transform)?.[1].split(',').map(Number);
        if (url && r.width > 0 && r.height > 0) {
          ops.push({ type: 'icon', url, cx: r.left + r.width / 2, cy: r.top + r.height / 2,
            w: (el as HTMLElement).offsetWidth || r.width, h: (el as HTMLElement).offsetHeight || r.height,
            alpha: opacityOf2(el), m: t ? [t[0], t[1], t[2], t[3]] : [1, 0, 0, 1] });
          extend(r.left, r.top, r.right, r.bottom);
        }
        return;
      }
      const mask = /url\((['"]?)(.+?)\1\)/.exec(s.webkitMaskImage || s.maskImage || '')?.[2];
      const filled = s.backgroundColor !== 'rgba(0, 0, 0, 0)';
      if (mask && (filled || s.backgroundImage !== 'none')) {
        const r = el.getBoundingClientRect();
        const t = /matrix\(([^)]+)\)/.exec(s.transform)?.[1].split(',').map(Number);
        ops.push({ type: 'icon', url: mask, cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: el.offsetWidth, h: el.offsetHeight,
          alpha: filled ? opacityOf(s.backgroundColor) : 1, m: t ? [t[0], t[1], t[2], t[3]] : [1, 0, 0, 1] });
        extend(r.left, r.top, r.right, r.bottom);
      }
      if (el !== root && el.matches(DIVIDERS)) { const r = el.getBoundingClientRect(); ops.push({ type: 'line', x: r.left, y: r.bottom - 1, w: r.width }); extend(r.left, r.bottom - 1, r.right, r.bottom); }
      rules(el);
      return;
    }
    const parent = node.parentElement;
    const text = node.textContent ?? '';
    if (!parent || !text.trim()) return;
    const s = style(parent), size = parseFloat(s.fontSize) || 16;
    const font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    let ascent = ascents.get(font);
    if (ascent === undefined) { measure!.font = font; ascent = measure!.measureText('H').fontBoundingBoxAscent; ascents.set(font, ascent); }
    const clipEl = clipOf(parent);
    // every piece of type is white with a grey base: one gradient over a clipped block (a title), one per line elsewhere
    let id = -1;
    if (clipEl) { id = blocks.indexOf(clipEl); if (id < 0) id = blocks.push(clipEl) - 1; }
    const alpha = (clipEl ? 1 : opacityOf(s.color)) * opacityOf2(parent);
    const color = clipEl ? undefined : solidOf(s.color);
    const upper = s.textTransform === 'uppercase';
    fontSize = Math.max(fontSize, size);
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === ' ' || ch === '\n' || ch === '\t') continue;
      range.setStart(node, i); range.setEnd(node, i + 1);
      const r = range.getBoundingClientRect();
      if (r.width) {
        ops.push({ type: 'text', ch: upper ? ch.toUpperCase() : ch, x: r.left, y: r.top + ascent, font, alpha, color, grad: { id, top: r.top + ascent - size * 0.74, bottom: r.top + ascent + size * 0.03 } });
        // glyph boxes: overhangs (italic, wide strokes) get a fraction of the em on each side
        extend(r.left - size * 0.12, r.top - size * 0.08, r.right + size * 0.12, r.bottom + size * 0.08);
      }
    }
  };
  if (root.nodeType === Node.ELEMENT_NODE) visit(root);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) visit(n);
  return { ops, box, fontSize, bounds };
}

/** The painted area: its origin (client px, on the device-pixel grid) and its size in canvas pixels. */
export interface PaintFrame { x: number; y: number; w: number; h: number }

/**
 * Paints collected ops into `canvas` (premultiplied RGBA). Resolves once icons are decoded.
 * Titles get the idle gradient (light above, shade at the base); with `solid`, type and icons take one colour.
 * The canvas covers `frame` (from a pixel-aligned origin slightly before the box), so glyphs keep their exact positions.
 */
export async function paint(canvas: HTMLCanvasElement, { ops, box }: Collected, scale: number, frame: PaintFrame, solid?: string, coverage = true) {
  const urls = [...new Set(ops.filter(o => o.type === 'icon').map(o => (o as Extract<Op, { type: 'icon' }>).url))];
  const loaded = new Map<string, HTMLImageElement | null>();
  await Promise.all(urls.map(async u => { loaded.set(u, await loadIcon(u)); }));
  canvas.width = frame.w; canvas.height = frame.h;
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(scale, 0, 0, scale, -frame.x * scale, -frame.y * scale);
  ctx.textBaseline = 'alphabetic';
  const gradients = new Map<string, CanvasGradient | string>();
  // R23: titles at rest in 30% of their colour, as the DOM shows them (it painted the bare greys); a device without
  // hover holds the hover's colour (site.css): the title ramp itself. All keep the idle greys' luminance stop by stop,
  // so the effects read a title's height the same way
  const stops = typeof matchMedia === 'function' && matchMedia('(hover: none), (pointer: coarse)').matches ? VFX.color.titleAmber : VFX.color.titleRest;
  const gradient = (c: CanvasRenderingContext2D, top: number, bottom: number): CanvasGradient | string => {
    if (solid) return solid;
    const g = c.createLinearGradient(0, top, 0, bottom);
    for (const [stop, color] of stops) g.addColorStop(stop, color);
    return g;
  };
  // a clipped block (a title) spans one gradient from its first cap line to its last baseline
  const extent = new Map<number, [number, number]>();
  for (const op of ops) if (op.type === 'text' && op.grad.id >= 0) {
    const e = extent.get(op.grad.id) ?? [Infinity, -Infinity];
    extent.set(op.grad.id, [Math.min(e[0], op.grad.top), Math.max(e[1], op.grad.bottom)]);
  }
  let scratch: HTMLCanvasElement | null = null;
  for (const op of ops) {
    if (op.type === 'text') {
      ctx.font = op.font;
      // light from above, shade at the base
      const [top, bottom] = op.grad.id >= 0 ? extent.get(op.grad.id)! : [op.grad.top, op.grad.bottom];
      const key = `${top}|${bottom}`;
      let g = gradients.get(key);
      if (!g) { g = gradient(ctx, top, bottom); gradients.set(key, g); }
      // LevelUp: on a card, type keeps its own single colour (titles of the card take the ink colour)
      ctx.fillStyle = solid && op.color ? op.color : g;
      ctx.globalAlpha = op.alpha;
      ctx.fillText(op.ch, op.x, op.y);
      ctx.globalAlpha = 1;
    } else if (op.type === 'rule') {
      ctx.fillStyle = solid ? op.color : gradient(ctx, op.y, op.y + op.h);
      ctx.globalAlpha = op.alpha;
      ctx.fillRect(op.x, op.y, op.w, op.h);
      ctx.globalAlpha = 1;
    } else if (op.type === 'line') {
      const g = ctx.createLinearGradient(op.x, 0, op.x + op.w, 0);
      g.addColorStop(0, 'rgba(226,224,220,.22)'); g.addColorStop(0.5, 'rgba(226,224,220,.14)'); g.addColorStop(1, 'rgba(226,224,220,0)');
      ctx.fillStyle = g; ctx.fillRect(op.x, op.y, op.w, 1);
    } else {
      const image = loaded.get(op.url);
      if (!image) continue;
      scratch ??= document.createElement('canvas');
      const sw = Math.max(1, Math.ceil(op.w * scale)), sh = Math.max(1, Math.ceil(op.h * scale));
      scratch.width = sw; scratch.height = sh;
      const s = scratch.getContext('2d')!;
      const side = Math.min(sw, sh);
      s.drawImage(image, (sw - side) / 2, (sh - side) / 2, side, side);
      s.globalCompositeOperation = 'source-in'; s.fillStyle = gradient(s, (sh - side) / 2, (sh + side) / 2); s.fillRect(0, 0, sw, sh);
      ctx.globalAlpha = op.alpha;
      ctx.save();
      ctx.translate(op.cx, op.cy); ctx.transform(op.m[0], op.m[1], op.m[2], op.m[3], 0, 0);
      ctx.drawImage(scratch, -op.w / 2, -op.h / 2, op.w, op.h);
      ctx.restore();
      ctx.globalAlpha = 1;
    }
  }
  // coarse coverage for particle emission (titles only: cards never read it)
  if (!coverage) return { alpha: new Uint8Array(1), aw: 1, ah: 1, ascale: 0 };
  const ascale = 0.25, aw = Math.max(1, Math.round(box.width * ascale)), ah = Math.max(1, Math.round(box.height * ascale));
  const small = document.createElement('canvas'); small.width = aw; small.height = ah;
  const sc = small.getContext('2d', { willReadFrequently: true })!;
  sc.drawImage(canvas, (box.left - frame.x) * scale, (box.top - frame.y) * scale, box.width * scale, box.height * scale, 0, 0, aw, ah);
  const px = sc.getImageData(0, 0, aw, ah).data, alpha = new Uint8Array(aw * ah);
  for (let i = 0; i < alpha.length; i++) alpha[i] = px[i * 4 + 3];
  return { alpha, aw, ah, ascale };
}

/** uv = q * scale + offset, with q the 0..1 position in the <img> box. Reproduces object-fit and object-position. */
export function imageFit(img: HTMLImageElement, style: CSSStyleDeclaration, bw: number, bh: number): [number, number, number, number] {
  const nw = img.naturalWidth || 1, nh = img.naturalHeight || 1;
  const fit = style.objectFit;
  let dw = bw, dh = bh;
  if (fit === 'contain' || fit === 'cover') {
    const k = fit === 'contain' ? Math.min(bw / nw, bh / nh) : Math.max(bw / nw, bh / nh);
    dw = nw * k; dh = nh * k;
  }
  const [px = '50%', py = '50%'] = style.objectPosition.split(' ');
  const at = (v: string, free: number) => (v.endsWith('%') ? (parseFloat(v) / 100) * free : parseFloat(v) || 0);
  const ox = at(px, bw - dw), oy = at(py, bh - dh);
  return [-ox / dw, -oy / dh, bw / dw, bh / dh];
}

/**
 * Signed distance of the painted type, in CSS px, encoded on 8 bits over ±`range`: the glow of large type follows
 * the exact silhouette of every letter. A reduced grid is enough: the field is smooth and filtered on the GPU.
 */
export function distanceField(source: HTMLCanvasElement, cssW: number, cssH: number, range: number) {
  const k = Math.min(1, Math.sqrt(2.6e5 / Math.max(1, cssW * cssH)));
  const w = Math.max(2, Math.round(cssW * k)), h = Math.max(2, Math.round(cssH * k));
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d', { willReadFrequently: true })!;
  x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
  x.drawImage(source, 0, 0, w, h);
  const d = signedDistance(x.getImageData(0, 0, w, h).data, w, h, 4, 3);
  return { data: encodeDistance(d, 1 / k, range), w, h };
}
