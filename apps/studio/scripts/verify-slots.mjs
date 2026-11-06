import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {SHADERS,VIEWS} from '../dist/studio/config.js';
import {presets} from '../dist/studio/atlas/presets.js';
import {ShuffleBag} from '../dist/studio/random.js';
import {StudioLighting,LIGHT_PRESETS} from '../dist/studio/lighting.js';
import {StudioNavigation,WalkGrid,moveBounded,walkable} from '../dist/studio/navigation.js';
import {MaterialSystem,makeUniforms} from '../dist/studio/materials.js';
import {AtlasOutputPass} from '../dist/studio/atlas-output.js';
import {displaySeed} from '../dist/studio/screens.js';
const mode=process.argv[2],read=p=>fs.readFileSync(p,'utf8');
if(mode==='catalog'){
 assert.equal(presets.length,22);assert.equal(SHADERS.length,28);assert.deepEqual(SHADERS.filter(s=>s.source==='atlas').map(s=>[s.key,s.id]),presets.map(p=>[p.id,p.mode]));assert.equal(new Set(SHADERS.map(s=>s.key)).size,28);
 let seed=431;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 for(const values of [SHADERS.map(s=>s.id),LIGHT_PRESETS.map(s=>s.id),VIEWS.map((_,i)=>i)]){const bag=new ShuffleBag(values,{current:values[0],random});let last=values[0];for(let cycle=0;cycle<200;cycle++){const reached=new Set();for(const _ of values){const next=bag.next();assert.notEqual(next,last);assert(values.includes(next));reached.add(next);last=next;}assert.equal(reached.size,values.length);}}
 const names=['High key','Low key','Rembrandt','Butterfly','Split light','Loop light','Broad light','Short light','Chiaroscuro','Silhouette','Rim light','Hard light','Soft light','Bounce light','Top light','Underlight','Golden hour','Blue hour','Day for night','Moonlight','Window light','Practical light','Firelight','Venetian blinds','Dappled light','Volumetric light','Flat light','Neon light','Teal and orange','Monochrome red','Screen glow','Passing light','Strobe light','Theatrical light'];assert.deepEqual(LIGHT_PRESETS.map(p=>p.name),names);
 const shared=makeUniforms(),materials=new MaterialSystem(shared),mat=materials.create('FURNITURE');const scene=new T.Scene(),lights=new StudioLighting(scene,{shadowMap:{}},true,shared);const signatures=[];
 for(const p of LIGHT_PRESETS){lights.choose(p.id);for(let i=0;i<180;i++)lights.update(1/30,1,false,10+i/30);signatures.push(JSON.stringify([lights.key.intensity,lights.fill.intensity,lights.key.position.toArray(),lights.key.color.toArray(),shared.uGobo.value,lights.spot.intensity].flat().map(n=>Math.round(n*100)/100)));assert(Number.isFinite(shared.uRigEnergy.value));}
 assert.equal(new Set(signatures).size,names.length,'lighting setups must change actual rendered state');assert.equal(lights.emitters.length,0);assert(!scene.children.some(o=>o.geometry?.type==='CircleGeometry'));
 const output=new AtlasOutputPass(shared);assert.equal(output.uniforms.uMode,shared.uMode);
 for(const s of SHADERS){materials.choose(s.id);materials.update(.6);assert.equal(shared.uMode.value,s.id);assert.equal(shared.uA.value,s.values.a);assert.equal(output.uniforms.uMode.value,s.id);}
 materials.choose(1);materials.update(.02);materials.choose(22);materials.choose(25);materials.update(.6);assert.equal(shared.uMode.value,25,'latest request must win');
 console.log('SLOT_CATALOG_OK: 22 Atlas + 6 new shaders, 34 distinct rigs, 20 shots; 16,400 random results without adjacent repeats.');
}else if(mode==='integration'){
 const html=read('dist/index.html'),main=read('dist/main.js'),ui=read('dist/studio/ui.js');const noPanel=s=>!/(view-panel|light-panel|shader-panel|aria-expanded|<select|shot-caption)/.test(s);assert(noPanel(html+ui));assert(!noPanel('<div id="shader-panel">'),'absence oracle positive control');
 const bar=html.split('<div class="control-bar"')[1].split('</div>')[0];assert.deepEqual([...bar.matchAll(/<button id="([^"]+)"/g)].map(m=>m[1]),['views-toggle','lights','shaders']);
 const visible=html.replace(/<head>[\s\S]*?<\/head>/,'').replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,'').trim();assert.equal(visible,'','normal experience has no visible text nodes');
 const links=s=>[...s.matchAll(/href="(https?:[^"\s]+)"/g)].map(m=>m[1]);assert.deepEqual(links(html),['https://mementostudio.it']);
 assert(main.includes('setClearColor(0x000000,0)'));assert(!/createEnvironment|createReadyField|GraphiteOutputPass|UnrealBloomPass/.test(main));assert(!/CircleGeometry|addEmitter/.test(read('dist/studio/lighting.js')));
 const displays=['TV_55','ULTRAWIDE_NURU','ULTRAWIDE_GIAN','DISPLAY_27_NURU','DISPLAY_27_GIAN'];assert.equal(new Set(displays.map(displaySeed)).size,displays.length);assert(read('dist/studio/screens.js').includes('uTime'));assert(read('dist/studio/screens.js').includes('uAccent'));
 const sha=b=>createHash('sha256').update(b).digest('hex');const baseline=JSON.parse(read('docs/model-baseline-sha256.json'));for(const [file,expected] of Object.entries(baseline.assets))assert.equal(sha(fs.readFileSync('dist/assets/'+file)),expected);
 assert(fs.statSync('dist/app.bundle.js').size<950000,'bundle budget');
 console.log('SLOT_INTEGRATION_OK: textless UI, no panels/emitter disks/environment, 5 unique animated display compositions, unchanged V4 assets and external link.');
}else if(mode==='navigation'){
 const grid=new WalkGrid(JSON.parse(read('dist/assets/navigation-grid.json'))),camera=new T.PerspectiveCamera(32,16/9,.025,90),nav=new StudioNavigation(camera,grid);
 const tick=(seconds=5,check=()=>{})=>{for(let i=0;i<seconds*60;i++){nav.update(1/60);assert(nav.position.toArray().every(Number.isFinite));assert(camera.projectionMatrix.elements.every(Number.isFinite));check();}};
 let routes=0;for(let a=1;a<VIEWS.length;a++){nav.go(a);tick();assert.equal(nav.state,'interior');for(let b=1;b<VIEWS.length;b++){assert(nav.go(b));tick(5,()=>assert(grid.isFree(nav.position.x,nav.position.z),`${a}->${b}`));assert(nav.position.distanceTo(grid.nearest(new T.Vector3(...VIEWS[b].position)))<.001);assert(nav.focusAmount>.5);routes++;}}
 for(const when of [.2,1.2,2.8]){nav.exit();tick();nav.go(5);tick(when);const p=nav.position.clone();nav.drag(0,0);nav.update(1/120);assert(p.distanceTo(nav.position)<.03);nav.go(17);tick();assert.equal(nav.state,'interior');}
 nav.go(2);tick();const saved=nav.position.clone(),obj=new T.Mesh(new T.BoxGeometry(.3,.3,.2));obj.position.set(1.2,1.2,-2.5);obj.updateMatrixWorld();nav.focusObject(obj);tick();nav.clearFocus();tick();assert(nav.position.distanceTo(saved)<.001);
 let walk=new T.Vector3(.56,1.48,1);for(let i=0;i<700;i++){walk=moveBounded(grid,walk,0,.01);assert(walkable(grid,walk.x,walk.z));}for(let i=0;i<700;i++)walk=moveBounded(grid,walk,0,-.01);assert(grid.isFree(walk.x,walk.z));
 execFileSync(process.execPath,['scripts/verify-isometric.mjs'],{stdio:'inherit'});
 console.log(`SLOT_NAVIGATION_OK: ${routes} navigable cinematic transitions, interruption, focus return, portal and six exterior aspect ratios.`);
}else throw Error('catalog | integration | navigation');
