import Popup from "./Popup";

export default class PopupCardDelete extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitForm(this._element);
        });
    }

    open = (element) => {
        super.open();
        this._element = element;
    }
};