import test from 'node:test';
import assert from 'node:assert/strict';
import { viewportProgress, cursorField, material, wire, trail, mesh, smooth, inverseSmooth } from '../src/fx-math.js';
test('reading band remains fully materialized, including tall surfaces',()=>{
  for(const y of [160,350,600,800]) assert.equal(viewportProgress(y,1000,1500,4000),1);
  assert.equal(viewportProgress(0,1000,1500,4000),0);
  assert.equal(viewportProgress(1000,1000,1500,4000),0);
});
test('document limits, short roots and overscroll stay readable',()=>{
  assert.equal(viewportProgress(0,900,0,5000),1);
  assert.equal(viewportProgress(900,900,5000,5000),1);
  for(const y of [0,450,900])assert.equal(viewportProgress(y,900,0,0),1);
  assert.equal(viewportProgress(0,900,-100,5000),1);
});
test('material sequencing, inverse easing and cursor gate have correct endpoints',()=>{
  for(let i=0;i<=10;i++){const x=i/10;assert.ok(Math.abs(smooth(0,1,inverseSmooth(x))-x)<1e-8);assert.equal(material(0,x),0);assert.equal(material(1,x),1);}
  assert.equal(wire(0),0);assert.equal(wire(1),0);assert.ok(wire(.4)>.9);
  assert.ok(trail(.08)>.9);assert.equal(trail(1),0);
  assert.equal(cursorField(0,260),1);assert.equal(cursorField(260,260),0);
  assert.ok(cursorField(80,260)>cursorField(200,260));
});
test('topology is reproducible in both scroll directions and across reconstruction',()=>{
  const a=mesh(180,180,22,123),b=mesh(180,180,22,123);
  assert.deepEqual(a,b);assert.ok(a.every(t=>t.vertices.length===3));
  const down=[0,200,500,800].map(s=>viewportProgress(850-s,900,s,5000));
  const up=[800,500,200,0].map(s=>viewportProgress(850-s,900,s,5000)).reverse();assert.deepEqual(down,up);
});
