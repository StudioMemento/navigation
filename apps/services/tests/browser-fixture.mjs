import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../', import.meta.url));
const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};
const host = `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;height:100%;background:radial-gradient(ellipse at 20% 60%,#45535c,transparent 55%),#050b0e}iframe{position:fixed;inset:0;width:100%;height:100%;border:0}</style><iframe src="/v40/" title="Servizi"></iframe>`;
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/host') {
    res.setHeader('content-type', 'text/html');
    return res.end(host);
  }
  const relative = decodeURIComponent(url.pathname.replace(/^\/v40\//, '')) || 'index.html';
  const file = path.resolve(root, relative);
  if (!file.startsWith(root)) {
    res.statusCode = 403;
    return res.end();
  }
  try {
    res.setHeader('content-type', types[path.extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  } catch {
    res.statusCode = 404;
    res.end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}),
  headless: true,
  args: ['--disable-dev-shm-usage'],
});
fs.mkdirSync(new URL('../test-results/screens/', import.meta.url), { recursive: true });
export { browser, server, origin };
