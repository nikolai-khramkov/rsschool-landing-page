import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: false,
    cssMinify: false,
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        projects: resolve('projects.html'),
      },
    },
  },
})
