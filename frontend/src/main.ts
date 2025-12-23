import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import { createPinia } from 'pinia'
app.use(createPinia())
// 重置全局样式
import '@/style/reset.scss'

import router from './router'
import ElementPlus from  'element-plus'
// 引入 Element Plus 全局样式
import 'element-plus/dist/index.css'
// 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// SVG插件配置
import 'virtual:svg-icons-register'
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
import '@/router/permisstion.ts'
app.mount('#app')
