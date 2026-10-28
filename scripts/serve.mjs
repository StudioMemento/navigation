import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const publicRoot=path.join(project,'public');
const config=JSON.parse(await readFile(path.join(project,'vercel.json'),'utf8'));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.glb':'model/gltf-binary','.hdr':'application/octet-stream','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2'};
export function resolvePublicPath(route){
  let decoded;try{decoded=decodeURIComponent(route);}catch{return null;}
  if(decoded.includes('\\')||decoded.includes('\0')||decoded.split('/').some(part=>part.startsWith('.')))return null;
  const target=path.resolve(publicRoot,'.'+decoded);
  return target.startsWith(publicRoot+path.sep)||target===publicRoot?target:null;
}
export function createPreviewServer(){return http.createServer(async(req,res)=>{
  try{
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
    // Validate before URL normalization so encoded traversal cannot be hidden.
    const rawPath=req.url.split('?')[0];
    let filename=resolvePublicPath(rawPath);
    if(!filename){res.writeHead(403);return res.end('Forbidden');}
    const url=new URL(req.url,'http://127.0.0.1');
    const redirect=config.redirects.find(row=>row.source===url.pathname.replace(/\/$/,''));
    if(redirect){res.writeHead(307,{Location:redirect.destination});return res.end();}
    let info=await stat(filename);
    if(info.isDirectory()){
      if(!url.pathname.endsWith('/')){res.writeHead(308,{Location:url.pathname+'/'+url.search});return res.end();}
      filename=path.join(filename,'index.html');info=await stat(filename);
    }
    if(!info.isFile()){res.writeHead(404);return res.end('Not found');}
    const headers={'Content-Type':types[path.extname(filename)]||'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
    res.writeHead(200,headers);if(req.method==='HEAD')return res.end();createReadStream(filename).pipe(res);
  }catch(error){res.writeHead(error.code==='ENOENT'?404:500);res.end(error.code==='ENOENT'?'Not found':'Request failed');}
});}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const option=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
  const port=Number(option('--port')||process.env.PORT||process.env.TIDE_PORT||8770);
  const host=option('--host')||'127.0.0.1';
  createPreviewServer().listen(port,host,()=>console.log('MEMENTO TIDE v010: http://'+host+':'+port));
}
