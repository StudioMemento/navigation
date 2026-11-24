import { Carousel } from './src/carousel.js';
import { catalogue } from './src/content.js';
import { cover, dots, categories, grid } from './src/render.js';
import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
// Explicit production allowlist: documentation, tests and the VFX sources never reach the browser.
await rm(new URL('./dist', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('./dist', import.meta.url), { recursive: true });
for (const entry of [
  'index.html',
  'styles.css',
  'bootstrap.js',
  'memento-services-host.js',
  'navigation',
  'src',
  'assets',
]) {
  await cp(new URL(entry, import.meta.url), new URL(`dist/${entry}`, import.meta.url), {
    recursive: true,
  });
}
// Memento VFX (START V27): engine and Ghost Fibers background, prebuilt from vfx/ into public/vfx/.
await cp(new URL('public/vfx', import.meta.url), new URL('dist/vfx', import.meta.url), { recursive: true });
const index = new URL('dist/index.html', import.meta.url);
let html = await readFile(index, 'utf8');
function populate(id, markup) {
  const slot = new RegExp(`(<div\\b[^>]*\\bid="${id}"[^>]*>)(\\s*</div>)`);
  if (!slot.test(html)) throw new Error(`Missing initial view: ${id}`);
  html = html.replace(slot, (_match, tag, end) => tag + markup + end);
}
// Size the mask before the first frame with the same projection used for swiping.
function placeOpening(methods) {
  const element = document.getElementById('bundle-boards');
  const cards = element.querySelector('.carousel-stage').children;
  const width = cards[0].offsetWidth, height = cards[0].offsetHeight;
  const wide = Number(getComputedStyle(element).getPropertyValue('--layout-wide')) || 0;
  methods.reserveBleed.call({...methods, element, width, height, wide, count:cards.length,
    fan:true, stride:width * (.78 - .14 * wide), perspective:1100 + 900 * wide});
}
const openingLayout = `<script>(${placeOpening.toString()})({${Carousel.prototype.pose.toString()},${Carousel.prototype.reserveBleed.toString()}})</script>`;
populate('bundle-boards', `<div class="carousel-stage">${catalogue.bundles.map((item,i)=>{const html=cover(item,i);return i===1 || i===catalogue.bundles.length-1 ? html.replaceAll('data-src','src') : html;}).join('')}</div>${openingLayout}`);
populate('bundle-controls', dots(catalogue.bundles.map(item => item.title)));
populate('category-sections', categories());
populate('catalogue-groups', grid('digital').html);
// Position the active board before JavaScript measures the carousel and lays out its neighbours.
// Compute the resting layout with the same camera as the interactive carousel.
const count = catalogue.bundles.length;
const at = (distance,wide) => Carousel.prototype.pose.call({fan:true,wide,width:1,height:1,stride:.78-.14*wide},distance);
const decimal = x => Math.round(x*10000)/10000;
const between = (a,b,unit) => `calc(${decimal(a)}${unit} + ${decimal(b-a)}${unit} * var(--layout-wide,0))`;
const initialBoards = Array.from({length:count},(_,i) => {
  const d=i>count/2?i-count:i;
  const a=at(d,0),b=at(d,1),edge=Math.min(2.7,count/2-.06);
  const transform=`translate3d(${between(-50+100*a.x,-50+100*b.x,'%')},${between(100*a.y,100*b.y,'%')},0) perspective(calc(1100px + 900px * var(--layout-wide,0))) rotateY(${between(a.yaw,b.yaw,'deg')}) scale(${decimal(a.scale)})`;
  return `#bundle-boards .carousel-stage:not([data-positioned])>[data-slide="${i}"]{transform:${transform};visibility:${Math.abs(d)>=edge?'hidden':'visible'};opacity:${decimal(Math.max(0,Math.min(1,(edge-Math.abs(d))/.6)))};--slide-focus:${d===0?1:0};z-index:${100-20*Math.abs(d)}}`;
}).join('');
const firstPaint = `<style>${initialBoards}</style>`;
await writeFile(index, html.replace('</head>', firstPaint + '</head>'));
console.log('Built dist/ — native modules and the prebuilt VFX engine, no runtime dependencies.');
