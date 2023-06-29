// Класс валидации
class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._errorSpanSelector = config.errorSpanSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
        this._button = form.querySelector(this._submitButtonSelector);
        this._inputList = form.querySelectorAll(this._inputSelector);
    }

    _checkInputValidity(input) {
        const errorTextElement = this._form.querySelector(`${this._errorSpanSelector}${input.name}`);
        if (input.validity.valid) {
            this._removeImputError(errorTextElement, input);
        } else {
            this._showImputError(errorTextElement, input);
        }
    }

    _showImputError(errorTextElement, input) {
        errorTextElement.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
        errorTextElement.textContent = input.validationMessage;
    }

    _removeImputError(errorTextElement, input) {
        errorTextElement.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
        errorTextElement.textContent = '';
    }

    _toggleButtonState() {
        if (this._hasValidInput()) {
            this._enableButton();
        } else {
            this._disableButton();
        }
    }

    _enableButton() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = false;
    }

    _disableButton() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.disabled = true;
    }

    _hasValidInput() {
        return Array.from(this._inputList).every(input => input.validity.valid);
    }

    _setEventListener() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButtonState()
            })
        })
    }

    resetValidationState() {
        this._inputList.forEach(input => {
            const errorTextElement = this._form.querySelector(`${this._errorSpanSelector}${input.name}`);
            if (!input.validity.valid) {
                this._removeImputError(errorTextElement, input);
            }
        });
        this._disableButton();
    }

    enableValidation() {
        this._setEventListener();
    }
}

export default FormValidator;