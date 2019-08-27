<template>
	<div class="grid-block-wrapper vue-file-agent vue-file-agent-light file-input-wrapper drop_zone" v-on:dragover="dragOver" v-on:dragleave="dragLeave" v-on:drop="drop" v-bind:class="{'is-drag-over': isDragging, 'is-compact': !!compact, 'is-single': !hasMultiple, 'has-multiple': hasMultiple, 'no-meta': meta === false}">
		<canvas ref="thumbnailCanvas" style="position: fixed; visibility: hidden; z-index: -3;"></canvas>
	  <div class="overall-progress" v-if="overallProgress" v-bind:class="{'overall-progress-full': overallProgress >= 100}">
	    <div class="overall-progress-bar" v-bind:style="{width: overallProgress + '%'}"></div>
	    <div class="overall-progress-left" v-bind:style="{width: (100 - overallProgress) + '%'}"></div>
	  </div>

  <transition-group name="grid-box" tag="div" class="">
  	<VueFilePreview 
  		:fileData="fileData" :index="index" :deletable="isDeletable" :errorText="errorText" @remove="removeFileData($event)"
  		 :key="fileData.id" v-for="(fileData, index) in filesData" class="file-preview-wrapper grid-box-item grid-block" v-bind:class="['file-preview-wrapper-' + fileData.ext(), fileData.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other', 'file-category-' + fileData.icon().category, {'file-is-playing-av': fileData.isPlayingAv}, {'is-deletable': isDeletable}, {'is-deletable': isDeletable}, {'has-error': fileData.error}]"></VueFilePreview>
	  <div v-if="canAddMore" key="new" class="file-preview-wrapper grid-box-item grid-block file-preview-new">
	  	<span class="file-preview">
	  		<span style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="100px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
						<path d="M745,353c-5.6,0-11.3,0.2-17.2,0.7C687.4,237.3,577.8,157,451,157c-162.1,0-294,131.9-294,294c0,2.1,0,4.1,0,6.2C72.6,479,10,555.8,10,647c0,108.1,87.9,196,196,196h245V618.3l-63.4,63.4c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4c-19.2-19.2-19.2-50.1,0-69.3l147-147c4.6-4.6,9.9-8.1,16-10.6c12-4.9,25.5-4.9,37.4,0c6,2.5,11.4,6.1,16,10.6l147,147c19.2,19.2,19.2,50.1,0,69.3c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4L549,618.3V843h196c135.1,0,245-109.9,245-245S880.1,353,745,353z"/>
					</svg>
			  	<span class="help-text">{{ helpTextComputed }}</span>
	  		</span>
	  	</span>
	  </div>
	</transition-group>
	  <input title="" :disabled="hasMultiple && !canAddMore" ref="fileInput" type="file" v-bind:multiple="hasMultiple" class="file-input" v-on:change="filesChanged" v-bind:accept="accept || '*'">
	</div>
</template>
<style>
</style>
<script>

import utils from '../lib/utils';

import styles from './vue-file-agent.css';
import VueFileIcon from './VueFileIcon.vue';
import VueFilePreview from './VueFilePreview.vue';
import FileData, {getAverageColor} from '../lib/file-data';

import uploader from '../lib/upload-helper';

export default {
	props: ['uploadUrl', 'uploadHeaders', 'multiple', 'deletable', 'read', 'accept', 'value', 'progress', 'helpText', 'maxSize', 'maxFiles', 'errorText', 'meta', 'compact', 'resizeLimit'],
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
		    utils.createVideoThumbnail(video, canvas, this.width, fileData.resizeLimit).then((thumbnail) => {
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
		upload(url, headers, filesData){
			var validFilesData = [];
			for(var i = 0; i < filesData.length; i++){
				if(!filesData[i].error){
					validFilesData.push(filesData[i]);
				}
			}
      return uploader.upload(url, headers, validFilesData, (overallProgress)=> {
        this.overallProgress = overallProgress;
      });
		},
		deleteUpload(url, headers, fileData){
      if(this.filesData.length < 1){
        this.overallProgress = 0;
      }
      return uploader.deleteUpload(url, headers, fileData);
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
			if(this.hasMultiple && !this.canAddMore){
				return;
			}
			var filesData = [];
			var filesFiltered = [];
			for(var i = 0; i < files.length; i++){
				if(this.isFileAddedAlready(files[i])){
					continue;
				}
				filesFiltered.push(files[i]);
			}
			files = filesFiltered;
			if(this.maxFiles && files.length > (this.maxFiles - this.filesData.length)){
				files = files.slice(0, (this.maxFiles - this.filesData.length));
			}
			for(var i = 0; i < files.length; i++){
				filesData.push(new FileData({
					file: files[i],
				}, {
					read: this.shouldRead,
					maxSize: this.maxSize,
					accept: this.accept,
					resizeLimit: this.resizeLimit,
				}));
			}

			//////////// disables list transitions
					// var allFilesData = this.filesData.concat(filesData);
					// this.filesData = allFilesData;
			////////////
			for(var i = 0; i < filesData.length; i++){
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
			this.isDragging = false;
			event.stopPropagation();
			event.preventDefault();
			var files = event.dataTransfer.files; // FileList object.
			this.$emit('drop', event);
			if(!files[0]){
				return;
			}
			if(!this.hasMultiple){
				files = [files[0]];
			}
			this.handleFiles(files);
		},
		dragOver(event) {
			this.isDragging = true;
			event.stopPropagation();
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		},
		dragLeave(event) {
			this.isDragging = false;
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
						resizeLimit: this.resizeLimit,
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
</script>