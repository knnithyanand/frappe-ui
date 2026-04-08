import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { lucideIcons } from '../vite/src/lucideIcons.js'

export default defineConfig({
  plugins: [tailwindcss(), vue(), ...lucideIcons()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'FrappeUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `frappe-ui.${format}.js`,
      cssFileName: 'frappe-ui',
    },
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'frappe-ui.css'
          return assetInfo.name || '[name][extname]'
        },
      },
    },
  },
})
