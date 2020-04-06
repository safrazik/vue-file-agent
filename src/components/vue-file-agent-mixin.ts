import utils from '../lib/utils';
import VueFileIcon from './vue-file-icon.vue';
import VueFilePreview from './vue-file-preview.vue';
import VueFileList from './vue-file-list.vue';
import VueFileListItem from './vue-file-list-item.vue';
import FileRecord from '../lib/file-record';
import { RawFileRecord } from '../lib/file-record';
import uploader from '../lib/upload-helper';
import Vue from 'vue';
import plugins from '../lib/plugins';
import { ConfigureFn } from '../lib/ajax-request';

// tslint:disable-next-line
var dragCounter = 0;

export default Vue.extend({
  props: [
    'accept',
    'auto',
    'capture',
    'compact',
    'deletable',
    'disabled',
    'editable',
    'errorText',
    'helpText',
    'linkable',
    'maxFiles',
    'maxSize',
    'meta',
    'multiple',
    'progress',
    'read',
    'readonly',
    'resumable',
    'sortable',
    'theme',
    'thumbnailSize',
    'uploadConfig',
    'uploadHeaders',
    'uploadUrl',
    'uploadWithCredentials',
    'value',
  ],
  components: {
    VueFileIcon,
    VueFilePreview,
    VueFileList,
    VueFileListItem,
  },
  directives: {
    // https://github.com/Jexordexan/vue-slicksort/blob/master/src/HandleDirective.js
    vfaSortableHandle: {
      bind(el: HTMLElement) {
        (el as any).sortableHandle = true;
      },
    },
  },
  data() {
    return {
      fileRecords: [] as FileRecord[],
      rawFileRecords: [] as RawFileRecord[],
      isDragging: false,
      isSorting: false,
      isSortingActive: false,
      transitionDuration: 300,
      overallProgress: 0,
      uniqueId: '',
      sortTimeout: 0,
    };
  },
  computed: {
    canAddMore(): boolean {
      if (!this.hasMultiple) {
        return this.fileRecords.length === 0;
      }
      if (!this.maxFiles) {
        return true;
      }
      return this.fileRecords.length < this.maxFiles;
    },
    helpTextComputed(): string {
      if (this.helpText) {
        return this.helpText;
      }
      return 'Choose ' + (this.hasMultiple ? 'files' : 'file') + ' or drag & drop here';
    },
    isDeletable(): boolean {
      if (typeof this.deletable === 'string') {
        return this.deletable !== 'false';
      }
      return !!this.deletable;
    },
    isSortable(): boolean {
      return !!this.sortable;
    },
    hasMultiple(): boolean {
      if (typeof this.multiple === 'string') {
        return this.multiple !== 'false';
      }
      if (this.multiple === undefined) {
        return Array.isArray(this.value);
      }
      return !!this.multiple;
    },
    shouldRead(): boolean {
      if (typeof this.read === 'string') {
        return this.read === 'true';
      }
      return !!this.read;
    },
  },
  methods: {
    createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement): Promise<void> {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        utils.createVideoThumbnail(video, canvas, fileRecord.thumbnailSize).then((thumbnail) => {
          fileRecord.imageColor = thumbnail.color;
          fileRecord.videoThumbnail = thumbnail.url;
          fileRecord.dimensions.width = thumbnail.width;
          fileRecord.dimensions.height = thumbnail.height;
          resolve();
        }, reject);
      });
    },
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
      });
      video.load();
    },
    getFileRecordOrRawInstance(fileRecordOrRaw: FileRecord | RawFileRecord, raw: boolean): FileRecord | RawFileRecord {
      let i;
      if (fileRecordOrRaw instanceof FileRecord) {
        i = this.fileRecords.indexOf(fileRecordOrRaw);
      } else {
        i = this.rawFileRecords.indexOf(fileRecordOrRaw);
      }
      if (i === -1) {
        return fileRecordOrRaw;
      }
      return raw ? this.rawFileRecords[i] : this.fileRecords[i];
    },
    getFileRecordRawInstance(fileRecordOrRaw: FileRecord | RawFileRecord): RawFileRecord {
      return this.getFileRecordOrRawInstance(fileRecordOrRaw, true) as RawFileRecord;
    },
    getFileRecordInstance(fileRecordOrRaw: FileRecord | RawFileRecord): FileRecord {
      return this.getFileRecordOrRawInstance(fileRecordOrRaw, false) as FileRecord;
    },
    prepareConfigureFn(configureXhr?: ConfigureFn) {
      const uploadWithCredentials = this.uploadWithCredentials;
      if (uploadWithCredentials !== true && uploadWithCredentials !== false) {
        return configureXhr;
      }
      return (request: XMLHttpRequest) => {
        request.withCredentials = uploadWithCredentials;
        if (typeof configureXhr === 'function') {
          configureXhr(request);
        }
      };
    },
    upload(
      url: string,
      headers: object,
      fileRecordsOrRaw: FileRecord[] | RawFileRecord[],
      createFormData?: (fileRecord: FileRecord) => FormData,
      configureXhr?: ConfigureFn,
    ): Promise<any> {
      const validFileRecords: FileRecord[] = [];
      const validFilesRawData: RawFileRecord[] = [];
      for (const fileRecordOrRaw of fileRecordsOrRaw) {
        const fileRecord = this.getFileRecordInstance(fileRecordOrRaw);
        if (!fileRecord.error) {
          validFileRecords.push(fileRecord);
          validFilesRawData.push(this.getFileRecordRawInstance(fileRecord));
        }
      }
      if (this.resumable) {
        return uploader.tusUpload(plugins.tus, url, headers, validFileRecords, (overallProgress) => {
          this.overallProgress = overallProgress;
        });
      }
      return new Promise((resolve, reject) => {
        uploader
          .upload(
            url,
            headers,
            validFileRecords,
            createFormData,
            (overallProgress) => {
              this.overallProgress = overallProgress;
            },
            this.prepareConfigureFn(configureXhr),
          )
          .then(
            (res: any) => {
              for (let i = 0; i < res.length; i++) {
                res[i].fileRecord = validFilesRawData[i];
              }
              this.$emit('upload', res);
              resolve(res);
            },
            (err: any) => {
              for (let i = 0; i < err.length; i++) {
                err[i].fileRecord = validFilesRawData[i];
              }
              this.$emit('upload:error', err);
              reject(err);
            },
          );
      });
    },
    deleteUpload(
      url: string,
      headers: object,
      fileRecord: FileRecord | RawFileRecord,
      uploadData?: any,
      configureXhr?: ConfigureFn,
    ): Promise<any> {
      if (this.fileRecords.length < 1) {
        this.overallProgress = 0;
      }
      fileRecord = this.getFileRecordInstance(fileRecord);
      const rawFileRecord = this.getFileRecordRawInstance(fileRecord);
      if (this.resumable) {
        return uploader.tusDeleteUpload(plugins.tus, url, headers, fileRecord);
      }
      return new Promise((resolve, reject) => {
        uploader
          .deleteUpload(url, headers, fileRecord as FileRecord, uploadData, this.prepareConfigureFn(configureXhr))
          .then(
            (res: any) => {
              res.fileRecord = rawFileRecord;
              this.$emit('upload:delete', res);
              resolve(res);
            },
            (err: any) => {
              err.fileRecord = rawFileRecord;
              this.$emit('upload:delete:error', err);
              reject(err);
            },
          );
      });
    },
    updateUpload(
      url: string,
      headers: object,
      fileRecord: FileRecord | RawFileRecord,
      uploadData?: any,
      configureXhr?: ConfigureFn,
    ): Promise<any> {
      fileRecord = this.getFileRecordInstance(fileRecord);
      const rawFileRecord = this.getFileRecordRawInstance(fileRecord);
      return new Promise((resolve, reject) => {
        uploader
          .updateUpload(url, headers, fileRecord as FileRecord, uploadData, this.prepareConfigureFn(configureXhr))
          .then(
            (res: any) => {
              res.fileRecords = rawFileRecord;
              this.$emit('upload:update', res);
              resolve(res);
            },
            (err) => {
              err.fileRecords = rawFileRecord;
              this.$emit('upload:update:error', err);
              reject(err);
            },
          );
      });
    },
    autoUpload(fileRecords: FileRecord[] | RawFileRecord[]): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.upload(this.uploadUrl, this.uploadHeaders, fileRecords, this.uploadConfig);
    },
    autoDeleteUpload(fileRecord: FileRecord | RawFileRecord): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord, this.uploadConfig);
    },
    autoUpdateUpload(fileRecord: FileRecord): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.updateUpload(this.uploadUrl, this.uploadHeaders, fileRecord, this.uploadConfig);
    },
    equalFiles(file1: File, file2: File): boolean {
      return (
        true &&
        file1.name === file2.name &&
        file1.size === file2.size &&
        file1.type === file2.type &&
        // file1.lastModifiedDate.getTime() === file2.lastModifiedDate.getTime() &&
        file1.lastModified === file2.lastModified
      );
    },
    isFileAddedAlready(file: File): boolean {
      for (const fileRecord of this.fileRecords) {
        if (this.equalFiles(file, fileRecord.file as File)) {
          return true;
        }
      }
      return false;
    },
    handleFiles(files: File[] | FileList): void {
      if (this.disabled === true || this.readonly === true) {
        return;
      }
      if (this.hasMultiple && !this.canAddMore) {
        return;
      }
      const fileRecords: FileRecord[] = [];
      const filesFiltered: File[] = [];
      // tslint:disable-next-line
      for (let i = 0; i < files.length; i++) {
        if (this.hasMultiple && this.isFileAddedAlready(files[i])) {
          continue;
        }
        filesFiltered.push(files[i]);
      }
      files = filesFiltered;
      if (this.maxFiles && files.length > this.maxFiles - this.fileRecords.length) {
        files = files.slice(0, this.maxFiles - this.fileRecords.length);
      }
      for (const file of files) {
        fileRecords.push(
          new FileRecord(
            {
              file,
            } as RawFileRecord,
            {
              read: this.shouldRead,
              maxSize: this.maxSize,
              accept: this.accept,
              thumbnailSize: this.thumbnailSize,
            },
          ),
        );
      }

      for (const fileRecord of fileRecords) {
        if (fileRecord.file.size <= 20 * 1024 * 1024) {
          // <= 20MB
          this.initVideo(fileRecord);
        }
      }
      if (this.hasMultiple) {
        // splice: for list transitions to work properly
        this.fileRecords.splice(this.fileRecords.length, 0, ...fileRecords);
      } else {
        this.fileRecords = fileRecords;
      }

      FileRecord.readFiles(fileRecords).then((fileRecordsNew: FileRecord[]) => {
        const allFileRecordsRaw = FileRecord.toRawArray(this.fileRecords);
        this.rawFileRecords = allFileRecordsRaw;
        this.$emit('input', Array.isArray(this.value) ? allFileRecordsRaw : allFileRecordsRaw[0]);
        this.$emit('select', FileRecord.toRawArray(fileRecordsNew));
      });
      this.autoUpload(fileRecords);
    },
    filesChanged(event: InputEvent): void {
      const files: FileList = (event.target as HTMLInputElement).files as FileList;
      this.$emit('change', event);
      if (!files[0]) {
        return;
      }
      this.handleFiles(files);
      if (this.$refs.fileInput) {
        (this.$refs.fileInput as any).value = null; // do not use ''
        // because chrome won't fire change event for same file
      }
    },
    drop(event: DragEvent): void {
      event.stopPropagation();
      event.preventDefault();
      dragCounter = 0;
      this.isDragging = false;
      if (this.disabled === true || this.readonly === true) {
        return;
      }
      if (!event.dataTransfer) {
        return;
      }
      utils.getFilesFromDroppedItems(event.dataTransfer).then((files) => {
        this.$emit('drop', event);
        if (!files || !files[0]) {
          return;
        }
        if (!this.hasMultiple) {
          files = [files[0]];
        }
        this.handleFiles(files);
      });
    },
    dragEnter(event: DragEvent): void {
      if (!event.dataTransfer) {
        return;
      }
      this.isDragging = true;
      event.stopPropagation();
      event.preventDefault();
      dragCounter++;
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    },
    dragOver(event: DragEvent): void {
      if (!event.dataTransfer) {
        return;
      }
      this.isDragging = true;
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    },
    dragLeave(event: DragEvent): void {
      if (!event.dataTransfer) {
        return;
      }
      dragCounter--;
      if (dragCounter === 0) {
        this.isDragging = false;
      }
    },
    removeFileRecord(fileRecordOrRaw: FileRecord | RawFileRecord): void {
      let i: number;
      if (fileRecordOrRaw instanceof FileRecord) {
        i = this.fileRecords.indexOf(fileRecordOrRaw);
      } else {
        i = this.rawFileRecords.indexOf(fileRecordOrRaw);
      }
      let fileRecord = this.fileRecords[i];
      let rawFileRecord = this.rawFileRecords[i];
      this.$emit('input', this.rawFileRecords);
      this.$emit('delete', rawFileRecord);
      fileRecord = this.fileRecords.splice(i, 1)[0];
      rawFileRecord = this.rawFileRecords.splice(i, 1)[0];
      this.autoDeleteUpload(fileRecord).then(
        (res) => {
          /* no op */
        },
        (err) => {
          this.fileRecords.splice(i, 1, fileRecord);
          this.rawFileRecords.splice(i, 1, rawFileRecord);
        },
      );
    },
    filenameChanged(fileRecord: FileRecord): void {
      this.$emit('rename', FileRecord.toRawArray([fileRecord])[0]);
      this.autoUpdateUpload(fileRecord).then(
        (res) => {
          /* no op */
        },
        (err) => {
          fileRecord.customName = fileRecord.oldCustomName;
        },
      );
    },
    checkValue(): void {
      let rawFileRecords: RawFileRecord[] = this.value || [];
      rawFileRecords = Array.isArray(rawFileRecords) ? rawFileRecords : [rawFileRecords];

      const fdPromises: Array<Promise<FileRecord>> = [];
      const rawFileRecordsNew: RawFileRecord[] = [];

      for (let i = 0; i < rawFileRecords.length; i++) {
        const existingIndex = this.rawFileRecords.indexOf(rawFileRecords[i]);
        if (existingIndex !== -1) {
          fdPromises.push(Promise.resolve(this.fileRecords[existingIndex]));
          rawFileRecordsNew[i] = this.rawFileRecords[existingIndex];
        } else {
          fdPromises.push(
            FileRecord.fromRaw(rawFileRecords[i], {
              read: this.shouldRead,
              maxSize: this.maxSize,
              accept: this.accept,
              thumbnailSize: this.thumbnailSize,
            }),
          );
          rawFileRecordsNew.push(rawFileRecords[i]);
        }
      }

      this.rawFileRecords = rawFileRecordsNew;
      Promise.all(fdPromises).then((fileRecords) => {
        this.fileRecords = fileRecords;
      });
    },
    sortStart(): void {
      if (this.sortTimeout) {
        clearTimeout(this.sortTimeout);
      }
      this.isSorting = true;
      this.isSortingActive = true;
    },
    sortEnd(sortData: { event: Event; newIndex: number; oldIndex: number; collection: any }): void {
      this.isSortingActive = false;
      if (this.sortTimeout) {
        clearTimeout(this.sortTimeout);
      }
      this.sortTimeout = setTimeout(() => {
        this.isSorting = false;
      }, this.transitionDuration + 100);
      if (sortData.oldIndex !== sortData.newIndex) {
        this.rawFileRecords = utils.arrayMove(this.rawFileRecords, sortData.oldIndex, sortData.newIndex);
        this.$nextTick(() => {
          this.$emit('input', this.rawFileRecords);
          this.$emit('sort', {
            oldIndex: sortData.oldIndex,
            newIndex: sortData.newIndex,
          });
        });
      }
    },
  },
  created() {
    this.uniqueId =
      new Date().getTime().toString(36) +
      Math.random()
        .toString(36)
        .slice(2);
    this.checkValue();
  },
  watch: {
    value() {
      this.checkValue();
    },
  },
});
