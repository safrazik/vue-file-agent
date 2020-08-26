// var fileAgentModule = window.FileAgent;
// var FileAgent = fileAgentModule.FileAgent;
// var FileIcon = fileAgentModule.FileIcon;
// var FilePreview = fileAgentModule.FilePreview;
// var FileRecord = fileAgentModule.FileRecord;
// var plugins = fileAgentModule.plugins;
import { FileAgent, FileIcon, FilePreview, FileRecord, plugins } from '..';
import { AdvancedDemo } from './advanced-demo';

plugins.tus = (window as any).tus;

const fileIcon = new FileIcon({
  ext: 'pdf',
});
fileIcon.render(document.getElementById('file-icon-wrapper') as HTMLElement);

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
    url: 'files/House Sparrow.jpg',
    progress: 67,
  },
  {
    name: 'UNDELETABLE System file.sys',
    lastModified: 1583992794341,
    sizeText: '14 KB',
    size: 14403,
    type: 'system/file',
    ext: 'sys',
    url: 'files/UNDELETABLE System file.sys',
    progress: 10,
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
    url: 'files/Golf.mp4',
    videoThumbnail: 'files/Golf-thumb.jpg',
    imageColor: [66, 62, 45],
  },
  {
    name: 'sample.pdf',
    lastModified: 1565232623243,
    sizeText: '3 KB',
    size: 3028,
    type: 'application/pdf',
    ext: 'pdf',
    url: 'files/sample.pdf',
  },
];

const container = document.getElementById('file-preview-blocks-container') as HTMLElement;

const maxSize = '4MB';

const secFileRecord = rawFileRecords[1];

let winFileRecords: FileRecord[] = [];
let fileAgent: FileAgent;
const advancdeDemo: AdvancedDemo = new AdvancedDemo();

setTimeout(() => {
  FileRecord.fromRawArray([secFileRecord as any], {} as any).then((secFileRecords) => {
    winFileRecords = winFileRecords.slice(0, 1).concat(secFileRecords).concat(winFileRecords.slice(1));
    fileAgent.$props.fileRecords = winFileRecords;
    fileAgent.update();
  });
}, 1000);
setTimeout(() => {
  winFileRecords = winFileRecords.reverse();
  fileAgent.$props.fileRecords = winFileRecords;
  fileAgent.update();
}, 2000);

FileRecord.fromRawArray(rawFileRecords.slice(0, 1).concat(rawFileRecords.slice(2)) as any, {
  read: false,
  maxSize,
}).then((fileRecords) => {
  winFileRecords = fileRecords;
  fileAgent = new FileAgent({
    auto: false,
    uploadUrl: 'https://master.tus.io/files/',
    resumable: true,
    multiple: true,
    fileRecords,
    deletable: true,
    editable: true,
    linkable: true,
    maxSize,
    // sortable: true,
    // theme: 'list',
    // draggable: document.getElementById('file-drag-area'),
    onBeforeDelete(fileRecord) {
      console.log('onBeforrrrrr', fileRecord.name());
      if (true || confirm('Sure?')) {
        return true;
      }
      return false;
    },
    onBeforeRename(fileRecord) {
      console.log('onBefoererere', ',,,,');
      // return false;
    },
    onSelect(fRecs) {
      console.log('onSelect', fRecs);
    },
    onRename(fileRecord) {
      console.log('onRename', fileRecord.name(), fileRecord);
      if (fileRecord.name().toLowerCase().indexOf('shit') === -1) {
        return;
      }
      fileRecord.setError('Shitty name is not allowed.');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(false);
        }, 1000);
      });
    },
    onDelete(fileRecord) {
      console.log('onDelete', fileRecord.name(), fileRecord);
      if (fileRecord.name().toLowerCase().indexOf('system') === -1) {
        return;
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fileRecord.setError('System files cannot be deleted.');
          resolve(false);
        }, 1000);
      });
    },
    slots: {
      afterInner: 'After inner',
      afterOuter: 'After outer',
      beforeInner: document.getElementById('some-unique-el'),
      beforeOuter: 'Before outer',
      //   filePreviewx: function (fileRecord) {
      //     return `<div>
      //               File: ${fileRecord.name()}
      //             </div>`;
      //   },
      //   filePreviewNewx: `<div class="file-preview-wrapper grid-box-item grid-block file-preview-new">

      //     <span class="file-preview">
      //       <span style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
      //         <h1 data-ref="help-text" class="help-text"></h1>
      //       </span>
      //     </span>
      //             </div>`,
      sortableHandle: 'Sortable Handle',
    },
  });
  // fileAgent.render(document.getElementById('file-agent-wrapper') as HTMLElement);
});
advancdeDemo.render(document.getElementById('file-agent-wrapper') as HTMLElement);

FileRecord.fromRawArray(rawFileRecords as any, { read: false, maxSize: '4MB' }).then((fileRecords) => {
  //   for (let i = 0; i < fileRecords.length; i++) {
  for (const fileRecord of fileRecords) {
    // const fileRecord = fileRecords[i];
    const filePreview = new FilePreview({
      //   ext: 'pdf',
      fileRecord,
      deletable: true,
      editable: true,
      linkable: true,
      onRename(fRec) {
        console.log('onRename', fRec.name(), fRec);
      },
      onDelete(fRec) {
        console.log('onDelete', fRec.name(), fRec);
      },
    });
    const child = document.createElement('div');
    child.className = 'file-preview-wrapper grid-box-item grid-block';
    container.appendChild(child);
    filePreview.render(child);
  }
});

// var fileRecord = FileRecord.fromRawSync(
//   {
//     name: 'Some Large File.zip',
//     size: 25165824, // 24 MB
//     type: 'application/zip',
//     ext: 'zip',
//   },
//   { read: false },
// );
