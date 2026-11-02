import test from 'node:test';
import assert from 'node:assert/strict';
import { portfolioStride, portfolioPose, portfolioEdge } from '../src/portfolio-geometry.js';

// Project both card edges independently, then look for exposed background in
// the useful part of the strip. Sampling between slides catches the old bow gap.
const cases = [];
for(let viewport=320;viewport<=2200;viewport+=20) {
  const content=Math.min(1720,viewport,Math.max(320,viewport-180));
  for(const viewportHeight of [390,600,740,844,1080,1440]) {
    const cardHeight=Math.min(200,Math.max(118,viewportHeight*.18,content/9),content/3);
    cases.push([content,cardHeight,viewport]);
  }
}
test('Portfolio stays filled inside the edge fade during fractional handoffs', () => {
  for (const [viewport,height,pageWidth] of cases) {
    const width=height*16/9, stride=portfolioStride(viewport,width);
    const safe=viewport/2-Math.min(48,Math.max(12,pageWidth*.03));
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

test('Outer cards recycle only when invisible; seven neighbours reach the desktop reveal', () => {
  const edge=portfolioEdge(10), height=194.4, width=height*16/9;
  assert(edge<5,'The ring reset at half the item count must be hidden');
  assert(edge>3.5,'Both outer reveal neighbours need a complete transition');
  const p=portfolioPose(3,portfolioStride(1720,width),height);
  assert(p.x<860 && p.x+width*p.scale/2>812,'Outer card reaches the padding fade');
});
