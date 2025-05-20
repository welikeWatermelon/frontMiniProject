// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // 현재 프로젝트 루트를 @로 지정
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // ✅ 백엔드 Spring 서버 주소
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api') // 경로 유지
      }
    }
  }
})
