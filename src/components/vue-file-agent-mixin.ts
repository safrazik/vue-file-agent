import utils from '../lib/utils';
import VueFileIcon from './vue-file-icon.vue';
import VueFilePreview from './vue-file-preview.vue';
import VueFileList from './vue-file-list.vue';
import VueFileListItem from './vue-file-list-item.vue';
import FileData from '../lib/file-data';
import { RawFileData } from '../lib/file-data';
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
      filesData: [] as FileData[],
      filesDataRaw: [] as RawFileData[],
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
        return this.filesData.length === 0;
      }
      if (!this.maxFiles) {
        return true;
      }
      return this.filesData.length < this.maxFiles;
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
    createThumbnail(fileData: FileData, video: HTMLVideoElement): Promise<void> {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        utils.createVideoThumbnail(video, canvas, fileData.thumbnailSize).then((thumbnail) => {
          fileData.imageColor = thumbnail.color;
          fileData.videoThumbnail = thumbnail.url;
          fileData.dimensions.width = thumbnail.width;
          fileData.dimensions.height = thumbnail.height;
          resolve();
        }, reject);
      });
    },
    initVideo(fileData: FileData): void {
      if (!fileData.isPlayableVideo()) {
        return;
      }
      const createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
      const revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
      const video = document.createElement('video');
      video.src = createObjectURL(fileData.file);
      this.createThumbnail(fileData, video).then(() => {
        revokeObjectURL(video.src);
      });
      video.load();
    },
    getFileDataOrRawInstance(fileDataOrRaw: FileData | RawFileData, raw: boolean): FileData | RawFileData {
      let i;
      if (fileDataOrRaw instanceof FileData) {
        i = this.filesData.indexOf(fileDataOrRaw);
      } else {
        i = this.filesDataRaw.indexOf(fileDataOrRaw);
      }
      if (i === -1) {
        return fileDataOrRaw;
      }
      return raw ? this.filesDataRaw[i] : this.filesData[i];
    },
    getFileDataRawInstance(fileDataOrRaw: FileData | RawFileData): RawFileData {
      return this.getFileDataOrRawInstance(fileDataOrRaw, true) as RawFileData;
    },
    getFileDataInstance(fileDataOrRaw: FileData | RawFileData): FileData {
      return this.getFileDataOrRawInstance(fileDataOrRaw, false) as FileData;
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
      filesDataOrRaw: FileData[] | RawFileData[],
      createFormData?: (fileData: FileData) => FormData,
      configureXhr?: ConfigureFn,
    ): Promise<any> {
      const validFilesData: FileData[] = [];
      const validFilesRawData: RawFileData[] = [];
      for (const fileDataOrRaw of filesDataOrRaw) {
        const fileData = this.getFileDataInstance(fileDataOrRaw);
        if (!fileData.error) {
          validFilesData.push(fileData);
          validFilesRawData.push(this.getFileDataRawInstance(fileData));
        }
      }
      if (this.resumable) {
        return uploader.tusUpload(plugins.tus, url, headers, validFilesData, (overallProgress) => {
          this.overallProgress = overallProgress;
        });
      }
      return new Promise((resolve, reject) => {
        uploader
          .upload(
            url,
            headers,
            validFilesData,
            createFormData,
            (overallProgress) => {
              this.overallProgress = overallProgress;
            },
            this.prepareConfigureFn(configureXhr),
          )
          .then(
            (res: any) => {
              for (let i = 0; i < res.length; i++) {
                res[i].fileData = validFilesRawData[i];
              }
              this.$emit('upload', res);
              resolve(res);
            },
            (err: any) => {
              for (let i = 0; i < err.length; i++) {
                err[i].fileData = validFilesRawData[i];
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
      fileData: FileData | RawFileData,
      uploadData?: any,
      configureXhr?: ConfigureFn,
    ): Promise<any> {
      if (this.filesData.length < 1) {
        this.overallProgress = 0;
      }
      fileData = this.getFileDataInstance(fileData);
      const fileDataRaw = this.getFileDataRawInstance(fileData);
      if (this.resumable) {
        return uploader.tusDeleteUpload(plugins.tus, url, headers, fileData);
      }
      return new Promise((resolve, reject) => {
        uploader
          .deleteUpload(url, headers, fileData as FileData, uploadData, this.prepareConfigureFn(configureXhr))
          .then(
            (res: any) => {
              res.fileData = fileDataRaw;
              this.$emit('upload:delete', res);
              resolve(res);
            },
            (err: any) => {
              err.fileData = fileDataRaw;
              this.$emit('upload:delete:error', err);
              reject(err);
            },
          );
      });
    },
    updateUpload(
      url: string,
      headers: object,
      fileData: FileData | RawFileData,
      uploadData?: any,
      configureXhr?: ConfigureFn,
    ): Promise<any> {
      fileData = this.getFileDataInstance(fileData);
      const fileDataRaw = this.getFileDataRawInstance(fileData);
      return new Promise((resolve, reject) => {
        uploader
          .updateUpload(url, headers, fileData as FileData, uploadData, this.prepareConfigureFn(configureXhr))
          .then(
            (res: any) => {
              res.filesData = fileDataRaw;
              this.$emit('upload:update', res);
              resolve(res);
            },
            (err) => {
              err.filesData = fileDataRaw;
              this.$emit('upload:update:error', err);
              reject(err);
            },
          );
      });
    },
    autoUpload(filesData: FileData[] | RawFileData[]): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.upload(this.uploadUrl, this.uploadHeaders, filesData, this.uploadConfig);
    },
    autoDeleteUpload(fileData: FileData | RawFileData): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.deleteUpload(this.uploadUrl, this.uploadHeaders, fileData, this.uploadConfig);
    },
    autoUpdateUpload(fileData: FileData): Promise<any> {
      if (!this.uploadUrl || this.auto === false) {
        return Promise.resolve(false);
      }
      return this.updateUpload(this.uploadUrl, this.uploadHeaders, fileData, this.uploadConfig);
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
      for (const fileData of this.filesData) {
        if (this.equalFiles(file, fileData.file as File)) {
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
      const filesData: FileData[] = [];
      const filesFiltered: File[] = [];
      // tslint:disable-next-line
      for (let i = 0; i < files.length; i++) {
        if (this.hasMultiple && this.isFileAddedAlready(files[i])) {
          continue;
        }
        filesFiltered.push(files[i]);
      }
      files = filesFiltered;
      if (this.maxFiles && files.length > this.maxFiles - this.filesData.length) {
        files = files.slice(0, this.maxFiles - this.filesData.length);
      }
      for (const file of files) {
        filesData.push(
          new FileData(
            {
              file,
            } as RawFileData,
            {
              read: this.shouldRead,
              maxSize: this.maxSize,
              accept: this.accept,
              thumbnailSize: this.thumbnailSize,
            },
          ),
        );
      }

      for (const fileData of filesData) {
        if (fileData.file.size <= 20 * 1024 * 1024) {
          // <= 20MB
          this.initVideo(fileData);
        }
      }
      if (this.hasMultiple) {
        // splice: for list transitions to work properly
        this.filesData.splice(this.filesData.length, 0, ...filesData);
      } else {
        this.filesData = filesData;
      }

      FileData.readFiles(filesData).then((filesDataNew: FileData[]) => {
        const allFilesDataRaw = FileData.toRawArray(this.filesData);
        this.filesDataRaw = allFilesDataRaw;
        this.$emit('input', Array.isArray(this.value) ? allFilesDataRaw : allFilesDataRaw[0]);
        this.$emit('select', FileData.toRawArray(filesDataNew));
      });
      this.autoUpload(filesData);
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
    removeFileData(fileDataOrRaw: FileData | RawFileData): void {
      let i: number;
      if (fileDataOrRaw instanceof FileData) {
        i = this.filesData.indexOf(fileDataOrRaw);
      } else {
        i = this.filesDataRaw.indexOf(fileDataOrRaw);
      }
      let fileData = this.filesData[i];
      let fileDataRaw = this.filesDataRaw[i];
      this.$emit('input', this.filesDataRaw);
      this.$emit('delete', fileDataRaw);
      fileData = this.filesData.splice(i, 1)[0];
      fileDataRaw = this.filesDataRaw.splice(i, 1)[0];
      this.autoDeleteUpload(fileData).then(
        (res) => {
          /* no op */
        },
        (err) => {
          this.filesData.splice(i, 1, fileData);
          this.filesDataRaw.splice(i, 1, fileDataRaw);
        },
      );
    },
    filenameChanged(fileData: FileData): void {
      this.$emit('rename', FileData.toRawArray([fileData])[0]);
      this.autoUpdateUpload(fileData).then(
        (res) => {
          /* no op */
        },
        (err) => {
          fileData.customName = fileData.oldCustomName;
        },
      );
    },
    checkValue(): void {
      let filesDataRaw: RawFileData[] = this.value || [];
      filesDataRaw = Array.isArray(filesDataRaw) ? filesDataRaw : [filesDataRaw];

      const fdPromises: Array<Promise<FileData>> = [];
      const filesDataRawNew: RawFileData[] = [];

      for (let i = 0; i < filesDataRaw.length; i++) {
        const existingIndex = this.filesDataRaw.indexOf(filesDataRaw[i]);
        if (existingIndex !== -1) {
          fdPromises.push(Promise.resolve(this.filesData[existingIndex]));
          filesDataRawNew[i] = this.filesDataRaw[existingIndex];
        } else {
          fdPromises.push(
            FileData.fromRaw(filesDataRaw[i], {
              read: this.shouldRead,
              maxSize: this.maxSize,
              accept: this.accept,
              thumbnailSize: this.thumbnailSize,
            }),
          );
          filesDataRawNew.push(filesDataRaw[i]);
        }
      }

      this.filesDataRaw = filesDataRawNew;
      Promise.all(fdPromises).then((filesData) => {
        this.filesData = filesData;
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
        this.filesDataRaw = utils.arrayMove(this.filesDataRaw, sortData.oldIndex, sortData.newIndex);
        this.$nextTick(() => {
          this.$emit('input', this.filesDataRaw);
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
