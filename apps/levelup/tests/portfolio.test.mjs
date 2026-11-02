import test from 'node:test';
import assert from 'node:assert/strict';
import { portfolioStride, portfolioPose, portfolioEdge } from '../src/portfolio-geometry.js';

// Project both card edges independently, then look for exposed background in
// the useful part of the strip. Sampling between slides catches the old bow gap.
const cases = [];
for(let viewport=320;viewport<=2200;viewport+=20) {
  const width=viewport<=767?viewport*.76:Math.min(700,Math.max(300,viewport*.38));
  cases.push([viewport,width*.5625,viewport]);
}
test('Portfolio stays filled inside the edge fade during fractional handoffs', () => {
  for (const [viewport,height,pageWidth] of cases) {
    const width=height*16/9, stride=portfolioStride(viewport,width);
    const safe=viewport/2-Math.min(80,Math.max(16,pageWidth*.04));
    for(let phase=0;phase<=1;phase+=.01) {
      const intervals=[];
      for(let index=-5;index<=5;index++) {
        const distance=index-phase;
        if(Math.abs(distance)>portfolioEdge(10)-.6)continue;
        const p=portfolioPose(distance,stride,height), angle=p.yaw*Math.PI/180;
        const edgeX=width*p.scale/2, perspective=2000;
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
  assert(centre.scale>near.scale*1.2,'Centre must dominate the adjacent card');
  assert(near.scale>far.scale && Math.abs(near.yaw)<Math.abs(far.yaw));
});
