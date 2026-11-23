import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PAGES } from '../src/config.mjs';

export const photos = new Map();
for (const {slug} of PAGES) {
  for (const width of [768,1536]) {
    const name=slug+'-'+width+'.webp';
    const file=readFileSync(new URL('../public/assets/scenes/'+name,import.meta.url));
    const hash=createHash('sha256').update(file).digest('hex').slice(0,12);
    photos.set(name,{url:'/assets/photographs/'+hash+'/'+name,file});
  }
}
