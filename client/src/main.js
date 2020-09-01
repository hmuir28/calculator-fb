import Vue from 'vue';
import App from './App.vue';
import router from './routes/Router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import { auth } from './util/Config/firebase.config';

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});
