import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: 'http://localhost:5173/?chrome-devtools-device=iPhone%2014%20Pro%20Max&chrome-devtools-device-scale=1'
  }
})