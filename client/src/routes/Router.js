import Vue from 'vue';
import VueRouter from 'vue-router';

import CalculatorMainPanel from '../components/Calculator/CalculatorMainPanel';
import RegExValidatorMainPanel from '../components/RegExValidator/RegExValidatorMainPanel';

Vue.use(VueRouter);

export const RouterOptions = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Calculator',
      component: CalculatorMainPanel,
    },
    {
      path: '/regex',
      name: 'RegEx',
      component: RegExValidatorMainPanel,
    },
  ],
};

export default new VueRouter(RouterOptions);
