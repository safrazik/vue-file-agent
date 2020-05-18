import { Component } from './component';
import template from './file-agent.html';
import FileRecord, { RawFileRecord } from '../lib/file-record';
import { FileIcon } from './file-icon';
import { FilePreview } from './file-preview';
import utils from '../lib/utils';
import uploader from '../lib/uploader/upload-helper';

interface Props {
  multiple?: boolean;
  averageColor?: boolean;
  theme?: 'default' | 'list';
  sortable?: boolean | 'hold' | 'handle';
  meta?: boolean;
  compact?: boolean;
  deletable?: boolean;
  editable?: boolean;
  linkable?: boolean;
  helpText?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxFiles?: number;
  maxSize?: string;
  accept?: string;
  capture?: string;
  thumbnailSize?: number;
  fileRecords: FileRecord[];
  draggable?: boolean | HTMLElement;
  onBeforeDelete?: (fileRecord: FileRecord) => boolean | Promise<boolean>;
  onDelete?: (fileRecord: FileRecord) => void;
  onChange?: (event: InputEvent) => void;
  onDrop?: (event: DragEvent) => void;
  onBeforeRename?: (fileRecord: FileRecord) => boolean | Promise<boolean>;
  onRename?: (fileRecord: FileRecord) => void;
  // errorText?: {
  //   // common?: string;
  //   type?: string;
  //   size?: string;
  //   // upload?: string;
  // };
  slots?: {
    afterInner?: HTMLElement | string;
    afterOuter?: HTMLElement | string;
    beforeInner?: HTMLElement | string;
    beforeOuter?: HTMLElement | string;
    filePreview?: (fileRecord: FileRecord, index: number) => HTMLElement | string;
    filePreviewNew?: HTMLElement | string;
    sortableHandle?: HTMLElement | string;
  };
}

let fileAgentEl: Element;
let newFilePreviewEl: Element;

// tslint:disable-next-line
var dragCounter = 0;

export class FileAgent extends Component {
  isDragging = false;
  isSorting = false;
  isSortingActive = false;

  constructor(public $props: Props) {
    super();
  }

  get isSortable() {
    return !!this.$props.sortable;
  }

  get hasMultiple() {
    // if (this.$props.multiple === undefined) {
    //   return Array.isArray(this.$props.value);
    // }
    return !!this.$props.multiple;
  }

  get canAddMore(): boolean {
    if (!this.hasMultiple) {
      return this.$props.fileRecords.length === 0;
    }
    if (!this.$props.maxFiles) {
      return true;
    }
    return this.$props.fileRecords.length < this.$props.maxFiles;
  }

  get helpTextComputed(): string {
    if (this.$props.helpText) {
      return this.$props.helpText;
    }
    return 'Choose ' + (this.hasMultiple ? 'files' : 'file') + ' or drag & drop here';
  }

  equalFiles(file1: File, file2: File): boolean {
    return (
      true &&
      file1.name === file2.name &&
      file1.size === file2.size &&
      file1.type === file2.type &&
      // file1.lastModifiedDate.getTime() === file2.lastModifiedDate.getTime() &&
      file1.lastModified === file2.lastModified
    );
  }

  isFileAddedAlready(file: File): boolean {
    for (const fileRecord of this.$props.fileRecords) {
      if (this.equalFiles(file, fileRecord.file as File)) {
        return true;
      }
    }
    return false;
  }

  createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement): Promise<void> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      utils
        .createVideoThumbnail(video, canvas, fileRecord.thumbnailSize, this.$props.averageColor !== false)
        .then((thumbnail) => {
          fileRecord.imageColor = thumbnail.color;
          fileRecord.videoThumbnail = thumbnail.url;
          fileRecord.dimensions.width = thumbnail.width;
          fileRecord.dimensions.height = thumbnail.height;
          resolve();
        }, reject);
    });
  }

  initVideo(fileRecord: FileRecord): void {
    if (!fileRecord.isPlayableVideo()) {
      return;
    }
    const createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
    const revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
    const video = document.createElement('video');
    video.src = createObjectURL(fileRecord.file);
    this.createThumbnail(fileRecord, video).then(() => {
      revokeObjectURL(video.src);
      if ((fileRecord as any)._filePreview) {
        (fileRecord as any)._filePreview.update();
      }
    });
    video.load();
  }

  upload() {
    uploader.upload('', {}, []);
  }

  handleFiles(files: File[] | FileList): void {
    if (this.$props.disabled === true || this.$props.readonly === true) {
      return;
    }
    if (this.hasMultiple && !this.canAddMore) {
      return;
    }
    // const fileRecords: FileRecord[] = [];
    let filesArray: File[] = [];
    // tslint:disable-next-line
    for (let i = 0; i < files.length; i++) {
      if (this.hasMultiple && this.isFileAddedAlready(files[i])) {
        continue;
      }
      filesArray.push(files[i]);
    }
    if (
      this.hasMultiple &&
      this.$props.maxFiles &&
      filesArray.length > this.$props.maxFiles - this.$props.fileRecords.length
    ) {
      filesArray = filesArray.slice(0, this.$props.maxFiles - this.$props.fileRecords.length);
    }
    FileRecord.fromRawArray(
      filesArray.map((file) => {
        return { file } as RawFileRecord;
      }),
      {
        read: false,
        maxSize: this.$props.maxSize,
        accept: this.$props.accept,
        thumbnailSize: this.$props.thumbnailSize,
        averageColor: this.$props.averageColor,
      },
    ).then((fileRecords) => {
      for (const fileRecord of fileRecords) {
        if (fileRecord.file.size <= 20 * 1024 * 1024) {
          // <= 20MB
          this.initVideo(fileRecord);
        }
      }
      if (this.hasMultiple) {
        // splice: for list transitions to work properly
        this.$props.fileRecords.splice(this.$props.fileRecords.length, 0, ...fileRecords);
      } else {
        this.$props.fileRecords[0] = fileRecords[0];
      }

      this.update();
      /*       FileRecord.readFiles(fileRecords).then((fileRecordsNew: FileRecord[]) => {
        // const allFileRecordsRaw = FileRecord.toRawArray(this.$props.fileRecords);
        // this.rawFileRecords = allFileRecordsRaw;
        // this.$emit('input', Array.isArray(this.value) ? allFileRecordsRaw : allFileRecordsRaw[0]);
        // this.$emit('select', FileRecord.toRawArray(fileRecordsNew));
      }); */
      // this.autoUpload(fileRecords);
    });
    // for (const file of filesArray) {
    //   fileRecords.push(
    //     new FileRecord(
    //       {
    //         file,
    //       } as RawFileRecord,
    //       {
    //         read: false,
    //         maxSize: this.$props.maxSize,
    //         accept: this.$props.accept,
    //         thumbnailSize: this.$props.thumbnailSize,
    //         averageColor: this.$props.averageColor,
    //       },
    //     ),
    //   );
    // }
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

  getRef<T extends HTMLElement>(ref: string, el?: Element): T {
    return ((el || this.$el).querySelector('[data-ref="' + ref + '"]') as T) || document.createElement('span');
  }

  getSlot<T extends HTMLElement>(slot: string): T {
    return this.$el.querySelector('[data-slot="' + slot + '"]') as T;
  }

  deleteFileRecord(fileRecord: FileRecord) {
    const i = this.$props.fileRecords.indexOf(fileRecord);
    const fr = this.$props.fileRecords.splice(i, 1)[0];
    this.update();
    if (this.$props.onDelete) {
      this.$props.onDelete(fileRecord);
    }
  }

  renameFileRecord(fileRecord: FileRecord) {
    // should be saved
  }

  cancelRenameFileRecord(fileRecord: FileRecord) {
    fileRecord.customName = fileRecord.oldCustomName;
    if ((fileRecord as any)._filePreview) {
      (fileRecord as any)._filePreview.update();
    }
  }

  onBeforeCheckEvent(
    fileRecord: FileRecord,
    onBeforeEvent: ((FileRecord: FileRecord) => boolean | Promise<boolean>) | undefined,
    okFn: () => void,
    cancelFn: () => void,
  ) {
    if (!onBeforeEvent) {
      okFn();
      return;
    }
    const response = onBeforeEvent(fileRecord);
    if (utils.isPromise(response)) {
      (response as Promise<boolean>).then((result) => {
        if (result === false) {
          cancelFn();
        } else {
          okFn();
        }
      });
    } else {
      if (response === false) {
        cancelFn();
      } else {
        okFn();
      }
    }
  }

  onDeleteFileRecord(fileRecord: FileRecord) {
    this.onBeforeCheckEvent(
      fileRecord,
      this.$props.onBeforeDelete,
      () => {
        this.deleteFileRecord(fileRecord);
      },
      () => {
        // no op
      },
    );
  }

  onRenameFileRecord(fileRecord: FileRecord) {
    this.onBeforeCheckEvent(
      fileRecord,
      this.$props.onBeforeRename,
      () => {
        this.renameFileRecord(fileRecord);
      },
      () => {
        this.cancelRenameFileRecord(fileRecord);
      },
    );
  }

  filesChanged(event: InputEvent) {
    const files: FileList = (event.target as HTMLInputElement).files as FileList;
    if (this.$props.onChange) {
      this.$props.onChange(event);
    }
    if (!files[0]) {
      return;
    }
    this.handleFiles(files);
    const input = this.getRef<HTMLInputElement>('file-input');
    if (input) {
      (input as any).value = null; // do not use ''
      // because chrome won't fire change event for same file
    }
  }

  drop(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    dragCounter = 0;
    this.updateDragStatus(false);
    if (this.$props.disabled === true || this.$props.readonly === true) {
      return;
    }
    if (!event.dataTransfer) {
      return;
    }
    utils.getFilesFromDroppedItems(event.dataTransfer).then((files) => {
      if (this.$props.onDrop) {
        this.$props.onDrop(event);
      }
      if (!files || !files[0]) {
        return;
      }
      if (!this.hasMultiple) {
        files = [files[0]];
      }
      this.handleFiles(files);
    });
  }

  dragEnter(event: DragEvent): void {
    if (!event.dataTransfer) {
      return;
    }
    this.updateDragStatus(true);
    event.stopPropagation();
    event.preventDefault();
    dragCounter++;
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  dragOver(event: DragEvent): void {
    if (!event.dataTransfer) {
      return;
    }
    this.updateDragStatus(true);
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  dragLeave(event: DragEvent): void {
    if (!event.dataTransfer) {
      return;
    }
    dragCounter--;
    if (dragCounter === 0) {
      this.updateDragStatus(false);
    }
  }

  bindEvents() {
    // @dragover="dragOver"
    // @dragenter="dragEnter"
    // @dragleave="dragLeave"
    // @drop="drop"
    if (this.$props.draggable === false) {
      return;
    }
    const dragEl =
      this.$props.draggable === undefined || this.$props.draggable === true
        ? this.$el
        : (this.$props.draggable as HTMLElement);
    dragEl.ondragover = (event) => {
      this.dragOver(event);
    };
    dragEl.ondragenter = (event) => {
      this.dragEnter(event);
    };
    dragEl.ondragleave = (event) => {
      this.dragLeave(event);
    };
    dragEl.ondrop = (event) => {
      this.drop(event);
    };
  }

  updateDragStatus(isDragging: boolean) {
    // console.log('update drag status');
    if (this.isDragging === isDragging) {
      return;
    }
    // console.log('updating drag status...');
    this.isDragging = isDragging;
    if (this.$props.draggable === false) {
      return;
    }
    const dragEl =
      this.$props.draggable === undefined || this.$props.draggable === true
        ? this.$el
        : (this.$props.draggable as HTMLElement);
    this.toggleClass(dragEl, 'file-agent-drag-over', this.isDragging);
    if (this.isDragging) {
      // dragEl.classList.add('is-drag-over');
      // dragEl.classList.add('file-agent-drag-over');
      const isValid = !(
        this.$props.disabled === true ||
        this.$props.readonly === true ||
        (this.hasMultiple && !this.canAddMore)
      );
      this.toggleClass(dragEl, 'file-agent-drag-valid', isValid);
      this.toggleClass(dragEl, 'file-agent-drag-invalid', !isValid);
    } else {
      // dragEl.classList.remove('is-drag-over');
      // dragEl.classList.remove('file-agent-drag-over');
    }
    // this.updateWrapper();
  }

  updateWrapper() {
    this.$el.className = `theme-${this.$props.theme}
      is-sortable-${this.isSortable ? 'enabled' : 'disabled'}
      ${this.$props.sortable === 'hold' ? 'is-sortable-hold' : ''}
      ${this.$props.sortable === 'handle' ? 'is-sortable-handle' : ''}
      ${this.$props.sortable === true ? 'is-sortable-immediately' : ''}
      ${this.isSorting ? 'is-sorting' : ''}
      ${this.isSortingActive ? 'is-sorting-active' : ''}
      ${this.isDragging ? 'is-drag-over' : ''}
      ${this.$props.disabled === true ? 'is-disabled' : ''}
      ${this.$props.readonly === true ? 'is-readonly' : ''}
      ${
        !(this.$props.disabled === true || this.$props.readonly === true || (this.hasMultiple && !this.canAddMore))
          ? 'is-drag-valid'
          : ''
      }
    `;
    this.getRef('container').className = `grid-block-wrapper vue-file-agent file-input-wrapper
      ${!!this.$props.compact ? 'is-compact' : ''}
      ${!this.hasMultiple ? 'is-single' : ''}
      ${this.hasMultiple ? 'has-multiple' : ''}
      ${this.$props.meta === false ? 'no-meta' : ''}
    `;
  }

  getSlotContentParsed(slotContent: string | HTMLElement): HTMLElement {
    if (typeof slotContent === 'string') {
      const div = document.createElement('div');
      div.innerHTML = slotContent;
      if (div.children.length === 1) {
        return div.firstChild as HTMLElement;
      }
      return div;
    }
    return slotContent;
  }
  getSlotContent(slot: string) {
    if (!this.$props.slots) {
      return;
    }
    const slotContent: string | HTMLElement = (this.$props.slots as any)[slot];
    if (!slotContent) {
      return;
    }
    return this.getSlotContentParsed(slotContent);
  }

  insertSlot(slot: string) {
    const slotContent = this.getSlotContent(slot);
    if (!slotContent) {
      return;
    }
    const slotEl = this.getSlot(slot);
    slotEl.innerHTML = '';
    slotEl.appendChild(slotContent);
  }

  insertSlotBefore(ref: string | HTMLElement, slot: string) {
    return this.insertSlot(slot);
    // const slotContent = this.getSlotContent(slot);
    // if (!slotContent) {
    //   return;
    // }
    // const el = typeof ref === 'string' ? this.getRef(ref) : (ref as HTMLElement);
    // el.insertBefore(slotContent, el.firstChild);
  }

  insertSlotAfter(ref: string | HTMLElement, slot: string) {
    return this.insertSlot(slot);
    // const slotContent = this.getSlotContent(slot);
    // if (!slotContent) {
    //   return;
    // }
    // const el = typeof ref === 'string' ? this.getRef(ref) : (ref as HTMLElement);
    // el.appendChild(slotContent);
  }

  update() {
    this.updateWrapper();
    // const container = this.getRef('file-preview-wrapper-container');
    const container = this.getRef('file-preview-list');
    // console.log('this.$props.fileRecords', this.$props.fileRecords);
    container.innerHTML = '';
    const slotContent = this.getSlotContent('filePreviewNew');
    if (slotContent) {
      container.appendChild(slotContent);
    } else {
      container.appendChild(newFilePreviewEl);
    }
    this.getRef('help-text').innerText = this.helpTextComputed;

    this.insertSlotBefore(this.$el, 'beforeOuter');
    this.insertSlotBefore('container', 'beforeInner');
    this.insertSlotAfter('container', 'afterInner');
    this.insertSlotAfter(this.$el, 'afterOuter');

    let index = 0;
    for (const fileRecord of this.$props.fileRecords.concat([]).reverse()) {
      const child = document.createElement('div');
      child.className = 'file-preview-wrapper grid-box-item grid-block';
      if (this.$props.slots && this.$props.slots.filePreview) {
        const previewSlotContent = this.getSlotContentParsed(this.$props.slots.filePreview(fileRecord, index));
        child.appendChild(previewSlotContent);
      } else {
        let filePreview: FilePreview = (fileRecord as any)._filePreview;
        if (!filePreview) {
          filePreview = new FilePreview({
            fileRecord,
            deletable: this.$props.deletable,
            editable: this.$props.editable,
            linkable: this.$props.linkable,
            onRename: (fr) => {
              this.onRenameFileRecord(fr);
            },
            onDelete: (fr) => {
              this.onDeleteFileRecord(fr);
            },
          });
          (fileRecord as any)._filePreview = filePreview;
          child.classList.add('grid-box-enter');
          setTimeout(() => {
            child.classList.remove('grid-box-enter');
          }, 10);
        }
        filePreview.render(child);
      }
      if (container.firstChild) {
        container.insertBefore(child, container.firstChild);
      } else {
        container.appendChild(child);
      }
      index++;
    }
    const input = this.getRef<HTMLInputElement>('file-input');
    input.disabled = this.$props.disabled === true || (this.hasMultiple && !this.canAddMore);
    input.multiple = this.hasMultiple;
    input.accept = this.$props.accept || '*';
    (input as any).capture = this.$props.capture || undefined;
    input.onchange = (event) => {
      this.filesChanged(event as InputEvent);
    };
  }

  get $el(): HTMLElement {
    if (this.cachedEl) {
      return this.cachedEl as HTMLElement;
    }
    // let el?: HTMLElement;
    // if (!el) {
    // const el = document.createElement('div');
    if (!fileAgentEl) {
      const templateString = template.replace(/\<icon name="(.+?)"><\/icon>/g, (match, name) => {
        return this.iconByName(name);
      });
      fileAgentEl = this.parseTemplate(templateString);
      newFilePreviewEl = this.getRef('file-preview-new', fileAgentEl);
    }
    const el = fileAgentEl.cloneNode(true) as HTMLElement;
    this.cachedEl = el;
    const uniqueId = new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
    el.id = 'vfa-' + uniqueId;

    this.update();
    this.bindEvents();
    return el;
  }
}
