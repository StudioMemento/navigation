import { describe, expect, it } from 'vitest';
import { RESIDENCY, blurLod, blurOf, brightnessOf, pickSource, srcsetCandidates, viewportGap } from '../servizi';
import { alphaAt, lineLength, parseAlphaGradient, parseAlphaGradients } from '../projective';

const SET = 'assets/responsive/sito-v27-320.webp 320w, assets/responsive/sito-v27-640.webp 640w, assets/sito-v27.webp 1536w';

describe('Servizi: photographs at the resolution the GPU draws them', () => {
  it('reads w candidates in order and ignores density descriptors', () => {
    expect(srcsetCandidates(SET).map(c => c.w)).toEqual([320, 640, 1536]);
    expect(srcsetCandidates('a.webp 2x, b.webp 1x')).toEqual([]);
  });
  it('a phone board (320 css px at DPR 1.5) uploads the 640 variant, not the 1536 the browser chose', () => {
    expect(pickSource(SET, 'http://x/assets/sito-v27.webp', 480)).toBe('assets/responsive/sito-v27-640.webp');
  });
  it('keeps the loaded source when it is close to the need (no second download)', () => {
    expect(pickSource(SET, 'http://x/assets/sito-v27.webp', 983)).toBe('http://x/assets/sito-v27.webp');
    expect(pickSource(SET, 'http://x/assets/responsive/sito-v27-640.webp', 600)).toBe('http://x/assets/responsive/sito-v27-640.webp');
  });
  it('never uploads less than the drawn size, and never more than the largest candidate', () => {
    expect(pickSource(SET, 'http://x/assets/responsive/sito-v27-320.webp', 1200)).toBe('assets/sito-v27.webp');
    expect(pickSource(SET, 'http://x/assets/sito-v27.webp', 4000)).toBe('http://x/assets/sito-v27.webp');
    expect(pickSource('', 'cur.webp', 300)).toBe('cur.webp');
  });
});

describe('Servizi: the photograph masks and the mobile title veil', () => {
  it('reads both intersected layers of the board mask, as Chrome computes them', () => {
    const phone = 'linear-gradient(90deg, rgba(0, 0, 0, 0), rgb(0, 0, 0) 0%), linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1) 7.68%, rgba(0, 0, 0, 0.5) 17.6%, rgba(0, 0, 0, 0.898) 26.88%, rgb(0, 0, 0) 32%)';
    const [h, v] = parseAlphaGradients(phone, a => lineLength(a, 320, 213));
    expect(h.angle).toBe(90); expect(v.angle).toBe(180);
    expect(alphaAt(h, 0.01)).toBe(1);
    expect(alphaAt(v, 0)).toBe(0); expect(alphaAt(v, 0.176)).toBeCloseTo(0.5, 5); expect(alphaAt(v, 0.5)).toBe(1);
    expect(parseAlphaGradients('url("tile.png")')).toEqual([]);
    expect(parseAlphaGradients('none')).toEqual([]);
  });
  it('resolves px stops on each layer against its own gradient line', () => {
    const veil = 'linear-gradient(0deg, rgb(0, 0, 0), rgba(0, 0, 0, 0.78) 38.4px, rgba(0, 0, 0, 0.38) 76.8px, rgba(0, 0, 0, 0) 128px)';
    const g = parseAlphaGradient(veil, a => lineLength(a, 320, 320))!;
    expect(g.stops.at(-1)!.t).toBeCloseTo(0.4, 5);
    expect(lineLength(90, 400, 100)).toBeCloseTo(400, 5);
    expect(lineLength(180, 400, 100)).toBeCloseTo(100, 5);
  });
  it('blur(10px) on a 640 bitmap shown 320 px wide samples a coarse mip level, none without blur', () => {
    expect(blurLod(10, 0.5)).toBeCloseTo(Math.log2(25), 5);
    expect(blurLod(0, 0.5)).toBe(0);
    expect(blurOf('blur(10px)')).toBe(10); expect(blurOf('none')).toBe(0);
    expect(brightnessOf('grayscale(1) brightness(0.8)')).toBeCloseTo(0.8, 5); expect(brightnessOf('none')).toBe(1);
  });
});

describe('Servizi: residency of the surfaces', () => {
  it('measures the gap between a box and the viewport in both directions', () => {
    expect(viewportGap(1000, 400, 800, 900)).toBe(0);
    expect(viewportGap(3000, 400, 0, 900)).toBe(2100);
    expect(viewportGap(0, 400, 2000, 900)).toBe(1600);
    expect(RESIDENCY.far).toBeGreaterThan(RESIDENCY.near);
  });
});

describe('Servizi: shaders that Direct3D 11 (ANGLE on Windows) can link', () => {
  it('no GLSL function takes an array parameter (it crashed the GPU process on an RTX 3070 Ti)', async () => {
    const shaders = await import('../shaders');
    for (const [name, src] of Object.entries(shaders)) {
      if (typeof src !== 'string') continue;
      for (const m of src.matchAll(/\b(?:float|vec[234]|void|int|bool)\s+\w+\s*\(([^)]*)\)\s*\{/g))
        expect(/\[\s*\d+\s*\]/.test(m[1]), `${name}: ${m[0]}`).toBe(false);
    }
  });
});
