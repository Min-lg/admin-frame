import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from '@/router/router' //router
import { createPinia } from "pinia"; //仓库
//UI组件
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//安装依赖
const app = createApp(App).use(Router).use(createPinia()).use(ElementPlus, {
    locale: zhCn,
})
//阻止 vue 在启动时生成生产提示
app.config.productionTip = false
//安装EL-ICON
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//挂载DOM
app.mount('#app')
