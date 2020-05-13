export declare type RGBA = [number, number, number, number];
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
declare class Utils {
    arrayMove(arr: any[], previousIndex: number, newIndex: number): any[];
    getAverageColor(arr: Uint8ClampedArray): RGBA | undefined;
    createVideoThumbnail(video: HTMLVideoElement, canvas: HTMLCanvasElement, thumbnailSize: number, calculateAverageColor?: boolean): Promise<VideoThumbnail>;
    getDataURL(file: File): Promise<string>;
    getImageOrientationFromArrayBuffer(buffer: ArrayBuffer): number;
    getImageOrientation(file: File): Promise<number>;
    rotateCanvas(srcOrientation: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number): void;
    getImageResized(image: HTMLImageElement, widthLimit: number, heightLimit?: number, orientation?: number, calculateAverageColor?: boolean): ImageThumbnail | null;
    resizeImageUrl(image: HTMLImageElement, url: string, thumbnailSize: number, calculateAverageColor?: boolean): Promise<ImageThumbnail | null>;
    resizeImageFile(image: HTMLImageElement, file: File, thumbnailSize: number, calculateAverageColor?: boolean): Promise<ImageThumbnail | null>;
    resizeImage(thumbnailSize: number, file?: File, url?: string, calculateAverageColor?: boolean): Promise<ImageThumbnail | null>;
    getSizeFormatted(bytes: number): string;
    getSizeParsed(size: string): number;
    getColorForText(text: string): string;
    validateType(file: File, accept?: string): boolean;
    validateSize(file: File, maxSize?: string): boolean;
    getFilesFromDroppedItems(dataTransfer: DataTransfer): Promise<File[] | FileList>;
}
declare const _default: Utils;
export default _default;
