import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const portArg=process.argv.indexOf('--port');
const port=Number(portArg>=0?process.argv[portArg+1]:process.env.PORT)||5173;
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.woff2':'font/woff2','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png','.json':'application/json'};
http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');let filename=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    if(!filename.startsWith(root+path.sep)&&filename!==root){res.writeHead(403);return res.end();}
    try{if(!(await stat(filename)).isFile())filename=path.join(root,'index.html');}catch{if(!path.extname(url.pathname))filename=path.join(root,'index.html');else{res.writeHead(404);return res.end('Not found');}}
    const data=await readFile(filename);res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  }catch{res.writeHead(500);res.end('Server error');}
}).listen(port,'0.0.0.0',()=>console.log(`Memento ready on port ${port}`));
