import { mediaAssets } from './scripts/media-assets.mjs';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
// R24: imported by Node itself, not through the bundled config: the scripts (and the names of their files, from their
// content) are then exactly the ones the pages get from scripts/native-page.mjs
const scene = () => import(pathToFileURL(resolve('scripts/scene-head.mjs')).href);
export default defineConfig({
  base: '/',
  plugins: [mediaAssets(), {
    name: 'memento-first-paint',
    async transformIndexHtml(html) {
      // Keep the same pure layout functions in the inline first frame and the client.
      const { homeMarkup, homeNav } = await import(pathToFileURL(resolve('scripts/home-markup.mjs')).href);
      const { sceneHead, lettersLayer } = await scene();
      // R17: the Home carousel draws effects (the page change waits for their first frame, scene-head)
      return html.replace('<html lang="it">', '<html lang="it" data-mm-effects>').replace('<!-- MEMENTO_SCENE -->', () => sceneHead)
        .replace('<!-- MEMENTO_CARDS -->', homeMarkup)
        .replace('<!-- MEMENTO_NAV -->', homeNav)
        // R20/R22: the background of letters, inline right after its layer (scene-head lettersLayer)
        .replace('<!-- MEMENTO_LETTERS -->', () => lettersLayer);
    },
    // R24: the page change and the background of letters are files of their own, named by their content (scene-head)
    async generateBundle() {
      for (const [fileName, source] of Object.entries((await scene()).sceneFiles)) this.emitFile({type:'asset', fileName, source});
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const source = (await scene()).sceneFiles[(req.url || '').split('?')[0].replace(/^\//, '')];
        if (source === undefined) return next();
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        res.end(source);
      });
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
  // R24: the worker of the distance fields with the compiled code (cached for good, vercel.json)
  worker: {format:'es', rolldownOptions:{output:{entryFileNames:'assets/compiled/[name]-[hash].js', chunkFileNames:'assets/compiled/[name]-[hash].js'}}},
  server: {host:'0.0.0.0',allowedHosts:true}
});
