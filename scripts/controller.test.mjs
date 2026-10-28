// Run the actual landing controller in a small DOM/history host. This checks
// navigation decisions and route continuity; it does not simulate WebGL/UI.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {webcrypto,randomUUID,createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pub=path.join(root,'public');
const app=await fs.readFile(path.join(pub,'src/app.js'),'utf8');
const importText=async p=>import('data:text/javascript;base64,'+Buffer.from(await fs.readFile(path.join(pub,p),'utf8')).toString('base64'));
const core=await importText('src/core.js'),assets=await importText('src/assets.js'),routes=await importText('src/world-routes.js');
const input=Object.fromEntries(await Promise.all(['navigation','cameras_family_v007','scene_contract_world_v008','world-routes'].map(async name=>[name,JSON.parse(await fs.readFile(path.join(pub,'data',name+'.json'),'utf8'))])));
const code=app.replace(/^import .*;\r?\n/gm,'').replace('setup().catch(error=>reportError(error,true));raf=requestAnimationFrame(animate);','');
class Vec{
  constructor(x=0,y=0,z=0){this.set(x,y,z);}set(x,y,z){this.x=x;this.y=y;this.z=z;return this;}
  copy(v){return this.set(v.x,v.y,v.z);}fromArray(a){return this.set(...a);}toArray(){return [this.x,this.y,this.z];}
}
function host(){
  const listeners=new Map(),nodes=new Map(),historyCalls=[];
  const eventHost=name=>({addEventListener(type,fn){listeners.set(name+':'+type,fn);}});
  const element=name=>{
    if(nodes.has(name))return nodes.get(name);
    const attrs=new Map(),classes=new Set(),node={...eventHost(name),hidden:false,inert:false,tabIndex:0,style:{setProperty(){}},dataset:{},width:1920,height:1080,
      classList:{add:v=>classes.add(v),remove:v=>classes.delete(v),toggle(v,on){if(on)classes.add(v);else classes.delete(v);}},
      setAttribute:(k,v)=>attrs.set(k,v),removeAttribute:k=>attrs.delete(k),getAttribute:k=>attrs.get(k),
      getBoundingClientRect:()=>({width:1920,height:1080}),append(){},focus(){},contains(){return false;},contentWindow:{postMessage(){}}};
    nodes.set(name,node);return node;
  };
  const location={origin:'http://localhost',pathname:'/',search:'',hash:''};
  const window={...eventHost('window'),scrollY:0,scrollTo({top}){this.scrollY=top;}};
  const history={scrollRestoration:'auto',state:{tide:'overview'},pushState(state,unused,url){this.state=state;location.hash=new URL(url,location.origin).hash;historyCalls.push({type:'push',state,url});},replaceState(state,unused,url){this.state=state;location.hash=new URL(url,location.origin).hash;historyCalls.push({type:'replace',state,url});}};
  const document={...eventHost('document'),body:element('body'),documentElement:element('html'),hidden:false,querySelector:element,createElement:element,querySelectorAll:()=>[]};
  const THREE={Vector3:Vec,Vector2:Vec,Plane:class{},Raycaster:class{},MathUtils:{lerp:(a,b,t)=>a+(b-a)*t,damp:(a,b,k,t)=>a+(b-a)*(1-Math.exp(-k*t)),degToRad:v=>v*Math.PI/180}};
  const context=vm.createContext({...core,...assets,THREE,window,document,location,history,innerWidth:1920,innerHeight:1080,devicePixelRatio:1,URLSearchParams,AbortController,crypto:{subtle:webcrypto.subtle,randomUUID},
    matchMedia:()=>({...eventHost('media'),matches:false}),setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},console,
    fixture:input,sampler:routes.createWorldRouteSampler(input['world-routes'])});
  vm.runInContext(code,context);
  vm.runInContext("navigation=fixture.navigation;cameraData=fixture.cameras_family_v007;contract=fixture.scene_contract_world_v008;worldRoutes=sampler;renderer={getPixelRatio:()=>1};ready=true;setState('OVERVIEW');",context);
  return {context,location,window,historyCalls,nodes,read:s=>vm.runInContext(s,context),pop(hash,restoredScroll=null){location.hash=hash;listeners.get('window:popstate')({});if(restoredScroll!==null&&history.scrollRestoration==='auto')window.scrollY=restoredScroll;},finish(){vm.runInContext('clock+=10;stepMotion();',context);}};
}
const results=[];
function test(name,run){try{run();results.push({name,pass:true});}catch(e){results.push({name,pass:false,error:e.message});}}
test('Focus traversal Back and Forward do not append history entries',()=>{
  const h=host();h.read("selectStage('s02_projects')");h.finish();h.read("selectStage('s03_studio')");h.finish();
  assert.equal(h.historyCalls.filter(x=>x.type==='push').length,2);
  h.pop('#projects');h.finish();assert.equal(h.read('selectedId'),'s02_projects');
  h.pop('#studio');h.finish();assert.equal(h.read('selectedId'),'s03_studio');
  assert.equal(h.historyCalls.filter(x=>x.type==='push').length,2);
});
test('Services content Back and Forward restores document without duplicate entries',()=>{
  const h=host();h.read("contentReady=true;selectStage('s01_services')");h.finish();h.read('enterContent();scrollComposition();');
  assert.equal(h.read('state'),'CONTENT');assert.equal(h.historyCalls.filter(x=>x.type==='push').length,2);
  h.pop('#services');assert.equal(h.read('state'),'FOCUSED');assert.equal(h.window.scrollY,0);
  h.pop('#services-content');assert.equal(h.read('state'),'CONTENT');assert(h.window.scrollY>0);
  assert.equal(h.historyCalls.filter(x=>x.type==='push').length,2);
});
test('Native post-popstate scroll restoration cannot reopen Services after Back',()=>{
  const h=host();assert.equal(h.read('history.scrollRestoration'),'manual');
  h.read("contentReady=true;selectStage('s01_services')");h.finish();h.read('enterContent();scrollComposition();');
  const oldScroll=h.window.scrollY;assert(oldScroll>0);
  h.pop('#services',oldScroll);h.read('scrollComposition()');
  assert.equal(h.window.scrollY,0);assert.equal(h.read('state'),'FOCUSED');assert.equal(h.location.hash,'#services');
  assert.equal(h.historyCalls.filter(x=>x.type==='push').length,2);
  h.pop('#services-content',oldScroll);h.read('scrollComposition()');assert.equal(h.read('state'),'CONTENT');
  assert.equal(h.historyCalls.filter(x=>x.type==='push').length,2);
});
test('Forward directly from overview to Services content waits for focus then opens',()=>{
  const h=host();h.read('contentReady=true');h.pop('#services-content');assert.equal(h.read('state'),'FOCUSING');h.finish();
  assert.equal(h.read('state'),'CONTENT');assert.equal(h.read('selectedId'),'s01_services');assert.equal(h.historyCalls.filter(x=>x.type==='push').length,0);
});
test('Delayed Services READY never bypasses the held camera pose even at footer scroll',()=>{
  const h=host();h.read("selectStage('s01_services')");h.finish();
  h.read('window.scrollY=50000;scrollComposition()');
  assert.equal(h.read('state'),'ENTERING');assert.equal(h.read('qa.route.u'),.45);assert.equal(h.read('shell.style.opacity'),'0');assert.equal(h.read('shell.inert'),true);
  assert.equal(h.read('historyEntered'),false);
});
test('Escape during partial entry follows entry back before returning to overview',()=>{
  const h=host();h.read("contentReady=true;selectStage('s01_services')");h.finish();h.read('window.scrollY=entryHeight*.6;scrollComposition();returnOverview()');
  assert.equal(h.read('activeMotion.kind'),'entry');assert.equal(h.read('activeMotion.uStart'),.6);assert.equal(h.read('activeMotion.uEnd'),0);
  h.finish();assert.equal(h.read('activeMotion.kind'),'overview');h.finish();assert.equal(h.read('state'),'OVERVIEW');assert.equal(h.window.scrollY,0);
});
test('Natural Services footer loop returns to overview once',()=>{
  const h=host();h.read("contentReady=true;selectStage('s01_services')");h.finish();h.read('enterContent();scrollComposition();window.scrollY=100000;scrollComposition();');
  assert.equal(h.read('state'),'OVERVIEW');assert.equal(h.read('qa.loops'),1);assert.equal(h.window.scrollY,0);assert.equal(h.read('selectedId'),null);
});
const report={passed:results.every(r=>r.pass),method:'Unmodified app.js controller evaluated in Node vm with DOM/history host and actual exported core, assets and v008 route sampler. Setup/WebGL renderer not run.',appSha256:createHash('sha256').update(app).digest('hex'),results,limitations:['Browser visual, timing, accessibility, scrolling, GPU behavior and actual History API are separately verified in browser.','No target-device or performance conclusion.']};
await fs.writeFile(path.join(root,'reports/navigation_state_regression.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));if(!report.passed)process.exitCode=1;
