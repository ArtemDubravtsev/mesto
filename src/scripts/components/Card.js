// Класс создания карточек
class Card {
    constructor(data, templateSelector, openPopupImage, openPopupDeleteCard) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._openPopupImage = openPopupImage;
        this._openPopupDeleteCard = openPopupDeleteCard;
    }

    _сreateTemplateClone() {
        return document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    }

    _handleOpenPopupImage = () => {
        this._openPopupImage(this._data);
    }

    _handleDelete = () => {
        this._openPopupDeleteCard(this);
    }

    deleteCard() {
        this._cloneElement.remove();
    }

    _handleLike = () => {
        this._likeElement.classList.toggle('elements__item-like_active');
    }

    _setEventListener() {
        this._imageElement.addEventListener('click', this._handleOpenPopupImage);
        this._deleteElement.addEventListener('click', this._handleDelete);
        this._likeElement.addEventListener('click', this._handleLike);
    }

    сreateCard() {
        this._cloneElement = this._сreateTemplateClone();
        this._imageElement = this._cloneElement.querySelector('.elements__item-image');
        this._likeElement = this._cloneElement.querySelector('.elements__item-like');
        this._deleteElement = this._cloneElement.querySelector('.elements__item-delete');
        this._titleElement = this._cloneElement.querySelector('.elements__item-title');
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.title;
        this._titleElement.textContent = this._data.title;
        this._setEventListener();
        return this._cloneElement;
    }
}

export default Card;