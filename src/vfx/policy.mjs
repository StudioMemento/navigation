/**
 * Whether a visit gets the GPU effects (R15). The DOM page is complete without them (photos, type, navigation, focus),
 * so they are left out where they would cost more than they give. Reduced motion, forced colours, missing WebGL2 and
 * software graphics are decided later by each renderer, as before.
 *
 *   ?vfx=off              the DOM page, for comparisons and support
 *   ?vfx=low|medium|high  the effects on a pinned profile (also with software graphics)
 *   Save-Data             the DOM page
 *   device memory < 2 GB  the DOM page; 2 GB starts on the low profile (Chromium reports it, Safari does not)
 *
 * @param {{search?: string, nav?: {connection?: {saveData?: boolean}, deviceMemory?: number}}} [env]
 * @returns {{enabled: boolean, reason?: string, quality?: 'low'|'medium'|'high', pinned?: boolean}}
 */
export function vfxPolicy({ search = globalThis.location?.search ?? '', nav = globalThis.navigator ?? {} } = {}) {
  const value = new URLSearchParams(search).get('vfx');
  if (value === 'off' || value === '0' || value === 'false') return { enabled: false, reason: 'off' };
  if (value === 'low' || value === 'medium' || value === 'high') return { enabled: true, quality: value, pinned: true };
  if (nav.connection?.saveData) return { enabled: false, reason: 'save-data' };
  const memory = nav.deviceMemory;
  if (typeof memory === 'number' && memory > 0 && memory < 2) return { enabled: false, reason: 'memory' };
  if (typeof memory === 'number' && memory > 0 && memory <= 2) return { enabled: true, quality: 'low', pinned: false };
  return { enabled: true, pinned: false };
}

/** The profile a renderer starts on: the policy's floor wins over the device guess unless the visit pinned one. */
export function startingQuality(guess, policy) {
  if (policy?.pinned && policy.quality) return policy.quality;
  const order = ['low', 'medium', 'high'];
  return policy?.quality && order.indexOf(policy.quality) < order.indexOf(guess) ? policy.quality : guess;
}
