import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { lucideIcons } from '../vite/src/lucideIcons.js'

export default defineConfig({
  plugins: [vue(), ...lucideIcons()],
  build: {
    lib: {
      entry: './src/index.js',
      name: 'FrappeUIExt',
      formats: ['es'],
      fileName: (format) => `frappe-ui-ext.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue', 'vue-router', '@yletlabs/frappe-ui', 'socket.io-client', '@vueuse/core'],
    },
  },
})
