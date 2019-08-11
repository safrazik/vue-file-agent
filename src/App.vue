<template>
  <div id="app">
    <img style="display: none;" alt="Vue logo" src="./assets/logo.png">
    <!-- <div style="width: 100%;"><div style="width: 25%; float: left;">Menu</div><div style="width: 75%; float: left;"> -->
      <!-- <div>{{ filesData.length }} Files Selected</div><div style="height: 500px; overflow-y: auto;"> -->
    <VueFileInput
      ref="vueFileInput"
      :xurl="uploadUrl"
      :multiple="true"
      :xaccept="'image/png,.zip'"
      :xmaxSize="'10MB'"
      :maxFiles="14"
      :xhelpText="'Choose files mate'"
      :errorText="{
        type: 'Invalid file type. Only png or zip Allowed',
        size: 'Files should not exceed 8MB in size',
      }"
      v-model="filesData"
      @select="filesSelected($event)"
      deletable
      @delete="fileDeleted($event)"
    ></VueFileInput>
    <!-- </div> -->
    <div>
      <button @click="removeAll()">Remove All</button>
      <input type="number" ref="removeIdx" value="1">
      <button @click="remove()">Remove</button>
      <button @click="sortBy('lastModified')">Sort by Last Modified</button>
      <button @click="sortBy('name')">Sort by Name</button>
    </div>
    <!-- </div></div> -->
  </div>
</template>

<script>

import Vue from 'vue';
import VueFileAgent from './index';

import uploader from './lib/upload-helper';

Vue.use(VueFileAgent);

export default {
  name: 'app',
  data(){
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
    uploadUrl(){
      var url = 'http://' + (window.location.host || 'zetmel.local:81') + '/zetmel/hosting2/api/fs/upload?path=' + encodeURIComponent(this.currentFolder ? this.currentFolder.path : this.homeDir); 
      // var url = 'http://safrazroomanonexistent.com/zetmel/hosting2/api/fs/upload?path=' + encodeURIComponent(this.currentFolder ? this.currentFolder.path : this.homeDir); 
      return url;
    }
  },
  components: {
  },
  methods: {
    removeAll(){
      console.log(this.filesData);
      this.filesData = [];
    },
    remove(){
      console.log('removing...');
      var i = this.$refs.removeIdx.value;
      this.filesData.splice(i, 1);
    },
    sortBy(prop){
      var asc = this['_is_sorted_desc_' + prop] = !this['_is_sorted_desc_' + prop];
      // console.log('sortBy', prop, this.filesData);
      var ret = asc ? -1 : 1;
      this.filesData = this.filesData.sort(function(fd1, fd2){
        return fd1.file[prop] > fd2.file[prop] ? 1*ret : -1*ret;
      });
      console.log('sortBy after', prop, this.filesData);
    },
    filesSelected(filesData){
      // manual handling
      // this.$refs.vueFileInput.upload(this.uploadUrl, filesData);
    },
    fileDeleted(fileData){
      // manual handling
      // this.$refs.vueFileInput.deleteUpload(this.uploadUrl, fileData);
    },
  }
}
</script>

<style>
body {
  /*background: #222;*/
  /*margin: 0;*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
/*  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
