import ajax from './lib/ajax-request';
import helper from './lib/upload-helper';
import uploader from './lib/uploader';

export * from './lib/ajax-request';
export * from './lib/upload-helper';
export * from './lib/uploader';

import { plugins } from '@file-agent/core';

export { ajax, helper, uploader };

plugins.uploader = uploader;
