import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { validateProjects, wrapIndex } from '../site/catalogue.js';
import { setManifest } from '../site/media.js';
import { detailMarkup, galleryFor, galleryRatio, experienceFor, visionFor } from '../site/project-layout.js';
import { titleLayout } from '../site/title-fit.js';

const site = fileURLToPath(new URL('../site/', import.meta.url));
const read = file => readFile(path.join(site, file), 'utf8');
setManifest(JSON.parse(await read('images.json')));
const projects = validateProjects(JSON.parse(await read('projects.json')));

// IMG2–IMG5: gallery → experience → vision, nothing of Process, real images from projects.json.
let galleryImages = 0, experiences = 0;
for (const project of projects) {
  const html = detailMarkup(project);
  assert(!/process|data-slider="process"/i.test(html), `${project.id}: Process must be gone`);
  let last = -1;
  for (const id of ['project-gallery', 'project-experience', 'project-vision']) {
    const at = html.indexOf(`id="${id}"`);
    assert(at > last, `${project.id}: ${id} out of order`); last = at;
  }
  const items = galleryFor(project);
  assert(items.length >= 1, `${project.id}: empty gallery`);
  assert.equal(new Set(items.map(item => item.src)).size, items.length, `${project.id}: duplicated gallery image`);
  for (const item of items) { await access(path.join(site, item.src)); galleryImages++; }
  const ratio = galleryRatio(items);
  assert(ratio >= 1.25 && ratio <= 16 / 9 + 1e-9, `${project.id}: gallery ratio ${ratio}`);
  assert.equal((html.match(/class="gallery-thumb"/g) || []).length, items.length > 1 ? items.length : 0);
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, items.length > 1 ? 1 : 0);
  const experience = experienceFor(project);
  if (experience) {
    experiences++;
    assert(html.includes(`data-type="${experience.type}"`) && html.includes('data-action="experience-start"'), `${project.id}: experience`);
    assert(/^https:\/\//.test(experience.link) || experience.link.startsWith('assets/'), `${project.id}: experience link`);
    assert(!html.includes('<iframe'), `${project.id}: nothing loads before the explicit start`);
  } else assert(html.includes('EXP / VIDEO / 3D'), `${project.id}: placeholder slot`);
  const vision = visionFor(project);
  assert(vision && html.includes('vision-copy') && html.includes('aria-label="Vision"'), `${project.id}: vision`);
  assert.equal(wrapIndex(-1, items.length), items.length - 1);
}
// optional fields: a section can be switched off per project, a written vision replaces the placeholder
const sample = { ...projects[0], experience: false, vision: { copy: 'Una frase.' } };
assert(!detailMarkup(sample).includes('project-experience'));
assert(detailMarkup(sample).includes('>Una frase.<') && !detailMarkup(sample).includes('is-placeholder'));
assert(!detailMarkup({ ...projects[0], vision: false }).includes('project-vision'));
assert.throws(() => validateProjects([{ ...projects[0], experience: { type: 'web' } }]));
assert.throws(() => validateProjects([{ ...projects[0], gallery: [{ type: 'image', src: 'http://x' }] }]));

// IMG1, IMG6–IMG8 and the START V27 layer in the shell.
const index = await read('index.html'), app = await read('app.js'), css = await read('styles.css'), vfxCss = await read('vfx.css');
assert(!/scroll-cue|cue-track|project-progress|checkpoint-/.test(index + app + css), 'scroll cue must be gone');
assert(!/data-tide-scroll-root|id="viewport"/.test(index), 'the document scrolls natively');
assert(/\.project-title-band\{[^}]*text-align:center/.test(css) && /\.title-line\{[^}]*margin-inline:auto/.test(css), 'centred title');
assert(app.includes("placeCatalogue('archive')") && app.includes('id="project-archive"'), 'archive at the end of the project');
// R19: the navbar, bootstraps and effects engine are the site's (navigation): the page keeps none of its own
assert(!/<memento-nav|navigation\/|bootstrap\.js|vfx\/memento-vfx/.test(index), 'no navbar, bootstrap or engine of its own');
assert(index.includes('vfx.css'));
assert(app.includes("import('/memento-ui/effects.mjs')") && app.includes('mountBackground'));
assert(vfxCss.includes('.memento-background') && vfxCss.includes('html.vfx-live [data-vfx][data-vfx-ready]'));
for (const surface of ['data-vfx="title"', 'data-vfx="card"', 'data-vfx-transform', 'data-vfx-clip=".coverflow"', 'data-vfx-colour', 'data-vfx-dom'])
  assert((index + app + await read('project-layout.js')).includes(surface), `surface ${surface}`);

// Title fitting, independent of a browser, with nonuniform glyph metrics (as V42).
const measure = text => [...text].reduce((sum, char) => sum + ('MW'.includes(char) ? .95 : 'I '.includes(char) ? .28 : .65), 0);
for (const width of [240, 280, 343, 675, 901, 1199, 1720]) for (const text of ['A', 'Coricama', 'Memento Design Studio', 'Architetture digitali per esperienze memorabili', 'UnTitoloLunghissimoSenzaSpaziDiSeparazione', 'Memento\nDesign Studio']) {
  const layout = titleLayout(text, width, Math.min(300, width * .26), measure);
  assert(layout.lines.every(line => measure(line) * layout.size <= width + .001));
  assert(layout.size > 0 && layout.lines.length <= 2);
}
console.log(`PORTFOLIO_V43_VERIFIED: ${projects.length} projects, ${galleryImages} gallery images, ${experiences} experiences wired, no Process, no scroll cue, archive and VFX layer.`);
