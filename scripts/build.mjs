import { mkdir, readdir, rmdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, escape, link, site, sections } from './html.mjs';
import { home, studio } from './home.mjs';
import { catalogue, itemPath, servicesIndex, serviceDetail, leadPage } from './services.mjs';
import { projects, projectPath, projectName, projectIndex, projectDetail } from './projects.mjs';
import { levelup } from './levelup.mjs';
import { start } from './start.mjs';

const output = fileURLToPath(new URL('../public/', import.meta.url));
const pages = new Map();

function add(path, meta, main, scripts = []) {
  if (!/^\/(?:[a-z0-9-]+\/)*$/.test(path) || pages.has(path)) throw Error('Percorso non valido o duplicato: ' + path);
  pages.set(path, layout({ ...meta, path, main, scripts }));
}

add('/', site.home, home());
add('/studio/', sections.studio, studio());
add('/services/', sections.services, servicesIndex(), ['catalogue']);
add('/projects/', sections.projects, projectIndex(), ['catalogue']);
add('/levelup/', sections.levelup, levelup(), ['preview']);
add('/start/', sections.start, start(), ['start']);
add('/services/richiesta/', {
  title: 'Da dove cominciamo? — Memento', description: 'Raccontaci cosa vuoi far crescere.'
}, leadPage(), ['lead']);

for (const item of [...catalogue.services, ...catalogue.bundles]) {
  const description = item.slides[0].copy.join(' ');
  add(itemPath(item), { title: item.title + ' — Memento', description }, serviceDetail(item));
}
for (const project of projects) {
  const name = projectName(project);
  const player = project.experience?.type === 'web' || Boolean(project.experience?.embed);
  add(projectPath(project), {
    title: name + ' — Memento Portfolio', description: name + '. ' + project.domains.map(domain => site.domains[domain]).join(' · ') + '.'
  }, projectDetail(project), player ? ['preview'] : []);
}

// These three directories contain generated sheets. Remove retired index pages
// after rendering the new set. All source media live in separate asset folders.
for (const base of ['services/servizio', 'services/bundle', 'projects/progetto']) {
  const dir = join(output, base);
  await mkdir(dir, { recursive: true });
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || pages.has('/' + base + '/' + entry.name + '/')) continue;
    const subdir = join(dir, entry.name);
    await unlink(join(subdir, 'index.html')).catch(err => { if (err.code !== 'ENOENT') throw err; });
    if (!(await readdir(subdir)).length) await rmdir(subdir);
  }
}
for (const [path, html] of pages) {
  const file = join(output, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
await writeFile(join(output, '404.html'), layout({
  path: '/404.html', title: 'Pagina non trovata — Memento', description: 'Questa pagina non esiste. Torna al mondo Memento.',
  noindex: true, main: '<h1>Pagina non trovata</h1><p>' + link('/', 'Torna alla Home') + '</p>'
}));
const locs = [...pages.keys()].map(path => '  <url><loc>' + escape(site.origin + path) + '</loc></url>');
await writeFile(join(output, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + locs.join('\n') + '\n</urlset>\n');
await writeFile(join(output, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + site.origin + '/sitemap.xml\n');
console.log(`${pages.size} pagine + 404 in public/. ${catalogue.services.length} servizi, ${catalogue.bundles.length} bundle, ${projects.length} progetti.`);
