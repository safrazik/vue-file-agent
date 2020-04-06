<template>
  <div
    :class="[
      'file-preview-wrapper-' + fileRecord.ext(),
      fileRecord.isImage() ? 'file-preview-wrapper-image' : 'file-preview-wrapper-other',
      'file-category-' + fileRecord.icon().category,
      { 'file-is-playing-av': fileRecord.isPlayingAv },
      { 'is-deletable': deletable === true },
      { 'is-editable': editable === true },
      { 'is-edit-input-focused': isEditInputFocused },
      { 'has-error': fileRecord.error },
    ]"
  >
    <div ref="wrapper" class="file-av-wrapper" v-if="fileRecord.isPlayableAudio() || fileRecord.isPlayableVideo()">
      <div class="file-av-action" @click="playAv(fileRecord)">
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
        'image-preview': fileRecord.isImage(),
        'other-preview': !fileRecord.isImage(),
        'dark-content': fileRecord.isImage() && fileRecord.isDarkColor(),
      }"
      :style="{
        'background-color': fileRecord.color(),
      }"
    >
      <span class="file-error-wrapper" v-if="fileRecord.error" @click="dismissError()">
        <span class="file-error-message file-error-message-client">
          {{ fileRecord.getErrorMessage(errorText) }}
        </span>
      </span>
      <span class="file-preview-overlay"></span>
      <span
        class="thumbnail"
        style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;"
        v-if="fileRecord.isImage() || fileRecord.isPlayableVideo()"
      >
        <a v-if="hasLinkableUrl" :href="fileRecord.url" target="_blank" :title="fileRecord.name()">
          <img class="file-preview-img" :src="fileRecord.src()" />
        </a>
        <img v-else class="file-preview-img" :src="fileRecord.src()" />
      </span>
      <span class="file-ext">{{ fileRecord.ext() }}</span>
      <span class="file-size">{{ fileRecord.size() }}</span>
      <span
        v-if="deletable"
        class="file-delete"
        @click="removeFileRecord(fileRecord)"
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
          :value="fileRecord.name(true)"
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
        <span class="file-name-text">{{ fileRecord.name(true) }}</span>
      </span>
      <span v-if="fileRecord.dimensions.width && fileRecord.dimensions.height" class="image-dimension">
        <span class="image-dimension-width">{{ fileRecord.dimensions.width }}</span
        ><span class="image-dimension-height">{{ fileRecord.dimensions.height }}</span>
      </span>
      <span
        class="file-progress"
        v-if="fileRecord.hasProgress()"
        :class="{
          'file-progress-full': fileRecord.progress() >= 99.9999,
          'file-progress-done': fileRecord.progress() >= 100,
          'has-file-progress': fileRecord.progress() > 0,
        }"
      >
        <span class="file-progress-bar" :style="{ width: fileRecord.progress() + '%' }"></span>
      </span>
      <span class="file-icon">
        <a v-if="hasLinkableUrl" :href="fileRecord.url" target="_blank" :title="fileRecord.name()">
          <VueFileIcon :ext="fileRecord.ext()"></VueFileIcon>
        </a>
        <VueFileIcon v-else :ext="fileRecord.ext()"></VueFileIcon>
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
