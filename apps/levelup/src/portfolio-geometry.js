// Large coverflow frames, with distant neighbours compressed into depth.
export function portfolioStride(viewport, width) {
  return width * .60;
}

export function portfolioPose(distance, stride, height) {
  const amount = Math.abs(distance);
  return {
    // Monotonic travel avoids outward bows; compression keeps the arc connected.
    x: Math.sign(distance) * stride * (1 - .76 ** amount) / (1 - .76),
    y: height * .025 * Math.min(amount, 3),
    scale: .82 ** amount,
    yaw: -Math.sign(distance) * Math.min(42, amount * 26),
  };
}

export function portfolioEdge(count) {
  // Two additional neighbours are already in place before the edge reveal.
  // The cyclic reset happens farther out, while the card is completely hidden.
  return Math.min(4.7, count / 2 - .06);
}
