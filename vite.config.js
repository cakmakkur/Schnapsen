import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: 'schnapsen/dist/',

  // for hostinger
  base: '/',

  build: {
    minify: false // Disable minification
  }
})
