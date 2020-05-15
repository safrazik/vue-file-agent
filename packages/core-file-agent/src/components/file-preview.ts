import { Component } from './component';
import template from './file-preview.html';
import FileRecord from '../lib/file-record';
import { FileIcon } from './file-icon';
import utils from '../lib/utils';

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
    // common?: string;
    type?: string;
    size?: string;
    // upload?: string;
  };
}

let previewEl: Element;

export class FilePreview extends Component {
  isEditInputFocused = false;
  isEditCancelable = true;

  constructor(public $props: Props) {
    super();
  }

  getIcon(props: { ext?: string; name?: string }) {
    const fileIcon = new FileIcon(props);
    return fileIcon.$el;
    // const div = document.createElement('div');
    // fileIcon.render(div);
    // return div.innerHTML;
  }

  iconByExt(ext: string) {
    return this.getIcon({ ext });
  }

  iconByName(name: string) {
    const svg = this.getIcon({ name });
    const div = document.createElement('div');
    div.appendChild(svg);
    return div.innerHTML;
  }

  hasLinkableUrl(fileRecord: FileRecord) {
    if (!this.$props.linkable) {
      return false;
    }
    return !!fileRecord.url() && !fileRecord.isPlayableVideo() && !fileRecord.isPlayableAudio();
  }

  getFileIcon(fileRecord: FileRecord) {
    const iconHtml = this.iconByExt(fileRecord.ext());
    return `<span class="file-icon">
      ${
        this.hasLinkableUrl(fileRecord)
          ? `<a href="${fileRecord.url()}" target="_blank" title="${fileRecord.name()}">
        ${iconHtml}
      </a>`
          : iconHtml
      }
    </span>`;
  }

  getProgress(fileRecord: FileRecord) {
    return `<span
      class="file-progress
        ${fileRecord.progress() >= 99.9999 ? 'file-progress-full' : ''}
        ${fileRecord.progress() >= 100 ? 'file-progress-done' : ''}
        ${fileRecord.progress() > 0 ? 'has-file-progress' : ''}
      "
    >
      <span class="file-progress-bar" style="width: ${fileRecord.progress()}%"></span>
    </span>`;
  }

  getDimensions(fileRecord: FileRecord) {
    return `<span class="image-dimension">
      <span class="image-dimension-width">${fileRecord.dimensions.width}</span
      ><span class="image-dimension-height">${fileRecord.dimensions.height}</span>
    </span>`;
  }

  getEditControls(fileRecord: FileRecord) {
    return `<input
        class="file-name-input"
        ref="input"
        disabled="${this.$props.disabled === true}"
        type="text"
        value="${fileRecord.name(true)}"
        ${'v-on:'}focus="editInputFocused()"
        ${'v-on:'}blur="editInputBlured()"
        ${'v-on:'}change="filenameChanged()"
        ${'v-on:'}input="filenameChanged()"
        ${'v-on:'}keyup.enter="filenameChanged(true)"
        ${'v-on:'}keyup.esc="filenameChanged(false)"
      />
      <span class="file-name-edit-icon">
        ${this.iconByName('system-file-name-edit')}
      </span>`;
  }

  getDeleteIcon(fileRecord: FileRecord) {
    return `<span
      class="file-delete"
      ${'v-on:'}click="removeFileRecord(fileRecord)"
      ${'v-on:'}touchstart="filenameClearPressed()"
      ${'v-on:'}mousedown="filenameClearPressed()"
    >
      ${this.iconByName('system-close')}
    </span>`;
  }

  getThumbnail(fileRecord: FileRecord) {
    return `<span
      class="thumbnail"
      style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;"
    >
      ${
        this.hasLinkableUrl(fileRecord)
          ? `<a href="${fileRecord.url()}" target="_blank" title="${fileRecord.name()}">
        <img class="file-preview-img" src="${fileRecord.src()}" />
      </a>`
          : `<img class="file-preview-img" src="${fileRecord.src()}" />`
      }
    </span>`;
  }

  getError(fileRecord: FileRecord) {
    return `<span class="file-error-wrapper" ${'v-on:'}click="dismissError()">
      <span class="file-error-message file-error-message-client">
        ${fileRecord.getErrorMessage(this.$props.errorText)}
      </span>
    </span>`;
  }

