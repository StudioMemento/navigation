import { defineConfig } from 'vite';

// The Studio is one module of the site. It is built into public/studio/app/; scripts/build.mjs reads the manifest
// to write public/studio/index.html. The glyph field comes from the page itself (/js/site.mjs), never bundled.
export default defineConfig({
  base: '/studio/app/',
  publicDir: false,
  assetsInclude: ['**/*.glb', '**/*.bin'],
  build: {
    outDir: '../public/studio/app',
    emptyOutDir: true,
    manifest: true,
    target: 'es2022',
    chunkSizeWarningLimit: 560,
    rollupOptions: {
      input: 'src/studio.js',
      external: ['/js/site.mjs'],
      output: { manualChunks: { three: ['three'] } },
    },
  },
});
