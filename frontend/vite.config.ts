import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig(({command, mode})=>{
  let env = loadEnv(mode, process.cwd());
  return{
    plugins: [
      vue(),
      vueDevTools(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/access/icons')],
        symbolId: 'icon-[name]',
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    //代理跨域
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        [env.VITE_BASE_URL]: {
          //获取数据的服务器地址设置
          target: env.VITE_BASE_SERVE,
          //需要代理跨域
          changeOrigin: true,
        },
        [env.VITE_ACCESS_URL]: {
          //获取服务器资源
          target: env.VITE_BASE_SERVE,
          //需要代理跨域
          changeOrigin: true,
        }
      }
    }
  }
})