  getAv(fileRecord: FileRecord) {
    return `<div ref="wrapper" class="file-av-wrapper">
    <div class="file-av-action" ${'v-on:'}click="playAv(fileRecord)">
      <span class="file-av-stop">
        ${this.iconByName('system-close')}
      </span>
      <span class="file-av-play">
        ${this.iconByName('system-file-av-play')}
      </span>
    </div>
  </div>`;
  }

  getHtml(fileRecord: FileRecord) {
    return `<div class="
      file-preview-wrapper-${fileRecord.ext()}
      ${fileRecord.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other'}
      file-category-${fileRecord.icon().category}
      ${fileRecord.isPlayingAv ? 'file-is-playing-av' : ''}
      ${this.$props.deletable === true ? 'is-deletable' : ''}
      ${this.$props.editable === true ? 'is-editable' : ''}
      ${this.isEditInputFocused ? 'is-edit-input-focused' : ''}
      ${fileRecord.error ? 'has-error' : ''}
    "
>
  ${fileRecord.isPlayableAudio() || fileRecord.isPlayableVideo() ? this.getAv(fileRecord) : ''}
  <span class="file-preview
      ${fileRecord.isImage() ? 'image-preview' : ''}
      ${!fileRecord.isImage() ? 'other-preview' : ''}
      ${fileRecord.isImage() && fileRecord.isDarkColor() ? 'dark-content' : ''}
    "
    style="background-color: ${fileRecord.color()}"
  >
    ${fileRecord.error ? this.getError(fileRecord) : ''}
    <span class="file-preview-overlay"></span>
    ${fileRecord.isImage() || fileRecord.isPlayableVideo() ? this.getThumbnail(fileRecord) : ''}
    <span class="file-ext">${fileRecord.ext()}</span>
    <span class="file-size">${fileRecord.size()}</span>
    ${this.$props.deletable ? this.getDeleteIcon(fileRecord) : ''}
    <span class="file-name" ${'v-on:'}click="editFileName()">
      ${this.$props.editable === true ? this.getEditControls(fileRecord) : ''}
      <span class="file-name-text">${fileRecord.name(true)}</span>
    </span>
    ${fileRecord.dimensions.width && fileRecord.dimensions.height ? this.getDimensions(fileRecord) : ''}
    ${fileRecord.hasProgress() ? this.getProgress(fileRecord) : ''}
    ${this.getFileIcon(fileRecord)}
  </span>
</div>
`;
  }

  getRef<T extends HTMLElement>(ref: string) {
    return this.$el.querySelector('[data-ref="' + ref + '"]') as T;
  }

  createThumbnail(video: HTMLVideoElement) {
    const fileRecord = this.$props.fileRecord as FileRecord;
    if (fileRecord.videoThumbnail) {
      video.poster = fileRecord.src();
      return;
    }
    const canvas = document.createElement('canvas');
    utils
      .createVideoThumbnail(video, canvas, fileRecord.thumbnailSize, this.$props.averageColor !== false)
      .then((thumbnail) => {
        fileRecord.imageColor = thumbnail.color;
        fileRecord.videoThumbnail = thumbnail.url;
        fileRecord.dimensions.width = thumbnail.width;
        fileRecord.dimensions.height = thumbnail.height;
        video.poster = fileRecord.src();
      });
  }

  playAv() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    if (fileRecord.stopAv) {
      fileRecord.stopAv();
      return;
    }
    const createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
    const revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;

