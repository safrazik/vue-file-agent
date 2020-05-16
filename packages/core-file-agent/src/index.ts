import { FileIcon } from './components/file-icon';
import FileRecord from './lib/file-record';
export * from './components/file-preview';
export * from './components/file-agent';

import './scss/index.scss';

export interface Props {
  multiple?: boolean;
}
// export class FileAgent {
//   public $el?: HTMLElement;

//   constructor(/* public $el: HTMLElement,  */ public $props: Props) {}

//   render(el: HTMLElement) {
//     this.$el = el;
//     this.$el.innerHTML = `<div class="file-agent">
//   hey testing
// </div>
// `;
//   }
// }

export { FileIcon, FileRecord };
