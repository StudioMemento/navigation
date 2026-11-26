import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const contentDir = fileURLToPath(new URL('../content/', import.meta.url));
const json = name => JSON.parse(readFileSync(join(contentDir, name + '.json'), 'utf8'));
const urls = new Map();
const paths = new Set();

function scan(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) { scan(file); continue; }
    const path = '/' + relative(publicDir, file).split(sep).join('/');
    paths.add(path);
    if (!path.endsWith('.html')) continue;
    const url = path.replace(/index\.html$/, '');
    urls.set(url, readFileSync(file, 'utf8'));
  }
}
scan(publicDir);

test('Home, sezioni e schede editoriali sono leggibili nel primo HTML', () => {
  const site = json('site'), catalogue = json('services'), projects = json('projects');
  const required = ['/', '/services/richiesta/', ...site.sections.map(s => '/' + s.slug + '/')];
  for (const [type, records] of [['servizio', catalogue.services], ['bundle', catalogue.bundles]]) {
    for (const item of records) required.push('/services/' + type + '/' + item.id + '/');
  }
  for (const item of projects) required.push('/projects/progetto/' + item.id + '/');
  for (const path of required) {
    const html = urls.get(path);
    assert.ok(html, 'Pagina mancante: ' + path);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path);
    assert.ok(html.includes('rel="canonical" href="' + site.origin + path + '"'), path);
  }
  assert.ok(urls.has('/404.html'));
  const listed = new Set([...readFileSync(join(publicDir, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname));
  assert.deepEqual(listed, new Set(required));
});

test('Link interni, frammenti, immagini e sorgenti responsive esistono', () => {
  const ids = new Map();
  for (const [url, html] of urls) {
    const nodes = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    ids.set(url, new Set(nodes));
    assert.equal(new Set(nodes).size, nodes.length, 'ID ripetuto in ' + url);
  }
  function check(from, raw) {
    const address = new URL(raw.replaceAll('&amp;', '&'), 'https://test.invalid' + from);
    if (address.origin !== 'https://test.invalid') return;
    const path = decodeURIComponent(address.pathname);
    assert.ok(urls.has(path) || paths.has(path), from + ' → ' + raw);
    if (address.hash && urls.has(path)) assert.ok(ids.get(path).has(decodeURIComponent(address.hash.slice(1))), from + ' → ' + raw);
  }
  for (const [url, html] of urls) {
    for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) check(url, match[1]);
    for (const match of html.matchAll(/\ssrcset="([^"]+)"/g)) {
      for (const item of match[1].split(',')) check(url, item.trim().split(/\s+/)[0]);
    }
  }
});

test('I due modelli Studio sono GLB completi', () => {
  for (const model of json('site').studio.models) {
    const file = join(publicDir, 'studio/assets', model.file);
    const bytes = readFileSync(file);
    assert.equal(bytes.toString('ascii', 0, 4), 'glTF');
    assert.equal(bytes.readUInt32LE(4), 2);
    assert.equal(bytes.readUInt32LE(8), statSync(file).size);
  }
});
