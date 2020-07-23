import Vue from 'vue';
import { FileAgent as CoreFileAgent, FileRecord, fileAgentProps, FileAgentProps } from '@file-agent/core';

// type CancelableEventReturnType = boolean | Promise<boolean> | undefined | null | void | any;
// type SlotValue = HTMLElement | string | undefined | null | any;

// export interface Props {
//   auto?: boolean;
//   uploadUrl?: string;
//   uploadHeaders?: any;
//   uploadConfig?: any;
//   multiple?: boolean;
//   averageColor?: boolean;
//   theme?: 'default' | 'list';
//   sortable?: boolean | 'hold' | 'handle';
//   meta?: boolean;
//   compact?: boolean;
//   deletable?: boolean;
//   editable?: boolean;
//   linkable?: boolean;
//   helpText?: string;
//   disabled?: boolean;
//   readonly?: boolean;
//   maxFiles?: number;
//   maxSize?: string;
//   accept?: string;
//   capture?: string;
//   thumbnailSize?: number;
//   fileRecords: FileRecord[];
//   draggable?: boolean | HTMLElement;
//   resumable?: boolean;
//   uploadWithCredentials?: boolean;
//   events?: {
//     onBeforeDelete?: (fileRecord: FileRecord) => CancelableEventReturnType;
//     onDelete?: (fileRecord: FileRecord) => CancelableEventReturnType;
//     onChange?: (event: InputEvent) => void;
//     onDrop?: (event: DragEvent) => void;
//     onBeforeRename?: (fileRecord: FileRecord) => CancelableEventReturnType;
//     onRename?: (fileRecord: FileRecord) => CancelableEventReturnType;
//     onInput?: (fileRecords: FileRecord[]) => void;
//     onSelect?: (fileRecords: FileRecord[]) => void;
//     onUpload?: (fileRecord: FileRecord[], result: any) => void;
//     onUploadError?: (fileRecord: FileRecord[], result: any) => void;
//     onUploadDelete?: (fileRecord: FileRecord, result: any) => void;
//     onUploadDeleteError?: (fileRecord: FileRecord, result: any) => void;
//     onUploadUpdate?: (fileRecord: FileRecord, result: any) => void;
//     onUploadUpdateError?: (fileRecord: FileRecord, result: any) => void;
//   };
//   // errorText?: {
//   //   // common?: string;
//   //   type?: string;
//   //   size?: string;
//   //   // upload?: string;
//   // };
//   slots?: {
//     afterInner?: SlotValue;
//     afterOuter?: SlotValue;
//     beforeInner?: SlotValue;
//     beforeOuter?: SlotValue;
//     filePreview?: (fileRecord: FileRecord, index: number) => SlotValue;
//     filePreviewNew?: SlotValue;
//     sortableHandle?: SlotValue;
//   };
// }

export default Vue.extend({
  props: fileAgentProps,
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
      if (this.coreFileAgent) {
        this.coreFileAgent.$props = this.$props as FileAgentProps;
        this.coreFileAgent.update();
        return;
      }
      if (!this.$el) {
        return;
      }
      this.coreFileAgent = new CoreFileAgent(this.$props as FileAgentProps);
      this.coreFileAgent.render(this.$el as HTMLElement);
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
