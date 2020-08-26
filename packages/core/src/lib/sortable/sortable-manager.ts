import utils from '../utils';
import { TransitionManager, ElementRect } from './transition-manager';

interface Position {
  x: number;
  y: number;
}

interface Rect extends Position {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

// interface ElementRect {
//   rect: Rect;
//   element: HTMLElement;
// }

interface MovingInfo {
  initialPosition: Position;
  currentPosition: Position;
  returnPosition: Position;
  startPosition: Position;
  lastPosition: Position;
  element: HTMLElement;
  clonedElement: HTMLElement;
  rect: Rect;
  initialized: Date | true;
}

type EventHandler = (event: Event | any) => void;

// tslint:disable-next-line
var _eventHandlers: Record<
  string,
  { node: Node | Window | Document; handler: EventHandler; capture: boolean; container: any }[]
> = {}; // somewhere global

const addListener = (
  node: Node | Window | Document,
  event: string,
  handler: EventHandler,
  container: any,
  capture = false
) => {
  if (!(event in _eventHandlers)) {
    _eventHandlers[event] = [];
  }
  // here we track the events and their nodes (note that we cannot
  // use node as Object keys, as they'd get coerced into a string
  _eventHandlers[event].push({ node, handler, capture, container });
  node.addEventListener(event, handler, capture);
};

const removeAllListeners = (targetNode: Node | Window | Document, event: string, targetContainer: any) => {
  if (!(event in _eventHandlers)) {
    return;
  }
  // remove listeners from the matching nodes
  _eventHandlers[event]
    .filter(({ node, container }) => node === targetNode && (targetContainer ? container === targetContainer : true))
    .forEach(({ node, handler, capture }) => node.removeEventListener(event, handler, capture));

  // update _eventHandlers global
  _eventHandlers[event] = _eventHandlers[event].filter(
    ({ node, container }) => !(node === targetNode && (targetContainer ? container === targetContainer : true))
  );
};

export class SortableManager {
  hasTouch: boolean;
  elements: HTMLElement[];
  //   lastPosition?: Position;
  //   returnPosition?: Position;
  movingInfo?: MovingInfo;
  elementRects: ElementRect[] = [];
  eventListners: Record<string, any> = {};
  handlerClass = 'file-agent-sortable-handle';
  activeElementClass = 'active-sorting-item';
  activeContainerClass = 'is-sorting-active';
  constructor(
    private container: HTMLElement,
    private disabledElements: HTMLElement[],
    private frozenElements: HTMLElement[] = [],
    private transitionManager?: TransitionManager
  ) {
    this.hasTouch = document.ontouchstart !== undefined;
    this.elements = [];
    // tslint:disable-next-line
    for (let i = 0; i < container.children.length; i++) {
      const element = container.children[i] as HTMLElement;
      if (this.isDisabledElement(element)) {
        continue;
      }
      this.elements.push(element);
    }
  }

  isDisabledElement(element: HTMLElement) {
    return this.disabledElements.length && this.disabledElements.indexOf(element) !== -1;
  }

  isFrozenElement(element: HTMLElement) {
    return this.frozenElements.length && this.frozenElements.indexOf(element) !== -1;
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

  resetTransform(element: HTMLElement) {
    return new Promise((resolve, reject) => {
      let resolved = false;
      const transitionDuration = 300;
      element.style.transition = `transform ${transitionDuration}ms`;
      element.style.transform = 'translate3d(0, 0, 0)';
      const onTransitionEnd = (event: Event) => {
        event.stopPropagation();
        if (event.target !== element) {
          return;
        }
        this.nextFrame(() => {
          element.style.transition = '';
        });
        element.removeEventListener('transitionend', onTransitionEnd, false);
        resolved = true;
        resolve();
      };
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      }, transitionDuration + 100);
      element.addEventListener('transitionend', onTransitionEnd, false);
    });
  }

