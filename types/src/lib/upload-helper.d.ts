import { ConfigureFn, AjaxResponse, AjaxError } from './ajax-request';
import FileRecord from './file-record';
declare type ProgressFn = (event: ProgressEvent) => void;
declare type CreateFormDataFn = (fileRecord: FileRecord) => FormData;
declare class UploadHelper {
    addHeaders(xhr: XMLHttpRequest, headers: object): XMLHttpRequest;
    doUpload(url: string, headers: object, formData: FormData, progressCallback: ProgressFn, configureFn?: ConfigureFn): Promise<AjaxResponse>;
    doDeleteUpload(url: string, headers: object, uploadData: any, configureFn?: ConfigureFn): Promise<AjaxResponse>;
    doUpdateUpload(url: string, headers: object, uploadData: any, configureFn?: ConfigureFn): Promise<AjaxResponse>;
    prepareUploadError(fileRecord: FileRecord, err: AjaxError, timeout?: number): void;
    upload(url: string, headers: object, fileRecords: FileRecord[], createFormData?: CreateFormDataFn, progressFn?: (progress: number) => void, configureFn?: ConfigureFn): Promise<unknown>;
    deleteUpload(url: string, headers: object, fileRecord: FileRecord, uploadData?: any, configureFn?: ConfigureFn): Promise<unknown>;
    updateUpload(url: string, headers: object, fileRecord: FileRecord, uploadData: any, configureFn?: ConfigureFn): Promise<unknown>;
    doTusUpload(tus: any, url: string, fileRecord: FileRecord, headers: object, progressCallback: ProgressFn): Promise<unknown>;
    tusUpload(tus: any, url: string, headers: object, fileRecords: FileRecord[], progressFn?: (progress: number) => void): Promise<unknown[]>;
    tusDeleteUpload(tus: any, url: string, headers: object, fileRecord: FileRecord): Promise<unknown>;
}
declare const _default: UploadHelper;
export default _default;
