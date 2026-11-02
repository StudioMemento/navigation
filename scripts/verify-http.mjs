import assert from 'node:assert/strict';
const base = process.env.MEMENTO_TEST_URL || 'http://127.0.0.1:8782';
const checks = [];
for (const path of ['/', '/services/', '/projects/', '/levelup/', '/start/', '/catalog/', '/pages/projects/', '/pages/levelup/', '/pages/start/', '/src/app.mjs', '/src/page-bridge.js', '/assets/world.glb', '/assets/scene.json', '/assets/environment.hdr', '/vendor/draco/draco_wasm_wrapper.js', '/vendor/draco/draco_decoder.wasm']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  assert.ok((await response.arrayBuffer()).byteLength > 0, path);
  if (/\.(m?js)$/.test(path)) assert.match(response.headers.get('content-type'), /javascript/, path);
  if (path.endsWith('.wasm')) assert.equal(response.headers.get('content-type'), 'application/wasm');
  checks.push({ path, status: response.status });
}
for (const slug of ['services', 'projects', 'levelup', 'start']) {
  const response = await fetch(base + '/' + slug, { redirect: 'manual' });
  assert.equal(response.status, 308, slug);
  assert.equal(response.headers.get('location'), '/' + slug + '/');
  const html = await (await fetch(base + '/' + slug + '/')).text();
  assert.match(html, /id="world"/, slug);
  checks.push({ path: '/' + slug, status: response.status, deepLink: true });
}
for (const path of ['/src/missing.mjs', '/assets/missing.glb', '/package.json', '/docs/VERIFICHE_ORIGINALI.md']) {
  const response = await fetch(base + path); assert.equal(response.status, 404, path);
  checks.push({ path, status: response.status });
}
const response = await fetch(base + '/assets/world.glb', { headers: { Range: 'bytes=0-31' } });
assert.equal(response.status, 206); assert.equal((await response.arrayBuffer()).byteLength, 32);
checks.push({ path: '/assets/world.glb', range: true, status: 206 });
console.log(JSON.stringify({ pass: true, checks }, null, 2));
