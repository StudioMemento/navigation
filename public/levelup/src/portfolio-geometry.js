export function portfolioEdge(count) {
  // Two additional neighbours are already in place before the edge reveal.
  // The cyclic reset happens farther out, while the card is completely hidden.
  return Math.min(3.2, count / 2 - .06);
}
