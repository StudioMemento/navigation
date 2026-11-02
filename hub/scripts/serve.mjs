import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(new URL('../public',import.meta.url).pathname),port=Number(process.env.PORT||4173);
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.wasm':'application/wasm','.woff2':'font/woff2','.glb':'model/gltf-binary'};
createServer(async(req,res)=>{try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  const info=await stat(file).catch(()=>null);
  if(info?.isDirectory())file=resolve(file,'index.html');
  else if(!info&&!extname(file))file=resolve(root,'index.html');
  const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Access-Control-Allow-Origin':'*','Cache-Control':'no-store'}).end(body);
}catch{res.writeHead(404).end('Not found');}}).listen(port,'0.0.0.0',()=>console.log(`Memento: http://localhost:${port}`));
