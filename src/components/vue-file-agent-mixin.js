import utils from '../lib/utils';
import VueFileIcon from './vue-file-icon.vue';
import VueFilePreview from './vue-file-preview.vue';
import FileData from '../lib/file-data';
import uploader from '../lib/upload-helper';
import { getFilesFromDroppedItems } from '../lib/data-transfer';

var dragCounter = 0;

export default {
  props: ['uploadUrl', 'uploadHeaders', 'multiple', 'deletable', 'editable', 'read', 'accept', 'value', 'progress', 'helpText', 'maxSize', 'maxFiles', 'errorText', 'meta', 'compact', 'thumbnailSize', 'theme', 'disabled'],
  components: {
    VueFileIcon,
    VueFilePreview
  },
  data(){
    return {
      filesData: [],
      filesDataRaw: [],
      isDragging: false,
      overallProgress: 0,
    }
  },
  computed: {
    canAddMore(){
      if(!this.hasMultiple){
        return this.filesData.length === 0;
      }
      if(!this.maxFiles){
        return true;
      }
      return this.filesData.length < this.maxFiles;
    },
    helpTextComputed(){
      if(this.helpText){
        return this.helpText;
      }
      return 'Choose ' + (this.hasMultiple ? 'files' : 'file') + ' or drag & drop here';
    },
    isDeletable(){
      if(typeof this.deletable == 'string'){
        return this.deletable !== 'false';
      }
      return !!this.deletable;
    },
    hasMultiple(){
      if(typeof this.multiple == 'string'){
        return this.multiple !== 'false';
      }
      if (this.multiple === undefined) {
        return Array.isArray(this.value);
      }
      return !!this.multiple;
    },
    shouldRead(){
      if(typeof this.read == 'string'){
        return this.read === 'true';
      }
      return !!this.read;
    }
  },
  methods: {
    createThumbnail(fileData, video){
      return new Promise((resolve, reject)=> {      
        var canvas = document.createElement('canvas');
        utils.createVideoThumbnail(video, canvas, fileData.thumbnailSize).then((thumbnail) => {
          fileData.imageColor = thumbnail.color;
          fileData.videoThumbnail = thumbnail.url;
          fileData.dimensions.width = thumbnail.width;
          fileData.dimensions.height = thumbnail.height;
          resolve();
        }, reject);
      });
    },
    initVideo(fileData){
      if(!fileData.isPlayableVideo()){
        return;
      }
      var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;      
      var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;
      var video = document.createElement('video');
      video.src = createObjectURL(fileData.file);
      this.createThumbnail(fileData, video, true).then(()=> {
        revokeObjectURL(video.src);
      })
      video.load();
    },
    upload(url, headers, filesData, createFormData){
      var validFilesData = [];
      for(var i = 0; i < filesData.length; i++){
        if(!filesData[i].error){
          validFilesData.push(filesData[i]);
        }
      }
      return uploader.upload(url, headers, validFilesData, createFormData, (overallProgress)=> {
        this.overallProgress = overallProgress;
      });
    },
    deleteUpload(url, headers, fileData, uploadData){
      if(this.filesData.length < 1){
        this.overallProgress = 0;
      }
      return uploader.deleteUpload(url, headers, fileData, uploadData);
    },
    autoUpload(filesData){
      if(!this.uploadUrl){
        return;
      }
      this.upload(this.uploadUrl, this.uploadHeaders, filesData);
    },
    autoDeleteUpload(fileData){
      if(!this.uploadUrl){
        return Promise.resolve(false);
      }
      return this.deleteUpload(this.uploadUrl, this.uploadHeaders, fileData);
    },
    equalFiles(file1, file2){
      return true &&
        file1.name === file2.name &&
        file1.size === file2.size &&
        file1.type === file2.type &&
        // file1.lastModifiedDate.getTime() === file2.lastModifiedDate.getTime() &&
        file1.lastModified === file2.lastModified;
    },
    isFileAddedAlready(file){
      for(var i = 0; i < this.filesData.length; i++){
        if(this.equalFiles(file, this.filesData[i].file)){
          return true;
        }
      }
      return false;
    },
    handleFiles(files){
      if(this.disabled === true){
        return;
      }
      if(this.hasMultiple && !this.canAddMore){
        return;
      }
      var filesData = [];
      var filesFiltered = [];
      for(let i = 0; i < files.length; i++){
        if(this.isFileAddedAlready(files[i])){
          continue;
        }
        filesFiltered.push(files[i]);
      }
      files = filesFiltered;
      if(this.maxFiles && files.length > (this.maxFiles - this.filesData.length)){
        files = files.slice(0, (this.maxFiles - this.filesData.length));
      }
      for(let i = 0; i < files.length; i++){
        filesData.push(new FileData({
          file: files[i],
        }, {
          read: this.shouldRead,
          maxSize: this.maxSize,
          accept: this.accept,
          thumbnailSize: this.thumbnailSize,
        }));
      }

      //////////// disables list transitions
          // var allFilesData = this.filesData.concat(filesData);
          // this.filesData = allFilesData;
      ////////////
      for(let i = 0; i < filesData.length; i++){
        // this.filesData.push(filesData[i]);
        if(filesData[i].file.size <= 20 * 1024 * 1024){ // <= 20MB
          this.initVideo(filesData[i]);
        }
      }
      if(this.hasMultiple){
        this.filesData.splice(this.filesData.length, 0, ...filesData);
      }
      else {
        this.filesData = filesData;
      }

      FileData.readFiles(filesData).then((filesData)=> {  
        // var filesDataRaw = FileData.toRaw(filesData);
        var allFilesDataRaw = FileData.toRawArray(this.filesData);
        this.filesDataRaw = allFilesDataRaw;
        // filesDataRaw = self.hasMultiple ? filesDataRaw : filesDataRaw[0];
        allFilesDataRaw = Array.isArray(this.value) ? allFilesDataRaw : allFilesDataRaw[0];
        this.$emit('input', allFilesDataRaw); 
        // self.$emit('select', filesData); 
        this.$emit('select', FileData.toRawArray(filesData));
      });
      this.autoUpload(filesData);
    },
    filesChanged(event){
      var files = event.target.files;
      this.$emit('change', event);
      if(!files[0]){
        // this.imgSrc = this.lastKnownSrc;
        return;
      }
      this.handleFiles(files);
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = null; // do not use '' because chrome won't fire change event for same file
      }
    },
    drop(event) {
      dragCounter = 0;
      this.isDragging = false;
      event.stopPropagation();
      event.preventDefault();
      getFilesFromDroppedItems(event.dataTransfer).then(files => {
        this.$emit('drop', event);
        if(!files || !files[0]){
          return;
        }
        if(!this.hasMultiple){
          files = [files[0]];
        }
        this.handleFiles(files);
      });
    },
    dragEnter(event) {
      this.isDragging = true;
      event.stopPropagation();
      event.preventDefault();
      dragCounter++;
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    },
    dragOver(event) {
      this.isDragging = true;
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    },
    dragLeave(event) {
      dragCounter--;
      if (dragCounter === 0) { 
        this.isDragging = false;
      }
    },
    removeFileData(fileData){
      var i;
      if(fileData instanceof FileData){
        i = this.filesData.indexOf(fileData);
      }
      else {
        i = this.filesDataRaw.indexOf(fileData);
      }
      this.filesData.splice(i, 1);
      this.filesDataRaw.splice(i, 1);
      this.$emit('input', this.filesDataRaw);
      // this.$emit('delete', fileData);
      this.$emit('delete', FileData.toRawArray([fileData])[0]);
      this.autoDeleteUpload(fileData).then((res)=> { }, (err)=> {
        this.filesData.splice(i, 1, fileData);
      });
    },
    checkValue(){
      var filesDataRaw = this.value || [];
      filesDataRaw = Array.isArray(filesDataRaw) ? filesDataRaw : [filesDataRaw];

      var fdPromises = [];
      var filesDataRawNew = [];

      for(var i = 0; i < filesDataRaw.length; i++){
        var existingIndex = this.filesDataRaw.indexOf(filesDataRaw[i]);
        if(existingIndex !== -1){
          fdPromises.push(Promise.resolve(this.filesData[existingIndex]));
          filesDataRawNew[i] = this.filesDataRaw[existingIndex];
        }
        else {
          fdPromises.push(FileData.fromRaw(filesDataRaw[i], {
            read: this.shouldRead,
            maxSize: this.maxSize,
            accept: this.accept,
            thumbnailSize: this.thumbnailSize,
          }));
          filesDataRawNew.push(filesDataRaw[i]);
        }
      }

      this.filesDataRaw = filesDataRawNew;
      Promise.all(fdPromises).then((filesData)=> {
        this.filesData = filesData;
      });

    },
  },
  created(){
    this.checkValue();
  },
  watch: {
    value(){
      this.checkValue();
    }
  },
};