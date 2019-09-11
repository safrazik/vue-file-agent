<template>
  <div v-on:dragover="dragOver" v-on:dragenter="dragEnter" v-on:dragleave="dragLeave" v-on:drop="drop" v-bind:class="[{'is-drag-over': isDragging, 'is-disabled': disabled === true}, 'theme-' + theme]">
    <slot name="before-outer"></slot>
  <div class="grid-block-wrapper vue-file-agent vue-file-agent-light file-input-wrapper drop_zone" v-bind:class="{'is-drag-overx': isDragging, 'is-compact': !!compact, 'is-single': !hasMultiple, 'has-multiple': hasMultiple, 'no-meta': meta === false}">
    <slot name="before-inner"></slot>
    <canvas ref="thumbnailCanvas" style="position: fixed; visibility: hidden; z-index: -3;"></canvas>
    <div class="overall-progress" v-if="overallProgress" v-bind:class="{'overall-progress-full': overallProgress >= 100}">
      <div class="overall-progress-bar" v-bind:style="{width: overallProgress + '%'}"></div>
      <div class="overall-progress-left" v-bind:style="{width: (100 - overallProgress) + '%'}"></div>
    </div>

  <transition-group name="grid-box" tag="div" class="">
    <VueFilePreview 
      :fileData="fileData" :index="index" :deletable="isDeletable" :errorText="errorText" :disabled="disabled" @remove="removeFileData($event)"
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
    <input title="" :disabled="disabled === true || (hasMultiple && !canAddMore)" ref="fileInput" type="file" v-bind:multiple="hasMultiple" class="file-input" v-on:change="filesChanged" v-bind:accept="accept || '*'">

    <slot name="after-inner"></slot>
  </div>
  <slot name="after-outer"></slot>
  </div>
</template>
<style lang="scss">
  @import "../scss/vue-file-agent.scss";
</style>
<script>
  import mixin from './vue-file-agent-mixin';

  export default {
    mixins: [mixin]
  };
</script>