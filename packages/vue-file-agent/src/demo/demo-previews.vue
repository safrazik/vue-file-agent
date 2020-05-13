<template>
  <!-- {% raw %} -->
  <div class="theme-default">
    <div class="vue-file-agent grid-block-wrapper" style="padding: 0;">
      <template v-for="(fileRecord, i) in fileRecords">
        <VueFilePreview
          :key="i"
          :value="fileRecord"
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
      fileRecords: this.getFileRecordsInitial(),
    };
  },
  methods: {
    getFileRecordsInitial: function() {
      return window.getFileRecordsInitial();
    },
  },
  mounted: function() {},
};
</script>
