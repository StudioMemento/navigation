import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({
  base: '/',
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
