import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { lucideIcons } from '../vite/src/lucideIcons.js'

export default defineConfig({
  plugins: [vue(), ...lucideIcons()],
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
    },
  },
})
