var filesBaseUrl = '/vue-file-agent/website/assets/files/';

var videoData = {"name":"Cat Licking Its Paw.mp4","lastModified":1565241222998,"sizeText":"433 KB","size":443767,"type":"video/mp4","ext":"mp4"};
videoData.videoThumbnail = filesBaseUrl + '/Cat Licking Its Paw-thumb.png';
videoData.imageColor = [66, 62, 45];

var filesData = [];
[
  {"name":"sample.pdf","lastModified":1565232623243,"sizeText":"3 KB","size":3028,"type":"application/pdf","ext":"pdf"},
  {"name":"DSC_0261.jpg","lastModified":1564648335292,"sizeText":"64 KB","size":65762,"type":"image/jpeg","ext":"jpg"},
  {"name":"Important sheet.ods","lastModified":1564392646095,"sizeText":"0 B","size":0,"type":"","ext":"ods"},
  videoData,
  {"name":"Collection of something.zip","lastModified":1564392646087,"sizeText":"0 B","size":0,"type":"application/x-zip-compressed","ext":"zip"},
  {"name":"Document 3.doc","lastModified":1564392646097,"sizeText":"0 B","size":0,"type":"","ext":"doc"},
].forEach(function(fd){
  fd.url = filesBaseUrl + fd.name;
  // fd.progress = 10;
  filesData.push(fd);
});

var component = {
  data: function(){
    return {
      lastProgress: 0,
      filesData: filesData,
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
    };
  },
  methods: {
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
      // manual handling
      // this.$refs.vueFileInput.upload(this.uploadUrl, filesData);
    },
    fileDeleted: function(fileData){
      // manual handling
      // this.$refs.vueFileInput.deleteUpload(this.uploadUrl, fileData);
    },
  },
  mounted: function(){
    // console.log('bali this.filesData', this.filesData);
    // this.demonstrate();
  }
}