import { FileAgent, FileRecord } from '..';
import { Component } from '../components/component';
import template from './advanced-demo.html';
import { PropsForm } from './props-form';
// import utils from '../lib/utils';
import { FileAgentProps, createFileAgentProps } from '../lib/props';
import { rawFileRecords } from './data';

const maxSize = '4MB';

export class AdvancedDemo extends Component {
  // props = createFileAgentProps();
  fileAgent = new FileAgent(createFileAgentProps());
  propsForm: PropsForm;
  constructor() {
    super();
    // this.fileAgent.$props.onBeforeDelete = (fileRecord) => {
    //   console.log('onBeforeDelete');
    //   //   return new Promise((resolve, reject) => {
    //   //     setTimeout(() => {
    //   //       resolve(false);
    //   //     }, 2000);
    //   //   });
    //   return true;
    // };
    // this.fileAgent.$props.onDelete = (fileRecord) => {
    //   console.log('onDelete');
    //   throw new Error('hell');
    //   //   return new Promise((resolve, reject) => {
    //   //     setTimeout(() => {
    //   //       resolve(false);
    //   //     }, 2000);
    //   //   });
    // };
    this.fileAgent.setProps({
      onDelete: (fr) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (fr.name().toLocaleLowerCase().indexOf('system') !== -1) {
              alert('"System" files cannot be deleted');
              resolve(false);
              return;
            }
            alert('File deleted: ' + fr.name());
            resolve(true);
          }, 500);
        });
      },
      onRename: (fr) => {
        setTimeout(() => {
          alert('File renamed: ' + fr.name());
        }, 500);
      },
    });
    this.propsForm = new PropsForm(this.fileAgent);
    FileRecord.fromRawArray(rawFileRecords.slice(0, 1).concat(rawFileRecords.slice(2)) as any, {
      read: false,
      maxSize,
    }).then((fileRecords) => {
      console.log('fileRecords Reached', fileRecords);
      this.fileAgent.setProps({ fileRecords });
      this.fileAgent.update();
    });
  }

  bindEvents() {
    //
  }

  get $el() {
    if (this.cachedEl) {
      return this.cachedEl;
    }
    const el = this.parseTemplate(template);
    this.cachedEl = el;
    this.propsForm.render(this.getRef('props-form'));
    this.fileAgent.render(this.getRef('file-agent'));
    this.bindEvents();
    return el;
  }
}
