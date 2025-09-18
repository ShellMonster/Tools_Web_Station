import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator'

export default defineConfig(({ command }) => {
  const plugins = [react()]

  if (command === 'build') {
    plugins.push(
      javascriptObfuscator({
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: true,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        stringArray: true,
        rotateStringArray: true,
        stringArrayThreshold: 0.75,
      })
    )
  }

  return {
    plugins,
    build: {
      sourcemap: false,
      target: 'es2019',
      cssMinify: true,
      rollupOptions: {
        treeshake: true,
      },
    },
  }
})
