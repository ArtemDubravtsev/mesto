import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._formInputs = this._popup.querySelectorAll('.popup__form-item');
        this._submitButton = this._form.querySelector('.popup__button-save');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._values = {};
        this._formInputs.forEach(input => {
            this._values[input.name] = input.value
        });
        return this._values;
    }

    setInputValues(data) {
        this._formInputs.forEach(input => {
            input.value = data[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitButton.textContent = `${this._submitButton.textContent}...`
            this._submitForm(this._getInputValues());
        });
    }

    getSubmitButtonText() {
        this._submitButton.textContent = this._submitButtonText;
    }

    close() {
        super.close();
        this._form.reset();
    }
};