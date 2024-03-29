// Класс попапов
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__button-close');
        this._form = this._popup.querySelector('.popup__form');
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleButtonClose = () => {
        this.close();
    }

    _handleOverlayClose = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', this._handleButtonClose);
        this._popup.addEventListener('click', this._handleOverlayClose);
    }
}