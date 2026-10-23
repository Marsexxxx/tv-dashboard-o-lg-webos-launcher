import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443 // Evita bucles de recarga en GitHub Codespaces
    }
  },
  build: {
    target: 'es2020', // Compatible con el motor Chromium de LG webOS
    minify: 'esbuild',
    sourcemap: false, // Ahorra memoria RAM en la TV
    cssCodeSplit: false, // Un único archivo CSS carga más rápido al iniciar el launcher
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})