<template>
  <!-- {% raw %} -->
  <div class="row">
    <div class="col-md-3 mb-3">
      <div class="bg-light p-2">
        <div class="row mx-n2">
          <div class="col-md-12 col-12 px-2">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>:accept</small></span>
              </div>
              <input class="form-control" type="text" v-model="valAccept" placeholder="e.g: image/*,video/*" />
              <div class="input-group-append">
                <a
                  class="btn btn-warning"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers"
                  target="_blank"
                >
                  ?
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-6 px-2">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>:maxSize</small></span>
              </div>
              <input class="form-control" type="text" v-model="valMaxSize" placeholder="e.g: 500KB, 2.5MB, 1GB" />
            </div>
          </div>
          <div class="col-md-12 col-6 px-2">
            <div class="input-group input-group-sm mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>:maxFiles</small></span>
              </div>
              <input class="form-control" type="number" v-model="valMaxFiles" placeholder="e.g: 4" />
            </div>
          </div>
        </div>
        <div class="row mx-n2">
          <div class="col-md-12 px-2 mb-1">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text"><small>Upload URL</small></span>
              </div>
              <input id="advanced-demo-upload-url" class="form-control" type="text" v-model="uploadUrl" />
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-auto" v-model="auto" />
              <label class="custom-control-label" for="advanced-demo-auto">:auto</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-meta" v-model="meta" />
              <label class="custom-control-label" for="advanced-demo-meta">:meta</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-multiple" v-model="multiple" />
              <label class="custom-control-label" for="advanced-demo-multiple">:multiple</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-deletable" v-model="deletable" />
              <label class="custom-control-label" for="advanced-demo-deletable">:deletable</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-editable" v-model="editable" />
              <label class="custom-control-label" for="advanced-demo-editable">:editable</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-linkable" v-model="linkable" />
              <label class="custom-control-label" for="advanced-demo-linkable">:linkable</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-resumable" v-model="resumable" />
              <label class="custom-control-label" for="advanced-demo-resumable"
                >:resumable (<a href="https://safrazik.github.io/vue-file-agent/docs/#resumable">Docs</a>)</label
              >
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-sortable" v-model="sortable" />
              <label class="custom-control-label" for="advanced-demo-sortable"
                >:sortable (<a href="https://safrazik.github.io/vue-file-agent/docs/#sortable">Docs</a>)</label
              >
            </div>

            <select class="custom-select custom-select-sm mt-1" v-model="sortable">
              <option selected :value="false">:sortable false</option>
              <!-- <option :value="false">false</option> -->
              <option :value="true">true</option>
              <option value="hold">"hold"</option>
              <option value="handle">"handle"</option>
            </select>
          </div>
          <div class="col-6 col-md-12 px-2">
            <div class="custom-control custom-checkbox mt-1">
              <input type="checkbox" class="custom-control-input" id="advanced-demo-disabled" v-model="disabled" />
              <label class="custom-control-label" for="advanced-demo-disabled">:disabled</label>
            </div>
          </div>
          <div class="col-6 col-md-12 px-2">
            <select class="custom-select custom-select-sm mt-1" v-model="theme">
              <option selected>- Theme -</option>
              <option value="default">Default Theme (default)</option>
              <option value="list">List Theme (list)</option>
            </select>
            <!--         <div class="custom-control custom-checkbox mt-1">
            <input type="checkbox" class="custom-control-input" id="advanced-demo-compact" v-model="compact">
            <label class="custom-control-label" for="advanced-demo-compact">:compact</label>
          </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-5 col-sm-6 mb-3">
      <div class="mx-auto" :style="compact ? { width: '200px' } : {}">
        <VueFileAgent
          ref="vueFileAgent"
          :auto="auto"
          :uploadUrl="uploadUrl"
          :uploadHeaders="uploadHeaders"
          :multiple="multiple"
          :meta="meta"
          :deletable="deletable"
          :editable="editable"
          :linkable="linkable"
          :sortable="sortable"
          :resumable="resumable"
          :disabled="disabled"
          :compact="compact"
          :accept="valAccept"
          :maxSize="valMaxSize"
          :maxFiles="valMaxFiles"
          :theme="theme"
          @select="filesSelected($event)"
          @delete="fileDeleted($event)"
          @sort="onSort($event)"
          @upload="uploadEvent('upload', $event)"
          @upload:error="uploadEvent('upload:error', $event)"
          @upload:delete="uploadEvent('upload:delete', $event)"
          @upload:delete:error="uploadEvent('upload:delete:error', $event)"
          @upload:update="uploadEvent('upload:update', $event)"
          @upload:update:error="uploadEvent('upload:update:error', $event)"
          v-model="filesData"
        ></VueFileAgent>
      </div>
    </div>

    <div class="col-md-4 col-sm-6 mb-3">
      <div class="bg-light p-2">
        <div class="form-inlinex">
          <div class="row">
            <div class="col-md-12">
              <div v-if="!filesData.length">
                No files selected
              </div>
              <div class="form-inline" v-if="filesData.length">
                <label class="my-1 mr-2" for="file-select-index">With File:</label>
                <!--       <select ref="fileIdx" class="custom-select my-1 mr-sm-2" id="file-select-index" v-model="selectedIdx">
              <option v-for="i in filesData.length" :value="i">{{ i }}</option>
            </select> -->
                <!-- </div><div> -->
                <button
                  type="button"
                  class="btn mr-1 mb-1"
                  :key="i"
                  v-for="(fileData, i) in filesData"
                  :class="{ 'btn-secondary': selectedIdx == i + 1, 'btn-light': selectedIdx != i + 1 }"
                  @click="selectedIdx = i + 1"
                >
                  <!-- <span class="badge badge-secondary" :style="{'background-color': fileData.color}"> -->
                  {{ i + 1 }}
                  <!-- </span> -->
                </button>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <label class="my-1 mr-2" for="set-progress-range">Set Progess to:</label>
                </div>
                <div class="col-md-12">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    ref="prgInput"
                    @input="setProgress()"
                    @change="setProgress()"
                    id="set-progress-range"
                    class="custom-range"
                  />
                </div>
              </div>

              <button type="button" class="btn btn-outline-secondary mb-2" @click="moveIndex(-1)">&lt;&lt;</button>
              <button type="button" class="btn btn-outline-secondary mb-2" @click="moveIndex(1)">&gt;&gt;</button>
              <button type="button" class="btn btn-outline-danger mb-2" @click="remove()">Remove</button>
              <button type="button" class="btn btn-outline-success mb-2" @click="update()">Update</button>
              <button type="button" class="btn btn-outline-primary mb-2" @click="upload()">Upload</button>
            </div>
          </div>

          <hr />

          <div class="mb-2">
            <button
              class="btn btn-outline-secondary mb-2"
              :disabled="!filesDataForUpload.length"
              @click="uploadFiles()"
            >
              Upload Queue ({{ filesDataForUpload.length }})
            </button>

            <button class="btn btn-danger mb-2" :disabled="!filesDataInvalid.length" @click="removeInvalid()">
              Remove Invalid ({{ filesDataInvalid.length }})
            </button>

            <button
              type="button"
              class="btn btn-outline-danger mb-2"
              @click="removeAll()"
              :disabled="!filesData.length"
            >
              Remove All ({{ filesData.length }})
            </button>
          </div>
          <div>
            Sort by:
            <button type="button" class="btn btn-outline-secondary mb-2" @click="sortBy('lastModified')">
              Last Modified {{ sortDirection.lastModified }}
            </button>
            <button type="button" class="btn btn-outline-secondary mb-2" @click="sortBy('name')">
              Name {{ sortDirection.name }}
            </button>
          </div>
        </div>
        <!-- Move: <input type="number" ref="moveInput" value="1"> -->
        <!-- <input type="number" ref="removeIdx" value="1"> -->

        <!-- Set Progress to: -->
        <!--     <button @click="setProgress()">
            Set Progress 
          </button> -->
      </div>
    </div>
  </div>
  <!-- {% endraw %} -->
