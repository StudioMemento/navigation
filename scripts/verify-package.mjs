import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {STATIONS,contentURL} from '../hub/public/navigation/core.mjs';
const root=new URL('../hub/public/',import.meta.url);
async function list(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?list(new URL(e.name+'/',dir)):new URL(e.name,dir)))).flat();}
const files=await list(root),baseline=JSON.parse(await readFile(new URL('../qa/baseline.json',import.meta.url),'utf8'));
assert.equal(STATIONS.length,5);assert.equal(new Set(STATIONS.map(s=>new URL(contentURL({id:s.id})).origin)).size,5);
assert(!files.some(f=>/\/public\/(catalog|pages|source)\//.test(f.pathname)),'Local page snapshot present');
for(const [name,key] of [['world.glb','worldSha256'],['scene.json','sceneSha256']])assert.equal(createHash('sha256').update(await readFile(new URL('assets/'+name,root))).digest('hex'),baseline[key],name+' changed');
const size=(await Promise.all(files.map(f=>stat(f)))).reduce((sum,s)=>sum+s.size,0);
console.log(JSON.stringify({publicFiles:files.length,publicBytes:size,baselineFiles:baseline.publicFiles,baselineBytes:baseline.publicBytes,bytesRemoved:baseline.publicBytes-size,reductionPercent:Math.round((1-size/baseline.publicBytes)*1000)/10,worldAndScenePreserved:true},null,2));
console.log('PACKAGE VERIFIED');
