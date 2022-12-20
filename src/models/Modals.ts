interface IModal {
  container: HTMLElement;
  visible: boolean;
  toggle(): boolean;
}

export default class Modal implements IModal {
  container: HTMLElement;
  visible: boolean;

  constructor(container: HTMLElement) {
    this.container = container;
    this.visible = false;
  }

  toggle(): boolean {
    this.visible = this.container.classList.toggle("visible");
    return this.visible;
  }
}
