import { drumEdge } from '/js/effects/deck-pose.mjs';

export function portfolioEdge(count) {
  // One neighbour a side; the next card fades in beyond it, and the cyclic reset happens while it is hidden.
  return Math.min(drumEdge('wide'), count / 2 - .06);
}
