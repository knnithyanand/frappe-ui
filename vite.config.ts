import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { lucideIcons } from './vite/lucideIcons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue(), lucideIcons()],
})
