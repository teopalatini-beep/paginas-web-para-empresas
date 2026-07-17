import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: path.resolve(__dirname, '../06-cerrajeria'),
    emptyOutDir: true,
    assetsDir: 'assets',
    target: 'es2020',
  },
})
