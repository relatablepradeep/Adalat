import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/scaler/translate': 'http://localhost:4000',
    },
    hmr: {
      overlay: false
    }
  },
  json: {
    stringify: true
  }
})
