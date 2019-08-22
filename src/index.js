import VueFileIcon from './components/VueFileIcon.vue';
import VueFileAgent from './components/VueFileAgent.vue';

var VueFileAgentPlugin = function VueFileAgentPlugin(){};

VueFileAgentPlugin.install = function (Vue, options) {
  Vue.component('VueFileIcon', VueFileIcon);
  Vue.component('VueFileAgent', VueFileAgent);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  VueFileAgentPlugin.install(window.Vue);
}

export default VueFileAgentPlugin;