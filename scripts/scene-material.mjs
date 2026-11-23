// A single veil and a handful of small facets. The page itself keeps its normal layout.
import { mementoPaths } from '../public/navigation/memento-paths.mjs';

export const seal = `<svg class="mm-seal" viewBox="44 44 131.69 152.94" aria-hidden="true"><defs><linearGradient id="mm-amber" x2=".7" y2="1"><stop stop-color="#ffe8b5"/><stop offset=".46" stop-color="#f8ad65"/><stop offset="1" stop-color="#cf632e"/></linearGradient><pattern id="mm-mesh" width="18" height="16" patternUnits="userSpaceOnUse"><path d="M0 0L18 16H0ZM0 0L9 4 18 0M9 4L5 16" stroke="#743e25" fill="none" stroke-width=".58"/></pattern></defs><g fill="url(#mm-amber)">${mementoPaths}</g><g fill="url(#mm-mesh)">${mementoPaths}</g></svg>`;

export function createMaterial(art) {
  const layer = document.createElement('div');
  layer.className = 'mm-weave';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = '<div class="mm-veil"></div>' + art;
  const [veil, logo] = layer.children;
  const facets = Array.from({length: 8}, () => layer.appendChild(document.createElement('i')));
  document.body.append(layer);
  return {
    // Keyframes stay on the compositor. A negative delay resumes the same easing after a document swap.
    play(covering, fraction, duration, box) {
      const cx = innerWidth / 2, cy = innerHeight / 2;
      const [x, y, w, h] = box;
      const options = {duration, delay: -duration * fraction, direction: covering ? 'normal' : 'reverse', fill: 'both'};
      const timeline = veil.animate([{opacity: 0}, {opacity: 1}], {...options, easing: 'ease-in-out'});
      const anims = [timeline, logo.animate([
        {opacity: 0, transform: 'translate(-50%, -50%) scale(.91)'},
        {offset: .25, opacity: .04},
        {opacity: 1, transform: 'translate(-50%, -50%) scale(1)'}
      ], options)];
      facets.forEach((facet, i) => {
        const dx = (x + w * ((i * 3 + .5) % 8) / 8) * innerWidth - cx;
        const dy = (y + h * ((i * 5 + .5) % 8) / 8) * innerHeight - cy;
        anims.push(facet.animate([
          {opacity: 0, transform: `translate(${dx}px,${dy}px) rotate(${i * 29}deg)`},
          {offset: .36, opacity: .8},
          {opacity: 0, transform: `translate(${(i % 3 - 1) * 15}px,${(i % 5 - 2) * 10}px) rotate(0deg)`}
        ], {...options, easing: 'ease-in-out'}));
      });
      return {done: timeline.finished, fraction: () => Math.min(1, fraction + (Number(timeline.currentTime) || 0) / duration), cancel() {anims.forEach(a => a.cancel());}};
    },
    remove() {layer.remove();}
  };
}
