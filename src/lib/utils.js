export default {

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
  },

  createVideoThumbnail(video, canvas, maxWidth){
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
        canvas.width = maxWidth;
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
  },

}