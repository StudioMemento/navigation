import {readFile,writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),output=path.join(root,'public');
const report={version:'v011',checks:[],errors:[],files:0,bytes:0};
const check=(name,pass)=>{report.checks.push({name,pass});if(!pass)report.errors.push(name);};
const text=file=>readFile(file,'utf8');
async function walk(folder){const files=[];for(const entry of await readdir(folder,{withFileTypes:true})){if(entry.isSymbolicLink())throw Error('Unexpected symlink');const file=path.join(folder,entry.name);files.push(...entry.isDirectory()?await walk(file):[file]);}return files;}
const files=await walk(output);
for(const file of files){const bytes=await readFile(file);report.files++;report.bytes+=bytes.length;
  if(file.endsWith('.json'))JSON.parse(bytes.toString());
  if(file.endsWith('.glb'))check('Valid GLB '+path.relative(output,file),bytes.readUInt32LE(0)===0x46546c67&&bytes.readUInt32LE(4)===2&&bytes.readUInt32LE(8)===bytes.length);
}
const vendor=JSON.parse(await text(path.join(output,'vendor-lock.json')));
for(const entry of vendor.files)check('Vendored '+entry.path,createHash('sha256').update(await readFile(path.join(output,entry.path))).digest('hex')===entry.sha256.toLowerCase());
async function resolves(url,base='/index.html'){
  if(!url||/^(?:https?:|data:|mailto:|#)/.test(url))return true;
  const parsed=new URL(url,'https://tide.local'+base);let target=path.join(output,decodeURIComponent(parsed.pathname));
  try{if((await stat(target)).isDirectory())target=path.join(target,'index.html');return(await stat(target)).isFile();}catch{return false;}
}
for(const match of (await text(path.join(output,'index.html'))).matchAll(/(?:src|href)="([^"]+)"/g))check('HTML reference '+match[1],await resolves(match[1]));
for(const file of files.filter(f=>/\.m?js$/.test(f))){const relative='/'+path.relative(output,file);for(const match of (await text(file)).matchAll(/(?:from\s*|import\s*\()(['"])(\.{1,2}\/[^'"\n]+)\1/g))check('Module '+relative+' → '+match[2],await resolves(match[2],relative));}
const nav=JSON.parse(await text(path.join(output,'data/navigation.json'))),config=JSON.parse(await text(path.join(root,'vercel.json')));
check('Exactly five concept sections',nav.stages.map(s=>s.slug).join(',')==='memento,services,projects,levelup,start');
for(const item of nav.stages){check('External embed '+item.slug,item.mode==='embed'&&new URL(item.href).protocol==='https:');check('Direct redirect '+item.slug,config.redirects.some(r=>r.source==='/'+item.slug&&r.destination===item.href));}
check('No copied page content',!files.some(f=>f.includes('/services/')));
check('Static Vercel output',config.framework===null&&config.outputDirectory==='public');
await mkdir(path.join(root,'reports'),{recursive:true});await writeFile(path.join(root,'reports/build.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checks:report.checks.length,files:report.files,bytes:report.bytes,errors:report.errors}));if(report.errors.length)process.exitCode=1;
