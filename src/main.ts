import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import errorHandler from '@/errorHandler'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.config.errorHandler = errorHandler;
app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
