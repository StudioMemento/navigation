import {mkdir,rm,cp,readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const name of ['index.html','src','assets','navigation'])await cp(path.join(root,name),path.join(out,name),{recursive:true});
// An actual new URL invalidates even previously cached immutable/long-lived covers.
// Hash all three formats: replacing a portrait also produces a fresh scene bundle.
const images=path.join(root,'assets/images');
const files=(await readdir(images)).sort();
const hash=createHash('sha256');
for(const file of files)hash.update(file).update(await readFile(path.join(images,file)));
const sceneDir=`assets/scenes-${hash.digest('hex').slice(0,12)}`;
await cp(images,path.join(out,sceneDir),{recursive:true});
await rm(path.join(out,'assets/images'),{recursive:true});
for(const file of ['index.html','src/app.mjs']){
  const target=path.join(out,file);
  await writeFile(target,(await readFile(target,'utf8')).replaceAll('/assets/images/',`/${sceneDir}/`));
}
for(const name of ['index.html','src/app.mjs','assets/fonts/InterVariable.woff2',...files.map(file=>`${sceneDir}/${file}`)])if(!(await stat(path.join(out,name))).size)throw Error(`Missing ${name}`);
for(const file of ['index.html','src/app.mjs']){
  const text=await readFile(path.join(out,file),'utf8');
  if(text.includes('/assets/images/')||!text.includes(`/${sceneDir}/`))throw Error(`Unversioned scene reference in ${file}`);
}
console.log(`BUILD VERIFIED — ${files.length} versioned images in ${sceneDir}; static dist ready for Vercel`);
