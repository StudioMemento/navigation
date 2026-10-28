import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../public/tide-child-bridge.js',import.meta.url),'utf8');
function host({height=3000,viewport=800,custom=false,virtual=false,next=false}={}){
 const handlers=new Map(),sent=[];let now=0,hasModal=false,virtualEnd=false,advances=0;
 class Element{closest(){return null;}}
 const body=new Element(),root=Object.assign(new Element(),{scrollTop:0,scrollHeight:height,clientHeight:viewport,scrollTo({top}){this.scrollTop=top;}});
 const documentRoot=custom?{scrollTop:0,scrollHeight:800,clientHeight:800}:root;
 const parent={postMessage(message,origin){sent.push({message,origin});}},window={parent};
 vm.runInContext(source,vm.createContext({window,parent,Element,URL,document:{referrer:'https://hub.example/',currentScript:{dataset:virtual?{tideEndSelector:'.last',tideResetSelector:'.first',...(next?{tideNextSelector:'.next'}:{})}:custom?{tideScrollRoot:'#viewport'}:{}},scrollingElement:documentRoot,body,querySelector:sel=>sel==='.last'?(virtualEnd?{}:null):sel==='.first'?{click(){virtualEnd=false;}}:sel==='.next'?{click(){advances++;virtualEnd=true;}}:sel==='#viewport'?root:hasModal?{}:null},performance:{now:()=>now},getComputedStyle:()=>({overflowY:'auto'}),addEventListener(type,fn){handlers.set(type,fn);}}));
 const envelope=(type,payload={})=>({source:parent,origin:'https://hub.example',data:{channel:'memento:tide',version:1,sessionId:'test',stageId:'s01_services',type,payload}});
 return{sent,root,body,Element,handlers,envelope,init(){handlers.get('message')(envelope('INIT'));handlers.get('message')(envelope('VISIBILITY',{active:true}));now+=1000;},advance(t=300){now+=t;},modal(v){hasModal=v;},virtualEnd(v){virtualEnd=v;},advances:()=>advances,wheel(deltaY=100,target=body){handlers.get('wheel')({deltaY,deltaX:0,target,preventDefault(){},stopImmediatePropagation(){}});},ends(){return sent.filter(s=>s.message.type==='END').length;}};
}
test('Arrival at the bottom stays readable; a fresh downward gesture completes the loop once',()=>{
 const h=host();h.init();h.wheel();h.root.scrollTop=2200;h.handlers.get('scroll')();assert.equal(h.ends(),0);
 h.wheel();assert.equal(h.ends(),0);h.advance();h.wheel();assert.equal(h.ends(),1);h.wheel();assert.equal(h.ends(),1);
});
test('Short pages remain open until deliberate input after the entrance guard',()=>{
 const h=host({height:800});h.init();h.handlers.get('scroll')();assert.equal(h.ends(),0);h.wheel(-100);assert.equal(h.ends(),0);h.advance();h.wheel();assert.equal(h.ends(),1);
});
test('Nested scrollers and modal dialogs consume input before the outer page can loop',()=>{
 const h=host({height:800});h.init();const inner=Object.assign(new h.Element(),{scrollHeight:1500,clientHeight:300,scrollTop:0,parentElement:h.body});
 h.wheel(100,inner);assert.equal(h.ends(),0);h.modal(true);h.advance();h.wheel();assert.equal(h.ends(),0);h.modal(false);h.advance();h.wheel();assert.equal(h.ends(),1);
});
test('Projects custom viewport controls the boundary, not the non-scrolling document',()=>{
 const h=host({custom:true});h.init();h.wheel();assert.equal(h.ends(),0);h.root.scrollTop=2200;h.handlers.get('scroll')();h.advance();h.wheel();assert.equal(h.ends(),1);
});
test('Touch must begin at the end and travel vertically toward the next page',()=>{
 const h=host();h.init();const begin=()=>h.handlers.get('touchstart')({touches:[{clientX:100,clientY:500}],target:h.body});const end=(x,y)=>h.handlers.get('touchend')({changedTouches:[{clientX:x,clientY:y}]});
 begin();h.root.scrollTop=2200;end(100,300);assert.equal(h.ends(),0);begin();end(250,490);assert.equal(h.ends(),0);begin();end(100,600);assert.equal(h.ends(),0);begin();end(100,300);assert.equal(h.ends(),1);
});
test('Wrong source/origin/session is ignored; returning after the end resets the scroll root',()=>{
 const h=host();h.init();const before=h.sent.length;h.handlers.get('message')({...h.envelope('INIT'),origin:'https://wrong.example'});assert.equal(h.sent.length,before);
 h.root.scrollTop=2200;h.wheel();assert.equal(h.ends(),1);h.handlers.get('message')(h.envelope('VISIBILITY',{active:false}));h.handlers.get('message')(h.envelope('VISIBILITY',{active:true}));assert.equal(h.root.scrollTop,0);
});
test('Hidden content cannot trigger END, and a repeated keyboard hold does not dismiss it',()=>{
 const h=host({height:800});h.init();h.handlers.get('keydown')({key:'End',repeat:true,target:h.body});assert.equal(h.ends(),0);
 h.handlers.get('message')(h.envelope('VISIBILITY',{active:false}));h.wheel();assert.equal(h.ends(),0);
});
test('Studio virtual navigation reaches its final scene before a new gesture can exit',()=>{
 const h=host({height:800,virtual:true});h.init();h.wheel();assert.equal(h.ends(),0);
 h.virtualEnd(true);h.wheel();assert.equal(h.ends(),0);h.advance();h.wheel();assert.equal(h.ends(),1);
 h.handlers.get('message')(h.envelope('VISIBILITY',{active:false}));h.handlers.get('message')(h.envelope('VISIBILITY',{active:true}));h.advance(1000);h.wheel();assert.equal(h.ends(),1);
});
test('Studio captures a final touch pointer before its own handler wraps to the first room',()=>{
 const h=host({height:800,virtual:true});h.init();h.virtualEnd(true);let stopped=false;
 h.handlers.get('pointerdown')({pointerType:'touch',isPrimary:true,pointerId:7,clientX:100,clientY:500,target:h.body});
 h.handlers.get('pointerup')({pointerId:7,clientX:100,clientY:300,preventDefault(){},stopImmediatePropagation(){stopped=true;}});
 assert.equal(h.ends(),1);assert.equal(stopped,true);
});
test('Studio exits before its native 65 px wheel threshold can wrap the final room',()=>{
 const h=host({height:800,virtual:true});h.init();h.virtualEnd(true);h.wheel(32);assert.equal(h.ends(),1);
});
test('Levelup advances its native gallery and waits for a fresh gesture on the last card',()=>{
 const h=host({height:800,virtual:true,next:true});h.init();h.wheel();assert.equal(h.advances(),1);assert.equal(h.ends(),0);
 h.wheel();assert.equal(h.ends(),0);h.advance(1000);h.wheel();assert.equal(h.ends(),1);
});
