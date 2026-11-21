// Container contract: routes, sources per environment, message validation. Browser flows: tests/integration/ (workspace).
import test from 'node:test';
import assert from 'node:assert/strict';
import { STATIONS, parseRoute, routePath, contentURL, navigationLink, trustedParent, validMessage, safeContext, safeHash, stationForOrigin, CHANNEL, VERSION } from '../src/kit/core.mjs';
import { hubEnvironment, validSource, resolveSources } from '../src/shell/sources.mjs';
import { readPayload } from '../src/shell/frames.mjs';
import { routeMeta } from '../src/seo.mjs';

test('one table of sections: stable ids, public routes, an application per environment', () => {
  assert.deepEqual(STATIONS.map(s => s.path), ['/studio', '/services', '/projects', '/levelup', '/start']);
  assert.deepEqual(STATIONS.map(s => s.id), ['memento', 'services', 'projects', 'levelup', 'start']);
  for (const s of STATIONS) { assert.match(s.url, /^https:\/\/[a-z]+\.vercel\.app\/$/); assert.match(s.local, /^http:\/\/127\.0\.0\.1:41\d\d\/$/); }
  assert.equal(STATIONS.find(s => s.id === 'memento').integration, 'legacy');
});

test('routes: pages, world stations, context and unknown paths', () => {
  assert.deepEqual(parseRoute('https://mementostudio.it/'), { id: 'memento', view: 'world', search: '', hash: '' });
  assert.deepEqual(parseRoute('/#projects', 'http://127.0.0.1:4100'), { id: 'projects', view: 'world', search: '', hash: '' });
  assert.deepEqual(parseRoute('/start?from=levelup&experience=food&evil=1#x', 'https://mementostudio.it'), { id: 'start', view: 'page', search: 'from=levelup&experience=food', hash: '#x' });
  assert.equal(parseRoute('/memento', 'https://mementostudio.it').id, 'memento');
  assert.equal(parseRoute('/services/extra', 'https://mementostudio.it'), null);
  assert.equal(parseRoute('/nope', 'https://mementostudio.it'), null);
  assert.equal(routePath({ id: 'start', view: 'page', search: 'from=levelup', hash: '' }), '/start?from=levelup');
  assert.equal(routePath({ id: 'projects', view: 'world' }), '/#projects');
  assert.equal(routePath({ id: 'memento', view: 'world' }), '/');
  assert.equal(safeHash('#a"><script>'), ''); assert.equal(safeContext('redirect=https://evil'), '');
});

test('the frame always points at the application, never at the container (no recursion)', () => {
  const url = contentURL({ id: 'services', search: '', hash: '#bundle/b-online' }, 'http://127.0.0.1:4101/');
  assert.equal(url, 'http://127.0.0.1:4101/?mementoEmbed=1#bundle/b-online');
  for (const s of STATIONS) assert.notEqual(new URL(contentURL({ id: s.id }, s.url)).origin, 'https://mementostudio.it');
});

test('global links of the pages: public domain, technical domains, anchors and other sites', () => {
  const base = 'https://mementolevelup.vercel.app/?mementoEmbed=1';
  assert.deepEqual(navigationLink('https://mementostudio.it/start?from=levelup', base), { id: 'start', view: 'page', search: 'from=levelup', hash: '' });
  assert.deepEqual(navigationLink('https://mementoservizi.vercel.app/#web', base), { id: 'services', view: 'page', search: '', hash: '#web' });
  assert.deepEqual(navigationLink('https://mementostudio.it/#start', base), { id: 'start', view: 'world', search: '', hash: '' });
  assert.equal(navigationLink('#contatto', base), null);
  assert.equal(navigationLink('https://www.instagram.com/mementostudio.it/', base), null);
  assert.equal(navigationLink('mailto:info@mementostudio.it', base), null);
  assert.equal(navigationLink('https://mementoservizi.vercel.app/assets/x.webp', base), null);
  assert.equal(stationForOrigin('https://mementoportfolio-git-main-studio-memento-s-projects.vercel.app').id, 'projects');
});

test('pages trust only the hub origins; loopback only between loopback documents', () => {
  for (const origin of ['https://mementostudio.it', 'https://www.mementostudio.it', 'https://mementonav.vercel.app', 'https://mementonav-git-x-studio-memento-s-projects.vercel.app'])
    assert.equal(trustedParent(origin, undefined, 'https://mementoservizi.vercel.app'), true, origin);
  for (const origin of ['https://mementostudio.it.evil.test', 'https://evil.vercel.app', 'http://mementostudio.it', 'null'])
    assert.equal(trustedParent(origin, undefined, 'https://mementoservizi.vercel.app'), false, origin);
  assert.equal(trustedParent('http://127.0.0.1:4100', undefined, 'http://127.0.0.1:4101'), true);
  assert.equal(trustedParent('http://127.0.0.1:4100', undefined, 'https://mementoservizi.vercel.app'), false);
});

