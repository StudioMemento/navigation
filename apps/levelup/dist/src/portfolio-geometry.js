// Compact cards keep their 16:9 height. The visible arc expands to the safe width.
export function portfolioStride(viewport, width) {
  const neighbours = Math.max(1, Math.min(3, Math.round(viewport / width * .7)));
  return (viewport - width * .6) / (2 * neighbours);
}

export function portfolioPose(distance, stride, height) {
  const amount = Math.abs(distance);
  return {
    // Linear travel avoids the former outward bow at the centre handoff.
    x: distance * stride,
    y: height * .012 * Math.min(amount, 4),
    scale: .94 ** amount,
    yaw: -Math.sign(distance) * Math.min(24, amount * 9.5),
  };
}

export function portfolioEdge(count) {
  // Two additional neighbours are already in place before the edge reveal.
  // The cyclic reset happens farther out, while the card is completely hidden.
  return Math.min(4.7, count / 2 - .06);
}
