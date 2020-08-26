import { FileAgent, FileRecord, plugins } from '@file-agent/core';
import { Component } from '../../../core/src/components/component';
import template from './app.html';
import { uploader } from '..';

plugins.tus = (window as any).tus;
// plugins.uploader = uploader;

let settings = {
  auto: true,
  resumable: false,
  uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
  tusUploadUrl: 'https://master.tus.io/files/',
};

const writeSettings = () => {
  localStorage.setItem('file-agent-uploader-settings', JSON.stringify(settings));
};

const readSettings = () => {
  const settingsSerialized = localStorage.getItem('file-agent-uploader-settings');
  if (!settingsSerialized) {
    return;
  }
  try {
    settings = JSON.parse(settingsSerialized);
  } catch (e) {
    // no op
  }
};

readSettings();

export class App extends Component {
  fileAgent: FileAgent;
  constructor() {
    super();
    this.fileAgent = new FileAgent({
      auto: false,
      uploadUrl: 'https://master.tus.io/files/',
      resumable: true,
      multiple: true,
      deletable: true,
      editable: true,
      linkable: true,
      onSelect: (fRecs) => {
        // console.log('onSelect', fRecs);
        // setTimeout(() => {
        //   this.fileAgent.$props.fileRecords = this.fileAgent.$props.fileRecords.reverse();
        //   this.fileAgent.update();
        // }, 1000);
      },
      onRename(fileRecord) {
        console.log('onRename', fileRecord.name(), fileRecord);
        if (fileRecord.name().toLowerCase().indexOf('shit') === -1) {
          return;
        }
        fileRecord.setError('Shitty name is not allowed.');
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(false);
          }, 1000);
        });
      },
      onDelete(fileRecord) {
        if (settings.auto) {
          return;
        }
        return uploader.deleteUpload(
          settings.uploadUrl,
          {},
          {
            resumable: settings.resumable,
          },
          fileRecord,
          undefined,
          (xhr) => {
            //
          },
        );
      },
    });
  }

  getCheckboxInput(prop: 'auto' | 'resumable') {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = settings[prop];
    input.onchange = (event) => {
      const checked = (event.target as HTMLInputElement).checked;
      settings[prop] = checked;
      this.updateSettings();
      this.updateUi();
      //   localStorage.setItem();
    };
    return input;
  }

  getTextInput(prop: 'uploadUrl' | 'tusUploadUrl') {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = settings[prop];
    input.oninput = (event) => {
      const value = (event.target as HTMLInputElement).value;
      settings[prop] = value;
      this.updateSettings();
      //   localStorage.setItem();
    };
    return input;
  }

  bindEvents() {
    //
    this.fileAgent.render(this.getRef('file-agent'));
    this.getRef('resumable-checkbox').appendChild(this.getCheckboxInput('resumable'));
    this.getRef('auto-checkbox').appendChild(this.getCheckboxInput('auto'));
    this.getRef('uploadUrl').appendChild(this.getTextInput('uploadUrl'));
    this.getRef('tusUploadUrl').appendChild(this.getTextInput('tusUploadUrl'));
    const uploadButton = document.createElement('button');
    uploadButton.type = 'button';
    uploadButton.textContent = 'Upload';
    uploadButton.onclick = (event) => {
      console.log('plugins.uploader', plugins.uploader);
      //   fileAgent.autoUpload(fileAgent.$props.fileRecords);
      uploader.upload(
        settings.uploadUrl,
        {},
        {
          resumable: settings.resumable,
          tusOptions: (fileRecord) => {
            return {};
          },
        },
        this.fileAgent.$props.fileRecords,
        undefined,
        (progress) => {
          //
        },
        (xhr) => {
          //
        },
      );
    };
    this.getRef('manualUpload-wrapper').appendChild(uploadButton);
  }

  updateSettings() {
    writeSettings();
    this.fileAgent.$props.auto = settings.auto;
    this.fileAgent.$props.resumable = settings.resumable;
    this.fileAgent.$props.uploadUrl = settings.resumable ? settings.tusUploadUrl : settings.uploadUrl;
    this.fileAgent.update();
  }

  updateUi() {
    this.getRef('tusUploadUrl-wrapper').style.display = settings.resumable ? 'block' : 'none';
    this.getRef('uploadUrl-wrapper').style.display = settings.resumable ? 'none' : 'block';
    this.getRef('manualUpload-wrapper').style.display = settings.auto ? 'none' : 'block';
  }

  update() {
    this.updateUi();
    this.updateSettings();
  }

  get $el() {
    if (this.cachedEl) {
      return this.cachedEl;
    }
    const el = this.parseTemplate(template);
    this.cachedEl = el;
    this.bindEvents();
    this.update();
    return el;
  }
}
