import { defineConfig } from 'vite';
export default defineConfig({ base: '/', build: { target: 'es2022', chunkSizeWarningLimit: 650, manifest: true }, server: { host: '0.0.0.0', allowedHosts: true } });
