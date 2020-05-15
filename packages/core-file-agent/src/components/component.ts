const domParser = document.createElement('div');

export class Component {
  protected cachedEl?: Element;
  getEl(): Element {
    return document.createElement('div');
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
