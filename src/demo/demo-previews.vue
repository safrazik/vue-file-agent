<template>
<!-- {% raw %} -->
<div class="theme-default">
  <div class="vue-file-agent grid-block-wrapper" style="padding: 0;">
    <template v-for="(fileData, i) in filesData">
      <VueFilePreview :key="i" :value="fileData" class="file-preview-wrapper grid-box-item grid-block"></VueFilePreview>
    </template>
  </div>
</div>
<!-- {% endraw %} -->
</template>

<script>

export default {
  data: function(){
    return {
      filesData: this.getFilesDataInitial(),
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
        {"name":"Test Files.zip","lastModified":1572147928098,"sizeText":"198 KB","size":202680,"type":"application/x-zip-compressed","ext":"zip"},
        {"name":"Document 3.doc","lastModified":1564392646097,"sizeText":"109 KB","size":111303,"type":"","ext":"doc"},
      ].forEach(function(fd){
        fd.url = filesBaseUrl + fd.name;
        // fd.progress = 10;
        filesData.push(fd);
      });

      return filesData;
    },
  },
  mounted: function(){
  }
}

</script>