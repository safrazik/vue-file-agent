import FileRecord from './file-record';

export type PropRef<T> = { (): T } | { new (...args: never[]): T & object } | { new (...args: string[]): Function };

export type PropType<T> = PropRef<T> | PropRef<T>[];

type CancelableEventReturnType = boolean | Promise<boolean> | undefined | null | void | any;
type SlotValue = HTMLElement | string | undefined | null | any;

type TypeString = 'string' | 'boolean' | 'object' | 'function' | 'number' | 'array' | 'any';

interface Prop<T> {
  type: PropType<T>;
  typeString: TypeString;
  required: false;
}

interface RequiredProp<T> {
  type: PropType<T>;
  typeString: TypeString;
  required: true;
}

const stringProp: Prop<string> = {
  type: String as PropType<string>,
  typeString: 'string',
  required: false,
};

const booleanProp: Prop<boolean> = {
  type: Boolean as PropType<boolean>,
  typeString: 'boolean',
  required: false,
};

const numberProp: Prop<number> = {
  type: Number as PropType<number>,
  typeString: 'number',
  required: false,
};

type ErrorTextType = {
  // common?: string;
  type?: string;
  size?: string;
  // upload?: string;
};

export interface FileIconProps {
  ext?: string;
  name?: string;
  viewBox?: string;
}

export interface FilePreviewProps {
  averageColor?: boolean;
  deletable?: boolean;
  editable?: boolean;
  linkable?: boolean;
  disabled?: boolean;
  fileRecord?: FileRecord;
  onDelete?: (fileRecord: FileRecord) => void;
  onRename?: (fileRecord: FileRecord) => void;
  errorText?: ErrorTextType;
}

export interface FileAgentProps {
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
    onBeforeDelete?: (fileRecord: FileRecord) => CancelableEventReturnType;
    onDelete?: (fileRecord: FileRecord) => CancelableEventReturnType;
    onChange?: (event: InputEvent) => void;
    onDrop?: (event: DragEvent) => void;
    onBeforeRename?: (fileRecord: FileRecord) => CancelableEventReturnType;
    onRename?: (fileRecord: FileRecord) => CancelableEventReturnType;
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
    afterInner?: SlotValue;
    afterOuter?: SlotValue;
    beforeInner?: SlotValue;
    beforeOuter?: SlotValue;
    filePreview?: (fileRecord: FileRecord, index: number) => SlotValue;
    filePreviewNew?: SlotValue;
    sortableHandle?: SlotValue;
  };
}

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||                                             |||||||||
// |||||||||                                             |||||||||
// |||||||||                                             |||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

export const fileIconProps = {
  ext: stringProp,
  name: stringProp,
  viewBox: stringProp,
};

export const filePreviewProps = {
  averageColor: booleanProp,
  deletable: booleanProp,
  editable: booleanProp,
  linkable: booleanProp,
  disabled: booleanProp,
  fileRecord: {
    type: Object as PropType<FileRecord>,
    typeString: 'object',
    required: false,
  } as Prop<FileRecord>,
  onDelete: {
    type: Function as PropType<(fileRecord: FileRecord) => void>,
    typeString: 'function',
    required: false,
  } as Prop<(fileRecord: FileRecord) => void>,
  onRename: {
    type: Function as PropType<(fileRecord: FileRecord) => void>,
    typeString: 'function',
    required: false,
  } as Prop<(fileRecord: FileRecord) => void>,
  errorText: {
    type: Object as PropType<ErrorTextType>,
    typeString: 'object',
    required: false,
  } as Prop<ErrorTextType>,
};

export const fileAgentProps = {
  auto: booleanProp,
  uploadUrl: stringProp,
  uploadHeaders: {
    type: Object as PropType<any>,
    typeString: 'any',
    required: false,
  } as Prop<any>,
  uploadConfig: {
    type: Object as PropType<any>,
    typeString: 'any',
    required: false,
  } as Prop<any>,
  multiple: booleanProp,
  averageColor: booleanProp,
  theme: {
    type: String as PropType<'default' | 'list'>,
    typeString: 'string',
    required: false,
  } as Prop<'default' | 'list'>,
  sortable: {
    type: String as PropType<boolean | 'hold' | 'handle'>,
    typeString: 'string',
    required: false,
  } as Prop<boolean | 'hold' | 'handle'>,
  meta: booleanProp,
  compact: booleanProp,
  deletable: booleanProp,
  editable: booleanProp,
  linkable: booleanProp,
  helpText: stringProp,
  disabled: booleanProp,
  readonly: booleanProp,
  maxFiles: numberProp,
  maxSize: stringProp,
  accept: stringProp,
  capture: stringProp,
  thumbnailSize: numberProp,
  fileRecords: {
    type: Array as PropType<FileRecord[]>,
    typeString: 'array',
    required: true,
  } as RequiredProp<FileRecord[]>,
  draggable: {
    type: Object as PropType<boolean | HTMLElement>,
    typeString: 'boolean',
    required: false,
  } as Prop<boolean | HTMLElement>,
  resumable: booleanProp,
  uploadWithCredentials: booleanProp,
};
