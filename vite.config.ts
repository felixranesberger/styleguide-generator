import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist/assets',
    emptyOutDir: true,
    lib: {
      entry: {
        // 'styleguide': resolve(__dirname, 'lib/index.ts'),
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
  // plugins: [dts({ rollupTypes: true })],
})
