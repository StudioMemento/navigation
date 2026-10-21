import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseRoute, routeUrl } from '../src/router.js';
import { filterProjects, renderServices, renderPortfolio, renderExperiences } from '../src/collections.js';
import { renderProject, renderService, selectedProject } from '../src/focus.js';
import { emailBody, mailtoUrl } from '../src/contact.js';
import { escapeHtml } from '../src/ui.js';

const read = async name => JSON.parse(await readFile(new URL(`../content/${name}.json`, import.meta.url), 'utf8'));
const data = { catalog: await read('catalog'), projects: await read('projects'), experiences: await read('experiences') };

test('deep links preserve filters and special characters', () => {
  const route = parseRoute(routeUrl('/portfolio/auren', { categoria: 'web', cerca: 'Auren & design' }));
  assert.equal(route.parts[1], 'auren');
  assert.equal(route.query.get('cerca'), 'Auren & design');
  assert.equal(parseRoute('').path, '/');
});
test('all source services and bundles have reachable details', () => {
  for (const service of [...data.catalog.services, ...data.catalog.bundles]) {
    const markup = renderService(data, parseRoute(`#/servizi/${service.id}`));
    assert.ok(markup.includes(escapeHtml(service.title)));
    assert.ok(markup.includes(escapeHtml(service.details.needs)));
    assert.ok(markup.includes('oggetto='));
  }
  for (const family of data.catalog.families) assert.ok(renderServices(data, parseRoute(`#/servizi?categoria=${family.id}`)).includes(family.label));
});
test('every project and every variant retains its gallery', () => {
  for (const project of data.projects) {
    const variants = project.variants || [{ id: '' }];
    for (const variant of variants) {
      const route = parseRoute(routeUrl(`/portfolio/${project.id}`, { variante: variant.id }));
      assert.ok(renderProject(data, route).includes(escapeHtml(project.title)));
      assert.ok(selectedProject(data, route).images.length > 0);
    }
  }
});
test('combined portfolio search and category filters handle no results', () => {
  const matches = filterProjects(data.projects, new URLSearchParams({ categoria: 'web', cerca: 'aUrEn' }));
  assert.deepEqual(matches.map(project => project.id), ['auren']);
  assert.equal(filterProjects(data.projects, new URLSearchParams({ cerca: 'no-such-project-2026' })).length, 0);
  assert.ok(renderPortfolio(data, parseRoute('#/portfolio?cerca=no-such-project-2026')).includes('Nessun progetto trovato'));
});
test('all nine demo entry points use supplied destinations', () => {
  const html = renderExperiences(data);
  assert.equal(data.experiences.length, 9);
  for (const demo of data.experiences) {
    assert.ok(html.includes(`#/level-up/${demo.id}`));
    assert.equal(new URL(demo.url).protocol, 'https:');
  }
});
test('email draft preserves accents and reserved characters without submitting', () => {
  const draft = { name: 'Èva & Co', email: 'test+design@example.com', phone: '', subject: '3D & identità', message: 'Ciao, vorrei un sito.\nA+B = C?' };
  const url = new URL(mailtoUrl(draft));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.searchParams.get('body'), emailBody(draft));
  assert.equal(url.searchParams.get('subject'), draft.subject);
  assert.ok(!emailBody(draft).includes('Telefono:'));
});
test('content is escaped before insertion into markup', () => {
  assert.equal(escapeHtml('<img onerror="x"> & \'a\''), '&lt;img onerror=&quot;x&quot;&gt; &amp; &#39;a&#39;');
});
