import { defineConfig } from 'vite';

// One entry (the DOM adapter, ~2 kB) and the engine chunk it imports after the content (Three.js, GSAP).
export default defineConfig({
  build: {
    outDir: '../public/vfx',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: false,
    minify: true,
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'memento-vfx.js' },
    rolldownOptions: { output: { chunkFileNames: '[name]-[hash].js', minify: true } },
  },
});
