import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url)),dist=path.join(root,'dist');
const config=JSON.parse(await readFile(path.join(root,'vercel.json'),'utf8'));
assert.equal(config.outputDirectory,'dist');
const index=await readFile(path.join(dist,'index.html'),'utf8');
for(const match of index.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^" ]*)?"/g)){
  const target=match[1];if(/^(?:https?:|data:|mailto:)/.test(target))continue;
  await access(path.join(dist,target.replace(/^\//,'')));
}
const projects=JSON.parse(await readFile(path.join(dist,'projects.json'),'utf8'));
let checked=0;
async function assets(value){
  if(typeof value==='string'&&value.startsWith('assets/')){await access(path.join(dist,value));checked++;}
  else if(Array.isArray(value))for(const entry of value)await assets(entry);
  else if(value&&typeof value==='object')for(const entry of Object.values(value))await assets(entry);
}
await assets(projects);await assets(JSON.parse(await readFile(path.join(dist,'images.json'),'utf8')));
for(const file of ['app.js','project-layout.js','title-fit.js','structure.css','gestures.js','navigation/bootstrap.js'])await access(path.join(dist,file));
assert(!(await readdir(dist)).some(file=>file.startsWith('qa-')));
console.log(`PACKAGE_V42_VERIFIED: ${checked} local asset references, deploy entry and modules present.`);
