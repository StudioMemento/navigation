export function portfolioStride(viewport, width) {
  return width * (viewport < 768 ? .72 : .85);
}

export function portfolioPose(distance, stride, height) {
  const amount = Math.abs(distance);
  // Retain coverage during the central handoff; this curve joins the outer
  // exponential with the same value and first derivative at distance one.
  const scaleDistance = amount < 1 ? 3 * amount ** 3 - 2 * amount ** 4 : amount;
  return {
    // Monotonic travel avoids outward bows; compression keeps the arc connected.
    x: Math.sign(distance) * stride * (1 - .78 ** amount) / (1 - .78),
    y: height * .025 * Math.min(amount, 3),
    scale: .84 ** scaleDistance,
    yaw: -Math.sign(distance) * Math.min(38, amount * 22),
  };
}

export function portfolioEdge(count) {
  // Two additional neighbours are already in place before the edge reveal.
  // The cyclic reset happens farther out, while the card is completely hidden.
  return Math.min(4.7, count / 2 - .06);
}
