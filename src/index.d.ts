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

interface ErrorText {
  commong?: string;
  type?: string;
  size?: string;
}

export class FileData {
  public constructor(data: RawFileData, options: any);
  public static fromRaw: (fileDataRaw: RawFileData, options: any) => Promise<FileData>;
  public static fromRawArray: (filesDataRaw: RawFileData[], options: any) => Promise<FileData[]>;
  public static toRawArray: (filesData: FileData[]) => RawFileData[];
  public static readFile: (fileData: FileData) => Promise<FileData>;
  public static readFiles: (filesData: FileData[]) => Promise<FileData[]>;
  public raw: RawFileData;
  public url: null | string;
  public urlResized: null | string;
  public _progress: ProgressEvent | boolean;
  public accept: string;
  public dimensions: Dimensions;
  public error: boolean;
  public file: File | any;
  public height: undefined | number | string;
  public width: undefined | number | string;
  public id: string;
  public image: HTMLImageElement;
  public imageColor: number[];
  public isPlayingAv: false;
  public lastKnownSrc: null | string;
  public maxSize: null | string;
  public options: Options;
  public read: boolean;
  public thumbnailSize: number;
  public upload: any;
  public videoThumbnail: any;
  public populate: (data: RawFileData, options: any) => void;
  public hasProgress: () => boolean;
  public progress: (value: undefined | number) => any | number;
  public size: () => number | '';
  public src: () => string;
  public ext: () => string;
  public name: (withoutName?: boolean) => string;
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
  public icon: () => any;
  public getErrorMessage: (errorText: string) => ErrorText;
  public toRaw: () => RawFileData;
  public validate: () => void;
}

interface RawFileData {
  url: string | null;
  urlResized: string | null;
  src: () => any;
  name: string | () => string;
  lastModified: number;
  sizeText: string;
  size: number;
  type: string;
  ext: string;
  color: string;
  file: File;
  progress: () => any;
  error: boolean;
  dimensions: Dimensions;
}

export { Dimensions, Options, RawFileData };
export default class VueFileAgentPlugin {
  static install: PluginFunction<never>;
  static VueFileIcon: Vue;
  static VueFilePreview: Vue;
  static VueFileAgent: Vue;
  static component: Vue;
  static mixin: Vue;
}

export const mixin: Vue;
