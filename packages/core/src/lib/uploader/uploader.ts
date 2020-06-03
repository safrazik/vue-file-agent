import FileRecord from '../file-record';
import { ConfigureFn } from './ajax-request';
import uploadHelper from './upload-helper';
import { CreateFormDataFn } from './upload-helper';
import { Props } from '../props';
import plugins from '../plugins';
import { Uploader as UploaderInterface } from '../uploader';

export class Uploader implements UploaderInterface {
  public upload(
    url: string,
    headers: object,
    props: Props,
    fileRecords: FileRecord[],
    createFormData?: CreateFormDataFn,
    progressFn?: (progress: number) => void,
    configureFn?: ConfigureFn,
  ) {
    if (props.resumable) {
      return uploadHelper.tusUpload(
        plugins.tus,
        url,
        headers,
        fileRecords,
        (overallProgress) => {
          // this.overallProgress = overallProgress;
        },
        props.resumable === true ? undefined : props.resumable,
      );
    }
    return uploadHelper.upload(url, headers, fileRecords, createFormData, progressFn, configureFn);
  }

  public deleteUpload(
    url: string,
    headers: object,
    props: Props,
    fileRecord: FileRecord,
    uploadData?: any,
    configureFn?: ConfigureFn,
  ) {
    if (props.resumable) {
      return uploadHelper.tusDeleteUpload(plugins.tus, url, headers, fileRecord);
    }
    return uploadHelper.deleteUpload(url, headers, fileRecord, uploadData, configureFn);
  }

  public updateUpload(
    url: string,
    headers: object,
    props: Props,
    fileRecord: FileRecord,
    uploadData: any,
    configureFn?: ConfigureFn,
  ) {
    return uploadHelper.updateUpload(url, headers, fileRecord, uploadData, configureFn);
  }
}

export default new Uploader();
