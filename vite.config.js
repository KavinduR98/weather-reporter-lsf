import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  define: {
    'process.env.VITE_WEATHER_API_KEY': JSON.stringify(process.env.VITE_WEATHER_API_KEY),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
  }
})
