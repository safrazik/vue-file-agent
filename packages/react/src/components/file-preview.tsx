import React from 'react';

import { FilePreview as CoreFilePreview, FilePreviewProps, FileRecord } from '@file-agent/core';

export default class FilePreview extends React.Component<FilePreviewProps> {
  private $container?: HTMLElement;
  private coreFilePreview: CoreFilePreview;
  private coreRendered = false;
  constructor(public props: FilePreviewProps) {
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
