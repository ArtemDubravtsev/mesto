import initialCards from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Попапы
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');
const popupList = document.querySelectorAll('.popup');

// Кнопки закрытия/открытия попапов
const popupCloseBottonElement = document.querySelector('.popup__button-close');
const popupAddCloseButton = document.querySelector('.popup__button-close_add');
const popupOpenBottonElement = document.querySelector('.profile__button-edit');
const popupAddOpenButton = document.querySelector('.profile__button-add');

// Формы
const formPopup = popup.querySelector('.popup__form');
const formPopupAdd = document.querySelector('.popup__form_add');

// Инпуты
const nameInput = formPopup.querySelector('.popup__form-item_line_name');
const jobInput = formPopup.querySelector('.popup__form-item_line_job');
const imageTitleInput = document.querySelector('.popup__form-item_line_title');
const imageLinkInput = document.querySelector('.popup__form-item_line_link');

// Попап редактирование профиля 
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');
const popupButtonSabmitProfile = formPopup.querySelector('.popup__button-save');
const popupInputProfil = formPopup.querySelectorAll('.popup__form-item');

// Попап добавление карточки
const imageTitle = document.querySelector('.elements__item-title');
const imageLink = document.querySelector('.elements__item-image');
const popupButtonSabmitAdd = formPopupAdd.querySelector('.popup__button-save');
const popupInputAdd = formPopupAdd.querySelectorAll('.popup__form-item');

// Попап картинки
const popupImageBottonClose = document.querySelector('.popup__button-close_image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImageFoto = document.querySelector('.popup__image-foto');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements_template').content;

// Объект валидации
const validationConfig = {
    inputSelector: '.popup__form-item',                  // все импуты
    submitButtonSelector: '.popup__button-save',         // Кнопки Сохранить/Создать
    errorSpanSelector: '.popup__error_type_',            // Спан с текстом ошибки импута
    inactiveButtonClass: 'popup__button-save_invalid',   // Модификатор не активной кнопки 
    inputErrorClass: 'popup__form-item_error',           // Модификатор Красной полосы импута 
    errorClass: 'popup__error_active'                    // Модификатор видимости ошибки ввода текста
};

// Создание карточек
const templateSelector = '#cardElementTemplate';

function createNewCard(cardElement) {
    const card = new Card(cardElement, templateSelector, openPopupImage);
    const newCard = card.сreateCard()
    return newCard;
}

function renderCard(elements, сard) {
    elements.prepend(сard);
}

initialCards.forEach(cardElement => {
    renderCard(elements, createNewCard(cardElement));
});

// Открытие/закрытие попапов
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscButton);
};

const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscButton);
};

const closePopupEscButton = function (evt) {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    }
};

const closePopupOverlayClick = function (event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
};

// Форма
const fillPopupProfileInputs = function () {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobSubtitle.textContent;
}

const handlePopupProfileFormSubmit = function (evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobSubtitle.textContent = jobInput.value;
    closePopup(popupEdit);
}

function openPopupImage(data) {
    popupImageFoto.src = data.link;
    popupImageFoto.alt = "Изображение карточки";
    popupImageTitle.textContent = data.name;
    openPopup(popupImage);
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const data = { name: imageTitleInput.value, link: imageLinkInput.value };
    renderCard(elements, createNewCard(data));
    closePopup(popupAdd);
}

// Слушатель попапа информаций
popupOpenBottonElement.addEventListener('click', function () {
    openPopup(popupEdit);
    formDataValidation.resetErrorOpenForm();
    fillPopupProfileInputs(popupEdit);
});

popupCloseBottonElement.addEventListener('click', function () { closePopup(popupEdit) });
formPopup.addEventListener('submit', handlePopupProfileFormSubmit)

// слушатели попапа добавления картинки
popupAddOpenButton.addEventListener('click', function () {
    openPopup(popupAdd);
    formPopupAdd.reset();
    formAddCardValidation.resetErrorOpenForm();
})

popupAddCloseButton.addEventListener('click', function () { closePopup(popupAdd) });
formPopupAdd.addEventListener('submit', submitAddCardForm);

// слушатель закрытия попапа картинки
popupImageBottonClose.addEventListener('click', function () { closePopup(popupImage) });

// слушатель закрытия попапов кликом на оверлей
popupList.forEach((popup) => popup.addEventListener('click', closePopupOverlayClick));

// Запуск валидации
const formDataValidation = new FormValidator(validationConfig, formPopup);
formDataValidation.enableValidation();

const formAddCardValidation = new FormValidator(validationConfig, formPopupAdd);
formAddCardValidation.enableValidation();