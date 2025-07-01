import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ▼▼▼ このserverセクションを丸ごと追加 ▼▼▼
  server: {
    proxy: {
      // '/api' で始まるリクエストをNode.jsサーバーに転送
      '/api': {
        target: 'http://localhost:3000', // あなたのNode.js APIサーバーのアドレス
        changeOrigin: true,
      }
    }
  }
})
