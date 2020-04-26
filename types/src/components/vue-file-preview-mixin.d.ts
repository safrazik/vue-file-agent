import FileRecord from '../lib/file-record';
import Vue from 'vue';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, {
    isEditInputFocused: boolean;
    isEditCancelable: boolean;
    fileRecord: FileRecord;
}, {
    updateFileRecord(): void;
    createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement): void;
    playAv(fileRecord: FileRecord): void;
    removeFileRecord(fileRecord: FileRecord): void;
    editFileName(): void;
    editInputFocused(): void;
    editInputBlured(): void;
    filenameChanged(completed?: boolean | undefined): void;
    filenameClearPressed(): void;
    clearFilename(): boolean;
    dismissError(): void;
}, {
    hasLinkableUrl: boolean;
}, Record<"averageColor" | "deletable" | "disabled" | "editable" | "errorText" | "linkable" | "thumbnailSize" | "value", any>>;
export default _default;
