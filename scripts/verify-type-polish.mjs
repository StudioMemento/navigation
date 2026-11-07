import assert from 'node:assert/strict';
import {CardFX} from '../dist/src/card-fx.mjs';
import {glyphLight} from '../dist/src/vfx-core.mjs';
import {layout,pose} from '../dist/src/model.mjs';

// Regression: moving onto the photo can reach the label weakly before a wave
// exists. Old code produced NaN alpha and Canvas kept its default black fill.
for(const origin of [undefined,null,NaN]){
 assert.ok(Math.abs(glyphLight(.1,.2,origin,14)-.088)<1e-12);
 assert.equal(glyphLight(0,.8,origin,14),0);
}
for(let step=0;step<150;step++)for(let x=0;x<=1;x+=.05){
 const e=glyphLight(.1,x,.25,step/100);
 assert.ok(Number.isFinite(e)&&e>=0&&e<=1);
}
assert.equal(glyphLight(0,.8,.25,1.1),0);
assert.equal(glyphLight(0,.8,.25,-.01),0);
assert.equal(glyphLight(NaN,.8,null,0),0);
assert.ok(glyphLight(0,.25,.25,0)>glyphLight(0,.9,.25,0));

function context(){
 const fills=[],strokes=[],state=[];
 let fillStyle='#000',strokeStyle='#000';
 const valid=value=>assert.ok(/^rgba\([\d.,]+\)$/.test(value),'Canvas must receive finite RGBA values');
 return {
  fills,strokes,globalCompositeOperation:'source-over',
  get fillStyle(){return fillStyle;},set fillStyle(v){valid(v);fillStyle=v;},
  get strokeStyle(){return strokeStyle;},set strokeStyle(v){valid(v);strokeStyle=v;},
  clearRect(){fills.length=0;strokes.length=0;},beginPath(){},moveTo(){},lineTo(){},closePath(){},
  fill(){fills.push(fillStyle);},stroke(){strokes.push(strokeStyle);},drawImage(){},
  save(){state.push(this.globalCompositeOperation);},restore(){this.globalCompositeOperation=state.pop();}
 };
}
const l=layout(1440,900),ctx=context(),surface={drawImage(){}},edge={save(){},restore(){},drawImage(){},strokeText(){}};
const glyphs=[{x:100,width:50},{x:l.width-150,width:50}],top=l.height-130;
let input=.1;const emissions=[];
const fx={
 l,typeTop:top,typeHeight:70,typeCanvas:{getContext:()=>ctx},glyphMask:{},glyphs,
 field:{directEnergy:x=>x<l.cx?input:0,emit:(...args)=>emissions.push(args)},nearest:()=>0,xy:[{pulse:0}],
 waveAt:-10000,waveOrigin:null,titleEntered:false,
 typeFaces:glyphs.map((g,i)=>({glyph:i,variation:.5,points:[{x:g.x,y:top},{x:g.x+50,y:top},{x:g.x,y:top+70}]})),
 typeEdges:glyphs.map((g,i)=>({glyph:i,a:{x:g.x,y:top},b:{x:g.x+50,y:top+70}}))
};
for(const t of [1000,1016,1032]){
 CardFX.prototype.drawType.call(fx,t,pose(0,l),surface,edge);
 assert.equal(ctx.fills.length,1,'Only the reached glyph receives microfaces');
 assert.equal(ctx.strokes.length,1,'The distant glyph stays clean');
 assert.equal(fx.waveOrigin,null,'Weak proximity does not start propagation');
 assert.equal(ctx.globalCompositeOperation,'source-over','Mask state cannot leak');
}
fx.typeContour=[{x:105,y:top+12,glyph:0},{x:112,y:top+20,glyph:0},{x:120,y:top+35,glyph:0},{x:130,y:top+45,glyph:0},{x:l.width-140,y:top+12,glyph:1}];
input=.5;
CardFX.prototype.drawType.call(fx,2000,pose(0,l),surface,edge);
assert.equal(fx.waveAt,2000);
assert.equal(emissions.length,3,'Glyph particles share a bounded three-candidate budget');
assert.ok(emissions.every(p=>p[4]==='glyph'&&p[3]>.25&&p[0]<l.cx),'Only reached real contour samples emit');
assert.ok(Number.isFinite(fx.waveOrigin));
input=0;
CardFX.prototype.drawType.call(fx,3000,pose(0,l),surface,edge);
assert.equal(ctx.fills.length,0,'Completed propagation leaves no residue');
assert.equal(ctx.strokes.length,0);
assert.equal(emissions.length,3,'Expired front cannot keep emitting glyph particles');
console.log('TYPE_POLISH_VERIFIED: finite weak hover, distant glyph, bounded front, contour emission, decay, mask state');
