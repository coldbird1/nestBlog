import './assets/styles/index.scss'
// 引入unocss原子化样式
import 'virtual:uno.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import '@/utils/permission'
import plugins from '@/plugins'

//elsvg图标
import elementIcons from '@/components/svgIcon/svgicon'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: locale
})
app.use(elementIcons)
app.use(plugins)

app.mount('#app')
