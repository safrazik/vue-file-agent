import ajax from './ajax-request';

class UploadHelper {

  useAxios(axios){
    this.axios = axios;
  }

  addHeaders(xhr, headers){
    xhr.setRequestHeader('Accept', 'application/json');
    if(headers){
      for(var key in headers){
        xhr.setRequestHeader(key, headers[key]);
      }
    }
    return xhr;
  }

  doUpload(url, headers, formData, progressCallback, configureFn){
    return ajax.post(url, formData, (xhr)=> {
      this.addHeaders(xhr, headers);
      xhr.upload.addEventListener('progress', progressCallback, false);
      configureFn(xhr);
    });

  }

  doDeleteUpload(url, headers, data, configureFn){
    if (typeof data != 'string') {
      data = JSON.stringify(data);
    }
    return ajax.delete(url, data, (xhr)=> {
      xhr.setRequestHeader('Content-Type', 'application/json');
      this.addHeaders(xhr, headers);
      configureFn(xhr);
    });
  }

  doUpdateUpload(url, headers, data, configureFn){
    if (typeof data != 'string') {
      data = JSON.stringify(data);
    }
    return ajax.put(url, data, (xhr)=> {
      xhr.setRequestHeader('Content-Type', 'application/json');
      this.addHeaders(xhr, headers);
      configureFn(xhr);
    });
  }

  doUploadAxios(axios, formData, progressCallback){
    return axios.post('/upload', formData, {
      onUploadProgress: progressCallback,
    });
  }

  doDeleteUploadAxios(axios, data, configureFn){
    return axios.delete('/upload', data, {
    });
  }

  prepareUploadError(fileData, err, timeout){
    var errorText = err.message;
    if(err.response && err.response.data){
      try {
        var errorMsg = err.response.data.error || JSON.parse(err.response.data).error;
        errorText = errorMsg;
      } catch(e){
        // ignore
      }
    }
    if(!fileData.error){
      fileData.error = {};
    }
    fileData.error.upload = errorText;
    if(timeout){
      setTimeout(()=> {
        fileData.error.upload = false;
        if(!fileData.error.size && !fileData.error.type){
          fileData.error = false;
        }
      }, timeout);
    }
  }

  upload(url, headers, filesData, createFormData, progressFn, configureFn){
    var self = this;
    progressFn = progressFn || function(){};
    var promises = [];
    function updateOverallProgress(){
      var prgTotal = 0;
      for(var i = 0; i < filesData.length; i++){
        prgTotal += filesData[i].progress();
      }
      progressFn(prgTotal/filesData.length);
    }
    for(let i = 0; i < filesData.length; i++){
      let fileData = filesData[i];
      var formData;
      if(typeof createFormData == 'function'){
        formData = createFormData(fileData);
      }
      else {
        formData = new FormData();
        formData.append('file', fileData.file);
        formData.append('filename', fileData.name());
      }
      (function(fileData){
        var promise = self.doUpload(url, headers, formData, function(progressEvent) {
            var percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
            fileData.progress(percentCompleted >= 100 ? 99.99 : percentCompleted); // do not complete until promise resolved
            updateOverallProgress();
        }, function(xhr){
          fileData.xhr = xhr;
          if(typeof configureFn == 'function'){
            configureFn(xhr);
          }
        });
        promise.then(function(response){
          delete fileData.xhr;
          fileData.upload = response.data;
          fileData.progress(100);
          if(fileData.xhrQueue){
            fileData.xhrQueue();
            delete fileData.xhrQueue;
          }
        } /* */ , function(err){
          self.prepareUploadError(fileData, err);
        } /* */);
        promises.push(promise);
      })(fileData);
    }
    return Promise.all(promises);
  }

  deleteUpload(url, headers, fileData, uploadData){
    return new Promise((resolve, reject)=> {
      if (fileData.xhr) {
        fileData.xhr.abort();
      }
      if(uploadData === undefined){
        uploadData = fileData.upload;
      }
      if (uploadData) {
        this.doDeleteUpload(url, headers, uploadData, (xhr)=> {
        }).then((result)=> {
          resolve(result);
        }, (err)=> {
          this.prepareUploadError(fileData, err);
          reject(err);
        });
      }
    });
  }

  updateUpload(url, headers, fileData, uploadData){
    return new Promise((resolve, reject)=> {
      if (fileData.xhr) {
        // probably updated while being uploaded.
        fileData.xhrQueue = ()=> {
          this.updateUpload(url, headers, fileData, uploadData);
        };
        return resolve();
      }
      if(uploadData === undefined){
        uploadData = fileData.upload || {};
        uploadData.old_filename = fileData.oldFileName;
        uploadData.filename = fileData.name();
      }
      if (uploadData) {
        this.doUpdateUpload(url, headers, uploadData, (xhr)=> {
        }).then((response)=> {
          fileData.upload = response.data;
          resolve(response);
        }, (err)=> {
          this.prepareUploadError(fileData, err);
          reject(err);
        });
      }
    });
  }

}

export default new UploadHelper();