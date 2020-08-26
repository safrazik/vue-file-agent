import { FileRecord, plugins, UploaderInterface, ConfigureFn, CreateFormDataFn } from '@file-agent/core';
import uploadHelper, { TusOptionsFn } from './upload-helper';

interface UploadOptions {
  resumable?: boolean;
  tusOptions?: TusOptionsFn;
}

export class Uploader implements UploaderInterface<UploadOptions> {
  public upload(
    url: string,
    headers: object,
    options: UploadOptions,
    fileRecords: FileRecord[],
    createFormData?: CreateFormDataFn,
    progressFn?: (progress: number) => void,
    configureFn?: ConfigureFn,
  ) {
    if (options.resumable) {
      return uploadHelper.tusUpload(
        plugins.tus,
        url,
        headers,
        fileRecords,
        (overallProgress) => {
          // this.overallProgress = overallProgress;
        },
        options.tusOptions,
      );
    }
    return uploadHelper.upload(url, headers, fileRecords, createFormData, progressFn, configureFn);
  }

  public deleteUpload(
    url: string,
    headers: object,
    options: UploadOptions,
    fileRecord: FileRecord,
    uploadData?: any,
    configureFn?: ConfigureFn,
  ) {
    if (options.resumable) {
      return uploadHelper.tusDeleteUpload(plugins.tus, url, headers, fileRecord);
    }
    return uploadHelper.deleteUpload(url, headers, fileRecord, uploadData, configureFn);
  }

  public updateUpload(
    url: string,
    headers: object,
    options: UploadOptions,
    fileRecord: FileRecord,
    uploadData: any,
    configureFn?: ConfigureFn,
  ) {
    return uploadHelper.updateUpload(url, headers, fileRecord, uploadData, configureFn);
  }
}

export default new Uploader();
