import Vue from 'vue';
import App from './web/App.vue';
import router from './web/router';
import vuetify from './web/vuetify';

import '@fortawesome/fontawesome-free/css/all.css';
import 'fontsource-roboto';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

process.on('unhandledRejection', error => { console.error(error); });
