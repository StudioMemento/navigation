// The sliders of the site move like the Home: cards in perspective around the active one, which faces the camera.
// Each neighbour is turned with its outer edge toward the camera and set back, and it tucks a little behind the card
// before it (OVERLAP, in card widths): the slider reads as depth, never as a strip being dragged.
//
// The chain is built from its edges. E(u) is where, on screen, the boundary between two cards lands when it is u cards
// from the centre; a card at distance d spans E(d - ½)…E(d + ½), then moves inward by OVERLAP · tuck(d). The turn of
// each card follows its distance; its depth and position are then solved so that its projected edges land there.
// tuck() is flat until half a step, so the two cards that swap places in the middle of a move meet edge to edge, and
// nothing pops when the one in front changes.
const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
const RAD = Math.PI / 180;
export const PERSPECTIVE = 2.4;
export const OVERLAP = .07;
const DEPTH = .3, STEP_DEPTH = .26;
const KINDS = {wide:{sides:1, angles:[50]}, compact:{sides:2, angles:[58, 72]}};
const chains = new Map();

// Rest poses in units of the card width: outer[k] is the screen position of the outer edge of the k-th card.
function chain(kind) {
  if (chains.has(kind)) return chains.get(kind);
  const {sides, angles} = KINDS[kind], outer = [.5], turn = [0];
  for (let k = 1; k <= sides + 3; k++) {
    const angle = angles[Math.min(k, sides) - 1] * RAD, sin = Math.sin(angle), cos = Math.cos(angle);
    const z = -(DEPTH + (k - 1) * STEP_DEPTH);
    // The inner edge (x - cos/2, z - sin/2) projects onto the previous outer edge.
    const x = outer[k - 1] * (PERSPECTIVE - z + sin / 2) / PERSPECTIVE + cos / 2;
    outer.push((x + cos / 2) * PERSPECTIVE / (PERSPECTIVE - z - sin / 2));
    turn.push(angle);
  }
  // Monotone cubic through the boundaries (Fritsch–Butland slopes); the centre segment is flat, slope 1.
  const secant = [1];
  for (let k = 0; k < outer.length - 1; k++) secant.push(outer[k + 1] - outer[k]);
  const slope = outer.map((_, k) => {
    const left = secant[k], right = secant[k + 1] ?? secant[k];
    return k === 0 ? 1 : 2 * left * right / (left + right);
  });
  const result = {sides, outer, turn, secant, slope};
  chains.set(kind, result);
  return result;
}

// Where the boundary u cards from the centre lands on screen.
function boundary(u, {outer, secant, slope}) {
  const v = Math.abs(u), s = Math.sign(u);
  if (v <= .5) return u;
  const last = outer.length - 1, k = Math.floor(v - .5), t = v - .5 - k;
  if (k >= last) return s * (outer[last] + (v - .5 - last) * secant[last]);
  const t2 = t * t, t3 = t2 * t;
  return s * ((2 * t3 - 3 * t2 + 1) * outer[k] + (t3 - 2 * t2 + t) * slope[k] +
    (-2 * t3 + 3 * t2) * outer[k + 1] + (t3 - t2) * slope[k + 1]);
}

// The angle has a continuous first derivative at the front and at each side pose.
function turnAt(a, {turn}) {
  const k = Math.min(Math.floor(a), turn.length - 2), t = Math.min(1, a - k);
  return turn[k] + (turn[k + 1] - turn[k]) * smooth(t);
}
// How far a card at distance a tucks behind the cards before it, in steps of OVERLAP.
function tuck(a) {
  if (a <= 1) return smooth((a-.5)/.5);
  if (a >= 2) return a;
  const t = a-1;
  return 1+t*t*(2-t);
}

export function drumPose(distance, width, kind = 'wide') {
  const ch = chain(kind), a = Math.abs(distance), side = Math.sign(distance) || 1;
  const theta = turnAt(a, ch), yaw = -side * theta, inward = side * OVERLAP * tuck(a);
  // Projected edges of this card and the turn it has: solve its centre (x, z).
  const left = boundary(distance - .5, ch) - inward, right = boundary(distance + .5, ch) - inward;
  const cos = Math.cos(yaw), sigma = Math.sin(yaw) / 2, P = PERSPECTIVE;
  // left·(P - z - σ) = P·(x - cos/2),  right·(P - z + σ) = P·(x + cos/2)
  const z = P - (P * cos - (left + right) * sigma) / Math.max(1e-6, right - left);
  const x = (left * (P - z - sigma)) / P + cos / 2;
  const sides = ch.sides;
  return {
    x: x * width,
    y: 0,
    z: z * width,
    yaw: yaw / RAD,
    scale: 1,
    opacity: a <= sides + .25 ? 1 : Math.max(0, 1 - (a - sides - .25) / .5),
    visible: a < sides + .75
  };
}
// The half extent on screen of the active card and its first `sides` neighbours, in card widths.
export const drumReach = (kind = 'wide', sides = KINDS[kind].sides) => chain(kind).outer[sides] - OVERLAP * sides;
export const drumEdge = (kind = 'wide') => KINDS[kind].sides + .75;
// The card width that makes the strip (active card and every neighbour) exactly as wide as `room`.
export const drumFit = (room, kind = 'compact') => room / 2 / drumReach(kind);
export const perspectiveFor = width => width * PERSPECTIVE;

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
    const toward = pose.z + (width * pose.scale / 2) * Math.abs(Math.sin(pose.yaw * RAD));
    const half = (height * pose.scale / 2) * perspective / Math.max(1, perspective - toward);
    top = Math.max(top, half - height / 2 - pose.y);
    bottom = Math.max(bottom, half - height / 2 + pose.y);
  }
  return {top, bottom};
}
