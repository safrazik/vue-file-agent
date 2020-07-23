import { Component } from './component';
import { getIconFromExt, getIconByName, SvgIcon } from '../lib/icons';
import { FileIconProps } from '../lib/props';

export class FileIcon extends Component {
  constructor(public $props: FileIconProps) {
    super();
  }

  get icon() {
    if (this.$props.name) {
      return getIconByName(this.$props.name);
    }
    const svgIcon = getIconFromExt(this.$props.ext as string);
    return svgIcon;
  }

  get viewBox() {
    if (!this.$props.viewBox && this.icon && this.icon.viewBox) {
      return this.icon.viewBox;
    }
    return this.$props.viewBox ? this.$props.viewBox : '0 0 100 100';
  }

  update() {
    const svg = this.$el;
    svg.setAttribute('viewBox', this.viewBox);
    svg.innerHTML = '';
    for (const d of this.icon.paths) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    }
  }

  // getEl() {
  //   const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  //   svg.setAttribute('viewBox', this.viewBox);
  //   for (const d of this.icon.paths) {
  //     const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  //     path.setAttribute('d', d);
  //     svg.appendChild(path);
  //   }
  //   return svg;
  // }

  get $el(): SVGElement {
    if (this.cachedEl) {
      return this.cachedEl as SVGElement;
    }
    // let el?: HTMLElement;
    // if (!el) {
    // const el = document.createElement('div');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    this.cachedEl = svg; // important to avoid recursion because this getter is called in update method

    this.update();

    return svg;
  }
}
