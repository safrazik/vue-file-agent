import Vue, { PluginFunction } from "vue";

interface Dimensions {
  height: number;
  width: number;
}

interface Options {
  accept: string|null;
  maxSize: string|null;
  read: boolean;
  thumbnailSize: undefined|number;
}

interface errorText {
  commong?: string;
  type?: string;
  size?: string;
}

class FileData {
  public raw: any;
  public file: File|any;
  public url: null|string;
  public urlResized: null|string;
  public lastKnownSrc: null|any;
  public _progress: ProgressEvent|boolean;
  public accept: string;
  public dimensions: Dimensions;
  public error: boolean;
  public file: File;
  public height: undefined|number|string;
  public width: undefined|number|string;
  public id: string;
  public image: HTMLImageElement;
  public imageColor: number[];
  public isPlayingAv: false;
  public lastKnownSrc: null|string;
  public maxSize: null|string;
  public options: Options;
  public read: boolean;
  public thumbnailSize: number;
  public upload: any;
  public videoThumbnail: any;
  public populate: (data: any, options = {}) => void;
  public hasProgress: () => boolean;
  public progress: (value: undefined|number) => any|number;
  public size: () => number|'';
  public src: () => string;
  public ext: () => string;
  public name: () => string;
  public isDarkColor: () => boolean;
  public color: () => string;
  public isImage: () => boolean;
  public isVideo: () => boolean;
  public isPlayableVideo: () => boolean;
  public isAudio: () => boolean;
  public isPlayableAudio: () => boolean;
  public isText: () => boolean;
  public setUrl: (url: string) => Promise<any>;
  public imageResized: (resized: any) => void;
  public resizeImage: () => Promise<void>;
  public icon: () => SvgPath;
  public getErrorMessage: (errorText: string) => errorText;
  public toRaw: () => any;
  public validate: () => void;
  static fromRaw: (fileDataRaw: any, options: any) => Promise<any>;
  static fromRawArray: (filesDataRaw: any[], options) => Promise<any[]>
  static toRawArray: (filesData: any) => any[];
  static readFile: (fileData: any) => Promise<any>;
  static readFiles: (filesData: any) => Promise<any[]>;
}

export { FileData, Dimensions, Options }
export default class VueFileAgentPlugin {
  static install: PluginFunction<never>;
  static VueFileIcon: Vue;
  static VueFilePreview: Vue;
  static VueFileAgent: Vue;
  static component: Vue;
  static mixin: Vue;
}

export const mixin: Vue;
