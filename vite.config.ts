import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// CI sets VITE_BASE_PATH to /repo-name/ for GitHub project pages; local dev uses /
export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE_PATH ?? '/',
})
