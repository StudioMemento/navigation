import {filtersMarkup,tileMarkup} from '../site/catalogue-markup.js';
import {setManifest} from '../site/media.js';
import {validateProjects} from '../site/catalogue.js';
import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const excluded = new Set(['qa-overlay.html', 'LEGGIMI_VERCEL.txt', 'vercel.json']);
await cp(path.join(root, 'site'), output, {
  recursive: true,
  filter: source => !excluded.has(path.basename(source)) && !path.basename(source).startsWith('qa-'),
});
const projects=validateProjects(JSON.parse(await readFile(path.join(output,'projects.json'),'utf8')));
setManifest(JSON.parse(await readFile(path.join(output,'images.json'),'utf8')));
const index=path.join(output,'index.html');
let html=await readFile(index,'utf8');
const filters=/(<nav id="filters"[^>]*>)(<\/nav>)/;
const grid=/(<div id="project-grid"[^>]*)(>)(<\/div>)/;
if(!filters.test(html) || !grid.test(html))throw new Error('Catalogue markup changed');
html=html.replace(filters,(_,open,close)=>open+filtersMarkup()+close)
  .replace(grid,(_,open,bracket,close)=>open+' data-initial-catalogue'+bracket+projects.map((p,i)=>tileMarkup(p,i<4)).join('')+close);
// Give the client and the build the same data. The preload is reused by fetch, including on deep links.
html=html.replace('</head>', '<link rel="preload" as="fetch" href="projects.json" crossorigin><link rel="preload" as="fetch" href="images.json" crossorigin></head>');
await writeFile(index,html);
console.log('Memento Portfolio V43: dist pronta, asset inclusi.');
