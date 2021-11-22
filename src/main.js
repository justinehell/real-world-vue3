import { createApp } from 'vue'; // <--- removed reactive
import App from './App.vue';
import router from './router';
import GStore from './store'; // <--- Modified this import line
import 'nprogress/nprogress.css';

createApp(App)
  .use(router) // <--- Removed use(store), because we're not using Vuex
  .provide('GStore', GStore)
  .mount('#app');
