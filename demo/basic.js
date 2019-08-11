var filesBaseUrl = '/vue-file-agent/assets/files/';

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
      overallProgress: 0,
      // filesData: [
      // ],
      filesData: filesData,
    };
  },
  computed: {
    uploadUrl: function(){
      var url = 'http://' + (window.location.host || 'zetmel.local:81') + '/zetmel/hosting2/api/fs/upload?path=' + encodeURIComponent(this.currentFolder ? this.currentFolder.path : this.homeDir); 
      // var url = 'http://safrazroomanonexistent.com/zetmel/hosting2/api/fs/upload?path=' + encodeURIComponent(this.currentFolder ? this.currentFolder.path : this.homeDir); 
      return url;
    }
  },
  components: {
  },
  methods: {
    demonstrate: function(){
      setTimeout(function() {
        this.lastProgress = this.lastProgress;
        this.filesData[0].progress(this.lastProgress);
      }.bind(this), 400);
    },
    moveIndex: function(dir){
      console.log('moveIndex', dir);
      var index = parseInt(this.$refs.moveInput.value) - 1;
      var newIndex = index + dir;
      if(newIndex < 0){
        newIndex = this.filesData.length - 1;
      }
      if(newIndex >= this.filesData.length){
        newIndex = 0;
      }
      var existing = this.filesData[index];
      var adjacent = this.filesData[newIndex];
      this.$refs.moveInput.value = newIndex + 1;
      var filesData = this.filesData;
      // console.log('before', filesData.map(i => i.name));
      filesData[newIndex] = existing;
      filesData[index] = adjacent;
      // console.log('after', filesData.map(i => i.name));
      // this.filesData = [];
      this.filesData = filesData.concat([]);
    },
    printThem: function(){

    },
    removeAll: function(){
      console.log(this.filesData);
      this.filesData = [];
    },
    remove: function(){
      console.log('removing...');
      var i = this.$refs.removeIdx.value;
      this.filesData.splice(i, 1);
    },
    sortBy: function(prop){
      var asc = this['_is_sorted_desc_' + prop] = !this['_is_sorted_desc_' + prop];
      // console.log('sortBy', prop, this.filesData);
      var ret = asc ? -1 : 1;
      this.filesData = this.filesData.sort(function(fd1, fd2){
        return fd1.file[prop] > fd2.file[prop] ? 1*ret : -1*ret;
      });
      console.log('sortBy after', prop, this.filesData);
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
    this.demonstrate();
  }
}