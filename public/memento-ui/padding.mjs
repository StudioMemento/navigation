// R20: the site's margins, as a share of the viewport width on each side; the content keeps the rest.
//   mobile 10 / 80 / 10, tablet 15 / 70 / 15, desktop 20 / 60 / 20, ultrawide 30 / 40 / 30
// R21: forced on the content of every page (site.css --mm-pad, the Home card in src/model.mjs), to be evaluated: the
// background of letters lives in these margins and the name composed during the page change spans the content between
// them. On a phone the wordmark and the navbar share the content's 80%, as on Start.
export const PADDING = Object.freeze({ mobile: 0.1, tablet: 0.15, desktop: 0.2, ultrawide: 0.3 });
/** Ultrawide: at least 1600 px wide and 2.1:1 (2560×1080, 3440×1440, 3840×1600, 5120×1440…). Same rule in site.css. */
export const ULTRAWIDE = Object.freeze({ width: 1600, ratio: 2.1 });

/** The margin of one side, as a fraction of the width: the same rule for every page and for the page change.
 *  Self-contained: scene-head inlines its source in every page. */
export function paddingOf(width, height) {
  if (width < 768) return 0.1;
  if (width >= 1600 && width / Math.max(1, height) >= 2.1) return 0.3;
  if (width < 1280) return 0.15;
  return 0.2;
}
