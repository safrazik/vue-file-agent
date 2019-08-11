var component = {
  data: function(){
    return {
      overallProgress: 0,
      filesData: [],
      filesxData: [{
        ext: "png",
        // file: File,
        lastModified: 1553513050000,
        name: "QLogo.png",
        // progress: ƒ (value),
        size: 42499,
        sizeText: "48 KB",
        type: "image/png",
        // upload: {
        //   file: 'unique-123.png',
        // },
        'url': 'http://' + window.location.host + '/img/logo.82b9c7a5.png',
        // error: 'Invalid file type. Only png or zip Allowed',
        // error: {size: true, type: true},
      }],
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
  }
}