  intersectRect(rect1: Rect, position: Position, rect2: Rect) {
    // const rect1 = this.getRect(child1);
    // const rect2 = this.getRect(child2);
    // if (!(rect1 && rect2)) {
    //   return false;
    // }
    const moving = {
      top: position.y,
      right: position.x + rect1.width,
      bottom: position.y + rect1.height,
      left: position.x,
    };
    // moving.left = moving.left - offset.x;
    // moving.top = moving.top - offset.y;
    // moving.left = moving.left + offset.x;
    // moving.right = moving.right + offset.x;
    // moving.top = moving.top + offset.y;
    // moving.bottom = moving.bottom + offset.y;
    const other = {
      top: rect2.top,
      right: rect2.right,
      bottom: rect2.bottom,
      left: rect2.left,
    };
    // console.log('moving and other', moving, other);
    // return r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top;
    const threshold = 20;
    // const isOnTop = moving.bottom > other.top && moving.bottom < other.bottom;
    // const isOnBottom = moving.top > other.top && moving.top < other.bottom;
    // const isOnLeft = moving.right > other.left && moving.right < other.right;
    // const isOnRight = moving.left > other.left && moving.left < other.right;
    const isOnTop = moving.bottom - threshold > other.top && moving.bottom - threshold < other.bottom;
    const isOnBottom = moving.top + threshold > other.top && moving.top + threshold < other.bottom;
    const isOnLeft = moving.right - threshold > other.left && moving.right - threshold < other.right;
    const isOnRight = moving.left + threshold > other.left && moving.left + threshold < other.right;
    const isOnTopLeft = isOnTop && isOnLeft;
    const isOnTopRight = isOnTop && isOnRight;
    const isOnBottomLeft = isOnBottom && isOnLeft;
    const isOnBottomRight = isOnBottom && isOnRight;
    return isOnTopLeft && isOnBottomLeft && isOnTopRight && isOnBottomRight;
    return (isOnTopLeft && isOnBottomLeft) || (isOnTopRight && isOnBottomRight);
    return isOnTopLeft || isOnTopRight || isOnBottomLeft || isOnBottomRight;
    // return other.left > moving.right || other.right < moving.left || other.top > moving.bottom || other.bottom < moving.top;
  }

  createMovingInfo() {
    const x = -1;
    const y = -1;
    return {
      currentPosition: { x, y },
      returnPosition: { x, y },
      startPosition: { x, y },
      lastPosition: { x, y },
    } as MovingInfo;
  }

  getRectForElement(element: HTMLElement) {
    const elementRect = this.elementRects.filter((cr) => cr.element === element)[0];
    const rect = elementRect ? elementRect.rect : element.getBoundingClientRect();
    return rect;
  }

  getElementCloned(element: HTMLElement) {
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.position = 'fixed';
    clonedElement.style.top = '0';
    clonedElement.style.left = '0';
    clonedElement.style.zIndex = '12';
    clonedElement.style.width = element.clientWidth + 'px';
    clonedElement.style.height = element.clientHeight + 'px';
    return clonedElement;
  }

  transformPosition(element: HTMLElement, position: Position) {
    element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
  }

  movePosition(position: Position, absolute = false) {
    if (!this.movingInfo) {
      return;
    }
    const element = this.movingInfo.clonedElement;
    if (this.movingInfo.initialPosition && !absolute) {
      position.x = this.movingInfo.initialPosition.x + position.x;
      position.y = this.movingInfo.initialPosition.y + position.y;
    }
    this.movingInfo.currentPosition = position;
    this.transformPosition(element, position);
  }

  movePositionRelatively(position: Position) {
    return this.movePosition(position);
  }

  movePositionAbsolutely(position: Position) {
    if (this.movingInfo) {
      this.movingInfo.initialPosition = position;
    }
    return this.movePosition(position, true);
  }

  eventDown(event: TouchEvent | MouseEvent) {
    if (this.hasTouch && event.type === 'mousedown') {
      return;
    }
    this.movingInfo = this.createMovingInfo();
    this.movingInfo.initialized = new Date();
    this.movingInfo.startPosition = {
      x: event.type === 'touchstart' ? (event as TouchEvent).changedTouches[0].clientX : (event as MouseEvent).clientX,
      y: event.type === 'touchstart' ? (event as TouchEvent).changedTouches[0].clientY : (event as MouseEvent).clientY,
    };
    this.movingInfo.lastPosition = this.movingInfo.startPosition;
  }

  eventMove(event: TouchEvent | MouseEvent, holdDelay = 0) {
    if (!this.movingInfo) {
      return;
    }
    if (
      holdDelay &&
      this.movingInfo.initialized !== true &&
      new Date().getTime() - this.movingInfo.initialized.getTime() < holdDelay
    ) {
      this.movingInfo = undefined;
      return;
    }
    if (this.movingInfo.initialized !== true) {
      this.initializeMoving();
    }
    event.preventDefault();
    this.movingInfo.lastPosition = {
      x: event.type === 'touchmove' ? (event as TouchEvent).changedTouches[0].clientX : (event as MouseEvent).clientX,
      y: event.type === 'touchmove' ? (event as TouchEvent).changedTouches[0].clientY : (event as MouseEvent).clientY,
    };
    const position: Position = {
      x: this.movingInfo.lastPosition.x - this.movingInfo.startPosition.x,
      y: this.movingInfo.lastPosition.y - this.movingInfo.startPosition.y,
    };
    this.movePositionRelatively(position);
    this.checkIntersects();
  }

