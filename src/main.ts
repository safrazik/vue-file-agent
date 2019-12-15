import Vue from 'vue';
import './demo/demo-base';
import App from './App.vue';

import VueFileAgentPlugin from './index';

import { SlickList, SlickItem } from 'vue-slicksort';

import tus from 'tus-js-client';


Vue.use(VueFileAgentPlugin);
Vue.config.productionTip = false;

Vue.component('vfa-sortable-list', SlickList);
Vue.component('vfa-sortable-item', SlickItem);

(window as any).tus = tus;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
