import Vue from 'vue';
import './demo/demo-base';
import App from './App.vue';

import VueFileAgent from './index';

import { SlickList, SlickItem } from 'vue-slicksort';

import * as tus from 'tus-js-client';

Vue.use(VueFileAgent);
Vue.config.productionTip = false;

Vue.component('vfa-sortable-list', SlickList);
Vue.component('vfa-sortable-item', SlickItem);

VueFileAgent.plugins.tus = tus;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
