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
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('mermaid')) return 'mermaid'
            if (id.includes('js-beautify') || id.includes('sql-formatter') || id.includes('@ltd/j-toml') || id.includes('yaml')) {
              return 'format-parsers'
            }
            if (id.includes('qrcode.react') || id.includes('jsqr')) return 'qr-tools'
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 4096,
  },
})
