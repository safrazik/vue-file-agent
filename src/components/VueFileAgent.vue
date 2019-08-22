<template>
	<div class="grid-block-wrapper vue-file-agent vue-file-agent-light file-input-wrapper drop_zone" v-on:dragover="dragOver" v-on:dragleave="dragLeave" v-on:drop="drop" v-bind:class="{'is-drag-over': isDragging, 'no-meta': meta === false}">
<!-- 		<div class="drop-help-wrapper">
			<div class="drop-help-text">
				Drop the files
			</div>
		</div> -->
		<canvas ref="thumbnailCanvas" style="position: fixed; visibility: hidden; z-index: -3;"></canvas>
	  <div class="overall-progress" v-if="overallProgress" v-bind:class="{'overall-progress-full': overallProgress >= 100}">
	    <div class="overall-progress-bar" v-bind:style="{width: overallProgress + '%'}"></div>
	    <div class="overall-progress-left" v-bind:style="{width: (100 - overallProgress) + '%'}"></div>
	  </div>

  <transition-group name="grid-box" tag="div" class="">
	  <div :key="fileData.id" v-for="(fileData, index) in filesData" class="file-preview-wrapper grid-box-item grid-block" v-bind:class="['file-preview-wrapper-' + fileData.ext(), fileData.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other', 'file-category-' + fileData.icon().category, {'file-is-playing-av': fileData.isPlayingAv}, {'is-deletable': isDeletable}, {'is-deletable': isDeletable}, {'has-error': fileData.error}]">
	  	<div class="file-error-wrapper" v-if="fileData.error">
	  		<div class="file-error-message file-error-message-client" v-if="fileData.error">
	  			{{ getErrorMessage(fileData) }}
	  		</div>
	  	</div>
	  	<div :id="'file-av-player-' + index" class="file-av-wrapper" v-if="fileData.isPlayableAudio() || fileData.isPlayableVideo()">
	  			<div class="file-av-action" @click="playAv(fileData, 'file-av-player-' + index)">
	  				<span class="file-av-stop">
	  					<svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
	  				</span>
	  				<span class="file-av-play">
							<svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"></path></svg>
	  				</span>
	  				<!-- <VueFileIcon :ext="'play'"></VueFileIcon> -->
	  			</div>
					<!-- <video :id="'file-av-player-' + index" :style="{width: prvWidth + 'px'}" :width="prvWidth" controls v-if="fileData.isVideo()"></video> -->
					<!-- <audio :id="'file-av-player-' + index" :style="{width: prvWidth + 'px'}" :width="prvWidth" controls v-if="fileData.isAudio()"></audio> -->
	  	</div>
	  	<span class="file-preview" v-bind:class="{'image-preview': fileData.isImage(), 'other-preview': !fileData.isImage(), 'dark-content': fileData.isImage() && fileData.isDarkColor()}" v-bind:style="{'background-color': fileData.color(), 'background-imagex': 'url(' + fileData.src() + ')', widthx: fileData.width + 'px', heightx: fileData.height + 'px'}">
	  		<span style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;">
		      <!-- <img v-if="fileData.isImage() || fileData.isPlayableVideo()" class="file-preview-img-clone" v-bind:src="fileData.src()"> -->
		      <img v-if="fileData.isImage() || fileData.isPlayableVideo()" class="file-preview-img" v-bind:src="fileData.src()">
	  		</span>
	  		<span class="file-ext">{{ fileData.ext() }}</span>
	  		<span class="file-size">{{ fileData.size() }}</span>
        <span v-if="isDeletable" class="file-delete" v-on:click="removeFileData(fileData)">
        	&times;
    		</span>
	  		<span class="file-name">
	        {{ fileData.name(true) }}
	      </span>
	      <span v-if="fileData.isImage()" class="image-dimension">
	        <span class="image-dimension-width">{{ fileData.image.width }}</span><span class="image-dimension-height">{{ fileData.image.height }}</span>
	      </span>
	  		<span class="file-progress" v-if="fileData.hasProgress()" v-bind:class="{'file-progress-full': fileData.progress() >= 100, 'has-file-progress': fileData.progress() > 0}">
	  			<span class="file-progress-bar" v-bind:style="{width: fileData.progress() + '%'}"></span>
	  		</span>
	      <span class="file-icon">
	      	<VueFileIcon :ext="fileData.ext()"></VueFileIcon>
	      </span>
	  	</span>
	  </div>
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
	  <input title="" :disabled="!canAddMore" ref="fileInput" type="file" v-bind:multiple="hasMultiple" class="file-input" v-on:change="filesChanged" v-bind:accept="accept || '*'">
	  <div v-if="false && !filesData.length" class="xfile-preview-wrapper file-preview-new grid-block" v-bind:style="{widthx: prvWidth + 'px', heightx: prvHeight + 'px'}">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="100px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
				<path d="M745,353c-5.6,0-11.3,0.2-17.2,0.7C687.4,237.3,577.8,157,451,157c-162.1,0-294,131.9-294,294c0,2.1,0,4.1,0,6.2C72.6,479,10,555.8,10,647c0,108.1,87.9,196,196,196h245V618.3l-63.4,63.4c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4c-19.2-19.2-19.2-50.1,0-69.3l147-147c4.6-4.6,9.9-8.1,16-10.6c12-4.9,25.5-4.9,37.4,0c6,2.5,11.4,6.1,16,10.6l147,147c19.2,19.2,19.2,50.1,0,69.3c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4L549,618.3V843h196c135.1,0,245-109.9,245-245S880.1,353,745,353z"/>
			</svg>
	  	<span class="help-text">{{ helpTextComputed }}</span>
	  </div>
	</div>
