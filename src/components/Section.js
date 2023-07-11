export default class Section {
    constructor(renderer, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this.renderer = renderer;
    }

    addInitialItems(data) {
        data.forEach(element => {
            this.renderer(element)
        });
    }

    addItem(domElement) {
        this._container.prepend(domElement);
    }
}