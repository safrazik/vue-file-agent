import { Component } from './component';
import template from './file-preview.html';
import FileRecord from '../lib/file-record';
import { FileIcon } from './file-icon';
import utils from '../lib/utils';
import { FilePreviewProps } from '../lib/props';

let previewEl: Element;

export class FilePreview extends Component {
  isEditInputFocused = false;
  isEditCancelable = true;

  isVisible = '';

  constructor(public $props: FilePreviewProps) {
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
        fileRecord.thumbnail(thumbnail);
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

  hasDismissibleError() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    return !(fileRecord.error && (fileRecord.error.size || fileRecord.error.type));
  }

  dismissError() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    if (!this.hasDismissibleError()) {
      return;
    }
    fileRecord.customError(false);
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
    // fileRecord.oldFileName = fileRecord.name();
    const oldValue = fileRecord.nameWithoutExtension();
    const newValue = this.getRef<HTMLInputElement>('file-name-input').value;
    // fileRecord.customName = value;
    // const newValue = fileRecord.nameWithoutExtension();
    if (newValue !== oldValue) {
      // fileRecord.oldCustomName = oldValue;
      // this.update();
      fileRecord.nameWithoutExtension(newValue);
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
    const fileRecord = this.$props.fileRecord as FileRecord;
    input.value = fileRecord.nameWithoutExtension() as string;
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

  updateProgress() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    if (fileRecord.hasProgress()) {
      const progressEl = this.getRef('file-progress');
      progressEl.style.display = this.isVisible;
      progressEl.className = `file-progress
        ${fileRecord.progress() >= 99.9999 ? 'file-progress-full' : ''}
        ${fileRecord.progress() >= 100 ? 'file-progress-done' : ''}
        ${fileRecord.progress() > 0 ? 'has-file-progress' : ''}
      `;
      this.getRef('file-progress-bar').style.width = fileRecord.progress() + '%';
    } else {
      this.getRef('file-progress').style.display = 'none';
    }
  }

  updateError() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    this.toggleClass(this.$el, 'has-error', !!fileRecord.error);
    this.getRef('error-wrapper').style.display = fileRecord.error ? this.isVisible : 'none';
    const errorText = this.getRef('error-text');
    errorText.innerText = fileRecord.getErrorMessage(this.$props.errorText);
    this.getRef('error-dismiss').style.display = this.hasDismissibleError() ? this.isVisible : 'none';
    // if (this.hasDismissibleError()) {
    //   const dismiss = document.createElement('small');
    //   dismiss.style.marginLeft = '5px';
    //   dismiss.style.fontWeight = 'normal';
    //   dismiss.style.cursor = 'pointer';
    //   dismiss.innerText = 'dismiss';
    //   // dismiss.appendChild(this.getIcon({ name: 'system-close' }));
    //   errorText.appendChild(dismiss);
    // }
  }

  updateName() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    const input = this.getRef<HTMLInputElement>('file-name-input');
    input.value = fileRecord.nameWithoutExtension() as string;
    this.getRef('file-name-text').innerText = input.value;
  }

  updateUrl() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    const svg = this.iconByExt(fileRecord.ext());
    const fileIconLink = this.getRef<HTMLLinkElement>('file-icon-link');
    const fileIcon = this.getRef('file-icon');
    if (this.hasLinkableUrl(fileRecord)) {
      fileIcon.style.display = 'none';
      fileIconLink.style.display = this.isVisible;
      fileIconLink.innerHTML = '';
      fileIconLink.appendChild(svg);
      fileIconLink.href = fileRecord.url() as string;
      fileIconLink.title = fileRecord.name();
    } else {
      fileIcon.style.display = this.isVisible;
      fileIconLink.style.display = 'none';
      fileIcon.innerHTML = '';
      fileIcon.appendChild(svg);
    }
  }

  updateThumbnail() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    if (fileRecord.isImage() || fileRecord.isPlayableVideo()) {
      this.getRef('thumbnail').style.display = this.isVisible;
      if (this.hasLinkableUrl(fileRecord)) {
        const link = this.getRef<HTMLLinkElement>('thumbnail-link');
        link.style.display = this.isVisible;
        this.getRef('thumbnail-image').style.display = 'none';
        const img = this.getRef<HTMLImageElement>('thumbnail-link-image');
        img.src = fileRecord.src();
        link.title = fileRecord.name();
        link.href = fileRecord.url() as string;
      } else {
        this.getRef('thumbnail-link').style.display = 'none';
        const img = this.getRef<HTMLImageElement>('thumbnail-image');
        img.style.display = this.isVisible;
        img.src = fileRecord.src();
      }
    } else {
      this.getRef('thumbnail').style.display = 'none';
    }
  }

  updateDimensions() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    if (fileRecord.dimensions.width && fileRecord.dimensions.height) {
      this.getRef('image-dimension').style.display = this.isVisible;
      this.getRef('image-dimension-width').innerText = '' + fileRecord.dimensions.width;
      this.getRef('image-dimension-height').innerText = '' + fileRecord.dimensions.height;
    } else {
      this.getRef('image-dimension').style.display = 'none';
    }
  }

  update() {
    const fileRecord = this.$props.fileRecord as FileRecord;
    this.updateWrapper();
    this.updateError();

    this.getRef('av-wrapper').style.display =
      fileRecord.isPlayableAudio() || fileRecord.isPlayableVideo() ? this.isVisible : 'none';

    const previewRefEl = this.getRef('preview');

    previewRefEl.className = `file-preview
          ${fileRecord.isImage() ? 'image-preview' : ''}
          ${!fileRecord.isImage() ? 'other-preview' : ''}
          ${fileRecord.isImage() && fileRecord.isDarkColor() ? 'dark-content' : ''}
        `;

    previewRefEl.style.backgroundColor = fileRecord.color();

    this.updateThumbnail();

    this.getRef('file-delete').style.display = this.$props.deletable ? this.isVisible : 'none';

    const input = this.getRef<HTMLInputElement>('file-name-input');
    if (this.$props.editable === true) {
      input.style.display = this.isVisible;
      input.value = fileRecord.nameWithoutExtension() as string;
      this.getRef('file-name-edit-icon').style.display = this.isVisible;
    } else {
      input.style.display = 'none';
      this.getRef('file-name-edit-icon').style.display = 'none';
    }

    this.updateDimensions();
    this.updateProgress();
    this.updateName();

    this.updateUrl();

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
      // 'file-name-text': fileRecord.nameWithoutExtension(),
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
      // (fileRecord as any)._el = el;
    }
    // el.appendChild();
    // el.innerHTML = this.getHtml(fileRecord);
    this.cachedEl = el;
    this.update();
    this.bindEvents();
    return el;
  }
}
