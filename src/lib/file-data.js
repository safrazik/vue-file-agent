import {getIconFromExt} from './icons';
import utils from './utils';

class FileData {

  constructor(data, options = {}){
    this.populate(data, options);
    this.validate();
  }

  populate(data, options = {}){
    this.raw = data;
    this.file = data.file instanceof File ? data.file : this.createDummyFile(data);
    this.url = null;
    this.urlResized = null;
    this.lastKnownSrc = null;
    this._progress = !isNaN(data.progress) ? data.progress : false;
    this.width = FileData.defaultWidth;
    this.height = FileData.defaultHeight;
    this.thumbnailSize = options.thumbnailSize || 360;
    this.read = !!options.read;
    this.image = {};
    this.dimensions = data.dimensions || {};
    this.dimensions.width = this.dimensions.width || 0;
    this.dimensions.height = this.dimensions.height || 0;
    this.error = data.error;
    this.options = options;
    this.maxSize = options.maxSize;
    this.accept = options.accept;
    this.isPlayingAv = false;
    this.id = Math.random() + ':' + (new Date()).getTime();
    this.videoThumbnail = data.videoThumbnail;
    this.imageColor = data.imageColor;
    this.customName = data.customName;
    this.oldFileName = null;
    this.upload = null;
  }

  createDummyFile(data){
    var file = {};
    file.lastModified = data.lastModified;
    var d = new Date();
    if(file.lastModified){
      d.setTime(file.lastModified);
    }
    file.lastModifiedDate = d;
    file.name = typeof data.name == 'function' ? data.name() : data.name;
    file.size = data.size;
    file.type = data.type;
    return file;
  }

  hasProgress(){
    return !isNaN(this._progress);// && this._progress <= 100;
  }

  progress(value){
    if(value !== undefined){
      this._progress = value;
      return;
    }
    return this._progress || 0;
  }

  src(){
    if(this.isImage()){
      return this.urlResized || this.url || this.file.url;
    }
    if(this.isPlayableVideo()){
      return this.videoThumbnail || '';
    }
    return '';
  }

  size(){
    if(!this.file){
      return '';
    }
    return utils.getSizeFormatted(this.file.size);
  }

  ext(){
    if(this.file && this.file.name.indexOf('.') !== -1){
      return this.file.name.split('.').pop();
    }
    return '?';
    // return this.file.type.split('/').shift();
  }

  name(withoutExt){
    var ext = this.ext();
    if(this.customName){
      return this.customName + (withoutExt ? '' : (ext != '?' ? '.' + ext : ''));
    }
    var name = this.file && this.file.name;
    if(withoutExt){
      if(ext != '?'){
        return name.substr(0, name.length - (ext.length + 1));
      }
    }
    return name;
  }

  isDarkColor(){
    if(this.imageColor){
      var rgb = this.imageColor;
      var darkPoint = 20;
      return rgb[0] <= darkPoint && rgb[1] <= darkPoint && rgb[2] <= darkPoint;
    }
    return false;
  }

  color(){
    if(this.imageColor){
      var rgb = this.imageColor;
      return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
    }
    if(this.isImage()){
      return 'transparent';
    }
    var ext = this.ext();
    var svgIcon = this.icon();
    // var svgIcon = getIconFromExt(ext);
    if(svgIcon.color){
      return svgIcon.color;
    }
    return utils.getColorForText(ext);
  }

  isImage(){
    return this.file && this.file.type.indexOf('image') != -1;
  }

  isVideo(){
    return this.file && this.file.type.indexOf('video') != -1;
  }

  isPlayableVideo(){
    return this.icon().category == 'video-playable';
  }

  isAudio(){
    return this.file && this.file.type.indexOf('audio') != -1;
  }

  isPlayableAudio(){
    return this.icon().category == 'audio-playable';
  }

  isText(){
    return this.file && this.file.type.indexOf('text') != -1;
  }

  setUrl(url){
    this.url = url;
    return new Promise((resolve, reject)=> {
      if(this.isImage()){
        this.resizeImage().then(()=> { 
          resolve(this);
        }, reject);
        return;
      }
      resolve(this);
    });
  }

