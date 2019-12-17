<template>
  <div
    :class="[
      'file-preview-wrapper-' + fileData.ext(),
      fileData.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other',
      'file-category-' + fileData.icon().category,
      { 'file-is-playing-av': fileData.isPlayingAv },
      { 'is-deletable': deletable === true },
      { 'is-editable': editable === true },
      { 'is-edit-input-focused': isEditInputFocused },
      { 'has-error': fileData.error },
    ]"
  >
    <div class="file-error-wrapper" v-if="fileData.error" @click="dismissError()">
      <div class="file-error-message file-error-message-client">
        {{ fileData.getErrorMessage(errorText) }}
      </div>
    </div>
    <div ref="wrapper" class="file-av-wrapper" v-if="fileData.isPlayableAudio() || fileData.isPlayableVideo()">
      <div class="file-av-action" @click="playAv(fileData)">
        <span class="file-av-stop">
          <VueFileIcon name="system-close"></VueFileIcon>
        </span>
        <span class="file-av-play">
          <VueFileIcon name="system-file-av-play"></VueFileIcon>
        </span>
      </div>
    </div>
    <span
      class="file-preview"
      :class="{
        'image-preview': fileData.isImage(),
        'other-preview': !fileData.isImage(),
        'dark-content': fileData.isImage() && fileData.isDarkColor(),
      }"
      :style="{
        'background-color': fileData.color(),
      }"
    >
      <span class="file-preview-overlay"></span>
      <span
        class="thumbnail"
        style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;"
        v-if="fileData.isImage() || fileData.isPlayableVideo()"
      >
        <a v-if="hasLinkableUrl" :href="fileData.url" target="_blank" :title="fileData.name()">
          <img class="file-preview-img" :src="fileData.src()" />
        </a>
        <img v-else class="file-preview-img" :src="fileData.src()" />
      </span>
      <span class="file-ext">{{ fileData.ext() }}</span>
      <span class="file-size">{{ fileData.size() }}</span>
      <span
        v-if="deletable"
        class="file-delete"
        @click="removeFileData(fileData)"
        @touchstart="filenameClearPressed()"
        @mousedown="filenameClearPressed()"
      >
        <VueFileIcon name="system-close"></VueFileIcon>
      </span>
      <span class="file-name" @click="editFileName()">
        <input
          class="file-name-input"
          ref="input"
          v-if="editable === true"
          :disabled="disabled === true"
          type="text"
          :value="fileData.name(true)"
          @focus="editInputFocused()"
          @blur="editInputBlured()"
          @change="filenameChanged()"
          @input="filenameChanged()"
          @keyup.enter="filenameChanged(true)"
          @keyup.esc="filenameChanged(false)"
        />
        <span class="file-name-edit-icon" v-if="editable === true">
          <VueFileIcon name="system-file-name-edit"></VueFileIcon>
        </span>
        <span class="file-name-text">{{ fileData.name(true) }}</span>
      </span>
      <span v-if="fileData.dimensions.width && fileData.dimensions.height" class="image-dimension">
        <span class="image-dimension-width">{{ fileData.dimensions.width }}</span
        ><span class="image-dimension-height">{{ fileData.dimensions.height }}</span>
      </span>
      <span
        class="file-progress"
        v-if="fileData.hasProgress()"
        :class="{
          'file-progress-full': fileData.progress() >= 99.9999,
          'file-progress-done': fileData.progress() >= 100,
          'has-file-progress': fileData.progress() > 0,
        }"
      >
        <span class="file-progress-bar" :style="{ width: fileData.progress() + '%' }"></span>
      </span>
      <span class="file-icon">
        <a v-if="hasLinkableUrl" :href="fileData.url" target="_blank" :title="fileData.name()">
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
