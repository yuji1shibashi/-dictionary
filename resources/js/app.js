require('./bootstrap');

import { createApp } from 'vue';
import router from './router.js';
import AppComponent from './components/AppComponent.vue'

// アイコン素材
// import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'

// アプリケーション開始
createApp(AppComponent)
    // .component('v-icon', Icon)
    .use(router)
    .mount('#app');