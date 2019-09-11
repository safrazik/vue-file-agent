import Vue from 'vue'
import App from './App.vue'

import VueFileAgentPlugin from './index';

// import uploader from './lib/upload-helper';

Vue.use(VueFileAgentPlugin);
Vue.config.productionTip = false

// Vue.component('vue-file-agent', VueFileAgentPlugin.VueFileAgent);

new Vue({
  render: h => h(App),
}).$mount('#app')