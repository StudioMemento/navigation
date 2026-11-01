import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, extname, sep } from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2); const port=Number(args[args.indexOf('--port')+1])||4173;
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{try{
 const path=decodeURIComponent(new URL(req.url,'http://local').pathname);
 const base=path.startsWith('/assets/')||path==='/tide-child-bridge.js'?resolve(root,'public'):root;
 let file=resolve(base,'.'+(path==='/'?'/index.html':path));
 if(file!==base&&!file.startsWith(base+sep))throw Error('path');
 if(!(await stat(file)).isFile())throw Error('file');
 res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(await readFile(file));
}catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}}).listen(port,'0.0.0.0',()=>console.log('LevelUp preview '+port));
