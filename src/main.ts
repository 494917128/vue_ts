import Vue from 'vue';
import App from './App.vue';
import router from './router';
import methods from './js/methods';

Vue.config.productionTip = false;

import MyPlugin from './js/MyPlugin'
Vue.use(MyPlugin)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
