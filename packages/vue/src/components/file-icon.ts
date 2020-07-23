import Vue from 'vue';
import { FileIcon as CoreFileIcon, fileIconProps, FileIconProps } from '@file-agent/core';
import propsHelper from '../lib/props-helper';

const propsWatch = propsHelper.createWatcher(fileIconProps);

export default Vue.extend({
  props: fileIconProps,
  render(createElement) {
    return createElement(
      'span',
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
    propUpdated(propName: string, value: any) {
      console.log('FileIcon propUpdated', propName, value);
      this.renderCore();
    },
  },
  // watch: {
  //   $props: {
  //     handler(val, oldVal) {
  //       this.renderCore();
  //     },
  //     deep: true,
  //   },
  // },
  watch: propsWatch,
});
