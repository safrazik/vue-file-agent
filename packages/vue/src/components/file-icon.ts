import Vue from 'vue';
import { FileIcon as CoreFileIcon, fileIconProps, FileIconProps } from '@file-agent/core';

export default Vue.extend({
  props: fileIconProps,
  render(createElement) {
    return createElement(
      'span',
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
      if (this.coreFileIcon) {
        this.coreFileIcon.$props = this.$props as FileIconProps;
        this.coreFileIcon.update();
        return;
      }
      if (!this.$el) {
        return;
      }
      this.coreFileIcon = new CoreFileIcon(this.$props as FileIconProps);
      this.coreFileIcon.render(this.$el as HTMLElement);
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
