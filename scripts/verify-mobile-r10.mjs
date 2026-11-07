import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {layout,pose,relative,viewportHeight} from '../dist/src/model.mjs';
import {overlayCSS} from '../dist/navigation/styles.mjs';

// Toolbar/keyboard changes must shrink the layout without shrinking it during
// native pinch zoom. Invalid or oversized host messages cannot expand it.
assert.equal(viewportHeight(844,724,1),724);
assert.equal(viewportHeight(844,390,1),390);
assert.equal(viewportHeight(844,422,2),844);
assert.equal(viewportHeight(844,844,1,710),710);
assert.equal(viewportHeight(844,844,1,1200),844);
for(const bad of [NaN,Infinity,-5,0,undefined])assert.equal(viewportHeight(844,bad,1,bad),844);
for(const [w,outerH,visibleH,safeBottom]of [[320,568,480,0],[390,844,724,34],[430,932,780,34],[375,812,375,0],[844,390,350,21]]){
 const h=viewportHeight(outerH,visibleH),dockBottom=Math.max(12,safeBottom),dockTop=h-dockBottom-48;
 const l=layout(w,h,{logoBottom:60,dockTop});
 assert.ok(dockTop>=0&&dockTop+48<=h-safeBottom,'Entire dock remains in the visible safe viewport');
 assert.ok(l.nextY+l.arrowHeight/2<=dockTop-11.99,'Next control clears dock');
 assert.ok(l.previousY-l.arrowHeight/2>=l.logoBottom+11.99,'Previous control clears logo');
 if(w<600){assert.ok(l.width<=w*.84+.001,'More background remains visible beside mobile cards');assert.ok(Math.abs(l.padding/l.width-.045)<1e-8,'Mobile internal title padding is reduced');}
 assert.equal(pose(0,l).secondary,0);assert.equal(pose(1,l).secondary,1);
}
const css=await readFile(new URL('../dist/src/style.css',import.meta.url),'utf8');
const app=await readFile(new URL('../dist/src/app.mjs',import.meta.url),'utf8');
const noCastShadow=source=>assert.ok(!source.includes('card-shadow'),'No active card cast-shadow layer is shipped');
noCastShadow(css);noCastShadow(app);assert.throws(()=>noCastShadow(css+' .card-shadow{}'),'Positive fixture proves absence assertion');
assert.match(css,/\.card-shade\{[^}]+linear-gradient\(to bottom/);
assert.match(css,/\[data-slot="next"\] \.card-shade\{[^}]+linear-gradient\(to top/);
assert.match(overlayCSS,/height:var\(--nav-viewport-height,100svh\)/);
assert.match(overlayCSS,/--mm-bottom-gap: max\(12px,env\(safe-area-inset-bottom,0px\)\)/);
assert.doesNotMatch(overlayCSS,/bottom:-4px/);
assert.match(app,/viewportHeight\(document\.documentElement\.clientHeight/);

// Exercise the actual shipped draw function so centered cards get zero depth
// gradient and the two previews get opposing directional gradients at full gain.
const cards=Array.from({length:5},()=>({ready:true,el:{style:{setProperty(k,v){this[k]=v}},dataset:{},setAttribute(){}},shade:{style:{}}}));
const context={cards,position:0,l:layout(390,724),started:true,pose,relative,motionReduced:()=>false,decodeImage(){}};
vm.createContext(context);vm.runInContext(app.slice(app.indexOf('function drawScene('),app.indexOf('function frame(')),context);context.drawScene();
assert.equal(cards[0].shade.style.opacity,0,'Active card has no extra depth shading');
assert.equal(cards[1].shade.style.opacity,1);assert.equal(cards[1].el.dataset.slot,'next');
assert.equal(cards[4].shade.style.opacity,1);assert.equal(cards[4].el.dataset.slot,'previous');
context.position=.5;context.drawScene();assert.ok(cards[0].shade.style.opacity>0&&cards[0].shade.style.opacity<1,'Depth blends during slide');

// Run the shipped parent bridge to model a tall Framer iframe behind mobile
// browser chrome. Its viewport message is only sent to the known child origin.
const html=await readFile(new URL('../docs/framer-nav-bridge.html',import.meta.url),'utf8');
const source=html.match(/<script>([\s\S]*?)<\/script>/)[1],messages=[],events=new Map(),vvEvents=new Map();
const child={postMessage:(data,origin)=>messages.push({data,origin})};
const frame={src:'https://mementonav.vercel.app/',contentWindow:child,title:'',getBoundingClientRect:()=>({top:0,height:844}),addEventListener(){},removeEventListener(){}};
const vv={height:724,offsetTop:0,scale:1,addEventListener:(k,f)=>vvEvents.set(k,f),removeEventListener:k=>vvEvents.delete(k)};
const callbacks=[],host={visualViewport:vv,requestAnimationFrame:f=>{callbacks.push(f);return callbacks.length;},cancelAnimationFrame(){},addEventListener:(k,f)=>events.set(k,f),removeEventListener:k=>events.delete(k)};
const location=new URL('https://mementostudio.it/');
vm.runInNewContext(source,{window:host,document:{documentElement:{clientHeight:844},querySelectorAll:()=>[frame]},location,history:{replaceState(){}},URL,MutationObserver:class{observe(){}disconnect(){}}});
assert.equal(messages.at(-1).data.height,724);assert.equal(messages.at(-1).origin,'https://mementonav.vercel.app');
const count=messages.length,request={source:child,origin:'https://evil.test',data:{channel:'memento:hub-viewport',version:1,type:'REQUEST'}};
events.get('message')(request);assert.equal(messages.length,count,'Unknown host request origin rejected');
events.get('message')({...request,origin:'https://mementonav.vercel.app'});assert.equal(messages.length,count+1);
vv.height=650;vvEvents.get('resize')();vvEvents.get('resize')();assert.equal(callbacks.length,1,'Host viewport changes coalesce');callbacks.shift()();assert.equal(messages.at(-1).data.height,650);
vv.scale=2;events.get('resize')();callbacks.shift()();assert.equal(messages.at(-1).data.height,650,'Pinch zoom sends no viewport resize');
host.__MEMENTO_HOME_ROUTE_R6__.destroy();assert.equal(events.size,0);assert.equal(vvEvents.size,0);

// Check the actual child receiver rejects foreign origins, sources and NaN.
const listenerSource=app.slice(app.indexOf("on(window,'message',event=>"),app.indexOf('if(window.parent!==window)'));
let receive,fitCalls=0;const parent={},state={window:{parent},HOST_ORIGINS:['https://mementostudio.it','https://www.mementostudio.it'],VIEWPORT_CHANNEL:'memento:hub-viewport',hostViewportHeight:undefined,requestFit(){fitCalls++},on(w,name,f){receive=f}};
vm.createContext(state);vm.runInContext(listenerSource,state);
const message={source:parent,origin:'https://mementostudio.it',data:{channel:state.VIEWPORT_CHANNEL,version:1,type:'VIEWPORT',height:724}};
for(const bad of [{...message,source:{}},{...message,origin:'https://evil.test'},{...message,data:{...message.data,height:NaN}},{...message,data:{...message.data,height:159}},{...message,data:{...message.data,height:10001}}])receive(bad);
assert.equal(fitCalls,0);receive(message);assert.equal(state.hostViewportHeight,724);assert.equal(fitCalls,1);
console.log('MOBILE_R10_VERIFIED: visible viewport, safe dock, narrower mobile card, no cast shadow, directional depth, trusted host bridge');
