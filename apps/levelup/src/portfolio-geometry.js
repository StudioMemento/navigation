// Project the outside edge of each immediate neighbour onto the content gutter.
export function portfolioStride(viewport, width, contentWidth = viewport, perspective = 2000) {
  if (viewport < 768) return width * .64;
  const half = width * .84 / 2;
  const yaw = 22 * Math.PI / 180;
  const outside = half * Math.cos(yaw) / (1 - half * Math.sin(yaw) / perspective);
  return contentWidth / 2 - outside;
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
