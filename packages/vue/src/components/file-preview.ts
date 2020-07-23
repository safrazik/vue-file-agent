import Vue from 'vue';
import { FilePreview as CoreFilePreview, FileRecord, filePreviewProps, FilePreviewProps } from '@file-agent/core';
import propsHelper from '../lib/props-helper';

const propsWatch = propsHelper.createWatcher(filePreviewProps);

export default Vue.extend({
  props: filePreviewProps,
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
      if (this.coreFilePreview) {
        this.coreFilePreview.$props = this.$props as FilePreviewProps;
        this.coreFilePreview.update();
        return;
      }
      if (!this.$el) {
        return;
      }
      this.coreFilePreview = new CoreFilePreview(this.$props as FilePreviewProps);
      this.coreFilePreview.render(this.$el as HTMLElement);
    },
    propUpdated(propName: string, value: any) {
      console.log('FilePreview propUpdated', propName, value);
      this.renderCore();
    },
  },
  watch: propsWatch,
});
