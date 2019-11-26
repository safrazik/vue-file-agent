<template>
<!-- {% raw %} -->
<div>
  <VueFileAgent
    v-model="filesData"
    :deletable="true"
    :editable="true"
    :linkable="true"
    :theme="theme"
    :uploadUrl="uploadUrl"
    @select="filesSelected($event)"
    @delete="fileDeleted($event)"
  >
    <template v-slot:before-outer>
      <div class="mb-3 text-right">
        Switch theme to
        <!-- <a href="#" @click.prevent="switchTheme()">Switch</a> -->
        <button class="btn btn-sm btn-outline-warning" @click="switchTheme()">
          <span v-if="theme != 'list'">List View</span>
          <span v-if="theme == 'list'">Grid View</span>
        </button>
      </div>
    </template >
  </VueFileAgent>
</div>
<!-- {% endraw %} -->
</template>

<script>

export default {
  data: function(){
    return {
      theme: 'default',
      lastProgress: 0,
      filesData: this.getFilesDataInitial(),
      uploadUrl: window.uploadUrl || 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
    };
  },
  methods: {
    getFilesDataInitial: function(){
      return window.getFilesDataInitial();
    },
    demonstrate: function(){
      if(this.lastProgress >= 100){
        return;
      }
      setTimeout(function() {
        this.lastProgress = this.lastProgress + 5;
        this.filesData[0].progress(this.lastProgress);
        this.demonstrate();
      }.bind(this), 400);
    },
    filesSelected: function(filesData){
      console.log(filesData);
      console.log(JSON.stringify(filesData));
      // manual handling
      // this.$refs.vueFileInput.upload(this.uploadUrl, filesData);
    },
    fileDeleted: function(fileData){
      // manual handling
      // this.$refs.vueFileInput.deleteUpload(this.uploadUrl, fileData);
    },
    switchTheme: function(){
      this.theme = this.theme == 'list' ? 'default' : 'list';
    },
  },
  mounted: function(){
    // console.log('bali this.filesData', this.filesData);
    // this.demonstrate();
  }
}

</script>