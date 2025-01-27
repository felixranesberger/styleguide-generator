import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist/assets',
    emptyOutDir: true,
    lib: {
      entry: {
        'client': resolve(__dirname, 'client/main.ts'),
        'client-fullpage': resolve(__dirname, 'client/fullpage.ts'),
      },
      formats: ['es'],
      name: 'Styleguide',
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
  plugins: [tailwindcss()],
})
