import { describe, expect, it, vi } from 'vitest';
import { SurfaceRegistry } from '../registry';

// R19: Start registers its surfaces; the site's shared engine (navigation) draws them.
describe('surface registry', () => {
  it('announces surfaces and layout changes to the engine that subscribes', () => {
    const registry = new SurfaceRegistry();
    const heard = vi.fn();
    const stop = registry.subscribe(heard);
    const el = {} as HTMLElement;
    registry.add(el, { kind: 'title' });
    expect(registry.surfaces.get(el)).toEqual({ kind: 'title' });
    registry.invalidate(el);
    registry.remove(el);
    expect(heard.mock.calls.map(c => c[0])).toEqual(['surfaces', 'layout', 'surfaces']);
    stop();
    registry.add(el, { kind: 'card' });
    expect(heard).toHaveBeenCalledTimes(3);
  });
});
