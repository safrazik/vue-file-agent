class Utils {

  getAverageColor(arr){
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

  createVideoThumbnail(video, canvas, resizeLimit){
    return new Promise((resolve, reject)=> {
      var ctx = canvas.getContext('2d');
      var loadedmetadata = false;
      var loadeddata = false;
      var tryGetThumbnail = ()=> {
        if(!(loadedmetadata && loadeddata)){
          return;
        }
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var url = canvas.toDataURL();
        resolve({
          url: url,
          color: this.getAverageColor(imageData.data),
          width: video.videoWidth,
          height: video.videoHeight,
        });
      }
      // Load metadata of the video to get video duration and dimensions
      video.addEventListener('loadedmetadata', ()=> {
        // var video_duration = video.duration;
        canvas.width = resizeLimit;
        canvas.height = (canvas.width/video.videoWidth) * video.videoHeight;
        video.currentTime = 1; // video time
        loadedmetadata = true;
        tryGetThumbnail();
      });

      video.addEventListener('loadeddata', ()=> {
        loadeddata = true;
        tryGetThumbnail();
      });
    });
  }

  getDataURL(file){
    return new Promise((resolve, reject)=> {
      var reader = new FileReader();
      reader.onload = (readerEvent)=> {
        resolve(readerEvent.target['result']);
      };
      reader.readAsDataURL(file);
    });
  }

  getImageResized(image, widthLimit, heightLimit){
    var width = image.width;
    var height = image.height;
    var resizeLimit = widthLimit;
    if(widthLimit && heightLimit){
      width = widthLimit;
      height = heightLimit;
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

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    var avgColor = null;
    try {
        var imageData = context.getImageData(0, 0, width, height);
        var rgb = this.getAverageColor(imageData.data);
        if(rgb){
          avgColor = rgb;
        }
    } catch(e) {
        /* security error, img on diff domain */
    }
    return {
      image: image,
      url: canvas.toDataURL('image/png'),
      color: avgColor
    };
  }

  resizeImageUrl(image, url, resizeLimit){
    return new Promise((resolve, reject)=> {
      image.onload = ()=>{
        var resized = this.getImageResized(image, resizeLimit);
        resolve(resized);
      };
      image.src = url;
    });
  }

  resizeImageFile(image, file, resizeLimit){
    return new Promise((resolve, reject)=> {
      if (file.type.indexOf('image') == -1) {
        reject(new Error("Not an image"));
        return;
      }
      var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;
      var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;
      var shouldRevoke = false;
      image.onload = ()=>{
        if(shouldRevoke){
          revokeObjectURL(image.src);
        }
        var resized = this.getImageResized(image, resizeLimit);
        resolve(resized);
        return;
      };
      if (!(file instanceof File)) {
        return reject('Invalid file object. Use url or a valid instance of File class');
      }
      if(createObjectURL && revokeObjectURL){
        shouldRevoke = true;
        image.src = createObjectURL(file);
        return;
      }
      this.getDataURL(file).then((dataUrl)=> {
        image.src = dataUrl;
      });
    });
  }

  resizeImage(resizeLimit, file, url){
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    return url ? this.resizeImageUrl(image, url, resizeLimit)
      : this.resizeImageFile(image, file, resizeLimit);
  }

  getSizeFormatted(bytes) {
     var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
     if (bytes == 0) return '0 B';
     var i = Math.floor(Math.log(bytes) / Math.log(1024));
     i = parseInt('' + i);
     return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  getSizeParsed(size){
    size = ('' + size).toUpperCase();
    var matches = size.match(/([\d|.]+?)\s*?([A-Z]+)/);
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    var i = sizes.indexOf(matches[2]);
    if(i == -1){
      return size;
    }
    return parseFloat(matches[1]) * Math.pow(1024, i);
  }

  getColorForText(value){
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
    return intToHSL(getHashCode(value.toLowerCase()));
  }

  validateType(file, acceptedFiles){
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
    // https://gitlab.com/meno/dropzone/blob/master/src/dropzone.js#L2511
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

  validateSize(file, maxSize){
    if(!maxSize){
      return true;
    }
    var bytes = this.getSizeParsed(maxSize);
    return file.size <= bytes;
  }

}

export default new Utils();