<template>
  <div>
    <div class="file-error-wrapper" v-if="fileData.error">
      <div class="file-error-message file-error-message-client" v-if="fileData.error">
        {{ fileData.getErrorMessage(errorText) }}
      </div>
    </div>
    <div ref="wrapper" class="file-av-wrapper" v-if="fileData.isPlayableAudio() || fileData.isPlayableVideo()">
        <div class="file-av-action" @click="playAv(fileData)">
          <span class="file-av-stop">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </span>
          <span class="file-av-play">
            <svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"></path></svg>
          </span>
        </div>
    </div>
    <span class="file-preview" v-bind:class="{'image-preview': fileData.isImage(), 'other-preview': !fileData.isImage(), 'dark-content': fileData.isImage() && fileData.isDarkColor()}" v-bind:style="{'background-color': fileData.color(), 'background-imagex': 'url(' + fileData.src() + ')', widthx: fileData.width + 'px', heightx: fileData.height + 'px'}">
      <span style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;">
        <img v-if="fileData.isImage() || fileData.isPlayableVideo()" class="file-preview-img" v-bind:src="fileData.src()">
      </span>
      <span class="file-ext">{{ fileData.ext() }}</span>
      <span class="file-size">{{ fileData.size() }}</span>
      <span v-if="deletable" class="file-delete" @click="removeFileData(fileData)">
        &times;
      </span>
      <span class="file-name">
        {{ fileData.name(true) }}
      </span>
      <span v-if="fileData.dimensions.width && fileData.dimensions.height" class="image-dimension">
        <span class="image-dimension-width">{{ fileData.dimensions.width }}</span><span class="image-dimension-height">{{ fileData.dimensions.height }}</span>
      </span>
      <span class="file-progress" v-if="fileData.hasProgress()" v-bind:class="{'file-progress-full': fileData.progress() >= 100, 'has-file-progress': fileData.progress() > 0}">
        <span class="file-progress-bar" v-bind:style="{width: fileData.progress() + '%'}"></span>
      </span>
      <span class="file-icon">
        <VueFileIcon :ext="fileData.ext()"></VueFileIcon>
      </span>
    </span>
  </div>
</template>
<script>

  import utils from '../lib/utils';

  export default {
    props: ['fileData', 'deletable', 'errorText'],
    // computed: {
    // },
    methods: {

      createThumbnail(fileData, video){
        var canvas = document.createElement('canvas');
        utils.createVideoThumbnail(video, canvas, this.fileData.resizeLimit).then((thumbnail) => {
          fileData.imageColor = thumbnail.color;
          fileData.videoThumbnail = thumbnail.url;
          fileData.dimensions.width = thumbnail.width;
          fileData.dimensions.height = thumbnail.height;
        });
      },

      playAv(fileData){
        if(fileData.stopAv){
          fileData.stopAv();
          return;
        }
        var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;
        var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;

        var wrapper = this.$refs.wrapper;
        var player = document.createElement(fileData.isAudio() ? 'audio' : 'video');
        if(fileData.isPlayableVideo()){
          this.createThumbnail(fileData, player);
          player.poster = fileData.src();
        }
        player.controls = true;
        // player.style.width = this.prvWidth + 'px';
        wrapper.appendChild(player);
        var url = fileData.url || createObjectURL(fileData.file); 
        player.src = url; 
        player.play();
        fileData.isPlayingAv = true;
        fileData.stopAv = function(){
          player.src = null;
          wrapper.removeChild(player);
          revokeObjectURL(url);
          fileData.isPlayingAv = false;
          fileData.stopAv = null;
        }
      },

      removeFileData(fileData){
        this.$emit('remove', fileData);
      },

    },
  }
</script>