  imageResized(resized){
    this.urlResized = resized.url;
    this.image = resized.image;
    if(resized.image && resized.image.width && resized.image.height){
      this.dimensions.width = resized.image.width;
      this.dimensions.height = resized.image.height;
    }
    this.lastKnownSrc = this.urlResized;
    this.imageColor = resized.color;
  }

  resizeImage(){
    return new Promise((resolve, reject)=> {
      utils.resizeImage(this.thumbnailSize, this.file, this.url, this).then((resized)=> {
        this.imageResized(resized);
        resolve(this);
      }).catch(reject);
    });
  }

  icon(){
    var ext = this.ext();
    var svgIcon = getIconFromExt(ext);
    return svgIcon;
  }

  getErrorMessage(errorText){
    var error = this.error;
    if(!error){
      return '';
    }
    errorText = errorText || {};
    errorText = {
      common: errorText.common || 'Invalid file.',
      type: errorText.type || 'Invalid file type.',
      size: errorText.size || ('Files should not exceed ' + this.maxSize + ' in size'),
    };
    if(error.type){
      return errorText.type;
    }
    else if(error.size){
      return errorText.size;
    }
    else if(error.upload){
      return (this.upload && this.upload.error) ? this.upload.error : error.upload;
    }
    return errorText.common;
  }

  toRaw(){
    var raw = this.raw || {};
    raw.url = this.url;
    raw.urlResized = this.urlResized;
    raw.src = this.src.bind(this);
    raw.name = this.name.bind(this);
    raw.lastModified = this.file.lastModified;
    raw.sizeText = this.size();
    raw.size = this.file.size;
    raw.type = this.file.type;
    raw.ext = this.ext();
    raw.color = this.color();
    raw.file = this.file;
    raw.progress = this.progress.bind(this); // pass it as a function
    raw.error = this.error;
    raw.dimensions = this.dimensions;
    return raw;
  }

  validate(){
    var validType = utils.validateType(this.file, this.accept);
    var validSize = utils.validateSize(this.file, this.maxSize);
    if(!validType || !validSize){
      this.error = {
        type: !validType,
        size: !validSize,
      };
    }
    else {
      this.error = false;
    }
  }

  static getFromRaw(fileDataRaw, options, isSync = false){
      var fileData = new FileData(fileDataRaw, options);
      var promise = fileData.setUrl(fileDataRaw.url);
      fileDataRaw.progress = fileData.progress.bind(fileData); // convert it as a function
      fileDataRaw.src = fileData.src.bind(fileData);
      fileDataRaw.name = fileData.name.bind(fileData); // convert it as a function
      if(isSync){
        return fileData;
      }
      return promise;
  }

  static fromRaw(fileDataRaw, options){
    return FileData.getFromRaw(fileDataRaw, options, false);
  }

  static fromRawSync(fileDataRaw, options){
    return FileData.getFromRaw(fileDataRaw, options, true);
  }

  static fromRawArray(filesDataRaw, options){
    var promises = [];
    filesDataRaw.forEach((fileDataRaw)=> {
      promises.push(FileData.fromRaw(fileDataRaw, options));
    });
    return Promise.all(promises);
  }

  static toRawArray(filesData){
    var filesDataRaw = [];
    filesData.forEach((fileData)=> {
      filesDataRaw.push(fileData.toRaw());
    });
    return filesDataRaw;
  }

  static readFile(fileData){
    return new Promise((resolve, reject)=> {
      if(!fileData.read){
        fileData.setUrl(null);
        resolve(fileData);
        return;
      }
      utils.getDataURL(fileData.file).then((dataUrl)=> {
        fileData.setUrl(dataUrl).then(()=> {
          resolve(fileData);
        }, reject);
      }, reject);
    });
  }

  static readFiles(filesData){
    var promises = [];
    filesData.forEach((fileData)=> {
      promises.push(FileData.readFile(fileData));
    });
    return Promise.all(promises);
  }

}

export default FileData;