</template>
<style>
</style>
<script>

import styles from './vue-file-agent.css';
import VueFileIcon from './VueFileIcon.vue';
import FileData, {getAverageColor} from '../lib/file-data';

import uploader from '../lib/upload-helper';

export default {
	props: ['uploadUrl', 'uploadHeaders', 'multiple', 'deletable', 'read', 'accept', 'value', 'progress', 'helpText', 'maxSize', 'maxFiles', 'errorText', 'meta'],
	components: {
		VueFileIcon
	},
	data: function(){
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
		errorTextComputed(){
			var errorText = {
				common: 'Invalid file.',
				type: 'Invalid file type.',
				size: 'Files should not exceed ' + this.maxSize + ' in size',
			};
			if(this.errorText){
				if(this.errorText.type){
					errorText.type = this.errorText.type;
				}
				if(this.errorText.size){
					errorText.size = this.errorText.size;
				}
				if(this.errorText.common){
					errorText.common = this.errorText.common;
				}
			}
			return errorText;
		},
		isDeletable(){
			if(typeof this.deletable == 'string'){
				return this.deletable !== 'false';
			}
			return !!this.deletable;
		},
		hasMultiple: function(){
			if(typeof this.multiple == 'string'){
				return this.multiple !== 'false';
			}
			if (this.multiple === undefined) {
				return Array.isArray(this.value);
			}
			return !!this.multiple;
		},
		shouldRead: function(){
			if(typeof this.read == 'string'){
				return this.read === 'true';
			}
			return !!this.read;
		},
		prvWidth: function(){
			return FileData.defaultWidth;
		},
		prvHeight: function(){
			return FileData.defaultHeight;
		}
	},
	methods: {


  	changeOrder2(fileData) {
  		console.log('changeOrder2')
        let newRandom = Math.floor(Math.random() * 3) + 1;
        while (newRandom === fileData.order) {
          newRandom = Math.floor(Math.random() * 3) + 1;
        }
        fileData.order = newRandom;
        this.reorderList2();
      },
      reorderList2() {
        this.filesData.sort(function(objA, objB) {
          return objA.order - objB.order;
        })
      },

      createThumbnail(fileData, video, destroy = false){
      	var canvas = this.$refs.thumbnailCanvas;
      	var ctx = canvas.getContext('2d');
      	var loadedmetadata = false;
      	var loadeddata = false;
      	var prvWidth = this.prvWidth;
      	var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;
      	var tryGetThumbnail = function(){
      		if(!(loadedmetadata && loadeddata)){
      			return;
      		}
      		var context = canvas.getContext('2d');
      		context.drawImage(video, 0, 0, canvas.width, canvas.height);
      		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      		fileData.imageColor = getAverageColor(imageData.data);
      		var url = canvas.toDataURL();
      		console.log(url);
      		fileData.videoThumbnail = url;
      		console.log('fileData.videoThumbnail', fileData.videoThumbnail);
      		if(destroy){
	      		// video.currentTime = 0; // Reset video current time
      			revokeObjectURL(video.src);
      		}
      	}
				// Load metadata of the video to get video duration and dimensions
				video.addEventListener('loadedmetadata', function() {
			    // var video_duration = video.duration;
					canvas.width = prvWidth;
					canvas.height = (canvas.width/video.videoWidth) * video.videoHeight;
		      video.currentTime = 1; // video time
					loadedmetadata = true;
					tryGetThumbnail();
				});

				video.addEventListener('loadeddata', function() {
					loadeddata = true;
					tryGetThumbnail();
				});

      },
    initVideo(fileData){
    	if(!fileData.isPlayableVideo()){
    		return;
    	}
	  	var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;    	
	  	var video = document.createElement('video');
	    video.src = createObjectURL(fileData.file);
	    this.createThumbnail(fileData, video, true);
	    video.load();
    },
		playAv(fileData, id){
			if(fileData.stopAv){
				console.log('will stopAv');
				fileData.stopAv();
				return;
			}	
			console.log('playAv', id);
	  	var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;
	  	var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;

	  	var wrapper = this.$el.querySelector('#' + id);
	  	var player = document.createElement(fileData.isAudio() ? 'audio' : 'video');
	  	if(fileData.isPlayableVideo()){
	  		this.createThumbnail(fileData, player);
	  		player.poster = fileData.src();
	  	}
	  	player.controls = true;
	  	// player.style.width = this.prvWidth + 'px';
	  	wrapper.appendChild(player);
	  	// var player = this.$el.querySelector('#' + id);
	    var url = fileData.url || createObjectURL(fileData.file); 
	    player.src = url; 
	    player.play();
	    fileData.isPlayingAv = true;
	    fileData.stopAv = function(){
				console.log('will stopAv url', player.src, url);
				player.src = null;
				wrapper.removeChild(player);
	    	revokeObjectURL(url);
		    fileData.isPlayingAv = false;
	    	fileData.stopAv = null;
	    }
		},
		getErrorMessage(fileData){
			var error = fileData.error;
			if(!error){
				return '';
			}
			var errorText = this.errorTextComputed;
			if(error.type){
				return errorText.type;
			}
			else if(error.size){
				return errorText.size;
			}
			else if(error.upload){
				return (fileData.upload && fileData.upload.error) ? fileData.upload.error : error.upload;
			}
			return errorText.common;
		},
		upload(url, headers, filesData){
			var validFilesData = [];
			for(var i = 0; i < filesData.length; i++){
				if(!filesData[i].error){
					validFilesData.push(filesData[i]);
				}
			}
      uploader.upload(url, headers, validFilesData, (overallProgress)=> {
        this.overallProgress = overallProgress;
      }).then(()=> {
        // alert('file upload ok');
      }, err => {
        // alert('ERRR: ' + err);
      });
		},
		deleteUpload(url, headers, fileData){
      uploader.deleteUpload(url, headers, fileData).then((result)=> {
        // console.log('where done?', result);
        // model.__meta__.isUploading = false;  
      }, err => {
        console.log(err);
        alert('not deleted');
        // model.__meta__.isUploading = false;  
      });
      if(this.filesData.length < 1){
        this.overallProgress = 0;
      }
		},
		autoUpload(filesData){
			if(!this.uploadUrl){
				return;
			}
			this.upload(this.uploadUrl, this.uploadHeaders, filesData);
		},
		autoDeleteUpload(fileData){
			if(!this.uploadUrl){
				return;
			}
			this.deleteUpload(this.uploadUrl, this.uploadHeaders, fileData);
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
		handleFiles: function(files){
			if(!this.canAddMore){
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
			this.filesData.splice(this.filesData.length, 0, ...filesData);

			var self = this;
			var allFilesData = this.filesData;
			FileData.readFiles(filesData).then(function(filesData){  
				// var filesDataRaw = FileData.toRaw(filesData);
				var allFilesDataRaw = FileData.toRaw(allFilesData);
				self.filesDataRaw = allFilesDataRaw;
				// filesDataRaw = self.hasMultiple ? filesDataRaw : filesDataRaw[0];
				allFilesDataRaw = Array.isArray(self.value) ? allFilesDataRaw : allFilesDataRaw[0];
				self.$emit('input', allFilesDataRaw);	
				// self.$emit('select', filesData);	
				self.$emit('select', FileData.toRaw(filesData));
			});
			this.autoUpload(filesData);
		},
		filesChanged: function(event){
			// console.log('THis mul?', this.hasMultiple);
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
		drop: function(event) {
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
		dragOver: function(event) {
			this.isDragging = true;
			event.stopPropagation();
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		},
		dragLeave: function(event) {
			this.isDragging = false;
		},
		// reset(){
		// 	this.filesData = [];
		// 	this.filesDataRaw = [];
		// },
		removeFileData(fileData){
			// return this.reset();
			// return this.changeOrder2(fileData);
			console.log('removeFileData', fileData);
			var i;
			if(fileData instanceof FileData){
				i = this.filesData.indexOf(fileData);
			}
			else {
				i = this.filesDataRaw.indexOf(fileData);
			}
			console.log('the upload, xhr: ', fileData.upload, fileData.xhr);
			// if (fileData.xhr) {
			// 	fileData.xhr.abort();
			// 	console.log('xhr.readyState:', fileData.xhr.readyState);
			// }
			console.log('progress when removed:', fileData.progress());
			this.filesData.splice(i, 1);
			this.filesDataRaw.splice(i, 1);
			this.$emit('input', this.filesDataRaw);
			// this.$emit('delete', fileData);
			this.$emit('delete', FileData.toRaw([fileData])[0]);
			this.autoDeleteUpload(fileData);
		},
		checkValue(){
			var self = this;
			var filesDataRaw = this.value || [];
			filesDataRaw = Array.isArray(filesDataRaw) ? filesDataRaw : [filesDataRaw];

			var fdPromises = [];
			var filesDataRawNew = [];

				console.log('filesDataRaw....????', filesDataRaw);
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
					}));
					filesDataRawNew.push(filesDataRaw[i]);
				}
			}

			// console.log('fdPromises', fdPromises.length, fdPromises);
			// if(!fdPromises.length){
			// 	this.filesDataRaw = [];
			// 	this.filesData = [];
			// 	return;
			// }

			this.filesDataRaw = filesDataRawNew;
			Promise.all(fdPromises).then(function(filesData){
				console.log('filesData....????', filesData);
				self.filesData = filesData;
			});

		},
		// checkValueOld(){
		// 	var self = this;
		// 	var filesDataRaw = this.value || [];
		// 	filesDataRaw = Array.isArray(filesDataRaw) ? filesDataRaw : [filesDataRaw];
		// 	this.filesDataRaw = filesDataRaw;
		// 	FileData.all(filesDataRaw, {
		// 		read: this.shouldRead,
		// 		maxSize: this.maxSize,
		// 		accept: this.accept,
		// 	}).then(function(filesData){ 
		// 		self.filesData = filesData;
		// 	});
		// },
	},
	created: function(){
			console.log('created:checkValue');
		this.checkValue();
	},
	watch: {
		value(){
			console.log('value:checkValue');
			this.checkValue();
		}
	},
};
</script>