import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/admin": "http://localhost:4001",
      "/user": "http://localhost:4001",
      "/v1": "http://localhost:4001",
      "/refresh": "http://localhost:4001",
    },
  },
})
