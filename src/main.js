import Vue from 'vue'
import './demo/demo-base'
import App from './App.vue'

import VueFileAgentPlugin from './index';

// import uploader from './lib/upload-helper';

Vue.use(VueFileAgentPlugin);
Vue.config.productionTip = false

// Vue.component('vue-file-agent', VueFileAgentPlugin.VueFileAgent);

console.log(window.getFilesDataInitial());
new Vue({
  render: h => h(App),
}).$mount('#app')