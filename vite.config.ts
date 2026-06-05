import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tsPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/GrMine-Docs/',
  server: {
    host: true,
  },
})
