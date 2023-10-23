import Vue from 'vue';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, unknown, unknown, unknown, Record<never, any>, {}, import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    isEditInputFocused: boolean;
    isEditCancelable: boolean;
    fileRecord: import("../lib/file-record").default;
}, {
    updateFileRecord(): void;
    createThumbnail(fileRecord: import("../lib/file-record").default, video: HTMLVideoElement): void;
    playAv(fileRecord: import("../lib/file-record").default): void;
    removeFileRecord(fileRecord: import("../lib/file-record").default): void;
    editFileName(): void;
    editInputFocused(): void;
    editInputBlured(): void;
    filenameChanged(completed?: boolean | undefined): void;
    filenameClearPressed(): void;
    clearFilename(): boolean;
    dismissError(): void;
}, {
    hasLinkableUrl: boolean;
}, Record<"averageColor" | "deletable" | "disabled" | "editable" | "errorText" | "linkable" | "thumbnailSize" | "value" | "withCredentials", any>, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default _default;
