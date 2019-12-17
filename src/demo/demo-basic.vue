<template>
  <!-- {% raw %} -->
  <div>
    <div class="row">
      <div class="col mb-3 text-left">
        <div class="custom-control custom-checkbox custom-control-inline">
          <input type="checkbox" class="custom-control-input" id="basic-demo-sortable-toggle" v-model="sortable" />
          <label class="custom-control-label" for="basic-demo-sortable-toggle">Drag & drop sortable</label>
        </div>
        <div class="custom-control custom-checkbox custom-control-inline">
          <input type="checkbox" class="custom-control-input" id="basic-demo-resumable-toggle" v-model="resumable" />
          <label class="custom-control-label" for="basic-demo-resumable-toggle">Resumable upload</label>
        </div>
      </div>
      <div class="col mb-3 text-right">
        Switch theme to
        <!-- <a href="#" @click.prevent="switchTheme()">Switch</a> -->
        <button class="btn btn-sm btn-outline-warning" @click="switchTheme()">
          <span v-if="theme != 'list'">List View</span>
          <span v-if="theme == 'list'">Grid View</span>
        </button>
      </div>
    </div>

    <VueFileAgent
      v-model="filesData"
      :deletable="true"
      :editable="true"
      :linkable="true"
      :theme="theme"
      :uploadUrl="uploadUrl"
      @select="filesSelected($event)"
      @delete="fileDeleted($event)"
      :sortable="sortable"
      :resumable="resumable"
    >
    </VueFileAgent>

    <div ref="screenDetector" style="height: 0; width: 0;" class="d-none d-sm-block"></div>
  </div>
  <!-- {% endraw %} -->
</template>

<script>
export default {
  data: function() {
    return {
      theme: 'default',
      lastProgress: 0,
      filesData: this.getFilesDataInitial(),
      sortable: false,
      resumable: true,
    };
  },
  computed: {
    uploadUrl: function() {
      if (this.resumable) {
        return 'https://master.tus.io/files/';
      }
      return window.uploadUrl || 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3';
    },
  },
  methods: {
    getFilesDataInitial: function() {
      return window.getFilesDataInitial();
    },
    demonstrate: function() {
      if (this.lastProgress >= 100) {
        return;
      }
      setTimeout(
        function() {
          this.lastProgress = this.lastProgress + 5;
          this.filesData[0].progress(this.lastProgress);
          this.demonstrate();
        }.bind(this),
        400,
      );
    },
    filesSelected: function(filesData) {
      console.log(filesData);
      console.log(JSON.stringify(filesData));
      // manual handling
      // this.$refs.vueFileInput.upload(this.uploadUrl, filesData);
    },
    fileDeleted: function(fileData) {
      // manual handling
      // this.$refs.vueFileInput.deleteUpload(this.uploadUrl, fileData);
    },
    switchTheme: function() {
      this.theme = this.theme == 'list' ? 'default' : 'list';
    },
  },
  mounted: function() {
    var style = window.getComputedStyle(this.$refs.screenDetector);
    if (style && style.display == 'none') {
      // propbably mobile
      this.theme = 'list';
    }
  },
};
</script>
