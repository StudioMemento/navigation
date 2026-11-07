import assert from 'node:assert/strict';
import {Field} from '../dist/src/field.mjs';
import {VFX} from '../dist/src/vfx-config.mjs';
import {TrianglePool,fieldEnergy} from '../dist/src/vfx-core.mjs';
import {layout} from '../dist/src/model.mjs';

// Shared burst tokens cannot be multiplied by the number of emitting surfaces.
const pool=new TrianglePool(6);
for(let i=0;i<20;i++)pool.emit(50,50,40,50,100,1,{burst:true});
assert.equal(pool.count,3);
for(let i=0;i<20;i++)pool.emit(50,50,40,50,101,1,{burst:true});
assert.equal(pool.count,3);
for(let i=0;i<20;i++)pool.emit(50,50,40,50,160,1,{burst:true});
assert.equal(pool.count,6);
assert.ok(pool.items.every(p=>p.vx>0&&p.size<=5.2));
pool.update(1500,.016);assert.equal(pool.count,0);
assert.equal(pool.emit(NaN,20,10,10,1600),false);

// Unequal energy on equal-radius points demonstrates an irregular field.
const samples=Array.from({length:32},(_,i)=>fieldEnergy(500+190*Math.cos(i*Math.PI/16),350+190*Math.sin(i*Math.PI/16),{x:500,y:350,strength:1},VFX.radius));
assert.ok(Math.max(...samples)-Math.min(...samples)>.2);
for(const x of [0,100,500,1000])assert.equal(fieldEnergy(x,300,{x:500,y:350,strength:0},VFX.radius),0);

// Exercise the actual queue and shared lifecycle with a no-op canvas adapter.
const context=new Proxy({}, {get:(o,k)=>k in o?o[k]:(()=>{}),set:(o,k,v)=>{if(typeof v==='string'&&v.startsWith('rgba('))assert.ok(!v.includes('NaN'));o[k]=v;return true;}});
const canvas=()=>({getContext:()=>context,setAttribute(){},remove(){}});
const savedDocument=globalThis.document,savedDpr=globalThis.devicePixelRatio;
globalThis.document={createElement:canvas,body:{append(){}}};globalThis.devicePixelRatio=1;
try{
 const field=new Field(canvas());field.resize(layout(1200,800));
 let t=1000,peak=0;
 const frame=(x,y,reduced=false)=>{field.pointer={x,y,strength:1};field.begin(t,reduced);field.draw(t,reduced);field.emit(x,y,t,1,'glyph');field.finish();peak=Math.max(peak,field.pool.count);t+=16;};
 for(let i=0;i<90;i++)frame(100+i*5,300);
 assert.ok(peak>3&&peak<=VFX.pool,'movement creates bounded bursts');
 const births=field.pool.items.map(p=>p.birth);
 for(let i=0;i<120;i++)frame(545,300);
 assert.equal(field.pool.count,0,'stationary pointer must exhaust emission');
 assert.deepEqual(field.pool.items.map(p=>p.birth),births,'no repeated stationary emitter');
 field.pointer.strength=0;field.touch(545,300,t);let touchParticles=0;
 for(let i=0;i<30;i++){field.begin(t);field.draw(t);field.emit(550,300,t,.8,'surface');field.finish();touchParticles=Math.max(touchParticles,field.pool.count);t+=16;}
 assert.ok(touchParticles>0);assert.equal(field.pulseCredits,0);
 field.touch(545,300,t);field.cancel();assert.equal(field.pulseCredits,0);
 frame(550,300,true);assert.equal(field.pool.count,0);assert.equal(field.pulses.length,0);
 field.dispose();
}finally{globalThis.document=savedDocument;globalThis.devicePixelRatio=savedDpr;}
console.log('AMBER_FIELD_VERIFIED: shared burst limit, irregular reach, motion/idle/touch/cancel/reduced lifecycle');
