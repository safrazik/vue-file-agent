import {getIconFromExt} from './icons';
import utils from './utils';

var readFileContent = function(file){
	return new Promise(function(resolve, reject) {
		var reader = new FileReader();
		reader.onload = function(readerEvent) {
			resolve(readerEvent.target['result']);
		};
		reader.readAsDataURL(file);
	});
}


export function getAverageColor(arr) {
  return utils.getAverageColor(arr);
}

var resizeImage = function(settings, fileData) {
  var file = settings.file;
  var url = settings.url;
  var resizeLimit = settings.resizeLimit;
  var binary = settings.binary;
  var image;
  image = new Image();
  var avgColor = null;
  var canvas = document.createElement('canvas');
  // var dataURItoBlob = function(dataURI) {
  //   var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
  //       atob(dataURI.split(',')[1]) :
  //       decodeURI(dataURI.split(',')[1]);
  //   var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //   var max = bytes.length;
  //   var ia = new Uint8Array(max);
  //   for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
  //   return new Blob([ia], {type:mime});
  // };
  var resize = function() {
    var width = image.width;
    var height = image.height;

    if(settings.width && settings.height){
      width = settings.width;
      height = settings.height;
    }
    else {
      if (width > height) {
          if (width > resizeLimit) {
              height *= resizeLimit / width;
              width = resizeLimit;
          }
      } else {
          if (height > resizeLimit) {
              width *= resizeLimit / height;
              height = resizeLimit;
          }
      }
    }

    width = Math.floor(width);
    height = Math.floor(height);

    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    try {
        var imageData = context.getImageData(0, 0, width, height);
        var rgb = getAverageColor(imageData.data);
        if(rgb){
          avgColor = rgb;
        }
    } catch(e) {
        /* security error, img on diff domain */
    }
    var dataUrl = canvas.toDataURL('image/png');
    if(!binary){
      return dataUrl;
    }
    // return dataURItoBlob(dataUrl);
  };

  return new Promise(function(resolve, reject) {
    if (file.type.indexOf('image') == -1) {
  		reject(new Error("Not an image"));
  		return;
  	}
  	var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;
  	var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;
  	var shouldRevoke = false;
  	image.setAttribute('crossOrigin', 'anonymous'); // works for me
  	image.onload = function(){
  		if(shouldRevoke){
  			revokeObjectURL(image.src);
  		}
      var url = resize();
      resolve({image: image, url: url, color: avgColor});
  		return;
  	};
  	if(url){
  		image.src = url;
  		return;
  	}
    if (!(file instanceof File)) {
      return reject('Invalid file object. Use url or a valid instance of File class');
    }
  	if(createObjectURL && revokeObjectURL){
  		shouldRevoke = true;
  		image.src = createObjectURL(file);
  		return;
  	}
  	readFileContent(file).then(function(dataUrl){
  		image.src = dataUrl;
  	});
  });
};

