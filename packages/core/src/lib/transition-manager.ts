type Theme = 'list' | 'default';
export class TransitionManager {
  private options = {
    transitionDuration: 600,
    transitionStyle: {
      opacity: '0',
      transform: 'translate3d(0, 0, 0) scale(0.25)',
    } as Record<string, string>,
  };
  constructor(private theme?: Theme) {
    if (this.isListTheme) {
      this.options.transitionStyle.transform = 'translate3d(0px, -20px, 0px)';
    }
  }
  private get isListTheme() {
    return this.theme === 'list';
  }
  nextFrame(callback: () => void) {
    const request = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    if (!request) {
      callback();
      return;
    }
    request(() => {
      callback();
    });
  }
  afterOneFrame(callback: () => void) {
    requestAnimationFrame(() => {
      this.nextFrame(callback);
    });
  }
  transformOtherElement(element: HTMLElement, first: DOMRect) {
    const last = element.getBoundingClientRect();
    const transform = `translate3d(${first.left - last.left}px, ${first.top - last.top}px, 0)`;
    element.style.transform = transform;
    element.style.transition = '';
    this.nextFrame(() => {
      element.style.transition = `all ${this.options.transitionDuration}ms`;
      this.nextFrame(() => {
        element.style.transform = '';
      });
    });
  }
  private applyTransitionStyle(child: HTMLElement, style?: Record<string, string>) {
    if (!style) {
      style = this.options.transitionStyle;
    }
    for (const prop in style) {
      if (style.hasOwnProperty(prop)) {
        child.style[prop as any] = style[prop];
      }
    }
  }
  private resetTransitionStyle(child: HTMLElement) {
    const resetStyle: Record<string, string> = {};
    const style = this.options.transitionStyle;
    for (const prop in style) {
      if (style.hasOwnProperty(prop)) {
        resetStyle[prop] = '';
      }
    }
    this.applyTransitionStyle(child, resetStyle);
  }
  addElement(child: HTMLElement) {
    this.applyTransitionStyle(child);
    child.style.transition = '';
    this.nextFrame(() => {
      child.style.transition = `all ${this.options.transitionDuration}ms`;
      this.nextFrame(() => {
        this.resetTransitionStyle(child);
      });
    });
    child.addEventListener('transitionend', () => {
      child.style.transition = '';
    });
  }
  addElements(children: HTMLElement[]) {
    for (const child of children) {
      this.addElement(child);
    }
  }
  removeElement(child: HTMLElement) {
    this.resetTransitionStyle(child);
    child.style.transition = `all ${this.options.transitionDuration}ms`;
    this.nextFrame(() => {
      this.applyTransitionStyle(child);
    });

    child.addEventListener('transitionend', () => {
      child.style.transition = '';

      this.resetTransitionStyle(child);
      child.parentElement?.removeChild(child);
    });
  }

  removeElements(children: HTMLElement[]) {
    for (const child of children) {
      this.removeElement(child);
    }
  }

  applyTransitions(
    newChildren: HTMLElement[],
    removedChildren: HTMLElement[],
    otherChildren: HTMLElement[],
    childRects: { rect: DOMRect; child: HTMLElement }[],
  ) {
    this.addElements(newChildren);

    let displayValue = 'inline-block';
    removedChildren.map((child) => {
      displayValue = child.style.display;
      child.style.display = 'none';
    });

    for (const child of removedChildren) {
      const childRect = childRects.filter((cr) => cr.child === child)[0];
      const rect = childRect ? childRect.rect : undefined;
      if (rect) {
        child.style.position = 'fixed';
        child.style.height = `${rect.height}px`;
        child.style.width = `${rect.width}px`;
        child.style.top = `${rect.top}px`;
        child.style.left = `${rect.left}px`;
      } else {
        child.style.position = 'absolute';
      }
      child.style.display = 'inline-block';
      child.style.opacity = '0.25';
      this.removeElement(child);
    }

    for (const child of otherChildren) {
      const childRect = childRects.filter((cr) => cr.child === child)[0];
      const rect = childRect ? childRect.rect : undefined;
      if (!rect) {
        continue;
      }
      this.transformOtherElement(child, rect);
    }
  }
}
