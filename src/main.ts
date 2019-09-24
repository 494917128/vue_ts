import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/css/style.css'
import '@/fonts/iconfont.css'


/// <reference path="./js/api.d.ts" />

Vue.config.productionTip = false;

import api from './js/api'
Vue.prototype.$api = api

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
