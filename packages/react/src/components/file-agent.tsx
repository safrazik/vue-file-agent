import React from 'react';

import { FileAgent as CoreFileAgent, FileRecord } from '@file-agent/core';

type CancelableEventReturnType = boolean | Promise<boolean> | undefined | null | void | any;
type SlotValue = HTMLElement | string | undefined | null | any;

export interface Props {
  auto?: boolean;
  uploadUrl?: string;
  uploadHeaders?: any;
  uploadConfig?: any;
  multiple?: boolean;
  averageColor?: boolean;
  theme?: 'default' | 'list';
  sortable?: boolean | 'hold' | 'handle';
  meta?: boolean;
  compact?: boolean;
  deletable?: boolean;
  editable?: boolean;
  linkable?: boolean;
  helpText?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxFiles?: number;
  maxSize?: string;
  accept?: string;
  capture?: string;
  thumbnailSize?: number;
  fileRecords: FileRecord[];
  draggable?: boolean | HTMLElement;
  resumable?: boolean;
  uploadWithCredentials?: boolean;
  events?: {
    onBeforeDelete?: (fileRecord: FileRecord) => CancelableEventReturnType;
    onDelete?: (fileRecord: FileRecord) => CancelableEventReturnType;
    onChange?: (event: InputEvent) => void;
    onDrop?: (event: DragEvent) => void;
    onBeforeRename?: (fileRecord: FileRecord) => CancelableEventReturnType;
    onRename?: (fileRecord: FileRecord) => CancelableEventReturnType;
    onInput?: (fileRecords: FileRecord[]) => void;
    onSelect?: (fileRecords: FileRecord[]) => void;
    onUpload?: (fileRecord: FileRecord[], result: any) => void;
    onUploadError?: (fileRecord: FileRecord[], result: any) => void;
    onUploadDelete?: (fileRecord: FileRecord, result: any) => void;
    onUploadDeleteError?: (fileRecord: FileRecord, result: any) => void;
    onUploadUpdate?: (fileRecord: FileRecord, result: any) => void;
    onUploadUpdateError?: (fileRecord: FileRecord, result: any) => void;
  };
  slots?: {
    afterInner?: SlotValue;
    afterOuter?: SlotValue;
    beforeInner?: SlotValue;
    beforeOuter?: SlotValue;
    filePreview?: (fileRecord: FileRecord, index: number) => SlotValue;
    filePreviewNew?: SlotValue;
    sortableHandle?: SlotValue;
  };
}

export default class FilePreview extends React.Component<Props> {
  private $container?: HTMLElement;
  private coreFileAgent: CoreFileAgent;
  private coreRendered = false;
  constructor(public props: Props) {
    super(props);
    // fileIcon.render(document.getElementById('file-icon-wrapper') as HTMLElement);
    this.coreFileAgent = new CoreFileAgent(this.props);
  }

  setContainer(el: HTMLElement | null) {
    console.log('setContainer', this.props.fileRecords);
    this.$container = el as HTMLElement;
    this.renderCore();
  }

  renderCore() {
    if (this.coreRendered) {
      this.coreFileAgent.update();
      return;
    }
    if (!this.$container) {
      return;
    }
    this.coreFileAgent.render(this.$container);
    this.coreRendered = true;
  }

  componentDidMount() {
    console.log('componentDidMount', this.props.fileRecords);
    this.renderCore();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate', this.props.fileRecords);
    this.renderCore();
  }

  componentWillUnmount() {
    // destroy
  }
  render() {
    return <div ref={this.setContainer.bind(this)} />;
  }
}
