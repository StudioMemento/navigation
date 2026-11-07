import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const slugs=['studio','services','projects','levelup','start'];
const masters=[...slugs,'gallery-alternate'];
const sizes=[96,480,960,1254];
const app=readFileSync(resolve(root,'dist/src/app.mjs'),'utf8');
assert.ok(!/scenes\/[^\s"`]*\.(?:webp|jpg)(?!\?v=r10)/.test(app),'Scene URLs invalidate the prior deployment asset cache');
assert.ok(app.includes('-480.webp?v=r10 480w'));
const manifest=JSON.parse(readFileSync(resolve(root,'art/manifest.json'),'utf8'));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function pngDimensions(bytes){
 assert.deepEqual([...bytes.subarray(0,8)],[137,80,78,71,13,10,26,10],'PNG signature');
 assert.equal(bytes.toString('ascii',12,16),'IHDR');
 return [bytes.readUInt32BE(16),bytes.readUInt32BE(20)];
}
function verifiedBytes(entry){
 const bytes=readFileSync(resolve(root,entry.path));
 assert.equal(bytes.length,entry.bytes,entry.path+' byte count');
 assert.equal(hash(bytes),entry.sha256,entry.path+' SHA256');
 return bytes;
}
assert.equal(manifest.version,'R10');
assert.deepEqual(manifest.sources.map(s=>s.name),masters);
assert.equal(manifest.outputs.length,25);
const decode=[];
for(const name of masters){
 const entry=manifest.sources.find(e=>e.name===name);
 assert.equal(entry.path,`art/${name}.png`);
 const bytes=verifiedBytes(entry),[width,height]=pngDimensions(bytes);
 assert.equal(width,height);assert.ok(width>=1024);assert.equal(width,entry.width);assert.equal(height,entry.height);
 decode.push({path:entry.path,format:'PNG',width,height});
 const broken=Buffer.from(bytes);broken[0]=0;
 assert.throws(()=>pngDimensions(broken),'Corrupt PNG positive control must fail');
 assert.throws(()=>verifiedBytes({...entry,sha256:'0'.repeat(64)}),'Checksum mismatch positive control must fail');
}
const expected=[];
for(const slug of slugs){
 for(const size of sizes)expected.push({source:slug,path:`dist/assets/scenes/${slug}-${size}.webp`,format:'WEBP',width:size,height:size});
 expected.push({source:slug,path:`dist/assets/scenes/${slug}.jpg`,format:'JPEG',width:1254,height:1254});
}
assert.deepEqual(manifest.outputs.map(({source,path,format,width,height})=>({source,path,format,width,height})),expected);
for(const entry of manifest.outputs){verifiedBytes(entry);decode.push(entry);}
const actualFiles=readdirSync(resolve(root,'dist/assets/scenes')).sort();
assert.deepEqual(actualFiles,expected.map(e=>e.path.split('/').pop()).sort(),'Exactly 25 scene variants');
const bytes=actualFiles.reduce((sum,f)=>sum+statSync(resolve(root,'dist/assets/scenes',f)).size,0);
assert.equal(bytes,manifest.sceneBytes);assert.ok(bytes<1_500_000,'Scene transfer budget');
// Fully decode every file, not just its header. Pillow is also the export toolchain.
const result=execFileSync('python3',['-c',`
import json,sys
from pathlib import Path
from PIL import Image
payload=json.load(sys.stdin)
for row in payload['images']:
 with Image.open(Path(payload['root'])/row['path']) as im:
  im.load()
  assert im.format==row['format'],row['path']
  assert im.size==(row['width'],row['height']),row['path']
print('ALL_IMAGES_DECODED')
`],{input:JSON.stringify({root,images:decode}),encoding:'utf8'});
assert.ok(result.includes('ALL_IMAGES_DECODED'));
console.log('R10_ASSETS_VERIFIED',JSON.stringify({masters:masters.length,variants:expected.length,sceneBytes:bytes,sha256:'all matched',decode:'all passed'}));
