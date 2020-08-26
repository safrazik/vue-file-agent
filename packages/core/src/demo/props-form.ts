import { Component } from '../components/component';
import template from './props-form.html';
// import FileRecord from '../lib/file-record';
// import utils from '../lib/utils';
import { FileAgent, FileAgentProps, createFileAgentProps } from '..';

export class PropsForm extends Component {
  props = createFileAgentProps();
  constructor(protected fileAgent: FileAgent) {
    super();
    this.fileAgent.$props.deletable = true;
    this.fileAgent.$props.editable = true;
    // this.fileAgent.$props.sortable = 'handle';
    this.fileAgent.$props.sortable = true;
    this.fileAgent.$props.draggable = true;
    this.fileAgent.update();
    // this.fileAgent.$props.theme = 'list';
    // this.fileAgent.$props.uploadUrl =
    //   'http://localhost/safrazik/vue-file-agent/packages/vue-file-agent/upload-server-examples/php/upload-server.php';
  }

  update() {
    this.fileAgent.update();
  }

  bindEvents() {
    //
    // this.getRef<HTMLInputElement>('prop-deletable').onchange = (event) => {
    //   console.log('(event.target as HTMLInputElement).checked', (event.target as HTMLInputElement).checked);
    //   this.fileAgent.$props.deletable = (event.target as HTMLInputElement).checked;
    //   this.update();
    // };
    const booleans = document.createElement('div');
    const strings = document.createElement('div');
    for (const prop of [
      'multiple',
      //   'averageColor',
      'meta',
      'compact',
      'deletable',
      'editable',
      'linkable',
      'disabled',
      'readonly',
      'sortable',
      'draggable',
      'smartBackground',
      //   'resumable',
      //   'uploadWithCredentials',
    ]) {
      const div = document.createElement('div');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = (this.fileAgent.$props as any)[prop];
      div.appendChild(input);
      div.appendChild(this.parseTemplate(`<span>${prop}</span>`));
      input.onchange = (event) => {
        console.log(prop, '(event.target as HTMLInputElement).checked', (event.target as HTMLInputElement).checked);
        (this.fileAgent.$props as any)[prop] = (event.target as HTMLInputElement).checked;
        this.update();
      };
      booleans.appendChild(div);
    }
    for (const prop of [
      //
      'helpText',
      'accept',
      'maxSize',
      'maxFiles',
      'uploadUrl',
      'capture',
      'sortable',
      'theme',
    ]) {
      const div = document.createElement('div');
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = ({ capture: 'e.g: user, environment', accept: 'image/*,.txt' } as any)[prop] || '';
      const value = (this.fileAgent.$props as any)[prop];
      if (value) {
        input.value = value;
      }
      div.appendChild(this.parseTemplate(`<span>${prop}</span>`));
      div.appendChild(input);
      input.oninput = (event) => {
        console.log(prop, '(event.target as HTMLInputElement).value', (event.target as HTMLInputElement).value);
        (this.fileAgent.$props as any)[prop] = (event.target as HTMLInputElement).value;
        this.update();
      };
      strings.appendChild(div);
    }

    this.getRef('booleans').appendChild(booleans);
    this.getRef('strings').appendChild(strings);
    // this.getRef('prop-helpText').oninput = (event) => {
    //   this.fileAgent.$props.helpText = (event.target as HTMLInputElement).value;
    //   this.update();
    // };
    // this.getRef('prop-accept').oninput = (event) => {
    //   this.fileAgent.$props.accept = (event.target as HTMLInputElement).value;
    //   this.update();
    // };
  }

  get $el() {
    if (this.cachedEl) {
      return this.cachedEl;
    }
    const el = this.parseTemplate(template);
    this.cachedEl = el;
    this.bindEvents();
    return el;
  }
}
