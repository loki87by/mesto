//секция
export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //переборка
  renderItems(items, userId) {
    items.reverse();
    items.forEach((item) => {
      this._renderer(item, userId);
    });
  }

  //добавка
  addItem(element) {
    this._container.prepend(element);
  }
}