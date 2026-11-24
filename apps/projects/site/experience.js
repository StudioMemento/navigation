import { experienceFor } from './project-layout.js';

/**
 * Experience player for one project section: a site (iframe), a video (embed or file) or a 3D model (model-viewer).
 * Nothing loads before the explicit start, so the page stays light on phones. The expanded view uses the Fullscreen
 * API where it exists and a fixed overlay elsewhere (iOS); while expanded, the VFX engine and the background pause
 * (html[data-demo-expanded=true], as in LevelUp) and the Tide host does not take wheel or swipe gestures.
 */
const SANDBOX = 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-downloads';
const withParam = (url, key, value) => {
  try { const u = new URL(url); u.searchParams.set(key, value); return u.href; } catch { return url; }
};
let modelViewer = null;

export class ExperiencePlayer {
  constructor({ announce = () => {}, onChange = () => {} } = {}) {
    this.announce = announce; this.onChange = onChange;
    this.section = null; this.board = null; this.data = null; this.media = null;
    this.timer = 0; this.generation = 0; this.expanded = false; this.native = false;
    document.addEventListener('fullscreenchange', () => {
      if (this.native && document.fullscreenElement !== this.board) this.collapse(true);
    });
    document.addEventListener('webkitfullscreenchange', () => {
      if (this.native && document.webkitFullscreenElement !== this.board) this.collapse(true);
    });
  }

  /** Binds the section of the project now on screen (any previous media is dropped). */
  attach(section, project) {
    this.detach();
    this.section = section; this.board = section?.querySelector('.experience-board:not(.is-placeholder)') || null;
    this.data = this.board ? experienceFor(project) : null;
  }

  detach() {
    if (this.expanded) this.collapse();
    clearTimeout(this.timer); this.generation++;
    this.media?.remove(); this.media = null;
    this.section = this.board = this.data = null;
  }

  get live() { return !!this.media; }

  async start() {
    const board = this.board, x = this.data;
    if (!board || !x || this.media) return;
    const token = ++this.generation;
    const stage = board.querySelector('.experience-stage'), status = board.querySelector('.experience-status');
    let media;
    if (x.type === 'model') {
      status.hidden = false; status.textContent = 'Caricamento del modello…';
      try { modelViewer ??= import('./vendor/model-viewer.min.js'); await modelViewer; }
      catch { if (token === this.generation) this.fail(); return; }
      if (token !== this.generation) return;
      media = document.createElement('model-viewer');
      Object.entries({ src: x.src, poster: x.poster, alt: x.name, 'camera-controls': '', 'touch-action': 'pan-y', 'auto-rotate': '', 'interaction-prompt': 'none', 'shadow-intensity': '0.6', exposure: '1' })
        .forEach(([k, v]) => media.setAttribute(k, v));
      media.addEventListener('load', () => this.ready(token), { once: true });
      media.addEventListener('error', () => this.fail(token), { once: true });
    } else if (x.type === 'video' && !x.embed && x.src) {
      media = document.createElement('video');
      Object.assign(media, { src: x.src, poster: x.poster, controls: true, playsInline: true, autoplay: true, preload: 'metadata' });
      media.setAttribute('playsinline', '');
      media.addEventListener('loadeddata', () => this.ready(token), { once: true });
      media.addEventListener('error', () => this.fail(token), { once: true });
    } else {
      media = document.createElement('iframe');
      media.title = `${x.name} — ${x.kind}`;
      media.referrerPolicy = 'strict-origin-when-cross-origin';
      media.allow = 'fullscreen; autoplay; encrypted-media; picture-in-picture; xr-spatial-tracking';
      if (x.type === 'web') media.setAttribute('sandbox', SANDBOX);
      media.addEventListener('load', () => this.ready(token), { once: true });
      media.src = x.type === 'video' ? withParam(x.embed, 'autoplay', '1') : (x.embed || x.url);
    }
    media.className = 'experience-media';
    status.hidden = false; status.textContent = x.type === 'web' ? 'Caricamento dell’esperienza…' : x.type === 'video' ? 'Caricamento del video…' : status.textContent;
    board.setAttribute('aria-busy', 'true');
    board.classList.add('is-live');
    stage.replaceChildren(media); this.media = media;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.fail(token), 20000);
    this.announce(`${x.name}: ${x.kind.toLowerCase()} avviato`);
    this.onChange(board);
    // keyboard users land inside the experience
    if (x.type !== 'web') media.focus?.({ preventScroll: true });
  }

  ready(token) {
    if (token !== this.generation || !this.board) return;
    clearTimeout(this.timer);
    // two paint opportunities, so the iframe's first blank surface is never shown (LevelUp player)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (token !== this.generation || !this.board) return;
      this.board.classList.add('is-ready');
      this.board.querySelector('.experience-status').hidden = true;
      this.board.setAttribute('aria-busy', 'false');
    }));
  }

  fail(token = this.generation) {
    if (token !== this.generation || !this.board) return;
    clearTimeout(this.timer);
    const status = this.board.querySelector('.experience-status');
    status.hidden = false;
    status.innerHTML = '';
    status.append('Non si carica qui. ');
    const link = document.createElement('a');
    link.href = this.data.link; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Apri in una nuova scheda';
    status.append(link);
    this.board.setAttribute('aria-busy', 'false');
  }

  async expand() {
    const board = this.board;
    if (!board || this.expanded) return;
    if (!this.media) await this.start();
    this.expanded = true;
    board.querySelector('.experience-exit').hidden = false;
    document.documentElement.dataset.demoExpanded = 'true';
    document.dispatchEvent(new CustomEvent('memento:overlay-change'));
    const request = board.requestFullscreen || board.webkitRequestFullscreen;
    if (request && (document.fullscreenEnabled || document.webkitFullscreenEnabled)) {
      try { await request.call(board); this.native = true; }
      catch { this.native = false; }
    }
    if (!this.native) {
      this.scroll = window.scrollY;
      board.classList.add('is-expanded');
      document.documentElement.classList.add('experience-open');
    }
    board.querySelector('.experience-exit').focus({ preventScroll: true });
    this.onChange(board);
  }

  collapse(fromBrowser = false) {
    const board = this.board;
    if (!this.expanded) return;
    this.expanded = false;
    if (this.native && !fromBrowser) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (document.fullscreenElement || document.webkitFullscreenElement) exit?.call(document);
    }
    if (!this.native && board) {
      board.classList.remove('is-expanded');
      document.documentElement.classList.remove('experience-open');
      window.scrollTo({ top: this.scroll ?? window.scrollY, behavior: 'instant' });
    }
    this.native = false;
    document.documentElement.dataset.demoExpanded = 'false';
    document.dispatchEvent(new CustomEvent('memento:overlay-change'));
    if (board) {
      board.querySelector('.experience-exit').hidden = true;
      this.section?.querySelector('[data-action="experience-expand"]')?.focus({ preventScroll: true });
      this.onChange(board);
    }
  }
}
