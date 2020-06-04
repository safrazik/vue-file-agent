import React from 'react';

import { FileIcon as CoreFileIcon } from '@file-agent/core';

interface Props {
  ext?: string;
  name?: string;
  viewBox?: string;
}

export default class FileIcon extends React.Component<Props> {
  private $container?: HTMLElement;
  private coreFileIcon: CoreFileIcon;
  private coreRendered = false;
  constructor(public props: Props) {
    super(props);
    // fileIcon.render(document.getElementById('file-icon-wrapper') as HTMLElement);
    this.coreFileIcon = new CoreFileIcon(this.props);
  }

  setContainer(el: HTMLElement | null) {
    this.$container = el as HTMLElement;
    this.renderCore();
  }

  renderCore() {
    if (!this.$container) {
      return;
    }
    this.coreFileIcon.render(this.$container);
    this.coreRendered = true;
  }

  componentDidMount() {
    this.renderCore();
  }

  componentWillUnmount() {
    // destroy
  }
  render() {
    return <span ref={this.setContainer.bind(this)} />;
  }
}
