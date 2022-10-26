import { createApp } from 'vue'
import './assets/app.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.withCredentials = true


// Updating our state based on the cookies values
// To prevent from setting authtentication to false when the page is reloaded
store.dispatch('authenticate').then( () => {
    createApp(App).use(router).use(store).mount('#app')
})