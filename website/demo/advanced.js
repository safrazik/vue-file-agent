var filesBaseUrl = window.location.host == 'localhost:4000' ? '/vue-file-agent/website/assets/files/' : 'https://safrazik.github.io/vue-file-agent/website/assets/files/';

var videoData = {"name":"Cat Licking Its Paw.mp4","lastModified":1565241222998,"sizeText":"433 KB","size":443767,"type":"video/mp4","ext":"mp4", "dimensions": {"width": 640, "height": 360}};
videoData.videoThumbnail = filesBaseUrl + '/Cat Licking Its Paw-thumb.png';
videoData.imageColor = [66, 62, 45];


// // ...
// {
//   name: 'DSC_0261.jpg',
//   lastModified: 1564648335292,
//   sizeText: '64 KB',
//   size: 65762,
//   type: 'image/jpeg',
//   ext: 'jpg',
//   url: '/vue-file-agent/assets/files/DSC_0261.jpg',
// },
// // ...

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

var component = {
  data: function(){
    return {
      filesData: [],
      filesData: filesData,
      filesDataForUpload: [],
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
      uploadHeaders: {'X-Test-Header': 'vue-file-agent'},
      meta: true,
      multiple: true,
      deletable: true,
      compact: false,
      theme: 'list',
      sortDirection: {
        lastModified: 'ASC',
        name: 'ASC',
      },
      selectedIdx: 1,
      valAccept: 'image/*,video/*,.pdf,.doc,.docx,.ods',
      valMaxSize: '10MB',
      valMaxFiles: 14,
    };
  },
  computed: {
    filesDataInvalid: function(){
      var filesDataInvalid = [];
      for(var i = 0; i < this.filesData.length; i++){
        if(this.filesData[i].error){
          filesDataInvalid.push(this.filesData[i]);
        }
      }
      return filesDataInvalid;
    },
  },
  methods: {
    getSelectedFileData(){
      var i = this.selectedIdx;
      i = i - 1;
      if(!this.filesData[i]){
        return;
      }
      return this.filesData[i];
    },
    removeAll: function(){
      console.log(this.filesData);
      this.filesData = [];
      this.filesDataForUpload = [];
    },
    setProgress(){
      var fileData = this.getSelectedFileData();
      if(!fileData){
        return;
      }
      var prg = this.$refs.prgInput.value;
      console.log('prg', prg);
      fileData.progress(prg);
    },
    removeInvalid: function(){
      var filesDataNew = this.filesData.concat([]);
      for(var i = 0; i < this.filesDataInvalid.length; i++){
        var idx = filesDataNew.indexOf(this.filesDataInvalid[i]);
        if(idx !== -1){
          filesDataNew.splice(idx, 1);
        }
      }
      var filesDataNew = [];
      for(var i = 0; i < this.filesData.length; i++){
        if(!this.filesData[i].error){
          filesDataNew.push(this.filesData[i]);
        }
      }
      this.filesData = filesDataNew; // mutate at once, do not splice each
    },
    remove: function(){
      console.log('removing...');
      var i = this.selectedIdx;
      i = i - 1;
      if(!this.filesData[i]){
        return;
      }
      this.filesData.splice(i, 1);
    },
    upload: function(){
      console.log('let au debug');
      var fileData = this.getSelectedFileData();
      if(!fileData){
        return;
      }
      if(!(fileData.file && fileData.file instanceof File)){
        alert('This is not a user selected file');
        return;
      }
      var i = this.filesDataForUpload.indexOf(fileData);
      if(i !== -1){
        this.filesDataForUpload.splice(i, 1);
      }
      this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, [fileData]);
    },
    moveIndex: function(dir){
      console.log('moveIndex', dir);
      var index = parseInt(this.selectedIdx) - 1;
      var newIndex = index + dir;
      if(newIndex < 0){
        newIndex = this.filesData.length - 1;
      }
      if(newIndex >= this.filesData.length){
        newIndex = 0;
      }
      var existing = this.filesData[index];
      var adjacent = this.filesData[newIndex];
      this.selectedIdx = newIndex + 1;
      if(!existing || !adjacent){
        return;
      }
      var filesData = this.filesData;
      filesData[newIndex] = existing;
      filesData[index] = adjacent;
      this.filesData = filesData.concat([]); // cause Vue array mutation
    },
    sortBy: function(prop){
      // var asc = this['_is_sorted_desc_' + prop] = !this['_is_sorted_desc_' + prop];
      var direction = this.sortDirection[prop];
      this.sortDirection[prop] = direction == 'DESC' ? 'ASC' : 'DESC';
      // console.log('sortBy', prop, this.filesData);
      var ret = direction == 'DESC' ? -1 : 1;
      this.filesData = this.filesData.sort(function(fd1, fd2){
        var f1 = fd1.file || fd1;
        var f2 = fd2.file || fd2;
        return f1[prop] > f2[prop] ? 1*ret : -1*ret;
      });
      // console.log('sortBy after', prop, this.filesData);
    },



    uploadFiles: function(){
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.filesDataForUpload);
      this.filesDataForUpload = [];
    },
    deleteUploadedFile: function(fileData){
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileData);
    },
    filesSelected: function(filesData){
      console.log('filesSelected', filesData);
      var validFilesData = [];
      for(var i = 0; i < filesData.length; i++){
        if(!filesData[i].error){
          validFilesData.push(filesData[i]);
        }
      }
      console.log('filesSelected', filesData, validFilesData);
      this.filesDataForUpload = this.filesDataForUpload.concat(validFilesData);
    },
    fileDeleted: function(fileData){
      var i = this.filesDataForUpload.indexOf(fileData);
      if(i !== -1){
        this.filesDataForUpload.splice(i, 1);
      }
      else {
        this.deleteUploadedFile(fileData);
      }
    },

  }
}