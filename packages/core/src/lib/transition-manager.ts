type Theme = 'list' | 'default';
export class TransitionManager {
  constructor(private theme?: Theme) {}
  private get isListTheme() {
    return this.theme === 'list';
  }
  nextFrame(callback: () => void) {
    requestAnimationFrame(() => {
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
    // console.log('ok complete2', first, last);
    // Invert.
    const transform = `translate3d(${first.left - last.left}px, ${first.top - last.top}px, 0)`;
    console.log('transformOtherElement', transform);
    // element.style.transform = '';
    element.style.transform = transform;
    element.style.transition = '';
    // console.log('newEl.style.transform', transform);
    // Wait for the next frame so we
    // know all the style changes have
    // taken hold.
    this.nextFrame(() => {
      //   element.style.transform = transform;
      element.style.transition = 'all 600ms';
      this.nextFrame(() => {
        // Switch on animations.
        // newEl.classList.add('animate-on-transforms');
        // GO GO GOOOOOO!
        element.style.transform = '';
      });
    });
    // element.addEventListener('transitionend', () => {
    //   element.style.transition = '';
    // });
  }
  addElement(child: HTMLElement) {
    // child.classList.add('grid-box-enter');
    child.style.opacity = '0';
    child.style.transform = this.isListTheme ? 'translate3d(0px, -20px, 0px)' : 'translate3d(0, 0, 0) scale(0.25)';
    // child.style.transition = 'all 600ms';

    // child.style.opacity = '';
    // child.style.transform = '';
    // child.style.transition = 'all 600ms';
    child.style.transition = '';

    this.nextFrame(() => {
      child.style.transition = 'all 600ms';
      this.nextFrame(() => {
        child.style.opacity = '';
        child.style.transform = '';
      });
    });
    child.addEventListener('transitionend', () => {
      child.style.transition = '';
    });
    // requestAnimationFrame(() => {
    //   // remove after 1 frame
    //   requestAnimationFrame(() => {
    //     // child.classList.remove('grid-box-enter');

    //   });
    // });
  }
  addElements(children: HTMLElement[]) {
    for (const child of children) {
      this.addElement(child);
    }
  }
  removeElement(child: HTMLElement) {
    child.style.opacity = '';
    child.style.transform = '';
    child.style.transition = 'all 600ms';
    this.nextFrame(() => {
      child.style.opacity = '0';
      child.style.transform = this.isListTheme ? 'translate3d(0px, -20px, 0px)' : 'translate3d(0, 0, 0) scale(0.25)';
    });
    // this.afterOneFrame(() => {
    //   child.style.opacity = '';
    //   child.style.transform = '';
    // });
    child.addEventListener('transitionend', () => {
      child.style.transition = '';
      child.style.transform = '';
      child.style.opacity = '';
      child.parentElement?.removeChild(child);
    });

    // requestAnimationFrame(() => {
    //   // remove after 1 frame
    //   requestAnimationFrame(() => {
    //     // child.classList.remove('grid-box-enter');

    //   });
    // });
  }

  removeElements(children: HTMLElement[]) {
    for (const child of children) {
      this.removeElement(child);
    }
  }

  applyTransitions(
    newChildren: HTMLElement[],
    removedChildren: HTMLElement[],
    // otherElements: { rect: DOMRect; child: HTMLElement }[],
    otherChildren: HTMLElement[],
    childRects: { rect: DOMRect; child: HTMLElement }[],
  ) {
    this.addElements(newChildren);
    // this.transformNewElement(newFileElement.child, newFileElement.rect);

    let displayValue = 'inline-block';
    removedChildren.map((child) => {
      displayValue = child.style.display;
      child.style.display = 'none';
    });

    // removedChildren.map((child) => {
    //   child.style.position = 'absolute';
    //   child.style.display = 'inline-block';
    //   child.style.opacity = '0.25';
    // });
    // this.removeElements(removedChildren);

    for (const child of removedChildren) {
      const childRect = childRects.filter((cr) => cr.child === child)[0];
      const rect = childRect ? childRect.rect : undefined;
      if (rect) {
        // this.transformOtherElement(child, rect);
        // console.log('the removed Rect...', rect);
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
      //   this.transformOtherElement(otherElement.child, otherElement.child.getBoundingClientRect());
    }

    for (const child of otherChildren) {
      const childRect = childRects.filter((cr) => cr.child === child)[0];
      const rect = childRect ? childRect.rect : undefined;
      if (!rect) {
        continue;
      }
      this.transformOtherElement(child, rect);
      //   this.transformOtherElement(otherElement.child, otherElement.child.getBoundingClientRect());
    }
  }
}
