import FileRecord from './file-record';

export interface Props {
  auto?: boolean;
  uploadUrl?: string;
  uploadHeaders?: any;
  uploadConfig?: any;
  multiple?: boolean;
  averageColor?: boolean;
  theme?: 'default' | 'list';
  sortable?: boolean | 'hold' | 'handle';
  meta?: boolean;
  compact?: boolean;
  deletable?: boolean;
  editable?: boolean;
  linkable?: boolean;
  helpText?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxFiles?: number;
  maxSize?: string;
  accept?: string;
  capture?: string;
  thumbnailSize?: number;
  fileRecords: FileRecord[];
  draggable?: boolean | HTMLElement;
  resumable?: boolean;
  uploadWithCredentials?: boolean;
  events?: {
    onBeforeDelete?: (fileRecord: FileRecord) => boolean | Promise<boolean>;
    onDelete?: (fileRecord: FileRecord) => boolean | Promise<boolean>;
    onChange?: (event: InputEvent) => void;
    onDrop?: (event: DragEvent) => void;
    onBeforeRename?: (fileRecord: FileRecord) => boolean | Promise<boolean>;
    onRename?: (fileRecord: FileRecord) => boolean | Promise<boolean>;
    onInput?: (fileRecords: FileRecord[]) => void;
    onSelect?: (fileRecords: FileRecord[]) => void;
    onUpload?: (fileRecord: FileRecord[], result: any) => void;
    onUploadError?: (fileRecord: FileRecord[], result: any) => void;
    onUploadDelete?: (fileRecord: FileRecord, result: any) => void;
    onUploadDeleteError?: (fileRecord: FileRecord, result: any) => void;
    onUploadUpdate?: (fileRecord: FileRecord, result: any) => void;
    onUploadUpdateError?: (fileRecord: FileRecord, result: any) => void;
  };
  // errorText?: {
  //   // common?: string;
  //   type?: string;
  //   size?: string;
  //   // upload?: string;
  // };
  slots?: {
    afterInner?: HTMLElement | string;
    afterOuter?: HTMLElement | string;
    beforeInner?: HTMLElement | string;
    beforeOuter?: HTMLElement | string;
    filePreview?: (fileRecord: FileRecord, index: number) => HTMLElement | string;
    filePreviewNew?: HTMLElement | string;
    sortableHandle?: HTMLElement | string;
  };
}
