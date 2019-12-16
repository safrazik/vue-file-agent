import VueFileIcon from './components/vue-file-icon.vue';
import VueFilePreview from './components/vue-file-preview.vue';
import VueFileList from './components/vue-file-list.vue';
import VueFileListItem from './components/vue-file-list-item.vue';
import VueFileAgent from './components/vue-file-agent.vue';
import VueFileAgentMixin from './components/vue-file-agent-mixin';
import VueFilePreviewMixin from './components/vue-file-preview-mixin';
import utils from './lib/utils';
import FileData from './lib/file-data';

import _Vue, { PluginFunction } from 'vue';

export default class VueFileAgentPlugin {
  public static VueFileIcon = VueFileIcon;
  public static VueFilePreview = VueFilePreview;
  public static VueFileAgent = VueFileAgent;
  public static component = VueFileAgent;
  public static mixin = VueFileAgentMixin;

  public static VueFileAgentMixin = VueFileAgentMixin;
  public static VueFilePreviewMixin = VueFilePreviewMixin;

  public static install(Vue: typeof _Vue, options: any) {
    Vue.component('VueFileIcon', VueFileIcon);
    Vue.component('VueFilePreview', VueFilePreview);
    Vue.component('VueFileList', VueFileList);
    Vue.component('VueFileListItem', VueFileListItem);
    Vue.component('VueFileAgent', VueFileAgent);
    Vue.prototype.$vueFileAgent = {
      mixin: VueFileAgentMixin,
    };
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  VueFileAgentPlugin.install(window.Vue, {});
}

export const mixin = VueFileAgentMixin;

export { VueFileAgentMixin, VueFilePreviewMixin };

export { utils, FileData };
