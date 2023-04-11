// Объект для валидации 
const validationConfig = {
    allForms: document.forms,                            // все формы
    inputSelector: '.popup__form-item',                  // все импуты
    submitButtonSelector: '.popup__button-save',         // Кнопки Сохранить/Создать
    errorSpanSelector: '.popup__error_type_',            // Спан с текстом ошибки импута
    inactiveButtonClass: 'popup__button-save_invalid',   // Модификатор не активной кнопки 
    inputErrorClass: 'popup__form-item_error',           // Модификатор Красной полосы импута 
    errorClass: 'popup__error_active'                    // Модификатор видимости текста валидации
}

enableValidation(validationConfig);

function enableValidation(config) {
    const forms = Array.from(config.allForms);
    forms.forEach((form) => {
        const formInputs = form.querySelectorAll(config.inputSelector);
        const formButtom = form.querySelector(config.submitButtonSelector);
        setEventListener(formInputs, formButtom, config.inactiveButtonClass, config.inputErrorClass, config.errorSpanSelector, config.errorClass);
    })
}

function setEventListener(formInputs, formButtom, inactiveButtonClass, inputErrorClass, errorSpanSelector, errorClass) {
    formInputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, errorSpanSelector, inputErrorClass, errorClass);
            toggleButtonState(formInputs, formButtom, inactiveButtonClass)
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

function toggleButtonState(formInputs, formButtom, inactiveButtonClass) {
    if (hasValidInput(formInputs)) {
        enableButton(formButtom, inactiveButtonClass);
    } else {
        disableButton(formButtom, inactiveButtonClass);
    }
}

function hasValidInput(formInputs) {
    return Array.from(formInputs).every((input) => input.validity.valid)
}

function enableButton(formButtom, inactiveButtonClass) {
    formButtom.classList.remove(inactiveButtonClass);
    formButtom.disabled = false;
}

function disableButton(formButtom, inactiveButtonClass) {
    formButtom.classList.add(inactiveButtonClass);
    formButtom.disabled = true;
}

// function resetErrorOpenForm(form) {
//     form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
//         const errorTextElement = document.querySelector(`${validationConfig.errorSpanSelector}${input.name}`);
//         if (!input.validity.valid) {
//             removeImputError(input, errorTextElement, validationConfig.inputErrorClass, validationConfig.errorClass)
//         }
//     })
// }






// console.log()