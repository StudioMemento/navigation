import { WORLDS } from './config.js';
import { escapeHtml as e, eyebrow, icon, link } from './ui.js';

export function renderWorld(id = 'memento') {
  const index = Math.max(0, WORLDS.findIndex(world => world.id === id));
  const world = WORLDS[index];
  const previous = WORLDS[(index + WORLDS.length - 1) % WORLDS.length];
  const next = WORLDS[(index + 1) % WORLDS.length];
  const poster = `./assets/dioramas/${world.id}.webp`;
  return `<section class="world-slide" data-world="${world.id}" aria-label="Mondo ${e(world.label)}">
    <img class="world-background" src="./assets/obsidian-square.webp" alt="" aria-hidden="true">
    <div class="world-core"><p class="world-topline">Memento / Design studio</p><div class="world-title" aria-hidden="true">${world.title}</div><div class="world-model"><img src="${poster}" alt="Diorama ${e(world.label)}" width="800" height="800" fetchpriority="high"><canvas aria-hidden="true"></canvas></div><div class="world-outline" aria-hidden="true" style="--poster:url('${poster}')"><span>${world.title}</span></div></div>
    <div class="world-bottom page-width"><div class="world-copy"><div>${eyebrow(world.id === 'memento' ? 'Identità. Immagini. Esperienze.' : world.label)}<h1 tabindex="-1">${e(world.kicker)}</h1></div><p>${e(world.description)}</p>${link(world.cta, world.href, { primary: true })}</div>
    <nav class="world-pager" aria-label="Esplora i mondi"><a href="#/mondi/${previous.id}" class="world-step" aria-label="Mondo precedente: ${previous.label}">${icon('caret-left')}<span>${previous.label}</span></a><div class="world-index"><span>${String(index + 1).padStart(2, '0')}</span><span>/ ${String(WORLDS.length).padStart(2, '0')}</span><span class="world-index-label">Esplora i mondi</span></div><a href="#/mondi/${next.id}" class="world-step" aria-label="Mondo successivo: ${next.label}"><span>${next.label}</span>${icon()}</a></nav></div>
  </section>`;
}

/** The poster is the first frame. WebGL is a progressive enhancement, loaded on demand. */
export function mountWorld(id) {
  const world = WORLDS.find(w => w.id === id) || WORLDS[0];
  const model = document.querySelector('.world-model');
  const core = document.querySelector('.world-core');
  let disposed = false;
  let renderer;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timer = setTimeout(async () => {
    if (disposed || reducedMotion || navigator.connection?.saveData) return;
    try {
      const { DioramaRenderer } = await import('./renderer.js');
      if (!disposed) renderer = new DioramaRenderer(model, core, world);
    } catch { /* The supplied high-quality poster remains usable. */ }
  }, 250);
  return () => { disposed = true; clearTimeout(timer); renderer?.dispose(); };
}
