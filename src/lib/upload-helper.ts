import ajax from './ajax-request';
import { ConfigureFn, AjaxResponse, AjaxError } from './ajax-request';
import FileRecord from './file-record';

type ProgressFn = (event: ProgressEvent) => void;
type CreateFormDataFn = (fileRecord: FileRecord) => FormData;

class UploadHelper {
  // useAxios(axios){
  //   this.axios = axios;
  // }

  public addHeaders(xhr: XMLHttpRequest, headers: object): XMLHttpRequest {
    xhr.setRequestHeader('Accept', 'application/json');
    if (headers) {
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, (headers as any)[key]);
        }
      }
    }
    return xhr;
  }

  public doUpload(
    url: string,
    headers: object,
    formData: FormData,
    progressCallback: ProgressFn,
    configureFn?: ConfigureFn,
  ): Promise<AjaxResponse> {
    return ajax.post(url, formData, (xhr) => {
      this.addHeaders(xhr, headers);
      xhr.upload.addEventListener('progress', progressCallback, false);
      if (typeof configureFn === 'function') {
        configureFn(xhr);
      }
    });
  }

  public doDeleteUpload(
    url: string,
    headers: object,
    uploadData: any,
    configureFn?: ConfigureFn,
  ): Promise<AjaxResponse> {
    if (typeof uploadData !== 'string') {
      uploadData = JSON.stringify(uploadData);
    }
    return ajax.delete(url, uploadData, (xhr) => {
      xhr.setRequestHeader('Content-Type', 'application/json');
      this.addHeaders(xhr, headers);
      if (typeof configureFn === 'function') {
        configureFn(xhr);
      }
    });
  }

  public doUpdateUpload(
    url: string,
    headers: object,
    uploadData: any,
    configureFn?: ConfigureFn,
  ): Promise<AjaxResponse> {
    if (typeof uploadData !== 'string') {
      uploadData = JSON.stringify(uploadData);
    }
    return ajax.put(url, uploadData, (xhr) => {
      xhr.setRequestHeader('Content-Type', 'application/json');
      this.addHeaders(xhr, headers);
      if (typeof configureFn === 'function') {
        configureFn(xhr);
      }
    });
  }

  // doUploadAxios(axios, formData, progressCallback){
  //   return axios.post('/upload', formData, {
  //     onUploadProgress: progressCallback,
  //   });
  // }

  // doDeleteUploadAxios(axios, data, configureFn){
  //   return axios.delete('/upload', data, {
  //   });
  // }

  public prepareUploadError(fileRecord: FileRecord, err: AjaxError, timeout?: number) {
    let errorText = err.message;
    if (err.response && err.response.data) {
      try {
        const errorMsg = err.response.data.error || JSON.parse(err.response.data).error;
        errorText = errorMsg;
      } catch (e) {
        // ignore
      }
    }
    if (!fileRecord.error) {
      fileRecord.error = {};
    }
    fileRecord.error.upload = errorText;
    fileRecord.upload.data = undefined;
    fileRecord.upload.error = errorText;
    if (timeout) {
      setTimeout(() => {
        if (!fileRecord.error) {
          fileRecord.error = {};
        }
        fileRecord.error.upload = false;
        if (!fileRecord.error.size && !fileRecord.error.type) {
          fileRecord.error = false;
        }
      }, timeout);
    }
  }

  public upload(
    url: string,
    headers: object,
    fileRecords: FileRecord[],
    createFormData?: CreateFormDataFn,
    progressFn?: (progress: number) => void,
    configureFn?: ConfigureFn,
  ) {
    let updateOverallProgress = () => {
      /* no op */
    };
    if (progressFn) {
      updateOverallProgress = () => {
        let prgTotal = 0;
        for (const fileRecord of fileRecords) {
          prgTotal += fileRecord.progress() as number;
        }
        progressFn(prgTotal / fileRecords.length);
      };
    }
    const promises: Array<Promise<AjaxResponse | AjaxError>> = [];
    let failedUploadsCount = 0;
    for (const fileRecord of fileRecords) {
      let formData;
      if (typeof createFormData === 'function') {
        formData = createFormData(fileRecord);
      } else {
        formData = new FormData();
        formData.append('file', fileRecord.file as File);
        formData.append('filename', fileRecord.name());
      }
      // ((fileRecord) => {
      const promise = this.doUpload(
        url,
        headers,
        formData,
        (progressEvent) => {
          const percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
          // do not complete until promise resolved
          fileRecord.progress(percentCompleted >= 100 ? 99.9999 : percentCompleted);
          updateOverallProgress();
        },
        (xhr) => {
          fileRecord.xhr = xhr;
          if (typeof configureFn === 'function') {
            configureFn(xhr);
          }
        },
      );
      promises.push(
        new Promise((resolve, reject) => {
          promise.then(
            (response) => {
              delete fileRecord.xhr;
              fileRecord.upload.data = response.data;
              fileRecord.upload.error = false;
              fileRecord.progress(100);
              if (fileRecord.xhrQueue) {
                fileRecord.xhrQueue();
                delete fileRecord.xhrQueue;
              }
              resolve(response);
            } /* */,
            (err) => {
              this.prepareUploadError(fileRecord, err);
              resolve(err);
              failedUploadsCount++;
            } /* */,
          );
        }),
      );
      // promises.push(promise);
      // })(fileRecord);
    }
    // return Promise.all(promises);
    return new Promise((resolve, reject) => {
      Promise.all(promises).then((responses) => {
        if (failedUploadsCount === promises.length) {
          // all uploads failed
          reject(responses);
          return;
        }
        resolve(responses);
      }, reject);
    });
  }

  public deleteUpload(
    url: string,
    headers: object,
    fileRecord: FileRecord,
    uploadData?: any,
    configureFn?: ConfigureFn,
  ) {
    return new Promise((resolve, reject) => {
      if (fileRecord.xhr) {
        fileRecord.xhr.abort();
      }
      if (uploadData === undefined) {
        uploadData = fileRecord.upload.data;
      }
      if (uploadData) {
        this.doDeleteUpload(url, headers, uploadData, (xhr) => {
          if (typeof configureFn === 'function') {
            configureFn(xhr);
          }
        }).then(
          (result) => {
            resolve(result);
          },
          (err) => {
            this.prepareUploadError(fileRecord, err);
            reject(err);
          },
        );
      }
    });
  }

  public updateUpload(
    url: string,
    headers: object,
    fileRecord: FileRecord,
    uploadData: any,
    configureFn?: ConfigureFn,
  ) {
    return new Promise((resolve, reject) => {
      if (fileRecord.xhr) {
        // probably updated while being uploaded.
        fileRecord.xhrQueue = () => {
          this.updateUpload(url, headers, fileRecord, uploadData);
        };
        return resolve();
      }
      if (uploadData === undefined) {
        uploadData = fileRecord.upload.data || {};
        uploadData.old_filename = fileRecord.oldFileName;
        uploadData.filename = fileRecord.name();
      }
      if (uploadData) {
        this.doUpdateUpload(url, headers, uploadData, (xhr) => {
          if (typeof configureFn === 'function') {
            configureFn(xhr);
          }
        }).then(
          (response) => {
            fileRecord.upload.data = response.data;
            fileRecord.upload.error = false;
            resolve(response);
          },
          (err) => {
            this.prepareUploadError(fileRecord, err);
            reject(err);
          },
        );
      }
    });
  }

  public doTusUpload(tus: any, url: string, fileRecord: FileRecord, headers: object, progressCallback: ProgressFn) {
    return new Promise((resolve, reject) => {
      if (!tus) {
        return reject(new Error('tus required. Please install tus-js-client'));
      }
      // https://github.com/tus/tus-js-client
      // Create a new tus upload
      const file = fileRecord.file;
      const upload = new tus.Upload(file, {
        endpoint: url,
        headers,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onError(error: any) {
          reject(error);
          // console.log("Failed because: " + error)
        },
        onProgress(bytesUploaded: number, bytesTotal: number) {
          const event = { loaded: bytesUploaded, total: bytesTotal } as ProgressEvent;
          progressCallback(event);
        },
        onSuccess() {
          resolve(upload);
        },
      });
      fileRecord.tusUpload = upload;
      // Start the upload
      upload.start();
    });
  }

  public tusUpload(
    tus: any,
    url: string,
    headers: object,
    fileRecords: FileRecord[],
    progressFn?: (progress: number) => void,
  ) {
    let updateOverallProgress = () => {
      /* no op */
    };
    if (progressFn) {
      updateOverallProgress = () => {
        let prgTotal = 0;
        for (const fileRecord of fileRecords) {
          prgTotal += fileRecord.progress() as number;
        }
        progressFn(prgTotal / fileRecords.length);
      };
    }
    const promises = [];
    for (const fileRecord of fileRecords) {
      const promise = this.doTusUpload(tus, url, fileRecord, headers, (progressEvent: ProgressEvent) => {
        const percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
        // do not complete until promise resolved
        fileRecord.progress(percentCompleted >= 100 ? 99.9999 : percentCompleted);
        updateOverallProgress();
      });
      promise.then(
        (response) => {
          // delete fileRecord.tusUpload;
          fileRecord.progress(100);
        },
        (err) => {
          this.prepareUploadError(fileRecord, err);
        },
      );
      promises.push(promise);
    }
    return Promise.all(promises);
  }

  public tusDeleteUpload(tus: any, url: string, headers: object, fileRecord: FileRecord) {
    return new Promise((resolve, reject) => {
      if (!tus) {
        return reject('tus required');
      }
      if (!fileRecord.tusUpload) {
        return resolve();
      }
      // const shouldTerminate = true;
      const abort = (shouldTerminate: boolean) => {
        return new Promise((res, rej) => {
          fileRecord.tusUpload.abort(shouldTerminate, (err: any) => {
            if (err) {
              this.prepareUploadError(fileRecord, err);
              rej(err);
              return;
            }
            res();
          });
        });
      };
      abort(false).then(() => {
        setTimeout(() => {
          abort(true).then(resolve, reject);
        }, 1000);
      });
    });
  }
}

export default new UploadHelper();
