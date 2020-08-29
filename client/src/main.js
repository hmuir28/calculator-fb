import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store/index';
import { auth } from './util/Config/firebase.config';

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});
