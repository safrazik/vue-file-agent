import React from 'react';

import { FileIcon as CoreFileIcon, FileIconProps } from '@file-agent/core';

export default class FileIcon extends React.Component<FileIconProps> {
  private $container?: HTMLElement;
  private coreFileIcon?: CoreFileIcon;
  private coreRendered = false;
  constructor(public props: FileIconProps) {
    super(props);
    // fileIcon.render(document.getElementById('file-icon-wrapper') as HTMLElement);
    // this.coreFileIcon = new CoreFileIcon(this.props);
  }

  // setContainer(el: HTMLElement | null) {
  //   this.$container = el as HTMLElement;
  //   this.renderCore();
  // }

  // renderCore() {
  //   console.log('REACT renderCore');
  //   if (!this.$container) {
  //     return;
  //   }
  //   this.coreFileIcon.render(this.$container);
  //   this.coreRendered = true;
  // }

  setContainer(el: HTMLElement | null) {
    // console.log('setContainer', this.props.fileRecords);
    this.$container = el as HTMLElement;
    this.renderCore();
  }

  renderCore() {
    if (/* this.coreRendered &&  */ this.coreFileIcon) {
      this.coreFileIcon.$props = this.props;
      this.coreFileIcon.update();
      return;
    }
    if (!this.$container) {
      return;
    }
    this.coreFileIcon = new CoreFileIcon(this.props);
    this.coreFileIcon.render(this.$container);
    // this.coreRendered = true;
  }

  componentDidMount() {
    this.renderCore();
  }

  componentWillUnmount() {
    // destroy
  }
  render() {
    console.log('REACT render called');
    return <span ref={this.setContainer.bind(this)} />;
  }
}
