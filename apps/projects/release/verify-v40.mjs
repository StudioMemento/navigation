import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { detailFor, detailMarkup, galleryStage, processStage, distributedHeading } from '../site/project-layout.js';
import { validateProjects } from '../site/catalogue.js';

const projects = validateProjects(JSON.parse(await readFile(new URL('../site/projects.json', import.meta.url))));
const order = ['project-overview', 'project-experience', 'project-vision', 'project-process'];
for (const project of projects) {
  const detail = detailFor(project);
  const html = detailMarkup(project);
  let previous = -1;
  for (const id of order) {
    const position = html.indexOf(`id="${id}"`);
    assert(position > previous, `${project.id}: section ${id} is missing or out of order`);
    previous = position;
  }
  assert.equal(detail.gallery.length, 5);
  assert.equal(detail.process.length, 5);
  assert.equal((html.match(/class="slide-thumb"/g) || []).length, 5);
  assert.equal((html.match(/class="process-dot"/g) || []).length, 5);
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, 2);
  assert(html.includes('aria-label="VISION"') && html.includes('aria-label="PROCESS"'));
  assert(html.includes('[Qui il brief sintetico:'));
  assert(html.includes('[Esperienza, film o modello del progetto]'));
  assert(galleryStage(detail.gallery[4]).includes('05 / 05'));
  assert(processStage(detail.process[4]).includes('Process / 05'));
  const changed = detailMarkup(project, 4, 2);
  assert.match(changed, /data-slider-id="gallery" data-index="4"[^>]*aria-pressed="true"/);
  assert.match(changed, /data-slider-id="process" data-index="2"[^>]*aria-pressed="true"/);
}
const vision = distributedHeading('VISION', 'vision-heading');
assert.equal((vision.match(/<span>[A-Z]<\/span>/g) || []).length, 6);
assert(vision.includes('aria-hidden="true"'));
// Absence oracle, including a positive control, prevents final project media
// from accidentally leaking into the requested placeholder-only detail.
const hasLoadedMedia = html => /<(?:img|iframe|video|model-viewer)\b/.test(html);
assert.equal(hasLoadedMedia('<iframe src="example"></iframe>'), true);
for (const project of projects) assert.equal(hasLoadedMedia(detailMarkup(project)), false);
console.log(`Portfolio structure verified: ${projects.length} projects, gallery and process states, accessible headings and placeholder-only content.`);