  eventEnd(event: MouseEvent | TouchEvent) {
    let isClick = false;
    // console.log('self.handlerMoving', self.handlerMoving);
    if (
      this.movingInfo &&
      this.movingInfo.lastPosition.x - this.movingInfo.startPosition.x < 2 &&
      this.movingInfo.lastPosition.y - this.movingInfo.startPosition.y < 2
    ) {
      isClick = true;
    }

    if (this.movingInfo && this.movingInfo.initialized === true) {
      console.log('eeennnnnnnnnn');
      // clonedChild.style.left = this.returnPosition.x - this.lastPosition.x + 'px';
      //   clonedChild.style.top = this.returnPosition.y - this.lastPosition.y + 'px';
      const clonedElement = this.movingInfo.clonedElement;
      const element = this.movingInfo.element;

      clonedElement.style.left = this.movingInfo.returnPosition.x + 'px';
      clonedElement.style.top = this.movingInfo.returnPosition.y + 'px';
      const resetPosition = {
        x: this.movingInfo.currentPosition.x - this.movingInfo.returnPosition.x,
        y: this.movingInfo.currentPosition.y - this.movingInfo.returnPosition.y,
      } as Position;
      this.movePositionAbsolutely(resetPosition);
      // setTimeout(() => {
      this.nextFrame(() => {
        element.style.transition = '';
        const clearElement = () => {
          //   element.style.opacity = '1';
          element.style.visibility = 'visible';
          if (clonedElement && clonedElement.parentElement) {
            clonedElement.parentElement.removeChild(clonedElement);
          }
        };
        if (resetPosition.x === 0 && resetPosition.y === 0) {
          clearElement();
        } else {
          this.resetTransform(clonedElement as HTMLElement).then(() => {
            clearElement();
          });
        }
      });
      // }, 1000);
    }
    this.movingInfo = undefined;
    this.endMoving();
    //   this.reset(child);
  }

  checkIntersects() {
    if (!this.movingInfo) {
      return;
    }
    // const clonedElement = this.movingInfo.clonedElement;
    const element = this.movingInfo.element;
    const rect = this.movingInfo.rect;
    let intersecting: { child: HTMLElement; index: number } | undefined;
    //   for (const ch of [this.children[1]]) {
    let i = -1;
    for (const elem of this.elements) {
      i++;
      if (elem === element || this.isFrozenElement(elem)) {
        continue;
      }
      const isIntersecting = this.intersectRect(rect, this.movingInfo.currentPosition, this.getRectForElement(elem));
      if (isIntersecting) {
        intersecting = { child: elem, index: i };
        break;
      }
    }
    console.log('intersecting?', intersecting);
    if (intersecting) {
      const elementIndex = this.elements.indexOf(element);
      // console.log('intersecting...', intersecting.index, intersecting.child);
      const sortedElements = utils.arrayMove(this.elements, elementIndex, intersecting.index, this.frozenElements);
      // const sortedChildRects = utils.arrayMove(this.childRects, childIndex, intersecting.index);
      const oldElementRects = this.elementRects;
      const sortedElementRects: typeof oldElementRects = [];
      let idx = -1;
      for (const ch of sortedElements) {
        idx++;
        sortedElementRects.push({ element: ch, rect: this.elementRects[idx].rect });
        this.container.appendChild(ch);
      }
      this.elementRects = sortedElementRects;
      this.elements = sortedElements;

      const oldRect = this.elementRects[elementIndex].rect;
      const newRect = this.elementRects[intersecting.index].rect;
      if (this.movingInfo) {
        this.movingInfo.returnPosition = newRect;
      }
      if (this.transitionManager) {
        const otherChildren = sortedElements;
        //   otherChildren.splice(otherChildren.indexOf(child), 1);
        this.transitionManager.applyTransitions([], [], otherChildren, oldElementRects);
      }
    }
  }

  calculateElementRects() {
    this.elementRects = [];
    for (const element of this.elements) {
      this.elementRects.push({ element, rect: element.getBoundingClientRect() });
    }
  }

  endMoving() {
    this.container.classList.remove(this.activeContainerClass);
  }

  initializeMoving() {
    if (!this.movingInfo) {
      return;
    }
    this.movingInfo.initialized = true;
    this.container.classList.add(this.activeContainerClass);
    const element = this.movingInfo.element;
    this.calculateElementRects();
    element.style.transition = '';
    const clonedElement = this.getElementCloned(element);
    // clonedElement.style.opacity = '0.5'
    clonedElement.classList.add(this.activeElementClass);
    const rect = this.getRectForElement(element);
    element.style.visibility = 'hidden';
    this.container.appendChild(clonedElement);
    //   element.style.opacity = '0';
    this.movingInfo.returnPosition = rect;
    this.movingInfo.clonedElement = clonedElement;
    this.movingInfo.rect = rect;
    this.movePositionAbsolutely(rect);
    console.log('initial valid movingInfo???', this.movingInfo);
  }

