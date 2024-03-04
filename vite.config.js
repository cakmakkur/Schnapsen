import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: 'schnapsen/dist/',

  // for hostinger
  base: '/',
  // and on hostinger, change Asset => asset

  // for live server:
  // base: 'dist/',

  build: {
    minify: false // Disable minification
  }
})
