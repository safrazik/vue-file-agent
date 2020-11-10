import { getFilesFromDroppedItems } from './drop-handler';

export type RGBA = [number, number, number, number];
export interface VideoThumbnail {
  url: string;
  color?: RGBA;
  width: number;
  height: number;
}
export interface ImageThumbnail {
  image: HTMLImageElement;
  url: string;
  color?: RGBA;
}

enum ImageOrientation {
  NORMAL = 1,
  UPSIDE_DOWN = 6,
}

class Utils {
  public arrayMove(arr: any[], previousIndex: number, newIndex: number): any[] {
    // https://github.com/Jexordexan/vue-slicksort/blob/master/src/utils.js
    const array = arr.slice(0);
    if (newIndex >= array.length) {
      let k = newIndex - array.length;
      while (k-- + 1) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
    return array;
  }

  public getAverageColor(arr: Uint8ClampedArray): RGBA | undefined {
    const bytesPerPixel = 4;
    const arrLength = arr.length;
    if (arrLength < bytesPerPixel) {
      return;
    }
    const step = 5;
    const len = arrLength - (arrLength % bytesPerPixel);
    const preparedStep = (step || 1) * bytesPerPixel;

    let redTotal = 0;
    let greenTotal = 0;
    let blueTotal = 0;
    let alphaTotal = 0;
    let count = 0;

    for (let i = 0; i < len; i += preparedStep) {
      const alpha = arr[i + 3];
      const red = arr[i] * alpha;
      const green = arr[i + 1] * alpha;
      const blue = arr[i + 2] * alpha;

      redTotal += red;
      greenTotal += green;
      blueTotal += blue;
      alphaTotal += alpha;
      count++;
    }

    return alphaTotal
      ? [
          Math.round(redTotal / alphaTotal),
          Math.round(greenTotal / alphaTotal),
          Math.round(blueTotal / alphaTotal),
          Math.round(alphaTotal / count),
        ]
      : [0, 0, 0, 0];
  }

  public createVideoThumbnail(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    thumbnailSize: number,
    calculateAverageColor?: boolean,
    withCredentials?: boolean
  ): Promise<VideoThumbnail> {
    if (withCredentials) {
    }
    video.setAttribute('crossOrigin', withCredentials ? 'use-credentials' : 'anonymous'); // fix cross origin issue
    return new Promise((resolve, reject) => {
      let loadedmetadata = false;
      let loadeddata = false;
      const tryGetThumbnail = () => {
        if (!(loadedmetadata && loadeddata)) {
          return;
        }
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let color: RGBA | undefined;
        if (calculateAverageColor) {
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          color = this.getAverageColor(imageData.data);
        }
        const url = canvas.toDataURL();
        resolve({
          url,
          color,
          width: video.videoWidth,
          height: video.videoHeight,
        });
      };
      // Load metadata of the video to get video duration and dimensions
      video.addEventListener('loadedmetadata', () => {
        // var video_duration = video.duration;
        canvas.width = thumbnailSize;
        canvas.height = (canvas.width / video.videoWidth) * video.videoHeight;
        video.currentTime = 1; // video time
        loadedmetadata = true;
        tryGetThumbnail();
      });

      video.addEventListener('loadeddata', () => {
        loadeddata = true;
        tryGetThumbnail();
      });
    });
  }

  public getDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!(event.target && event.target.result)) {
          return resolve('');
        }
        resolve(event.target.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  public getImageOrientationFromArrayBuffer(buffer: ArrayBuffer): number {
    // -2: not jpeg
    // -1: not defined
    const view = new DataView(buffer);
    if (view.getUint16(0, false) !== 0xffd8) {
      return -2;
    }
    const length = view.byteLength;
    let offset = 2;
    while (offset < length) {
      if (view.getUint16(offset + 2, false) <= 8) {
        return -1;
      }
      const marker = view.getUint16(offset, false);
      offset += 2;
      if (marker === 0xffe1) {
        if (view.getUint32((offset += 2), false) !== 0x45786966) {
          return -1;
        }
        const little = view.getUint16((offset += 6), false) === 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) === 0x0112) {
            return view.getUint16(offset + i * 12 + 8, little);
          }
        }
        // tslint:disable-next-line
      } else if ((marker & 0xff00) !== 0xff00) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }
    return -1;
  }

  public getImageOrientation(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (!reader.readAsArrayBuffer) {
        return resolve(-3);
      }
      reader.onload = (event) => {
        if (!(event.target && event.target.result)) {
          return resolve(-3);
        }
        resolve(this.getImageOrientationFromArrayBuffer(event.target.result as ArrayBuffer));
      };
      // https://stackoverflow.com/questions/3248946/what-is-the-maximum-size-of-jpeg-metadata
      // https://twitter.com/jaffathecake/status/1085443592678752256
      // reader.readAsArrayBuffer(file);
      reader.readAsArrayBuffer(file.slice(0, 65536));
    });
  }

  public rotateCanvas(
    srcOrientation: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
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
      case 2:
        ctx.transform(-1, 0, 0, 1, width, 0);
        break;
      case 3:
        ctx.transform(-1, 0, 0, -1, width, height);
        break;
      case 4:
        ctx.transform(1, 0, 0, -1, 0, height);
        break;
      case 5:
        ctx.transform(0, 1, 1, 0, 0, 0);
        break;
      case 6:
        ctx.transform(0, 1, -1, 0, height, 0);
        break;
      case 7:
        ctx.transform(0, -1, -1, 0, height, width);
        break;
      case 8:
        ctx.transform(0, -1, 1, 0, 0, width);
        break;
      default:
        break;
    }
  }

  public getImageResized(
    image: HTMLImageElement,
    widthLimit: number,
    heightLimit?: number,
    orientation?: number,
    calculateAverageColor?: boolean
  ): ImageThumbnail | null {
    let width = image.width;
    let height = image.height;
    const thumbnailSize = widthLimit;
    if (widthLimit && heightLimit) {
      width = widthLimit;
      height = heightLimit;
    } else {
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

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      return null;
    }

    canvas.width = width;
    canvas.height = height;

    if (orientation !== undefined) {
      this.rotateCanvas(orientation, canvas, context, width, height);
    }

    context.drawImage(image, 0, 0, width, height);
    let avgColor = null;
    try {
      let rgba: RGBA | undefined;
      if (calculateAverageColor) {
        const imageData = context.getImageData(0, 0, width, height);
        rgba = this.getAverageColor(imageData.data);
      }
      if (rgba) {
        avgColor = rgba;
      }
    } catch (e) {
      /* security error, img on diff domain */
    }
    return {
      image,
      url: canvas.toDataURL('image/png'),
      color: avgColor,
    } as ImageThumbnail;
  }

  public resizeImageUrl(
    image: HTMLImageElement,
    url: string,
    thumbnailSize: number,
    calculateAverageColor?: boolean
  ): Promise<ImageThumbnail | null> {
    return new Promise((resolve, reject) => {
      image.onload = () => {
        if (!calculateAverageColor) {
          resolve({
            image,
            url,
            color: undefined,
          } as ImageThumbnail);
          return;
        }
        const resized = this.getImageResized(image, thumbnailSize, undefined, undefined, calculateAverageColor);
        if (resized) {
          resized.url = url;
        }
        resolve(resized);
      };
      image.onerror = () => {
        reject('Image loading failed: ' + url);
      };
      image.src = url;
    });
  }

  public resizeImageFile(
    image: HTMLImageElement,
    file: File,
    thumbnailSize: number,
    calculateAverageColor?: boolean
  ): Promise<ImageThumbnail | null> {
    return new Promise((resolve, reject) => {
      if (file.type.indexOf('image') === -1) {
        reject(new Error('Not an image'));
        return;
      }
      const createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
      const revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;
      let shouldRevoke = false;
      const orientationPromise = this.getImageOrientation(file);
      image.onload = () => {
        orientationPromise.then((orientation) => {
          const resized = this.getImageResized(image, thumbnailSize, undefined, orientation, calculateAverageColor);
          if (shouldRevoke) {
            revokeObjectURL(image.src);
          }
          resolve(resized);
        });
      };
      if (!(file instanceof File)) {
        return reject('Invalid file object. Use url or a valid instance of File class');
      }
      if (createObjectURL && revokeObjectURL) {
        shouldRevoke = true;
        image.src = createObjectURL(file);
        return;
      }
      this.getDataURL(file).then((dataUrl) => {
        image.src = dataUrl;
      });
    });
  }

  public resizeImage(
    thumbnailSize: number,
    file?: File,
    url?: string,
    calculateAverageColor?: boolean,
    withCredentials?: boolean
  ): Promise<ImageThumbnail | null> {
    const image = new Image();
    image.setAttribute('crossOrigin', withCredentials ? 'use-credentials' : 'anonymous');
    return url
      ? this.resizeImageUrl(image, url, thumbnailSize, calculateAverageColor)
      : this.resizeImageFile(image, file as File, thumbnailSize, calculateAverageColor);
  }

  public getSizeFormatted(bytes: number) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 B';
    }
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    i = parseInt('' + i, 10);
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  public getSizeParsed(size: string): number {
    size = ('' + size).toUpperCase();
    const matches = size.match(/([\d|.]+?)\s*?([A-Z]+)/);
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (!matches) {
      return parseFloat(size);
    }
    const i = sizes.indexOf(matches[2]);
    if (i === -1) {
      return parseFloat(size);
    }
    return parseFloat(matches[1]) * Math.pow(1024, i);
  }

  public getColorForText(text: string): string {
    const getHashCode = (value: string) => {
      let hash = 0;
      if (value.length === 0) {
        return hash;
      }
      for (let i = 0; i < value.length; i++) {
        // tslint:disable-next-line
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
        // tslint:disable-next-line
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    };
    const intToHSL = (value: number) => {
      const h = value % 360;
      const s = value % 100;
      const l = 50;
      return 'hsl(' + h + ',' + s + '%,' + l + '%, 0.75)';
    };
    return intToHSL(getHashCode(text.toLowerCase()));
  }

  public validateType(file: File, accept?: string): boolean {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
    // https://gitlab.com/meno/dropzone/blob/master/src/dropzone.js#L2511
    if (!accept) {
      return true;
    } // If there are no accepted mime types, it's OK
    const acceptedFiles = accept.split(',');

    const mimeType = file.type;
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    for (let validType of acceptedFiles) {
      validType = validType.trim();
      if (validType.charAt(0) === '.') {
        // extension
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        if (baseMimeType === validType.replace(/\/.*$/, '')) {
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

  public validateSize(file: File, maxSize?: string): boolean {
    if (!maxSize) {
      return true;
    }
    const bytes = this.getSizeParsed(maxSize);
    return file.size <= bytes;
  }

  public getFilesFromDroppedItems(dataTransfer: DataTransfer) {
    return getFilesFromDroppedItems(dataTransfer);
  }
}

export default new Utils();
