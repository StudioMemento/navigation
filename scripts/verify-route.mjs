import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { SECTION_KEY, ROUTE_CHANNEL, ROUTE_VERSION, sectionName, initialSection, referrerSection, routeMessage, installRouteSync } from '../dist/src/route-state.mjs';

const memory = new Map([[SECTION_KEY, 'projects']]);
const storage = { getItem: key => memory.get(key), setItem: (key, value) => memory.set(key, value) };
assert.equal(initialSection({ hash: '#start', storage }), 'start');
assert.equal(initialSection({ storage }), 'projects');
assert.equal(initialSection({ storage, referrer: 'https://mementostudio.it/start' }), 'start');
assert.equal(referrerSection('https://mementostudio.it.evil.test/start'), null);
assert.equal(referrerSection('https://mementostudio.it/start/more'), null);
assert.equal(sectionName('#MEMENTO'), 'studio');
assert.equal(sectionName('#start?redirect=evil'), null);
assert.equal(sectionName('https://mementostudio.it/start'), null);
assert.equal(initialSection({ hash: '#unknown', storage: { getItem() { throw Error('blocked'); } } }), 'studio');

function fixture(hash = '') {
  let section = 'projects';
  const listeners = new Map(), outgoing = [];
  const parent = { postMessage: (data, origin) => outgoing.push({ data, origin }) };
  const win = { parent, sessionStorage: storage, document: { referrer: 'https://mementostudio.it/' },
    location: { origin: 'https://mementonav.vercel.app', hash }, crypto: { randomUUID: () => 'test-request-id' },
    addEventListener(type, fn) { listeners.set(type, fn); }, removeEventListener(type) { listeners.delete(type); } };
  const api = installRouteSync({ win, readSection: () => section, applySection: value => { section = value; } });
  const event = (value, initial = true, extra = {}) => ({ source: parent, origin: 'https://mementostudio.it', data: {
    channel: ROUTE_CHANNEL, version: ROUTE_VERSION, type: 'STATE', requestId: 'test-request-id', section: value, initial
  }, ...extra });
  return { win, api, outgoing, listeners, event, get section() { return section; } };
}

const f = fixture();
assert.equal(f.outgoing[0].origin, 'https://mementostudio.it');
for (const bad of [f.event('start', true, { origin: 'https://evil.test' }), f.event('start', true, { source: {} }),
  { ...f.event('start'), data: { ...f.event('start').data, requestId: 'old-session' } }, f.event('javascript:alert(1)')]) {
  assert.equal(routeMessage(bad, { parent: f.win.parent, origins: ['https://mementostudio.it'], requestId: 'test-request-id' }), false);
  f.listeners.get('message')(bad);
  assert.equal(f.section, 'projects');
}
f.listeners.get('message')(f.event('start'));
assert.equal(f.section, 'start');
assert.equal(memory.get(SECTION_KEY), 'start');
assert.equal(f.api.connected, true);
f.api.notify('levelup');
assert.equal(f.outgoing.at(-1).data.section, 'levelup');
f.listeners.get('message')(f.event('services', false));
assert.equal(f.section, 'services');
f.listeners.get('message')(f.event(null, false));
assert.equal(f.section, 'studio');
f.api.destroy();
assert.equal(f.listeners.size, 0);

const late = fixture(); late.api.markInteracted();
late.listeners.get('message')(late.event('start'));
assert.equal(late.section, 'projects', 'Late initialization cannot rewind an interaction');
late.listeners.get('message')(late.event('start', false));
assert.equal(late.section, 'start', 'Later explicit host navigation remains authoritative');
late.api.destroy();
const explicit = fixture('#projects');
explicit.listeners.get('message')(explicit.event('start'));
assert.equal(explicit.section, 'projects', 'Child deep link wins over initial parent fallback');
explicit.api.destroy();

// Run the shipped Framer snippet, not a second implementation of its protocol.
const html = await readFile(new URL('../docs/framer-nav-bridge.html', import.meta.url), 'utf8');
const source = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const sent = [], events = new Map(), frameEvents = new Map();
const frameWindow = { postMessage: (data, origin) => sent.push({ data, origin }) };
const iframe = { src: 'https://mementonav.vercel.app/', contentWindow: frameWindow,
  addEventListener: (type, fn) => frameEvents.set(type, fn), removeEventListener: type => frameEvents.delete(type) };
const location = new URL('https://mementostudio.it/#start');
const history = { state: { preserve: true }, replaceState(state, unused, url) { assert.equal(state.preserve, true); location.href = String(url); } };
const host = { addEventListener: (type, fn) => events.set(type, fn), removeEventListener: type => events.delete(type) };
vm.runInNewContext(source, { window: host, document: { querySelectorAll: () => [iframe], documentElement: {} },
  location, history, URL, MutationObserver: class { observe() {} disconnect() {} } });
assert.equal(iframe.title, 'Navigazione Memento');
assert.equal(sent[0].data.type, 'HOST_READY');
const request = { source: frameWindow, origin: 'https://mementonav.vercel.app', data: { channel: ROUTE_CHANNEL, version: 1, type: 'REQUEST', requestId: 'integration-test' } };
events.get('message')({ ...request, origin: 'https://fake.vercel.app' });
assert.equal(sent.length, 1);
events.get('message')(request);
assert.equal(sent.at(-1).data.section, 'start');
assert.equal(sent.at(-1).data.initial, true);
events.get('message')({ ...request, data: { ...request.data, type: 'CHANGE', section: 'levelup' } });
assert.equal(location.hash, '#levelup');
location.hash = '#services'; events.get('hashchange')();
assert.equal(sent.at(-1).data.section, 'services');
assert.equal(sent.at(-1).data.initial, false);
host.__MEMENTO_HOME_ROUTE_R6__.destroy();
assert.equal(events.size, 0);
console.log('ROUTE_RESTORE_VERIFIED: deep links, blocked storage, origin/source/session validation, late reply, parent history, title and cleanup');
