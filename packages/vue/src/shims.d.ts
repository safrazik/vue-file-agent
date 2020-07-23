// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue';
import { FileIcon as CoreFileIcon, FileIconProps } from '@file-agent/core';
import { FilePreview as CoreFilePreview, FilePreviewProps } from '@file-agent/core';
import { FileAgent as CoreFileAgent, FileAgentProps } from '@file-agent/core';

declare module 'vue/types/vue' {
  interface Vue {
    coreFileIcon?: CoreFileIcon;
    coreFilePreview?: CoreFilePreview;
    coreFileAgent?: CoreFileAgent;
  }
}
