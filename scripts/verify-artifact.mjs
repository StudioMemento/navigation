import assert from 'node:assert/strict';import {readFileSync,statSync,existsSync,readdirSync}from'node:fs';import{execFileSync}from'node:child_process';import {PAGES}from'../dist/src/config.mjs';
for(const dir of ['dist/src','dist/assets','dist/navigation'])for(const f of readdirSync(dir).filter(f=>f.endsWith('.mjs')))execFileSync(process.execPath,['--check',dir+'/'+f]);
assert.deepEqual(PAGES.map(p=>p.url),['https://mementostudio.it/studio','https://mementostudio.it/services','https://mementostudio.it/projects','https://mementostudio.it/levelup','https://mementostudio.it/start']);
for(const p of PAGES){for(const sz of [96,480,960,1254]){const file=`dist/assets/scenes/${p.slug}-${sz}.webp`;assert.ok(statSync(file).size>500);const b=readFileSync(file);assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');}assert.ok(statSync(`dist/assets/scenes/${p.slug}.jpg`).size>1000);}
for(const id of ['services','projects','levelup','start'])assert.ok(statSync(`dist/assets/assets/${id}-thumb-v6.webp`).size>1000);
assert.ok(statSync('dist/assets/fonts/InterVariable.woff2').size>10000);
const app=readFileSync('dist/src/app.mjs','utf8'),css=readFileSync('dist/src/style.css','utf8'),html=readFileSync('dist/index.html','utf8');
for(const feature of ['img.decode()','pointercancel','visibilitychange','pageshow','prefers-reduced-motion','touch-action','aria-live'])assert.ok((app+css+html).includes(feature),feature);
assert.ok(css.includes('background:#0b0b0c'));assert.ok(css.includes('pan-x pinch-zoom'));assert.ok(app.includes("suppressUntil=performance.now()+350"));assert.ok(app.includes('frameCPU'));
const assetsTotal=readdirSync('dist/assets/scenes').reduce((s,f)=>s+statSync('dist/assets/scenes/'+f).size,0);assert.ok(assetsTotal<1500000);
// Missing-asset positive control ensures a bad asset path cannot be certified.
assert.throws(()=>statSync('dist/assets/scenes/invalid-positive-control.webp'));
const vercel=JSON.parse(readFileSync('vercel.json'));assert.equal(vercel.outputDirectory,'dist');


assert.equal((app.match(/mountNav\(/g)||[]).length,1);
assert.ok(!html.includes('id="dock"')&&!html.includes('id="wordmark"'));
for(const f of ['navbar.mjs','blur.mjs','styles.mjs','wordmark.mjs','core.mjs'])assert.ok(statSync('dist/navigation/'+f).size>100);
const overlayCSS=readFileSync('dist/navigation/styles.mjs','utf8');assert.ok(overlayCSS.includes('backdrop-filter'));

console.log('ARTIFACT_CONTRACT_VERIFIED',JSON.stringify({sections:PAGES.length,sceneBytes:assetsTotal,overlay:'V12'}));
