import { defineConfig } from 'vite'

export default defineConfig({
  // Root is already the project directory
  root: '.',
  build: {
    outDir: 'dist',
    // Copy public assets
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  }
})
