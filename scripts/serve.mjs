import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(project, process.argv.includes('--source') ? 'public' : 'dist');
const config = JSON.parse(await readFile(resolve(project, 'vercel.json'), 'utf8'));
const port = Number(process.env.MEMENTO_SITE_PORT || 8782);
await stat(resolve(root, 'index.html')).catch(() => { throw new Error('Esegui prima npm run build, oppure usa npm run dev.'); });
const types = {
  '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8',
  '.json':'application/json','.glb':'model/gltf-binary','.gltf':'model/gltf+json',
  '.wasm':'application/wasm','.hdr':'image/vnd.radiance','.svg':'image/svg+xml',
  '.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.avif':'image/avif','.ico':'image/x-icon','.woff2':'font/woff2','.woff':'font/woff',
  '.mp4':'video/mp4','.webm':'video/webm','.txt':'text/plain','.bin':'application/octet-stream',
  '.ktx2':'image/ktx2','.webmanifest':'application/manifest+json'
};
function headers(path) {
  const result = {};
  for (const rule of config.headers || []) {
    if (rule.source === '/(.*)' || rule.source === path) {
      for (const h of rule.headers) result[h.key] = h.value;
    }
  }
  return result;
}
http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
    const url = new URL(req.url, 'http://127.0.0.1');
    const path = decodeURIComponent(url.pathname);
    const target = resolve(root, '.' + path);
    if (target !== root && !target.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if (config.trailingSlash && path !== '/' && !path.endsWith('/') && !extname(path)) {
      res.writeHead(308, { Location: path + '/' + url.search }); res.end(); return;
    }
    const route = config.rewrites.find(r => r.source === path);
    let mapped = route?.destination || path;
    if (mapped.endsWith('/')) mapped += 'index.html';
    const file = resolve(root, '.' + mapped);
    if (!file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    const info = await stat(file);
    if (!info.isFile()) throw new Error('not found');
    const data = await readFile(file);
    const common = { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Accept-Ranges': 'bytes', ...headers(path) };
    const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
    if (range) {
      const start = Number(range[1]), end = Math.min(range[2] ? Number(range[2]) : data.length - 1, data.length - 1);
      if (start > end) { res.writeHead(416, { 'Content-Range': `bytes */${data.length}` }); res.end(); return; }
      res.writeHead(206, { ...common, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${data.length}` });
      res.end(req.method === 'HEAD' ? undefined : data.subarray(start, end + 1)); return;
    }
    res.writeHead(200, { ...common, 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Risorsa non trovata.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Memento: http://127.0.0.1:${port}/ — ${root.endsWith('/dist') ? 'build dist' : 'public'}`));
