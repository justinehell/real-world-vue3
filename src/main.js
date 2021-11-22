import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import GStore from './store';
import store from './store';
import 'nprogress/nprogress.css';

createApp(App)
  .use(router) // <--- Removed provide('GStore', GStore), because we're implementing Vuex
  .use(store)
  .mount('#app');
