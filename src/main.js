import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from './utils/axios'
// 导入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入全局样式
import './assets/styles/index.css'

const app = createApp(App)

// 注册Pinia状态管理
app.use(createPinia())
// 注册路由
app.use(router)
// 注册Element Plus
app.use(ElementPlus)

// 全局注册axios
app.config.globalProperties.$axios = axios

app.mount('#app')