test('sources: production is fixed; previews and local accept only the section\'s own deployments', () => {
  assert.equal(hubEnvironment('https://mementostudio.it'), 'production');
  assert.equal(hubEnvironment('https://mementonav.vercel.app'), 'production');
  assert.equal(hubEnvironment('http://127.0.0.1:4100'), 'local');
  assert.equal(hubEnvironment('https://mementonav-abc-studio-memento-s-projects.vercel.app'), 'preview');
  const services = STATIONS.find(s => s.id === 'services');
  assert.equal(validSource(services, 'https://mementoservizi-k3j2-studio-memento-s-projects.vercel.app/', 'preview'), 'https://mementoservizi-k3j2-studio-memento-s-projects.vercel.app/');
  assert.equal(validSource(services, 'https://mementoportfolio.vercel.app/', 'preview'), null);
  assert.equal(validSource(services, 'https://evil.example/', 'preview'), null);
  assert.equal(validSource(services, 'http://127.0.0.1:9999/', 'preview'), null);
  assert.equal(validSource(services, 'http://127.0.0.1:9999/', 'local'), 'http://127.0.0.1:9999/');
  assert.equal(validSource(services, 'https://mementoservizi.vercel.app/admin', 'preview'), null);
  const memory = new Map(), storage = { getItem: k => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v), removeItem: k => memory.delete(k) };
  const prod = resolveSources({ origin: 'https://mementostudio.it', search: '?memento-src-services=https://evil.example/', storage });
  assert.equal(prod.sources.get('services').url, 'https://mementoservizi.vercel.app/');
  const preview = resolveSources({ origin: 'https://mementonav-x-studio-memento-s-projects.vercel.app', search: '?memento-src-services=https://mementoservizi-k3j2-studio-memento-s-projects.vercel.app/', storage });
  assert.equal(preview.sources.get('services').origin, 'https://mementoservizi-k3j2-studio-memento-s-projects.vercel.app');
  // kept for the tab, then reset
  assert.equal(resolveSources({ origin: 'https://mementonav-x-studio-memento-s-projects.vercel.app', storage }).sources.get('services').origin, 'https://mementoservizi-k3j2-studio-memento-s-projects.vercel.app');
  assert.equal(resolveSources({ origin: 'https://mementonav-x-studio-memento-s-projects.vercel.app', search: '?memento-src-services=reset', storage }).sources.get('services').url, 'https://mementoservizi.vercel.app/');
  assert.equal(resolveSources({ origin: 'http://127.0.0.1:4100' }).sources.get('start').url, 'http://127.0.0.1:4104/');
});

test('messages: source, origin, session, version and payload shape are all checked', () => {
  const source = {}, record = { id: 'services', source, origin: 'https://mementoservizi.vercel.app', sessionId: 'session-123456789', version: VERSION };
  const event = (data, extra = {}) => ({ source, origin: record.origin, data: { channel: CHANNEL, version: VERSION, station: 'services', sessionId: record.sessionId, type: 'RETURN', payload: { edge: 'end' }, ...data }, ...extra });
  assert.equal(validMessage(event({}), record), true);
  assert.equal(validMessage(event({}, { source: {} }), record), false);
  assert.equal(validMessage(event({}, { origin: 'https://evil.vercel.app' }), record), false);
  assert.equal(validMessage(event({ sessionId: 'old-session-1234' }), record), false);
  assert.equal(validMessage(event({ station: 'start' }), record), false);
  assert.equal(validMessage(event({ payload: [] }), record), false);
  assert.equal(validMessage(event({ version: 1 }), record), false);
  assert.deepEqual(readPayload('NAVIGATE', { id: 'start', view: 'page', search: 'from=levelup&x=<script>', hash: '#ok' }), { id: 'start', view: 'page', search: 'from=levelup', hash: '#ok' });
  assert.equal(readPayload('NAVIGATE', { id: 'https://evil', view: 'page' }), null);
  assert.deepEqual(readPayload('RETURN', { edge: 'sideways' }), { edge: 'explicit' });
  assert.deepEqual(readPayload('STATE', { modal: 'yes', usable: true, extra: 1 }), { usable: true });
  assert.equal(readPayload('LOCATION', null), null);
  assert.equal(readPayload('EVAL', { code: 'x' }), null);
});

test('route metadata comes from the applications, the home keeps its own', () => {
  assert.equal(routeMeta({ view: 'world' }).canonical, 'https://mementostudio.it/');
  const services = routeMeta({ id: 'services', view: 'page' });
  assert.equal(services.title, 'Servizi — Memento Design Studio');
  assert.equal(services.canonical, 'https://mementostudio.it/services');
  for (const s of STATIONS) assert.ok(routeMeta({ id: s.id, view: 'page' }).description.length > 20, s.id);
});
