import React from 'react';

import { FilePreview as CoreFilePreview, FileRecord } from '@file-agent/core';

interface Props {
  averageColor?: boolean;
  deletable?: boolean;
  editable?: boolean;
  linkable?: boolean;
  disabled?: boolean;
  fileRecord?: FileRecord;
  onDelete?: (fileRecord: FileRecord) => void;
  onRename?: (fileRecord: FileRecord) => void;
  errorText?: {
    type?: string;
    size?: string;
  };
}

export default class FilePreview extends React.Component<Props> {
  private $container?: HTMLElement;
  private coreFilePreview: CoreFilePreview;
  private coreRendered = false;
  constructor(public props: Props) {
    super(props);
    // fileIcon.render(document.getElementById('file-icon-wrapper') as HTMLElement);
    this.coreFilePreview = new CoreFilePreview(this.props);
  }

  setContainer(el: HTMLElement | null) {
    this.$container = el as HTMLElement;
    this.renderCore();
  }

  renderCore() {
    if (!this.$container) {
      return;
    }
    this.coreFilePreview.render(this.$container);
    this.coreRendered = true;
  }

  componentDidMount() {
    this.renderCore();
  }

  componentWillUnmount() {
    // destroy
  }
  render() {
    return <div ref={this.setContainer.bind(this)} />;
  }
}
