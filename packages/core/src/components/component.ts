const domParser = document.createElement('div');

export class Component {
  protected cachedEl?: Element;
  getEl(): Element {
    return document.createElement('div');
  }
  //  getRef<T extends HTMLElement>(ref: string) {
  //    return this.$el.querySelector('[data-ref="' + ref + '"]') as T;
  //  }
  getRef<T extends HTMLElement>(ref: string, el?: Element): T {
    return ((el || this.$el).querySelector('[data-ref="' + ref + '"]') as T) || document.createElement('span');
  }
  toggleClass(el: Element, cls: string, toggle: boolean) {
    const hasClass = el.classList.contains(cls);
    if (toggle) {
      if (!hasClass) {
        el.classList.add(cls);
      }
    } else {
      if (hasClass) {
        el.classList.remove(cls);
      }
    }
  }
  get $el(): Element {
    if (this.cachedEl) {
      return this.cachedEl;
    }
    const el = this.getEl();
    this.cachedEl = el;
    return el;
  }
  parseTemplate(template: string): HTMLElement {
    domParser.innerHTML = template;
    if (domParser.children.length > 1) {
      throw new Error('Only one child element is allowed in template');
    }
    return domParser.firstChild as HTMLElement;
  }
  render(container: HTMLElement) {
    container.appendChild(this.$el);
    return this.$el;
  }
}
