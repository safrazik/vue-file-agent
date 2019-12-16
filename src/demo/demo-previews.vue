<template>
  <!-- {% raw %} -->
  <div class="theme-default">
    <div class="vue-file-agent grid-block-wrapper" style="padding: 0;">
      <template v-for="(fileData, i) in filesData">
        <VueFilePreview
          :key="i"
          :value="fileData"
          :linkable="true"
          class="file-preview-wrapper grid-box-item grid-block"
        ></VueFilePreview>
      </template>
    </div>
  </div>
  <!-- {% endraw %} -->
</template>

<script>
export default {
  data: function() {
    return {
      filesData: this.getFilesDataInitial(),
    };
  },
  methods: {
    getFilesDataInitial: function() {
      return window.getFilesDataInitial();
    },
  },
  mounted: function() {},
};
</script>
