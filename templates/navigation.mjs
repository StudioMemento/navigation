import { readFile } from 'node:fs/promises';
import { PAGES } from './home-config.mjs';
import { iconSVG } from './nav-icons.mjs';

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
  const home=slug==='home';
  const items=PAGES.map(page=>{
    const current=(page.slug===slug||home&&page.slug==='studio')?' aria-current="'+(home?'location':'page')+'"':'';
    return `<a class="mm-link" href="/${page.slug}/" aria-label="${page.label}" title="${page.label}"${current}><span class="mm-tile" aria-hidden="true">${iconSVG(page.id)}</span></a>`;
  }).join('');
  const cue=['services','projects','levelup','start'].includes(slug)
    ? '<div class="mm-scrollbar" role="scrollbar" tabindex="0" aria-label="Scorri la pagina" aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" hidden><span class="mm-scrollbar-thumb" aria-hidden="true"></span></div>' : '';
  return `<div class="mm-glyph-field" aria-hidden="true"><canvas></canvas></div>
  <div class="mm-blur mm-blur-top" aria-hidden="true"></div><div class="mm-blur mm-blur-bottom" aria-hidden="true"></div>
  <header class="mm-header"><a class="mm-brand" href="${home?'/':'/#'+slug}" aria-label="Memento — torna alla home"><span class="mm-letter-row">${mark}</span></a></header>
  <nav class="mm-dock" aria-label="Navigazione principale">${items}</nav>${cue}`;
}

export function glyphField() {
  const pitch=12, cols=23, rows=29;
  let seed=10572;
  function next() {
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    return seed/4294967296;
  }
  const uses=[];
  for(let row=0; row<rows; row++){
    for(let col=0; col<cols; col++){
      if(next()>.25)continue;
      const letter=letters[Math.floor(next()*letters.length)];
      const opacity=(.08+next()*.045).toFixed(3);
      uses.push(`<use href="#letter-${letter}" x="${col*pitch+2}" y="${row*pitch+2}" width="8" height="8" opacity="${opacity}"/>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${cols*pitch}" height="${rows*pitch}" viewBox="0 0 ${cols*pitch} ${rows*pitch}"><defs>${symbols.map(m=>m[0]).join('')}</defs><g fill="#ff7d00">${uses.join('')}</g></svg>`;
}

// Five reusable vectors in two ink colours, rasterized once by the background at device resolution.
export function glyphAtlas() {
  const rows = ['#ff7d00', '#ffa23d'].map((fill, row) => {
    const shapes = [...glyphs.keys()].map((key, index) => `<use href="#letter-${key}" x="${index*12+2}" y="${row*12+2}" width="8" height="8"/>`);
    return `<g fill="${fill}">${shapes.join('')}</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="192" viewBox="0 0 60 24"><defs>${symbols.map(match=>match[0]).join('')}</defs>${rows.join('')}</svg>`;
}
