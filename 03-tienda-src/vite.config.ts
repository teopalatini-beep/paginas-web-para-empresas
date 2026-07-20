import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: path.resolve(__dirname, '../03-tienda'),
    emptyOutDir: true,
    assetsDir: 'assets',
    target: 'es2020',
  },
})
