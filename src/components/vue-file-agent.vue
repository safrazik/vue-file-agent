<template>
  <div
    @dragover="dragOver"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @drop="drop"
    :class="[
      'is-sortable-' + (isSortable ? 'enabled' : 'disabled'),
      {
        'is-sortable-hold': sortable === 'hold',
        'is-sortable-handle': sortable === 'handle',
        'is-sortable-immediately': sortable === true,
        'is-sorting': isSorting,
        'is-sorting-active': isSortingActive,
        'is-drag-over': isDragging,
        'is-disabled': disabled === true,
        'is-readonly': readonly === true,
        'is-drag-valid': !(disabled === true || readonly === true || (hasMultiple && !canAddMore)),
      },
      'theme-' + theme,
    ]"
    :id="'vfa-' + uniqueId"
  >
    <slot name="before-outer"></slot>
    <div
      class="grid-block-wrapper vue-file-agent file-input-wrapper"
      :class="{
        'is-compact': !!compact,
        'is-single': !hasMultiple,
        'has-multiple': hasMultiple,
        'no-meta': meta === false,
      }"
    >
      <slot name="before-inner"></slot>
      <canvas ref="thumbnailCanvas" style="position: fixed; visibility: hidden; z-index: -3;"></canvas>
      <div class="overall-progress" v-if="overallProgress" :class="{ 'overall-progress-full': overallProgress >= 100 }">
        <div class="overall-progress-bar" :style="{ width: overallProgress + '%' }"></div>
        <div class="overall-progress-left" :style="{ width: 100 - overallProgress + '%' }"></div>
      </div>

      <component
        :is="isSortable ? 'vfa-sortable-list' : 'VueFileList'"
        v-model="fileRecords"
        :axis="theme == 'list' ? 'y' : 'xy'"
        :appendTo="'#vfa-' + uniqueId + ' .vue-file-agent'"
        :transitionDuration="transitionDuration"
        :pressDelay="sortable === 'hold' ? 200 : 0"
        :useDragHandle="sortable === 'handle'"
        @sort-start="sortStart()"
        @sort-end="sortEnd($event)"
        :helperClass="'active-sorting-item'"
      >
        <transition-group name="grid-box" tag="div" class="">
          <!-- <template v-for="(fileRecord, index) in fileRecords"> -->
          <component
            :is="isSortable ? 'vfa-sortable-item' : 'VueFileListItem'"
            v-for="(fileRecord, index) in fileRecords"
            class="file-preview-wrapper grid-box-item grid-block"
            :index="index"
            :key="fileRecord.id"
          >
            <span v-vfa-sortable-handle class="file-sortable-handle" v-if="sortable === 'handle'">
              <slot name="sortable-handle">
                <VueFileIcon name="system-sortable-handle"></VueFileIcon>
              </slot>
            </span>
            <slot name="file-preview" :fileRecord="fileRecord" :fileData="fileRecord" :index="index">
              <VueFilePreview
                :value="fileRecord"
                :deletable="isDeletable"
                :editable="editable === true"
                :linkable="linkable === true"
                :errorText="errorText"
                :disabled="disabled"
                :thumbnailSize="thumbnailSize"
                @remove="removeFileRecord($event)"
                @rename="filenameChanged($event)"
                class=""
              ></VueFilePreview>
            </slot>
          </component>
          <!-- </template> -->
          <template v-if="canAddMore && readonly !== true">
            <slot name="file-preview-new">
              <div key="new" class="file-preview-wrapper grid-box-item grid-block file-preview-new">
                <span class="file-preview">
                  <span style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
                    <VueFileIcon name="system-file-preview-new"></VueFileIcon>
                    <span class="help-text">{{ helpTextComputed }}</span>
                  </span>
                </span>
              </div>
            </slot>
          </template>
        </transition-group>
      </component>
      <input
        title=""
        :disabled="disabled === true || (hasMultiple && !canAddMore)"
        ref="fileInput"
        type="file"
        :multiple="hasMultiple"
        class="file-input"
        @change="filesChanged"
        :accept="accept || '*'"
        :capture="capture || undefined"
        v-if="readonly !== true"
      />
      <slot name="after-inner"></slot>
    </div>
    <slot name="after-outer"></slot>
  </div>
</template>
<style lang="scss">
@import '../scss/vue-file-agent.scss';
</style>
<script lang="ts">
import Vue from 'vue';
import mixin from './vue-file-agent-mixin';

export default Vue.extend({
  mixins: [mixin],
});
</script>
