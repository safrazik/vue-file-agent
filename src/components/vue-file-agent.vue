<template>
  <div @dragover="dragOver" @dragenter="dragEnter" @dragleave="dragLeave" @drop="drop" :class="['is-sortable-' + (isSortable  ? 'enabled' : 'disabled'), {'is-sortable-hold': sortable === 'hold'}, {'is-sortable-hold': sortable === 'handle'}, {'is-sortable-immediately': sortable === true}, {'is-sorting': isSorting, 'is-sorting-active': isSortingActive, 'is-drag-over': isDragging, 'is-disabled': disabled === true}, 'theme-' + theme]" :id="'vfa-' + uniqueId">
    <slot name="before-outer"></slot>
  <div class="grid-block-wrapper vue-file-agent vue-file-agent-light file-input-wrapper drop_zone" :class="{'is-compact': !!compact, 'is-single': !hasMultiple, 'has-multiple': hasMultiple, 'no-meta': meta === false}">
    <slot name="before-inner"></slot>
    <canvas ref="thumbnailCanvas" style="position: fixed; visibility: hidden; z-index: -3;"></canvas>
    <div class="overall-progress" v-if="overallProgress" :class="{'overall-progress-full': overallProgress >= 100}">
      <div class="overall-progress-bar" :style="{width: overallProgress + '%'}"></div>
      <div class="overall-progress-left" :style="{width: (100 - overallProgress) + '%'}"></div>
    </div>

  <component :is="isSortable ? 'vfa-sortable-list': 'VueFileList'" v-model="filesData" :axis="theme == 'list' ? 'y' : 'xy'" :appendTo="'#vfa-' + uniqueId + ' .vue-file-agent'" :transitionDurationx="transitionDuration" :pressDelay="sortable === 'hold' ? 200 : 0" :useDragHandle="sortable === 'handle'" @sort-start="sortStart()" @sort-end="sortEnd($event)" :helperClass="'active-sorting-item'">
  <transition-group name="grid-box" tag="div" class="">
    <!-- <template v-for="(fileData, index) in filesData"> -->
      <component :is="isSortable ? 'vfa-sortable-item' : 'VueFileListItem'" v-for="(fileData, index) in filesData" class="file-preview-wrapper grid-box-item grid-block" :index="index" :key="fileData.id">
        <span v-vfa-sortable-handle class="file-sortable-handle" v-if="sortable === 'handle'">
          <slot name="sortable-handle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </slot>
        </span>
        <slot name="file-preview" :fileData="fileData" :index="index">
          <VueFilePreview 
            :value="fileData" :deletable="isDeletable" :editable="editable === true" :linkable="linkable === true" :errorText="errorText" :disabled="disabled"
            :thumbnailSize="thumbnailSize" @remove="removeFileData($event)"
             @rename="filenameChanged($event)" class=""></VueFilePreview>
        </slot>
      </component>
    <!-- </template> -->
    <template v-if="canAddMore">
      <slot name="file-preview-new">
        <div key="new" class="file-preview-wrapper grid-box-item grid-block file-preview-new">
          <span class="file-preview">
            <span style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="100px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                <path d="M745,353c-5.6,0-11.3,0.2-17.2,0.7C687.4,237.3,577.8,157,451,157c-162.1,0-294,131.9-294,294c0,2.1,0,4.1,0,6.2C72.6,479,10,555.8,10,647c0,108.1,87.9,196,196,196h245V618.3l-63.4,63.4c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4c-19.2-19.2-19.2-50.1,0-69.3l147-147c4.6-4.6,9.9-8.1,16-10.6c12-4.9,25.5-4.9,37.4,0c6,2.5,11.4,6.1,16,10.6l147,147c19.2,19.2,19.2,50.1,0,69.3c-9.6,9.6-22.1,14.4-34.6,14.4s-25.1-4.8-34.6-14.4L549,618.3V843h196c135.1,0,245-109.9,245-245S880.1,353,745,353z"/>
              </svg>
              <span class="help-text">{{ helpTextComputed }}</span>
            </span>
          </span>
        </div>
      </slot>
    </template>
  </transition-group>
  </component>
    <input title="" :disabled="disabled === true || (hasMultiple && !canAddMore)" ref="fileInput" type="file" :multiple="hasMultiple" class="file-input" @change="filesChanged" :accept="accept || '*'">

    <slot name="after-inner"></slot>
  </div>
  <slot name="after-outer"></slot>
  </div>
</template>
<style lang="scss">
  @import "../scss/vue-file-agent.scss";
</style>
<script lang="ts">
  import Vue from 'vue';
  import mixin from './vue-file-agent-mixin';

  export default Vue.extend({
    mixins: [mixin],
  });
</script>