</template>

<script>
export default {
  data: function() {
    return {
      filesData: this.getFilesDataInitial(),
      filesDataForUpload: [],
      auto: false,
      uploadUrl: window.uploadUrl || 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
      uploadHeaders: {},
      meta: true,
      multiple: true,
      deletable: true,
      editable: true,
      linkable: true,
      sortable: false,
      resumable: false,
      disabled: false,
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
    filesDataInvalid: function() {
      var filesDataInvalid = [];
      for (var i = 0; i < this.filesData.length; i++) {
        if (this.filesData[i].error) {
          filesDataInvalid.push(this.filesData[i]);
        }
      }
      return filesDataInvalid;
    },
    uploadEndpoint: function() {
      if (this.resumable && this.uploadUrl.indexOf('mocky.io') !== -1) {
        return 'https://master.tus.io/files/';
      }
      return this.uploadUrl;
    },
  },
  methods: {
    uploadEvent(eventName, data) {
      console.log('UPLOAD EVENT ', eventName, data);
    },
    getFilesDataInitial: function() {
      return window.getFilesDataInitial();
    },
    getSelectedFileData: function() {
      var i = this.selectedIdx;
      i = i - 1;
      if (!this.filesData[i]) {
        return;
      }
      return this.filesData[i];
    },
    removeAll: function() {
      console.log(this.filesData);
      this.filesData = [];
      this.filesDataForUpload = [];
    },
    setProgress: function() {
      var fileData = this.getSelectedFileData();
      if (!fileData) {
        return;
      }
      var prg = this.$refs.prgInput.value;
      fileData.progress(prg);
    },
    removeInvalid: function() {
      var filesDataNew = this.filesData.concat([]);
      for (var i = 0; i < this.filesDataInvalid.length; i++) {
        var idx = filesDataNew.indexOf(this.filesDataInvalid[i]);
        if (idx !== -1) {
          filesDataNew.splice(idx, 1);
        }
      }
      filesDataNew = [];
      for (i = 0; i < this.filesData.length; i++) {
        if (!this.filesData[i].error) {
          filesDataNew.push(this.filesData[i]);
        }
      }
      this.filesData = filesDataNew; // mutate at once, do not splice each
    },
    remove: function() {
      console.log('removing...');
      var i = this.selectedIdx;
      i = i - 1;
      if (!this.filesData[i]) {
        return;
      }
      this.filesData.splice(i, 1);
    },
    update: function() {
      var fileData = this.getSelectedFileData();
      if (!fileData) {
        return;
      }
      if (!(fileData.file && fileData.file instanceof File)) {
        alert('This is not a user selected file');
        return;
      }
      this.$refs.vueFileAgent.updateUpload(this.uploadUrl, this.uploadHeaders, fileData);
    },
    upload: function() {
      console.log('let au debug');
      var fileData = this.getSelectedFileData();
      if (!fileData) {
        return;
      }
      if (!(fileData.file && fileData.file instanceof File)) {
        alert('This is not a user selected file');
        return;
      }
      var i = this.filesDataForUpload.indexOf(fileData);
      if (i !== -1) {
        this.filesDataForUpload.splice(i, 1);
      }
      this.$refs.vueFileAgent.upload(this.uploadEndpoint, this.uploadHeaders, [fileData]).then(
        function(result) {
          console.log('uploded: ', result);
          console.log('after upload: ', fileData);
          console.log('after upload all: ', this.filesData);
        }.bind(this),
      );
    },
    moveIndex: function(dir) {
      console.log('moveIndex', dir);
      var index = parseInt(this.selectedIdx) - 1;
      var newIndex = index + dir;
      if (newIndex < 0) {
        newIndex = this.filesData.length - 1;
      }
      if (newIndex >= this.filesData.length) {
        newIndex = 0;
      }
      var existing = this.filesData[index];
      var adjacent = this.filesData[newIndex];
      this.selectedIdx = newIndex + 1;
      if (!existing || !adjacent) {
        return;
      }
      var filesData = this.filesData;
      filesData[newIndex] = existing;
      filesData[index] = adjacent;
      this.filesData = filesData.concat([]); // cause Vue array mutation
    },
    sortBy: function(prop) {
      // var asc = this['_is_sorted_desc_' + prop] = !this['_is_sorted_desc_' + prop];
      var direction = this.sortDirection[prop];
      this.sortDirection[prop] = direction == 'DESC' ? 'ASC' : 'DESC';
      // console.log('sortBy', prop, this.filesData);
      var ret = direction == 'DESC' ? -1 : 1;
      this.filesData = this.filesData.sort(function(fd1, fd2) {
        var f1 = fd1.file || fd1;
        var f2 = fd2.file || fd2;
        return f1[prop] > f2[prop] ? 1 * ret : -1 * ret;
      });
      // console.log('sortBy after', prop, this.filesData);
    },

    uploadFiles: function() {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(this.uploadEndpoint, this.uploadHeaders, this.filesDataForUpload);
      this.filesDataForUpload = [];
    },
    deleteUploadedFile: function(fileData) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadEndpoint, this.uploadHeaders, fileData);
    },
    filesSelected: function(filesData) {
      console.log('filesSelected', filesData);
      var validFilesData = [];
      for (var i = 0; i < filesData.length; i++) {
        if (!filesData[i].error) {
          validFilesData.push(filesData[i]);
        }
      }
      console.log('filesSelected', filesData, validFilesData);
      this.filesDataForUpload = this.filesDataForUpload.concat(validFilesData);
    },
    fileDeleted: function(fileData) {
      var i = this.filesDataForUpload.indexOf(fileData);
      if (i !== -1) {
        this.filesDataForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileData);
      }
    },
    onSort(event) {
      console.log(
        'sorted',
        event.oldIndex,
        event.newIndex,
        this.filesData.map(function(fd) {
          return typeof fd.name == 'function' ? fd.name() : fd.name;
        }),
      );
    },
  },
  watch: {
    filesData() {},
  },
};
</script>
