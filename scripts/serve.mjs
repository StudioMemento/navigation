import http from 'node:http';
import { createReadStream, statSync, watch } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../public/', import.meta.url)).replace(/[\\/]$/, '');
const project = resolve(root, '..');
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = Number(portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 5173);
const hostIndex = args.indexOf('--host');
const host = hostIndex >= 0 ? args[hostIndex + 1] || '0.0.0.0' : '127.0.0.1';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.woff2':'font/woff2', '.png':'image/png', '.gz':'application/gzip', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.glb': 'model/gltf-binary', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

if (args.includes('--dev')) {
  const rebuild = () => execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: project, stdio: 'inherit' });
  rebuild();
  let pending;
  for (const dir of ['scripts', 'templates']) {
    watch(resolve(project, dir), () => {
      clearTimeout(pending);
      pending = setTimeout(() => {
        try { rebuild(); } catch { console.error('Controlla i dati e salva di nuovo.'); }
      }, 100);
    });
  }
}

function redirect(res, path, search) {
  res.writeHead(308, { Location: path + search });
  res.end();
}

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let url, path;
  try {
    url = new URL(req.url, 'http://localhost');
    path = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }
  if (/^\/memento\/?$/.test(path)) return redirect(res, '/studio/', url.search);
  if (/^\/index\/?$/.test(path)) return redirect(res, '/', url.search);
  let file = resolve(root, '.' + path);
  if ((file !== root && !file.startsWith(root + sep)) || /[\u0000-\u001F\\]/.test(path) || path.startsWith('//')) {
    res.writeHead(400).end();
    return;
  }
  let status = 200;
  if (statSync(file, { throwIfNoEntry: false })?.isDirectory()) {
    if (!path.endsWith('/')) return redirect(res, url.pathname + '/', url.search);
    file = resolve(file, 'index.html');
  }
  if (!statSync(file, { throwIfNoEntry: false })?.isFile()) {
    file = resolve(root, '404.html');
    status = 404;
  }
  res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  if (req.method === 'HEAD') res.end();
  else createReadStream(file).on('error', () => res.destroy()).pipe(res);
}).listen(port, host, () => console.log(`Memento R25.3 su http://${host}:${port}/`));