  onElementDown(element: HTMLElement, event: MouseEvent | TouchEvent, holdDelay = 0) {
    this.eventDown(event);
    if (this.movingInfo) {
      this.movingInfo.element = element;
    }
    if (holdDelay) {
      setTimeout(() => {
        if (this.movingInfo && this.movingInfo.initialized !== true) {
          this.initializeMoving();
        }
      }, holdDelay);
    }
    console.log('initial movingInfo???', this.movingInfo);
  }

  bindElementEvents(element: HTMLElement, holdDelay = 0) {
    let handle = element.querySelector('.' + this.handlerClass) as HTMLElement;
    if (!handle) {
      handle = element;
    } else {
      this.removeElementEvents(element);
    }
    handle.onmousedown = (event) => {
      console.log('on handle mouse down');
      this.onElementDown(element, event, holdDelay);
    };
    handle.ontouchstart = (event) => {
      this.onElementDown(element, event, holdDelay);
    };
    handle.ontouchend = (event) => {
      this.eventEnd(event);
    };
    handle.ontouchmove = (event) => {
      this.eventMove(event, holdDelay);
    };
  }

  removeElementEvents(element: HTMLElement) {
    element.onmousedown = () => {
      /* */
    };
    element.ontouchstart = () => {
      /* */
    };
    element.ontouchend = () => {
      /* */
    };
    element.ontouchmove = () => {
      /* */
    };
  }

  removeGlobalMouseEvents() {
    removeAllListeners(window, 'mousemove', this.container);
    removeAllListeners(window, 'mouseup', this.container);
  }

  registerGlobalMouseEvents(holdDelay = 0) {
    if (this.hasTouch) {
      return;
    }
    this.removeGlobalMouseEvents(); // prevent multiple event registration
    // if (this.eventListners.mousemove) {
    //   window.removeEventListener('mousemove', this.eventListners.mousemove, false);
    //   this.eventListners.mousemove = undefined;
    // }
    // if (this.eventListners.mouseup) {
    //   window.removeEventListener('mouseup', this.eventListners.mouseup, false);
    //   this.eventListners.mouseup = undefined;
    // }
    // this.eventListners.mousemove = (event: MouseEvent) => {
    //   console.log('onMouseMOveeeee.....');
    //   this.eventMove(event);
    // };
    // this.eventListners.mouseup = (event: MouseEvent) => {
    //   this.eventEnd(event);
    // };
    // window.addEventListener('mousemove', this.eventListners.mousemove, false);
    // window.addEventListener('mouseup', this.eventListners.mouseup, false);
    addListener(
      window,
      'mousemove',
      (event: MouseEvent) => {
        // console.log('onMouseMOveeeee.....');
        this.eventMove(event, holdDelay);
      },
      this.container
    );
    addListener(
      window,
      'mouseup',
      (event: MouseEvent) => {
        console.log('onMouseUPppppppppppppp.....');
        this.eventEnd(event);
      },
      this.container
    );
    // document.addEventListener('touchmove', function(event){
    // 	return RocketBar.handlerMove(event);
    // }, false);
  }

  registerEvents(holdDelay: number) {
    for (const elem of this.elements) {
      if (this.isFrozenElement(elem)) {
        continue;
      }
      this.bindElementEvents(elem, holdDelay);
    }
    this.registerGlobalMouseEvents(holdDelay);
  }

  removeEvents() {
    for (const elem of this.elements) {
      this.removeElementEvents(elem);
    }
    this.removeGlobalMouseEvents();
  }

  removeHandles() {
    for (const elem of this.elements) {
      const el = elem.querySelector('.' + this.handlerClass);
      if (el) {
        elem.removeChild(el);
      }
    }
  }

  addHandles(handle: HTMLElement) {
    for (const elem of this.elements) {
      if (this.isFrozenElement(elem)) {
        continue;
      }
      const handleEl = handle.cloneNode(true) as HTMLElement;
      handleEl.classList.add(this.handlerClass);
      elem.appendChild(handleEl);
    }
  }

  enable(mode: boolean | 'handle' | 'hold', handle: HTMLElement, holdDelay: number) {
    if (mode === 'handle') {
      this.addHandles(handle);
    } else {
      this.removeHandles();
    }
    this.registerEvents(mode === 'hold' ? holdDelay : 0);
  }

  disable() {
    this.removeEvents();
    this.removeHandles();
  }
}
