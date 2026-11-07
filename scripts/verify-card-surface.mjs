import assert from 'node:assert/strict';
import {CardFX,resetSurface} from '../dist/src/card-fx.mjs';
import {layout,pose} from '../dist/src/model.mjs';
import {outline,borderDistance} from '../dist/src/geometry.mjs';

function context(){
 let transform=[1,0,0,1,0,0],path=[],stack=[];
 const c={strokes:[],clears:[],globalAlpha:1,globalCompositeOperation:'source-over',shadowBlur:0,
  setTransform(...v){assert.ok(v.every(Number.isFinite));transform=v;},
  clearRect(x,y,w,h){this.clears.push({transform:[...transform],rect:[x,y,w,h]});this.strokes=[];},
  beginPath(){path=[];},moveTo(x,y){path.push([x*transform[0]+transform[4],y*transform[3]+transform[5]]);},
  lineTo(x,y){this.moveTo(x,y);},closePath(){},fill(){},fillRect(){},clip(){},drawImage(){},strokeText(){},
  stroke(){assert.ok(!String(this.strokeStyle).includes('NaN'));this.strokes.push(path.map(p=>[...p]));},
  save(){stack.push([...transform]);},restore(){transform=stack.pop();},
  translate(x,y){transform[4]+=x*transform[0];transform[5]+=y*transform[3];},
  get transform(){return transform;}
 };return c;
}
const c=context(),bitmap={width:1800,height:900};
for(let frame=0;frame<200;frame++){
 c.setTransform(1.5,0,0,1.5,frame*20,frame*20);c.globalAlpha=.1;c.shadowBlur=20;
 resetSurface(c,bitmap,1.5,32);
 assert.deepEqual(c.clears.at(-1),{transform:[1,0,0,1,0,0],rect:[0,0,1800,900]});
 assert.deepEqual(c.transform,[1.5,0,0,1.5,48,48]);assert.equal(c.globalAlpha,1);assert.equal(c.shadowBlur,0);
}

const oldDocument=globalThis.document,oldDpr=globalThis.devicePixelRatio;
globalThis.devicePixelRatio=1.5;
globalThis.document={createElementNS:()=>({attrs:{},setAttribute(k,v){this.attrs[k]=v;}})};
try{
 const canvas=()=>{const ctx=context();return{width:0,height:0,getContext:()=>ctx};};
 const l=layout(1440,900),surface=canvas(),edge=canvas(),mask={setAttribute(){},replaceChildren(...children){this.children=children;}};
 const field={pointer:{strength:1},current:{strength:1},directEnergy:(x,y)=>Math.max(0,1-Math.hypot(x-(l.cx-l.width/2),y-(l.cy-l.height/2))/300),emit(){},transitionParticle(){}};
 const fx=Object.assign(Object.create(CardFX.prototype),{index:0,field,canvas:surface,edge,glyphMask:canvas(),typeCanvas:canvas(),ctx:surface.getContext(),ec:edge.getContext(),amount:1,last:0,waveAt:-10000,imageEnergy:0,pulses:[],shell:{style:{}},card:{querySelector:()=>mask,classList:{contains:()=>false},style:{setProperty(){}},dataset:{}},refreshType(){this.points.forEach(p=>p.weight=.6);this.waveAt=-10000;},drawType(){}});
 fx.resize(l);
 assert.deepEqual(fx.faces.map(f=>f.ids),fx.grid.triangles,'Reveal must share the exact hover triangle IDs');
 assert.equal(mask.children.length,fx.grid.triangles.length);
 assert.ok(fx.faces.every(f=>f.pts.every((p,j)=>p===fx.grid.points[f.ids[j]])));
 const p=pose(0,l),corner={x:0,y:0};
 for(let frame=0;frame<80;frame++){
  // Simulate inherited transform pollution. Rendering must not depend on it.
  fx.ec.setTransform(1.5,0,0,1.5,frame*20,frame*20);
  fx.draw(2000+frame*16,corner,p);
  const first=fx.ec.strokes[0],expected=outline(l.width,l.height,l.cut).map(([x,y])=>[(x+32)*fx.dpr,(y+32)*fx.dpr]);
  assert.deepEqual(first,expected,'Only one true perimeter may be rendered; no translated corner copies');
  for(const path of fx.ec.strokes)for(const[x,y]of path)assert.ok(borderDistance(x/fx.dpr-32,y/fx.dpr-32,l.width,l.height,l.cut)<1e-7,'Every halo sample lies on the original cut perimeter');
 }
 fx.reveal(.55);fx.draw(4000,corner,p);
 const active=fx.faces.map(f=>f.energy).filter(e=>e>.01);
 assert.ok(active.length>10);assert.ok(Math.max(...active)-Math.min(...active)>.3,'Reveal fronts need distinct bright and dark facets');
 assert.ok(fx.faces.every(f=>Number.isFinite(f.value)&&f.value>=0&&f.value<=1));
 fx.reveal(1);fx.draw(5000,corner,p);fx.draw(5600,corner,p);
 assert.ok(fx.faces.every(f=>f.energy===0),'Settled reveal must not leave illuminated wireframes');
 console.log('CARD_SURFACE_VERIFIED: shared hover/reveal topology, nonuniform fronts, full pixel clears, fixed perimeter under repeated corner hover');
}finally{globalThis.document=oldDocument;globalThis.devicePixelRatio=oldDpr;}
