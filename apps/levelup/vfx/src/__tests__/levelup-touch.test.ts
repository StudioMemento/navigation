import { describe, expect, it } from 'vitest';
import { TouchPulseField, TouchReaction, planTouchSeeds } from '../touch';
import { buildNetwork, mulberry } from '../geometry';
import { placement, project } from '../projective';

// LevelUp: carousel boards are drawn through their own CSS transform and clipped by the carousel.
describe('touch wave on transformed, clipped carousel boards', () => {
  const network = () => buildNetwork(340, 220, 22, 20, 170, 19);
  it('a placement equal to the flat box plans exactly the flat seeds', () => {
    const field = new TouchPulseField(), wave = field.start(60, 420, 390, 844, 0), net = network();
    const flat = { x: 25, y: 380, w: 340, h: 220 };
    const mapped = { ...flat, map: (x: number, y: number): [number, number] => [25 + x, 380 + y] };
    expect(planTouchSeeds(net, mapped, wave)).toEqual(planTouchSeeds(net, flat, wave));
  });
  it('cells outside the carousel clip are never planned or lit', () => {
    const field = new TouchPulseField(), wave = field.start(60, 420, 390, 844, 0), net = network();
    const rect = { x: 25, y: 380, w: 340, h: 220, visible: (x: number) => x < 200 };
    const seeds = planTouchSeeds(net, rect, wave);
    expect(seeds.length).toBeGreaterThan(5);
    for (const s of seeds) expect(25 + net.cx[s.cell]).toBeLessThan(200);
  });
  it('a scaled, rotated neighbour board starts where the finger meets it on screen', () => {
    const net = network();
    // a board pushed to the right, rotated in 3D and scaled down, as the carousel draws a neighbour
    const m = placement([0.6, 0, -0.35, 0.0004, 0, 0.75, 0, 0, 0.35, 0, 0.6, 0, 0, 0, 0, 1], 170, 110, 300, 380);
    const map = (x: number, y: number) => project(m, x, y) as [number, number];
    const [tx, ty] = map(60, 110);
    const field = new TouchPulseField(), wave = field.start(tx, ty, 900, 844, 0);
    const seeds = planTouchSeeds(net, { x: 300, y: 380, w: 340, h: 220, map }, wave);
    expect(seeds.length).toBeGreaterThan(5);
    const first = seeds[0].cell, [fx, fy] = map(net.cx[first], net.cy[first]);
    expect(Math.hypot(fx - tx, fy - ty)).toBeLessThan(40);
  });
  it('a board moving under the wave keeps lighting only its visible cells, then goes dark', () => {
    const net = network(), field = new TouchPulseField(), reaction = new TouchReaction(net, mulberry(2));
    field.start(100, 450, 390, 844, 0);
    let x = 25, lit = 0;
    reaction.chain.onIgnite = cell => { lit++; expect(x + net.cx[cell]).toBeLessThan(260); };
    for (let ms = 0; ms < 2600; ms += 1000 / 60) {
      x -= 0.6; // the carousel drags the board to the left
      field.beginFrame(ms);
      reaction.step(field, { x, y: 380, w: 340, h: 220, map: (lx, ly) => [x + lx, 380 + ly], visible: px => px < 260 }, ms, 1 / 60);
    }
    expect(lit).toBeGreaterThan(10);
    expect(reaction.active).toBe(false);
  });
});
