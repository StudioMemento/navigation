import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {randomUUID} from 'node:crypto';
import * as THREE from '../public/vendor/three.module.js';
import * as math from '../public/src/navigation.js';
import * as cine from '../public/src/cinematography.js';
const fixture=Object.fromEntries(await Promise.all(['navigation','cameras_family_v007','scene_contract_world_v008'].map(async name=>[name,JSON.parse(await readFile(new URL('../public/data/'+name+'.json',import.meta.url)))])));
const source=(await readFile(new URL('../public/src/app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').replace('setup().catch(reportError);raf=requestAnimationFrame(animate);','');
function host(){
  let nodeId=0,time=0;const nodes=new Map(),historyCalls=[],events=new Map();
  function element(id){
    if(nodes.has(id))return nodes.get(id);
    const listeners=new Map(),attrs=new Map();
    const node={id,hidden:false,style:{},dataset:{},inert:false,tabIndex:0,isConnected:true,children:[],contentWindow:{postMessage(){}},
      addEventListener(type,fn){const handlers=listeners.get(type)||[];handlers.push(fn);listeners.set(type,handlers);},emit(type,event={}){for(const fn of listeners.get(type)||[])fn(event);},
      setAttribute(k,v){attrs.set(k,v);},getAttribute(k){return attrs.get(k);},focus(){document.activeElement=this;},append(child){this.children.push(child);},replaceChildren(...children){this.children=children;},contains(other){return other===this||this.children.includes(other);},closest(){return null;},setPointerCapture(){},hasPointerCapture(){return false;},releasePointerCapture(){}};
    nodes.set(id,node);return node;
  }
  const document={referrer:'https://memento.framer.website/',body:element('body'),hidden:false,activeElement:null,querySelector:element,querySelectorAll(selector){return selector==='iframe'?element('#frame-host').children:[];},createElement:tag=>element(tag+'-'+nodeId++),addEventListener(){}};
  const location={hash:'',search:'',pathname:'/',origin:'https://tide.local'};
  const history={scrollRestoration:'auto',pushState(state,unused,url){this.state=state;location.hash=new URL(url,location.origin).hash;historyCalls.push('push');},replaceState(state,unused,url){this.state=state;location.hash=new URL(url,location.origin).hash;historyCalls.push('replace');}};
  const window={parent:{postMessage(){}},addEventListener(type,fn){events.set(type,fn);}};
  const context=vm.createContext({...math,...cine,THREE,document,window,history,location,fixture,innerWidth:1440,innerHeight:900,devicePixelRatio:1,URLSearchParams,URL,AbortController,crypto:{randomUUID},performance:{now:()=>time},requestAnimationFrame:()=>1,cancelAnimationFrame(){},setTimeout:()=>1,clearTimeout(){},console,
    matchMedia:()=>({matches:false,addEventListener(){}}),assetConfiguration:()=>({}),assetEntryPoints:()=>({})});
  const run=code=>vm.runInContext(code,context);
  run(source);
  run(`navigation=fixture.navigation;contract=fixture.scene_contract_world_v008;scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(38,1.6,.1,550);renderer={getPixelRatio:()=>1,info:{reset(){},render:{calls:0,triangles:0},memory:{textures:0}},render(){}};water={update(){}};layout=pentagonLayout(navigation.stages);updatePoses();ready=true;setState('SCENE');updateLabels();`);
  return{run,nodes,events,location,historyCalls,tick(n=80){for(let i=0;i<n;i++){time+=50;context.now=time;run('animate(now)');}},pop(hash){location.hash=hash;events.get('popstate')();}};
}
test('Loop and flick selection behave in both directions, including cancelled and stale drags',()=>{
  assert.equal(math.nearestStop(0,4,5),5);assert.equal(math.nearestStop(4,0,5),-1);
  assert.equal(math.releaseStop({start:0,position:.22,velocity:2,moved:true}),1);
  assert.equal(math.releaseStop({start:0,position:-.22,velocity:-2,moved:true}),-1);
  assert.equal(math.releaseStop({start:0,position:.22,velocity:0,moved:true}),0);
  assert.equal(math.releaseStop({start:0,position:.22,velocity:3,moved:true,cancelled:true}),0);
});
test('The circular camera stays continuous across all seams and descent looks downward',()=>{
  const poses=cine.focusPoses(cine.pentagonLayout(fixture.navigation.stages),16/9);
  for(let i=-5;i<10;i++){
    const left=math.sampleCarousel(poses,i-1e-6),right=math.sampleCarousel(poses,i+1e-6);
    assert(Math.hypot(...left.position.map((x,j)=>x-right.position[j]))<.001);
    const start=math.sampleCarousel(poses,i);let lastPitch=1;
    for(let t=0;t<=1;t+=.05){const p=math.sampleDescent(start,t);const pitch=Math.atan2(p.target[1]-p.position[1],Math.hypot(p.target[0]-p.position[0],p.target[2]-p.position[2]));assert(pitch<=lastPitch+1e-8);lastPitch=pitch;assert(p.position[1]>.08&&p.position[1]<=.24);}
    assert(lastPitch< -1.2);
  }
  assert.equal(math.panelProgress(0),0);assert.equal(math.panelProgress(1),1);
});
test('All five pages open from their real URL, return reversibly, and retain only one iframe',()=>{
  const h=host();
  for(let index=0;index<5;index++){
    h.run(`selectIndex(${index});movePage(1)`);h.tick(130);
    assert.equal(h.run('state'),'CONTENT');assert.equal(h.run('frame.src'),fixture.navigation.stages[index].href);
    assert.equal(h.run('pageLayer.inert'),false);assert.equal(h.nodes.get('#frame-host').children.length,1);
    h.run('movePage(0)');h.tick();assert.equal(h.run('state'),'SCENE');assert.equal(h.run('progress'),0);assert.equal(h.run('sceneLayer.inert'),false);
  }
});
test('Back/Forward restores selected section and content without new history entries',()=>{
  const h=host();h.run('selectIndex(1)');h.tick();h.run('movePage(1)');h.tick();
  const pushes=h.historyCalls.filter(x=>x==='push').length;
  h.pop('#services');h.tick();assert.equal(h.run('state'),'SCENE');
  h.pop('#services-content');h.tick();assert.equal(h.run('state'),'CONTENT');
  h.pop('#start');h.tick(160);assert.equal(h.run('selectedIndex'),4);assert.equal(h.run('state'),'SCENE');
  assert.equal(h.historyCalls.filter(x=>x==='push').length,pushes);
});
test('Escape reverses a partial entry without a jump or stuck inert state',()=>{
  const h=host();h.run('movePage(1)');h.tick(10);const before=h.run('progress');assert(before>0&&before<1);
  h.run('movePage(0)');assert.equal(h.run('progress'),before);h.tick();assert.equal(h.run('state'),'SCENE');assert.equal(h.run('pageLayer.hidden'),true);
});
test('Late iframe load events cannot mark a different destination loaded',()=>{
  const h=host();h.run('preloadSection()');const old=h.run('frame');h.run('selectIndex(1)');h.tick();h.run('preloadSection()');
  old.emit('load');assert.equal(h.run('contentLoaded'),false);h.run('frame').emit('load');assert.equal(h.run('contentLoaded'),true);
});
test('A pointer swipe cancels its click and pointer cancellation settles cleanly',()=>{
  const h=host();h.run(`pointerDown({isPrimary:true,button:0,pointerId:2,clientX:900,clientY:300,timeStamp:100});pointerMove({pointerId:2,clientX:450,clientY:305,timeStamp:450,preventDefault(){}});pointerEnd({pointerId:2,timeStamp:470});`);h.tick();
  assert.equal(h.run('selectedIndex'),1);assert.equal(h.run('state'),'SCENE');assert(h.run('suppressClickUntil')>0);assert.equal(h.run('frame'),null);
  h.run(`pointerDown({isPrimary:true,button:0,pointerId:3,clientX:500,clientY:300,timeStamp:800});pointerMove({pointerId:3,clientX:470,clientY:300,timeStamp:830,preventDefault(){}});pointerEnd({pointerId:3,timeStamp:840},true);`);h.tick();assert.equal(h.run('gesture'),null);assert.equal(h.run('state'),'SCENE');
});
test('Cross-origin bridge rejects wrong source, origin, stage, and session',()=>{
  const frame={contentWindow:{}},stage=fixture.navigation.stages[1],data={channel:'memento:tide',version:1,stageId:stage.id,sessionId:'test',type:'END'};
  const good={origin:new URL(stage.href).origin,source:frame.contentWindow,data};assert(math.validBridge(good,frame,stage,'test'));
  for(const bad of [{...good,origin:'https://wrong.example'},{...good,source:{}},{...good,data:{...data,stageId:'wrong'}},{...good,data:{...data,sessionId:'wrong'}}])assert.equal(math.validBridge(bad,frame,stage,'test'),false);
});

test('A stationary tap on the selected sculpture can immediately open the page',()=>{
  const h=host();h.run("pointerDown({isPrimary:true,button:0,pointerId:1,clientX:500,clientY:300,timeStamp:100});pointerEnd({pointerId:1,timeStamp:120});");
  assert.equal(h.run('travel'),null);h.run('movePage(1)');h.tick();assert.equal(h.run('state'),'CONTENT');
});

test('Rapid next clicks retain the queued destination instead of resetting the animation',()=>{
  const h=host();h.run('stepSection(1)');h.tick(2);h.run("pointerDown({isPrimary:true,button:0,pointerId:1,clientX:1200,clientY:450,timeStamp:200});pointerEnd({pointerId:1,timeStamp:220});stepSection(1);");h.tick();assert.equal(h.run('selectedIndex'),2);assert.equal(h.run('position'),2);
});
test('Motion duration uses wall time at a low frame rate and Escape cancels queued entry',()=>{
  const h=host();h.run('movePage(1);animate(100);animate(2500)');assert.equal(h.run('state'),'CONTENT');
  h.run('movePage(0);animate(4500)');assert.equal(h.run('state'),'SCENE');
  h.run('selectIndex(2);movePage(1)');h.events.get('keydown')({key:'Escape',target:{},preventDefault(){}});h.tick();assert.equal(h.run('state'),'SCENE');assert.equal(h.run('pendingRoute'),null);
});

test('Five platforms form a regular pentagon and camera stays at waterline at every stop',()=>{
  const layout=cine.pentagonLayout(fixture.navigation.stages);const lengths=layout.map((s,i)=>Math.hypot(s.position[0]-layout[(i+1)%5].position[0],s.position[2]-layout[(i+1)%5].position[2]));
  assert(Math.max(...lengths)-Math.min(...lengths)<1e-10);
  for(const aspect of [390/844,16/9,3440/1440])for(const pose of cine.focusPoses(layout,aspect)){assert.equal(pose.position[1],.24);assert(pose.target[1]>pose.position[1]);}
});
test('End-of-page loop raises the scene from below and does not replay an END twice',()=>{
  const h=host();h.run('movePage(1)');h.tick();
  const event=h.run("({origin:new URL(frameStage.href).origin,source:frame.contentWindow,data:{channel:'memento:tide',version:1,sessionId,stageId:frameStage.id,type:'END'}})");
  h.events.get('message')(event);h.events.get('message')(event);assert.equal(h.run('transitionMode'),'loop');assert.equal(h.run('qa.loops'),1);
  h.tick(15);assert.match(h.nodes.get('#scene-layer').style.transform,/translate3d\(0,[0-9]/);assert.match(h.nodes.get('#page-layer').style.transform,/translate3d\(0,-/);h.tick();assert.equal(h.run('state'),'SCENE');
});

test('Framer selection updates history and RETURN cancels a queued opening',()=>{
  const h=host();
  const control=(type,slug,origin='https://memento.framer.website')=>h.events.get('message')({source:h.run('window.parent'),origin,data:{channel:'memento:tide:control',version:1,type,slug}});
  control('SELECT','projects','https://wrong.example');assert.equal(h.run('selectedIndex'),0);
  control('SELECT','projects');h.tick();assert.equal(h.run('selectedIndex'),2);assert.equal(h.location.hash,'#projects');
  control('OPEN','start');control('RETURN');h.tick(140);assert.equal(h.run('state'),'SCENE');assert.equal(h.run('pendingRoute'),null);assert.equal(h.run('frame'),null);
});

test('Framer selection during entry exits before changing the scene',()=>{
  const h=host();h.run('movePage(1)');
  h.events.get('message')({source:h.run('window.parent'),origin:'https://memento.framer.website',data:{channel:'memento:tide:control',version:1,type:'SELECT',slug:'levelup'}});
  h.tick(160);assert.equal(h.run('state'),'SCENE');assert.equal(h.run('selectedIndex'),3);assert.equal(h.location.hash,'#levelup');assert.equal(h.run('pageLayer.inert'),true);
});
