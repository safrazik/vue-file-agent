<template>
  <div>
    <h1>Hello world!</h1>
    <div>
      Here's the React File Agent
      <hr />
    </div>

    <fieldset id="file-drag-area">
      <legend>Drag Area</legend>
      CI
      <input type="text" v-model="ext" /> ({{ ext }})
      <div id="file-icon-wrapper">
        <FileIcon :ext="ext" />
      </div>
      <FileAgent
        uploadUrl="https://master.tus.io/files/"
        :resumable="true"
        :multiple="true"
        :fileRecords="fileRecords"
        :deletable="settings.deletable"
        :editable="settings.editable"
        :linkable="true"
      ></FileAgent>
      <h3>File Previews</h3>
      <input type="checkbox" v-model="settings.deletable" /> Deletable<br />
      <input type="checkbox" v-model="settings.editable" /> Editable
      <div :style="{ border: '1px solid blue' }">
        <div class="theme-default">
          <div class="vue-file-agent grid-block-wrapper" :style="{ padding: 0 }" id="file-preview-blocks-container">
            <div :key="i" v-for="(fileRecord, i) in fileRecords" class="file-preview-wrapper grid-box-item grid-block">
              <FilePreview
                :fileRecord="fileRecord"
                :deletable="settings.deletable"
                :editable="settings.editable"
                :linkable="true"
                :onRename="onRename"
                :onDelete="onDelete"
              ></FilePreview>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import FileIcon from '../components/file-icon';
import FilePreview from '../components/file-preview';
import FileAgent from '../components/file-agent';
import { FileRecord, plugins } from '@file-agent/core';

plugins.tus = (window as any).tus;

const baseUrl = 'https://safrazik.com/vue-file-agent/website/assets/';

const rawFileRecords = [
  {
    name: 'Some Large File.zip',
    size: 25165824, // 24 MB
    type: 'application/zip',
    ext: 'zip',
  },
  {
    name: 'House Sparrow.jpg',
    lastModified: 1583992794341,
    sizeText: '14 KB',
    size: 14403,
    type: 'image/jpeg',
    ext: 'jpg',
    url: baseUrl + 'files/House Sparrow.jpg',
    progress: 67,
  },
  {
    name: 'Golf.mp4',
    lastModified: 1576563996233,
    sizeText: '549 KB',
    size: 561813,
    type: 'video/mp4',
    ext: 'mp4',
    dimensions: {
      width: 640,
      height: 360,
    },
    url: baseUrl + 'files/Golf.mp4',
    videoThumbnail: baseUrl + 'files/Golf-thumb.jpg',
    imageColor: [66, 62, 45],
  },
  {
    name: 'sample.pdf',
    lastModified: 1565232623243,
    sizeText: '3 KB',
    size: 3028,
    type: 'application/pdf',
    ext: 'pdf',
    url: baseUrl + 'files/sample.pdf',
  },
];

export default Vue.extend({
  components: {
    FileIcon,
    FilePreview,
    FileAgent,
  },
  data() {
    return {
      ext: 'svg',
      fileRecords: [] as FileRecord[],
      settings: {
        editable: true,
        deletable: true,
      },
      onRename(fileRecord: FileRecord) {
        console.log('onRename', fileRecord.name(), fileRecord);
      },
      onDelete(fileRecord: FileRecord) {
        console.log('onDelete', fileRecord.name(), fileRecord);
      },
    };
  },
  created() {
    // if (!this.fileRecords.length) {
    //   FileRecord.fromRawArray(rawFileRecords as any, { read: false, maxSize: '4MB' }).then((fileRecords) => {
    //     this.fileRecords = fileRecords;
    //     setTimeout(() => {
    //       setTimeout(() => {
    //         fileRecords[0].progress(34);
    //         fileRecords[0].customError('Custom Error test');
    //       }, 2000);
    //       this.fileRecords = fileRecords.reverse().concat([]);
    //     }, 2000);
    //   });
    // }

    const [fileRecords, setFileRecords] = [
      this.fileRecords,
      (fileRecords: FileRecord[]) => {
        this.fileRecords = fileRecords;
      },
    ];

    if (!fileRecords.length) {
      FileRecord.fromRawArray(rawFileRecords as any, { read: false, maxSize: '4MB' }).then((fileRecords) => {
        setFileRecords(fileRecords);
        setTimeout(() => {
          setTimeout(() => {
            fileRecords[0].progress(34);
            fileRecords[0].customError('Custom Error test');
          }, 2000);
          setFileRecords(fileRecords.reverse().concat([]));
        }, 2000);
      });
    }
  },
});
</script>