var bytesToSize = function(bytes) {
   var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 B';
   var i = Math.floor(Math.log(bytes) / Math.log(1024));
   i = parseInt('' + i);
   return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

var sizeToBytes = function(size){
  size = ('' + size).toUpperCase();
  var matches = size.match(/([\d|.]+?)\s*?([A-Z]+)/);
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  var i = sizes.indexOf(matches[2]);
  if(i == -1){
    return size;
  }
  return parseFloat(matches[1]) * Math.pow(1024, i);
}

var getHashCode = function(value) {
    var hash = 0;
    if (value.length == 0) return hash;
    for (var i = 0; i < value.length; i++) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
var intToHSL = function(value) {
    var h = value % 360;
    // var s = 100;
    var s = value % 100;
    var l = 50;
    // var l = value % 100;
    // return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    return 'hsl(' + h + ',' + s + '%,' + l + '%, 0.75)';
};
var colorByHashCode = function(value) {
	// var val = value.split('');
	// return intToHSL(getHashCode(val.shift().toLowerCase() + val.shift().toUpperCase() + val.shift().toLowerCase() + val.join().toLowerCase()));
	// return intToHSL(getHashCode(value.toUpperCase()));
	// return intToHSL(getHashCode(value[0].toUpperCase() + value.substr(1).toLowerCase()));
	return intToHSL(getHashCode(value.toLowerCase()));
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
// https://gitlab.com/meno/dropzone/blob/master/src/dropzone.js#L2511
var validateType = function(file, acceptedFiles){
  if (!acceptedFiles) {
    return true;
  } // If there are no accepted mime types, it's OK
  acceptedFiles = acceptedFiles.split(",");

  let mimeType = file.type;
  let baseMimeType = mimeType.replace(/\/.*$/, "");

  for (let validType of acceptedFiles) {
    validType = validType.trim();
    if (validType.charAt(0) === ".") { // extension
      if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
        return true;
      }
    } else if (/\/\*$/.test(validType)) {
      // This is something like a image/* mime type
      if (baseMimeType === validType.replace(/\/.*$/, "")) {
        return true;
      }
    } else {
      if (mimeType === validType) {
        return true;
      }
    }
  }

  return false;
}

var validateSize = function(file, maxSize){
  if(!maxSize){
    return true;
  }
  var bytes = sizeToBytes(maxSize);
  return file.size <= bytes;
}

var FileData;
FileData = function(data, options = {}){
	var self = this;
	self.raw = data;
	self.file = data.file instanceof File ? data.file : data;
	self.url = null;
	self.urlResized = null;
	self.lastKnownSrc = null;
	self._progress = !isNaN(data.progress) ? data.progress : false;
	self.width = FileData.defaultWidth;
	self.height = FileData.defaultHeight;
	self.resizeLimit = FileData.defaultResizeLimit;
	self.read = !!options.read;
	self.image = {};
  self.dimensions = {width: 0, height: 0};
  self.error = data.error;
  self.options = options;
  self.maxSize = options.maxSize;
  self.accept = options.accept;
  self.isPlayingAv = false;
  self.id = Math.random() + ':' + (new Date()).getTime();
  self.videoThumbnail = data.videoThumbnail;
  self.imageColor = data.imageColor;
  self.upload = null;
	self.hasProgress = function(){
		return !isNaN(this._progress);// && this._progress <= 100;
	};
	self.progress = function(value){
		if(value !== undefined){
			self._progress = value;
			return;
		}
		return self._progress || 0;
	};
	self.src = function(){
		if(self.isImage()){
			return self.urlResized || self.url || self.file.url;
		}
    if(self.isPlayableVideo()){
      return self.videoThumbnail || '';
    }
		return '';
	};
	self.size = function(){
		if(!this.file){
			return '';
		}
		return bytesToSize(this.file.size);
	};
	self.ext = function(){
		if(self.file && self.file.name.indexOf('.') !== -1){
			return self.file.name.split('.').pop();
		}
		return '?';
		// return self.file.type.split('/').shift();
	}
	self.name = function(withoutExt){
		var name = this.file && this.file.name;
    if(withoutExt){
      var ext = self.ext();
      if(ext != '?'){
        return name.substr(0, name.length - (ext.length + 1));
      }
    }
    return name;
	}

  self.isDarkColor = function(){
    if(self.imageColor){
      var rgb = self.imageColor;
      var darkPoint = 20;
      return rgb[0] <= darkPoint && rgb[1] <= darkPoint && rgb[2] <= darkPoint;
    }
    return false;
  }
	self.color = function(){
    if(self.imageColor){
      var rgb = self.imageColor;
      return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
    }
    if(self.isImage()){
      return 'transparent';
    }
    var ext = self.ext();
    var svgIcon = self.icon();
    // var svgIcon = getIconFromExt(ext);
    if(svgIcon.color){
      return svgIcon.color;
    }
		// return colorByHashCode(self.file.type);
		return colorByHashCode(ext);
	}
	self.isImage = function(){
		return self.file && self.file.type.indexOf('image') != -1;
	}
  self.isVideo = function(){
    return self.file && self.file.type.indexOf('video') != -1;
  }
  self.isPlayableVideo = function(){
    return self.icon().category == 'video-playable';
  }
  self.isAudio = function(){
    return self.file && self.file.type.indexOf('audio') != -1;
  }
  self.isPlayableAudio = function(){
    return self.icon().category == 'audio-playable';
  }
	self.isText = function(){
		return self.file && self.file.type.indexOf('text') != -1;
	}
	self.setUrl = function(url){
		return new Promise(function(resolve, reject){
			self.url = url;
			if(self.isImage()){
				self.resizeImage().then(function(){ 
					resolve(self);
				}, reject);
				return;
			}
			resolve(self);
		});
	}
	self.imageResized = function(resized){
		self.urlResized = resized.url;
		self.image = resized.image;
    if(resized.image && resized.image.width && resized.image.height){
      self.dimensions.width = resized.image.width;
      self.dimensions.height = resized.image.height;
    }
		self.lastKnownSrc = self.urlResized;
    self.imageColor = resized.color;
	}
	self.resizeImage = function(){
		return new Promise(function(resolve, reject){
			resizeImage({
				file: self.file,
				resizeLimit: self.resizeLimit,
				// width: self.width,
				// height: self.height,
				binary: false,
				url: self.url,
			}, self).then(function(resized) {
				self.imageResized(resized);
				resolve(self);
			}).catch(reject);
		});
	}
  self.icon = function(){
    var ext = self.ext();
    var svgIcon = getIconFromExt(ext);
    return svgIcon;
    // var ext = self.ext().toLowerCase();
    // var cat = extensionsMap[ext];
    // return icons[cat] || icons.other;
  }
  self.getErrorMessage = function(errorText){
    var error = self.error;
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
      return (self.upload && self.upload.error) ? self.upload.error : error.upload;
    }
    return errorText.common;
  };
  self.validate = function(){
    var validType = validateType(self.file, self.accept);
    var validSize = validateSize(self.file, self.maxSize);
    if(!validType || !validSize){
      self.error = {
        type: !validType,
        size: !validSize,
      };
    }
    else {
      self.error = false;
    }
  };
  self.validate();
  // self.initVideo();
}

// FileData.defaultResizeLimit = 200;
FileData.defaultResizeLimit = 360;
FileData.defaultWidth = FileData.defaultResizeLimit;
// FileData.defaultHeight = FileData.defaultResizeLimit;
FileData.defaultHeight = FileData.defaultResizeLimit * (3/4); // 4:3 aspect ratio

FileData.all = function(filesDataRaw, options){
	var promises = [];
	(filesDataRaw).forEach(function(fileDataRaw){
		promises.push(FileData.fromRaw(fileDataRaw, options));
	});
	return Promise.all(promises);
}

FileData.fromRaw = function(fileDataRaw, options){
    var fileData = new FileData(fileDataRaw, options);
    var promise = fileData.setUrl(fileDataRaw.url);
    fileDataRaw.progress = fileData.progress; // convert it as a function
    return promise;
}

FileData.toRaw = function(filesData){
	var filesDataRaw = [];
	filesData.forEach(function(fileData){
		var fileDataRaw = fileData.raw || {};
		fileDataRaw.url = fileData.url;
    fileDataRaw.urlResized = fileData.urlResized;
		fileDataRaw.src = fileData.src;
		fileDataRaw.name = fileData.file.name;
		fileDataRaw.lastModified = fileData.file.lastModified;
		fileDataRaw.sizeText = fileData.size();
		fileDataRaw.size = fileData.file.size;
		fileDataRaw.type = fileData.file.type;
		fileDataRaw.ext = fileData.ext();
    fileDataRaw.color = fileData.color();
		fileDataRaw.file = fileData.file;
		fileDataRaw.progress = fileData.progress; // pass it as a function
    fileDataRaw.error = fileData.error;
    fileDataRaw.dimensions = fileData.dimensions;
		filesDataRaw.push(fileDataRaw);
	})
	return filesDataRaw;
}

FileData.readFile = function(fileData){
	return new Promise(function(resolve, reject) {
		if(!fileData.read){
			fileData.setUrl(null);
			resolve(fileData);
			return;
		}
		var reader = new FileReader();
		reader.onload = function(readerEvent) {
			fileData.setUrl(readerEvent.target['result']).then(function(){
				resolve(fileData);
			}, reject)
		};
		reader.readAsDataURL(fileData.file);
	});
}

FileData.readFiles = function(filesData){
	var promises = [];
	filesData.forEach(function(fileData){
		promises.push(FileData.readFile(fileData));
	});
	return Promise.all(promises);
}


export default FileData;