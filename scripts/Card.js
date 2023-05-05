class Card {
    constructor(data, templateSelector, openPopupImage) {
        this._data = data;
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._openPopupImage = openPopupImage;
    }

    _сreateTemplateClone() {
        return document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    }

    _handleOpenPopupImage = () => {
        this._openPopupImage(this._data);
    }

    _handleDelete = () => {
        this._deleteElement.closest('.elements__item').remove();
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
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._titleElement.textContent = this._name;
        this._setEventListener();
        return this._cloneElement;
    }
}

export default Card;