import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import gAuth from 'vue3-google-auth';
const $gAuth = gAuth.createGAuth({
    clientId: '527932202397-4hfsh5p268jtuan1m27ofjjhv9ekijgo.apps.googleusercontent.com'
})

createApp(App).use(store).use(router).use($gAuth).mount('#app')