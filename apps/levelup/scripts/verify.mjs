import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { benefits,experiences,visions,steps } from '../src/content.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),dist=join(root,'dist');
export async function verifyAssets(base){
 const html=await readFile(join(base,'index.html'),'utf8'),css=await readFile(join(base,'styles.css'),'utf8');
 const refs=[...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m=>m[1]).filter(s=>!s.startsWith('https:'));
 refs.push(...[...css.matchAll(/url\(['"]?([^)'" ]+)/g)].map(m=>m[1]));
 for(const item of [...benefits,...experiences])refs.push(item.asset,item.asset.replace('.webp','-640.webp'));
 for(const item of visions)refs.push(item.before,item.after);
 for(const item of steps)refs.push(item.asset,item.asset.replace('.webp','-768.webp'));
 for(const ref of new Set(refs))await access(join(base,ref));
 for(const name of await readdir(join(base,'src'))){const text=await readFile(join(base,'src',name),'utf8');for(const m of text.matchAll(/from ['"](.+?)['"]/g))await access(resolve(base,'src',m[1]));}
 return new Set(refs).size;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const count=await verifyAssets(dist);const html=await readFile(join(dist,'index.html'),'utf8');
 assert.equal((html.match(/<section\b/g)||[]).length,5);assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert(!html.includes('__qa.html'));assert(!html.includes('localhost'));
 console.log(`LEVELUP_TESTS_OK — ${count} local resources resolved, 5 sections`);
}
