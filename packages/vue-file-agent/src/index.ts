import VueFileIcon from './components/vue-file-icon.vue';
import VueFilePreview from './components/vue-file-preview.vue';
import VueFileList from './components/vue-file-list.vue';
import VueFileListItem from './components/vue-file-list-item.vue';
import VueFileAgent from './components/vue-file-agent.vue';
import VueFileAgentMixin from './components/vue-file-agent-mixin';
import VueFilePreviewMixin from './components/vue-file-preview-mixin';
import utils from './lib/utils';
import plugins from './lib/plugins';
import FileRecord from './lib/file-record';

import _Vue from 'vue';

export class VueFileAgentPlugin implements Vue.PluginObject<any> {
  public VueFileIcon = VueFileIcon;
  public VueFilePreview = VueFilePreview;
  public VueFileAgent = VueFileAgent;
  public component = VueFileAgent;
  public mixin = VueFileAgentMixin;
  public plugins = plugins;

  public VueFileAgentMixin = VueFileAgentMixin;
  public VueFilePreviewMixin = VueFilePreviewMixin;

  public install: Vue.PluginFunction<any> = (Vue: typeof _Vue, options: any) => {
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

const vfaPlugin = new VueFileAgentPlugin();

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  vfaPlugin.install(window.Vue, {});
  (window as any).VueFileAgent = vfaPlugin;
}

export const mixin = VueFileAgentMixin;

export { VueFileAgentMixin, VueFilePreviewMixin };

export { utils, FileRecord, plugins };

export const FileData = FileRecord; // for backward compatibility

export default vfaPlugin;
