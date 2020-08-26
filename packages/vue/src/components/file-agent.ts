import Vue from 'vue';
import {
  FileAgent as CoreFileAgent,
  FileRecord,
  fileAgentProps,
  FileAgentProps,
  FileAgentPropsExtended,
} from '@file-agent/core';
import propsHelper from '../lib/props-helper';

const propsWatch = propsHelper.createWatcher(fileAgentProps);

export default Vue.extend({
  props: fileAgentProps,
  render(createElement) {
    return createElement(
      'div',
      // this.$slots.default
    );
  },
  created() {
    propsHelper.bindThis(propsWatch, this);
    this.renderCore();
  },
  mounted() {
    this.renderCore();
  },
  methods: {
    renderCore() {
      if (this.coreFileAgent) {
        this.coreFileAgent.$props = this.$props as FileAgentPropsExtended;
        this.coreFileAgent.update();
        return;
      }
      if (!this.$el) {
        return;
      }
      this.coreFileAgent = new CoreFileAgent(this.$props as FileAgentPropsExtended);
      this.coreFileAgent.render(this.$el as HTMLElement);
    },
    propUpdated(propName: string, value: any) {
      console.log('FileAgent propUpdated', propName, value);
      this.renderCore();
    },
  },
  watch: propsWatch,
});
