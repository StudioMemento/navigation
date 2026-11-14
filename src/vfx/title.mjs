import { VFX } from './config.mjs';
import { encodeDistance, signedDistance } from './sdf.mjs';

/**
 * Card titles, laid out exactly as the DOM <h2> lays them out (one line, flex space-between, baseline at the bottom
 * padding) but in the card's own px, so the glyphs can be painted on the card plane whatever its 3D pose.
 */
export const TITLE_WEIGHT = 280;
export const TITLE_LINE = 0.95;
const fontOf = size => `${TITLE_WEIGHT} ${size}px Inter, Arial, sans-serif`;
let measure = null;

/** Glyph positions (card px, baseline y) and the block's box. Pure given a 2D context for measuring. */
export function layoutTitle(text, size, card, ctx = (measure ??= document.createElement('canvas').getContext('2d'))) {
  ctx.font = fontOf(size);
  const chars = [...text];
  const widths = chars.map(ch => ctx.measureText(ch).width);
  const m = ctx.measureText('H');
  const ascent = m.fontBoundingBoxAscent ?? size * 0.96875, descent = m.fontBoundingBoxDescent ?? size * 0.2421875;
  const x = card.padding, w = card.width - card.padding * 2, h = size * TITLE_LINE, y = card.height - card.padding - h;
  const baseline = y + (h - (ascent + descent)) / 2 + ascent;
  const free = w - widths.reduce((a, b) => a + b, 0), gap = chars.length > 1 ? free / (chars.length - 1) : 0;
  let cursor = x;
  const glyphs = chars.map((ch, i) => { const g = { ch, x: cursor, y: baseline, w: widths[i] }; cursor += widths[i] + gap; return g; });
  return { glyphs, box: { x, y, w, h }, baseline, size, font: fontOf(size), cap: size * 0.74 };
}

/**
 * Paints a laid-out title with the idle gradient (the amber one desaturated: light from above, shade at the base)
 * into `canvas`, covering the box plus `margin`, at `scale` canvas px per card px. Returns the coarse coverage used
 * to weight the reaction by ink and to emit sparks only from the letters.
 */
export function paintTitle(canvas, t, scale, margin) {
  const ox = t.box.x - margin, oy = t.box.y - margin;
  const cw = Math.max(2, Math.ceil((t.box.w + margin * 2) * scale)), ch = Math.max(2, Math.ceil((t.box.h + margin * 2) * scale));
  canvas.width = cw; canvas.height = ch;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(scale, 0, 0, scale, -ox * scale, -oy * scale);
  ctx.textBaseline = 'alphabetic';
  ctx.font = t.font;
  const g = ctx.createLinearGradient(0, t.baseline - t.cap, 0, t.baseline + t.size * 0.03);
  for (const [stop, color] of VFX.color.titleGradient) g.addColorStop(stop, color);
  ctx.fillStyle = g;
  for (const glyph of t.glyphs) ctx.fillText(glyph.ch, glyph.x, glyph.y);
  const ascale = 0.25, aw = Math.max(1, Math.round(t.box.w * ascale)), ah = Math.max(1, Math.round(t.box.h * ascale));
  const small = document.createElement('canvas'); small.width = aw; small.height = ah;
  const sc = small.getContext('2d', { willReadFrequently: true });
  sc.drawImage(canvas, margin * scale, margin * scale, t.box.w * scale, t.box.h * scale, 0, 0, aw, ah);
  const px = sc.getImageData(0, 0, aw, ah).data, alpha = new Uint8Array(aw * ah);
  for (let i = 0; i < alpha.length; i++) alpha[i] = px[i * 4 + 3];
  // uv = (p + xy) * zw maps card px onto the canvas
  return { map: [-ox, -oy, scale / cw, scale / ch], coverage: { alpha, aw, ah, ascale }, cssW: cw / scale, cssH: ch / scale };
}

/** Signed distance of the painted type, in card px, on 8 bits over ±`range`. A reduced grid is enough. */
export function distanceField(source, cssW, cssH, range) {
  const k = Math.min(1, Math.sqrt(2.6e5 / Math.max(1, cssW * cssH)));
  const w = Math.max(2, Math.round(cssW * k)), h = Math.max(2, Math.round(cssH * k));
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
  x.drawImage(source, 0, 0, w, h);
  const d = signedDistance(x.getImageData(0, 0, w, h).data, w, h, 4, 3);
  return { data: encodeDistance(d, 1 / k, range), w, h };
}
