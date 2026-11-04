import {readFile,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {PAGES} from '../src/config.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const expected=['studio','services','projects','levelup','start'];
assert.deepEqual(PAGES.map(p=>p.publicURL),expected.map(x=>'https://mementostudio.it/'+x));
const hashes=[];
for(const p of PAGES){for(const suffix of ['.webp','-small.webp'])assert.ok((await stat(path.join(root,'assets/images',p.image+suffix))).size>1000);hashes.push(createHash('sha256').update(await readFile(path.join(root,'assets/images',p.image+'.webp'))).digest('hex'));}
assert.equal(new Set(hashes).size,5);
async function scan(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())await scan(p);else if(/\.(mjs|js)$/.test(p)){execFileSync(process.execPath,['--check',p]);const src=await readFile(p,'utf8');for(const m of src.matchAll(/(?:from\s+|import\s*\()(['"])(\.[^'"]+)\1/g)){const file=path.resolve(path.dirname(p),m[2].split('?')[0]);assert.ok((await stat(file)).isFile(),file);}}}}
await scan(path.join(root,'src'));
const html=await readFile(path.join(root,'index.html'),'utf8');for(const m of html.matchAll(/(?:href|src)="(\/(?:src|assets)\/[^"?#]+)"/g))assert.ok((await stat(path.join(root,m[1]))).isFile());
const vercel=JSON.parse(await readFile(path.join(root,'vercel.json'),'utf8'));assert.equal(vercel.outputDirectory,'dist');assert.equal(vercel.buildCommand,'npm run build');
assert.equal(JSON.parse(await readFile(path.join(root,'package.json'),'utf8')).dependencies,undefined);
console.log('PACKAGE VERIFIED — five unique covers, canonical routes, valid modules, all local assets');
