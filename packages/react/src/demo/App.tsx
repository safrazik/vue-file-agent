import React, { useState } from 'react';

import { FileRecord, plugins } from '@file-agent/core';

import FileIcon from '../components/file-icon';
import FilePreview from '../components/file-preview';
import FileAgent from '../components/file-agent';

var baseUrl = 'https://safrazik.com/vue-file-agent/website/assets/';

plugins.tus = (window as any).tus;

var rawFileRecords = [
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

var maxSize = '4MB';

export default function DemoApp() {
  // const fileRecords: FileRecord[] = [];

  const [fileRecords, setFileRecords] = useState([] as FileRecord[]);

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

  return (
    <div>
      <h1>Hello world!</h1>
      <div>
        Here's the React File Agent <hr />
      </div>
      <FileAgent
        {...{
          uploadUrl: 'https://master.tus.io/files/',
          resumable: true,
          multiple: true,
          fileRecords: fileRecords,
          deletable: true,
          editable: true,
          linkable: true,
          maxSize: maxSize,
          // sortable: true,
          // theme: 'list',
          // draggable: document.getElementById('file-drag-area'),
          events: {
            onBeforeDelete: function (fileRecord) {
              console.log('onBeforrrrrr', fileRecord.name());
              if (true || confirm('Sure?')) {
                return true;
              }
              return false;
            },
            onBeforeRename: function (fileRecord) {
              console.log('onBefoererere', ',,,,');
              // return false;
            },
            onSelect: function (fileRecords) {
              console.log('onSelect', fileRecords);
            },
            onRename: function (fileRecord) {
              console.log('onRename', fileRecord.name(), fileRecord);
              if (fileRecord.name().toLowerCase().indexOf('shit') === -1) {
                return;
              }
              fileRecord.customError('Shitty name is not allowed.');
              return new Promise(function (resolve, reject) {
                setTimeout(function () {
                  resolve(false);
                }, 1000);
              });
            },
            onDelete: function (fileRecord) {
              console.log('onDelete', fileRecord.name(), fileRecord);
              if (fileRecord.name().toLowerCase().indexOf('system') === -1) {
                return;
              }
              return new Promise(function (resolve, reject) {
                setTimeout(function () {
                  fileRecord.customError('System files cannot be deleted.');
                  resolve(false);
                }, 1000);
              });
            },
          },
          slots: {
            afterInner: 'After inner',
            afterOuter: 'After outer',
            beforeInner: document.getElementById('some-unique-el'),
            beforeOuter: 'Before outer',
            // filePreview: function (fileRecord) {
            //   return `<div>
            //       File: ${fileRecord.name()}
            //     </div>`;
            // },
            //     filePreviewNewx: `<div class="file-preview-wrapper grid-box-item grid-block file-preview-new">

            // <span class="file-preview">
            //   <span style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
            //     <h1 data-ref="help-text" class="help-text"></h1>
            //   </span>
            // </span>
            //         </div>`,
            sortableHandle: 'Sortable Handle',
          },
        }}
      />
      <div>
        File Previews:
        {false ? (
          ''
        ) : (
          <div style={{ border: '1px solid blue' }}>
            <div className="theme-default">
              <div
                className="vue-file-agent grid-block-wrapper"
                style={{ padding: 0 }}
                id="file-preview-blocks-container"
              >
                {fileRecords.map((fileRecord) => (
                  <div className="file-preview-wrapper grid-box-item grid-block">
                    <FilePreview
                      {...{
                        fileRecord: fileRecord,
                        deletable: true,
                        editable: true,
                        linkable: true,
                        onRename: function (fileRecord) {
                          console.log('onRename', fileRecord.name(), fileRecord);
                        },
                        onDelete: function (fileRecord) {
                          console.log('onDelete', fileRecord.name(), fileRecord);
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        File ICon??:
        <FileIcon name="system-close" />
      </div>
    </div>
  );
}
