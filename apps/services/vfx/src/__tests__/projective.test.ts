import { describe, expect, it } from 'vitest';
import {
  alphaAt, gradientLine, inverseHomography, multiply4, parseAlphaGradient, parseTransform, placement, project, unproject,
} from '../projective';

/** CSS `perspective(P) rotateY(deg) scale(s)` as a column-major matrix (the browser's own composition order). */
function board(P: number, deg: number, scale: number, tx = 0, ty = 0) {
  const r = (deg * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
  const T = Float32Array.from([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1]);
  const persp = Float32Array.from([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1 / P, 0, 0, 0, 1]);
  const rotY = Float32Array.from([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  const S = Float32Array.from([scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  return multiply4(multiply4(multiply4(T, persp), rotY), S);
}

describe('transformed boards', () => {
  it('places the untransformed box like CSS, around its transform-origin', () => {
    const m = placement(board(1100, 0, 1, 40, 10), 300, 150, 1000, 2000);
    expect(project(m, 0, 0)).toEqual([1040, 2010]);
    expect(project(m, 600, 300)).toEqual([1640, 2310]);
  });

  it('a rotated board in perspective: the near edge grows, the far edge shrinks, the centre stays', () => {
    const w = 600, h = 300, m = placement(board(1100, -32, 0.88), w / 2, h / 2, 0, 0);
    const [cx, cy] = project(m, w / 2, h / 2);
    expect(cx).toBeCloseTo(w / 2, 4); expect(cy).toBeCloseTo(h / 2, 4);
    const left = project(m, 0, h)[1] - project(m, 0, 0)[1];
    const right = project(m, w, h)[1] - project(m, w, 0)[1];
    expect(Math.max(left, right)).toBeGreaterThan(h * 0.88);
    expect(Math.min(left, right)).toBeLessThan(h * 0.88);
  });

  it('maps the pointer back into the board exactly (inverse homography)', () => {
    const m = placement(board(2000, 22, 0.84, -180, 12), 340, 170, 500, 900);
    const inv = inverseHomography(m)!;
    for (const [x, y] of [[0, 0], [680, 0], [340, 170], [12.5, 333], [680, 340]]) {
      const [X, Y] = project(m, x, y);
      const [u, v] = unproject(inv, X, Y);
      expect(u).toBeCloseTo(x, 3); expect(v).toBeCloseTo(y, 3);
    }
  });

  it('reads computed transforms: matrix(), matrix3d() and none', () => {
    expect(Array.from(parseTransform('none'))).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    expect(Array.from(parseTransform('matrix(2, 0, 0, 3, 10, 20)'))).toEqual([2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 10, 20, 0, 1]);
    const m3 = board(1100, 30, 0.9, 5, 6);
    expect(Array.from(parseTransform(`matrix3d(${Array.from(m3).join(', ')})`))).toEqual(Array.from(m3));
  });
});

describe('black shades and masks', () => {
  it('parses the computed gradients LevelUp uses (angles, implicit positions, transparent)', () => {
    const benefit = parseAlphaGradient('linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0) 59%)')!;
    expect(benefit.angle).toBe(90);
    expect(benefit.stops).toEqual([{ t: 0, a: 1 }, { t: 0.3, a: 0.6 }, { t: 0.59, a: 0 }]);
    const portfolio = parseAlphaGradient('linear-gradient(0deg, rgba(0, 0, 0, 0.933), rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 0.6))')!;
    expect(portfolio.angle).toBe(0);
    expect(portfolio.stops.map(s => s.t)).toEqual([0, 0.62, 1]);
    const mask = parseAlphaGradient('linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0) 15%, rgb(0, 0, 0) 77%, rgba(0, 0, 0, 0))')!;
    expect(mask.angle).toBe(180);
    expect(mask.stops.map(s => s.a)).toEqual([0, 1, 1, 0]);
    expect(parseAlphaGradient('linear-gradient(to right, transparent, #000 40px)', 200)!.stops[1]).toEqual({ t: 0.2, a: 1 });
    expect(parseAlphaGradient('none')).toBeNull();
  });

  it('evaluates like the shader: clamped, piecewise linear', () => {
    const g = parseAlphaGradient('linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0) 59%)')!;
    expect(alphaAt(g, -1)).toBe(1);
    expect(alphaAt(g, 0.15)).toBeCloseTo(0.8, 5);
    expect(alphaAt(g, 0.8)).toBe(0);
  });

  it('follows the CSS gradient line of a box', () => {
    // 90deg across a 400 × 100 box: t = 0 at the left edge, 1 at the right
    const [dx, dy, inv] = gradientLine(90, 400, 100);
    const t = (x: number, y: number) => ((x - 200) * dx + (y - 50) * dy) * inv + 0.5;
    expect(t(0, 50)).toBeCloseTo(0, 5); expect(t(400, 0)).toBeCloseTo(1, 5);
    // 0deg points up: t = 0 at the bottom
    const [ex, ey, inv0] = gradientLine(0, 400, 100);
    expect(((0) * ex + (50) * ey) * inv0 + 0.5).toBeCloseTo(0, 5);
  });
});
