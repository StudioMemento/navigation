import { defineConfig } from 'vite';

// One entry (the DOM adapter) and the chunks it imports after the content: the engine (Three.js) and the Ghost Fibers
// background (plain WebGL2).
export default defineConfig({
  build: {
    outDir: '../site/vfx',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: false,
    minify: true,
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'memento-vfx.js' },
    rolldownOptions: { output: { chunkFileNames: '[name]-[hash].js', minify: true } },
  },
});
