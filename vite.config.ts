import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        [String(process.env.VITE_KAKAO_SEARCH_APP_BASE_URL)]: {
          target: process.env.VITE_KAKAO_SEARCH_API_PROXY,
          changeOrigin: true,
        }
      }
    }
  }
})
