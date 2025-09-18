import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    target: 'es2019',
    cssMinify: true,
    rollupOptions: {
      treeshake: true,
    },
    chunkSizeWarningLimit: 4096,
  },
})
