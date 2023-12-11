import './assets/main.css'
import App from './App.vue'
import 'vue-loading-overlay/dist/css/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
app.use(router)

app.use(createPinia())

app.mount('#app')