export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this.renderer = renderer;
    }

    addInitialItems() {
        this._items.forEach(element => {
            this.renderer(element)
        });
    }

    addItem(domElement) {
        this._container.prepend(domElement);
    }
}