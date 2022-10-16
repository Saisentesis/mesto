export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }
  
  _clear() {
    this._container.innerHTML = '';
  }
  
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(item) {
    this._container.prepend(item);
  }
}