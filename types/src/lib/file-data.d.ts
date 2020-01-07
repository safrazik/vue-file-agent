import { SvgIcon } from './icons';
import { RGBA, ImageThumbnail } from './utils';
interface Dimensions {
    height: number;
    width: number;
}
interface Options {
    accept?: string;
    maxSize?: string;
    read: boolean;
    thumbnailSize?: number;
}
interface ErrorText {
    common?: string;
    type?: string;
    size?: string;
    upload?: string;
}
interface ErrorFlags {
    common?: boolean;
    type?: boolean;
    size?: boolean;
    upload?: false | string;
}
interface RawFileData {
    url: string | null;
    urlResized: string | null;
    src: () => any;
    name: any;
    lastModified: number;
    sizeText: string;
    size: number;
    type: string;
    ext: string;
    color: string;
    file: File;
    progress: number | ((progress?: number) => number | void);
    error?: false | ErrorFlags;
    dimensions: Dimensions;
    videoThumbnail: string;
    imageColor: RGBA;
    customName: string;
    upload: UploadData;
}
interface DummyFile {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    lastModifiedDate: Date;
}
interface UploadData {
    data: any;
    error: string | false;
}
export { Dimensions, Options, RawFileData };
declare class FileData {
    static getFromRaw(fileDataRaw: RawFileData, options: Options, isSync?: boolean): FileData | Promise<FileData>;
    static fromRaw(fileDataRaw: RawFileData, options: Options): Promise<FileData>;
    static fromRawSync(fileDataRaw: RawFileData, options: Options): FileData;
    static fromRawArray(filesDataRaw: RawFileData[], options: Options): Promise<FileData[]>;
    static toRawArray(filesData: FileData[]): RawFileData[];
    static readFile(fileData: FileData): Promise<FileData>;
    static readFiles(filesData: FileData[]): Promise<FileData[]>;
    url: null | string;
    urlResized: null | string;
    image: HTMLImageElement | {};
    isPlayingAv: boolean;
    oldFileName: string | null;
    oldCustomName: string | null;
    upload: UploadData;
    raw: RawFileData;
    progressInternal: number;
    accept?: string;
    dimensions: Dimensions;
    error: false | ErrorFlags;
    file: File;
    height: undefined | number | string;
    width: undefined | number | string;
    id: string;
    imageColor?: RGBA;
    lastKnownSrc: null | string;
    maxSize?: string;
    options: Options;
    read: boolean;
    thumbnailSize: number;
    videoThumbnail: any;
    customName: any;
    xhr?: XMLHttpRequest;
    xhrQueue?: () => any;
    stopAv?: (() => any) | null;
    tusUpload?: any;
    constructor(data: RawFileData, options: Options);
    createDummyFile(data: RawFileData): DummyFile;
    hasProgress(): boolean;
    progress(value?: number): number | void;
    src(): string;
    size(): string;
    ext(): string;
    name(withoutExt?: boolean): string;
    isDarkColor(): boolean;
    color(): string;
    isImage(): boolean;
    isVideo(): boolean;
    isPlayableVideo(): boolean;
    isAudio(): boolean;
    isPlayableAudio(): boolean;
    isText(): boolean;
    setUrl(url: string | null): Promise<this>;
    imageResized(resized: ImageThumbnail | null): void;
    resizeImage(): Promise<this>;
    icon(): SvgIcon;
    getErrorMessage(errorText?: ErrorText): string;
    toRaw(): RawFileData;
    validate(): void;
}
export default FileData;
