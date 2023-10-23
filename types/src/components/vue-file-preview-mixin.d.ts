import VueFileIcon from './vue-file-icon.vue';
import FileRecord from '../lib/file-record';
declare const _default: import("vue/types/vue").ExtendedVue<VueFileIcon<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => VueFileIcon<Record<string, any>, Record<string, any>, never, never, any>>, {
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
    filenameChanged(completed?: boolean): void;
    filenameClearPressed(): void;
    clearFilename(): boolean;
    dismissError(): void;
}, {
    hasLinkableUrl: boolean;
}, Record<"averageColor" | "deletable" | "disabled" | "editable" | "errorText" | "linkable" | "thumbnailSize" | "value" | "withCredentials", any>, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default _default;
