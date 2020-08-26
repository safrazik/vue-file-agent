import FileRecord from './file-record';

export type ConfigureFn = (request: XMLHttpRequest) => any;

export type CreateFormDataFn = (fileRecord: FileRecord) => FormData;

interface UploadOptions {
  resumable?: boolean;
}

export interface UploaderInterface<T extends UploadOptions = UploadOptions> {
  upload: (
    url: string,
    headers: object,
    options: T,
    fileRecords: FileRecord[],
    createFormData?: CreateFormDataFn,
    progressFn?: (progress: number) => void,
    configureFn?: ConfigureFn,
  ) => Promise<any>;

  deleteUpload: (
    url: string,
    headers: object,
    options: T,
    fileRecord: FileRecord,
    uploadData?: any,
    configureFn?: ConfigureFn,
  ) => Promise<any>;

  updateUpload: (
    url: string,
    headers: object,
    options: T,
    fileRecord: FileRecord,
    uploadData?: any,
    configureFn?: ConfigureFn,
  ) => Promise<any>;
}
