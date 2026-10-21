import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const port = Number(option('--port', '4173'));
const host = option('--host', '0.0.0.0');
const root = fileURLToPath(new URL('../', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.glb': 'model/gltf-binary' };

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
  try {
    const url = new URL(request.url, 'http://local.invalid');
    const path = resolve(root, `.${decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)}`);
    if (!path.startsWith(root.endsWith(sep) ? root : root + sep)) { response.writeHead(403); response.end(); return; }
    const file = await stat(path);
    if (!file.isFile()) throw new Error('Not a file');
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Content-Length': file.size, 'Cache-Control': 'no-store' });
    if (request.method === 'HEAD') response.end();
    else createReadStream(path).pipe(response);
  } catch { response.writeHead(404, { 'Content-Type': 'text/plain' }); response.end('Not found'); }
});
server.on('error', error => { console.error(error.message); process.exit(1); });
server.listen(port, host, () => console.log(`Memento preview ready on port ${port}`));
