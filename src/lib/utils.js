import { getFilesFromDroppedItems } from './drop-handler';

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

  createVideoThumbnail(video, canvas, thumbnailSize){
    video.setAttribute('crossOrigin', 'anonymous'); // fix cross origin issue
    return new Promise((resolve, reject)=> {
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
        canvas.width = thumbnailSize;
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

  getImageOrientationFromArrayBuffer(buffer){
    // -2: not jpeg
    // -1: not defined
    var view = new DataView(buffer);
    if (view.getUint16(0, false) != 0xFFD8)
    {
        return -2;
    }
    var length = view.byteLength, offset = 2;
    while (offset < length) 
    {
      if (view.getUint16(offset+2, false) <= 8){
        return -1;
      }
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) 
      {
          if (view.getUint32(offset += 2, false) != 0x45786966) 
          {
              return -1;
          }

          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
          {
              if (view.getUint16(offset + (i * 12), little) == 0x0112)
              {
                  return view.getUint16(offset + (i * 12) + 8, little);
              }
          }
      }
      else if ((marker & 0xFF00) != 0xFF00)
      {
          break;
      }
      else
      { 
          offset += view.getUint16(offset, false);
      }
    }
    return -1;
  }

  getImageOrientation(file) {
    return new Promise((resolve, reject)=> {
      var reader = new FileReader();
      if (!reader.readAsArrayBuffer) {
        return resolve(-3);
      }
      reader.onload = (e)=> {
        resolve(this.getImageOrientationFromArrayBuffer(e.target.result));
      };
      // reader.readAsArrayBuffer(file);
      // Exif should appear in the first 64 KB, however this is not guaranteed—it may be possible for the Exif to extend beyond (stackoverflow.com/questions/3248946/…). Therefore we have to read the whole file for safety. Alternatively, instead of reading the file as an ArrayBuffer, we could use streams (where supported) so we lazily read the file until the Exif has been found: mobile.twitter.com/jaffathecake/status/1085443592678752256. If anyone has success with this approach, please share! – Oliver Joseph Ash
      reader.readAsArrayBuffer(file.slice(0, 65536));
    });
  }

  rotateCanvas(srcOrientation, canvas, ctx, width, height){
    // set proper canvas dimensions before transform & export
    if (4 < srcOrientation && srcOrientation < 9) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    // transform context before drawing image
    switch (srcOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height, width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
    }

  }

  getImageResized(image, widthLimit, heightLimit, orientation){
    var width = image.width;
    var height = image.height;
    var thumbnailSize = widthLimit;
    if(widthLimit && heightLimit){
      width = widthLimit;
      height = heightLimit;
    }
    else {
      if (width > height) {
          if (width > thumbnailSize) {
              height *= thumbnailSize / width;
              width = thumbnailSize;
          }
      } else {
          if (height > thumbnailSize) {
              width *= thumbnailSize / height;
              height = thumbnailSize;
          }
      }
    }

    width = Math.floor(width);
    height = Math.floor(height);

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    this.rotateCanvas(orientation, canvas, context, width, height);

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

  resizeImageUrl(image, url, thumbnailSize){
    return new Promise((resolve, reject)=> {
      image.onload = ()=>{
        var resized = this.getImageResized(image, thumbnailSize);
        resolve(resized);
      };
      image.src = url;
    });
  }

  resizeImageFile(image, file, thumbnailSize){
    return new Promise((resolve, reject)=> {
      if (file.type.indexOf('image') == -1) {
        reject(new Error("Not an image"));
        return;
      }
      var createObjectURL = (window.URL || window['webkitURL'] || {}).createObjectURL;
      var revokeObjectURL = (window.URL || window['webkitURL'] || {}).revokeObjectURL;
      var shouldRevoke = false;
      var orientationPromise = this.getImageOrientation(file);
      image.onload = ()=> {
        orientationPromise.then((orientation)=> {
          var resized = this.getImageResized(image, thumbnailSize, null, orientation);
          if(shouldRevoke){
            revokeObjectURL(image.src);
          }
          resolve(resized);
        });
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

  resizeImage(thumbnailSize, file, url){
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    return url ? this.resizeImageUrl(image, url, thumbnailSize)
      : this.resizeImageFile(image, file, thumbnailSize);
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

  getFilesFromDroppedItems(dataTransfer){
    return getFilesFromDroppedItems(dataTransfer);
  }

}

export default new Utils();