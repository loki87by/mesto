//секция
export default class Section {
  constructor({/* items, */renderer}, containerSelector) {
    //this._renderer = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //переборка
  renderItems(items) {
    items.reverse();
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  //добавление
  addItem(element) {
    this._container.prepend(element);
  }
}