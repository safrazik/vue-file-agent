import FileData from '../lib/file-data';
import Vue from 'vue';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, {
    isEditInputFocused: boolean;
    isEditCancelable: boolean;
    fileData: FileData;
}, {
    updateFileData(): void;
    createThumbnail(fileData: FileData, video: HTMLVideoElement): void;
    playAv(fileData: FileData): void;
    removeFileData(fileData: FileData): void;
    editFileName(): void;
    editInputFocused(): void;
    editInputBlured(): void;
    filenameChanged(completed?: boolean | undefined): void;
    filenameClearPressed(): void;
    clearFilename(): boolean;
    dismissError(): void;
}, {
    hasLinkableUrl: boolean;
}, Record<"deletable" | "disabled" | "editable" | "errorText" | "linkable" | "thumbnailSize" | "value", any>>;
export default _default;
