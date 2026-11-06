import {readFile,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {PAGES} from '../src/config.mjs';
import {STATIONS,publicRouteURL} from '../navigation/core.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const expected=['studio','services','projects','levelup','start'];
assert.deepEqual(PAGES.map(p=>p.publicURL),expected.map(x=>'https://mementostudio.it/'+x));
const hashes=[];let total=0;
function webpSize(b){
 assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');
 for(let i=12;i+8<b.length;){
  const kind=b.toString('ascii',i,i+4),size=b.readUInt32LE(i+4),j=i+8;
  if(kind==='VP8X')return [b.readUIntLE(j+4,3)+1,b.readUIntLE(j+7,3)+1];
  if(kind==='VP8 ')return [b.readUInt16LE(j+6)&16383,b.readUInt16LE(j+8)&16383];
  if(kind==='VP8L'){const v=b.readUInt32LE(j+1);return [(v&16383)+1,((v>>>14)&16383)+1];}
  i+=8+size+(size%2);
 }throw Error('No WebP dimension header');
}
for(const p of PAGES){
 for(const [suffix,size] of [['',1254],['-small',768],['-tiny',480]]){
  const b=await readFile(path.join(root,'assets/images',p.image+suffix+'.webp'));total+=b.length;
  assert.deepEqual(webpSize(b),[size,size]);assert.ok(b.length>1000&&b.length<220000);
  if(!suffix)hashes.push(createHash('sha256').update(b).digest('hex'));
 }
}
assert.equal(new Set(hashes).size,5);assert.ok(total<1000000);
async function scan(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
 const p=path.join(dir,entry.name);if(entry.isDirectory())await scan(p);else if(/\.(mjs|js)$/.test(p)){
  execFileSync(process.execPath,['--check',p]);
  const src=await readFile(p,'utf8');for(const m of src.matchAll(/(?:from\s+|import\s*\()(['"])(\.[^'"]+)\1/g))assert.ok((await stat(path.resolve(path.dirname(p),m[2].split('?')[0]))).isFile());
 }
}}
await scan(path.join(root,'src'));await scan(path.join(root,'navigation'));
assert.deepEqual(STATIONS.map(p=>publicRouteURL({id:p.id,view:'page'})),PAGES.map(p=>p.publicURL));
const iconSource=await readFile(path.join(root,'navigation/icon-assets.mjs'),'utf8');
for(const m of iconSource.matchAll(/new URL\('([^']+)'/g))assert.ok((await stat(path.resolve(root,'navigation',m[1].split('?')[0]))).size>1000);
const html=await readFile(path.join(root,'index.html'),'utf8');
for(const m of html.matchAll(/(?:href|src)="(\/(?:src|assets)\/[^"?#]+)"/g))assert.ok((await stat(path.join(root,m[1]))).isFile());
const noChevron=text=>!/(previous-slide|next-slide|enter-link|slide-arrow)/.test(text);
assert.equal(noChevron('<button id="next-slide">Next</button>'),false,'positive control');
assert.equal(noChevron(html),true);assert.equal(noChevron(await readFile(path.join(root,'src/app.mjs'),'utf8')),true);
const vercel=JSON.parse(await readFile(path.join(root,'vercel.json'),'utf8'));assert.equal(vercel.outputDirectory,'dist');assert.equal(vercel.buildCommand,'npm run build');
execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'pipe'});
await scan(path.join(root,'dist/src'));
const built=await readFile(path.join(root,'dist/src/app.mjs'),'utf8');assert.ok(/\/assets\/scenes-[a-f0-9]+\//.test(built));assert.ok(!built.includes('/assets/images/'));
console.log(`RELEASE_ASSETS_OK — 15 square WebP variants, ${total} bytes, canonical links, modules and static build verified`);
