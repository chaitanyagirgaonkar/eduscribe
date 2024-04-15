import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// https://eduscribe.onrender.com/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': "https://eduscribe-beryl.vercel.app/api"
    }
  }
})
