import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import gAuth from 'vue3-google-auth';
const $gAuth = gAuth.createGAuth({
    clientId: process.env.VUE_APP_GOOGLE_PUBLIC_KEY
})

createApp(App).use(store).use(router).use($gAuth).mount('#app')