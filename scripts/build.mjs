import {mkdir,rm,cp,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const name of ['index.html','src','assets'])await cp(path.join(root,name),path.join(out,name),{recursive:true});
for(const name of ['index.html','src/app.mjs','assets/fonts/InterVariable.woff2','assets/images/studio.webp','assets/images/services.webp','assets/images/projects.webp','assets/images/levelup.webp','assets/images/start.webp'])if(!(await stat(path.join(out,name))).size)throw Error(`Missing ${name}`);
console.log('BUILD VERIFIED — static dist ready for Vercel');
