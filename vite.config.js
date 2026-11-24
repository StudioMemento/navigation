import { mediaAssets } from './scripts/media-assets.mjs';
import { sceneHead, lettersLayer } from './scripts/scene-head.mjs';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
export default defineConfig({
  base: '/',
  plugins: [mediaAssets(), {
    name: 'memento-first-paint',
    async transformIndexHtml(html) {
      // Keep the same pure layout functions in the inline first frame and the client.
      const { homeMarkup, homeNav } = await import(pathToFileURL(resolve('scripts/home-markup.mjs')).href);
      // R17: the Home carousel draws effects (the page change waits for their first frame, scene-head)
      return html.replace('<html lang="it">', '<html lang="it" data-mm-effects>').replace('<!-- MEMENTO_SCENE -->', () => sceneHead)
        .replace('<!-- MEMENTO_CARDS -->', homeMarkup)
        .replace('<!-- MEMENTO_NAV -->', homeNav)
        // R20: the background of letters (public/memento-ui/letters.mjs, not bundled: the pages load the same file)
        .replace('<!-- MEMENTO_LETTERS -->', () => lettersLayer + '<script type="module" src="/memento-ui/letters.mjs"></script>');
    }
  }],
  build: {
    target: 'es2022', chunkSizeWarningLimit: 650, manifest: true,
    rolldownOptions: {
      input: {home:resolve('index.html'), effects:resolve('src/surfaces/index.ts')},
      preserveEntrySignatures: 'strict',
      output: {entryFileNames: chunk => chunk.name === 'effects' ? 'memento-ui/effects.mjs' : 'assets/compiled/[name]-[hash].js',chunkFileNames:'assets/compiled/[name]-[hash].js',assetFileNames:'assets/compiled/[name]-[hash][extname]'}
    }
  },
  server: {host:'0.0.0.0',allowedHosts:true}
});
