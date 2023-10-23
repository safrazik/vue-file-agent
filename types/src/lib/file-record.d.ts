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
    averageColor?: boolean;
    withCredentials?: boolean;
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
interface RawFileRecord {
    url: string | ((value?: string) => string | undefined | Promise<FileRecord>);
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
export { Dimensions, Options, RawFileRecord };
declare class FileRecord {
    static getFromRaw(rawFileRecord: RawFileRecord, options: Options, isSync?: boolean): FileRecord | Promise<FileRecord>;
    static fromRaw(rawFileRecord: RawFileRecord, options: Options): Promise<FileRecord>;
    static fromRawSync(rawFileRecord: RawFileRecord, options: Options): FileRecord;
    static fromRawArray(rawFileRecords: RawFileRecord[], options: Options): Promise<FileRecord[]>;
    static toRawArray(fileRecords: FileRecord[]): RawFileRecord[];
    static readFile(fileRecord: FileRecord): Promise<FileRecord>;
    static readFiles(fileRecords: FileRecord[]): Promise<FileRecord[]>;
    urlValue: null | string;
    urlResized: null | string;
    image: HTMLImageElement | {};
    isPlayingAv: boolean;
    oldFileName: string | null;
    oldCustomName: string | null;
    upload: UploadData;
    raw: RawFileRecord;
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
    calculateAverageColor: boolean;
    constructor(data: RawFileRecord, options: Options);
    createDummyFile(data: RawFileRecord): DummyFile;
    hasProgress(): boolean;
    progress(value?: number): number | void;
    url(value?: string): string | undefined | Promise<this>;
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
    toRaw(): RawFileRecord;
    validate(): void;
}
export default FileRecord;
