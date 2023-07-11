import Popup from "./Popup";

export default class PopupCardDelete extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._submitButton = this._form.querySelector('.popup__button-save');
        this._submitButtonText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitButton.textContent = `${this._submitButton.textContent}...`
            this._submitForm({ card: this._element, cardId: this._cardId });
        });
    }

    getSubmitButtonText() {
        this._submitButton.textContent = this._submitButtonText;
    }

    open = ({ card, cardId }) => {
        super.open();
        this._element = card;
        this._cardId = cardId;
    }
};