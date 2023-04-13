const validationConfig = {
    allForms: document.forms,                            // все формы
    inputSelector: '.popup__form-item',                  // все импуты
    submitButtonSelector: '.popup__button-save',         // Кнопки Сохранить/Создать
    errorSpanSelector: '.popup__error_type_',            // Спан с текстом ошибки импута
    inactiveButtonClass: 'popup__button-save_invalid',   // Модификатор не активной кнопки 
    inputErrorClass: 'popup__form-item_error',           // Модификатор Красной полосы импута 
    errorClass: 'popup__error_active'                    // Модификатор видимости ошибки ввода текста
}


function enableValidation({ allForms, inputSelector, submitButtonSelector, ...rest }) {
    const forms = Array.from(allForms);
    forms.forEach((form) => {
        const formInputs = form.querySelectorAll(inputSelector);
        const formButton = form.querySelector(submitButtonSelector);
        setEventListener(formInputs, formButton, rest);
    })
}

function setEventListener(formInputs, formButton, rest) {
    formInputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, rest.errorSpanSelector, rest.inputErrorClass, rest.errorClass);
            toggleButtonState(formInputs, formButton, rest.inactiveButtonClass);
        })
    })
}

function checkInputValidity(input, errorSpanSelector, inputErrorClass, errorClass) {
    const errorTextElement = document.querySelector(`${errorSpanSelector}${input.name}`);
    if (input.validity.valid) {
        removeImputError(input, errorTextElement, inputErrorClass, errorClass);
    } else {
        showImputError(input, errorTextElement, inputErrorClass, errorClass);
    }
}

function removeImputError(input, errorTextElement, inputErrorClass, errorClass) {
    input.classList.remove(inputErrorClass);
    errorTextElement.textContent = '';
    errorTextElement.classList.remove(errorClass);
}

function showImputError(input, errorTextElement, inputErrorClass, errorClass) {
    input.classList.add(inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(errorClass);
}

function toggleButtonState(formInputs, formButton, inactiveButtonClass) {
    if (hasValidInput(formInputs)) {
        enableButton(formButton, inactiveButtonClass);
    } else {
        disableButton(formButton, inactiveButtonClass);
    }
}

function hasValidInput(formInputs) {
    return Array.from(formInputs).every((input) => input.validity.valid);
}

function enableButton(formButton, inactiveButtonClass) {
    formButton.classList.remove(inactiveButtonClass);
    formButton.disabled = false;
}

function disableButton(formButton, inactiveButtonClass) {
    formButton.classList.add(inactiveButtonClass);
    formButton.disabled = true;
}

function resetErrorOpenForm(form, validationConfig) {
    form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
        const errorTextElement = document.querySelector(`${validationConfig.errorSpanSelector}${input.name}`);
        if (!input.validity.valid) {
            removeImputError(input, errorTextElement, validationConfig.inputErrorClass, validationConfig.errorClass);
        }
    })
}


enableValidation(validationConfig);