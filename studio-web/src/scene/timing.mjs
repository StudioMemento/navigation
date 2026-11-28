export const DURATION = 3.25;
export function sweepHeight(t) {
  const u = Math.max(0, Math.min(1, (t - 0.115) / 0.81));
  return -0.2 + 3.64 * u * u * (3 - 2 * u);
}
