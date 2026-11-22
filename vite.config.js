import { sceneHead } from './scripts/scene-head.mjs';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
export default defineConfig({
  base: '/',
  plugins: [{
    name: 'memento-first-paint',
    async transformIndexHtml(html) {
      // Keep the same pure layout functions in the inline first frame and the client.
      const { homeMarkup, homeNav } = await import(pathToFileURL(resolve('scripts/home-markup.mjs')).href);
      return html.replace('<!-- MEMENTO_SCENE -->', () => sceneHead)
        .replace('<!-- MEMENTO_CARDS -->', homeMarkup)
        .replace('<!-- MEMENTO_NAV -->', homeNav);
    }
  }],
  build: {
    target: 'es2022', chunkSizeWarningLimit: 650, manifest: true,
    rolldownOptions: {
      input: {home:resolve('index.html'), effects:resolve('src/surfaces/index.ts')},
      preserveEntrySignatures: 'strict',
      output: {entryFileNames: chunk => chunk.name === 'effects' ? 'memento-ui/effects.mjs' : 'assets/[name]-[hash].js'}
    }
  },
  server: {host:'0.0.0.0',allowedHosts:true}
});
