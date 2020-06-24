//секция
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //переборка
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  //добавление
  addItem(element) {
    this._container.prepend(element);
  }
}