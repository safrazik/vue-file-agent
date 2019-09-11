<template>
<!-- {% raw %} -->
<div>
  <VueFileAgent
    v-model="filesData"
    @select="filesSelected($event)"
    deletable
    :theme="theme"
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
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
    };
  },
  methods: {
    getFilesDataInitial: function(){
      var filesBaseUrl = window.location.host == 'localhost:4000' ? '/vue-file-agent/website/assets/files/' : 'https://safrazik.github.io/vue-file-agent/website/assets/files/';

      var videoData = {"name":"Cat Licking Its Paw.mp4","lastModified":1565241222998,"sizeText":"433 KB","size":443767,"type":"video/mp4","ext":"mp4", "dimensions": {"width": 640, "height": 360}};
      videoData.videoThumbnail = filesBaseUrl + '/Cat Licking Its Paw-thumb.png';
      videoData.imageColor = [66, 62, 45];

      var filesData = [];
      [
        {"name":"sample.pdf","lastModified":1565232623243,"sizeText":"3 KB","size":3028,"type":"application/pdf","ext":"pdf"},
        {"name":"DSC_0261.jpg","lastModified":1564648335292,"sizeText":"64 KB","size":65762,"type":"image/jpeg","ext":"jpg"},
        {"name":"Important sheet.ods","lastModified":1564392646095,"sizeText":"31 KB","size":31276,"type":"","ext":"ods"},
        videoData,
        {"name":"Collection of something.zip","lastModified":1564392646087,"sizeText":"2 MB","size":1640378,"type":"application/x-zip-compressed","ext":"zip"},
        {"name":"Document 3.doc","lastModified":1564392646097,"sizeText":"109 KB","size":111303,"type":"","ext":"doc"},
      ].forEach(function(fd){
        fd.url = filesBaseUrl + fd.name;
        // fd.progress = 10;
        filesData.push(fd);
      });

      return filesData;
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