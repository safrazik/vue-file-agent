import React from 'react';

import { FileAgent as CoreFileAgent, FileAgentProps, FileRecord } from '@file-agent/core';

type CancelableEventReturnType = boolean | Promise<boolean> | undefined | null | void | any;
type SlotValue = HTMLElement | string | undefined | null | any;

export default class FileAgent extends React.Component<FileAgentProps> {
  private $container?: HTMLElement;
  private coreFileAgent?: CoreFileAgent;
  // private coreRendered = false;
  constructor(public props: FileAgentProps) {
    super(props);
    // fileIcon.render(document.getElementById('file-icon-wrapper') as HTMLElement);
  }

  setContainer(el: HTMLElement | null) {
    console.log('setContainer', this.props.fileRecords);
    this.$container = el as HTMLElement;
    this.renderCore();
  }

  renderCore() {
    if (/* this.coreRendered &&  */ this.coreFileAgent) {
      this.coreFileAgent.$props = this.props;
      this.coreFileAgent.update();
      return;
    }
    if (!this.$container) {
      return;
    }
    this.coreFileAgent = new CoreFileAgent(this.props);
    this.coreFileAgent.render(this.$container);
    // this.coreRendered = true;
  }

  componentDidMount() {
    console.log('componentDidMount', this.props.fileRecords);
    // this.renderCore();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate', this.props.fileRecords);
    // this.renderCore();
  }

  componentWillUnmount() {
    // destroy
  }
  render() {
    return <div ref={this.setContainer.bind(this)} />;
  }
}
