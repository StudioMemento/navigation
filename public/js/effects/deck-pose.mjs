// The two sliders of the site, shared by Services, LevelUp and Portfolio.
//
// deck: cards in perspective. The active card is in front; its neighbours stand behind it, partly covered, turned so
//   that their outer edge comes toward the camera: they read as close, around the active one. Changing card is a move
//   in depth: the active card steps back and turns aside while the next one comes forward from behind, the two parting
//   for a moment so they never cross. Never a flat pan.
// pages: one card on the padding, no neighbours in sight. The next card replaces it in place: the old one recedes and
//   fades, the new one comes forward; the text arrives last.
const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export function deckPose(distance, width, {compact = false} = {}) {
  const a = Math.abs(distance), s = Math.sign(distance), near = Math.min(a, 1), far = Math.max(0, a - 1);
  const spread = width * (compact ? .5 : .42), step = width * (compact ? .34 : .3);
  const part = width * (compact ? .14 : .24) * Math.sin(Math.PI * near);
  return {
    x: s * (spread * near + step * far + part),
    y: 0,
    z: -width * ((compact ? .36 : .42) * near + .16 * far),
    yaw: -s * (40 * near + 12 * Math.min(far, 1.5)),
    scale: 1,
    opacity: a <= 1.7 ? 1 : Math.max(0, 1 - (a - 1.7) / .8),
    light: 1 - .55 * smooth(0, 1, a),
    text: 1 - smooth(0, .45, a)
  };
}

export function pagesPose(distance, width) {
  const a = Math.abs(distance), s = Math.sign(distance), t = Math.min(a, 1);
  return {
    x: s * width * .045 * t,
    y: 0,
    z: -width * .16 * t,
    yaw: -s * 8 * t,
    scale: 1,
    opacity: 1 - smooth(.12, .85, a),
    light: 1 - .6 * smooth(0, .8, a),
    text: 1 - smooth(0, .3, a)
  };
}

export const perspectiveFor = width => Math.max(900, width * 1.7);

// One transform: centred on its slot, projected around its own centre.
export function poseTransform(pose, perspective) {
  return 'translate3d(-50%,0,0) perspective(' + perspective.toFixed(1) + 'px) translate3d(' + pose.x.toFixed(3) + 'px,' +
    pose.y.toFixed(3) + 'px,' + pose.z.toFixed(3) + 'px) rotateY(' + pose.yaw.toFixed(3) + 'deg)' + (pose.scale !== 1 ? ' scale(' + pose.scale.toFixed(5) + ')' : '');
}

// How far a projected card can reach above and below its slot, for masks that clip to their box.
export function poseBleed(poseAt, width, height, perspective, edge) {
  let top = 0, bottom = 0;
  for (let sample = 0; sample <= 80; sample++) {
    const pose = poseAt((sample / 80) * edge);
    const toward = pose.z + (width * pose.scale / 2) * Math.abs(Math.sin(pose.yaw * Math.PI / 180));
    const half = (height * pose.scale / 2) * perspective / Math.max(1, perspective - toward);
    top = Math.max(top, half - height / 2 - pose.y);
    bottom = Math.max(bottom, half - height / 2 + pose.y);
  }
  return {top, bottom};
}
