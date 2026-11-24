// R20: the site's margins, as a share of the viewport width on each side; the content keeps the rest.
//   mobile 10 / 80 / 10, tablet 15 / 70 / 15, desktop 20 / 60 / 20, ultrawide 30 / 40 / 30
// The background of letters lives in these margins and fades out where the content starts (letters.mjs); the name
// composed during the page change spans exactly the content between them (scripts/scene-material.mjs). On mobile the
// wordmark, the navbar and the content of every page share the same 80% (site.css), as on Start.
export const PADDING = Object.freeze({ mobile: 0.1, tablet: 0.15, desktop: 0.2, ultrawide: 0.3 });

/** The margin of one side, as a fraction of the width: the same rule for every page and for the page change. */
export function paddingOf(width, height) {
  if (width < 768) return 0.1;
  if (width >= 1600 && width / Math.max(1, height) >= 2.1) return 0.3;
  if (width < 1280) return 0.15;
  return 0.2;
}
