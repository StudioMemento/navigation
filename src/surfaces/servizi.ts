/**
 * Servizi extensions, pure functions (tested). Servizi has far more surfaces than START or LevelUp (six bundle boards,
 * six carousels of service boards, the catalogue grid): photographs are uploaded at the resolution the GPU draws them
 * at, and only the surfaces near the viewport keep their textures.
 */

export interface SourceCandidate { url: string; w: number }

/** `w` candidates of a srcset (density candidates and bare URLs are ignored). */
export function srcsetCandidates(srcset: string): SourceCandidate[] {
  const out: SourceCandidate[] = [];
  for (const part of srcset.split(/,(?=\s*[^\s,])/)) {
    const m = /^\s*(\S+)\s+(\d+(?:\.\d+)?)w\s*$/.exec(part);
    if (m) out.push({ url: m[1], w: Number(m[2]) });
  }
  return out.sort((a, b) => a.w - b.w);
}

const same = (a: string, b: string) => {
  try { return new URL(a, 'http://x/').href === new URL(b, 'http://x/').href; } catch { return a === b; }
};

/**
 * The bitmap the GPU needs for a photograph drawn `need` device px wide. The source the browser already chose is kept
 * when it is not much larger (no second download); otherwise the smallest candidate that still covers `need`.
 * Without a usable srcset, the current source.
 */
export function pickSource(srcset: string, current: string, need: number, slack = 2.2): string {
  const list = srcsetCandidates(srcset);
  if (!list.length || !(need > 0)) return current;
  const chosen = list.find(c => same(c.url, current));
  if (chosen && chosen.w >= need * 0.98 && chosen.w <= need * slack) return current;
  const fit = list.find(c => c.w >= need * 0.98) ?? list[list.length - 1];
  return chosen && chosen.w === fit.w ? current : fit.url;
}

/**
 * Mip level that reproduces a CSS `blur(sigma)` of an image shown at `cssPerTexel` CSS px per texel of level 0: the
 * bilinear footprint of two texels covers about 2.5 sigma.
 */
export function blurLod(sigma: number, cssPerTexel: number) {
  if (!(sigma > 0) || !(cssPerTexel > 0)) return 0;
  return Math.max(0, Math.log2((1.25 * sigma) / cssPerTexel));
}

/** Gaussian blur radius of a computed `filter` (px), 0 without one. */
export function blurOf(filter: string) {
  const m = /blur\(([\d.]+)px\)/.exec(filter || '');
  return m ? parseFloat(m[1]) : 0;
}

/** brightness() of a computed `filter` (1 without one): on black, it acts as an opacity. */
export function brightnessOf(filter: string) {
  const m = /brightness\(([\d.]+)(%?)\)/.exec(filter || '');
  return m ? parseFloat(m[1]) / (m[2] ? 100 : 1) : 1;
}

/**
 * Residency of a surface: vertical gap (px) between its document box and the viewport. Surfaces are prepared within
 * `near` viewport heights and release their GPU memory beyond `far`. R24: in the browser's idle time the engine also
 * prepares those within `ahead`, before the scroll needs them (they were measured, painted and uploaded during the
 * scroll itself: Servizi scrolled at 20 frames a second on a phone).
 */
export function viewportGap(top: number, height: number, scrollY: number, viewH: number) {
  if (top + height < scrollY) return scrollY - (top + height);
  if (top > scrollY + viewH) return top - (scrollY + viewH);
  return 0;
}
export const RESIDENCY = { near: 1.25, ahead: 2.25, far: 3 } as const;
