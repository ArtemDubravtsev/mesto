// Класс создания карточек
class Card {
    constructor(data, templateSelector, openPopupImage, openPopupDeleteCard, changeLike) {
        this._data = data;
        this._id = data.id;
        this._ownerid = data.owner._id;
        this._likes = data.likes;
        this._likesAmount = data.likes.length;
        this._changeLike = changeLike;
        this._cardId = data._id;
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
        this._openPopupDeleteCard({ card: this, cardId: this._cardId });
    }

    deleteCard() {
        this._cloneElement.remove();
    }

    _handleLike = () => {
        this._changeLike(this._likeElement, this._cardId);
    }

    toggleLike(likes) {
        this._likeElement.classList.toggle('elements__item-like_active');
        this._likesNumber.textContent = likes.length;
    }

    _setEventListener() {
        this._imageElement.addEventListener('click', this._handleOpenPopupImage);
        this._deleteElement.addEventListener('click', this._handleDelete);
        this._likeElement.addEventListener('click', this._handleLike);
    }

    _showDeleteCardButton() {
        if (this._id === this._ownerid) {
            this._deleteElement.style.display = "block"
        } else {
            this._deleteElement.style.display = "none"
        };
    }

    _showLikesCards() {
        this._likes.forEach(item => {
            if (item._id === this._id) {
                this._likeElement.classList.add('elements__item-like_active')
                return
            }
        })
        this._likesNumber.textContent = this._likesAmount
    }

    сreateCard() {
        this._cloneElement = this._сreateTemplateClone();
        this._imageElement = this._cloneElement.querySelector('.elements__item-image');
        this._likeElement = this._cloneElement.querySelector('.elements__item-like');
        this._deleteElement = this._cloneElement.querySelector('.elements__item-delete');
        this._titleElement = this._cloneElement.querySelector('.elements__item-title');
        this._likesNumber = this._cloneElement.querySelector('.elements__like-number');
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.name;
        this._titleElement.textContent = this._data.name;
        this._showDeleteCardButton();
        this._showLikesCards();
        this._setEventListener();
        return this._cloneElement;
    }

    removeCardElement() {
        this._cloneElement.remove();
        this._cloneElement = null;
    }
}

export default Card;