import Vue from 'vue';
import { FilePreview as CoreFilePreview, FileRecord, filePreviewProps, FilePreviewProps } from '@file-agent/core';

export default Vue.extend({
  props: filePreviewProps,
  render(createElement) {
    return createElement(
      'div',
      // this.$slots.default
    );
  },
  created() {
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
  },
  watch: {
    $props: {
      handler(val, oldVal) {
        this.renderCore();
      },
      deep: true,
    },
  },
});
