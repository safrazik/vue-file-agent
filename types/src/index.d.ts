import VueFileAgentMixin from './components/vue-file-agent-mixin';
import VueFilePreviewMixin from './components/vue-file-preview-mixin';
import utils from './lib/utils';
import plugins from './lib/plugins';
import FileRecord from './lib/file-record';
import _Vue from 'vue';
export declare class VueFileAgentPlugin implements Vue.PluginObject<any> {
    VueFileIcon: import("vue/types/vue").ExtendedVue<_Vue, unknown, unknown, {
        viewBoxComputed: string;
        icon: import("./lib/icons").SvgIcon;
    }, Record<"ext" | "name" | "viewBox", any>>;
    VueFilePreview: import("vue/types/vue").ExtendedVue<_Vue, unknown, unknown, unknown, Record<never, any>>;
    VueFileAgent: import("vue/types/vue").ExtendedVue<_Vue, unknown, unknown, unknown, Record<never, any>>;
    component: import("vue/types/vue").ExtendedVue<_Vue, unknown, unknown, unknown, Record<never, any>>;
    mixin: import("vue/types/vue").ExtendedVue<_Vue, {
        fileRecords: FileRecord[];
        rawFileRecords: import("./lib/file-record").RawFileRecord[];
        isDragging: boolean;
        isSorting: boolean;
        isSortingActive: boolean;
        transitionDuration: number;
        overallProgress: number;
        uniqueId: string;
        sortTimeout: number;
    }, {
        createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement): Promise<void>;
        initVideo(fileRecord: FileRecord): void;
        getFileRecordOrRawInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord, raw: boolean): FileRecord | import("./lib/file-record").RawFileRecord;
        getFileRecordRawInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): import("./lib/file-record").RawFileRecord;
        getFileRecordInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): FileRecord;
        prepareConfigureFn(configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): import("./lib/ajax-request").ConfigureFn | undefined;
        upload(url: string, headers: object, fileRecordsOrRaw: FileRecord[] | import("./lib/file-record").RawFileRecord[], createFormData?: ((fileRecord: FileRecord) => FormData) | undefined, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
        deleteUpload(url: string, headers: object, fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord, uploadData?: any, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
        updateUpload(url: string, headers: object, fileRecord: FileRecord | import("./lib/file-record").RawFileRecord, uploadData?: any, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
        autoUpload(fileRecords: FileRecord[] | import("./lib/file-record").RawFileRecord[]): Promise<any>;
        autoDeleteUpload(fileRecord: FileRecord | import("./lib/file-record").RawFileRecord): Promise<any>;
        autoUpdateUpload(fileRecord: FileRecord): Promise<any>;
        equalFiles(file1: File, file2: File): boolean;
        isFileAddedAlready(file: File): boolean;
        handleFiles(files: File[] | FileList): void;
        filesChanged(event: InputEvent): void;
        drop(event: DragEvent): void;
        dragEnter(event: DragEvent): void;
        dragOver(event: DragEvent): void;
        dragLeave(event: DragEvent): void;
        removeFileRecord(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): void;
        deleteFileRecord(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): void;
        filenameChanged(fileRecord: FileRecord): void;
        checkValue(): void;
        sortStart(): void;
        sortEnd(sortData: {
            event: Event;
            newIndex: number;
            oldIndex: number;
            collection: any;
        }): void;
    }, {
        canAddMore: boolean;
        helpTextComputed: string;
        isDeletable: boolean;
        isSortable: boolean;
        hasMultiple: boolean;
        shouldRead: boolean;
    }, Record<"accept" | "auto" | "averageColor" | "capture" | "compact" | "deletable" | "disabled" | "editable" | "errorText" | "helpText" | "linkable" | "maxFiles" | "maxSize" | "meta" | "multiple" | "progress" | "read" | "readonly" | "resumable" | "sortable" | "theme" | "thumbnailSize" | "uploadConfig" | "uploadHeaders" | "uploadUrl" | "uploadWithCredentials" | "value", any>>;
    plugins: {
        tus: any;
    };
    VueFileAgentMixin: import("vue/types/vue").ExtendedVue<_Vue, {
        fileRecords: FileRecord[];
        rawFileRecords: import("./lib/file-record").RawFileRecord[];
        isDragging: boolean;
        isSorting: boolean;
        isSortingActive: boolean;
        transitionDuration: number;
        overallProgress: number;
        uniqueId: string;
        sortTimeout: number;
    }, {
        createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement): Promise<void>;
        initVideo(fileRecord: FileRecord): void;
        getFileRecordOrRawInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord, raw: boolean): FileRecord | import("./lib/file-record").RawFileRecord;
        getFileRecordRawInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): import("./lib/file-record").RawFileRecord;
        getFileRecordInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): FileRecord;
        prepareConfigureFn(configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): import("./lib/ajax-request").ConfigureFn | undefined;
        upload(url: string, headers: object, fileRecordsOrRaw: FileRecord[] | import("./lib/file-record").RawFileRecord[], createFormData?: ((fileRecord: FileRecord) => FormData) | undefined, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
        deleteUpload(url: string, headers: object, fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord, uploadData?: any, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
        updateUpload(url: string, headers: object, fileRecord: FileRecord | import("./lib/file-record").RawFileRecord, uploadData?: any, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
        autoUpload(fileRecords: FileRecord[] | import("./lib/file-record").RawFileRecord[]): Promise<any>;
        autoDeleteUpload(fileRecord: FileRecord | import("./lib/file-record").RawFileRecord): Promise<any>;
        autoUpdateUpload(fileRecord: FileRecord): Promise<any>;
        equalFiles(file1: File, file2: File): boolean;
        isFileAddedAlready(file: File): boolean;
        handleFiles(files: File[] | FileList): void;
        filesChanged(event: InputEvent): void;
        drop(event: DragEvent): void;
        dragEnter(event: DragEvent): void;
        dragOver(event: DragEvent): void;
        dragLeave(event: DragEvent): void;
        removeFileRecord(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): void;
        deleteFileRecord(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): void;
        filenameChanged(fileRecord: FileRecord): void;
        checkValue(): void;
        sortStart(): void;
        sortEnd(sortData: {
            event: Event;
            newIndex: number;
            oldIndex: number;
            collection: any;
        }): void;
    }, {
        canAddMore: boolean;
        helpTextComputed: string;
        isDeletable: boolean;
        isSortable: boolean;
        hasMultiple: boolean;
        shouldRead: boolean;
    }, Record<"accept" | "auto" | "averageColor" | "capture" | "compact" | "deletable" | "disabled" | "editable" | "errorText" | "helpText" | "linkable" | "maxFiles" | "maxSize" | "meta" | "multiple" | "progress" | "read" | "readonly" | "resumable" | "sortable" | "theme" | "thumbnailSize" | "uploadConfig" | "uploadHeaders" | "uploadUrl" | "uploadWithCredentials" | "value", any>>;
    VueFilePreviewMixin: import("vue/types/vue").ExtendedVue<_Vue, {
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
    install: Vue.PluginFunction<any>;
}
declare const vfaPlugin: VueFileAgentPlugin;
export declare const mixin: import("vue/types/vue").ExtendedVue<_Vue, {
    fileRecords: FileRecord[];
    rawFileRecords: import("./lib/file-record").RawFileRecord[];
    isDragging: boolean;
    isSorting: boolean;
    isSortingActive: boolean;
    transitionDuration: number;
    overallProgress: number;
    uniqueId: string;
    sortTimeout: number;
}, {
    createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement): Promise<void>;
    initVideo(fileRecord: FileRecord): void;
    getFileRecordOrRawInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord, raw: boolean): FileRecord | import("./lib/file-record").RawFileRecord;
    getFileRecordRawInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): import("./lib/file-record").RawFileRecord;
    getFileRecordInstance(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): FileRecord;
    prepareConfigureFn(configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): import("./lib/ajax-request").ConfigureFn | undefined;
    upload(url: string, headers: object, fileRecordsOrRaw: FileRecord[] | import("./lib/file-record").RawFileRecord[], createFormData?: ((fileRecord: FileRecord) => FormData) | undefined, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
    deleteUpload(url: string, headers: object, fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord, uploadData?: any, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
    updateUpload(url: string, headers: object, fileRecord: FileRecord | import("./lib/file-record").RawFileRecord, uploadData?: any, configureXhr?: import("./lib/ajax-request").ConfigureFn | undefined): Promise<any>;
    autoUpload(fileRecords: FileRecord[] | import("./lib/file-record").RawFileRecord[]): Promise<any>;
    autoDeleteUpload(fileRecord: FileRecord | import("./lib/file-record").RawFileRecord): Promise<any>;
    autoUpdateUpload(fileRecord: FileRecord): Promise<any>;
    equalFiles(file1: File, file2: File): boolean;
    isFileAddedAlready(file: File): boolean;
    handleFiles(files: File[] | FileList): void;
    filesChanged(event: InputEvent): void;
    drop(event: DragEvent): void;
    dragEnter(event: DragEvent): void;
    dragOver(event: DragEvent): void;
    dragLeave(event: DragEvent): void;
    removeFileRecord(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): void;
    deleteFileRecord(fileRecordOrRaw: FileRecord | import("./lib/file-record").RawFileRecord): void;
    filenameChanged(fileRecord: FileRecord): void;
    checkValue(): void;
    sortStart(): void;
    sortEnd(sortData: {
        event: Event;
        newIndex: number;
        oldIndex: number;
        collection: any;
    }): void;
}, {
    canAddMore: boolean;
    helpTextComputed: string;
    isDeletable: boolean;
    isSortable: boolean;
    hasMultiple: boolean;
    shouldRead: boolean;
}, Record<"accept" | "auto" | "averageColor" | "capture" | "compact" | "deletable" | "disabled" | "editable" | "errorText" | "helpText" | "linkable" | "maxFiles" | "maxSize" | "meta" | "multiple" | "progress" | "read" | "readonly" | "resumable" | "sortable" | "theme" | "thumbnailSize" | "uploadConfig" | "uploadHeaders" | "uploadUrl" | "uploadWithCredentials" | "value", any>>;
export { VueFileAgentMixin, VueFilePreviewMixin };
export { utils, FileRecord, plugins };
export declare const FileData: typeof FileRecord;
export default vfaPlugin;
