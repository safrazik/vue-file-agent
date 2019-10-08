import VueFileIcon from './components/vue-file-icon.vue';
import VueFilePreview from './components/vue-file-preview.vue';
import VueFileAgent from './components/vue-file-agent.vue';
import VueFileAgentMixin from './components/vue-file-agent-mixin';
import utils from './lib/utils';
import FileData from './lib/file-data';

var VueFileAgentPlugin = function VueFileAgentPlugin(){};

VueFileAgentPlugin.VueFileIcon = VueFileIcon;
VueFileAgentPlugin.VueFilePreview = VueFilePreview;
VueFileAgentPlugin.VueFileAgent = VueFileAgent;
VueFileAgentPlugin.component = VueFileAgent;
VueFileAgentPlugin.mixin = VueFileAgentMixin;

VueFileAgentPlugin.install = function (Vue, options) {
  Vue.component('VueFileIcon', VueFileIcon);
  Vue.component('VueFilePreview', VueFilePreview);
  Vue.component('VueFileAgent', VueFileAgent);
  Vue.prototype.$vueFileAgent = {
    mixin: VueFileAgentMixin,
  };
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  VueFileAgentPlugin.install(window.Vue);
}

export default VueFileAgentPlugin;

export var mixin = VueFileAgentMixin;

export {utils, FileData};