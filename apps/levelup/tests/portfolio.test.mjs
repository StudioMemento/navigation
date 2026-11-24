import test from 'node:test';
import assert from 'node:assert/strict';
import { portfolioStride, portfolioPose, portfolioEdge } from '../src/portfolio-geometry.js';

// Project both card edges independently, then look for exposed background in
// the useful part of the strip. Sampling between slides catches the old bow gap.
const cases = [];
for(let viewport=320;viewport<=2200;viewport+=20) {
  const pageWidth=viewport<=500?viewport-40:Math.min(1720,viewport,Math.max(320,viewport-180));
  const width=viewport<=767?pageWidth*.72:Math.min(680,Math.max(240,pageWidth*.4));
  const height=width*(viewport<=767?.61:.5);
  const perspective=1100+900*Math.max(0,Math.min(1,(viewport-768)/256));
  cases.push({viewport,width,height,pageWidth,perspective});
}
test('Portfolio stays filled inside the edge fade during fractional handoffs', () => {
  for (const {viewport,width,height,pageWidth,perspective} of cases) {
    const stride=portfolioStride(viewport,width,pageWidth,perspective);
    const safe=pageWidth/2;
    for(let phase=0;phase<=1;phase+=.01) {
      const intervals=[];
      for(let index=-5;index<=5;index++) {
        const distance=index-phase;
        if(Math.abs(distance)>portfolioEdge(10)-.6)continue;
        const p=portfolioPose(distance,stride,height), angle=p.yaw*Math.PI/180;
        const edgeX=width*p.scale/2;
        const ends=[-1,1].map(sign=>p.x+sign*edgeX*Math.cos(angle)/(1+sign*edgeX*Math.sin(angle)/perspective));
        intervals.push([Math.min(...ends),Math.max(...ends)]);
      }
      intervals.sort((a,b)=>a[0]-b[0]);
      let covered=-safe;
      for(const [left,right]of intervals) {
        if(right<covered)continue;
        assert(left<=covered+1,`Gap at ${viewport}px, phase ${phase.toFixed(2)}: ${left-covered}px`);
        covered=Math.max(covered,right);
        if(covered>=safe)break;
      }
      assert(covered>=safe,`Unfilled right edge at ${viewport}px`);
    }
  }
});

test('The centre dominates and outer cards reset out of sight', () => {
  const edge=portfolioEdge(10);
  assert(edge<5,'The ring reset at half the item count must be hidden');
  assert(edge>3.5,'Outer neighbours remain present during the transition');
  const centre=portfolioPose(0,300,300), near=portfolioPose(1,300,300), far=portfolioPose(2,300,300);
  assert.equal(centre.scale,1);
  assert(centre.scale>near.scale*1.15,'Centre must remain distinct from the adjacent card');
  assert(near.scale>far.scale && Math.abs(near.yaw)<Math.abs(far.yaw));
});

test('Immediate neighbours align with both content gutters and the centre is smaller than V12', () => {
  for(const {viewport,width,height,pageWidth,perspective} of cases){
    const oldWidth=viewport<=767?viewport*.76:Math.min(700,Math.max(300,viewport*.38));
    assert(width<oldWidth,`Centre did not shrink at ${viewport}`);
    if(viewport<768)continue;
    const stride=portfolioStride(viewport,width,pageWidth,perspective);
    for(const sign of [-1,1]){
      const p=portfolioPose(sign,stride,height),a=p.yaw*Math.PI/180,half=width*p.scale/2;
      const outer=p.x+sign*half*Math.cos(a)/(1+sign*half*Math.sin(a)/perspective);
      assert(Math.abs(outer-sign*pageWidth/2)<.001,`Neighbour misses gutter at ${viewport}`);
    }
  }
});
