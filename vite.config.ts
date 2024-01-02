import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: 'public',
  // https://cn.vitejs.dev/config/server-options.html#server-proxy
  server:{
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': 'http://api-driver.marsview.cc'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()],

})
