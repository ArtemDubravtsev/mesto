// Класс попапа с изображением
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image-foto');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    }

    open = (data) => {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.title;
        this._popupImageTitle.textContent = data.title;
        super.open();
    }
}