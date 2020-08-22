import FileRecord from './file-record';

// tslint:disable-next-line
export type PropRef<T> = { (): T } | { new (...args: never[]): T & object } | { new (...args: string[]): Function };

export type PropType<T> = PropRef<T> | PropRef<T>[];

type CancelableEventReturnType = boolean | Promise<boolean> | undefined | null | void | any;
type SlotValue = HTMLElement | string | undefined | null | any;

type TypeString = 'string' | 'boolean' | 'object' | 'function' | 'number' | 'array' | 'any';

interface Prop<T> {
  type: PropType<T>;
  typeString: TypeString;
  required: false;
  default?: T;
}

interface RequiredProp<T> {
  type: PropType<T>;
  typeString: TypeString;
  required: true;
}

const createProp = <T>(typeString: TypeString, Type: any, defaultValue?: T): Prop<T> => {
  return {
    type: Type as PropType<T>,
    typeString,
    default: defaultValue,
    required: false,
  };
};

const stringProp = (defaultValue?: string) => {
  return createProp<string>('string', String, defaultValue);
};
const booleanProp = (defaultValue?: boolean) => {
  return createProp<boolean>('boolean', Boolean, defaultValue);
};
const numberProp = (defaultValue?: number) => {
  return createProp<number>('number', Number, defaultValue);
};
const functionProp = <T>(defaultValue?: T) => {
  return createProp<T>('function', Function, defaultValue);
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
  // events?: {
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
  // };
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

export const fileIconPropsDefaults: FileIconProps = {
  ext: undefined,
  name: undefined,
  viewBox: undefined,
};

export const filePreviewPropsDefaults: FilePreviewProps = {
  averageColor: undefined,
  deletable: undefined,
  editable: undefined,
  linkable: undefined,
  disabled: undefined,
  fileRecord: undefined,
  onDelete: undefined,
  onRename: undefined,
  errorText: undefined,
};

export const fileAgentPropsDefaults: FileAgentProps = {
  auto: undefined, // calculated
  uploadUrl: undefined,
  uploadHeaders: undefined,
  uploadConfig: undefined,
  multiple: undefined, // calculated
  averageColor: true,
  theme: 'default',
  sortable: false,
  meta: undefined,
  compact: false,
  deletable: false,
  editable: false,
  linkable: false,
  helpText: undefined,
  disabled: undefined,
  readonly: undefined,
  maxFiles: undefined,
  maxSize: undefined,
  accept: undefined,
  capture: undefined,
  thumbnailSize: undefined,
  fileRecords: [],
  draggable: undefined,
  resumable: undefined,
  uploadWithCredentials: undefined,
  onBeforeDelete: undefined,
  onDelete: undefined,
  onChange: undefined,
  onDrop: undefined,
  onBeforeRename: undefined,
  onRename: undefined,
  onInput: undefined,
  onSelect: undefined,
  onUpload: undefined,
  onUploadError: undefined,
  onUploadDelete: undefined,
  onUploadDeleteError: undefined,
  onUploadUpdate: undefined,
  onUploadUpdateError: undefined,
};

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||                                             |||||||||
// |||||||||                                             |||||||||
// |||||||||                                             |||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

export const fileIconProps = {
  ext: stringProp(fileIconPropsDefaults.ext),
  name: stringProp(fileIconPropsDefaults.name),
  viewBox: stringProp(fileIconPropsDefaults.viewBox),
};

export const filePreviewProps = {
  averageColor: booleanProp(fileAgentPropsDefaults.averageColor),
  deletable: booleanProp(fileAgentPropsDefaults.deletable),
  editable: booleanProp(fileAgentPropsDefaults.editable),
  linkable: booleanProp(fileAgentPropsDefaults.linkable),
  disabled: booleanProp(fileAgentPropsDefaults.disabled),
  fileRecord: createProp<FileRecord>('object', Object),
  onDelete: functionProp<(fileRecord: FileRecord) => void>(),
  onRename: functionProp<(fileRecord: FileRecord) => void>(),
  errorText: createProp<ErrorTextType>('object', Object),
};

export const fileAgentProps = {
  auto: booleanProp(),
  uploadUrl: stringProp(fileAgentPropsDefaults.uploadUrl),
  uploadHeaders: createProp<any>('any', Object),
  uploadConfig: createProp<any>('any', Object),
  multiple: booleanProp(fileAgentPropsDefaults.multiple),
  averageColor: booleanProp(fileAgentPropsDefaults.averageColor),
  theme: createProp<'default' | 'list'>('string', String),
  sortable: createProp<boolean | 'hold' | 'handle'>('string', String),
  meta: booleanProp(fileAgentPropsDefaults.meta),
  compact: booleanProp(fileAgentPropsDefaults.compact),
  deletable: booleanProp(fileAgentPropsDefaults.deletable),
  editable: booleanProp(fileAgentPropsDefaults.editable),
  linkable: booleanProp(fileAgentPropsDefaults.linkable),
  helpText: stringProp(fileAgentPropsDefaults.helpText),
  disabled: booleanProp(fileAgentPropsDefaults.disabled),
  readonly: booleanProp(fileAgentPropsDefaults.readonly),
  maxFiles: numberProp(fileAgentPropsDefaults.maxFiles),
  maxSize: stringProp(fileAgentPropsDefaults.maxSize),
  accept: stringProp(fileAgentPropsDefaults.accept),
  capture: stringProp(fileAgentPropsDefaults.capture),
  thumbnailSize: numberProp(fileAgentPropsDefaults.thumbnailSize),
  fileRecords: createProp<FileRecord[]>('array', Array),
  draggable: createProp<boolean | HTMLElement>('boolean', Object),
  resumable: booleanProp(fileAgentPropsDefaults.resumable),
  uploadWithCredentials: booleanProp(fileAgentPropsDefaults.uploadWithCredentials),
  // events:
  onBeforeDelete: functionProp<(fileRecord: FileRecord) => CancelableEventReturnType>(),
  onDelete: functionProp<(fileRecord: FileRecord) => CancelableEventReturnType>(),
  onChange: functionProp<(event: InputEvent) => void>(),
  onDrop: functionProp<(event: DragEvent) => void>(),
  onBeforeRename: functionProp<(fileRecord: FileRecord) => CancelableEventReturnType>(),
  onRename: functionProp<(fileRecord: FileRecord) => CancelableEventReturnType>(),
  onInput: functionProp<(fileRecords: FileRecord[]) => void>(),
  onSelect: functionProp<(fileRecords: FileRecord[]) => void>(),
  onUpload: functionProp<(fileRecord: FileRecord[], result: any) => void>(),
  onUploadError: functionProp<(fileRecord: FileRecord[], result: any) => void>(),
  onUploadDelete: functionProp<(fileRecord: FileRecord, result: any) => void>(),
  onUploadDeleteError: functionProp<(fileRecord: FileRecord, result: any) => void>(),
  onUploadUpdate: functionProp<(fileRecord: FileRecord, result: any) => void>(),
  onUploadUpdateError: functionProp<(fileRecord: FileRecord, result: any) => void>(),
  // end events
};
