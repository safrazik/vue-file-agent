<template>
  <div :class="['file-preview-wrapper-' + fileData.ext(), fileData.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other', 'file-category-' + fileData.icon().category, {'file-is-playing-av': fileData.isPlayingAv}, {'is-deletable': deletable === true}, {'is-editable': editable === true}, {'is-edit-input-focused': isEditInputFocused}, {'has-error': fileData.error}]">
    <div class="file-error-wrapper" v-if="fileData.error" @click="dismissError()">
      <div class="file-error-message file-error-message-client">
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
      <span class="file-preview-overlay"></span>
      <span class="thumbnail" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;">
        <img v-if="fileData.isImage() || fileData.isPlayableVideo()" class="file-preview-img" v-bind:src="fileData.src()">
      </span>
      <span class="file-ext">{{ fileData.ext() }}</span>
      <span class="file-size">{{ fileData.size() }}</span>
      <span v-if="deletable" class="file-delete" @click="removeFileData(fileData)" @touchstart="filenameClearPressed()" @mousedown="filenameClearPressed()" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </span>
      <span class="file-name" @click="editFileName()">
        <input class="file-name-input" ref="input" v-if="editable === true" :disabled="disabled === true" type="text" :value="fileData.name(true)" @focus="editInputFocused()" @blur="editInputBlured()" @change="filenameChanged()" @input="filenameChanged()" @keyup.enter="filenameChanged(true)" @keyup.esc="filenameChanged(false)">
        <span class="file-name-edit-icon" v-if="editable === true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </span>
        <span class="file-name-text">{{ fileData.name(true) }}</span>
      </span>
      <span v-if="fileData.dimensions.width && fileData.dimensions.height" class="image-dimension">
        <span class="image-dimension-width">{{ fileData.dimensions.width }}</span><span class="image-dimension-height">{{ fileData.dimensions.height }}</span>
      </span>
      <span class="file-progress" v-if="fileData.hasProgress()" v-bind:class="{'file-progress-full': fileData.progress() >= 99.9999, 'file-progress-done': fileData.progress() >= 100, 'has-file-progress': fileData.progress() > 0}">
        <span class="file-progress-bar" v-bind:style="{width: fileData.progress() + '%'}"></span>
      </span>
      <span class="file-icon">
        <a v-if="hasLinkableUrl" v-bind:href="fileData.url" target="_blank" v-bind:title="fileData.name()">
          <VueFileIcon :ext="fileData.ext()"></VueFileIcon>
        </a>
        <VueFileIcon v-else :ext="fileData.ext()"></VueFileIcon>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import mixin from './vue-file-preview-mixin';

  export default Vue.extend({
    mixins: [mixin],
  });
</script>