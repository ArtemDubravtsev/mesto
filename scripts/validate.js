const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_valid'
}

const enableValidation = ({ formSelector, ...rest }) => {
    const forms = Array.from(document.querySelectorAll(formSelector))
    forms.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        setEventListeners(form, rest)
    })
}

const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, ...rest }) => {
    const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector))
    const formButtom = formToValidate.querySelector(submitButtonSelector)
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input)
            if (hasInvalidInput(formInputs)) {
                disableButton(formButtom, rest)
            } else {
                enableButton(formButtom, rest)
            }
        })
    })
}

const checkInputValidity = (input) => {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
    if (input.checkValidity()) {
        currentInputErrorContainer.textContent = ''
    } else {
        currentInputErrorContainer.textContent = input.validationMessage
    }
}

const hasInvalidInput = (formInputs) => {
    return formInputs.some(item => !item.validity.valid)
}

const enableButton = (button, { inactiveButtonClass }) => {
    button.classList.add(inactiveButtonClass)
    button.removeAttribute('disabled')
}

const disableButton = (button, { inactiveButtonClass }) => {
    button.classList.remove(inactiveButtonClass)
    button.setAttribute('disabled', true)
}


enableValidation(validationConfig)