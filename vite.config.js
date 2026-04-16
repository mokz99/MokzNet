import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,      // Set your preferred port here
    strictPort: true, // If true, Vite will quit if the port is already in use instead of finding a new one
  }
})
