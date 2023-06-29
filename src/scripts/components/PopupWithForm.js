import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._formInputs = this._popup.querySelectorAll('.popup__form-item');
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
            this._submitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
};