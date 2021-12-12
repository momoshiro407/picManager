import { createApp, App as Application } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/config'

import './assets/global.css'

let app: Application

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(router).mount('#app')
  }
})
