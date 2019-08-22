import {getIconFromExt} from '../lib/icons';

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
  var bytesPerPixel = 4, arrLength = arr.length;
  if (arrLength < bytesPerPixel) {
      return false;
  }
  var step = 5;
  var len = arrLength - arrLength % bytesPerPixel,
            preparedStep = (step || 1) * bytesPerPixel;


    var
        redTotal = 0,
        greenTotal = 0,
        blueTotal = 0,
        alphaTotal = 0,
        count = 0;

    var simple = false;
    simple = true;

    if(simple){
      for (var i = 0; i < len; i += preparedStep) {
          var
              alpha = arr[i + 3],
              red = arr[i] * alpha,
              green = arr[i + 1] * alpha,
              blue = arr[i + 2] * alpha;

          redTotal += red;
          greenTotal += green;
          blueTotal += blue;
          alphaTotal += alpha;
          count++;
      }

      return alphaTotal ? [
          Math.round(redTotal / alphaTotal),
          Math.round(greenTotal / alphaTotal),
          Math.round(blueTotal / alphaTotal),
          Math.round(alphaTotal / count)
      ] : [0, 0, 0, 0];
    }

    for (var i = 0; i < len; i += preparedStep) {
        var
            red = arr[i],
            green = arr[i + 1],
            blue = arr[i + 2],
            alpha = arr[i + 3];

        redTotal += red * red * alpha;
        greenTotal += green * green * alpha;
        blueTotal += blue * blue * alpha;
        alphaTotal += alpha;
        count++;
    }

    return alphaTotal ? [
        Math.round(Math.sqrt(redTotal / alphaTotal)),
        Math.round(Math.sqrt(greenTotal / alphaTotal)),
        Math.round(Math.sqrt(blueTotal / alphaTotal)),
        Math.round(alphaTotal / count)
    ] : [0, 0, 0, 0];
}

function getAverageRGB(pixels, pixelCount) {
  // https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
  // http://jsfiddle.net/xLF38/818/    
    var blockSize = 5, // only visit every x pirxels. e.g: every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    // height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    // width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    // context.drawImage(imgEl, 0, 0);
    
    // try {
    //     imageData = context.getImageData(0, 0, width, height);
    // } catch(e) {
    //     /* security error, img on diff domain */alert('x');
    //     return defaultRGB;
    // }
    
    length = pixels.length;

    // var pixelCount = pixels.length;
    var quality = 100;

    console.log('pixels: ', pixelCount);

    for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];

        // If pixel is mostly opaque and not white
        if (typeof a === 'undefined' || a >= 125) {
            if (!(r > 250 && g > 250 && b > 250)) {
                // pixelArray.push([r, g, b]);
              rgb.r += r;
              rgb.g += g;
              rgb.b += b;
              ++count;
            }
        }
    }
    
    // while ( (i += blockSize * 4) < length ) {
    //     ++count;
    //     var r = pixels[i+0];
    //     var g = pixels[i+1];
    //     var b = pixels[i+2];

    //     var a = pixels[i + 3];

    //     // If pixel is mostly opaque and not white
    //     if (false || a >= 125) {
    //         if (true){//!(r > 250 && g > 250 && b > 250)) {
    //           rgb.r += r;
    //           rgb.g += g;
    //           rgb.b += b;

    //         }
    //         else {
    //           console.log('wt?', r, g, b, a);
    //         }
    //     }
    // }
    
    // ~~ can be used instead of Math.floor
    rgb.r = Math.floor(rgb.r/count);
    rgb.g = Math.floor(rgb.g/count);
    rgb.b = Math.floor(rgb.b/count);
    
    return rgb;
    
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
      console.log('gonna getAverageColor', width, height, width*height);
        var imageData = context.getImageData(0, 0, width, height);
        var rgb = getAverageColor(imageData.data);
        if(rgb){
          avgColor = rgb;
        }
        console.log('getAverageColor', rgb, 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + rgb[3] + ')');

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
  		// console.log('Yeah URL!!!!!!!');
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
				console.log('resizing');
				return;
			}
			resolve(self);
		});
	}
	self.imageResized = function(resized){
		self.urlResized = resized.url;
		self.image = resized.image;
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