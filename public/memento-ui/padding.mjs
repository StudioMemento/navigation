// R20: the site's margins, as a share of the viewport width on each side; the content keeps the rest.
//   mobile 10 / 80 / 10, tablet 15 / 70 / 15, desktop 20 / 60 / 20, ultrawide: the Start page's column
// The background of letters lives in these margins and fades out where the content starts (letters.mjs); the name
// composed during the page change spans exactly the content between them (scripts/scene-material.mjs). The Start page
// is the reference at both ends: on a phone the wordmark, the navbar and the content of every page share its 80%; on an
// ultrawide screen every page takes its centred 1280 px column, and the margins are what is left (at least 20%).
export const PADDING = Object.freeze({ mobile: 0.1, tablet: 0.15, desktop: 0.2 });
/** Width of the Start page's content on wide screens (.content-width: min(80%, 1280px)); site.css uses the same. */
export const START_COLUMN = 1280;
/** Ultrawide: at least 1600 px wide and 2.1:1 (2560×1080, 3440×1440, 3840×1600, 5120×1440…). Same rule in site.css. */
export const ULTRAWIDE = Object.freeze({ width: 1600, ratio: 2.1 });

/** The margin of one side, as a fraction of the width: the same rule for every page and for the page change.
 *  Self-contained: scene-head inlines its source in every page. */
export function paddingOf(width, height) {
  if (width < 768) return 0.1;
  if (width >= 1600 && width / Math.max(1, height) >= 2.1) return Math.max(0.2, (width - 1280) / 2 / width);
  if (width < 1280) return 0.15;
  return 0.2;
}
