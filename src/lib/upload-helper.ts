import ajax from './ajax-request';
import { ConfigureFn, AjaxResponse, AjaxError } from './ajax-request';
import FileData from './file-data';

type ProgressFn = (event: ProgressEvent) => void;
type CreateFormDataFn = (fileData: FileData) => FormData;

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

  public prepareUploadError(fileData: FileData, err: AjaxError, timeout?: number) {
    let errorText = err.message;
    if (err.response && err.response.data) {
      try {
        const errorMsg = err.response.data.error || JSON.parse(err.response.data).error;
        errorText = errorMsg;
      } catch (e) {
        // ignore
      }
    }
    if (!fileData.error) {
      fileData.error = {};
    }
    fileData.error.upload = errorText;
    fileData.upload.data = undefined;
    fileData.upload.error = errorText;
    if (timeout) {
      setTimeout(() => {
        if (!fileData.error) {
          fileData.error = {};
        }
        fileData.error.upload = false;
        if (!fileData.error.size && !fileData.error.type) {
          fileData.error = false;
        }
      }, timeout);
    }
  }

  public upload(
    url: string,
    headers: object,
    filesData: FileData[],
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
        for (const fileData of filesData) {
          prgTotal += fileData.progress() as number;
        }
        progressFn(prgTotal / filesData.length);
      };
    }
    const promises = [];
    for (const fileData of filesData) {
      let formData;
      if (typeof createFormData === 'function') {
        formData = createFormData(fileData);
      } else {
        formData = new FormData();
        formData.append('file', fileData.file as File);
        formData.append('filename', fileData.name());
      }
      // ((fileData) => {
      const promise = this.doUpload(
        url,
        headers,
        formData,
        (progressEvent) => {
          const percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
          // do not complete until promise resolved
          fileData.progress(percentCompleted >= 100 ? 99.9999 : percentCompleted);
          updateOverallProgress();
        },
        (xhr) => {
          fileData.xhr = xhr;
          if (typeof configureFn === 'function') {
            configureFn(xhr);
          }
        },
      );
      promises.push(
        new Promise((resolve, reject) => {
          promise.then(
            (response) => {
              delete fileData.xhr;
              fileData.upload.data = response.data;
              fileData.upload.error = false;
              fileData.progress(100);
              if (fileData.xhrQueue) {
                fileData.xhrQueue();
                delete fileData.xhrQueue;
              }
              resolve(response.data);
            } /* */,
            (err) => {
              this.prepareUploadError(fileData, err);
            } /* */,
          );
        }),
      );
      // promises.push(promise);
      // })(fileData);
    }
    return Promise.all(promises);
  }

  public deleteUpload(url: string, headers: object, fileData: FileData, uploadData?: any, configureFn?: ConfigureFn) {
    return new Promise((resolve, reject) => {
      if (fileData.xhr) {
        fileData.xhr.abort();
      }
      if (uploadData === undefined) {
        uploadData = fileData.upload.data;
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
            this.prepareUploadError(fileData, err);
            reject(err);
          },
        );
      }
    });
  }

  public updateUpload(url: string, headers: object, fileData: FileData, uploadData: any, configureFn?: ConfigureFn) {
    return new Promise((resolve, reject) => {
      if (fileData.xhr) {
        // probably updated while being uploaded.
        fileData.xhrQueue = () => {
          this.updateUpload(url, headers, fileData, uploadData);
        };
        return resolve();
      }
      if (uploadData === undefined) {
        uploadData = fileData.upload.data || {};
        uploadData.old_filename = fileData.oldFileName;
        uploadData.filename = fileData.name();
      }
      if (uploadData) {
        this.doUpdateUpload(url, headers, uploadData, (xhr) => {
          if (typeof configureFn === 'function') {
            configureFn(xhr);
          }
        }).then(
          (response) => {
            fileData.upload.data = response.data;
            fileData.upload.error = false;
            resolve(response);
          },
          (err) => {
            this.prepareUploadError(fileData, err);
            reject(err);
          },
        );
      }
    });
  }

  public doTusUpload(tus: any, url: string, fileData: FileData, headers: object, progressCallback: ProgressFn) {
    return new Promise((resolve, reject) => {
      if (!tus) {
        return reject(new Error('tus required. Please install tus-js-client'));
      }
      // https://github.com/tus/tus-js-client
      // Create a new tus upload
      const file = fileData.file;
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
      fileData.tusUpload = upload;
      // Start the upload
      upload.start();
    });
  }

  public tusUpload(
    tus: any,
    url: string,
    headers: object,
    filesData: FileData[],
    progressFn?: (progress: number) => void,
  ) {
    let updateOverallProgress = () => {
      /* no op */
    };
    if (progressFn) {
      updateOverallProgress = () => {
        let prgTotal = 0;
        for (const fileData of filesData) {
          prgTotal += fileData.progress() as number;
        }
        progressFn(prgTotal / filesData.length);
      };
    }
    const promises = [];
    for (const fileData of filesData) {
      const promise = this.doTusUpload(tus, url, fileData, headers, (progressEvent: ProgressEvent) => {
        const percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
        // do not complete until promise resolved
        fileData.progress(percentCompleted >= 100 ? 99.9999 : percentCompleted);
        updateOverallProgress();
      });
      promise.then(
        (response) => {
          // delete fileData.tusUpload;
          fileData.progress(100);
        },
        (err) => {
          this.prepareUploadError(fileData, err);
        },
      );
      promises.push(promise);
    }
    return Promise.all(promises);
  }

  public tusDeleteUpload(tus: any, url: string, headers: object, fileData: FileData) {
    return new Promise((resolve, reject) => {
      if (!tus) {
        return reject('tus required');
      }
      if (!fileData.tusUpload) {
        return resolve();
      }
      // const shouldTerminate = true;
      const abort = (shouldTerminate: boolean) => {
        return new Promise((res, rej) => {
          fileData.tusUpload.abort(shouldTerminate, (err: any) => {
            if (err) {
              this.prepareUploadError(fileData, err);
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
