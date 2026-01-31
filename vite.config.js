import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Il base deve corrispondere esattamente al nome della tua repository su GitHub
  base: '/react-redux-shopCv/',
})