    const wrapper = this.getRef('av-wrapper') as HTMLElement;
    const player = document.createElement(fileRecord.isAudio() ? 'audio' : 'video');
    if (player instanceof HTMLVideoElement && fileRecord.isPlayableVideo()) {
      this.createThumbnail(player);
    }
    player.controls = true;
    // player.style.width = this.prvWidth + 'px';
    wrapper.appendChild(player);
    const url = (fileRecord.url() as string) || createObjectURL(fileRecord.file);
    player.src = url;
    player.play();
    fileRecord.isPlayingAv = true;
    this.updateWrapper();
    fileRecord.stopAv = () => {
      // player.src = null;
      player.src = '';
      wrapper.removeChild(player);
      revokeObjectURL(url);
      fileRecord.isPlayingAv = false;
      this.updateWrapper();
      fileRecord.stopAv = null;
    };
  }

  dismissError() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    if (fileRecord.error && (fileRecord.error.size || fileRecord.error.type)) {
      return;
    }
    fileRecord.error = false;
    this.getRef('error-wrapper').style.display = 'none';
    // this.update();
  }

  filenameClearPressed() {
    if (!(this.$props.editable === true && this.isEditInputFocused)) {
      return;
    }
    this.isEditCancelable = false;
  }

  editInputFocused() {
    this.isEditInputFocused = true;
    this.isEditCancelable = true;
    this.updateWrapper();
  }

  editInputBlured() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    fileRecord.oldFileName = fileRecord.name();
    const oldValue = fileRecord.name(true);
    const value = this.getRef<HTMLInputElement>('file-name-input').value;
    fileRecord.customName = value;
    const newValue = fileRecord.name(true);
    if (newValue !== oldValue) {
      fileRecord.oldCustomName = oldValue;
      this.update();
      if (this.$props.onRename) {
        this.$props.onRename(fileRecord);
      }
    }
    const timeout = 100;
    setTimeout(() => {
      // this.$nextTick(() => {
      if (!this.isEditCancelable) {
        return;
      }
      this.isEditInputFocused = false;
      // });
      this.updateWrapper();
    }, timeout);
  }

  clearFilename() {
    if (!(this.$props.editable === true && this.isEditInputFocused)) {
      return false;
    }
    this.getRef<HTMLInputElement>('file-name-input').value = '';
    this.isEditCancelable = true;
    this.editInputBlured();
    return true;
  }

  removeFileRecord() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    if (this.clearFilename()) {
      return;
    }
    if (this.$props.disabled === true) {
      return;
    }
    if (this.$props.onDelete) {
      this.$props.onDelete(fileRecord);
    }
  }

  editFileName() {
    if (this.$props.editable !== true) {
      return;
    }
    const input = this.getRef<HTMLInputElement>('file-name-input');
    if (!input) {
      return;
    }
    input.focus();
  }

  filenameChanged(completed?: boolean) {
    if (completed) {
      this.getRef<HTMLInputElement>('file-name-input').blur(); // @see editInputBlured method
    }
    if (completed === false) {
      this.clearFilename();
    }
  }

  bindEvents() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    this.getRef('av-action').onclick = () => {
      this.playAv();
    };

    this.getRef('error-wrapper').onclick = () => {
      this.dismissError();
    };

    this.getRef('file-delete').onclick = () => {
      this.removeFileRecord();
    };

    this.getRef('file-delete').ontouchstart = this.getRef('file-delete').onmousedown = () => {
      this.filenameClearPressed();
    };

    this.getRef('file-name').onclick = () => {
      this.editFileName();
    };

    const input = this.getRef<HTMLInputElement>('file-name-input');
    input.onfocus = () => {
      this.editInputFocused();
    };

    input.onblur = () => {
      this.editInputBlured();
    };
    input.oninput = input.onchange = () => {
      this.filenameChanged();
    };
    input.onkeyup = (event) => {
      if (event.keyCode === 13 || event.keyCode === 27) {
        this.filenameChanged(true);
      }
    };
  }

  updateWrapper() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    this.$el.className = `
    file-preview-wrapper-${fileRecord.ext()}
          ${fileRecord.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other'}
          file-category-${fileRecord.icon().category}
          ${fileRecord.isPlayingAv ? 'file-is-playing-av' : ''}
          ${this.$props.deletable === true ? 'is-deletable' : ''}
          ${this.$props.editable === true ? 'is-editable' : ''}
          ${this.isEditInputFocused ? 'is-edit-input-focused' : ''}
          ${fileRecord.error ? 'has-error' : ''}
          `;
  }

  update() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    this.updateWrapper();

    const visible = '';

    this.getRef('av-wrapper').style.display =
      fileRecord.isPlayableAudio() || fileRecord.isPlayableVideo() ? visible : 'none';

    const previewRefEl = this.getRef('preview');

    previewRefEl.className = `file-preview
          ${fileRecord.isImage() ? 'image-preview' : ''}
          ${!fileRecord.isImage() ? 'other-preview' : ''}
          ${fileRecord.isImage() && fileRecord.isDarkColor() ? 'dark-content' : ''}
        `;

    previewRefEl.style.backgroundColor = fileRecord.color();

    this.getRef('error-wrapper').style.display = fileRecord.error ? visible : 'none';
    this.getRef('error-text').innerText = fileRecord.getErrorMessage(this.$props.errorText);

    if (fileRecord.isImage() || fileRecord.isPlayableVideo()) {
      this.getRef('thumbnail').style.display = visible;
      if (this.hasLinkableUrl(fileRecord)) {
        const link = this.getRef<HTMLLinkElement>('thumbnail-link');
        link.style.display = visible;
        this.getRef('thumbnail-image').style.display = 'none';
        const img = this.getRef<HTMLImageElement>('thumbnail-link-image');
        img.src = fileRecord.src();
        link.title = fileRecord.name();
        link.href = fileRecord.url() as string;
      } else {
        this.getRef('thumbnail-link').style.display = 'none';
        const img = this.getRef<HTMLImageElement>('thumbnail-image');
        img.style.display = visible;
        img.src = fileRecord.src();
      }
    } else {
      this.getRef('thumbnail').style.display = 'none';
    }

    this.getRef('file-delete').style.display = this.$props.deletable ? visible : 'none';

    const input = this.getRef<HTMLInputElement>('file-name-input');
    if (this.$props.editable === true) {
      input.style.display = visible;
      input.value = fileRecord.name(true);
      this.getRef('file-name-edit-icon').style.display = visible;
    } else {
      input.style.display = 'none';
      this.getRef('file-name-edit-icon').style.display = 'none';
    }

    if (fileRecord.dimensions.width && fileRecord.dimensions.height) {
      this.getRef('image-dimension').style.display = visible;
      this.getRef('image-dimension-width').innerText = '' + fileRecord.dimensions.width;
      this.getRef('image-dimension-height').innerText = '' + fileRecord.dimensions.height;
    } else {
      this.getRef('image-dimension').style.display = 'none';
    }

    if (fileRecord.hasProgress()) {
      const progressEl = this.getRef('file-progress');
      progressEl.style.display = visible;
      progressEl.className = `file-progress
        ${fileRecord.progress() >= 99.9999 ? 'file-progress-full' : ''}
        ${fileRecord.progress() >= 100 ? 'file-progress-done' : ''}
        ${fileRecord.progress() > 0 ? 'has-file-progress' : ''}
      `;
      this.getRef('file-progress-bar').style.width = fileRecord.progress() + '%';
    } else {
      this.getRef('file-progress').style.display = 'none';
    }

    const svg = this.iconByExt(fileRecord.ext());
    const fileIconLink = this.getRef<HTMLLinkElement>('file-icon-link');
    const fileIcon = this.getRef('file-icon');
    if (this.hasLinkableUrl(fileRecord)) {
      fileIcon.style.display = 'none';
      fileIconLink.style.display = visible;
      fileIconLink.innerHTML = '';
      fileIconLink.appendChild(svg);
      fileIconLink.href = fileRecord.url() as string;
      fileIconLink.title = fileRecord.name();
    } else {
      fileIcon.style.display = visible;
      fileIconLink.style.display = 'none';
      fileIcon.innerHTML = '';
      fileIcon.appendChild(svg);
    }
    // return `<span class="file-icon">
    //   ${
    //     this.hasLinkableUrl(fileRecord)
    //       ? `<a href="${fileRecord.url()}" target="_blank" title="${fileRecord.name()}">
    //     ${iconHtml}
    //   </a>`
    //       : iconHtml
    //   }
    // </span>`;
    // this.getRef('file-icon').innerHTML = this.iconByExt(fileRecord.ext());

    const values = {
      'file-ext': fileRecord.ext(),
      'file-size': fileRecord.size(),
      'file-name-text': fileRecord.name(true),
    };
    for (const ref in values) {
      if (!values.hasOwnProperty(ref)) {
        continue;
      }
      const refEl = this.getRef(ref);
      refEl.innerText = (values as any)[ref];
    }
  }

  get $el() {
    if (this.cachedEl) {
      return this.cachedEl;
    }
    const fileRecord = this.$props.fileRecord as FileRecord;
    let el: HTMLElement = (fileRecord as any)._el ? (fileRecord as any)._el : undefined;
    if (!el) {
      // const el = document.createElement('div');
      if (!previewEl) {
        const templateString = template.replace(/\<icon name="(.+?)"><\/icon>/g, (match, name) => {
          return this.iconByName(name);
        });
        previewEl = this.parseTemplate(templateString);
      }
      el = previewEl.cloneNode(true) as HTMLElement;
      (fileRecord as any)._el = el;
    }
    // el.appendChild();
    // el.innerHTML = this.getHtml(fileRecord);
    this.cachedEl = el;
    this.update();
    this.bindEvents();
    return el;
  }
}
