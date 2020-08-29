import Vue from 'vue';
import Vuex from 'vuex';
import operations from './modules/operations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: { operations },
  strict: debug,
});
