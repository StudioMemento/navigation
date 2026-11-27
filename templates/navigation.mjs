import { readFile } from 'node:fs/promises';
import { PAGES } from './home-config.mjs';
import { iconSVG } from './nav-icons.mjs';
import { tile, TILE_COLS, TILE_ROWS, TILE_PITCH } from '../public/js/effects/glyph-tile.mjs';

// The same traced alpha-vector shapes supply the masthead and the decorative margin pattern.
const source = await readFile(new URL('./glyphs.svg',import.meta.url),'utf8');
const symbols = [...source.matchAll(/<symbol id="letter-(\w)" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g)];
const glyphs = new Map(symbols.map(([,letter,box,shape]) => [letter,{box,shape}]));
const letters = [...'MEMENTO'];
const mark = letters.map(letter => {
  const {box,shape}=glyphs.get(letter);
  const [, ,w,h]=box.split(' ').map(Number);
  return `<svg class="mm-glyph" viewBox="${box}" style="--glyph-aspect:${(w/h).toFixed(7)}" aria-hidden="true" focusable="false">${shape}</svg>`;
}).join('');

export function navigation(slug) {
  const home=slug==='home', missing=slug==='404';
  const items=PAGES.map(page=>{
    const current=(page.slug===slug||home&&page.slug==='studio')?' aria-current="'+(home?'location':'page')+'"':'';
    return `<a class="mm-link" href="/${page.slug}/" aria-label="${page.label}" title="${page.label}"${current}><span class="mm-tile" aria-hidden="true">${iconSVG(page.id)}</span></a>`;
  }).join('');
  const cue=['services','projects','levelup','start'].includes(slug)
    ? '<div class="mm-scrollbar" role="scrollbar" tabindex="0" aria-label="Scorri la pagina" aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" hidden><span class="mm-scrollbar-thumb" aria-hidden="true"></span></div>' : '';
  return `<div class="mm-glyph-field" aria-hidden="true"><canvas></canvas></div>
  <div class="mm-blur mm-blur-top" aria-hidden="true"></div><div class="mm-blur mm-blur-bottom" aria-hidden="true"></div>
  <div class="mm-focus mm-focus-top" aria-hidden="true"></div><div class="mm-focus mm-focus-bottom" aria-hidden="true"></div>
  <header class="mm-header"><a class="mm-brand" href="${home||missing?'/':'/#'+slug}" aria-label="Memento — torna alla home"><span class="mm-letter-row">${mark}</span></a></header>
  <nav class="mm-dock" aria-label="Navigazione principale">${items}</nav>${cue}`;
}

// The wall at rest: the tile of glyph-tile.mjs, in grey. The live field lights the same letters.
export function glyphField() {
  const uses=tile.chars.map(({col,row,char,opacity})=>`<use href="#letter-${char}" x="${col*TILE_PITCH+2}" y="${row*TILE_PITCH+2}" width="8" height="8" opacity="${opacity.toFixed(3)}"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE_COLS*TILE_PITCH}" height="${TILE_ROWS*TILE_PITCH}" viewBox="0 0 ${TILE_COLS*TILE_PITCH} ${TILE_ROWS*TILE_PITCH}"><defs>${symbols.map(m=>m[0]).join('')}</defs><g fill="#b9b2a8">${uses.join('')}</g></svg>`;
}

// Five reusable vectors in four inks, rasterized once by the field at device resolution:
// two warm rows for what the pointer touches, two greys for the wall on its own.
export function glyphAtlas() {
  const rows = ['#ff7d00', '#ffa23d', '#9c958c', '#ebe6de'].map((fill, row) => {
    const shapes = [...glyphs.keys()].map((key, index) => `<use href="#letter-${key}" x="${index*12+2}" y="${row*12+2}" width="8" height="8"/>`);
    return `<g fill="${fill}">${shapes.join('')}</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="384" viewBox="0 0 60 48"><defs>${symbols.map(match=>match[0]).join('')}</defs>${rows.join('')}</svg>`;
}
