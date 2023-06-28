export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._card = items;
        this.renderer = renderer;
    }

    addCard() {
        this._card.forEach(element => {
            this.addItem(this.renderer(element))
        });
    }

    addItem(domElement) {
        this._container.prepend(domElement);
    }
}